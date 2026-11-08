#!/usr/bin/env node
/**
 * Automatic news feed (Feature 028).
 *
 * The news ticker and the weekly email announce content changes without anyone
 * typing them: a new English unit, its Urdu translation, a new course, and a unit
 * whose G3 or G5 review was certified. Nothing here writes to a database. Every
 * event is derived from the repository itself, so the feed is reproducible from
 * any full clone and can never claim something the content does not show.
 *
 * Sources:
 * - Dates a unit first appeared come from `git log --diff-filter=A`. A unit's
 *   first topic file (`topic-01.mdx`) marks when it was authored; a placeholder
 *   `index.mdx` can predate the content by months, so it is only the fallback.
 * - Review dates come from the tracker patches: the commit that added the unit's
 *   latest ticked G3/G5 row. The event is only emitted when the CURRENT state in
 *   `static/content-status.json` is `done`, so a later revision row that re-opens
 *   the stage silently withdraws it (the tracker's last-row rule, `latestRow`).
 *
 * Output: `static/news-feed.json`, gitignored like `content-status.json`, read by
 * `docusaurus.config.ts` into `customFields.newsFeed` and fetched by the weekly
 * digest edge function from the live site. A shallow clone or missing git yields
 * an empty feed with a warning; the feed never fails a build.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import matter from 'gray-matter';
import { walkUnits } from './lib/content-roots.mjs';

const REPO = resolve(process.env.CONTENT_ROOT ?? fileURLToPath(new URL('..', import.meta.url)));

export const LOOKBACK_DAYS = 60;
export const MAX_EVENTS = 24;

/** Event types, in the order the email groups them. */
export const EVENT_TYPES = Object.freeze(['course', 'unit', 'urdu', 'review']);

const toPosix = (p) => p.split(sep).join('/');

/**
 * Parse `git log --diff-filter=A --name-only --format=@@<iso>` output into
 * path -> earliest add date. git lists newest first, so the last date seen for a
 * path wins (a file deleted and re-added keeps its first appearance).
 */
export function parseAddDates(gitOutput) {
  const dates = new Map();
  let current = null;
  for (const line of gitOutput.split(/\r?\n/)) {
    if (line.startsWith('@@')) {
      current = line.slice(2).trim();
    } else if (line.trim() && current) {
      dates.set(line.trim(), current);
    }
  }
  return dates;
}

/**
 * Parse `git log -p -U0 --format=@@<iso>` over tracker files into
 * `COURSE:unit:G3|G5` -> date of the most recent commit that added a ticked,
 * attributed row for that stage. Output is newest first, so the first match wins.
 */
export function parseReviewDates(patchOutput) {
  const dates = new Map();
  let date = null;
  let course = null;
  for (const line of patchOutput.split(/\r?\n/)) {
    if (line.startsWith('@@') && !line.startsWith('@@ ')) {
      date = line.slice(2).trim();
      continue;
    }
    const file = /^\+\+\+ b\/specs\/content\/([^/]+)\/tasks\.md$/.exec(line);
    if (file) {
      course = file[1].toUpperCase();
      continue;
    }
    if (!line.startsWith('+|') || !date || !course) continue;
    const cells = line.slice(1).split('|').slice(1, -1).map((c) => c.trim());
    const [unit, stage, status, reviewer] = cells;
    const u = /^Unit (\d+)$/.exec(unit ?? '');
    const s = /^(G3|G5)\b/.exec(stage ?? '');
    if (!u || !s || status !== '✅' || !reviewer) continue;
    const key = `${course}:${Number(u[1])}:${s[1]}`;
    if (!dates.has(key)) dates.set(key, date);
  }
  return dates;
}

function readTitle(file) {
  if (!existsSync(file)) return null;
  try {
    const title = matter(readFileSync(file, 'utf8')).data?.title;
    return typeof title === 'string' && title.trim() ? title.trim() : null;
  } catch {
    return null;
  }
}

function catalogTitles(root) {
  const file = join(root, 'catalog', 'courses.json');
  const titles = new Map();
  if (!existsSync(file)) return titles;
  const catalog = JSON.parse(readFileSync(file, 'utf8'));
  for (const sem of catalog.semesters ?? []) {
    for (const c of sem.courses ?? []) titles.set(c.code, { en: c.title_en, ur: c.title_ur ?? null });
  }
  return titles;
}

/**
 * Assemble the feed from already-gathered facts. Pure, so the tests can drive it
 * without a repository: `units` is the walked unit list with titles, permalinks
 * and paths; `addDates`/`reviewDates` come from the parsers above; `status` is
 * the content-status report.
 */
