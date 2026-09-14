/**
 * T020, T030, T033 - the pure half of the review queue (Spec 017).
 *
 * These run without Supabase and without a browser, which is the point: the
 * G5-to-G3 binding, the pass invariant and the identity rules are all
 * build-time refusals in `src/lib/reviewQueue.ts`, so they are testable
 * directly rather than through the page.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildReviewQueue, buildCertification, buildTrackerRow, certificationPath,
  CERTIFICATION_CRITERIA, CERTIFICATION_COMMANDS,
} from '../../src/lib/reviewQueue.ts';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

const unit = (overrides = {}) => ({
  unit_no: 1,
  authored: true,
  translation_status: 'draft',
  depth_check: 'pass',
  gates: { G3: 'open', G5: 'open' },
  figures: { prompt_only: 0, generated: 0, placed: 0 },
  figures_pending: [],
  ...overrides,
});

const report = (units, courseCode = 'EFMP-302') => ({
  generated_at: new Date().toISOString(),
  courses: [{ course_code: courseCode, units }],
});

const index = [
  { course_code: 'EFMP-302', unit_no: 1, permalink: '/semester-1/efmp-302/unit-01/topic-01' },
  { course_code: 'EFMP-302', unit_no: 2, permalink: '/semester-1/efmp-302/unit-02/topic-01' },
];

const passingCriteria = (stage) =>
  CERTIFICATION_CRITERIA[stage].map((id) => ({ id, status: 'pass', evidence: [`${id}: checked`] }));

const passingCommands = () => CERTIFICATION_COMMANDS.map((name) => ({ name, exit_code: 0 }));

function certInput(overrides = {}) {
  return {
    course_code: 'EFMP-302',
    unit_no: 1,
    stage: 'G3',
    reviewer_id: 'AB',
    input_manifest: { 'docs/semester-1/efmp-302/unit-01/index.mdx': 'a'.repeat(64) },
    commands: passingCommands(),
    criteria: passingCriteria(overrides.stage ?? 'G3'),
    findings: [],
    disposition: 'pass',
    started_at: '2026-09-13T10:00:00.000Z',
    completed_at: '2026-09-13T11:00:00.000Z',
    ...overrides,
  };
}

describe('buildReviewQueue', () => {
  it('offers G3 only while G3 is open, never G5 (Art. VII §4, SC3)', () => {
    const queue = buildReviewQueue(report([unit({ gates: { G3: 'open', G5: 'open' } })]), index);
    expect(queue).toHaveLength(1);
    expect(queue[0].stage).toBe('G3');
  });

  it('offers G5 once G3 is done', () => {
    const queue = buildReviewQueue(report([unit({ gates: { G3: 'done', G5: 'open' } })]), index);
    expect(queue.map((i) => i.stage)).toEqual(['G5']);
  });

  it('queues nothing when both gates are done', () => {
    expect(buildReviewQueue(report([unit({ gates: { G3: 'done', G5: 'done' } })]), index)).toEqual([]);
  });

  it('never queues an unauthored unit', () => {
    const queue = buildReviewQueue(report([unit({ authored: false })]), index);
    expect(queue).toEqual([]);
  });

  it('derives the unit route from the index and mirrors it into /ur', () => {
    const [item] = buildReviewQueue(report([unit()]), index);
    expect(item.en_route).toBe('/semester-1/efmp-302/unit-01');
    expect(item.ur_route).toBe('/ur/semester-1/efmp-302/unit-01');
  });

  it('still queues an authored unit that is missing from the index, with null routes', () => {
    const [item] = buildReviewQueue(report([unit({ unit_no: 9 })]), index);
    expect(item).toMatchObject({ unit_no: 9, en_route: null, ur_route: null });
  });

  it('orders by course then unit', () => {
    const r = {
      generated_at: '',
      courses: [
        { course_code: 'EFMP-302', units: [unit({ unit_no: 2 }), unit({ unit_no: 1 })] },
        { course_code: 'EFMP-301', units: [unit({ unit_no: 1 })] },
      ],
    };
    expect(buildReviewQueue(r, index).map((i) => `${i.course_code}/${i.unit_no}`))
      .toEqual(['EFMP-301/1', 'EFMP-302/1', 'EFMP-302/2']);
  });
});

describe('buildCertification', () => {
  it('round-trips a valid G3 through JSON', () => {
    const cert = buildCertification(certInput());
    expect(JSON.parse(JSON.stringify(cert))).toEqual(cert);
    expect(cert.schema_version).toBe(1);
  });

  it('rejects an agent identity', () => {
    expect(() => buildCertification(certInput({ reviewer_id: 'agent:g3-reviewer' })))
      .toThrow(/never an agent identity/);
  });

  it('rejects initials that are not 1-5 capitals', () => {
    expect(() => buildCertification(certInput({ reviewer_id: 'ab' }))).toThrow(/1-5 capitals/);
    expect(() => buildCertification(certInput({ reviewer_id: 'ABCDEF' }))).toThrow(/1-5 capitals/);
  });

  it('rejects a path where the input manifest map belongs', () => {
    expect(() => buildCertification(certInput({ input_manifest: 'specs/.../manifest.json' })))
      .toThrow(/digest map/);
    expect(() => buildCertification(certInput({ input_manifest: {} }))).toThrow(/digest map/);
  });

  it('rejects criteria that are not exactly the stage set', () => {
    expect(() => buildCertification(certInput({ criteria: passingCriteria('G3').slice(1) })))
      .toThrow(/criteria must be exactly/);
  });

  it('refuses a G5 with no g3_report (Art. VII §4)', () => {
    expect(() => buildCertification(certInput({ stage: 'G5', criteria: passingCriteria('G5') })))
      .toThrow(/requires g3_report/);
  });

  it('refuses a G5 whose g3_report names the wrong unit or stage', () => {
    const base = { stage: 'G5', criteria: passingCriteria('G5') };
    expect(() => buildCertification(certInput({
      ...base, g3_report: 'specs/content/efmp-302/reviews/unit-02/G3/r1.json',
    }))).toThrow(/must sit under/);
    expect(() => buildCertification(certInput({
      ...base, g3_report: 'specs/content/efmp-302/reviews/unit-01/G5/r1.json',
    }))).toThrow(/must sit under/);
  });

  it('accepts a G5 bound to its own unit\'s G3', () => {
    const cert = buildCertification(certInput({
      stage: 'G5',
      criteria: passingCriteria('G5'),
      g3_report: 'specs/content/efmp-302/reviews/unit-01/G3/run-1.json',
    }));
    expect(cert.g3_report).toBe('specs/content/efmp-302/reviews/unit-01/G3/run-1.json');
  });

  it('refuses g3_report on a G3', () => {
    expect(() => buildCertification(certInput({
      g3_report: 'specs/content/efmp-302/reviews/unit-01/G3/run-1.json',
    }))).toThrow(/only on a G5/);
  });

  it('refuses a pass with an unresolved blocking or uncertain finding', () => {
    for (const severity of ['blocking', 'uncertain']) {
      expect(() => buildCertification(certInput({
        findings: [{ severity, message: 'Unit 1 cites no primary source.', resolved: false }],
      }))).toThrow(new RegExp(`unresolved ${severity}`));
    }
  });

  it('allows a pass with an advisory finding, or a resolved blocking one', () => {
    expect(buildCertification(certInput({
      findings: [
        { severity: 'advisory', message: 'Consider a second worked example.', resolved: false },
        { severity: 'blocking', message: 'Missing alt text.', resolved: true },
      ],
    })).disposition).toBe('pass');
  });

  it('refuses a pass with a non-passing criterion', () => {
    const criteria = passingCriteria('G3');
    criteria[2] = { ...criteria[2], status: 'unverified', evidence: [] };
    expect(() => buildCertification(certInput({ criteria }))).toThrow(/non-passing criterion/);
  });

  it('refuses a pass with a missing or failing command record', () => {
    expect(() => buildCertification(certInput({ commands: passingCommands().slice(1) })))
      .toThrow(/missing command records/);
    const commands = passingCommands();
    commands[0] = { ...commands[0], exit_code: 1 };
    expect(() => buildCertification(certInput({ commands }))).toThrow(/failing command/);
  });

  it('does not impose the pass invariant on revise or escalate', () => {
    for (const disposition of ['revise', 'escalate']) {
      const cert = buildCertification(certInput({
        disposition,
        commands: [],
        findings: [{ severity: 'blocking', message: 'Unit 1 has no Urdu mirror.', resolved: false }],
      }));
      expect(cert.disposition).toBe(disposition);
    }
  });

  it('carries supersedes when present and omits the key otherwise', () => {
    expect(buildCertification(certInput({ supersedes: 'run-0' })).supersedes).toBe('run-0');
    expect('supersedes' in buildCertification(certInput())).toBe(false);
  });
});

describe('buildTrackerRow', () => {
  it('references the report and carries the reviewer initials, not the owner\'s', () => {
    const cert = buildCertification(certInput());
    const path = certificationPath(cert, 'run-1');
    expect(path).toBe('specs/content/efmp-302/reviews/unit-01/G3/run-1.json');
    expect(buildTrackerRow(cert, path))
      .toBe('| Unit 1 | G3 en-review | ✅ | AB | review:specs/content/efmp-302/reviews/unit-01/G3/run-1.json |');
  });

  it('leaves the gate open for a revise or an escalate', () => {
    for (const disposition of ['revise', 'escalate']) {
      const cert = buildCertification(certInput({ disposition, commands: [], findings: [] }));
      expect(buildTrackerRow(cert, certificationPath(cert, 'run-2'))).toContain('| ⏳ |');
    }
  });

  it('refuses a report path outside the unit and stage directory', () => {
    const cert = buildCertification(certInput());
    expect(() => buildTrackerRow(cert, 'specs/content/efmp-302/reviews/unit-02/G3/run-1.json'))
      .toThrow(/must sit under/);
  });

  it('parses back through the gate\'s own tracker parser', async () => {
    const { parseTasksTable } = await import('../../scripts/lib/tracker-rows.mjs');
    const cert = buildCertification(certInput());
    const row = buildTrackerRow(cert, certificationPath(cert, 'run-1'));
    const [parsed] = parseTasksTable(row);
    expect(parsed).toMatchObject({ unit: 'Unit 1', stage: 'G3 en-review', status: '✅', reviewer: 'AB' });
    expect(parsed.suggestion).toMatch(/^review:specs\/content\/efmp-302\//);
  });
});

// T033 - FR-009 asserted, not promised.
describe('FR-009: the export writes nothing', () => {
  it('reviewQueue.ts imports no Supabase client and no filesystem module', () => {
    const source = readFileSync(join(REPO, 'src', 'lib', 'reviewQueue.ts'), 'utf8');
    const valueImports = [...source.matchAll(/^import\s+(?!type\b)[\s\S]*?from\s+'([^']+)'/gm)]
      .map((m) => m[1]);
    expect(valueImports).toEqual(['../../scripts/lib/review-criteria.mjs']);
    expect(source).not.toMatch(/getSupabase|from\s+'node:fs'|writeFileSync/);
  });
});
