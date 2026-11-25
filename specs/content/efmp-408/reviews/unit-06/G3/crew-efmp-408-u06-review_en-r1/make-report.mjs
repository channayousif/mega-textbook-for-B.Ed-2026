import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { rulingDigest } from '../../../../../../../scripts/lib/review-evidence.mjs';

const root = process.cwd();
const dir = 'specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r1';
const manifest = JSON.parse(readFileSync(`${dir}/manifest.json`, 'utf8'));
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

const evidenceFiles = [
  `${dir}/manifest.json`,
  `${dir}/summary.md`,
  `${dir}/limitations.md`,
  `${dir}/assessment-solutions.md`,
  `${dir}/advisory-tracker-row.md`,
  `${dir}/make-report.mjs`,
  `${dir}/logs/input-verification.txt`,
  `${dir}/logs/validate-content.txt`,
  `${dir}/logs/check-depth-gate.txt`,
  `${dir}/logs/check-figures.txt`,
  `${dir}/logs/check-no-em-dash.txt`,
  `${dir}/logs/check-no-answer-keys.txt`,
  `${dir}/logs/check-docs-sync.txt`,
  `${dir}/logs/measure-figure-text.txt`,
  `${dir}/logs/render-review.txt`,
  `${dir}/logs/render-followup.txt`,
  `${dir}/logs/check-content.txt`,
  `${dir}/logs/build-content-status.txt`,
  `${dir}/render/render-inspect.json`,
  `${dir}/render/render-inspect.log`,
];
for (const f of readdirSync(`${dir}/render`).sort()) {
  if (/\.(png|webp|jpg)$/.test(f)) evidenceFiles.push(`${dir}/render/${f}`);
}
const evidence_manifest = Object.fromEntries(evidenceFiles.map((p) => [p, sha(p)]));

const commands = [
  { name: 'validate:content', exit_code: 0, log_path: `${dir}/logs/validate-content.txt` },
  { name: 'check:depth-gate', exit_code: 0, log_path: `${dir}/logs/check-depth-gate.txt` },
  { name: 'check:figures', exit_code: 0, log_path: `${dir}/logs/check-figures.txt` },
  { name: 'check:no-em-dash', exit_code: 0, log_path: `${dir}/logs/check-no-em-dash.txt` },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: `${dir}/logs/check-no-answer-keys.txt` },
  { name: 'check:docs-sync', exit_code: 0, log_path: `${dir}/logs/check-docs-sync.txt` },
  { name: 'render-review', exit_code: 1, log_path: `${dir}/logs/render-review.txt` },
  { name: 'measure-figure-text', exit_code: 0, log_path: `${dir}/logs/measure-figure-text.txt` },
  { name: 'check:content', exit_code: 0, log_path: `${dir}/logs/check-content.txt` },
];

