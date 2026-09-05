import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AmazonDisclosureToast from "@/components/AmazonDisclosureToast";
import type { Locale } from "@/lib/i18n";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://controltrazado.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AutomatizaLab — Ranking mensual de automatización y control",
    template: "%s | AutomatizaLab",
  },
  description:
    "Ranking mensual con criterio técnico de hardware de automatización de hogar inteligente y control industrial B2B: enchufes y relés WiFi, variadores de frecuencia, gateways RS485/Modbus.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "AutomatizaLab",
    title: "AutomatizaLab — Ranking mensual de automatización y control",
    description:
      "Ranking mensual con criterio técnico de hardware de automatización e industrial, evaluado como un plano de ingeniería.",
  },
  verification: {
    other: {
      "p:domain_verify": "bb9554baa12bd182515a8de9f1f3d4fc",
    },
  },
};

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { lang } = await params;
  const locale: Locale = lang === "en" ? "en" : "es";

  return (
    <html lang={locale} className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ink text-text-light">
        <GoogleAnalytics />
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
        <AmazonDisclosureToast locale={locale} />
      </body>
    </html>
  );
}
