/**
 * T033 [US6] — Analytics queries are scoped to one `class_id` the caller
 * owns; another teacher's class never appears through any query path
 * (FR-009, FR-010, SC-004; contract checklist item 14).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses } from './_classFixtures.mjs';
import { createSubmissionFixture, createGradeFixture } from './_dashboardFixtures.mjs';

describe.skipIf(!rlsConfigured)('teacher analytics isolation', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('a teacher cannot read another teacher\'s class assignments/submissions/grades for analytics', async () => {
    const teacherA = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacherA.authUserId);
    const teacherB = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacherB.authUserId);
    const studentB = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentB.authUserId);

    const classB = await createClassFixture(teacherB.authUserId);
    createdClasses.push(classB.id);
    await createEnrollmentFixture(classB.id, studentB.authUserId);
    const assignmentB = await createAssignmentFixture(classB.id, { max_mark: 100 });
    const submissionB = await createSubmissionFixture(assignmentB.id, studentB.authUserId);
    await createGradeFixture(submissionB.id, teacherB.authUserId, { mark: 90 });

    // Teacher A queries the same query shapes fetchClassAnalytics uses,
    // scoped to Teacher B's class — every one must return zero rows.
    const { data: assignmentsFromA } = await teacherA.client
      .from('assignments').select('*').eq('class_id', classB.id);
    expect(assignmentsFromA).toHaveLength(0);

    const { data: enrollmentsFromA } = await teacherA.client
      .from('enrollments').select('*').eq('class_id', classB.id);
    expect(enrollmentsFromA).toHaveLength(0);

    const { data: submissionsFromA } = await teacherA.client
      .from('submissions').select('*').eq('assignment_id', assignmentB.id);
    expect(submissionsFromA).toHaveLength(0);

    const { data: gradesFromA } = await teacherA.client
      .from('grades').select('*').eq('submission_id', submissionB.id);
    expect(gradesFromA).toHaveLength(0);
  });
});
