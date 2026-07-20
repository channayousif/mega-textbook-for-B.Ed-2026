-- 0016_join_class_rpc.sql — Spec 003 (Virtual Classes, Assignments & Assessments)
-- join_class_by_code() SECURITY DEFINER RPC (FR-003, FR-018, 2026-07-19 clarification).
--
-- SECURITY DEFINER because a student has no standing SELECT access to
-- arbitrary `classes` rows (join codes must not be browsable) — this function
-- looks the class up on the caller's behalf and only ever returns a coarse
-- outcome, never leaking whether a mismatched code "almost" matched something.
--
-- Three outcomes on a valid code, keyed off any existing enrollments row:
--   * no existing row            → insert 'active' (first join)
--   * existing row, 'active'     → idempotent no-op, return it
--   * existing row, 'removed'    → REJECT — never reactivates. Only an
--     explicit teacher restore action (via the enrollments UPDATE policy)
--     may reactivate a removed enrollment; this RPC cannot.
--
-- Error messages are short, machine-parseable strings (not bilingual UI text)
-- classified client-side, the same convention src/lib/authErrors.ts uses for
-- GoTrue errors — see src/lib/classes.ts.

create or replace function public.join_class_by_code(p_code text)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  target_class public.classes;
  existing     public.enrollments;
  caller_id    uuid := public.current_profile_id();
begin
  if caller_id is null then
    raise exception 'not_signed_in' using errcode = 'P0001';
  end if;

  select * into target_class
  from public.classes
  where join_code = p_code
    and status = 'active';

  if not found then
    raise exception 'invalid_or_expired_join_code' using errcode = 'P0001';
  end if;

  select * into existing
  from public.enrollments
  where class_id = target_class.id
    and student_id = caller_id;

  if found then
    if existing.status = 'removed' then
      raise exception 'removed_from_class' using errcode = 'P0001';
    end if;
    -- already active — idempotent, harmless re-join with a code already held.
    return jsonb_build_object('class_id', target_class.id, 'already_enrolled', true);
  end if;

  insert into public.enrollments (class_id, student_id, status)
  values (target_class.id, caller_id, 'active');

  return jsonb_build_object('class_id', target_class.id, 'already_enrolled', false);
end;
$$;

comment on function public.join_class_by_code(text) is
  'FR-003, FR-018, 2026-07-19 clarification — looks up a class by join code '
  'and enrolls the caller. Rejects (never reactivates) a removed enrollment; '
  'only restoreStudent()''s UPDATE (enrollments_update policy) may reactivate.';

revoke all on function public.join_class_by_code(text) from public;
grant execute on function public.join_class_by_code(text) to authenticated;
