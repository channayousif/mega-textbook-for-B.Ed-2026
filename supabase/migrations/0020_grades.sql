-- 0020_grades.sql — Spec 003 (Virtual Classes, Assignments & Assessments)
-- grades table + RLS (FR-010, FR-011, FR-012, FR-019).
--
-- Grading and returning are one atomic action in this feature (US3 AS2) — a
-- `grades` row's existence *means* returned; there is no separate
-- ungraded-draft state (data-model.md — YAGNI, no spec requirement for one).

create table public.grades (
  id            uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique references public.submissions(id) on delete cascade,
  mark          numeric(6,2) not null check (mark >= 0),
  feedback      text,
  graded_by     uuid not null references public.profiles(id),
  graded_at     timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.grades is
  'FR-010 — a teacher''s mark + feedback for a submission, entered and '
  'returned to the student in one atomic action. A row''s existence means '
  '"graded/returned" (data-model.md); there is no separate draft state.';

alter table public.grades enable row level security;

-- SELECT: the grading teacher (via submission -> assignment -> class
-- ownership); the submission's own student (always — a grades row only ever
-- exists already-returned); admin (read-only). A tombstoned student's row
-- still resolves here unchanged — deletion strips profiles.full_name, not
-- this table (FR-019).
create policy grades_select
  on public.grades
  for select
  to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.submissions s
      where s.id = grades.submission_id and s.student_id = public.current_profile_id()
    )
    or exists (
      select 1 from public.submissions s
      join public.assignments a on a.id = s.assignment_id
      where s.id = grades.submission_id and public.owns_class(a.class_id)
    )
  );

-- INSERT/UPDATE: only the teacher who owns the submission's assignment's
-- class. enforce_max_mark() below rejects a mark exceeding the assignment's
-- max_mark (a cross-table rule a plain CHECK constraint cannot express).
create policy grades_insert
  on public.grades
  for insert
  to authenticated
  with check (
    exists (
      select 1 from public.submissions s
      join public.assignments a on a.id = s.assignment_id
      where s.id = grades.submission_id and public.owns_class(a.class_id)
    )
  );

create policy grades_update
  on public.grades
  for update
  to authenticated
  using (
    exists (
      select 1 from public.submissions s
      join public.assignments a on a.id = s.assignment_id
      where s.id = grades.submission_id and public.owns_class(a.class_id)
    )
  )
  with check (
    exists (
      select 1 from public.submissions s
      join public.assignments a on a.id = s.assignment_id
      where s.id = grades.submission_id and public.owns_class(a.class_id)
    )
  );

-- No DELETE policy — nothing in the spec allows un-returning a grade; only
-- editing its mark/feedback (FR-011).

grant select, insert, update on public.grades to authenticated;

create or replace function public.enforce_max_mark()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  assignment_max_mark numeric(6,2);
begin
  select a.max_mark into assignment_max_mark
  from public.assignments a
  join public.submissions s on s.assignment_id = a.id
  where s.id = new.submission_id;

  if new.mark > assignment_max_mark then
    raise exception 'mark exceeds the assignment''s max_mark'
      using errcode = '23514';
  end if;

  return new;
end;
$$;

comment on function public.enforce_max_mark() is
  'FR-010 edge case — rejects a grades.mark exceeding the parent '
  'assignment''s max_mark; a cross-table rule no plain CHECK can express.';

create trigger grades_enforce_max_mark
  before insert or update on public.grades
  for each row
  execute function public.enforce_max_mark();

-- Reuses assignments' touch_updated_at() stamper (0017) — bumps updated_at
-- on every UPDATE so an edited grade (FR-011) is distinguishable from the
-- original if ever needed for display, without touching graded_at.
create trigger grades_touch_updated_at
  before update on public.grades
  for each row
  execute function public.touch_updated_at();
