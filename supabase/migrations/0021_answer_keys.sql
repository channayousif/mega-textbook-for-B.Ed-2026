-- 0021_answer_keys.sql — Spec 003 (Virtual Classes, Assignments & Assessments)
-- answer_keys table + RLS (FR-013, SC-004).
--
-- Reuses Spec 002's is_verified_teacher() (0010_verified_teacher_gate.sql)
-- unmodified — that migration's own comment says this is exactly the table
-- it was built ahead of. Standalone by (course_code, unit_no, kind), no FK
-- into assignments (data-model.md "Relationships") — looked up by the
-- content the teacher is currently grading, not tied to any one assignment.

create table public.answer_keys (
  id         uuid primary key default gen_random_uuid(),
  course_code text not null,
  unit_no    integer not null,
  kind       text not null check (kind in ('formative', 'summative')),
  content    text not null,
  created_by uuid references public.profiles(id),
  updated_at timestamptz not null default now(),
  unique (course_code, unit_no, kind)
);

comment on table public.answer_keys is
  'FR-013 — official answer key / marking rubric for a unit''s formative or '
  'summative assessment. SELECT-only for verified teachers/admin; content is '
  'curriculum-authority-managed (Article II), not client-writable in this feature.';

alter table public.answer_keys enable row level security;

-- SELECT: verified teachers and admin only — students denied under all
-- circumstances, unverified teachers too (FR-013, SC-004).
create policy answer_keys_select
  on public.answer_keys
  for select
  to authenticated
  using (
    public.is_verified_teacher()
    or public.is_admin()
  );

-- No INSERT/UPDATE/DELETE policy for any authenticated role — same
-- curriculum-authority rationale as quiz_items (data-model.md "Access");
-- admin manages content directly (service role / Studio), never through the
-- app's client-facing RLS surface.

grant select on public.answer_keys to authenticated;
