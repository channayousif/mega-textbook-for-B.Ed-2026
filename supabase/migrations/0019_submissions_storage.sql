-- 0019_submissions_storage.sql — Spec 003 (Virtual Classes, Assignments & Assessments)
-- `submissions` Storage bucket + policies (FR-009).
--
-- Object path convention: `{assignment_id}/{student_id}/{filename}` (data-model.md).
-- Each upload uses a fresh path (the client includes a timestamp in `filename`)
-- rather than overwriting the same Storage object in place — a resubmission's
-- `submissions.file_path` column simply points at the new object. This means
-- only SELECT (download) and INSERT (upload) policies are needed here; no
-- UPDATE/DELETE on storage.objects.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'submissions',
  'submissions',
  false,
  10485760, -- 10 MB, FR-009
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg'
  ]
)
on conflict (id) do nothing;

-- Authorizes a download by ownership (the submitting student) or class
-- ownership (the assignment's teacher) or admin. Returns false (denies)
-- rather than erroring on a malformed path, since a path that doesn't match
-- the convention can never legitimately belong to anyone.
create or replace function public.can_access_submission_file(path text)
returns boolean
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
declare
  path_assignment_id uuid;
  path_student_id    uuid;
begin
  path_assignment_id := split_part(path, '/', 1)::uuid;
  path_student_id := split_part(path, '/', 2)::uuid;

  return (
    path_student_id = public.current_profile_id()
    or public.is_admin()
    or exists (
      select 1 from public.assignments a
      join public.classes c on c.id = a.class_id
      where a.id = path_assignment_id
        and c.teacher_id = public.current_profile_id()
    )
  );
exception when others then
  return false;
end;
$$;

comment on function public.can_access_submission_file(text) is
  'FR-009 — authorizes downloading a submissions-bucket object by ownership '
  '(the submitting student, parsed from the path) or the owning teacher of '
  'the assignment''s class. Denies (does not error) on a malformed path.';

revoke all on function public.can_access_submission_file(text) from public;
grant execute on function public.can_access_submission_file(text) to authenticated;

create policy submissions_bucket_select
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'submissions'
    and public.can_access_submission_file(name)
  );

-- INSERT: a student may only upload under a path whose student_id segment is
-- their own profile id — ownership scoping only. The legitimacy of the
-- resulting submission (enrollment, published, deadline) is enforced
-- separately and fully by the `submissions` table's own INSERT policy (0018);
-- this policy does not duplicate that logic.
create policy submissions_bucket_insert
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'submissions'
    and split_part(name, '/', 2) = public.current_profile_id()::text
  );
