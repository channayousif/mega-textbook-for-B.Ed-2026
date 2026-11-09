-- 0052_news_items.sql - Feature 028 (news and announcements ticker).
--
-- Admin-written news, offers and notices for the scrolling ticker on the landing page
-- and the dashboards. Automatic content events (new units, Urdu translations, new
-- courses, certified reviews) are NOT stored here: prebuild derives them from git
-- history into static/news-feed.json, so this table holds only what a person wrote.
--
-- This is the first table anonymous visitors can read. The public policy therefore
-- must not call is_admin(), which is granted to `authenticated` only (0004:74-77);
-- an anonymous select would fail with a permission error instead of returning rows.
-- Admin visibility of drafts, scheduled and expired items is a separate policy.

create table public.news_items (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'news' check (kind in ('news','offer','update','event','alert')),
  title_en text not null check (length(trim(title_en)) between 3 and 160),
  title_ur text check (title_ur is null or length(trim(title_ur)) between 3 and 160),
  -- Site-relative paths or https only: no javascript:, data: or plain http links.
  link_url text check (link_url is null or link_url ~ '^(/[^/\s][^\s]*|/|https://[^\s]+)$'),
  icon text not null default 'megaphone' check (icon in (
    'megaphone','gift','sparkle','info','warning','calendar','success','reading','translated','award','clock','link')),
  pinned boolean not null default false,
  published boolean not null default false,
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz,
  constraint news_items_window check (ends_at is null or ends_at > starts_at)
);

comment on table public.news_items is
  'Feature 028: admin-written ticker items. Public read of live rows only; every write goes '
  'through upsert_news_item/archive_news_item, which are admin-checked and audited.';

create index news_items_live_idx on public.news_items (starts_at desc) where published and archived_at is null;

alter table public.news_items enable row level security;

create policy news_items_public_read on public.news_items for select to anon, authenticated
  using (published and archived_at is null and starts_at <= now() and (ends_at is null or ends_at > now()));
create policy news_items_admin_read on public.news_items for select to authenticated
  using (public.is_admin());

-- Supabase's default privileges grant ALL on new tables to anon/authenticated, so revoke first.
revoke all on public.news_items from anon, authenticated;
grant select on public.news_items to anon, authenticated;

create function public.upsert_news_item(
  p_id uuid,
  p_kind text,
  p_title_en text,
  p_title_ur text,
  p_link_url text,
  p_icon text,
  p_pinned boolean,
  p_published boolean,
  p_starts_at timestamptz,
  p_ends_at timestamptz
) returns public.news_items
language plpgsql security definer set search_path = public, pg_temp as $$
declare actor uuid := public.current_profile_id(); row public.news_items;
begin
  if not public.is_admin() then raise exception 'admin required' using errcode = '42501'; end if;
  if p_id is null then
    insert into public.news_items(kind, title_en, title_ur, link_url, icon, pinned, published, starts_at, ends_at, created_by)
    values (p_kind, trim(p_title_en), nullif(trim(coalesce(p_title_ur,'')),''), nullif(trim(coalesce(p_link_url,'')),''),
      p_icon, coalesce(p_pinned,false), coalesce(p_published,false), coalesce(p_starts_at, now()), p_ends_at, actor)
    returning * into row;
  else
    update public.news_items set
      kind = p_kind, title_en = trim(p_title_en), title_ur = nullif(trim(coalesce(p_title_ur,'')),''),
      link_url = nullif(trim(coalesce(p_link_url,'')),''), icon = p_icon,
      pinned = coalesce(p_pinned,false), published = coalesce(p_published,false),
      starts_at = coalesce(p_starts_at, starts_at), ends_at = p_ends_at, updated_at = now()
    where id = p_id and archived_at is null
    returning * into row;
    if not found then raise exception 'news item not found or archived' using errcode = '22023'; end if;
  end if;
  insert into public.admin_action_history(actor_id, action, target_type, target_id, detail)
  values (actor, case when p_id is null then 'news_item_created' else 'news_item_updated' end, 'news_item', row.id,
    jsonb_build_object('kind', row.kind, 'published', row.published, 'title_en', row.title_en));
  return row;
end; $$;

create function public.archive_news_item(p_id uuid)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare actor uuid := public.current_profile_id();
begin
  if not public.is_admin() then raise exception 'admin required' using errcode = '42501'; end if;
  update public.news_items set archived_at = now(), updated_at = now() where id = p_id and archived_at is null;
  if not found then raise exception 'news item not found or already archived' using errcode = '22023'; end if;
  insert into public.admin_action_history(actor_id, action, target_type, target_id)
  values (actor, 'news_item_archived', 'news_item', p_id);
end; $$;

revoke all on function public.upsert_news_item(uuid,text,text,text,text,text,boolean,boolean,timestamptz,timestamptz) from public, anon;
revoke all on function public.archive_news_item(uuid) from public, anon;
grant execute on function public.upsert_news_item(uuid,text,text,text,text,text,boolean,boolean,timestamptz,timestamptz) to authenticated;
grant execute on function public.archive_news_item(uuid) to authenticated;
