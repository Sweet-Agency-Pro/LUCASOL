import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import JsonLd from "@/components/seo/JsonLd";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lucasol.fr"),
  title: {
    default: "LUCASOL - Pose de parquet et revêtement de sol à Strasbourg",
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
    title: "LUCASOL - Pose de parquet et revêtement de sol à Strasbourg",
    description:
      "Artisan spécialisé en pose de parquet, PVC, moquette, ponçage et vitrification. Devis gratuit.",
    type: "website",
    locale: "fr_FR",
    url: "https://lucasol.fr",
    siteName: "LUCASOL",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 746,
        alt: "LUCASOL - Pose de parquet et revêtement de sol à Strasbourg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${outfit.variable} ${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <JsonLd />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
