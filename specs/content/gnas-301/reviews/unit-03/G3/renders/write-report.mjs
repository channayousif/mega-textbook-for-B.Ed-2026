// Build the G3 report for GNAS-301 Unit 3, attempt run001.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const digest = (b) => createHash('sha256').update(b).digest('hex');
const DIR = 'specs/content/gnas-301/reviews/unit-03/G3';
const manifest = JSON.parse(readFileSync(`${DIR}/manifest.json`, 'utf8'));

const evidence = {};
for (const f of readdirSync(`${DIR}/logs`)) evidence[`${DIR}/logs/${f}`] = digest(readFileSync(`${DIR}/logs/${f}`));
for (const f of readdirSync(`${DIR}/renders`)) {
  if (f.endsWith('.mjs')) continue; // tooling, hashed below separately for traceability
  evidence[`${DIR}/renders/${f}`] = digest(readFileSync(`${DIR}/renders/${f}`));
}
// inspection tooling (how the render review ran)
for (const f of ['render-inspect.mjs', 'figure-pixel-check.mjs', 'print-check.mjs', 'write-report.mjs']) {
  evidence[`${DIR}/renders/${f}`] = digest(readFileSync(`${DIR}/renders/${f}`));
}

const report = {
  schema_version: 1,
  course_code: 'GNAS-301',
  unit_no: 3,
  stage: 'G3',
  disposition: 'revise',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:6a12597',
  reviewer_run_id: 'agent-g3-gnas301-u3-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-23T22:15:00Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  rulings: {
    'D-2026-0001': '8ff79df9af668329f6d0094a2257654f45fc545122a753b4888fb9936f402f1f',
    'D-2026-0020': '84634da46e3d983ace09ce20d2ed5ea5e1588f30e1f405e44b62c967585925e7',
    'D-2026-0021': '6004630196719c12ca61d4ed45ed09a2da427c431d666434b6a0221bda078268',
  },
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        "Guide leaf subtopics 5.1-5.2 and 6.1-6.4 (Scheme-and-Course-guides/extracted-text/1st 2026.txt:238-248) map one-to-one to U3-01..U3-06 in specs/content/gnas-301/content-spec.md:514-519; spec status approved (D-2026-0020 + owner resolutions G-2026-22/G-2026-23 + D-2026-0021, 2026-09-23)",
        "Taught sections verified: topic-01.mdx ### Air pollution: causes, effects and control strategies (guide 5.1); topic-02.mdx ### Noise pollution: sources, human health impacts and control measures (5.2); topic-03.mdx ### Health, safety and environment: hazards (6.1, 6.2) and ### Health and environment; environmental safety (6.3); topic-04.mdx ### Hazard identification, risk assessment and the risk management process (6.4)",
        "SLO refs match the spec mapping (topic-01/02 -> SLO:GNAS-301-3-1, topic-03/04 -> SLO:GNAS-301-3-2; content-spec.md:488-490); index.mdx clo_refs list both; guide CLOs 2, 3 and 4 trace as the spec records",
        "Prerequisite and forward cross-references are real: Unit 2's source-pathway-receptor chain reused with air as pathway (topic-01.mdx:37-39); Topic 3.3's hazard cards feed Topic 3.4's grid (topic-04.mdx:24-27 and 67-72); Unit 4's workplace audit builds on Topic 3.4 (index.mdx:52-53, unit-teacher-notes.mdx:66-67)",
      ],
    },
    {
      id: 'sources',
      status: 'pass',
      evidence: [
        "Open-access floor 2 (D-2026-0021) met: anwar2026 and abbasi2022 Crossref-verified 2026-09-23; who-air-2024, who-aqg-2021, who-hearing-2026 and who-occupational-health verified by direct fetch 2026-09-23 with bound excerpts (specs/content/gnas-301/sources/unit-03.md:7-18)",
        "Every in-text citation verified against its bound excerpt: 4.2 million premature deaths in 2019 and 99 per cent above guidelines (sources/texts/who-air-2024.md:12-14 vs topic-01.mdx:54-57); the 2021 AQG as the yardstick controls aim for (who-aqg-2021.md:12-17 vs topic-01.mdx:57); 430 million people incl. 34 million children needing rehabilitation and loud noise a named cause (who-hearing-2026.md:11-14 vs topic-02.mdx:48-50); the occupational-health definition and heat stress/airborne particulates/mental-health concerns (who-occupational-health.md:11-21 vs topic-03.mdx:43-45); winter smog critical for environment and public health in Lahore district with outdoor-working groups studied (anwar2026.md:13-21 vs topic-01.mdx:59-66); Karachi site most common hazards excavation/working practices/PPE plus faulty machinery, found through community and site methods (abbasi2022.md:12-21 vs topic-03.mdx:67-70 and topic-04.mdx:45-46)",
        "Four guide-required monographs (holland-oxford, phoon-chen, shilling, harrington-gill) declared under ## Unverifiable sources with retrieval attempts, the date 2026-09-23 and owner authorisation (D-2026-0001, confirmed G-2026-23/D-2026-0021; sources/unit-03.md:24-46); all four are cited by reference only in Further reading with the flag carried in the learner-facing text; no prose claim rests on them (shilling's title-level U3-05 support is carried in substance by who-occupational-health)",
        "Advisory: the 85 dB sustained-exposure threshold, the decibel-ladder reference values and the cardiovascular/sleep/classroom-learning effects of noise (topic-02.mdx:39-52) are standard mainstream findings stated without false precision but carried by no bound excerpt (who-hearing-2026 supports the hearing-loss scale and noise-as-cause only)",
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        "specs/content/gnas-301/coverage/unit-03.md maps all six sub-topics U3-01..U3-06 to exact topic-file ### headings; each mapping verified against the taught sections",
        "All six guide leaf subtopics taught and assessed: 5.1 -> topic-01 + MCQ 1/2/3, RRQ 1/2/4, ERQ 1; 5.2 -> topic-02 + MCQ 4/5, RRQ 3, ERQ 2; 6.1/6.2 -> topic-03 + MCQ 6/7, RRQ 5/6/7, ERQ 3; 6.3 -> topic-03 + ERQ 3 and ERQ 5; 6.4 -> topic-04 + MCQ 8/9/10, RRQ 8/9/10, ERQ 4; ERQ 5 integrates air, noise and physical hazards through the 3.4 risk cycle",
        "specs/content/gnas-301/concepts/unit-03.md covers 9 concepts with derived assessment IDs that match the bank's numbering; the authored Urdu labels are correctly flagged for G5 review",
      ],
    },
    {
      id: 'assessment',
      status: 'fail',
      evidence: [
        "Independent solve before reading answers: derived MCQ key 1-b, 2-b, 3-c, 4-b, 5-c, 6-b, 7-b, 8-b, 9-c, 10-b and all ten RRQ model answers match the supplied key and schemes (unit-assessment.mdx:142-188); every ERQ analytic rubric totals 10 (1: 3+2+3+2; 2: 3+2+3+2; 3: 3+3+2+2; 4: 3+3+2+2; 5: 2+3+2+2+1) and RRQ mark schemes are arithmetically consistent (no Unit-2-style over-allocation)",
        "MCQ distractors individually sound: MCQ 6's distractors are one real hazard of each other class; MCQ 2/4/5's distractors are the misconceptions actually taught; MCQ 10's 'machinery failures alone' is directly contradicted by the cited study",
        "DEFECT: Topic 3.2 carries only one unit-end RRQ (RRQ 3, noise health impacts). The approved blueprint requires >= 2 MCQ and >= 2 RRQ per topic across 3.1 to 3.4 (content-spec.md:585-588) and the bank's own front matter claims 'at least two MCQs and two RRQs per topic' (unit-assessment.mdx:12). Per-topic RRQ distribution: 3.1 -> RRQ 1, 2, 4; 3.2 -> RRQ 3 only; 3.3 -> RRQ 5, 6, 7; 3.4 -> RRQ 8, 9, 10; the course's own concept graph records the same single mapping (concepts/unit-03.md:19, CON:GNAS-301-3-4 -> RRQ-03 only)",
        "Blueprint items otherwise satisfied: 10/10/5 shape; MCQs per topic 3/2/2/3; one ERQ per topic plus the integrative ERQ 5 taking one school through the full identify-assess-control-monitor sequence at Evaluate; analytic rubric per ERQ; >= 1 Analyze-or-higher ERQ (1 and 3 Analyze; 2, 4, 5 Evaluate)",
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        "Fresh build (logs/build.log EXIT 0; build/ was stale at 16:21 against unit sources at 16:24 and was rebuilt before any inspection) served by docusaurus serve at http://127.0.0.1:4611; inspection in Playwright 1.61.1 chromium at desktop 1280x900, narrow 360x780 and A4 print emulation (logs/render-review.log, renders/render-inspect.json)",
        "All 7 pages: 0 broken images, 0 images without alt text, 0 skipped heading levels, single h1, 0 console errors, no document horizontal overflow at 360px (docScrollWidth 360/360); 8 figures lazy-load with alt text of 81-169 chars and figcaption present (wordmark-only captions are the course convention; no unit in docs/semester-1 or licence/ passes a caption prop)",
        "Content tables measured on the table element itself per the G3 rubric: clientWidth=328, scrollWidth=328 (fits) on every topic at 360px, so no swipe scrolling is required and hydration tabindex/role/aria-label are not needed; figures fit (right edge 344 of 360, wrapper overflow-x visible)",
        "A4 print: no horizontal clipping on any page (docScrollWidth 794), navbar and sidebar display:none, all 8 figures fit width and loaded, answers section present and unclipped in unit-assessment (heading at y=2682, content ends y=4528); print PDFs saved for all 7 pages (renders/print-a4-*.pdf)",
        "node scripts/measure-figure-text.mjs over all 32 committed unit-03 SVGs (light, dark, ur, ur.dark): no text overflow of the 780x470 viewBox, no wordmark collision (logs/measure-figure-text-all.log EXIT 0; fig-U3-2's widest text ends exactly at the 780 edge, within bounds); figure element screenshots carry pixel stdev 34.7-50.5 per channel proving non-blank render, and SVG label extraction confirms each figure's instructional labels (renders/figure-pixel-check.json)",
      ],
    },
    {
      id: 'readability',
      status: 'pass',
      evidence: [
        "HSC-register prose, short sentences, one idea per paragraph; key terms glossary-linked at first use (Air pollution, Noise pollution, Hazard, Health/safety/environment, Environmental safety, Risk) or defined inline in plain language (Particulate matter topic-01.mdx:43-45; Decibel topic-02.mdx:37-39; smog defined operationally through the Lahore case; risk assessment/management taught as the four-step process)",
        "Reading minutes inside the spec budget: topics 15/13/16/15 within per-topic ranges 12-16/10-14/14-18/12-16 (content-spec.md:525-530); unit total 70 (index 5 + topics 59 + assessment 11 + teacher notes 6) within the 65-85 depth budget (content-spec.md:532)",
        "Each topic runs classroom situation -> explanation with worked example and named misconception -> activity -> retrieval -> summary -> self-assessment -> practicum -> summative task with mini-rubric -> further reading",
      ],
    },
    {
      id: 'pedagogy',
      status: 'pass',
      evidence: [
        "Nine-part topic cycle present and correctly ordered in all four topic files (check:depth-gate EXIT 0; heading order confirmed in render inspection)",
        "Activities feasible in their stated Pakistani classroom contexts with ordinary materials: AQI week for a Pakistani city via the usual apps (topic-01, unit-teacher-notes.mdx:49-51), a free sound-meter app on one phone (topic-02, unit-teacher-notes.mdx:53-55), a hazard walk that is observe-only with permission (topic-03, unit-teacher-notes.mdx:57-59), score-and-defend reusing Topic 3.3's cards (topic-04, unit-teacher-notes.mdx:60-62)",
        "One Pakistan-grounded worked example per sub-topic per the spec plan: Lahore winter AQI episode (U3-01), Karachi crossroads school noise readings (U3-02), the Dadu flood-relief camp week sorted into five classes (U3-03/U3-04/U3-05), the hazard-walk cards scored on the grid (U3-06); the spec's lab-shelf suggestion for U3-03 is replaced by the equally grounded Dadu camp, and the farm appears for the chemical class",
        "Spec-listed misconceptions: 4 of 5 addressed with named misconception blocks and teacher-note probes (clean-air-invisible topic-01.mdx:76-78; noise-harmless topic-02.mdx:69-73; hazards-mean-dramatic-accidents topic-03.mdx:87-90; risk-assessment-is-paperwork topic-04.mdx:74-77; hazard-vs-risk taught directly at topic-04.mdx:36-39); 'smog is a winter problem only, and only in Lahore' is addressed nowhere (advisory finding)",
        "Teacher notes follow the guide's teaching-strategy list (1st 2026.txt:320-331), sequence the two-week window as one continuous project (the same five cards through classification, scoring and control), and link the unit's practicals forward to Unit 4's workplace audit",
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      message:
        "Approved blueprint item violated: specs/content/gnas-301/content-spec.md:585-588 requires '>= 2 MCQ and >= 2 RRQ per topic across 3.1 to 3.4', but Topic 3.2 (Noise pollution) carries only one unit-end RRQ (RRQ 3, health impacts) in docs/semester-1/gnas-301/unit-03/unit-assessment.mdx:102-119, while Topics 3.1/3.3/3.4 carry three each. The bank's own front matter claims 'at least two MCQs and two RRQs per topic' (unit-assessment.mdx:12), so the file also contradicts itself, and the course's concept graph records the same single mapping (concepts/unit-03.md:19, CON:GNAS-301-3-4 -> RRQ-03 only). Repair request: add a second Topic 3.2 RRQ within the 10-RRQ budget, for example on control measures at the three links or on interpreting two app readings against the ladder, rebalancing by folding one of Topic 3.1's three RRQs (RRQ 4 overlaps the misconception block and ERQ 1 territory), then update the concept graph's derived assessment IDs and the blooms_summary claim to match the revised bank.",
      resolved: false,
    },
    {
      severity: 'advisory',
      message:
        "Unsourced standard noise-health values: the 85 dB sustained-exposure threshold, the decibel-ladder reference values (whisper 30, conversation 60, busy road 85-95, pressure horn 110+) and the cardiovascular/sleep/classroom-learning effects of noise (topic-02.mdx:39-52, fig-U3-3) are standard mainstream environmental-health findings stated approximately and without false precision, but no bound source carries them: who-hearing-2026 supports the 430/34 million rehabilitation scale and noise-as-cause only. Same class as the Unit 2 unsourced-values advisory. Repair request at next revision: bind a verifiable source for the 85 dB threshold and the non-auditory effects (for example WHO environmental noise guidance) or mark the ladder values as conventional reference values.",
      resolved: false,
    },
    {
      severity: 'advisory',
      message:
        "Loose paraphrase of a cited source: topic-01.mdx:62-63 'with the worst air over the same settled winters' goes beyond anwar2026's bound abstract, which states the study examined 'temporal and spatial variation of the atmospheric pollution over winter seasons (2019-2021)' (sources/texts/anwar2026.md:17-21) without ranking winters or locating the worst air. The substantive claims (smog critical for environment and public health in Lahore district; outdoor-working groups studied directly) are supported. Repair request: reword to what the abstract states, for example 'across the winter seasons it studied'.",
      resolved: false,
    },
    {
      severity: 'advisory',
      message:
        "MCQ key skew: 7 of 10 correct options are b and 3 are c (1-b, 2-b, 3-c, 4-b, 5-c, 6-b, 7-b, 8-b, 9-c, 10-b); no item keys a or d. Each item is individually correct and unambiguous, but the pattern is gameable by a test-wise student. Repair request: redistribute correct options across a-d at the next bank revision (same advisory as Units 1 and 2).",
      resolved: false,
    },
    {
      severity: 'advisory',
      message:
        "Bloom label versus actual demand: MCQ 10 is labelled (Apply) but requires only recalling the Karachi study's finding as taught in Topics 3.3/3.4 (Remember/Understand). Repair request: relabel from the thinking actually required, per the G3 rubric (same advisory class as Unit 2's MCQ 3).",
      resolved: false,
    },
    {
      severity: 'advisory',
      message:
        "Further reading uses bare URLs as link text (topic-01.mdx:139-147, topic-02.mdx:134-137, topic-03.mdx:150-156, topic-04.mdx:139-145). Units 1 and 2 recorded the same advisory and were repaired to descriptive markdown links (for example unit-01 '[WHO Biodiversity fact sheet](...)'), so this is now also a deviation from the established course convention. Repair request: descriptive link text, for example the DOI string or 'WHO Ambient (outdoor) air pollution fact sheet'.",
      resolved: false,
    },
    {
      severity: 'advisory',
      message:
        "Unaddressed spec-listed misconception: 'smog is a winter problem only, and only in Lahore' (content-spec.md:537-540) is addressed nowhere in the unit. Topic 3.1's misconception block covers 'clean air means air you cannot see' and the teacher notes probe four other misconceptions (unit-teacher-notes.mdx:35-45); no passage counters the winter-only/Lahore-only belief, and topic-01.mdx:24-28's framing ('Every winter, schools in Lahore...') could reinforce it. Repair request: one or two sentences in Topic 3.1 noting that air pollution harms year-round and beyond Lahore (ground-level ozone peaks in hot afternoons; other Pakistani cities also exceed the guidelines), or add it to the teacher notes' probe list.",
      resolved: false,
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: `${DIR}/logs/validate-content.log` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${DIR}/logs/check-depth-gate.log` },
    { name: 'check:figures', exit_code: 0, log_path: `${DIR}/logs/check-figures.log` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${DIR}/logs/check-no-em-dash.log` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${DIR}/logs/check-no-answer-keys.log` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${DIR}/logs/check-docs-sync.log` },
    { name: 'check:content', exit_code: 0, log_path: `${DIR}/logs/check-content.log` },
    { name: 'measure-figure-text', exit_code: 0, log_path: `${DIR}/logs/measure-figure-text-all.log` },
    { name: 'site-build', exit_code: 0, log_path: `${DIR}/logs/build.log` },
    { name: 'render-review', exit_code: 0, log_path: `${DIR}/logs/render-review.log` },
  ],
  evidence_manifest: evidence,
};

writeFileSync(`${DIR}/agent-g3-gnas301-u3-run001.json`, JSON.stringify(report, null, 2) + '\n');
console.log('report written:', `${DIR}/agent-g3-gnas301-u3-run001.json`);
console.log('evidence files:', Object.keys(evidence).length);
