"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/realisations/parquet-03.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Un projet de sol ? Parlons-en !
          </h2>
          <p className="text-gray-200 text-lg mb-8">
            Devis gratuit — Réponse sous 24h
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={CONTACT.phoneLink} size="lg">
              <Phone size={20} />
              Appelez-nous : {CONTACT.phone}
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Envoyez-nous un message
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
