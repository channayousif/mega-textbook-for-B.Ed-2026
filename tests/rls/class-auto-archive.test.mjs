/**
 * T009 [US1] — an admin changing a teacher's role away from 'teacher' (or
 * suspending them) auto-archives every active class they own with
 * archived_reason='role_change'; the now-ineligible teacher cannot
 * reactivate it themselves, but an admin can (FR-020, 2026-07-19 clarification).
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, adminSet, getProfileByAuthId, serviceClient, cleanupUsers,
} from './_helpers.mjs';
import { createClassFixture, cleanupClasses } from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('auto-archive on teacher ineligibility', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('admin changing role away from teacher auto-archives their active classes', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: 'AUT001' });
    createdClasses.push(klass.id);

    const admin = await createSignedInUser({ role: 'student' });
    createdUsers.push(admin.authUserId);
    await adminSet(admin.authUserId, { role: 'admin' });

    const teacherProfile = await getProfileByAuthId(teacher.authUserId);
    const { error: roleChangeError } = await admin.client
      .from('profiles')
      .update({ role: 'student' })
      .eq('id', teacherProfile.id);
    expect(roleChangeError).toBeNull();

    const svc = serviceClient();
    const { data: afterChange } = await svc.from('classes').select('*').eq('id', klass.id).single();
    expect(afterChange.status).toBe('archived');
    expect(afterChange.archived_reason).toBe('role_change');

    // The now-ineligible former teacher cannot reactivate it themselves —
    // ownership still resolves (current_profile_id() doesn't check role/status),
    // so the row-level policy still matches; is_eligible_teacher() is what rejects it.
    const { error: selfReactivateError } = await teacher.client
      .from('classes')
      .update({ status: 'active', archived_reason: null, archived_at: null })
      .eq('id', klass.id);
    expect(selfReactivateError).toBeTruthy();

    const { error: adminReactivateError } = await admin.client
      .from('classes')
      .update({ status: 'active', archived_reason: null, archived_at: null })
      .eq('id', klass.id);
    expect(adminReactivateError).toBeNull();
  });

  test('admin suspending a teacher auto-archives their active classes', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: 'AUT002' });
    createdClasses.push(klass.id);

    const admin = await createSignedInUser({ role: 'student' });
    createdUsers.push(admin.authUserId);
    await adminSet(admin.authUserId, { role: 'admin' });

    const teacherProfile = await getProfileByAuthId(teacher.authUserId);
    await admin.client.from('profiles').update({ status: 'suspended' }).eq('id', teacherProfile.id);

    const svc = serviceClient();
    const { data: afterSuspend } = await svc.from('classes').select('*').eq('id', klass.id).single();
    expect(afterSuspend.status).toBe('archived');
    expect(afterSuspend.archived_reason).toBe('role_change');
  });
});
