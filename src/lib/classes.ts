import { getSupabase } from '@site/src/lib/supabase';
import type { Class, Enrollment } from '@site/src/lib/types';

/**
 * Class CRUD + roster operations (Spec 003, T018/T068/T075).
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) - every function here is
 * a thin wrapper around a PostgREST call or the `join_class_by_code` RPC;
 * real authorization is RLS + the `guard_class_updates()`/
 * `guard_enrollment_updates()` triggers (supabase/migrations 0012-0016), not
 * anything in this file. A bug here would degrade UX, not security.
 */

const JOIN_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // R8 - excludes 0/O, 1/I
const JOIN_CODE_RETRY_LIMIT = 5; // 32^6 combinations - collision is a near-non-event (research.md R8)

function randomJoinCode(): string {
  let code = '';
  for (let i = 0; i < 6; i += 1) {
    code += JOIN_CODE_ALPHABET[Math.floor(Math.random() * JOIN_CODE_ALPHABET.length)];
  }
  return code;
}

export type Result<T> = { data: T | null; error: Error | null };

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

/** FR-001 - create a class with a fresh, unique join code (retried on the rare collision). */
export async function createClass(input: {
  teacherId: string;
  courseCode: string;
  name: string;
  termLabel: string;
}): Promise<Result<Class>> {
  const supabase = await client();
  let lastError: Error | null = null;
  for (let attempt = 0; attempt < JOIN_CODE_RETRY_LIMIT; attempt += 1) {
    const { data, error } = await supabase
      .from('classes')
      .insert({
        teacher_id: input.teacherId,
        course_code: input.courseCode,
        name: input.name,
        term_label: input.termLabel,
        join_code: randomJoinCode(),
      })
      .select()
      .single();
    if (!error) return { data: data as Class, error: null };
    if (error.code !== '23505') return { data: null, error };
    lastError = error;
  }
  return { data: null, error: lastError };
}

/** Teacher's own classes (any status), for the class list page. */
export async function listOwnClasses(teacherId: string): Promise<Result<Class[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .eq('teacher_id', teacherId)
    .order('created_at', { ascending: false });
  return { data: (data as Class[]) ?? null, error };
}

/** Classes a student is (or was) enrolled in, via their own enrollments rows. */
export async function listJoinedClasses(studentId: string): Promise<Result<(Enrollment & { classes: Class })[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('enrollments')
    .select('*, classes(*)')
    .eq('student_id', studentId)
    .order('joined_at', { ascending: false });
  return { data: (data as (Enrollment & { classes: Class })[]) ?? null, error };
}

/** FR-002 - reissue a class's join code; the old code stops matching any row. */
export async function reissueJoinCode(classId: string): Promise<Result<Class>> {
  const supabase = await client();
  let lastError: Error | null = null;
  for (let attempt = 0; attempt < JOIN_CODE_RETRY_LIMIT; attempt += 1) {
    const { data, error } = await supabase
      .from('classes')
      .update({ join_code: randomJoinCode() })
      .eq('id', classId)
      .select()
      .single();
    if (!error) return { data: data as Class, error: null };
    if (error.code !== '23505') return { data: null, error };
    lastError = error;
  }
  return { data: null, error: lastError };
}

/** FR-002 - revoke a class's join code; new joins fail, existing roster unaffected. */
export async function revokeJoinCode(classId: string): Promise<Result<Class>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('classes')
    .update({ join_code: null })
    .eq('id', classId)
    .select()
    .single();
  return { data: (data as Class) ?? null, error };
}

/** FR-015 - archive a class (manual). archived_reason must be 'manual' for a non-admin (0013 trigger). */
export async function archiveClass(classId: string): Promise<Result<Class>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('classes')
    .update({ status: 'archived', archived_reason: 'manual', archived_at: new Date().toISOString() })
    .eq('id', classId)
    .select()
    .single();
  return { data: (data as Class) ?? null, error };
}

/** FR-015/2026-07-19 clarification - reactivate an archived class (eligible teacher or admin only). */
export async function reactivateClass(classId: string): Promise<Result<Class>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('classes')
    .update({ status: 'active', archived_reason: null, archived_at: null })
    .eq('id', classId)
    .select()
    .single();
  return { data: (data as Class) ?? null, error };
}

export type JoinClassOutcome = { classId: string; alreadyEnrolled: boolean };
export type JoinClassErrorKind = 'not_signed_in' | 'invalid_code' | 'removed' | 'unknown';

/**
 * Classify `join_class_by_code`'s RPC error into a UI-mappable kind. The RPC
 * (migration 0016) raises short, machine-parseable messages, the same
 * convention src/lib/authErrors.ts uses for GoTrue errors.
 */
export function classifyJoinError(error: unknown): JoinClassErrorKind {
  const message = (error as { message?: string } | null | undefined)?.message ?? '';
  if (message.includes('not_signed_in')) return 'not_signed_in';
  if (message.includes('invalid_or_expired_join_code')) return 'invalid_code';
  if (message.includes('removed_from_class')) return 'removed';
  return 'unknown';
}

/** FR-003 - join a class by its code. See classifyJoinError for failure handling. */
export async function joinClassByCode(code: string): Promise<Result<JoinClassOutcome>> {
  const supabase = await client();
  const { data, error } = await supabase.rpc('join_class_by_code', { p_code: code });
  if (error) return { data: null, error };
  const outcome = data as { class_id: string; already_enrolled: boolean };
  return { data: { classId: outcome.class_id, alreadyEnrolled: outcome.already_enrolled }, error: null };
}

/** FR-018 - remove a student from the caller's own class. */
export async function removeStudent(enrollmentId: string): Promise<Result<Enrollment>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('enrollments')
    .update({ status: 'removed', removed_at: new Date().toISOString() })
    .eq('id', enrollmentId)
    .select()
    .single();
  return { data: (data as Enrollment) ?? null, error };
}

/** FR-022 - restore a student previously removed from the caller's own class. */
export async function restoreStudent(enrollmentId: string): Promise<Result<Enrollment>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('enrollments')
    .update({ status: 'active', removed_at: null })
    .eq('id', enrollmentId)
    .select()
    .single();
  return { data: (data as Enrollment) ?? null, error };
}

export type RosterRow = Enrollment & { profiles: { full_name: string | null } | null };

/**
 * Roster (all enrollments, active and removed) for a class the caller owns,
 * with each student's display name embedded via `profiles_select_own_students`
 * (migration 0015 - see data-model.md's "Second implementation correction").
 */
export async function listRoster(classId: string): Promise<Result<RosterRow[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('enrollments')
    .select('*, profiles(full_name)')
    .eq('class_id', classId)
    .order('joined_at', { ascending: true });
  return { data: (data as RosterRow[]) ?? null, error };
}
