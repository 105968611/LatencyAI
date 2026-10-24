import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipContentProps } from "recharts";

type UsagePoint = {
  index: number;
  fileName: string;
  lines: number;
};

function UsageTooltip({ active, payload }: TooltipContentProps) {
  const point = payload?.[0]?.payload as UsagePoint | undefined;
  if (!active || !point) return null;

  return (
    <div className="rounded-lg border border-orange-300 bg-orange-50 px-3 py-2 text-xs shadow-sm">
      <p className="font-semibold text-[#0B1437]">{point.fileName}</p>
      <p className="text-slate-700">{point.lines.toLocaleString()} lines</p>
    </div>
  );
}

function UsageChart({ data }: { data: UsagePoint[] }) {
  return (
    <div className="h-80 w-full" role="img" aria-label="Bar chart of lines analysed per file">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 24, left: 16 }} barCategoryGap="12%">
          <CartesianGrid vertical={false} stroke="#E2E8F0" />
          <XAxis
            dataKey="index"
            tickLine={false}
            tick={{ fontSize: 11, fill: "#334155" }}
            label={{ value: "Files", position: "insideBottom", offset: -16, fontSize: 13, fill: "#334155" }}
          />
          <YAxis
            ticks={[0, 25000, 50000, 75000, 100000]}
            domain={[0, 100000]}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#334155" }}
            label={{ value: "Lines analysed", angle: -90, position: "insideLeft", offset: -4, fontSize: 12, fill: "#334155" }}
          />
          <Tooltip content={UsageTooltip} cursor={{ fill: "rgba(251,146,60,0.12)" }} />
          <Bar dataKey="lines" fill="#0B1437" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UsageChart;