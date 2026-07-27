-- ============================================================
-- Fix: recreate storage policies idempotently
--
-- schema.sql defines these policies with plain CREATE POLICY
-- statements (no IF NOT EXISTS / idempotency guard). If that file
-- is ever re-run as a single script in the SQL editor, an early
-- statement erroring with "policy already exists" aborts the rest
-- of the script silently in the same run — which can leave the
-- storage.objects INSERT/UPDATE/DELETE policies for the
-- "realisations" / "services" / "hero" buckets missing entirely,
-- causing "new row violates row-level security policy" on upload.
--
-- This migration drops (if present) and recreates each policy so
-- it can be re-applied safely at any time.
-- ============================================================

DROP POLICY IF EXISTS "storage_realisations_auth_insert" ON storage.objects;
DROP POLICY IF EXISTS "storage_realisations_auth_update" ON storage.objects;
DROP POLICY IF EXISTS "storage_realisations_auth_delete" ON storage.objects;
DROP POLICY IF EXISTS "storage_services_auth_insert" ON storage.objects;
DROP POLICY IF EXISTS "storage_services_auth_delete" ON storage.objects;
DROP POLICY IF EXISTS "storage_hero_auth_insert" ON storage.objects;
DROP POLICY IF EXISTS "storage_hero_auth_delete" ON storage.objects;

CREATE POLICY "storage_realisations_auth_insert" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'realisations');

CREATE POLICY "storage_realisations_auth_update" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'realisations');

CREATE POLICY "storage_realisations_auth_delete" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'realisations');

CREATE POLICY "storage_services_auth_insert" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'services');

CREATE POLICY "storage_services_auth_delete" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'services');

CREATE POLICY "storage_hero_auth_insert" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'hero');

CREATE POLICY "storage_hero_auth_delete" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'hero');

-- Make sure the buckets exist too (no-op if already present).
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('realisations', 'realisations', true, 10485760, ARRAY['image/jpeg','image/jpg','image/png','image/webp']),
  ('services',     'services',     true, 10485760, ARRAY['image/jpeg','image/jpg','image/png','image/webp']),
  ('hero',         'hero',         true, 10485760, ARRAY['image/jpeg','image/jpg','image/png','image/webp'])
ON CONFLICT (id) DO NOTHING;
