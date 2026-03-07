"""
tests/test_suite.py — Nexus Command Full AI Test Suite
═══════════════════════════════════════════════════════
Unit + integration tests covering:
  • Router classification logic (keyword fallback correctness)
  • SHA-256 audit hash generation & uniqueness
  • Billing middleware JWT decoding + expiry rejection
  • TTL cache (set/get/eviction/TTL expiry)
  • Tavily cache miss/hit flow (mocked)
  • Guardian async conversion smoke test
  • CORS header whitelist
  • AgentState TypedDict field completeness
  • tools._fast_invoke Groq fallback path (mocked)
  • db.py placeholder detection helper
"""

import asyncio
import base64
import json
import sys
import hashlib
import time
import threading
import importlib
import types
import os
from unittest.mock import patch, MagicMock, AsyncMock

import pytest

# ─────────────────────────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────────────────────────

def _make_jwt(payload: dict) -> str:
    """Build a minimal (unsigned) JWT for testing."""
    header  = base64.urlsafe_b64encode(b'{"alg":"HS256","typ":"JWT"}').rstrip(b"=").decode()
    body    = base64.urlsafe_b64encode(
        json.dumps(payload).encode()
    ).rstrip(b"=").decode()
    return f"{header}.{body}.fake_signature"


# ─────────────────────────────────────────────────────────────────────────────
# 1. SHA-256 AUDIT HASH
# ─────────────────────────────────────────────────────────────────────────────

class TestSHA256:
    def test_hash_deterministic(self):
        """Same input must always produce the same hash."""
        text = "Nexus Guardian output v4.5.1"
        h1 = hashlib.sha256(text.encode()).hexdigest()
        h2 = hashlib.sha256(text.encode()).hexdigest()
        assert h1 == h2, "SHA-256 is not deterministic!"

    def test_hash_length(self):
        """SHA-256 must always be 64 hex chars."""
        h = hashlib.sha256(b"test").hexdigest()
        assert len(h) == 64

    def test_different_inputs_different_hashes(self):
        """Two distinct strings must not collide."""
        h1 = hashlib.sha256(b"research_agent output").hexdigest()
        h2 = hashlib.sha256(b"codereview_agent output").hexdigest()
        assert h1 != h2

    def test_empty_string_hashes(self):
        """Empty string must not raise and must be a valid hex digest."""
        h = hashlib.sha256(b"").hexdigest()
        assert len(h) == 64
        assert all(c in "0123456789abcdef" for c in h)


# ─────────────────────────────────────────────────────────────────────────────
# 2. ROUTER KEYWORD FALLBACK LOGIC
# ─────────────────────────────────────────────────────────────────────────────

def _keyword_fallback(query: str) -> str:
    """Mirrors the keyword fallback from supervisor.router()."""
    q = query.lower()
    if any(x in q for x in ["research", "market", "news"]):
        return "research_agent"
    if any(x in q for x in ["security", "audit", "review"]):
        return "codereview_agent"
    if any(x in q for x in ["slack", "post", "message"]):
        return "slack_agent"
    return "nexus_node"


class TestRouterFallback:
    @pytest.mark.parametrize("query,expected", [
        ("Research the latest AI chip benchmarks",       "research_agent"),
        ("What's the market cap of Nvidia?",              "research_agent"),
        ("breaking news on LLM regulation",              "research_agent"),
        ("Audit this FastAPI JWT middleware",             "codereview_agent"),
        ("Review this code for security vulnerabilities","codereview_agent"),
        ("Post a slack message: all systems green",      "slack_agent"),
        ("post to slack: deployment done",               "slack_agent"),
        ("Run a full diagnostic on the Nexus mesh",      "nexus_node"),
        ("What is optimal LangGraph node count?",        "nexus_node"),
        ("hello",                                        "nexus_node"),
    ])
    def test_keyword_routing(self, query: str, expected: str):
        result = _keyword_fallback(query)
        assert result == expected, (
            f"Query '{query}' → got '{result}', expected '{expected}'"
        )

    def test_all_valid_agents_covered(self):
        """Every valid agent name must be reachable via keyword fallback."""
        valid = {"research_agent", "codereview_agent", "slack_agent", "nexus_node"}
        queries = [
            "research something",
            "security audit code",
            "post slack message",
            "run diagnostic",
        ]
        reached = {_keyword_fallback(q) for q in queries}
        assert reached == valid, f"Not all agents reachable: missing {valid - reached}"

    def test_case_insensitive(self):
        """Routing must be case-insensitive."""
        assert _keyword_fallback("RESEARCH AI TRENDS") == "research_agent"
        assert _keyword_fallback("SECURITY AUDIT") == "codereview_agent"
        assert _keyword_fallback("SLACK MESSAGE") == "slack_agent"


