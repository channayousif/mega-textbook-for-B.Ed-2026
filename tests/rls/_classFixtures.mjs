/**
 * RLS fixture helpers for Spec 003 (Virtual Classes, Assignments & Assessments).
 *
 * Builds on Spec 002's tests/rls/_helpers.mjs (per-role authenticated clients,
 * service-role fixture access) — reused unmodified, not duplicated. These
 * helpers use the SERVICE ROLE to set up state directly (bypassing RLS),
 * exactly like _helpers.mjs's `adminSet` — fixture setup only, never used to
 * assert what a real caller *may* do. Assertions must always go through a
 * real signed-in client (`createSignedInUser`, `signIn`).
 */

import { serviceClient, getProfileByAuthId } from './_helpers.mjs';

const JOIN_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // R8 — excludes 0/O, 1/I

export function randomJoinCode() {
  let code = '';
  for (let i = 0; i < 6; i += 1) {
    code += JOIN_CODE_ALPHABET[Math.floor(Math.random() * JOIN_CODE_ALPHABET.length)];
  }
  return code;
}

/** Create a class as the given teacher (service role, bypasses RLS — fixture setup). */
export async function createClassFixture(teacherAuthUserId, overrides = {}) {
  const svc = serviceClient();
  const teacherProfile = await getProfileByAuthId(teacherAuthUserId);
  const { data, error } = await svc
    .from('classes')
    .insert({
      teacher_id: teacherProfile.id,
      course_code: overrides.course_code ?? 'EFMP-301',
      name: overrides.name ?? 'Fixture Class',
      term_label: overrides.term_label ?? 'Fall 2026',
      join_code: overrides.join_code === undefined ? randomJoinCode() : overrides.join_code,
      status: overrides.status ?? 'active',
      archived_reason: overrides.archived_reason ?? null,
      archived_at: overrides.archived_at ?? null,
    })
    .select()
    .single();
  if (error) throw new Error(`createClassFixture: ${error.message}`);
  return data;
}

/** Enroll a student in a class (service role — fixture setup, bypasses join_class_by_code). */
export async function createEnrollmentFixture(classId, studentAuthUserId, overrides = {}) {
  const svc = serviceClient();
  const studentProfile = await getProfileByAuthId(studentAuthUserId);
  const { data, error } = await svc
    .from('enrollments')
    .insert({
      class_id: classId,
      student_id: studentProfile.id,
      status: overrides.status ?? 'active',
      removed_at: overrides.removed_at ?? null,
    })
    .select()
    .single();
  if (error) throw new Error(`createEnrollmentFixture: ${error.message}`);
  return data;
}

/**
 * Create an assignment in a class (service role — fixture setup). Used
 * starting in US2 (migration 0017); harmless to define now, errors only if
 * called before that migration exists.
 */
export async function createAssignmentFixture(classId, overrides = {}) {
  const svc = serviceClient();
  const dueAt = overrides.due_at ?? new Date(Date.now() + 60 * 60 * 1000).toISOString();
  const { data, error } = await svc
    .from('assignments')
    .insert({
      class_id: classId,
      source_kind: overrides.source_kind ?? 'custom',
      course_code: overrides.course_code ?? null,
      unit_no: overrides.unit_no ?? null,
      title: overrides.title ?? 'Fixture Assignment',
      instructions: overrides.instructions ?? null,
      due_at: dueAt,
      max_mark: overrides.max_mark ?? 100,
      allow_late: overrides.allow_late ?? false,
      published: overrides.published ?? true,
    })
    .select()
    .single();
  if (error) throw new Error(`createAssignmentFixture: ${error.message}`);
  return data;
}

/**
 * Delete fixture classes and anything that does not cascade with them.
 *
 * `enrollments.class_id` (0015) and `assignments.class_id` (0017) both declare
 * `on delete cascade`, and submissions/grades/quiz_attempts cascade from
 * assignments in turn - so those all go on their own.
 *
 * `teaching_log_entries.class_id` (0028) deliberately does NOT cascade: a log
 * entry is immutable by design, with no DELETE policy at all. That is the right
 * production posture and is not something a test helper should change, but it
 * means a bare `delete from classes` raises a foreign-key violation for any
 * class the teaching-log tests touched. Under the old `Promise.allSettled` that
 * rejection was discarded silently, so every such class survived cleanup and
 * accumulated in the database indefinitely - two per CI run, and the stranded
 * rows eventually collided with the suite's own fixture join codes and took
 * `main` red. Delete the log entries first (service role bypasses RLS for
 * fixture teardown, exactly as elsewhere in this file), then the class.
 *
 * Errors are collected and thrown rather than swallowed: cleanup that fails
 * quietly is what let this go unnoticed for as long as it did.
 */
export async function cleanupClasses(classIds = []) {
  const svc = serviceClient();
  const ids = classIds.filter(Boolean);
  if (ids.length === 0) return;

  const failures = [];

  // Non-cascading dependents first.
  const { error: logError } = await svc.from('teaching_log_entries').delete().in('class_id', ids);
  if (logError) failures.push(`teaching_log_entries: ${logError.message}`);

  const results = await Promise.all(
    ids.map(async (id) => {
      const { error } = await svc.from('classes').delete().eq('id', id);
      return error ? `classes(${id}): ${error.message}` : null;
    }),
  );
  failures.push(...results.filter(Boolean));

  if (failures.length > 0) {
    throw new Error(`cleanupClasses left rows behind:\n  ${failures.join('\n  ')}`);
  }
}
