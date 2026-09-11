/**
 * T073 [US2] — for a single student across one assignment's lifecycle,
 * confirms each of FR-006's student-facing status values appears correctly
 * in sequence: not-yet-submitted → submitted (on-time) or late (FR-006, G4).
 * Complements the teacher-side "missing" assertion in
 * grading-queue-missing.test.mjs (US3) and the "graded" state (which
 * requires a `grades` row, also US3) — this file covers what US2 alone can
 * prove: the pre-grading part of the sequence.
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, cleanupUsers } from './_helpers.mjs';
import {
  createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses,
} from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('FR-006 student-facing assignment status sequence', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('not-yet-submitted -> submitted (on-time)', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const studentProfile = await getProfileByAuthId(student.authUserId);

    const assignment = await createAssignmentFixture(klass.id, {
      published: true,
      due_at: new Date(Date.now() + 3600_000).toISOString(),
    });

    // not-yet-submitted: no row for this (assignment, student) yet.
    const before = await student.client
      .from('submissions')
      .select('*')
      .eq('assignment_id', assignment.id)
      .eq('student_id', studentProfile.id);
    expect(before.data).toHaveLength(0);

    // submitted: a row now exists, late=false.
    const { data: submission } = await student.client
      .from('submissions')
      .insert({ assignment_id: assignment.id, student_id: studentProfile.id, text_content: 'answer' })
      .select()
      .single();
    expect(submission.late).toBe(false);
  });

  test('not-yet-submitted -> late (submitted after the due date, allowed)', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const studentProfile = await getProfileByAuthId(student.authUserId);

    const assignment = await createAssignmentFixture(klass.id, {
      published: true,
      allow_late: true,
      due_at: new Date(Date.now() - 3600_000).toISOString(), // already past
    });

    const { data: submission } = await student.client
      .from('submissions')
      .insert({ assignment_id: assignment.id, student_id: studentProfile.id, text_content: 'late answer' })
      .select()
      .single();
    expect(submission.late).toBe(true);
  });
});
