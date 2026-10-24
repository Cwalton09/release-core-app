-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Safe to run more than once. Adds the columns for members' standing session time
-- (dashboard "Your session time" card) and the morning reminder emails.

alter table public.profiles add column if not exists session_days text;          -- e.g. 'TU,TH'
alter table public.profiles add column if not exists session_time text;          -- e.g. '19:00'
alter table public.profiles add column if not exists session_tz text;            -- e.g. 'America/Chicago'
alter table public.profiles add column if not exists session_reminders boolean default true;
alter table public.profiles add column if not exists session_reminder_sent_on date;
alter table public.profiles add column if not exists last_active_at timestamptz;  -- last guided deep session or dream
