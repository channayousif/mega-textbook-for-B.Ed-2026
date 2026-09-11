/**
 * T034 [US6] — completing every published assignment in a class on time
 * grants on_time_class_completion; a late submission in an otherwise-complete
 * class does not grant it; a class with zero published assignments never
 * grants it (2026-07-20 clarification, contract checklist item 9).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, serviceClient, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses } from './_classFixtures.mjs';
import { createSubmissionFixture, createGradeFixture } from './_dashboardFixtures.mjs';

describe.skipIf(!rlsConfigured)('achievement — on-time class completion', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('completing every published assignment on time grants the achievement', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);
    const a1 = await createAssignmentFixture(klass.id, { published: true, title: 'A1' });
    const a2 = await createAssignmentFixture(klass.id, { published: true, title: 'A2' });

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const profile = await getProfileByAuthId(student.authUserId);

    const s1 = await createSubmissionFixture(a1.id, student.authUserId, { late: false });
    await createGradeFixture(s1.id, teacher.authUserId);
    const s2 = await createSubmissionFixture(a2.id, student.authUserId, { late: false });
    await createGradeFixture(s2.id, teacher.authUserId);

    const svc = serviceClient();
    const { data: rows } = await svc
      .from('student_achievements')
      .select('*')
      .eq('student_id', profile.id)
      .eq('achievement_key', 'on_time_class_completion');
    expect(rows).toHaveLength(1);
  });

  test('a late submission in an otherwise-complete class does not grant it', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);
    // a1's due_at is in the past (with allow_late) so a submission created
    // "now" is genuinely late — Spec 003's compute_submission_late() trigger
    // computes `late` server-side from now() vs. due_at on every INSERT and
    // silently overrides any client-supplied value (by design, never trusted
    // from the client), so a future due_at here would make the `late: true`
    // override below a no-op regardless of what's requested.
    const a1 = await createAssignmentFixture(klass.id, {
      published: true, title: 'A1', allow_late: true, due_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    });
    const a2 = await createAssignmentFixture(klass.id, { published: true, title: 'A2' });

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const profile = await getProfileByAuthId(student.authUserId);

    const s1 = await createSubmissionFixture(a1.id, student.authUserId);
    await createGradeFixture(s1.id, teacher.authUserId);
    const s2 = await createSubmissionFixture(a2.id, student.authUserId, { late: false });
    await createGradeFixture(s2.id, teacher.authUserId);

    const svc = serviceClient();
    const { data: rows } = await svc
      .from('student_achievements')
      .select('*')
      .eq('student_id', profile.id)
      .eq('achievement_key', 'on_time_class_completion');
    expect(rows).toHaveLength(0);
  });

  test('a class with zero published assignments never grants it', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);
    // No assignments created at all — nothing to grade, nothing to trigger.
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const profile = await getProfileByAuthId(student.authUserId);

    const svc = serviceClient();
    const { data: rows } = await svc
      .from('student_achievements')
      .select('*')
      .eq('student_id', profile.id)
      .eq('achievement_key', 'on_time_class_completion');
    expect(rows).toHaveLength(0);
  });
});
