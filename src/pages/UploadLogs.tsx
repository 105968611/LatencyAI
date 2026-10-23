
import { useState } from "react";
import { FileIcon} from "@phosphor-icons/react";
import SearchBar from "../components/SearchBar";
import StatCard from "../components/StatCard";
import Dropzone from "../components/FileDrop";

type RecentScan = {
  id: string;
  name: string;
  lines: number;
  analyzedAt: string;
};

{/* FAKE UI ELEMENTS, THESE WILL BE DELETED UPON DYNAMIC STATS IMPLEMENTATION */ }
const RECENT_SCANS: RecentScan[] = [
  { id: "1", name: "aws_user_activity.log", lines: 9204, analyzedAt: "yesterday, 22:14" },
  { id: "2", name: "aws_activity.log", lines: 14880, analyzedAt: "2 days ago" },
];


{/* FAKE UI ELEMENTS, THESE WILL BE DELETED UPON DYNAMIC STATS IMPLEMENTATION */ }
function QuotaDonut({ percent }: { percent: number }) {
    const r = 22;
    const c = 2 * Math.PI * r;
    return (
        <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90" role="img"
            aria-label={`${percent}% of quota used`}>
            <circle cx="28" cy="28" r={r} fill="none" strokeWidth="7" className="stroke-[#0B1437]" />
            <circle
                cx="28" cy="28" r={r} fill="none" strokeWidth="7" strokeLinecap="butt"
                className="stroke-orange-400"
                strokeDasharray={`${(percent / 100) * c} ${c}`}
            />
        </svg>
    );
}
{/* FAKE UI ELEMENTS, THESE WILL BE DELETED UPON DYNAMIC STATS IMPLEMENTATION */ }
function Sparkline() {
    return (
        <svg viewBox="0 0 140 56" className="h-14 w-36" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 40 C 20 8, 40 8, 55 30 S 75 52, 90 42 S 115 28, 140 30 L140 56 L0 56 Z"
                className="fill-green-200/60" />
            <path d="M0 40 C 20 8, 40 8, 55 30 S 75 52, 90 42 S 115 28, 140 30"
                fill="none" strokeWidth="2" className="stroke-green-400" />
        </svg>
    );
}

function RecentScanRow({ scan }: { scan: RecentScan }) {
  return (
    <li>
      <button
        type="button"
        className="flex w-full items-center gap-4 rounded-xl border border-orange-300 bg-orange-50 px-3 py-3 text-left transition-colors hover:bg-orange-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
          <FileIcon className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-sm font-medium text-slate-900">{scan.name}</span>
          <span className="block text-[11px] text-slate-600">
            {scan.lines.toLocaleString()} lines · analyzed {scan.analyzedAt}
          </span>
        </span>
      </button>
    </li>
  );
}




export default function UploadLogs() {
    const [file, setFile] = useState<File | null>(null);

    const handleFile = (f: File) => {
        setFile(f);
        // TODO: SEND TO BACK END
        // const body = new FormData(); body.append("file", f);
        // await fetch("/api/analyze", { method: "POST", body });
        console.log("Selected:", f.name, f.size);
    };
    return (
        <main className="flex-1 overflow-y-auto px-12 py-10">
            <header className="dashboard-heading">
                <div className="mx-auto ">
                    <div className="flex items-start justify-between gap-6">
                        <div>
                            <p className="eyebrow">LOG ANALYTICS PLATFORM</p>
                            <h1>Upload a log file</h1>
                            <p className="">Latency AI reads it, runs it through the model, and hands you back a plain-language verdict.</p>
                        </div>

                        <SearchBar />
                    </div>
                </div>
            </header>

            <section className="mt-6" aria-labelledby="quick-stats">
                <h2>Quick Stats</h2>
                <div>
                    {/* CHNGE ALL THESE CARDS TO BE DYNAMIC BASED ON USER DATA */}
                    <div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-3">

                        <StatCard title="Monthly Scan Quota">
                            <div className="flex items-center gap-4">
                                <QuotaDonut percent={75} />
                                <p className="text-sm leading-snug text-slate-600">
                                    75% Used
                                    <br />
                                    (1.5 GB / 2.0 GB)
                                </p>
                            </div>
                        </StatCard>

                        <StatCard title="Critical issues found (last 30 days)">
                            <p className="text-5xl font-bold text-red-500">14</p>
                            <p className="mt-1 text-sm text-slate-700">across 8 logs</p>
                        </StatCard>

                        <StatCard title="Average Parsing time">
                            <div className="flex items-center gap-2">
                                <p className="text-5xl font-bold text-green-600">1.2s</p>
                                <Sparkline />
                            </div>
                        </StatCard>
                    </div>
                </div>
            </section>


            {/* Drop files section*/}
            <section className="mt-8">
                <Dropzone onFile={handleFile} />
                {file && (
                    <p className="mt-3 text-sm text-slate-700" aria-live="polite">
                        Selected: <span className="font-medium">{file.name}</span>
                    </p>
                )}
            </section>

            {/* Recent scans section*/}
            <section className="mt-8" aria-labelledby="recent-scans">
                <h2 id="recent-scans" className="text-sm font-semibold uppercase text-[#0B1437]">
                    Recent scans
                </h2>
                <ul className="mt-3 space-y-3">
                    {RECENT_SCANS.map((s) => (
                        <RecentScanRow key={s.id} scan={s} />
                    ))}
                </ul>
            </section>
                    
        </main>
    )
}