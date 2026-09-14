-- purge-orphan-profiles.sql - one-off remediation, NOT a migration.
--
-- Deletes profile rows stranded by `profiles_auth_user_id_fkey ON DELETE SET NULL`:
-- when an auth user is deleted without going through the delete-account Edge
-- Function, the FK nulls `auth_user_id` and the profile survives with
-- `deleted_at` still null. Not a tombstone - just a row nothing can reach and
-- nothing will ever clean up.
--
-- WHY IT IS SAFE. The predicate `auth_user_id is null and deleted_at is null`
-- cannot match a real account:
--   * every live profile has auth_user_id set (the 0007 signup trigger sets it,
--     and 0008 forbids a client from changing it);
--   * a genuinely deleted account is tombstoned by the delete-account function,
--     which sets deleted_at - those rows are kept deliberately (FR-021), so
--     teacher gradebooks referencing them stay intact;
--   * the only way to land in between is deleting the auth row directly, which
--     in this project means a test fixture.
--
-- WHY DEPENDENTS FIRST. Almost every table referencing profiles(id) is NO
-- ACTION, so one unit_progress row is enough to abort the whole delete.
-- privilege_audit.subject_id is absent because it is already ON DELETE CASCADE.
--
-- Run inside a transaction, after a pg_dump. Applied 2026-09-14: 29,380 rows,
-- against 227 real profiles and 237 real tombstones.
--
--   docker exec -i supabase-db psql -U postgres -d postgres -v ON_ERROR_STOP=1 \
--     --single-transaction < scripts/ops/purge-orphan-profiles.sql
--
-- THE LEAK ITSELF is fixed in tests/rls/_helpers.mjs and tests/e2e/_cleanup.ts,
-- which now delete a fixture's dependents and its profile. Without that fix this
-- script buys about a week: CI runs both suites against the live project on
-- every push, and the rate was roughly 5,000 rows a day.

create temporary table orphan_profiles on commit drop as
  select id from public.profiles where auth_user_id is null and deleted_at is null;

select count(*) as orphans_found from orphan_profiles;

delete from public.unit_progress          where student_id in (select id from orphan_profiles);
delete from public.student_achievements   where student_id in (select id from orphan_profiles);
delete from public.self_assessment_checks where student_id in (select id from orphan_profiles);
delete from public.quiz_attempts          where student_id in (select id from orphan_profiles);
delete from public.student_notes          where student_id in (select id from orphan_profiles);
delete from public.submissions            where student_id in (select id from orphan_profiles);
delete from public.enrollments            where student_id in (select id from orphan_profiles);
delete from public.grades                 where graded_by  in (select id from orphan_profiles);
delete from public.teaching_log_entries   where teacher_id in (select id from orphan_profiles);
delete from public.activity_feedback      where teacher_id in (select id from orphan_profiles);
delete from public.improvement_suggestions where teacher_id in (select id from orphan_profiles);
delete from public.assignment_templates   where teacher_id in (select id from orphan_profiles);
delete from public.content_feedback       where author_id  in (select id from orphan_profiles);
delete from public.quiz_items             where created_by in (select id from orphan_profiles);
delete from public.answer_keys            where created_by in (select id from orphan_profiles);
delete from public.classes                where teacher_id in (select id from orphan_profiles);

delete from public.profiles where id in (select id from orphan_profiles);

select count(*) as orphans_remaining from public.profiles where auth_user_id is null and deleted_at is null;
