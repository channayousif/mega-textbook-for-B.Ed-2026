import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';

const url = process.env.DOCUSAURUS_SUPABASE_URL;
const anon = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
test.skip(!(url && anon && service), 'requires a migrated Supabase test instance');
const password = 'Test-Passw0rd!';

async function signIn(page: Page, email: string) {
  await page.goto('/app/login');
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(password);
  await page.getByRole('button', { name: /^sign in$/i }).click();
  await expect(page).not.toHaveURL(/\/app\/login/);
}

test('admin can reach the landing page and inspect selected records', async ({ page }) => {
  const svc = createClient(url!, service!, { auth: { persistSession: false } });
  const stamp = Date.now();
  const adminEmail = `admin-a11y-${stamp}@example.test`;
  const teacherEmail = `teacher-a11y-${stamp}@example.test`;
  const admin = await svc.auth.admin.createUser({ email: adminEmail, password, email_confirm: true, user_metadata: { role: 'student' } });
  const teacher = await svc.auth.admin.createUser({ email: teacherEmail, password, email_confirm: true, user_metadata: { role: 'teacher' } });
  let classId: string | null = null;
  try {
    const adminProfile = await svc.from('profiles').select('id').eq('auth_user_id', admin.data.user!.id).single();
    const teacherProfile = await svc.from('profiles').select('id').eq('auth_user_id', teacher.data.user!.id).single();
    await svc.from('profiles').update({ role: 'admin' }).eq('id', adminProfile.data!.id);
    const klass = await svc.from('classes').insert({ teacher_id: teacherProfile.data!.id, course_code: 'EFMP-301', name: `Admin record ${stamp}`, term_label: 'Test', join_code: `${stamp.toString(36)}R`.slice(-6) }).select('id').single();
    classId = klass.data!.id;

    await signIn(page, adminEmail);
    await page.getByRole('link', { name: 'Admin', exact: true }).click();
    await expect(page).toHaveURL(/\/app\/admin\/?$/);
    await expect(page.getByRole('heading', { name: 'Admin dashboard' })).toBeVisible();
    const englishAudit = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
    expect(englishAudit.violations).toEqual([]);
    await page.getByRole('link', { name: /Classes and learner records/i }).click();
    await page.getByLabel('Select class').selectOption(classId);
    await expect(page.getByRole('heading', { name: 'Roster' })).toBeVisible();
    await page.getByLabel('Reason for class action').fill('Test selected-record action.');
    await page.getByRole('button', { name: 'Archive selected class' }).click();
    await expect(page.getByText(/Status: archived/)).toBeVisible();
    await page.getByLabel('Select person').selectOption(teacherProfile.data!.id);
    await expect(page.getByText('Classes taught')).toBeVisible();

    await page.goto('/ur/app/admin/');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('h1')).toContainText('منتظم');
    await page.setViewportSize({ width: 360, height: 780 });
    const firstCard = page.locator('.work-card').first();
    await firstCard.focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('.work-card').nth(1)).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
    expect(audit.violations).toEqual([]);
  } finally {
    if (classId) await svc.from('classes').delete().eq('id', classId);
    await deleteUsers(svc, admin.data.user!.id, teacher.data.user!.id);
  }
});

for (const role of ['student','teacher'] as const) {
  test(`${role} home supports mobile keyboard navigation and English/Urdu AA checks`, async ({ page }) => {
    const svc = createClient(url!, service!, { auth: { persistSession: false } });
    const email = `${role}-a11y-${Date.now()}@example.test`;
    const created = await svc.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { role } });
    const route = role === 'student' ? '/app/dashboard/' : '/app/teacher/';
    try {
      await signIn(page, email);
      for (const locale of ['','/ur']) {
        await page.setViewportSize({ width: 360, height: 780 });
        await page.goto(`${locale}${route}`);
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('html')).toHaveAttribute('dir', locale ? 'rtl' : 'ltr');
        const menu = page.getByRole('button', { name: /open menu|مینو کھولیں/i });
        await menu.click();
        await expect(page.getByRole('dialog', { name: /dashboard navigation|ڈیش بورڈ نیویگیشن/i })).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(menu).toBeFocused();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
        const audit = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
        expect(audit.violations).toEqual([]);
      }
    } finally { await deleteUsers(svc, created.data.user!.id); }
  });
}
