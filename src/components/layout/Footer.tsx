import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
import { NAV_LINKS, CONTACT, SITE_NAME } from "@/lib/constants";
import { services } from "@/data/services";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="bg-neutral-dark text-gray-300">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Logo + Description */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">{SITE_NAME}</h3>
            <p className="text-sm leading-relaxed mb-6">
              Artisan spécialisé en pose de parquet, PVC, moquette, ponçage et
              vitrification à Strasbourg et alentours.
            </p>
            <div className="flex gap-4">
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={CONTACT.phoneLink}
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <Phone size={16} className="text-primary shrink-0" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.emailLink}
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <Mail size={16} className="text-primary shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <MapPin size={16} className="text-primary shrink-0" />
                {CONTACT.address}
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {SITE_NAME} - Tous droits réservés</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
          </div>
          {/* <p>
            Site réalisé par{" "}
            <span className="text-primary font-medium">Agence Sweet</span>
          </p> */}
        </Container>
      </div>
    </footer>
  );
}
