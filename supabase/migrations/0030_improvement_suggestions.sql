-- 0030_improvement_suggestions.sql — Spec 005 (Teacher Dashboard, Feedback &
-- Book Improvement Loop) — improvement_suggestions table + RLS (FR-003,
-- FR-004, FR-005).
--
-- page_slug/section_anchor/locale/course_code/unit_no are captured once, at
-- filing time, and never re-validated against the live content tree (edge
-- case: a page later renamed/removed keeps the suggestion's historical
-- record — data-model.md). unit_no is nullable: a suggestion filed from a
-- course-overview page (course_code present, no unit_no in front matter)
-- has unit_no = null — accepted, not rejected (2026-07-24 remediation,
-- research.md R1).

create type public.suggestion_category as enum (
  'typo', 'clarity', 'factual', 'pedagogy', 'translation', 'other'
);
create type public.suggestion_status as enum (
  'submitted', 'under_review', 'accepted', 'rejected', 'published'
);

create table public.improvement_suggestions (
  id              uuid primary key default gen_random_uuid(),
  teacher_id      uuid not null references public.profiles(id),
  page_slug       text not null,
  section_anchor  text,
  locale          text not null check (locale in ('en', 'ur')),
  course_code     text not null,
  unit_no         integer,
  category        public.suggestion_category not null,
  body            text not null,
  status          public.suggestion_status not null default 'submitted',
  admin_note      text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.improvement_suggestions is
  'FR-003 — one record per suggestion filed against a specific book '
  'page/section: category, body, filing teacher, status, optional admin '
  'note. Status moves one direction: submitted -> under_review -> '
  'accepted/rejected -> (accepted only) published.';

alter table public.improvement_suggestions enable row level security;

-- SELECT: the filing teacher (own rows) or admin (all rows — FR-005's
-- moderation queue). No other teacher may see another teacher's suggestion.
create policy improvement_suggestions_select
  on public.improvement_suggestions
  for select
  to authenticated
  using (
    public.is_admin()
    or teacher_id = public.current_profile_id()
  );

-- INSERT: any teacher, own row only, and always at status='submitted' — a
-- client cannot insert directly into any other status.
create policy improvement_suggestions_insert
  on public.improvement_suggestions
  for insert
  to authenticated
  with check (
    teacher_id = public.current_profile_id()
    and status = 'submitted'
  );

-- UPDATE: only an admin may update a row at all (FR-005: "only an admin
-- MUST be able to change a suggestion's status"). The filing teacher has no
-- update path whatsoever. enforce_suggestion_status_transition() (0031)
-- further narrows which columns and which status transitions this already-
-- permitted UPDATE may actually make.
create policy improvement_suggestions_update
  on public.improvement_suggestions
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- No DELETE policy.

grant select, insert, update on public.improvement_suggestions to authenticated;

-- Reuses assignments' touch_updated_at() stamper (0017) — bumps updated_at
-- on every status change (SC-002).
create trigger improvement_suggestions_touch_updated_at
  before update on public.improvement_suggestions
  for each row
  execute function public.touch_updated_at();
