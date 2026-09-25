// Report generator - EFMP-301 Unit 4 G3 run001. Computes evidence hashes and
// writes the contract report JSON.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const digest = (b) => createHash('sha256').update(b).digest('hex');
const G3 = 'specs/content/efmp-301/reviews/unit-04/G3';
const LOGS = `${G3}/logs-agent-g3-efmp301-u4-run001`;
const RENDERS = `${G3}/renders-agent-g3-efmp301-u4-run001`;

const manifest = JSON.parse(readFileSync(`${G3}/manifest.json`, 'utf8'));

// Evidence manifest: every log, every render artifact, the method scripts and
// the independent solutions record.
const evidence = {};
const addDir = (dir, filter) => {
  for (const f of readdirSync(dir).filter(filter).sort()) {
    const p = `${dir}/${f}`;
    evidence[p] = digest(readFileSync(p));
  }
};
addDir(LOGS, (f) => f.endsWith('.log'));
addDir(RENDERS, (f) => /\.(png|pdf|json|log|md|mjs)$/.test(f));

const commands = [
  ['validate:content', 0, `${LOGS}/validate-content.log`],
  ['check:depth-gate', 0, `${LOGS}/check-depth-gate.log`],
  ['check:figures', 0, `${LOGS}/check-figures.log`],
  ['check:no-em-dash', 0, `${LOGS}/check-no-em-dash.log`],
  ['check:no-answer-keys', 0, `${LOGS}/check-no-answer-keys.log`],
  ['check:docs-sync', 0, `${LOGS}/check-docs-sync.log`],
  ['check:concept-graph', 0, `${LOGS}/check-concept-graph.log`],
  ['check:bloom-bands', 0, `${LOGS}/check-bloom-bands.log`],
  ['measure-figure-text-1-3', 0, `${LOGS}/measure-figures-1-3.log`],
  ['measure-figure-text-4-6', 0, `${LOGS}/measure-figures-4-6.log`],
  ['svg-text-extract', 0, `${LOGS}/svg-text-extract.log`],
  ['build', 0, `${LOGS}/build.log`],
  ['serve', 0, `${LOGS}/serve.log`],
  ['render-review', 0, `${RENDERS}/render-review.log`],
  ['lazy-load-test', 0, `${LOGS}/lazy-load-test.log`],
  ['dark-variant-test', 0, `${LOGS}/dark-variant-test.log`],
  ['manifest-verify', 0, `${LOGS}/manifest-verify.log`],
  ['external-source-verification', 0, `${LOGS}/external-source-verification.log`],
].map(([name, exit_code, log_path]) => ({ name, exit_code, log_path }));

