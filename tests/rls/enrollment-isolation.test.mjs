/**
 * T011 [US1] — a teacher cannot see or manage another teacher's roster; a
 * student has no standing SELECT access to a class (including its
 * join_code) for a class they have not joined (FR-001 security posture, SC-004).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, createEnrollmentFixture, cleanupClasses } from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('enrollment and roster isolation', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test("a teacher cannot see or manage another teacher's roster", async () => {
    const owner = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(owner.authUserId);
    const klass = await createClassFixture(owner.authUserId);
    createdClasses.push(klass.id);

    const enrolledStudent = await createSignedInUser({ role: 'student' });
    createdUsers.push(enrolledStudent.authUserId);
    await createEnrollmentFixture(klass.id, enrolledStudent.authUserId);

    const otherTeacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(otherTeacher.authUserId);

    const { data: rosterView, error } = await otherTeacher.client
      .from('enrollments')
      .select('*')
      .eq('class_id', klass.id);
    expect(error).toBeNull();
    expect(rosterView).toHaveLength(0);

    const { data: classView } = await otherTeacher.client.from('classes').select('*').eq('id', klass.id);
    expect(classView).toHaveLength(0);
  });

  test('a student has no standing SELECT access to a class they have not joined', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);

    const outsider = await createSignedInUser({ role: 'student' });
    createdUsers.push(outsider.authUserId);

    const { data, error } = await outsider.client.from('classes').select('*').eq('id', klass.id);
    expect(error).toBeNull();
    expect(data).toHaveLength(0);
  });
});
