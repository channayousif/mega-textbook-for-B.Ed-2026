/**
 * T038 [US3] — non-admin SELECT on privilege_audit returns 0 rows;
 * INSERT/UPDATE/DELETE all error for EVERY role including admin (FR-019).
 * The audit trail must be append-only and admin-readable-only — even an
 * admin cannot edit or delete history, only the trigger can write it.
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, adminSet, cleanupUsers, expectPermissionError,
} from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('privilege_audit is append-only and admin-readable only', () => {
  const created = [];

  afterAll(async () => {
    await cleanupUsers(created);
  });

  test('a non-admin (student) sees 0 audit rows, even ones about themselves', async () => {
    const user = await createSignedInUser({ role: 'student' });
    created.push(user.authUserId);
    const { data, error } = await user.client.from('privilege_audit').select('*');
    expect(error).toBeNull();
    expect(data).toHaveLength(0);
  });

  test.each(['student', 'admin'])('%s cannot INSERT into privilege_audit', async (role) => {
    const user = await createSignedInUser({ role: 'student' });
    created.push(user.authUserId);
    if (role === 'admin') await adminSet(user.authUserId, { role: 'admin' });

    const { error } = await user.client.from('privilege_audit').insert({
      subject_id: '00000000-0000-0000-0000-000000000000',
      actor_id: '00000000-0000-0000-0000-000000000000',
      change_type: 'role',
      new_value: 'admin',
    });
    expectPermissionError(error, expect);
  });

  test.each(['student', 'admin'])('%s cannot UPDATE or DELETE privilege_audit rows', async (role) => {
    const user = await createSignedInUser({ role: 'student' });
    created.push(user.authUserId);
    if (role === 'admin') await adminSet(user.authUserId, { role: 'admin' });

    // No row needs to exist for RLS to deny the statement — the policy check
    // happens before row-matching, so this proves denial even without a fixture.
    const updateResult = await user.client
      .from('privilege_audit')
      .update({ new_value: 'tampered' })
      .eq('id', 1);
    expectPermissionError(updateResult.error, expect);

    const deleteResult = await user.client.from('privilege_audit').delete().eq('id', 1);
    expectPermissionError(deleteResult.error, expect);
  });
});
