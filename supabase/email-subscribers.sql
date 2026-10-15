-- Free-guide and quiz sign-ups, and how far each person is through the
-- welcome series and their quiz follow-up emails (sent through Resend).
-- Only the server (service role) reads or writes this table.
create table if not exists public.email_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  source text,
  quiz_pattern text,
  quiz_started_at timestamptz,
  created_at timestamptz not null default now(),
  welcome_sent int not null default 0,
  quiz_sent int not null default 0,
  unsubscribed_at timestamptz,
  last_error text
);

alter table public.email_subscribers enable row level security;
