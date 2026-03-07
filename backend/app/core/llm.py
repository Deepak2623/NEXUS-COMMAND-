import os
from typing import Dict, List, Any
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage, BaseMessage
from dotenv import load_dotenv

load_dotenv()

# ─── Global Model Pool ───────────────────────────────────────────────────────
_models: Dict[str, Any] = {}

def get_model(provider: str, model_name: str, timeout: int = 12):
    """Cached accessor for LLM instances to avoid overhead."""
    key = f"{provider}:{model_name}:{timeout}"
    if key not in _models:
        if provider == "groq":
            _models[key] = ChatOpenAI(
                model=model_name,
                api_key=os.getenv("GROQ_API_KEY"),
                base_url="https://api.groq.com/openai/v1",
                temperature=0,
                timeout=timeout
            )
        else:
            _models[key] = ChatGoogleGenerativeAI(
                model=model_name,
                temperature=0,
                timeout=timeout
            )
    return _models[key]

def safe_invoke(node_name: str, system_prompt: str, human_input: str, prefer_groq: bool = False, langfuse_handler=None):
    """Centralized high-speed LLM invocation with error-handling and fallback."""
    callbacks = [langfuse_handler] if langfuse_handler else []
    
    # Fast path: Groq (Reduced timeout to 4s for ultra-fast nodes)
    if prefer_groq and os.getenv("GROQ_API_KEY"):
        try:
            g = get_model("groq", "llama-3.3-70b-versatile", timeout=4)
            return g.invoke([SystemMessage(content=system_prompt), HumanMessage(content=human_input)])
        except Exception as e:
            print(f"DEBUG: {node_name} Groq failed: {e}")

    # Standard path: Gemini (10s timeout is safer for complex tasks)
    try:
        m = get_model("gemini", "gemini-2.0-flash", timeout=10)
        return m.invoke(
            [SystemMessage(content=system_prompt), HumanMessage(content=human_input)],
            config={"callbacks": callbacks}
        )
    except Exception as e:
        print(f"DEBUG: {node_name} Gemini failed: {e}")
        # Last-ditch: Groq fallback (standard 12s timeout here)
        if not prefer_groq and os.getenv("GROQ_API_KEY"):
            try:
                g = get_model("groq", "llama-3.3-70b-versatile", timeout=12)
                return g.invoke([SystemMessage(content=system_prompt), HumanMessage(content=human_input)])
            except Exception:
                pass
        raise e
