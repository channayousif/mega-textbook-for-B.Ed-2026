// Generates the G3 report for GNAS-301 Unit 6, attempt agent-g3-gnas301-u6-run001.
// Pulls input_manifest / skill_digest / ruling digests from the trusted module so the
// bound digests are exact. Evidence hashes are computed over the saved bytes.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const mod = await import(new URL(`file://${root}/scripts/lib/review-evidence.mjs`).href);
const LOG = 'specs/content/gnas-301/reviews/unit-06/G3/logs-20260924T0review1';
const sha = (p) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex');

const evidence = {};
for (const f of readdirSync(join(root, LOG)).sort()) evidence[`${LOG}/${f}`] = sha(`${LOG}/${f}`);

const report = {
  schema_version: 1,
  course_code: 'GNAS-301',
  unit_no: 6,
  stage: 'G3',
  disposition: 'revise',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:e05ffff',
  reviewer_run_id: 'agent-g3-gnas301-u6-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-23T23:35:00Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: mod.skillDigest(root, 'G3'),
  input_manifest: mod.inputManifest(root, 'GNAS-301', 6, 'G3'),
  rulings: {
    'D-2026-0001': mod.rulingDigest(root, 'D-2026-0001'),
    'D-2026-0020': mod.rulingDigest(root, 'D-2026-0020'),
    'D-2026-0021': mod.rulingDigest(root, 'D-2026-0021'),
  },
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        'Course guide Unit 6 leaves (Scheme-and-Course-guides/extracted-text/1st 2026.txt:295-317, sections 13.1-13.5, 14.1-14.4, 15.1-15.2, 16.1) all present in the approved content-spec ## Unit 6 Sub-topic checklist (specs/content/gnas-301/content-spec.md:887-900, U6-01..U6-12)',
        'specs/content/gnas-301/coverage/unit-06.md maps every U6-NN to the exact topic file and ### heading; each named section verified present and on-subject in docs/semester-1/gnas-301/unit-06/topic-01..06.mdx',
        'SLO refs (SLO:GNAS-301-6-1, -6-2) consistent across index, topics, assessment and concepts/unit-06.md; spec approved under D-2026-0021 with partition G-2026-22',
        'Reading minutes 110 (5+15+15+16+13+13+15+12+6) inside the 90-115 depth budget',
      ],
    },
    {
      id: 'sources',
      status: 'fail',
      evidence: [
        'Bound excerpts verified against prose claims: alibhatti2017.md (24 Indus-bank districts, arsenic in Sindh groundwater -> topic-01 U6-03), anwar2026.md (winter smog critical for environment and public health in Lahore district -> topic-05 U6-11), guardans2013.md (POPs build up in organisms -> topic-03 U6-09), who-air-2024.md (4.2 million premature deaths -> topic-05), who-climate-2023.md (3.6 billion susceptible; ~250,000 additional deaths/yr 2030-2050 -> topic-06), adnan2024.md (floods implications, measures and policies evaluated -> topic-06)',
        'Course-tree excerpts read although NOT bound in this manifest (see advisory finding on the year-less citedKeys gap): sources/texts/nasa-climate-evidence.md verifies all four topic-04 figures (about 1C since late 19th century; CO2 about 250x faster; 279+148 Gt/yr ice loss; ~20 cm sea rise); sources/texts/who-chemical-safety.md verifies the spans-natural-and-manufactured framing and the major-concerns list; sources/texts/un-paris.md bibliographic only',
        'FAIL: topic-06.mdx:82-83 attributes to (WHO, 2023) the framing "one of the largest health interventions available"; neither the bound who-climate-2023 excerpt nor the live fact sheet (fetched and read 2026-09-24) contains it; closest actual text is "very large gains for health"',
        'FAIL: incomplete author lists - adnan2024 cites 4 of 6 authors (Crossref lists Adnan, Xiao, Bibi, Xiao, Zhao, Wang), anwar2026 cites 4 of 10 (Crossref lists 10, article 43), alibhatti2017 cites 4 of 5 (DOAJ lists Khuhawar as fifth, pages 1037-1049); the sources/unit-06.md "authors matched" verification claims are inaccurate for all three',
        'Unverifiable-sources declaration judged honest and sufficient: haines-frumkin flagged per D-2026-0001 with owner confirmation, cited by reference only; 2015 Karachi heatwave and 2022 floods declared as public-record events with the analytical reading declared as the unit\'s own framework, floods implications additionally carried by adnan2024',
        'topic-06 "did least to cause" clause verified via the DOAJ full abstract of adnan2024 ("despite contributing less than 1 % to global greenhouse gas emissions"); the bound excerpt truncates before that sentence',
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'All 12 sub-topics taught: U6-01..03 in topic-01.mdx, U6-04..05 in topic-02.mdx, U6-06..09 in topic-03.mdx, U6-10 in topic-04.mdx, U6-11 in topic-05.mdx, U6-12 in topic-06.mdx; each with explanation, worked example and formative items',
        'Every topic also carries a summative task with mini-rubric; bank items trace to all six topics (see assessment criterion for distribution defects)',
        'concepts/unit-06.md covers all 12 sub-topic IDs with derived item IDs matching the actual bank',
      ],
    },
    {
      id: 'assessment',
      status: 'fail',
      evidence: [
        'All 25 items solved independently before reading the answers section; derived MCQ key 1-b, 2-b, 3-c, 4-b, 5-b, 6-b, 7-b, 8-b, 9-c, 10-b matches the supplied key exactly; RRQ model answers match derived answers (RRQ-05 mark scheme accepts any defensible route ranking)',
        'FAIL: ERQ-04 (unit-assessment.mdx:129-130) and its rubric (:195-198) cover only Topic 6.4; the approved blueprint (content-spec.md:990-995) requires the fourth ERQ to integrate 6.4 and 6.5 as one air story, so Topic 6.5 has no ERQ coverage and the five ERQs do not cover all six topics',
        'FAIL: RRQ surplus distribution - RRQ-08 and RRQ-09 both assess 6.5 (extras went to 6.1, 6.2, 6.3, 6.5) while the blueprint assigns the four surplus RRQs to the denser topics 6.1, 6.2, 6.3, 6.6; 6.6 receives only its single minimum RRQ (and single MCQ); the file\'s own blooms_summary asserts "the extras to the denser topics"',
        'Per-topic minimums met (>=1 MCQ and >=1 RRQ per topic); 10/10/5 counts exact; >=1 ERQ at Analyze-or-higher satisfied (ERQ-01, ERQ-05)',
        'MCQ distractors plausible, no ambiguous stems; advisory: 8 of 10 correct answers are option b; advisory: ERQ-02 labelled Evaluate but its rubric criteria top out at Apply',
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        'render-review (Playwright 1.x, bundled Chromium, fresh docusaurus build served at localhost:3457): all 9 pages at 1280x800 with 0 console errors; figures load (light variants), both light/dark img variants carry the same descriptive alt, loading=lazy',
        'Narrow 360x640: pageOverflow 0 on all 9 pages; no clipped figures; mini-rubric tables fit (scrollWidth 328 == clientWidth, not scrollable, so no keyboard-reach requirement); rubric swipe methodology applied to the table elements themselves',
        'A4 print emulation (794x1123, media print): navbar/sidebar/toc hidden, light figure variants visible on all 6 topic pages, answers section present in unit-assessment, no table overflow, doc width 794/794',
        'measure-figure-text on all 48 unit-06 SVG variants: no text overflow past the 780 viewBox, no wordmark overprint; every SVG carries <title>, <desc> and role="img"',
        'Further-reading links are descriptive markdown links throughout',
        'Limitation recorded in render-review.log: this session\'s file tool could not present PNG pixels to the reviewer, so pixel-level viewing was unavailable; inspection rests on real-browser DOM/CSS measurement at three viewports plus SVG source verification',
      ],
    },
    {
      id: 'readability',
      status: 'pass',
      evidence: [
        'Register holds for a fresh HSC/intermediate graduate: technical terms defined at first use, 15 inline bilingual glossary tooltips, concrete classroom hooks before each explanation',
        'Advisory: 5 of the spec\'s 15 key terms (Toxic substance, Dose-response, Greenhouse effect, Global warming, Climate change) lack glossary.json entries and inline tags although they include the unit\'s title concepts',
        'A few sentences sit at the literary upper edge of the band (e.g. topic-02 "behind them wait the special classes"); vocabulary itself stays plain',
      ],
    },
    {
      id: 'pedagogy',
      status: 'pass',
      evidence: [
        'All six topics carry the nine-part cycle (gate-checked) with Pakistan-grounded hooks (Tharparkar health day, district hospital ward, Keenjhar Lake trip, Lahore assembly, Hyderabad college corridor)',
        'All five spec misconceptions present and corrected (natural-means-safe, small-dose-harmless, greenhouse-is-the-problem, smog-is-fog, mitigation-vs-adaptation)',
        'Activities feasible in stated context with teacher-notes fallbacks (pane model as single demonstration if kit short); retrieval-style check items; practicum tasks concrete and school-real; 6.6 integrates the course tools as the blueprint intends',
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: false,
      message: 'Assessment blueprint deviation (ERQ): unit-assessment.mdx ERQ-04 (lines 129-130) and its rubric (lines 195-198) cover only Topic 6.4 (greenhouse). The approved blueprint (specs/content/gnas-301/content-spec.md:990-995) requires the fourth ERQ to integrate 6.4 and 6.5 (warming and smog as one air story), so Topic 6.5 has no ERQ coverage and the five ERQs do not cover all six topics. Repair: rewrite ERQ-04 to integrate the winter-grey/smog story with the warming story and extend its rubric accordingly.',
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'Assessment blueprint deviation (RRQ surplus): RRQ-08 and RRQ-09 both assess Topic 6.5, so the four surplus RRQs went to 6.1, 6.2, 6.3 and 6.5, while the blueprint assigns surpluses to the denser topics 6.1, 6.2, 6.3, 6.6; Topic 6.6 (the capstone) receives only its single minimum RRQ and single MCQ. The unit-assessment.mdx blooms_summary itself asserts "the extras to the denser topics", which the bank does not honour. Repair: re-key one 6.5 RRQ to 6.6 content (keeping the inversion item in topic-05 formative work) and update concepts/unit-06.md item mappings.',
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'Misattributed WHO framing: topic-06.mdx (Common misconception paragraph, lines 79-83) states "the WHO frames cutting emissions as one of the largest health interventions available (WHO, 2023)". Neither the bound who-climate-2023 excerpt nor the live WHO fact sheet (fetched and read 2026-09-24) contains that framing; the closest actual statement is that cutting emissions "can result in very large gains for health". Repair: reword to the source\'s actual framing.',
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'Citation accuracy: three journal citations carry incomplete author lists. adnan2024 cites 4 of 6 authors (Crossref: Adnan, Xiao, Bibi, Xiao, Zhao, Wang); anwar2026 cites 4 of 10 (Crossref lists ten authors, article number 43); alibhatti2017 cites 4 of 5 (DOAJ lists Khuhawar, M. Y. as fifth author, pages 1037-1049). Occurrences: specs/content/gnas-301/sources/unit-06.md table rows, Further reading in topic-01/02/03/05/06.mdx, and the excerpt headers in sources/texts/{adnan2024,anwar2026,alibhatti2017}.md. The sources file\'s "authors ... matched" Crossref/DOAJ verification claims are inaccurate for all three. Repair: complete the author lists (or adopt a consistent first-author-et-al style with owner approval) and correct the verification claims.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'topic-06.mdx worked example asserts the Karachi heat-action plan measures "cut the 2015 toll in the calmer years since"; this efficacy claim goes beyond both the declared public-record events (sources/unit-06.md Unverifiable sources covers the events and the framework, not policy-response efficacy) and the bound adnan2024 excerpt. Repair: soften to the measures heat plans carry, or bind a source for the efficacy claim.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Five of the spec\'s 15 key terms (Toxic substance, Dose-response, Greenhouse effect, Global warming, Climate change) lack bilingual glossary entries and inline tags; the authoring commit e05ffff added five other terms (Toxicology, Genotoxic agent, Mutagen, Sensitizer, Essentiality) instead. The unit\'s title concepts are among the missing. Repair: add glossary.json entries and tag first use, before G4 translation.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'MCQ answer-position skew: 8 of 10 correct answers are option b (the other two are c). Consider redistributing correct positions in a future repair round.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'ERQ Bloom labels overstate rubric demand: ERQ-02 is labelled Evaluate but its rubric criteria top out at Apply; ERQ-05\'s Create is carried by a 0-1 closing-sentence criterion. Classifying from the thinking required, the bank still satisfies the blueprint\'s >=1 Analyze-or-higher requirement.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Bundle gap: the prepared manifest did not bind sources/texts/{who-chemical-safety,nasa-climate-evidence,un-paris}.md although the unit cites all three keys; the citedKeys extraction in scripts/lib/review-evidence.mjs:300-311 only matches year-suffixed keys, so year-less keys never bind their excerpts (the under-binding blind-spot direction ADR-0027 warns about). The reviewer read the three excerpts from the course tree and verified the claims; a future bundle should bind them.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Mid-review input drift, documented not refreshed: docs/semester-1/gnas-301/course-overview.mdx changed after the manifest was prepared (sibling commit a495278, coming-soon placeholder rewritten to a full overview; later sibling commits 1aebf6a..ba4c10e added Unit 1 Urdu mirrors, which touch no bound input). All 114 other inputs are byte-identical to the prepared bundle; the reviewer read the course-overview diff and the full new file and assessed the impact on Unit 6 findings as none. This report binds the current input set so validation recomputes cleanly.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Figure manifest prompt text for fig-U6-3 says "six rows" then lists seven effect classes; the rendered figure correctly carries all seven (acute, chronic, genotoxic, mutagenic, teratogenic, carcinogenic, sensitizing). Cosmetic governance-table fix only.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'The bound adnan2024 excerpt truncates the abstract before the sentence "despite contributing less than 1 % to global greenhouse gas emissions", which is what supports topic-06\'s "a crisis it did least to cause" clause; the reviewer verified it against the DOAJ full abstract. Consider extending the excerpt so the claim is bound.',
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: `${LOG}/validate-content.log` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${LOG}/check-depth-gate.log` },
    { name: 'check:figures', exit_code: 0, log_path: `${LOG}/check-figures.log` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${LOG}/check-no-em-dash.log` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${LOG}/check-no-answer-keys.log` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${LOG}/check-docs-sync.log` },
    { name: 'check:content', exit_code: 0, log_path: `${LOG}/check-content.log` },
    { name: 'measure-figure-text', exit_code: 0, log_path: `${LOG}/measure-figure-text.log` },
    { name: 'site-build', exit_code: 0, log_path: `${LOG}/build.log` },
    { name: 'render-review', exit_code: 0, log_path: `${LOG}/render-review.log` },
  ],
  evidence_manifest: evidence,
};

const out = 'specs/content/gnas-301/reviews/unit-06/G3/agent-g3-gnas301-u6-run001.json';
writeFileSync(join(root, out), JSON.stringify(report, null, 2) + '\n');
console.log('wrote', out);
console.log('evidence files:', Object.keys(evidence).length);
