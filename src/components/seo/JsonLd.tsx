export default function JsonLd() {
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
      ratingValue: "5.0",
      reviewCount: "18",
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
