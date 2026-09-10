/**
 * Spec 011 US7 / FR-016 - assignment_templates RLS (migration 0041).
 * A teacher reaches only their own templates (SELECT/INSERT/UPDATE/DELETE).
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, getProfileByAuthId, cleanupUsers,
} from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('assignment_templates RLS', () => {
  const createdUsers = [];
  afterAll(async () => { await cleanupUsers(createdUsers); });

  test('a teacher creates and reads their own template; a second teacher cannot see it', async () => {
    const a = await createSignedInUser({ role: 'teacher' });
    const b = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(a.authUserId, b.authUserId);
    const pa = await getProfileByAuthId(a.authUserId);

    const { data: tpl, error } = await a.client
      .from('assignment_templates')
      .insert({
        teacher_id: pa.id, name: 'Weekly reflection', title_pattern: 'Week N reflection',
        instructions: 'Half a page.', max_mark: 10, allow_late: true,
      })
      .select()
      .single();
    expect(error).toBeNull();

    const { data: aSees } = await a.client.from('assignment_templates').select('*');
    expect(aSees).toHaveLength(1);

    const { data: bSees } = await b.client.from('assignment_templates').select('*');
    expect(bSees).toHaveLength(0);

    const { data: bDel } = await b.client
      .from('assignment_templates').delete().eq('id', tpl.id).select();
    expect(bDel ?? []).toHaveLength(0);

    const { error: aDelErr } = await a.client
      .from('assignment_templates').delete().eq('id', tpl.id);
    expect(aDelErr).toBeNull();
  });
});
