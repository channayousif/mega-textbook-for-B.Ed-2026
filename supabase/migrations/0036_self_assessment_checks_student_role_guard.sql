-- 0036_self_assessment_checks_student_role_guard.sql — Spec 010 (Curriculum-owner console)
-- Closes a gap found during RLS regression testing after 0032 shipped:
-- self_assessment_checks_insert/_update only ever checked
-- `student_id = current_profile_id()`, with no role check at all. Since that predicate
-- is about ROW OWNERSHIP, not CALLER ROLE, a teacher could insert a row naming their own
-- profile.id as student_id, then read it straight back under the SELECT policy's own
-- `student_id = current_profile_id()` branch — silently defeating Art. VIII.1/FR-006's
-- "not even a teacher sees this, including their own data" guarantee for exactly the one
-- actor that guarantee exists to exclude. The client-side fix (DocItem/Content.tsx now
-- gates hydration on role === 'student') stops the honest frontend from ever attempting
-- this, but Constitution Art. IX.2 requires the guarantee hold at the database layer
-- regardless of what any client does — this migration is that enforcement.
--
-- Mirrors is_admin()'s shape (0004) — a narrow, SECURITY DEFINER boolean check, nothing more.

create or replace function public.is_student(uid uuid default auth.uid())
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
      and p.role = 'student'
      and p.status = 'active'
      and p.deleted_at is null
  );
$$;

comment on function public.is_student(uuid) is
  'SECURITY DEFINER student-role check for RLS policies, mirroring is_admin(). Used to keep '
  'self_assessment_checks a student-only table at the database layer, not only in the UI '
  '(Art. VIII.1, FR-006).';

revoke all on function public.is_student(uuid) from public;
grant execute on function public.is_student(uuid) to authenticated;

drop policy self_assessment_checks_insert on public.self_assessment_checks;
create policy self_assessment_checks_insert
  on public.self_assessment_checks
  for insert
  to authenticated
  with check (
    student_id = public.current_profile_id()
    and public.is_student()
  );

drop policy self_assessment_checks_update on public.self_assessment_checks;
create policy self_assessment_checks_update
  on public.self_assessment_checks
  for update
  to authenticated
  using (student_id = public.current_profile_id())
  with check (
    student_id = public.current_profile_id()
    and public.is_student()
  );

comment on policy self_assessment_checks_insert on public.self_assessment_checks is
  'FR-001, FR-006 — own row only, AND the caller must currently hold the student role. A '
  'teacher or admin can never create a row here, including one naming their own profile id.';

comment on policy self_assessment_checks_update on public.self_assessment_checks is
  'FR-009, FR-006 — own row only (USING), and the caller must still hold the student role for '
  'the write to succeed (WITH CHECK) — a student later promoted to teacher can no longer touch '
  'even their own historical rows.';
