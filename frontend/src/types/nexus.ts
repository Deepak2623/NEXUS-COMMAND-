// ─────────────────────────────────────────────────────────────────────────────
// src/types/nexus.ts — Shared types, constants, and config
// ─────────────────────────────────────────────────────────────────────────────

export const API = process.env.NEXT_PUBLIC_API_URL ?? "/api";
export const VERSION = "4.5.1";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AgentStatus {
  id: string;
  name: string;
  status: string;
  load: string;
  tasks_completed: number;
  latency_ms: number;
  icon: string;
}

export interface TaskResponse {
  response: string;
  hash: string;
  routed_to: string;
  latency_ms: number;
  langfuse_trace?: string | null;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  node: string;
  task_preview: string;
  sha256: string;
  status: string;
  latency_ms?: number;
  routed_to?: string;
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

export const ICONS: Record<string, string> = {
  cpu: "⬡",
  globe: "◉",
  shield: "⬟",
  lock: "⬧",
  search: "⌖",
  code: "⌥",
  zap: "⚡",
  check: "✓",
};

// ─── Agent colour palette ─────────────────────────────────────────────────────

export const AGENT_COLORS: Record<string, string> = {
  "nexus-node": "#10b981",
  "research-agent": "#6366f1",
  "codereview-agent": "#f59e0b",
  "guardian-node": "#8b5cf6",
};

export const AGENT_BG: Record<string, string> = {
  "nexus-node": "rgba(16,185,129,0.08)",
  "research-agent": "rgba(99,102,241,0.08)",
  "codereview-agent": "rgba(245,158,11,0.08)",
  "guardian-node": "rgba(139,92,246,0.08)",
};

// ─── Command palette suggestions ─────────────────────────────────────────────

export interface Suggestion {
  label: string;
  icon: string;
  tag: "research" | "codereview" | "nexus";
}

export const SUGGESTIONS: Suggestion[] = [
  {
    label: "Research Nvidia AI chip roadmap for 2026",
    icon: "globe",
    tag: "research",
  },
  {
    label: "Research latest LLM benchmark results in 2026",
    icon: "globe",
    tag: "research",
  },
  {
    label: "Audit this repository for security vulnerabilities",
    icon: "shield",
    tag: "codereview",
  },
  {
    label: "Review Python async patterns for production",
    icon: "code",
    tag: "codereview",
  },
  {
    label: "Check agent mesh health and diagnostics",
    icon: "cpu",
    tag: "nexus",
  },
  {
    label: "Diagnose system performance bottlenecks",
    icon: "zap",
    tag: "nexus",
  },
];

// ─── Tag CSS class map ────────────────────────────────────────────────────────

export const TAG_CLASS: Record<string, string> = {
  research: "tag-indigo",
  codereview: "tag-amber",
  nexus: "tag-emerald",
};

export const ROUTED_TAG: Record<string, string> = {
  research_agent: "tag-indigo",
  codereview_agent: "tag-amber",
  nexus_node: "tag-emerald",
};

// ─── Simple markdown formatter (no external deps) ────────────────────────────
// Converts ## headings, **bold**, and `code` to HTML for the response panel.

export function formatResponse(text: string): string {
  return text
    .replace(
      /^## (.+)$/gm,
      '<p style="color:#34d399;font-size:12px;font-weight:700;letter-spacing:0.06em;margin:16px 0 6px;text-transform:uppercase">$1</p>',
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e5e7eb">$1</strong>')
    .replace(
      /`([^`]+)`/g,
      "<code style=\"background:rgba(16,185,129,0.1);border-radius:4px;padding:2px 6px;font-family:'Fira Code',monospace;font-size:12px;color:#34d399\">$1</code>",
    )
    .replace(
      /^(#{1} )(.+)$/gm,
      '<p style="color:#f0fdf4;font-size:14px;font-weight:700;margin:12px 0 4px">$2</p>',
    );
}
