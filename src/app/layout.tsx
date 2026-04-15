import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import JsonLd from "@/components/seo/JsonLd";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "LUCASOL — Pose de parquet et revêtement de sol à Strasbourg",
    template: "%s | LUCASOL",
  },
  description:
    "Artisan spécialisé en pose de parquet, PVC, moquette, ponçage et vitrification à Strasbourg et alentours. Devis gratuit.",
  keywords: [
    "parquet",
    "pose de parquet",
    "PVC",
    "moquette",
    "ponçage",
    "vitrification",
    "Strasbourg",
    "artisan",
    "revêtement de sol",
    "LUCASOL",
  ],
  openGraph: {
    title: "LUCASOL — Pose de parquet et revêtement de sol à Strasbourg",
    description:
      "Artisan spécialisé en pose de parquet, PVC, moquette, ponçage et vitrification. Devis gratuit.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
