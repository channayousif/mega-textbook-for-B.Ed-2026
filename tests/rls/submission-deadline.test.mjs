/**
 * T024 [US2] — an on-time submission is recorded `late=false`; a late
 * submission is accepted and marked late when `allow_late=true`, rejected
 * when `allow_late=false` (FR-007, FR-008). `late` is computed server-side
 * (compute_submission_late()), never trusted from the client.
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, cleanupUsers } from './_helpers.mjs';
import {
  createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses,
} from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('submission deadline evaluation', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  async function setup(joinCode) {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: joinCode });
    createdClasses.push(klass.id);

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const studentProfile = await getProfileByAuthId(student.authUserId);

    return { klass, student, studentProfile };
  }

  test('on-time submission is recorded late=false', async () => {
    const { klass, student, studentProfile } = await setup('DL001');
    const assignment = await createAssignmentFixture(klass.id, {
      published: true,
      due_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    });

    const { data, error } = await student.client
      .from('submissions')
      .insert({ assignment_id: assignment.id, student_id: studentProfile.id, text_content: 'on time' })
      .select()
      .single();
    expect(error).toBeNull();
    expect(data.late).toBe(false);
  });

  test('late submission is accepted and marked late when allow_late=true', async () => {
    const { klass, student, studentProfile } = await setup('DL002');
    const assignment = await createAssignmentFixture(klass.id, {
      published: true,
      allow_late: true,
      due_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // already past
    });

    const { data, error } = await student.client
      .from('submissions')
      .insert({ assignment_id: assignment.id, student_id: studentProfile.id, text_content: 'late but allowed' })
      .select()
      .single();
    expect(error).toBeNull();
    expect(data.late).toBe(true);
  });

  test('late submission is rejected when allow_late=false', async () => {
    const { klass, student, studentProfile } = await setup('DL003');
    const assignment = await createAssignmentFixture(klass.id, {
      published: true,
      allow_late: false,
      due_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    });

    const { error } = await student.client
      .from('submissions')
      .insert({ assignment_id: assignment.id, student_id: studentProfile.id, text_content: 'too late' });
    expect(error).toBeTruthy();
  });

  test('client-supplied late value is ignored — server always computes it', async () => {
    const { klass, student, studentProfile } = await setup('DL004');
    const assignment = await createAssignmentFixture(klass.id, {
      published: true,
      due_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // not due yet
    });

    // Client lies and claims late=true on an on-time submission.
    const { data, error } = await student.client
      .from('submissions')
      .insert({ assignment_id: assignment.id, student_id: studentProfile.id, text_content: 'honest', late: true })
      .select()
      .single();
    expect(error).toBeNull();
    expect(data.late).toBe(false); // trigger overrides the forged value
  });
});
