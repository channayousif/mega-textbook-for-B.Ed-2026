import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, adminSet, anonClient, serviceClient, cleanupUsers } from './_helpers.mjs';

// Feature 028 (migration 0052): news_items is the first table anonymous visitors can read.
// Anyone sees live published rows only; admins also see drafts, scheduled, expired and
// archived rows; every write goes through the admin-checked, audited RPCs.
const TAG = 'ZZRLS news';
const args = (overrides = {}) => ({
  p_id: null, p_kind: 'news', p_title_en: `${TAG} item`, p_title_ur: null, p_link_url: null, p_icon: 'megaphone',
  p_pinned: false, p_published: true, p_starts_at: null, p_ends_at: null, ...overrides,
});
const titles = (rows) => (rows ?? []).map((r) => r.title_en).filter((t) => t.startsWith(TAG)).sort();

describe.skipIf(!rlsConfigured)('news_items', () => {
  const created = [];
  afterAll(async () => {
    const svc = serviceClient();
    const { data } = await svc.from('news_items').select('id').like('title_en', `${TAG}%`);
    const ids = (data ?? []).map((r) => r.id);
    if (ids.length) {
      await svc.from('admin_action_history').delete().in('target_id', ids);
      await svc.from('news_items').delete().in('id', ids);
    }
    await cleanupUsers(created);
  });

  test('public sees live rows only; writes are admin-only and audited', async () => {
    const admin = await createSignedInUser({ role: 'student' }); created.push(admin.authUserId);
    await adminSet(admin.authUserId, { role: 'admin' });
    const teacher = await createSignedInUser({ role: 'teacher' }); created.push(teacher.authUserId);
    const anon = anonClient();
    const day = 86_400_000;
    const iso = (offset) => new Date(Date.now() + offset).toISOString();

    // Non-admins cannot write, through the RPC or directly.
    expect((await teacher.client.rpc('upsert_news_item', args())).error).toBeTruthy();
    expect((await anon.rpc('upsert_news_item', args())).error).toBeTruthy();
    expect((await teacher.client.from('news_items').insert({ title_en: `${TAG} direct` })).error).toBeTruthy();
    expect((await anon.from('news_items').insert({ title_en: `${TAG} direct` })).error).toBeTruthy();

    const make = async (o) => {
      const r = await admin.client.rpc('upsert_news_item', args(o));
      expect(r.error, JSON.stringify(o)).toBeNull();
      return r.data;
    };
    const live = await make({ p_title_en: `${TAG} live`, p_title_ur: 'خبر', p_link_url: '/semester-1/' });
    await make({ p_title_en: `${TAG} draft`, p_published: false });
    await make({ p_title_en: `${TAG} scheduled`, p_starts_at: iso(day) });
    await make({ p_title_en: `${TAG} expired`, p_starts_at: iso(-3 * day), p_ends_at: iso(-day) });
    const toArchive = await make({ p_title_en: `${TAG} archived` });
    expect((await admin.client.rpc('archive_news_item', { p_id: toArchive.id })).error).toBeNull();

    // Unsafe links, unknown icons and inverted windows are refused.
    for (const bad of [{ p_link_url: 'javascript:alert(1)' }, { p_link_url: 'http://x.test' }, { p_icon: 'skull' },
      { p_starts_at: iso(0), p_ends_at: iso(-day) }]) {
      expect((await admin.client.rpc('upsert_news_item', args(bad))).error, JSON.stringify(bad)).toBeTruthy();
    }

    for (const client of [anon, teacher.client]) {
      const { data, error } = await client.from('news_items').select('title_en').like('title_en', `${TAG}%`);
      expect(error).toBeNull();
      expect(titles(data)).toEqual([`${TAG} live`]);
    }
    const all = await admin.client.from('news_items').select('title_en').like('title_en', `${TAG}%`);
    expect(titles(all.data)).toEqual([`${TAG} archived`, `${TAG} draft`, `${TAG} expired`, `${TAG} live`, `${TAG} scheduled`]);

    // Updating keeps the row; teachers cannot update or archive it.
    const upd = await admin.client.rpc('upsert_news_item', args({ p_id: live.id, p_title_en: `${TAG} live 2`, p_pinned: true }));
    expect(upd.error).toBeNull();
    expect(upd.data).toMatchObject({ id: live.id, pinned: true });
    expect((await teacher.client.rpc('archive_news_item', { p_id: live.id })).error).toBeTruthy();
    expect((await teacher.client.from('news_items').update({ title_en: `${TAG} hacked` }).eq('id', live.id)).error).toBeTruthy();

    const audit = await serviceClient().from('admin_action_history').select('action').eq('target_id', live.id);
    expect((audit.data ?? []).map((a) => a.action).sort()).toEqual(['news_item_created', 'news_item_updated']);
  });
});
