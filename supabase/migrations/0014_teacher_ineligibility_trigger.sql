-- 0014_teacher_ineligibility_trigger.sql — Spec 003 (Virtual Classes, Assignments & Assessments)
-- Auto-archives a teacher's active classes when they stop being an eligible
-- teacher (FR-020, 2026-07-19 clarification).
--
-- Mirrors Spec 002's write_privilege_audit() shape: an AFTER UPDATE trigger on
-- public.profiles, SECURITY DEFINER so it can write to classes regardless of
-- the caller's own classes RLS standing (an admin changing someone else's
-- role has no ownership relationship to that teacher's classes at all).

create or replace function public.archive_classes_on_teacher_ineligibility()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if (old.role = 'teacher' and new.role is distinct from 'teacher')
     or (new.status = 'suspended' and old.status is distinct from 'suspended') then
    update public.classes
    set status = 'archived',
        archived_reason = 'role_change',
        archived_at = now()
    where teacher_id = old.id
      and status = 'active';
  end if;
  return new;
end;
$$;

comment on function public.archive_classes_on_teacher_ineligibility() is
  'FR-020 — auto-archives every active class owned by a teacher who just lost '
  'the teacher role or was suspended, so a class never sits live without an '
  'eligible teacher of record. Runs under the triggering admin''s own session '
  'context, so 0013''s guard_class_updates() lets this UPDATE through via its '
  'own is_admin() check rather than needing a special case here.';

create trigger profiles_archive_classes_on_ineligibility
  after update of role, status on public.profiles
  for each row
  execute function public.archive_classes_on_teacher_ineligibility();