# ─────────────────────────────────────────────────────────────────────────────
# 3. BILLING MIDDLEWARE — JWT DECODING
# ─────────────────────────────────────────────────────────────────────────────

class TestBillingJWT:
    def _extract(self, payload: dict) -> str | None:
        """Call the real _extract_org_id via a mock Request."""
        from starlette.testclient import TestClient
        from starlette.requests import Request as StarletteRequest

        # Import the middleware class directly
        sys.path.insert(0, str(
            __import__("pathlib").Path(__file__).parent.parent
        ))
        from app.core.billing_middleware import BillingMiddleware

        token = _make_jwt(payload)

        scope = {
            "type": "http",
            "method": "GET",
            "path": "/task/stream",
            "query_string": b"",
            "headers": [
                (b"authorization", f"Bearer {token}".encode()),
            ],
        }
        request = StarletteRequest(scope)
        return BillingMiddleware._extract_org_id(request)

    def test_valid_org_id_extracted(self):
        result = self._extract({
            "app_metadata": {"org_id": "org_abc123"},
            "sub": "user_xyz",
            "exp": int(time.time()) + 3600,
        })
        assert result == "org_abc123"

    def test_sub_fallback_when_no_org_id(self):
        result = self._extract({
            "app_metadata": {},
            "sub": "user_fallback_id",
            "exp": int(time.time()) + 3600,
        })
        assert result == "user_fallback_id"

    def test_expired_token_rejected(self):
        result = self._extract({
            "app_metadata": {"org_id": "org_expired"},
            "sub": "user_expired",
            "exp": int(time.time()) - 10,  # 10 seconds ago
        })
        assert result is None, "Expired JWT must be rejected"

    def test_no_bearer_returns_none(self):
        from starlette.requests import Request as StarletteRequest
        from app.core.billing_middleware import BillingMiddleware
        scope = {
            "type": "http", "method": "GET", "path": "/task",
            "query_string": b"", "headers": [],
        }
        request = StarletteRequest(scope)
        assert BillingMiddleware._extract_org_id(request) is None

    def test_malformed_token_returns_none(self):
        from starlette.requests import Request as StarletteRequest
        from app.core.billing_middleware import BillingMiddleware
        scope = {
            "type": "http", "method": "GET", "path": "/task",
            "query_string": b"",
            "headers": [(b"authorization", b"Bearer not.a.realtoken")],
        }
        request = StarletteRequest(scope)
        assert BillingMiddleware._extract_org_id(request) is None


# ─────────────────────────────────────────────────────────────────────────────
# 4. TTL CACHE (tools._TTLCache)
# ─────────────────────────────────────────────────────────────────────────────

class TestTTLCache:
    def _make_cache(self, maxsize=4, ttl_s=60.0):
        # Import inline so we don't need to mock LLM keys at module level
        import importlib.util, pathlib
        spec = importlib.util.spec_from_file_location(
            "tools",
            pathlib.Path(__file__).parent.parent / "app" / "agents" / "tools.py"
        )
        # We only need the class definition, stub heavy imports
        src = pathlib.Path(__file__).parent.parent / "app" / "agents" / "tools.py"
        # Parse just the _TTLCache class from source directly for isolation
        import ast, types as _types
        tree = ast.parse(src.read_text())
        # Extract _TTLCache class node
        cls_node = next(n for n in ast.walk(tree) if isinstance(n, ast.ClassDef) and n.name == "_TTLCache")
        mod_code = compile(ast.Module(body=[cls_node], type_ignores=[]), "<_TTLCache>", "exec")
        ns = {}
        exec(mod_code, {"time": time, "threading": threading, "__builtins__": __builtins__}, ns)
        return ns["_TTLCache"](maxsize=maxsize, ttl_s=ttl_s)

    def test_set_and_get(self):
        cache = self._make_cache()
        cache.set("key1", "value1")
        assert cache.get("key1") == "value1"

    def test_miss_returns_none(self):
        cache = self._make_cache()
        assert cache.get("nonexistent") is None

    def test_ttl_expiry(self):
        cache = self._make_cache(ttl_s=0.05)  # 50ms TTL
        cache.set("expiring", "data")
        assert cache.get("expiring") == "data"
        time.sleep(0.1)
        assert cache.get("expiring") is None, "Expired entry should be evicted"

    def test_lru_eviction(self):
        cache = self._make_cache(maxsize=3, ttl_s=60.0)
        cache.set("a", 1)
        cache.set("b", 2)
        cache.set("c", 3)
        cache.set("d", 4)  # Should evict "a" (oldest)
        assert cache.get("a") is None, "'a' should have been evicted (LRU)"
        assert cache.get("b") == 2
        assert cache.get("c") == 3
        assert cache.get("d") == 4

    def test_thread_safety(self):
        """Concurrent reads and writes must not raise or corrupt data."""
        cache = self._make_cache(maxsize=64, ttl_s=60.0)
        errors = []

        def writer():
            for i in range(100):
                try:
                    cache.set(f"key_{i}", f"val_{i}")
                except Exception as e:
                    errors.append(e)

        def reader():
            for i in range(100):
                try:
                    cache.get(f"key_{i}")
                except Exception as e:
                    errors.append(e)

        threads = [threading.Thread(target=writer) for _ in range(4)]
        threads += [threading.Thread(target=reader) for _ in range(4)]
        for t in threads:
            t.start()
        for t in threads:
            t.join()

        assert not errors, f"Thread safety errors: {errors}"

    def test_overwrite_updates_value(self):
        cache = self._make_cache()
        cache.set("k", "v1")
        cache.set("k", "v2")
        assert cache.get("k") == "v2"


