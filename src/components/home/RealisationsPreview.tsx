"use client";

import Image from "next/image";
import Link from "next/link";
import { ZoomIn } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { realisations } from "@/data/realisations";
import { motion } from "framer-motion";

export default function RealisationsPreview() {
  const preview = realisations.slice(0, 6);

  return (
    <section className="py-20 md:py-28 bg-neutral-light">
      <Container>
        <SectionTitle
          title="Nos réalisations"
          subtitle="Découvrez nos derniers projets"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {preview.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden"
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
                  <p className="text-sm font-medium">{item.category === "avant-apres" ? "Avant / Après" : item.category === "poncage" ? "Ponçage" : item.category === "pvc" ? "PVC" : "Parquet"}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button href="/realisations">
            Voir toutes nos réalisations
          </Button>
        </div>
      </Container>
    </section>
  );
}
