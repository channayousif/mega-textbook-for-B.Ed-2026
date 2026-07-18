-- 0009_write_privilege_audit.sql — Spec 002 (Authentication & Roles)
-- Emit an audit row for every privileged change (FR-018, SC-008).
--
-- The audit is a SIDE EFFECT of the change itself, not a separate call the
-- application must remember to make. That is the whole point: a role change and
-- its audit row cannot diverge, because the same transaction produces both.
--
-- actor_id is read from auth.uid() HERE, server-side. It is never accepted from
-- client input, so attribution cannot be spoofed (contracts §D).
--
-- Runs AFTER UPDATE so it only records changes that actually survived the 0008
-- guard trigger and the RLS policies.

create or replace function public.write_privilege_audit()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  actor uuid := public.current_profile_id();  -- null for service-role callers
begin
  if new.role is distinct from old.role then
    insert into public.privilege_audit (subject_id, actor_id, change_type, old_value, new_value)
    values (new.id, actor, 'role', old.role::text, new.role::text);
  end if;

  if new.verified_teacher is distinct from old.verified_teacher then
    insert into public.privilege_audit (subject_id, actor_id, change_type, old_value, new_value)
    values (new.id, actor, 'verified_teacher', old.verified_teacher::text, new.verified_teacher::text);
  end if;

  if new.status is distinct from old.status then
    insert into public.privilege_audit (subject_id, actor_id, change_type, old_value, new_value)
    values (new.id, actor, 'status', old.status::text, new.status::text);
  end if;

  return null;  -- AFTER trigger: return value is ignored
end;
$$;

comment on function public.write_privilege_audit() is
  'FR-018 — writes one privilege_audit row per changed privileged column. actor_id is '
  'derived from auth.uid() server-side and is not client-supplied. Runs as the sole writer '
  'of privilege_audit (no client INSERT policy exists).';

create trigger profiles_write_privilege_audit
  after update on public.profiles
  for each row
  execute function public.write_privilege_audit();
