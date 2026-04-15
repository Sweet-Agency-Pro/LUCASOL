import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <section className="bg-neutral-dark pt-32 pb-16">
        <Container>
          <h1 className="text-4xl font-bold text-white">Politique de confidentialité</h1>
        </Container>
      </section>

      <section className="py-16 bg-background">
        <Container className="max-w-3xl prose prose-neutral">
          <p><em>Dernière mise à jour : Avril 2026</em></p>

          <h2>1. Données collectées</h2>
          <p>
            Via le formulaire de contact, nous collectons les données suivantes :
          </p>
          <ul>
            <li>Nom complet</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone (optionnel)</li>
            <li>Contenu du message</li>
          </ul>

          <h2>2. Finalité du traitement</h2>
          <p>
            Les données collectées sont utilisées uniquement pour répondre à votre
            demande de contact ou de devis. Elles ne sont jamais transmises à des
            tiers ni utilisées à des fins commerciales.
          </p>

          <h2>3. Durée de conservation</h2>
          <p>
            Vos données sont conservées pendant une durée maximale de 12 mois à
            compter de votre demande, puis supprimées.
          </p>

          <h2>4. Vos droits</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD),
            vous disposez des droits suivants :
          </p>
          <ul>
            <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données personnelles</li>
            <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
            <li><strong>Droit de suppression :</strong> demander la suppression de vos données</li>
            <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
            <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à :{" "}
            <a href="mailto:artisan.lucasol@gmail.com">artisan.lucasol@gmail.com</a>
          </p>

          <h2>5. Cookies</h2>
          <p>
            Ce site n&apos;utilise pas de cookies de suivi ou publicitaires. Seuls des
            cookies techniques strictement nécessaires au fonctionnement du site
            peuvent être utilisés.
          </p>

          <h2>6. Contact</h2>
          <p>
            Pour toute question relative à cette politique de confidentialité, vous
            pouvez nous contacter à :{" "}
            <a href="mailto:artisan.lucasol@gmail.com">artisan.lucasol@gmail.com</a>
          </p>
        </Container>
      </section>
    </>
  );
}
