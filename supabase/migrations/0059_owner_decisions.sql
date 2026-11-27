-- Owner Decisions page (Feature 035): what waits on the owner, and the owner's decisions on it.
--
-- owner_queue is a snapshot the crew pushes every tick (scripts/crew/decisions-sync.mjs): teaser
-- scripts, private Shorts, Study Studio units, social posts, crew C-### questions and a G3 count.
-- owner_decisions rows are the owner's INSTRUCTIONS from /app/admin/decisions. The crew applies a
-- queued row through its own command path (`crew.mjs cmd ... --via web`), with every check that
-- path already makes, and marks it applied or refused. No gate, build or status report reads
-- these tables; the crew's state files and Git stay the record. Same pattern as g3_signoffs (0050).

create table public.owner_queue (
  item_key text primary key check (item_key ~ '^[a-z0-9_-]+(:[A-Za-z0-9#_-]+)?$'),
  kind text not null check (kind in ('teaser_script','short','studio_unit','studio_progress','social_post','crew_question','g3')),
  title text not null,
  summary text,
  details jsonb not null default '{}'::jsonb check (jsonb_typeof(details) = 'object'),
  links jsonb not null default '[]'::jsonb check (jsonb_typeof(links) = 'array'),
  actions text[] not null default '{}',
  digest text not null,
  waiting_since timestamptz,
  first_seen timestamptz not null default now(),
  snapshot_at timestamptz not null
);

create table public.owner_decisions (
  id uuid primary key default gen_random_uuid(),
  item_key text not null,
  kind text not null,
  action text not null check (action in ('approve','reject','publish','remake','post','answer')),
  note text,
  -- { "except": [item keys] } for approve on a Study Studio unit, { "key": item key } for remake,
  -- { "answer": option } for a crew question.
  payload jsonb not null default '{}'::jsonb check (jsonb_typeof(payload) = 'object'),
  digest text not null,
  title text,
  decided_by uuid references public.profiles(id) on delete set null,
  decided_at timestamptz not null default now(),
  status text not null default 'queued' check (status in ('queued','applied','refused','withdrawn')),
  command text,
  result text,
  synced_at timestamptz
);

-- One decision in flight per item. Recording a new one supersedes the old (record_owner_decision).
create unique index owner_decision_one_queued on public.owner_decisions(item_key) where status = 'queued';
create index owner_decision_recent on public.owner_decisions(decided_at desc);

alter table public.owner_queue enable row level security;
alter table public.owner_decisions enable row level security;
create policy owner_queue_read on public.owner_queue for select to authenticated using (public.is_admin());
create policy owner_decision_read on public.owner_decisions for select to authenticated using (public.is_admin());
-- No client writes: every write goes through the RPCs below. Supabase's default privileges grant
-- ALL on new tables to anon/authenticated, so revoke before granting.
revoke all on public.owner_queue from anon, authenticated;
revoke all on public.owner_decisions from anon, authenticated;
grant select on public.owner_queue to authenticated;
grant select on public.owner_decisions to authenticated;

create function public.record_owner_decision(p_item_key text, p_action text, p_note text default null, p_payload jsonb default '{}'::jsonb)
returns uuid language plpgsql security definer set search_path = public, pg_temp as $$
declare q public.owner_queue; new_id uuid; actor uuid := public.current_profile_id(); n text := nullif(trim(coalesce(p_note,'')),'');
begin
  if not public.is_admin() then raise exception 'admin required' using errcode = '42501'; end if;
  select * into q from public.owner_queue where item_key = p_item_key;
  if not found then raise exception 'this item is no longer waiting on you' using errcode = '22023'; end if;
  if not (p_action = any(q.actions)) then raise exception '% is not offered for this item', p_action using errcode = '22023'; end if;
  if p_action in ('reject','remake') and length(coalesce(n,'')) < 3 then
    raise exception 'say what must change' using errcode = '22023';
  end if;
  if n is not null and length(n) > 1000 then raise exception 'note is longer than 1000 characters' using errcode = '22023'; end if;
  if jsonb_typeof(coalesce(p_payload,'{}'::jsonb)) <> 'object' then raise exception 'payload must be an object' using errcode = '22023'; end if;
  update public.owner_decisions set status = 'withdrawn', result = 'superseded by a newer decision'
    where item_key = p_item_key and status = 'queued';
  insert into public.owner_decisions(item_key, kind, action, note, payload, digest, title, decided_by)
    values (p_item_key, q.kind, p_action, n, coalesce(p_payload,'{}'::jsonb), q.digest, q.title, actor)
    returning id into new_id;
  insert into public.admin_action_history(actor_id,action,target_type,target_id,detail)
    values(actor,'owner_decision_' || p_action,'owner_decision',new_id,jsonb_build_object('item_key',p_item_key));
  return new_id;