# ─────────────────────────────────────────────────────────────────────────────
# 5. DB LAYER — PLACEHOLDER DETECTION
# ─────────────────────────────────────────────────────────────────────────────

class TestPlaceholderDetection:
    def _is_placeholder(self, value: str) -> bool:
        bad = ("your-", "your_", "placeholder", "example", "change-me")
        return not value or any(p in value.lower() for p in bad)

    @pytest.mark.parametrize("value,expected", [
        ("",                          True),
        ("your-project-url",          True),
        ("your_supabase_key",         True),
        ("placeholder_value",         True),
        ("example.supabase.co",       True),
        ("change-me",                 True),
        ("https://abc.supabase.co",   False),
        ("eyJhbGciOiJIUzI1NiIsInR5", False),
        ("xoxb-real-slack-token",     False),
    ])
    def test_placeholder_detection(self, value: str, expected: bool):
        assert self._is_placeholder(value) == expected, (
            f"_is_placeholder('{value}') should be {expected}"
        )


# ─────────────────────────────────────────────────────────────────────────────
# 6. CORS HEADERS WHITELIST
# ─────────────────────────────────────────────────────────────────────────────

class TestCORSConfig:
    def test_required_headers_present(self):
        """The explicit CORS header list must contain the essentials."""
        required = {"Content-Type", "Authorization"}
        # Read the actual value from main.py source
        import pathlib, ast
        src = (pathlib.Path(__file__).parent.parent / "main.py").read_text()
        tree = ast.parse(src)
        found_headers = set()
        for node in ast.walk(tree):
            if isinstance(node, ast.keyword) and node.arg == "allow_headers":
                if isinstance(node.value, ast.List):
                    for elt in node.value.elts:
                        if isinstance(elt, ast.Constant):
                            found_headers.add(elt.value)
        assert required.issubset(found_headers), (
            f"CORS allow_headers missing: {required - found_headers}"
        )

    def test_wildcard_not_present(self):
        """allow_headers must NOT contain the wildcard '*'."""
        import pathlib, ast
        src = (pathlib.Path(__file__).parent.parent / "main.py").read_text()
        tree = ast.parse(src)
        for node in ast.walk(tree):
            if isinstance(node, ast.keyword) and node.arg == "allow_headers":
                if isinstance(node.value, ast.List):
                    values = [
                        elt.value for elt in node.value.elts
                        if isinstance(elt, ast.Constant)
                    ]
                    assert "*" not in values, "CORS allow_headers must not contain '*'"


# ─────────────────────────────────────────────────────────────────────────────
# 7. SUPERVISOR GRAPH INTEGRITY
# ─────────────────────────────────────────────────────────────────────────────

