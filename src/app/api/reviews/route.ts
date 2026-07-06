import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";
import { reviewsFallback } from "@/data/reviews-fallback";

export async function GET() {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("reviews")
      .select("id, client, rating, comment, date, source")
      .eq("visible", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      // Fallback sur les données statiques
      return NextResponse.json({
        reviews: reviewsFallback,
        rating: 5.0,
        total: reviewsFallback.length,
        source: "fallback",
      });
    }

    return NextResponse.json({
      reviews: data,
      rating: 5.0,
      total: data.length,
      source: "supabase",
    });
  } catch {
    return NextResponse.json({
      reviews: reviewsFallback,
      rating: 5.0,
      total: reviewsFallback.length,
      source: "fallback",
    });
  }
}
