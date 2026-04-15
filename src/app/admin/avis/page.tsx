"use client";

import Card from "@/components/ui/Card";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import { reviewsFallback } from "@/data/reviews-fallback";

export default function AdminAvisPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-dark">Avis clients</h1>
          <p className="text-sm text-neutral mt-1">{reviewsFallback.length} avis - Note moyenne : 5.0/5</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium opacity-50 cursor-not-allowed">
          + Ajouter un avis
        </button>
      </div>

      <Card hover={false} className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 font-medium text-neutral">Client</th>
                <th className="text-left px-6 py-3 font-medium text-neutral">Note</th>
                <th className="text-left px-6 py-3 font-medium text-neutral">Commentaire</th>
                <th className="text-left px-6 py-3 font-medium text-neutral">Date</th>
                <th className="text-left px-6 py-3 font-medium text-neutral">Source</th>
                <th className="text-left px-6 py-3 font-medium text-neutral">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviewsFallback.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-neutral-dark">{review.client}</td>
                  <td className="px-6 py-4">
                    <StarRating rating={review.rating} size={14} />
                  </td>
                  <td className="px-6 py-4 text-neutral max-w-xs truncate">{review.comment}</td>
                  <td className="px-6 py-4 text-neutral whitespace-nowrap">{review.date}</td>
                  <td className="px-6 py-4">
                    <Badge variant={review.source === "google" ? "primary" : "neutral"}>
                      {review.source === "google" ? "Google" : "Manuel"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-xs text-neutral hover:text-primary opacity-50 cursor-not-allowed">
                        Masquer
                      </button>
                      <button className="text-xs text-neutral hover:text-primary opacity-50 cursor-not-allowed">
                        Mettre en avant
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
