import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { skillDigest } from '../../../../../../../scripts/lib/review-evidence.mjs';

function digest(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const root = path.resolve('.');
const evidenceDir = 'specs/content/efmp-304/reviews/unit-06/G3/agy-cycle2-20261125';
const evidenceManifest = {};

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(p);
    } else {
      evidenceManifest[p] = digest(fs.readFileSync(p));
    }
  }
}
walk(evidenceDir);

const manifestObj = JSON.parse(fs.readFileSync(path.join(evidenceDir, 'manifest.json'), 'utf8'));

const report = {
  schema_version: 1,
  course_code: 'EFMP-304',
  unit_no: 6,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:ea802ab0d78d009b2548025b064a0040967942e6',
  reviewer_run_id: '51419376-530b-4268-911b-56fd89ad47b8',
  model: 'Gemini 3.8 Flash (Medium)',
  started_at: '2026-11-25T10:15:43.000Z',
  completed_at: new Date().toISOString(),
  skill_digest: skillDigest(root, 'G3'),
  input_manifest: manifestObj.input_manifest,
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        'Scheme-and-Course-guides/extracted-text/2nd 2026.txt',
        'specs/content/efmp-304/content-spec.md#unit-6-creating-and-maintaining-reflective-journals',
        'docs/semester-2/efmp-304/unit-06/index.mdx'
      ]
    },
    {
      id: 'sources',
      status: 'pass',
      evidence: [
        'specs/content/efmp-304/sources/unit-06.md',
        'specs/content/efmp-304/sources/texts/pedro2005.md',
        'docs/semester-2/efmp-304/unit-06/topic-01.mdx',
        'docs/semester-2/efmp-304/unit-06/topic-02.mdx',
        'docs/semester-2/efmp-304/unit-06/topic-03.mdx',
        'docs/semester-2/efmp-304/unit-06/topic-04.mdx'
      ]
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'specs/content/efmp-304/coverage/unit-06.md',
        'docs/semester-2/efmp-304/unit-06/topic-01.mdx',
        'docs/semester-2/efmp-304/unit-06/topic-02.mdx',
        'docs/semester-2/efmp-304/unit-06/topic-03.mdx',
        'docs/semester-2/efmp-304/unit-06/topic-04.mdx'
      ]
    },
    {
      id: 'assessment',
      status: 'pass',
      evidence: [
        'specs/content/efmp-304/reviews/unit-06/G3/agy-cycle2-20261125/assessment-solutions.md',
        'docs/semester-2/efmp-304/unit-06/unit-assessment.mdx#L1-L226'
      ]
    },
    {
      id: 'accessibility',
      status: 'unverified',
      evidence: [
        'specs/content/efmp-304/reviews/unit-06/G3/agy-cycle2-20261125/logs/render-review.txt',
        'specs/content/efmp-304/reviews/unit-06/G3/agy-cycle2-20261125/logs/measure-figure-text.log'
      ]
    },
    {
      id: 'readability',
      status: 'pass',
      evidence: [
        'docs/semester-2/efmp-304/unit-06/topic-01.mdx',
        'docs/semester-2/efmp-304/unit-06/topic-02.mdx',
        'docs/semester-2/efmp-304/unit-06/topic-03.mdx',
        'docs/semester-2/efmp-304/unit-06/topic-04.mdx'
      ]
    },
    {
      id: 'pedagogy',
      status: 'pass',
      evidence: [
        'docs/semester-2/efmp-304/unit-06/topic-01.mdx',
        'docs/semester-2/efmp-304/unit-06/topic-02.mdx',
        'docs/semester-2/efmp-304/unit-06/topic-03.mdx',
        'docs/semester-2/efmp-304/unit-06/topic-04.mdx'
      ]
    }
  ],
  findings: [
    {
      severity: 'uncertain',
      resolved: false,
      message: 'Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: the deployed SHA b7417e1e0271fd01f1984a48afe830f8ecc3ab85 differs from HEAD 68fbc2c264a7ef751515e197475f8a0a996fec20 on docs/semester-2/efmp-304/unit-06/ and static/img/figures/efmp-304/unit-06/. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure geometry pass from source.'
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'MCQ option key clustering: 9 of 10 keys are option (B) (unit-assessment.mdx:183-192; items 1-3, 5-10 are B; item 4 is D). Advisory: distractor positions could be shuffled in future maintenance.'
    }
  ],
  commands: [
    {
      name: 'validate:content',
      exit_code: 0,
      log_path: 'specs/content/efmp-304/reviews/unit-06/G3/agy-cycle2-20261125/logs/validate-content.log'
    },
    {
      name: 'check:depth-gate',
      exit_code: 0,
      log_path: 'specs/content/efmp-304/reviews/unit-06/G3/agy-cycle2-20261125/logs/check-depth-gate.log'
    },
    {
      name: 'check:figures',
      exit_code: 0,
      log_path: 'specs/content/efmp-304/reviews/unit-06/G3/agy-cycle2-20261125/logs/check-figures.log'
    },
    {
      name: 'check:no-em-dash',
      exit_code: 0,
      log_path: 'specs/content/efmp-304/reviews/unit-06/G3/agy-cycle2-20261125/logs/check-no-em-dash.log'
    },
    {
      name: 'check:no-answer-keys',
      exit_code: 0,
      log_path: 'specs/content/efmp-304/reviews/unit-06/G3/agy-cycle2-20261125/logs/check-no-answer-keys.log'
    },
    {
      name: 'check:docs-sync',
      exit_code: 0,
      log_path: 'specs/content/efmp-304/reviews/unit-06/G3/agy-cycle2-20261125/logs/check-docs-sync.log'
    },
    {
      name: 'render-review',
      exit_code: 1,
      log_path: 'specs/content/efmp-304/reviews/unit-06/G3/agy-cycle2-20261125/logs/render-review.txt'
    },
    {
      name: 'check:content',
      exit_code: 0,
      log_path: 'specs/content/efmp-304/reviews/unit-06/G3/agy-cycle2-20261125/logs/check-content.log'
    },
    {
      name: 'measure-figure-text',
      exit_code: 0,
      log_path: 'specs/content/efmp-304/reviews/unit-06/G3/agy-cycle2-20261125/logs/measure-figure-text.log'
    }
  ],
  evidence_manifest: evidenceManifest
};

const reportPath = 'specs/content/efmp-304/reviews/unit-06/G3/agy-cycle2-20261125.json';
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log('Wrote report to', reportPath);
