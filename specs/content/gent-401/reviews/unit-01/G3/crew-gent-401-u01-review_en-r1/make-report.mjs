import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';

const root = process.cwd();
const dir = relative(root, import.meta.dirname ?? new URL('.', import.meta.url).pathname);
const prefix = 'specs/content/gent-401/reviews/unit-01/G3/crew-gent-401-u01-review_en-r1';
const manifest = JSON.parse(readFileSync(join(prefix, 'manifest.json'), 'utf8'));
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

const files = [];
const walk = (d) => {
  for (const name of readdirSync(d).sort()) {
    const p = join(d, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (!p.endsWith('.json') || !p.endsWith('crew-gent-401-u01-review_en-r1.json')) files.push(p);
  }
};
walk(prefix);
const evidence_manifest = Object.fromEntries(files.map((p) => [relative(root, p).split('\\').join('/'), sha(p)]));

const log = (name) => `${prefix}/logs/${name}.txt`;
const commands = [
  { name: 'validate:content', exit_code: 0, log_path: log('validate-content') },
  { name: 'check:depth-gate', exit_code: 0, log_path: log('check-depth-gate') },
  { name: 'check:figures', exit_code: 0, log_path: log('check-figures') },
  { name: 'check:no-em-dash', exit_code: 0, log_path: log('check-no-em-dash') },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: log('check-no-answer-keys') },
  { name: 'check:docs-sync', exit_code: 0, log_path: log('check-docs-sync') },
  { name: 'render-review', exit_code: 1, log_path: log('render-review') },
  { name: 'check:content', exit_code: 0, log_path: log('check-content-final') },
  { name: 'check:svg-style', exit_code: 0, log_path: log('check-svg-style') },
  { name: 'check:concept-graph', exit_code: 0, log_path: log('check-concept-graph') },
  { name: 'check:bloom-bands', exit_code: 0, log_path: log('check-bloom-bands') },
  { name: 'check:source-floor', exit_code: 0, log_path: log('check-source-floor') },
  { name: 'check:licence', exit_code: 0, log_path: log('check-licence') },
  { name: 'check:pipeline-gate', exit_code: 0, log_path: log('check-pipeline-gate') },
  { name: 'measure-figure-text', exit_code: 0, log_path: log('measure-figure-text') },
  { name: 'build:content-status', exit_code: 0, log_path: log('build-content-status-final') },
];

