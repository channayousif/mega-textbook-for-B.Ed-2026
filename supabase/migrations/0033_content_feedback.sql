-- 0033_content_feedback.sql — Spec 010 (Curriculum-owner console)
-- content_feedback table + 3 enums + RLS (FR-010…FR-021; data-model.md).
--
-- A third, distinct feedback stream alongside Spec 005's activity_feedback (teacher
-- per-activity ratings) and improvement_suggestions (teacher-filed, admin-moderated) —
-- research.md R8 explains why these are not merged into one polymorphic table.
--
-- course_code/unit_no/topic_no are unvalidated-by-FK pointers into Git-tracked content
-- (Art. V.1/V.4), the same convention every course-scoped table has used since Spec 003.
-- author_role and the initial status are stamped/forced server-side, never client-
-- supplied (FR-014) — see 0034/0035 for the two guard triggers this table needs.

create type public.content_feedback_page_kind as enum (
  'topic', 'unit_opening', 'unit_assessment', 'unit_teacher_notes', 'course_review'
);
create type public.content_feedback_scope as enum ('whole_page', 'passage');
create type public.content_feedback_status as enum ('open', 'planned', 'resolved', 'declined');

create table public.content_feedback (
  id               uuid primary key default gen_random_uuid(),
  author_id        uuid not null references public.profiles(id),
  -- Stamped server-side by 0034's trigger from the inserting user's profiles.role —
  -- never trusted from the client payload (FR-014).
  author_role      text not null,
  page_kind        public.content_feedback_page_kind not null,
  course_code      text not null,
  unit_no          integer,
  topic_no         integer,
  locale           text not null check (locale in ('en', 'ur')),
  section_anchor   text,
  scope            public.content_feedback_scope not null,
  quoted_passage   text check (char_length(quoted_passage) <= 2000),
  passage_context  text check (char_length(passage_context) <= 2000),
  comment          text not null check (char_length(comment) <= 4000),
  status           public.content_feedback_status not null default 'open',
  owner_note       text,
  resolution_ref   text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  -- scope <-> quoted_passage pairing (FR-011).
  constraint content_feedback_scope_passage_pairing check (
    (scope = 'passage' and quoted_passage is not null)
    or (scope = 'whole_page' and quoted_passage is null)
  ),
  -- page_kind='topic' <=> topic_no is set.
  constraint content_feedback_topic_no_pairing check (
    (page_kind = 'topic') = (topic_no is not null)
  ),
  -- page_kind='course_review' <=> unit_no is null.
  constraint content_feedback_unit_no_pairing check (
    (page_kind = 'course_review') = (unit_no is null)
  )
);

comment on table public.content_feedback is
  'FR-010…FR-021 — one piece of reader feedback on one content page within a unit, with '
  'optional passage anchoring. A third, distinct feedback stream from '
  'improvement_suggestions/activity_feedback (research.md R8). quoted_passage is '
  'immutable once filed (enforced by 0035) so FR-021''s "stays visible even after the '
  'underlying topic text changed" holds regardless of later content edits.';

alter table public.content_feedback enable row level security;

-- SELECT: the filing reader (own rows) or admin (all rows, triage queue) — FR-015, FR-018.
create policy content_feedback_select
  on public.content_feedback
  for select
  to authenticated
  using (
    author_id = public.current_profile_id()
    or public.is_admin()
  );

-- INSERT: any signed-in reader, own row only, and always at status='open' — a client
-- cannot insert directly into any other status (FR-014).
create policy content_feedback_insert
  on public.content_feedback
  for insert
  to authenticated
  with check (
    author_id = public.current_profile_id()
    and status = 'open'
  );

-- UPDATE: admin only (FR-019) — no reader UPDATE policy exists at all, so a filing
-- reader can never edit their own already-submitted comment (Out of scope). 0035's
-- trigger further narrows which columns and which status transitions this already-
-- admin-only UPDATE may actually make.
create policy content_feedback_update
  on public.content_feedback
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- No DELETE policy.

grant select, insert, update on public.content_feedback to authenticated;
