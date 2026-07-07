import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <>
      <section className="bg-neutral-dark pt-32 pb-16">
        <Container>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Page introuvable
          </h1>
          <p className="text-gray-300 mt-3">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
        </Container>
      </section>

      <section className="py-20 bg-background">
        <Container className="max-w-xl text-center">
          <p className="text-8xl font-bold text-primary mb-6">404</p>
          <p className="text-neutral mb-8">
            Désolé, cette page n&apos;a pas été trouvée. Vérifiez l&apos;URL ou
            retournez à l&apos;accueil.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Home size={18} />
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-neutral-dark font-semibold rounded-lg hover:bg-neutral-light transition-colors"
            >
              <ArrowLeft size={18} />
              Contactez-nous
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
