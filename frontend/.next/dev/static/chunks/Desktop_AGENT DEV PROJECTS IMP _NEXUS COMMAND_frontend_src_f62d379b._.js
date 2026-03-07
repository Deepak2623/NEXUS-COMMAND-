(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/types/nexus.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ─────────────────────────────────────────────────────────────────────────────
// src/types/nexus.ts — Shared types, constants, and config
// ─────────────────────────────────────────────────────────────────────────────
__turbopack_context__.s([
    "AGENT_BG",
    ()=>AGENT_BG,
    "AGENT_COLORS",
    ()=>AGENT_COLORS,
    "API",
    ()=>API,
    "ICONS",
    ()=>ICONS,
    "ROUTED_TAG",
    ()=>ROUTED_TAG,
    "SUGGESTIONS",
    ()=>SUGGESTIONS,
    "TAG_CLASS",
    ()=>TAG_CLASS,
    "VERSION",
    ()=>VERSION,
    "formatResponse",
    ()=>formatResponse
]);
const API = "http://localhost:8000";
const VERSION = "4.5.1";
const ICONS = {
    cpu: "⬡",
    globe: "◉",
    shield: "⬟",
    lock: "⬧",
    search: "⌖",
    code: "⌥",
    zap: "⚡",
    check: "✓"
};
const AGENT_COLORS = {
    "nexus-node": "#10b981",
    "research-agent": "#6366f1",
    "codereview-agent": "#f59e0b",
    "guardian-node": "#8b5cf6"
};
const AGENT_BG = {
    "nexus-node": "rgba(16,185,129,0.08)",
    "research-agent": "rgba(99,102,241,0.08)",
    "codereview-agent": "rgba(245,158,11,0.08)",
    "guardian-node": "rgba(139,92,246,0.08)"
};
const SUGGESTIONS = [
    {
        label: "Research Nvidia AI chip roadmap for 2026",
        icon: "globe",
        tag: "research"
    },
    {
        label: "Research latest LLM benchmark results in 2026",
        icon: "globe",
        tag: "research"
    },
    {
        label: "Audit this repository for security vulnerabilities",
        icon: "shield",
        tag: "codereview"
    },
    {
        label: "Review Python async patterns for production",
        icon: "code",
        tag: "codereview"
    },
    {
        label: "Check agent mesh health and diagnostics",
        icon: "cpu",
        tag: "nexus"
    },
    {
        label: "Diagnose system performance bottlenecks",
        icon: "zap",
        tag: "nexus"
    }
];
const TAG_CLASS = {
    research: "tag-indigo",
    codereview: "tag-amber",
    nexus: "tag-emerald"
};
const ROUTED_TAG = {
    research_agent: "tag-indigo",
    codereview_agent: "tag-amber",
    nexus_node: "tag-emerald"
};
function formatResponse(text) {
    return text.replace(/^## (.+)$/gm, '<p style="color:#34d399;font-size:12px;font-weight:700;letter-spacing:0.06em;margin:16px 0 6px;text-transform:uppercase">$1</p>').replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e5e7eb">$1</strong>').replace(/`([^`]+)`/g, "<code style=\"background:rgba(16,185,129,0.1);border-radius:4px;padding:2px 6px;font-family:'Fira Code',monospace;font-size:12px;color:#34d399\">$1</code>").replace(/^(#{1} )(.+)$/gm, '<p style="color:#f0fdf4;font-size:14px;font-weight:700;margin:12px 0 4px">$2</p>');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MeshCard",
    ()=>MeshCard,
    "MeshCardSkeleton",
    ()=>MeshCardSkeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$types$2f$nexus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/types/nexus.ts [app-client] (ecmascript)");
"use client";
;
;
function MeshCard({ agent }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "nexus-card bg-[#0d1425]/40 border-white/5 hover:border-primary/20 transition-all duration-300 group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5 relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-4 right-4 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `status-dot ${agent.status}`
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx",
                                lineNumber: 12,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-text-secondary font-bold tracking-wider uppercase",
                                children: agent.status
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx",
                                lineNumber: 13,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg text-primary mb-4 shadow-sm group-hover:scale-110 transition-transform",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$types$2f$nexus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICONS"][agent.icon] || "◈"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold text-white mb-1 tracking-tight",
                        children: agent.name
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1 w-full bg-white/5 rounded-full overflow-hidden mb-4 mt-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full bg-primary shadow-[0_0_10px_var(--primary-glow)] transition-all duration-1000",
                            style: {
                                width: agent.load
                            }
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center text-[10px] text-text-secondary font-mono",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bg-white/5 px-1.5 py-0.5 rounded-md",
                                children: [
                                    agent.load,
                                    " LOAD"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    agent.latency_ms,
                                    "MS"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 py-3 border-t border-white/5 bg-white/[0.02] flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-text-muted font-bold uppercase tracking-wider",
                        children: "THROUGHPUT"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-mono text-primary font-bold",
                        children: agent.tasks_completed
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = MeshCard;
function MeshCardSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "nexus-card bg-[#0d1425]/20 border-white/5 animate-pulse min-h-[160px] p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-10 h-10 rounded-xl bg-white/5 mb-4"
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-4 w-2/3 bg-white/5 rounded-md mb-3"
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-3 w-1/3 bg-white/5 rounded-md"
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c1 = MeshCardSkeleton;
var _c, _c1;
__turbopack_context__.k.register(_c, "MeshCard");
__turbopack_context__.k.register(_c1, "MeshCardSkeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommandBar",
    ()=>CommandBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$types$2f$nexus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/types/nexus.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function CommandBar({ onResponse }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedIdx, setSelectedIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [steps, setSteps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [startTime, setStartTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [elapsed, setElapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Live timer effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommandBar.useEffect": ()=>{
            let interval;
            if (loading && startTime) {
                interval = setInterval({
                    "CommandBar.useEffect": ()=>{
                        setElapsed(Date.now() - startTime);
                    }
                }["CommandBar.useEffect"], 100);
            } else {
                setElapsed(0);
            }
            return ({
                "CommandBar.useEffect": ()=>clearInterval(interval)
            })["CommandBar.useEffect"];
        }
    }["CommandBar.useEffect"], [
        loading,
        startTime
    ]);
    const filtered = query.trim() ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$types$2f$nexus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUGGESTIONS"].filter((s)=>s.label.toLowerCase().includes(query.toLowerCase())) : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$types$2f$nexus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUGGESTIONS"];
    // Cmd+K / Ctrl+K toggle
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommandBar.useEffect": ()=>{
            const handler = {
                "CommandBar.useEffect.handler": (e)=>{
                    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                        e.preventDefault();
                        setOpen({
                            "CommandBar.useEffect.handler": (o)=>!o
                        }["CommandBar.useEffect.handler"]);
                    }
                    if (e.key === "Escape") setOpen(false);
                }
            }["CommandBar.useEffect.handler"];
            window.addEventListener("keydown", handler);
            return ({
                "CommandBar.useEffect": ()=>window.removeEventListener("keydown", handler)
            })["CommandBar.useEffect"];
        }
    }["CommandBar.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommandBar.useEffect": ()=>setSelectedIdx(0)
    }["CommandBar.useEffect"], [
        query
    ]);
    const runTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CommandBar.useCallback[runTask]": async (q)=>{
            if (!q.trim() || loading) return;
            setOpen(false);
            const start = Date.now();
            setStartTime(start);
            setLoading(true);
            setSteps([
                {
                    id: "init",
                    label: "Connecting to Nexus…",
                    status: "loading"
                }
            ]);
            try {
                const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$types$2f$nexus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API"]}/task/stream?q=${encodeURIComponent(q)}`;
                const response = await fetch(url);
                if (!response.ok) {
                    const errData = await response.json().catch({
                        "CommandBar.useCallback[runTask]": ()=>({})
                    }["CommandBar.useCallback[runTask]"]);
                    throw new Error(errData.detail || `Backend returned ${response.status}`);
                }
                const reader = response.body?.getReader();
                const decoder = new TextDecoder();
                let buffer = "";
                let finalJson = null;
                if (reader) {
                    while(true){
                        const { done, value } = await reader.read();
                        if (done) break;
                        buffer += decoder.decode(value, {
                            stream: true
                        });
                        const lines = buffer.split("\n");
                        buffer = lines.pop() || "";
                        for (const line of lines){
                            const trimmed = line.trim();
                            if (!trimmed || !trimmed.startsWith("data: ")) continue;
                            try {
                                const data = JSON.parse(trimmed.slice(6));
                                if (data.event === "connected") {
                                    setSteps({
                                        "CommandBar.useCallback[runTask]": (s)=>s.map({
                                                "CommandBar.useCallback[runTask]": (step)=>step.id === "init" ? {
                                                        ...step,
                                                        label: data.message || "Nexus Uplink Established",
                                                        status: "done"
                                                    } : step
                                            }["CommandBar.useCallback[runTask]"])
                                    }["CommandBar.useCallback[runTask]"]);
                                } else if (data.event === "start") {
                                    setSteps({
                                        "CommandBar.useCallback[runTask]": (s)=>[
                                                ...s.map({
                                                    "CommandBar.useCallback[runTask]": (i)=>({
                                                            ...i,
                                                            status: "done"
                                                        })
                                                }["CommandBar.useCallback[runTask]"]),
                                                {
                                                    id: "start",
                                                    label: data.message || "Pipeline started",
                                                    status: "loading"
                                                }
                                            ]
                                    }["CommandBar.useCallback[runTask]"]);
                                } else if (data.event === "ping") {
                                    continue;
                                } else if (data.event === "routing") {
                                    setSteps({
                                        "CommandBar.useCallback[runTask]": (s)=>[
                                                ...s.map({
                                                    "CommandBar.useCallback[runTask]": (i)=>({
                                                            ...i,
                                                            status: "done"
                                                        })
                                                }["CommandBar.useCallback[runTask]"]),
                                                {
                                                    id: "routing",
                                                    label: data.message || `Routing to ${data.routed_to.toUpperCase()}`,
                                                    status: "loading"
                                                }
                                            ]
                                    }["CommandBar.useCallback[runTask]"]);
                                } else if (data.event === "agent_thinking") {
                                    setSteps({
                                        "CommandBar.useCallback[runTask]": (s)=>[
                                                ...s.map({
                                                    "CommandBar.useCallback[runTask]": (i)=>({
                                                            ...i,
                                                            status: "done"
                                                        })
                                                }["CommandBar.useCallback[runTask]"]),
                                                {
                                                    id: `think_${data.node}`,
                                                    label: data.message || `${data.node.toUpperCase()} thinking…`,
                                                    status: "loading"
                                                }
                                            ]
                                    }["CommandBar.useCallback[runTask]"]);
                                } else if (data.event === "validation_complete") {
                                    setSteps({
                                        "CommandBar.useCallback[runTask]": (s)=>[
                                                ...s.map({
                                                    "CommandBar.useCallback[runTask]": (i)=>({
                                                            ...i,
                                                            status: "done"
                                                        })
                                                }["CommandBar.useCallback[runTask]"]),
                                                {
                                                    id: "guardian",
                                                    label: data.message || "Guardian validation successful.",
                                                    status: "done"
                                                }
                                            ]
                                    }["CommandBar.useCallback[runTask]"]);
                                    finalJson = data;
                                } else if (data.event === "error") {
                                    throw new Error(data.detail);
                                }
                            } catch (e) {
                                // If it's a parse error from JSON.parse (partial chunk), we skip it and wait for more buffer.
                                // If it's the specific Error thrown above (data.event === "error"), we re-throw it to catch it outside the loop.
                                if (e instanceof Error && e.message.includes("Unexpected token")) continue;
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
                        latency_ms: Date.now() - (start || Date.now())
                    });
                } else {
                    throw new Error("Pipeline finished without a final response.");
                }
            } catch (err) {
                onResponse({
                    response: `⚠️ Error: ${err.message || "Unknown stream error"}`,
                    hash: "—",
                    routed_to: "—",
                    latency_ms: 0
                });
            } finally{
                setLoading(false);
                setStartTime(null);
                setQuery("");
                setSteps([]);
            }
        }
    }["CommandBar.useCallback[runTask]"], [
        loading,
        onResponse
    ]);
    const handleKey = (e)=>{
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIdx((i)=>Math.min(i + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIdx((i)=>Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault(); // Prevent accidental form submission
            const target = filtered[selectedIdx]?.label || query;
            runTask(target);
        } else if (e.key === "Escape") {
            setOpen(false);
        }
    };
    const tagColor = (tag)=>tag === "research" ? {
            bg: "rgba(99,102,241,0.12)",
            fg: "#a5b4fc"
        } : tag === "codereview" ? {
            bg: "rgba(245,158,11,0.12)",
            fg: "#fcd34d"
        } : {
            bg: "rgba(16,185,129,0.12)",
            fg: "#34d399"
        };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "command-trigger",
                onClick: ()=>setOpen(true),
                id: "cmd-trigger",
                type: "button",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchIcon, {}, void 0, false, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            flex: 1
                        },
                        children: "Orchestrate agents…"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "kbd",
                        children: "⌘"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "kbd",
                        children: "K"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                lineNumber: 229,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cmd-overlay",
                onClick: ()=>setOpen(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "cmd-box",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "cmd-input-wrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchIcon, {
                                    dim: true
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                    lineNumber: 247,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "cmd-input",
                                    autoFocus: true,
                                    placeholder: "Type a command or search…",
                                    value: query,
                                    onChange: (e)=>setQuery(e.target.value),
                                    onKeyDown: handleKey
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                    lineNumber: 248,
                                    columnNumber: 15
                                }, this),
                                loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "spinner"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                    lineNumber: 256,
                                    columnNumber: 27
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                            lineNumber: 246,
                            columnNumber: 13
                        }, this),
                        filtered.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "cmd-section-label",
                                    children: "Suggestions"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                    lineNumber: 262,
                                    columnNumber: 17
                                }, this),
                                filtered.slice(0, 6).map((s, i)=>{
                                    const c = tagColor(s.tag);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `cmd-item${i === selectedIdx ? " selected" : ""}`,
                                        onMouseEnter: ()=>setSelectedIdx(i),
                                        onClick: ()=>runTask(s.label),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "cmd-item-icon",
                                                style: {
                                                    background: c.bg,
                                                    color: c.fg
                                                },
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$types$2f$nexus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICONS"][s.icon] || "◈"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                                lineNumber: 274,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    flex: 1
                                                },
                                                children: s.label
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                                lineNumber: 280,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `tag ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$types$2f$nexus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TAG_CLASS"][s.tag]}`,
                                                children: s.tag
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                                lineNumber: 281,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, s.label, true, {
                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                        lineNumber: 266,
                                        columnNumber: 21
                                    }, this);
                                })
                            ]
                        }, void 0, true),
                        query.trim() && !filtered.find((f)=>f.label.toLowerCase() === query.toLowerCase()) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        height: 1,
                                        background: "rgba(16,185,129,0.08)",
                                        margin: "4px 0"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                    lineNumber: 294,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "cmd-item",
                                    style: {
                                        color: "#10b981"
                                    },
                                    onClick: ()=>runTask(query),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "cmd-item-icon",
                                            style: {
                                                background: "rgba(16,185,129,0.12)",
                                                color: "#34d399"
                                            },
                                            children: "⚡"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                            lineNumber: 306,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "Run:",
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    style: {
                                                        color: "#f0fdf4"
                                                    },
                                                    children: [
                                                        '"',
                                                        query,
                                                        '"'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                            lineNumber: 315,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                    lineNumber: 301,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "cmd-footer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "↑↓ navigate · Enter execute · Esc close"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                    lineNumber: 326,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "rgba(16,185,129,0.5)"
                                    },
                                    children: "Nexus Supervisor v4.5.3"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                    lineNumber: 327,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                            lineNumber: 325,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                    lineNumber: 244,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                lineNumber: 243,
                columnNumber: 9
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    inset: 0,
                    zIndex: 200,
                    background: "rgba(2,10,24,0.85)",
                    backdropFilter: "blur(12px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "nexus-card glow-emerald",
                    style: {
                        width: 440,
                        padding: "32px",
                        textAlign: "left"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 16,
                                marginBottom: 24
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "spinner",
                                    style: {
                                        width: 24,
                                        height: 24
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                    lineNumber: 361,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                fontSize: 14,
                                                fontWeight: 700,
                                                color: "#f0fdf4",
                                                margin: 0
                                            },
                                            children: "System Orchestration"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                            lineNumber: 363,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 11,
                                                color: "#6b7280",
                                                margin: "4px 0 0"
                                            },
                                            children: "Orchestrating through Nexus Supervisor Protocol V4"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                            lineNumber: 373,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                    lineNumber: 362,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginLeft: "auto",
                                        textAlign: "right",
                                        fontFamily: "'Fira Code', monospace"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 18,
                                                fontWeight: 700,
                                                color: "#34d399",
                                                transition: "color 0.3s"
                                            },
                                            children: [
                                                (elapsed / 1000).toFixed(1),
                                                "s"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                            lineNumber: 386,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 9,
                                                color: "#6b7280",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.1em"
                                            },
                                            children: "Processing"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                            lineNumber: 396,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                    lineNumber: 379,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                            lineNumber: 353,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: 12
                            },
                            children: steps.map((step)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 12,
                                        opacity: step.status === "done" ? 0.6 : 1
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 6,
                                                height: 6,
                                                borderRadius: "50%",
                                                background: step.status === "done" ? "#10b981" : "#34d399",
                                                boxShadow: step.status === "loading" ? "0 0 10px #34d399" : "none"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                            lineNumber: 420,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 12,
                                                fontFamily: "'Fira Code', monospace",
                                                color: step.status === "done" ? "#9ca3af" : "#34d399"
                                            },
                                            children: step.label
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                            lineNumber: 431,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, step.id, true, {
                                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                    lineNumber: 411,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                            lineNumber: 409,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: 32,
                                paddingTop: 16,
                                borderTop: "1px solid rgba(16,185,129,0.1)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 10,
                                    color: "#4b5563",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em"
                                },
                                children: "v4.5.3-LIVE"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                                lineNumber: 454,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                            lineNumber: 444,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                    lineNumber: 349,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                lineNumber: 337,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(CommandBar, "QGxAsz+TvME/Z5PO2F1pGgRLjnU=");
