import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';

/**
 * T010 [US1] — ticks two items on a topic-NN.mdx page, reloads, confirms both
 * stay ticked; opens the same account in a second browser context and
 * confirms both show ticked; signs out, ticks a third item, and confirms a
 * "sign in to sync" hint appears and the tick survives a reload on that
 * browser; signs back in and confirms the third item merges into the account
 * exactly once, and a second sign-out/sign-in cycle does not re-run the merge
 * (SC-001, FR-003; research.md R4). Also asserts: a fixture-simulated wording
 * change on one item's stored snapshot renders that item unticked on the next
 * load while the topic's other, unchanged ticked items stay ticked (FR-009,
 * research.md R3; `/sp.analyze` finding G1); and that switching locale to `ur`
 * renders the page correctly right-to-left and that this topic's Urdu checklist
 * hydrates into the same interactive control (Art. III.8/X convention;
 * `/sp.analyze` finding G4).
 *
 * NOTE (updated - EFMP-302 U1 Urdu re-translation): this topic's
 * `## خود جائزہ فہرست` section used to be a `<!-- TODO -->` placeholder with
 * zero real `- [ ]` items, so the UR section below asserted the
 * graceful-fallback path instead (contract: self-assessment-hydration.md's
 * "hit the next heading before finding a `<ul>` means no items - render
 * unmodified"). EFMP-302 Unit 1 is now `translation_status: reviewed` with
 * four real translated checklist items, so the UR section now asserts the
 * HYDRATED, interactive path directly - the bilingual claim that previously
 * rested only on the mechanism being locale-agnostic by construction
 * (position-keyed, never heading text or item wording - research.md R2/R3).
 * The fallback path itself stays covered by the unit fixtures in
 * `tests/unit/`, which do not depend on any course's translation state.
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';
const TOPIC_PATH = '/semester-1/efmp-302/unit-01/topic-01/';
const TOPIC_PATH_UR = '/ur/semester-1/efmp-302/unit-01/topic-01/';

async function signIn(page: import('@playwright/test').Page, email: string): Promise<void> {
  await page.goto('/app/login');
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(PASSWORD);
  await page.getByRole('button', { name: /^sign in$/i }).click();
  await expect(page).not.toHaveURL(/\/app\/login/);
}

test('self-assessment checklist persists across reloads/devices, syncs on sign-in once, and reacts to a wording change', async ({ browser }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const email = `e2e-self-assessment-${tag}@example.test`;
  const { data: user } = await svc.auth.admin.createUser({
    email, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' },
  });
  const { data: profile } = await svc
    .from('profiles').select('id').eq('auth_user_id', user.user!.id).single();

  const contextA = await browser.newContext();
  const pageA = await contextA.newPage();

  try {
    await signIn(pageA, email);
    await pageA.goto(TOPIC_PATH);

    const cb1 = pageA.getByTestId('self-assessment-checkbox-1');
    const cb2 = pageA.getByTestId('self-assessment-checkbox-2');
    await expect(cb1).toBeEnabled();
    await cb1.check();
    await cb2.check();
    // `.check()` only waits for the DOM to reflect checked - not for the async upsert it
    // triggers to reach the server. Reloading immediately risks aborting that in-flight
    // write. Wait for the network to settle first.
    await pageA.waitForLoadState('networkidle');

    // Reload — both stay ticked (SC-001).
    await pageA.reload();
    await expect(pageA.getByTestId('self-assessment-checkbox-1')).toBeChecked();
    await expect(pageA.getByTestId('self-assessment-checkbox-2')).toBeChecked();

    // Second signed-in browser, same account — both show ticked (SC-001).
    const contextB = await browser.newContext();
    const pageB = await contextB.newPage();
    await signIn(pageB, email);
    await pageB.goto(TOPIC_PATH);
    await expect(pageB.getByTestId('self-assessment-checkbox-1')).toBeChecked();
    await expect(pageB.getByTestId('self-assessment-checkbox-2')).toBeChecked();
    await contextB.close();

    // Sign out on device A; the checklist stays interactive, backed by localStorage.
    await Promise.all([
      pageA.waitForNavigation(),
      pageA.getByRole('button', { name: /sign out/i }).click()
    ]);
    await expect(pageA.getByTestId('self-assessment-sync-hint')).toBeVisible();
    const cb3 = pageA.getByTestId('self-assessment-checkbox-3');
    await cb3.check();
    await pageA.waitForLoadState('networkidle');
    await pageA.reload();
    await expect(pageA.getByTestId('self-assessment-checkbox-3')).toBeChecked();

    // Sign back in — the third item merges into the account exactly once.
    await signIn(pageA, email);
    await pageA.goto(TOPIC_PATH);
    await expect(pageA.getByTestId('self-assessment-checkbox-3')).toBeChecked();
    const { data: mergedOnce } = await svc
      .from('self_assessment_checks').select('*').eq('student_id', profile!.id).eq('item_position', 3);
    expect(mergedOnce).toHaveLength(1);

    // A second sign-out/sign-in cycle does not re-run the merge or clobber
    // the account's own (since-changed) record — untick locally while signed
    // out, then confirm the account's ticked row wins on the next sign-in.
    await Promise.all([
      pageA.waitForNavigation(),
      pageA.getByRole('button', { name: /sign out/i }).click()
    ]);
    await expect(pageA.getByTestId('self-assessment-sync-hint')).toBeVisible();
    await pageA.getByTestId('self-assessment-checkbox-3').uncheck();
    await pageA.waitForLoadState('networkidle');
    await signIn(pageA, email);
    await pageA.goto(TOPIC_PATH);
    await expect(pageA.getByTestId('self-assessment-checkbox-3')).toBeChecked();
    const { data: mergedTwice } = await svc
      .from('self_assessment_checks').select('*').eq('student_id', profile!.id).eq('item_position', 3);
    expect(mergedTwice).toHaveLength(1);

    // A wording change, simulated via the fixture (a stale stored snapshot —
    // not a real content edit): position 1 renders unticked next load, while
    // position 2's untouched tick survives (FR-009).
    await svc.from('self_assessment_checks')
      .update({ item_text_snapshot: 'This wording no longer matches the rendered item.' })
      .eq('student_id', profile!.id).eq('item_position', 1);
    await pageA.reload();
    await expect(pageA.getByTestId('self-assessment-checkbox-1')).not.toBeChecked();
    await expect(pageA.getByTestId('self-assessment-checkbox-2')).toBeChecked();

    // ur/RTL: the page itself renders right-to-left, and this topic's now-reviewed
    // Urdu checklist hydrates into the same interactive control the `en` side uses.
    await Promise.all([
      pageA.waitForNavigation(),
      pageA.getByRole('button', { name: /sign out/i }).click()
    ]);
    // Wait for sign-out to visibly complete before navigating - signOut() itself is
    // async (a network call to revoke the session), and navigating away immediately
    // risks the new page load racing ahead of it, still seeing a stale session.
    await expect(pageA.getByRole('link', { name: /sign in/i })).toBeVisible();
    await pageA.goto(TOPIC_PATH_UR);
    await expect(pageA.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(pageA.getByRole('heading', { name: 'خود جائزہ فہرست' })).toBeVisible();
    // The checklist hydrates and stays interactive in Urdu exactly as it does
    // in English: the mechanism is position-keyed, never heading text or item
    // wording (research.md R2/R3), so the translated items carry the same
    // `self-assessment-checkbox-N` handles. Signed out, the localStorage
    // fallback drives them and the sync hint is offered, same as `en` above.
    // Checked STATE is deliberately not asserted here - localStorage is shared
    // across locales on one origin, so it carries over from the `en` steps.
    await expect(pageA.getByTestId('self-assessment-checkbox-1')).toBeEnabled();
    await expect(pageA.getByTestId('self-assessment-checkbox-4')).toBeEnabled();
    await expect(pageA.getByTestId('self-assessment-sync-hint')).toBeVisible();
  } finally {
    await deleteUsers(svc, user.user!.id);
    await contextA.close();
  }
});
