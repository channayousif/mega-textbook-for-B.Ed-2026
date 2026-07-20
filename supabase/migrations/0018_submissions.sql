-- 0018_submissions.sql — Spec 003 (Virtual Classes, Assignments & Assessments)
-- submissions table + RLS (FR-007, FR-008, FR-012, 2026-07-19 resubmission clarification).
--
-- `late` is computed SERVER-SIDE by a trigger, never trusted from the client
-- — eliminates any possible client-clock/server-clock mismatch at the
-- boundary, and removes the need for the INSERT policy to independently
-- re-verify the client's claimed value bit-for-bit.

create table public.submissions (
  id              uuid primary key default gen_random_uuid(),
  assignment_id   uuid not null references public.assignments(id) on delete cascade,
  student_id      uuid not null references public.profiles(id),
  text_content    text,
  file_path       text,
  file_name       text,
  file_mime       text,
  file_size_bytes integer,
  submitted_at    timestamptz not null default now(),
  late            boolean not null default false,
  unique (assignment_id, student_id),
  check (text_content is not null or file_path is not null)
);

comment on table public.submissions is
  'FR-007 — a student''s response to an assignment. One row per (assignment, '
  'student): resubmission overwrites in place, no version history kept '
  '(2026-07-19 clarification). Locked once the due date passes — see the '
  'UPDATE policy below.';

alter table public.submissions enable row level security;

-- SELECT: the submitting student (own row); the owning teacher of the
-- parent class (all submissions for their own assignments); admin.
create policy submissions_select
  on public.submissions
  for select
  to authenticated
  using (
    public.is_admin()
    or student_id = public.current_profile_id()
    or exists (
      select 1 from public.assignments a
      join public.classes c on c.id = a.class_id
      where a.id = submissions.assignment_id
        and c.teacher_id = public.current_profile_id()
    )
  );

-- INSERT (first submission): the student themselves, actively enrolled in
-- the assignment's class, the assignment published, and — if the trigger
-- below has computed this as late — only when the assignment allows it.
create policy submissions_insert
  on public.submissions
  for insert
  to authenticated
  with check (
    student_id = public.current_profile_id()
    and exists (
      select 1 from public.assignments a
      join public.enrollments e on e.class_id = a.class_id
      where a.id = submissions.assignment_id
        and a.published = true
        and e.student_id = public.current_profile_id()
        and e.status = 'active'
        and (submissions.late = false or a.allow_late = true)
    )
  );

-- UPDATE (resubmission): the owning student, and only while now() <= the
-- assignment's due_at — regardless of whether the original submission was
-- itself on-time or late (2026-07-19 clarification). guard_submission_updates()
-- below narrows which columns a resubmission may actually change.
create policy submissions_update
  on public.submissions
  for update
  to authenticated
  using (
    student_id = public.current_profile_id()
    and exists (
      select 1 from public.assignments a
      where a.id = submissions.assignment_id and now() <= a.due_at
    )
  )
  with check (
    student_id = public.current_profile_id()
  );

-- No DELETE policy — nothing in the spec allows withdrawing a submission
-- entirely (only overwriting its content via UPDATE).

grant select, insert, update on public.submissions to authenticated;

create or replace function public.compute_submission_late()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  assignment_due_at timestamptz;
begin
  select due_at into assignment_due_at from public.assignments where id = new.assignment_id;
  new.late := (now() > assignment_due_at);
  return new;
end;
$$;

comment on function public.compute_submission_late() is
  'FR-008 — computes `late` server-side at INSERT time from the assignment''s '
  'due_at, never trusted from the client. Never re-fires on UPDATE (late is '
  'set once, per data-model.md); guard_submission_updates() rejects any '
  'attempt to change it directly on a resubmission.';

create trigger submissions_compute_late
  before insert on public.submissions
  for each row
  execute function public.compute_submission_late();

-- Column-level narrowing (same pattern as guard_enrollment_updates(), 0015):
-- the UPDATE policy above is broad at the row level (any of the owning
-- student's own rows, before the due date) — this restricts a resubmission
-- to the content columns only, so a crafted UPDATE cannot reassign the
-- submission to a different assignment, forge `late`, or backdate `submitted_at`.
create or replace function public.guard_submission_updates()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if public.is_admin() then
    return new;
  end if;

  if new.assignment_id is distinct from old.assignment_id
     or new.student_id is distinct from old.student_id
     or new.submitted_at is distinct from old.submitted_at
     or new.late is distinct from old.late then
    raise exception 'only submission content may change when resubmitting'
      using errcode = '42501';
  end if;

  return new;
end;
$$;

create trigger submissions_guard_updates
  before update on public.submissions
  for each row
  execute function public.guard_submission_updates();
