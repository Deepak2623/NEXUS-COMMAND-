# Nexus Project Documentation

Nexus is a high-performance Agentic OS built using LangGraph and Gemini 2.0 Flash.

## Architecture

- **Router**: Uses Groq (Llama 3.3 70B) for sub-100ms routing.
- **Workers**: Research (Tavily), CodeReview (Custom), Salesforce (MCP).
- **Guardian**: Safety layer that hashes every output with SHA-256.

## Dual-Supabase

Nexus writes to two separate Supabase instances for 100% audit redundancy.

## SSE Streaming

Uses "Ironclad SSE" for real-time progress updates to the frontend dashboard.
