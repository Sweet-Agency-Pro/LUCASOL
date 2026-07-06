"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Star as StarIcon, Trash2, Plus, X } from "lucide-react";
import Card from "@/components/ui/Card";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import { createClient } from "@/lib/supabase";

interface DBReview {
  id: number;
  client: string;
  rating: number;
  comment: string;
  date: string;
  source: "google" | "manual";
  visible: boolean;
  featured: boolean;
}

const emptyForm = {
  client: "",
  comment: "",
  date: "",
  rating: 5,
  source: "manual" as const,
};

export default function AdminAvisPage() {
  const [reviews, setReviews] = useState<DBReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleField = async (
    review: DBReview,
    field: "visible" | "featured"
  ) => {
    const newVal = !review[field];
    await supabase
      .from("reviews")
      .update({ [field]: newVal })
      .eq("id", review.id);
    setReviews((prev) =>
      prev.map((r) => (r.id === review.id ? { ...r, [field]: newVal } : r))
    );
  };

  const deleteReview = async (id: number) => {
    if (!confirm("Supprimer cet avis définitivement ?")) return;
    await supabase.from("reviews").delete().eq("id", id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { data } = await supabase
      .from("reviews")
      .insert({ ...form, visible: true, featured: false })
      .select()
      .single();
    if (data) setReviews((prev) => [data, ...prev]);
    setForm(emptyForm);
    setShowForm(false);
    setSaving(false);
  };

  const visibleCount = reviews.filter((r) => r.visible).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-dark">Avis clients</h1>
          <p className="text-sm text-neutral mt-1">
            {reviews.length} avis - {visibleCount} visibles sur le site
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          <Plus size={16} />
          Ajouter un avis
        </button>
      </div>

      {/* Modal d'ajout */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-neutral-dark">
                Ajouter un avis manuel
              </h2>
              <button onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-dark mb-1">
                  Client *
                </label>
                <input
                  type="text"
                  required
                  value={form.client}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, client: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary outline-none text-sm"
                  placeholder="Prénom Nom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-dark mb-1">
                  Note *
                </label>
                <select
                  value={form.rating}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, rating: Number(e.target.value) }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary outline-none text-sm"
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} étoile{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-dark mb-1">
                  Commentaire *
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.comment}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, comment: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary outline-none text-sm resize-none"
                  placeholder="Commentaire du client..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-dark mb-1">
                  Date *
                </label>
                <input
                  type="text"
                  required
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                  placeholder="Ex: Juin 2025"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary outline-none text-sm"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {saving ? "Enregistrement…" : "Ajouter"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium text-neutral hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tableau */}
      <Card hover={false} className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-neutral text-sm">
              Chargement…
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-3 font-medium text-neutral">
                    Client
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-neutral">
                    Note
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-neutral">
                    Commentaire
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-neutral">
                    Date
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-neutral">
                    Source
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-neutral">
                    Statut
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-neutral">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reviews.map((review) => (
                  <tr
                    key={review.id}
                    className={`hover:bg-gray-50 ${!review.visible ? "opacity-50" : ""}`}
                  >
                    <td className="px-5 py-4 font-medium text-neutral-dark whitespace-nowrap">
                      {review.client}
                    </td>
                    <td className="px-5 py-4">
                      <StarRating rating={review.rating} size={14} />
                    </td>
                    <td className="px-5 py-4 text-neutral max-w-xs truncate">
                      {review.comment}
                    </td>
                    <td className="px-5 py-4 text-neutral whitespace-nowrap">
                      {review.date}
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        variant={
                          review.source === "google" ? "primary" : "neutral"
                        }
                      >
                        {review.source === "google" ? "Google" : "Manuel"}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        {review.visible ? (
                          <Badge variant="success">Visible</Badge>
                        ) : (
                          <Badge variant="neutral">Masqué</Badge>
                        )}
                        {review.featured && (
                          <Badge variant="warning">En avant</Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleField(review, "visible")}
                          title={review.visible ? "Masquer" : "Afficher"}
                          className="p-1.5 rounded hover:bg-gray-100 transition-colors text-neutral"
                        >
                          {review.visible ? (
                            <EyeOff size={15} />
                          ) : (
                            <Eye size={15} />
                          )}
                        </button>
                        <button
                          onClick={() => toggleField(review, "featured")}
                          title={
                            review.featured
                              ? "Retirer la mise en avant"
                              : "Mettre en avant"
                          }
                          className={`p-1.5 rounded hover:bg-gray-100 transition-colors ${review.featured ? "text-yellow-500" : "text-neutral"}`}
                        >
                          <StarIcon size={15} />
                        </button>
                        <button
                          onClick={() => deleteReview(review.id)}
                          title="Supprimer"
                          className="p-1.5 rounded hover:bg-red-50 transition-colors text-red-400"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
