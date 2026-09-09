-- 0038_student_notes.sql - Spec 011 (Dashboard redesign), US3 / FR-008, FR-009.
--
-- A signed-in student's private notes. One row per note. A note MAY be tagged to a
-- course, and optionally a unit and a topic, so a note added from a content page can be
-- filtered by course in the Notes area; course_code/unit_no/topic_no are unvalidated-by-FK
-- pointers into Git-tracked content, the same convention every course-scoped table has
-- used since Spec 003 (Art. V.1/V.4).
--
-- Role boundary mirrors self_assessment_checks after 0036: the write predicate checks
-- BOTH row ownership (student_id = current_profile_id()) AND caller role
-- (public.is_student()), so a teacher or admin can never create a note here, including one
-- naming their own profile id (Art. VIII.1, Art. IX.2). SELECT is owner-only - no admin
-- branch; a personal note is nobody else's business.

create table public.student_notes (
  id           uuid primary key default gen_random_uuid(),
  student_id   uuid not null references public.profiles(id) on delete cascade,
  course_code  text null,
  unit_no      integer null,
  topic_no     integer null,
  title        text null,
  body         text not null check (char_length(body) between 1 and 8000),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.student_notes is
  'Spec 011 FR-008 - one private note per row, owned by a student. course_code/unit_no/'
  'topic_no are optional unvalidated pointers into Git content so a page-anchored note can '
  'be filtered by course. body capped at 8000 chars.';

alter table public.student_notes enable row level security;

-- SELECT: the owning student only. No teacher, no admin.
create policy student_notes_select
  on public.student_notes
  for select
  to authenticated
  using (student_id = public.current_profile_id());

-- INSERT: own row only, AND the caller must currently hold the student role.
create policy student_notes_insert
  on public.student_notes
  for insert
  to authenticated
  with check (
    student_id = public.current_profile_id()
    and public.is_student()
  );

-- UPDATE: own row only (USING), and the caller must still hold the student role (WITH CHECK).
create policy student_notes_update
  on public.student_notes
  for update
  to authenticated
  using (student_id = public.current_profile_id())
  with check (
    student_id = public.current_profile_id()
    and public.is_student()
  );

-- DELETE: own row only.
create policy student_notes_delete
  on public.student_notes
  for delete
  to authenticated
  using (student_id = public.current_profile_id());

comment on policy student_notes_select on public.student_notes is
  'FR-008 - a note is visible only to the student who wrote it; no other role has a branch.';
comment on policy student_notes_insert on public.student_notes is
  'FR-008 - own row only AND the caller must currently be a student (mirrors '
  'self_assessment_checks_insert after 0036).';

grant select, insert, update, delete on public.student_notes to authenticated;

-- Bump updated_at on every edit. Reuses assignments' touch_updated_at() stamper (0017),
-- same as self_assessment_checks (0032).
create trigger student_notes_touch_updated_at
  before update on public.student_notes
  for each row
  execute function public.touch_updated_at();

create index student_notes_student_created_idx
  on public.student_notes (student_id, created_at desc);
create index student_notes_student_course_idx
  on public.student_notes (student_id, course_code);
