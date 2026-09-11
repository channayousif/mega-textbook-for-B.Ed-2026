/**
 * T037 [US3] — the teacher's queue lists every submission for the assignment
 * plus enrolled non-submitters as "missing" once the due date has passed
 * (US3 AS4). The queue itself is composed client-side (src/lib/grading.ts,
 * T043) from two RLS-scoped queries — submissions for the assignment, and
 * active enrollments for the class — so this test proves both queries return
 * the right rows for the owning teacher, the raw material T043 combines.
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, cleanupUsers } from './_helpers.mjs';
import {
  createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses,
} from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('grading queue — missing students once due date has passed', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('submitter appears via submissions; non-submitter is derivable as missing', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);
    const assignment = await createAssignmentFixture(klass.id, {
      published: true,
      allow_late: true, // due_at is already past — a late submission must still be insertable
      due_at: new Date(Date.now() - 3600_000).toISOString(), // already past
    });

    const submitter = await createSignedInUser({ role: 'student' });
    createdUsers.push(submitter.authUserId);
    await createEnrollmentFixture(klass.id, submitter.authUserId);
    const submitterProfile = await getProfileByAuthId(submitter.authUserId);
    const { error: submitError } = await submitter.client.from('submissions').insert({
      assignment_id: assignment.id,
      student_id: submitterProfile.id,
      text_content: 'a late submission — still counts toward the queue, not "missing"',
    });
    expect(submitError).toBeNull();

    const nonSubmitter = await createSignedInUser({ role: 'student' });
    createdUsers.push(nonSubmitter.authUserId);
    await createEnrollmentFixture(klass.id, nonSubmitter.authUserId);
    const nonSubmitterProfile = await getProfileByAuthId(nonSubmitter.authUserId);

    // Query 1: submissions for the assignment (teacher's own class) — the
    // "submitted"/"late" branch of the queue.
    const { data: submissions, error: submissionsError } = await teacher.client
      .from('submissions')
      .select('student_id')
      .eq('assignment_id', assignment.id);
    expect(submissionsError).toBeNull();
    expect(submissions.map((s) => s.student_id)).toEqual([submitterProfile.id]);

    // Query 2: active enrollments for the class — cross-referenced against
    // query 1's student_ids to derive who is "missing" (US3 AS4).
    const { data: enrollments, error: enrollmentsError } = await teacher.client
      .from('enrollments')
      .select('student_id')
      .eq('class_id', klass.id)
      .eq('status', 'active');
    expect(enrollmentsError).toBeNull();
    const submittedIds = new Set(submissions.map((s) => s.student_id));
    const missing = enrollments.filter((e) => !submittedIds.has(e.student_id));
    expect(missing.map((e) => e.student_id)).toEqual([nonSubmitterProfile.id]);
  });
});
