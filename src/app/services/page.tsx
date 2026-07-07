import type { Metadata } from "next";
import Image from "next/image";
import { TreeDeciduous, Layers, Armchair, Sparkles, X, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { CONTACT } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nos services - Pose de parquet, PVC, moquette",
  description:
    "Découvrez nos prestations : pose de parquet massif, stratifié, PVC, moquette, ponçage et vitrification. Artisan à Strasbourg.",
  alternates: { canonical: "/services" },
};

const iconMap: Record<string, React.ReactNode> = {
  TreeDeciduous: <TreeDeciduous size={36} className="text-primary" />,
  Layers: <Layers size={36} className="text-primary" />,
  Armchair: <Armchair size={36} className="text-primary" />,
  Sparkles: <Sparkles size={36} className="text-primary" />,
};

const serviceImages: Record<string, string> = {
  parquet: "/images/services/parquet.jpg",
  pvc: "/images/services/pvc-empty.jpg",
  moquette: "/images/services/moquette-bureau.jpg",
  poncage: "/images/services/poncage.jpg",
};

export default function ServicesPage() {
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
                <Link href="/services" className="text-primary hover:underline" aria-current="page">
                  Services
                </Link>
              </li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Nos services</h1>
          <p className="text-gray-300 mt-4 max-w-xl">
            Un savoir-faire complet pour tous vos projets de sol
          </p>
        </Container>
      </section>

      {/* Services détaillés */}
      {services.map((service, i) => (
        <section
          key={service.id}
          id={service.slug}
          className={`py-20 ${i % 2 === 0 ? "bg-background" : "bg-neutral-light"}`}
        >
          <Container>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "lg:[direction:rtl] lg:*:[direction:ltr]" : ""}`}>
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={serviceImages[service.slug]}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-primary-light flex items-center justify-center">
                    {iconMap[service.icon]}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-dark">{service.title}</h2>
                </div>

                <p className="text-neutral leading-relaxed mb-6">
                  {service.longDescription}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <ArrowRight size={14} className="text-primary shrink-0" />
                      <span className="text-neutral-dark text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button href="/contact">
                  Demander un devis pour {service.title.toLowerCase().includes("ponçage") ? "votre ponçage" : `votre ${service.title.toLowerCase().replace("pose de ", "")}`}
                </Button>
              </div>
            </div>
          </Container>
        </section>
      ))}

      {/* CTA */}
      <section className="py-16 bg-primary">
        <Container className="text-center">
          <p className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Un projet en tête ?
          </p>
          <p className="text-white mb-8">
            Appelez-nous ou demandez un devis gratuit
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={CONTACT.phoneLink} variant="secondary" size="lg">
              {CONTACT.phone}
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Demander un devis
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
