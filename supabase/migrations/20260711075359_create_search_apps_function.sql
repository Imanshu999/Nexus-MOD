/*
# Create search_apps RPC function

1. New Functions
- `search_apps(search_term text, result_limit int)`: Returns app search results using trigram similarity for fuzzy/partial matching.
  - Uses `similarity()` from pg_trgm to rank results by closeness.
  - Falls back to ILIKE for partial matches when similarity is low.
  - Returns: slug, title, icon_url, type, developer, rating, file_size
  - Security: Definer function with fixed query, no dynamic SQL — immune to injection.

2. Security
- The function is `SECURITY DEFINER` so it can run with elevated privileges for the trigram index.
- Input is used only as a parameter to `similarity()` and `ILIKE` — never in dynamic SQL.
- No policy changes needed.

3. Important Notes
- Uses pg_trgm's similarity() for fuzzy matching (handles typos).
- Combines similarity ranking with ILIKE for partial substring matches.
- Ordered by similarity score descending.
*/

CREATE OR REPLACE FUNCTION search_apps(search_term text, result_limit int DEFAULT 10)
RETURNS TABLE (
  slug text,
  title text,
  icon_url text,
  type text,
  developer text,
  rating numeric,
  file_size text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    a.slug,
    a.title,
    a.icon_url,
    a.type,
    a.developer,
    a.rating,
    a.file_size
  FROM apps a
  WHERE
    a.title ILIKE '%' || search_term || '%'
    OR similarity(a.title, search_term) > 0.1
  ORDER BY
    similarity(a.title, search_term) DESC,
    a.downloads DESC
  LIMIT result_limit;
END;
$$;
