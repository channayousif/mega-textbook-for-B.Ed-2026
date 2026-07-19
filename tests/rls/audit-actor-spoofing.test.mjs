/**
 * T039 [US3] — a client-supplied actor_id can never override the
 * trigger-derived value (FR-018). Two angles: privilege_audit has no INSERT
 * policy at all (0006), so a client cannot forge a row directly; and when a
 * real audit row IS produced (by the 0009 trigger, as a side effect of an
 * admin's UPDATE on profiles), its actor_id correctly and exclusively
 * reflects the ACTUAL calling admin — proven with two different admins each
 * changing a different subject, confirming attribution isn't shared, stale,
 * or swappable.
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, adminSet, getProfileByAuthId, cleanupUsers,
  expectPermissionError,
} from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('audit actor_id cannot be client-supplied or spoofed', () => {
  const created = [];

  afterAll(async () => {
    await cleanupUsers(created);
  });

  test('a direct INSERT with a crafted actor_id is rejected outright (no INSERT policy)', async () => {
    const admin = await createSignedInUser({ role: 'student' });
    created.push(admin.authUserId);
    await adminSet(admin.authUserId, { role: 'admin' });
    const adminProfile = await getProfileByAuthId(admin.authUserId);

    const { error } = await admin.client.from('privilege_audit').insert({
      subject_id: adminProfile.id,
      actor_id: '00000000-0000-0000-0000-000000000000', // spoofed — not the caller
      change_type: 'role',
      new_value: 'admin',
    });
    expectPermissionError(error, expect);
  });

  test('two different admins changing different subjects each get correctly attributed', async () => {
    const adminA = await createSignedInUser({ role: 'student' });
    created.push(adminA.authUserId);
    await adminSet(adminA.authUserId, { role: 'admin' });
    const adminAProfile = await getProfileByAuthId(adminA.authUserId);

    const adminB = await createSignedInUser({ role: 'student' });
    created.push(adminB.authUserId);
    await adminSet(adminB.authUserId, { role: 'admin' });
    const adminBProfile = await getProfileByAuthId(adminB.authUserId);

    const subjectA = await createSignedInUser({ role: 'student' });
    created.push(subjectA.authUserId);
    const subjectAProfile = await getProfileByAuthId(subjectA.authUserId);

    const subjectB = await createSignedInUser({ role: 'student' });
    created.push(subjectB.authUserId);
    const subjectBProfile = await getProfileByAuthId(subjectB.authUserId);

    await adminA.client.from('profiles').update({ role: 'teacher' }).eq('auth_user_id', subjectA.authUserId);
    await adminB.client.from('profiles').update({ role: 'teacher' }).eq('auth_user_id', subjectB.authUserId);

    const rowA = await adminA.client
      .from('privilege_audit').select('actor_id')
      .eq('subject_id', subjectAProfile.id).eq('change_type', 'role')
      .order('created_at', { ascending: false }).limit(1).single();
    const rowB = await adminB.client
      .from('privilege_audit').select('actor_id')
      .eq('subject_id', subjectBProfile.id).eq('change_type', 'role')
      .order('created_at', { ascending: false }).limit(1).single();

    expect(rowA.data.actor_id).toBe(adminAProfile.id);
    expect(rowB.data.actor_id).toBe(adminBProfile.id);
    expect(rowA.data.actor_id).not.toBe(rowB.data.actor_id);
  });
});
