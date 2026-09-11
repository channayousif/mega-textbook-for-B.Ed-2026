/**
 * T010 [US1] — column-level authorization for `classes` UPDATEs
 * (data-model.md `guard_class_updates()`, U1, N1):
 *  - a non-admin changing teacher_id/course_code/name/term_label errors
 *  - the owning teacher can change join_code/status on their own class
 *  - a non-owning teacher touching another teacher's join_code or status is a
 *    silent 0-row no-op (the row is invisible to them at the RLS row level,
 *    before the trigger even runs)
 *  - a SUSPENDED (but still owning) teacher's join_code reissue is REJECTED
 *    WITH AN ERROR — ownership still resolves (current_profile_id() does not
 *    check status), so the row-level policy still matches; the trigger's
 *    is_active_user() check is what raises here, even though they are not
 *    attempting a status change
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, adminSet, getProfileByAuthId, serviceClient, cleanupUsers,
} from './_helpers.mjs';
import { createClassFixture, cleanupClasses, randomJoinCode } from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('classes guard trigger — column and ownership authorization', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('non-admin cannot change immutable columns', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);

    const { error } = await teacher.client
      .from('classes')
      .update({ name: 'Renamed Section' })
      .eq('id', klass.id);
    expect(error).toBeTruthy();
    expect(error.message).toContain('not editable');
  });

  test('owning teacher can change join_code and status on their own class', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);
    const reissuedCode = randomJoinCode();

    const { error: codeError } = await teacher.client
      .from('classes')
      .update({ join_code: reissuedCode })
      .eq('id', klass.id);
    expect(codeError).toBeNull();

    const { error: statusError } = await teacher.client
      .from('classes')
      .update({ status: 'archived', archived_reason: 'manual', archived_at: new Date().toISOString() })
      .eq('id', klass.id);
    expect(statusError).toBeNull();
  });

  test("a non-owning teacher cannot change join_code or status on another teacher's class", async () => {
    const owner = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(owner.authUserId);
    const joinCode = randomJoinCode();
    const klass = await createClassFixture(owner.authUserId, { join_code: joinCode });
    createdClasses.push(klass.id);

    const otherTeacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(otherTeacher.authUserId);

    const svc = serviceClient();

    const { error: codeError } = await otherTeacher.client
      .from('classes')
      .update({ join_code: 'HIJACK' })
      .eq('id', klass.id);
    expect(codeError).toBeNull(); // row invisible to non-owner — silent 0-row filter, not a raise
    const { data: unchangedCode } = await svc.from('classes').select('join_code').eq('id', klass.id).single();
    expect(unchangedCode.join_code).toBe(joinCode);

    const { error: statusError } = await otherTeacher.client
      .from('classes')
      .update({ status: 'archived', archived_reason: 'manual', archived_at: new Date().toISOString() })
      .eq('id', klass.id);
    expect(statusError).toBeNull();
    const { data: unchangedStatus } = await svc.from('classes').select('status').eq('id', klass.id).single();
    expect(unchangedStatus.status).toBe('active');
  });

  test('a suspended owning teacher cannot reissue their own join_code (raises, not a silent no-op)', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const joinCode = randomJoinCode();
    const klass = await createClassFixture(teacher.authUserId, { join_code: joinCode });
    createdClasses.push(klass.id);

    const admin = await createSignedInUser({ role: 'student' });
    createdUsers.push(admin.authUserId);
    await adminSet(admin.authUserId, { role: 'admin' });
    const teacherProfile = await getProfileByAuthId(teacher.authUserId);
    await admin.client.from('profiles').update({ status: 'suspended' }).eq('id', teacherProfile.id);

    const { error } = await teacher.client
      .from('classes')
      .update({ join_code: 'SNEAKY' })
      .eq('id', klass.id);
    expect(error).toBeTruthy();
    expect(error.message).toContain('active owning teacher');

    const svc = serviceClient();
    const { data: unchanged } = await svc.from('classes').select('join_code').eq('id', klass.id).single();
    expect(unchanged.join_code).toBe(joinCode);
  });
});
