"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

// Initialize mermaid with the same aesthetic as the dashboard
mermaid.initialize({
  startOnLoad: true,
  theme: "dark",
  securityLevel: "loose",
  themeVariables: {
    primaryColor: "#10b981",
    primaryTextColor: "#f0fdf4",
    primaryBorderColor: "#10b981",
    lineColor: "#34d399",
    secondaryColor: "#065f46",
    tertiaryColor: "#022c22",
  },
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
});

interface MermaidProps {
  chart: string;
}

export const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    const renderChart = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
      } catch (err) {
        console.error("Mermaid error:", err);
        setSvg(
          "<p style='color:#ef4444;font-size:12px'>❌ Diagram syntax error</p>",
        );
      }
    };

    if (chart) {
      renderChart();
    }
  }, [chart]);

  return (
    <div
      ref={ref}
      className="mermaid-wrapper my-6 p-4 rounded-xl border border-primary/10 bg-black/40 backdrop-blur-sm overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
