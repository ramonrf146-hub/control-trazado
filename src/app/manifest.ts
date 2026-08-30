import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AutomatizaLab — Automatización y control industrial",
    short_name: "AutomatizaLab",
    description:
      "Ranking mensual con criterio técnico de hardware de automatización de hogar inteligente y control industrial B2B.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#0f172a",
    icons: [
      { src: "/icon-192", sizes: "192x192", type: "image/png" },
      { src: "/icon-512", sizes: "512x512", type: "image/png" },
    ],
  };
}
