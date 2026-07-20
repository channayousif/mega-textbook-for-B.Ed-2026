-- 0015_enrollments.sql — Spec 003 (Virtual Classes, Assignments & Assessments)
-- enrollments table + RLS (FR-003, FR-018, FR-022).
--
-- No direct client INSERT policy anywhere in this file: joining is
-- exclusively the join_class_by_code() SECURITY DEFINER RPC (0016), so a
-- student can never fabricate an enrollment for a class whose join_code they
-- have not actually used, and never browses classes to pick one to enroll in.

create table public.enrollments (
  id         uuid primary key default gen_random_uuid(),
  class_id   uuid not null references public.classes(id) on delete cascade,
  student_id uuid not null references public.profiles(id),
  status     public.enrollment_status not null default 'active',
  joined_at  timestamptz not null default now(),
  removed_at timestamptz,
  unique (class_id, student_id)
);

comment on table public.enrollments is
  'FR-003 — a student''s membership in a class. Rows are created only by '
  'join_class_by_code() (0016); status is toggled only by the owning teacher '
  '(remove/restore, FR-018/FR-022) or an admin.';

alter table public.enrollments enable row level security;

-- SECURITY DEFINER helpers breaking the classes<->enrollments RLS cycle
-- (found during T042 — applying these migrations against a real Postgres
-- instance for the first time raised `42P17 infinite recursion detected in
-- policy for relation "enrollments"`): a plain policy on `classes` querying
-- `enrollments`, combined with a plain policy on `enrollments` querying
-- `classes`, is exactly the cross-table version of the same-table recursion
-- trap 0004_is_admin.sql already documents for `profiles`. SECURITY DEFINER
-- bypasses RLS for these two lookups only, the same pattern as
-- current_profile_id()/is_admin(), so evaluating one table's policy never
-- re-enters the other's.
create or replace function public.is_actively_enrolled(p_class_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.enrollments e
    where e.class_id = p_class_id
      and e.student_id = public.current_profile_id()
      and e.status = 'active'
  );
$$;

create or replace function public.owns_class(p_class_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.classes c
    where c.id = p_class_id
      and c.teacher_id = public.current_profile_id()
  );
$$;

revoke all on function public.is_actively_enrolled(uuid) from public;
revoke all on function public.owns_class(uuid) from public;
grant execute on function public.is_actively_enrolled(uuid) to authenticated;
grant execute on function public.owns_class(uuid) to authenticated;

-- Second, OR'd permissive policy on public.classes (0012 could not include
-- this branch — it would have forward-referenced this table before it
-- existed; see 0012's classes_select comment, found during T042): a student
-- actively enrolled in a class may see that class's own row (name/term/
-- course_code), same as data-model.md's original intent. A removed
-- student's status is no longer 'active', so this access — and the
-- join_code visible through it — is revoked immediately, same as FR-018's
-- other consequences.
create policy classes_select_enrolled_student
  on public.classes
  for select
  to authenticated
  using (
    public.is_actively_enrolled(classes.id)
  );

-- SELECT: the owning teacher of the parent class (any status, for the
-- roster); the enrolled student themselves (their own row only); admin.
create policy enrollments_select
  on public.enrollments
  for select
  to authenticated
  using (
    public.is_admin()
    or student_id = public.current_profile_id()
    or public.owns_class(enrollments.class_id)
  );

-- UPDATE: only the owning teacher of the parent class, or admin. Removal
-- (FR-018) and restoration (FR-022) both go through this one policy;
-- guard_enrollment_updates() below narrows which columns.
create policy enrollments_update
  on public.enrollments
  for update
  to authenticated
  using (
    public.is_admin()
    or public.owns_class(enrollments.class_id)
  )
  with check (
    public.is_admin()
    or public.owns_class(enrollments.class_id)
  );

grant select, update on public.enrollments to authenticated;

-- Column-level narrowing (found during implementation — data-model.md's
-- "Implementation correction"): the UPDATE policy above is intentionally
-- broad at the row level (any row in a class the caller owns), but a fully
-- open UPDATE would let a teacher's crafted request reassign class_id or
-- student_id, effectively moving the enrollment to a different student or a
-- different class (including one they do not own). Only status/removed_at
-- are meant to be teacher-editable.
create or replace function public.guard_enrollment_updates()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if public.is_admin() then
    return new;
  end if;

  if new.class_id is distinct from old.class_id
     or new.student_id is distinct from old.student_id
     or new.joined_at is distinct from old.joined_at then
    raise exception 'only status/removed_at may be changed on an enrollment'
      using errcode = '42501';
  end if;

  return new;
end;
$$;

comment on function public.guard_enrollment_updates() is
  'FR-018/FR-022 — restricts non-admin enrollments UPDATEs to status/removed_at, '
  'narrowing the broader ownership-scoped row-level policy above.';

create trigger enrollments_guard_updates
  before update on public.enrollments
  for each row
  execute function public.guard_enrollment_updates();

-- Extends Spec 002's public.profiles RLS (found during implementation — data-
-- model.md's classes/enrollments design never accounted for how a teacher
-- would actually see a student's *name* on the roster: enrollments only
-- stores student_id, a profiles(id), and Spec 002's profiles policies only
-- ever granted a user their own row or admin all rows — nothing let a
-- teacher read an enrolled student's profile at all). Reads enrollments
-- directly (its RLS doesn't reference profiles, so no recursion) and defers
-- the class-ownership check to owns_class() — a SECURITY DEFINER lookup
-- rather than a plain subquery against classes, so evaluating this policy
-- never re-enters classes' own RLS.
create policy profiles_select_own_students
  on public.profiles
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.enrollments e
      where e.student_id = profiles.id
        and public.owns_class(e.class_id)
    )
  );
