import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact et devis gratuit",
  description:
    "Demandez votre devis gratuit pour la pose de parquet, PVC, moquette ou le ponçage de vos sols à Strasbourg et alentours. Réponse rapide par téléphone ou email.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
