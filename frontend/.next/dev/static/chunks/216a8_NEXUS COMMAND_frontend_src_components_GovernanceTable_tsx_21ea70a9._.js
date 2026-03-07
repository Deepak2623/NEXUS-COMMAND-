(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GovernanceTable",
    ()=>GovernanceTable,
    "VirtualGovernanceTable",
    ()=>VirtualGovernanceTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
// ─── Constants ────────────────────────────────────────────────────────────────
const ROW_HEIGHT = 44; // px — must match CSS
const OVERSCAN = 5; // extra rows rendered above/below viewport
const MAX_ROWS = 100; // cap the list to prevent memory bloat
// ─── Row (memoized to prevent re-renders on scroll) ───────────────────────────
const GovernanceRow = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(function GovernanceRow({ entry, isNew }) {
    const timeStr = (()=>{
        try {
            return new Date(entry.timestamp).toLocaleTimeString();
        } catch  {
            return entry.timestamp ?? "—";
        }
    })();
    const nodeColor = entry.node === "guardian" ? {
        bg: "rgba(139,92,246,0.1)",
        fg: "#c4b5fd",
        border: "rgba(139,92,246,0.2)"
    } : entry.node?.includes("research") ? {
        bg: "rgba(99,102,241,0.1)",
        fg: "#a5b4fc",
        border: "rgba(99,102,241,0.2)"
    } : entry.node?.includes("code") ? {
        bg: "rgba(245,158,11,0.1)",
        fg: "#fcd34d",
        border: "rgba(245,158,11,0.2)"
    } : {
        bg: "rgba(16,185,129,0.1)",
        fg: "#34d399",
        border: "rgba(16,185,129,0.2)"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `gov-row${isNew ? " gov-row--new" : ""}`,
        style: {
            height: ROW_HEIGHT
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "gov-cell gov-cell--mono gov-cell--time",
                children: timeStr
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "gov-cell",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "gov-badge",
                    style: {
                        background: nodeColor.bg,
                        color: nodeColor.fg,
                        borderColor: nodeColor.border
                    },
                    children: entry.node ?? "—"
                }, void 0, false, {
                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "gov-cell gov-cell--task",
                title: entry.task_preview,
                children: entry.task_preview ?? "—"
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "gov-cell gov-cell--mono gov-cell--hash",
                title: entry.sha256,
                children: entry.sha256 ? `${entry.sha256.slice(0, 14)}…` : "—"
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "gov-cell gov-cell--mono gov-cell--right",
                children: entry.latency_ms ? `${entry.latency_ms}ms` : "—"
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "gov-cell gov-cell--right",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "gov-badge",
                    style: {
                        background: "rgba(16,185,129,0.1)",
                        color: "#34d399",
                        borderColor: "rgba(16,185,129,0.2)"
                    },
                    children: [
                        "✓ ",
                        entry.status ?? "verified"
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
});
_c = GovernanceRow;
function VirtualGovernanceTable({ entries, maxHeight = 480 }) {
    _s();
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [scrollTop, setScrollTop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [newIds, setNewIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const prevIdsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const capped = entries.slice(0, MAX_ROWS);
    const totalH = capped.length * ROW_HEIGHT;
    const visibleRows = Math.ceil(maxHeight / ROW_HEIGHT);
    const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
    const endIndex = Math.min(capped.length - 1, startIndex + visibleRows + OVERSCAN * 2);
    // Detect new rows (by id) for entrance animation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VirtualGovernanceTable.useEffect": ()=>{
            const currentIds = new Set(capped.map({
                "VirtualGovernanceTable.useEffect": (e)=>e.id
            }["VirtualGovernanceTable.useEffect"]));
            const fresh = new Set();
            currentIds.forEach({
                "VirtualGovernanceTable.useEffect": (id)=>{
                    if (!prevIdsRef.current.has(id)) fresh.add(id);
                }
            }["VirtualGovernanceTable.useEffect"]);
            if (fresh.size > 0) {
                setNewIds(fresh);
                const t = setTimeout({
                    "VirtualGovernanceTable.useEffect.t": ()=>setNewIds(new Set())
                }["VirtualGovernanceTable.useEffect.t"], 800);
                prevIdsRef.current = currentIds;
                return ({
                    "VirtualGovernanceTable.useEffect": ()=>clearTimeout(t)
                })["VirtualGovernanceTable.useEffect"];
            }
            prevIdsRef.current = currentIds;
        }
    }["VirtualGovernanceTable.useEffect"], [
        capped
    ]);
    const onScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VirtualGovernanceTable.useCallback[onScroll]": (e)=>{
            setScrollTop(e.target.scrollTop);
        }
    }["VirtualGovernanceTable.useCallback[onScroll]"], []);
    if (!entries.length) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "gov-empty",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "gov-empty-icon",
                    children: "⬧"
                }, void 0, false, {
                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "No audit entries yet."
                }, void 0, false, {
                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Run a task to populate the governance chain."
                }, void 0, false, {
                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                    lineNumber: 170,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
            lineNumber: 167,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "gov-table-wrap",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "gov-header",
                children: [
                    "Timestamp",
                    "Node",
                    "Task",
                    "SHA-256",
                    "Latency",
                    "Status"
                ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "gov-header-cell",
                        children: h
                    }, h, false, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                        lineNumber: 181,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: scrollRef,
                className: "gov-scroll",
                style: {
                    height: maxHeight,
                    overflowY: "auto"
                },
                onScroll: onScroll,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "relative",
                        height: totalH
                    },
                    children: capped.slice(startIndex, endIndex + 1).map((entry, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: "absolute",
                                top: (startIndex + i) * ROW_HEIGHT,
                                left: 0,
                                right: 0,
                                contentVisibility: "auto",
                                containIntrinsicSize: `0 ${ROW_HEIGHT}px`
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GovernanceRow, {
                                entry: entry,
                                isNew: newIds.has(entry.id)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                                lineNumber: 210,
                                columnNumber: 15
                            }, this)
                        }, entry.id, false, {
                            fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                            lineNumber: 199,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "gov-footer-bar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            entries.length,
                            " entries · Last sync:",
                            " ",
                            new Date().toLocaleTimeString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "rgba(16,185,129,0.5)"
                        },
                        children: "Realtime ●"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
_s(VirtualGovernanceTable, "AfP3PjwqJ5LX7cf3aUawGDNrpXc=");
_c1 = VirtualGovernanceTable;
function GovernanceTable({ entries }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AGENT__DEV__PROJECTS__IMP__$2f$NEXUS__COMMAND$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VirtualGovernanceTable, {
        entries: entries
    }, void 0, false, {
        fileName: "[project]/Desktop/AGENT DEV PROJECTS IMP /NEXUS COMMAND/frontend/src/components/GovernanceTable.tsx",
        lineNumber: 231,
        columnNumber: 10
    }, this);
}
_c2 = GovernanceTable;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "GovernanceRow");
__turbopack_context__.k.register(_c1, "VirtualGovernanceTable");
__turbopack_context__.k.register(_c2, "GovernanceTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=216a8_NEXUS%20COMMAND_frontend_src_components_GovernanceTable_tsx_21ea70a9._.js.map