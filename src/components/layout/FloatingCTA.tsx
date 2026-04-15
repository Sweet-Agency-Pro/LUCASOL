"use client";

import { Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { motion } from "framer-motion";

export default function FloatingCTA() {
  return (
    <motion.a
      href={CONTACT.phoneLink}
      className="fixed bottom-5 right-5 z-50 lg:hidden w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_4px_12px_rgba(160,200,20,0.4)]"
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3,
      }}
      aria-label={`Appeler ${CONTACT.phone}`}
    >
      <Phone size={24} />
    </motion.a>
  );
}
