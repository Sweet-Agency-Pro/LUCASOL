"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import StarRating from "@/components/ui/StarRating";
import Card from "@/components/ui/Card";
import { reviewsFallback } from "@/data/reviews-fallback";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ReviewsSection() {
  const reviews = reviewsFallback;
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [translateX, setTranslateX] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const maxIndex = Math.max(0, reviews.length - visibleCount);

  // Adapte le nombre de cards visibles selon la largeur d'écran
  useEffect(() => {
    const update = () => {
      const count = window.innerWidth >= 768 ? 3 : 1;
      setVisibleCount(count);
      setCurrent((c) => Math.min(c, Math.max(0, reviews.length - count)));
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, [reviews.length]);

  // Calcule le décalage en pixels pour éviter les erreurs d'arrondi en %
  useEffect(() => {
    if (!trackRef.current) return;
    const containerWidth = trackRef.current.offsetWidth;
    const gap = 24; // gap-6 = 1.5rem = 24px
    const cardWidth =
      visibleCount === 1
        ? containerWidth
        : (containerWidth - (visibleCount - 1) * gap) / visibleCount;
    setTranslateX(-(current * (cardWidth + gap)));
  }, [current, visibleCount]);

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const next = useCallback(
    () => setCurrent((c) => Math.min(maxIndex, c + 1)),
    [maxIndex]
  );

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-background">
      <Container>
        <SectionTitle title="Ce que disent nos clients" subtitle="" />

        {/* Note globale */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10">
          <div className="flex items-center gap-2">
            <StarRating rating={5} size={20} />
            <span className="text-xl sm:text-2xl font-bold text-neutral-dark">
              5.0 / 5
            </span>
          </div>
          <span className="text-neutral hidden sm:inline">-</span>
          <span className="text-neutral text-sm sm:text-base">
            {reviews.length} avis
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-neutral bg-gray-100 px-3 py-1 rounded-full">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Avis Google
          </span>
        </div>

        {/* Carousel */}
        <div className="relative px-8 md:px-0">
          <div className="overflow-hidden" ref={trackRef}>
            <motion.div
              className="flex gap-6"
              animate={{ x: translateX }}
              transition={{ type: "tween", duration: 0.4 }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="min-w-full md:min-w-[calc(33.333%-16px)] shrink-0"
                >
                  <Card className="h-full" hover={false}>
                    <StarRating rating={review.rating} />
                    <p className="mt-3 text-neutral text-sm leading-relaxed line-clamp-4">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="font-semibold text-neutral-dark text-sm">
                        {review.client}
                      </p>
                      <p className="text-xs text-gray-400">{review.date}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Boutons navigation */}
          <button
            onClick={prev}
            disabled={current === 0}
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
            aria-label="Avis précédents"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            disabled={current === maxIndex}
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
            aria-label="Avis suivants"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Indicateurs */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === current ? "bg-primary" : "bg-gray-300"
              }`}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