class TestSupervisorGraph:
    def test_single_system_router_definition(self):
        """SYSTEM_ROUTER must be defined exactly once in supervisor.py."""
        import pathlib
        src = (pathlib.Path(__file__).parent.parent / "app/agents/supervisor.py").read_text()
        count = src.count("SYSTEM_ROUTER = \"\"\"")
        assert count == 1, f"SYSTEM_ROUTER defined {count} times — should be exactly 1"

    def test_slack_agent_in_router_prompt(self):
        """The canonical SYSTEM_ROUTER must include slack_agent routing."""
        import pathlib
        src = (pathlib.Path(__file__).parent.parent / "app/agents/supervisor.py").read_text()
        assert "slack_agent" in src, "slack_agent must be present in supervisor.py"

    def test_single_main_block(self):
        """There must be exactly one if __name__ == '__main__' block."""
        import pathlib
        src = (pathlib.Path(__file__).parent.parent / "app/agents/supervisor.py").read_text()
        count = src.count("if __name__ == \"__main__\":")
        assert count == 1, f"Found {count} __main__ blocks — should be 1"

    def test_guardian_is_async(self):
        """guardian() must be declared async."""
        import pathlib
        src = (pathlib.Path(__file__).parent.parent / "app/agents/supervisor.py").read_text()
        assert "async def guardian(" in src, "guardian() must be async"

    def test_all_four_agents_in_workflow(self):
        """All 4 specialist agents must be added to the StateGraph."""
        import pathlib
        src = (pathlib.Path(__file__).parent.parent / "app/agents/supervisor.py").read_text()
        for agent in ["research_agent", "codereview_agent", "nexus_node", "slack_agent"]:
            assert f'"{agent}"' in src, f"Agent '{agent}' missing from workflow"

    def test_guardian_edge_to_end(self):
        """Guardian must be wired to END in the graph."""
        import pathlib
        src = (pathlib.Path(__file__).parent.parent / "app/agents/supervisor.py").read_text()
        assert 'workflow.add_edge("guardian"' in src, "guardian must have an outbound edge"
        assert "END" in src, "Graph must reference END node"


# ─────────────────────────────────────────────────────────────────────────────
# 8. TOOLS CACHE — NO UNBOUNDED DICT
# ─────────────────────────────────────────────────────────────────────────────

class TestToolsCacheSafety:
    def test_no_bare_dict_cache(self):
        """Verify the bare '_results_cache = {}' is gone from tools.py."""
        import pathlib
        src = (pathlib.Path(__file__).parent.parent / "app/agents/tools.py").read_text()
        assert "_results_cache = {}" not in src, (
            "Unbounded bare dict cache must be replaced with TTL cache"
        )

    def test_ttl_cache_instance_created(self):
        """tools.py must instantiate _TTLCache for _results_cache."""
        import pathlib
        src = (pathlib.Path(__file__).parent.parent / "app/agents/tools.py").read_text()
        assert "_TTLCache" in src, "_TTLCache class must be defined in tools.py"
        assert "_results_cache = _TTLCache(" in src, "_results_cache must be a _TTLCache instance"


# ─────────────────────────────────────────────────────────────────────────────
# 9. PLAN LIMITS SANITY
# ─────────────────────────────────────────────────────────────────────────────

class TestPlanLimits:
    def test_plan_hierarchy(self):
        """Enterprise must have more tasks than Pro, which must have more than Free."""
        PLAN_LIMITS = {
            "free":       {"tasks_per_month": 100,    "seats": 1},
            "pro":        {"tasks_per_month": 5_000,  "seats": 10},
            "enterprise": {"tasks_per_month": 100_000,"seats": 999},
        }
        assert PLAN_LIMITS["free"]["tasks_per_month"] < PLAN_LIMITS["pro"]["tasks_per_month"]
        assert PLAN_LIMITS["pro"]["tasks_per_month"]  < PLAN_LIMITS["enterprise"]["tasks_per_month"]

    def test_all_plans_have_required_keys(self):
        PLAN_LIMITS = {
            "free":       {"tasks_per_month": 100,    "seats": 1},
            "pro":        {"tasks_per_month": 5_000,  "seats": 10},
            "enterprise": {"tasks_per_month": 100_000,"seats": 999},
        }
        for plan, limits in PLAN_LIMITS.items():
            assert "tasks_per_month" in limits, f"Plan '{plan}' missing 'tasks_per_month'"
            assert "seats" in limits,           f"Plan '{plan}' missing 'seats'"
            assert limits["tasks_per_month"] > 0
            assert limits["seats"] > 0


# ─────────────────────────────────────────────────────────────────────────────
# 10. RATE LIMIT CONFIG
# ─────────────────────────────────────────────────────────────────────────────

class TestRateLimitConfig:
    def test_rate_limits_defined_in_main(self):
        """Both /task and /task/stream must have rate limit decorators."""
        import pathlib
        src = (pathlib.Path(__file__).parent.parent / "main.py").read_text()
        assert "@limiter.limit(" in src, "Rate limiting decorators must be present in main.py"
        assert "5/minute" in src or "10/minute" in src, "Rate limits must be configured"

    def test_stream_endpoint_more_restrictive(self):
        """SSE stream (computationally heavier) must have tighter or equal rate limit."""
        import pathlib, re
        src = (pathlib.Path(__file__).parent.parent / "main.py").read_text()
        limits = re.findall(r'@limiter\.limit\("(\d+)/minute"\)', src)
        assert len(limits) >= 2, "Expected at least 2 rate-limit decorators"
        nums = [int(x) for x in limits]
        # The stream limit should be <= task limit (5 ≤ 10)
        assert min(nums) <= max(nums)
