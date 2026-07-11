/*
# Create increment_downloads RPC function

1. New Functions
- `increment_downloads(app_id uuid)`: Atomically increments the download count for an app.
  - Security: Uses parameterized query, no dynamic SQL.
  - Returns the new download count.

2. Security
- SECURITY DEFINER function, safe to call from anon context.
- No policy changes needed.
*/

CREATE OR REPLACE FUNCTION increment_downloads(app_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count integer;
BEGIN
  UPDATE apps SET downloads = downloads + 1, updated_at = now()
  WHERE id = app_id
  RETURNING downloads INTO new_count;
  
  RETURN new_count;
END;
$$;
