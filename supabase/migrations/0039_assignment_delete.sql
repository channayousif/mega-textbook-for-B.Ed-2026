-- 0039_assignment_delete.sql - Spec 011 (Dashboard redesign), US5 / FR-012.
--
-- Spec 003 granted the owning teacher SELECT/INSERT/UPDATE on assignments (0017) but no
-- DELETE - once created, an assignment could only be unpublished. Spec 011's teacher
-- makeover adds "delete an assignment that has NO submissions".
--
-- submissions.assignment_id references assignments(id) ON DELETE CASCADE (0018), so a bare
-- DELETE would silently take the submissions (and their grades) with it. FR-012 forbids
-- that: the policy's USING clause refuses the DELETE outright whenever any submission
-- exists, so the cascade can never fire on a graded/attempted assignment. The owning-
-- teacher predicate matches assignments_update (0017).

create policy assignments_delete
  on public.assignments
  for delete
  to authenticated
  using (
    exists (
      select 1 from public.classes c
      where c.id = assignments.class_id
        and c.teacher_id = public.current_profile_id()
    )
    and not exists (
      select 1 from public.submissions s
      where s.assignment_id = assignments.id
    )
  );

comment on policy assignments_delete on public.assignments is
  'Spec 011 FR-012 - the owning teacher may delete an assignment ONLY while it has zero '
  'submissions; with any submission the DELETE is refused (never a silent ON DELETE '
  'CASCADE of student work).';

grant delete on public.assignments to authenticated;
