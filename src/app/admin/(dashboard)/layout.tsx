"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Star,
  Image as ImageIcon,
  MessageSquare,
  ArrowLeft,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase";

const adminLinks = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
  { label: "Avis", href: "/admin/avis", icon: <Star size={18} /> },
  { label: "Réalisations", href: "/admin/realisations", icon: <ImageIcon size={18} /> },
  { label: "Demandes", href: "/admin/demandes", icon: <MessageSquare size={18} /> },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barre mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-40 flex items-center gap-3 px-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          aria-label={sidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo/logo1.webp"
            alt="LUCASOL"
            width={28}
            height={29}
            priority
          />
          <span className="font-bold text-neutral-dark text-sm">Admin Panel</span>
        </div>
      </div>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-x-0 top-14 bottom-0 bg-black/40 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-14 lg:top-0 bottom-0 w-64 bg-white border-r border-gray-200 p-6 z-30 transition-transform lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="hidden lg:flex items-center gap-2 mb-8">
            <Image
              src="/images/logo/logo1.webp"
              alt="LUCASOL"
              width={32}
              height={33}
              priority
            />
            <span className="font-bold text-neutral-dark">Admin Panel</span>
          </div>

          <nav className="space-y-1">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary-light text-primary-dark"
                    : "text-neutral hover:bg-gray-100"
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-neutral hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              Retour au site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-neutral hover:text-error transition-colors w-full"
            >
              <LogOut size={16} />
              Se déconnecter
            </button>
          </div>
        </aside>

        {/* Contenu */}
        <div className="flex-1 min-w-0 lg:ml-64 px-4 pt-20 pb-6 sm:px-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
