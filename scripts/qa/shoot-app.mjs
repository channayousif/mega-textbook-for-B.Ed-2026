#!/usr/bin/env node
/**
 * Signed-in screenshot harness for the dashboards (local only, never CI). Signs in
 * as each QA account from scripts/qa/seed-qa-accounts.mjs, opens every app page for
 * that role in English and Urdu, light and dark, at 1440 and 390px, and writes
 * screenshots plus a JSON report (horizontal overflow, axe WCAG 2.2 AA violations,
 * broken images, console errors).
 *
 *   node scripts/qa/shoot-app.mjs <outDir> [--base http://localhost:3000] [--roles student,teacher]
 *        [--only /app/dashboard/] [--quick]      quick = 1440 light EN only
 *
 * Needs a served build that was built with .env.local present.
 */
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const args = process.argv.slice(2);
const out = args[0];
if (!out) throw new Error('usage: shoot-app.mjs <outDir> [--base URL] [--roles a,b] [--only /path/] [--quick]');
const opt = (name, def) => { const i = args.indexOf(name); return i > 0 ? args[i + 1] : def; };
const BASE = opt('--base', 'http://localhost:3000');
const QUICK = args.includes('--quick');
const ONLY = opt('--only', null);
const accounts = JSON.parse(readFileSync(join(homedir(), '.config/textbook-qa/accounts.json'), 'utf8'));

const PAGES = {
  student: ['/app/dashboard/', '/app/dashboard/progress/', '/app/dashboard/assignments/', '/app/dashboard/grades/',
    '/app/dashboard/achievements/', '/app/dashboard/notes/', '/app/dashboard/classes/', '/app/dashboard/history/',
    '/app/classes/', '/app/reviewer/apply/', '/app/profile/'],
  teacher: ['/app/teacher/', '/app/teacher/analytics/', '/app/teacher/quiz-authoring/', '/app/teacher/teaching-log/',
    '/app/teacher/feedback-suggestions/', '/app/classes/', '/app/classes/assignments/', '/app/classes/queue/', '/app/profile/'],
  admin: ['/app/admin/', '/app/admin/overview/', '/app/admin/users/', '/app/admin/g3-signoff/', '/app/admin/feedback-queue/',
    '/app/admin/suggestions/', '/app/admin/audit/', '/app/admin/reviewers/', '/app/admin/records/', '/app/admin/agent-jobs/',
    '/app/admin/review-decisions/', '/app/admin/feedback/', '/app/profile/'],
};
const roles = opt('--roles', 'student,teacher,admin').split(',');
const variants = QUICK
  ? [{ w: 1440, h: 900, theme: 'light', loc: '' }]
  : ['', '/ur'].flatMap((loc) => ['light', 'dark'].flatMap((theme) => [1440, 390].map((w) => ({ w, h: w > 500 ? 900 : 844, theme, loc }))));

mkdirSync(out, { recursive: true });
const report = [];
const browser = await chromium.launch();
for (const role of roles) {
  const { email, password } = accounts[role];
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/app/login/`);
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(password);
  await page.getByRole('button', { name: /^sign in$/i }).click();
  await page.waitForURL((u) => !u.pathname.includes('/app/login'), { timeout: 20000 });
  for (const path of PAGES[role].filter((p) => !ONLY || p === ONLY)) {
    for (const v of variants) {
      await page.setViewportSize({ width: v.w, height: v.h });
      await page.evaluate((t) => { try { localStorage.setItem('theme', t); } catch { /* private mode */ } }, v.theme);
      const errors = [];
      const onErr = (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 160)); };
      page.on('console', onErr);
      await page.goto(`${BASE}${v.loc}${path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(700);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length);
      let axe = null;
      if (v.w === 1440 || QUICK) {
        const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
        axe = r.violations.map((x) => `${x.id} (${x.nodes.length})`);
      }
      page.off('console', onErr);
      const name = `${role}${v.loc.replace('/', '-')}${path.replace(/\//g, '_')}${v.w}-${v.theme}`.replace(/_+$/, '');
      await page.screenshot({ path: join(out, `${name}.png`), fullPage: true });
      report.push({ role, path: v.loc + path, w: v.w, theme: v.theme, overflow, broken, axe, errors: errors.slice(0, 3) });
      console.log(`${name}: overflow=${overflow} broken=${broken} axe=${axe ? axe.length : '-'} errors=${errors.length}`);
    }
  }
  await ctx.close();
}
await browser.close();
writeFileSync(join(out, 'report.json'), JSON.stringify(report, null, 2));
const bad = report.filter((r) => r.overflow || r.broken || (r.axe && r.axe.length));
console.log(`${report.length} shots, ${bad.length} with problems. Report: ${join(out, 'report.json')}`);
