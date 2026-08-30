import { ImageResponse } from "next/og";

export const alt = "AutomatizaLab — Ranking mensual de automatización y control";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          backgroundImage:
            "linear-gradient(135deg, #0f172a 0%, #0f172a 60%, #1e293b 100%)",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 28 28" fill="none">
          <rect x="8" y="8" width="12" height="12" rx="1.5" stroke="#3b82f6" strokeWidth="1.5" />
          <path
            d="M14 2 L14 8 M14 20 L14 26 M2 14 L8 14 M20 14 L26 14"
            stroke="#3b82f6"
            strokeWidth="1.5"
          />
          <rect x="11.5" y="11.5" width="5" height="5" fill="#f59e0b" />
        </svg>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 72,
            fontWeight: 800,
            color: "#f8fafc",
            letterSpacing: "-0.02em",
          }}
        >
          AUTOMATIZA<span style={{ color: "#f59e0b" }}>_</span>LAB
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 30,
            color: "#94a3b8",
          }}
        >
          Ranking mensual de automatización y control industrial
        </div>
      </div>
    ),
    { ...size }
  );
}
