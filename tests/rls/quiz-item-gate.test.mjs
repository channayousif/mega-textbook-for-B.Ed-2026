/**
 * T053 [US6] — `quiz_items_public` exposes questions/options but never
 * `correct_option`; a full-row read of the base `quiz_items` table is
 * `is_verified_teacher()`/`is_admin()`-only (FR-013, FR-017, SC-004).
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, adminSet, serviceClient, cleanupUsers,
} from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('quiz_items gated; quiz_items_public column-restricted', () => {
  const createdUsers = [];
  let quizItemId;

  afterAll(async () => {
    const svc = serviceClient();
    if (quizItemId) await svc.from('quiz_items').delete().eq('id', quizItemId);
    await cleanupUsers(createdUsers);
  });

  test('quiz_items_public: any authenticated user reads questions/options, never correct_option', async () => {
    const svc = serviceClient();
    const { data: item } = await svc
      .from('quiz_items')
      .insert({
        course_code: 'EFMP-301', unit_no: 1, question_text: 'What is 2+2?',
        options: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }], correct_option: 'B',
      })
      .select()
      .single();
    quizItemId = item.id;

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const { data, error } = await student.client
      .from('quiz_items_public')
      .select('*')
      .eq('id', quizItemId);
    expect(error).toBeNull();
    expect(data).toHaveLength(1);
    expect(data[0].question_text).toBe('What is 2+2?');
    expect(data[0].correct_option).toBeUndefined();
  });

  test('base quiz_items table: unverified teacher and student get 0 rows; verified teacher/admin get full rows including correct_option', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const { data: studentRead } = await student.client.from('quiz_items').select('*').eq('id', quizItemId);
    expect(studentRead).toHaveLength(0);

    const unverifiedTeacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(unverifiedTeacher.authUserId);
    const { data: unverifiedRead } = await unverifiedTeacher.client.from('quiz_items').select('*').eq('id', quizItemId);
    expect(unverifiedRead).toHaveLength(0);

    const verifiedTeacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(verifiedTeacher.authUserId);
    await adminSet(verifiedTeacher.authUserId, { verified_teacher: true });
    const { data: verifiedRead, error: verifiedError } = await verifiedTeacher.client
      .from('quiz_items')
      .select('*')
      .eq('id', quizItemId);
    expect(verifiedError).toBeNull();
    expect(verifiedRead).toHaveLength(1);
    expect(verifiedRead[0].correct_option).toBe('B');
  });
});