_c = CommandBar;
// ── Internal icon ──────────────────────────────────────────────────────────────
function SearchIcon({ dim }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        style: {
            color: dim ? "rgba(16,185,129,0.5)" : "rgba(16,185,129,0.6)",
            flexShrink: 0
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "11",
                cy: "11",
                r: "8"
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                lineNumber: 490,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m21 21-4.35-4.35"
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
                lineNumber: 491,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx",
        lineNumber: 476,
        columnNumber: 5
    }, this);
}
_c1 = SearchIcon;
var _c, _c1;
__turbopack_context__.k.register(_c, "CommandBar");
__turbopack_context__.k.register(_c1, "SearchIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/hooks/useNexusDashboard.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useNexusDashboard",
    ()=>useNexusDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
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
 */ "use client";
;
// ─── Constants ───────────────────────────────────────────────────────────────
const BACKEND_URL = ("TURBOPACK compile-time value", "http://localhost:8000") ?? "/api";
const SUPABASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const REALTIME_CHANNEL = "nexus_governance_live";
// SWR-like module-level cache (survives re-renders, not remounts)
let _snapshotCache = null;
let _lastFetchedAt = 0;
const STALE_AFTER_MS = 8_000; // 8s stale window
// ─── Internal helpers ────────────────────────────────────────────────────────
function agentIdFromRoutedTo(routed_to) {
    // e.g. "research_agent" → "research-agent"
    return routed_to.replace(/_/g, "-");
}
function buildAgentsFromMesh(stats) {
    const ICON_MAP = {
        nexus_node: "cpu",
        research_agent: "globe",
        codereview_agent: "shield",
        slack_agent: "message-square",
        guardian: "lock"
    };
    const ALL_AGENTS = [
        "nexus_node",
        "research_agent",
        "codereview_agent",
        "slack_agent"
    ];
    const statMap = new Map(stats.map((s)=>[
            s.agent_id,
            s
        ]));
    const totalTasks = stats.reduce((a, s)=>a + (s.tasks_completed ?? 0), 0) || 1;
    return ALL_AGENTS.map((agId)=>{
        const s = statMap.get(agId);
        const tasks = s?.tasks_completed ?? 0;
        return {
            id: agentIdFromRoutedTo(agId),
            name: agId.replace(/_/g, " ").replace(/\b\w/g, (c)=>c.toUpperCase()),
            status: tasks > 0 ? "online" : "idle",
            load: `${Math.min(Math.round(tasks / totalTasks * 100), 99)}%`,
            tasks_completed: tasks,
            latency_ms: s?.avg_latency_ms ?? 0,
            icon: ICON_MAP[agId] ?? "cpu"
        };
    });
}
function useNexusDashboard() {
    _s();
    const [agents, setAgents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [auditLog, setAuditLog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [usage, setUsage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [apiLive, setApiLive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isHydrated, setIsHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [meshLoading, setMeshLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [auditLoading, setAuditLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const isFetchingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const realtimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ── 1. Snapshot fetch via RPC (single round-trip) ──────────────────────
    const fetchSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNexusDashboard.useCallback[fetchSnapshot]": async (force = false)=>{
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
                    headers: {
                        "Cache-Control": "no-cache"
                    }
                });
                if (!res.ok) throw new Error(`Snapshot API ${res.status}`);
                const snap = await res.json();
                _snapshotCache = snap;
                _lastFetchedAt = Date.now();
                setAgents(buildAgentsFromMesh(snap.mesh_stats));
                setAuditLog(snap.recent_logs ?? []);
                setUsage(snap.usage ?? null);
                setApiLive(true);
            } catch  {
                // Fallback: individual fetches if snapshot endpoint isn't ready
                await Promise.allSettled([
                    _fallbackMesh(),
                    _fallbackAudit(),
                    _healthCheck()
                ]);
            } finally{
                isFetchingRef.current = false;
                setIsHydrated(true);
                setMeshLoading(false);
                setAuditLoading(false);
            }
        }
    }["useNexusDashboard.useCallback[fetchSnapshot]"], []);
    // ── 2. Lightweight fallbacks (used if /dashboard/snapshot isn't ready) ─
    const _healthCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNexusDashboard.useCallback[_healthCheck]": async ()=>{
            try {
                const r = await fetch(`${BACKEND_URL}/health`, {
                    signal: AbortSignal.timeout(2500)
                });
                setApiLive(r.ok);
            } catch  {
                setApiLive(false);
            }
        }
    }["useNexusDashboard.useCallback[_healthCheck]"], []);
    const _fallbackMesh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNexusDashboard.useCallback[_fallbackMesh]": async ()=>{
            try {
                const r = await fetch(`${BACKEND_URL}/mesh/status`, {
                    signal: AbortSignal.timeout(3000)
                });
                if (!r.ok) return;
                const data = await r.json();
                setAgents(data);
            } catch  {}
        }
    }["useNexusDashboard.useCallback[_fallbackMesh]"], []);
    const _fallbackAudit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNexusDashboard.useCallback[_fallbackAudit]": async ()=>{
            try {
                const r = await fetch(`${BACKEND_URL}/governance/log`, {
                    signal: AbortSignal.timeout(3000)
                });
                if (!r.ok) return;
                const data = await r.json();
                setAuditLog(data);
            } catch  {}
        }
    }["useNexusDashboard.useCallback[_fallbackAudit]"], []);
    // ── 3. Optimistic updates — instant UI, no spinner ─────────────────────
    const optimisticTaskComplete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNexusDashboard.useCallback[optimisticTaskComplete]": (routed_to, latency_ms)=>{
            // Immediately update the agent card's task count + latency
            setAgents({
                "useNexusDashboard.useCallback[optimisticTaskComplete]": (prev)=>prev.map({
                        "useNexusDashboard.useCallback[optimisticTaskComplete]": (a)=>a.id === agentIdFromRoutedTo(routed_to) ? {
                                ...a,
                                tasks_completed: a.tasks_completed + 1,
                                latency_ms,
                                status: "online"
                            } : a
                    }["useNexusDashboard.useCallback[optimisticTaskComplete]"])
            }["useNexusDashboard.useCallback[optimisticTaskComplete]"]);
            // Invalidate cache so next render triggers a background refresh
            _lastFetchedAt = 0;
            // Background re-fetch (non-blocking — user already sees updated state)
            setTimeout({
                "useNexusDashboard.useCallback[optimisticTaskComplete]": ()=>fetchSnapshot(true)
            }["useNexusDashboard.useCallback[optimisticTaskComplete]"], 500);
        }
    }["useNexusDashboard.useCallback[optimisticTaskComplete]"], [
        fetchSnapshot
    ]);
    // ── 4. Supabase Realtime WebSocket subscription ────────────────────────
    const connectRealtime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNexusDashboard.useCallback[connectRealtime]": ()=>{
            if (!SUPABASE_URL || !SUPABASE_ANON) return;
            // Supabase Realtime v2 WebSocket URL
            const wsUrl = `${SUPABASE_URL.replace("https://", "wss://")}/realtime/v1/websocket?apikey=${SUPABASE_ANON}&vsn=1.0.0`;
            try {
                const ws = new WebSocket(wsUrl);
                realtimeRef.current = ws;
                ws.onopen = ({
                    "useNexusDashboard.useCallback[connectRealtime]": ()=>{
                        // Join the governance_log channel (INSERT events only)
                        ws.send(JSON.stringify({
                            topic: `realtime:public:governance_log`,
                            event: "phx_join",
                            payload: {
                                config: {
                                    broadcast: {
                                        self: false
                                    },
                                    presence: {
                                        key: ""
                                    }
                                }
                            },
                            ref: "1"
                        }));
                    }
                })["useNexusDashboard.useCallback[connectRealtime]"];
                ws.onmessage = ({
                    "useNexusDashboard.useCallback[connectRealtime]": (msg)=>{
                        try {
                            const frame = JSON.parse(msg.data);
                            if (frame.event === "INSERT" && frame.payload?.record) {
                                const record = frame.payload.record;
                                // Prepend new row to audit log — zero-latency update
                                setAuditLog({
                                    "useNexusDashboard.useCallback[connectRealtime]": (prev)=>[
                                            {
                                                id: record.id,
                                                timestamp: record.timestamp,
                                                node: record.node,
                                                task_preview: record.task?.slice(0, 80) ?? "",
                                                sha256: record.sha256 ?? "",
                                                status: record.status ?? "verified"
                                            },
                                            ...prev.slice(0, 99)
                                        ]
                                }["useNexusDashboard.useCallback[connectRealtime]"]);
                            }
                        } catch  {}
                    }
                })["useNexusDashboard.useCallback[connectRealtime]"];
                ws.onerror = ({
                    "useNexusDashboard.useCallback[connectRealtime]": ()=>{
                        // Silently fall back to polling — no noise for the user
                        realtimeRef.current = null;
                    }
                })["useNexusDashboard.useCallback[connectRealtime]"];
                ws.onclose = ({
                    "useNexusDashboard.useCallback[connectRealtime]": ()=>{
                        // Reconnect after 5s on unclean close
                        setTimeout(connectRealtime, 5_000);
                    }
                })["useNexusDashboard.useCallback[connectRealtime]"];
            } catch  {
            // WebSocket not available (SSR, etc.) — polling is the fallback
            }
        }
    }["useNexusDashboard.useCallback[connectRealtime]"], []);
    // ── 5. Lifecycle: initial load + polling + realtime ────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useNexusDashboard.useEffect": ()=>{
            // Immediately serve from cache if available (instant hydration)
            fetchSnapshot();
            connectRealtime();
            // Polling: refresh every 8s only if realtime WS is NOT active
            const id = setInterval({
                "useNexusDashboard.useEffect.id": ()=>{
                    const wsAlive = realtimeRef.current?.readyState === WebSocket.OPEN;
                    if (!wsAlive) {
                        fetchSnapshot();
                    } else {
                        // WS active: just refresh mesh stats (audit covered by realtime)
                        _fallbackMesh();
                        _healthCheck();
                    }
                }
            }["useNexusDashboard.useEffect.id"], 8_000);
            return ({
                "useNexusDashboard.useEffect": ()=>{
                    clearInterval(id);
                    realtimeRef.current?.close();
                }
            })["useNexusDashboard.useEffect"];
        }
    }["useNexusDashboard.useEffect"], [
        fetchSnapshot,
        connectRealtime,
        _fallbackMesh,
        _healthCheck
    ]);
    return {
        agents,
        auditLog,
        usage,
        apiLive,
        meshLoading,
        auditLoading,
        isHydrated,
        optimisticTaskComplete,
        refresh: ()=>fetchSnapshot(true),
        refreshMesh: _fallbackMesh
    };
}
_s(useNexusDashboard, "LgYve4tYQ+X7qBusihBx2PMDfv0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MeshGraph",
    ()=>MeshGraph
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/lucide-react/dist/esm/icons/compass.js [app-client] (ecmascript) <export default as Compass>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/lucide-react/dist/esm/icons/brain.js [app-client] (ecmascript) <export default as Brain>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/lucide-react/dist/esm/icons/database.js [app-client] (ecmascript) <export default as Database>");
"use client";
;
;
;
const Node = ({ label, sublabel, x, y, icon, color, glowColor })=>{
    // Safe ID for filter
    const filterId = `glow-${label.replace(/[^a-zA-Z0-9]/g, "-")}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].g, {
        initial: {
            opacity: 0,
            scale: 0.8
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        transition: {
            duration: 0.5
        },
        style: {
            pointerEvents: "all"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                    id: filterId,
                    x: "-50%",
                    y: "-50%",
                    width: "200%",
                    height: "200%",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                            stdDeviation: "15",
                            result: "blur"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                            in: "SourceGraphic",
                            in2: "blur",
                            operator: "over"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: x,
                cy: y,
                r: "40",
                fill: glowColor,
                opacity: "0.1",
                filter: `url(#${filterId})`
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: x,
                cy: y,
                r: "32",
                fill: "#0a1122",
                stroke: color,
                strokeWidth: "2",
                style: {
                    filter: `drop-shadow(0 0 8px ${glowColor})`
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("foreignObject", {
                x: x - 12,
                y: y - 12,
                width: "24",
                height: "24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        color: color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    },
                    children: icon
                }, void 0, false, {
                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: x,
                y: y + 55,
                textAnchor: "middle",
                fill: "#e5e7eb",
                fontSize: "12",
                fontWeight: "600",
                style: {
                    userSelect: "none",
                    fontFamily: "inherit"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            sublabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: x,
                y: y + 70,
                textAnchor: "middle",
                fill: "#6b7280",
                fontSize: "10",
                style: {
                    userSelect: "none",
                    fontFamily: "inherit"
                },
                children: sublabel
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                lineNumber: 101,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Node;
const Connection = ({ x1, y1, x2, y2, color, delay = 0 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].line, {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                stroke: color,
                strokeWidth: "1.5",
                strokeOpacity: "0.15",
                initial: {
                    pathLength: 0
                },
                animate: {
                    pathLength: 1
                },
                transition: {
                    duration: 1,
                    delay
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                lineNumber: 132,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].circle, {
                r: "2",
                fill: color,
                initial: {
                    cx: x1,
                    cy: y1,
                    opacity: 0
                },
                animate: {
                    cx: [
                        x1,
                        x2
                    ],
                    cy: [
                        y1,
                        y2
                    ],
                    opacity: [
                        0,
                        1,
                        0
                    ]
                },
                transition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: delay + Math.random()
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                lineNumber: 145,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
        lineNumber: 131,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = Connection;
const MeshGraph = ()=>{
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
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                lineNumber: 176,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            color: "#8ab4f8",
            glowColor: "rgba(138, 180, 248, 0.4)"
        },
        {
            id: "router",
            label: "GROQ ROUTER",
            sublabel: "Llama 3.3 70B",
            x: centerX - 150,
            y: centerY,
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__["Compass"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                lineNumber: 186,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            color: "#10b981",
            glowColor: "rgba(16, 185, 129, 0.4)"
        },
        // Agents
        {
            id: "research",
            label: "RESEARCH",
            sublabel: "Tavily + Gemini",
            x: centerX + 50,
            y: centerY - 120,
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                lineNumber: 197,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            color: "#34d399",
            glowColor: "rgba(52, 211, 153, 0.4)"
        },
        {
            id: "codereview",
            label: "CODE REVIEW",
            sublabel: "Gemini 2.0 Flash",
            x: centerX + 50,
            y: centerY - 40,
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                lineNumber: 207,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            color: "#34d399",
            glowColor: "rgba(52, 211, 153, 0.4)"
        },
        {
            id: "nexus",
            label: "NEXUS NODE",
            sublabel: "Diagnostics",
            x: centerX + 50,
            y: centerY + 40,
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                lineNumber: 217,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            color: "#34d399",
            glowColor: "rgba(52, 211, 153, 0.4)"
        },
        {
            id: "slack",
            label: "SLACK",
            sublabel: "Socket Mode",
            x: centerX + 50,
            y: centerY + 120,
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                lineNumber: 227,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            color: "#34d399",
            glowColor: "rgba(52, 211, 153, 0.4)"
        },
        // Final chain
        {
            id: "guardian",
            label: "GUARDIAN",
            sublabel: "PII Scrub + SHA-256",
            x: centerX + 250,
            y: centerY,
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                lineNumber: 238,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            color: "#fbbf24",
            glowColor: "rgba(251, 191, 36, 0.4)"
        },
        {
            id: "supabase",
            label: "LEDGER",
            sublabel: "Dual-Supabase",
            x: centerX + 400,
            y: centerY,
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                lineNumber: 248,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            color: "#3ECF8E",
            glowColor: "rgba(62, 207, 142, 0.4)"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-[300px] md:h-[500px] overflow-hidden rounded-xl bg-[#060e1a]/80 border border-white/5 relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 left-6 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "status-dot online"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-[#34d399] font-bold tracking-widest uppercase font-mono",
                        children: "Live Mesh Overview"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                lineNumber: 256,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 900 600",
                preserveAspectRatio: "xMidYMid meet",
                className: "w-full h-full",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                            id: "grid",
                            width: "40",
                            height: "40",
                            patternUnits: "userSpaceOnUse",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M 40 0 L 0 0 0 40",
                                fill: "none",
                                stroke: "rgba(255,255,255,0.03)",
                                strokeWidth: "1"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                                lineNumber: 276,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                            lineNumber: 270,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                        lineNumber: 269,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "100%",
                        height: "100%",
                        fill: "url(#grid)"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                        lineNumber: 284,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Connection, {
                        x1: nodes[0].x,
                        y1: nodes[0].y,
                        x2: nodes[1].x,
                        y2: nodes[1].y,
                        color: "#8ab4f8"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                        lineNumber: 287,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    [
                        2,
                        3,
                        4,
                        5
                    ].map((i, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Connection, {
                            x1: nodes[1].x,
                            y1: nodes[1].y,
                            x2: nodes[i].x,
                            y2: nodes[i].y,
                            color: "#10b981",
                            delay: 0.2 + idx * 0.1
                        }, nodes[i].id, false, {
                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                            lineNumber: 297,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))),
                    [
                        2,
                        3,
                        4,
                        5
                    ].map((i, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Connection, {
                            x1: nodes[i].x,
                            y1: nodes[i].y,
                            x2: nodes[6].x,
                            y2: nodes[6].y,
                            color: "#34d399",
                            delay: 1.2 + idx * 0.1
                        }, `to-guardian-${nodes[i].id}`, false, {
                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                            lineNumber: 310,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Connection, {
                        x1: nodes[6].x,
                        y1: nodes[6].y,
                        x2: nodes[7].x,
                        y2: nodes[7].y,
                        color: "#fbbf24",
                        delay: 2.0
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    nodes.map((node)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Node, {
                            ...node
                        }, node.id, false, {
                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                            lineNumber: 333,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
                lineNumber: 263,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx",
        lineNumber: 255,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c2 = MeshGraph;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Node");
__turbopack_context__.k.register(_c1, "Connection");
__turbopack_context__.k.register(_c2, "MeshGraph");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$types$2f$nexus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/types/nexus.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$components$2f$MeshCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$components$2f$CommandBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/CommandBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$hooks$2f$useNexusDashboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/hooks/useNexusDashboard.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$components$2f$MeshGraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/MeshGraph.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
// ── Code-split heavy components (lazy-loaded post-paint) ─────────────────────
const VirtualGovernanceTable = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx [app-client] (ecmascript, async loader)").then((m)=>({
            default: m.VirtualGovernanceTable
        })));
_c = VirtualGovernanceTable;
// ── Tab skeleton shown until VirtualGovernanceTable chunk loads ──────────────
function AuditSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: "40px 20px",
            textAlign: "center",
            color: "#4b5563",
            fontSize: 12
        },
        children: "Loading audit chain…"
    }, void 0, false, {
        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c1 = AuditSkeleton;
function Home() {
    _s();
    const { agents, auditLog, usage, apiLive, meshLoading, isHydrated, optimisticTaskComplete, refresh } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$hooks$2f$useNexusDashboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNexusDashboard"])();
    const [response, setResponse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("output");
    // ── Task response handler ──────────────────────────────
    const handleResponse = (r)=>{
        setResponse(r);
        setActiveTab("output");
        // Optimistic: instantly flash the routed agent's counter up
        if (r.routed_to && r.routed_to !== "—") {
            optimisticTaskComplete(r.routed_to, r.latency_ms);
        }
    };
    const routedLabel = (s)=>s.replace(/_/g, " ").replace(/\b\w/g, (c)=>c.toUpperCase());
    // ─────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "relative min-h-screen flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid-bg"
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "scanlines"
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "sticky top-0 z-50 glass border-b border-white/5 px-4 md:px-8 flex items-center h-16 gap-4 md:gap-8 overflow-x-auto no-scrollbar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 flex-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-sm shadow-[0_0_15px_var(--primary-glow)]",
                                children: "⬡"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden sm:block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-bold tracking-tight text-white leading-tight",
                                        children: "NEXUS"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-text-secondary tracking-[0.15em] uppercase font-medium",
                                        children: "Command Center"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                        lineNumber: 93,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex justify-center items-center gap-2 md:gap-3 whitespace-nowrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `status-dot ${apiLive === null ? "idle" : apiLive ? "online" : "offline"}`
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] md:text-xs text-text-secondary font-mono",
                                children: apiLive === null ? "Connecting…" : apiLive ? `SYSTEM READY — 8000` : "NODE UNREACHABLE"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 items-center flex-none",
                        children: [
                            usage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "tag px-2 md:px-3 py-1 bg-primary/5 border border-primary/10 text-primary/60 font-medium hidden xs:inline-flex",
                                children: [
                                    usage.task_count,
                                    " tasks"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "tag px-2 md:px-3 py-1 bg-white/5 border border-white/10 text-text-secondary font-medium hidden md:inline-flex",
                                children: "GOVERNANCE PROTOCOL V4"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "tag px-2 md:px-3 py-1 bg-primary/10 border border-primary/20 text-primary font-medium",
                                children: [
                                    "v",
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$types$2f$nexus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VERSION"]
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-[1280px] w-full mx-auto px-4 md:px-8 py-8 md:py-14 flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: "center",
                            marginBottom: 56
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "status-dot online"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                        lineNumber: 137,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-primary font-bold tracking-[0.1em] uppercase",
                                        children: "Orchestrator Active · Gemini 2.0 Flash"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.05]",
                                children: "Nexus Command Center"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm md:text-base text-[#6b7280] max-w-[540px] mx-auto mb-8 leading-relaxed",
                                children: "Orchestrate Research, CodeReview, and Nexus-Node agents via the Supervisor pattern. Every output is Guardian-validated and SHA-256 committed."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$components$2f$CommandBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandBar"], {
                                onResponse: handleResponse
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        style: {
                            marginBottom: 48
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: 20
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 10
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 18,
                                                    color: "#10b981"
                                                },
                                                children: "◈"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                lineNumber: 167,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    fontSize: 13,
                                                    fontWeight: 600,
                                                    color: "#9ca3af",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.1em",
                                                    margin: 0
                                                },
                                                children: "Agent Mesh — Live Status"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                lineNumber: 168,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: refresh,
                                        style: {
                                            background: "rgba(16,185,129,0.08)",
                                            border: "1px solid rgba(16,185,129,0.15)",
                                            borderRadius: 8,
                                            padding: "5px 12px",
                                            fontSize: 11,
                                            color: "#34d399",
                                            cursor: "pointer",
                                            fontFamily: "ui-monospace, monospace",
                                            transition: "all 0.2s"
                                        },
                                        children: "↻ Refresh"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
                                children: !isHydrated || meshLoading ? [
                                    ...Array(4)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$components$2f$MeshCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshCardSkeleton"], {}, i, false, {
                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                        lineNumber: 203,
                                        columnNumber: 45
                                    }, this)) : agents.length > 0 ? agents.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$components$2f$MeshCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshCard"], {
                                        agent: a
                                    }, a.id, false, {
                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                        lineNumber: 205,
                                        columnNumber: 35
                                    }, this)) : [
                                    ...Array(4)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$components$2f$MeshCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshCardSkeleton"], {}, i, false, {
                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                        lineNumber: 206,
                                        columnNumber: 45
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    (response || auditLog.length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1 mb-4 bg-[#060e1a]/80 rounded-xl p-1 w-fit border border-[#10b981]/10 overflow-x-auto no-scrollbar max-w-full",
                                children: [
                                    "output",
                                    "audit",
                                    "graph"
                                ].map((key)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveTab(key),
                                        className: `px-4 md:px-6 py-2 rounded-lg border-none cursor-pointer text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeTab === key ? "bg-[#10b981]/15 text-[#34d399]" : "bg-transparent text-[#6b7280]"}`,
                                        children: key === "output" ? "Output" : key === "audit" ? `Audit (${auditLog.length})` : "Graph"
                                    }, key, false, {
                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                        lineNumber: 216,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 214,
                                columnNumber: 13
                            }, this),
                            activeTab === "output" && response && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "response-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col md:flex-row md:items-center justify-between p-4 md:px-6 md:py-4 border-b border-[#10b981]/10 bg-[#10b981]/5 gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-[#10b981]",
                                                        children: "⬡"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-bold text-[#34d399] tracking-wider font-mono",
                                                        children: "SUPERVISOR OUTPUT"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                        lineNumber: 240,
                                                        columnNumber: 21
                                                    }, this),
                                                    response.routed_to !== "—" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `tag text-[9px] ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$types$2f$nexus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTED_TAG"][response.routed_to] || "tag-emerald"}`,
                                                        children: routedLabel(response.routed_to)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                        lineNumber: 244,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                lineNumber: 238,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between md:justify-end gap-4",
                                                children: [
                                                    response.latency_ms > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-[#6b7280] font-mono",
                                                        children: [
                                                            response.latency_ms,
                                                            "ms"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "tag tag-emerald text-[9px]",
                                                        children: "✓ Verified"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                        lineNumber: 259,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                lineNumber: 253,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                        lineNumber: 237,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "response-body",
                                        dangerouslySetInnerHTML: {
                                            __html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$types$2f$nexus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatResponse"])(response.response)
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                        lineNumber: 266,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col sm:flex-row sm:items-center justify-between p-4 md:px-6 md:py-3 border-t border-[#10b981]/8 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-[#6b7280] font-mono flex-none",
                                                        children: "SHA-256"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                        lineNumber: 275,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono truncate text-[10px] text-[#10b981]/70",
                                                        title: response.hash,
                                                        children: response.hash || "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                        lineNumber: 278,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                lineNumber: 274,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap items-center gap-4 text-[10px] text-[#4b5563] font-mono",
                                                children: [
                                                    response.langfuse_trace && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: `https://cloud.langfuse.com/project/${("TURBOPACK compile-time value", "151c8a83-80b3-4da3-9383-8ca9002dd4f0")}/traces/${response.langfuse_trace}`,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: "text-primary hover:underline flex items-center gap-1.5",
                                                        children: "◉ VIEW TRACE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                        lineNumber: 287,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "hidden xs:inline",
                                                        children: "Nexus Protocol v4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                lineNumber: 285,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                        lineNumber: 273,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 236,
                                columnNumber: 15
                            }, this),
                            activeTab === "graph" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "nexus-card",
                                style: {
                                    padding: 24
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$components$2f$MeshGraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshGraph"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                    lineNumber: 304,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 303,
                                columnNumber: 15
                            }, this),
                            activeTab === "audit" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "nexus-card",
                                style: {
                                    padding: 0,
                                    overflow: "hidden"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: "16px 20px",
                                            borderBottom: "1px solid rgba(16,185,129,0.08)",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 10
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#8b5cf6"
                                                },
                                                children: "⬧"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                lineNumber: 323,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 12,
                                                    fontWeight: 600,
                                                    color: "#a78bfa",
                                                    fontFamily: "Fira Code, monospace",
                                                    letterSpacing: "0.05em"
                                                },
                                                children: "GOVERNANCE AUDIT CHAIN"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                lineNumber: 324,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "tag",
                                                style: {
                                                    marginLeft: "auto",
                                                    background: "rgba(139,92,246,0.1)",
                                                    color: "#c4b5fd",
                                                    borderColor: "rgba(139,92,246,0.2)"
                                                },
                                                children: "SHA-256 Immutable"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                lineNumber: 335,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 9,
                                                    color: "#10b981",
                                                    fontFamily: "monospace",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 4
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "status-dot online"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                        lineNumber: 357,
                                                        columnNumber: 21
                                                    }, this),
                                                    "REALTIME"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                                lineNumber: 347,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                        lineNumber: 314,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                                        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuditSkeleton, {}, void 0, false, {
                                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                            lineNumber: 363,
                                            columnNumber: 37
                                        }, void 0),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VirtualGovernanceTable, {
                                            entries: auditLog,
                                            maxHeight: 420
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                            lineNumber: 364,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                        lineNumber: 363,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 310,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                        lineNumber: 212,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "relative z-10 border-t border-[#10b981]/8 px-4 md:px-8 py-6 md:py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-[#4b5563] font-mono bg-[#020712]/50 backdrop-blur-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-center md:text-left",
                        children: [
                            "NEXUS COMMAND CENTER © 2026 · Supervisor Protocol v",
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$types$2f$nexus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VERSION"]
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                        lineNumber: 374,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap justify-center gap-x-6 gap-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "LangGraph"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 378,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Gemini 2.0 Flash"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 379,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: "Dual-Supabase"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 380,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[#34d399]",
                                children: "● LIVE"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                                lineNumber: 381,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                        lineNumber: 377,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
                lineNumber: 373,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/app/page.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_s(Home, "5Wo2e0COvLNvWMMUgzbGZT+xHd8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$src$2f$hooks$2f$useNexusDashboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNexusDashboard"]
    ];
});
_c2 = Home;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "VirtualGovernanceTable");
__turbopack_context__.k.register(_c1, "AuditSkeleton");
__turbopack_context__.k.register(_c2, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_AGENT%20DEV%20PROJECTS%20IMP%20_NEXUS%20COMMAND_frontend_src_f62d379b._.js.map