"use client";

import Link from "next/link";
import { X, Phone, Mail, MapPin } from "lucide-react";
import { NAV_LINKS, CONTACT } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-white flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="text-xl font-bold text-neutral-dark">LUCASOL</span>
            <button onClick={onClose} className="p-2" aria-label="Fermer le menu">
              <X size={28} className="text-neutral-dark" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col gap-2 p-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-xl font-medium text-neutral-dark py-3 border-b border-gray-50 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="p-6 space-y-4 border-t border-gray-100">
            <div className="flex items-center gap-3 text-neutral">
              <Phone size={18} className="text-primary" />
              <a href={CONTACT.phoneLink} className="font-medium">{CONTACT.phone}</a>
            </div>
            <div className="flex items-center gap-3 text-neutral">
              <Mail size={18} className="text-primary" />
              <a href={CONTACT.emailLink} className="text-sm">{CONTACT.email}</a>
            </div>
            <div className="flex items-center gap-3 text-neutral">
              <MapPin size={18} className="text-primary" />
              <span className="text-sm">{CONTACT.address}</span>
            </div>
            <Button href={CONTACT.phoneLink} className="w-full mt-4">
              <Phone size={16} />
              Appelez-nous
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
