/**
 * T070 [US1] — an owning teacher removes a student from their own class →
 * the student immediately loses view/submit access to that class and its
 * assignments; a teacher cannot remove a student from another teacher's
 * class; the removed student's prior submissions/grades remain intact and
 * teacher-visible (none exist yet in this US1-only scope — asserted properly
 * once US2/US3 land); the removed student re-entering the class's still-valid
 * join code via join_class_by_code is rejected with a distinct "you were
 * removed" message and does NOT reactivate the enrollment
 * (FR-018, SC-004, 2026-07-19 clarification).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, serviceClient, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, createEnrollmentFixture, cleanupClasses } from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('student removal from a class', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('owning teacher removes a student; student immediately loses class access', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: 'REM001' });
    createdClasses.push(klass.id);

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const enrollment = await createEnrollmentFixture(klass.id, student.authUserId);

    const { error: removeError } = await teacher.client
      .from('enrollments')
      .update({ status: 'removed', removed_at: new Date().toISOString() })
      .eq('id', enrollment.id);
    expect(removeError).toBeNull();

    const { data: classView } = await student.client.from('classes').select('*').eq('id', klass.id);
    expect(classView).toHaveLength(0);
  });

  test("a teacher cannot remove a student from another teacher's class", async () => {
    const owner = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(owner.authUserId);
    const klass = await createClassFixture(owner.authUserId, { join_code: 'REM002' });
    createdClasses.push(klass.id);

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const enrollment = await createEnrollmentFixture(klass.id, student.authUserId);

    const otherTeacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(otherTeacher.authUserId);

    const { data, error } = await otherTeacher.client
      .from('enrollments')
      .update({ status: 'removed', removed_at: new Date().toISOString() })
      .eq('id', enrollment.id)
      .select();
    expect(error).toBeNull(); // row invisible to non-owner — silent 0-row filter
    expect(data).toHaveLength(0);

    const svc = serviceClient();
    const { data: unchanged } = await svc.from('enrollments').select('status').eq('id', enrollment.id).single();
    expect(unchanged.status).toBe('active');
  });

  test('removed student re-entering the join code is rejected, not reactivated', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: 'REM003' });
    createdClasses.push(klass.id);

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const enrollment = await createEnrollmentFixture(klass.id, student.authUserId);
    await teacher.client
      .from('enrollments')
      .update({ status: 'removed', removed_at: new Date().toISOString() })
      .eq('id', enrollment.id);

    const { error } = await student.client.rpc('join_class_by_code', { p_code: 'REM003' });
    expect(error).toBeTruthy();
    expect(error.message).toContain('removed_from_class');

    const svc = serviceClient();
    const { data: stillRemoved } = await svc.from('enrollments').select('status').eq('id', enrollment.id).single();
    expect(stillRemoved.status).toBe('removed');
  });
});
