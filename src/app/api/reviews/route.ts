import { NextResponse } from "next/server";
import { reviewsFallback } from "@/data/reviews-fallback";

export async function GET() {
  // In production, fetch Google Reviews via Places API
  // const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID;
  // const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  //
  // if (GOOGLE_PLACE_ID && GOOGLE_API_KEY) {
  //   try {
  //     const res = await fetch(
  //       `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${GOOGLE_API_KEY}&language=fr`
  //     );
  //     const data = await res.json();
  //     if (data.result?.reviews) {
  //       return NextResponse.json({
  //         reviews: data.result.reviews,
  //         rating: data.result.rating,
  //         total: data.result.user_ratings_total,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Google Places API error:", error);
  //   }
  // }

  // Fallback to CSV data
  return NextResponse.json({
    reviews: reviewsFallback,
    rating: 5.0,
    total: reviewsFallback.length,
  });
}
