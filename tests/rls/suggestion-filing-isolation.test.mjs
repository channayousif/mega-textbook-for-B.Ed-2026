/**
 * T009 [US2] — a teacher can insert their own `improvement_suggestions` row
 * (status defaults to `submitted`); an insert with an explicit
 * non-`submitted` status is rejected; a teacher cannot `SELECT` another
 * teacher's individual suggestion row (FR-003, FR-004, contract checklist
 * item 7; data-model.md access-control matrix item 3).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, expectPermissionError, cleanupUsers } from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('suggestion filing isolation', () => {
  const createdUsers = [];
  const createdSuggestions = [];

  afterAll(async () => {
    const { serviceClient } = await import('./_helpers.mjs');
    const svc = serviceClient();
    await Promise.allSettled(
      createdSuggestions.map((id) => svc.from('improvement_suggestions').delete().eq('id', id)),
    );
    await cleanupUsers(createdUsers);
  });

  test('a teacher can file a suggestion, defaulting to submitted', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const { data: teacherProfile } = await teacher.client.from('profiles').select('id').single();

    const { data, error } = await teacher.client
      .from('improvement_suggestions')
      .insert({
        teacher_id: teacherProfile.id,
        page_slug: '/docs/semester-1/efmp-301/unit-01/activities',
        section_anchor: 'reflect-and-discuss',
        locale: 'en',
        course_code: 'EFMP-301',
        unit_no: 1,
        category: 'clarity',
        body: 'This paragraph is confusing.',
      })
      .select()
      .single();
    expect(error).toBeNull();
    expect(data.status).toBe('submitted');
    createdSuggestions.push(data.id);
  });

  test('a teacher cannot insert a suggestion with a forged non-submitted status', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const { data: teacherProfile } = await teacher.client.from('profiles').select('id').single();

    const { error } = await teacher.client
      .from('improvement_suggestions')
      .insert({
        teacher_id: teacherProfile.id,
        page_slug: '/docs/semester-1/efmp-301/unit-01/activities',
        locale: 'en',
        course_code: 'EFMP-301',
        unit_no: 1,
        category: 'other',
        body: 'Forged status attempt.',
        status: 'accepted',
      })
      .select()
      .single();
    expectPermissionError(error, expect);
  });

  test('a teacher cannot SELECT another teacher\'s individual suggestion row', async () => {
    const teacherA = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacherA.authUserId);
    const { data: teacherAProfile } = await teacherA.client.from('profiles').select('id').single();
    const { data: suggestion } = await teacherA.client
      .from('improvement_suggestions')
      .insert({
        teacher_id: teacherAProfile.id,
        page_slug: '/docs/semester-1/efmp-301/unit-01/activities',
        locale: 'en',
        course_code: 'EFMP-301',
        unit_no: 1,
        category: 'typo',
        body: 'Isolation fixture.',
      })
      .select()
      .single();
    createdSuggestions.push(suggestion.id);

    const teacherB = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacherB.authUserId);
    const { data: seenByB } = await teacherB.client
      .from('improvement_suggestions').select('*').eq('id', suggestion.id);
    expect(seenByB).toHaveLength(0);
  });
});
