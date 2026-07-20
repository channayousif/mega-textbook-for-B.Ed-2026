/**
 * T040 [US3] — a teacher cannot grade another teacher's class's submissions;
 * a student can read only their own returned grade (FR-010, FR-012, SC-004).
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, getProfileByAuthId, serviceClient, cleanupUsers,
} from './_helpers.mjs';
import {
  createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses,
} from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('grade isolation', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test("a teacher cannot grade another teacher's class's submissions", async () => {
    const owner = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(owner.authUserId);
    const klass = await createClassFixture(owner.authUserId, { join_code: 'ISOG01' });
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

    const otherTeacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(otherTeacher.authUserId);
    const otherTeacherProfile = await getProfileByAuthId(otherTeacher.authUserId);

    const { data: insertData, error: insertError } = await otherTeacher.client
      .from('grades')
      .insert({ submission_id: submission.id, mark: 10, graded_by: otherTeacherProfile.id })
      .select();
    expect(insertError).toBeTruthy();
    expect(insertData ?? []).toHaveLength(0);

    const { data: readAttempt } = await otherTeacher.client
      .from('grades')
      .select('*')
      .eq('submission_id', submission.id);
    expect(readAttempt).toHaveLength(0);
  });

  test('a student can read only their own returned grade', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const teacherProfile = await getProfileByAuthId(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: 'ISOG02' });
    createdClasses.push(klass.id);
    const assignment = await createAssignmentFixture(klass.id, { published: true, max_mark: 100 });

    const studentA = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentA.authUserId);
    await createEnrollmentFixture(klass.id, studentA.authUserId);
    const profileA = await getProfileByAuthId(studentA.authUserId);

    const svc = serviceClient();
    const { data: submissionA } = await svc
      .from('submissions')
      .insert({ assignment_id: assignment.id, student_id: profileA.id, text_content: "A's answer" })
      .select()
      .single();
    const { data: gradeA } = await teacher.client
      .from('grades')
      .insert({ submission_id: submissionA.id, mark: 90, graded_by: teacherProfile.id })
      .select()
      .single();

    const studentB = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentB.authUserId);
    await createEnrollmentFixture(klass.id, studentB.authUserId);

    const { data: aReadsOwn } = await studentA.client.from('grades').select('*').eq('id', gradeA.id);
    expect(aReadsOwn).toHaveLength(1);

    const { data: bReadsA } = await studentB.client.from('grades').select('*').eq('id', gradeA.id);
    expect(bReadsA).toHaveLength(0);
  });
});
