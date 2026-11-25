import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const dir = 'specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125';
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
      'Guide (2nd 2026.pdf, lines 1319-1332; extracted-text 2nd 2026.txt): Week 13 maps to Topic 6.1 (Education policies in developing countries; Lessons for Pakistan; SDGs), Week 14 maps to Topic 6.2 (ICT in education management; Data-driven planning; Digital transformation), Week 15 maps to Topic 6.3 (Innovations in policy design; Strategic planning for quality and equity; Role of teachers and administrators). All 9 sub-topics in the content-spec checklist are covered.',
      'SLO:EFMP-303-6-1 on index.mdx and topic-01.mdx; SLO:EFMP-303-6-2 on index.mdx, topic-02.mdx, topic-03.mdx; both on assessment and teacher-notes.',
      'specs/content/efmp-303/content-spec.md unit 6 section: all 9 sub-topics U6-01 through U6-09 mapped to file sections; coverage matrix confirms each has a taught passage.'
    ]
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'gem-report2020 (UNESCO GEM Report 2020, unesdoc pf0000373718): supports Bangladesh/Sri Lanka/Nepal comparisons (topic-01), EMIS in Pakistan (topic-02), cross-sector integration (topic-03). Declared in content-spec.md Author-selected table, checked 2026-10-10.',
      'nep2017 (National Education Policy 2017 draft): supports NEP 2017 references in all three topics. Google Drive URL returns HTTP 200. Declared in content-spec.md Guide-required table.',
      'unesco-sdg4 (UNESCO 2017, DOI 10.54675/HKLV4772): supports SDG4 targets (4.1-4.7, 4.a, 4.b, 4.c) and local relevance framing in Topic 6.1.',
      'No invented references detected in core instructional text. Declared unverifiable source text noted honestly in sources/unit-06.md.'
    ]
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'Coverage matrix (specs/content/efmp-303/coverage/unit-06.md): 9 sub-topics mapped to specific file sections and sources. Reinforcement rows link each sub-topic to assessment items.',
      'Assessment blueprint: 10 MCQs (Remember to Apply), 10 RRQs (Understand to Analyze), 5 ERQs (Analyze to Evaluate/Create) matches content-spec 10/10/5 requirement.',
      'All 3 topics have classroom situation, explanation, misconceptions, activity, check-your-understanding, self-assessment checklist, summative task, and further reading; check:depth-gate exit 0.'
    ]
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      'Independently solved all 10 MCQs before reading keys: derived 1-B, 2-B, 3-B, 4-B, 5-B, 6-B, 7-B, 8-B, 9-B, 10-A matches supplied answer key in unit-assessment.mdx:138-147 100%.',
      'RRQs 1-10: all have model answers and 2-mark mark schemes tied to content. RRQ 7 and RRQ 9 discriminate Topics 6.2 and 6.3.',
      'ERQs 1-5: all demand Analyze-or-higher. ERQ 5 draws integratively on all units. Rubrics distinguish performance levels.',
      'Bloom tags on all items match actual cognitive demand.',
      'Answers confined to bounded final ## Answers and marking guidance section; check:no-answer-keys gate passed.'
    ]
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'render-review unavailable (exit 1): deployed SHA 7ca7b21298e4f5c59211b816273bd968a9799271 differs from HEAD 5a14660cb91f1f66e7f24ddceaad8e042fa64673 on docs/semester-2/efmp-303/unit-06/ and 4 raster illustration assets; host limits and brief prohibit local build, dev server, or browser runs.',
      'Structural checks pass from source: single h1 per file, proper h2/h3 nesting; all 10 figures (6 SVGs + 4 webp illustrations) have descriptive alt text matching instructional content.',
      'node scripts/measure-figure-text.mjs exits 0 across all 24 SVGs in static/img/figures/efmp-303/unit-06/. Prior cosmetic wordmark contact on fig-U6-2.svg resolved (height expanded to 540).'
    ]
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      'Prose targets HSC/intermediate graduate register. Technical terms (EMIS, disaggregated data, iterative planning, policy actor) glossed on first use.',
      'Each topic opens with a relatable Pakistani classroom scenario (Karachi B.Ed college, Larkana district education office, Attock rural school).',
      'Common misconceptions addressed explicitly across all 3 topics (technology as substitute, transplanting foreign policies, teachers as passive implementers).',
      'Sentence structure avoids unnecessary jargon; explanations build progressively.'
    ]
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'Each topic follows Spec 008 per-topic learning cycle: situation, explanation, activity, check, summary, self-assessment, practicum task, summative task with mini-rubric.',
      'Activities are contextually feasible in Pakistani/Sindhi settings (country comparison analysis, data dashboard interpretation, teacher-as-actor dialogue).',
      'Teacher notes (unit-teacher-notes.mdx) provide sequencing, instructional strategies, misconception handling, practical work guidance, and assessment discrimination notes.'
    ]
  }
];

const findings = [
  {
    severity: 'uncertain',
    resolved: false,
    message: 'Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: the deployed SHA 7ca7b21298e4f5c59211b816273bd968a9799271 differs from HEAD 5a14660cb91f1f66e7f24ddceaad8e042fa64673 on docs/semester-2/efmp-303/unit-06/ and static/img/figures/efmp-303/unit-06/. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure geometry pass from source.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'Further reading sections list Khan (2018) which content-spec replaced with gem-report2020 (unresolvable). Only in Further reading, not inline citations; does not affect source verification but is inconsistent with content-spec.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'MCQ option key clustering: 9 of 10 keys are option (B) (unit-assessment.mdx:138-147; items 1-9 are B; item 10 is A). Advisory: shuffle distractor positions in a future maintenance pass.'
  }
];

const report = {
  schema_version: 1,
  course_code: 'EFMP-303',
  unit_no: 6,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:846ab64ff19293a479a0e66c61d56eb7bbcf929d',
  reviewer_run_id: '74d1a0eb-0dad-4f89-8e25-3fe1de118b5c',
  model: 'Gemini 3.8 Flash (Medium)',
  started_at: '2026-11-25T05:15:44.000Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  criteria,
  findings,
  commands,
  evidence_manifest,
};

const reportPath = 'specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125.json';
writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(`Wrote report to ${reportPath}`);
