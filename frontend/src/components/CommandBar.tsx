"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  API,
  ICONS,
  SUGGESTIONS,
  TAG_CLASS,
  TaskResponse,
} from "../types/nexus";

interface CommandBarProps {
  onResponse: (r: TaskResponse) => void;
}

export function CommandBar({ onResponse }: CommandBarProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [steps, setSteps] = useState<
    { id: string; label: string; status: "loading" | "done" }[]
  >([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState<number>(0);

  // Live timer effect
  useEffect(() => {
    let interval: any;
    if (loading && startTime) {
      interval = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 100);
    } else {
      setElapsed(0);
    }
    return () => clearInterval(interval);
  }, [loading, startTime]);

  const filtered = query.trim()
    ? SUGGESTIONS.filter((s) =>
        s.label.toLowerCase().includes(query.toLowerCase()),
      )
    : SUGGESTIONS;

  // Cmd+K / Ctrl+K toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => setSelectedIdx(0), [query]);

  const runTask = useCallback(
    async (q: string) => {
      if (!q.trim() || loading) return;
      setOpen(false);
      const start = Date.now();
      setStartTime(start);
      setLoading(true);
      setSteps([
        { id: "init", label: "Connecting to Nexus…", status: "loading" },
      ]);

      try {
        const url = `${API}/task/stream?q=${encodeURIComponent(q)}`;
        const response = await fetch(url);

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(
            errData.detail || `Backend returned ${response.status}`,
          );
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let finalJson: any = null;

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data: ")) continue;

              try {
                const data = JSON.parse(trimmed.slice(6));

                if (data.event === "connected") {
                  setSteps((s) =>
                    s.map((step) =>
                      step.id === "init"
                        ? {
                            ...step,
                            label: data.message || "Nexus Uplink Established",
                            status: "done" as const,
                          }
                        : step,
                    ),
                  );
                } else if (data.event === "start") {
                  setSteps((s) => [
                    ...s.map((i) => ({ ...i, status: "done" as const })),
                    {
                      id: "start",
                      label: data.message || "Pipeline started",
                      status: "loading" as const,
                    },
                  ]);
                } else if (data.event === "ping") {
                  continue;
                } else if (data.event === "routing") {
                  setSteps((s) => [
                    ...s.map((i) => ({ ...i, status: "done" as const })),
                    {
                      id: "routing",
                      label:
                        data.message ||
                        `Routing to ${data.routed_to.toUpperCase()}`,
                      status: "loading",
                    },
                  ]);
                } else if (data.event === "agent_thinking") {
                  setSteps((s) => [
                    ...s.map((i) => ({ ...i, status: "done" as const })),
                    {
                      id: `think_${data.node}`,
                      label:
                        data.message || `${data.node.toUpperCase()} thinking…`,
                      status: "loading",
                    },
                  ]);
                } else if (data.event === "validation_complete") {
                  setSteps((s) => [
                    ...s.map((i) => ({ ...i, status: "done" as const })),
                    {
                      id: "guardian",
                      label: data.message || "Guardian validation successful.",
                      status: "done",
                    },
                  ]);
                  finalJson = data;
                } else if (data.event === "error") {
                  throw new Error(data.detail);
                }
              } catch (e) {
                // If it's a parse error from JSON.parse (partial chunk), we skip it and wait for more buffer.
                // If it's the specific Error thrown above (data.event === "error"), we re-throw it to catch it outside the loop.
                if (
                  e instanceof Error &&
                  e.message.includes("Unexpected token")
                )
                  continue;
                throw e;
              }
            }
          }
        }

        if (finalJson) {
          onResponse({
            response: finalJson.final_output,
            hash: finalJson.hash,
            routed_to: "guardian-node",
            latency_ms: Date.now() - (start || Date.now()),
          });
        } else {
          throw new Error("Pipeline finished without a final response.");
        }
      } catch (err: any) {
        onResponse({
          response: `⚠️ Error: ${err.message || "Unknown stream error"}`,
          hash: "—",
          routed_to: "—",
          latency_ms: 0,
        });
      } finally {
        setLoading(false);
        setStartTime(null);
        setQuery("");
        setSteps([]);
      }
    },
    [loading, onResponse],
  );

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault(); // Prevent accidental form submission
      const target = filtered[selectedIdx]?.label || query;
      runTask(target);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const tagColor = (tag: string) =>
    tag === "research"
      ? { bg: "rgba(99,102,241,0.12)", fg: "#a5b4fc" }
      : tag === "codereview"
      ? { bg: "rgba(245,158,11,0.12)", fg: "#fcd34d" }
      : { bg: "rgba(16,185,129,0.12)", fg: "#34d399" };

  return (
    <>
      {/* ── Trigger button ── */}
      <button
        className="command-trigger"
        onClick={() => setOpen(true)}
        id="cmd-trigger"
        type="button"
      >
        <SearchIcon />
        <span style={{ flex: 1 }}>Orchestrate agents…</span>
        <span className="kbd">⌘</span>
        <span className="kbd">K</span>
      </button>

      {/* ── Command dialog ── */}
      {open && (
        <div className="cmd-overlay" onClick={() => setOpen(false)}>
          <div className="cmd-box" onClick={(e) => e.stopPropagation()}>
            {/* Input row */}
            <div className="cmd-input-wrap">
              <SearchIcon dim />
              <input
                className="cmd-input"
                autoFocus
                placeholder="Type a command or search…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKey}
              />
              {loading && <div className="spinner" />}
            </div>

            {/* Suggestions */}
            {filtered.length > 0 && (
              <>
                <p className="cmd-section-label">Suggestions</p>
                {filtered.slice(0, 6).map((s, i) => {
                  const c = tagColor(s.tag);
                  return (
                    <div
                      key={s.label}
                      className={`cmd-item${
                        i === selectedIdx ? " selected" : ""
                      }`}
                      onMouseEnter={() => setSelectedIdx(i)}
                      onClick={() => runTask(s.label)}
                    >
                      <div
                        className="cmd-item-icon"
                        style={{ background: c.bg, color: c.fg }}
                      >
                        {ICONS[s.icon] || "◈"}
                      </div>
                      <span style={{ flex: 1 }}>{s.label}</span>
                      <span className={`tag ${TAG_CLASS[s.tag]}`}>{s.tag}</span>
                    </div>
                  );
                })}
              </>
            )}

            {/* Custom query row */}
            {query.trim() &&
              !filtered.find(
                (f) => f.label.toLowerCase() === query.toLowerCase(),
              ) && (
                <>
                  <div
                    style={{
                      height: 1,
                      background: "rgba(16,185,129,0.08)",
                      margin: "4px 0",
                    }}
                  />
                  <div
                    className="cmd-item"
                    style={{ color: "#10b981" }}
                    onClick={() => runTask(query)}
                  >
                    <div
                      className="cmd-item-icon"
                      style={{
                        background: "rgba(16,185,129,0.12)",
                        color: "#34d399",
                      }}
                    >
                      ⚡
                    </div>
                    <span>
                      Run:{" "}
                      <strong style={{ color: "#f0fdf4" }}>
                        &quot;{query}&quot;
                      </strong>
                    </span>
                  </div>
                </>
              )}

            <div className="cmd-footer">
              <span>↑↓ navigate · Enter execute · Esc close</span>
              <span style={{ color: "rgba(16,185,129,0.5)" }}>
                Nexus Supervisor v4.5.3
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Loading overlay ── */}
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(2,10,24,0.85)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="nexus-card glow-emerald"
            style={{ width: 440, padding: "32px", textAlign: "left" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 24,
              }}
            >
              <div className="spinner" style={{ width: 24, height: 24 }} />
              <div>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#f0fdf4",
                    margin: 0,
                  }}
                >
                  System Orchestration
                </h3>
                <p
                  style={{ fontSize: 11, color: "#6b7280", margin: "4px 0 0" }}
                >
                  Orchestrating through Nexus Supervisor Protocol V4
                </p>
              </div>
              <div
                style={{
                  marginLeft: "auto",
                  textAlign: "right",
                  fontFamily: "'Fira Code', monospace",
                }}
              >
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#34d399",
                    transition: "color 0.3s",
                  }}
                >
                  {(elapsed / 1000).toFixed(1)}s
                </div>
                <div
                  style={{
                    fontSize: 9,
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Processing
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {steps.map((step) => (
                <div
                  key={step.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    opacity: step.status === "done" ? 0.6 : 1,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background:
                        step.status === "done" ? "#10b981" : "#34d399",
                      boxShadow:
                        step.status === "loading" ? "0 0 10px #34d399" : "none",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: "'Fira Code', monospace",
                      color: step.status === "done" ? "#9ca3af" : "#34d399",
                    }}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 32,
                paddingTop: 16,
                borderTop: "1px solid rgba(16,185,129,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  color: "#4b5563",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                v4.5.3-LIVE
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Internal icon ──────────────────────────────────────────────────────────────

function SearchIcon({ dim }: { dim?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        color: dim ? "rgba(16,185,129,0.5)" : "rgba(16,185,129,0.6)",
        flexShrink: 0,
      }}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