const criteria = [
  { id: 'authority', status: 'pass', evidence: [
    'Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:266-277 allots Week 13 (Standardized Testing: characteristics, advantages and limitations, national/international examples), Week 14 (Ethical Issues: bias and fairness, cheating and academic integrity, confidentiality) and Week 15 (Modern Trends: digital assessment tools, online testing platforms, continuous and competency-based assessment) to EFMP-408; specs/content/efmp-408/content-spec.md:345-360 carries the same twelve leaves as U6-01..U6-12 with frontmatter status: approved.',
    'specs/content/efmp-408/content-spec.md:358-360 derives U6-10..U6-12 from licence objective 5 under owner decision D-2026-0093 item 6; topic-04.mdx:27-29 carries the visible `Curriculum enrichment topic` banner required by content-spec.md:373-375.',
    'specs/content/efmp-408/coverage/unit-06.md:5-33 maps every sub-topic to a real `###` heading that exists and teaches it: topic-01.mdx:39,59,79; topic-02.mdx:39,54,76; topic-03.mdx:39,52,68; topic-04.mdx:45,60,93.',
  ] },
  { id: 'sources', status: 'fail', evidence: [
    'hec-2013-testdev VERIFIED against the bound full guide text Scheme-and-Course-guides/extracted-text/course-guides-2025/TestDevEval_Sept13.txt:255-258 (teacher-made and standardized tests), :317-319 (MCQ stem, key, distractors), :354 and :388 (computer-assisted testing and parallel forms), :2786-2795 (BISE reliance on a single approved textbook and mechanically derived grade boundaries), :655-675 (TIMSS, PISA, NEAS, ASER and FBISE named as international and national assessment agencies).',
    'hec-2013-classroom-assessment VERIFIED against Scheme-and-Course-guides/extracted-text/course-guides-2025/ClassroomAssess_Sept13.txt:405-411 (assessment is not a neutral enterprise; fairness and bias), :245-296 and :5051-5140 (the test-based versus assessment-based culture contrasts), :1389-1409 (assessment policy and practice in government and private schools), :4059-4160 (NPSTP Standard 5 by level).',
    'npstp-2009 VERIFIED at specs/content/efmp-408/sources/texts/npstp-2009.md notes 1-4 (Standard 5 knowledge, dispositions, performance, and the ethical/legal/privacy constraints on assessment data); supports topic-04.mdx:64-91 and the general confidentiality claim at topic-02.mdx:78.',
    'seifert-sutton-2009 VERIFIED at specs/content/efmp-408/sources/texts/seifert-sutton-2009.md notes 1-4 (standardized conditions, norm-referenced and criterion-referenced interpretation); supports topic-01.mdx:41,54-57.',
    'scheerens-2003 is declared unverifiable under D-2026-0001 at specs/content/efmp-408/sources/unit-06.md:13-15 and is used only for systemic evaluation, assessment monitoring and institutional cultures, which the declaration names (topic-01.mdx:61; topic-04.mdx:95).',
    'FAIL: undeclared missing sources for specific external-body facts (finding S-1), an unverifiable TIMSS 2019 claim (S-2), HEC citations for content absent from the bound guide (S-3) and its repetition in a figure (S-4).',
  ] },
  { id: 'coverage', status: 'pass', evidence: [
    'specs/content/efmp-408/coverage/unit-06.md:5-33 maps U6-01..U6-12; the content-spec Topic list (content-spec.md:364-369) partitions the same IDs across the four topic files with none assigned twice and none unmapped.',
    'Reading minutes: index 3 + topic-01 18 + topic-02 17 + topic-03 17 + topic-04 18 + assessment 22 + notes 4 = 99, inside the approved 85-115 band (check:depth-gate exit 0).',
    'Assessment spread: 6.1 MCQ 1-3 / RRQ 1-2 / ERQ 1; 6.2 MCQ 4-5 / RRQ 3-6 / ERQ 2; 6.3 MCQ 6-7 / RRQ 7-8 / ERQ 3; 6.4 MCQ 8-10 / RRQ 9-10 / ERQ 4-5 (specs/content/efmp-408/concepts/unit-06.md:7-17).',
  ] },
  { id: 'assessment', status: 'fail', evidence: [
    'All 10 MCQs solved independently before the supplied key was read; the derived key matches the supplied key on every letter (assessment-solutions.md).',
    'FAIL A-1: unit-assessment.mdx:126-135 gives a key distribution of A0 / B9 / C1 / D0, so an all-B strategy scores 9/10, and the keyed option is also the longest option in 9 of the 10 items (option lengths in assessment-solutions.md). Both are giveaways under the item-writing rules in .claude/skills/author-unit/references/item-writing.md.',
    'A-2: unit-assessment.mdx:106 (RRQ 6) and :109 (RRQ 9) are tagged *(Remember)*, below the RRQ band Understand to Analyze (specs/content/style-guide.md:248); the tags describe the real demand, so the items sit under the floor.',
    'RRQ model answers and mark schemes and both ERQ rubrics were read and checked: point-by-point marks, performance descriptors that require higher-order work, and no conflicting keys. check:no-answer-keys exit 0.',
  ] },
  { id: 'accessibility', status: 'pass', evidence: [
    'render-review on the production build at https://textbook.com.pk (deployed SHA 7fb77de68f5d59bbc507e85c07a892a3cbf93eca equals HEAD; git diff over the unit English directory and figure folder exits 0): desktop 1280x900 shows no heading-level skip, no missing alt and no document overflow on all 7 pages; narrow 360x780 shows document overflow 0 and every wide table scrolling as its own container with tabindex=0 and aria-label; A4 print 794 shows clippedElems=0 on all 7 pages (logs/render-review.txt, render/render-inspect.json).',
    'render-inspect exited 1 with four defects. The two "visible image did not load" flags for fig-U6-4.svg and fig-U6-6.svg were retested in logs/render-followup.txt: after scrollIntoView both report natural=244x150 in an 860x530 box, and all nine distinct assets are served HTTP 200 and byte-identical to the repository, so those two are the tool lazy-load timing false positive.',
    'measure-figure-text exit 0 on all 16 bound SVGs (logs/measure-figure-text.txt); render-inspect section D reports 14 of 16 clean.',
    'A-3 advisory: fig-U6-5 title text ends at 779.1px in a 780px viewBox (render-inspect section D), a 0.9px margin. It is inside the viewBox and measure-figure-text passes it, so it is tight rather than clipped.',
  ] },
  { id: 'readability', status: 'pass', evidence: [
    'All seven English files read in full. The register holds for a fresh HSC/intermediate graduate: short single-idea paragraphs, a Mirpurkhas/Larkana/Hyderabad/Sukkur classroom vignette before each abstraction, and technical terms defined at first use (standardized test at topic-01.mdx:41, norming at :49, construct-irrelevant barrier at topic-02.mdx:43, CAT at topic-03.mdx:59, competency-based assessment at :83, NPSTP Standard 5 dimensions at topic-04.mdx:68-91).',
    'check:no-em-dash exit 0 (logs/check-no-em-dash.txt); validate:content exit 0 (logs/validate-content.txt).',
    'Worked comparisons are shown in figures rather than asserted: teacher-made versus standardized (fig-U6-1), integrity breaches and proportionate responses (fig-U6-5), terminal versus continuous competency (fig-U6-6) and the two evaluation cultures (fig-U6-7).',
  ] },
  { id: 'pedagogy', status: 'pass', evidence: [
    'The nine-part learning cycle is intact and ordered in all four topic files (check:depth-gate exit 0); each carries a classroom situation, a named activity with grouping, time and materials, retrieval checks, a self-assessment checklist, a practicum task, a summative task with a rubric and a further-reading list.',
    'The three approved misconceptions (content-spec.md:338-339) are all named and corrected: "standardized means the same paper for everyone" (topic-01.mdx:51-52), "digital assessment is automatically more objective" (topic-03.mdx:49-50), "continuous assessment means more tests" (topic-03.mdx:75-76); topic-02.mdx:51-52 adds the equality-versus-equity misconception and unit-teacher-notes.mdx:40-47 gives handling strategies.',
    'Activities are feasible in the stated Pakistani/Sindhi context (pairs or groups of three to four, 25-30 minutes, chart paper, board and printed cases only), and the practicum tasks are realistic for a trainee with no authority. Progression runs classroom situation to explanation, activity, retrieval, reflection and assessment.',
  ] },
];

