#!/usr/bin/env node
// Build the advisory G3 report for GCCE-400 Unit 5 run 1 and hash the exact saved evidence.
// Run from the repository root:
//   node specs/content/gcce-400/reviews/unit-05/G3/crew-run1-20261124/make-report.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, relative } from 'node:path';

const root = process.cwd();
const dir = 'specs/content/gcce-400/reviews/unit-05/G3/crew-run1-20261124';
const manifest = JSON.parse(readFileSync(resolve(root, `${dir}/manifest.json`), 'utf8'));

const sha = (p) => createHash('sha256').update(readFileSync(resolve(root, p))).digest('hex');

const evidenceFiles = [
  `${dir}/manifest.json`,
  `${dir}/summary.md`,
  `${dir}/limitations.md`,
  `${dir}/advisory-tracker-row.md`,
  `${dir}/assessment-independent.md`,
  `${dir}/make-report.mjs`,
  `${dir}/logs/input-verification.txt`,
  `${dir}/logs/validate:content.log`,
  `${dir}/logs/check:depth-gate.log`,
  `${dir}/logs/check:figures.log`,
  `${dir}/logs/check:no-em-dash.log`,
  `${dir}/logs/check:no-answer-keys.log`,
  `${dir}/logs/check:docs-sync.log`,
  `${dir}/logs/measure-figure-text.log`,
  `${dir}/logs/render-review.txt`,
  `${dir}/logs/static-accessibility.txt`,
  `${dir}/logs/check:content.log`,
  `${dir}/source-checks/batool-2019-lawyers-movement.md`,
  `${dir}/source-checks/batool-2019-article.txt`,
  `${dir}/source-checks/batool-2019-article.pdf`,
  `${dir}/source-checks/constitution-articles.md`,
  `${dir}/source-checks/openstax-21-2.md`,
  `${dir}/source-checks/digital-divide-claim.md`,
  `${dir}/source-checks/youniss-levine-2009.md`,
];
for (const f of evidenceFiles) {
  if (!existsSync(resolve(root, f))) throw new Error(`missing evidence file: ${f}`);
}
const evidenceManifest = Object.fromEntries(evidenceFiles.map((f) => [f, sha(f)]));

