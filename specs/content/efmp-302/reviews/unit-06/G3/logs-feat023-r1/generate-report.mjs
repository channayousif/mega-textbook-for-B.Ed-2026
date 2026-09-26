// Assembles agent-g3-efmp302-u6-feat023-r1.json from the review evidence.
// Run from the worktree root. Every hash below is computed from the exact
// bytes on disk at report-writing time.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const LOGS = 'specs/content/efmp-302/reviews/unit-06/G3/logs-feat023-r1';
const RENDERS = 'specs/content/efmp-302/reviews/unit-06/G3/renders-feat023-r1';
const manifest = JSON.parse(readFileSync('specs/content/efmp-302/reviews/unit-06/G3/feat023-r1/manifest.json', 'utf8'));

const evidence = {};
for (const f of readdirSync(LOGS)) evidence[`${LOGS}/${f}`] = sha(join(LOGS, f));
for (const f of readdirSync(RENDERS)) evidence[`${RENDERS}/${f}`] = sha(join(RENDERS, f));

const report = {
  schema_version: 1,
  course_code: 'EFMP-302',
  unit_no: 6,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:15ee421',
  reviewer_run_id: 'agent-g3-efmp302-u6-feat023-r1',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T17:25:11Z',
  completed_at: '2026-09-24T18:01:00Z',
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  rulings: {
    'D-2026-0001': '8ff79df9af668329f6d0094a2257654f45fc545122a753b4888fb9936f402f1f',
    'D-2026-0002': 'd1e0674eb90574a8c84bb9017d74e32fa603e5afd9ddbb4369bb9260a6d8a4f8',
    'D-2026-0004': '752fdc87f405f8effa4fba88cf2cd0cd4f7adb2f7c1fc1c6fd2f8d5df15d330a',
    'D-2026-0005': '5fb7edcbee9f5401f9dece694723e0144cd6762834341e3080fa16128180fe34',
  },
  supersedes: [
    'specs/content/efmp-302/reviews/unit-06/G3/agent-g3-efmp302-u6-run001.json',
    'specs/content/efmp-302/reviews/unit-06/G3/agent-g3-efmp302-u6-run002.json',
    'specs/content/efmp-302/reviews/unit-06/G3/agent-g3-efmp302-u6-run003.json',
    'specs/content/efmp-302/reviews/unit-06/G3/agent-g3-efmp302-u6-run007.json',
  ],
  summary:
    'Fresh G3 on current bytes at commit 15ee421 (feat023 cycle 1). The two 4a3a789 repairs verify (A1: the decision register is bound through the report-level rulings mechanism; P1: fig-U6-5 caption no longer contradicts its Cost column). A2 and P2, which the parent carried as owner-judgement, are in fact REPAIRED in current bytes (A2 by owner decision D-2026-0004 correcting the practicum brief; P2 by commit 9972d70 relabelling MCQ 6 and RRQ 3/4/9 into the approved bands, now enforced by check:bloom-bands). S1 and S2 remain live and blocking (owner-judgement), S3 remains uncertain; eight advisories carry and three new minor advisories were found. Figure-internal geometry measured over all 8 figures x both EN theme variants: zero text-on-text superposition, zero wordmark collisions, zero viewBox escapes, instrument validated by a negative control on the b8f8ffe bytes (25 superpositions flagged there). Disposition escalate: everything except sources passes, and the sources blockers are owner decisions per D-2026-0005.',
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        'Guide section 6 (Scheme-and-Course-guides/extracted-text/1st 2026.txt:898-922): 6.1 (definition/need/principles), 6.2 (preservice, new teacher, experienced), 6.3 (conferences, workshops, online platforms, PLCs, reflective practice tools incl. journals/portfolios/peer feedback/lesson study), 6.4 (bare heading) - every leaf item is taught, mapped one-to-one through content-spec.md "## Unit 6" Sub-topic checklist U6-01..U6-13 (:847-861) and coverage/unit-06.md:14-26 to real "###" sections verified by reading topic-01..04.mdx; U6-12/13 are a declared authored decomposition of the bare 6.4 heading (content-spec.md:843-845)',
        'D-2026-0002 verified on its merits: content-spec.md:829-836 records the one-page plan design with the superseded one-term wording explicitly recorded; topic-04.mdx:131-143 teaches the one-page, twenty-minute, six-block activity; topic-04.mdx:77-79 argues the one-goal rule against the superseded design',
        'A1 REPAIR VERIFIED (run-007 blocking finding): the decision register is now a bound review input via the G-2026-18 remedy - specs/decisions/log.md is a required manifest input (scripts/lib/review-evidence.mjs:165-168) and each report binds the exact ruling entries it cites through the rulings map, enforced by validateReport against the live register (:404-410). This report cites and binds D-2026-0001, D-2026-0002, D-2026-0004 and D-2026-0005',
        'A2 REPAIR VERIFIED (run-007 blocking finding, owner decision made): content-spec.md:156-159 "## Course review plan" > Practicum project ideas now carries the one-page PD plan with the superseded one-activity-per-category wording recorded rather than deleted, per D-2026-0004 (2026-09-20, extends D-2026-0002 course-wide). The course-level brief no longer contradicts what topic-04 teaches',
        'CLO/SLO traces consistent: SLO:EFMP-302-6-1 and -6-2 (content-spec.md:821) trace to guide CLOs 4 and 7 in the guide outcome list (1st 2026.txt:744-764); both SLOs are assessed (6-1 by topics 6.1/6.2 items, 6-2 by topics 6.3/6.4 items and ERQ 5)',
      ],
    },
    {
      id: 'sources',
      status: 'fail',
      evidence: [
        'hennessy2022 INDEPENDENTLY VERIFIED at abstract level via OpenAlex (doi:10.1016/j.caeo.2022.100080, fetched 2026-09-24): abstract present; topic-03.mdx:89-95 reports exactly abstract-level content (limited, often unsustained, frequently not research-informed provision; real potential to extend formal programmes and informal peer learning; mixed outcomes) and no more; the register declaration "Level of support: abstract only" (sources/unit-06.md:41) is honest and complete',
        'kwakman2003 INDEPENDENTLY VERIFIED via OpenAlex (doi:10.1016/S0742-051X(02)00101-4): NO abstract in the record (abstract_inverted_index null), matching the register\'s "no abstract was available"; bibliographic details match (Kwakman, TATE 19(2), 149-170); topic-01.mdx:95-99 cites it only for the question it asks and says so at the point of use',
        'no-external-source register row verified: both passages it names still disclose at the point of use in current bytes (topic-01.mdx:101-106 Pakistani provision; topic-02.mdx:70-73 doctor/teacher comparison)',
        'S1 CARRIED BLOCKING (see findings): coverage/unit-06.md grounds U6-05/U6-06 in day1999 (:18-19), U6-07/U6-08/U6-10 in villegas2003 (:20-21,23) and U6-12/U6-13 in guskey2000 (:25-26), but the named prose sections never cite those sources - day1999 appears once in topic-02.mdx:56-58 inside U6-04 only; villegas2003 is never cited in topic-03 body prose; guskey2000 is never cited in topic-04 body prose. sources/unit-06.md:46-48 asserts the same mappings and acknowledges only the day1999 case (:38)',
        'S2 CARRIED BLOCKING (see findings): topic-01.mdx:61-65 attributes a specific multi-level evaluation argument to Guskey (2000) and :113-115 attributes the six-principles convergence to Villegas-Reimers (2003); both keys are declared unretrievable (sources/unit-06.md:37,39) with no level-of-support statement and no point-of-use uncorroborated disclosure, which D-2026-0001\'s Limits retain as a failure',
        'S3 CARRIED UNCERTAIN (see findings): no bound source text exists for any of Unit 6\'s six keys (sources/texts/ holds 13 excerpt files, none of them Unit 6 keys); the four print/report sources could not be read by this host (villegas2003: unesdoc HTTP 403 reproduced 2026-09-24; IIEP catalogue page resolves and describes a 196-page freely downloadable electronic publication)',
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'All 13 sub-topics U6-01..U6-13 map one-to-one to real "###" sections under "## Explanation" in the named topic file, verified by reading each section against coverage/unit-06.md:14-26; topic partition matches content-spec "### Topic list" (:869-874): 6.1 = U6-01..03, 6.2 = U6-04..06, 6.3 = U6-07..11, 6.4 = U6-12..13',
        'Bank reaches every topic per the content-spec.md:924-930 blueprint: MCQ 1-4 / RRQ 1-3 / ERQ 1 (6.1), MCQ 5-6 / RRQ 4-6 / ERQ 2 (6.2), MCQ 7-8 / RRQ 7-8 / ERQ 3 (6.3), MCQ 9-10 / RRQ 9-10 / ERQ 4 (6.4), plus integrative ERQ 5 - at least 2 MCQ and 2 RRQ per topic as required; both SLOs assessed',
        'est_reading_minutes 7+23+20+25+22+25+11 = 133, inside the 120-170 depth budget; each topic inside its per-topic band (6.1: 23 in 18-25; 6.2: 20 in 17-24; 6.3: 25 in 22-30; 6.4: 22 in 16-23)',
        'check:depth-gate exit 0 (logs-feat023-r1/check-depth-gate.log: concept coverage, required blocks, formative floor, reading-minutes band, coverage-sources consistency)',
        'Minor observation recorded as an advisory finding: U6-07 (Conferences) is the only sub-topic with no dedicated bank item; it is assessable only through the routes-comparison set (MCQ 7 distractor, ERQ 3 three-route comparison, CON:EFMP-302-6-10 linkage)',
      ],
    },
    {
      id: 'assessment',
      status: 'pass',
      evidence: [
        'MCQ bank solved before reading the key; derivation with per-item prose citations written first at logs-feat023-r1/independent-assessment-derivation.md (with the disclosed caveat that run-007\'s recorded key sequence was part of the parent-supplied prior record). Derived 1a 2d 3c 4b 5c 6a 7d 8b 9c 10a; supplied key at unit-assessment.mdx:187-199 is identical; each keyed answer verified defensible against topic prose; distractors plausible; no ambiguous MCQ stem found',
        'RRQ model answers and mark schemes (unit-assessment.mdx:203-245) match independently derived content on all ten; RRQ 7\'s pairing ambiguity is explicitly neutralised (:231-232 "Award the pairing mark for any answer matching topic-03\'s three principles"); RRQ 4\'s split is now an unambiguous 2/2/2 (:214-217), resolving run-007 P7',
        'P2 REPAIR VERIFIED (run-007 blocking finding): the Bloom labels now honour the approved band (content-spec.md:925-927 "MCQs (10): Remember to Apply", "RRQs (10): Understand to Analyze"). MCQ 6 is (Understand) (unit-assessment.mdx:90) and RRQ 3/4/9 are (Understand) (:131,:134,:150), each now carrying the explanation clause commit 9972d70 added; their combined marks dropped from 27 of 66 to 24 of 63 (18 recall + 6 explanation). The frontmatter blooms_summary (:9) now agrees with both the spec band and the item labels - the three-way disagreement run-007 found is gone. check:bloom-bands exit 0 over 400 items (logs-feat023-r1/check-bloom-bands.log). Demand-vs-label judged defensible: each relabelled RRQ contains an explain clause; MCQ 6 requires discriminating the inverse-arrangement explanation among plausible distractors',
        'ERQ rubrics (unit-assessment.mdx:249-295): five items x four criteria x 5 marks with the stated floor "A response not reaching Adequate on the analysis, evaluation or creation criterion cannot exceed 10 overall"; bands discriminate performance; ERQ 1/3/5 require genuine Create work and ERQ 5 is integrative across the course',
        'P6 CARRIED ADVISORY (see findings): concepts/unit-06.md:28 maps CON:EFMP-302-6-12 "Reflective practice as method" to RRQ-08, but RRQ 8 (:145-146) assesses the LMIC technology review and Pakistani online-platform constraints (U6-09), leaving reflective-practice-as-method with no assessment item',
        'New advisory (see findings): RRQ 4\'s stem phrase "the new-teacher transition frees attention" is ambiguous between the transition into and out of the new teacher stage; the mark scheme reads the out-reading, which is the one topic-02 supports',
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        'Rendered input identity and setup: build/ regenerated from worktree HEAD 15ee421 (npm run build exit 0, BOTH locales - "build" and "build/ur"; logs-feat023-r1/build.log), served at http://127.0.0.1:8124, inspected in bundled Chromium 149.0.7827.0 via playwright-core at desktop 1280x900, narrow 360x740/780, and print 794px A4. Composite inspection record: logs-feat023-r1/render-review.log',
        'Headings: no skipped levels on any of the six pages at any viewport (render-inspect.log section A); no vague link text; alt text present on all 16 figure imgs, identical to the Alt text column of specs/content/efmp-302/figures/unit-06.md, with the dark variant display:none so exactly one is exposed',
        'NARROW 360px MEASURED ON THE SCROLLER ITSELF (g3.md rule; render-inspect.log section B): the five ERQ rubric tables on unit-assessment are TABLE scrollers (client 328, scroll 439-524, tabindex=0, role=region, aria-label) and the topic figures are FIGURE.figure scrollers (client 328, scroll 880-936); content swipe-reachable, keyboard attributes present; documentElement overflow 0px on every page',
        'A4 PRINT (render-inspect.log section C): clippedElems=0 on all six pages; every figure fits (640-760px wide in a 794px page); "Answers and marking guidance", "MCQ answer key", "RRQ model answers and mark schemes" and "ERQ rubrics" all present in print',
        'FIGURE-INTERNAL TEXT GEOMETRY (the G-2026-62 requirement; logs-feat023-r1/figure-geometry-overlap.log + .json): rendered-DOM leaf-text bounding boxes measured over all 8 unit-06 figures x both EN theme variants (16 SVGs): ZERO text-on-text superposition (0 pairs, 0 near-misses), ZERO wordmark collisions, ZERO viewBox escapes. Instrument validated by negative control on the b8f8ffe-era bytes of fig-U6-2/fig-U6-6, where it flags 25 stacked-baseline superpositions (negative-control-b8f8ffe.log); the 69bae9e revert is therefore verified for this unit by direct measurement, not by report',
        'fig-U6-6 "did not load" (render-inspect\'s single flagged defect, its exit code) DISMISSED WITH EVIDENCE: the image sits 3912px down topic-03; before scrolling the lazy img is legitimately unfetched (naturalWidth 0), after scrollIntoView it fetches HTTP 200 and renders 300x147 complete with zero failed requests (fig-u6-6-load-check.log; in-page screenshot renders-feat023-r1/fig-U6-6-inpage-desktop.png). A measurement race in the tool, not a content defect',
        'measure-figure-text exit 0 over all 16 SVGs (widest text 924.3 of 936 on fig-U6-5; no wordmark overprint) - logs-feat023-r1/measure-figure-text.log',
        'X1, X2, X3 carried advisories confirmed live by this run\'s own measurements (identical accessible names on the five rubric tables; fig-U6-2 four dashed boxes 15.4-25.2 units narrower than their text in both variants, escaped text fully inked and legible per pixel probe; table figures at 640px desktop scale ~7.5px effective body text). New cosmetic advisory: fig-U6-3 transition labels graze adjacent stage-box fills by 7-10px, legible',
        'Session limitation disclosed: the reviewer\'s image-viewing tool returned no visual content in this session, so inspection is numeric/DOM/pixel measurement of the actual rendered pages (geometry, ink density, naturalWidth, scrollWidth, heading order, alt text, clipping); all artifacts are saved under renders-feat023-r1/ for human audit',
      ],
    },
    {
      id: 'readability',
      status: 'pass',
      evidence: [
        'Every technical term defined at first use before it is used: continuous professional development (topic-01.mdx:40-42), professional learning community (topic-03.mdx:110-112), reflective practice (topic-03.mdx:138-139), professional development plan (topic-04.mdx:42-44); all four resolve in glossary.json with definitions that agree with the unit prose',
        'Each topic opens on a concrete named classroom situation before any abstraction: Mr Naeem\'s eleven certificates (topic-01:26-34); Sana, Imran and Mrs Aslam in one in-service session (topic-02:26-39); the head teacher with twelve teachers and a small budget (topic-03:26-35); Miss Hina\'s six goals in September (topic-04:26-36)',
        'No specialist prior knowledge assumed beyond Units 1-5, named explicitly (index.mdx:51-55); abstractions consistently cashed out in classroom terms ("not \'questioning\' but \'in Class 7, the same four pupils answer every question\'", topic-04.mdx:46-48)',
        'Sentence and paragraph length stay in the HSC/intermediate range throughout; check:no-em-dash exit 0 (logs-feat023-r1/check-no-em-dash.log)',
        'P5 carried advisory (see findings): two reviewer-register disclosure sentences sit inside learner prose (topic-01.mdx:97-99; topic-03.mdx:90-91); the request is to keep the disclosure and rewrite it in the student register',
      ],
    },
    {
      id: 'pedagogy',
      status: 'pass',
      evidence: [
        'P1 REPAIR VERIFIED (run-007 blocking finding): fig-U6-5\'s committed caption now reads "The highlighted row satisfies five of the six principles by its structure alone; only teacher choice depends on how the school sets it up. Its cost is time rather than money, which is why it fails first when time is not protected." - consistent with the PLC row\'s Cost cell "Low money, high time" and Cannot-do cell "Work without protected time", and it no longer claims the PLC "costs the least money" against Reflective tools\' "Almost none". Verified in both theme variants; the five-of-six count stays consistent across figure, topic-03.mdx:117-118 and the MCQ 7 key',
        'Progression complete in all four topics: classroom situation -> explanation -> named misconception -> timed group activity (25/25/30/35 minutes) -> "Check your understanding" (6 Bloom-labelled items each) -> summary -> self-assessment checklist -> practicum transfer task -> summative task with mini-rubric; check:depth-gate enforces the required blocks (exit 0)',
        'Activities are feasible in the stated Pakistani/Sindhi government-school context, costed in time, and need no materials a trainee lacks; topic-03\'s budget activity and topic-04\'s paired attack on four named questions give usable instructions',
        'Conceptual depth rather than length: the six principles each stated WITH what they rule out; the stage model qualified against misuse ("Use the model to locate what you need, not to categorise people", topic-02.mdx:120-123); lesson study taught through its counter-intuitive rule (observers watch the pupils, topic-03.mdx:163-170)',
        'The closing unit integrates Units 1-5: index.mdx:20-26 opens on the promissory notes of Units 1/3/4/5; topic-04.mdx:113-129 "Closing: what this course was for" recaps all five units and lands on the one-page plan; ERQ 5 requires substantive use of at least three earlier units',
        'P3 and P4 carried advisories (see findings): the "development is what a system provides" misconception appears only in unit-teacher-notes.mdx:51-54; and "identity" occurs zero times in the unit while content-spec.md:141-142 claims the identity through-line for Unit 6',
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: false,
      message:
        'S1 SOURCES, carried unresolved from run-007 (owner-judgement; re-verified live in current bytes). coverage/unit-06.md grounds seven of its thirteen rows in sources the named prose sections never cite: U6-05 and U6-06 in day1999 (coverage/unit-06.md:18-19), U6-07, U6-08 and U6-10 in villegas2003 (:20-21,23), and U6-12 and U6-13 in guskey2000 (:25-26). Verified in current bytes: day1999 is cited exactly once in topic-02.mdx:56-58, inside "### The preservice stage" (U6-04); villegas2003 is never cited in topic-03.mdx body prose (the Conferences, Workshops and Professional learning communities sections cite nothing); guskey2000 is never cited in topic-04.mdx body prose. sources/unit-06.md:46-48 asserts the same mappings in its Supports column and acknowledges only the day1999 case (:38). Unretrievability is not the defect; the mapping is, and D-2026-0001 does not shelter it. Not repairable within this cycle without an owner decision on what a guide-required but unread reading may ground.',
    },
    {
      severity: 'blocking',
      resolved: false,
      message:
        'S2 SOURCES, carried unresolved from run-007 (owner-judgement; re-verified live in current bytes). Two substantive attributions to declared-unretrievable sources carry no level-of-support declaration and no point-of-use uncorroborated disclosure, which D-2026-0001\'s Limits and the G3 rubric both retain as a failure. (a) topic-01.mdx:61-65: "Guskey (2000) ... argues that evaluation must reach beyond participants\' satisfaction and even beyond what they learned, to whether their practice changed and whether pupils\' outcomes changed" - a specific multi-level argument attributed to a text the register says was never obtained (sources/unit-06.md:37); MCQ 2 keys on it. (b) topic-01.mdx:113-115: "The international review literature on teacher development, including Villegas-Reimers\' survey for UNESCO\'s International Institute for Educational Planning (2003), converges on a recognisable set" - the spine of U6-03, assessed by MCQ 4, MCQ 7 and RRQ 3; its register bullet (sources/unit-06.md:39) declares the text unretrievable with no level of support. Contrast hennessy2022 ("Level of support: abstract only", independently verified this run) and kwakman2003 (in-line question-only disclosure, independently verified this run), both of which pass. Owner decision needed: disclose at the point of use in the student register, re-ground, or accept reading-list reputation as the basis.',
    },
    {
      severity: 'uncertain',
      resolved: false,
      message:
        'S3 SOURCES, carried unresolved from run-007 (re-verified live). No source text is bound for ANY of Unit 6\'s six keys: specs/content/efmp-302/sources/texts/ holds thirteen excerpt files and none of them is guskey2000, day1999, villegas2003, brookfield2017, hennessy2022 or kwakman2003. hennessy2022 (abstract) and kwakman2003 (record plus absent abstract) were independently verified this run via OpenAlex; the four print/report sources could not be read, so support for claims resting on them is unverified rather than verified. Under D-2026-0001 this does not by itself fail sources, and equally cannot contribute to a pass. Note for the parent: the review handoff listed suarez2022 among Unit 6\'s "cited excerpts"; Unit 6 does not cite suarez2022 anywhere in its docs, coverage or sources files (grep returns nothing) - suarez2022.md is another unit\'s excerpt.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'S4 SOURCES, carried unresolved from run-007 (re-verified live). sources/unit-06.md:39 describes villegas2003 as a "Print-only book, not retrievable by the reviewing host". The IIEP catalogue page resolves and describes a 196-page electronic publication with a free "Download the publication" link; unesdoc returns HTTP 403 to this host (reproduced 2026-09-24). "Unretrievable by this host" is correct; "print-only book" is not, and the same file\'s Verification-method preamble contradicts it ("print books or a UNESCO report"). The bullet should name the actual blocker, as the hennessy2022 bullet does.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'X1 ACCESSIBILITY, carried unresolved from run-007 (confirmed live by measurement). At 360px the five ERQ rubric tables on unit-assessment expose five identical accessible names, "Scrollable table, scroll sideways to see all columns" (client 328, scroll 439-524), and the topic figures share "Scrollable figure, scroll sideways to see the whole diagram". A screen-reader user listing regions cannot tell which rubric or figure is which. The names come from the site components (src/theme/DocItem/Content.tsx and the Figure component), not from unit content, so this is not repairable by the unit author; recorded for the platform owner.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'X2 ACCESSIBILITY, carried unresolved from run-007 (confirmed live by this run\'s own geometry measurement, both theme variants). In fig-U6-2 four of the six dashed "rules out" boxes are narrower than the text inside them: "rules out: training away from the pupils you teach" ends 25.2 user units past the box\'s right edge, "...generic sessions on teaching in general" +23.7, "...advice about a lesson nobody watched" +20.2, "...the assigned course nobody asked for" +15.4 (logs-feat023-r1/figure-geometry-overlap.log). No text crosses the viewBox (widest 912.2 of 924) and the pixel probe confirms the escaped text is fully inked and legible on the background, so nothing is clipped and the instructional meaning is recoverable; the principle-to-exclusion pairing just looks broken. Severity remains advisory.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'X3 ACCESSIBILITY, carried unresolved from run-007 (re-measured live). The table-archetype figures are the smallest effective text in the unit on desktop: at 1280x900 fig-U6-5 displays 640px against a 936-unit viewBox (scale 0.684, about 7.5px effective for 11px body text) and fig-U6-1/2/4/7 render 640px against 880-924 (about 7.6-7.8px); the timeline and flowchart carriers render 703px (8.6-8.8px). At 360px the figures render at full intrinsic width inside the scroll container, so mobile readers get larger text than desktop (logs-feat023-r1/figure-displayed-size.log).',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'P3 PEDAGOGY, carried unresolved from run-007 (re-verified live). Of the five misconceptions in content-spec.md:883-886, four are named and repaired in learner-facing prose (topic-01.mdx:67-69, topic-02.mdx:114-118, topic-03.mdx:143-145, topic-04.mdx:106-111). The fifth, "development is what a system provides, so if none is provided none happens", appears only at unit-teacher-notes.mdx:51-54, which learners do not read; it is the misconception most directly answered by Topic 6.3\'s PLC and reflective-tools material and would cost little to name there.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'P4 PEDAGOGY, carried unresolved from run-007 (re-verified live). content-spec.md:141-142 lists "Teacher identity is developed, not fixed ... (Units 1, 3, 6)" as a course through-line, but the string "identity" occurs zero times anywhere under docs/semester-1/efmp-302/unit-06/ (checked across all seven files). topic-04.mdx:113-129 "Closing: what this course was for" recaps Units 1-5 without it. Either the closing recap should carry the identity thread or the through-line should stop claiming Unit 6.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'P5 READABILITY, carried unresolved from run-007 (re-verified live). Two sentences addressed to a reviewer sit inside learner prose: topic-01.mdx:97-99 ("Note that this unit cites that work only for the question it asks; its abstract was not available when this unit was written, so no finding from it is claimed here") and topic-03.mdx:90-91 ("Note that scope: this is the right literature for this sub-topic, unlike a general claim about online learning."). These are also the D-2026-0001 point-of-use disclosures, so the request remains: keep the disclosure, rewrite it in the register a student reads.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'P6 ASSESSMENT, carried unresolved from run-007 (re-verified live). concepts/unit-06.md:28 maps CON:EFMP-302-6-12 "Reflective practice as method" to RRQ-08, but RRQ 8 (unit-assessment.mdx:145-146) assesses the LMIC technology review and two Pakistani constraints on online platforms - U6-09 / CON-6-10 territory. Reflective-practice-as-method, a named misconception and a full sub-topic (U6-11), is left with no assessment item while RRQ 8 is attributed to a concept it does not test. check:concept-graph passes because the linkage is well-formed, not because it is semantically right.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'NEW ASSESSMENT observation (this run). U6-07 (Conferences) is the only sub-topic with no dedicated bank item: MCQ 7 uses "a conference" only as a distractor, RRQ 7-8 assess workshops and online platforms, and ERQ 3\'s "compare at least three routes" can be answered without touching conference-specific content (highest cost per teacher, exposure value for an isolated rural teacher). The topic-level blueprint (>= 2 MCQ and 2 RRQ per topic) is met and run-007 passed coverage on the same shape, so this is an observation for the owner\'s content-improvement loop, not a breach.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'NEW ASSESSMENT wording (this run). RRQ 4\'s stem (unit-assessment.mdx:133-134) says "explain why the new-teacher transition frees attention rather than adding knowledge". The natural reading of "the new-teacher transition" is the transition INTO the new teacher stage, at which topic-02 says attention is consumed, not freed; the mark scheme (:214-217) reads it as the transition OUT of that stage ("mechanics become automatic and attention is freed"), which is the reading the prose supports. A student reading the stem the natural way will answer about the wrong transition. Suggest "the transition out of the new teacher stage" or equivalent.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'NEW ACCESSIBILITY observation (this run). In fig-U6-3 (both variants) the two transition labels graze the adjacent stage-box fills: "from observing" extends about 10px into the Preservice box\'s corner and "from surviving" about 7px into the Experienced box\'s left edge (logs-feat023-r1/figure-geometry-overlap.log; pixel probe confirms 30-35% ink over the light fill, fully legible). Cosmetic only - no text-on-text contact, no clipping; same reported-not-failed class as the shape-wordmark grazes G-2026-62 records.',
    },
    {
      severity: 'blocking',
      resolved: true,
      message:
        'RESOLVED - run-007 A1 (the decision register was not a bound review input). The bundle gap is closed by the G-2026-18 remedy: specs/decisions/log.md is now a required manifest input (scripts/lib/review-evidence.mjs:165-168) and each report binds the exact ruling entries it cites through the rulings map, which validateReport checks against the live register (:404-410). That is strictly stronger than the whole-file digest run-007 asked for: a changed ruling still invalidates the reports that rested on it, while an unrelated new entry does not. This report reads D-2026-0001, D-2026-0002, D-2026-0004 and D-2026-0005 directly and binds their digests.',
    },
    {
      severity: 'blocking',
      resolved: true,
      message:
        'RESOLVED - run-007 A2 (the superseded one-activity-per-category design survived in the course review plan). content-spec.md:156-159 now carries the one-page PD plan design in "## Course review plan" > Practicum project ideas, with the superseded "naming one activity from each \'ways to continue developing\' category" wording recorded rather than deleted, per owner decision D-2026-0004 (2026-09-20, "D-2026-0002 extends beyond Unit 6"). Verified against current bytes; the course-level brief no longer contradicts topic-04.mdx:77-79. This is exactly the owner decision run-007 requested.',
    },
    {
      severity: 'blocking',
      resolved: true,
      message:
        'RESOLVED - run-007 P1 (fig-U6-5\'s caption contradicted its Cost column). The committed caption now reads "The highlighted row satisfies five of the six principles by its structure alone; only teacher choice depends on how the school sets it up. Its cost is time rather than money, which is why it fails first when time is not protected." - consistent with the PLC row\'s Cost cell "Low money, high time" and its Cannot-do cell "Work without protected time", and it no longer claims the PLC "costs the least money" against Reflective tools\' "Almost none". Verified by reading the committed SVG text runs in both theme variants (repair 4a3a789, preserved by the 69bae9e revert). The five-of-six principle count remains consistent across figure, prose (topic-03.mdx:117-118) and the MCQ 7 key.',
    },
    {
      severity: 'blocking',
      resolved: true,
      message:
        'RESOLVED - run-007 P2 (blueprint breach: MCQ 6 above the Apply ceiling and RRQ 3/4/9 below the Understand floor, carrying 27 of 66 RRQ marks). Repaired in commit 9972d70 (2026-09-20): MCQ 6 relabelled (Analyze) to (Understand), matching its actual demand; RRQ 3, 4 and 9 relabelled (Remember) to (Understand), each gaining the explanation clause it now carries (the one-day workshop vs the sustained principle; the transition freeing attention rather than adding knowledge; September-fixed evidence separating a plan from an intention), with their combined marks dropping from 27 of 66 to 24 of 63 (18 recall + 6 explanation). Verified in current bytes: every MCQ label sits within the spec\'s Remember-to-Apply band and every RRQ within Understand-to-Analyze; the frontmatter blooms_summary (unit-assessment.mdx:9) now agrees with both the band and the items - the three-way disagreement run-007 found is gone; check:bloom-bands exits 0 over 400 items (logs-feat023-r1/check-bloom-bands.log).',
    },
    {
      severity: 'advisory',
      resolved: true,
      message:
        'RESOLVED - run-007 P7 (RRQ 4\'s mark scheme spread 3 marks across two named transitions with no stated split). The scheme is now an unambiguous 2/2/2: stages (2), the two transitions (2), the frees-attention explanation (2) - unit-assessment.mdx:214-217.',
    },
    {
      severity: 'uncertain',
      resolved: true,
      message:
        'RESOLVED for this submission - run-007 A3 (repair-cycle limit). Feature 023 is a new submission with its own two-cycle budget per unit (specs/023-author-efmp-302/spec.md: "two repair-and-review cycles run per unit before the remainder escalates under the G-block"); this review is Unit 6\'s feat023 cycle 1, and the inputs have changed since run-007 (figure revert 69bae9e, Bloom-band repair 9972d70, D-2026-0004 practicum repair), so it is not an unchanged-input retry. D-2026-0005\'s refusal to authorise further cycles for the prior submission\'s findings stands, and its Limits clause (a specific unit may be granted a specific additional cycle by the owner) is what the feat023 mandate is; Units 2-5 ran the same feat023 cycles. The carried S1/S2/S3 route to the owner per D-2026-0005, which is what this report\'s escalate disposition does.',
    },
    {
      severity: 'uncertain',
      resolved: true,
      message:
        'RESOLVED - run-007 A4 (author run identity). The parent supplied author_run_id commit:15ee421, verified as this worktree\'s HEAD - the committed state the manifest enumerates; distinct from the reviewer run identity. No identity was fabricated.',
    },
    {
      severity: 'advisory',
      resolved: true,
      message:
        'CARRIED-FORWARD VERIFIED - run-007\'s other resolved findings remain resolved in current bytes: the hennessy2022 duplicate register bullet is still gone (exactly six bullets for six keys, sources/unit-06.md:37-42); the no-external-source register row still names both passages and still discloses that MCQ 5 keys on the second (:52); both point-of-use disclosures are still present (topic-01.mdx:104-106, topic-02.mdx:72-73); fig-U6-5\'s two-line caption still fits its viewBox (widest text 924.3 of 936, logs-feat023-r1/measure-figure-text.log).',
    },
    {
      severity: 'advisory',
      resolved: true,
      message:
        'INPUT BINDING VERIFIED. The prepared manifest (specs/content/efmp-302/reviews/unit-06/G3/feat023-r1/manifest.json) was verified with inputManifest() from scripts/lib/review-evidence.mjs rather than by hand: 101 bound paths recomputed at HEAD 15ee421, zero path differences and zero digest differences, and skillDigest(root,"G3") matches the manifest\'s skill_digest. A first raw-SHA-256 pass appeared to show 8 mismatches; that was this reviewer\'s error, not a bundle defect - the library slices content-spec.md to the unit\'s own "## Unit 6" section (ADR-0027) and normalises the mdx translation_status line before hashing. git status clean apart from the untracked review-output directories.',
    },
    {
      severity: 'advisory',
      resolved: true,
      message:
        'INDEPENDENCE. This session did not author or translate any reviewed byte. The 25 assessment items were derived and written down (logs-feat023-r1/independent-assessment-derivation.md) before unit-assessment.mdx:183-295 ("## Answers and marking guidance") was opened. Disclosed caveat: the parent\'s handoff included the run-007 report, whose evidence text records its derived MCQ key sequence, so the MCQ derivation cannot claim blindness to that sequence; every item was nevertheless re-derived from the current prose with the supporting passage cited, and the RRQ/ERQ content expectations were derived without any prior key.',
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: `${LOGS}/validate-content.log` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${LOGS}/check-depth-gate.log` },
    { name: 'check:figures', exit_code: 0, log_path: `${LOGS}/check-figures.log` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${LOGS}/check-no-em-dash.log` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${LOGS}/check-no-answer-keys.log` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${LOGS}/check-docs-sync.log` },
    { name: 'check:bloom-bands', exit_code: 0, log_path: `${LOGS}/check-bloom-bands.log` },
    { name: 'check:concept-graph', exit_code: 0, log_path: `${LOGS}/check-concept-graph.log` },
    { name: 'check:source-floor', exit_code: 0, log_path: `${LOGS}/check-source-floor.log` },
    { name: 'site-build', exit_code: 0, log_path: `${LOGS}/build.log` },
    { name: 'render-inspect', exit_code: 1, log_path: `${LOGS}/render-inspect.log` },
    { name: 'render-review', exit_code: 0, log_path: `${LOGS}/render-review.log` },
    { name: 'measure-figure-text', exit_code: 0, log_path: `${LOGS}/measure-figure-text.log` },
    { name: 'figure-geometry-overlap', exit_code: 0, log_path: `${LOGS}/figure-geometry-overlap.log` },
    { name: 'negative-control-b8f8ffe', exit_code: 0, log_path: `${LOGS}/negative-control-b8f8ffe.log` },
    { name: 'fig-u6-6-load-check', exit_code: 0, log_path: `${LOGS}/fig-u6-6-load-check.log` },
    { name: 'figure-displayed-size', exit_code: 0, log_path: `${LOGS}/figure-displayed-size.log` },
    { name: 'pixel-probe', exit_code: 0, log_path: `${LOGS}/pixel-probe.log` },
  ],
  command_notes: [
    'All six contract-required content gates exit 0. check:bloom-bands, check:concept-graph and check:source-floor are supplementary gates run because they directly evidence the P2 re-verification and the concept-graph and source-floor claims.',
    'site-build is a single `npm run build`, which the site config runs for BOTH locales: "[en] ... Generated static files in build" then "[ur] ... Generated static files in build/ur" (build.log).',
    'render-inspect exited 1 on its single flagged defect, "topic-03: visible image did not load: fig-U6-6.svg". That defect was investigated and dismissed with evidence: fig-U6-6 sits 3912px down the unit\'s longest page, is loading=lazy, and is legitimately unfetched until scrolled into view; after scrollIntoView it returns HTTP 200 and renders complete at 300x147 with zero failed requests (fig-u6-6-load-check.log, in-page screenshot saved). The exit code is recorded as it occurred; the composite render-review log documents the full inspection and this disposition.',
    'figure-geometry-overlap is this run\'s G-2026-62 instrument: rendered-DOM leaf-text bounding boxes over all 8 figures x both EN theme variants, pairwise text-on-text intersection, wordmark collision, rect containment and viewBox escape. negative-control-b8f8ffe runs the same instrument against the known-broken b8f8ffe bytes and flags 25 superpositions, validating the instrument; the current bytes measure zero.',
    'pixel-probe is a PIL-based ink-density probe of the flagged regions (fig-U6-2 escape strip, fig-U6-3 graze, dark-variant colour check). figure-displayed-size measures the CSS display size of every figure at desktop and narrow viewports.',
    'Session limitation, disclosed: the reviewer\'s image-viewing tool returned no visual content for PNGs in this session, so no subjective eyeball pass was possible; the rendered inspection is entirely numeric/DOM/pixel measurement of the actual rendered pages, with all PNG/PDF artifacts saved under renders-feat023-r1/ for human audit.',
  ],
  evidence_manifest: evidence,
};

const out = 'specs/content/efmp-302/reviews/unit-06/G3/agent-g3-efmp302-u6-feat023-r1.json';
writeFileSync(out, JSON.stringify(report, null, 2) + '\n');
console.log('wrote', out);
console.log('criteria:', report.criteria.map((c) => `${c.id}=${c.status}`).join(' '));
console.log('findings:', report.findings.length, '(', report.findings.filter((f) => !f.resolved && f.severity === 'blocking').length, 'unresolved blocking,', report.findings.filter((f) => !f.resolved && f.severity === 'uncertain').length, 'unresolved uncertain,', report.findings.filter((f) => !f.resolved && f.severity === 'advisory').length, 'unresolved advisory )');
console.log('evidence files:', Object.keys(evidence).length);
console.log('PNG evidence:', Object.keys(evidence).filter((p) => /\.png$/.test(p)).length);
