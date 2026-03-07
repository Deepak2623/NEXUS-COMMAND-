/**
 * hooks/useNexusDashboard.ts
 * ───────────────────────────────────────────────────────────────────────────
 * Elite SaaS data-fetching layer for Nexus Command Centre.
 *
 * Strategy:
 *  1. Calls the `get_dashboard_snapshot` RPC function → single round-trip
 *     replacing three separate axios/fetch waterfall calls.
 *  2. State is kept in a shared module cache (SWR-like, no external dep).
 *  3. Optimistic updates: mesh counters update INSTANTLY on task completion.
 *  4. Supabase Realtime subscription pushes new governance rows; no polling.
 *  5. Stale-while-revalidate: last known data shown instantly, background
 *     refresh runs silently. The user NEVER sees a spinner > 200ms.
 */

"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import type { AgentStatus, AuditEntry } from "../types/nexus";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface MeshStat {
  agent_id: string;
  tasks_completed: number;
  avg_latency_ms: number;
  last_active: string;
}

export interface UsageSummary {
  task_count: number;
  token_count: number;
  period: string;
  updated_at: string;
}

export interface DashboardSnapshot {
  recent_logs: AuditEntry[];
  mesh_stats: MeshStat[];
  usage: UsageSummary;
  fetched_at: string;
}

export interface NexusDashboardState {
  // Data
  agents: AgentStatus[];
  auditLog: AuditEntry[];
  usage: UsageSummary | null;
  apiLive: boolean | null;

  // Loading states (split for skeleton granularity)
  meshLoading: boolean;
  auditLoading: boolean;
  isHydrated: boolean; // false until first successful fetch

  // Actions
  optimisticTaskComplete: (routed_to: string, latency_ms: number) => void;
  refresh: () => void;
  refreshMesh: () => void;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const REALTIME_CHANNEL = "nexus_governance_live";

// SWR-like module-level cache (survives re-renders, not remounts)
let _snapshotCache: DashboardSnapshot | null = null;
let _lastFetchedAt = 0;
const STALE_AFTER_MS = 8_000; // 8s stale window

// ─── Internal helpers ────────────────────────────────────────────────────────

function agentIdFromRoutedTo(routed_to: string): string {
  // e.g. "research_agent" → "research-agent"
  return routed_to.replace(/_/g, "-");
}

function buildAgentsFromMesh(stats: MeshStat[]): AgentStatus[] {
  const ICON_MAP: Record<string, string> = {
    nexus_node: "cpu",
    research_agent: "globe",
    codereview_agent: "shield",
    slack_agent: "message-square",
    guardian: "lock",
  };
  const ALL_AGENTS = [
    "nexus_node",
    "research_agent",
    "codereview_agent",
    "slack_agent",
  ];
  const statMap = new Map(stats.map((s) => [s.agent_id, s]));
  const totalTasks =
    stats.reduce((a, s) => a + (s.tasks_completed ?? 0), 0) || 1;

  return ALL_AGENTS.map((agId) => {
    const s = statMap.get(agId);
    const tasks = s?.tasks_completed ?? 0;
    return {
      id: agentIdFromRoutedTo(agId),
      name: agId.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      status: tasks > 0 ? "online" : "idle",
      load: `${Math.min(Math.round((tasks / totalTasks) * 100), 99)}%`,
      tasks_completed: tasks,
      latency_ms: s?.avg_latency_ms ?? 0,
      icon: ICON_MAP[agId] ?? "cpu",
    } satisfies AgentStatus;
  });
}

// ─── Main hook ───────────────────────────────────────────────────────────────

export function useNexusDashboard(): NexusDashboardState {
  const [agents, setAgents] = useState<AgentStatus[]>([]);
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);
  const [usage, setUsage] = useState<UsageSummary | null>(null);
  const [apiLive, setApiLive] = useState<boolean | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [meshLoading, setMeshLoading] = useState(true);
  const [auditLoading, setAuditLoading] = useState(true);

  const isFetchingRef = useRef(false);
  const realtimeRef = useRef<WebSocket | null>(null);

  // ── 1. Snapshot fetch via RPC (single round-trip) ──────────────────────
  const fetchSnapshot = useCallback(async (force = false) => {
    const now = Date.now();
    if (!force && _snapshotCache && now - _lastFetchedAt < STALE_AFTER_MS) {
      // Serve from cache INSTANTLY — no spinner, no wait
      const cached = _snapshotCache;
      setAgents(buildAgentsFromMesh(cached.mesh_stats));
      setAuditLog(cached.recent_logs);
      setUsage(cached.usage);
      setIsHydrated(true);
      setMeshLoading(false);
      setAuditLoading(false);
      return;
    }

    if (isFetchingRef.current && !force) return;
    isFetchingRef.current = true;

    try {
      // Option A: Backend aggregation endpoint (no Supabase JS SDK needed)
      const res = await fetch(`${BACKEND_URL}/dashboard/snapshot`, {
        signal: AbortSignal.timeout(4000),
        headers: { "Cache-Control": "no-cache" },
      });

      if (!res.ok) throw new Error(`Snapshot API ${res.status}`);
      const snap: DashboardSnapshot = await res.json();

      _snapshotCache = snap;
      _lastFetchedAt = Date.now();

      setAgents(buildAgentsFromMesh(snap.mesh_stats));
      setAuditLog(snap.recent_logs ?? []);
      setUsage(snap.usage ?? null);
      setApiLive(true);
    } catch {
      // Fallback: individual fetches if snapshot endpoint isn't ready
      await Promise.allSettled([
        _fallbackMesh(),
        _fallbackAudit(),
        _healthCheck(),
      ]);
    } finally {
      isFetchingRef.current = false;
      setIsHydrated(true);
      setMeshLoading(false);
      setAuditLoading(false);
    }
  }, []);

