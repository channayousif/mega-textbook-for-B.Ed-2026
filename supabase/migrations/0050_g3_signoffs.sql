-- G3 sign-off intent ledger (ADR-0032).
--
-- A row is the owner's INSTRUCTION to sign a unit's G3, never a gate outcome:
-- no gate, build or status report reads this table. The crew's sync step
-- (scripts/crew/signoff-sync.mjs) turns queued rows into the Spec 017
-- certification JSON plus tracker row, in one PR the owner merges. Git stays
-- the record (Art. V.1).

create table public.g3_signoffs (
  id uuid primary key default gen_random_uuid(),
  course_code text not null check (course_code ~ '^[A-Z][A-Z0-9]*-[0-9]{3}$'),
  unit_no integer not null check (unit_no > 0),
  decision text not null check (decision in ('certify','revise','escalate')),
  -- { "<criterion id>": { "status": "pass|fail|unverified", "evidence": "..." } } for the 7 G3 criteria
  criteria jsonb not null check (jsonb_typeof(criteria) = 'object'),
  -- [ { "severity": "blocking|uncertain|advisory", "message": "...", "resolved": bool } ]
  findings jsonb not null default '[]'::jsonb check (jsonb_typeof(findings) = 'array'),
  note text,
  reviewer_initials text not null check (reviewer_initials ~ '^[A-Z]{1,5}$'),
  -- "I reviewed this unit myself." Required on every row, whatever the decision.
  attested boolean not null check (attested),
  -- "I inspected the rendered pages." Recorded as the render-review command; certify requires it.
  rendered_inspected boolean not null default false,
  inputs_digest text not null check (inputs_digest ~ '^[0-9a-f]{64}$'),
  desk_commit text not null check (desk_commit ~ '^[0-9a-f]{7,40}$'),
  agent_report text,
  decided_by uuid references public.profiles(id) on delete set null,
  decided_at timestamptz not null default now(),
  sync_status text not null default 'queued' check (sync_status in ('queued','synced','stale','failed','withdrawn')),
  sync_note text,
  pr_url text check (pr_url is null or pr_url ~ '^https://github\.com/'),
  synced_at timestamptz
);

-- One instruction in flight per unit. Recording a new one supersedes the old (see record_g3_signoff).
create unique index g3_signoff_one_queued on public.g3_signoffs(course_code, unit_no) where sync_status = 'queued';
create index g3_signoff_unit on public.g3_signoffs(course_code, unit_no, decided_at desc);

create function public.validate_g3_signoff()
returns trigger language plpgsql set search_path = public, pg_temp as $$
declare
  ids constant text[] := array['authority','sources','coverage','assessment','accessibility','readability','pedagogy'];
begin
  -- Mirrors scripts/lib/review-criteria.mjs CRITERIA.G3; the certification builder refuses any other set.
  if (select count(*) from jsonb_object_keys(new.criteria)) <> 7
     or exists(select 1 from jsonb_object_keys(new.criteria) k where k <> all(ids)) then
    raise exception 'criteria must be exactly the seven G3 criteria' using errcode = '22023';
  end if;
  if exists(select 1 from jsonb_each(new.criteria) c
            where jsonb_typeof(c.value) <> 'object'
               or coalesce(c.value->>'status','') not in ('pass','fail','unverified')) then
    raise exception 'invalid criterion result' using errcode = '22023';
  end if;
  if exists(select 1 from jsonb_array_elements(new.findings) f
            where coalesce(f->>'severity','') not in ('blocking','uncertain','advisory')
               or length(trim(coalesce(f->>'message',''))) = 0
               or jsonb_typeof(f->'resolved') <> 'boolean') then
    raise exception 'invalid finding' using errcode = '22023';
  end if;
  -- The pass invariant, as in buildCertification (src/lib/reviewQueue.ts) and review-evidence.mjs.
  if new.decision = 'certify' then
    if exists(select 1 from jsonb_each(new.criteria) c where c.value->>'status' <> 'pass') then
      raise exception 'certify requires every criterion to pass' using errcode = '22023';
    end if;
    if exists(select 1 from jsonb_array_elements(new.findings) f
              where f->>'severity' <> 'advisory' and not (f->>'resolved')::boolean) then
      raise exception 'certify has an unresolved blocking or uncertain finding' using errcode = '22023';
    end if;
    if not new.rendered_inspected then
      raise exception 'certify requires inspecting the rendered pages' using errcode = '22023';
    end if;
  elsif length(trim(coalesce(new.note,''))) < 5 then
    raise exception 'revise and escalate need a note' using errcode = '22023';
  end if;
  return new;
