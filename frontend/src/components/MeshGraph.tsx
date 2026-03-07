"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Compass,
  Search,
  ShieldAlert,
  Brain,
  MessageSquare,
  Lock,
  Database,
} from "lucide-react";

/**
 * MESH GRAPH COMPONENT
 * A custom SVG-based visualization of the Nexus Agent Mesh.
 * Visualizes the flow: User -> Router -> Agents -> Guardian -> Ledger
 */

interface NodeProps {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
}

const Node = ({ label, sublabel, x, y, icon, color, glowColor }: NodeProps) => {
  // Safe ID for filter
  const filterId = `glow-${label.replace(/[^a-zA-Z0-9]/g, "-")}`;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ pointerEvents: "all" }}
    >
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="15" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Connection Point Glow */}
      <circle
        cx={x}
        cy={y}
        r="40"
        fill={glowColor}
        opacity="0.1"
        filter={`url(#${filterId})`}
      />

      {/* Main Circle */}
      <circle
        cx={x}
        cy={y}
        r="32"
        fill="#0a1122"
        stroke={color}
        strokeWidth="2"
        style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
      />

      {/* Icon Container */}
      <foreignObject x={x - 12} y={y - 12} width="24" height="24">
        <div
          style={{
            color: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
      </foreignObject>

      {/* Label */}
      <text
        x={x}
        y={y + 55}
        textAnchor="middle"
        fill="#e5e7eb"
        fontSize="12"
        fontWeight="600"
        style={{ userSelect: "none", fontFamily: "inherit" }}
      >
        {label}
      </text>

      {/* Sublabel */}
      {sublabel && (
        <text
          x={x}
          y={y + 70}
          textAnchor="middle"
          fill="#6b7280"
          fontSize="10"
          style={{ userSelect: "none", fontFamily: "inherit" }}
        >
          {sublabel}
        </text>
      )}
    </motion.g>
  );
};

const Connection = ({
  x1,
  y1,
  x2,
  y2,
  color,
  delay = 0,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  delay?: number;
}) => (
  <g>
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth="1.5"
      strokeOpacity="0.15"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay }}
    />
    {/* Animated Pulse along the line */}
    <motion.circle
      r="2"
      fill={color}
      initial={{ cx: x1, cy: y1, opacity: 0 }}
      animate={{
        cx: [x1, x2],
        cy: [y1, y2],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
        delay: delay + Math.random(),
      }}
    />
  </g>
);

export const MeshGraph = () => {
  // Coordinates
  const centerX = 400;
  const centerY = 300;

  const nodes = [
    {
      id: "user",
      label: "USER COMMAND",
      sublabel: "⌘K Input",
      x: centerX - 300,
      y: centerY,
      icon: <User size={20} />,
      color: "#8ab4f8",
      glowColor: "rgba(138, 180, 248, 0.4)",
    },
    {
      id: "router",
      label: "GROQ ROUTER",
      sublabel: "Llama 3.3 70B",
      x: centerX - 150,
      y: centerY,
      icon: <Compass size={20} />,
      color: "#10b981",
      glowColor: "rgba(16, 185, 129, 0.4)",
    },
    // Agents
    {
      id: "research",
      label: "RESEARCH",
      sublabel: "Tavily + Gemini",
      x: centerX + 50,
      y: centerY - 120,
      icon: <Search size={20} />,
      color: "#34d399",
      glowColor: "rgba(52, 211, 153, 0.4)",
    },
    {
      id: "codereview",
      label: "CODE REVIEW",
      sublabel: "Gemini 2.0 Flash",
      x: centerX + 50,
      y: centerY - 40,
      icon: <ShieldAlert size={20} />,
      color: "#34d399",
      glowColor: "rgba(52, 211, 153, 0.4)",
    },
    {
      id: "nexus",
      label: "NEXUS NODE",
      sublabel: "Diagnostics",
      x: centerX + 50,
      y: centerY + 40,
      icon: <Brain size={20} />,
      color: "#34d399",
      glowColor: "rgba(52, 211, 153, 0.4)",
    },
    {
      id: "slack",
      label: "SLACK",
      sublabel: "Socket Mode",
      x: centerX + 50,
      y: centerY + 120,
      icon: <MessageSquare size={20} />,
      color: "#34d399",
      glowColor: "rgba(52, 211, 153, 0.4)",
    },
    // Final chain
    {
      id: "guardian",
      label: "GUARDIAN",
      sublabel: "PII Scrub + SHA-256",
      x: centerX + 250,
      y: centerY,
      icon: <Lock size={20} />,
      color: "#fbbf24",
      glowColor: "rgba(251, 191, 36, 0.4)",
    },
    {
      id: "supabase",
      label: "LEDGER",
      sublabel: "Dual-Supabase",
      x: centerX + 400,
      y: centerY,
      icon: <Database size={20} />,
      color: "#3ECF8E",
      glowColor: "rgba(62, 207, 142, 0.4)",
    },
  ];

  return (
    <div className="w-full h-[300px] md:h-[500px] overflow-hidden rounded-xl bg-[#060e1a]/80 border border-white/5 relative">
      <div className="absolute top-4 left-6 flex items-center gap-2">
        <span className="status-dot online" />
        <span className="text-[10px] text-[#34d399] font-bold tracking-widest uppercase font-mono">
          Live Mesh Overview
        </span>
      </div>

      <svg
        viewBox="0 0 900 600"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* User to Router */}
        <Connection
          x1={nodes[0].x}
          y1={nodes[0].y}
          x2={nodes[1].x}
          y2={nodes[1].y}
          color="#8ab4f8"
        />

        {/* Router to Agents */}
        {[2, 3, 4, 5].map((i, idx) => (
          <Connection
            key={nodes[i].id}
            x1={nodes[1].x}
            y1={nodes[1].y}
            x2={nodes[i].x}
            y2={nodes[i].y}
            color="#10b981"
            delay={0.2 + idx * 0.1}
          />
        ))}

        {/* Agents to Guardian */}
        {[2, 3, 4, 5].map((i, idx) => (
          <Connection
            key={`to-guardian-${nodes[i].id}`}
            x1={nodes[i].x}
            y1={nodes[i].y}
            x2={nodes[6].x}
            y2={nodes[6].y}
            color="#34d399"
            delay={1.2 + idx * 0.1}
          />
        ))}

        {/* Guardian to Ledger */}
        <Connection
          x1={nodes[6].x}
          y1={nodes[6].y}
          x2={nodes[7].x}
          y2={nodes[7].y}
          color="#fbbf24"
          delay={2.0}
        />

        {/* Nodes */}
        {nodes.map((node) => (
          <Node key={node.id} {...node} />
        ))}
      </svg>
    </div>
  );
};
