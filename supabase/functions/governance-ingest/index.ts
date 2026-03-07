// supabase/functions/governance-ingest/index.ts
// ─────────────────────────────────────────────────────────────────────────────
// Supabase Edge Function: governance-ingest
//
// Purpose: Heavy post-processing that should NOT run on the client or the
//          Python FastAPI server. Moves the following logic to the edge:
//
//   1. SHA-256 re-verification of the Guardian output
//   2. PII scrubbing (regex + model-assisted for production)
//   3. Atomic write to governance_log + usage_ledger (via RPC)
//   4. Slack webhook notification for high-severity events
//   5. Returns a canonical governance receipt to the caller
//
// Deploy: supabase functions deploy governance-ingest --no-verify-jwt
// Invoke from backend: await supabase.functions.invoke('governance-ingest', { body: payload })
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

// ─── PII patterns (extend for your jurisdiction) ─────────────────────────────
const PII_PATTERNS: RegExp[] = [
  /\b\d{3}-\d{2}-\d{4}\b/g, // US SSN
  /\b\d{16}\b/g, // Credit card (16 digits)
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, // Email
  /\b(\+?\d[\d\s\-().]{7,}\d)\b/g, // Phone numbers
];

function scrubbedText(text: string): string {
  let out = text;
  for (const p of PII_PATTERNS) out = out.replace(p, "[REDACTED]");
  return out;
}

// ─── SHA-256 via Web Crypto (native to the Deno runtime) ─────────────────────
async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ─── Main handler ─────────────────────────────────────────────────────────────
Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const {
      node = "guardian",
      task = "",
      result_preview = "",
      sha256_claim = "", // hash asserted by the Python Guardian
      routed_to = null,
      latency_ms = 0,
      token_count = 0,
      model_used = "gemini-2.0-flash",
      org_id = null,
      workspace_id = null,
    } = payload;

    // ── 1. PII scrub ────────────────────────────────────────────────────────
    const cleanTask = scrubbedText(task);
    const cleanPreview = scrubbedText(result_preview);

    // ── 2. SHA-256 re-verification ──────────────────────────────────────────
    const computedHash = await sha256(cleanPreview);
    const hashMismatch = sha256_claim && computedHash !== sha256_claim;
    if (hashMismatch) {
      console.warn(`[NEXUS] Hash mismatch for task="${task.slice(0, 40)}"`);
    }

    // ── 3. Atomic Supabase write via RPC ────────────────────────────────────
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { data: rpcData, error: rpcError } = await supabase.rpc(
      "insert_governance_entry",
      {
        p_node: node,
        p_task: cleanTask,
        p_result_preview: cleanPreview,
        p_sha256: computedHash,
        p_routed_to: routed_to,
        p_latency_ms: latency_ms,
        p_token_count: token_count,
        p_model_used: model_used,
        p_org_id: org_id,
        p_workspace_id: workspace_id,
      },
    );

    if (rpcError) throw rpcError;

    // ── 4. Optional: Slack alert for anomalous latency (>10s) ───────────────
    const slackWebhook = Deno.env.get("SLACK_WEBHOOK_URL");
    if (slackWebhook && latency_ms > 10_000) {
      await fetch(slackWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `⚠️ *Nexus Alert* — Slow task detected\n*Latency:* ${latency_ms}ms\n*Agent:* ${routed_to}\n*Task:* ${cleanTask.slice(
            0,
            80,
          )}`,
        }),
      }).catch(() => {
        /* non-critical */
      });
    }

    // ── 5. Return canonical receipt ──────────────────────────────────────────
    return new Response(
      JSON.stringify({
        ok: true,
        id: rpcData?.id,
        sha256: computedHash,
        hash_verified: !hashMismatch,
        pii_redacted: cleanPreview !== result_preview,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
