import type { Anomaly, Severity } from "../types";
import { useState } from "react";


const SEVERITY_STYLES: Record<Severity, { badge: string; label: string; color: string }> = {
    critical: { badge: "bg-red-200 text-red-500", label: "Critical", color: "#EF4444" },
    warning: { badge: "bg-orange-200 text-orange-500", label: "Warning", color: "#FB923C" },
    info: { badge: "bg-green-200 text-green-600", label: "Info", color: "#22A055" },
};


function AnomalyBox({ a }: { a: Anomaly }) {
    const [open, setOpen] = useState(a.severity === "critical");
    const s = SEVERITY_STYLES[a.severity];
    const panelId = `anomaly-${a.id}`;

    return (
        <li className="rounded-xl border border-orange-300">
            <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((o) => !o)}
                className="w-full rounded-xl px-4 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
            >
                <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-800">{a.time}</span>
                    <span className={`rounded-full px-5 py-0.5 text-xs font-semibold ${s.badge}`}>{s.label}</span>
                    <span className="text-xs font-semibold text-orange-500">{a.title}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-800">
                    <span>{a.entry}</span>
                    <span className="flex items-center gap-6">
                        {a.confidence}%
                        <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform ${open ? "" : "rotate-180"}`}
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m6 15 6-6 6 6" />
                        </svg>
                    </span>
                </div>
            </button>

            {open && (
                <div id={panelId} className="border-t border-orange-200 px-4 py-3 text-xs leading-relaxed text-slate-800">
                    <span className="font-bold">What the model saw:</span> {a.explanation}
                </div>
            )}
        </li>
    );
}

export default AnomalyBox;