const report = {
  schema_version: 1,
  course_code: 'EFMP-301',
  unit_no: 4,
  stage: 'G3',
  disposition: 'revise',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:6da9fae',
  reviewer_run_id: 'agent-g3-efmp301-u4-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-25T09:05:02Z',
  completed_at: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  criteria: [
    {
      id: 'authority',
      status: 'fail',
      evidence: [
        'Guide authority verified: Scheme-and-Course-guides/extracted-text/1st 2026.txt lines 1099-1110 allot Weeks 8-9 to Chapter 4 exactly as the unit teaches (W8 "Attention and perception" + "Memory and information processing" -> topic-01/topic-02; W9 "Thinking, problem-solving, and reasoning" + "Class activities" -> topic-03 sections + "Class activities that work with attention and memory"), with the Week 9 class-activities slot folded into U4-8 per the documented rule (specs/content/efmp-301/content-spec.md:570-586).',
        'SLO TRACE BROKEN for topic 4.2: content-spec.md:558-561 defines SLO:EFMP-301-4-2 as "memory and information processing", but docs/semester-1/efmp-301/unit-04/topic-02.mdx:9 carries only SLO:EFMP-301-4-1 in clo_refs, and specs/content/efmp-301/concepts/unit-04.md:18-21 repeat SLO:EFMP-301-4-1 for all four memory concepts (CON:EFMP-301-4-4..4-7). SLO 4-2 therefore appears only in the index and assessment frontmatter. topic-01 (4-1) and topic-03 (4-3) are labelled correctly.',
        'CLO trace to guide CLOs 1 and 3 (guide lines 1033-1040) is as claimed at content-spec.md:558-561; no contradictory G0/G1 authority found (specs/content/efmp-301/intake-2/evaluation.md, D-2026-0044 approval of the 12-unit partition, bound in the manifest).',
        'Constitution Art. III.6 folding verified: the guide\'s teaching strategies (lectures, interactive discussion, question-answer, demonstration, case study analysis; guide lines 1172-1180) are folded at course level (docs/semester-1/efmp-301/course-overview.mdx ## Teaching strategies) and applied in unit-teacher-notes.mdx ## Teaching strategies; practical work is folded at course level with the unit carrier (the guide\'s Week 9 class-activities slot) in unit-teacher-notes.mdx ## Practical work.',
      ],
    },
    {
      id: 'sources',
      status: 'fail',
      evidence: [
        'VERIFIED against the bound excerpt specs/content/efmp-301/sources/texts/spielman2020.md: the perception definition quote (topic-01.mdx:88-90), sensory memory "up to a couple of seconds" (topic-02.mdx:45-46), Miller 7 plus/minus 2 and Cowan 4 plus/minus 1 (topic-02.mdx:51-53), long-term memory "continuous storage"/"unlimited" (topic-02.mdx:59-60), the encoding/storage/retrieval definitions and "a lot of work and attention" (topic-02.mdx:64-70), and "Active rehearsal is a way of attending..." (topic-02.mdx:95-97) all match the bound Section 5.1/8.1 text.',
        'MISSTATED FINDING: topic-01.mdx:71-74 says gorilla-study viewers "mostly failed to notice" the person in the gorilla costume; the bound excerpt quotes the cited source as "Nearly half of the people who watched the video didn\'t notice the gorilla at all" - the unit claims a majority where the source reports just under half.',
        'UNBOUND AND ABSENT FROM THE CITED SOURCE: the comparative study-strategy evidence - topic-02.mdx:89-91 (spacing, "at any total effort"), topic-02.mdx:93-99 (retrieval practice "more than re-exposure"), fig-U4-4\'s "what the evidence says" column ("strong evidence for durable recall", "among the strongest study behaviours known", "the cheapest and weakest of the set", "little benefit unless it selects for a reason") and the summary at topic-02.mdx:143-146 - appears in no bound excerpt, and a live fetch of the cited source itself (OpenStax Psychology 2e Section 8.1, 2026-09-25; logs/external-source-verification.log) confirms the page contains no spacing/retrieval-practice/re-reading/highlighting study-strategy content, only active and elaborative rehearsal and levels of processing. The registry claim that spielman2020 supports "the study-strategy evidence" (specs/content/efmp-301/sources/unit-04.md:16) is false for the bound sections. MCQ 6, RRQ 7, ERQ 2 and ERQ 4 all rest on this evidence.',
        'UNBOUND CITATIONS: topic-03.mdx:66-68 and topic-03.mdx:81-83 cite (Seifert & Sutton, 2009) for the named problem-solving strategies and for transfer, and Further reading cites Chapter 9, but the bound excerpt sources/texts/seifert2009.md contains ZERO Chapter 9 passages (chapters bound: 2, 3, 5, 6, 7, 10, 11). The registry (sources/unit-04.md:17) claims seifert2009 supports U4-5, U4-6 and U4-7 including "Rachel\'s solution". The reviewer could not verify the primary PDF (subset-encoded text layer; extraction produced no readable text; HTML mirrors returned 403/404 - external-source-verification.log), so the accuracy of these citations is undetermined.',
        'REGISTRY/EXCERPT MISMATCH (vosniadou2001): sources/unit-04.md:18 claims support for U4-4 ("relating new information to prior knowledge; taking time to practice") and U4-5 (concept formation), and specs/content/efmp-301/coverage/unit-04.md lists vosniadou2001 on the U4-4/U4-5 rows, but sources/texts/vosniadou2001.md binds only Principle 11 (developmental differences, marked "used by Units 1-2"). No unit prose cites Vosniadou (Further Reading only in topic-02.mdx:187-188 and topic-03.mdx:210-211), so no learner-facing claim rests on it.',
        'sources/unit-04.md declares no "## Unverifiable sources" section and declares all three sources "retrieved and read", so the D-2026-0001 unavailable-source path does not apply: the declarations overstate what the bound excerpts actually check.',
        'Minor: the attention-depletion claim (topic-01.mdx:69-71, "a resource that depletes with use") is uncited and supported by no bound text; the spotlight metaphor and capture factors (topic-01.mdx:50-61) are likewise taught without citation. The working-memory-overload obstacle (topic-03.mdx:86-88) is presented uncited while the registry attributes a "working-memory constraint" passage to spielman2020 that the excerpt does not contain.',
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'All 8 sub-topics of the approved checklist (content-spec.md:577-586) are taught under the exact mapped headings, verified in file: U4-1/U4-2 (topic-01.mdx "### Attention: the gateway to learning" / "### Perception: how the mind interprets what the senses bring"), U4-3/U4-4 (topic-02.mdx "### The information-processing model: sensory, working and long-term memory" / "### Encoding, storage, retrieval - and why forgetting happens"), U4-5/U4-6/U4-7/U4-8 (topic-03.mdx "### Thinking and concept formation" / "### Problem-solving: strategies and obstacles" / "### Reasoning: inductive and deductive" / "### Class activities that work with attention and memory").',
        'Topic partition matches the spec Topic list (content-spec.md:593-597); depth budget arithmetic verified: index 4 + topics 17+18+19 + assessment 24 + teacher notes 8 = 90 reading-minutes = the spec target 90 inside the 82-105 band (content-spec.md:599-600).',
        'Figures: all 6 planned figures (fig-U4-1..6) are placed as <Figure> carriers in the topic files matching specs/content/efmp-301/figures/unit-04.md (2 per topic; flowchart fig-U4-3 and concept-map fig-U4-5 satisfy the archetype floor); check:figures exit 0. Concept graph consistent with coverage and the 10/10/5 assessment numbering; check:concept-graph exit 0.',
        'Reinforcement rows verified present: U4-1 in topic-03\'s class-activities section, U4-3 in topic-03\'s obstacles (working-memory overload), U4-4 in topic-03\'s class activities, U4-5 in topic-01\'s perception section, U4-1 in unit-assessment.mdx ## Unit summary, U4-8 in unit-teacher-notes.mdx ## Practical work.',
        'Minor drift recorded as an advisory finding: the spec\'s figure plan for fig-U4-2 (content-spec.md:634-636) planned perception principles (figure-ground, closure, context); the delivered figure and the prose teach "expectation" instead, and the prose\'s capture-factor list (topic-01.mdx:56-57) includes "movement" while the figure\'s six factors (novelty, contrast, meaning, emotion, task demand, expectation) do not.',
      ],
    },
    {
      id: 'assessment',
      status: 'fail',
      evidence: [
        'Independent solve BEFORE reading answers (renders-agent-g3-efmp301-u4-run001/independent-assessment-solutions.md, written before opening unit-assessment.mdx:157-249): reviewer derived MCQ key 1-b, 2-b, 3-b, 4-b, 5-b, 6-c, 7-b, 8-c, 9-b, 10-b and all ten match the supplied key (unit-assessment.mdx:159-172) with sound rationales; distractors are plausible and non-ambiguous. RRQ model answers (unit-assessment.mdx:174-200) match the reviewer\'s independently derived answers in substance; ERQ rubrics each sum to 20 (5+7+4+4 or 6+6+4+4) and every rubric carries at least one Analyze-or-higher criterion.',
        'BLUEPRINT DEVIATION: MCQ topic spread is 3/4/3 (Q1-3 -> topic 4.1, Q4-7 -> 4.2, Q8-10 -> 4.3) against the approved 4/3/3 (content-spec.md:652); RRQ spread is 2/5/3 (R1-2 -> 4.1, R3-7 -> 4.2, R8-10 -> 4.3) against the approved 3/4/3 (content-spec.md:653). Topic 4.1 is under-weighted by one item in each band and topic 4.2 over-weighted - the same defect class the unit-03 round-1 G3 review recorded as blocking.',
        'ERQ composition matches the blueprint: one per topic (E1 attention, E2 memory, E3 thinking) plus two integrative (E4 the study-habits audit through the memory model; E5 the whole-unit lesson design), matching content-spec.md:655-658.',
        'Bloom demand verified from the thinking actually required, not the labels: MCQs Remember (Q1, Q4) / Understand (Q2, Q3, Q6, Q7, Q9) / Apply (Q5, Q8, Q10); RRQs Understand with Apply at R4 and R10; ERQs Analyze x3, Evaluate (E4), Create (E5). check:bloom-bands exit 0 (675 items). Answers and marking guidance correctly bounded as the final ## section; check:no-answer-keys exit 0.',
        'Position-balance weakness recorded as an advisory finding: 7 of 10 MCQ keys sit on option b and none on a or d (unit-assessment.mdx:159-172).',
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        'All 24 committed SVG variants (fig-U4-1..6 x light/.dark/.ur/.ur.dark under static/img/figures/efmp-301/unit-04/) carry role="img" and aria-labelledby to <title id="t">/<desc id="d">, with an aria-hidden wordmark; the six <Figure> alt texts in the topic MDX match the figure manifest\'s Alt text column verbatim, and every rendered <img> carries an alt attribute (0 missing across all pages).',
        'scripts/measure-figure-text.mjs: no text overflow and no wordmark overprint in any of the six figures (all 780x470 viewBox; widest text ends at 768.4; wordmark at 675.7) - logs measure-figures-1-3.log and measure-figures-4-6.log.',
        'Render inspection of the PRODUCTION BUILD (npm run build exit 0 at commit 8902c36; served via docusaurus serve at localhost:3217; headless Chromium through the repo\'s Playwright; setup and full data in renders-agent-g3-efmp301-u4-run001/render-review.log and render-inspect.json): desktop 1280x900 on all 6 pages - 0 broken images, 0 missing alt, no skipped heading levels, document overflow 0px; narrow 360x780 on all 6 pages - document overflow 0px, every content table measured as its own element reports scrollWidth === clientWidth === 328 (no table overflows at 360px, so nothing requires the scroll-container mechanism or its hydration attributes), all figures fit the viewport; lazy figures load on full stepped scroll (light variants) and the .dark.svg variants load under [data-theme="dark"]; A4 print 794x1123 on all 6 pages - 0 clipped elements, all figures fit the page, and the "Answers and marking guidance" section is present and unclipped in the unit-assessment print render (print PDFs saved).',
        'LIMITATION RECORDED: this environment could not relay PNG pixels to the reviewer in-session (Read on the saved PNGs returned no image data; the same limitation was recorded by the unit-03 G3 review). Substituted with sharp pixel statistics over every captured element screenshot (capture-pixel-stats.json: channel stdev 30-84 on all 11 captures, none blank) plus in-browser canvas sampling of fig-U4-1 (1487 distinct colours, 83.8% ink coverage). The DOM-level measurements and saved artifacts are the substantive checks.',
      ],
    },
    {
      id: 'readability',
      status: 'pass',
      evidence: [
        'Register held per specs/content/style-guide.md ## EN readability rules (Constitution Art. III.1): short sentences, active voice, one idea per paragraph across index.mdx and topic-01..03.mdx; every technical term defined at first use (attention topic-01.mdx:45-48; sensation/perception topic-01.mdx:86-90; the three memory systems topic-02.mdx:45-63; encoding/storage/retrieval topic-02.mdx:64-70; decay/interference/retrieval failure topic-02.mdx:101-107; concept topic-03.mdx:44-55; the five strategies and three obstacles topic-03.mdx:70-88; inductive/deductive topic-03.mdx:98-113) and then used consistently - no synonym switching found.',
        'Bilingual support: <Glossary term="Attention" /> resolves to the glossary.json entry added with this unit, definition consistent with the unit\'s teaching; 7 of the unit\'s terms are banked in specs/content/terminology.csv (Attention, Perception, Memory, Short-Term Memory, Long-Term Memory, Working Memory, Problem Solving - each verified present); the concept graph flags its authored Urdu labels for G5 as required. No unexplained graduate-level jargon found.',
        'Pakistan/Sindh localisation per Art. III.4: Miss Hina\'s Nawabshah Class 5 room on the main road (topic-01.mdx:26-37), the Pakistan Studies October test (topic-02.mdx:26-34), the rickshaw word problem and Karachi-Hyderabad bus (topic-03.mdx:26-31, 143-145), Rs 45 pens (topic-03.mdx:139), the Class 1 "sabzi" market concept (topic-03.mdx:50-52), Sindhi names throughout. check:no-em-dash exit 0.',
        'One unanchored reference recorded as an advisory finding: topic-03.mdx:151-152 asks about "the \'billi\' example", a term used nowhere in the unit; the explanation\'s instance is "the pupil who calls every four-legged animal a cat" (topic-03.mdx:60-62).',
      ],
    },
    {
      id: 'pedagogy',
      status: 'pass',
      evidence: [
        'Nine-part learning cycle present and monotonically ordered in all three topic files (A real classroom situation -> Explanation -> Activity -> Check your understanding (5 items each) -> Summary -> Self-assessment checklist (4 items each) -> Try this at your practicum school -> Summative task with mini-rubric -> Further reading); check:depth-gate exit 0.',
        'Activities are feasible in the stated Pakistani classroom context with usable instructions and no special materials: the attention audit in pairs (topic-01.mdx:113-128), the span test and strategy audit (topic-02.mdx:111-123), the name-the-move problems (topic-03.mdx:132-147, all four solvable mentally with ordinary content); practicum tasks are concrete observation exercises (attention audit, five-question exit quiz, strategy-naming lesson).',
        'Misconception coverage: all five spec-listed misconceptions (content-spec.md:606-609) are refuted in substance - "memory is a recorder" (topic-02 box + teacher notes), "attention is a fixed quantity" (topic-01 box + notes), "problem-solving is a gift" (topic-03 box + notes), "perception is passive" (topic-01\'s active-interpretation teaching), "cramming works as well as spaced study" (topic-02\'s October chapter and spaced-not-massed storage); one explicit misconception box per topic.',
        'Progression verified in every topic: classroom situation -> explanation -> activity -> retrieval -> reflection -> assessment, with each summative mini-rubric carrying at least one Analyze-or-higher criterion. The unit\'s three anchor cases (Miss Hina, the October chapter, Ayesha/Bilal) carry through index, topics, assessment and teacher notes; the teacher notes sequence the guide\'s two weeks, protect the Week 9 practical (each trainee designs and teaches one activity), and schedule ERQ 4/5 honestly (audit before the evidence is taught).',
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      message:
        'Seifert Chapter 9 citations unbound: topic-03.mdx:66-68 and topic-03.mdx:81-83 cite (Seifert & Sutton, 2009) for the named problem-solving strategies and for transfer, and Further reading (topic-03.mdx:208-209) cites Chapter 9, but the bound excerpt specs/content/efmp-301/sources/texts/seifert2009.md contains no Chapter 9 passages at all (chapters bound: 2, 3, 5, 6, 7, 10, 11). The registry (specs/content/efmp-301/sources/unit-04.md:17) claims seifert2009 supports U4-5 (concepts and transfer), U4-6 (problem-solving strategies and obstacles) and U4-7 (the reasoning framing). The reviewer could not verify the primary PDF (subset-encoded text layer; HTML mirrors 403/404; see external-source-verification.log), so citation accuracy is undetermined. Repair: extend sources/texts/seifert2009.md with the actual Chapter 9 passages the unit relies on (or re-attribute to a bound source), re-prepare the manifest, and have a fresh reviewer re-verify; do not accept on the current bundle.',
      resolved: false,
    },
    {
      severity: 'blocking',
      message:
        'Study-strategy evidence unsupported by any bound or cited source: topic-02.mdx:89-99 (spacing "at any total effort"; retrieval practice strengthening "more than re-exposure"), fig-U4-4\'s "what the evidence says" column ("strong evidence for durable recall", "among the strongest study behaviours known", "the cheapest and weakest of the set", "little benefit unless it selects for a reason") and the summary at topic-02.mdx:143-146 rest on no bound text, and a live fetch of the cited source itself (OpenStax Psychology 2e Section 8.1, 2026-09-25) confirms it contains no study-strategy evidence - only active/elaborative rehearsal and levels of processing. The registry claim that spielman2020 supports "the study-strategy evidence" (sources/unit-04.md:16) is false for the bound sections. MCQ 6, RRQ 7, ERQ 2 and ERQ 4 all rest on this evidence. Repair: register and bind an open-access source that actually carries the spacing/retrieval-practice evidence (for example OpenStax 8.4 if verified, or an open review such as Dunlosky et al. 2013) and cite it in topic-02 and the figure manifest, or soften the claims to what a bound source supports.',
      resolved: false,
    },
    {
      severity: 'blocking',
      message:
        'Gorilla-study result misstated: topic-01.mdx:71-74 claims viewers "mostly failed to notice" the person in the gorilla costume, but the bound excerpt quotes the cited source as "Nearly half of the people who watched the video didn\'t notice the gorilla at all" (sources/texts/spielman2020.md, Section 5.1). The unit asserts a majority failure the cited study does not report. Repair: change to "nearly half" or "about half".',
      resolved: false,
    },
    {
      severity: 'blocking',
      message:
        'Assessment blueprint deviation: unit-assessment.mdx MCQ topic spread is 3/4/3 (Q1-3 -> topic 4.1, Q4-7 -> 4.2, Q8-10 -> 4.3) against the approved 4/3/3 (content-spec.md:652), and RRQ spread is 2/5/3 (R1-2 -> 4.1, R3-7 -> 4.2, R8-10 -> 4.3) against the approved 3/4/3 (content-spec.md:653); topic 4.1 is under-weighted by one item in each band and topic 4.2 over-weighted. Repair: move one MCQ and one RRQ from topic-4.2 material to topic-4.1 material (updating the concept-graph assessment IDs accordingly), or record a justified blueprint amendment in the spec.',
      resolved: false,
    },
    {
      severity: 'blocking',
      message:
        'SLO mislabel breaks the outcome trace for topic 4.2: content-spec.md:558-561 assigns "memory and information processing" to SLO:EFMP-301-4-2, but topic-02.mdx:9 (clo_refs) carries only SLO:EFMP-301-4-1, and specs/content/efmp-301/concepts/unit-04.md:18-21 repeat SLO:EFMP-301-4-1 for all four memory concepts (CON:EFMP-301-4-4..4-7). SLO 4-2 appears only in the index and assessment frontmatter. No gate catches this (validate:content and check:concept-graph pass). Repair: correct topic-02.mdx clo_refs and the four concept-graph SLO cells to SLO:EFMP-301-4-2.',
      resolved: false,
    },
    {
      severity: 'uncertain',
      message:
        'Registry/excerpt mismatch (vosniadou2001): sources/unit-04.md:18 claims vosniadou2001 supports U4-4 ("relating new information to prior knowledge; taking time to practice") and U4-5 (concept formation), and coverage/unit-04.md lists vosniadou2001 on the U4-4/U4-5 rows, but the bound excerpt sources/texts/vosniadou2001.md contains only Principle 11 (developmental differences, marked "used by Units 1-2"). No unit prose cites Vosniadou (Further Reading only), so no learner-facing claim rests on it, but the declared support is unverifiable from the bundle. Repair: extend the excerpt with the booklet\'s prior-knowledge/practice principles or correct the Supports column and coverage rows.',
      resolved: false,
    },
    {
      severity: 'advisory',
      message:
        'Prose/figure factor-list mismatch and figure-plan drift: topic-01.mdx:56-57 names the capture factors as "novelty, contrast, movement, meaning and emotion", while fig-U4-2 (and its manifest row) carries six factors "novelty, contrast, meaning, emotion, task demand, expectation" - "movement" is absent from the figure and "task demand"/"expectation" are absent from the prose list; the spec\'s figure plan (content-spec.md:634-636) additionally planned perception principles (figure-ground, closure, context) that neither prose nor figure teaches. Align the prose list with the figure (or vice versa) so a learner cross-referencing them sees one vocabulary.',
      resolved: false,
    },
    {
      severity: 'advisory',
      message:
        'MCQ answer-position balance: 7 of 10 keyed answers sit on option b and none on a or d (unit-assessment.mdx:159-172); a test-wise pupil scores 7/10 by always choosing b. Rebalance option positions when the bank is next repaired.',
      resolved: false,
    },
    {
      severity: 'advisory',
      message:
        'Unanchored reference: topic-03.mdx:151-152 (Check your understanding item 1) asks the learner to explain the boundary problem "with the \'billi\' example", but "billi" appears nowhere else in the unit; the explanation\'s instance is "the pupil who calls every four-legged animal a cat" (topic-03.mdx:60-62). Anchor the reference (for example "the cat (billi) example") or use the explanation\'s own wording.',
      resolved: false,
    },
    {
      severity: 'advisory',
      message:
        'Registry drift: sources/unit-04.md:17 cites "Rachel\'s solution" as part of what seifert2009 supports for U4-6, but no Rachel example exists in the unit prose or the bound excerpt. Correct the Supports cell to describe what the unit actually uses (Ayesha\'s bars, Bilal\'s set effect).',
      resolved: false,
    },
    {
      severity: 'advisory',
      message:
        'Uncited contested generalisation: topic-01.mdx:69-71 states attention "is a resource that depletes with use" as flat fact with no citation and no bound source; the resource-depletion (ego depletion) model is contested in the wider literature. The classroom observations it anchors (hot rooms, after lunch, last period) are uncontroversial. Anchor the claim to a bound source or soften to the time-of-day/fatigue framing.',
      resolved: false,
    },
  ],
  commands,
  evidence_manifest: evidence,
};

writeFileSync(`${G3}/agent-g3-efmp301-u4-run001.json`, JSON.stringify(report, null, 2) + '\n');
console.log('report written:', `${G3}/agent-g3-efmp301-u4-run001.json`);
console.log('evidence files:', Object.keys(evidence).length);
console.log('completed_at:', report.completed_at);
