import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const dir = 'specs/content/gcce-400/reviews/unit-04/G3/crew-run1-20261124';
const manifest = JSON.parse(readFileSync(`${dir}/manifest.json`, 'utf8'));
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const renders = readdirSync(`${dir}/renders`).map((f) => `${dir}/renders/${f}`);
const evidenceFiles = [
  `${dir}/manifest.json`, `${dir}/summary.md`, `${dir}/assessment-solutions.md`,
  `${dir}/limitations.md`, `${dir}/advisory-tracker-row.md`, `${dir}/make-report.mjs`,
  `${dir}/source-checks/constitution-arts-16-19-25.md`, `${dir}/source-checks/epa-involve-collaborate.md`,
  ...readdirSync(`${dir}/logs`).map((f) => `${dir}/logs/${f}`),
  ...renders,
];
const evidence_manifest = Object.fromEntries(evidenceFiles.sort().map((p) => [p, sha(p)]));
const cmd = (name, exit_code, f) => ({ name, exit_code, log_path: `${dir}/logs/${f}` });
const commands = [
  cmd('validate:content', 0, 'validate:content.log'),
  cmd('check:depth-gate', 0, 'check:depth-gate.log'),
  cmd('check:figures', 0, 'check:figures.log'),
  cmd('check:no-em-dash', 0, 'check:no-em-dash.log'),
  cmd('check:no-answer-keys', 0, 'check:no-answer-keys.log'),
  cmd('check:docs-sync', 0, 'check:docs-sync.log'),
  cmd('render-review', 1, 'render-review.txt'),
  cmd('measure-figure-text', 0, 'measure-figure-text.log'),
];
const U = 'docs/semester-4/gcce-400/unit-04';
const criteria = [
  { id: 'authority', status: 'pass', evidence: [
    'specs/content/gcce-400/content-spec.md:233-279 Unit 4 G1 spec: sub-topics U4-01..U4-07, figure plan fig-U4-1..5, unit-end blueprint 10/10/5.',
    `${U}/topic-01.mdx ### Accountability, ### Non-violence, ### Ethical considerations in civic engagement; ${U}/topic-02.mdx four ### headings match U4-04..U4-07 verbatim.`,
  ] },
  { id: 'sources', status: 'pass', evidence: [
    'specs/content/gcce-400/sources/texts/hasan-2006-orangi.md: 1.2 million, 1.5 per cent, 1980, 1988, 5,479 lanes, 98,527 houses, Rs 90m vs Rs 630m, IMR 128 to 37, 1994 SKAA, 248 locations, 2004 nalas group all match topic-02.mdx and fig-U4-5 alt text.',
    'specs/content/gcce-400/sources/texts/retallick-2005-smc.md: 15 members, teachers ineligible, monthly, two paid teachers, home visits, punctuality checks, four mechanisms match topic-02.mdx School management committees paragraph.',
    'macqueen-2001-community.md, unesco-2015-gced.md (pp. 23-24), bala-2013-khudai-khidmatgar.md (abstract), oecd-2011-social-cohesion.md: unit claims stay within the notes.',
    `${dir}/source-checks/constitution-arts-16-19-25.md: Articles 16, 19, 25 re-read 2026-11-24 in current transcription; no 26th/27th Amendment note attaches; topic-01.mdx paraphrases accurate.`,
    'specs/content/gcce-400/sources/unit-04.md ## Unverifiable sources: youniss-levine-2009 honestly declared; topic-02.mdx uses it only for the title-level idea.',
  ] },
  { id: 'coverage', status: 'pass', evidence: [
    'specs/content/gcce-400/coverage/unit-04.md maps all seven sub-topics to exact headings with bound sources; design trace names retrieval items and assessment items per sub-topic.',
    'check:depth-gate exit 0.',
  ] },
  { id: 'assessment', status: 'fail', evidence: [
    `${dir}/assessment-solutions.md: independent solve of MCQs 1-10 (B,C,B,C,B,C,B,B,A,C) matches ${U}/unit-assessment.mdx ### MCQ answer key.`,
    `${U}/unit-assessment.mdx RRQ 6 model answer requires "the agency still makes the final decision", untaught in ${U}/topic-02.mdx IAP2 table, whose Collaborate example implies a joint decision (finding F1).`,
    'ERQ rubrics analytic, totals 10/10/12/10/14, Analyze-or-higher criteria present; ERQ 5 is the blueprint Create item.',
  ] },
  { id: 'accessibility', status: 'unverified', evidence: [
    `${dir}/logs/render-review.log: production https://textbook.com.pk at deployed SHA 98fbbb0647d5e2c6040059edcaaccc1317b620a1 (unit inputs identical to HEAD); desktop 1280x900, narrow 360x780, A4 print 794px.`,
    'All images carry descriptive alt text; no skipped heading levels; no document overflow at 360px; wide tables scroll with tabindex=0 and aria-label; print clippedElems=0 on all five pages.',
    'fig-U4-2, fig-U4-4, fig-U4-5 reported as not loaded (lazy, below fold); served bytes byte-identical to HEAD; rendering unverified.',
    `${dir}/logs/measure-figure-text.log: all 20 SVGs exit 0.`,
  ] },
  { id: 'readability', status: 'pass', evidence: [
    `${U}/topic-01.mdx and topic-02.mdx: short sentences, terms defined at first use with Glossary, Sindh and Pakistani examples (Sukkur, Thatta, Orangi).`,
  ] },
  { id: 'pedagogy', status: 'pass', evidence: [
    'Both topics run situation, explanation, worked examples, misconception correction, group activity, retrieval, summary, self-assessment, practicum task, summative task with mini-rubric.',
    'All three content-spec misconceptions addressed in topic-02.mdx; activities use chart paper and slips, feasible in Sindh classrooms.',
  ] },
];
const findings = [
  { severity: 'blocking', resolved: false, message: `F1: ${U}/topic-02.mdx, Approaches to effective community engagement, IAP2 table: the Collaborate example "A committee of residents and council staff agrees on the site" presents a joint decision, and the topic never states that the agency remains the decision-maker at Involve and Collaborate, although the bound EPA page says "as at involve, the agency is still the ultimate decision-maker" and sources/texts/epa-2026-participation.md claims the topic uses this point. ${U}/unit-assessment.mdx RRQ 6 model similarity ("the agency still makes the final decision") therefore marks learners on untaught, contradicted content. Repair: reword the Collaborate example to a shared recommendation the council adopts and add one sentence that the agency still decides at Involve and Collaborate, or change the RRQ 6 model answer.` },
  { severity: 'uncertain', resolved: false, message: 'F2: render-inspect reported fig-U4-2, fig-U4-4 and fig-U4-5 as not loaded on the production pages (lazy images below the fold). Served files are HTTP 200 and byte-identical to HEAD, so this is unverified rendering, not a content defect; a rerun that scrolls the figures into view would settle it.' },
  { severity: 'advisory', resolved: false, message: 'F3: unit-assessment.mdx ERQ 4 rubric states "the committee only informs"; the scenario includes one meeting, so a learner classifying it as a token consult should also earn the marks.' },
  { severity: 'advisory', resolved: false, message: 'F4: MCQ key positions A1/B5/C4/D0 (no item keyed D); MCQ 5 tagged Remember but requires applying the characteristics to a new case (Understand/Apply).' },
  { severity: 'advisory', resolved: false, message: 'F5: topic-01.mdx places fig-U4-2 (table image) directly above a markdown table with the same six rows; the duplication adds length without new meaning.' },
  { severity: 'advisory', resolved: false, message: 'F6: Further-reading entries use bare URLs as link text (render-inspect advisory); the youniss-levine-2009 Unverifiable declaration records no owner-authorisation line, acceptable here only because use is title-level.' },
];
const report = {
  schema_version: 1, course_code: 'GCCE-400', unit_no: 4, stage: 'G3', disposition: 'revise',
  reviewer_id: 'agent:claude',
  author_run_id: 'commit:7953d1221154467cc18254d5fdb6ab5038aae0cd',
  reviewer_run_id: 'crew-gcce-400-u04-review_en-run1-20261124',
  model: 'claude-opus-5-5',
  started_at: '2026-11-23T21:02:00Z', completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest, input_manifest: manifest.input_manifest,
  criteria, findings, commands, evidence_manifest,
};
writeFileSync(`${dir}/../crew-run1-20261124.json`, JSON.stringify(report, null, 2) + '\n');
console.log('wrote report:', Object.keys(evidence_manifest).length, 'evidence files');
