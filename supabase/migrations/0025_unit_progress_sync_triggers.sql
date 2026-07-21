-- 0025_unit_progress_sync_triggers.sql — Spec 004 (Student Dashboard)
-- Auto-populate unit_progress from Spec 003's grades/quiz_attempts inserts
-- (FR-005, FR-006, research.md R3).
--
-- Both functions must be SECURITY DEFINER because the inserting caller is not
-- necessarily the student the resulting unit_progress row belongs to (a
-- teacher inserts into grades; submit_quiz_attempt()'s own execution context
-- inserts into quiz_attempts) — the same "system writes on behalf of a
-- different user" shape as join_class_by_code()/submit_quiz_attempt() (0016,
-- 0023). Without SECURITY DEFINER, 0024's unit_progress_insert policy would
-- reject the cross-user insert outright.

create or replace function public.sync_unit_progress_from_grade()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  target_student_id uuid;
  target_course_code text;
  target_unit_no integer;
begin
  select s.student_id, a.course_code, a.unit_no
    into target_student_id, target_course_code, target_unit_no
  from public.submissions s
  join public.assignments a on a.id = s.assignment_id
  where s.id = new.submission_id;

  -- A 'custom' assignment has null course_code/unit_no — no unit to attach
  -- coverage to, so this grade contributes nothing (data-model.md).
  if target_course_code is not null and target_unit_no is not null then
    insert into public.unit_progress (student_id, course_code, unit_no, method, occurred_at)
    values (target_student_id, target_course_code, target_unit_no, 'assignment', new.graded_at)
    on conflict (student_id, course_code, unit_no) do nothing;
  end if;

  return new;
end;
$$;

comment on function public.sync_unit_progress_from_grade() is
  'FR-005, FR-006 — records unit coverage from a graded, unit-attached '
  'assignment. SECURITY DEFINER: the inserting caller is the grading '
  'teacher, not the student the resulting row belongs to.';

create trigger grades_sync_unit_progress
  after insert on public.grades
  for each row
  execute function public.sync_unit_progress_from_grade();

create or replace function public.sync_unit_progress_from_quiz()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  target_course_code text;
  target_unit_no integer;
begin
  select a.course_code, a.unit_no
    into target_course_code, target_unit_no
  from public.assignments a
  where a.id = new.assignment_id;

  -- A quiz assignment always has a non-null course_code/unit_no
  -- (source_kind='quiz' is never 'custom' — 0017's check constraint).
  insert into public.unit_progress (student_id, course_code, unit_no, method, occurred_at)
  values (new.student_id, target_course_code, target_unit_no, 'quiz', new.attempted_at)
  on conflict (student_id, course_code, unit_no) do nothing;

  return new;
end;
$$;

comment on function public.sync_unit_progress_from_quiz() is
  'FR-005, FR-006 — records unit coverage from a quiz attempt. Every attempt '
  '(not just the best-scoring one) fires this; harmless since ON CONFLICT '
  'already de-duplicates by unit, not by attempt.';

create trigger quiz_attempts_sync_unit_progress
  after insert on public.quiz_attempts
  for each row
  execute function public.sync_unit_progress_from_quiz();
