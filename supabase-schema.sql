-- Run this once in Supabase SQL Editor. Keep service_role key server-side only.
create table if not exists public.mission_saves (
  session_id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

-- Do not add a public anon policy. The Vercel Function accesses this table
-- using SUPABASE_SERVICE_ROLE_KEY, which must never be exposed to browser code.
