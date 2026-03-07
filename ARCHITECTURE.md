# Nexus Command Center Architecture

## 1. What is Nexus Command Center?

Nexus is a production-grade **Agentic Operating System** designed for enterprise orchestration. It allows users to control a mesh of autonomous AI agents through a single Command Bar (or via Slack). Engineered for velocity, security, and reliability, it routes natural-language tasks through specialized AI agents while enforcing zero-trust safety layers.

## 2. Core Operational Flow & What It Does

The system uses a **Supervisor** model built on **LangGraph**. When a command is entered:

- **🧭 ROUTER:** A high-speed **Llama 3.3 model (via Groq)** classifies the task in under 100ms.
- **🔬 WORKERS:** The task is routed to specialized AI agents based on the classification:
  - **Research Agent:** Uses Tavily Search and Gemini 2.0 Flash for finding current information.
  - **CodeReview Agent:** Performs deep security and quality analysis.
  - **Knowledge Agent:** Uses FAISS Vector Search (RAG) against internal documentation.
  - **Nexus-Node:** Handles diagnostic queries.
  - **Slack Agent:** Two-way Socket Mode bridge for remote orchestration.
- **🔒 GUARDIAN NODE:** Every agent response mandates a pass-through a strict zero-trust safety layer. Here, PII (Personally Identifiable Information like emails/SSNs) is scrubbed, and an immutable SHA-256 digital fingerprint is generated.
- **⚡ STREAMING:** "Ironclad SSE" streams the progress to the UI frontend with a 500ms heartbeat, ensuring the connection stays alive even during deep reasoning phases.
- **🗄️ PERSISTENCE:** Data is committed via Dual-Supabase (Primary + Secondary Redundancy) to produce a 100% uptime audit trail.

## 3. The Architecture Diagram

![Nexus Architecture Conceptual Diagram](./architecture_diagram.png)

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

## 4. Key Components Map

| Domain                      | Technology           | Purpose                                                            |
| --------------------------- | -------------------- | ------------------------------------------------------------------ |
| **Backend & Orchestration** | FastAPI, LangGraph   | StateGraph supervisor mesh and SSE streaming.                      |
| **Frontend**                | Next.js 16, React 19 | Framer Motion (Glassmorphism UI), Realtime interactive mesh graph. |
| **Primary LLM**             | Gemini 2.0 Flash     | Powers internal reasoning for specialized Agents + Guardian Node.  |
| **Router LLM**              | Groq Llama 3.3 70B   | Ultra-fast classification under 100ms.                             |
| **Vector Search (RAG)**     | FAISS                | Semantic search capabilities for internal Knowledge Base.          |
| **Data & Persistence**      | Dual Supabase        | Redundant storage ensuring an immutable SHA-256 ledger.            |
