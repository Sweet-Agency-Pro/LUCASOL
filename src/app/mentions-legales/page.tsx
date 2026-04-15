import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <section className="bg-neutral-dark pt-32 pb-16">
        <Container>
          <h1 className="text-4xl font-bold text-white">Mentions légales</h1>
        </Container>
      </section>

      <section className="py-16 bg-background">
        <Container className="max-w-3xl prose prose-neutral">
          <h2>Éditeur du site</h2>
          <p>
            <strong>LUCASOL</strong><br />
            Lucas ZORRILLA - Artisan poseur de sol<br />
            Griesheim-sur-Souffel / Souffelweyersheim<br />
            Téléphone : 06 43 13 54 92<br />
            Email : artisan.lucasol@gmail.com
          </p>
          <p>
            <em>Structure juridique en cours de refonte - informations mises à jour prochainement.</em>
          </p>

          <h2>Responsable de la publication</h2>
          <p>Lucas ZORRILLA</p>

          <h2>Hébergement</h2>
          <p>
            Vercel Inc.<br />
            440 N Barranca Ave #4133<br />
            Covina, CA 91723, États-Unis<br />
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a>
          </p>

          <h2>Conception et réalisation</h2>
          <p>
            Site conçu et développé par <strong>Agence Sweet</strong>.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo,
            icônes, etc.) est la propriété exclusive de LUCASOL, sauf mention
            contraire. Toute reproduction, distribution, modification ou
            utilisation de ces contenus sans autorisation écrite préalable est
            strictement interdite.
          </p>

          <h2>Limitation de responsabilité</h2>
          <p>
            LUCASOL s&apos;efforce de fournir des informations aussi précises que
            possible. Cependant, il ne pourra être tenu responsable des oublis,
            des inexactitudes et des carences dans la mise à jour, qu&apos;elles soient
            de son fait ou du fait des tiers partenaires qui lui fournissent ces
            informations.
          </p>
        </Container>
      </section>
    </>
  );
}
