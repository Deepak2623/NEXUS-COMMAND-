"use client";

import React from "react";
import { AgentStatus, AGENT_COLORS, AGENT_BG, ICONS } from "../types/nexus";

export function MeshCard({ agent }: { agent: AgentStatus }) {
  return (
    <div className="nexus-card bg-[#0d1425]/40 border-white/5 hover:border-primary/20 transition-all duration-300 group">
      <div className="p-5 relative">
        {/* Status indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className={`status-dot ${agent.status}`} />
          <span className="text-[10px] text-text-secondary font-bold tracking-wider uppercase">
            {agent.status}
          </span>
        </div>

        {/* Agent icon */}
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg text-primary mb-4 shadow-sm group-hover:scale-110 transition-transform">
          {ICONS[agent.icon] || "◈"}
        </div>

        <p className="text-sm font-semibold text-white mb-1 tracking-tight">
          {agent.name}
        </p>

        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-4 mt-3">
          <div
            className="h-full bg-primary shadow-[0_0_10px_var(--primary-glow)] transition-all duration-1000"
            style={{ width: agent.load }}
          />
        </div>

        <div className="flex justify-between items-center text-[10px] text-text-secondary font-mono">
          <span className="bg-white/5 px-1.5 py-0.5 rounded-md">
            {agent.load} LOAD
          </span>
          <span>{agent.latency_ms}MS</span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/5 bg-white/[0.02] flex justify-between items-center">
        <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">
          THROUGHPUT
        </span>
        <span className="text-xs font-mono text-primary font-bold">
          {agent.tasks_completed}
        </span>
      </div>
    </div>
  );
}

/** Skeleton card shown while /mesh/status is loading */
export function MeshCardSkeleton() {
  return (
    <div className="nexus-card bg-[#0d1425]/20 border-white/5 animate-pulse min-h-[160px] p-5">
      <div className="w-10 h-10 rounded-xl bg-white/5 mb-4" />
      <div className="h-4 w-2/3 bg-white/5 rounded-md mb-3" />
      <div className="h-3 w-1/3 bg-white/5 rounded-md" />
    </div>
  );
}
