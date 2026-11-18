/**
 * Feature 028 - the automatic news feed (scripts/build-news-feed.mjs).
 *
 * The parsers and `buildFeed` are pure, so most cases drive them with literal git
 * output. One end-to-end case builds a throwaway git repository so the real
 * `git log` invocations, the content-status join and the shallow-clone fallback
 * are exercised too.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import {
  parseAddDates, parseReviewDates, buildFeed, collectFeed,
} from '../../scripts/build-news-feed.mjs';

const NOW = new Date('2026-11-09T00:00:00Z');

describe('parseAddDates', () => {
  it('keeps the earliest add date when a path was added twice', () => {
    const out = [
      '@@2026-11-05T10:00:00+05:00', '', 'docs/a/unit-01/topic-01.mdx',
      '@@2026-10-01T10:00:00+05:00', '', 'docs/a/unit-01/topic-01.mdx', 'docs/a/unit-02/index.mdx',
    ].join('\n');
    const d = parseAddDates(out);
    expect(d.get('docs/a/unit-01/topic-01.mdx')).toBe('2026-10-01T10:00:00+05:00');
    expect(d.get('docs/a/unit-02/index.mdx')).toBe('2026-10-01T10:00:00+05:00');
  });
});

describe('parseReviewDates', () => {
  const patch = [
    '@@2026-11-06T09:00:00+05:00',
    'diff --git a/specs/content/efmp-301/tasks.md b/specs/content/efmp-301/tasks.md',
    '+++ b/specs/content/efmp-301/tasks.md',
    '@@ -20,0 +21 @@',
    '+| Unit 2 | G3 en-review | ✅ | YM | |',
    '+| Unit 3 | G3 en-review | ✅ | | |',
    '+| Unit 4 | G5 ur-review | 🟡 | agent | |',
    '@@2026-10-01T09:00:00+05:00',
    '+++ b/specs/content/efmp-301/tasks.md',
    '+| Unit 2 | G3 en-review | ✅ | YM | |',
    '+| Unit 1 | G5 ur-review | ✅ | YM | |',
  ].join('\n');
  const d = parseReviewDates(patch);

  it('takes the newest attributed tick, ignoring hunk headers', () => {
    expect(d.get('EFMP-301:2:G3')).toBe('2026-11-06T09:00:00+05:00');
    expect(d.get('EFMP-301:1:G5')).toBe('2026-10-01T09:00:00+05:00');
  });

  it('ignores unattributed ticks and provisional rows', () => {
    expect(d.has('EFMP-301:3:G3')).toBe(false);
    expect(d.has('EFMP-301:4:G5')).toBe(false);
  });
});

describe('buildFeed', () => {
  const unit = (n, extra = {}) => ({
    courseCode: 'EFMP-301', unitNo: n, titleEn: `Unit ${n}`, titleUr: n === 1 ? 'یونٹ' : null,
    permalink: `/semester-1/efmp-301/unit-0${n}/`,
    enPaths: [`docs/u${n}/topic-01.mdx`, `docs/u${n}/index.mdx`],
    urPaths: [`ur/u${n}/topic-01.mdx`, `ur/u${n}/index.mdx`],
    ...extra,
  });
  const status = {
    courses: [{
      course_code: 'EFMP-301',
      units: [
        { unit_no: 1, authored: true, gates: { G3: 'done', G5: 'open' } },
        { unit_no: 2, authored: true, gates: { G3: 'provisional', G5: 'open' } },
        { unit_no: 3, authored: false, gates: {} },
      ],
    }],
  };
  const addDates = new Map([
    ['docs/u1/index.mdx', '2026-06-01T00:00:00Z'], // placeholder, long before authoring
    ['docs/u1/topic-01.mdx', '2026-11-01T00:00:00Z'],
    ['ur/u1/topic-01.mdx', '2026-11-03T00:00:00Z'],
    ['docs/u2/topic-01.mdx', '2026-11-02T00:00:00Z'],
    ['docs/u3/topic-01.mdx', '2026-11-04T00:00:00Z'],
  ]);
  const reviewDates = new Map([
    ['EFMP-301:1:G3', '2026-11-05T00:00:00Z'],
    ['EFMP-301:2:G3', '2026-11-06T00:00:00Z'],
  ]);
  const courseTitles = new Map([['EFMP-301', { en: 'Educational Psychology', ur: 'تعلیمی نفسیات' }]]);
  const feed = buildFeed({ units: [unit(1), unit(2), unit(3)], addDates, reviewDates, status, courseTitles, now: NOW });
  const ids = feed.map((e) => e.id);

  it('dates a unit by its first topic, not the placeholder index', () => {
    expect(feed.find((e) => e.id === 'unit:EFMP-301:1').date).toBe('2026-11-01T00:00:00Z');
  });

  it('emits course, unit, urdu and certified-review events, newest first, with stable ids', () => {
    expect(ids).toEqual([
      'review:EFMP-301:1:G3', 'urdu:EFMP-301:1', 'unit:EFMP-301:2', 'course:EFMP-301', 'unit:EFMP-301:1',
    ]);
  });

  it('skips unauthored units and reviews that are not done now', () => {
    expect(ids.some((id) => id.includes(':3'))).toBe(false);
    expect(ids).not.toContain('review:EFMP-301:2:G3');
  });

  it('names a course event after the catalog and links the course root', () => {
    const c = feed.find((e) => e.type === 'course');
    expect(c).toMatchObject({ title_en: 'Educational Psychology', title_ur: 'تعلیمی نفسیات', permalink: '/semester-1/efmp-301/' });
  });

  it('drops events outside the lookback window and caps the list', () => {
    const old = buildFeed({ units: [unit(1)], addDates, reviewDates, status, courseTitles, now: new Date('2027-06-01T00:00:00Z') });
    expect(old).toEqual([]);
    const capped = buildFeed({ units: [unit(1), unit(2)], addDates, reviewDates, status, courseTitles, now: NOW, maxEvents: 2 });
    expect(capped).toHaveLength(2);
  });
});

describe('collectFeed', () => {
  const dirs = [];
  afterEach(() => { while (dirs.length) rmSync(dirs.pop(), { recursive: true, force: true }); });

  const git = (cwd, ...args) => execFileSync('git', ['-C', cwd, ...args], {
    encoding: 'utf8',
    env: { ...process.env, GIT_AUTHOR_NAME: 't', GIT_AUTHOR_EMAIL: 't@x', GIT_COMMITTER_NAME: 't', GIT_COMMITTER_EMAIL: 't@x' },
  });

  it('returns an empty feed with a warning outside a git repository', () => {
    const root = mkdtempSync(join(tmpdir(), 'news-nogit-'));
    dirs.push(root);
    const feed = collectFeed(root, NOW);
    expect(feed.events).toEqual([]);
    expect(feed.warning).toMatch(/git/);
  });

  it('reads real git history for a fixture course', () => {
    const root = mkdtempSync(join(tmpdir(), 'news-git-'));
    dirs.push(root);
    const unitDir = join(root, 'docs', 'semester-1', 'zzfeed-101', 'unit-01');
    const urDir = join(root, 'i18n', 'ur', 'docusaurus-plugin-content-docs', 'current', 'semester-1', 'zzfeed-101', 'unit-01');
    mkdirSync(unitDir, { recursive: true });
    mkdirSync(urDir, { recursive: true });
    mkdirSync(join(root, 'static'), { recursive: true });
    writeFileSync(join(unitDir, 'index.mdx'), '---\ntitle: "Fixture unit"\n---\n');
    writeFileSync(join(unitDir, 'topic-01.mdx'), '---\ntitle: "T"\n---\n');
    writeFileSync(join(root, 'static', 'content-status.json'), JSON.stringify({
      courses: [{ course_code: 'ZZFEED-101', units: [{ unit_no: 1, authored: true, gates: {} }] }],
    }));
    git(root, 'init', '-q');
    git(root, 'add', '-A');
    git(root, 'commit', '-q', '-m', 'en');
    writeFileSync(join(urDir, 'index.mdx'), '---\ntitle: "فکسچر"\n---\n');
    git(root, 'add', '-A');
    git(root, 'commit', '-q', '-m', 'ur');

    const feed = collectFeed(root, new Date());
    expect(feed.warning).toBeUndefined();
    const types = feed.events.map((e) => e.type).sort();
    expect(types).toEqual(['course', 'unit', 'urdu']);
    const ur = feed.events.find((e) => e.type === 'urdu');
    expect(ur).toMatchObject({ title_en: 'Fixture unit', title_ur: 'فکسچر', permalink: '/semester-1/zzfeed-101/unit-01/' });
  });
});
