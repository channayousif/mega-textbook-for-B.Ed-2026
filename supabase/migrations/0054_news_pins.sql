-- 0054_news_pins.sql - Feature 028 follow-up (owner, 2026-11-17): admins pin ticker items.
--
-- Automatic content events (new units, Urdu translations, revisions, new figures, reviews) live in
-- static/news-feed.json, derived from git at build time (ADR-0034), so they have no row to flag.
-- A pin is therefore keyed by the event's stable id ('unit:EFPG-401:4', 'figures:GQUR-301:5', ...).
-- Admin-written news_items keep their own `pinned` column; this table is for automatic events.
--
-- Anonymous visitors read active pins (the ticker runs on the landing page). As in 0052 the public
-- policy must not call is_admin(), which `anon` cannot execute; admins have a separate policy.

create table public.news_pins (
  event_id text primary key check (event_id ~ '^(course|unit|urdu|review|updated|figures|provisional):[A-Z0-9:-]+$'),
  pinned_until timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

comment on table public.news_pins is
  'Feature 028: admin pins on automatic ticker events (static/news-feed.json ids). Public read of '
  'active pins only; writes only through set_news_pin, which is admin-checked and audited.';

alter table public.news_pins enable row level security;

create policy news_pins_public_read on public.news_pins for select to anon, authenticated
  using (pinned_until is null or pinned_until > now());
create policy news_pins_admin_read on public.news_pins for select to authenticated
  using (public.is_admin());

revoke all on public.news_pins from anon, authenticated;
grant select on public.news_pins to anon, authenticated;

create function public.set_news_pin(p_event_id text, p_pinned boolean, p_until timestamptz default null)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare actor uuid := public.current_profile_id();
begin
  if not public.is_admin() then raise exception 'admin required' using errcode = '42501'; end if;
  if p_until is not null and p_until <= now() then raise exception 'pinned_until must be in the future' using errcode = '22023'; end if;
  if coalesce(p_pinned, false) then
    insert into public.news_pins(event_id, pinned_until, created_by) values (p_event_id, p_until, actor)
    on conflict (event_id) do update set pinned_until = excluded.pinned_until, created_by = excluded.created_by, created_at = now();
  else
    delete from public.news_pins where event_id = p_event_id;
  end if;
  insert into public.admin_action_history(actor_id, action, target_type, target_id, detail)
  values (actor, case when coalesce(p_pinned, false) then 'news_event_pinned' else 'news_event_unpinned' end, 'news_event', null,
    jsonb_build_object('event_id', p_event_id, 'pinned_until', p_until));
end; $$;

revoke all on function public.set_news_pin(text, boolean, timestamptz) from public, anon;
grant execute on function public.set_news_pin(text, boolean, timestamptz) to authenticated;