end; $$;

create function public.withdraw_owner_decision(p_id uuid)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare actor uuid := public.current_profile_id();
begin
  if not public.is_admin() then raise exception 'admin required' using errcode = '42501'; end if;
  update public.owner_decisions set status = 'withdrawn', result = 'withdrawn by owner'
    where id = p_id and status = 'queued';
  if not found then raise exception 'only a queued decision can be withdrawn' using errcode = '22023'; end if;
  insert into public.admin_action_history(actor_id,action,target_type,target_id) values(actor,'owner_decision_withdrawn','owner_decision',p_id);
end; $$;

-- Crew only. Replaces the snapshot: items no longer listed are removed, items still listed keep
-- first_seen. p_items: jsonb array of { item_key, kind, title, summary, details, links, actions,
-- digest, waiting_since }.
create function public.replace_owner_queue(p_items jsonb, p_snapshot_at timestamptz)
returns integer language plpgsql security definer set search_path = public, pg_temp as $$
declare n integer;
begin
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) > 500 then
    raise exception 'items must be an array of at most 500' using errcode = '22023';
  end if;
  delete from public.owner_queue
    where item_key not in (select i->>'item_key' from jsonb_array_elements(p_items) i);
  insert into public.owner_queue(item_key, kind, title, summary, details, links, actions, digest, waiting_since, snapshot_at)
  select i->>'item_key', i->>'kind', i->>'title', i->>'summary', coalesce(i->'details','{}'::jsonb),
         coalesce(i->'links','[]'::jsonb),
         coalesce(array(select jsonb_array_elements_text(coalesce(i->'actions','[]'::jsonb))), '{}'),
         i->>'digest', nullif(i->>'waiting_since','')::timestamptz, p_snapshot_at
    from jsonb_array_elements(p_items) i
  on conflict (item_key) do update set kind = excluded.kind, title = excluded.title, summary = excluded.summary,
    details = excluded.details, links = excluded.links, actions = excluded.actions, digest = excluded.digest,
    waiting_since = excluded.waiting_since, snapshot_at = excluded.snapshot_at;
  get diagnostics n = row_count;
  return n;
end; $$;

-- Crew only. Moves a queued decision to applied (the crew command ran) or refused (it changed since
-- the owner decided, or the command refused it), with the command and the crew's reply.
create function public.mark_owner_decision(p_id uuid, p_status text, p_result text default null, p_command text default null)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if p_status not in ('applied','refused') then raise exception 'invalid status' using errcode = '22023'; end if;
  update public.owner_decisions set status = p_status, result = left(p_result, 2000), command = p_command, synced_at = now()
    where id = p_id and status = 'queued';
  if not found then raise exception 'decision is not queued' using errcode = '22023'; end if;
end; $$;

revoke all on function public.record_owner_decision(text,text,text,jsonb) from public, anon;
revoke all on function public.withdraw_owner_decision(uuid) from public, anon;
revoke all on function public.replace_owner_queue(jsonb,timestamptz) from public, anon, authenticated;
revoke all on function public.mark_owner_decision(uuid,text,text,text) from public, anon, authenticated;
grant execute on function public.record_owner_decision(text,text,text,jsonb) to authenticated;
grant execute on function public.withdraw_owner_decision(uuid) to authenticated;
grant execute on function public.replace_owner_queue(jsonb,timestamptz) to service_role;
grant execute on function public.mark_owner_decision(uuid,text,text,text) to service_role;
