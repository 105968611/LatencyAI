import type { Page, Severity, Report, } from "../types";
import type { ReactNode } from "react";

import LineChart from "../components/LineChart";
import AnomalyBox from "../components/AnomalyBox";

type DashboardProps = {
    report?: Report;
    onNavigate: (page: Page) => void;
};

const SEVERITY_STYLES: Record<Severity, { badge: string; label: string; color: string }> = {
    critical: { badge: "bg-red-200 text-red-500", label: "Critical", color: "#EF4444" },
    warning: { badge: "bg-orange-200 text-orange-500", label: "Warning", color: "#FB923C" },
    info: { badge: "bg-green-200 text-green-600", label: "Info", color: "#22A055" },
};

{/* FAKE UI ELEMENTS, THESE WILL BE DELETED UPON DYNAMIC STATS IMPLEMENTATION */ }
function Card({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
    return (
        <section className={`rounded-2xl bg-orange-50 p-6 ${className}`}>
            {title && <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-orange-500">{title}</h2>}
            {children}
        </section>
    );
}

{/* FAKE UI ELEMENTS, THESE WILL BE DELETED UPON DYNAMIC STATS IMPLEMENTATION */ }
function RiskRing({ score }: { score: number }) {
    const r = 42;
    const c = 2 * Math.PI * r;
    return (
        <div className="relative h-32 w-32">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" role="img" aria-label={`Risk score ${score} out of 100`}>
                <circle cx="50" cy="50" r={r} fill="none" strokeWidth="7" className="stroke-[#0B1437]" />
                <circle
                    cx="50" cy="50" r={r} fill="none" strokeWidth="7" strokeLinecap="round"
                    className="stroke-orange-400"
                    strokeDasharray={`${(score / 100) * c} ${c}`}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[#0B1437]">{score}</span>
                <span className="text-[10px] text-slate-700">RISK SCORE</span>
            </div>
        </div>
    );
}
{/* FAKE UI ELEMENTS, THESE WILL BE DELETED UPON DYNAMIC STATS IMPLEMENTATION */ }
function StatBox({ value, label }: { value: string; label: string }) {
    return (
        <div className="rounded-xl border border-orange-400 bg-orange-50 px-5 py-4">
            <p className="text-3xl font-bold text-[#0B1437]">{value}</p>
            <p className="text-xs text-slate-700">{label}</p>
        </div>
    );
}



/* ---------- Severity donut ---------- */
{/* HAS TO BE CHNAGED TO D3 OR ANY OTHER CHART LIBRARY */ }
function SeverityDonut({ counts }: { counts: Record<Severity, number> }) {
    const order: Severity[] = ["info", "warning", "critical"];
    const total = order.reduce((sum, k) => sum + counts[k], 0);
    const r = 38;
    const c = 2 * Math.PI * r;
    let offset = 0;

    return (
        <div className="flex flex-col items-center">
            <svg viewBox="0 0 100 100" className="h-40 w-40 -rotate-90" role="img" aria-label="Severity breakdown">
                {order.map((k) => {
                    const len = (counts[k] / total) * c;
                    const el = (
                        <circle
                            key={k} cx="50" cy="50" r={r} fill="none" strokeWidth="14"
                            stroke={SEVERITY_STYLES[k].color}
                            strokeDasharray={`${len} ${c - len}`}
                            strokeDashoffset={-offset}
                        />
                    );
                    offset += len;
                    return el;
                })}
            </svg>

            <ul className="mt-5 w-40 space-y-2 text-xs text-slate-700">
                {order.map((k) => (
                    <li key={k} className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: SEVERITY_STYLES[k].color }} />
                        <span className="flex-1">{SEVERITY_STYLES[k].label}</span>
                        <span>{counts[k]}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* ---------- Anomaly accordion row ---------- */
{/* HAS TO BE CHNAGED TO D3 OR ANY OTHER CHART LIBRARY */ }


const REPORT: Report = {
    fileName: "aws_user_activity.log",
    meta: "12,480 lines analyzed · Aug 25, 2026, 00:00–23:59 · finished in 4.2s",
    riskScore: 68,
    riskLabel: "MEDIUM–HIGH RISK",
    verdictHeadline: "Suspicious activity detected.",
    verdictBody:
        "The model flagged 7 entries as anomalous out of 12,480 — a rate roughly 14× this log's usual baseline. The strongest signal is a repeated authentication pattern from a single IP.",
    reasoning:
        "Why: 5 of the 7 anomalies are failed-login attempts against admin accounts from 203.0.113.44, clustered inside an 11-minute window at 03:12–03:23 — a timing and volume pattern consistent with credential-stuffing rather than normal user error.",
    linesAnalyzed: 12480,
    anomaliesFound: 7,
    avgConfidence: 91,
    timeline: {
        normal: [480, 240, 570, 130, 680, 160, 320],
        anomaly: [700, 380, 980, 770, 200, 750, 980],
        critical: [730, 580, 820, 680, 210, 560, 320],
    },
    severityCounts: { info: 3, warning: 3, critical: 1 },
    anomalies: [
        {
            id: "a1",
            time: "03:12:04",
            severity: "critical",
            title: "Credential stuffing",
            entry: "POST /admin/login 401 — user=admin",
            confidence: 96,
            explanation:
                "5 failed logins against admin accounts from 203.0.113.44 within 11 minutes — 40× faster than this source's typical retry rate. Flagged as credential stuffing, not user error.",
        },
        {
            id: "a2",
            time: "11:40:51",
            severity: "warning",
            title: "Unusual endpoint",
            entry: "POST /admin/login 401 — user=admin",
            confidence: 88,
            explanation:
                "This endpoint is rarely hit during business hours for this source. Worth checking whether the request came from a known client.",
        },
    ],
    insights: [
        { id: "i1", icon: "clock", text: "71% of flagged activity happened between 21:00–04:00, well outside normal usage hours for this system." },
        { id: "i2", icon: "chart", text: "One IP address accounts for every critical anomaly — worth an allow/deny-list review." },
        { id: "i3", icon: "bolt", text: "No repeat pattern from previous scans — this appears to be a new threat, not an ongoing one." },
    ],
};

export default function Dashboard({
    report = REPORT,
    onNavigate,
}: DashboardProps) {
    return (
        <main className="flex-1 overflow-y-auto px-12 py-10">
            <header className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-[#0B1437]">{report.fileName}</h1>
                    <p className="mt-1 text-[11px] text-slate-700">{report.meta}</p>
                </div>
                <div className="flex gap-4">
                    <button type="button"
                        onClick={() => onNavigate("uploadlogs")}
                        className="rounded-lg bg-blue-200 px-6 py-3 text-sm font-medium text-[#0B1437] transition-colors hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500">
                        New Scan
                    </button>
                    <button type="button"
                        className="rounded-lg bg-[#0B1437] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#16205a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">
                        Export Report
                    </button>
                </div>
            </header>

            {/* Risk + conclusion */}
            <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
                <Card className="flex flex-col items-center justify-center gap-4">
                    <RiskRing score={report.riskScore} />
                    <span className="rounded-full bg-orange-200 px-3 py-1 text-[10px] font-semibold text-orange-500">
                        {report.riskLabel}
                    </span>
                </Card>

                <Card title="Conclusion & reasoning">
                    <p className="text-sm leading-relaxed text-slate-900">
                        <span className="font-semibold text-orange-500">{report.verdictHeadline}</span>{" "}
                        {report.verdictBody}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-slate-900">{report.reasoning}</p>
                </Card>
            </div>

            {/* Stat boxes */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatBox value={report.linesAnalyzed.toLocaleString()} label="Lines analyzed" />
                <StatBox value={String(report.anomaliesFound)} label="Anomalies Found" />
                <StatBox value={`${report.avgConfidence}%`} label="Avg. model confidence" />
            </div>

            {/* Charts */}
            <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
                <Card title="Anomaly timeline">
                    <LineChart data={report.timeline} />
                </Card>
                <Card title="Severity breakdown">
                    <SeverityDonut counts={report.severityCounts} />
                </Card>
            </div>

            {/* Anomalies + insights */}
            <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
                <Card title="Detected anomalies">
                    <ul className="space-y-4">
                        {report.anomalies.map((a) => (
                            <AnomalyBox key={a.id} a={a} />
                        ))}
                    </ul>
                </Card>

                <Card title="Observations and insights">
                    <ul className="space-y-4">
                        {report.insights.map((i) => (
                            <li key={i.id} className="flex items-start gap-3 text-xs leading-relaxed text-slate-800">
                                {/*<InsightIcon name={i.icon} />*/}
                                <span>{i.text}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </main>
    )
}