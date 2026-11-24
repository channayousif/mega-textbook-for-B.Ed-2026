-- 0057_class_details_editable.sql
--
-- Spec 011 FR-013 / T028 gave teachers an "Edit details" form for a class's name and term on the
-- roster page, but 0013's guard_class_updates() still refused every non-admin change to `name`
-- and `term_label` ("class details are not editable"), so the form failed for every teacher
-- (found by tests/e2e/teacher-manage-assignments-classes.spec.ts, 2026-11-24).
--
-- Change: the owning, currently eligible teacher may change `name` and `term_label`, the same
-- eligibility 0013 already requires for a status change. `teacher_id`, `course_code` and
-- `created_at` stay admin-only (FR-013 also names the course; it stays open because assignments
-- are bound to the course's units). Every other rule of 0013 is unchanged; the body below is the
-- live definition with only that block replaced.

CREATE OR REPLACE FUNCTION public.guard_class_updates()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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

  -- Ownership, course and creation time stay admin-only. Spec 011 FR-013 lets the owning
  -- teacher rename a class and change its term label (0057); the course stays admin-only for
  -- now because assignments are bound to the course's units.
  if new.teacher_id is distinct from old.teacher_id
     or new.course_code is distinct from old.course_code
     or new.created_at is distinct from old.created_at then
    raise exception 'privileged column change requires admin: class owner, course and creation time are not editable'
      using errcode = '42501';
  end if;

  if new.name is distinct from old.name
     or new.term_label is distinct from old.term_label then
    if old.teacher_id <> public.current_profile_id() or not public.is_eligible_teacher() then
      raise exception 'class name or term change requires a currently eligible owning teacher'
        using errcode = '42501';
    end if;
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
$function$;
