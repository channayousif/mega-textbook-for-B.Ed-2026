import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { rulingDigest, validateReport } from '../../../../../../../scripts/lib/review-evidence.mjs';

const dir = 'specs/content/efmp-409/reviews/unit-04/G3/agy-run1-20261126';
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

const U = 'docs/semester-4/efmp-409/unit-04';
const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'specs/content/efmp-409/content-spec.md:300-345 Unit 4 G1 spec: sub-topics U4-01..U4-09, figure plan fig-U4-1..6, banner fig-U4-7, blueprint 10/10/5.',
      'Scheme-and-Course-guides/extracted-text/course-guides-2025/FoundationsEd_Sept13.txt: Unit 4 Islamic Perspectives on Education allocates topics on education in light of Quran and Hadith, Meesaq-e-Madina, Khutbat-ul-Wida, and As-Suffa.',
      `${U}/topic-01.mdx ### Explaining Surah Al-Alaq matches U4-01.`,
      `${U}/topic-01.mdx ### The emphasis on the acquisition of education in the Qur'an matches U4-02.`,
      `${U}/topic-01.mdx ### The emphasis on the acquisition of education in the Hadith matches U4-03.`,
      `${U}/topic-02.mdx ### Meesaq-e-Madina: the foundation stone of education matches U4-04.`,
      `${U}/topic-02.mdx ### The Last Sermon: its relevance to education matches U4-05.`,
      `${U}/topic-02.mdx ### Analysing the educational principles of the Last Sermon matches U4-06.`,
      `${U}/topic-03.mdx ### As-Suffa: the first institute in Islam matches U4-07.`,
      `${U}/topic-03.mdx ### The method of teaching in As-Suffa matches U4-08.`,
      `${U}/topic-03.mdx ### The curriculum of As-Suffa matches U4-09.`,
      'CLO/SLO references SLO:EFMP-409-4-1, SLO:EFMP-409-4-2, and SLO:EFMP-409-4-3 traced across index, topics, and assessment.',
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'specs/content/efmp-409/sources/texts/quran-translation.md: Surah Al-Alaq 96:1-5, Surah Az-Zumar 39:9, Surah Al-Mujadilah 58:11, Surah Taha 20:114, Surah Al-Baqarah 2:269, Surah Al-Ghashiyah 88:17-20.',
      'specs/content/efmp-409/sources/texts/hec-2013-foundations.md: HEC (2012) Foundations of Education guide Unit 4 outline and Education in Islam sayings.',
      'specs/content/efmp-409/sources/texts/sep-curren-education.md: Philosophy of education scope and values.',
      'specs/content/efmp-409/sources/texts/besari-2023-knowledge-ethics.md: Islamic education and ethics in seeking knowledge.',
      'specs/content/efmp-409/sources/texts/tobroni-2020-medina-charter.md: Medina Charter principles of peace, pluralism, and protection of rights.',
      'specs/content/efmp-409/sources/texts/anwer-2024-charter-magna-carta.md: Comparative constitutional analysis of the Charter of Medina.',
      'specs/content/efmp-409/sources/texts/farooq-2018-farewell-sermon.md: Analytical review of the Farewell Sermon (Khutbat-ul-Wida) and moral principles.',
      'specs/content/efmp-409/sources/texts/sani-2019-suffa.md: Ashab e Suffa role, residential structure, and tarbiya system.',
      'specs/content/efmp-409/sources/unit-04.md: All external sources verified and bound; no unverifiable sources declared.',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/efmp-409/coverage/unit-04.md: Maps all nine subtopics U4-01..U4-09 to exact headings with bound sources; design trace details retrieval items, MCQs, RRQs, and ERQs.',
      'check:depth-gate exit 0: concept coverage, required pedagogical blocks (classroom situation, explanation, worked example, misconceptions, activity, retrieval, summary, self-assessment, practicum, summative task with rubric), formative floor, reading-minutes band (54 min vs 42-58 min band), coverage-sources consistency.',
      'specs/content/efmp-409/concepts/unit-04.md: Defines 7 core concepts (CON:EFMP-409-4-1..7) with prerequisites, SLO mappings, and assessment links.',
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      `${dir}/assessment-solutions.md: Independent solve of MCQs 1-10 (B, A, B, C, B, A, C, B, B, A) matches ${U}/unit-assessment.mdx:111-120 10/10.`,
      'MCQ topic spread across Topic 4.1 (4 items), Topic 4.2 (3 items), and Topic 4.3 (3 items); RRQ topic spread 4/3/3 matching syllabus balance.',
      'RRQs 1-10 derived answers verified against model answers and marking criteria; cognitive demand ranges Understand to Analyze.',
      'ERQs 1-5 feature analytic rubrics with Bloom demand Analyze to Create; ERQ 3 is approved blueprint item comparing As-Suffa with a present-day primary classroom.',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'render-review unavailable (exit 1): deployed SHA 074ab11456b999cf5d3c9b8aa6e603b2de834eb5 differs from HEAD b50f44f33e423da959742824832bdfd05e7a0933 on docs/semester-4/efmp-409/unit-04/index.mdx and static/img/figures/efmp-409/unit-04/fig-U4-7.webp; host limits and brief prohibit local build, dev server, or browser runs.',
      'Structural accessibility passes from source: all figures have descriptive alt text; all SVGs carry role="img", aria-labelledby, <title>, and <desc>; semantic headings and table markup verified.',
      'measure-figure-text exits 0 across all 24 SVGs in static/img/figures/efmp-409/unit-04/.',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      `${U}/index.mdx, topic-01.mdx, topic-02.mdx, topic-03.mdx: clear, plain prose suitable for B.Ed trainees without specialist background.`,
      'Core concepts defined at first use with bold text (ilm, iqra, Meesaq-e-Madina, Khutbat-ul-Wida, As-Suffa, halaqah).',
      'Grounded in realistic Pakistani classroom contexts across Sindh and beyond (Larkana, Hyderabad, Nawabshah, Umerkot, Sukkur).',
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'All topics execute complete pedagogical progression: classroom situation -> explanation -> worked example -> misconception correction -> group activity -> retrieval -> summary -> self-assessment -> practicum connection -> summative task with rubric.',
      'Common misconceptions explicitly addressed: Islam values only religious knowledge (Topic 4.1), the Charter of Medina was only a military treaty (Topic 4.2), the Last Sermon is only a religious address (Topic 4.2), As-Suffa was only a place of shelter (Topic 4.3), a circle is just a seating plan (Topic 4.3).',
      'Islamic material handled with scholarly accuracy, respect, and non-sectarian restraint, advising teachers to refer complex theological matters to qualified scholars.',
    ],
  },
];

