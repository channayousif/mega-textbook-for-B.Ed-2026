import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';
import { TEST_PASSWORD } from './_password';

/**
 * Homepage sign-up invitation (owner, 2026-11-23). A signed-out visitor sees a slim fixed
 * bottom banner after a short delay, can close it, and the choice is remembered on the
 * device. A signed-in visitor never sees it. The banner is client-only, so it is absent
 * from the static HTML.
 */
const REGION_EN = 'Account invitation';
const REGION_UR = 'اکاؤنٹ کی دعوت';
const SIGNUP_EN = 'Sign up free';
const SIGNUP_UR = 'مفت اکاؤنٹ بنائیں';

// Read the Supabase keys at test time, not at module load: dotenv populates
// process.env after Playwright has already imported this file in the worker.

test('a signed-out first-time visitor sees the banner after a short delay (EN)', async ({ page }) => {
  await page.goto('/');
  const banner = page.getByRole('region', { name: REGION_EN });
  await page.waitForTimeout(600);
  await expect(banner).toHaveCount(0);
  await expect(banner).toBeVisible({ timeout: 10000 });
  await expect(banner).toContainText('Join classes, submit assignments and follow your grades.');
  await expect(banner.getByRole('link', { name: SIGNUP_EN })).toHaveAttribute('href', '/app/signup?next=%2F');
  await expect(banner.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '/app/login?next=%2F');
  await expect(page.locator('html')).toHaveAttribute('data-cta', '1');
});

test('closing the banner remembers the choice on this device', async ({ page }) => {
  await page.goto('/');
  const banner = page.getByRole('region', { name: REGION_EN });
  await expect(banner).toBeVisible({ timeout: 10000 });
  await banner.getByRole('button', { name: 'Dismiss account invitation' }).click();
  await expect(banner).toHaveCount(0);
  await expect(page.locator('html')).not.toHaveAttribute('data-cta', '1');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('home-cta.dismissed.v1'))).not.toBeNull();
  await page.reload();
  await page.waitForTimeout(1800);
  await expect(page.getByRole('region', { name: REGION_EN })).toHaveCount(0);
});

test('the Urdu homepage shows the same prompt in Urdu', async ({ page }) => {
  await page.goto('/ur/');
  const banner = page.getByRole('region', { name: REGION_UR });
  await expect(banner).toBeVisible({ timeout: 10000 });
  await expect(banner).toContainText('جماعتوں میں شامل ہوں');
  await expect(banner.getByRole('link', { name: SIGNUP_UR })).toHaveAttribute('href', '/app/signup?next=%2Fur%2F');
  await expect(banner.getByRole('button', { name: 'اکاؤنٹ کی دعوت ہٹائیں' })).toBeVisible();
});

test('the banner is a client-only prompt and is not in the static HTML', async ({ request }) => {
  for (const [url, text] of [['/', SIGNUP_EN], ['/ur/', SIGNUP_UR]] as const) {
    const html = await (await request.get(url)).text();
    expect(html).not.toContain(text);
    expect(html).not.toContain('data-cta="1"');
  }
});

test('the banner fits a 360px viewport without horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto('/');
  await expect(page.getByRole('region', { name: REGION_EN })).toBeVisible({ timeout: 10000 });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  expect(overflow).toBe(false);
});

test('reduced motion shows the banner without travel', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const banner = page.getByRole('region', { name: REGION_EN });
  await expect(banner).toBeVisible({ timeout: 10000 });
  expect(await banner.evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
});

test('a signed-in visitor does not see the banner and sees the returning strip instead', async ({ page }) => {
  const supabaseUrl = process.env.DOCUSAURUS_SUPABASE_URL;
  const anonKey = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  test.skip(!(supabaseUrl && anonKey && serviceKey), 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');
  const svc = createClient(supabaseUrl!, serviceKey!, { auth: { persistSession: false } });
  const email = `e2e-cta-${Date.now()}@example.test`;
  const { data: created } = await svc.auth.admin.createUser({
    email,
    password: TEST_PASSWORD,
    email_confirm: true,
    user_metadata: { role: 'student' },
  });

  try {
    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/password/i).fill(TEST_PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);

    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Open my dashboard' })).toBeVisible();
    await page.waitForTimeout(1800);
    await expect(page.getByRole('region', { name: REGION_EN })).toHaveCount(0);
    await expect(page.locator('html')).not.toHaveAttribute('data-cta', '1');
  } finally {
    await deleteUsers(svc, created.user!.id);
  }
});