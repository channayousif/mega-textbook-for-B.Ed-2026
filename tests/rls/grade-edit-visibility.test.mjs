/**
 * T039 [US3] — editing an already-returned grade's mark/feedback is
 * reflected on the student's next read, never the original value (FR-011).
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, getProfileByAuthId, serviceClient, cleanupUsers,
} from './_helpers.mjs';
import {
  createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses,
} from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('editing a returned grade', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test("student's next read reflects the corrected mark/feedback, not the original", async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const teacherProfile = await getProfileByAuthId(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);
    const assignment = await createAssignmentFixture(klass.id, { published: true, max_mark: 100 });

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

    const { data: grade, error: gradeError } = await teacher.client
      .from('grades')
      .insert({ submission_id: submission.id, mark: 60, feedback: 'Good start', graded_by: teacherProfile.id })
      .select()
      .single();
    expect(gradeError).toBeNull();

    const before = await student.client.from('grades').select('*').eq('id', grade.id).single();
    expect(before.data.mark).toBe(60);
    expect(before.data.feedback).toBe('Good start');

    const { error: editError } = await teacher.client
      .from('grades')
      .update({ mark: 85, feedback: 'Reviewed again — much better' })
      .eq('id', grade.id);
    expect(editError).toBeNull();

    const after = await student.client.from('grades').select('*').eq('id', grade.id).single();
    expect(after.data.mark).toBe(85);
    expect(after.data.feedback).toBe('Reviewed again — much better');
  });
});
