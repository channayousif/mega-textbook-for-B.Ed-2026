-- Content Pack v2 (Feature 038, ADR-0040): the owner's stage tracker for one teaching pack per topic.
--
-- content_packs holds one row per topic with the status of each of the twelve pack stages, the
-- published links and the Flow watermark-toggle status. content_pack_events is the append-only log of
-- every change. The admin page /app/admin/content-packs reads both and writes only through the RPCs
-- below. The JSON media ledgers (scripts/media/ledger.mjs) stay the job record for producers and
-- uploads; no gate, build or status report reads these tables. Same pattern as owner_decisions (0059).
--
-- The content-pack-uploads bucket holds the owner's working files for a pack (screenshots, NotebookLM
-- exports, decks, subtitle files), path `{pack_id}/{stage}/{filename}`. Video is deliberately not
-- accepted: the host's block storage is at the Always Free cap, so long-form and Short renders stay in
-- $MEDIA_ROOT and on YouTube, never in Supabase storage.

create table public.content_packs (
  id uuid primary key default gen_random_uuid(),
  course text not null check (course ~ '^[a-z]{2,6}-[0-9]{3}$'),
  unit integer not null check (unit >= 0),
  topic integer not null check (topic >= 1),
  track text not null check (track in ('bed','licence')),
  title text not null check (length(title) between 3 and 200),
  primary_locale text not null default 'en' check (primary_locale in ('en','ur')),
  -- { "<stage>": { "status": "todo|in-progress|waiting-owner|done|skipped", "at": ts, "by": uuid, "note": text } }
  stages jsonb not null default '{}'::jsonb check (jsonb_typeof(stages) = 'object'),
  -- { "longform": url, "shorts": [url], "deck": url, "mindmap": url, "infographic": url, "playlist": id }
  links jsonb not null default '{}'::jsonb check (jsonb_typeof(links) = 'object'),
  watermark_toggle text check (watermark_toggle in ('off-official','not-available','regenerated')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (course, unit, topic)
);

create table public.content_pack_events (
  id bigint generated always as identity primary key,
  pack_id uuid not null references public.content_packs(id) on delete cascade,
  stage text,
  action text not null check (action in ('create','stage','link','watermark')),
  detail jsonb not null default '{}'::jsonb check (jsonb_typeof(detail) = 'object'),
  actor uuid references public.profiles(id) on delete set null,
  at timestamptz not null default now()
);

create index content_pack_events_pack on public.content_pack_events(pack_id, at desc);

create trigger content_packs_touch_updated_at
  before update on public.content_packs
  for each row execute function public.touch_updated_at();

alter table public.content_packs enable row level security;
alter table public.content_pack_events enable row level security;
create policy content_packs_read on public.content_packs for select to authenticated using (public.is_admin());
create policy content_pack_events_read on public.content_pack_events for select to authenticated using (public.is_admin());
-- No client writes: every write goes through the RPCs below. Supabase's default privileges grant
-- ALL on new tables to anon/authenticated, so revoke before granting.
revoke all on public.content_packs from anon, authenticated;
revoke all on public.content_pack_events from anon, authenticated;
grant select on public.content_packs to authenticated;
grant select on public.content_pack_events to authenticated;

-- The twelve stage keys, in order (specs/038-content-pack-v2/PLAN-v2.md section 5).
create function public.content_pack_stage_keys()
returns text[] language sql immutable as $$
  select array['intake','angle','script','notebooklm','flow','longform','shorts','static','metadata','qa','publish','learn']
$$;

create function public.create_content_pack(p_course text, p_unit integer, p_topic integer, p_track text, p_title text)
returns uuid language plpgsql security definer set search_path = public, pg_temp as $$
declare new_id uuid; actor uuid := public.current_profile_id();
begin
  if not public.is_admin() then raise exception 'admin required' using errcode = '42501'; end if;
  insert into public.content_packs(course, unit, topic, track, title, created_by)
    values (lower(trim(p_course)), p_unit, p_topic, p_track, trim(p_title), actor)
    returning id into new_id;
  insert into public.content_pack_events(pack_id, action, detail, actor)
    values (new_id, 'create', jsonb_build_object('course', lower(trim(p_course)), 'unit', p_unit, 'topic', p_topic), actor);
  insert into public.admin_action_history(actor_id,action,target_type,target_id)
    values (actor, 'content_pack_created', 'content_pack', new_id);
  return new_id;
exception when unique_violation then
  raise exception 'a pack already exists for this topic' using errcode = '23505';
end; $$;

create function public.set_content_pack_stage(p_pack uuid, p_stage text, p_status text, p_note text default null)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare actor uuid := public.current_profile_id(); n text := nullif(trim(coalesce(p_note,'')),'');
begin
  if not public.is_admin() then raise exception 'admin required' using errcode = '42501'; end if;
  if not (p_stage = any(public.content_pack_stage_keys())) then raise exception 'unknown stage %', p_stage using errcode = '22023'; end if;
  if p_status not in ('todo','in-progress','waiting-owner','done','skipped') then
    raise exception 'unknown status %', p_status using errcode = '22023';
  end if;
  if p_status = 'skipped' and length(coalesce(n,'')) < 3 then raise exception 'say why the stage is skipped' using errcode = '22023'; end if;
  if n is not null and length(n) > 2000 then raise exception 'note is longer than 2000 characters' using errcode = '22023'; end if;
  update public.content_packs
    set stages = stages || jsonb_build_object(p_stage, jsonb_strip_nulls(jsonb_build_object('status', p_status, 'at', now(), 'by', actor, 'note', n)))
    where id = p_pack;
  if not found then raise exception 'no such pack' using errcode = '22023'; end if;
  insert into public.content_pack_events(pack_id, stage, action, detail, actor)
    values (p_pack, p_stage, 'stage', jsonb_strip_nulls(jsonb_build_object('status', p_status, 'note', n)), actor);
end; $$;

create function public.set_content_pack_link(p_pack uuid, p_key text, p_value jsonb)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare actor uuid := public.current_profile_id();
begin
  if not public.is_admin() then raise exception 'admin required' using errcode = '42501'; end if;
  if p_key not in ('longform','shorts','deck','mindmap','infographic','playlist') then
    raise exception 'unknown link %', p_key using errcode = '22023';
  end if;
  if p_value is null or jsonb_typeof(p_value) = 'null' then
    update public.content_packs set links = links - p_key where id = p_pack;
  elsif p_key = 'shorts' then
    if jsonb_typeof(p_value) <> 'array' or jsonb_array_length(p_value) > 20
       or exists (select 1 from jsonb_array_elements(p_value) v where jsonb_typeof(v) <> 'string' or v #>> '{}' !~ '^https://') then
      raise exception 'shorts must be an array of at most 20 https links' using errcode = '22023';
    end if;
    update public.content_packs set links = links || jsonb_build_object(p_key, p_value) where id = p_pack;
  elsif p_key = 'playlist' then
    if jsonb_typeof(p_value) <> 'string' or p_value #>> '{}' !~ '^PL[A-Za-z0-9_-]{8,}$' then
      raise exception 'playlist must be a YouTube playlist id' using errcode = '22023';
    end if;
    update public.content_packs set links = links || jsonb_build_object(p_key, p_value) where id = p_pack;
  else
    if jsonb_typeof(p_value) <> 'string' or p_value #>> '{}' !~ '^https://' then
      raise exception '% must be an https link', p_key using errcode = '22023';
    end if;
    update public.content_packs set links = links || jsonb_build_object(p_key, p_value) where id = p_pack;
  end if;
  if not found then raise exception 'no such pack' using errcode = '22023'; end if;
  insert into public.content_pack_events(pack_id, action, detail, actor)
    values (p_pack, 'link', jsonb_build_object('key', p_key, 'value', coalesce(p_value, 'null'::jsonb)), actor);
end; $$;

create function public.set_content_pack_watermark(p_pack uuid, p_value text)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare actor uuid := public.current_profile_id();
begin
  if not public.is_admin() then raise exception 'admin required' using errcode = '42501'; end if;
  if p_value not in ('off-official','not-available','regenerated') then
    raise exception 'unknown watermark status %', p_value using errcode = '22023';
  end if;
  update public.content_packs set watermark_toggle = p_value where id = p_pack;
  if not found then raise exception 'no such pack' using errcode = '22023'; end if;
  insert into public.content_pack_events(pack_id, stage, action, detail, actor)
    values (p_pack, 'flow', 'watermark', jsonb_build_object('value', p_value), actor);
end; $$;

revoke all on function public.create_content_pack(text,integer,integer,text,text) from public, anon;
revoke all on function public.set_content_pack_stage(uuid,text,text,text) from public, anon;
revoke all on function public.set_content_pack_link(uuid,text,jsonb) from public, anon;
revoke all on function public.set_content_pack_watermark(uuid,text) from public, anon;
grant execute on function public.create_content_pack(text,integer,integer,text,text) to authenticated;
grant execute on function public.set_content_pack_stage(uuid,text,text,text) to authenticated;
grant execute on function public.set_content_pack_link(uuid,text,jsonb) to authenticated;
grant execute on function public.set_content_pack_watermark(uuid,text) to authenticated;

-- Owner working files. 50 MB per file, no video (see the header).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'content-pack-uploads',
  'content-pack-uploads',
  false,
  52428800,
  array[
    'image/png', 'image/jpeg', 'image/webp', 'image/svg+xml',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain', 'text/vtt', 'application/x-subrip', 'text/csv', 'text/markdown', 'application/json'
  ]
)
on conflict (id) do nothing;

create policy content_pack_uploads_select on storage.objects for select to authenticated
  using (bucket_id = 'content-pack-uploads' and public.is_admin());
create policy content_pack_uploads_insert on storage.objects for insert to authenticated
  with check (
    bucket_id = 'content-pack-uploads' and public.is_admin()
    and exists (select 1 from public.content_packs p where p.id::text = split_part(name, '/', 1))
    and split_part(name, '/', 2) = any(public.content_pack_stage_keys())
  );
create policy content_pack_uploads_delete on storage.objects for delete to authenticated
  using (bucket_id = 'content-pack-uploads' and public.is_admin());
