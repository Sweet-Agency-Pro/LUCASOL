import HeroSection from "@/components/home/HeroSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import StatsSection from "@/components/home/StatsSection";
import RealisationsPreview from "@/components/home/RealisationsPreview";
import ReviewsSection from "@/components/home/ReviewsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTASection from "@/components/home/CTASection";
import { createServerSupabase } from "@/lib/supabase-server";
import { reviewsFallback } from "@/data/reviews-fallback";
import { realisations as realisationsFallback } from "@/data/realisations";
import type { Review, Realisation } from "@/types";

export const revalidate = 60; // Revalide toutes les 60 secondes (ISR)

export default async function Home() {
  let reviews: Review[] = reviewsFallback;
  let realisations: Realisation[] = realisationsFallback;

  try {
    const supabase = await createServerSupabase();

    const [reviewsResult, realisationsResult] = await Promise.all([
      supabase
        .from("reviews")
        .select("id, client, rating, comment, date, source")
        .eq("visible", true)
        .order("created_at", { ascending: false }),
      supabase
        .from("realisations")
        .select("*")
        .eq("published", true)
        .order("display_order", { ascending: true }),
    ]);

    if (reviewsResult.data && reviewsResult.data.length > 0) {
      reviews = reviewsResult.data as Review[];
    }

    if (realisationsResult.data && realisationsResult.data.length > 0) {
      realisations = realisationsResult.data.map((r) => ({
        id: r.id,
        title: r.title,
        category: r.category as Realisation["category"],
        image: r.image_url,
        beforeImage: r.before_image_url ?? undefined,
        afterImage: r.after_image_url ?? undefined,
        description: r.description ?? undefined,
      }));
    }
  } catch (err) {
    console.warn("Supabase fetch failed, using fallback data:", err);
  }

  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <StatsSection />
      <RealisationsPreview realisations={realisations} />
      <ReviewsSection reviews={reviews} />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
