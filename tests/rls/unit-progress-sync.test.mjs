/**
 * T018 [US3] — grading a unit-linked submission auto-inserts a unit_progress
 * row with method='assignment'; grading a custom-source assignment's
 * submission inserts nothing (no unit to attach to); submitting a quiz
 * attempt auto-inserts a row with method='quiz'; a retake attempt on an
 * already quiz-covered unit still results in exactly one row (US3 AS3,
 * data-model.md's sync triggers).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, serviceClient, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses } from './_classFixtures.mjs';
import { createSubmissionFixture, createGradeFixture, createQuizAttemptFixture } from './_dashboardFixtures.mjs';

describe.skipIf(!rlsConfigured)('unit_progress sync triggers', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('grading a unit-linked submission auto-inserts a unit_progress row with method=assignment', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: 'UPS001' });
    createdClasses.push(klass.id);
    const assignment = await createAssignmentFixture(klass.id, {
      published: true, max_mark: 100, source_kind: 'activity', course_code: 'EFMP-301', unit_no: 3,
    });

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const studentProfile = await getProfileByAuthId(student.authUserId);
    const submission = await createSubmissionFixture(assignment.id, student.authUserId);
    await createGradeFixture(submission.id, teacher.authUserId, { mark: 90 });

    const svc = serviceClient();
    const { data: rows } = await svc
      .from('unit_progress')
      .select('*')
      .eq('student_id', studentProfile.id)
      .eq('course_code', 'EFMP-301')
      .eq('unit_no', 3);
    expect(rows).toHaveLength(1);
    expect(rows[0].method).toBe('assignment');
  });

  test('grading a custom-source assignment inserts nothing (no unit to attach to)', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: 'UPS002' });
    createdClasses.push(klass.id);
    const assignment = await createAssignmentFixture(klass.id, { published: true, max_mark: 100, source_kind: 'custom' });

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const studentProfile = await getProfileByAuthId(student.authUserId);
    const submission = await createSubmissionFixture(assignment.id, student.authUserId);
    await createGradeFixture(submission.id, teacher.authUserId, { mark: 50 });

    const svc = serviceClient();
    const { data: rows } = await svc.from('unit_progress').select('*').eq('student_id', studentProfile.id);
    expect(rows).toHaveLength(0);
  });

  test('a quiz attempt auto-inserts a unit_progress row with method=quiz, and a retake stays a single row', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: 'UPS003' });
    createdClasses.push(klass.id);
    const assignment = await createAssignmentFixture(klass.id, {
      published: true, max_mark: 100, source_kind: 'quiz', course_code: 'EFMP-301', unit_no: 5,
    });

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const studentProfile = await getProfileByAuthId(student.authUserId);

    await createQuizAttemptFixture(assignment.id, student.authUserId, { score: 60 });
    await createQuizAttemptFixture(assignment.id, student.authUserId, { score: 90 }); // retake

    const svc = serviceClient();
    const { data: rows } = await svc
      .from('unit_progress')
      .select('*')
      .eq('student_id', studentProfile.id)
      .eq('course_code', 'EFMP-301')
      .eq('unit_no', 5);
    expect(rows).toHaveLength(1);
    expect(rows[0].method).toBe('quiz');
  });
});
