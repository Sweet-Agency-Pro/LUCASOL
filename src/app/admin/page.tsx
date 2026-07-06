"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Star, Image, TrendingUp } from "lucide-react";
import Card from "@/components/ui/Card";
import { createClient } from "@/lib/supabase";

interface Stats {
  demands: number;
  newDemands: number;
  reviews: number;
  realisations: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient();
      const [demandsRes, newDemandsRes, reviewsRes, realisationsRes] =
        await Promise.all([
          supabase.from("contact_requests").select("id", { count: "exact", head: true }),
          supabase.from("contact_requests").select("id", { count: "exact", head: true }).eq("status", "new"),
          supabase.from("reviews").select("id", { count: "exact", head: true }),
          supabase.from("realisations").select("id", { count: "exact", head: true }).eq("published", true),
        ]);

      setStats({
        demands: demandsRes.count ?? 0,
        newDemands: newDemandsRes.count ?? 0,
        reviews: reviewsRes.count ?? 0,
        realisations: realisationsRes.count ?? 0,
      });
    };

    fetchStats();
  }, []);

  const statCards = stats
    ? [
        {
          label: "Demandes reçues",
          value: stats.demands,
          sub: stats.newDemands > 0 ? `${stats.newDemands} non lue${stats.newDemands > 1 ? "s" : ""}` : "Toutes lues",
          icon: <MessageSquare size={24} className="text-blue-500" />,
          bg: "bg-blue-50",
        },
        {
          label: "Avis Google",
          value: `${stats.reviews} (5.0/5)`,
          sub: "Tous les avis",
          icon: <Star size={24} className="text-yellow-500" />,
          bg: "bg-yellow-50",
        },
        {
          label: "Réalisations publiées",
          value: stats.realisations,
          sub: "Sur le site",
          icon: <Image size={24} className="text-green-500" />,
          bg: "bg-green-50",
        },
        {
          label: "Site actif",
          value: "En ligne",
          sub: "lucasol.fr",
          icon: <TrendingUp size={24} className="text-purple-500" />,
          bg: "bg-purple-50",
        },
      ]
    : [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 text-neutral-dark">Dashboard</h1>
      <p className="text-sm text-neutral mb-8">
        Bienvenue dans votre espace d'administration LUCASOL.
      </p>

      {stats === null ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <Card key={i} hover={false}>
              <div className="h-14 animate-pulse bg-gray-100 rounded-lg" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => (
            <Card key={stat.label} hover={false}>
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}
                >
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-dark">
                    {stat.value}
                  </p>
                  <p className="text-sm text-neutral">{stat.label}</p>
                  <p className="text-xs text-gray-400">{stat.sub}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card hover={false}>
        <h2 className="font-semibold text-neutral-dark mb-3">
          Gestion du site
        </h2>
        <p className="text-neutral text-sm leading-relaxed">
          Depuis ce panneau, vous pouvez gérer vos <strong>avis clients</strong>{" "}
          (masquer, mettre en avant), vos{" "}
          <strong>réalisations</strong> (ajouter des photos, modifier les
          descriptions) et consulter les <strong>demandes de contact</strong>{" "}
          reçues via le formulaire. Toutes les modifications sont reflétées
          immédiatement sur le site.
        </p>
      </Card>
    </div>
  );
}
