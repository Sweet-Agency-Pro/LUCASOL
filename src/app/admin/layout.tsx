"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Star, Image, MessageSquare, ArrowLeft, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
  { label: "Avis", href: "/admin/avis", icon: <Star size={18} /> },
  { label: "Réalisations", href: "/admin/realisations", icon: <Image size={18} /> },
  { label: "Demandes", href: "/admin/demandes", icon: <MessageSquare size={18} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Mobile toggle */}
      <div className="lg:hidden fixed top-20 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-10 h-10 rounded-lg bg-white shadow-md flex items-center justify-center"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-20 bottom-0 w-64 bg-white border-r border-gray-200 p-6 z-30 transition-transform lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white text-sm font-bold">L</span>
            </div>
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

          <div className="absolute bottom-6 left-6 right-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-neutral hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              Retour au site
            </Link>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 lg:ml-64 p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
