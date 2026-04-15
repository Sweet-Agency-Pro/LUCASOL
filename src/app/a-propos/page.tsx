import type { Metadata } from "next";
import Image from "next/image";
import { Shield, Eye, Heart, Brush, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { VALUES, CONTACT, GOOGLE_MAPS_EMBED_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "À propos de Lucas ZORRILLA - Artisan poseur de sol",
  description:
    "Découvrez le parcours de Lucas, artisan passionné spécialisé en revêtement de sol depuis plus de 5 ans à Strasbourg.",
};

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield size={28} className="text-primary" />,
  Eye: <Eye size={28} className="text-primary" />,
  Heart: <Heart size={28} className="text-primary" />,
  Brush: <Brush size={28} className="text-primary" />,
};

const cities = [
  "Strasbourg",
  "Souffelweyersheim",
  "Griesheim-sur-Souffel",
  "Mundolsheim",
  "Schiltigheim",
  "Hoenheim",
  "Bischheim",
  "Oberhausbergen",
  "Lampertheim",
  "Wolfisheim",
  "Lingolsheim",
  "Illkirch",
];

export default function AProposPage() {
  return (
    <>
      {/* Hero compact */}
      <section className="bg-neutral-dark pt-32 pb-16">
        <Container>
          <p className="text-primary text-sm font-medium mb-2">Accueil &gt; À propos</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">À propos</h1>
          <p className="text-gray-300 mt-4 max-w-xl">
            Découvrez l&apos;artisan derrière LUCASOL
          </p>
        </Container>
      </section>

      {/* Présentation */}
      <section className="py-20 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/images/realisations/parquet-01.jpg"
                alt="Réalisation LUCASOL"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-neutral-dark mb-2">
                Lucas ZORRILLA
              </h2>
              <p className="text-primary font-medium mb-6">
                Artisan poseur de sol - Passionné depuis + de 5 ans
              </p>
              <div className="space-y-4 text-neutral leading-relaxed">
                <p>
                  Passionné par le travail du bois et des revêtements de sol depuis
                  toujours, Lucas a fondé <strong>LUCASOL</strong> avec une ambition
                  simple : offrir un service artisanal de qualité, personnalisé et
                  accessible à chaque client.
                </p>
                <p>
                  Basé à Griesheim-sur-Souffel, Lucas intervient dans toute
                  l&apos;Eurométropole de Strasbourg. Chaque chantier est abordé avec
                  le même soin du détail, qu&apos;il s&apos;agisse d&apos;un salon de
                  particulier ou d&apos;un espace commercial.
                </p>
                <p>
                  Son approche : écouter, conseiller, et réaliser un travail dont
                  il peut être fier - et dont vous serez pleinement satisfait.
                </p>
              </div>
              <div className="mt-8">
                <Button href="/contact">Contactez Lucas</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Valeurs */}
      <section className="py-20 bg-neutral-light">
        <Container>
          <SectionTitle title="Nos valeurs" subtitle="Ce qui nous guide au quotidien" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value) => (
              <Card key={value.title} className="text-center">
                <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center mx-auto mb-4">
                  {iconMap[value.icon]}
                </div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-neutral">{value.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Zone d'intervention */}
      <section className="py-20 bg-background">
        <Container>
          <SectionTitle
            title="Zone d'intervention"
            subtitle="Nous intervenons à Strasbourg et dans toute l'Eurométropole"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Map */}
            <div className="rounded-xl overflow-hidden h-[400px]">
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation LUCASOL"
              />
            </div>

            {/* Cities */}
            <div>
              <h3 className="text-xl font-semibold text-neutral-dark mb-6">
                Quelques villes où nous intervenons
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {cities.map((city) => (
                  <div key={city} className="flex items-center gap-2 text-neutral">
                    <MapPin size={14} className="text-primary shrink-0" />
                    <span className="text-sm">{city}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-gray-400">
                Vous n&apos;êtes pas dans la liste ? Contactez-nous, nous intervenons
                potentiellement dans un rayon de 30 km autour de Strasbourg.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Références */}
      <section className="py-16 bg-neutral-light">
        <Container className="text-center">
          <h3 className="text-xl font-semibold text-neutral-dark mb-6">
            Ils nous font confiance
          </h3>
          <div className="flex flex-wrap justify-center gap-8 text-neutral">
            <span className="px-6 py-3 bg-white rounded-lg shadow-sm font-medium">
              SENSAS Mundolsheim
            </span>
            <span className="px-6 py-3 bg-white rounded-lg shadow-sm font-medium">
              RIVAL QUIZ Mundolsheim
            </span>
          </div>
        </Container>
      </section>
    </>
  );
}
