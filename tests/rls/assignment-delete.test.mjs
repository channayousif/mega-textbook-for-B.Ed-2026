/**
 * Spec 011 US5 / FR-012 - assignments DELETE policy (migration 0039).
 *
 * The owning teacher may delete an assignment ONLY while it has zero submissions; with any
 * submission the DELETE is refused (never a silent ON DELETE CASCADE of student work). A
 * teacher who does not own the class cannot delete it.
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, getProfileByAuthId, serviceClient, cleanupUsers,
} from './_helpers.mjs';
import { createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses } from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('assignments DELETE', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('the owning teacher can delete an assignment with no submissions', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);
    const assignment = await createAssignmentFixture(klass.id);

    const { error } = await teacher.client.from('assignments').delete().eq('id', assignment.id);
    expect(error).toBeNull();

    const { data: gone } = await serviceClient().from('assignments').select('*').eq('id', assignment.id);
    expect(gone).toHaveLength(0);
  });

  test('deletion is refused once the assignment has a submission', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(teacher.authUserId, student.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const assignment = await createAssignmentFixture(klass.id);
    const studentProfile = await getProfileByAuthId(student.authUserId);

    await serviceClient()
      .from('submissions')
      .insert({ assignment_id: assignment.id, student_id: studentProfile.id, text_content: 'my work' });

    const { data: deleted } = await teacher.client
      .from('assignments').delete().eq('id', assignment.id).select();
    expect(deleted ?? []).toHaveLength(0); // RLS filters the row out of the DELETE

    const { data: still } = await serviceClient().from('assignments').select('*').eq('id', assignment.id);
    expect(still).toHaveLength(1);
  });

  test('a non-owning teacher cannot delete the assignment', async () => {
    const owner = await createSignedInUser({ role: 'teacher' });
    const other = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(owner.authUserId, other.authUserId);
    const klass = await createClassFixture(owner.authUserId);
    createdClasses.push(klass.id);
    const assignment = await createAssignmentFixture(klass.id);

    const { data: deleted } = await other.client
      .from('assignments').delete().eq('id', assignment.id).select();
    expect(deleted ?? []).toHaveLength(0);

    const { data: still } = await serviceClient().from('assignments').select('*').eq('id', assignment.id);
    expect(still).toHaveLength(1);
  });
});
