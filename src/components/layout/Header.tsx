"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { NAV_LINKS, CONTACT } from "@/lib/constants";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showScrolledStyle = isScrolled || isAdmin;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          showScrolledStyle
            ? "bg-white/95 backdrop-blur-md shadow-sm header-scrolled"
            : "bg-transparent"
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 -ml-4 sm:-ml-6 lg:-ml-60">
              <span className={cn("inline-flex items-center justify-center rounded-md p-1 logo-bg", showScrolledStyle && "logo-scrolled")}>
                <Image
                  src="/images/logo/logo1.webp"
                  alt="LUCASOL"
                  width={39}
                  height={40}
                  className="logo-img"
                  priority
                />
                <Image
                  src="/images/logo/lucasol-logo-text1.webp"
                  alt="Lucasol texte"
                  width={102}
                  height={24}
                  className="ml-2 hidden sm:inline-block logo-text"
                  priority
                />
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-[15px] font-medium transition-colors duration-200",
                    showScrolledStyle
                      ? "text-neutral hover:text-primary"
                      : "text-white hover:text-primary-light"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4 -mr-12 sm:-mr-12 lg:-mr-60">
              <Button href={CONTACT.phoneLink} size="sm">
                <Phone size={16} />
                {CONTACT.phone}
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu
                size={28}
                className={showScrolledStyle ? "text-neutral-dark" : "text-white"}
              />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
}