const findings = [
  { severity: 'blocking', resolved: false, message: 'MCQ answer-key design (docs/semester-4/efmp-408/unit-06/unit-assessment.mdx:126-135). The key is A0 / B9 / C1 / D0, so a candidate who always selects B scores 9 of 10, and no item keys to A or D. The keyed option is also the longest option in 9 of the 10 items (item 4 ties with D), a second independent giveaway. REPAIR: redistribute the keys across A-D and rebalance option length and grammatical parallelism so the correct option is not systematically the longest.' },
  { severity: 'blocking', resolved: false, message: 'Undeclared missing sources (specs/content/style-guide.md:293 requires a `no-external-source` row and a specs/gaps.md escalation when a sub-topic is covered from general knowledge). Specific external facts are stated with no bound source and no declaration: NTS established in 2002 and its NAT/GAT instruments (topic-01.mdx:89), NEAS conducting Grade 4 and Grade 8 sample assessments under the federal Ministry (topic-01.mdx:90), STEDA and the Sindh Teaching Licence as criterion-referenced (topic-01.mdx:57,91), the FPSC migrating to computer-based testing (topic-03.mdx:54), the Sindh Education Foundation and "PEAC in Punjab and PEAC in Sindh" (topic-04.mdx:53), Cambridge O/A Levels and the International Baccalaureate (topic-04.mdx:58), and the CAT mechanism (topic-03.mdx:59). REPAIR: record the row and escalate, or bind and cite a source for each.' },
  { severity: 'uncertain', resolved: false, message: 'Unverified specific claim: topic-01.mdx:96 states "Pakistan participated in TIMSS 2019 at Grade 4", and fig-U6-4 ("2019 - Present: TIMSS participation") repeats it. No bound source supports the claim (the bound TestDevEval guide names TIMSS as an international survey at :659 but says nothing about Pakistani participation) and it could not be confirmed in this session. REPAIR: verify against a primary IEA/TIMSS source and cite it, or remove the specific participation claim and keep the general description of TIMSS.' },
  { severity: 'advisory', resolved: false, message: 'RRQ band: unit-assessment.mdx:106 (RRQ 6, "State three specific professional obligations...") and :109 (RRQ 9, "summarizing its three core dimensions") are tagged *(Remember)*, below the RRQ band Understand to Analyze (specs/content/style-guide.md:248). The tags match the actual demand. REPAIR: raise at least one of the two items to Understand (or higher) or record an owner ruling for the band.' },
  { severity: 'advisory', resolved: false, message: 'Citation support in Topic 6.2: topic-02.mdx:56 cites HEC (2012) for cheating and examination malpractice, and :78 cites HEC (2012) with NPSTP (2009) for confidentiality. The bound ClassroomAssess_Sept13.txt contains no cheating, academic integrity, confidentiality or privacy content (verified by full-text search), so the HEC attribution is unsupported; npstp-2009.md note 2 supports only a general statement about ethical, legal and privacy constraints. REPAIR: bind a source that carries the material or declare it as general knowledge with a no-external-source row.' },
  { severity: 'advisory', resolved: false, message: 'Figure geometry: static/img/figures/efmp-408/unit-06/fig-U6-5.svg:19 renders the title "Proportionate pedagogical and administrative responses to assessment dishonesty" ending at 779.1px in a 780px viewBox (render-inspect section D), leaving a 0.9px margin. measure-figure-text passes it (widest 778.7) and the text is inside the viewBox, so nothing is clipped, but the title is flush to the edge. REPAIR: shorten the title or reduce the title font size.' },
];

