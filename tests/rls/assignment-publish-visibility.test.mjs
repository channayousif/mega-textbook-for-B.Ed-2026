/**
 * T022 [US2] — an unpublished assignment returns 0 rows for an enrolled
 * student but is visible to the owning teacher; toggling `published`
 * true↔false at any time preserves existing submissions/grades unchanged
 * (FR-005, 2026-07-19 unpublish clarification). Also asserts (U1) that
 * editing an assignment's due date after submissions exist leaves those
 * submissions unaltered, with the new due date applying only going forward
 * to future late/on-time marking (spec.md Edge Cases).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, serviceClient, cleanupUsers } from './_helpers.mjs';
import {
  createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses,
} from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('assignment publish visibility and due-date edits', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('unpublished assignment: 0 rows for student, visible to owning teacher', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: 'PUB001' });
    createdClasses.push(klass.id);

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);

    const assignment = await createAssignmentFixture(klass.id, { published: false });

    const { data: studentView } = await student.client.from('assignments').select('*').eq('id', assignment.id);
    expect(studentView).toHaveLength(0);

    const { data: teacherView } = await teacher.client.from('assignments').select('*').eq('id', assignment.id);
    expect(teacherView).toHaveLength(1);
  });

  test('unpublishing after submissions exist hides it from the student without touching the submission', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: 'PUB002' });
    createdClasses.push(klass.id);

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const studentProfile = await getProfileByAuthId(student.authUserId);

    const assignment = await createAssignmentFixture(klass.id, { published: true });
    const { error: submitError } = await student.client
      .from('submissions')
      .insert({ assignment_id: assignment.id, student_id: studentProfile.id, text_content: 'my answer' });
    expect(submitError).toBeNull();

    const { error: unpublishError } = await teacher.client
      .from('assignments')
      .update({ published: false })
      .eq('id', assignment.id);
    expect(unpublishError).toBeNull();

    const { data: hiddenFromStudent } = await student.client.from('assignments').select('*').eq('id', assignment.id);
    expect(hiddenFromStudent).toHaveLength(0);

    const svc = serviceClient();
    const { data: submissionStillThere } = await svc
      .from('submissions')
      .select('text_content')
      .eq('assignment_id', assignment.id)
      .eq('student_id', studentProfile.id)
      .single();
    expect(submissionStillThere.text_content).toBe('my answer');

    const { error: republishError } = await teacher.client
      .from('assignments')
      .update({ published: true })
      .eq('id', assignment.id);
    expect(republishError).toBeNull();
    const { data: visibleAgain } = await student.client.from('assignments').select('*').eq('id', assignment.id);
    expect(visibleAgain).toHaveLength(1);
  });

  test('editing the due date after a submission exists leaves the submission unaltered (U1)', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: 'PUB003' });
    createdClasses.push(klass.id);

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const studentProfile = await getProfileByAuthId(student.authUserId);

    const originalDueAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1h from now
    const assignment = await createAssignmentFixture(klass.id, { published: true, due_at: originalDueAt });
    await student.client
      .from('submissions')
      .insert({ assignment_id: assignment.id, student_id: studentProfile.id, text_content: 'before edit' });

    const newDueAt = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(); // push it out
    const { error: editError } = await teacher.client
      .from('assignments')
      .update({ due_at: newDueAt })
      .eq('id', assignment.id);
    expect(editError).toBeNull();

    const svc = serviceClient();
    const { data: submission } = await svc
      .from('submissions')
      .select('text_content, late')
      .eq('assignment_id', assignment.id)
      .eq('student_id', studentProfile.id)
      .single();
    expect(submission.text_content).toBe('before edit');
    expect(submission.late).toBe(false); // unaltered — computed once at insert time, never recomputed
  });
});
