import { ImageResponse } from "next/og";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
        }}
      >
        <svg width="140" height="140" viewBox="0 0 28 28" fill="none">
          <rect x="8" y="8" width="12" height="12" rx="1.5" stroke="#3b82f6" strokeWidth="1.5" />
          <path
            d="M14 2 L14 8 M14 20 L14 26 M2 14 L8 14 M20 14 L26 14"
            stroke="#3b82f6"
            strokeWidth="1.5"
          />
          <rect x="11.5" y="11.5" width="5" height="5" fill="#f59e0b" />
        </svg>
      </div>
    ),
    { width: 192, height: 192 }
  );
}
