/**
 * Migration 0051: anyone may insert bounded page feedback; only an admin reads it;
 * nobody but the service role updates or deletes it.
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, anonClient, createSignedInUser, adminSet, cleanupUsers, serviceClient,
} from './_helpers.mjs';

const PATH = '/__rls-page-feedback__';
const row = (overrides = {}) => ({ page_path: PATH, helpful: false, comment: 'Unclear example.', locale: 'en', ...overrides });

describe.skipIf(!rlsConfigured)('page_feedback (0049 + 0051)', () => {
  const created = [];
  afterAll(async () => {
    await serviceClient().from('page_feedback').delete().eq('page_path', PATH);
    await cleanupUsers(created);
  });

  test('anonymous insert is bounded; reads are admin-only; no client update or delete', async () => {
    const anon = anonClient();
    expect((await anon.from('page_feedback').insert(row())).error).toBeNull();
    expect((await anon.from('page_feedback').insert(row({ comment: null, helpful: true }))).error).toBeNull();

    // Limits: oversized or empty comment, a path that is not a site path, an unknown locale.
    for (const bad of [
      row({ comment: 'x'.repeat(501) }),
      row({ comment: '' }),
      row({ page_path: 'https://spam.example/' }),
      row({ page_path: `/${'a'.repeat(300)}` }),
      row({ locale: 'fr' }),
    ]) {
      expect((await anon.from('page_feedback').insert(bad)).error, JSON.stringify(bad).slice(0, 80)).toBeTruthy();
    }

    // Anonymous and non-admin readers see nothing.
    const anonRead = await anon.from('page_feedback').select('id').eq('page_path', PATH);
    expect(anonRead.data ?? []).toEqual([]);
    const teacher = await createSignedInUser({ role: 'teacher' }); created.push(teacher.authUserId);
    const teacherRead = await teacher.client.from('page_feedback').select('id').eq('page_path', PATH);
    expect(teacherRead.data).toEqual([]);

    // An admin reads both rows.
    const admin = await createSignedInUser({ role: 'student' }); created.push(admin.authUserId);
    await adminSet(admin.authUserId, { role: 'admin' });
    const adminRead = await admin.client.from('page_feedback').select('id').eq('page_path', PATH);
    expect(adminRead.data).toHaveLength(2);

    // No client role may change or remove feedback, admin included.
    await admin.client.from('page_feedback').update({ comment: 'edited' }).eq('page_path', PATH);
    await admin.client.from('page_feedback').delete().eq('page_path', PATH);
    const after = await serviceClient().from('page_feedback').select('comment').eq('page_path', PATH);
    expect(after.data).toHaveLength(2);
    expect(after.data.map((r) => r.comment)).not.toContain('edited');
  });
});
