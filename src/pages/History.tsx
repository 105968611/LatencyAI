import { useState } from "react";
import UsageChart from "../components/BarChart";
import { FileIcon } from "@phosphor-icons/react";

type ScanRecord = {
    id: string;
    fileName: string;
    lines: number;
    analysedAt: string;
    riskScore: number;
    riskLabel: string;
    verdictHeadline: string;
    verdictBody: string;
    reasoning: string;
};
type UsagePoint = { index: number; fileName: string; lines: number };

const USAGE: UsagePoint[] = [
    { index: 0, fileName: "auth_boot.log", lines: 500 },
    { index: 1, fileName: "nginx_access.log", lines: 5000 },
    { index: 2, fileName: "aws_activity.log", lines: 80000 },
    { index: 3, fileName: "cron_jobs.log", lines: 5200 },
    { index: 4, fileName: "app_server.log", lines: 88000 },
    { index: 5, fileName: "db_queries.log", lines: 43500 },
    { index: 6, fileName: "vpn_sessions.log", lines: 31000 },
    { index: 7, fileName: "api_gateway.log", lines: 46000 },
    { index: 8, fileName: "aws_user_activity.log", lines: 50000 },
    { index: 9, fileName: "payments.log", lines: 85000 },
];


const VERDICT_BODY =
    "The model flagged 7 entries as anomalous out of 12,480 — a rate roughly 14× this log's usual baseline. The strongest signal is a repeated authentication pattern from a single IP.";
const REASONING =
    "Why: 5 of the 7 anomalies are failed-login attempts against admin accounts from 203.0.113.44, clustered inside an 11-minute window at 03:12–03:23 — a timing and volume pattern consistent with credential-stuffing rather than normal user error.";

const SCANS: ScanRecord[] = [
    {
        id: "s1", fileName: "aws_user_activity.log", lines: 9204, analysedAt: "yesterday, 22:14",
        riskScore: 68, riskLabel: "MEDIUM–HIGH RISK",
        verdictHeadline: "Suspicious activity detected.", verdictBody: VERDICT_BODY, reasoning: REASONING,
    },
    {
        id: "s2", fileName: "aws_activity.log", lines: 14880, analysedAt: "2 days ago",
        riskScore: 68, riskLabel: "MEDIUM–HIGH RISK",
        verdictHeadline: "Suspicious activity detected.", verdictBody: VERDICT_BODY, reasoning: REASONING,
    },
    {
        id: "s3", fileName: "aws_user_activity.log", lines: 9204, analysedAt: "on Monday, 22:14",
        riskScore: 68, riskLabel: "MEDIUM–HIGH RISK",
        verdictHeadline: "Suspicious activity detected.", verdictBody: VERDICT_BODY, reasoning: REASONING,
    },
];

const svgProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const Chevron = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 24 24" className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} {...svgProps}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
 
const DoubleChevronRight = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" {...svgProps}>
    <path d="m6 17 5-5-5-5M13 17l5-5-5-5" />
  </svg>
);


function RiskRing({ score }: { score: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-28 w-28">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" role="img" aria-label={`Risk score ${score} out of 100`}>
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="7" className="stroke-[#0B1437]" />
        <circle
          cx="50" cy="50" r={r} fill="none" strokeWidth="7" strokeLinecap="round"
          className="stroke-orange-400"
          strokeDasharray={`${(score / 100) * c} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-[#0B1437]">{score}</span>
        <span className="text-[9px] text-slate-700">RISK SCORE</span>
      </div>
    </div>
  );
}

function ScanRow({
  scan,
  open,
  onToggle,
  onSeeDetails,
}: {
  scan: ScanRecord;
  open: boolean;
  onToggle: () => void;
  onSeeDetails: (id: string) => void;
}) {
  const panelId = `scan-${scan.id}`;
  return (
    <li className="rounded-xl border border-orange-300 bg-orange-50">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-100 text-orange-500">
          <FileIcon />
        </span>
        <span className="flex-1">
          <span className="block text-sm font-medium text-slate-900">{scan.fileName}</span>
          <span className="block text-[11px] text-slate-600">
            {scan.lines.toLocaleString()} lines · analysed {scan.analysedAt}
          </span>
        </span>
        <span className="pr-2 text-slate-900"><Chevron open={open} /></span>
      </button>
 
      {open && (
        <div id={panelId} className="px-6 pb-4 pt-2">
          <div className="grid items-center gap-8 md:grid-cols-[180px_1fr]">
            <div className="flex flex-col items-center gap-3">
              <RiskRing score={scan.riskScore} />
              <span className="rounded-full bg-orange-200 px-3 py-0.5 text-[10px] font-semibold text-orange-500">
                {scan.riskLabel}
              </span>
            </div>
 
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-wide text-orange-500">
                Conclusion &amp; reasoning
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-900">
                <span className="font-semibold text-orange-500">{scan.verdictHeadline}</span>{" "}
                {scan.verdictBody}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-slate-900">{scan.reasoning}</p>
            </div>
          </div>
 
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => onSeeDetails(scan.id)}
              className="flex items-center gap-1 rounded-md px-1 text-sm font-medium text-[#0B1437] hover:text-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
            >
              See more details <DoubleChevronRight />
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

function History({
    usage = USAGE,
    scans = SCANS,
}: {
    usage?: UsagePoint[];
    scans?: ScanRecord[];
}) {
    // Only one row open at a time (like the Figma). Use a Set<string> if you want several.
    const [openId, setOpenId] = useState<string | null>(scans[1]?.id ?? null);

    const handleSeeDetails = (id: string) => {
        // TODO: navigate to the dashboard for this scan, e.g. router.push(`/dashboard/${id}`)
        console.log("See details for", id);
    };
    return (
        <main className="flex-1 overflow-y-auto bg-white px-12 py-10">
            <div className="">
                <section aria-labelledby="usage-history">
                    <div className="flex items-start justify-between">
                        <h1 id="usage-history" className="text-sm font-bold uppercase text-[#0B1437]">
                            Usage history
                        </h1>
                        <button
                            type="button"
                            className="rounded-lg bg-blue-100 px-6 py-2.5 text-sm font-medium text-[#0B1437] transition-colors hover:bg-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
                        >
                            New Scan
                        </button>
                    </div>
                    <div className="mt-4">
                        <UsageChart data={usage} />
                    </div>
                </section>
                <section className="mt-8" aria-labelledby="files-scanned">
                    <h2 id="files-scanned" className="text-sm font-bold uppercase text-[#0B1437]">
                        Files scanned
                    </h2>
                    <ul className="mt-5 space-y-3">
                        {scans.map((s) => (
                            <ScanRow
                                key={s.id}
                                scan={s}
                                open={openId === s.id}
                                onToggle={() => setOpenId((cur) => (cur === s.id ? null : s.id))}
                                onSeeDetails={handleSeeDetails}
                            />
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    )
}
export default History;