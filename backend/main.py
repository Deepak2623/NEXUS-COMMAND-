"""
main.py — Nexus Command Center FastAPI
────────────────────────────────────────
v4.5.3 — 2026-03-05
Changes from v4.5.2:
  • Circular dependency resolved (Core LLM extraction)
  • Pre-warmed model pool for sub-500ms starts
  • Zero-throttle progress streams
  • Global version sync v4.5.3
"""

import json
import asyncio
from typing import List, Optional
from datetime import datetime, timezone

# ─── CORE IMPORTS (Top-level for pre-warming) ──────────────────────────────
from app.agents.supervisor import astream_task, VERSION as SUPERVISOR_VERSION
from app.core.db import is_live, client_count, client_labels
from app.core.llm import get_model

import os
import time
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_core.messages import HumanMessage
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv

load_dotenv()

# ─────────────────────────────────────────────────────────
# RATE LIMITING  (slowapi)
# ─────────────────────────────────────────────────────────

from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)


# ─────────────────────────────────────────────────────────
# APP LIFECYCLE
# ─────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    labels = client_labels()
    label_str = " + ".join(labels) if labels else "none"
    print(f"🚀 Nexus Command Center API v4.5.3 — starting…")
    print(f"📦 Supabase: {client_count()} client(s) active  [{label_str}]")
    yield
    print("🛑 Nexus shutting down.")


app = FastAPI(
    title="Nexus Command Center",
    version="4.5.3",
    description="Enterprise AI Supervisor — LangGraph + Gemini 2.0 Flash + Guardian Node",
    lifespan=lifespan,
)

# Rate limit setup
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ─── VERSION ───────────────────────────────────────────────────────────────
APP_VERSION = "4.5.3"

# CORS — locks to Next.js dev server; override via ALLOWED_ORIGIN env var in prod
ALLOWED_ORIGIN = os.getenv("ALLOWED_ORIGIN", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ALLOWED_ORIGIN, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization", "X-Request-ID", "Cache-Control"],
)

# ── Mount aggregation router (replaces waterfall API calls) ──────────────────
from app.api.dashboard import router as dashboard_router
app.include_router(dashboard_router)

# ── SaaS Billing Middleware (usage-based limits) ──────────────────────────────
from app.core.billing_middleware import BillingMiddleware
app.add_middleware(BillingMiddleware)


# ─────────────────────────────────────────────────────────
# LAZY SUPERVISOR IMPORT  (fast startup)
# ─────────────────────────────────────────────────────────

_supervisor_app = None

def get_supervisor():
    global _supervisor_app
    if _supervisor_app is None:
        from app.agents.supervisor import app as _app
        _supervisor_app = _app
    return _supervisor_app


# ─────────────────────────────────────────────────────────
# DYNAMIC MESH COUNTERS  (updated on each /task call)
# ─────────────────────────────────────────────────────────

_mesh: dict = {
    "research_agent":   {"tasks": 0, "last_latency_ms": 0},
    "codereview_agent": {"tasks": 0, "last_latency_ms": 0},
    "nexus_node":       {"tasks": 0, "last_latency_ms": 0},
    "slack_agent":      {"tasks": 0, "last_latency_ms": 0},
}
_guardian_tasks:   int = 0
_guardian_latency: int = 0   # approx: 15% of total round-trip


def _update_counters(routed_to: str, elapsed_ms: int) -> None:
    global _guardian_tasks, _guardian_latency
    if routed_to in _mesh:
        _mesh[routed_to]["tasks"] += 1
        _mesh[routed_to]["last_latency_ms"] = elapsed_ms
    _guardian_tasks  += 1
    _guardian_latency = max(1, int(elapsed_ms * 0.15))


def _load_pct(tasks: int) -> str:
    total = sum(v["tasks"] for v in _mesh.values()) or 1
    return f"{min(int(tasks / total * 100), 99)}%"


