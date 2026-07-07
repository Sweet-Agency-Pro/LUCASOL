"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Trash2, Plus, X, Pencil } from "lucide-react";
import Card from "@/components/ui/Card";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import SelectMenu from "@/components/ui/SelectMenu";
import { createClient } from "@/lib/supabase";
import { sortReviewsByDateDesc } from "@/lib/utils";

interface DBReview {
  id: number;
  client: string;
  rating: number;
  comment: string;
  date: string;
  source: "google" | "manual";
  visible: boolean;
}

const emptyForm = {
  client: "",
  comment: "",
  date: "",
  rating: 5,
};

export default function AdminAvisPage() {
  const [reviews, setReviews] = useState<DBReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editReview, setEditReview] = useState<DBReview | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const openAdd = () => {
    setEditReview(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (review: DBReview) => {
    setEditReview(review);
    setForm({
      client: review.client,
      comment: review.comment,
      date: review.date,
      rating: review.rating,
    });
    setShowForm(true);
  };

  const supabase = createClient();

  const fetchReviews = async () => {
    const { data } = await supabase.from("reviews").select("*");
    if (data) setReviews(sortReviewsByDateDesc(data));
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleField = async (review: DBReview, field: "visible") => {
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
    if (editReview) {
      const { data } = await supabase
        .from("reviews")
        .update(form)
        .eq("id", editReview.id)
        .select()
        .single();
      if (data)
        setReviews((prev) =>
          sortReviewsByDateDesc(prev.map((r) => (r.id === data.id ? data : r)))
        );
    } else {
      const { data } = await supabase
        .from("reviews")
        .insert({ ...form, source: "manual", visible: true })
        .select()
        .single();
      if (data) setReviews((prev) => sortReviewsByDateDesc([data, ...prev]));
    }
    setForm(emptyForm);
    setEditReview(null);
    setShowForm(false);
    setSaving(false);
  };

  const visibleCount = reviews.filter((r) => r.visible).length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <p className="text-xl sm:text-2xl font-bold text-neutral-dark">Avis clients</p>
          <p className="text-sm text-neutral mt-1">
            {reviews.length} avis - {visibleCount} visibles sur le site
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors self-start sm:self-auto"
        >
          <Plus size={16} />
          Ajouter un avis
        </button>
      </div>

      {/* Modal d'ajout */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-5 sm:p-6 w-full max-w-lg shadow-2xl my-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-neutral-dark">
                {editReview ? "Modifier l'avis" : "Ajouter un avis manuel"}
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
                <SelectMenu
                  fullWidth
                  value={String(form.rating)}
                  options={[5, 4, 3, 2, 1].map((n) => ({
                    value: String(n),
                    label: `${n} étoile${n > 1 ? "s" : ""}`,
                  }))}
                  onChange={(v) =>
                    setForm((f) => ({ ...f, rating: Number(v) }))
                  }
                  buttonClassName="px-3 py-2 border border-gray-200 rounded-lg text-sm text-neutral-dark bg-white"
                />
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
                  {saving
                    ? "Enregistrement…"
                    : editReview
                      ? "Mettre à jour"
                      : "Ajouter"}
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

      {/* Tableau (desktop) / Cartes (mobile) */}
      <Card hover={false} className="overflow-hidden p-0">
        {loading ? (
          <div className="p-8 text-center text-neutral text-sm">
            Chargement…
          </div>
        ) : (
          <>
            {/* Liste mobile */}
            <div className="md:hidden divide-y divide-gray-100">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className={`p-4 ${!review.visible ? "opacity-50" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="min-w-0">
                      <p className="font-medium text-neutral-dark text-sm truncate">
                        {review.client}
                      </p>
                      <p className="text-xs text-gray-400">{review.date}</p>
                    </div>
                    <StarRating rating={review.rating} size={14} />
                  </div>
                  <p className="text-sm text-neutral leading-relaxed line-clamp-3 mb-3">
                    {review.comment}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      <Badge
                        variant={review.source === "google" ? "primary" : "neutral"}
                      >
                        {review.source === "google" ? "Google" : "Manuel"}
                      </Badge>
                      {review.visible ? (
                        <Badge variant="success">Visible</Badge>
                      ) : (
                        <Badge variant="neutral">Masqué</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => openEdit(review)}
                        title="Modifier"
                        className="p-2 rounded hover:bg-gray-100 transition-colors text-neutral"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => toggleField(review, "visible")}
                        title={review.visible ? "Masquer" : "Afficher"}
                        className="p-2 rounded hover:bg-gray-100 transition-colors text-neutral"
                      >
                        {review.visible ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button
                        onClick={() => deleteReview(review.id)}
                        title="Supprimer"
                        className="p-2 rounded hover:bg-red-50 transition-colors text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tableau desktop */}
            <div className="hidden md:block overflow-x-auto">
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
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(review)}
                          title="Modifier"
                          className="p-1.5 rounded hover:bg-gray-100 transition-colors text-neutral"
                        >
                          <Pencil size={15} />
                        </button>
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
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