end; $$;
create trigger g3_signoff_validate before insert on public.g3_signoffs
  for each row execute function public.validate_g3_signoff();

alter table public.g3_signoffs enable row level security;
create policy g3_signoff_read on public.g3_signoffs for select to authenticated using (public.is_admin());
-- No client INSERT/UPDATE/DELETE grants: every write goes through the RPCs below. Supabase's
-- default privileges grant ALL on new tables to anon/authenticated, so revoke before granting.
revoke all on public.g3_signoffs from anon, authenticated;
grant select on public.g3_signoffs to authenticated;

-- p_items: jsonb array of { course_code, unit_no, decision, criteria, findings, note,
-- reviewer_initials, attested, rendered_inspected, inputs_digest, desk_commit, agent_report }.
-- All-or-nothing: one bad item rejects the batch. A new instruction supersedes a queued one.
create function public.record_g3_signoff(p_items jsonb)
returns uuid[] language plpgsql security definer set search_path = public, pg_temp as $$
declare item jsonb; ids uuid[] := '{}'; new_id uuid; old_id uuid; actor uuid := public.current_profile_id();
begin
  if not public.is_admin() then raise exception 'admin required' using errcode = '42501'; end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 or jsonb_array_length(p_items) > 200 then
    raise exception 'items must be a non-empty array of at most 200' using errcode = '22023';
  end if;
  for item in select * from jsonb_array_elements(p_items) loop
    update public.g3_signoffs set sync_status = 'withdrawn', sync_note = 'superseded by a newer decision'
      where course_code = item->>'course_code' and unit_no = (item->>'unit_no')::int and sync_status = 'queued'
      returning id into old_id;
    insert into public.g3_signoffs(course_code, unit_no, decision, criteria, findings, note, reviewer_initials,
      attested, rendered_inspected, inputs_digest, desk_commit, agent_report, decided_by)
    values (item->>'course_code', (item->>'unit_no')::int, item->>'decision', item->'criteria',
      coalesce(item->'findings','[]'::jsonb), nullif(trim(coalesce(item->>'note','')),''), item->>'reviewer_initials',
      coalesce((item->>'attested')::boolean,false), coalesce((item->>'rendered_inspected')::boolean,false),
      item->>'inputs_digest', item->>'desk_commit', item->>'agent_report', actor)
    returning id into new_id;
    ids := ids || new_id;
    insert into public.admin_action_history(actor_id,action,target_type,target_id,detail)
    values(actor,'g3_signoff_' || (item->>'decision'),'g3_signoff',new_id,
      jsonb_build_object('course_code',item->>'course_code','unit_no',(item->>'unit_no')::int,'supersedes',old_id));
    old_id := null;
  end loop;
  return ids;
end; $$;

create function public.withdraw_g3_signoff(p_id uuid)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare actor uuid := public.current_profile_id();
begin
  if not public.is_admin() then raise exception 'admin required' using errcode = '42501'; end if;
  update public.g3_signoffs set sync_status = 'withdrawn', sync_note = 'withdrawn by owner'
    where id = p_id and sync_status = 'queued';
  if not found then raise exception 'only a queued decision can be withdrawn' using errcode = '22023'; end if;
  insert into public.admin_action_history(actor_id,action,target_type,target_id) values(actor,'g3_signoff_withdrawn','g3_signoff',p_id);
end; $$;

-- Crew only. Moves a queued row to synced (PR opened), stale (inputs changed) or failed (gates red).
create function public.mark_g3_signoff_synced(p_id uuid, p_status text, p_pr_url text default null, p_note text default null)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if p_status not in ('synced','stale','failed') then raise exception 'invalid sync status' using errcode = '22023'; end if;
  if p_status = 'synced' and p_pr_url is null then raise exception 'synced needs the PR url' using errcode = '22023'; end if;
  update public.g3_signoffs set sync_status = p_status, pr_url = p_pr_url, sync_note = p_note, synced_at = now()
    where id = p_id and sync_status = 'queued';
  if not found then raise exception 'decision is not queued' using errcode = '22023'; end if;
end; $$;

revoke all on function public.record_g3_signoff(jsonb) from public, anon;
revoke all on function public.withdraw_g3_signoff(uuid) from public, anon;
revoke all on function public.mark_g3_signoff_synced(uuid,text,text,text) from public, anon, authenticated;
grant execute on function public.record_g3_signoff(jsonb) to authenticated;
grant execute on function public.withdraw_g3_signoff(uuid) to authenticated;
grant execute on function public.mark_g3_signoff_synced(uuid,text,text,text) to service_role;
