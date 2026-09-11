/**
 * T077 [US1] — an owning teacher restores a removed student: the student
 * immediately regains view access to the class; a teacher cannot restore a
 * student removed from another teacher's class (FR-022, SC-004).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, serviceClient, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, createEnrollmentFixture, cleanupClasses } from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('student restoration after removal', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('owning teacher restores a removed student; access returns', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const enrollment = await createEnrollmentFixture(klass.id, student.authUserId, { status: 'removed' });

    const { data: beforeRestore } = await student.client.from('classes').select('*').eq('id', klass.id);
    expect(beforeRestore).toHaveLength(0);

    const { error: restoreError } = await teacher.client
      .from('enrollments')
      .update({ status: 'active', removed_at: null })
      .eq('id', enrollment.id);
    expect(restoreError).toBeNull();

    const { data: afterRestore } = await student.client.from('classes').select('*').eq('id', klass.id);
    expect(afterRestore).toHaveLength(1);
  });

  test("a teacher cannot restore a student removed from another teacher's class", async () => {
    const owner = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(owner.authUserId);
    const klass = await createClassFixture(owner.authUserId);
    createdClasses.push(klass.id);

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const enrollment = await createEnrollmentFixture(klass.id, student.authUserId, { status: 'removed' });

    const otherTeacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(otherTeacher.authUserId);

    const { data, error } = await otherTeacher.client
      .from('enrollments')
      .update({ status: 'active', removed_at: null })
      .eq('id', enrollment.id)
      .select();
    expect(error).toBeNull();
    expect(data).toHaveLength(0);

    const svc = serviceClient();
    const { data: stillRemoved } = await svc.from('enrollments').select('status').eq('id', enrollment.id).single();
    expect(stillRemoved.status).toBe('removed');
  });
});
