"use client";

import React, { useState, Suspense, lazy } from "react";

import {
  VERSION,
  ROUTED_TAG,
  TaskResponse,
  formatResponse,
} from "../types/nexus";
import { MeshCard, MeshCardSkeleton } from "../components/MeshCard";
import { CommandBar } from "../components/CommandBar";
import { useNexusDashboard } from "../hooks/useNexusDashboard";
import { MeshGraph } from "../components/MeshGraph";

// ── Code-split heavy components (lazy-loaded post-paint) ─────────────────────
const VirtualGovernanceTable = lazy(() =>
  import("../components/GovernanceTable").then((m) => ({
    default: m.VirtualGovernanceTable,
  })),
);

// ── Tab skeleton shown until VirtualGovernanceTable chunk loads ──────────────
function AuditSkeleton() {
  return (
    <div
      style={{
        padding: "40px 20px",
        textAlign: "center",
        color: "#4b5563",
        fontSize: 12,
      }}
    >
      Loading audit chain…
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────

export default function Home() {
  const {
    agents,
    auditLog,
    usage,
    apiLive,
    meshLoading,
    isHydrated,
    optimisticTaskComplete,
    refresh,
  } = useNexusDashboard();

  const [response, setResponse] = useState<TaskResponse | null>(null);
  const [activeTab, setActiveTab] = useState<"output" | "audit" | "graph">(
    "output",
  );

  // ── Task response handler ──────────────────────────────
  const handleResponse = (r: TaskResponse) => {
    setResponse(r);
    setActiveTab("output");
    // Optimistic: instantly flash the routed agent's counter up
    if (r.routed_to && r.routed_to !== "—") {
      optimisticTaskComplete(r.routed_to, r.latency_ms);
    }
  };

  const routedLabel = (s: string) =>
    s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // ─────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────

  return (
    <main className="relative min-h-screen flex flex-col">
      <div className="grid-bg" />
      <div className="scanlines" />

      {/* ── Top Nav ─────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 glass border-b border-white/5 px-4 md:px-8 flex items-center h-16 gap-4 md:gap-8 overflow-x-auto no-scrollbar">
        {/* Logo */}
        <div className="flex items-center gap-3 flex-none">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-sm shadow-[0_0_15px_var(--primary-glow)]">
            ⬡
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold tracking-tight text-white leading-tight">
              NEXUS
            </p>
            <p className="text-[10px] text-text-secondary tracking-[0.15em] uppercase font-medium">
              Command Center
            </p>
          </div>
        </div>

        {/* API status badge */}
        <div className="flex-1 flex justify-center items-center gap-2 md:gap-3 whitespace-nowrap">
          <span
            className={`status-dot ${
              apiLive === null ? "idle" : apiLive ? "online" : "offline"
            }`}
          />
          <span className="text-[10px] md:text-xs text-text-secondary font-mono">
            {apiLive === null
              ? "Connecting…"
              : apiLive
              ? `SYSTEM READY — 8000`
              : "NODE UNREACHABLE"}
          </span>
        </div>

        {/* Right badges */}
        <div className="flex gap-2 items-center flex-none">
          {/* Usage indicator (shows when data is loaded) */}
          {usage && (
            <span className="tag px-2 md:px-3 py-1 bg-primary/5 border border-primary/10 text-primary/60 font-medium hidden xs:inline-flex">
              {usage.task_count} tasks
            </span>
          )}
          <span className="tag px-2 md:px-3 py-1 bg-white/5 border border-white/10 text-text-secondary font-medium hidden md:inline-flex">
            GOVERNANCE PROTOCOL V4
          </span>
          <span className="tag px-2 md:px-3 py-1 bg-primary/10 border border-primary/20 text-primary font-medium">
            v{VERSION}
          </span>
        </div>
      </nav>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 py-8 md:py-14 flex-1">
        {/* Hero header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <span className="status-dot online" />
            <span className="text-[10px] text-primary font-bold tracking-[0.1em] uppercase">
              Orchestrator Active · Gemini 2.0 Flash
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.05]">
            Nexus Command Center
          </h1>

          <p className="text-sm md:text-base text-[#6b7280] max-w-[540px] mx-auto mb-8 leading-relaxed">
            Orchestrate Research, CodeReview, and Nexus-Node agents via the
            Supervisor pattern. Every output is Guardian-validated and SHA-256
            committed.
          </p>

          <CommandBar onResponse={handleResponse} />
        </div>

        {/* ── Agent Mesh Grid ──────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18, color: "#10b981" }}>◈</span>
              <h2
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  margin: 0,
                }}
              >
                Agent Mesh — Live Status
              </h2>
            </div>
            {/* Realtime refresh button */}
            <button
              onClick={refresh}
              style={{
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.15)",
                borderRadius: 8,
                padding: "5px 12px",
                fontSize: 11,
                color: "#34d399",
                cursor: "pointer",
                fontFamily: "ui-monospace, monospace",
                transition: "all 0.2s",
              }}
            >
              ↻ Refresh
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Show skeletons until first hydration, then real cards */}
            {!isHydrated || meshLoading
              ? [...Array(4)].map((_, i) => <MeshCardSkeleton key={i} />)
              : agents.length > 0
              ? agents.map((a) => <MeshCard key={a.id} agent={a} />)
              : [...Array(4)].map((_, i) => <MeshCardSkeleton key={i} />)}
          </div>
        </section>

        {/* ── Response / Audit tabs ────────────────────── */}
        {(response || auditLog.length > 0) && (
          <section>
            {/* Tab bar */}
            <div className="flex gap-1 mb-4 bg-[#060e1a]/80 rounded-xl p-1 w-fit border border-[#10b981]/10 overflow-x-auto no-scrollbar max-w-full">
              {(["output", "audit", "graph"] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 md:px-6 py-2 rounded-lg border-none cursor-pointer text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === key
                      ? "bg-[#10b981]/15 text-[#34d399]"
                      : "bg-transparent text-[#6b7280]"
                  }`}
                >
                  {key === "output"
                    ? "Output"
                    : key === "audit"
                    ? `Audit (${auditLog.length})`
                    : "Graph"}
                </button>
              ))}
            </div>

            {/* Output panel */}
            {activeTab === "output" && response && (
              <div className="response-card">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:px-6 md:py-4 border-b border-[#10b981]/10 bg-[#10b981]/5 gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm text-[#10b981]">⬡</span>
                    <span className="text-[10px] font-bold text-[#34d399] tracking-wider font-mono">
                      SUPERVISOR OUTPUT
                    </span>
                    {response.routed_to !== "—" && (
                      <span
                        className={`tag text-[9px] ${
                          ROUTED_TAG[response.routed_to] || "tag-emerald"
                        }`}
                      >
                        {routedLabel(response.routed_to)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-4">
                    {response.latency_ms > 0 && (
                      <span className="text-[10px] text-[#6b7280] font-mono">
                        {response.latency_ms}ms
                      </span>
                    )}
                    <span className="tag tag-emerald text-[9px]">
                      ✓ Verified
                    </span>
                  </div>
                </div>

                {/* Response body */}
                <div
                  className="response-body"
                  dangerouslySetInnerHTML={{
                    __html: formatResponse(response.response),
                  }}
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:px-6 md:py-3 border-t border-[#10b981]/8 gap-4">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-[10px] text-[#6b7280] font-mono flex-none">
                      SHA-256
                    </span>
                    <span
                      className="font-mono truncate text-[10px] text-[#10b981]/70"
                      title={response.hash}
                    >
                      {response.hash || "—"}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-[10px] text-[#4b5563] font-mono">
                    {response.langfuse_trace && (
                      <a
                        href={`https://cloud.langfuse.com/project/${process.env.NEXT_PUBLIC_LANGFUSE_PROJECT_ID}/traces/${response.langfuse_trace}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1.5"
                      >
                        ◉ VIEW TRACE
                      </a>
                    )}
                    <span className="hidden xs:inline">Nexus Protocol v4</span>
                  </div>
                </div>
              </div>
            )}
            {/* Graph panel */}
            {activeTab === "graph" && (
              <div className="nexus-card" style={{ padding: 24 }}>
                <MeshGraph />
              </div>
            )}

            {/* Audit panel — code-split & virtualized */}
            {activeTab === "audit" && (
              <div
                className="nexus-card"
                style={{ padding: 0, overflow: "hidden" }}
              >
                <div
                  style={{
                    padding: "16px 20px",
                    borderBottom: "1px solid rgba(16,185,129,0.08)",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span style={{ color: "#8b5cf6" }}>⬧</span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#a78bfa",
                      fontFamily: "Fira Code, monospace",
                      letterSpacing: "0.05em",
                    }}
                  >
                    GOVERNANCE AUDIT CHAIN
                  </span>
                  <span
                    className="tag"
                    style={{
                      marginLeft: "auto",
                      background: "rgba(139,92,246,0.1)",
                      color: "#c4b5fd",
                      borderColor: "rgba(139,92,246,0.2)",
                    }}
                  >
                    SHA-256 Immutable
                  </span>
                  {/* Realtime indicator */}
                  <span
                    style={{
                      fontSize: 9,
                      color: "#10b981",
                      fontFamily: "monospace",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <span className="status-dot online" />
                    REALTIME
                  </span>
                </div>

                {/* Lazy-loaded, virtualized table */}
                <Suspense fallback={<AuditSkeleton />}>
                  <VirtualGovernanceTable entries={auditLog} maxHeight={420} />
                </Suspense>
              </div>
            )}
          </section>
        )}
      </div>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-[#10b981]/8 px-4 md:px-8 py-6 md:py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-[#4b5563] font-mono bg-[#020712]/50 backdrop-blur-xl">
        <span className="text-center md:text-left">
          NEXUS COMMAND CENTER © 2026 · Supervisor Protocol v{VERSION}
        </span>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <span>LangGraph</span>
          <span>Gemini 2.0 Flash</span>
          <span className="hidden sm:inline">Dual-Supabase</span>
          <span className="text-[#34d399]">● LIVE</span>
        </div>
      </footer>
    </main>
  );
}
