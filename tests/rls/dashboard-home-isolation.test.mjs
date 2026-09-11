/**
 * T009 [US1] — a student's current-semester/classes/due-soon/recent-grades
 * queries never return another student's rows, even for classes/assignments
 * that exist in the fixture (FR-001, SC-005).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses } from './_classFixtures.mjs';
import { createSubmissionFixture, createGradeFixture } from './_dashboardFixtures.mjs';

describe.skipIf(!rlsConfigured)('dashboard home isolation', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('a student only sees their own enrollments, assignments, and grades', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);
    const assignment = await createAssignmentFixture(klass.id, { published: true, max_mark: 100 });

    const studentA = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentA.authUserId);
    await createEnrollmentFixture(klass.id, studentA.authUserId);
    const profileA = await getProfileByAuthId(studentA.authUserId);
    const submission = await createSubmissionFixture(assignment.id, studentA.authUserId);
    await createGradeFixture(submission.id, teacher.authUserId, { mark: 88 });

    const studentB = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentB.authUserId);

    // Student A's own view: sees their enrollment, assignment, and grade.
    const { data: ownEnrollments } = await studentA.client
      .from('enrollments').select('*').eq('student_id', profileA.id);
    expect(ownEnrollments).toHaveLength(1);

    const { data: ownGrades } = await studentA.client
      .from('grades').select('*').eq('submission_id', submission.id);
    expect(ownGrades).toHaveLength(1);

    // Student B (never enrolled) sees none of it, even knowing the ids exist.
    const { data: bEnrollments } = await studentB.client
      .from('enrollments').select('*').eq('student_id', profileA.id);
    expect(bEnrollments).toHaveLength(0);

    const { data: bAssignments } = await studentB.client
      .from('assignments').select('*').eq('id', assignment.id);
    expect(bAssignments).toHaveLength(0);

    const { data: bGrades } = await studentB.client
      .from('grades').select('*').eq('submission_id', submission.id);
    expect(bGrades).toHaveLength(0);
  });
});
