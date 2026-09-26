-- Scoped reviewer workflow. Git remains the authority for G3/G5 certification.
-- Only course identifiers are mirrored here for authorization. Licence has no course codes
-- under Feature 024 and uses page-level advisory reviews.
create table public.review_course_scopes (
  course_code text primary key,
  track text not null check (track = 'bed')
);
insert into public.review_course_scopes(course_code,track) values
  ('EFMP-301','bed'),('EFMP-302','bed'),('EFMP-303','bed'),('EFMP-304','bed'),
  ('EFMP-305','bed'),('EFMP-408','bed'),('GENG-300','bed'),('GENG-301','bed'),
  ('GICT-300','bed'),('GNAS-301','bed'),('GPKS-402','bed'),('GQUR-300','bed'),
  ('GQUR-301','bed'),('GSOS-301','bed');
create function public.valid_review_scope(p_track text, p_course text)
returns boolean language sql stable security definer set search_path = public, pg_temp as $$
  select (p_track = 'licence' and p_course is null)
    or (p_track = 'bed' and (p_course is null or exists
      (select 1 from public.review_course_scopes where course_code = p_course and track = 'bed')));
$$;
revoke all on function public.valid_review_scope(text,text) from public;
grant execute on function public.valid_review_scope(text,text) to authenticated;

create table public.reviewer_applications (
  id uuid primary key default gen_random_uuid(),
  applicant_id uuid not null references public.profiles(id),
  track text not null check (track in ('bed', 'licence')),
  course_code text check (course_code ~ '^[A-Z][A-Z0-9]*-[0-9]{3}$' and public.valid_review_scope(track,course_code)),
  qualification_evidence text not null check (length(trim(qualification_evidence)) >= 20),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  admin_note text,
  decided_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  decided_at timestamptz
);
create unique index reviewer_one_pending_application on public.reviewer_applications(applicant_id, track, coalesce(course_code, '')) where status = 'pending';

create table public.reviewer_grants (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.profiles(id),
  track text not null check (track in ('bed', 'licence')),
  course_code text check (course_code ~ '^[A-Z][A-Z0-9]*-[0-9]{3}$' and public.valid_review_scope(track,course_code)),
  qualification_evidence text not null check (length(trim(qualification_evidence)) >= 20),
  application_id uuid references public.reviewer_applications(id) on delete set null,
  granted_by uuid references public.profiles(id) on delete set null,
  granted_at timestamptz not null default now(),
  revoked_by uuid references public.profiles(id) on delete set null,
  revoked_at timestamptz
);
create unique index reviewer_one_active_grant on public.reviewer_grants(subject_id, track, coalesce(course_code, '')) where revoked_at is null;

create or replace function public.has_review_scope(p_track text, p_course text, p_uid uuid default auth.uid())
returns boolean language sql stable security definer set search_path = public, pg_temp as $$
  select exists (
    select 1 from public.reviewer_grants g join public.profiles p on p.id = g.subject_id
    where p.auth_user_id = p_uid and p.status = 'active' and p.deleted_at is null
      and g.revoked_at is null and g.track = p_track
      and (g.course_code is null or g.course_code = p_course)
  );
$$;
revoke all on function public.has_review_scope(text,text,uuid) from public;
grant execute on function public.has_review_scope(text,text,uuid) to authenticated;

-- The old boolean is retained for historical audit only; it no longer grants access.
create or replace function public.is_reviewer(uid uuid default auth.uid())
returns boolean language sql stable security definer set search_path = public, pg_temp as $$
  select exists (
    select 1 from public.reviewer_grants g join public.profiles p on p.id = g.subject_id
    where p.auth_user_id = uid and p.status = 'active' and p.deleted_at is null and g.revoked_at is null
  );
$$;

create table public.review_submissions (
  id uuid primary key default gen_random_uuid(),
  reviewer_id uuid not null references public.profiles(id),
  track text not null check (track in ('bed', 'licence')),
  course_code text check (course_code ~ '^[A-Z][A-Z0-9]*-[0-9]{3}$'),
  unit_no integer check (unit_no > 0),
  topic_no integer check (topic_no > 0),
  page_slug text,
  stage text not null check (stage in ('topic','G3','G5','licence')),
  criteria jsonb not null check (jsonb_typeof(criteria) = 'object' and criteria <> '{}'::jsonb),
  comments text not null check (length(trim(comments)) >= 10),
  recommendation text not null check (recommendation in ('approve','improve')),
  evidence_path text,
  decision text not null default 'pending' check (decision in ('pending','approved','improve','rejected')),
  decision_note text,
  decided_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  decided_at timestamptz,
  check ((stage = 'licence' and track = 'licence' and course_code is null and unit_no is null
            and topic_no is null and page_slug ~ '^/licence/pedagogy/[a-z0-9/-]+$')
    or (stage = 'topic' and track = 'bed' and course_code is not null and unit_no is not null
            and topic_no is not null and page_slug is null)
    or (stage in ('G3','G5') and track = 'bed' and course_code is not null and unit_no is not null
            and topic_no is null and page_slug is null))
);