export function buildFeed({ units, addDates, reviewDates, status, courseTitles, now = new Date(),
  lookbackDays = LOOKBACK_DAYS, maxEvents = MAX_EVENTS }) {
  const since = now.getTime() - lookbackDays * 86_400_000;
  const statusOf = new Map();
  for (const c of status?.courses ?? []) {
    for (const u of c.units ?? []) statusOf.set(`${c.course_code}:${u.unit_no}`, u);
  }

  const events = [];
  const firstUnitDate = new Map();
  const dateOf = (paths) => paths.map((p) => addDates.get(p)).find(Boolean) ?? null;

  for (const unit of units) {
    const key = `${unit.courseCode}:${unit.unitNo}`;
    const st = statusOf.get(key);
    if (!st?.authored) continue;
    const base = {
      course_code: unit.courseCode,
      unit_no: unit.unitNo,
      title_en: unit.titleEn,
      title_ur: unit.titleUr,
      course_title_en: courseTitles.get(unit.courseCode)?.en ?? unit.courseCode,
      course_title_ur: courseTitles.get(unit.courseCode)?.ur ?? null,
      permalink: unit.permalink,
    };

    const enDate = dateOf(unit.enPaths);
    if (enDate) {
      events.push({ id: `unit:${key}`, type: 'unit', date: enDate, ...base });
      const prev = firstUnitDate.get(unit.courseCode);
      if (!prev || enDate < prev.date) firstUnitDate.set(unit.courseCode, { date: enDate, base });
    }
    const urDate = dateOf(unit.urPaths);
    if (urDate) events.push({ id: `urdu:${key}`, type: 'urdu', date: urDate, ...base });

    for (const gate of ['G3', 'G5']) {
      if (st.gates?.[gate] !== 'done') continue;
      const d = reviewDates.get(`${key}:${gate}`);
      if (d) events.push({ id: `review:${key}:${gate}`, type: 'review', gate, date: d, ...base });
    }
  }

  for (const [code, { date, base }] of firstUnitDate) {
    events.push({
      id: `course:${code}`, type: 'course', date,
      ...base, unit_no: null, title_en: base.course_title_en, title_ur: base.course_title_ur,
      permalink: base.permalink.replace(/\/unit-\d+\/?$/, '/'),
    });
  }

  return events
    .filter((e) => Date.parse(e.date) >= since && Date.parse(e.date) <= now.getTime() + 86_400_000)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date) || a.id.localeCompare(b.id))
    .slice(0, maxEvents);
}

function git(root, args) {
  return execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
}

/** Gather facts from the working tree and git, then build the feed. */
export function collectFeed(root = REPO, now = new Date()) {
  const warn = (msg) => ({ generated_at: now.toISOString(), warning: msg, events: [] });
  let shallow;
  try {
    shallow = git(root, ['rev-parse', '--is-shallow-repository']).trim() === 'true';
  } catch {
    return warn('git unavailable; news feed left empty');
  }
  if (shallow) return warn('shallow clone; news feed left empty');

  const statusFile = join(root, 'static', 'content-status.json');
  if (!existsSync(statusFile)) return warn('static/content-status.json missing; run report-content-status first');
  const status = JSON.parse(readFileSync(statusFile, 'utf8'));

  const units = walkUnits(root).map((u) => {
    const rel = (p) => toPosix(relative(root, p));
    const routePrefix = `/${[u.trackDir, u.courseFolder].filter(Boolean).join('/')}`;
    return {
      courseCode: u.courseCode,
      unitNo: u.unitNo,
      titleEn: readTitle(join(u.unitDir, 'index.mdx')) ?? `${u.courseCode} Unit ${u.unitNo}`,
      titleUr: readTitle(join(u.urUnitDir, 'index.mdx')),
      permalink: `${routePrefix}/${basename(u.unitDir)}/`,
      enPaths: [rel(join(u.unitDir, 'topic-01.mdx')), rel(join(u.unitDir, 'index.mdx'))],
      urPaths: [rel(join(u.urUnitDir, 'topic-01.mdx')), rel(join(u.urUnitDir, 'index.mdx'))],
    };
  });

  const roots = [...new Set(walkUnits(root).flatMap((u) => [
    toPosix(relative(root, u.unitDir)).split('/')[0],
    toPosix(relative(root, u.urUnitDir)).split('/').slice(0, 4).join('/'),
  ]))].filter((p) => existsSync(join(root, p)));

  const addDates = roots.length
    ? parseAddDates(git(root, ['log', '--diff-filter=A', '--name-only', '--format=@@%cI', '--', ...roots]))
    : new Map();
  const reviewDates = parseReviewDates(git(root, [
    'log', `--since=${LOOKBACK_DAYS}.days`, '-p', '--no-color', '-U0', '--format=@@%cI',
    '--', 'specs/content/*/tasks.md',
  ]));

  const events = buildFeed({ units, addDates, reviewDates, status, courseTitles: catalogTitles(root), now });
  return { generated_at: now.toISOString(), events };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const feed = collectFeed();
  const out = join(REPO, 'static', 'news-feed.json');
  mkdirSync(join(REPO, 'static'), { recursive: true });
  writeFileSync(out, `${JSON.stringify(feed, null, 2)}\n`);
  if (feed.warning) console.warn(`⚠ news feed: ${feed.warning}`);
  console.log(`✓ Wrote ${feed.events.length} news events to static/news-feed.json`);
}
