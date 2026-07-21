-- 0027_achievement_triggers.sql — Spec 004 (Student Dashboard)
-- Achievement-granting triggers + the one client-assisted RPC (FR-008,
-- SC-004, research.md R2).
--
-- Three achievements are pure, event-driven SECURITY DEFINER triggers with
-- no client involvement — both sides of their triggering condition already
-- live in Postgres. The fourth (100% course coverage) is the one deliberate
-- exception: its denominator (total units) only exists in Git, so it is
-- checked via a client-initiated RPC that recomputes the numerator
-- authoritatively server-side (research.md R2 — do not generalize this
-- pattern elsewhere without re-justifying it against its own blast radius).

create or replace function public.grant_first_submission_achievement()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  submission_count integer;
begin
  select count(*) into submission_count from public.submissions where student_id = new.student_id;
  if submission_count = 1 then
    perform public.grant_achievement(new.student_id, 'first_submission');
  end if;
  return new;
end;
$$;

comment on function public.grant_first_submission_achievement() is
  'FR-008 — awards "first_submission" the first time a student ever submits '
  'anything, across any class.';

create trigger submissions_grant_first_submission
  after insert on public.submissions
  for each row
  execute function public.grant_first_submission_achievement();

create or replace function public.grant_study_streak_achievement()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  streak_days integer;
begin
  select count(distinct occurred_at::date) into streak_days
  from public.unit_progress
  where student_id = new.student_id
    and method = 'self_marked'
    and occurred_at::date in (current_date, current_date - 1, current_date - 2);

  if streak_days = 3 then
    perform public.grant_achievement(new.student_id, 'study_streak');
  end if;
  return new;
end;
$$;

comment on function public.grant_study_streak_achievement() is
  'FR-008, 2026-07-20 clarification — awards "study_streak" at 3 consecutive '
  'self-marked calendar days. Only fires for self_marked rows (the trigger''s '
  'WHEN clause below) — grade/quiz-derived unit_progress rows never advance '
  'this streak.';

create trigger unit_progress_grant_study_streak
  after insert on public.unit_progress
  for each row
  when (new.method = 'self_marked')
  execute function public.grant_study_streak_achievement();

create or replace function public.grant_on_time_completion_achievement()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  target_class_id uuid;
  target_student_id uuid;
  published_count integer;
  on_time_graded_count integer;
begin
  select a.class_id, s.student_id into target_class_id, target_student_id
  from public.submissions s
  join public.assignments a on a.id = s.assignment_id
  where s.id = new.submission_id;

  select count(*) into published_count
  from public.assignments a
  where a.class_id = target_class_id and a.published = true;

  select count(distinct s.assignment_id) into on_time_graded_count
  from public.submissions s
  join public.assignments a on a.id = s.assignment_id
  join public.grades g on g.submission_id = s.id
  where a.class_id = target_class_id
    and s.student_id = target_student_id
    and a.published = true
    and s.late = false;

  -- published_count >= 1 encodes the zero-assignment-class clarification —
  -- a class with no published assignments can never satisfy this (both
  -- sides would be 0, deliberately excluded by this guard).
  if published_count >= 1 and on_time_graded_count = published_count then
    perform public.grant_achievement(target_student_id, 'on_time_class_completion', jsonb_build_object('class_id', target_class_id));
  end if;

  return new;
end;
$$;

comment on function public.grant_on_time_completion_achievement() is
  'FR-008, 2026-07-20 clarification — awards "on_time_class_completion" when '
  'a student has completed every published assignment in a class on time. A '
  'class with zero published assignments never qualifies (published_count '
  '>= 1 guard).';

create trigger grades_grant_on_time_completion
  after insert on public.grades
  for each row
  execute function public.grant_on_time_completion_achievement();

create or replace function public.check_full_coverage_achievement(p_course_code text, p_total_units integer)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  caller_id uuid := public.current_profile_id();
  covered_count integer;
begin
  if caller_id is null then
    raise exception 'not_signed_in' using errcode = 'P0001';
  end if;

  -- Recomputed authoritatively server-side — never trusts the client for
  -- this half of the comparison. p_total_units (the other half) is the one
  -- deliberate, documented exception: it is derived from Git-tracked content
  -- (content-index.json), which Postgres cannot read (research.md R2).
  select count(distinct unit_no) into covered_count
  from public.unit_progress
  where student_id = caller_id and course_code = p_course_code;

  if p_total_units > 0 and covered_count >= p_total_units then
    perform public.grant_achievement(caller_id, 'full_course_coverage', jsonb_build_object('course_code', p_course_code));
    return true;
  end if;

  return false;
end;
$$;

comment on function public.check_full_coverage_achievement(text, integer) is
  'FR-008, FR-009, research.md R2 — awards "full_course_coverage" when the '
  'server-recomputed numerator meets the caller-supplied p_total_units. The '
  'one deliberate client-trust exception in this feature: p_total_units is '
  'Git-derived and unavailable to Postgres; the numerator is never trusted '
  'from the client. Blast radius of a wrong client value: one badge''s '
  'timing, never a grade or another student''s data.';

revoke all on function public.check_full_coverage_achievement(text, integer) from public;
grant execute on function public.check_full_coverage_achievement(text, integer) to authenticated;
