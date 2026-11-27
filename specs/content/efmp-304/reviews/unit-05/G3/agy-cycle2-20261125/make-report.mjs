import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const dir = 'specs/content/efmp-304/reviews/unit-05/G3/agy-cycle2-20261125';
const manifest = JSON.parse(readFileSync(`${dir}/manifest.json`, 'utf8'));
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

const evidenceFiles = [
  `${dir}/manifest.json`,
  `${dir}/prior-findings.md`,
  `${dir}/assessment-solutions.md`,
  `${dir}/limitations.md`,
  `${dir}/summary.md`,
  `${dir}/advisory-tracker-row.md`,
  `${dir}/make-report.mjs`,
  `${dir}/logs/validate:content.log`,
  `${dir}/logs/check:depth-gate.log`,
  `${dir}/logs/check:figures.log`,
  `${dir}/logs/check:no-em-dash.log`,
  `${dir}/logs/check:no-answer-keys.log`,
  `${dir}/logs/check:docs-sync.log`,
  `${dir}/logs/render-review.txt`,
  `${dir}/logs/check-content.log`,
  `${dir}/logs/build-content-status.log`,
  `${dir}/logs/measure-figure-text.log`,
];

const evidence_manifest = Object.fromEntries(evidenceFiles.map((p) => [p, sha(p)]));

const commands = [
  { name: 'validate:content', exit_code: 0, log_path: `${dir}/logs/validate:content.log` },
  { name: 'check:depth-gate', exit_code: 0, log_path: `${dir}/logs/check:depth-gate.log` },
  { name: 'check:figures', exit_code: 0, log_path: `${dir}/logs/check:figures.log` },
  { name: 'check:no-em-dash', exit_code: 0, log_path: `${dir}/logs/check:no-em-dash.log` },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: `${dir}/logs/check:no-answer-keys.log` },
  { name: 'check:docs-sync', exit_code: 0, log_path: `${dir}/logs/check:docs-sync.log` },
  { name: 'render-review', exit_code: 1, log_path: `${dir}/logs/render-review.txt` },
  { name: 'check:content', exit_code: 0, log_path: `${dir}/logs/check-content.log` },
  { name: 'measure-figure-text', exit_code: 0, log_path: `${dir}/logs/measure-figure-text.log` },
];

