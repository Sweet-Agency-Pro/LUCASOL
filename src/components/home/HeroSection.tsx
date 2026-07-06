"use client";

import Image from "next/image";
import { ChevronDown, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import { CONTACT } from "@/lib/constants";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-parquet-chevron.jpg"
          alt="Parquet posé par LUCASOL"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <Badge className="mb-6 bg-primary text-white" variant="hero">Devis gratuit</Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 sm:mb-6 leading-tight">
            Votre spécialiste en{" "}
            <span className="text-primary">revêtement de sol</span>{" "}
            à Strasbourg{" "}
            <motion.a
              href={CONTACT.phoneLink}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="hidden md:inline-flex ml-6 align-middle items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-5 py-3 text-white hover:bg-primary/20 transition-colors text-base font-semibold"
            >
              <Phone size={20} className="text-primary" />
              <span>{CONTACT.phone}</span>
            </motion.a>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-7 sm:mb-8 max-w-2xl">
            Pose de parquet, PVC, moquette - Ponçage et vitrification.<br />
            Un savoir-faire artisanal au service de vos sols.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact" size="lg">
              Demander un devis
            </Button>
            <Button href="/realisations" variant="outline" size="lg">
              Voir nos réalisations
            </Button>
          </div>
        </motion.div>


      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={32} className="text-white/60" />
      </motion.div>
    </section>
  );
}
