import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AmazonDisclosureToast from "@/components/AmazonDisclosureToast";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Admin | AutomatizaLab",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ink text-text-light">
        <GoogleAnalytics />
        <Header locale="es" />
        <main className="flex-1">{children}</main>
        <Footer locale="es" />
        <AmazonDisclosureToast locale="es" />
      </body>
    </html>
  );
}