const findings = [
  {
    severity: 'uncertain',
    resolved: false,
    message: 'Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: the deployed SHA 074ab11456b999cf5d3c9b8aa6e603b2de834eb5 differs from HEAD b50f44f33e423da959742824832bdfd05e7a0933 on docs/semester-4/efmp-409/unit-04/index.mdx and static/img/figures/efmp-409/unit-04/fig-U4-7.webp. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure geometry pass from source.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'Per content-spec drafting note 8, Islamic material (Surah Al-Alaq, the Hadith on knowledge, the Charter of Medina, the Last Sermon, and As-Suffa) should be checked by a qualified scholar before certification. Content in this unit handles Islamic concepts with care, quotes verses by reference, names translations and collections, and explicitly guides teachers to refer religious interpretation to qualified scholars.',
  },
];

const rulings = {
  'D-2026-0001': rulingDigest('.', 'D-2026-0001'),
};

const report = {
  schema_version: 1,
  course_code: 'EFMP-409',
  unit_no: 4,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:8b00a3f53c9bbc580a83f5a9fc30358d7a1154d8',
  reviewer_run_id: '6db538c7-bfd8-4d10-b233-a55663871884',
  model: 'Gemini 3.8 Flash (Medium)',
  started_at: '2026-11-26T04:15:43.000Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  rulings,
  criteria,
  findings,
  commands,
  evidence_manifest,
};

const reportPath = 'specs/content/efmp-409/reviews/unit-04/G3/agy-run1-20261126.json';
writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(`Wrote report to ${reportPath} with ${Object.keys(evidence_manifest).length} evidence files.`);

validateReport('.', report);
console.log('Report successfully validated against review evidence contract.');
