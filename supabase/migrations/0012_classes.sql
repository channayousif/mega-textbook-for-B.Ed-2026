-- 0012_classes.sql — Spec 003 (Virtual Classes, Assignments & Assessments)
-- classes table + RLS (FR-001, FR-002, FR-015, FR-020).
--
-- Row-level access is intentionally narrow: a teacher sees only their own
-- classes; a student sees only classes they are actively enrolled in (never
-- browses others'); an admin sees everything. Column-level write restrictions
-- (which of join_code/status a non-admin may touch, and under what
-- eligibility) are NOT expressible in RLS and are handled by the
-- guard_class_updates() trigger in 0013 — this migration's UPDATE policy is
-- deliberately broad (any owner or admin) so that trigger has a row to narrow.

create table public.classes (
  id              uuid primary key default gen_random_uuid(),
  teacher_id      uuid not null references public.profiles(id),
  course_code     text not null check (course_code ~ '^[A-Z]{2,4}-[0-9]{3}(--)?$'),
  name            text not null,
  term_label      text not null,
  join_code       text unique,
  status          public.class_status not null default 'active',
  archived_reason text check (archived_reason in ('manual', 'role_change')),
  archived_at     timestamptz,
  created_at      timestamptz not null default now()
);

comment on table public.classes is
  'FR-001 — a teacher-owned virtual section of a course. archived_reason is '
  'informational/audit only, never read for authorization (see 0013).';

alter table public.classes enable row level security;

-- SELECT: owning teacher; admin. The third branch — a student actively
-- enrolled in this class (data-model.md "Implementation correction, found
-- during T013": enrollments alone carries no name/term/course_code, so a
-- student needs this to see their own class's details at all) — cannot live
-- here: it would forward-reference public.enrollments, which does not exist
-- until 0015 (enrollments.class_id FKs to classes, so classes must come
-- first). Found during T042 (applying migrations in strict numeric order for
-- the first time): CREATE POLICY resolves its expression's table references
-- at creation time, so this migration failed outright. Added as a second,
-- OR'd permissive policy — classes_select_enrolled_student — in 0015 once
-- enrollments exists.
create policy classes_select
  on public.classes
  for select
  to authenticated
  using (
    teacher_id = public.current_profile_id()
    or public.is_admin()
  );

-- INSERT: any currently-eligible teacher, only as themselves — FR-001.
create policy classes_insert
  on public.classes
  for insert
  to authenticated
  with check (
    teacher_id = public.current_profile_id()
    and public.is_eligible_teacher()
  );

-- UPDATE: owning teacher or admin may attempt to touch a row at all — this is
-- the ONLY thing that lets guard_class_updates() (0013) ever fire. That
-- trigger narrows which columns may change and under what eligibility; this
-- policy deliberately does not — see data-model.md's "RLS policies" section.
create policy classes_update
  on public.classes
  for update
  to authenticated
  using (
    teacher_id = public.current_profile_id()
    or public.is_admin()
  )
  with check (
    teacher_id = public.current_profile_id()
    or public.is_admin()
  );

-- No DELETE policy — deleting a class outright is out of scope (spec.md
-- Assumptions); archiving (status='archived') is the only supported close-out.

grant select, insert, update on public.classes to authenticated;
