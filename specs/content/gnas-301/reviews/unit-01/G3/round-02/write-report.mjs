// Assembles the G3 round-2 report for GNAS-301 Unit 1 with real evidence hashes.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';

const ROOT = process.cwd();
const DIR = 'specs/content/gnas-301/reviews/unit-01/G3/round-02';
const sha = (p) => createHash('sha256').update(readFileSync(path.join(ROOT, p))).digest('hex');

const manifest = JSON.parse(readFileSync(path.join(ROOT, DIR, 'manifest.json'), 'utf8'));

// Evidence: every log, every render artifact, and the inspection scripts.
const evidence = {};
const walk = (rel) => {
  for (const entry of readdirSync(path.join(ROOT, rel))) {
    const p = `${rel}/${entry}`;
    if (statSync(path.join(ROOT, p)).isDirectory()) walk(p);
    else evidence[p] = sha(p);
  }
};
walk(`${DIR}/logs`);
walk(`${DIR}/renders`);

const now = new Date();
const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
const report = {
  schema_version: 1,
  course_code: 'GNAS-301',
  unit_no: 1,
  stage: 'G3',
  disposition: 'revise',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'claude-code:019-author-gnas-301:c77c070',
  reviewer_run_id: 'g3-review:gnas-301-u1-r2:20260923',
  model: 'LongCat-2.0',
  started_at: '2026-09-23T21:10:00Z',
  completed_at: now.toISOString(),
  skill_digest: manifest.skill_digest,
  rulings: {
    'D-2026-0001': '8ff79df9af668329f6d0094a2257654f45fc545122a753b4888fb9936f402f1f',
    'D-2026-0020': '84634da46e3d983ace09ce20d2ed5ea5e1588f30e1f405e44b62c967585925e7',
    'D-2026-0021': '6004630196719c12ca61d4ed45ed09a2da427c431d666434b6a0221bda078268',
  },
  input_manifest: manifest.input_manifest,
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        'specs/content/gnas-301/content-spec.md:1-13 front matter status approved (D-2026-0020 intake + owner resolutions G-2026-22/G-2026-23 + open-access floor D-2026-0021, 2026-09-23); authority inputs byte-identical to round 1',
        'Scheme-and-Course-guides/extracted-text/1st 2026.txt:193-231 guide Week 1-2 outline (1.1-1.4, 2.1-2.3) read in full and compared with the unit',
        'specs/content/gnas-301/content-spec.md:294-308 sub-topic checklist U1-01..U1-07 is one-to-one with the guide leaf items; derived six-unit partition owner-confirmed (G-2026-22, content-spec.md:36-41)',
        'specs/content/gnas-301/coverage/unit-01.md:8-22 every sub-topic row maps to a taught ### heading, verified line-by-line in the topic files (topic-01.mdx:38,64; topic-02.mdx:38,71; topic-03.mdx:38,81; topic-04.mdx:37)',
        'docs/semester-1/gnas-301/unit-01/index.mdx:27-39 unit outcomes cover all seven sub-topics; CLO/SLO refs trace to guide CLOs 1, 2 and 5 (content-spec.md:272-275)',
        'assessment weighting follows the course-specific 30/50/10/10 table (content-spec.md:73-86); no practical-work section invented where the guide is silent (content-spec.md:87-90)',
      ],
    },
    {
      id: 'sources',
      status: 'fail',
      evidence: [
        'specs/content/gnas-301/sources/unit-01.md:12-22 bound source table read in full; who-air-2024 (row 17) and who-water-2023 (row 18) added by the round-1 repairs with coverage rows (coverage/unit-01.md:11,20)',
        'all seven bound excerpts read in full (sources/texts/abbas2012.md, archer2010.md, un-restoration-2021.md, who-air-2024.md, who-biodiversity-2025.md, who-climate-2023.md, who-water-2023.md)',
        'who-air-2024 verified faithful by direct fetch 2026-09-23 (who.int ambient air fact sheet, 24 Oct 2024: "In 2019, 99% of the world\'s population was living in places where the WHO air quality guidelines levels were not met"); topic-01.mdx:55-57 99-per-cent claim now bound - round-1 blocking finding 2 RESOLVED',
        'who-water-2023 verified faithful by direct fetch 2026-09-23 (who.int drinking-water fact sheet, 13 Sep 2023: over 2 billion people in water-stressed countries as of 2021); topic-03.mdx:112-113 re-bound correctly - round-1 blocking finding 3 RESOLVED; who-climate-2023.md:23-25 correction note accurate, confirmed by fetch (climate fact sheet, 12 Oct 2023, carries no water-stress figure; its 3.6-billion susceptibility figure is correctly used at topic-02.mdx:76-78)',
        'who-biodiversity-2025 verified by direct fetch 2026-09-23 (fact sheet dated 18 Feb 2025): approximately 1 million species at extinction risk, more than 75% of food crops rely on pollinators, 35% of wetlands lost since 1970, services list - correctly used at topic-02.mdx:78-79 and topic-03.mdx:60-62,70-72',
        'un-restoration-2021 verified by direct fetch 2026-09-23 (decadeonrestoration.org): "There has never been a more urgent need to revive damaged ecosystems than now", prevent/halt/reverse aim, "only succeed if everyone plays a part" - used at topic-02.mdx:67-69, topic-03.mdx:77-78, topic-04.mdx:142-143; the key rename makes the excerpt digest-bound in this manifest - round-1 advisory RESOLVED',
        'abbas2012: direct fetch of isprs-archives.copernicus.org/articles/XXXVIII-8-W20/187/2011/ on 2026-09-23 confirms the abstract states "The Indus delta region contains the world\'s fifth-largest mangrove forest"; the repaired prose (topic-03.mdx:50-53) makes exactly that sourced claim - but the bound excerpt sources/texts/abbas2012.md:22 truncates mid-sentence at "The Indus delta region contains the world\'s ..." and its support note (abbas2012.md:24-32) does not declare the ranking, so the unit relies on a figure the bound excerpt does not state (see blocking finding)',
        'haines-frumkin and clark-henderson declared under ## Unverifiable sources with retrieval attempts, dates and owner authorisation (sources/unit-01.md:24-37, D-2026-0001); verified they appear only in ## Further reading at bibliographic level (topic-01.mdx:169-170, topic-02.mdx:167-168, topic-03.mdx:193-194, topic-04.mdx:144-145) - no prose claim rests on them',
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'coverage/unit-01.md:8-22 all seven sub-topic rows verified against the exact ### headings in the topic files; no heading-only coverage',
        'reinforcement rows verified: unit-assessment.mdx:20-33 (Unit summary) and unit-teacher-notes.mdx:50-67 (Managing the activities)',
        'assessment distribution per blueprint: MCQs 2/3/3/2 and RRQs 2/3/3/2 across topics 1.1-1.4 (>= 2 each), ERQs one per topic plus integrative ERQ-05 tracing a local issue to regional and global scales (unit-assessment.mdx:37-142)',
        'est_reading_minutes unit total 81 (index 5 + topics 15+15+16+13 + assessment 11 + teacher notes 6) inside the 65-85 depth budget (content-spec.md:325); check:depth-gate exit 0',
        'all five planned misconceptions from content-spec.md:331-334 addressed in prose (topic-01.mdx:98-103 and 117-118, topic-02.mdx:96-100, topic-03.mdx:111-115, topic-04.mdx:75-81)',
      ],
    },
    {
      id: 'assessment',
      status: 'pass',
      evidence: [
        'all 25 items solved independently before reading ## Answers and marking guidance; derived MCQ key 1-b, 2-c, 3-a, 4-d, 5-c, 6-b, 7-b, 8-d, 9-a, 10-a matches the supplied key exactly (unit-assessment.mdx:146-163); the round-1 de-skew (option rearrangement with the key updated consistently) introduced no ambiguity or double key; distribution now a=3, b=3, c=2, d=2 (was 7x b)',
        'RRQ model answers and point-by-point mark schemes (unit-assessment.mdx:165-200) consistent with the taught material; RRQ-03 still tolerates either placement of the salt crust with a reason; no conflicting keys',
        'ERQ rubrics are analytic, distinct and each totals 10 (unit-assessment.mdx:202-221); Bloom demand classified from the thinking required: ERQ-04 Create (design a change with failure condition), ERQ-05 Evaluate (actors per scale); MCQ-10 and RRQ-10 labels lowered to Understand per the round-1 advisory, matching the thinking actually required',
        'check:bloom-bands exit 0 (250 items honour the spec bands); MCQ-6 producer/consumer distractor defused in the key note',
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        'renders/render-inspect.log + renders/render-inspect.json: real browser inspection of all 7 pages at desktop 1280x900, narrow 360x780 and A4 794px print emulation (chromium 149.0.7827.0 via Playwright, host http://127.0.0.1:4611, served from a fresh npm run build at HEAD 2bc81b3), 0 defects',
        'renders/desktop-*.png and renders/narrow360-*.png: all 8 figures served with full alt text; the Figure component display:none lazy dark twin correctly hidden in light mode and loading under data-theme=dark (renders/dark-topic-01.png, no visible broken images); no skipped heading levels; no document horizontal overflow at 360px',
        'content tables measured on the table element itself at 360px: client 328 = scroll 328 on every topic (fits, so no tabindex/role/aria-label needed - only overflowing tables are marked, src/theme/DocItem/Content.tsx); figures fit at 360px',
        'A4 print: clippedElems=0 on all pages (renders/print-a4-*.pdf); answers section prints unclipped as the teacher handout intends (renders/printview-unit-assessment.png)',
        'SVG glyph geometry clean on all 8 figures x 4 committed variants (light/dark/ur/ur.dark): no text past the 780x470 viewBox, no wordmark overprint (logs/measure-figure-text.log, exit 0)',
        'round-1 figure transposition repair verified in the rendered DOM: the figure following the scope prose in topic-01 is fig-U1-2 (render-inspect.json topic01FigureOrder.scopeNextFig; renders/desktop-topic-01.png)',
      ],
    },
    {
      id: 'readability',
      status: 'pass',
      evidence: [
        'all nine in-glossary key terms glossed at first use via <Glossary>: Environmental science, Natural environment, Biosphere (topic-01.mdx:40,59,77), Anthropogenic (topic-02.mdx:40), Ecosystem, Ecosystem services, Natural resources, Renewable/Non-renewable resources (topic-03.mdx:31,55,83,86,89), Sustainability (topic-04.mdx:41); every wrapped term has a glossary.json entry (validate:content exit 0)',
        'Biodiversity and Conservation (spec key terms with no glossary.json entry, so not wrappable) are used with context-supplied meaning at first occurrence (topic-02.mdx:78-79, topic-03.mdx:74-79); HSC-register words, no graduate jargon',
        'prerequisite knowledge declared as none beyond HSC and none assumed (index.mdx:41-44; content-spec.md:327-329)',
        'HSC-register prose verified across all four topics: short sentences, concrete nouns, every technical idea anchored to a Pakistani example before abstraction',
      ],
    },
    {
      id: 'pedagogy',
      status: 'pass',
      evidence: [
        'nine-part learning cycle present and complete in all four topics (situation, explanation, activity, check your understanding, summary, self-assessment, practicum, summative task, further reading)',
        'worked examples are concrete, Pakistan-grounded and repeatable by a trainee teacher: cup of tea through four spheres (topic-01.mdx:91-96), waterlogging chain (topic-02.mdx:55-62), mangrove services (topic-03.mdx:56-60), groundwater rate (topic-03.mdx:105-109), biscuit wrapper (topic-04.mdx:67-73)',
        'activities are feasible in a Pakistani classroom with stated time and grouping (topic-01.mdx:105-111, topic-02.mdx:102-108, topic-03.mdx:117-123, topic-04.mdx:83-89) and the teacher notes give management guidance for each (unit-teacher-notes.mdx:50-67)',
        'round-1 transposition repaired and verified: fig-U1-2 (scope table) follows the scope sentence at topic-01.mdx:47-50 and fig-U1-1 (four spheres) sits in the spheres section at :87, verified in source, built HTML and rendered page; the residual one-word deixis error on the newly added sentence at :89 is recorded as an advisory finding (figure adjacent, instructional meaning recoverable)',
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: false,
      message:
        'Bound excerpt does not state the repaired mangrove ranking claim (round-1 blocking finding 4 repaired in prose only). topic-03.mdx:50-53 now reads "A national assessment using satellite imagery ranks the Indus Delta as the world\'s fifth-largest mangrove forest and has mapped how Pakistan\'s cover changed over time (Abbas et al., 2012)". The reword itself is correct and source-supported: verified by direct fetch of the publisher page (isprs-archives.copernicus.org/articles/XXXVIII-8-W20/187/2011/, 2026-09-23), the abstract states "The Indus delta region contains the world\'s fifth-largest mangrove forest". But the bound excerpt specs/content/gnas-301/sources/texts/abbas2012.md:22 truncates mid-sentence at "The Indus delta region contains the world\'s ..." and does not contain the ranking, and its support note (abbas2012.md:24-32) still declares only the national-mapping claim and a "major mangrove region", not the ranking. The excerpt\'s closing declaration "The unit does not rely on this source for any figure it does not state here" is therefore inaccurate for the repaired prose: the unit now relies on abbas2012 for a specific world-ranking figure the bound excerpt does not state. This is the same excerpt-contract failure (D-2026-0021) round 1 blocked on for the 99-per-cent air claim. Repair: complete the excerpt\'s final abstract sentence to include "fifth-largest mangrove forest" and extend its support note to declare the ranking claim. No unit prose change is needed.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Teacher-notes cross-reference inaccuracy remains uncorrected although the repair commit message (c77c070) claims it was fixed. unit-teacher-notes.mdx:21-23 still reads "the Keenjhar Lake from 1.3 returns as a resource rate in 1.3 and a practicum option in 1.4": self-referential (Keenjhar is already in 1.3), and Topic 1.4\'s practicum is the two-bin classroom trial, not a Keenjhar option (Keenjhar appears in 1.4 only in the opening situation). The file is byte-identical to the round-1 bound state (digest cdddd01051a0897d79cb65049fdf1d2e9956f6bda949646c94a06036ad056424 in both manifests; no commit between the attempts touches it). Repair as round 1 suggested, e.g. "...returns in 1.3\'s resource-rate debate and in 1.4\'s opening situation".',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'UN Decade paraphrase still reads "restore" where the bound excerpt says "revive", although the repair commit message claims the paraphrase was aligned. topic-02.mdx:67-69: "there has never been a more urgent need to restore damaged ecosystems (UN, 2021)"; sources/texts/un-restoration-2021.md:11: "There has never been a more urgent need to revive damaged ecosystems than now." topic-02.mdx is byte-identical to round 1 (no commit touches it). Still acceptable as an unquoted paraphrase (round 1\'s own judgment; "restoration" is the Decade\'s own term), so this stays advisory - but the parent should note that two of the six advisory repairs claimed in commit c77c070 (this and the teacher-notes cross-reference) were not actually applied to the bytes.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Bare-URL link text in all four topics\' ## Further reading sections (topic-01.mdx:167-168, topic-02.mdx:163-168, topic-03.mdx:182-194, topic-04.mdx:140-145), unchanged from round 1: verified in the built HTML, the anchor text is the raw URL, so a screen-reader user hears the URL instead of a description. Consider descriptive link text at the next revision.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Course-level inconsistency (outside unit prose), unchanged from round 1: docs/semester-1/gnas-301/course-overview.mdx:5 carries credit_hours "3 (3-0)" while catalog/courses.json (GNAS-301 entry, re-verified this attempt) and the approved content-spec carry "3 (2-1)". The overview is an explicit "Coming soon" placeholder; flagged so the authoring pass uses the catalogue split.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'New residual deixis error introduced by the figure-swap repair. topic-01.mdx:89, added by commit c77c070 directly below the fig-U1-1 carrier at topic-01.mdx:87, reads "The figure below gathers the four spheres around one Earth, with a school building standing in the biosphere." - but the figure is above the sentence, and render inspection confirms no figure follows it (render-inspect.json topic01FigureOrder.spheresNextFig = null; renders/crop-spheres-region.png shows the sentence directly beneath the diagram). A learner is directed to look below for a figure that sits above. The figure is adjacent and was just seen, so the instructional meaning is recoverable (advisory, not a return of the round-1 blocking transposition). Repair: change "below" to "above", or move the sentence above the carrier.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'who-water-2023 excerpt support note mislabels the supporting unit. sources/texts/who-water-2023.md:18-24 is headed "What this supports in GNAS-301 Unit 2" and describes only Topic 2.1/2.2 usage; it omits this unit\'s Topic 1.3 (U1-06) usage that sources/unit-01.md:18 and coverage/unit-01.md:20 bind it for. The excerpt\'s key facts do state the over-2-billion water-stress figure, so the Unit 1 binding chain is sound; the note is stale bookkeeping (the file was added by the Unit 1 repair commit but written from Unit 2\'s perspective). Related observation: the prose cites both WHO 2023 fact sheets as "(WHO, 2023)" (topic-02.mdx:77-78 climate, topic-03.mdx:112-113 drinking-water); each is disambiguated only through the governance chain, not in learner-facing text. Repair: extend the note to name Unit 1\'s U1-06 usage or make it unit-neutral.',
    },
    {
      severity: 'blocking',
      resolved: true,
      message:
        'ROUND-1 BLOCKING FINDING 1 RESOLVED: figure/prose transposition in topic-01.mdx. fig-U1-2 (scope table) now follows the scope-introducing prose at topic-01.mdx:47-50 and fig-U1-1 (four spheres) sits in the four-spheres section at :87. Verified in the MDX source, the built HTML (figure order fig-U1-2 then fig-U1-1) and the rendered page (renders/desktop-topic-01.png; render-inspect.json topic01FigureOrder.scopeNextFig = fig-U1-2.svg). The residual wording defect on the newly added sentence is recorded separately as an advisory finding.',
    },
    {
      severity: 'blocking',
      resolved: true,
      message:
        'ROUND-1 BLOCKING FINDING 2 RESOLVED: unbound citation for the 99-per-cent air-quality claim. who-air-2024 is now bound (sources/unit-01.md:17; coverage/unit-01.md:11) with a faithful excerpt (sources/texts/who-air-2024.md) whose key facts state the 99-per-cent figure. Excerpt faithfulness verified by direct fetch of the WHO fact sheet (24 Oct 2024) this attempt: "In 2019, 99% of the world\'s population was living in places where the WHO air quality guidelines levels were not met."',
    },
    {
      severity: 'blocking',
      resolved: true,
      message:
        'ROUND-1 BLOCKING FINDING 3 RESOLVED: misattributed 2-billion water-stress figure. The claim (topic-03.mdx:112-113) is re-bound from who-climate-2023 to who-water-2023 (sources/unit-01.md:18; coverage/unit-01.md:20) with a faithful excerpt, and the who-climate-2023 excerpt note is corrected (sources/texts/who-climate-2023.md:23-25). Verified by direct fetch this attempt: the WHO Drinking-water fact sheet (13 Sep 2023) states the water-stress figure; the Climate change fact sheet (12 Oct 2023) contains no water-stress statement at all.',
    },
    {
      severity: 'advisory',
      resolved: true,
      message:
        'ROUND-1 ADVISORIES RESOLVED: (a) MCQ key de-skewed by option rearrangement with the answer key updated consistently (now 1-b, 2-c, 3-a, 4-d, 5-c, 6-b, 7-b, 8-d, 9-a, 10-a; distribution a=3, b=3, c=2, d=2, was 7x b; all ten items re-solved independently this attempt with no ambiguity introduced); (b) MCQ-10 label lowered Apply -> Understand and RRQ-10 Analyze -> Understand, matching the thinking actually required; (c) un-restoration key renamed un-restoration-2021 so the excerpt is digest-bound in this round\'s manifest (verified present in input_manifest).',
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: `${DIR}/logs/validate-content.log` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${DIR}/logs/check-depth-gate.log` },
    { name: 'check:figures', exit_code: 0, log_path: `${DIR}/logs/check-figures.log` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${DIR}/logs/check-no-em-dash.log` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${DIR}/logs/check-no-answer-keys.log` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${DIR}/logs/check-docs-sync.log` },
    { name: 'render-review', exit_code: 0, log_path: `${DIR}/renders/render-inspect.log` },
    { name: 'check:concept-graph', exit_code: 0, log_path: `${DIR}/logs/check-concept-graph.log` },
    { name: 'check:bloom-bands', exit_code: 0, log_path: `${DIR}/logs/check-bloom-bands.log` },
    { name: 'check:source-floor', exit_code: 0, log_path: `${DIR}/logs/check-source-floor.log` },
    { name: 'check:content-status', exit_code: 0, log_path: `${DIR}/logs/check-content-status.log` },
    { name: 'check:pipeline-gate', exit_code: 0, log_path: `${DIR}/logs/check-pipeline-gate.log` },
    { name: 'check:content', exit_code: 0, log_path: `${DIR}/logs/check-content.log` },
    { name: 'build', exit_code: 0, log_path: `${DIR}/logs/build.log` },
    { name: 'measure-figure-text', exit_code: 0, log_path: `${DIR}/logs/measure-figure-text.log` },
  ],
  evidence_manifest: evidence,
};

const out = `${DIR}/${stamp}-g3-attempt-02.json`;
writeFileSync(path.join(ROOT, out), JSON.stringify(report, null, 2) + '\n');
console.log('wrote', out);
console.log('evidence files:', Object.keys(evidence).length);