const summary = `${prefix}/summary.md#criterion-evidence`;
const report = {
  schema_version: 1,
  course_code: 'GENT-401',
  unit_no: 1,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:claude-crew',
  author_run_id: 'claude:crew-gent-401-u01-author',
  reviewer_run_id: 'crew-gent-401-u01-review_en-r1',
  model: 'Claude Code (model identity LongCat-2.5; exact deployment version unavailable)',
  started_at: '2026-11-26T20:20:00Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  reviewed_commit: '6a810e62c7b9d4ff7643b56a17f75cb9db2ce98e',
  criteria: [
    { id: 'authority', status: 'pass', evidence: [`${summary}: authority`, 'specs/content/gent-401/content-spec.md:74-101', 'specs/content/gent-401/coverage/unit-01.md:5-19', 'docs/semester-4/gent-401/unit-01/topic-01.mdx:34,59,87', 'docs/semester-4/gent-401/unit-01/topic-02.mdx:34,60,81'] },
    { id: 'sources', status: 'fail', evidence: [`${summary}: sources`, `${prefix}/source-verification.md`, 'docs/semester-4/gent-401/unit-01/topic-01.mdx:91', 'specs/content/gent-401/sources/texts/openstax-entrepreneurship.md:14', 'specs/content/gent-401/sources/texts/butler-iea.md:12'] },
    { id: 'coverage', status: 'pass', evidence: [`${summary}: coverage`, 'specs/content/gent-401/coverage/unit-01.md:5-19', 'specs/content/gent-401/content-spec.md:96-101'] },
    { id: 'assessment', status: 'fail', evidence: [`${summary}: assessment`, `${prefix}/assessment-solutions.md`, 'docs/semester-4/gent-401/unit-01/unit-assessment.mdx:32-81', 'docs/semester-4/gent-401/unit-01/unit-assessment.mdx:108-119'] },
    { id: 'accessibility', status: 'unverified', evidence: [`${summary}: accessibility`, `${prefix}/logs/render-review.txt`, 'docs/semester-4/gent-401/unit-01/index.mdx:20', 'docs/semester-4/gent-401/unit-01/topic-01.mdx:28,93', 'docs/semester-4/gent-401/unit-01/topic-02.mdx:28,87'] },
    { id: 'readability', status: 'pass', evidence: [`${summary}: readability`, 'docs/semester-4/gent-401/unit-01/topic-01.mdx:20-113', 'docs/semester-4/gent-401/unit-01/topic-02.mdx:20-100'] },
    { id: 'pedagogy', status: 'pass', evidence: [`${summary}: pedagogy`, 'docs/semester-4/gent-401/unit-01/topic-01.mdx:115-148', 'docs/semester-4/gent-401/unit-01/topic-02.mdx:102-137', 'docs/semester-4/gent-401/unit-01/unit-teacher-notes.mdx:16-40'] },
  ],
  findings: [
    { id: 'F1', severity: 'blocking', resolved: false, message: 'MCQ key and option-length giveaway (unit-assessment.mdx:32-81, key 108-119). Key distribution A1/B7/C2/D0, so an all-B answer scores 7/10 and no item keys D; the keyed option is the longest option in 7 of 10 items (1,2,3,5,6,7,8). Item-writing rule requires parallel similar-length options with no longest-option giveaway. REPAIR: rebalance correct letters across A-D and vary option length so the keyed option is not disproportionately longest.' },
    { id: 'F2', severity: 'blocking', resolved: false, message: 'topic-01.mdx:91 says the seven characteristics in fig-U1-2 "appear in both sources". The bound OpenStax 1.3 list and Butler p. 23 list do not both contain confidence, problem-solving, openness to learning, persistence or curiosity as stated; at most three rows are in both. REPAIR: reword to say the seven are drawn from the two sources, or common to the two accounts, and keep the table.' },
    { id: 'F3', severity: 'uncertain', resolved: false, message: 'Render and print inspection unavailable. Deployed SHA 366019f8ace647e892523e553b81ab6d1832ec68 differs from reviewed HEAD 6a810e62c7b9d4ff7643b56a17f75cb9db2ce98e on docs/semester-4/gent-401/unit-01/index.mdx and static/img/figures/gent-401/unit-01/fig-U1-5.webp, so the CI-built production site is not the reviewed input and the brief forbids a build or server. accessibility is unverified. The missing or mismatched banner asset is treated as unverified, not as a content defect.' },
    { id: 'A-1', severity: 'advisory', resolved: false, message: 'butler-iea edition year 2020 is the content-spec value and still needs IEA confirmation (sources/unit-01.md:17-19); the unit cites Butler (2020) throughout. The author discloses this.' },
    { id: 'A-2', severity: 'advisory', resolved: false, message: 'GENT-401 is not yet in catalog/courses.json (content-spec.md:14); an owner ruling is pending. Course-level, outside Unit 1 content.' },
  ],
  commands,
  evidence_manifest,
  limitations: [
    'Render and print inspection was not performed: deployed SHA 366019f8ace647e892523e553b81ab6d1832ec68 differs from reviewed HEAD 6a810e62c7b9d4ff7643b56a17f75cb9db2ce98e on the unit English directory and figure folder, and the brief forbids a build, dev server or Playwright e2e run from a review job. accessibility is therefore unverified and the report escalates.',
    'No parent-prepared frozen handoff or runtime provenance was supplied; the manifest was prepared locally over a clean tree and re-verified against a fresh inputManifest() computation (93 inputs, 0 mismatches). The author identity is taken from history/prompts/gent-401/crew-gent-401-u01-author.green.prompt.md.',
    'The Urdu mirror and the .ur.svg variants are G5 scope and were not evaluated as content.',
    'No new external retrieval was attempted; claims were judged against the bound excerpts.',
    'Advisory only: this report does not certify the unit, sign anything, append a done tracker row, change translation_status, alter the registry or publish.',
  ],
};

writeFileSync(join(prefix, '..', 'crew-gent-401-u01-review_en-r1.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`Wrote report with ${Object.keys(evidence_manifest).length} evidence files.`);
