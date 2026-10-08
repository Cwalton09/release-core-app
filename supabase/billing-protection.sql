-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Safe to run more than once. Does not change anyone's current paid status.

-- 1. Billing columns the Stripe webhook writes to (skipped if they already exist).
alter table public.profiles add column if not exists paid boolean default false;
alter table public.profiles add column if not exists subscription_status text;
alter table public.profiles add column if not exists stripe_customer_id text;
alter table public.profiles add column if not exists stripe_subscription_id text;

create index if not exists profiles_stripe_customer_id_idx
  on public.profiles (stripe_customer_id);

-- 2. Only the server (Stripe webhook) may change billing fields. Anything sent
--    from the browser keeps the existing values, and new rows start unpaid.
create or replace function public.protect_billing_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(auth.role(), '') <> 'service_role' then
    if tg_op = 'INSERT' then
      new.paid := false;
      new.subscription_status := null;
      new.stripe_customer_id := null;
      new.stripe_subscription_id := null;
    else
      new.paid := old.paid;
      new.subscription_status := old.subscription_status;
      new.stripe_customer_id := old.stripe_customer_id;
      new.stripe_subscription_id := old.stripe_subscription_id;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_billing_fields on public.profiles;
create trigger protect_billing_fields
  before insert or update on public.profiles
  for each row execute function public.protect_billing_fields();

-- 3. Lets the webhook find a member by the email they paid with.
--    Only the server's service role can call it.
create or replace function public.get_user_id_by_email(lookup_email text)
returns uuid
language sql
security definer
set search_path = public, auth
as $$
  select id from auth.users where lower(email) = lower(lookup_email) limit 1;
$$;

revoke all on function public.get_user_id_by_email(text) from public, anon, authenticated;
grant execute on function public.get_user_id_by_email(text) to service_role;
