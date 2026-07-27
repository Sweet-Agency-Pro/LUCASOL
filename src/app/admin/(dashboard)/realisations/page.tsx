"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Plus, X, Trash2, Eye, EyeOff, Pencil, Upload } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import SelectMenu from "@/components/ui/SelectMenu";
import { createClient } from "@/lib/supabase";

const CATEGORIES = [
  { value: "parquet", label: "Parquet" },
  { value: "pvc", label: "PVC / Vinyle" },
  { value: "moquette", label: "Moquette" },
  { value: "poncage", label: "Ponçage" },
  { value: "avant-apres", label: "Avant / Après" },
];

interface DBRealisation {
  id: number;
  title: string;
  category: string;
  image_url: string;
  before_image_url: string | null;
  after_image_url: string | null;
  description: string | null;
  published: boolean;
  display_order: number;
}

const emptyForm = {
  title: "",
  category: "parquet",
  description: "",
  display_order: 0,
};

const isKnownCategory = (value: string) =>
  CATEGORIES.some((c) => c.value === value);

export default function AdminRealisationsPage() {
  const [items, setItems] = useState<DBRealisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<DBRealisation | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [customCategory, setCustomCategory] = useState("");
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  const mainRef = useRef<HTMLInputElement>(null);
  const beforeRef = useRef<HTMLInputElement>(null);
  const afterRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();

  const fetchItems = async () => {
    const { data } = await supabase
      .from("realisations")
      .select("*")
      .order("display_order", { ascending: true });
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setCustomCategory("");
    setMainFile(null);
    setBeforeFile(null);
    setAfterFile(null);
    setShowForm(true);
  };

  const openEdit = (item: DBRealisation) => {
    setEditItem(item);
    const known = isKnownCategory(item.category);
    setForm({
      title: item.title,
      category: known ? item.category : "autre",
      description: item.description ?? "",
      display_order: item.display_order,
    });
    setCustomCategory(known ? "" : item.category);
    setMainFile(null);
    setBeforeFile(null);
    setAfterFile(null);
    setShowForm(true);
  };

  const uploadImage = async (
    file: File,
    path: string
  ): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "realisations");
      formData.append("path", path);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error("Upload error:", errData.error);
        return null;
      }

      const data = await res.json();
      return data.publicUrl;
    } catch (err) {
      console.error("Upload fetch error:", err);
      return null;
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem && !mainFile) {
      alert("Veuillez sélectionner une image principale.");
      return;
    }
    setSaving(true);

    const slug = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    let image_url = editItem?.image_url ?? "";
    let before_image_url = editItem?.before_image_url ?? null;
    let after_image_url = editItem?.after_image_url ?? null;

    if (mainFile) {
      setUploadProgress("Upload image principale…");
      const url = await uploadImage(mainFile, `main-${slug}.jpg`);
      if (url) image_url = url;
    }
    if (beforeFile) {
      setUploadProgress("Upload image avant…");
      const url = await uploadImage(beforeFile, `before-${slug}.jpg`);
      if (url) before_image_url = url;
    }
    if (afterFile) {
      setUploadProgress("Upload image après…");
      const url = await uploadImage(afterFile, `after-${slug}.jpg`);
      if (url) after_image_url = url;
    }

    setUploadProgress("Enregistrement…");

    const payload = {
      ...form,
      category:
        form.category === "autre" ? customCategory.trim() : form.category,
      image_url,
      before_image_url,
      after_image_url,
    };

    if (editItem) {
      const { data } = await supabase
        .from("realisations")
        .update(payload)
        .eq("id", editItem.id)
        .select()
        .single();
      if (data)
        setItems((prev) => prev.map((i) => (i.id === data.id ? data : i)));
    } else {
      const maxId = items.reduce((max, item) => (item.id > max ? item.id : max), 0);
      const newId = maxId + 1;

      const { data, error } = await supabase
        .from("realisations")
        .insert({ id: newId, ...payload, published: true })
        .select()
        .single();
      if (error) {
        console.error("Insert realization error:", error);
      }
      if (data) setItems((prev) => [...prev, data]);
    }


    setShowForm(false);
    setSaving(false);
    setUploadProgress("");
  };

  const togglePublished = async (item: DBRealisation) => {
    const newVal = !item.published;
    await supabase
      .from("realisations")
      .update({ published: newVal })
      .eq("id", item.id);
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, published: newVal } : i))
    );
  };

  const deleteItem = async (item: DBRealisation) => {
    if (!confirm(`Supprimer "${item.title}" ?`)) return;
    await supabase.from("realisations").delete().eq("id", item.id);
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const publishedCount = items.filter((i) => i.published).length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <p className="text-xl sm:text-2xl font-bold text-neutral-dark">Réalisations</p>
          <p className="text-sm text-neutral mt-1">
            {items.length} réalisations - {publishedCount} publiées
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors self-start sm:self-auto"
        >
          <Plus size={16} />
          Ajouter
        </button>
      </div>

      {/* Modal Ajouter / Modifier */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl my-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-neutral-dark">
                {editItem ? "Modifier la réalisation" : "Ajouter une réalisation"}
              </h2>
              <button onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image principale */}
              <div>
                <label className="block text-sm font-medium text-neutral-dark mb-1">
                  Image principale {!editItem && "*"}
                </label>
                {editItem?.image_url && !mainFile && (
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                    <Image
                      src={editItem.image_url}
                      alt="Aperçu"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {mainFile && (
                  <div className="text-xs text-green-600 mb-1">
                    ✓ {mainFile.name}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => mainRef.current?.click()}
                  className="inline-flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-neutral hover:border-primary hover:text-primary transition-colors"
                >
                  <Upload size={14} />
                  {editItem ? "Changer l'image" : "Choisir une image"}
                </button>
                <input
                  ref={mainRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => setMainFile(e.target.files?.[0] ?? null)}
                />
              </div>

              {/* Avant / Après (si catégorie) */}
              {(form.category === "avant-apres" || form.category === "autre") && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark mb-1">
                      Image Avant
                    </label>
                    {beforeFile && (
                      <div className="text-xs text-green-600 mb-1">
                        ✓ {beforeFile.name}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => beforeRef.current?.click()}
                      className="inline-flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-lg text-xs text-neutral hover:border-primary hover:text-primary transition-colors"
                    >
                      <Upload size={12} />
                      Avant
                    </button>
                    <input
                      ref={beforeRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        setBeforeFile(e.target.files?.[0] ?? null)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark mb-1">
                      Image Après
                    </label>
                    {afterFile && (
                      <div className="text-xs text-green-600 mb-1">
                        ✓ {afterFile.name}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => afterRef.current?.click()}
                      className="inline-flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-lg text-xs text-neutral hover:border-primary hover:text-primary transition-colors"
                    >
                      <Upload size={12} />
                      Après
                    </button>
                    <input
                      ref={afterRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        setAfterFile(e.target.files?.[0] ?? null)
                      }
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-neutral-dark mb-1">
                  Titre *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary outline-none text-sm"
                  placeholder="Ex: Parquet chevron - Salon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-dark mb-1">
                  Catégorie *
                </label>
                <SelectMenu
                  fullWidth
                  value={form.category}
                  options={[
                    ...CATEGORIES.map((c) => ({ value: c.value, label: c.label })),
                    { value: "autre", label: "Autre" },
                  ]}
                  onChange={(v) => setForm((f) => ({ ...f, category: v }))}
                  buttonClassName="px-3 py-2 border border-gray-200 rounded-lg text-sm text-neutral-dark bg-white"
                />
                {form.category === "autre" && (
                  <input
                    type="text"
                    required
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary outline-none text-sm mt-2"
                    placeholder="Précisez la catégorie (ex: Béton ciré)"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-dark mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary outline-none text-sm resize-none"
                  placeholder="Courte description du projet…"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-dark mb-1">
                  Ordre d'affichage
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.display_order}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      display_order: Number(e.target.value),
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary outline-none text-sm"
                />
              </div>

              {uploadProgress && (
                <p className="text-xs text-primary">{uploadProgress}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {saving
                    ? "Enregistrement…"
                    : editItem
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

      {/* Grille */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((item) => (
            <Card key={item.id} className="p-0 overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className={`object-cover transition-opacity ${item.published ? "" : "opacity-50"}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-neutral-dark text-sm mb-2 truncate">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="primary">
                    {CATEGORIES.find((c) => c.value === item.category)?.label ??
                      item.category}
                  </Badge>
                  {item.published ? (
                    <Badge variant="success">Publié</Badge>
                  ) : (
                    <Badge variant="neutral">Masqué</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="p-1.5 rounded hover:bg-gray-100 transition-colors text-neutral"
                    title="Modifier"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => togglePublished(item)}
                    className="p-1.5 rounded hover:bg-gray-100 transition-colors text-neutral"
                    title={item.published ? "Masquer" : "Publier"}
                  >
                    {item.published ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button
                    onClick={() => deleteItem(item)}
                    className="p-1.5 rounded hover:bg-red-50 transition-colors text-red-400"
                    title="Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