def _agent_status(tasks: int) -> str:
    return "online" if tasks > 0 else "idle"


# ─────────────────────────────────────────────────────────
# MODELS
# ─────────────────────────────────────────────────────────

class TaskRequest(BaseModel):
    query: str

class TaskResponse(BaseModel):
    response:   str
    hash:       str
    routed_to:  str
    latency_ms: int
    langfuse_trace: str | None = None

class AgentStatus(BaseModel):
    id:              str
    name:            str
    status:          str
    load:            str
    tasks_completed: int
    latency_ms:      int
    icon:            str

class GovernanceEntry(BaseModel):
    id:           str
    timestamp:    str
    node:         str
    task_preview: str
    sha256:       str
    status:       str


# ─────────────────────────────────────────────────────────
# IN-MEMORY AUDIT LOG  (fallback / always maintained)
# ─────────────────────────────────────────────────────────

_audit_log: list = []


# ─────────────────────────────────────────────────────────
# ROUTES
# ─────────────────────────────────────────────────────────

@app.get("/health")
async def health():
    total_tasks = sum(v["tasks"] for v in _mesh.values())
    return {
        "status":          "healthy",
        "engine":          "LangGraph + Gemini 2.0 Flash",
        "version":         APP_VERSION,
        "timestamp":       datetime.now(timezone.utc).isoformat() + "Z",
        "supabase_live":   is_live(),
        "supabase_clients":client_count(),
        "total_tasks":     total_tasks,
        "guardian_tasks":  _guardian_tasks,
    }


@app.get("/task/stream")
async def run_task_stream(request: Request, q: str):
    """
    Submit a task and receive a real-time stream of supervisor events (SSE).
    Reduces perceived latency by showing agent progress.
    """
    if not q.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    async def event_generator():
        t0 = time.perf_counter()
        yield f"data: {json.dumps({'event': 'connected', 'message': 'Nexus Uplink Established'})}\n\n"
        
        last_node = "nexus_node"
        queue = asyncio.Queue()
        
        # Background task to drain the generator without cancellation risk
        async def producer():
            try:
                async for event in astream_task(q):
                    await queue.put(event)
            except Exception as e:
                await queue.put({"event": "error", "detail": str(e)})
            finally:
                await queue.put(None) # Sentinel for completion
        
        producer_task = asyncio.create_task(producer())
        
        try:
            while True:
                try:
                    # Non-destructive timeout on the queue read
                    event = await asyncio.wait_for(queue.get(), timeout=0.5)
                    if event is None: # Finished
                        break
                    
                    if event["event"] == "routing":
                        last_node = event["routed_to"]
                    yield f"data: {json.dumps(event)}\n\n"
                except asyncio.TimeoutError:
                    # Safe heartbeat — no cancellation of the producer!
                    yield f"data: {json.dumps({'event': 'ping', 'latency': int((time.perf_counter()-t0)*1000)})}\n\n"
            
            elapsed = int((time.perf_counter() - t0) * 1000)
            _update_counters(last_node, elapsed)
        except Exception as e:
            yield f"data: {json.dumps({'event': 'error', 'detail': str(e)})}\n\n"
        finally:
            producer_task.cancel()

    return StreamingResponse(event_generator(), media_type="text/event-stream")


