"use client";

import { useState } from "react";
import Image from "next/image";
import { LayoutGrid, TreeDeciduous, Layers, Sparkles, ArrowLeftRight, ZoomIn } from "lucide-react";
import Container from "@/components/ui/Container";
import BeforeAfterSlider from "@/components/realisations/BeforeAfterSlider";
import ImageModal from "@/components/realisations/ImageModal";
import { realisations } from "@/data/realisations";
import type { RealisationCategory } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";

const filters: { label: string; value: RealisationCategory; icon: React.ReactNode }[] = [
  { label: "Tous", value: "all", icon: <LayoutGrid size={16} /> },
  { label: "Parquet", value: "parquet", icon: <TreeDeciduous size={16} /> },
  { label: "PVC / Vinyle", value: "pvc", icon: <Layers size={16} /> },
  { label: "Ponçage", value: "poncage", icon: <Sparkles size={16} /> },
  { label: "Avant / Après", value: "avant-apres", icon: <ArrowLeftRight size={16} /> },
];

export default function RealisationsPage() {
  const [activeFilter, setActiveFilter] = useState<RealisationCategory>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const filtered = activeFilter === "all"
    ? realisations
    : realisations.filter((r) => r.category === activeFilter);

  const modalImages = filtered.map((r) => ({ src: r.image, alt: r.title }));

  return (
    <>
      {/* Hero compact */}
      <section className="bg-neutral-dark pt-32 pb-16">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-2">
            <ol className="flex items-center gap-2 text-sm font-medium">
              <li>
                <Link href="/" className="text-primary hover:underline">
                  Accueil
                </Link>
              </li>
              <li className="text-gray-400">&gt;</li>
              <li>
                <Link href="/realisations" className="text-primary hover:underline" aria-current="page">
                  Réalisations
                </Link>
              </li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Nos réalisations</h1>
          <p className="text-gray-300 mt-4 max-w-xl">
            Chaque sol raconte une histoire
          </p>
        </Container>
      </section>

      {/* Filters + Gallery */}
      <section className="py-16 bg-background">
        <Container>
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.value
                    ? "bg-primary text-white"
                    : "bg-neutral-light text-neutral hover:bg-gray-200"
                }`}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                {item.beforeImage && item.afterImage ? (
                  <BeforeAfterSlider
                    beforeImage={item.beforeImage}
                    afterImage={item.afterImage}
                  />
                ) : (
                  <button
                    onClick={() => {
                      setModalIndex(i);
                      setModalOpen(true);
                    }}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden w-full"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                        <ZoomIn size={28} className="mx-auto mb-2" />
                        <p className="text-sm font-medium">{item.title}</p>
                      </div>
                    </div>
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <ImageModal
        images={modalImages}
        currentIndex={modalIndex}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onNavigate={setModalIndex}
      />
    </>
  );
}
