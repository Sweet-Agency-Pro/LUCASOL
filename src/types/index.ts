export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  features: string[];
  slug: string;
}

export interface Review {
  id: number;
  client: string;
  rating: number;
  comment: string;
  date: string;
  source: "google" | "manual";
}

export interface Realisation {
  id: number;
  title: string;
  category: RealisationCategory;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  description?: string;
}

export type RealisationCategory =
  | "all"
  | "parquet"
  | "pvc"
  | "poncage"
  | "avant-apres";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  consent: boolean;
}

export interface AdminDemand {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: "new" | "read" | "replied";
}

export interface AdminStats {
  demands: number;
  reviews: number;
  realisations: number;
  visits: number;
}