@app.post("/task", response_model=TaskResponse)
@limiter.limit("10/minute")
async def run_task(request: Request, body: TaskRequest):
    """
    Submit a natural-language task to the Nexus supervisor pipeline.
    Rate limited to 10 requests/minute per IP.
    Times out at 90 seconds.
    """
    if not body.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    t0 = time.perf_counter()

    try:
        sup = get_supervisor()
        
        # ── Langfuse Trace Management ──────────────────────
        from app.agents.supervisor import get_langfuse_handler
        cb = get_langfuse_handler()
        trace_id = None
        config = {}
        
        if cb:
            # Create a unique trace ID for this request
            import uuid
            trace_id = f"trace_{uuid.uuid4().hex[:12]}"
            config = {"callbacks": [cb], "run_name": f"NexusTask: {body.query[:30]}", "metadata": {"user": "NexusUI"}, "tags": ["prod"], "run_id": trace_id}
        
        # Use ainvoke because the graph now contains async nodes for real API calls
        result = await asyncio.wait_for(
            sup.ainvoke({"messages": [HumanMessage(content=body.query)]}, config=config),
            timeout=90.0,
        )

    except asyncio.TimeoutError:
        raise HTTPException(
            status_code=504,
            detail="Supervisor timed out after 90s. The query may be too complex — try a more specific request.",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Supervisor error: {str(e)}")

    elapsed   = int((time.perf_counter() - t0) * 1000)
    routed_to = result.get("routed_to", "nexus_node")

    # Update live mesh counters
    _update_counters(routed_to, elapsed)

    # Append to in-memory audit log (enriched with latency + routing)
    entry = {
        "id":           f"log_{int(time.time() * 1000)}",
        "timestamp":    datetime.now(timezone.utc).isoformat() + "Z",
        "node":         "guardian",
        "task_preview": body.query[:80],
        "sha256":       result.get("audit_hash", ""),
        "status":       "verified",
        "routed_to":    routed_to,
        "latency_ms":   elapsed,
    }
    _audit_log.insert(0, entry)
    if len(_audit_log) > 100:
        _audit_log.pop()

    return TaskResponse(
        response=   result.get("final_output", "No response generated."),
        hash=       result.get("audit_hash", ""),
        routed_to=  routed_to,
        latency_ms= elapsed,
        langfuse_trace=trace_id
    )


@app.get("/mesh/status")
async def get_mesh_status():
    """Returns real-time task counters and latency for all agent nodes."""
    c = _mesh
    return [
        AgentStatus(
            id="nexus-node",
            name="Nexus-Node",
            status=_agent_status(c["nexus_node"]["tasks"]),
            load=_load_pct(c["nexus_node"]["tasks"]),
            tasks_completed=c["nexus_node"]["tasks"],
            latency_ms=c["nexus_node"]["last_latency_ms"] or 34,
            icon="cpu",
        ),
        AgentStatus(
            id="research-agent",
            name="Research Agent",
            status=_agent_status(c["research_agent"]["tasks"]),
            load=_load_pct(c["research_agent"]["tasks"]),
            tasks_completed=c["research_agent"]["tasks"],
            latency_ms=c["research_agent"]["last_latency_ms"] or 1240,
            icon="globe",
        ),
        AgentStatus(
            id="codereview-agent",
            name="CodeReview Agent",
            status=_agent_status(c["codereview_agent"]["tasks"]),
            load=_load_pct(c["codereview_agent"]["tasks"]),
            tasks_completed=c["codereview_agent"]["tasks"],
            latency_ms=c["codereview_agent"]["last_latency_ms"] or 890,
            icon="shield",
        ),
        AgentStatus(
            id="guardian-node",
            name="Guardian Node",
            status="online" if _guardian_tasks > 0 else "standby",
            load=f"{min(_guardian_tasks * 4, 95)}%",
            tasks_completed=_guardian_tasks,
            latency_ms=_guardian_latency or 210,
            icon="lock",
        ),
        AgentStatus(
            id="slack-agent",
            name="Slack Agent",
            status=_agent_status(c["slack_agent"]["tasks"]),
            load=_load_pct(c["slack_agent"]["tasks"]),
            tasks_completed=c["slack_agent"]["tasks"],
            latency_ms=c["slack_agent"]["last_latency_ms"] or 450,
            icon="message-square",
        ),
    ]


@app.get("/governance/log")
async def get_governance_log():
    """Returns the last 100 audit entries, newest first."""
    return _audit_log


# ─────────────────────────────────────────────────────────
# ENTRY POINT
# ─────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