create function public.validate_review_submission()
returns trigger language plpgsql set search_path = public, pg_temp as $$
begin
  if (select count(*) from jsonb_each(new.criteria)) <> 5 or not (
    new.criteria ? 'Accuracy and sources' and new.criteria ? 'Learning objectives'
    and new.criteria ? 'Pedagogy and examples' and new.criteria ? 'Assessment and answer guidance'
    and new.criteria ? 'Language and accessibility') then
    raise exception 'all five review criteria are required' using errcode = '22023';
  end if;
  if exists(select 1 from jsonb_each_text(new.criteria) where value not in ('pass','fail','unverified')) then
    raise exception 'invalid criterion result' using errcode = '22023';
  end if;
  if new.recommendation = 'approve' and exists(select 1 from jsonb_each_text(new.criteria) where value <> 'pass') then
    raise exception 'approval recommendation requires passing criteria' using errcode = '22023';
  end if;
  return new;
end; $$;
create trigger review_submission_validate before insert on public.review_submissions
  for each row execute function public.validate_review_submission();

create table public.admin_action_history (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_type text not null,
  target_id uuid,
  detail jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create table public.agent_configuration (
  singleton boolean primary key default true check (singleton),
  provider text not null default 'codex' check (provider in ('claude','codex','antigravity','opencode')),
  host_config_name text not null default 'default' check (host_config_name ~ '^[a-zA-Z0-9_.-]{1,64}$'),
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);
insert into public.agent_configuration(singleton) values (true);

create table public.agent_host_configurations (
  provider text not null check (provider in ('claude','codex','antigravity','opencode')),
  host_config_name text not null check (host_config_name ~ '^[a-zA-Z0-9_.-]{1,64}$'),
  reported_at timestamptz not null default now(),
  primary key (provider, host_config_name)
);

create table public.agent_jobs (
  id uuid primary key default gen_random_uuid(),
  suggestion_id uuid references public.improvement_suggestions(id),
  review_id uuid references public.review_submissions(id),
  instructions text not null check (length(trim(instructions)) >= 10),
  status text not null default 'approved' check (status in ('approved','claimed','running','failed','completed')),
  requested_by uuid references public.profiles(id) on delete set null,
  provider text not null check (provider in ('claude','codex','antigravity','opencode')),
  host_config_name text not null,
  branch_name text not null unique,
  claim_token uuid,
  lease_until timestamptz,
  attempt integer not null default 0,
  diff_summary text,
  checks jsonb,
  error_text text,
  pr_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (num_nonnulls(suggestion_id, review_id) = 1)
);
create unique index agent_job_suggestion_unique on public.agent_jobs(suggestion_id) where suggestion_id is not null;
create unique index agent_job_review_unique on public.agent_jobs(review_id) where review_id is not null;

alter table public.reviewer_applications enable row level security;
alter table public.reviewer_grants enable row level security;
alter table public.review_submissions enable row level security;
alter table public.admin_action_history enable row level security;
alter table public.agent_configuration enable row level security;
alter table public.agent_host_configurations enable row level security;
alter table public.agent_jobs enable row level security;

create policy reviewer_app_read on public.reviewer_applications for select to authenticated
  using (public.is_admin() or (public.is_active_user() and applicant_id = public.current_profile_id()));
create policy reviewer_app_insert on public.reviewer_applications for insert to authenticated
  with check (public.is_active_user() and applicant_id = public.current_profile_id() and status = 'pending'
    and admin_note is null and decided_by is null and decided_at is null and public.valid_review_scope(track,course_code));
create policy reviewer_grant_read on public.reviewer_grants for select to authenticated
  using (public.is_admin() or (public.is_active_user() and subject_id = public.current_profile_id()));
create policy review_read on public.review_submissions for select to authenticated
  using (public.is_admin() or (public.is_active_user() and reviewer_id = public.current_profile_id()));
create policy review_insert on public.review_submissions for insert to authenticated
  with check (public.is_active_user() and reviewer_id = public.current_profile_id()
    and public.has_review_scope(track, course_code) and decision = 'pending'
    and decision_note is null and decided_by is null and decided_at is null
    and ((stage = 'licence' and track = 'licence') or public.valid_review_scope(track,course_code)));
create policy admin_history_read on public.admin_action_history for select to authenticated using (public.is_admin());
create policy agent_config_read on public.agent_configuration for select to authenticated using (public.is_admin());
create policy agent_host_config_read on public.agent_host_configurations for select to authenticated using (public.is_admin());
create policy agent_jobs_read on public.agent_jobs for select to authenticated using (public.is_admin());
grant select, insert on public.reviewer_applications to authenticated;
grant select on public.reviewer_grants to authenticated;
grant select, insert on public.review_submissions to authenticated;
grant select on public.admin_action_history, public.agent_configuration, public.agent_host_configurations, public.agent_jobs to authenticated;

-- Lock application and grant changes inside admin-only RPCs. No client UPDATE/DELETE grants exist.
create function public.decide_reviewer_application(p_id uuid, p_approve boolean, p_note text default null)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare a public.reviewer_applications%rowtype; actor uuid := public.current_profile_id();
begin
  if not public.is_admin() then raise exception 'admin required' using errcode = '42501'; end if;
  select * into a from public.reviewer_applications where id = p_id for update;
  if not found or a.status <> 'pending' then raise exception 'application is not pending' using errcode = '22023'; end if;
  if p_approve and not exists(select 1 from public.profiles where id = a.applicant_id and status = 'active' and deleted_at is null) then
    raise exception 'applicant is inactive' using errcode = '22023';
  end if;
  update public.reviewer_applications set status = case when p_approve then 'approved' else 'rejected' end,
    admin_note = p_note, decided_by = actor, decided_at = now() where id = p_id;
  if p_approve then
    insert into public.reviewer_grants(subject_id,track,course_code,qualification_evidence,application_id,granted_by)
    values (a.applicant_id,a.track,a.course_code,a.qualification_evidence,a.id,actor);
  end if;
  insert into public.admin_action_history(actor_id,action,target_type,target_id,detail)
  values(actor,case when p_approve then 'application_approved' else 'application_rejected' end,'reviewer_application',p_id,
    jsonb_build_object('note',p_note,'track',a.track,'course_code',a.course_code));
end; $$;

create function public.grant_reviewer_scope(p_subject uuid, p_track text, p_course text, p_evidence text)
returns uuid language plpgsql security definer set search_path = public, pg_temp as $$
declare gid uuid; actor uuid := public.current_profile_id();
begin
  if not public.is_admin() then raise exception 'admin required' using errcode = '42501'; end if;
  if not public.valid_review_scope(p_track,p_course) or (p_course is not null and p_course !~ '^[A-Z][A-Z0-9]*-[0-9]{3}$')
    or length(trim(coalesce(p_evidence,''))) < 20 then raise exception 'invalid grant scope or evidence' using errcode = '22023'; end if;
  if not exists(select 1 from public.profiles where id = p_subject and status = 'active' and deleted_at is null) then
    raise exception 'subject is inactive' using errcode = '22023'; end if;
  insert into public.reviewer_grants(subject_id,track,course_code,qualification_evidence,granted_by)
  values(p_subject,p_track,p_course,p_evidence,actor) returning id into gid;
  insert into public.admin_action_history(actor_id,action,target_type,target_id,detail)
  values(actor,'scope_granted','reviewer_grant',gid,jsonb_build_object('subject_id',p_subject,'track',p_track,'course_code',p_course));
  return gid;
end; $$;

create function public.revoke_reviewer_scope(p_id uuid)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare actor uuid := public.current_profile_id();
begin
  if not public.is_admin() then raise exception 'admin required' using errcode = '42501'; end if;
  update public.reviewer_grants set revoked_at = now(), revoked_by = actor where id = p_id and revoked_at is null;
  if not found then raise exception 'active grant not found' using errcode = '22023'; end if;
  insert into public.admin_action_history(actor_id,action,target_type,target_id) values(actor,'scope_revoked','reviewer_grant',p_id);
end; $$;

create function public.decide_review(p_id uuid, p_decision text, p_note text)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare r public.review_submissions%rowtype; actor uuid := public.current_profile_id();
begin
  if not public.is_admin() then raise exception 'admin required' using errcode = '42501'; end if;
  if p_decision not in ('approved','improve','rejected') or length(trim(coalesce(p_note,''))) < 5 then
    raise exception 'decision and note required' using errcode = '22023'; end if;
  select * into r from public.review_submissions where id = p_id for update;
  if not found or r.decision <> 'pending' then raise exception 'review is not pending' using errcode = '22023'; end if;
  if p_decision = 'approved' and r.recommendation <> 'approve' then
    raise exception 'reviewer did not recommend approval' using errcode = '22023'; end if;
  update public.review_submissions set decision = p_decision, decision_note = p_note,
    decided_by = actor, decided_at = now() where id = p_id;
  insert into public.admin_action_history(actor_id,action,target_type,target_id,detail)
  values(actor,'review_' || p_decision,'review_submission',p_id,jsonb_build_object('note',p_note));
end; $$;

create function public.admin_set_class_status(p_id uuid, p_archive boolean, p_note text)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare c public.classes%rowtype; actor uuid := public.current_profile_id();
begin
  if not public.is_admin() then raise exception 'admin required' using errcode = '42501'; end if;
  if p_archive is null then raise exception 'class action required' using errcode = '22023'; end if;
  if length(trim(coalesce(p_note,''))) < 5 then raise exception 'reason required' using errcode = '22023'; end if;
  select * into c from public.classes where id = p_id for update;
  if not found or (p_archive and c.status <> 'active') or (not p_archive and c.status <> 'archived') then
    raise exception 'class status has changed' using errcode = '22023'; end if;
  if not p_archive and not exists(select 1 from public.profiles p where p.id = c.teacher_id and p.role = 'teacher'
    and p.status = 'active' and p.deleted_at is null) then
    raise exception 'owning teacher is not eligible for reactivation' using errcode = '22023'; end if;
  update public.classes set status = case when p_archive then 'archived'::public.class_status else 'active'::public.class_status end,
    archived_reason = case when p_archive then 'manual' else null end,
    archived_at = case when p_archive then now() else null end where id = p_id;
  insert into public.admin_action_history(actor_id,action,target_type,target_id,detail)
  values(actor,case when p_archive then 'class_archived' else 'class_reactivated' end,'class',p_id,jsonb_build_object('reason',p_note));
end; $$;

create function public.set_agent_configuration(p_provider text, p_host_config_name text)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare actor uuid := public.current_profile_id();
begin
  if not public.is_admin() then raise exception 'admin required' using errcode = '42501'; end if;
  if p_provider not in ('claude','codex','antigravity','opencode') or p_host_config_name !~ '^[a-zA-Z0-9_.-]{1,64}$' then
    raise exception 'invalid host configuration choice' using errcode = '22023'; end if;
  if not exists(select 1 from public.agent_host_configurations where provider = p_provider and host_config_name = p_host_config_name) then
    raise exception 'configuration is not reported by the host' using errcode = '22023'; end if;
  update public.agent_configuration set provider = p_provider, host_config_name = p_host_config_name,
    updated_by = actor, updated_at = now() where singleton;
  insert into public.admin_action_history(actor_id,action,target_type,detail)
  values(actor,'agent_configuration_changed','agent_configuration',jsonb_build_object('provider',p_provider,'host_config_name',p_host_config_name));
end; $$;

create function public.sync_agent_host_configurations(p_configs jsonb)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if auth.role() <> 'service_role' then raise exception 'service role required' using errcode = '42501'; end if;
  if jsonb_typeof(p_configs) <> 'array' then raise exception 'configuration list required' using errcode = '22023'; end if;
  if exists(select 1 from jsonb_to_recordset(p_configs) as c(provider text, host_config_name text)
    where c.provider not in ('claude','codex','antigravity','opencode')
      or c.provider is null or c.host_config_name !~ '^[a-zA-Z0-9_.-]{1,64}$' or c.host_config_name is null) then
    raise exception 'invalid host configuration' using errcode = '22023'; end if;
  delete from public.agent_host_configurations where provider is not null;
  insert into public.agent_host_configurations(provider,host_config_name)
    select distinct c.provider,c.host_config_name from jsonb_to_recordset(p_configs) as c(provider text, host_config_name text);
end; $$;

create function public.enqueue_agent_job(p_suggestion uuid, p_review uuid, p_instructions text)
returns uuid language plpgsql security definer set search_path = public, pg_temp as $$
declare jid uuid := gen_random_uuid(); actor uuid := public.current_profile_id(); cfg public.agent_configuration%rowtype;
begin
  if not public.is_admin() then raise exception 'admin required' using errcode = '42501'; end if;
  if num_nonnulls(p_suggestion,p_review) <> 1 or length(trim(coalesce(p_instructions,''))) < 10 then
    raise exception 'one approved source and instructions required' using errcode = '22023'; end if;
  if p_suggestion is not null and not exists(select 1 from public.improvement_suggestions where id = p_suggestion and status = 'accepted') then
    raise exception 'suggestion is not accepted' using errcode = '22023'; end if;
  if p_review is not null and not exists(select 1 from public.review_submissions where id = p_review and decision = 'improve') then
    raise exception 'review does not request improvement' using errcode = '22023'; end if;
  select * into cfg from public.agent_configuration where singleton;
  insert into public.agent_jobs(id,suggestion_id,review_id,instructions,requested_by,provider,host_config_name,branch_name)
  values(jid,p_suggestion,p_review,p_instructions,actor,cfg.provider,cfg.host_config_name,'agent/job-' || jid::text);
  insert into public.admin_action_history(actor_id,action,target_type,target_id) values(actor,'job_approved','agent_job',jid);
  return jid;
end; $$;

-- Service-role heartbeat only. Token plus lease prevent stale attempts from reporting over a retry.
create function public.claim_agent_job(p_id uuid default null)
returns public.agent_jobs language plpgsql security definer set search_path = public, pg_temp as $$
declare j public.agent_jobs%rowtype;
begin
  if auth.role() <> 'service_role' then raise exception 'service role required' using errcode = '42501'; end if;
  select * into j from public.agent_jobs where (p_id is null or id = p_id) and
    (status = 'approved' or (status in ('claimed','running') and lease_until < now()))
    order by created_at for update skip locked limit 1;
  if not found then return null; end if;
  update public.agent_jobs set status = 'claimed', claim_token = gen_random_uuid(),
    lease_until = now() + interval '45 minutes', attempt = attempt + 1, updated_at = now()
    where id = j.id returning * into j;
  return j;
end; $$;

create function public.retry_agent_job(p_id uuid)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare actor uuid := public.current_profile_id();
begin
  if not public.is_admin() then raise exception 'admin required' using errcode = '42501'; end if;
  update public.agent_jobs set status = 'approved', claim_token = null, lease_until = null,
    updated_at = now() where id = p_id and status = 'failed';
  if not found then raise exception 'failed job not found' using errcode = '22023'; end if;
  insert into public.admin_action_history(actor_id,action,target_type,target_id) values(actor,'job_retry_approved','agent_job',p_id);
end; $$;

create function public.report_agent_job(p_id uuid, p_token uuid, p_status text,
  p_diff text default null, p_checks jsonb default null, p_error text default null, p_pr_url text default null)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare j public.agent_jobs%rowtype;
begin
  if auth.role() <> 'service_role' then raise exception 'service role required' using errcode = '42501'; end if;
  select * into j from public.agent_jobs where id = p_id for update;
  if not found or j.claim_token is distinct from p_token or j.status not in ('claimed','running') then
    raise exception 'stale or invalid job claim' using errcode = '42501'; end if;
  if p_status is null or p_status not in ('running','failed','completed') or
    (p_status = 'completed' and (coalesce(p_pr_url,'') !~ '^https://github[.]com/[^/]+/[^/]+/pull/[0-9]+$' or p_diff is null or p_checks is null)) then
    raise exception 'invalid job result' using errcode = '22023'; end if;
  update public.agent_jobs set status = p_status, diff_summary = coalesce(p_diff,diff_summary),
    checks = coalesce(p_checks,checks), error_text = p_error, pr_url = coalesce(p_pr_url,pr_url),
    lease_until = case when p_status = 'running' then now() + interval '45 minutes' else null end,
    updated_at = now() where id = p_id;
end; $$;

revoke all on function public.claim_agent_job(uuid) from public, anon, authenticated;
revoke all on function public.sync_agent_host_configurations(jsonb) from public, anon, authenticated;
revoke all on function public.report_agent_job(uuid,uuid,text,text,jsonb,text,text) from public, anon, authenticated;
grant execute on function public.claim_agent_job(uuid) to service_role;
grant execute on function public.sync_agent_host_configurations(jsonb) to service_role;
grant execute on function public.report_agent_job(uuid,uuid,text,text,jsonb,text,text) to service_role;
grant execute on function public.decide_reviewer_application(uuid,boolean,text), public.grant_reviewer_scope(uuid,text,text,text),
  public.revoke_reviewer_scope(uuid), public.decide_review(uuid,text,text), public.set_agent_configuration(text,text),
  public.enqueue_agent_job(uuid,uuid,text), public.retry_agent_job(uuid), public.admin_set_class_status(uuid,boolean,text) to authenticated;
