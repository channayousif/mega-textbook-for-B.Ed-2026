import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { studentNav, teacherNav, type NavItem } from '../../src/lib/dashboardNav';
import { Fixtures, configured, SKIP_REASON, signIn } from './_dashboardFixtures';

/**
 * Spec 011 T012 [US1] and T013 [US1] - the shared app shell.
 *
 * T012: a student and a teacher each reach every item of their menu by clicking it, and the
 * item they land on is the only one marked `aria-current="page"`. At 360px the sidebar is
 * replaced by a drawer that opens from the keyboard, keeps Tab inside itself, closes on
 * Escape and hands focus back to the toggle.
 *
 * T013: the shell's accessibility contract - a named <nav> landmark, `aria-current` on the
 * active item, 44px tap targets in the drawer, and no axe WCAG 2.2 AA violations inside the
 * shell chrome (page bodies are covered by their own specs).
 */
test.skip(!configured, SKIP_REASON);

// The apply link is filtered out for reviewers only; these fresh accounts are not reviewers.
const sidebar = (page: Page) => page.getByRole('navigation', { name: 'Dashboard navigation' });

async function walkMenu(page: Page, items: readonly NavItem[]): Promise<void> {
  for (const item of items) {
    await sidebar(page).locator(`a[data-nav-key="${item.key}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${item.to.replace(/\//g, '\\/')}\\/?(\\?|$)`));
    const current = sidebar(page).locator('a[aria-current="page"]');
    await expect(current).toHaveCount(1);
    await expect(current).toHaveAttribute('data-nav-key', item.key);
  }
}

test('student and teacher reach every menu item by click, with the active one marked', async ({ page, browser }) => {
  test.setTimeout(180_000);
  const fx = new Fixtures();
  try {
    const student = await fx.user('shell-student', 'student');
    const teacher = await fx.user('shell-teacher', 'teacher');

    await signIn(page, student.email);
    await page.goto('/app/dashboard');
    await walkMenu(page, studentNav);

    const teacherContext = await browser.newContext();
    const teacherPage = await teacherContext.newPage();
    try {
      await signIn(teacherPage, teacher.email);
      await teacherPage.goto('/app/teacher');
      await walkMenu(teacherPage, teacherNav);
    } finally {
      await teacherContext.close();
    }
  } finally {
    await fx.teardown();
  }
});

test('360px drawer opens and closes by keyboard, traps focus and returns it to the toggle', async ({ page }) => {
  const fx = new Fixtures();
  try {
    const student = await fx.user('drawer-student', 'student');
    await signIn(page, student.email);
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto('/app/dashboard');

    await expect(sidebar(page)).toBeHidden();
    // The toggle's name flips between "Open menu" and "Close menu", so hold it by its class.
    const toggle = page.locator('button.dashboard-shell__toggle');
    await expect(toggle).toHaveAccessibleName('Open menu');
    await toggle.focus();
    await page.keyboard.press('Enter');

    const drawer = page.getByRole('dialog', { name: 'Dashboard navigation' });
    await expect(drawer).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    // Focus moves into the drawer, and a full cycle of Tab (plus one) never leaves it.
    const focusables = drawer.locator('a[href], button:not([disabled])');
    const count = await focusables.count();
    expect(count).toBeGreaterThan(2);
    for (let i = 0; i <= count; i += 1) {
      const inside = await drawer.evaluate((el) => el.contains(document.activeElement));
      expect(inside, `focus left the drawer after ${i} Tab presses`).toBe(true);
      await page.keyboard.press('Tab');
    }
    await page.keyboard.press('Shift+Tab');
    expect(await drawer.evaluate((el) => el.contains(document.activeElement))).toBe(true);

    // T013: drawer links are at least 44px tall (WCAG 2.5.8 target size, owner rule).
    const heights = await drawer.locator('a.dashboard-shell__navlink').evaluateAll(
      (els) => els.map((el) => el.getBoundingClientRect().height),
    );
    for (const h of heights) expect(h).toBeGreaterThanOrEqual(44);

    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toHaveAccessibleName('Open menu');
  } finally {
    await fx.teardown();
  }
});

test('shell chrome passes axe WCAG 2.2 AA in English and Urdu', async ({ page }) => {
  const fx = new Fixtures();
  try {
    const teacher = await fx.user('axe-teacher', 'teacher');
    await signIn(page, teacher.email);
    for (const path of ['/app/teacher', '/ur/app/teacher']) {
      await page.goto(path);
      await expect(sidebar(page).or(page.getByRole('navigation', { name: 'ڈیش بورڈ نیویگیشن' }))).toBeVisible();
      await expect(page.locator('.dashboard-shell__sidebar a[aria-current="page"]')).toHaveCount(1);
      const result = await new AxeBuilder({ page })
        .include('.dashboard-shell__sidebar')
        .include('.dashboard-shell__topbar')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(result.violations.map((v) => `${path} ${v.id}: ${v.help}`)).toEqual([]);
    }
  } finally {
    await fx.teardown();
  }
});
