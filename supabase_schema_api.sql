-- Create the 'api' schema
create schema if not exists api;

-- Enable the citext extension (must be in public usually, but available to others)
create extension if not exists citext schema public;

-- Create the subscribers table in 'api' schema
create table if not exists api.subscribers (
  id uuid primary key default gen_random_uuid(),
  email public.citext not null unique,
  created_at timestamptz not null default now()
);

-- Create the contacts table in 'api' schema
create table if not exists api.contacts (
  id uuid primary key default gen_random_uuid(),
  name text,
  email public.citext not null,
  message text not null,
  meta jsonb,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security (RLS)
alter table api.subscribers enable row level security;
alter table api.contacts enable row level security;

-- Grant usage on schema to anon and authenticated roles (if needed for client-side access, 
-- though we are using service_role for writes, browser might need read access if you add that later)
grant usage on schema api to anon, authenticated, service_role;
grant all on all tables in schema api to service_role;
-- grant select on all tables in schema api to anon; -- Uncomment if you want public read access
