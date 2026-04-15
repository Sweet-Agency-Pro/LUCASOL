import type { AdminDemand, AdminStats } from "@/types";

export const fakeStats: AdminStats = {
  demands: 12,
  reviews: 18,
  realisations: 24,
  visits: 342,
};

export const fakeDemands: AdminDemand[] = [
  {
    id: 1,
    name: "Marie Dupont",
    email: "marie.dupont@email.fr",
    phone: "06 12 34 56 78",
    message:
      "Bonjour, je souhaite faire poser du parquet dans mon salon de 35m² à Schiltigheim. Pourriez-vous me faire un devis ?",
    date: "2026-04-14",
    status: "new",
  },
  {
    id: 2,
    name: "Jean-Pierre Martin",
    email: "jp.martin@gmail.com",
    phone: "06 98 76 54 32",
    message:
      "J'ai un parquet ancien dans mon appartement à Strasbourg centre qui nécessite un ponçage et une vitrification. Surface d'environ 60m².",
    date: "2026-04-13",
    status: "new",
  },
  {
    id: 3,
    name: "Sophie Keller",
    email: "s.keller@outlook.fr",
    phone: "07 11 22 33 44",
    message:
      "Nous rénovons notre maison à Oberhausbergen et cherchons un artisan pour poser du PVC dans la cuisine et la salle de bain (environ 20m²).",
    date: "2026-04-12",
    status: "read",
  },
  {
    id: 4,
    name: "Restaurant Le Comptoir",
    email: "contact@lecomptoir-stras.fr",
    phone: "03 88 12 34 56",
    message:
      "Nous recherchons un professionnel pour la pose de revêtement de sol dans notre nouveau restaurant de 120m² à Mundolsheim. Parquet ou PVC, nous sommes ouverts à vos conseils.",
    date: "2026-04-10",
    status: "replied",
  },
  {
    id: 5,
    name: "Famille Weber",
    email: "weber.famille@free.fr",
    phone: "06 55 44 33 22",
    message:
      "Pose de moquette dans 3 chambres (environ 45m² au total) dans notre maison à Hoenheim. Quels sont vos tarifs ?",
    date: "2026-04-08",
    status: "replied",
  },
  {
    id: 6,
    name: "Arnaud Fischer",
    email: "a.fischer@gmail.com",
    phone: "06 77 88 99 00",
    message:
      "Bonjour Lucas, suite à la recommandation de Thomas Huck, je vous contacte pour un projet de pose de parquet bâton rompu dans notre séjour (40m²) à Bischheim.",
    date: "2026-04-06",
    status: "read",
  },
];
