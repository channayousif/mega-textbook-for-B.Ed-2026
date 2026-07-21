/**
 * T026 [US5] — archived classes (status='archived') for the student appear
 * grouped by term_label with their classes/grades/coverage exactly as they
 * stood at archive time; the query shape exposes no write-capable path for
 * any of this data (FR-007, SC-003).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, serviceClient, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses } from './_classFixtures.mjs';
import { createSubmissionFixture, createGradeFixture } from './_dashboardFixtures.mjs';

describe.skipIf(!rlsConfigured)('dashboard history — archived semesters are read-only', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('an archived class still shows its frozen grade to the student, but nothing can be written', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: 'HIST01', term_label: 'Spring 2025' });
    createdClasses.push(klass.id);
    const assignment = await createAssignmentFixture(klass.id, { published: true, max_mark: 100 });

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const submission = await createSubmissionFixture(assignment.id, student.authUserId);
    await createGradeFixture(submission.id, teacher.authUserId, { mark: 85 });

    // Archive the class (service role — simulating the archive action already covered by Spec 003's own tests).
    const svc = serviceClient();
    await svc.from('classes').update({ status: 'archived', archived_reason: 'manual', archived_at: new Date().toISOString() }).eq('id', klass.id);

    const { data: enrollments } = await student.client
      .from('enrollments')
      .select('*, classes(*)')
      .eq('class_id', klass.id);
    expect(enrollments).toHaveLength(1);
    expect(enrollments[0].classes.status).toBe('archived');
    expect(enrollments[0].classes.term_label).toBe('Spring 2025');

    const { data: grades } = await student.client.from('grades').select('mark').eq('submission_id', submission.id);
    expect(grades[0].mark).toBe(85);

    // No write path: a new assignment cannot be created in an archived class (Spec 003's enforce_active_class()).
    const { error: writeError } = await teacher.client
      .from('assignments')
      .insert({ class_id: klass.id, source_kind: 'custom', title: 'Should fail', due_at: new Date().toISOString(), max_mark: 100 });
    expect(writeError).toBeTruthy();
  });
});
