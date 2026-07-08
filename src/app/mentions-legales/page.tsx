import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  UserCheck,
  Server,
  Palette,
  Copyright,
  Scale,
  ShieldCheck,
} from "lucide-react";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
};

const sections = [
  {
    icon: <Building2 size={20} />,
    title: "Éditeur du site",
    content: (
      <>
        <p className="font-semibold text-neutral-dark">LUCASOL</p>
        <p>Lucas ZORRILLA - Artisan poseur de sol</p>
        <p>Forme juridique : [FORME JURIDIQUE - ex : Micro-entreprise / Entreprise individuelle]</p>
        <p>[ADRESSE COMPLÈTE - n° et nom de rue], 67370 Dingsheim</p>
        <p>SIRET : [SIRET]</p>
        <p>
          Numéro d&apos;inscription au Répertoire des Métiers : [NUMÉRO RM -
          délivré par la Chambre des Métiers d&apos;Alsace]
        </p>
        <p>TVA : [NUMÉRO TVA INTRACOMMUNAUTAIRE ou « TVA non applicable, art. 293 B du CGI »]</p>
        <p className="mt-2">
          Téléphone :{" "}
          <a href="tel:+33643135492" className="text-primary-dark hover:underline">
            06 43 13 54 92
          </a>
          <br />
          Email :{" "}
          <a
            href="mailto:artisan.lucasol@gmail.com"
            className="text-primary-dark hover:underline"
          >
            artisan.lucasol@gmail.com
          </a>
        </p>
      </>
    ),
  },
  {
    icon: <UserCheck size={20} />,
    title: "Responsable de la publication",
    content: <p>Lucas ZORRILLA</p>,
  },
  {
    icon: <Server size={20} />,
    title: "Hébergement",
    content: (
      <>
        <p className="font-semibold text-neutral-dark">Vercel Inc.</p>
        <p>440 N Barranca Ave #4133</p>
        <p>Covina, CA 91723, États-Unis</p>
        <p>Téléphone : +1 559 288 7060</p>
        <p className="mt-2">
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-dark hover:underline"
          >
            vercel.com
          </a>
        </p>
      </>
    ),
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Assurance responsabilité civile professionnelle",
    content: (
      <>
        <p>
          L&apos;activité de LUCASOL est couverte par une assurance de
          responsabilité civile professionnelle et une garantie décennale.
        </p>
        <p className="mt-2">
          <span className="font-semibold text-neutral-dark">Assureur :</span>{" "}
          [NOM DE LA COMPAGNIE D&apos;ASSURANCE]
        </p>
        <p>
          <span className="font-semibold text-neutral-dark">
            Numéro de contrat :
          </span>{" "}
          [NUMÉRO DE CONTRAT]
        </p>
        <p>
          <span className="font-semibold text-neutral-dark">
            Couverture géographique :
          </span>{" "}
          [ZONE GÉOGRAPHIQUE - ex : France métropolitaine / Alsace]
        </p>
      </>
    ),
  },
  {
    icon: <Palette size={20} />,
    title: "Conception et réalisation",
    content: (
      <p>
        Site conçu et développé par{" "}
        <span className="font-semibold text-neutral-dark">Agence Sweet</span>.
      </p>
    ),
  },
  {
    icon: <Copyright size={20} />,
    title: "Propriété intellectuelle",
    content: (
      <p>
        L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo,
        icônes) est la propriété exclusive de LUCASOL, sauf mention contraire.
        Toute reproduction, distribution, modification ou utilisation de ces
        contenus sans autorisation écrite préalable est strictement interdite.
      </p>
    ),
  },
  {
    icon: <Scale size={20} />,
    title: "Limitation de responsabilité",
    content: (
      <p>
        LUCASOL s&apos;efforce de fournir des informations aussi précises que
        possible. Il ne pourra toutefois être tenu responsable des oublis, des
        inexactitudes ou des carences dans la mise à jour, qu&apos;elles soient de
        son fait ou du fait de tiers partenaires.
      </p>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <>
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
                <Link href="/mentions-legales" className="text-primary hover:underline" aria-current="page">
                  Mentions légales
                </Link>
              </li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Mentions légales
          </h1>
          <p className="text-gray-300 mt-3">
            Informations légales relatives au site lucasol.fr - Dernière mise à
            jour : juillet 2025
          </p>
        </Container>
      </section>

      <section className="py-16 bg-background">
        <Container className="max-w-3xl">
          <div className="space-y-5">
            {sections.map((section) => (
              <div
                key={section.title}
                className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 rounded-lg bg-primary-dark text-white flex items-center justify-center shrink-0">
                    {section.icon}
                  </span>
                  <h2 className="font-semibold text-neutral-dark text-lg !text-neutral-dark">
                    {section.title}
                  </h2>
                </div>
                <div className="text-sm text-neutral leading-relaxed">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-neutral mt-8 text-center">
            Voir aussi notre{" "}
            <Link
              href="/politique-confidentialite"
              className="text-primary-dark hover:underline"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
