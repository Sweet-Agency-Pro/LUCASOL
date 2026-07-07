import { type ClassValue, clsx } from "clsx";

// Simple clsx implementation (no dependency needed)
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPhone(phone: string): string {
  return phone.replace(/\s/g, "");
}

const FRENCH_MONTHS = [
  "janvier",
  "fevrier",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "aout",
  "septembre",
  "octobre",
  "novembre",
  "decembre",
];

/**
 * Convertit une date d'avis en texte libre ("Juin 2021", "Août 2025")
 * en valeur numérique triable (année * 12 + mois). Retourne 0 si illisible.
 */
export function parseReviewDate(date: string): number {
  const normalized = date
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const yearMatch = normalized.match(/(\d{4})/);
  if (!yearMatch) return 0;
  const year = Number(yearMatch[1]);
  const monthIndex = FRENCH_MONTHS.findIndex((m) => normalized.includes(m));
  return year * 12 + (monthIndex >= 0 ? monthIndex : 0);
}

/** Trie des avis du plus récent au plus ancien d'après leur date texte. */
export function sortReviewsByDateDesc<T extends { date: string }>(
  reviews: T[]
): T[] {
  return [...reviews].sort(
    (a, b) => parseReviewDate(b.date) - parseReviewDate(a.date)
  );
}
