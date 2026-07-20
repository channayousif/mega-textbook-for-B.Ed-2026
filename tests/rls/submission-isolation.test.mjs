/**
 * T026 [US2] — a student cannot read or write another student's submission;
 * a teacher can only read submissions belonging to their own class's
 * assignments (FR-012, SC-004).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, cleanupUsers } from './_helpers.mjs';
import {
  createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses,
} from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('submission isolation', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test("a student cannot read or write another student's submission", async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: 'ISOS01' });
    createdClasses.push(klass.id);
    const assignment = await createAssignmentFixture(klass.id, {
      published: true,
      due_at: new Date(Date.now() + 3600_000).toISOString(),
    });

    const studentA = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentA.authUserId);
    await createEnrollmentFixture(klass.id, studentA.authUserId);
    const profileA = await getProfileByAuthId(studentA.authUserId);
    const { data: submissionA } = await studentA.client
      .from('submissions')
      .insert({ assignment_id: assignment.id, student_id: profileA.id, text_content: "A's answer" })
      .select()
      .single();

    const studentB = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentB.authUserId);
    await createEnrollmentFixture(klass.id, studentB.authUserId);

    const { data: readAttempt } = await studentB.client
      .from('submissions')
      .select('*')
      .eq('id', submissionA.id);
    expect(readAttempt).toHaveLength(0);

    const { data: writeAttempt } = await studentB.client
      .from('submissions')
      .update({ text_content: 'hijacked' })
      .eq('id', submissionA.id)
      .select();
    expect(writeAttempt).toHaveLength(0);
  });

  test("a teacher can only read submissions for their own class's assignments", async () => {
    const owner = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(owner.authUserId);
    const klass = await createClassFixture(owner.authUserId, { join_code: 'ISOS02' });
    createdClasses.push(klass.id);
    const assignment = await createAssignmentFixture(klass.id, {
      published: true,
      due_at: new Date(Date.now() + 3600_000).toISOString(),
    });

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const studentProfile = await getProfileByAuthId(student.authUserId);
    await student.client
      .from('submissions')
      .insert({ assignment_id: assignment.id, student_id: studentProfile.id, text_content: 'answer' });

    const otherTeacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(otherTeacher.authUserId);

    const { data } = await otherTeacher.client.from('submissions').select('*').eq('assignment_id', assignment.id);
    expect(data).toHaveLength(0);
  });
});
