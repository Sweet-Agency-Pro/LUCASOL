"use client";

import { TreeDeciduous, Layers, Armchair, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { services } from "@/data/services";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ReactNode> = {
  TreeDeciduous: <TreeDeciduous size={32} className="text-primary" />,
  Layers: <Layers size={32} className="text-primary" />,
  Armchair: <Armchair size={32} className="text-primary" />,
  Sparkles: <Sparkles size={32} className="text-primary" />,
};

export default function ServicesOverview() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <Container>
        <SectionTitle
          title="Nos prestations"
          subtitle="Des solutions sur mesure pour tous vos sols"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                    {iconMap[service.icon]}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                      {service.title}
                    </h3>
                    <p className="text-neutral text-sm leading-relaxed mb-4">
                      {service.shortDescription}
                    </p>
                    <Link
                      href={`/services#${service.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                    >
                      En savoir plus
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