const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'Guide: Scheme-and-Course-guides/2nd 2026.pdf (Course EFMP-304, Critical Thinking and Reflective Practices; extracted-text/2nd 2026.txt): Week 11-12 maps to Unit 5 "Engaging in Reflective Practice" covering Reflection as experiential learning, The reflective cycle, Theoretical basis of reflective practice, Knowing yourself as a reflective practitioner, and Frameworks and models of reflection. All sub-topics U5-01 through U5-05 in the content-spec are covered.',
      'SLO:EFMP-304-5-1 on index.mdx, topic-01.mdx, topic-02.mdx; SLO:EFMP-304-5-2 on index.mdx, topic-03.mdx, topic-04.mdx; both on unit-assessment.mdx.',
      'specs/content/efmp-304/content-spec.md unit 5 section: all 5 sub-topics U5-01 through U5-05 mapped to file sections; coverage matrix confirms each has a taught passage.'
    ]
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'boud2013 (Boud, Keogh, & Walker, 1985/2013): print monograph declared under ## Unverifiable sources in sources/unit-05.md per Constitution Art. VII / Decision D-2026-0001; correctly used for title-and-catalogue-level concepts of the three-stage experiential-learning mechanism (returning, attending, re-evaluating) in Topic 5.1 and 5.2.',
      'brookfield2017 (Brookfield, 2017, Becoming a critically reflective teacher, 2nd ed.): print monograph declared under ## Unverifiable sources; supports critical reflection strand and four lenses in Topics 5.3 and 5.4.',
      'osterman2004 (Osterman & Kottkamp, 2004) and taggart2005 (Taggart & Wilson, 2005): print monographs declared under ## Unverifiable sources; support teacher reflective cycle stages, return arrow, and comparative analysis of models.',
      'behar2011 (Behar-Horenstein & Niu, 2011, DOI: 10.19030/tlc.v8i2.3554): open-access registry-verified source (sources/texts/behar2011.md); supports experiential learning evidence base.',
      'No invented citations or uncorroborated empirical generalizations found in prose.'
    ]
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'Coverage matrix (specs/content/efmp-304/coverage/unit-05.md): Sub-topics U5-01 through U5-05 mapped to specific file sections and sources. Concept graph (specs/content/efmp-304/concepts/unit-05.md) links concepts CON:EFMP-304-5-1 through CON:EFMP-304-5-7 to topics and assessment items.',
      'Assessment blueprint: 10 MCQs (Remember to Apply), 10 RRQs (Understand to Analyze), 5 ERQs (Analyze to Evaluate/Create) strictly satisfies 10/10/5 requirement.',
      'All 4 topics contain classroom situation, explanation, misconceptions, activity, check-your-understanding, self-assessment checklist, and summative task; check:depth-gate exit 0.'
    ]
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      'Independently solved all 10 MCQs before reading keys: derived 1-B, 2-B, 3-B, 4-C, 5-B, 6-C, 7-B, 8-C, 9-D, 10-A matches supplied answer key in unit-assessment.mdx:163-173 100%.',
      'RRQs 1-10: all have clear model answers and 2-3 mark mark schemes tied to unit concepts and Bloom demands.',
      'ERQs 1-5: demanding analytic and evaluative tasks with analytic rubrics distinguishing performance levels. ERQ 5 is an integrative capstone across cycle stages, theoretical strands, and Brookfield lenses.',
      'Bloom tags on all items match actual cognitive demand; answer keys strictly isolated to final bounded ## Answers and marking guidance section; check:no-answer-keys exit 0.'
    ]
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'render-review unavailable (exit 1): deployed SHA 70e141423d07fe2cb52eef828aaee8910f94f52d differs from HEAD b7417e1e0271fd01f1984a48afe830f8ecc3ab85 on docs/semester-2/efmp-304/unit-05/ and 5 WebP illustration assets; host limits and brief prohibit local build, dev server, or browser runs.',
      'Structural checks pass from source: single h1 per file, proper h2/h3 nesting; all 13 figures (8 SVGs + 5 WebP illustrations) have descriptive alt text matching instructional content.',
      'node scripts/measure-figure-text.mjs exits 0 across all 32 SVGs in static/img/figures/efmp-304/unit-05/.'
    ]
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      'Prose targets HSC/intermediate graduate register. Technical terms (experiential learning, return arrow, reflection-in-action, reflection-on-action, critical reflection, four lenses) defined clearly on first introduction.',
      'Each topic opens with an authentic, relatable Sindh classroom situation (government high school in Dadu, girls\' school in Sindh, teacher-education institute in Karachi, college library in Sukkur).',
      'Common misconceptions addressed explicitly across all 4 topics (confusing routine with growth, stopping before the return arrow, treating reflection as purely technical, choosing a model only by number of stages).'
    ]
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'Each topic follows Spec 008 per-topic learning cycle: classroom situation, explanation, misconceptions, activity, check, summary, self-assessment checklist, and summative task with rubric.',
      'Activities are contextually feasible in Pakistani/Sindhi schools (identifying routine vs growth, tracing an incident through cycle stages, mapping thinkers to questions, selecting a model for an assessed file).',
      'Progression moves logically from mechanism (Topic 5.1) to cycle mechanics (Topic 5.2), theoretical origins (Topic 5.3), and practical model selection (Topic 5.4).'
    ]
  }
];

const findings = [
  {
    severity: 'uncertain',
    resolved: false,
    message: 'Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: the deployed SHA 70e141423d07fe2cb52eef828aaee8910f94f52d differs from HEAD b7417e1e0271fd01f1984a48afe830f8ecc3ab85 on docs/semester-2/efmp-304/unit-05/ and static/img/figures/efmp-304/unit-05/. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure geometry pass from source.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'Distractor distribution: option B accounts for 5 of 10 MCQ keys (items 1-3, 5, 7). All distractors are pedagogically sound, but distractor positions could be shuffled in future maintenance passes.'
  }
];

const report = {
  schema_version: 1,
  course_code: 'EFMP-304',
  unit_no: 5,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:a19f0138ed4a2aa0fd31c519782550cbbd3ef640',
  reviewer_run_id: 'cbbf4d0e-56be-44b2-8e77-4ad8f75eac72',
  model: 'Gemini 3.8 Flash (Medium)',
  started_at: '2026-11-25T09:02:14.000Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  criteria,
  findings,
  commands,
  evidence_manifest
};

const reportPath = 'specs/content/efmp-304/reviews/unit-05/G3/agy-cycle2-20261125.json';
writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(`Wrote report to ${reportPath}`);

// Run validator
const validation = execFileSync('node', ['scripts/review-evidence.mjs', 'validate', reportPath], { encoding: 'utf8' });
console.log(validation);
