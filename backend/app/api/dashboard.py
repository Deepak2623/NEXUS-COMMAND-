"""
dashboard.py — Aggregation endpoint replacing three waterfall fetches.
─────────────────────────────────────────────────────────────────────
GET /dashboard/snapshot returns everything the frontend needs in one
response: recent audit log, per-agent mesh stats, and usage summary.

This endpoint should be mounted into main.py with:
  from dashboard import router as dashboard_router
  app.include_router(dashboard_router)
"""

from fastapi import APIRouter, Request
from datetime import datetime, timezone

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


def _compute_mesh_stats(audit_log: list, mesh: dict) -> list:
    """
    Compute per-agent stats from in-memory data.
    In production these come from the Supabase RPC function.
    """
    from collections import defaultdict
    agent_data: dict = defaultdict(lambda: {"tasks": 0, "total_latency": 0})

    for entry in audit_log:
        rt = entry.get("routed_to") or entry.get("node")
        if rt:
            agent_data[rt]["tasks"] += 1

    # Merge with live mesh latency data
    for agent_id, live in mesh.items():
        agent_data[agent_id]["total_latency"] += live.get("last_latency_ms", 0)

    stats = []
    for agent_id, data in agent_data.items():
        tasks = data["tasks"] or mesh.get(agent_id, {}).get("tasks", 0)
        avg   = data["total_latency"] // max(tasks, 1)
        stats.append({
            "agent_id":       agent_id,
            "tasks_completed": tasks,
            "avg_latency_ms": avg,
            "last_active":    datetime.now(timezone.utc).isoformat(),
        })
    
    # Always include all 4 agents (even if idle)
    known = {s["agent_id"] for s in stats}
    for ag in ["nexus_node", "research_agent", "codereview_agent", "slack_agent"]:
        if ag not in known:
            live_tasks = mesh.get(ag, {}).get("tasks", 0)
            stats.append({
                "agent_id":       ag,
                "tasks_completed": live_tasks,
                "avg_latency_ms": mesh.get(ag, {}).get("last_latency_ms", 0),
                "last_active":    None,
            })

    return stats


@router.get("/snapshot")
async def get_dashboard_snapshot(request: Request):
    """
    Single-endpoint dashboard data aggregation.
    Replaces separate /mesh/status + /governance/log + /health calls.

    In production this would call the Supabase RPC `get_dashboard_snapshot`
    via the service-role client for zero-waterfall, server-side JOIN.
    """
    # Pull shared state from main app (avoids circular imports)
    from main import _audit_log, _mesh, _guardian_tasks, _guardian_latency

    # ── Try Supabase RPC first (production path) ──────────────────────────
    try:
        from app.core.db import _clients
        if _clients:
            client = _clients[0]
            result = client.rpc("get_dashboard_snapshot", {"p_limit": 25}).execute()
            if result.data:
                return result.data
    except Exception:
        pass  # Fall through to in-memory path

    # ── In-memory fallback (dev / no Supabase) ───────────────────────────
    mesh_stats = _compute_mesh_stats(_audit_log, _mesh)

    recent_logs = [
        {
            "id":           e.get("id", ""),
            "timestamp":    e.get("timestamp", ""),
            "node":         e.get("node", "guardian"),
            "task_preview": e.get("task_preview", "")[:80],
            "sha256":       e.get("sha256", ""),
            "status":       e.get("status", "verified"),
            "routed_to":    e.get("routed_to"),
            "latency_ms":   e.get("latency_ms", 0),
        }
        for e in _audit_log[:25]
    ]

    total_tasks   = sum(v["tasks"] for v in _mesh.values())
    total_latency = sum(v["last_latency_ms"] for v in _mesh.values())

    usage = {
        "task_count":  total_tasks,
        "token_count": 0,
        "period":      datetime.now(timezone.utc).strftime("%Y-%m"),
        "updated_at":  datetime.now(timezone.utc).isoformat(),
    }

    return {
        "recent_logs": recent_logs,
        "mesh_stats":  mesh_stats,
        "usage":       usage,
        "fetched_at":  datetime.now(timezone.utc).isoformat() + "Z",
    }
