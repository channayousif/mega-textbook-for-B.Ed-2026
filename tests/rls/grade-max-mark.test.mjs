/**
 * T038 [US3] — a mark exceeding assignments.max_mark is rejected by
 * enforce_max_mark() (FR-010 edge case).
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, getProfileByAuthId, serviceClient, cleanupUsers,
} from './_helpers.mjs';
import {
  createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses,
} from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('grade mark cannot exceed the assignment max_mark', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('mark > max_mark is rejected; mark <= max_mark is accepted', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: 'MAXM01' });
    createdClasses.push(klass.id);
    const assignment = await createAssignmentFixture(klass.id, { published: true, max_mark: 50 });

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const studentProfile = await getProfileByAuthId(student.authUserId);

    const svc = serviceClient();
    const { data: submission } = await svc
      .from('submissions')
      .insert({ assignment_id: assignment.id, student_id: studentProfile.id, text_content: 'answer' })
      .select()
      .single();

    const { error: overMaxError } = await teacher.client
      .from('grades')
      .insert({ submission_id: submission.id, mark: 75, graded_by: (await getProfileByAuthId(teacher.authUserId)).id });
    expect(overMaxError).toBeTruthy();

    const { data: grade, error: withinMaxError } = await teacher.client
      .from('grades')
      .insert({ submission_id: submission.id, mark: 50, graded_by: (await getProfileByAuthId(teacher.authUserId)).id })
      .select()
      .single();
    expect(withinMaxError).toBeNull();
    expect(grade.mark).toBe(50);
  });
});
