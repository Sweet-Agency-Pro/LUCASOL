import { createClient } from "@supabase/supabase-js";

/** Note moyenne et nombre d'avis visibles, avec fallback statique. */
async function getReviewStats() {
  const fallback = { ratingValue: "5", reviewCount: "18" };
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase
      .from("reviews")
      .select("rating")
      .eq("visible", true);
    if (!data || data.length === 0) return fallback;
    const average =
      data.reduce((sum, r) => sum + r.rating, 0) / data.length;
    return {
      ratingValue: String(Math.round(average * 10) / 10),
      reviewCount: String(data.length),
    };
  } catch {
    return fallback;
  }
}

export default async function JsonLd() {
  const { ratingValue, reviewCount } = await getReviewStats();
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "LUCASOL",
    description:
      "Pose de parquet, PVC, moquette, ponçage et vitrification à Strasbourg et alentours",
    telephone: "+33643135492",
    email: "artisan.lucasol@gmail.com",
    url: "https://lucasol.fr",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dingsheim",
      addressRegion: "Grand Est",
      postalCode: "67370",
      addressCountry: "FR",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 48.62,
        longitude: 7.68,
      },
      geoRadius: "30000",
    },
    priceRange: "€€",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: ["https://www.instagram.com/artisan.lucasol"],
    image: "https://lucasol.fr/images/logo/lucasol-logo.png",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de revêtement de sol",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pose de parquet",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pose de PVC / Vinyle",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pose de moquette",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ponçage et vitrification",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
