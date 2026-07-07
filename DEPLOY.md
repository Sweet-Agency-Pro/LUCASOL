# Checklist de mise en ligne — lucasol.fr

> Fichier de suivi : cocher au fur et à mesure. Mis à jour en continu pendant le développement.

## 1. Avant le déploiement

- [ ] Nettoyer les données de test en base (demandes « Test Claude » créées pendant le debug du formulaire, avis de test éventuels)
- [ ] Exécuter dans le SQL Editor Supabase la policy ajoutée à `supabase/schema.sql` (cohérence, non bloquant — la route contact utilise désormais un client anonyme) :
  ```sql
  CREATE POLICY "contact_requests_auth_insert" ON public.contact_requests
    FOR INSERT TO authenticated WITH CHECK (true);
  ```
- [ ] Vérifier que la colonne `featured` de `reviews` peut être supprimée (plus utilisée par le code) — optionnel :
  ```sql
  ALTER TABLE public.reviews DROP COLUMN featured;
  ```
- [ ] `npm run build` sans erreur en local

## 2. Déploiement Vercel

- [ ] Variables d'environnement à créer sur Vercel :
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Rattacher le domaine `lucasol.fr` (+ redirection `www.lucasol.fr` → apex)
- [ ] Vérifier après déploiement :
  - [ ] `https://lucasol.fr/sitemap.xml` répond
  - [ ] `https://lucasol.fr/robots.txt` répond
  - [ ] Formulaire de contact : envoi réel + réception dans le backoffice
  - [ ] Login admin + les 4 pages du backoffice sur mobile
  - [ ] Partage du lien sur WhatsApp → l'image de preview (`/preview.jpg`) s'affiche

## 3. Google Search Console

- [ ] Ajouter la propriété `lucasol.fr` (validation DNS via Vercel, la plus simple)
- [ ] Soumettre le sitemap : `https://lucasol.fr/sitemap.xml`
- [ ] Demander l'indexation manuelle des pages principales (accueil, services, réalisations, contact)

## 4. Google Business Profile

- [ ] Ajouter l'URL `https://lucasol.fr` sur la fiche
- [ ] Vérifier la cohérence NAP avec le site (partout identique) :
  - Nom : LUCASOL
  - Adresse : Dingsheim 67370
  - Téléphone : 06 43 13 54 92
- [ ] Catégorie principale précise (ex. « Entreprise de pose de revêtements de sols »)
- [ ] Zone desservie : Strasbourg + communes alentour (cohérent avec le rayon de 30 km du JSON-LD)
- [ ] Ajouter des photos de chantiers (avant/après en priorité)
- [ ] Récupérer le **lien court d'avis Google** de la fiche et le transmettre au client pour l'envoyer après chaque chantier

## 5. Citations locales (1 h, gratuit)

- [ ] PagesJaunes — fiche avec NAP identique + lien site
- [ ] Houzz / annuaires artisans du Bas-Rhin — idem

## 6. À transmettre au client

- [ ] Accès backoffice (`lucasol.fr/admin`) + mini mode d'emploi (avis, réalisations, demandes)
- [ ] Consigne : demander un avis Google après chaque chantier (lien court)
- [ ] Consigne : ajouter les photos de chantiers sur la fiche Google régulièrement

## 7. Infos manquantes à compléter

- [ ] SIRET / statut juridique de LUCASOL → à insérer dans `/mentions-legales` (actuellement `[SIRET]`)
- [ ] Date de création de l'entreprise si souhaitée sur la fiche Google
