"""
tools.py — Worker Agent Implementations
────────────────────────────────────────
Each function is the concrete implementation for one specialist agent.
"""

import os
import time
import asyncio
import threading
import psutil
from datetime import datetime
from collections import OrderedDict
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

load_dotenv()

async def _fast_invoke(system_prompt: str, human_input: str, model="gemini-2.0-flash", prefer_groq: bool = False):
    from app.core.llm import safe_invoke
    loop = asyncio.get_running_loop()
    resp = await loop.run_in_executor(
        None, lambda: safe_invoke("worker", system_prompt, human_input, prefer_groq=prefer_groq)
    )
    return resp.content

# ─── Bounded TTL cache (max 256 entries, 5-minute TTL) ───────────────────────
class _TTLCache:
    """Thread-safe LRU+TTL cache. Prevents unbounded memory growth."""
    def __init__(self, maxsize: int = 256, ttl_s: float = 300.0):
        from collections import OrderedDict
        self._store: OrderedDict = OrderedDict()
        self._maxsize = maxsize
        self._ttl = ttl_s
        self._lock = threading.Lock()

    def get(self, key: str):
        with self._lock:
            if key not in self._store:
                return None
            val, ts = self._store[key]
            if time.monotonic() - ts > self._ttl:
                del self._store[key]
                return None
            self._store.move_to_end(key)
            return val

    def set(self, key: str, val) -> None:
        with self._lock:
            if key in self._store:
                self._store.move_to_end(key)
            self._store[key] = (val, time.monotonic())
            if len(self._store) > self._maxsize:
                self._store.popitem(last=False)  # Evict oldest

_results_cache = _TTLCache(maxsize=256, ttl_s=300.0)  # 5-min TTL, 256-entry cap

# ─── 🔬 RESEARCH AGENT (Tavily Web Intelligence) ───────────────────────────

async def run_research_task(query: str) -> str:
    cache_key = query.strip().lower()
    cached = _results_cache.get(cache_key)
    if cached is not None:
        return cached

    tavily_key = os.getenv("TAVILY_API_KEY", "")
    context = ""

    if tavily_key:
        try:
            from langchain_community.tools.tavily_search import TavilySearchResults
            search_tool = TavilySearchResults(max_results=3)
            # Tavily invoke is sync — get_running_loop() is the correct Python 3.10+ API
            loop = asyncio.get_running_loop()
            results = await loop.run_in_executor(None, search_tool.invoke, query)
            if results:
                context = "\n".join([f"[{r.get('url')}] {r.get('content')}" for r in results])
        except Exception:
            pass

    system_prompt = "You are an elite researcher. Synthesize a concise report from search results."
    if not context:
        system_prompt += " (Direct knowledge mode)"

    # Prefer Groq for synthesis (ultra-fast)
    result = await _fast_invoke(system_prompt, query, prefer_groq=True)
    _results_cache.set(cache_key, result)
    return result


# ─── 🛡️ GITHUB AUDITOR (Real Action Mesh) ────────────────────────────────────

async def run_codereview_task(query: str) -> str:
    from app.mcp.github_client import github_get_repo
    try:
        extract_prompt = "Extract the GitHub 'owner/repo' name from this query. Reply ONLY with the name or 'NONE'."
        # Enable prefer_groq for ultra-fast extraction
        repo_name = (await _fast_invoke(extract_prompt, query, prefer_groq=True)).strip()
        
        if repo_name != "NONE" and "/" in repo_name:
            owner, repo = repo_name.split("/", 1)
            data = await github_get_repo(owner=owner, repo=repo)
            context = f"GitHub Context for {repo_name}:\n{str(data)[:2000]}"
        else:
            # Inject REAL local context to prevent 'Django/jQuery' hallucinations
            context = """LOCAL WORKSPACE CONTEXT:
            Backend: FastAPI 0.133+, LangGraph 1.0, Python 3.12+, Pydantic v2.
            Frontend: Next.js 16 (Turbopack), React 19, Tailwind v4, Lucide.
            Infrastructure: Dual-Supabase (PostgreSQL), Langfuse Tracing.
            Orchestration: Gemini 2.0 Flash Routing with Groq Fallback.
            """
            
        system_prompt = f"You are the Parallel Security Judge. Audit the repository based on this context:\n{context}\n\nDo not hallucinate technologies (like Django or jQuery) if they are not in the context. If you find architectural insights, use Mermaid diagrams (syntax: ```mermaid ... ```) to visualize them."
        # Prefer Groq for structured audit (fast)
        return await _fast_invoke(system_prompt, query, prefer_groq=True)
    except Exception as e:
        return f"❌ GitHub Error: {str(e)}"


# ─── 🧠 NEXUS MULTI-HUB (Real Salesforce CRM) ────────────────────────────────

async def run_nexus_task(query: str) -> str:
    from app.mcp.salesforce_client import salesforce_query_accounts
    from app.core.db import is_live, client_count
    import psutil
    
    q_lower = query.lower()
    sf_data = ""
    if any(x in q_lower for x in ["lead", "account", "crm", "salesforce"]):
        try:
            soql = "SELECT Id, Name, Company, Status FROM Lead ORDER BY CreatedDate DESC LIMIT 3"
            res = await salesforce_query_accounts(soql=soql)
            sf_data = f"\nREAL CRM DATA:\n{str(res)[:1000]}"
        except Exception as e:
            sf_data = f"\n⚠️ Salesforce API: {str(e)}"

    diag_context = f"""
    MISSION CONTROL:
    - Salesforce: ACTIVE {sf_data}
    - Storage: Dual-Supabase ({'ACTIVE' if is_live() else 'OFFLINE'})
    - Resources: {psutil.cpu_percent()}% CPU / {psutil.virtual_memory().percent}% RAM
    """
    # Prefer Groq for system status formatting (fast)
    system_prompt = f"Mission Controller. State: {diag_context}. You can use Mermaid diagrams (syntax: ```mermaid ... ```) to visualize system health or diagnostics."
    return await _fast_invoke(system_prompt, query, prefer_groq=True)


# ─── 📡 SLACK AGENT (Real Communicator) ──────────────────────────────────────

# ─── 📚 KNOWLEDGE AGENT (RAG - Vector Search) ───────────────────────────────

async def run_knowledge_task(query: str) -> str:
    from app.core.rag import search_knowledge
    
    # 1. Retrieve relevant chunks from vector store
    context = await search_knowledge(query)
    
    # 2. Augment prompt and generate answer
    system_prompt = f"You are the Nexus Knowledge Librarian. Use the following context to answer the user request:\n\n{context}\n\nIf the information is not in the context, use your general knowledge but mention it is not in the internal docs."
    
    return await _fast_invoke(system_prompt, query, prefer_groq=False) # Gemini 2.0 Flash is better for RAG reasoning

async def run_slack_task(query: str) -> str:
    from app.mcp.slack_client import slack_post_message
    try:
        msg_prompt = "Extract ONLY the message to post. No preamble."
        # Prefer Groq for simple text extraction (fast)
        message = await _fast_invoke(msg_prompt, query, prefer_groq=True)
        await slack_post_message(channel="#nexus-alerts", text=f"⚡ [NEXUS] {message}")
        return "✅ Posted to #nexus-alerts."
    except Exception as e:
        return f"❌ Slack Error: {str(e)}"
