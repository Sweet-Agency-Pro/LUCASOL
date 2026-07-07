import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos réalisations - Parquet, PVC, ponçage",
  description:
    "Découvrez nos chantiers de pose de parquet, sols PVC, moquette et ponçage-vitrification réalisés à Strasbourg et dans le Bas-Rhin. Photos avant / après.",
  alternates: { canonical: "/realisations" },
};

export default function RealisationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
