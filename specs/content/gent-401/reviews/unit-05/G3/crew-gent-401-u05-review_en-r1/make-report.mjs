import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';

// Run from the repository root: node <this file>
const root = process.cwd();
const run = 'crew-gent-401-u05-review_en-r1';
const prefix = `specs/content/gent-401/reviews/unit-05/G3/${run}`;
const manifest = JSON.parse(readFileSync(join(prefix, 'manifest.json'), 'utf8'));
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

const files = [];
const walk = (d) => {
  for (const name of readdirSync(d).sort()) {
    const p = join(d, name);
    if (statSync(p).isDirectory()) walk(p);
    else files.push(p);
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
  { name: 'check:concept-graph', exit_code: 0, log_path: log('check-concept-graph') },
  { name: 'check:bloom-bands', exit_code: 0, log_path: log('check-bloom-bands') },
  { name: 'check:svg-style', exit_code: 0, log_path: log('check-svg-style') },
  { name: 'check:source-floor', exit_code: 0, log_path: log('check-source-floor') },
  { name: 'measure-figure-text', exit_code: 0, log_path: log('measure-figure-text') },
  { name: 'check:content', exit_code: 0, log_path: log('check-content-final') },
  { name: 'input-verification', exit_code: 0, log_path: log('input-verification') },
];

const S = `${prefix}/summary.md#criterion-evidence`;
const U = 'docs/semester-4/gent-401/unit-05';
const report = {
  schema_version: 1,
  course_code: 'GENT-401',
  unit_no: 5,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:claude-crew',
  author_run_id: 'claude:crew-gent-401-u05-author',
  reviewer_run_id: run,
  model: 'claude-opus-5-5 (Claude Opus 5.5 in Claude Code; exact deployment build not exposed)',
  started_at: '2026-11-27T00:02:00Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  reviewed_commit: '01fde1b302e083ffef3098d3dadd40fbb90cf8d7',
  criteria: [
    { id: 'authority', status: 'pass', evidence: [`${S}: authority`, 'specs/content/gent-401/content-spec.md:258-302', `${U}/topic-01.mdx:34,57,75`, `${U}/topic-02.mdx:34,52,60`, `${U}/unit-assessment.mdx:98`] },
    { id: 'sources', status: 'fail', evidence: [`${S}: sources`, `${prefix}/source-verification.md`, `${U}/topic-02.mdx:64`, `${U}/topic-01.mdx:73`, `${U}/topic-01.mdx:89`, 'specs/content/gent-401/sources/texts/openstax-entrepreneurship.md:54', 'specs/content/gent-401/sources/texts/sintha-2020-break-even.md:27', 'specs/content/gent-401/sources/texts/scott-2017-efmd.md:35-44'] },
    { id: 'coverage', status: 'pass', evidence: [`${S}: coverage`, 'specs/content/gent-401/coverage/unit-05.md', 'specs/content/gent-401/concepts/unit-05.md', `${U}/topic-01.mdx:42-89`, `${U}/topic-02.mdx:36-64`] },
    { id: 'assessment', status: 'fail', evidence: [`${S}: assessment`, `${prefix}/assessment-solutions.md`, `${U}/unit-assessment.mdx:32-81`, `${U}/unit-assessment.mdx:108-119`] },
    { id: 'accessibility', status: 'unverified', evidence: [`${S}: accessibility`, `${prefix}/logs/render-review.txt`, `${prefix}/logs/measure-figure-text.txt`, `${prefix}/figure-check.md`, `${U}/index.mdx:20`, `${U}/topic-01.mdx:28,85`, `${U}/topic-02.mdx:28,66`] },
    { id: 'readability', status: 'pass', evidence: [`${S}: readability`, `${U}/topic-01.mdx:22-109`, `${U}/topic-02.mdx:22-86`] },
    { id: 'pedagogy', status: 'fail', evidence: [`${S}: pedagogy`, `${prefix}/figure-check.md`, `${U}/topic-01.mdx:24,53`, `${U}/topic-02.mdx:24,42,46`, 'static/img/figures/gent-401/unit-05/fig-U5-1.svg', `${U}/unit-teacher-notes.mdx:16-48`] },
  ],
  findings: [
    { id: 'F1', severity: 'blocking', resolved: false, message: "Running case contradicts itself: topic-01.mdx:24 and :53 say Imran saved Rs 50,000, which covers the Rs 50,000 start-up budget exactly; topic-02.mdx:24 and :42 (and the bootstrapping row at :46) say he saved Rs 20,000 and needs Rs 50,000. REPAIR: use one savings figure across the unit (for example Rs 20,000 in Topic 5.1, so the budget shows a Rs 30,000 gap that Topic 5.2 funds) and reword topic-01.mdx:53 to match." },
    { id: 'F2', severity: 'blocking', resolved: false, message: 'fig-U5-1 break-even chart is not drawn to its own axis scale (all four variants: .svg, .dark.svg, .ur.svg, .ur.dark.svg). Fixed-cost line at y=270 shows about Rs 21,700 (should be y=285, Rs 20,000); revenue reaches about Rs 43,400 at 20 pupils (should end at y=110, Rs 40,000); total cost ends about Rs 30,400 (should end at y=215, Rs 28,000); break-even dot at y=222 shows about Rs 27,200 (should be y=241.25, Rs 25,000). The alt, desc and topic-01.mdx:71 say the lines cross at 13 pupils; they cross at 12.5 pupils and 13 is the whole-pupil break-even. REPAIR: redraw at the coordinates in figure-check.md and word the crossing as 12.5 pupils, so 13 needed; fix the manifest prompt with it.' },
    { id: 'F3', severity: 'blocking', resolved: false, message: "Misattribution at topic-02.mdx:64: 'The OpenStax textbook warns that a campaign needs an established network and skilful use of the media (section 9.2)'. The bound note (openstax-entrepreneurship.md:54) has only the late-rewards point, and OpenStax 9.2 read on 2026-11-27 contains no such statement; the point is Scott (2017) ch. 12: 'without an established network and/or skillful media involvement'. REPAIR: attribute the network/media point to Scott, keep the late-rewards point for OpenStax 9.2." },
    { id: 'F4', severity: 'blocking', resolved: false, message: 'MCQ construction (unit-assessment.mdx:32-81, key :110-119). Keys are correct, but the distribution is A2/B6/C2/D0: answering B throughout scores 6/10 and D is never correct. MCQ 3 options A and D both describe variable costs, so they can be discarded together. REPAIR: spread the keys across A-D (about 2-3 each) and replace one of the equivalent distractors in MCQ 3.' },
    { id: 'F5', severity: 'blocking', resolved: false, message: "Overstated source at topic-01.mdx:73: Sintha (2020) 'notes that many small businesses fail because they never do this calculation at all'. The bound note (sintha-2020-break-even.md:27) says many SMEs stop trying and one cause is that they never do the calculation. REPAIR: 'notes that one reason many small businesses give up is that they never do this calculation'." },
    { id: 'F6', severity: 'uncertain', resolved: false, message: 'Render and print inspection unavailable. Deployed SHA 366019f8ace647e892523e553b81ab6d1832ec68 differs from reviewed HEAD 01fde1b302e083ffef3098d3dadd40fbb90cf8d7 on docs/semester-4/gent-401/unit-05/index.mdx (banner Figure line) and static/img/figures/gent-401/unit-05/fig-U5-5.webp, so the CI-built production site is not the reviewed input and the brief forbids a build or server. No 360px or A4 print inspection was done; accessibility is unverified. The undeployed banner is treated as unverified, not as a content defect.' },
    { id: 'F7', severity: 'uncertain', resolved: false, message: "Two Scott (2017) claims have no bound note: topic-01.mdx:89 (ch. 10, cash-flow problems among the main reasons new businesses fail) and the 'pile of cash' reason at topic-02.mdx:36 (ch. 1). The Unit 5 notes in scott-2017-efmd.md:35-44 cover chapters 1 (frugality only), 12 and 13. Both claims are true in the publisher PDF (ch. 10 'Reason 3: Cash Flow Problems'; ch. 1 'Lack of Money'), read outside the bundle. REPAIR: extend sources/texts/scott-2017-efmd.md; no prose change needed." },
    { id: 'A1', severity: 'advisory', resolved: false, message: 'Topic 5.1 est_reading_minutes 11 is below its content-spec band of 12-16 (content-spec.md:282); the unit total of 40 is inside 34-46 and check:depth-gate passes.' },
    { id: 'A2', severity: 'advisory', resolved: false, message: 'MCQ 6 is labelled (Apply) but asks for a definition (Remember/Understand).' },
    { id: 'A3', severity: 'advisory', resolved: false, message: "topic-02.mdx:24 offers an uncle's loan repaid in two years, but the worked example and table at :44-48 recast it as a bank loan repaid monthly. Name it a family loan or add the bank as a separate option." },
    { id: 'A4', severity: 'advisory', resolved: false, message: "topic-02.mdx:72 'an edtech repair shop' is unclear; name the venture plainly (for example a computer repair shop)." },
    { id: 'A5', severity: 'advisory', resolved: false, message: "fig-U5-3 reaches crowdfunding only through 'willing to give up part ownership? yes', although reward crowdfunding gives up none (topic-02.mdx:62); the start node asks how much money is needed but no branch uses the amount (figure plan, content-spec.md:296)." },
    { id: 'A6', severity: 'advisory', resolved: false, message: 'Cegielska & Zawadzka is cited as 2018 (OpenAlex year) while the DOI and volume 51(6) are the journal 2017 issue (sources/unit-05.md; topic-02.mdx:122).' },
    { id: 'A7', severity: 'advisory', resolved: false, message: "The fig-U5-1 manifest prompt (figures/unit-05.md) says the lines cross 'at 13 pupils and 25,000 rupees', which is not a point on either line. Fix with F2." },
  ],
  commands,
  evidence_manifest,
  limitations: [
    'Render and print inspection was not performed: the deployed SHA differs from the reviewed HEAD on the unit English directory and figure folder, and the brief forbids a build, dev server or Playwright run from a review job. accessibility is therefore unverified and the report escalates.',
    'No parent-prepared frozen handoff was supplied; the manifest was prepared in this worktree over a clean tree at 01fde1b30 and re-verified against a fresh inputManifest() computation (93 inputs, 0 mismatches). The author identity is taken from history/prompts/gent-401/crew-gent-401-u05-author.green.prompt.md.',
    'Author and reviewer are both Claude crew workers; independence rests on separate sessions with no shared drafting, not on a different vendor.',
    'Two public sources (Scott 2017 PDF, OpenStax section 9.2) were read outside the bundle only to classify F3 and F7; their hashes are in source-verification.md. They do not support any passing criterion.',
    'The Urdu mirror and the .ur.svg variants are G5 scope and were not evaluated as content, except that F2 geometry is shared by the Urdu chart variants.',
    'Advisory only: this report does not certify the unit, sign anything, append a done tracker row, change translation_status, alter the registry or publish.',
  ],
};

writeFileSync(join(prefix, '..', `${run}.json`), JSON.stringify(report, null, 2) + '\n');
console.log(`Wrote report with ${Object.keys(evidence_manifest).length} evidence files.`);
