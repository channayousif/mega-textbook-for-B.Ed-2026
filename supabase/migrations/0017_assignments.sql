-- 0017_assignments.sql — Spec 003 (Virtual Classes, Assignments & Assessments)
-- assignments table + RLS (FR-004, FR-005, FR-006, FR-015, FR-021).
--
-- `source_kind='quiz'` IS the auto-graded assignment type (scored via
-- quiz_attempts/submit_quiz_attempt, US6) — no separate auto_graded column;
-- nothing here restricts a quiz assignment's max_mark or otherwise treats it
-- as lower-stakes (2026-07-19 clarification, see data-model.md).

create table public.assignments (
  id           uuid primary key default gen_random_uuid(),
  class_id     uuid not null references public.classes(id) on delete cascade,
  source_kind  text not null check (source_kind in ('activity', 'formative', 'summative', 'custom', 'quiz')),
  course_code  text,
  unit_no      integer,
  title        text not null,
  instructions text,
  due_at       timestamptz not null,
  max_mark     numeric(6,2) not null check (max_mark > 0),
  allow_late   boolean not null default false,
  published    boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  check (source_kind = 'custom' or (course_code is not null and unit_no is not null))
);

comment on table public.assignments is
  'FR-004 — a piece of work a teacher publishes to a class, drawn from a unit '
  'item (activity/formative/summative/quiz) or created as a custom assignment.';

alter table public.assignments enable row level security;

-- SELECT: owning teacher (any state, incl. unpublished — FR-005/FR-006);
-- an actively-enrolled student, but only published rows; admin (read-only).
create policy assignments_select
  on public.assignments
  for select
  to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.classes c
      where c.id = assignments.class_id and c.teacher_id = public.current_profile_id()
    )
    or (
      published = true
      and exists (
        select 1 from public.enrollments e
        where e.class_id = assignments.class_id
          and e.student_id = public.current_profile_id()
          and e.status = 'active'
      )
    )
  );

-- INSERT/UPDATE: owning teacher only, and only while the parent class is
-- active (FR-015 — archived classes are fully read-only). enforce_active_class()
-- below is a defense-in-depth re-check against the class being archived
-- mid-request, not a substitute for this policy.
create policy assignments_insert
  on public.assignments
  for insert
  to authenticated
  with check (
    exists (
      select 1 from public.classes c
      where c.id = assignments.class_id
        and c.teacher_id = public.current_profile_id()
        and c.status = 'active'
    )
  );

-- USING deliberately checks ownership only, NOT c.status — found during T042
-- (first real run against Postgres): a USING clause that excludes the row
-- makes UPDATE silently affect 0 rows with no error (PostgREST returns 200,
-- empty data), which is a FAILURE per this project's own "the caller must
-- learn the write failed" rule (see tests/rls/_helpers.mjs). Leaving
-- ownership-only in USING lets the row through to enforce_active_class()
-- below, which raises a clear, specific error instead. WITH CHECK still
-- re-asserts the active-class requirement as defense-in-depth.
create policy assignments_update
  on public.assignments
  for update
  to authenticated
  using (
    exists (
      select 1 from public.classes c
      where c.id = assignments.class_id
        and c.teacher_id = public.current_profile_id()
    )
  )
  with check (
    exists (
      select 1 from public.classes c
      where c.id = assignments.class_id
        and c.teacher_id = public.current_profile_id()
        and c.status = 'active'
    )
  );

grant select, insert, update on public.assignments to authenticated;

create or replace function public.enforce_active_class()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if not exists (select 1 from public.classes c where c.id = new.class_id and c.status = 'active') then
    raise exception 'cannot create or modify an assignment in an archived class'
      using errcode = '42501';
  end if;
  return new;
end;
$$;

comment on function public.enforce_active_class() is
  'FR-015 — re-validates the parent class is active on every assignments '
  'INSERT/UPDATE, defending the RLS policies above against a race where the '
  'class is archived mid-request.';

create trigger assignments_enforce_active_class
  before insert or update on public.assignments
  for each row
  execute function public.enforce_active_class();

-- Reusable updated_at stamper — also used by grades (US3, migration 0020).
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger assignments_touch_updated_at
  before update on public.assignments
  for each row
  execute function public.touch_updated_at();
