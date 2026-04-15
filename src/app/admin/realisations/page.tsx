"use client";

import Image from "next/image";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { realisations } from "@/data/realisations";

export default function AdminRealisationsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-dark">Réalisations</h1>
          <p className="text-sm text-neutral mt-1">{realisations.length} réalisations publiées</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium opacity-50 cursor-not-allowed">
          + Ajouter une réalisation
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {realisations.map((item) => (
          <Card key={item.id} className="p-0 overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-neutral-dark text-sm mb-2 truncate">
                {item.title}
              </h3>
              <div className="flex items-center justify-between">
                <Badge variant={item.category === "avant-apres" ? "warning" : "primary"}>
                  {item.category}
                </Badge>
                <Badge variant="success">Publié</Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
