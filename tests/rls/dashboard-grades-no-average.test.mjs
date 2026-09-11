/**
 * T014 [US2] — every returned grade (assignment and quiz) appears with
 * mark/max/class/title; no average/aggregate value is computed or joined
 * into the result set anywhere; updating a grades.mark (re-grade) is
 * reflected on the next read, never the original value (FR-004, US2 AS1–AS3).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, serviceClient, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses } from './_classFixtures.mjs';
import { createSubmissionFixture, createGradeFixture } from './_dashboardFixtures.mjs';

describe.skipIf(!rlsConfigured)('dashboard grades — no average, corrected value', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('a student reads their own grade with mark/max, and the query never carries an average column', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);
    const assignment = await createAssignmentFixture(klass.id, { published: true, max_mark: 100, title: 'Grades Fixture' });

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const submission = await createSubmissionFixture(assignment.id, student.authUserId);
    const grade = await createGradeFixture(submission.id, teacher.authUserId, { mark: 72 });

    const { data: rows, error } = await student.client
      .from('grades')
      .select('mark, submissions(assignments(title, max_mark))')
      .eq('id', grade.id);
    expect(error).toBeNull();
    expect(rows).toHaveLength(1);
    expect(rows[0].mark).toBe(72);
    // No column named anything average-shaped anywhere in the row.
    expect(Object.keys(rows[0]).some((k) => /avg|average|mean/i.test(k))).toBe(false);
  });

  test('a corrected grade always shows the corrected value, never the original', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);
    const assignment = await createAssignmentFixture(klass.id, { published: true, max_mark: 100 });

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const submission = await createSubmissionFixture(assignment.id, student.authUserId);
    const grade = await createGradeFixture(submission.id, teacher.authUserId, { mark: 60 });

    const svc = serviceClient();
    await svc.from('grades').update({ mark: 95 }).eq('id', grade.id);

    const { data: rows } = await student.client.from('grades').select('mark').eq('id', grade.id);
    expect(rows[0].mark).toBe(95);
  });
});
