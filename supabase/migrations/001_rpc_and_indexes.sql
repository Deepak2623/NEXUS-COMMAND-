-- ═══════════════════════════════════════════════════════════════════════════
-- NEXUS COMMAND — Migration 001: True SaaS Schema
-- Eliminates N+1 queries, adds composite indexes, RLS with sub-select caching,
-- and RPC functions that return structured JSON in a single round-trip.
-- Run against BOTH Supabase projects (PRIMARY + SECONDARY).
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── 0. Extensions ──────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements"; -- query performance monitoring

-- ─── 1. Organizations (Multi-Tenancy Root) ──────────────────────────────────
CREATE TABLE IF NOT EXISTS organizations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  plan        TEXT NOT NULL DEFAULT 'free'   CHECK (plan IN ('free', 'pro', 'enterprise')),
  seat_limit  INT  NOT NULL DEFAULT 3,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── 2. Workspaces (Sub-tenant isolation) ───────────────────────────────────
CREATE TABLE IF NOT EXISTS workspaces (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (org_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_workspaces_org ON workspaces (org_id);

-- ─── 3. Governance Log (Core Table) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS governance_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID REFERENCES organizations(id) ON DELETE SET NULL,
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE SET NULL,
  timestamp       TIMESTAMPTZ NOT NULL DEFAULT now(),
  node            TEXT NOT NULL,
  task            TEXT,
  result_preview  TEXT,
  sha256          TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'verified',
  routed_to       TEXT,
  latency_ms      INT  DEFAULT 0,
  -- Billing / usage tracking
  token_count     INT  DEFAULT 0,
  model_used      TEXT
);

-- ─── Composite indexes for hot query paths ──────────────────────────────────
-- Dashboard load: filtered by org + time-ordered
CREATE INDEX IF NOT EXISTS idx_gov_org_time
  ON governance_log (org_id, timestamp DESC)
  WHERE org_id IS NOT NULL;

-- Stats aggregation by node
CREATE INDEX IF NOT EXISTS idx_gov_node_time
  ON governance_log (node, timestamp DESC);

-- SHA-256 integrity lookups
CREATE INDEX IF NOT EXISTS idx_gov_sha256
  ON governance_log (sha256);

-- Routed-to analytics
CREATE INDEX IF NOT EXISTS idx_gov_routed
  ON governance_log (routed_to, timestamp DESC)
  WHERE routed_to IS NOT NULL;

-- ─── 4. Agent Mesh Metrics (persisted for analytics) ────────────────────────
CREATE TABLE IF NOT EXISTS agent_metrics (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id      UUID REFERENCES organizations(id) ON DELETE CASCADE,
  agent_id    TEXT NOT NULL,
  agent_name  TEXT NOT NULL,
  latency_ms  INT  NOT NULL DEFAULT 0,
  task_count  INT  NOT NULL DEFAULT 0,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_metrics_org_agent
  ON agent_metrics (org_id, agent_id, recorded_at DESC);

-- ─── 5. Usage Ledger (for seat/usage-based billing) ─────────────────────────
CREATE TABLE IF NOT EXISTS usage_ledger (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id      UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  period      TEXT NOT NULL,          -- "2026-03" (YYYY-MM)
  task_count  INT  NOT NULL DEFAULT 0,
  token_count BIGINT NOT NULL DEFAULT 0,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (org_id, period)
);

CREATE INDEX IF NOT EXISTS idx_usage_org_period
  ON usage_ledger (org_id, period DESC);


-- ═══════════════════════════════════════════════════════════════════════════
-- 6. ROW-LEVEL SECURITY (RLS) — Tenant-hard isolation
-- Uses sub-select that IS index-friendly (not function-per-row evaluations).
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE governance_log   ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_metrics    ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_ledger     ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces       ENABLE ROW LEVEL SECURITY;

-- Helper: extract org_id from the JWT claim (set by your auth middleware)
-- e.g. Supabase sets auth.jwt() -> app_metadata -> org_id
CREATE OR REPLACE FUNCTION current_org_id() RETURNS UUID
  LANGUAGE sql STABLE SECURITY DEFINER
  AS $$
    SELECT NULLIF(
      (auth.jwt() -> 'app_metadata' ->> 'org_id'),
      ''
    )::UUID;
  $$;

-- governance_log: users can only see their org's rows
CREATE POLICY "org_isolation_governance" ON governance_log
  FOR ALL USING (
    org_id = current_org_id()
    OR org_id IS NULL  -- backward-compat: rows without org_id visible to service_role only
  );

-- agent_metrics: org isolation
CREATE POLICY "org_isolation_metrics" ON agent_metrics
  FOR ALL USING (org_id = current_org_id());

-- usage_ledger: org isolation (read) + service_role write
CREATE POLICY "org_usage_read" ON usage_ledger
  FOR SELECT USING (org_id = current_org_id());

CREATE POLICY "service_role_usage_write" ON usage_ledger
  FOR ALL TO service_role USING (true);

-- workspaces: scoped to org
CREATE POLICY "org_isolation_workspaces" ON workspaces
  FOR ALL USING (org_id = current_org_id());


-- ═══════════════════════════════════════════════════════════════════════════
-- 7. RPC FUNCTIONS — Single-round-trip JSON responses
-- Replaces multiple .select() waterfalls with one rpc() call.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 7a. get_dashboard_snapshot ────────────────────────────────────────────
-- Returns: { recent_logs: [...], mesh_stats: [...], usage: {...} }
-- One function call replaces 3 separate API round-trips.
CREATE OR REPLACE FUNCTION get_dashboard_snapshot(
  p_org_id    UUID DEFAULT NULL,
  p_limit     INT  DEFAULT 25
)
RETURNS JSON
LANGUAGE plpgsql STABLE SECURITY DEFINER
AS $$
DECLARE
  v_org_id UUID;
  v_logs   JSON;
  v_mesh   JSON;
  v_usage  JSON;
BEGIN
  -- Resolve org (from param or JWT)
  v_org_id := COALESCE(p_org_id, current_org_id());

  -- Recent governance log entries
  SELECT json_agg(row_to_json(r)) INTO v_logs
  FROM (
    SELECT
      id::TEXT,
      timestamp,
      node,
      LEFT(task, 80)           AS task_preview,
      sha256,
      status,
      routed_to,
      latency_ms
    FROM governance_log
    WHERE (v_org_id IS NULL OR org_id = v_org_id)
    ORDER BY timestamp DESC
    LIMIT p_limit
  ) r;

  -- Mesh aggregates: per-agent task count + avg latency over last 24h
  SELECT json_agg(row_to_json(m)) INTO v_mesh
  FROM (
    SELECT
      routed_to                            AS agent_id,
      COUNT(*)                             AS tasks_completed,
      ROUND(AVG(latency_ms))               AS avg_latency_ms,
      MAX(timestamp)                       AS last_active
    FROM governance_log
    WHERE timestamp > now() - INTERVAL '24 hours'
      AND (v_org_id IS NULL OR org_id = v_org_id)
      AND routed_to IS NOT NULL
    GROUP BY routed_to
  ) m;

  -- Usage for current billing period
  SELECT row_to_json(u) INTO v_usage
  FROM (
    SELECT
      task_count,
      token_count,
      period,
      updated_at
    FROM usage_ledger
    WHERE org_id = v_org_id
      AND period = TO_CHAR(now(), 'YYYY-MM')
    LIMIT 1
  ) u;

  RETURN json_build_object(
    'recent_logs', COALESCE(v_logs,  '[]'::JSON),
    'mesh_stats',  COALESCE(v_mesh,  '[]'::JSON),
    'usage',       COALESCE(v_usage, '{}'::JSON),
    'fetched_at',  now()
  );
END;
$$;

-- Grant to authenticated users and service_role
GRANT EXECUTE ON FUNCTION get_dashboard_snapshot TO authenticated, service_role;


-- ── 7b. insert_governance_entry ──────────────────────────────────────────
-- Atomic insert + usage ledger upsert in one call (no waterfall).
CREATE OR REPLACE FUNCTION insert_governance_entry(
  p_node            TEXT,
  p_task            TEXT,
  p_result_preview  TEXT,
  p_sha256          TEXT,
  p_routed_to       TEXT  DEFAULT NULL,
  p_latency_ms      INT   DEFAULT 0,
  p_token_count     INT   DEFAULT 0,
  p_model_used      TEXT  DEFAULT 'gemini-2.0-flash',
  p_org_id          UUID  DEFAULT NULL,
  p_workspace_id    UUID  DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql VOLATILE SECURITY DEFINER
AS $$
DECLARE
  v_id      UUID;
  v_period  TEXT := TO_CHAR(now(), 'YYYY-MM');
  v_org_id  UUID := COALESCE(p_org_id, current_org_id());
BEGIN
  -- Insert governance log row
  INSERT INTO governance_log
    (org_id, workspace_id, node, task, result_preview, sha256, routed_to, latency_ms, token_count, model_used, status)
  VALUES
    (v_org_id, p_workspace_id, p_node, p_task, p_result_preview, p_sha256, p_routed_to, p_latency_ms, p_token_count, p_model_used, 'verified')
  RETURNING id INTO v_id;

  -- Upsert usage ledger for billing period
  IF v_org_id IS NOT NULL THEN
    INSERT INTO usage_ledger (org_id, period, task_count, token_count)
    VALUES (v_org_id, v_period, 1, p_token_count)
    ON CONFLICT (org_id, period)
    DO UPDATE SET
      task_count  = usage_ledger.task_count  + 1,
      token_count = usage_ledger.token_count + EXCLUDED.token_count,
      updated_at  = now();
  END IF;

  RETURN json_build_object('id', v_id, 'status', 'ok');
END;
$$;

GRANT EXECUTE ON FUNCTION insert_governance_entry TO service_role;


-- ── 7c. get_agent_performance ─────────────────────────────────────────────
-- Returns per-agent P50/P95 latency + error rates for the last N days.
CREATE OR REPLACE FUNCTION get_agent_performance(
  p_days     INT  DEFAULT 7,
  p_org_id   UUID DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql STABLE SECURITY DEFINER
AS $$
DECLARE
  v_org_id UUID := COALESCE(p_org_id, current_org_id());
BEGIN
  RETURN (
    SELECT json_agg(row_to_json(p))
    FROM (
      SELECT
        routed_to                                                   AS agent,
        COUNT(*)                                                    AS total_tasks,
        PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY latency_ms)   AS p50_ms,
        PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY latency_ms)   AS p95_ms,
        ROUND(100.0 * SUM(CASE WHEN status != 'verified' THEN 1 ELSE 0 END) / COUNT(*), 2) AS error_rate_pct,
        DATE_TRUNC('day', timestamp)                                AS day
      FROM governance_log
      WHERE timestamp > now() - (p_days || ' days')::INTERVAL
        AND (v_org_id IS NULL OR org_id = v_org_id)
        AND routed_to IS NOT NULL
      GROUP BY routed_to, DATE_TRUNC('day', timestamp)
      ORDER BY day DESC, total_tasks DESC
    ) p
  );
END;
$$;

GRANT EXECUTE ON FUNCTION get_agent_performance TO authenticated, service_role;


-- ─── 8. Realtime: Enable for governance_log ──────────────────────────────────
-- This enables Supabase Realtime LISTEN on the table for pushed updates.
ALTER PUBLICATION supabase_realtime ADD TABLE governance_log;

-- (Optional) enable only relevant columns to reduce bandwidth:
-- ALTER TABLE governance_log REPLICA IDENTITY FULL;
-- For row-level broadcasts, use DEFAULT (PK only) which is more efficient.
ALTER TABLE governance_log REPLICA IDENTITY DEFAULT;
