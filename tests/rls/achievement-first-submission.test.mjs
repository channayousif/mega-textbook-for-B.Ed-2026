/**
 * T032 [US6] — a student's first-ever submissions insert (any class) grants
 * first_submission; a second submission does not grant it again (SC-004).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, serviceClient, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses } from './_classFixtures.mjs';
import { createSubmissionFixture } from './_dashboardFixtures.mjs';

describe.skipIf(!rlsConfigured)('achievement — first submission', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('first-ever submission grants first_submission exactly once', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);
    const assignmentA = await createAssignmentFixture(klass.id, { published: true, title: 'First' });
    const assignmentB = await createAssignmentFixture(klass.id, { published: true, title: 'Second' });

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const profile = await getProfileByAuthId(student.authUserId);

    await createSubmissionFixture(assignmentA.id, student.authUserId);
    await createSubmissionFixture(assignmentB.id, student.authUserId);

    const svc = serviceClient();
    const { data: rows } = await svc
      .from('student_achievements')
      .select('*')
      .eq('student_id', profile.id)
      .eq('achievement_key', 'first_submission');
    expect(rows).toHaveLength(1);
  });
});
