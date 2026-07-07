"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";
import Container from "@/components/ui/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <section className="bg-neutral-dark pt-32 pb-16">
        <Container>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Une erreur est survenue
          </h1>
          <p className="text-gray-300 mt-3">
            Quelque chose ne s&apos;est pas passé comme prévu.
          </p>
        </Container>
      </section>

      <section className="py-20 bg-background">
        <Container className="max-w-xl text-center">
          <p className="text-neutral mb-8">
            Une erreur inattendue s&apos;est produite. Veuillez réessayer ou
            retourner à l&apos;accueil.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              <RefreshCw size={18} />
              Réessayer
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-neutral-dark font-semibold rounded-lg hover:bg-neutral-light transition-colors"
            >
              <Home size={18} />
              Retour à l&apos;accueil
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
