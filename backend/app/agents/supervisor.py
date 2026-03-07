"""
supervisor.py — LangGraph Supervisor Pipeline
──────────────────────────────────────────────
State machine:
  router → {research_agent | codereview_agent | nexus_node} → guardian → END

All workers delegate to tools.py.
The Guardian Node is mandatory — every response passes through it.
SHA-256 hashing and Supabase persistence are handled here, not in main.py.
"""

import os
import hashlib
import asyncio
from datetime import datetime, timezone
from typing import List, Dict, Optional, TypedDict

from langchain_core.messages import BaseMessage, HumanMessage
from langgraph.graph import StateGraph, END
from dotenv import load_dotenv

from app.core.llm import safe_invoke
from .tools import run_research_task, run_codereview_task, run_nexus_task, run_slack_task, run_knowledge_task
from app.core.db import insert_governance

load_dotenv()

# ─────────────────────────────────────────────────────────
# VERSION
# ─────────────────────────────────────────────────────────
VERSION = "4.5.3"
primary_model = "gemini-2.0-flash"

# ─────────────────────────────────────────────────────────
# OPTIONAL: Langfuse tracing

# ─────────────────────────────────────────────────────────
# OPTIONAL: Langfuse tracing
# ─────────────────────────────────────────────────────────

_langfuse_handler = None
try:
    from langfuse.langchain import CallbackHandler as LangfuseHandler
    _pk   = os.getenv("LANGFUSE_PUBLIC_KEY",  "")
    _sk   = os.getenv("LANGFUSE_SECRET_KEY",  "")
    _host = os.getenv("LANGFUSE_HOST", "https://cloud.langfuse.com")

    if _pk and "..." not in _pk and _sk and "..." not in _sk:
        # SDK picks up public_key, secret_key, host from env automatically
        _langfuse_handler = LangfuseHandler()
        print("✅ Langfuse tracing enabled")
    else:
        print("ℹ️  Langfuse not configured or contains placeholders — tracing disabled.")
except Exception as e:
    print(f"⚠️  Langfuse init failed: {e}")


def get_langfuse_handler():
    return _langfuse_handler


# ─────────────────────────────────────────────────────────
# STATE
# ─────────────────────────────────────────────────────────

class AgentState(TypedDict):
    messages:            List[BaseMessage]
    next_node:           str
    routed_to:           str
    intermediate_output: str
    final_output:        str
    audit_hash:          str


# ─────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────

def sha256(content: str) -> str:
    return hashlib.sha256(content.encode("utf-8")).hexdigest()


# safe_invoke now imported from app.core.llm

# ─────────────────────────────────────────────────────────
# NODE 1: ROUTER
# ─────────────────────────────────────────────────────────

SYSTEM_ROUTER = """Route query to: research_agent, codereview_agent, slack_agent, knowledge_agent, or nexus_node.
Use knowledge_agent for queries about Nexus documentation, architecture details, or "how it works" internally.
Reply ONLY with the name. No punctuation.
"""

async def router(state: AgentState) -> Dict:
    query = state["messages"][-1].content
    print(f"🧭 ROUTING: \"{query[:40]}...\"")
    
    # Fast path for system status queries (0ms LLM latency)
    q_lower = query.lower()
    if any(k in q_lower for k in ["status", "health", "system check", "diag"]):
        return {"next_node": "nexus_node", "routed_to": "nexus_node"}

    try:
        # Prioritize Groq for routing (sub-500ms)
        loop = asyncio.get_running_loop()
        resp = await loop.run_in_executor(
            None, lambda: safe_invoke("router", SYSTEM_ROUTER, query, prefer_groq=True, langfuse_handler=_langfuse_handler)
        )
        raw = resp.content.strip().lower()
    except Exception as e:
        print(f"⚠️ Router failed ({e}) — used logic fallback.")
        q = query.lower()
        if any(x in q for x in ["research", "market", "news"]): return {"next_node": "research_agent", "routed_to": "research_agent"}
        if any(x in q for x in ["security", "audit", "review"]): return {"next_node": "codereview_agent", "routed_to": "codereview_agent"}
        if any(x in q for x in ["slack", "post", "message"]): return {"next_node": "slack_agent", "routed_to": "slack_agent"}
        if any(x in q for x in ["doc", "internal", "manual", "guide"]): return {"next_node": "knowledge_agent", "routed_to": "knowledge_agent"}
        return {"next_node": "nexus_node", "routed_to": "nexus_node"}

    raw = raw.replace("-", "_").replace(" ", "_")
    valid   = {"research_agent", "codereview_agent", "nexus_node", "slack_agent", "knowledge_agent"}
    chosen  = "nexus_node"
    for v in valid:
        if v in raw:
            chosen = v
            break

    print(f"🧭 ROUTER → {chosen}")
    return {"next_node": chosen, "routed_to": chosen}


# ─────────────────────────────────────────────────────────
# NODES 2a-2c: WORKERS  (delegate to tools.py)
# ─────────────────────────────────────────────────────────

async def research_agent(state: AgentState) -> Dict:
    query = state["messages"][-1].content
    print(f"🔬 RESEARCH AGENT  ← \"{query[:80]}…\"")
    result = await run_research_task(query)
    return {"intermediate_output": result}


async def codereview_agent(state: AgentState) -> Dict:
    query = state["messages"][-1].content
    print(f"🛡️  CODEREVIEW AGENT ← \"{query[:80]}…\"")
    result = await run_codereview_task(query)
    return {"intermediate_output": result}


