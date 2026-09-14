import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Delete e2e fixture users AND their profile rows.
 *
 * `svc.auth.admin.deleteUser()` alone is not enough, which is not obvious and
 * cost the project 29,249 junk profiles against 227 real ones:
 * `profiles_auth_user_id_fkey` is ON DELETE SET NULL, so deleting the auth user
 * nulls the link and strands the profile with `deleted_at` still null - not a
 * tombstone, just an unreachable row nothing will ever clean up. CI runs this
 * suite against the live project on every push, so it leaked all day, every day.
 *
 * Resolve the profile ids BEFORE deleting the auth rows: afterwards
 * `auth_user_id` is null and the link is gone.
 *
 * Best-effort: a profile referenced by `classes.teacher_id` (NO ACTION) refuses
 * to delete, and teardown is the wrong place to throw over it.
 */
export async function deleteUsers(svc: SupabaseClient, ...authUserIds: (string | undefined | null)[]): Promise<void> {
  const ids = authUserIds.filter((id): id is string => Boolean(id));
  if (ids.length === 0) return;

  const { data: profiles } = await svc.from('profiles').select('id').in('auth_user_id', ids);
  await Promise.allSettled(ids.map((id) => svc.auth.admin.deleteUser(id)));

  const profileIds = (profiles ?? []).map((p: { id: string }) => p.id);
  if (profileIds.length === 0) return;

  // Dependents first: almost every table referencing profiles(id) is NO ACTION,
  // so one unit_progress row is enough to abort the profile delete. Kept in
  // step with the same list in tests/rls/_helpers.mjs - add a row in both when
  // a new table references profiles(id).
  const DEPENDENTS: [string, string][] = [
    ['unit_progress', 'student_id'],
    ['student_achievements', 'student_id'],
    ['self_assessment_checks', 'student_id'],
    ['quiz_attempts', 'student_id'],
    ['student_notes', 'student_id'],
    ['submissions', 'student_id'],
    ['enrollments', 'student_id'],
    ['grades', 'graded_by'],
    ['teaching_log_entries', 'teacher_id'],
    ['activity_feedback', 'teacher_id'],
    ['improvement_suggestions', 'teacher_id'],
    ['assignment_templates', 'teacher_id'],
    ['content_feedback', 'author_id'],
    ['quiz_items', 'created_by'],
    ['answer_keys', 'created_by'],
    ['classes', 'teacher_id'],
  ];
  for (const [table, column] of DEPENDENTS) {
    await svc.from(table).delete().in(column, profileIds);
  }

  const { error } = await svc.from('profiles').delete().in('id', profileIds);
  if (error) console.warn(`deleteUsers: ${profileIds.length} profile(s) survived - ${error.message}`);
}
