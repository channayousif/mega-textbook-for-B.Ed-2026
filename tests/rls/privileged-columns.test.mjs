/**
 * T036 [US3] — a non-admin updating their own role/verified_teacher/status
 * ERRORS, not a silent no-op (FR-006, FR-010a). This is the SC-004 evidence
 * set: the risk this feature carries is an over-permissive policy, which only
 * a negative test can detect.
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, cleanupUsers, expectPermissionError,
} from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('privileged-column self-update is always rejected', () => {
  const created = [];

  afterAll(async () => {
    await cleanupUsers(created);
  });

  test('a non-admin cannot set their own role', async () => {
    const user = await createSignedInUser({ role: 'student' });
    created.push(user.authUserId);
    const { error } = await user.client.from('profiles').update({ role: 'teacher' }).eq('auth_user_id', user.authUserId);
    expectPermissionError(error, expect);
  });

  test('a non-admin cannot set their own verified_teacher', async () => {
    const user = await createSignedInUser({ role: 'teacher' });
    created.push(user.authUserId);
    const { error } = await user.client.from('profiles').update({ verified_teacher: true }).eq('auth_user_id', user.authUserId);
    expectPermissionError(error, expect);
  });

  test('a non-admin cannot set their own status', async () => {
    const user = await createSignedInUser({ role: 'student' });
    created.push(user.authUserId);
    const { error } = await user.client.from('profiles').update({ status: 'suspended' }).eq('auth_user_id', user.authUserId);
    expectPermissionError(error, expect);
  });

  test('a teacher cannot self-grant admin via role="admin"', async () => {
    const user = await createSignedInUser({ role: 'teacher' });
    created.push(user.authUserId);
    const { error } = await user.client.from('profiles').update({ role: 'admin' }).eq('auth_user_id', user.authUserId);
    expectPermissionError(error, expect);
  });
});
