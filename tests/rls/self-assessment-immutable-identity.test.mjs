/**
 * T009 [US1] — no actor, including the owning student, can change
 * course_code/unit_no/topic_no/locale/item_position on an existing
 * self_assessment_checks row (FR-009's identity guarantee; contract
 * checklist item 3).
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, cleanupUsers, serviceClient,
} from './_helpers.mjs';

function checkRow(overrides = {}) {
  return {
    course_code: 'EFMP-302',
    unit_no: 1,
    topic_no: 1,
    locale: 'en',
    item_position: 1,
    item_text_snapshot: 'I can explain the four features of a profession.',
    checked: true,
    ...overrides,
  };
}

describe.skipIf(!rlsConfigured)('self-assessment immutable identity', () => {
  const createdUsers = [];
  const createdProfileIds = [];

  afterAll(async () => {
    const svc = serviceClient();
    if (createdProfileIds.length) {
      await svc.from('self_assessment_checks').delete().in('student_id', createdProfileIds);
    }
    await cleanupUsers(createdUsers);
  });

  async function insertRow(client, profileId) {
    const { data, error } = await client
      .from('self_assessment_checks')
      .insert({ student_id: profileId, ...checkRow() })
      .select()
      .single();
    if (error) throw new Error(`fixture insert: ${error.message}`);
    return data;
  }

  test('the owning student cannot change course_code, unit_no, topic_no, locale, or item_position', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const { data: profile } = await student.client.from('profiles').select('id').single();
    createdProfileIds.push(profile.id);
    const row = await insertRow(student.client, profile.id);

    const attempts = [
      { course_code: 'GICT-300' },
      { unit_no: 2 },
      { topic_no: 2 },
      { locale: 'ur' },
      { item_position: 2 },
      { created_at: new Date(0).toISOString() },
    ];

    for (const patch of attempts) {
      const { error } = await student.client
        .from('self_assessment_checks').update(patch).eq('id', row.id);
      expect(error, `expected ${JSON.stringify(patch)} to be rejected`).toBeTruthy();
    }

    // checked and item_text_snapshot remain freely writable.
    const { data: allowed, error: allowedError } = await student.client
      .from('self_assessment_checks')
      .update({ checked: false, item_text_snapshot: 'Updated wording.' })
      .eq('id', row.id)
      .select()
      .single();
    expect(allowedError).toBeNull();
    expect(allowed.checked).toBe(false);
    expect(allowed.item_text_snapshot).toBe('Updated wording.');
  });
});
