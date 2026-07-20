-- 0013_class_guard_trigger.sql — Spec 003 (Virtual Classes, Assignments & Assessments)
-- Column-level authorization for public.classes (FR-002, FR-015, FR-020).
--
-- WHY A TRIGGER AND NOT JUST RLS: 0012's UPDATE policy lets an owning teacher
-- or admin touch a row at all — RLS cannot say "you may update this row but
-- only these columns, and only under these conditions". This trigger is that
-- narrowing, exactly mirroring Spec 002's guard_privileged_columns() pattern
-- (0008_guard_privileged_columns.sql).
--
-- TWO DELIBERATE STRICTNESS LEVELS (owner decision, 2026-07-19 — see
-- data-model.md's `classes` "Validation rules / guard trigger" section):
--   * join_code: ownership + is_active_user() only. Blocks a SUSPENDED
--     teacher (matching every other protected write in this codebase's
--     baseline), but does NOT require them to still hold the teacher role —
--     a role change away from 'teacher' already triggers auto-archival
--     (0014) regardless, making a stricter check on join_code redundant.
--   * status (archive/reactivate): ownership + is_eligible_teacher() — the
--     caller must STILL hold the teacher role, not just be unsuspended. This
--     is what the 2026-07-19 reactivation clarification actually requires:
--     an ineligible teacher (role changed away, OR suspended) cannot
--     reactivate — or re-archive — their own class; once eligible again,
--     they can.
--
-- ADMIN INTERACTION WITH 0014's TRIGGER: archive_classes_on_teacher_ineligibility()
-- issues its own `UPDATE classes SET status='archived', archived_reason='role_change'`
-- as a side effect of an ADMIN's UPDATE on profiles. auth.uid() is bound to the
-- actual authenticated session regardless of SECURITY DEFINER, so that UPDATE
-- reaches this trigger with the ADMIN's own uid — caller_is_admin is true, and
-- the whole non-admin restriction block below is skipped, exactly as intended.

create or replace function public.guard_class_updates()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  caller_is_admin boolean := public.is_admin();
begin
  -- No client path in this feature reaches classes UPDATEs with a null
  -- session (no Edge Functions use the service role here) — this exists only
  -- for parity with 0008's pattern, covering a direct superuser/psql session.
  if auth.uid() is null then
    return new;
  end if;

  if caller_is_admin then
    return new;
  end if;

  -- Immutable for everyone except admin — no requirement asks for general
  -- class editing, so nothing should silently allow it (plan.md Complexity
  -- Tracking).
  if new.teacher_id is distinct from old.teacher_id
     or new.course_code is distinct from old.course_code
     or new.name is distinct from old.name
     or new.term_label is distinct from old.term_label
     or new.created_at is distinct from old.created_at then
    raise exception 'privileged column change requires admin: class details are not editable'
      using errcode = '42501';
  end if;

  if new.join_code is distinct from old.join_code then
    if old.teacher_id <> public.current_profile_id() or not public.is_active_user() then
      raise exception 'join_code change requires an active owning teacher'
        using errcode = '42501';
    end if;
  end if;

  if new.status is distinct from old.status then
    if old.teacher_id <> public.current_profile_id() or not public.is_eligible_teacher() then
      raise exception 'status change requires a currently eligible owning teacher'
        using errcode = '42501';
    end if;

    -- A non-admin manual archive/reactivate must set archived_reason
    -- consistently with the transition — prevents a teacher forging
    -- archived_reason='role_change' (reserved for 0014's trigger).
    if new.status = 'archived' and new.archived_reason is distinct from 'manual' then
      raise exception 'a non-admin archive must set archived_reason = ''manual'''
        using errcode = '42501';
    end if;
    if new.status = 'active' and new.archived_reason is not null then
      raise exception 'reactivation must clear archived_reason'
        using errcode = '42501';
    end if;
  elsif new.archived_reason is distinct from old.archived_reason
     or new.archived_at is distinct from old.archived_at then
    raise exception 'archived_reason/archived_at cannot change without a status transition'
      using errcode = '42501';
  end if;

  return new;
end;
$$;

comment on function public.guard_class_updates() is
  'FR-002/FR-015/FR-020 — column-level authorization for classes UPDATEs, '
  'narrowing the broad ownership/admin row-level policy (0012). join_code '
  'needs ownership + is_active_user(); status transitions need ownership + '
  'is_eligible_teacher(). Admins bypass both, including 0014''s trigger, whose '
  'UPDATE runs under the triggering admin''s own session context.';

create trigger classes_guard_updates
  before update on public.classes
  for each row
  execute function public.guard_class_updates();
