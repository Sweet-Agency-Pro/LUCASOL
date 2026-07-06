#!/usr/bin/env node
/**
 * LUCASOL — Script de migration vers Supabase Storage
 *
 * Pré-requis :
 *   1. Avoir exécuté supabase/schema.sql dans le dashboard Supabase
 *   2. Ajouter SUPABASE_SERVICE_ROLE_KEY dans .env.local
 *      (Settings > API > service_role key dans le dashboard Supabase)
 *
 * Exécution :
 *   node --env-file=.env.local scripts/migrate-to-supabase.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "fs";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("");
  console.error("❌  Variables manquantes :");
  console.error("   NEXT_PUBLIC_SUPABASE_URL  →", SUPABASE_URL ? "✓" : "MANQUANT");
  console.error("   SUPABASE_SERVICE_ROLE_KEY →", SERVICE_ROLE_KEY ? "✓" : "MANQUANT");
  console.error("");
  console.error("   Ajoutez SUPABASE_SERVICE_ROLE_KEY dans .env.local");
  console.error("   (Settings → API → service_role dans le dashboard Supabase)");
  console.error("");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

/** Upload un fichier et retourne son URL publique */
async function uploadFile(bucket, remotePath, localPath) {
  const file = readFileSync(localPath);
  const ext = extname(localPath).toLowerCase();
  const contentType =
    ext === ".webp" ? "image/webp" : ext === ".png" ? "image/png" : "image/jpeg";

  const { error } = await supabase.storage
    .from(bucket)
    .upload(remotePath, file, { contentType, upsert: true });

  if (error) {
    console.error(`  ❌  ${remotePath} — ${error.message}`);
    return null;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(remotePath);
  console.log(`  ✓  ${remotePath}`);
  return data.publicUrl;
}

/** Upload tous les fichiers d'un dossier dans un bucket Supabase Storage */
async function uploadFolder(bucket, localDir) {
  const files = readdirSync(localDir);
  const urls = {};
  for (const file of files) {
    const url = await uploadFile(bucket, file, join(localDir, file));
    if (url) urls[file] = url;
  }
  return urls;
}

async function main() {
  console.log("");
  console.log("🚀  LUCASOL — Migration vers Supabase Storage");
  console.log("    URL :", SUPABASE_URL);
  console.log("");

  // ── Réalisations ──────────────────────────────────────────────────────────
  console.log("📁  Upload réalisations…");
  const realisationUrls = await uploadFolder(
    "realisations",
    join(ROOT, "public/images/realisations")
  );

  // ── Services ──────────────────────────────────────────────────────────────
  console.log("\n📁  Upload services…");
  const serviceUrls = await uploadFolder(
    "services",
    join(ROOT, "public/images/services")
  );

  // ── Hero ──────────────────────────────────────────────────────────────────
  console.log("\n📁  Upload hero…");
  await uploadFolder("hero", join(ROOT, "public/images/hero"));

  // ── Insertion des réalisations en base ────────────────────────────────────
  console.log("\n📝  Insertion des réalisations en base…");

  const realisations = [
    {
      title: "Parquet massif — Salon avec cheminée",
      category: "parquet",
      image_url: realisationUrls["parquet-01.jpg"],
      description: "Pose de parquet massif chêne dans un salon lumineux",
      display_order: 1,
    },
    {
      title: "Bâton rompu — Pièce de vie",
      category: "parquet",
      image_url: realisationUrls["parquet-02.jpg"],
      description: "Pose en bâton rompu, rendu élégant et moderne",
      display_order: 2,
    },
    {
      title: "Parquet chevron — Séjour",
      category: "parquet",
      image_url: realisationUrls["parquet-03.jpg"],
      description: "Parquet chevron dans un séjour spacieux",
      display_order: 3,
    },
    {
      title: "Parquet massif — Chambre",
      category: "parquet",
      image_url: realisationUrls["parquet-04.jpg"],
      description: "Pose de parquet massif dans une chambre",
      display_order: 4,
    },
    {
      title: "Parquet — Espace commercial",
      category: "parquet",
      image_url: realisationUrls["parquet-05.jpg"],
      description: "Pose de parquet dans un espace professionnel",
      display_order: 5,
    },
    {
      title: "Finition soignée — Détail de pose bâton rompu",
      category: "parquet",
      image_url: realisationUrls["parquet-06.jpg"],
      description: "Détail de finition sur une pose en bâton rompu",
      display_order: 6,
    },
    {
      title: "Rénovation complète — Pose parquet",
      category: "parquet",
      image_url: realisationUrls["parquet-07.jpg"],
      description: "Remplacement carrelage par parquet moderne",
      display_order: 7,
    },
    {
      title: "Parquet imitation bois — Pièce de vie",
      category: "parquet",
      image_url: realisationUrls["parquet-08.jpg"],
      description: "Pose de lames parquet effet bois naturel",
      display_order: 8,
    },
    {
      title: "Ponçage et vitrification — 90m²",
      category: "poncage",
      image_url: realisationUrls["poncage-01.jpg"],
      description: "Restauration complète de parquet ancien",
      display_order: 9,
    },
    {
      title: "Ponçage parquet ancien",
      category: "poncage",
      image_url: realisationUrls["poncage-02.jpg"],
      description: "Remise à neuf d'un parquet massif",
      display_order: 10,
    },
    {
      title: "Avant / Après — PVC sur carrelage",
      category: "avant-apres",
      image_url: realisationUrls["avant-apres-01-after.jpg"],
      before_image_url: realisationUrls["avant-apres-01-before.jpg"],
      after_image_url: realisationUrls["avant-apres-01-after.jpg"],
      description: "Transformation complète : carrelage ancien remplacé par PVC",
      display_order: 11,
    },
    {
      title: "Avant / Après — Pose sur sol existant",
      category: "avant-apres",
      image_url: realisationUrls["avant-apres-02-after.jpg"],
      before_image_url: realisationUrls["avant-apres-02-before.jpg"],
      after_image_url: realisationUrls["avant-apres-02-after.jpg"],
      description: "Transformation avec pose de parquet sur sol existant",
      display_order: 12,
    },
    {
      title: "Avant / Après — Rénovation sol 3",
      category: "avant-apres",
      image_url: realisationUrls["avant-apres-03-after.jpg"],
      before_image_url: realisationUrls["avant-apres-03-before.jpg"],
      after_image_url: realisationUrls["avant-apres-03-after.jpg"],
      description: "Rénovation avant/après — chantier 3",
      display_order: 13,
    },
    {
      title: "Avant / Après — Rénovation sol 4",
      category: "avant-apres",
      image_url: realisationUrls["avant-apres-04-after.jpg"],
      before_image_url: realisationUrls["avant-apres-04-before.jpg"],
      after_image_url: realisationUrls["avant-apres-04-after.jpg"],
      description: "Rénovation avant/après — chantier 4",
      display_order: 14,
    },
  ].filter((r) => r.image_url); // Ignore les images dont l'upload a échoué

  if (realisations.length === 0) {
    console.error("❌  Aucune réalisation à insérer (les uploads ont peut-être échoué).");
  } else {
    const { error } = await supabase
      .from("realisations")
      .insert(realisations);

    if (error) {
      console.error("❌  Erreur insertion réalisations :", error.message);
    } else {
      console.log(`✓  ${realisations.length} réalisations insérées`);
    }
  }

  // ── Résumé ────────────────────────────────────────────────────────────────
  console.log("");
  console.log("✨  Migration terminée !");
  console.log("");
  console.log("   Prochaines étapes :");
  console.log("   1. Vérifier les données dans le dashboard Supabase");
  console.log("   2. Créer un utilisateur admin : Authentication → Users → Add user");
  console.log("   3. Accéder au backoffice : votre-site.fr/admin");
  console.log("");
}

main().catch((err) => {
  console.error("Erreur fatale :", err);
  process.exit(1);
});
