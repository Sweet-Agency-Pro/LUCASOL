"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, Star, Image } from "lucide-react";
import Card from "@/components/ui/Card";
import { createClient } from "@/lib/supabase";

interface Stats {
  demands: number;
  newDemands: number;
  reviews: number;
  averageRating: number | null;
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
          supabase.from("reviews").select("rating", { count: "exact" }),
          supabase.from("realisations").select("id", { count: "exact", head: true }).eq("published", true),
        ]);

      const ratings = reviewsRes.data ?? [];
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
          : null;

      setStats({
        demands: demandsRes.count ?? 0,
        newDemands: newDemandsRes.count ?? 0,
        reviews: reviewsRes.count ?? 0,
        averageRating,
        realisations: realisationsRes.count ?? 0,
      });
    };

    fetchStats();
  }, []);

  const statCards = stats
    ? [
      {
        label: "Avis Google",
        value:
          stats.averageRating !== null
            ? `${stats.reviews} (${(Math.round(stats.averageRating * 10) / 10).toLocaleString("fr-FR")}/5)`
            : stats.reviews,
        sub: "Tous les avis",
        icon: <Star size={24} className="text-yellow-500" />,
        bg: "bg-yellow-50",
        href: "/admin/avis",
      },
      {
        label: "Réalisations publiées",
        value: stats.realisations,
        sub: "Sur le site",
        icon: <Image size={24} className="text-green-500" />,
        bg: "bg-green-50",
        href: "/admin/realisations",
      },
      {
        label: "Demandes reçues",
        value: stats.demands,
        sub: stats.newDemands > 0 ? `${stats.newDemands} non lue${stats.newDemands > 1 ? "s" : ""}` : "Toutes lues",
        icon: <MessageSquare size={24} className="text-blue-500" />,
        bg: "bg-blue-50",
        href: "/admin/demandes",
      }
    ]
    : [];

  return (
    <div>
      <p className="text-xl sm:text-2xl font-bold mb-2 text-neutral-dark">Dashboard</p>
      <p className="text-sm text-neutral mb-6 sm:mb-8">
        Bienvenue dans votre espace d'administration Lucas.
      </p>

      {stats === null ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {[0, 1, 2].map((i) => (
            <Card key={i} hover={false}>
              <div className="h-14 animate-pulse bg-gray-100 rounded-lg" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {statCards.map((stat) => (
            <Link key={stat.label} href={stat.href}>
              <Card className="h-full cursor-pointer">
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
            </Link>
          ))}
        </div>
      )}

      <Card hover={false}>
        <h2 className="font-semibold text-neutral-dark mb-3">
          Gestion du site
        </h2>
        <p className="text-neutral text-sm mb-3">
          Depuis ce panneau, vous pouvez gérer :
        </p>
        <ul className="space-y-2 text-sm text-neutral list-disc pl-5">
          <li>
            <strong className="text-neutral-dark">Avis clients</strong> -
            ajouter, modifier, masquer, supprimer
          </li>
          <li>
            <strong className="text-neutral-dark">Réalisations</strong> -
            ajouter des photos, modifier les descriptions, choisir une
            catégorie personnalisée, publier ou masquer
          </li>
          <li>
            <strong className="text-neutral-dark">Demandes de contact</strong> -
            changer le statut (Nouveau / Lu / Répondu), supprimer
          </li>
        </ul>
        <p className="text-neutral text-sm mt-3">
          Toutes les modifications sont reflétées immédiatement sur le site.
        </p>
      </Card>
    </div>
  );
}
