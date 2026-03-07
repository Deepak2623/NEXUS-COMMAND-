"""
db.py — Dual-Supabase Persistence Layer
────────────────────────────────────────
Tries the PRIMARY Supabase account first, then falls back to the SECONDARY
(second free-tier project) for redundancy and higher storage capacity.
If neither is configured, the system degrades gracefully to the in-memory audit
log maintained in main.py — zero data loss during a session.

Env vars consumed:
  PRIMARY  → SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
  SECONDARY→ SUPABASE_URL_2 + SUPABASE_SERVICE_ROLE_KEY_2
"""

import os
from dotenv import load_dotenv

load_dotenv()

# ─────────────────────────────────────────────────────────
# INTERNAL HELPERS
# ─────────────────────────────────────────────────────────

def _is_placeholder(value: str) -> bool:
    """Return True if the value looks like an unfilled placeholder."""
    bad = ("your-", "your_", "placeholder", "example", "change-me")
    return not value or any(p in value.lower() for p in bad)


def _try_connect(url: str, key: str, label: str):
    """Attempt to create a Supabase client. Returns the client or None."""
    if _is_placeholder(url) or _is_placeholder(key):
        print(f"ℹ️  Supabase [{label}] — not configured (placeholder values).")
        return None
    try:
        import supabase as sb
        client = sb.create_client(url, key)
        # Note: Removed blocking .execute() check to eliminate 30s cold-start hang.
        # Connectivity will be verified on first write.
        print(f"📡 Supabase [{label}] pool initialized.")
        return client
    except Exception as e:
        print(f"⚠️  Supabase [{label}] failed: {e}")
        return None


# ─────────────────────────────────────────────────────────
# BUILD CLIENT LIST  (PRIMARY first, SECONDARY second)
# ─────────────────────────────────────────────────────────

_clients: list = []

_c1 = _try_connect(
    os.getenv("SUPABASE_URL",              ""),
    os.getenv("SUPABASE_SERVICE_ROLE_KEY", ""),
    "PRIMARY",
)
if _c1:
    _clients.append(_c1)

_c2 = _try_connect(
    os.getenv("SUPABASE_URL_2",              ""),
    os.getenv("SUPABASE_SERVICE_ROLE_KEY_2", ""),
    "SECONDARY",
)
if _c2:
    _clients.append(_c2)

if not _clients:
    print("ℹ️  No Supabase clients active — using in-memory fallback only.")


# ─────────────────────────────────────────────────────────
# PUBLIC API
# ─────────────────────────────────────────────────────────

import concurrent.futures

_executor = concurrent.futures.ThreadPoolExecutor(max_workers=5)

def insert_governance(entry: dict) -> None:
    """
    Write an audit entry via RPC to ALL configured Supabase clients.
    Using the RPC ensures atomic updates to usage_ledger and agent_metrics.
    """
    if not _clients:
        return

    def _sync_insert():
        # Prepare parameters for the RPC
        # SQL Param names: p_node, p_task, p_result_preview, p_sha256, p_routed_to, p_latency_ms
        params = {
            "p_node":           entry.get("node", "guardian"),
            "p_task":           entry.get("task", ""),
            "p_result_preview": entry.get("result_preview", ""),
            "p_sha256":         entry.get("sha256", ""),
            "p_routed_to":      entry.get("routed_to", "nexus_node"),
            "p_latency_ms":     entry.get("latency_ms", 0),
        }

        for i, client in enumerate(_clients):
            label = "PRIMARY" if i == 0 else "SECONDARY"
            try:
                # 1. Try Optimized RPC
                client.rpc("insert_governance_entry", params).execute()
                print(f"📝 Supabase [{label}] → RPC success")
            except Exception:
                try:
                    # 2. Try Direct Insert with full v4.5.1 schema
                    client.table("governance_log").insert(entry).execute()
                    print(f"📝 Supabase [{label}] → Table success")
                except Exception:
                    # 3. Graceful Fallback for Legacy Schema (strip new columns)
                    try:
                        legacy_entry = {
                            "node":           entry.get("node"),
                            "task":           entry.get("task"),
                            "result_preview": entry.get("result_preview"),
                            "sha256":         entry.get("sha256"),
                        }
                        client.table("governance_log").insert(legacy_entry).execute()
                        print(f"📝 Supabase [{label}] → Recovery success (legacy schema)")
                    except Exception as e3:
                        print(f"❌ Supabase [{label}] write failed: {e3}")

    # Fire and forget to keep the agent loop ultra-fast
    _executor.submit(_sync_insert)


def is_live() -> bool:
    """True if at least one Supabase client is active."""
    return len(_clients) > 0


def client_count() -> int:
    """Number of live Supabase clients (0, 1, or 2)."""
    return len(_clients)


def client_labels() -> list[str]:
    """Human-readable labels for all live clients."""
    labels = []
    if len(_clients) >= 1:
        labels.append("PRIMARY")
    if len(_clients) >= 2:
        labels.append("SECONDARY")
    return labels
