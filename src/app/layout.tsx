import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AmazonDisclosureToast from "@/components/AmazonDisclosureToast";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://controltrazado.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Control Trazado — Ranking mensual de automatización y control",
    template: "%s | Control Trazado",
  },
  description:
    "Ranking mensual con criterio técnico de hardware de automatización de hogar inteligente y control industrial B2B: enchufes y relés WiFi, variadores de frecuencia, gateways RS485/Modbus.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Control Trazado",
    title: "Control Trazado — Ranking mensual de automatización y control",
    description:
      "Ranking mensual con criterio técnico de hardware de automatización e industrial, evaluado como un plano de ingeniería.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ink text-text-light">
        <GoogleAnalytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <AmazonDisclosureToast />
      </body>
    </html>
  );
}
