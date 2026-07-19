/**
 * T037 [US3] — admin changing another user's role succeeds AND writes exactly
 * one audit row with actor_id = the admin (FR-007, FR-018).
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, adminSet, getProfileByAuthId, cleanupUsers,
} from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('admin role change writes exactly one audit row', () => {
  const created = [];

  afterAll(async () => {
    await cleanupUsers(created);
  });

  test('role change succeeds and produces one audit row attributing the acting admin', async () => {
    const admin = await createSignedInUser({ role: 'student' });
    created.push(admin.authUserId);
    await adminSet(admin.authUserId, { role: 'admin' });

    const target = await createSignedInUser({ role: 'student' });
    created.push(target.authUserId);
    const targetProfile = await getProfileByAuthId(target.authUserId);

    const before = await admin.client
      .from('privilege_audit')
      .select('id')
      .eq('subject_id', targetProfile.id)
      .eq('change_type', 'role');
    const countBefore = before.data?.length ?? 0;

    const { error: updateError } = await admin.client
      .from('profiles')
      .update({ role: 'teacher' })
      .eq('auth_user_id', target.authUserId);
    expect(updateError).toBeNull();

    const after = await admin.client
      .from('privilege_audit')
      .select('*')
      .eq('subject_id', targetProfile.id)
      .eq('change_type', 'role')
      .order('created_at', { ascending: false });

    expect(after.data).toHaveLength(countBefore + 1);
    const row = after.data[0];
    const adminProfile = await getProfileByAuthId(admin.authUserId);
    expect(row.actor_id).toBe(adminProfile.id);
    expect(row.old_value).toBe('student');
    expect(row.new_value).toBe('teacher');
  });
});
