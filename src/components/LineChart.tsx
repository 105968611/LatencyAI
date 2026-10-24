
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import type { Report } from "../types";

type TimelineChartProps = {
  data: Report["timeline"];
};

function TimelineChart({ data }: TimelineChartProps) {
  // Convert the three arrays into the format Recharts expects.
  const chartData = Array.from(
    {
      length: Math.max(
        data.normal.length,
        data.anomaly.length,
        data.critical.length
      ),
    },
    (_, index) => ({
      window: index,
      normal: data.normal[index] ?? null,
      anomaly: data.anomaly[index] ?? null,
      critical: data.critical[index] ?? null,
    })
  );

  return (
    <div className="w-full overflow-x-auto">
      <div className="h-[300px] min-w-[700px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E2E8F0"
            />

            <XAxis
              dataKey="window"
              tick={{ fontSize: 11 }}
              stroke="#64748B"
              label={{
                value: "Time window",
                position: "insideBottom",
                offset: -5,
                fontSize: 12,
              }}
            />

            <YAxis
              domain={[0, 1000]}
              tick={{ fontSize: 11 }}
              stroke="#64748B"
            />

            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="normal"
              name="Normal traffic"
              stroke="#22A055"
              strokeWidth={2}
              dot={false}
              connectNulls={false}
            />

            <Line
              type="monotone"
              dataKey="anomaly"
              name="Anomaly"
              stroke="#FB923C"
              strokeWidth={2}
              dot={false}
              connectNulls={false}
            />

            <Line
              type="monotone"
              dataKey="critical"
              name="Critical"
              stroke="#EF4444"
              strokeWidth={2}
              dot={false}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TimelineChart;
