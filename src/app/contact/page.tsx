"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";

function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { CONTACT, GOOGLE_MAPS_EMBED_URL } from "@/lib/constants";
import { motion } from "framer-motion";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit comporter au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().optional(),
  message: z.string().min(10, "Le message doit comporter au moins 10 caractères"),
  consent: z.literal(true, { message: "Vous devez accepter les conditions" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero compact */}
      <section className="bg-neutral-dark pt-32 pb-16">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-2">
            <ol className="flex items-center gap-2 text-sm font-medium">
              <li>
                <Link href="/" className="text-primary hover:underline">
                  Accueil
                </Link>
              </li>
              <li className="text-gray-400">&gt;</li>
              <li>
                <Link href="/contact" className="text-primary hover:underline" aria-current="page">
                  Contact
                </Link>
              </li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Contact</h1>
          <p className="text-gray-300 mt-4 max-w-xl">
            Devis gratuit - Réponse rapide
          </p>
        </Container>
      </section>

      {/* Form + Info */}
      <section className="py-20 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form (3/5) */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-neutral-dark mb-6">
                Envoyez-nous un message
              </h2>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 mb-6"
                >
                  <CheckCircle size={20} />
                  <p>Message envoyé avec succès ! Nous reviendrons vers vous rapidement.</p>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 mb-6"
                >
                  <AlertCircle size={20} />
                  <p>Une erreur est survenue. Veuillez réessayer ou nous appeler directement.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-dark mb-1">
                    Nom complet *
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Votre nom"
                    {...register("name")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors text-neutral-dark"
                  />
                  {errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-dark mb-1">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      {...register("email")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors text-neutral-dark"
                    />
                    {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-dark mb-1">
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="06 00 00 00 00"
                      {...register("phone")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors text-neutral-dark"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-dark mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Décrivez votre projet..."
                    {...register("message")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors resize-none text-neutral-dark"
                  />
                  {errors.message && <p className="text-error text-sm mt-1">{errors.message.message}</p>}
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="consent"
                    type="checkbox"
                    {...register("consent")}
                    className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="consent" className="text-sm text-neutral">
                    J&apos;accepte que mes données soient utilisées pour répondre à ma demande.{" "}
                    <a href="/politique-confidentialite" className="text-primary hover:underline">
                      En savoir plus
                    </a>
                  </label>
                </div>
                {errors.consent && <p className="text-error text-sm">{errors.consent.message}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                </button>
              </form>
            </div>

            {/* Info (2/5) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Phone accent */}
              <Card hover={false} className="bg-primary-light border border-primary/20">
                <div className="text-center">
                  <Phone size={28} className="text-primary mx-auto mb-3" />
                  <p className="text-sm text-neutral mb-1">Appelez-nous directement</p>
                  <a href={CONTACT.phoneLink} className="text-2xl font-bold text-neutral-dark hover:text-primary transition-colors">
                    {CONTACT.phone}
                  </a>
                  <p className="text-xs text-neutral mt-2">Réponse rapide - Devis gratuit</p>
                </div>
              </Card>

              {/* Contact info */}
              <Card hover={false}>
                <h3 className="font-semibold text-neutral-dark mb-4">Informations</h3>
                <ul className="space-y-4">
                  <li>
                    <a href={CONTACT.emailLink} className="flex items-center gap-3 text-sm text-neutral hover:text-primary transition-colors break-all">
                      <Mail size={18} className="text-primary shrink-0" />
                      {CONTACT.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-neutral">
                    <MapPin size={18} className="text-primary shrink-0" />
                    {CONTACT.address}
                  </li>
                  <li>
                    <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-neutral hover:text-primary transition-colors">
                      <InstagramIcon size={18} className="text-primary shrink-0" />
                      @{CONTACT.instagram}
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-neutral">
                    <Clock size={18} className="text-primary shrink-0" />
                    {CONTACT.hours}
                  </li>
                </ul>
              </Card>

              {/* Map */}
              <div className="rounded-xl overflow-hidden h-[250px]">
                <iframe
                  src={GOOGLE_MAPS_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation LUCASOL"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
