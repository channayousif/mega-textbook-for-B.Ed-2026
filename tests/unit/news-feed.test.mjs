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
  parseAddDates, parseReviewDates, parseNumstat, parseFigureAdds, buildFeed, collectFeed, UPDATE_MIN_LINES,
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

describe('parseNumstat, parseFigureAdds and the provisional glyph', () => {
  it('sums changed lines per unit per day and ignores binary files and other paths', () => {
    const out = [
      '@@2026-11-05T15:00:00+05:00', '30\t15\tdocs/a/unit-01/topic-01.mdx', '-\t-\tdocs/a/unit-01/x.png',
      '@@2026-11-05T09:00:00+05:00', '2\t3\tdocs/a/unit-01/unit-assessment.mdx', '9\t9\tdocs/a/unit-01/index.mdx',
      '@@2026-10-01T09:00:00+05:00', '50\t0\tdocs/a/unit-01/topic-02.mdx',
    ].join('\n');
    const unitOf = (p) => (/\/(topic-\d+|unit-assessment)\.mdx$/.test(p) && p.startsWith('docs/a/unit-01/') ? 'A:1' : null);
    const r = parseNumstat(out, unitOf).get('A:1');
    expect(r.get('2026-11-05')).toEqual({ date: '2026-11-05T15:00:00+05:00', lines: 50 });
    expect(r.get('2026-10-01').lines).toBe(50);
  });

  it('counts a figure once per unit per day, whatever its Urdu and dark variants', () => {
    const out = [
      '@@2026-11-20T10:00:00+05:00', '',
      'static/img/figures/efpg-401/unit-01/fig-U1-10.webp',
      'static/img/figures/efpg-401/unit-01/fig-U1-1.svg', 'static/img/figures/efpg-401/unit-01/fig-U1-1.dark.svg',
      'static/img/figures/efpg-401/unit-01/fig-U1-1.ur.svg', 'static/img/figures/efpg-401/unit-01/fig-U1-1.ur.dark.svg',
      'static/img/site/hero.webp',
    ].join('\n');
    expect(parseFigureAdds(out).get('EFPG-401:1').get('2026-11-20')).toEqual({ date: '2026-11-20T10:00:00+05:00', count: 2 });
  });

  it('reads provisional G3 rows only when asked for the 🟡 glyph', () => {
    const patch = ['@@2026-11-06T09:00:00+05:00', '+++ b/specs/content/efmp-301/tasks.md',
      '+| Unit 4 | G3 en-review | 🟡 | agent | |', '+| Unit 5 | G5 ur-review | 🟡 | agent | |'].join('\n');
    expect(parseReviewDates(patch).size).toBe(0);
    const p = parseReviewDates(patch, '🟡', ['G3']);
    expect([...p.keys()]).toEqual(['EFMP-301:4:G3']);
  });
});

describe('buildFeed: updated, figures and provisional events', () => {
  const NOW2 = new Date('2026-11-22T00:00:00Z');
  const u = (n) => ({ courseCode: 'GQUR-301', unitNo: n, titleEn: `Unit ${n}`, titleUr: null, permalink: `/semester-2/gqur-301/unit-0${n}/`,
    enPaths: [`docs/g/u${n}/topic-01.mdx`], urPaths: [`ur/g/u${n}/topic-01.mdx`] });
  const status = { courses: [{ course_code: 'GQUR-301', units: [1, 2, 3].map((n) => ({ unit_no: n, authored: true, gates: { G3: n === 3 ? 'provisional' : 'open', G5: 'open' } })) }] };
  const addDates = new Map([['docs/g/u1/topic-01.mdx', '2026-10-01T00:00:00Z'], ['docs/g/u2/topic-01.mdx', '2026-11-18T00:00:00Z'], ['docs/g/u3/topic-01.mdx', '2026-09-01T00:00:00Z']]);
  const day = (date, extra) => new Map([[date.slice(0, 10), { date, ...extra }]]);
  const feed = buildFeed({
    units: [u(1), u(2), u(3)], addDates, reviewDates: new Map(), status, courseTitles: new Map(), now: NOW2,
    revisions: new Map([
      ['GQUR-301:1', new Map([['2026-11-10', { date: '2026-11-10T00:00:00Z', lines: 120 }], ['2026-11-15', { date: '2026-11-15T00:00:00Z', lines: UPDATE_MIN_LINES - 1 }]])],
      ['GQUR-301:2', day('2026-11-20T00:00:00Z', { lines: 300 })], // in its first week: part of the new unit
    ]),
    figureAdds: new Map([['GQUR-301:1', day('2026-11-21T00:00:00Z', { count: 4 })], ['GQUR-301:2', day('2026-11-19T00:00:00Z', { count: 6 })]]),
    provisionalDates: new Map([['GQUR-301:3:G3', '2026-11-12T00:00:00Z'], ['GQUR-301:1:G3', '2026-11-12T00:00:00Z']]),
  });
  const byId = Object.fromEntries(feed.map((e) => [e.id, e]));

  it('announces a substantive revision on its newest qualifying day, never a small one or one in the first week', () => {
    expect(byId['updated:GQUR-301:1']).toMatchObject({ type: 'updated', date: '2026-11-10T00:00:00Z', lines: 120 });
    expect(byId['updated:GQUR-301:2']).toBeUndefined();
  });

  it('announces new figures with their count, but not figures that came with a new unit', () => {
    expect(byId['figures:GQUR-301:1']).toMatchObject({ type: 'figures', count: 4 });
    expect(byId['figures:GQUR-301:2']).toBeUndefined();
  });

  it('announces Final Review Pending only while the gate state is provisional', () => {
    expect(byId['provisional:GQUR-301:3']).toMatchObject({ type: 'provisional', date: '2026-11-12T00:00:00Z' });
    expect(byId['provisional:GQUR-301:1']).toBeUndefined();
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
