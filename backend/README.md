# Nexus Command Center — Backend

FastAPI + LangGraph supervisor that routes natural-language tasks to specialist AI agents, enforces safety via a mandatory Guardian Node, and produces SHA-256-hashed audit logs written to dual Supabase accounts.

---

## Quick Start

```bash
# 1. Install all dependencies (Python 3.12+ required)
uv sync

# 2. Fill in your environment variables
cp .env  # edit SUPABASE_URL, SUPABASE_URL_2, LANGFUSE keys

# 3. Run the dev server
uv run uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

- **API base:** `http://localhost:8000`
- **Swagger UI:** `http://localhost:8000/docs`

---

## File Map

| File             | Purpose                                                                |
| ---------------- | ---------------------------------------------------------------------- |
| `main.py`        | FastAPI app — rate limiting, 90s timeout, dynamic counters, CORS       |
| `supervisor.py`  | LangGraph `StateGraph`: Router → Workers → Guardian → END              |
| `tools.py`       | Worker logic: Tavily RAG research, Gemini CodeReview, Gemini Nexus     |
| `db.py`          | **Dual-Supabase persistence** — PRIMARY + SECONDARY free-tier accounts |
| `pyproject.toml` | Python dependency manifest (`uv`)                                      |
| `.env`           | API secrets — **never commit**                                         |

---

## Architecture

```
router
  ├──→ research_agent    tools.run_research_task()    (Tavily 5-source RAG + Gemini)
  ├──→ codereview_agent  tools.run_codereview_task()  (Gemini OWASP audit)
  └──→ nexus_node        tools.run_nexus_task()       (Gemini diagnostics)
         └──→ guardian   (PII scrub + SHA-256 hash)
                └──→ db.insert_governance()           (PRIMARY + SECONDARY Supabase)
                       └──→ END
```

### `AgentState` schema

```python
class AgentState(TypedDict):
    messages:            List[BaseMessage]   # conversation history
    next_node:           str                 # router decision
    routed_to:           str                 # agent that ran
    intermediate_output: str                 # raw worker output
    final_output:        str                 # Guardian-cleaned output
    audit_hash:          str                 # SHA-256 of final_output
```

---

## Endpoints

| Method | Path              | Rate limit    | Description                                |
| ------ | ----------------- | ------------- | ------------------------------------------ |
| GET    | `/health`         | —             | Version, Supabase count, task totals       |
| POST   | `/task`           | **10/min/IP** | Submit task (90s timeout, async)           |
| GET    | `/mesh/status`    | —             | **Live** task counters & latency per agent |
| GET    | `/governance/log` | —             | Last 100 audit entries (newest first)      |

---

## Dual-Supabase Setup (`db.py`)

The system writes every governance entry to **both** Supabase accounts simultaneously:

```
db.insert_governance(entry)
  ├─ PRIMARY   → SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
  └─ SECONDARY → SUPABASE_URL_2 + SUPABASE_SERVICE_ROLE_KEY_2
```

- Both must have a `governance_log` table (schema below).
- If PRIMARY fails, SECONDARY still logs — and vice versa.
- If **neither** is configured, the system falls back to the in-memory audit log (last 100 entries).
- Supabase write failures are logged to stdout but **never block** the API response.

### Table schema (run on both projects)

```sql
create table governance_log (
  id             bigint generated always as identity primary key,
  timestamp      timestamptz not null default now(),
  node           text not null,
  task           text,
  result_preview text,
  sha256         text not null,
  routed_to      text,
  latency_ms     integer default 0
);
```

---

## Worker Implementations (`tools.py`)

| Function                | Implementation                            | Status  |
| ----------------------- | ----------------------------------------- | ------- |
| `run_research_task()`   | Tavily (5 sources) RAG + Gemini synthesis | ✅ Live |
| `run_codereview_task()` | Gemini OWASP/CVE structured audit         | ✅ Live |
| `run_nexus_task()`      | Gemini diagnostics + action plan          | ✅ Live |

> All workers fall back gracefully if their external service is unavailable (e.g. missing Tavily key).

---

## Environment Variables

```env
# ── Required ────────────────────────────────────────────────
GOOGLE_API_KEY=          # Gemini 2.0 Flash (Router, Guardian, all workers)
TAVILY_API_KEY=          # Research Agent live web search

# ── Supabase PRIMARY (first free account) ───────────────────
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# ── Supabase SECONDARY (second free account) ────────────────
SUPABASE_URL_2=
SUPABASE_SERVICE_ROLE_KEY_2=

# ── Langfuse (optional trace observability) ──────────────────
LANGFUSE_PUBLIC_KEY=
LANGFUSE_SECRET_KEY=
LANGFUSE_HOST=https://cloud.langfuse.com

# ── CORS (override for production) ──────────────────────────
ALLOWED_ORIGIN=http://localhost:3000
```

---

## Dependencies

| Package                  | Version   | Purpose                         |
| ------------------------ | --------- | ------------------------------- |
| `fastapi`                | ≥ 0.133.1 | Web framework                   |
| `langgraph`              | ≥ 1.0.9   | Supervisor state machine        |
| `langchain-google-genai` | ≥ 4.2.1   | Gemini 2.0 Flash                |
| `langchain-community`    | ≥ 0.4.1   | `TavilySearchResults` wrapper   |
| `tavily-python`          | ≥ 0.5.0   | Tavily search client (explicit) |
| `slowapi`                | ≥ 0.1.9   | Rate limiting (10 req/min/IP)   |
| `langfuse`               | ≥ 3.14.5  | Optional trace observability    |
| `pydantic`               | ≥ 2.12.5  | Request/response models         |
| `uvicorn`                | ≥ 0.41.0  | ASGI server                     |
| `supabase`               | ≥ 2.28.0  | Dual Supabase clients           |
| `python-dotenv`          | ≥ 1.2.1   | `.env` loader                   |

---

## Common Issues

| Issue                          | Fix                                                                           |
| ------------------------------ | ----------------------------------------------------------------------------- |
| `ModuleNotFoundError: slowapi` | Run `uv sync` after updating `pyproject.toml`                                 |
| Tavily returns no results      | Check `TAVILY_API_KEY` in `.env` — research falls back to LLM-only mode       |
| Both Supabase clients fail     | Set `SUPABASE_URL` / `SUPABASE_URL_2` correctly; in-memory fallback is active |
| `API UNREACHABLE` in UI        | Backend must be running on port 8000 before starting the frontend             |
| Rate limit 429 on `/task`      | Wait 60s or increase the `@limiter.limit("10/minute")` in `main.py` for dev   |
