import { ImageResponse } from "next/og";
import { getArticuloPorSlug } from "@/lib/contenido";

export const runtime = "nodejs";

const SIZE = { width: 1000, height: 1500 };

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const articulo = await getArticuloPorSlug(slug);

  const titulo = articulo?.titulo ?? "AutomatizaLab";
  const descripcion =
    articulo?.descripcion ?? "Ranking mensual de automatización y control industrial";
  const tituloFontSize = titulo.length > 70 ? 52 : titulo.length > 45 ? 60 : 70;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f172a",
          backgroundImage:
            "linear-gradient(160deg, #0f172a 0%, #0f172a 55%, #1e293b 100%)",
          padding: "70px 64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width="64" height="64" viewBox="0 0 28 28" fill="none">
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
              marginLeft: 18,
              fontSize: 30,
              fontWeight: 800,
              color: "#f8fafc",
              letterSpacing: "-0.02em",
            }}
          >
            AUTOMATIZA<span style={{ color: "#f59e0b" }}>_</span>LAB
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: tituloFontSize,
              fontWeight: 800,
              color: "#f8fafc",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            {titulo}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#94a3b8",
              lineHeight: 1.4,
            }}
          >
            {descripcion}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #1e293b",
            paddingTop: 32,
          }}
        >
          <div style={{ display: "flex", fontSize: 26, color: "#f8fafc", fontWeight: 700 }}>
            Ver guía completa →
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#64748b" }}>
            controltrazado.com
          </div>
        </div>
      </div>
    ),
    { ...SIZE }
  );
}
