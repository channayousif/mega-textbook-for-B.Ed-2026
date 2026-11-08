-- 0053_weekly_digest.sql - Feature 028 (weekly new-content email).
--
-- Owner ruling 2026-11-09: registered users receive a weekly bilingual email of new
-- content by default, with a one-click opt-out in every email and a profile toggle.
-- The weekly-digest edge function sends it (service role); this migration holds the
-- preference and a per-week run ledger whose primary key makes a second run in the
-- same ISO week a no-op, so nobody is emailed twice.

alter table public.profiles
  add column digest_opt_out boolean not null default false,
  add column digest_opt_out_at timestamptz;

comment on column public.profiles.digest_opt_out is
  'Feature 028: true when the account holder unsubscribed from the weekly new-content email. '
  'Set by set_digest_preference (profile toggle) or the digest-unsubscribe function (email link).';

-- The account holder's own preference only; never anyone else's row.
create function public.set_digest_preference(p_opt_out boolean)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare me uuid := public.current_profile_id();
begin
  if me is null then raise exception 'sign in required' using errcode = '42501'; end if;
  update public.profiles
    set digest_opt_out = coalesce(p_opt_out, false),
        digest_opt_out_at = case when coalesce(p_opt_out, false) then now() else null end
  where id = me and deleted_at is null;
end; $$;

revoke all on function public.set_digest_preference(boolean) from public, anon;
grant execute on function public.set_digest_preference(boolean) to authenticated;

create table public.digest_runs (
  iso_week text primary key check (iso_week ~ '^\d{4}-W\d{2}$'),
  status text not null default 'claimed' check (status in ('claimed','sent','skipped','failed')),
  items integer not null default 0,
  recipients integer not null default 0,
  sent integer not null default 0,
  failed integer not null default 0,
  error text,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

comment on table public.digest_runs is
  'Feature 028: one row per ISO week the weekly digest ran. Written only by the weekly-digest '
  'edge function (service role); admins can read it on the news page.';

alter table public.digest_runs enable row level security;
create policy digest_runs_admin_read on public.digest_runs for select to authenticated using (public.is_admin());
revoke all on public.digest_runs from anon, authenticated;
grant select on public.digest_runs to authenticated;
