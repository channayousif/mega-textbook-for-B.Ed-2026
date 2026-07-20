-- 0022_quiz_items.sql — Spec 003 (Virtual Classes, Assignments & Assessments)
-- quiz_items table + quiz_items_public view (FR-013, FR-017, SC-004).
--
-- Unit-scoped multiple-choice question bank — an assignment with
-- source_kind='quiz' and a given (course_code, unit_no) draws on ALL
-- quiz_items for that unit (data-model.md), same "pick from a unit" shape as
-- activity/formative/summative, no separate per-assignment item-selection table.

create table public.quiz_items (
  id             uuid primary key default gen_random_uuid(),
  course_code    text not null,
  unit_no        integer not null,
  question_text  text not null,
  options        jsonb not null,
  correct_option text not null,
  created_by     uuid references public.profiles(id),
  created_at     timestamptz not null default now()
);

comment on table public.quiz_items is
  'FR-017 — a multiple-choice question bank entry for a unit. correct_option '
  'is NEVER read directly by a student- or unverified-teacher-facing query — '
  'see quiz_items_public below, and submit_quiz_attempt() (0023) for the only '
  'code path that ever reads it during a student interaction.';

alter table public.quiz_items enable row level security;

-- Full-row SELECT (including correct_option): verified teachers and admin
-- only — same gate as answer_keys (0021), same rationale (FR-013).
create policy quiz_items_select
  on public.quiz_items
  for select
  to authenticated
  using (
    public.is_verified_teacher()
    or public.is_admin()
  );

-- No INSERT/UPDATE/DELETE policy for any authenticated role — curriculum-
-- authority content work (Article II), same as answer_keys; admin manages
-- content directly, never through this feature's client-facing RLS surface.

grant select on public.quiz_items to authenticated;

-- quiz_items_public: every column EXCEPT correct_option, granted broadly —
-- practice-quiz *questions* are not confidential (only the *answer key* is,
-- FR-013), so any authenticated user (including students) may read them.
--
-- Deliberately created WITHOUT `security_invoker = true` (the Postgres 15+
-- default is already security_invoker = false, i.e. the view runs as its
-- OWNER, not the querying user): the migration-applying role (`postgres` on
-- this self-hosted instance) has rolbypassrls = true (verified directly —
-- `select rolbypassrls from pg_roles where rolname = current_user` returned
-- true), so this view fully bypasses quiz_items' RLS above and exposes every
-- row to any authenticated grantee regardless of verified_teacher status —
-- exactly the intended broader access. This is the OPPOSITE need from
-- quiz_best_scores (0023), which must instead run AS the querying user (so a
-- student only ever aggregates their own attempts) — that view explicitly
-- sets security_invoker = true. Getting these backwards in either direction
-- is a real security bug, not a style choice — flagged explicitly here as a
-- direct callback to this session's `assignments_update` USING/WITH CHECK
-- mixup (0017), so a future edit doesn't reintroduce the same class of error.
create view public.quiz_items_public as
  select id, course_code, unit_no, question_text, options, created_by, created_at
  from public.quiz_items;

comment on view public.quiz_items_public is
  'FR-017 — the quiz-taking UI''s read path: every quiz_items column except '
  'correct_option, readable by any authenticated user regardless of '
  'verified_teacher (relies on the view owner''s rolbypassrls — see inline '
  'comment on the CREATE VIEW statement above).';

grant select on public.quiz_items_public to authenticated;