const report = {
  schema_version: 1,
  course_code: 'EFMP-408',
  unit_no: 6,
  stage: 'G3',
  disposition: 'revise',
  reviewer_id: 'agent:claude-crew',
  author_run_id: 'agy:crew-efmp-408-u06-author',
  reviewer_run_id: 'crew-efmp-408-u06-review_en-r1',
  model: 'Claude Code (model identity LongCat-2.5; exact deployment version unavailable)',
  started_at: '2026-11-25T18:35:00Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  rulings: {
    'D-2026-0001': rulingDigest(root, 'D-2026-0001'),
    'D-2026-0093': rulingDigest(root, 'D-2026-0093'),
  },
  criteria,
  findings,
  commands,
  evidence_manifest,
  reviewed_commit: '7fb77de68f5d59bbc507e85c07a892a3cbf93eca',
  limitations: [
    'Manifest prepared locally over a clean tree with scripts/review-evidence.mjs prepare EFMP-408 6 G3 and re-verified against a fresh inputManifest() computation (105 inputs, 0 mismatches). No dispatcher-supplied frozen handoff or runtime identities were provided; the author identity is taken from history/prompts/efmp-408/crew-efmp-408-u06-author.green.prompt.md.',
    'The deployed SHA equals HEAD and the unit English directory and figure folder are identical between them, so the production build is the reviewed input; all nine distinct image assets were fetched from the production host and are byte-identical to the repository.',
    'render-inspect exited 1. Two of its four defects are the documented lazy-load timing false positive and were cleared by a targeted scroll follow-up; the other two are the fig-U6-5 title geometry advisory.',
    'Urdu mirror and .ur.svg variants are G5 scope and were not evaluated; they are not in the G3 manifest.',
    'No new external retrieval of NTS, NEAS, TIMSS, PISA, STEDA, FPSC or the HEC PDFs was attempted, so external-body facts are recorded as unverified rather than confirmed or refuted.',
    'Advisory only: this report does not certify the unit, sign anything, append a tracker row, change translation_status, alter the registry or publish.',
  ],
};

writeFileSync(`${dir}/../crew-efmp-408-u06-review_en-r1.json`, JSON.stringify(report, null, 2) + '\n');
console.log(`wrote report with ${Object.keys(evidence_manifest).length} evidence files and ${Object.keys(manifest.input_manifest).length} inputs`);
