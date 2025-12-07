-- Update the contacts table to include missing columns
-- This is an ALTER statement to add columns to existing table

ALTER TABLE api.contacts 
  ADD COLUMN IF NOT EXISTS company text,
  ADD COLUMN IF NOT EXISTS jurisdiction text,
  ADD COLUMN IF NOT EXISTS role text,
  ADD COLUMN IF NOT EXISTS consent boolean;

-- If you prefer to recreate the table from scratch, use this instead:
-- DROP TABLE IF EXISTS api.contacts;
-- CREATE TABLE api.contacts (
--   id uuid primary key default gen_random_uuid(),
--   email public.citext not null,
--   company text not null,
--   jurisdiction text not null,
--   role text,
--   message text,
--   consent boolean not null default false,
--   meta jsonb,
--   created_at timestamptz not null default now()
-- );
