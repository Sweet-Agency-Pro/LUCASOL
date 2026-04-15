"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { WHY_CHOOSE_US } from "@/lib/constants";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-neutral-light">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <SectionTitle
              title="Pourquoi nous choisir ?"
              centered={false}
              className="mb-8"
            />

            <ul className="space-y-4">
              {WHY_CHOOSE_US.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Check size={14} className="text-white" />
                  </div>
                  <span className="text-neutral-dark font-medium">{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] rounded-xl overflow-hidden"
          >
            <Image
              src="/images/realisations/parquet-02.jpg"
              alt="Réalisation LUCASOL - Parquet bâton rompu"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
