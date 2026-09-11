-- 0042_assignment_delete_no_recursion.sql - Spec 011 (Dashboard redesign), fixes 0039.
--
-- 0039's assignments_delete policy tests `not exists (select 1 from public.submissions ...)`
-- directly in its USING clause. Evaluating that subquery applies submissions_select (0018),
-- which itself selects from `assignments` - and Postgres detects policy recursion per
-- RELATION, not per policy, so ANY delete on assignments failed outright with:
--
--   42P17: infinite recursion detected in policy for relation "assignments"
--
-- Caught by tests/rls/assignment-delete.test.mjs against the live database; the RLS suite
-- is the only place this shows up, since the policy is evaluated on DELETE alone and the
-- capability had not shipped yet.
--
-- Fix: move BOTH predicates into one SECURITY DEFINER function. Owned by postgres, so it
-- bypasses RLS on submissions/assignments/classes and the cycle never forms. Putting the
-- ownership check inside the function too (rather than leaving it in the policy and relying
-- on AND short-circuiting, which Postgres does not guarantee) means the function leaks
-- nothing: it returns false both for an assignment the caller does not own and for one that
-- has submissions, so a caller learns nothing about another teacher's data.

create or replace function public.can_delete_assignment(a_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select
    exists (
      select 1
      from public.assignments a
      join public.classes c on c.id = a.class_id
      where a.id = a_id
        and c.teacher_id = public.current_profile_id()
    )
    and not exists (
      select 1 from public.submissions s where s.assignment_id = a_id
    );
$$;

comment on function public.can_delete_assignment(uuid) is
  'Spec 011 FR-012 - true only when the caller owns the assignment''s class AND it has zero '
  'submissions. SECURITY DEFINER so the submissions probe does not re-enter assignments RLS '
  '(0039 deadlocked on 42P17). Returns false, never an error, for anything not deletable.';

revoke execute on function public.can_delete_assignment(uuid) from public;
grant execute on function public.can_delete_assignment(uuid) to authenticated;

drop policy assignments_delete on public.assignments;

create policy assignments_delete
  on public.assignments
  for delete
  to authenticated
  using (public.can_delete_assignment(assignments.id));

comment on policy assignments_delete on public.assignments is
  'Spec 011 FR-012 - the owning teacher may delete an assignment ONLY while it has zero '
  'submissions; with any submission the DELETE is refused (never a silent ON DELETE '
  'CASCADE of student work). Predicate lives in can_delete_assignment() to avoid the '
  'assignments -> submissions -> assignments policy recursion 0039 hit.';
