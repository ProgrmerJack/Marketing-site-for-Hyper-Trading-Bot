-- Enable the citext extension for case-insensitive email matching
create extension if not exists citext;

-- Create the subscribers table
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email citext not null unique,
  created_at timestamptz not null default now()
);

-- Create the contacts table
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text,
  email citext not null,
  message text not null,
  meta jsonb,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security (RLS)
alter table public.subscribers enable row level security;
alter table public.contacts enable row level security;

-- Create policies to allow the service role to do everything
-- Note: By default, enabling RLS denies all access to public/anon users if no policies exist.
-- The service_role key bypasses RLS, so we don't strictly need policies for it, 
-- but ensuring no public access is the goal.

-- (Optional) If you want to allow public read access (e.g. for debugging), uncomment below:
-- create policy "Allow public read access" on public.subscribers for select using (true);
