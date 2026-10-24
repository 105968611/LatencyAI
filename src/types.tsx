//Navigation Options for the app
export type Page =
  | "uploadlogs"
  | "dashboard"
  | "history"
  | "settings";

//Severity Options for Dashoard page
export type Severity = 
  |"critical" 
  | "warning" 
  | "info";

export type Anomaly = {
    id: string;
    time: string;
    severity: Severity;
    title: string;
    entry: string;
    confidence: number; // 0-100
    explanation: string;
};

export type Insight = { id: string; icon: "clock" | "chart" | "bolt"; text: string };

export type Report = {
    fileName: string;
    meta: string;
    riskScore: number;
    riskLabel: string;
    verdictHeadline: string;
    verdictBody: string;
    reasoning: string;
    linesAnalyzed: number;
    anomaliesFound: number;
    avgConfidence: number;
    timeline: { normal: number[]; anomaly: number[]; critical: number[] };
    severityCounts: Record<Severity, number>;
    anomalies: Anomaly[];
    insights: Insight[];

}