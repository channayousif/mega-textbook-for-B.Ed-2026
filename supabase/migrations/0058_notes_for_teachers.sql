-- Feature 034 T019 (#806): teachers keep personal notes too.
--
-- The floating notes widget on textbook pages serves students and teachers (owner request,
-- 2026-11-25). student_notes (0038) only let a caller holding the student role insert or update.
-- This adds is_teacher(), mirroring is_student() (0036), and widens the INSERT and UPDATE checks
-- to "student or teacher". Ownership is unchanged: every policy still requires
-- student_id = current_profile_id(), so a note stays private to the person who wrote it, and
-- admins still cannot write notes. The table keeps its name; student_id holds the author's
-- profile id for either role.

create or replace function public.is_teacher(uid uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.profiles p
    where p.auth_user_id = uid
      and p.role = 'teacher'
      and p.status = 'active'
      and p.deleted_at is null
  );
$$;

comment on function public.is_teacher(uuid) is
  'SECURITY DEFINER teacher-role check for RLS policies, mirroring is_student() (0036).';

revoke all on function public.is_teacher(uuid) from public;
grant execute on function public.is_teacher(uuid) to authenticated;

drop policy if exists student_notes_insert on public.student_notes;
create policy student_notes_insert
  on public.student_notes
  for insert
  to authenticated
  with check (
    student_id = public.current_profile_id()
    and (public.is_student() or public.is_teacher())
  );

drop policy if exists student_notes_update on public.student_notes;
create policy student_notes_update
  on public.student_notes
  for update
  to authenticated
  using (student_id = public.current_profile_id())
  with check (
    student_id = public.current_profile_id()
    and (public.is_student() or public.is_teacher())
  );

comment on policy student_notes_insert on public.student_notes is
  'Feature 034 (#806): own row only AND the caller must currently be a student or a teacher.';
comment on policy student_notes_update on public.student_notes is
  'Feature 034 (#806): own row only AND the caller must currently be a student or a teacher.';