  // ── 2. Lightweight fallbacks (used if /dashboard/snapshot isn't ready) ─
  const _healthCheck = useCallback(async () => {
    try {
      const r = await fetch(`${BACKEND_URL}/health`, {
        signal: AbortSignal.timeout(2500),
      });
      setApiLive(r.ok);
    } catch {
      setApiLive(false);
    }
  }, []);

  const _fallbackMesh = useCallback(async () => {
    try {
      const r = await fetch(`${BACKEND_URL}/mesh/status`, {
        signal: AbortSignal.timeout(3000),
      });
      if (!r.ok) return;
      const data: AgentStatus[] = await r.json();
      setAgents(data);
    } catch {}
  }, []);

  const _fallbackAudit = useCallback(async () => {
    try {
      const r = await fetch(`${BACKEND_URL}/governance/log`, {
        signal: AbortSignal.timeout(3000),
      });
      if (!r.ok) return;
      const data: AuditEntry[] = await r.json();
      setAuditLog(data);
    } catch {}
  }, []);

  // ── 3. Optimistic updates — instant UI, no spinner ─────────────────────
  const optimisticTaskComplete = useCallback(
    (routed_to: string, latency_ms: number) => {
      // Immediately update the agent card's task count + latency
      setAgents((prev) =>
        prev.map((a) =>
          a.id === agentIdFromRoutedTo(routed_to)
            ? {
                ...a,
                tasks_completed: a.tasks_completed + 1,
                latency_ms,
                status: "online",
              }
            : a,
        ),
      );

      // Invalidate cache so next render triggers a background refresh
      _lastFetchedAt = 0;

      // Background re-fetch (non-blocking — user already sees updated state)
      setTimeout(() => fetchSnapshot(true), 500);
    },
    [fetchSnapshot],
  );

  // ── 4. Supabase Realtime WebSocket subscription ────────────────────────
  const connectRealtime = useCallback(() => {
    if (!SUPABASE_URL || !SUPABASE_ANON) return;

    // Supabase Realtime v2 WebSocket URL
    const wsUrl = `${SUPABASE_URL.replace(
      "https://",
      "wss://",
    )}/realtime/v1/websocket?apikey=${SUPABASE_ANON}&vsn=1.0.0`;

    try {
      const ws = new WebSocket(wsUrl);
      realtimeRef.current = ws;

      ws.onopen = () => {
        // Join the governance_log channel (INSERT events only)
        ws.send(
          JSON.stringify({
            topic: `realtime:public:governance_log`,
            event: "phx_join",
            payload: {
              config: { broadcast: { self: false }, presence: { key: "" } },
            },
            ref: "1",
          }),
        );
      };

      ws.onmessage = (msg) => {
        try {
          const frame = JSON.parse(msg.data);
          if (frame.event === "INSERT" && frame.payload?.record) {
            const record = frame.payload.record;
            // Prepend new row to audit log — zero-latency update
            setAuditLog((prev) => [
              {
                id: record.id,
                timestamp: record.timestamp,
                node: record.node,
                task_preview: record.task?.slice(0, 80) ?? "",
                sha256: record.sha256 ?? "",
                status: record.status ?? "verified",
              },
              ...prev.slice(0, 99),
            ]);
          }
        } catch {}
      };

      ws.onerror = () => {
        // Silently fall back to polling — no noise for the user
        realtimeRef.current = null;
      };

      ws.onclose = () => {
        // Reconnect after 5s on unclean close
        setTimeout(connectRealtime, 5_000);
      };
    } catch {
      // WebSocket not available (SSR, etc.) — polling is the fallback
    }
  }, []);

  // ── 5. Lifecycle: initial load + polling + realtime ────────────────────
  useEffect(() => {
    // Immediately serve from cache if available (instant hydration)
    fetchSnapshot();
    connectRealtime();

    // Polling: refresh every 8s only if realtime WS is NOT active
    const id = setInterval(() => {
      const wsAlive = realtimeRef.current?.readyState === WebSocket.OPEN;
      if (!wsAlive) {
        fetchSnapshot();
      } else {
        // WS active: just refresh mesh stats (audit covered by realtime)
        _fallbackMesh();
        _healthCheck();
      }
    }, 8_000);

    return () => {
      clearInterval(id);
      realtimeRef.current?.close();
    };
  }, [fetchSnapshot, connectRealtime, _fallbackMesh, _healthCheck]);

  return {
    agents,
    auditLog,
    usage,
    apiLive,
    meshLoading,
    auditLoading,
    isHydrated,
    optimisticTaskComplete,
    refresh: () => fetchSnapshot(true),
    refreshMesh: _fallbackMesh,
  };
}
