-- 0029_activity_feedback.sql — Spec 005 (Teacher Dashboard, Feedback & Book
-- Improvement Loop) — activity_feedback table + RLS (FR-007, FR-008).
--
-- One row per teacher per book activity they have rated. A repeat
-- submission UPDATES the existing row (upsert), it does not error or create
-- a second row (2026-07-24 clarification, data-model.md). Unlike
-- teaching_log_entries, this record IS revisable — both INSERT and UPDATE
-- policies exist to support `on conflict ... do update`.

create table public.activity_feedback (
  id              uuid primary key default gen_random_uuid(),
  teacher_id      uuid not null references public.profiles(id),
  course_code     text not null,
  unit_no         integer not null,
  source_kind     text not null check (source_kind in ('activity', 'formative', 'summative')),
  rating          integer not null check (rating between 1 and 5),
  what_worked     text,
  what_didnt      text,
  actual_minutes  integer not null check (actual_minutes > 0),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (teacher_id, course_code, unit_no, source_kind)
);

comment on table public.activity_feedback is
  'FR-007 — one record per teacher per book activity they have rated: a 1-5 '
  'rating, free-text notes on what worked/didn''t, and actual time taken. '
  'Revisable — a repeat rating updates this one record (data-model.md).';

alter table public.activity_feedback enable row level security;

-- SELECT: the owning teacher (own rows only) or admin (all rows — FR-008
-- requires admin to aggregate across every teacher, not merely support
-- read). No other teacher may read another teacher's individual row.
create policy activity_feedback_select
  on public.activity_feedback
  for select
  to authenticated
  using (
    public.is_admin()
    or teacher_id = public.current_profile_id()
  );

create policy activity_feedback_insert
  on public.activity_feedback
  for insert
  to authenticated
  with check (teacher_id = public.current_profile_id());

-- UPDATE: owning teacher only, own row — supports the upsert path
-- (`insert ... on conflict (...) do update`) from the client.
create policy activity_feedback_update
  on public.activity_feedback
  for update
  to authenticated
  using (teacher_id = public.current_profile_id())
  with check (teacher_id = public.current_profile_id());

-- No DELETE policy — nothing in the spec allows withdrawing feedback
-- entirely.

grant select, insert, update on public.activity_feedback to authenticated;

-- Reuses assignments' touch_updated_at() stamper (0017) — bumps updated_at
-- on every upsert-driven UPDATE.
create trigger activity_feedback_touch_updated_at
  before update on public.activity_feedback
  for each row
  execute function public.touch_updated_at();
