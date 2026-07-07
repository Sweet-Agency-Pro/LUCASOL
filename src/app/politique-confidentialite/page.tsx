import type { Metadata } from "next";
import Link from "next/link";
import {
  Database,
  Target,
  Clock,
  ShieldCheck,
  Cookie,
  Mail,
  UserCheck,
  Globe,
  Users,
  FileText,
  MonitorSmartphone,
} from "lucide-react";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: { canonical: "/politique-confidentialite" },
};

const rights = [
  ["Droit d'accès", "obtenir une copie de vos données personnelles"],
  ["Droit de rectification", "corriger des données inexactes"],
  ["Droit de suppression", "demander la suppression de vos données"],
  ["Droit d'opposition", "vous opposer au traitement de vos données"],
  [
    "Droit à la limitation",
    "demander la limitation du traitement de vos données",
  ],
  ["Droit à la portabilité", "recevoir vos données dans un format structuré"],
];

const sections = [
  {
    icon: <UserCheck size={20} />,
    title: "1. Responsable du traitement",
    content: (
      <>
        <p className="mb-2">
          Le responsable du traitement des données personnelles collectées sur ce
          site est :
        </p>
        <p className="font-semibold text-neutral-dark">
          Lucas ZORRILLA - LUCASOL
        </p>
        <p>
          [ADRESSE COMPLÈTE], 67370 Dingsheim
        </p>
        <p className="mt-2">
          Email :{" "}
          <a
            href="mailto:artisan.lucasol@gmail.com"
            className="text-primary-dark hover:underline"
          >
            artisan.lucasol@gmail.com
          </a>
          <br />
          Téléphone :{" "}
          <a
            href="tel:+33643135492"
            className="text-primary-dark hover:underline"
          >
            06 43 13 54 92
          </a>
        </p>
      </>
    ),
  },
  {
    icon: <Database size={20} />,
    title: "2. Données collectées",
    content: (
      <>
        <p className="mb-2">
          Via le formulaire de contact, nous collectons uniquement :
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Nom complet</li>
          <li>Adresse email</li>
          <li>Numéro de téléphone (optionnel)</li>
          <li>Contenu du message</li>
        </ul>
      </>
    ),
  },
  {
    icon: <MonitorSmartphone size={20} />,
    title: "3. Données de navigation",
    content: (
      <p>
        Lors de votre visite, notre hébergeur (Vercel) peut collecter
        automatiquement certaines données techniques : adresse IP, type de
        navigateur, système d&apos;exploitation, pages consultées et
        horodatage des requêtes. Ces données sont collectées à des fins de
        sécurité, de maintenance et de statistiques anonymes. Elles ne sont
        pas utilisées pour vous identifier personnellement.
      </p>
    ),
  },
  {
    icon: <Target size={20} />,
    title: "4. Finalité et base légale du traitement",
    content: (
      <>
        <p className="mb-2">
          Ces données sont traitées pour les finalités suivantes :
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-3">
          <li>
            <span className="font-semibold text-neutral-dark">
              Répondre à vos demandes de contact ou de devis
            </span>{" "}
            - base légale : exécution de mesures précontractuelles (art. 6.1.b
            du RGPD)
          </li>
          <li>
            <span className="font-semibold text-neutral-dark">
              Assurer le bon fonctionnement et la sécurité du site
            </span>{" "}
            - base légale : intérêt légitime (art. 6.1.f du RGPD)
          </li>
        </ul>
        <p>
          Vos données ne sont jamais transmises à des tiers à des fins
          commerciales ou publicitaires.
        </p>
      </>
    ),
  },
  {
    icon: <Users size={20} />,
    title: "5. Destinataires des données",
    content: (
      <>
        <p className="mb-2">
          Vos données personnelles peuvent être accessibles aux sous-traitants
          suivants, dans le cadre strict de leurs prestations :
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-semibold text-neutral-dark">Supabase Inc.</span>{" "}
            - hébergement de la base de données (stockage sécurisé des messages
            de contact)
          </li>
          <li>
            <span className="font-semibold text-neutral-dark">Vercel Inc.</span>{" "}
            - hébergement du site web et journalisation technique
          </li>
        </ul>
        <p className="mt-2">
          Ces prestataires sont contractuellement tenus de protéger vos données
          conformément au RGPD.
        </p>
      </>
    ),
  },
  {
    icon: <Globe size={20} />,
    title: "6. Transferts de données hors Union européenne",
    content: (
      <p>
        Nos sous-traitants (Supabase, Vercel) sont des sociétés américaines.
        Des transferts de données vers les États-Unis peuvent donc avoir lieu.
        Ces transferts sont encadrés par des{" "}
        <span className="font-semibold text-neutral-dark">
          clauses contractuelles types (CCT)
        </span>{" "}
        approuvées par la Commission européenne, garantissant un niveau de
        protection adéquat de vos données personnelles conformément aux
        articles 46 et 49 du RGPD. [VÉRIFIER ET ADAPTER SI LE EU-US DATA
        PRIVACY FRAMEWORK S&apos;APPLIQUE À VOS SOUS-TRAITANTS]
      </p>
    ),
  },
  {
    icon: <Clock size={20} />,
    title: "7. Durée de conservation",
    content: (
      <p>
        Vos données sont conservées pendant une durée maximale de{" "}
        <span className="font-semibold text-neutral-dark">12 mois</span> à
        compter de votre demande, puis supprimées. Les données de navigation
        (logs serveur) sont conservées pendant une durée maximale de{" "}
        <span className="font-semibold text-neutral-dark">12 mois</span>.
      </p>
    ),
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "8. Vos droits (RGPD)",
    content: (
      <>
        <p className="mb-3">
          Conformément au Règlement Général sur la Protection des Données
          (UE 2016/679) et à la loi Informatique et Libertés du 6 janvier
          1978 modifiée, vous disposez des droits suivants :
        </p>
        <ul className="space-y-2">
          {rights.map(([right, desc]) => (
            <li key={right} className="flex gap-2">
              <span className="text-primary-dark mt-0.5">•</span>
              <span>
                <span className="font-semibold text-neutral-dark">
                  {right}
                </span>{" "}
                : {desc}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          Pour exercer ces droits, écrivez-nous à{" "}
          <a
            href="mailto:artisan.lucasol@gmail.com"
            className="text-primary-dark hover:underline"
          >
            artisan.lucasol@gmail.com
          </a>
          . Une réponse vous sera apportée dans un délai de 30 jours.
        </p>
        <p className="mt-2">
          Vous pouvez également introduire une réclamation auprès de la{" "}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-dark hover:underline"
          >
            Commission Nationale de l&apos;Informatique et des Libertés (CNIL)
          </a>
          , 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.
        </p>
      </>
    ),
  },
  {
    icon: <Cookie size={20} />,
    title: "9. Cookies",
    content: (
      <p>
        Ce site n&apos;utilise aucun cookie de suivi, publicitaire ou
        analytique. Seuls des cookies techniques strictement nécessaires au
        fonctionnement du site peuvent être déposés - ils ne requièrent pas de
        consentement conformément à l&apos;article 82 de la loi Informatique et
        Libertés.
      </p>
    ),
  },
  {
    icon: <FileText size={20} />,
    title: "10. Modification de la politique",
    content: (
      <p>
        LUCASOL se réserve le droit de modifier la présente politique de
        confidentialité à tout moment. En cas de modification substantielle,
        la date de mise à jour en haut de cette page sera actualisée. Nous
        vous invitons à la consulter régulièrement.
      </p>
    ),
  },
  {
    icon: <Mail size={20} />,
    title: "11. Contact",
    content: (
      <p>
        Pour toute question relative à cette politique de confidentialité :{" "}
        <a
          href="mailto:artisan.lucasol@gmail.com"
          className="text-primary-dark hover:underline"
        >
          artisan.lucasol@gmail.com
        </a>{" "}
        ou{" "}
        <a href="tel:+33643135492" className="text-primary-dark hover:underline">
          06 43 13 54 92
        </a>
        .
      </p>
    ),
  },
];

export default function PolitiqueConfidentialitePage() {
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
                <Link href="/politique-confidentialite" className="text-primary hover:underline" aria-current="page">
                  Politique de confidentialité
                </Link>
              </li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Politique de confidentialité
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
                  <span className="w-9 h-9 rounded-lg bg-primary-light text-primary-dark flex items-center justify-center shrink-0">
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
            Voir aussi nos{" "}
            <Link
              href="/mentions-legales"
              className="text-primary-dark hover:underline"
            >
              mentions légales
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
