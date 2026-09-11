/**
 * T007 [US1] — reissuing a class's join code makes the old code fail while
 * the existing roster is unaffected; revoking it blocks new joins while the
 * roster is unaffected (FR-002, US1 AS3/AS4).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, createEnrollmentFixture, cleanupClasses, randomJoinCode } from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('join code reissue and revoke', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('reissuing the code fails the old one; existing roster unaffected', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const oldCode = randomJoinCode();
    const newCode = randomJoinCode();
    const klass = await createClassFixture(teacher.authUserId, { join_code: oldCode });
    createdClasses.push(klass.id);

    const existingStudent = await createSignedInUser({ role: 'student' });
    createdUsers.push(existingStudent.authUserId);
    await createEnrollmentFixture(klass.id, existingStudent.authUserId);

    const { error: reissueError } = await teacher.client
      .from('classes')
      .update({ join_code: newCode })
      .eq('id', klass.id);
    expect(reissueError).toBeNull();

    const lateStudent = await createSignedInUser({ role: 'student' });
    createdUsers.push(lateStudent.authUserId);
    const { error: oldCodeError } = await lateStudent.client.rpc('join_class_by_code', { p_code: oldCode });
    expect(oldCodeError).toBeTruthy();
    expect(oldCodeError.message).toContain('invalid_or_expired_join_code');

    const newCodeStudent = await createSignedInUser({ role: 'student' });
    createdUsers.push(newCodeStudent.authUserId);
    const { error: newCodeError } = await newCodeStudent.client.rpc('join_class_by_code', { p_code: newCode });
    expect(newCodeError).toBeNull();

    const existingProfile = await getProfileByAuthId(existingStudent.authUserId);
    const { data: stillThere } = await teacher.client
      .from('enrollments')
      .select('status')
      .eq('class_id', klass.id)
      .eq('student_id', existingProfile.id)
      .single();
    expect(stillThere.status).toBe('active');
  });

  test('revoking the code blocks new joins; existing roster unaffected', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const revokedCode = randomJoinCode();
    const klass = await createClassFixture(teacher.authUserId, { join_code: revokedCode });
    createdClasses.push(klass.id);

    const existingStudent = await createSignedInUser({ role: 'student' });
    createdUsers.push(existingStudent.authUserId);
    await createEnrollmentFixture(klass.id, existingStudent.authUserId);

    const { error: revokeError } = await teacher.client
      .from('classes')
      .update({ join_code: null })
      .eq('id', klass.id);
    expect(revokeError).toBeNull();

    const newStudent = await createSignedInUser({ role: 'student' });
    createdUsers.push(newStudent.authUserId);
    const { error: joinError } = await newStudent.client.rpc('join_class_by_code', { p_code: revokedCode });
    expect(joinError).toBeTruthy();

    const existingProfile = await getProfileByAuthId(existingStudent.authUserId);
    const { data: stillThere } = await teacher.client
      .from('enrollments')
      .select('status')
      .eq('class_id', klass.id)
      .eq('student_id', existingProfile.id)
      .single();
    expect(stillThere.status).toBe('active');
  });
});
