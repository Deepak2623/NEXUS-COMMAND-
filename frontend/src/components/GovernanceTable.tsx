"use client";

/**
 * GovernanceTable.tsx — Virtualized, performance-optimized audit log renderer
 * ─────────────────────────────────────────────────────────────────────────────
 * Rendering 1000 rows in a standard <table> causes DOM bloat and scroll jank.
 * This component uses a windowed/virtualized approach:
 *  - Only renders the rows currently in the viewport + a small overscan buffer
 *  - Uses CSS `content-visibility: auto` for GPU-hint based off-screen skipping
 *  - Each row is a fixed 44px height for exact position math
 *  - New rows animate in with a 300ms slide-fade
 *
 * Usage:
 *   <VirtualGovernanceTable entries={auditLog} maxHeight={480} />
 */

import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import type { AuditEntry } from "../types/nexus";

// ─── Constants ────────────────────────────────────────────────────────────────
const ROW_HEIGHT = 44; // px — must match CSS
const OVERSCAN = 5; // extra rows rendered above/below viewport
const MAX_ROWS = 100; // cap the list to prevent memory bloat

// ─── Row (memoized to prevent re-renders on scroll) ───────────────────────────
const GovernanceRow = memo(function GovernanceRow({
  entry,
  isNew,
}: {
  entry: AuditEntry;
  isNew: boolean;
}) {
  const timeStr = (() => {
    try {
      return new Date(entry.timestamp).toLocaleTimeString();
    } catch {
      return entry.timestamp ?? "—";
    }
  })();

  const nodeColor =
    entry.node === "guardian"
      ? {
          bg: "rgba(139,92,246,0.1)",
          fg: "#c4b5fd",
          border: "rgba(139,92,246,0.2)",
        }
      : entry.node?.includes("research")
      ? {
          bg: "rgba(99,102,241,0.1)",
          fg: "#a5b4fc",
          border: "rgba(99,102,241,0.2)",
        }
      : entry.node?.includes("code")
      ? {
          bg: "rgba(245,158,11,0.1)",
          fg: "#fcd34d",
          border: "rgba(245,158,11,0.2)",
        }
      : {
          bg: "rgba(16,185,129,0.1)",
          fg: "#34d399",
          border: "rgba(16,185,129,0.2)",
        };

  return (
    <div
      className={`gov-row${isNew ? " gov-row--new" : ""}`}
      style={{ height: ROW_HEIGHT }}
    >
      {/* Timestamp */}
      <div className="gov-cell gov-cell--mono gov-cell--time">{timeStr}</div>

      {/* Node badge */}
      <div className="gov-cell">
        <span
          className="gov-badge"
          style={{
            background: nodeColor.bg,
            color: nodeColor.fg,
            borderColor: nodeColor.border,
          }}
        >
          {entry.node ?? "—"}
        </span>
      </div>

      {/* Task preview */}
      <div className="gov-cell gov-cell--task" title={entry.task_preview}>
        {entry.task_preview ?? "—"}
      </div>

      {/* SHA-256 (truncated) */}
      <div
        className="gov-cell gov-cell--mono gov-cell--hash"
        title={entry.sha256}
      >
        {entry.sha256 ? `${entry.sha256.slice(0, 14)}…` : "—"}
      </div>

      {/* Latency */}
      <div className="gov-cell gov-cell--mono gov-cell--right">
        {entry.latency_ms ? `${entry.latency_ms}ms` : "—"}
      </div>

      {/* Status */}
      <div className="gov-cell gov-cell--right">
        <span
          className="gov-badge"
          style={{
            background: "rgba(16,185,129,0.1)",
            color: "#34d399",
            borderColor: "rgba(16,185,129,0.2)",
          }}
        >
          ✓ {entry.status ?? "verified"}
        </span>
      </div>
    </div>
  );
});

// ─── Virtualized container ────────────────────────────────────────────────────
export function VirtualGovernanceTable({
  entries,
  maxHeight = 480,
}: {
  entries: AuditEntry[];
  maxHeight?: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const prevIdsRef = useRef<Set<string>>(new Set());

  const capped = entries.slice(0, MAX_ROWS);
  const totalH = capped.length * ROW_HEIGHT;
  const visibleRows = Math.ceil(maxHeight / ROW_HEIGHT);
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const endIndex = Math.min(
    capped.length - 1,
    startIndex + visibleRows + OVERSCAN * 2,
  );

  // Detect new rows (by id) for entrance animation
  useEffect(() => {
    const currentIds = new Set(capped.map((e) => e.id));
    const fresh: Set<string> = new Set();
    currentIds.forEach((id) => {
      if (!prevIdsRef.current.has(id)) fresh.add(id);
    });
    if (fresh.size > 0) {
      setNewIds(fresh);
      const t = setTimeout(() => setNewIds(new Set()), 800);
      prevIdsRef.current = currentIds;
      return () => clearTimeout(t);
    }
    prevIdsRef.current = currentIds;
  }, [capped]);

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop((e.target as HTMLDivElement).scrollTop);
  }, []);

  if (!entries.length) {
    return (
      <div className="gov-empty">
        <div className="gov-empty-icon">⬧</div>
        <p>No audit entries yet.</p>
        <span>Run a task to populate the governance chain.</span>
      </div>
    );
  }

  return (
    <div className="gov-table-wrap">
      {/* ── Sticky header ── */}
      <div className="gov-header">
        {["Timestamp", "Node", "Task", "SHA-256", "Latency", "Status"].map(
          (h) => (
            <div key={h} className="gov-header-cell">
              {h}
            </div>
          ),
        )}
      </div>

      {/* ── Virtualized scroll body ── */}
      <div
        ref={scrollRef}
        className="gov-scroll"
        style={{ height: maxHeight, overflowY: "auto" }}
        onScroll={onScroll}
      >
        {/* Phantom spacer for total scroll height */}
        <div style={{ position: "relative", height: totalH }}>
          {/* Render only the visible window */}
          {capped.slice(startIndex, endIndex + 1).map((entry, i) => (
            <div
              key={entry.id}
              style={{
                position: "absolute",
                top: (startIndex + i) * ROW_HEIGHT,
                left: 0,
                right: 0,
                contentVisibility: "auto", // GPU paint skip for off-screen
                containIntrinsicSize: `0 ${ROW_HEIGHT}px`,
              }}
            >
              <GovernanceRow entry={entry} isNew={newIds.has(entry.id)} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Row count crumb ── */}
      <div className="gov-footer-bar">
        <span>
          {entries.length} entries · Last sync:{" "}
          {new Date().toLocaleTimeString()}
        </span>
        <span style={{ color: "rgba(16,185,129,0.5)" }}>Realtime ●</span>
      </div>
    </div>
  );
}

// ─── Keep legacy export working ───────────────────────────────────────────────
/** @deprecated Use VirtualGovernanceTable for production — this falls back gracefully */
export function GovernanceTable({ entries }: { entries: AuditEntry[] }) {
  return <VirtualGovernanceTable entries={entries} />;
}
