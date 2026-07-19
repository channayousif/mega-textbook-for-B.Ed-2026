/**
 * T024a [US1] — a user can update `full_name` on their own row; the same
 * statement touching a privileged column errors (FR-010 positive case paired
 * with FR-006, contracts/auth-operations.md §D item 7).
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, cleanupUsers, expectPermissionError,
} from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('own-profile update boundary', () => {
  const created = [];

  afterAll(async () => {
    await cleanupUsers(created);
  });

  test('updating own full_name succeeds', async () => {
    const user = await createSignedInUser({ role: 'student' });
    created.push(user.authUserId);

    const { error } = await user.client
      .from('profiles')
      .update({ full_name: 'Test Name' })
      .eq('auth_user_id', user.authUserId);

    expect(error).toBeNull();
  });

  test('the same statement touching role/verified_teacher/status errors', async () => {
    const user = await createSignedInUser({ role: 'student' });
    created.push(user.authUserId);

    const roleAttempt = await user.client
      .from('profiles')
      .update({ full_name: 'Test Name', role: 'admin' })
      .eq('auth_user_id', user.authUserId);
    expectPermissionError(roleAttempt.error, expect);

    const verifiedAttempt = await user.client
      .from('profiles')
      .update({ verified_teacher: true })
      .eq('auth_user_id', user.authUserId);
    expectPermissionError(verifiedAttempt.error, expect);

    const statusAttempt = await user.client
      .from('profiles')
      .update({ status: 'suspended' })
      .eq('auth_user_id', user.authUserId);
    expectPermissionError(statusAttempt.error, expect);
  });
});
