-- ============================================================
-- CodeReview Agent v2 — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Reviews table
create table if not exists reviews (
  id                uuid primary key default gen_random_uuid(),
  repo              text not null,
  pr_number         int  not null,
  pr_title          text,
  pr_author         text,
  verdict           text check (verdict in ('approve','request_changes','comment')),
  summary           text,
  review_body       text,
  confidence        float default 0.0,
  security_count    int  default 0,
  performance_count int  default 0,
  style_count       int  default 0,
  latency_ms        float default 0.0,          -- LLM thinking time only (ms)
  global_recommendation text,                   -- Judge’s single top action for the dev
  mcp_stats         jsonb,
  posted            bool default false,
  created_at        timestamptz default now()
);

-- MCP audit log (cascades on review delete)
create table if not exists mcp_audit_log (
  id          uuid primary key default gen_random_uuid(),
  review_id   uuid references reviews(id) on delete cascade,
  session_id  text,
  tool_name   text,
  outcome     text check (outcome in ('allowed','blocked','rate_limited','error','timeout')),
  duration_ms float,
  input_hash  text,
  created_at  timestamptz default now()
);

-- Indexes for fast queries
create index if not exists reviews_repo_idx        on reviews(repo);
create index if not exists reviews_created_at_idx  on reviews(created_at desc);
create index if not exists reviews_verdict_idx     on reviews(verdict);
create index if not exists audit_review_idx        on mcp_audit_log(review_id);

-- Enable RLS (recommended for production)
alter table reviews       enable row level security;
alter table mcp_audit_log enable row level security;

-- Allow anon key full access (tighten for production)
create policy "allow all" on reviews       for all using (true) with check (true);
create policy "allow all" on mcp_audit_log for all using (true) with check (true);