const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'specs/content/gcce-400/content-spec.md:281-326 Unit 5 G1 spec: sub-topics U5-01..U5-03, figure plan fig-U5-1..6, unit-end blueprint 10/10/5.',
      'Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:154-158 Week 10 leaves 10.1 Public Discourse and Public Opinion, 10.2 Role of Advocacy in Addressing Social issues, 10.3 Social Action Movements.',
      'docs/semester-4/gcce-400/unit-05/topic-01.mdx ### Public discourse and public opinion; topic-02.mdx ### Role of advocacy in addressing social issues; topic-03.mdx ### Social action movements; specs/content/gcce-400/coverage/unit-05.md maps U5-01..U5-03 to those headings.',
    ],
  },
  {
    id: 'sources',
    status: 'fail',
    evidence: [
      'specs/content/gcce-400/reviews/unit-05/G3/crew-run1-20261124/source-checks/batool-2019-lawyers-movement.md: the Batool, Mahmood & Ullah (2019) article at doi 10.47264/idea.lassij/3.1.8 (full PDF read 2026-11-24) contains no Lawyers\' Movement material, but topic-03.mdx:71,75-79,81, fig-U5-6 and unit-assessment.mdx:113,201,234 attribute the case study and its three pillars to it; sources/texts/batool-2019-civil-society.md:12 misrepresents the article (F1).',
      'specs/content/gcce-400/reviews/unit-05/G3/crew-run1-20261124/source-checks/digital-divide-claim.md: topic-01.mdx:65 asserts "As studies of Pakistan\'s digital landscape demonstrate ..." with no cited source; sources/unit-05.md lists no digital-divide key and coverage/unit-05.md maps U5-01 only to youniss-levine-2009 and constitution-pakistan (F2).',
      'specs/content/gcce-400/reviews/unit-05/G3/crew-run1-20261124/source-checks/youniss-levine-2009.md: sources/unit-05.md declares a title-level use for U5-01 and U5-02, but topic-01.mdx:52 attributes a specific socialisation finding and topic-02.mdx never cites it in prose; no D-2026-0001 line (F3).',
      'specs/content/gcce-400/reviews/unit-05/G3/crew-run1-20261124/source-checks/constitution-articles.md: Articles 16, 17, 19, 25 and 25A read in the current pakistani.org transcription and match the unit.',
      'specs/content/gcce-400/reviews/unit-05/G3/crew-run1-20261124/source-checks/openstax-21-2.md: OpenStax section 21.2 definition and four stages confirmed against the live chapter.',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/gcce-400/coverage/unit-05.md maps U5-01..U5-03 to exact Explanation headings with bound sources and traces MCQs 1-10, RRQs 1-10 and ERQs 1-5.',
      'check:depth-gate exit 0 (logs/check:depth-gate.log).',
    ],
  },
  {
    id: 'assessment',
    status: 'fail',
    evidence: [
      'specs/content/gcce-400/reviews/unit-05/G3/crew-run1-20261124/assessment-independent.md: all 10 MCQ keys reproduced independently (B,C,B,B,B,A,B,C,B,C) and every RRQ/ERQ solved before the supplied answers were read.',
      'docs/semester-4/gcce-400/unit-05/unit-assessment.mdx:174-178 RRQ 6 mark scheme credits only the six steps and awards nothing for the explanation the item demands (F4).',
      'docs/semester-4/gcce-400/unit-05/unit-assessment.mdx:131-140 MCQ key distribution A1/B6/C3/D0; no item keyed D and B is the key for 6 of 10 items (F6).',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'specs/content/gcce-400/reviews/unit-05/G3/crew-run1-20261124/logs/render-review.txt: render-review unavailable; deployed SHA ac3d5e2fcd1818492dd11bc9b72d8cfed9a25e8d differs from HEAD 175a90b7a644bd366cf3d1d2592090a93f912bcb for docs/semester-4/gcce-400/unit-05/index.mdx and static/img/figures/gcce-400/unit-05/fig-U5-7.webp.',
      'Source inspection only (logs/static-accessibility.txt): every Figure marker carries descriptive alt text; headings run h1-h4 with no skipped level; topic-02 and the assessment use markdown tables; further-reading links are bare URLs (F9). No rendered page, narrow view or A4 print view was inspected.',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      'docs/semester-4/gcce-400/unit-05/topic-01.mdx, topic-02.mdx, topic-03.mdx: terms defined at first use, short sentences, Sindh and Pakistani examples (Sukkur, Mirpurkhas, Khairpur, Hyderabad).',
      'topic-03.mdx:99 duplicated word "sanitation sanitation" (F5); fig-U5-5 panel "Bureaucracy" versus prose "Bureaucratisation" (F7); further-reading bare URLs (F9).',
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'All three topics run classroom situation, explanation, worked example, misconception correction, group activity, retrieval, summary, self-assessment, practicum task and summative task with a mini-rubric.',
      'All three content-spec misconceptions are addressed (topic-01 social media trends, topic-02 advocacy is protest, topic-03 overnight movements); activities use chart paper, slips and local school data.',
    ],
  },
];

