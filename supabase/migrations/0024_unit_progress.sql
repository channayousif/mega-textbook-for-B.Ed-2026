-- 0024_unit_progress.sql — Spec 004 (Student Dashboard)
-- unit_progress table + RLS (FR-005, FR-006). One row per student per unit,
-- capturing how it was completed. The unique constraint is what guarantees
-- FR-006's "counts toward coverage exactly once regardless of how many times
-- marked or through how many means" (data-model.md, research.md R3).
--
-- course_code/unit_no are unvalidated-by-FK pointers into Git-tracked content,
-- exactly like Spec 003's assignments.course_code/unit_no (Constitution Art.
-- V.1) — total units per course is derived client-side from
-- static/content-index.json, never stored here (research.md R1).

create type unit_progress_method as enum ('self_marked', 'assignment', 'quiz');

create table public.unit_progress (
  id           uuid primary key default gen_random_uuid(),
  student_id   uuid not null references public.profiles(id),
  course_code  text not null,
  unit_no      integer not null,
  method       unit_progress_method not null,
  occurred_at  timestamptz not null default now(),
  unique (student_id, course_code, unit_no)
);

comment on table public.unit_progress is
  'FR-005, FR-006 — one row per student per unit, capturing how it was first '
  'completed (self_marked, assignment, or quiz). The unique constraint is the '
  'sole mechanism enforcing "counts exactly once" — repeat writes from any '
  'source are no-ops via ON CONFLICT DO NOTHING (research.md R3).';

alter table public.unit_progress enable row level security;

-- SELECT: the owning student only, or admin (read-only support access). No
-- teacher access at all in this feature — coverage is more private here than
-- grades (FR-001; plan.md's Constitution Check, Art. VIII.1).
create policy unit_progress_select
  on public.unit_progress
  for select
  to authenticated
  using (
    public.is_admin()
    or student_id = public.current_profile_id()
  );

-- INSERT: only the owning student, and only self-marking. Rows with
-- method='assignment'/'quiz' are written exclusively by the SECURITY DEFINER
-- sync trigger functions in 0025, which bypass RLS entirely (table-owner
-- execution context) — this policy never needs to accommodate them.
create policy unit_progress_insert
  on public.unit_progress
  for insert
  to authenticated
  with check (
    student_id = public.current_profile_id()
    and method = 'self_marked'
  );

-- No UPDATE/DELETE policy — a unit-progress row, once it exists, is never
-- edited or removed by any actor. Re-marking is idempotent via
-- ON CONFLICT DO NOTHING at the application layer (src/lib/unitProgress.ts).

grant select, insert on public.unit_progress to authenticated;
