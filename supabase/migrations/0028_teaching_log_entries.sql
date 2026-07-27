-- 0028_teaching_log_entries.sql — Spec 005 (Teacher Dashboard, Feedback & Book
-- Improvement Loop) — teaching_log_entries table + RLS (FR-006).
--
-- course_code/unit_no/source_kind are unvalidated pointers into Git-tracked
-- content, exactly like Spec 003's assignments (research.md R2) — no FK, no
-- content table. A log entry, once created, is immutable — no UPDATE/DELETE
-- policy, matching Spec 004's unit_progress "no update policy at all"
-- precedent for a similarly one-shot record (data-model.md).

create table public.teaching_log_entries (
  id                uuid primary key default gen_random_uuid(),
  teacher_id        uuid not null references public.profiles(id),
  class_id          uuid not null references public.classes(id),
  course_code       text not null,
  unit_no           integer not null,
  source_kind       text not null check (source_kind in ('activity', 'formative', 'summative')),
  occurred_on       date not null,
  duration_minutes  integer not null check (duration_minutes > 0),
  reflection        text not null,
  created_at        timestamptz not null default now()
);

comment on table public.teaching_log_entries is
  'FR-006 — one record per logged classroom activity: which teacher, which '
  'class, which unit/activity, when it happened, how long it took, and the '
  'teacher''s own reflection note. Immutable once created.';

alter table public.teaching_log_entries enable row level security;

-- SELECT: the owning teacher only; admin (read-only support). No student
-- access at all — a teacher's private log, denied like every other route in
-- this feature (FR-013).
create policy teaching_log_entries_select
  on public.teaching_log_entries
  for select
  to authenticated
  using (
    public.is_admin()
    or teacher_id = public.current_profile_id()
  );

-- INSERT: the owning teacher, and only for a class they themselves own
-- (public.owns_class(), 0015) — a teacher logging against a class they don't
-- own is rejected by this WITH CHECK, not left to the client to prevent.
create policy teaching_log_entries_insert
  on public.teaching_log_entries
  for insert
  to authenticated
  with check (
    teacher_id = public.current_profile_id()
    and public.owns_class(class_id)
  );

-- No UPDATE/DELETE policy — see table comment.

grant select, insert on public.teaching_log_entries to authenticated;
