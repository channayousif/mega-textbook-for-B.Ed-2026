import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { rulingDigest, validateReport } from '../../../../../../../scripts/lib/review-evidence.mjs';

const dir = 'specs/content/efmp-409/reviews/unit-02/G3/agy-run1-20261126';
const manifest = JSON.parse(readFileSync(`${dir}/manifest.json`, 'utf8'));
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

const evidenceFiles = [
  `${dir}/manifest.json`,
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

const U = 'docs/semester-4/efmp-409/unit-02';
const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'specs/content/efmp-409/content-spec.md:200-245 Unit 2 G1 spec: sub-topics U2-01..U2-07, figure plan fig-U2-1..4, banner fig-U2-5, blueprint 10/10/5.',
      'Scheme-and-Course-guides/extracted-text/course-guides-2025/FoundationsEd_Sept13.txt: Unit 2 Foundations of Education allocates topics on philosophical, sociological, psychological, historical, ideological, and Islamic foundations.',
      `${U}/topic-01.mdx ### Comparing the philosophical and ideological foundations of education matches U2-01.`,
      `${U}/topic-01.mdx ### The sociological foundations of education matches U2-02.`,
      `${U}/topic-01.mdx ### The psychological foundations of education matches U2-03.`,
      `${U}/topic-01.mdx ### The historical foundations of education matches U2-04.`,
      `${U}/topic-02.mdx ### Ideology versus religion matches U2-05.`,
      `${U}/topic-02.mdx ### The ideological foundations of education matches U2-06.`,
      `${U}/topic-02.mdx ### The Islamic foundations of education matches U2-07.`,
      'CLO/SLO references SLO:EFMP-409-2-1 and SLO:EFMP-409-2-2 traced across index, topics, and assessment.',
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'specs/content/efmp-409/sources/texts/hec-2013-foundations.md: HEC (2012) Foundations of Education guide Unit 2 outlines and perspectives.',
      'specs/content/efmp-409/sources/texts/sep-curren-education.md & sep-ideology-2025.md: Philosophy of education scope and descriptive vs critical definitions of ideology.',
      'specs/content/efmp-409/sources/texts/openstax-sociology-2021.md & seifert2009.md & spielman2020.md: Functionalist, conflict, interactionist, behaviourist, constructivist, social cognitivist, and humanist frameworks.',
      'specs/content/efmp-409/sources/texts/pak-constitution-1973.md: Articles 2A (Objectives Resolution), 25A (right to education), 31 (Islamic way of life), 227 (conformity with Qur\'an/Sunnah).',
      'specs/content/efmp-409/sources/texts/jinnah-1940-lahore.md & jinnah-1947-assembly.md & nep-2009.md: Lahore Resolution address, 11 August 1947 address on equal citizenship, and NEP 2009 national aims 4, 8, and 9.',
      'specs/content/efmp-409/sources/texts/quran-translation.md & susanti-2023-tarbiyah.md & khan-khan-2020-aligarh.md & hassan-2020-two-nation.md: Surah Al-Alaq 96:1-5, Surah Az-Zumar 39:9, tarbiyah/ta\'lim/ta\'dib distinctions, Aligarh movement, Two-Nation Theory.',
      'specs/content/efmp-409/sources/unit-02.md: All external sources verified and bound; no unverifiable sources declared.',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/efmp-409/coverage/unit-02.md: Maps all seven subtopics U2-01..U2-07 to exact headings with bound sources; design trace details retrieval items, MCQs, RRQs, and ERQs.',
      'check:depth-gate exit 0: concept coverage, required pedagogical blocks (hook, explanation, worked example, misconceptions, activity, retrieval, summary, self-assessment, practicum, summative task with rubric), formative floor, reading-minutes band (52 min vs 40-52 min band), coverage-sources consistency.',
      'specs/content/efmp-409/concepts/unit-02.md: Defines 9 core concepts (CON:EFMP-409-2-1..9) with prerequisites, SLO mappings, and assessment links.',
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      `${dir}/assessment-solutions.md: Independent solve of MCQs 1-10 (D, B, C, A, C, B, B, C, C, C) matches ${U}/unit-assessment.mdx:110-119 10/10.`,
      'MCQ topic spread 5/5 across Topic 2.1 and Topic 2.2; RRQ topic spread 5/5 across Topic 2.1 and Topic 2.2.',
      'RRQs 1-10 derived answers verified against model answers and marking criteria; cognitive demand ranges Understand to Analyze.',
      'ERQs 1-5 feature analytic rubrics with Bloom demand Analyze and Evaluate; ERQ 5 is approved blueprint item sorting 10 Pakistani school features across 5 foundations with deep analysis of 2.',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'render-review unavailable (exit 1): deployed SHA 074ab11456b999cf5d3c9b8aa6e603b2de834eb5 differs from HEAD 5533bee273ecb872ef2cf1df1e63a1a5b83fb428 on docs/semester-4/efmp-409/unit-02/index.mdx and static/img/figures/efmp-409/unit-02/fig-U2-5.webp; host limits and brief prohibit local build, dev server, or browser runs.',
      'Structural accessibility passes from source: all figures have descriptive alt text; all SVGs carry role="img", aria-labelledby, <title>, and <desc>; semantic headings and table markup verified.',
      'measure-figure-text exits 0 across all 16 SVGs in static/img/figures/efmp-409/unit-02/.',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      `${U}/index.mdx, topic-01.mdx, topic-02.mdx: clear, plain prose suitable for B.Ed trainees without specialist background.`,
      'Core concepts defined at first use with bold text (ideology, functionalism, conflict theory, interactionism, behaviourism, constructivism, social cognitivism, humanism, tarbiyah, ta\'lim, ta\'dib).',
      'Grounded in realistic Pakistani classroom contexts across Sindh and beyond (Sukkur, Rohri, Khairpur, Tharparkar, Karachi, Larkana, Nawabshah).',
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'Both topics execute complete pedagogical progression: classroom situation -> explanation -> worked example -> misconception correction -> group activity -> retrieval -> summary -> self-assessment -> practicum connection -> summative task with rubric.',
      'Common misconceptions explicitly addressed: philosophy vs ideology as mere opinions (Topic 2.1), sociology of education as only social problems (Topic 2.1), psychology only for difficulties (Topic 2.1), ideology and religion as identical (Topic 2.2), ideology as mere slogan (Topic 2.2), Islam valuing only sacred knowledge (Topic 2.2).',
      'Islamic material handled with scholarly accuracy, respect, and non-sectarian restraint, advising teachers to refer complex theological matters to qualified scholars.',
    ],
  },
];