async def nexus_node(state: AgentState) -> Dict:
    query = state["messages"][-1].content
    print(f"🧠 NEXUS NODE       ← \"{query[:80]}…\"")
    result = await run_nexus_task(query)
    return {"intermediate_output": result}


async def slack_agent(state: AgentState) -> Dict:
    query = state["messages"][-1].content
    print(f"📡 SLACK AGENT      ← \"{query[:80]}…\"")
    result = await run_slack_task(query)
    return {"intermediate_output": result}


async def knowledge_agent(state: AgentState) -> Dict:
    query = state["messages"][-1].content
    print(f"📚 KNOWLEDGE AGENT  ← \"{query[:80]}…\"")
    result = await run_knowledge_task(query)
    return {"intermediate_output": result}


# ─────────────────────────────────────────────────────────
# NODE 3: GUARDIAN
# ─────────────────────────────────────────────────────────

SYSTEM_GUARDIAN = """You are the Guardian Node — a mandatory safety, quality, and compliance layer.
Protect the user and the system. Redact PII. Return clean output verbatim if safe."""

async def guardian(state: AgentState) -> Dict:
    """Async Guardian Node — runs in the event loop without blocking worker threads."""
    output = state["intermediate_output"]
    # Prioritize Groq for Guardian (sub-1s vs 34s)
    loop = asyncio.get_running_loop()
    resp = await loop.run_in_executor(
        None, lambda: safe_invoke("guardian", SYSTEM_GUARDIAN, output, prefer_groq=True, langfuse_handler=_langfuse_handler)
    )
    final = resp.content.strip()
    h     = sha256(final)

    routed_to = state.get("routed_to", "nexus_node")

    entry = {
        "timestamp":      datetime.now(timezone.utc).isoformat() + "Z",
        "node":           "guardian",
        "task":           state["messages"][-1].content[:300],
        "result_preview": final[:400],
        "sha256":         h,
        "routed_to":      routed_to,
        "latency_ms":     0,
    }
    insert_governance(entry)
    print(f"🔒 GUARDIAN sha256={h[:12]}…")
    return {"final_output": final, "audit_hash": h}


# ─────────────────────────────────────────────────────────
# GRAPH ASSEMBLY
# ─────────────────────────────────────────────────────────

workflow = StateGraph(AgentState)
workflow.add_node("router",          router)
workflow.add_node("research_agent",  research_agent)
workflow.add_node("codereview_agent",codereview_agent)
workflow.add_node("nexus_node",      nexus_node)
workflow.add_node("slack_agent",     slack_agent)
workflow.add_node("knowledge_agent", knowledge_agent)
workflow.add_node("guardian",        guardian)

workflow.set_entry_point("router")
workflow.add_conditional_edges(
    "router", 
    lambda x: x["next_node"],
    {
        "research_agent":   "research_agent",
        "codereview_agent": "codereview_agent",
        "nexus_node":       "nexus_node",
        "slack_agent":      "slack_agent",
        "knowledge_agent":  "knowledge_agent",
    }
)
workflow.add_edge("research_agent",  "guardian")
workflow.add_edge("codereview_agent","guardian")
workflow.add_edge("nexus_node",      "guardian")
workflow.add_edge("slack_agent",     "guardian")
workflow.add_edge("knowledge_agent", "guardian")
workflow.add_edge("guardian",        END)

app = workflow.compile()


async def astream_task(query: str):
    """SSE event stream for high-visibility agent progress."""
    initial_state = {"messages": [HumanMessage(content=query)]}
    
    # Send initial event
    yield {"event": "start", "message": "Supervisor handshake initiated..."}
    
    final_event_sent = False
    try:
        async for event in app.astream(initial_state, stream_mode="updates"):
            for node_name, node_output in event.items():
                print(f"DEBUG: Graph Yielded Node='{node_name}' with keys={list(node_output.keys())}")
                
                if node_name == "router":
                    yield {
                        "event": "routing",
                        "routed_to": node_output.get("routed_to"),
                        "message": f"Orchestrator routed tasks to {node_output.get('routed_to', 'NEXUS').upper()}"
                    }
                
                # Check for intermediate logs from workers
                if "intermediate_output" in node_output:
                    yield {
                        "event": "agent_thinking",
                        "node": node_name,
                        "message": f"{node_name.replace('_', ' ').capitalize()} completed reasoning.",
                        "preview": node_output["intermediate_output"][:300]
                    }
                
                # Check for the final output (usually from guardian)
                if "final_output" in node_output:
                    final_event_sent = True
                    yield {
                        "event": "validation_complete",
                        "hash": node_output.get("audit_hash", "no-hash"),
                        "final_output": node_output["final_output"],
                        "message": "Guardian Node validation successful."
                    }
    except Exception as e:
        print(f"❌ SSE Stream Error: {e}")
        yield {"event": "error", "message": f"Stream interrupted: {str(e)}"}
        return

    # Fallback if loop ends but no final node was detected
    if not final_event_sent:
        print("⚠️ SSE Stream ended without 'final_output' update.")
        yield {
            "event": "error",
            "message": "Pipeline finished without a final response. Please check backend logs for node execution status."
        }

if __name__ == "__main__":
    test_query = "Research Nvidia's AI chip roadmap for 2026"
    import asyncio
    async def run_test():
        async for e in astream_task(test_query):
            print(f"EVENT: {e['event']} - {e.get('message', '')}")
    asyncio.run(run_test())


# ─────────────────────────────────────────────────────────
# STANDALONE TEST  (run: uv run python -m app.agents.supervisor)
# ─────────────────────────────────────────────────────────
# (async stream test above at line ~334 is the canonical test entry-point)
