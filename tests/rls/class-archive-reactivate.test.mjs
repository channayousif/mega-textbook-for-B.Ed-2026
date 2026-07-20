/**
 * T008 [US1] — an eligible teacher (or admin) archives their own class: no
 * new joins are possible but full history stays visible; the same actor
 * reactivates it and it is live again (FR-015, 2026-07-19 clarification).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, adminSet, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, cleanupClasses } from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('class archive and reactivate', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('owning teacher archives then reactivates their own class', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: 'ARC001' });
    createdClasses.push(klass.id);

    const { data: archived, error: archiveError } = await teacher.client
      .from('classes')
      .update({ status: 'archived', archived_reason: 'manual', archived_at: new Date().toISOString() })
      .eq('id', klass.id)
      .select()
      .single();
    expect(archiveError).toBeNull();
    expect(archived.status).toBe('archived');
    expect(archived.archived_reason).toBe('manual');

    // Full history stays visible to the teacher.
    const { data: stillVisible, error: readError } = await teacher.client
      .from('classes')
      .select('*')
      .eq('id', klass.id)
      .single();
    expect(readError).toBeNull();
    expect(stillVisible.status).toBe('archived');

    // New joins are blocked while archived.
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const { error: joinError } = await student.client.rpc('join_class_by_code', { p_code: 'ARC001' });
    expect(joinError).toBeTruthy();

    const { data: reactivated, error: reactivateError } = await teacher.client
      .from('classes')
      .update({ status: 'active', archived_reason: null, archived_at: null })
      .eq('id', klass.id)
      .select()
      .single();
    expect(reactivateError).toBeNull();
    expect(reactivated.status).toBe('active');

    const { error: joinAgainError } = await student.client.rpc('join_class_by_code', { p_code: 'ARC001' });
    expect(joinAgainError).toBeNull();
  });

  test('an admin can archive and reactivate any class', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: 'ARC002' });
    createdClasses.push(klass.id);

    const admin = await createSignedInUser({ role: 'student' });
    createdUsers.push(admin.authUserId);
    await adminSet(admin.authUserId, { role: 'admin' });

    const { error: archiveError } = await admin.client
      .from('classes')
      .update({ status: 'archived', archived_reason: 'manual', archived_at: new Date().toISOString() })
      .eq('id', klass.id);
    expect(archiveError).toBeNull();

    const { error: reactivateError } = await admin.client
      .from('classes')
      .update({ status: 'active', archived_reason: null, archived_at: null })
      .eq('id', klass.id);
    expect(reactivateError).toBeNull();
  });
});
