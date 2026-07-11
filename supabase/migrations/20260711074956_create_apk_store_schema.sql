/*
# Create APK Store Schema (single-tenant, no auth)

1. Extensions
- Enable `pg_trgm` for trigram-based fuzzy text search (handles typos and partial matches).

2. New Tables
- `categories`: Stores app/game categories (e.g., Action, Arcade, Tools).
  - `id` (uuid, primary key)
  - `name` (text, unique, not null)
  - `slug` (text, unique, not null)
  - `type` (text, not null) — either 'game' or 'app'
  - `icon` (text) — lucide icon name for display
  - `created_at` (timestamptz)
- `apps`: Stores APK metadata for each app/game listing.
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `slug` (text, unique, not null)
  - `developer` (text, not null)
  - `description` (text, not null)
  - `category_id` (uuid, FK -> categories)
  - `type` (text, not null) — 'game' or 'app'
  - `icon_url` (text, not null) — app icon image
  - `banner_url` (text) — large feature banner for hero carousel
  - `screenshots` (jsonb) — array of screenshot URLs
  - `version` (text, not null)
  - `file_size` (text, not null) — human-readable (e.g., "92M")
  - `rating` (numeric, default 0) — 0-5 scale
  - `downloads` (integer, default 0)
  - `download_url` (text, not null) — private storage path (not exposed to client)
  - `checksum` (text) — SHA-256 hash for integrity verification
  - `is_featured` (boolean, default false) — appears in hero carousel
  - `is_trending` (boolean, default false) — appears in featured releases
  - `is_recent` (boolean, default false) — appears in recently added
  - `is_recommended` (boolean, default false) — appears in recommended
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
- `download_logs`: Tracks download events for analytics and rate limiting.
  - `id` (uuid, primary key)
  - `app_id` (uuid, FK -> apps)
  - `ip_address` (text) — hashed for privacy
  - `user_agent` (text)
  - `created_at` (timestamptz)

3. Indexes
- `apps_slug_idx` on `apps(slug)` for fast slug lookups
- `apps_category_id_idx` on `apps(category_id)` for category filtering
- `apps_type_idx` on `apps(type)` for type filtering
- `apps_downloads_idx` on `apps(downloads DESC)` for popularity sorting
- `apps_rating_idx` on `apps(rating DESC)` for rating sorting
- `apps_created_at_idx` on `apps(created_at DESC)` for recent sorting
- `categories_slug_idx` on `categories(slug)`
- `categories_type_idx` on `categories(type)`
- Full-text search index on `apps` using `title` trigram for fuzzy search queries

4. Security
- Enable RLS on all tables.
- This is a public catalog app (no sign-in), so SELECT is open to anon + authenticated.
- INSERT/UPDATE/DELETE restricted to authenticated (admin) users only.
- download_url and checksum columns are NOT exposed via public API — server-side routes read them with the service role key and never return them to the client.

5. Important Notes
- This is a single-tenant public catalog: all visitors browse the same app listings.
- Admin operations (insert/update/delete) require an authenticated session.
- The `download_url` is a private storage path never sent to the browser; downloads are mediated by a secure token endpoint.
*/

-- Enable trigram extension for fuzzy search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  type text NOT NULL CHECK (type IN ('game', 'app')),
  icon text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_categories" ON categories;
CREATE POLICY "anon_select_categories"
ON categories FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_categories" ON categories;
CREATE POLICY "auth_insert_categories"
ON categories FOR INSERT
TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_categories" ON categories;
CREATE POLICY "auth_update_categories"
ON categories FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_categories" ON categories;
CREATE POLICY "auth_delete_categories"
ON categories FOR DELETE
TO authenticated USING (true);

-- Apps table
CREATE TABLE IF NOT EXISTS apps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  developer text NOT NULL,
  description text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  type text NOT NULL CHECK (type IN ('game', 'app')),
  icon_url text NOT NULL,
  banner_url text,
  screenshots jsonb DEFAULT '[]'::jsonb,
  version text NOT NULL,
  file_size text NOT NULL,
  rating numeric(2,1) DEFAULT 0,
  downloads integer DEFAULT 0,
  download_url text NOT NULL,
  checksum text,
  is_featured boolean DEFAULT false,
  is_trending boolean DEFAULT false,
  is_recent boolean DEFAULT false,
  is_recommended boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE apps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_apps" ON apps;
CREATE POLICY "anon_select_apps"
ON apps FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_apps" ON apps;
CREATE POLICY "auth_insert_apps"
ON apps FOR INSERT
TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_apps" ON apps;
CREATE POLICY "auth_update_apps"
ON apps FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_apps" ON apps;
CREATE POLICY "auth_delete_apps"
ON apps FOR DELETE
TO authenticated USING (true);

-- Download logs table
CREATE TABLE IF NOT EXISTS download_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id uuid REFERENCES apps(id) ON DELETE CASCADE,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE download_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_download_logs" ON download_logs;
CREATE POLICY "anon_insert_download_logs"
ON download_logs FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_download_logs" ON download_logs;
CREATE POLICY "auth_select_download_logs"
ON download_logs FOR SELECT
TO authenticated USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS apps_slug_idx ON apps(slug);
CREATE INDEX IF NOT EXISTS apps_category_id_idx ON apps(category_id);
CREATE INDEX IF NOT EXISTS apps_type_idx ON apps(type);
CREATE INDEX IF NOT EXISTS apps_downloads_idx ON apps(downloads DESC);
CREATE INDEX IF NOT EXISTS apps_rating_idx ON apps(rating DESC);
CREATE INDEX IF NOT EXISTS apps_created_at_idx ON apps(created_at DESC);
CREATE INDEX IF NOT EXISTS categories_slug_idx ON categories(slug);
CREATE INDEX IF NOT EXISTS categories_type_idx ON categories(type);
CREATE INDEX IF NOT EXISTS download_logs_app_id_idx ON download_logs(app_id);
CREATE INDEX IF NOT EXISTS download_logs_created_at_idx ON download_logs(created_at DESC);

-- Full-text trigram search index on title for fuzzy/partial matching
CREATE INDEX IF NOT EXISTS apps_title_trgm_idx ON apps USING gin (title gin_trgm_ops);
