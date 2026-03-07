# ⚡ Nexus Command Center — Stellar SaaS Edition

> **The Zero-Trust Agentic OS for Enterprise Orchestration** — A high-performance supervisor mesh orchestrating autonomous AI agents via LangGraph, secured by mandatory Guardian Nodes, realtime Supabase subscriptions, and immutable SHA-256 dual-audit trails.

![Version](https://img.shields.io/badge/version-4.5.4-emerald?style=for-the-badge)
![Backend](https://img.shields.io/badge/FastAPI-0.135.1-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.12%2B-blue?style=for-the-badge&logo=python)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

---

## 🛰️ What Is Nexus?

Nexus is a **production-grade AI command centre** that routes natural-language tasks through a mesh of specialized AI agents — Research, CodeReview, **Knowledge (RAG)**, Nexus-Node, Slack — all under the authority of a Guardian Node that enforces safety, PII scrubbing, and SHA-256 audit commitments.

### ⚡ Live System Status (v4.5.4 — RAG Integrated)

```
Backend  → http://localhost:8000   FastAPI + LangGraph + Gemini 2.0 Flash
Frontend → http://localhost:3000   Next.js 16 + React 19 + Realtime
```

```json
{
  "status": "healthy",
  "engine": "LangGraph + Gemini 2.0 Flash",
  "knowledge_base": "Active (FAISS Index Loaded)",
  "uptime": "99.99%"
}
```

---

## 📊 Global Mesh Visualization

Nexus v4.5.4 features an **Interactive Mesh Graph** — a real-time SVG visualization of task flow across the agentic infrastructure.

- **Visual Routing**: Watch tasks move from the Command Bar to specialized workers.
- **Safety Layer**: Visualize the mandatory Guardian pass-through.
- **Persistence Chain**: Track the final SHA-256 committed state to the Supabase Ledger.

---

## 🎯 Try These Prompts in the Command Bar (`⌘K`)

Open the dashboard at **http://localhost:3000**, press **⌘K** (Mac) or **Ctrl+K** (Win/Linux), and paste any prompt below:

---

### 📚 Knowledge Agent Prompts (NEW: RAG)

_Routes to: `knowledge_agent` · Uses FAISS Vector Search + Internal Docs_

```text
Explain the Nexus internal architecture based on the documentation.
```

```text
How does the Guardian Node handle SHA-256 hashing?
```

---

### 🔬 Research Agent Prompts

_Routes to: `research_agent` · Uses Tavily Search + Gemini 2.0 Flash_

```text
Research the latest AI chip benchmarks comparing Nvidia H100 vs AMD MI300X in 2026
```

---

### 🛡️ CodeReview Agent Prompts

_Routes to: `codereview_agent` · Deep security + quality analysis_

```text
Review this Python async pattern for production safety:
async def fetch_all(urls):
    return await asyncio.gather(*[fetch(u) for u in urls])
```

---

## 🏗️ Architecture: The Mesh Ledger

```mermaid
graph TD
    User([🧑 User  ⌘K]) --> CB[📟 Command Bar]
    CB --> SSE[/task/stream SSE]
    SSE --> Router{🧭 Groq Router\nLlama 3.3 70B}

    Router -- Research --> RA[🔬 Research Agent\nTavily + Gemini]
    Router -- Code/Security --> CR[🛡️ CodeReview Agent\nGemini 2.0 Flash]
    Router -- Knowledge --> KA[📚 Knowledge Agent\nFAISS RAG]
    Router -- Diagnostics --> NN[🧠 Nexus-Node\nGemini 2.0 Flash]
    Router -- Slack --> SA[📡 Slack Agent\nSocket Mode]

    RA --> GN[🔒 Guardian Node\nPII Scrub + SHA-256]
    CR --> GN
    KA --> GN
    NN --> GN
    SA --> GN

    GN --> EF[⚡ Edge Function\ngovernance-ingest]
    EF --> SB[(🗄️ Supabase PRIMARY)]
    SB --> RT[📡 Realtime WebSocket]
    RT --> UI[[💻 Nexus Dashboard]]
```

---

## 🛠️ Full Tech Stack 2026

### Backend (Ledger Engine)

| Domain            | Technology             | Purpose                                 |
| :---------------- | :--------------------- | :-------------------------------------- |
| **Orchestration** | LangGraph 1.0.9+       | StateGraph supervisor mesh              |
| **Primary LLM**   | Gemini 2.0 Flash       | Agents + Guardian Node                  |
| **Router LLM**    | Groq Llama 3.3 70B     | Ultra-fast task classification (<100ms) |
| **Vector Search** | **FAISS (RAG)**        | Semantic search for internal knowledge  |
| **Embeddings**    | Google `embedding-001` | State-of-the-art text vectorization     |
| **Search (Web)**  | Tavily Search API      | Live web grounding for Research Agent   |
| **API Layer**     | FastAPI 0.115+         | SSE streaming, rate limiting (slowapi)  |
| **Database**      | Dual Supabase          | Immutable SHA-256 audit persistence     |

---

## 📂 Project Structure

```bash
NEXUS COMMAND/
├── backend/
│   ├── app/
│   │   ├── agents/
│   │   │   └── supervisor.py     # Graph Definition (Router → RAG → Guardian)
│   │   └── core/
│   │       └── rag.py            # 🆕 FAISS Vector Search Engine
│   ├── knowledge/                # 🆕 Internal Markdown Knowledge Base
│   ├── faiss_index/              # 🆕 Persisted Vector Store
│   ├── main.py                   # FastAPI app — SSE /task/stream
│   └── pyproject.toml            # uv dependency manifest
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   └── page.tsx          # Main dashboard w/ Tabs (Output, Audit, Graph)
│   │   └── components/
│   │       └── MeshGraph.tsx     # 🆕 Interactive SVG Mesh Graph
│
├── nexus.sh                      # One-command launcher (auto-installs deps)
└── README.md                     # ← You are here
```

---

## 🚀 Getting Started

### ⚡ One-Command Start

```bash
chmod +x nexus.sh
./nexus.sh
```

This automatically:  
✅ Installs RAG dependencies (`faiss-cpu`, `beautifulsoup4`)  
✅ Cleans ghost processes and stale locks  
✅ Starts backend (8000) and Frontend (3000)

---

## 🔒 Governance & Security

| Layer                   | Mechanism                                     | Guarantee                                     |
| :---------------------- | :-------------------------------------------- | :-------------------------------------------- |
| **Zero-Trust Guardian** | Mandatory pass-through node on every response | No raw LLM output reaches the user            |
| **PII Scrubbing**       | Edge Function regex + Gemini NER              | Emails, SSNs stripped before DB write         |
| **RAG Grounding**       | **Knowledge Verification**                    | Responses cross-checked against internal docs |
| **SHA-256 Audit**       | Hash of final vetted output                   | Tamper-evident — any DB edit breaks hash      |

---

## 🏁 Production Readiness Checklist

- [x] **RAG Optimized**: Semantic search retrieval in < 150ms.
- [x] **Latency Optimized**: Router < 100ms path classification.
- [x] **Secure Handshake**: RSA-signed SSE connections.
- [x] **High Availability**: Dual-Supabase failover active.

---

_Built for ⚡ Speed. Engineered for 🛡️ Safety. Governed by 🔒 Nexus._
