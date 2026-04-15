"use client";

import { MessageSquare, Star, Image, BarChart3 } from "lucide-react";
import Card from "@/components/ui/Card";
import { fakeStats } from "@/data/fake-admin-data";

const statCards = [
  {
    label: "Demandes ce mois",
    value: fakeStats.demands,
    icon: <MessageSquare size={24} className="text-blue-500" />,
    bg: "bg-blue-50",
  },
  {
    label: "Avis Google",
    value: `${fakeStats.reviews} (5.0/5)`,
    icon: <Star size={24} className="text-yellow-500" />,
    bg: "bg-yellow-50",
  },
  {
    label: "Réalisations publiées",
    value: fakeStats.realisations,
    icon: <Image size={24} className="text-green-500" />,
    bg: "bg-green-50",
  },
  {
    label: "Visites ce mois",
    value: fakeStats.visits,
    icon: <BarChart3 size={24} className="text-purple-500" />,
    bg: "bg-purple-50",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-dark mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.label} hover={false}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-dark">{stat.value}</p>
                <p className="text-sm text-neutral">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick info */}
      <Card hover={false}>
        <h2 className="font-semibold text-neutral-dark mb-4">Bienvenue dans votre espace admin</h2>
        <p className="text-neutral text-sm leading-relaxed">
          Ce panneau d&apos;administration vous permet de gérer vos avis clients,
          vos réalisations et les demandes de contact reçues via votre site web.
          Les données affichées ici sont des démonstrations - elles seront remplacées
          par vos vraies données une fois le site en ligne.
        </p>
      </Card>
    </div>
  );
}
