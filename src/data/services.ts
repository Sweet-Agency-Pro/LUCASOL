import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "parquet",
    title: "Pose de parquet",
    shortDescription:
      "Parquet massif, contrecollé ou stratifié - pose à l'anglaise, bâton rompu ou point de Hongrie.",
    longDescription:
      "Nous réalisons la pose de tous types de parquet : massif, contrecollé et stratifié. Que vous souhaitiez une pose à l'anglaise classique, un élégant bâton rompu ou un raffiné point de Hongrie, nous maîtrisons chaque technique. Pose collée, flottante ou clouée selon votre support et vos préférences. Chaque lame est posée avec précision pour un résultat impeccable et durable.",
    icon: "TreeDeciduous",
    features: [
      "Parquet massif (chêne, noyer, hêtre…)",
      "Parquet contrecollé",
      "Parquet stratifié",
      "Pose à l'anglaise",
      "Pose en bâton rompu",
      "Pose en point de Hongrie",
      "Pose collée, flottante ou clouée",
    ],
    slug: "parquet",
  },
  {
    id: "pvc",
    title: "Pose de PVC / Vinyle",
    shortDescription:
      "Lames, dalles ou rouleaux - un sol résistant, facile d'entretien et adapté à toutes les pièces.",
    longDescription:
      "Le PVC et le vinyle offrent une solution moderne, résistante et esthétique pour vos sols. Idéal pour les pièces humides (cuisine, salle de bain) et les espaces à fort passage. Disponible en lames, dalles ou rouleaux, avec un large choix de motifs imitant le bois, la pierre ou le béton ciré. Installation rapide et résultat impeccable.",
    icon: "Layers",
    features: [
      "Lames PVC clipsables",
      "Dalles vinyles",
      "PVC en rouleau",
      "Résistant à l'eau et aux taches",
      "Imitation bois, pierre, béton ciré",
      "Idéal pièces humides",
    ],
    slug: "pvc",
  },
  {
    id: "moquette",
    title: "Pose de moquette",
    shortDescription:
      "Confort, isolation phonique et thermique - un large choix de textures et coloris.",
    longDescription:
      "La moquette apporte chaleur et confort à vos intérieurs. Excellente isolation phonique et thermique, elle est idéale pour les chambres, bureaux et espaces de vie. Nous posons tous types de moquettes : bouclée, velours, shaggy, dalles de moquette. Un grand choix de textures et de coloris pour personnaliser votre intérieur.",
    icon: "Armchair",
    features: [
      "Moquette bouclée",
      "Moquette velours",
      "Dalles de moquette",
      "Isolation phonique",
      "Isolation thermique",
      "Large choix de coloris",
    ],
    slug: "moquette",
  },
  {
    id: "poncage",
    title: "Ponçage & Vitrification",
    shortDescription:
      "Redonnez vie à votre parquet ancien - ponçage, réparation et finition professionnelle.",
    longDescription:
      "Votre parquet est usé, rayé ou terni ? Notre service de ponçage et vitrification lui redonne tout son éclat. Nous intervenons sur tous types de parquets bois : ponçage en plusieurs passes pour un résultat parfaitement lisse, puis application de la finition de votre choix. Réparation des lames abîmées, traitement des joints et remise à neuf complète.",
    icon: "Sparkles",
    features: [
      "Ponçage multi-passes",
      "Vitrification (mat, satiné, brillant)",
      "Huilage",
      "Cirage",
      "Réparation de lames",
    ],
    slug: "poncage",
  },
];
