import { ImageResponse } from "next/og";
import { getProductoPorAsin } from "@/lib/productos";
import { getCategoriaPorSlug } from "@/lib/categorias";

export const runtime = "nodejs";

const SIZE = { width: 1000, height: 1500 };

function Estrellas({ rating }: { rating: number }) {
  const llenas = Math.round(rating);
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2.5 L14.6 9 L21.5 9.4 L16.1 13.8 L18 20.5 L12 16.7 L6 20.5 L7.9 13.8 L2.5 9.4 L9.4 9 Z"
            fill={i < llenas ? "#f59e0b" : "none"}
            stroke="#f59e0b"
            strokeWidth="1.5"
          />
        </svg>
      ))}
    </div>
  );
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ asin: string }> }
) {
  const { asin } = await params;
  const producto = await getProductoPorAsin(asin);

  if (!producto) {
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
            color: "#f8fafc",
            fontSize: 40,
          }}
        >
          AutomatizaLab
        </div>
      ),
      { ...SIZE }
    );
  }

  const categoria = getCategoriaPorSlug(producto.categoria);
  const nombreFontSize = producto.nombre.length > 60 ? 40 : 48;
  const precioTexto =
    producto.precioMax !== undefined
      ? `Desde $${producto.precio.toFixed(2)}`
      : `$${producto.precio.toFixed(2)}`;

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
          padding: "64px 56px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width="56" height="56" viewBox="0 0 28 28" fill="none">
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
              marginLeft: 16,
              fontSize: 27,
              fontWeight: 800,
              color: "#f8fafc",
              letterSpacing: "-0.02em",
            }}
          >
            AUTOMATIZA<span style={{ color: "#f59e0b" }}>_</span>LAB
          </div>
          {categoria && (
            <div
              style={{
                display: "flex",
                marginLeft: "auto",
                fontSize: 18,
                fontWeight: 700,
                color: "#0f172a",
                background: "#f59e0b",
                borderRadius: 999,
                padding: "8px 16px",
              }}
            >
              #{producto.ranking} en {categoria.nombre}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f8fafc",
            borderRadius: 32,
            padding: 40,
            height: 560,
          }}
        >
          <img
            src={producto.imagen}
            width={520}
            height={480}
            style={{ objectFit: "contain" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: nombreFontSize,
              fontWeight: 800,
              color: "#f8fafc",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            {producto.nombre}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Estrellas rating={producto.rating} />
            <div style={{ display: "flex", fontSize: 24, color: "#94a3b8" }}>
              {producto.rating} ({producto.numResenas} reseñas)
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 52, fontWeight: 800, color: "#3b82f6" }}>
            {precioTexto}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #1e293b",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", fontSize: 26, color: "#f8fafc", fontWeight: 700 }}>
            Ver ficha completa →
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