const findings = [
  {
    severity: 'blocking',
    resolved: false,
    message: 'F1: docs/semester-4/gcce-400/unit-05/topic-03.mdx:71,75-79,81, the fig-U5-6 alt text (topic-03.mdx:67) and unit-assessment.mdx:113,201,234 attribute the Lawyers\' Movement (2007-2009) case study, its dated milestones and its "three fundamental pillars" to Batool, Mahmood & Ullah (2019). The open-access article at the cited DOI (full PDF read 2026-11-24, source-checks/batool-2019-lawyers-movement.md and batool-2019-article.txt) is about civil society in Pakistan and Turkey and contains no Lawyers\' Movement material; its conclusion says civil society "failed to produce desired results". The bound note sources/texts/batool-2019-civil-society.md:12 repeats the false claim. The approved content-spec maps batool-2019-civil-society to Unit 5 and requires fig-U5-6 dates and events to come from a bound source, so the repair needs an owner ruling or a new bound source, not a silent unit edit.',
  },
  {
    severity: 'blocking',
    resolved: false,
    message: 'F2: docs/semester-4/gcce-400/unit-05/topic-01.mdx:65 states "As studies of Pakistan\'s digital landscape demonstrate, millions of citizens, particularly women in rural districts, low-income daily-wage earners, and elderly residents, have limited or no access ..." but names no source; sources/unit-05.md lists no digital-divide key and coverage/unit-05.md maps U5-01 only to youniss-levine-2009 and constitution-pakistan. The course\'s digital-divide notes (shair-2022, iftikhar-2023) belong to Unit 6 and are outside this bundle. Repair: cite a bound source or remove the implied citation; adding a source requires a new input manifest.',
  },
  {
    severity: 'uncertain',
    resolved: false,
    message: 'F3: the youniss-levine-2009 declaration in sources/unit-05.md describes a title-level use for U5-01 and U5-02, but topic-01.mdx:52 attributes a specific finding ("demonstrate that civic attitudes are formed through multiple agents of socialization") and topic-02.mdx never cites the book in prose; the declaration does not name owner ruling D-2026-0001. The declaration is not complete for the use made of it.',
  },
  {
    severity: 'uncertain',
    resolved: false,
    message: 'F4: docs/semester-4/gcce-400/unit-05/unit-assessment.mdx:105 RRQ 6 asks the learner to "explaining why gathering evidence must precede taking coordinated action", but the mark scheme (unit-assessment.mdx:174-178) awards 3 marks for naming the six steps and nothing for the explanation. A learner who names all six steps without explaining earns full marks.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'F5: docs/semester-4/gcce-400/unit-05/topic-03.mdx:99 contains the duplicated word "sanitation sanitation" in the activity prompt.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'F6: MCQ key distribution is A1/B6/C3/D0 (unit-assessment.mdx:131-140); no item is keyed D and B is the key for 6 of 10 items. MCQ 2 (unit-assessment.mdx:39) is tagged Understand but is recall-level (Remember would be more accurate).',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'F7: the fig-U5-5 SVG panel is labelled "3. Bureaucracy / Formal stage" while the topic-03 heading, the figure alt text and the content-spec use "Bureaucratisation". Align the figure label or the prose.',
  },
  {
    severity: 'uncertain',
    resolved: false,
    message: 'F8: render-review is unavailable. The deployed SHA ac3d5e2fcd1818492dd11bc9b72d8cfed9a25e8d is not the review input because index.mdx and fig-U5-7.webp differ from HEAD 175a90b7a644bd366cf3d1d2592090a93f912bcb. No rendered page, narrow view or A4 print view was inspected, so the accessibility criterion is unverified. This is a missing-evidence limitation, not an observed content defect; changed images can be served stale for up to 30 days, so a missing or mismatched live asset would be unverified, not a defect.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'F9: the Further reading entries in topic-01.mdx, topic-02.mdx and topic-03.mdx use bare URLs as link text; give them descriptive link text.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'F10: the approved figure plan for fig-U5-2 (content-spec.md:316) names "family, school, media, religious and community leaders"; the unit\'s figure folds community leaders into "Family and local community" and omits religious leaders.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'F11: unit-teacher-notes.mdx calls Community Event Planning "a core practical activity"; the guide lists the practical activities as optional (4TH SEMESTER.txt:170-176).',
  },
];

const commands = [
  { name: 'validate:content', exit_code: 0, log_path: `${dir}/logs/validate:content.log` },
  { name: 'check:depth-gate', exit_code: 0, log_path: `${dir}/logs/check:depth-gate.log` },
  { name: 'check:figures', exit_code: 0, log_path: `${dir}/logs/check:figures.log` },
  { name: 'check:no-em-dash', exit_code: 0, log_path: `${dir}/logs/check:no-em-dash.log` },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: `${dir}/logs/check:no-answer-keys.log` },
  { name: 'check:docs-sync', exit_code: 0, log_path: `${dir}/logs/check:docs-sync.log` },
  { name: 'render-review', exit_code: 1, log_path: `${dir}/logs/render-review.txt` },
  { name: 'measure-figure-text', exit_code: 0, log_path: `${dir}/logs/measure-figure-text.log` },
  { name: 'check:content', exit_code: 0, log_path: `${dir}/logs/check:content.log` },
];

const started = process.env.REVIEW_STARTED || '2026-11-23T23:31:00Z';
const report = {
  schema_version: 1,
  course_code: 'GCCE-400',
  unit_no: 5,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:claude',
  author_run_id: 'commit:74703ca659fa9ce44df5a9f39125cbd3b5536fa2',
  reviewer_run_id: 'crew-gcce-400-u05-review_en-run1-20261124',
  model: 'LongCat-2.5',
  started_at: started,
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  criteria,
  findings,
  commands,
  evidence_manifest: evidenceManifest,
};

const out = `${dir}.json`;
writeFileSync(resolve(root, out), JSON.stringify(report, null, 2) + '\n');
console.log(`wrote ${out}`);
console.log(`evidence files hashed: ${Object.keys(evidenceManifest).length}`);
