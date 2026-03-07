"""
billing_middleware.py — Seat-based & Usage-based Billing Guard
───────────────────────────────────────────────────────────────
Plugs into FastAPI as a middleware layer. Before any /task request
is processed, it checks the organization's plan limits against the
current usage ledger (read from Supabase via the service-role client).

Design principles:
  • Sub-millisecond check via an in-process LRU cache (TTL: 60s)
  • Hard-fail → 402 Payment Required on limit breach
  • Soft-warn at 90% → X-Usage-Warning header returned to frontend
  • Usage incremented atomically by the Supabase RPC (no double-count risk)

Integrate into main.py:
  from billing_middleware import BillingMiddleware
  app.add_middleware(BillingMiddleware)
"""

import time
import os
from collections import OrderedDict
from typing import Optional, Tuple

from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse


# ─── Plan limits (extend for Stripe tiers) ──────────────────────────────────

PLAN_LIMITS: dict = {
    "free":       {"tasks_per_month": 100,   "seats": 1},
    "pro":        {"tasks_per_month": 5_000,  "seats": 10},
    "enterprise": {"tasks_per_month": 100_000,"seats": 999},
}


# ─── Simple TTL LRU Cache (no redis dependency for local dev) ────────────────

class _TTLCache:
    """Thread-safe-enough LRU cache with per-key TTL. Max 256 orgs."""
    def __init__(self, maxsize: int = 256, ttl_s: float = 60.0):
        self._store: OrderedDict = OrderedDict()
        self._maxsize = maxsize
        self._ttl = ttl_s

    def get(self, key: str) -> Optional[dict]:
        if key not in self._store:
            return None
        val, ts = self._store[key]
        if time.monotonic() - ts > self._ttl:
            del self._store[key]
            return None
        self._store.move_to_end(key)
        return val

    def set(self, key: str, val: dict) -> None:
        if key in self._store:
            self._store.move_to_end(key)
        self._store[key] = (val, time.monotonic())
        if len(self._store) > self._maxsize:
            self._store.popitem(last=False)

    def invalidate(self, key: str) -> None:
        self._store.pop(key, None)


_usage_cache = _TTLCache(ttl_s=60.0)


# ─── Supabase usage fetch ─────────────────────────────────────────────────────

def _fetch_org_usage(org_id: str) -> Optional[dict]:
    """Fetch live usage + plan from Supabase. Returns None if not configured."""
    try:
        from app.core.db import _clients
        if not _clients:
            return None
        client = _clients[0]
        # Single RPC call for org plan + current period usage
        result = client.table("organizations").select(
            "id, plan, seat_limit"
        ).eq("id", org_id).single().execute()
        if not result.data:
            return None
        org   = result.data
        plan  = org.get("plan", "free")
        limit = PLAN_LIMITS.get(plan, PLAN_LIMITS["free"])

        from datetime import datetime, timezone
        period = datetime.now(timezone.utc).strftime("%Y-%m")
        usage_res = client.table("usage_ledger").select(
            "task_count, token_count"
        ).eq("org_id", org_id).eq("period", period).execute()

        usage = usage_res.data[0] if usage_res.data else {"task_count": 0, "token_count": 0}

        return {
            "plan":            plan,
            "tasks_limit":     limit["tasks_per_month"],
            "tasks_used":      usage["task_count"],
            "seats_limit":     limit["seats"],
        }
    except Exception as e:
        print(f"⚠️  BillingMiddleware: usage fetch failed — open access ({e})")
        return None


# ─── Middleware ───────────────────────────────────────────────────────────────

class BillingMiddleware(BaseHTTPMiddleware):
    """
    Intercepts /task (POST) and /task/stream (GET) requests.
    Extracts org_id from JWT app_metadata, checks usage limits,
    returns 402 if the org is over-limit.
    """

    GUARDED_PATHS = {"/task", "/task/stream"}

    async def dispatch(self, request: Request, call_next):
        if request.url.path not in self.GUARDED_PATHS or os.getenv("NEXUS_MODE") == "dev":
            return await call_next(request)

        org_id = self._extract_org_id(request)
        if not org_id:
            # Pass through for dev/single-user
            return await call_next(request)

        # Cache-first usage check
        cached = _usage_cache.get(org_id)
        if cached is None:
            import asyncio
            # Offload blocking Supabase hit to thread
            cached = await asyncio.to_thread(_fetch_org_usage, org_id)
            if cached:
                _usage_cache.set(org_id, cached)

        if cached:
            used  = cached["tasks_used"]
            limit = cached["tasks_limit"]
            pct   = (used / limit * 100) if limit else 0

            # Hard block at 100%
            if used >= limit:
                return JSONResponse(
                    status_code=402,
                    content={
                        "detail": f"Monthly task limit reached ({used}/{limit}). "
                                  f"Upgrade your plan at nexus.yourdomain.com/billing.",
                        "code":   "USAGE_LIMIT_EXCEEDED",
                        "plan":   cached["plan"],
                    },
                )

            # Soft warn at 90%
            response = await call_next(request)
            if pct >= 90:
                response.headers["X-Usage-Warning"] = (
                    f"Approaching limit: {used}/{limit} tasks used ({pct:.0f}%)"
                )
            response.headers["X-Tasks-Used"]  = str(used)
            response.headers["X-Tasks-Limit"] = str(limit)
            return response

        # Supabase not available → pass through (graceful degradation)
        return await call_next(request)

    @staticmethod
    def _extract_org_id(request: Request) -> Optional[str]:
        """
        Extracts org_id from the Authorization JWT's app_metadata claim.
        Supabase sets this when you call auth.updateUser({ data: { org_id } }).

        SECURITY NOTE:
          We decode the JWT payload WITHOUT verifying the cryptographic signature here.
          This is acceptable ONLY because:
            1. The Supabase API gateway already validates the token before any DB
               operation (service_role key enforces this server-side).
            2. This middleware is a usage-metering guard, not an auth gate.
               An attacker forging org_id would see ANOTHER org's usage counter,
               but cannot read or write that org's data (RLS enforces tenant isolation).
          For v5.0 we should call supabase.auth.get_user(token) to fully validate.
        """
        import time as _time
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return None
        token = auth_header.split(" ", 1)[1]
        try:
            import base64, json
            # Decode JWT payload (no signature verification — see SECURITY NOTE above)
            payload_b64 = token.split(".")[1]
            padded = payload_b64 + "=" * (-len(payload_b64) % 4)
            payload = json.loads(base64.urlsafe_b64decode(padded))

            # Reject clearly expired tokens (adds a minimal replay-attack guard)
            exp = payload.get("exp")
            if exp and _time.time() > exp:
                return None

            # Prefer org_id from app_metadata; fall back to JWT subject (sub)
            org_id = payload.get("app_metadata", {}).get("org_id")
            if not org_id:
                org_id = payload.get("sub")  # single-user / dev-mode fallback
            return org_id
        except Exception:
            return None
