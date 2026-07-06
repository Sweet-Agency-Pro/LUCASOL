import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";
import { realisations as realisationsFallback } from "@/data/realisations";
import type { Realisation } from "@/types";

export async function GET() {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("realisations")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return NextResponse.json({
        realisations: realisationsFallback,
        source: "fallback",
      });
    }

    const mapped: Realisation[] = data.map((r) => ({
      id: r.id,
      title: r.title,
      category: r.category as Realisation["category"],
      image: r.image_url,
      beforeImage: r.before_image_url ?? undefined,
      afterImage: r.after_image_url ?? undefined,
      description: r.description ?? undefined,
    }));

    return NextResponse.json({ realisations: mapped, source: "supabase" });
  } catch {
    return NextResponse.json({
      realisations: realisationsFallback,
      source: "fallback",
    });
  }
}
