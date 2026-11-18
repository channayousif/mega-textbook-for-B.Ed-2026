import { test, expect } from '@playwright/test';

/** Owner brief, 2026-11-04: a SaaS-style landing page with a prominent returning path. */
test('a first-time visitor sees the audiences, features and no welcome strip', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Platform for current & future teachers and teacher educators');
  await expect(page.getByRole('link', { name: 'Resume' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Teachers' }).click();
  await expect(page.getByText('Run your class from one place')).toBeVisible();
  await expect(page.getByText('Study each semester in your stronger language')).toBeHidden();
});

test('a reader without an account can resume from the home page', async ({ page }) => {
  await page.goto('/semester-1/efmp-302/unit-01/topic-01/');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('last-read'))).toContain('topic-01');
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-returning', '1');
  const resume = page.getByRole('link', { name: 'Resume' });
  await expect(resume).toBeVisible();
  await resume.click();
  await expect(page).toHaveURL(/efmp-302\/unit-01\/topic-01/);
});

test('every landing panel is in the static HTML, for search engines and no JavaScript', async ({ request }) => {
  const html = await (await request.get('/')).text();
  for (const text of ['Run your class from one place', 'Bring it to your college', 'Become a reviewer', 'Do I need an account to read?']) {
    expect(html).toContain(text);
  }
});

test('the partner logos revolve, and the visitor can stop them', async ({ page }) => {
  await page.goto('/');
  const track = page.locator('[class*="track"]').first();
  await expect(track).toHaveCSS('animation-play-state', 'running');
  await page.getByRole('button', { name: 'Pause logos' }).click();
  await expect(track).toHaveCSS('animation-play-state', 'paused');
  await expect(page.getByRole('button', { name: 'Play logos' })).toBeVisible();
});

test('the partner logos appear only on the landing page, without REEC', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('img', { name: 'STEDA' })).toHaveCount(1);
  await expect(page.getByRole('img', { name: 'REEC' })).toHaveCount(0);
  await page.goto('/about/');
  await expect(page.getByRole('button', { name: 'Pause logos' })).toHaveCount(0);
});

test('the logo band never shows a gap at the end of its cycle', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1000 });
  await page.goto('/');
  const covered = await page.evaluate(() => {
    const track = document.querySelector('[class*="track_"]') as HTMLElement;
    const animation = track.getAnimations()[0];
    animation.pause();
    animation.currentTime = (animation.effect!.getComputedTiming().duration as number) - 1;
    return track.getBoundingClientRect().right >= track.parentElement!.getBoundingClientRect().right;
  });
  expect(covered).toBe(true);
});
