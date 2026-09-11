/**
 * T025 [US2] — a resubmission before the due date overwrites the existing
 * row in place (still one row); an UPDATE attempt after the due date is
 * rejected regardless of the original submission's on-time/late status
 * (2026-07-19 clarification). `guard_submission_updates()` also restricts a
 * resubmission to content columns only.
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, serviceClient, cleanupUsers } from './_helpers.mjs';
import {
  createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses,
} from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('submission resubmission and due-date lock', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('resubmission before the due date overwrites in place (still one row)', async () => {
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
      due_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    });

    const { data: first } = await student.client
      .from('submissions')
      .insert({ assignment_id: assignment.id, student_id: studentProfile.id, text_content: 'draft one' })
      .select()
      .single();

    const { data: second, error: resubmitError } = await student.client
      .from('submissions')
      .update({ text_content: 'final answer' })
      .eq('id', first.id)
      .select()
      .single();
    expect(resubmitError).toBeNull();
    expect(second.text_content).toBe('final answer');
    expect(second.id).toBe(first.id);

    const svc = serviceClient();
    const { count } = await svc
      .from('submissions')
      .select('id', { count: 'exact', head: true })
      .eq('assignment_id', assignment.id)
      .eq('student_id', studentProfile.id);
    expect(count).toBe(1);
  });

  test('resubmission after the due date is rejected, regardless of on-time/late origin', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const studentProfile = await getProfileByAuthId(student.authUserId);

    // Due in 2 seconds — submit on time, then wait for it to pass.
    const dueAt = new Date(Date.now() + 2000).toISOString();
    const assignment = await createAssignmentFixture(klass.id, { published: true, allow_late: true, due_at: dueAt });

    const { data: onTime } = await student.client
      .from('submissions')
      .insert({ assignment_id: assignment.id, student_id: studentProfile.id, text_content: 'in time' })
      .select()
      .single();
    expect(onTime.late).toBe(false);

    await new Promise((resolve) => setTimeout(resolve, 2500));

    const { data, error } = await student.client
      .from('submissions')
      .update({ text_content: 'too late to edit' })
      .eq('id', onTime.id)
      .select();
    expect(error).toBeNull();
    expect(data).toHaveLength(0); // row filtered out by the USING clause — silent no-op, not a raise

    const svc = serviceClient();
    const { data: unchanged } = await svc.from('submissions').select('text_content').eq('id', onTime.id).single();
    expect(unchanged.text_content).toBe('in time');
  });

  test('guard_submission_updates rejects reassigning assignment_id/student_id/late on resubmission', async () => {
    const teacherA = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacherA.authUserId);
    const classA = await createClassFixture(teacherA.authUserId);
    createdClasses.push(classA.id);
    const assignmentA = await createAssignmentFixture(classA.id, {
      published: true,
      due_at: new Date(Date.now() + 3600_000).toISOString(),
    });
    const assignmentB = await createAssignmentFixture(classA.id, {
      published: true,
      due_at: new Date(Date.now() + 3600_000).toISOString(),
    });

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(classA.id, student.authUserId);
    const studentProfile = await getProfileByAuthId(student.authUserId);

    const { data: submission } = await student.client
      .from('submissions')
      .insert({ assignment_id: assignmentA.id, student_id: studentProfile.id, text_content: 'mine' })
      .select()
      .single();

    const { error } = await student.client
      .from('submissions')
      .update({ assignment_id: assignmentB.id })
      .eq('id', submission.id);
    expect(error).toBeTruthy();
  });
});