const findings = [
  {
    severity: 'uncertain',
    resolved: false,
    message: 'Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: the deployed SHA 074ab11456b999cf5d3c9b8aa6e603b2de834eb5 differs from HEAD 5533bee273ecb872ef2cf1df1e63a1a5b83fb428 on docs/semester-4/efmp-409/unit-02/index.mdx and static/img/figures/efmp-409/unit-02/fig-U2-5.webp. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure geometry pass from source.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'Per content-spec drafting note 8, Islamic material (Objectives Resolution, Qur\'an 96:1-5, Qur\'an 39:9, tarbiyah, ta\'lim, ta\'dib, and the relationship between Islamic foundation and Ideology of Pakistan) should be checked by a qualified scholar before certification. Content in this unit handles Islamic concepts with care, quotes verses by reference, names translations, and explicitly guides teachers to refer religious interpretation to qualified scholars.',
  },
];

const rulings = {
  'D-2026-0001': rulingDigest('.', 'D-2026-0001'),
};

const report = {
  schema_version: 1,
  course_code: 'EFMP-409',
  unit_no: 2,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:9150df04a0a23b80030cc3965bb52eef09833d98',
  reviewer_run_id: 'c5c9015c-7be1-425c-ae16-2b8b24100b6b',
  model: 'Gemini 3.8 Flash (Medium)',
  started_at: '2026-11-25T23:46:25.000Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  rulings,
  criteria,
  findings,
  commands,
  evidence_manifest,
};

const reportPath = 'specs/content/efmp-409/reviews/unit-02/G3/agy-run1-20261126.json';
writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(`Wrote report to ${reportPath} with ${Object.keys(evidence_manifest).length} evidence files.`);

validateReport('.', report);
console.log('Report successfully validated against review evidence contract.');
