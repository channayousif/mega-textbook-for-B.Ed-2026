/**
 * T071 [US3] — a tombstoned (deleted) student's `grades`/`submissions` rows
 * remain readable by the owning teacher with marks/feedback/submission
 * content intact, joined against `profiles.full_name IS NULL` (FR-019,
 * extends data-model.md access-control matrix item #10). Calls the REAL
 * `delete-account` Edge Function, same as tests/rls/deletion-tombstone.test.mjs.
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, getProfileByAuthId, serviceClient, callEdgeFunction, cleanupUsers,
} from './_helpers.mjs';
import {
  createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses,
} from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('a tombstoned student\'s grades/submissions stay teacher-visible', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('mark/feedback/submission content intact; profiles.full_name is NULL', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const teacherProfile = await getProfileByAuthId(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);
    const assignment = await createAssignmentFixture(klass.id, { published: true, max_mark: 100 });

    const student = await createSignedInUser({ role: 'student', fullName: 'Tombstone Candidate' });
    await createEnrollmentFixture(klass.id, student.authUserId);
    const studentProfile = await getProfileByAuthId(student.authUserId);

    const svc = serviceClient();
    const { data: submission } = await svc
      .from('submissions')
      .insert({ assignment_id: assignment.id, student_id: studentProfile.id, text_content: "student's answer" })
      .select()
      .single();
    const { data: grade } = await teacher.client
      .from('grades')
      .insert({ submission_id: submission.id, mark: 77, feedback: 'Well done', graded_by: teacherProfile.id })
      .select()
      .single();

    const resp = await callEdgeFunction('delete-account', { token: student.accessToken });
    expect(resp.status).toBe(200);

    const { data: submissionAfter, error: submissionError } = await teacher.client
      .from('submissions')
      .select('*, profiles!submissions_student_id_fkey(full_name)')
      .eq('id', submission.id)
      .single();
    expect(submissionError).toBeNull();
    expect(submissionAfter.text_content).toBe("student's answer");
    expect(submissionAfter.profiles.full_name).toBeNull();

    const { data: gradeAfter, error: gradeError } = await teacher.client
      .from('grades')
      .select('*')
      .eq('id', grade.id)
      .single();
    expect(gradeError).toBeNull();
    expect(gradeAfter.mark).toBe(77);
    expect(gradeAfter.feedback).toBe('Well done');
  });
});
