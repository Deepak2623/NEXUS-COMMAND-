"""config.py — Modular Configuration Hub"""
from __future__ import annotations
import os
from functools import lru_cache
from pydantic import Field, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # ── LLM ──────────────────────────────────────────────────────────────────
    groq_api_key: SecretStr = Field(..., alias="GROQ_API_KEY")
    google_api_key: SecretStr = Field(..., alias="GOOGLE_API_KEY")

    # ── MCP tokens ───────────────────────────────────────────────────────────
    github_mcp_token: SecretStr = Field(..., alias="GITHUB_TOKEN")
    slack_mcp_bot_token: SecretStr = Field(..., alias="SLACK_BOT_TOKEN")
    salesforce_mcp_client_id: SecretStr = Field(..., alias="SALESFORCE_MCP_CLIENT_ID")
    salesforce_mcp_client_secret: SecretStr = Field(..., alias="SALESFORCE_MCP_CLIENT_SECRET")
    salesforce_mcp_instance_url: str = Field(..., alias="SALESFORCE_INSTANCE_URL")

    # ── Supabase ──────────────────────────────────────────────────────────────
    supabase_url: str = Field(..., alias="SUPABASE_URL")
    supabase_service_key: SecretStr = Field(..., alias="SUPABASE_SERVICE_ROLE_KEY")

@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
