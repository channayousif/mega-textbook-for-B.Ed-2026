/**
 * T036 [US6] — a direct client insert/update on student_achievements is
 * denied for any caller, including admin — only grant_achievement()
 * (internal) may write (contract checklist items 11, 13).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, adminSet, cleanupUsers } from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('student_achievements — no client write policy', () => {
  const createdUsers = [];

  afterAll(async () => {
    await cleanupUsers(createdUsers);
  });

  test('a student cannot directly insert a student_achievements row', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const profile = await getProfileByAuthId(student.authUserId);

    const { data, error } = await student.client
      .from('student_achievements')
      .insert({ student_id: profile.id, achievement_key: 'first_submission' })
      .select();
    expect(error).toBeTruthy();
    expect(data ?? []).toHaveLength(0);
  });

  test('an admin cannot directly insert a student_achievements row either', async () => {
    const admin = await createSignedInUser({ role: 'student' }); // requested role is untrusted (0007 allowlist); elevate below
    createdUsers.push(admin.authUserId);
    await adminSet(admin.authUserId, { role: 'admin' });
    // Re-sign-in not required — RLS re-evaluates is_admin() per request from profiles state.
    const profile = await getProfileByAuthId(admin.authUserId);

    const { data, error } = await admin.client
      .from('student_achievements')
      .insert({ student_id: profile.id, achievement_key: 'first_submission' })
      .select();
    expect(error).toBeTruthy();
    expect(data ?? []).toHaveLength(0);
  });
});
