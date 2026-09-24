#!/usr/bin/env node
// Assemble the G3 report for GQUR-300 Unit 4, run agent-g3-gqur300-u4-run001.
// Hashes the exact saved evidence bytes and writes the contract-shaped report.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const root = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-affcb48d7818e8183';
const sha256 = (p) => createHash('sha256').update(readFileSync(resolve(root, p))).digest('hex');

const LOGS = 'specs/content/gqur-300/reviews/unit-04/logs-agent-g3-gqur300-u4-run001';
const RENDERS = 'specs/content/gqur-300/reviews/unit-04/renders-agent-g3-gqur300-u4-run001';

// 1. Evidence manifest: every saved log, script, render and PDF of this attempt.
const evidence = {};
for (const f of readdirSync(resolve(root, LOGS)).sort()) evidence[`${LOGS}/${f}`] = sha256(`${LOGS}/${f}`);
for (const f of readdirSync(resolve(root, RENDERS)).sort()) evidence[`${RENDERS}/${f}`] = sha256(`${RENDERS}/${f}`);

// 2. Input manifest: the parent's prepared manifest, independently recomputed and
// verified identical (input-binding-verification.txt, 96 inputs, 0 mismatches).
const prepared = JSON.parse(readFileSync(resolve(root, 'specs/content/gqur-300/reviews/unit-04/G3/manifest.json'), 'utf8'));

const report = {
  schema_version: 1,
  course_code: 'GQUR-300',
  unit_no: 4,
  stage: 'G3',
  disposition: 'revise',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:93e6321',
  reviewer_run_id: 'agent-g3-gqur300-u4-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T00:14:00Z',
  completed_at: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
  skill_digest: prepared.skill_digest,
  input_manifest: prepared.input_manifest,
  rubric_version: '1.0.0',
  skill_version: '1.1.0',
  reviewed_commit: 'c79c453ab3843939fed693a5595d9f68b952605a',
  prepared_manifest: 'specs/content/gqur-300/reviews/unit-04/G3/manifest.json',
  superseded_reports: [],
  summary: `G3 English review of GQUR-300 Unit 4 (Measurement and Geometry) against the bound course guide (Scheme-and-Course-guides/extracted-text/1st 2026.txt:546-680, Unit 4 leaves), the content spec's ## Unit 4 subsection, coverage matrix, sources list, figure manifest, concept graph, style guide v4.5 and contracts. All 96 bound inputs were digest-verified against the parent's prepared manifest by independent recomputation with inputManifest() at HEAD c79c453: zero missing, zero extra, zero digest mismatches, skill digest matching, bound tree clean. The unit's prose was authored at 2e906f2; fig-U4-6's overflow fix landed at 93e6321 (author run identity).

Disposition is revise, with three blocking defects, each with a precise location and repair.

First, ERQ-4's rubric (docs/semester-1/gqur-300/unit-04/unit-assessment.mdx:204-209, the Re-measure analysis criterion) inverts the analysis it rewards. With the store's size fixed, the open tileable area is 600 - 20 = 580 square metres wherever the store sits - the rubric's own Tiles criterion computes exactly that, with no position term - while the skirting line around the open region is the position-sensitive quantity (the rubric's own Skirting criterion concedes the notch 'adds or subtracts a few metres'). The rubric instead awards 0-3 for asserting that 'the tiles depend on the open area, which changes with the store's position ... the boundary is unaffected by where the store sits inside it', the opposite of the arithmetic and internally contradictory with the rubric's own Skirting and Tiles criteria. A trainee giving the correct analysis (tiles invariant under position change; skirting position-sensitive) would be marked down. Repair: invert the expected analysis, or re-frame the item so the intended answer is mathematically sound.

Second, topic-01's bunting worked example (docs/semester-1/gqur-300/unit-04/topic-01.mdx:56-57) states that 'the classic school mistake is dividing 15 by 250 directly and ordering 17 rolls'. 15 / 250 = 0.06; the 17-roll outcome arises from dividing 250 by 15 (16.67 rounded up). The sentence misdescribes the very error it warns against, and a trainee who checks it finds the claim false. The echo in the teacher notes (unit-teacher-notes.mdx:68-69, 'MCQ-03 punishes dividing before converting') rests on the same example. Repair: describe the mistake as dividing 250 by 15 without converting (or otherwise make the arithmetic of the described error true).

Third, the citation-traceability claim in specs/content/gqur-300/sources/unit-04.md:3-5 ('every key here is cited both in prose and in a per-topic ## Further reading section') is false for two of the three keys: ncm and openstax-prealgebra appear only in Further reading sections (topic-01.mdx:133-137, topic-02.mdx:148-153, topic-03.mdx:138-139); only gula2025 is named in unit prose (topic-03.mdx:46). Same defect class as GQUR-300 Unit 2 run001's blocking finding 3. Repair: cite the two sources in the prose passages they ground, or correct the sources-file claim.

Everything else the rubric asks for holds. All four guide leaves are taught and assessed (U4-01 topic-01 '### Units of measurement' -> MCQ-01..03, RRQ-01/02, ERQ-01; U4-02 topic-02 '### Perimeter, area, and volume' -> MCQ-04..07, RRQ-03..05/09, ERQ-02; U4-03 topic-02 '### Basic geometric shapes and properties' -> RRQ-08; U4-04 topic-03 '### Applications of measurement in real contexts' -> MCQ-10, RRQ-06/07/10, ERQ-02..05). The MCQ key agrees with independent derivation on 10 of 10 items and the RRQ model answers on 10 of 10; ERQ rubrics 1, 2, 3 and 5 are arithmetically sound and sum to their stated totals (6, 8, 8, 10); the 10/10/5 blueprint, Bloom bands and each topic's Analyze-or-higher summative criterion are met. All three cited sources were retrieved and read live this session: the NCC page serves both cited documents and asserts no publication year exactly as the excerpt records; the OpenStax Prealgebra 2e preface confirms the authors, CC BY-NC-SA license, the 11-chapter TOC and Chapter 9's coverage of rectangle/triangle/trapezoid/circle properties, volume and surface area; ERIC EJ1489427 confirms every bibliographic detail and each claim the gula2025 excerpt and topic-03's prose citation rest on (numeracy tasks as their own category; quality numeracy tasks 'inspire transfer between concrete and abstract thinking spaces'). All 12 unit-04 SVG variants (6 light, 6 dark) pass scripts/measure-figure-text.mjs with no glyph overflow past the 780px viewBox and no wordmark overprint; figures:variants:check passes. Narrow-360, desktop-1280 and A4 print inspection of all six pages against a fresh production build (npm run build exit 0, served statically) shows zero document overflow at every width, all figures loading with manifest alt text verbatim, no HTML content tables (so no table-scroll concern), the print navbar hidden, and the complete Answers and marking guidance section present in the A4 PDF by text extraction. All six mandatory content gates plus check:content, check:concept-graph, check:bloom-bands, check:source-floor and check:pipeline-gate exit 0.

Advisory findings: three of the ten key terms declared in the content-spec (Length, Mass, Capacity) are not bilingual glossary entries and are not glossed in the unit; Topic 4.3 carries 1 MCQ against the blueprint's '>= 2 MCQ per topic' floor under the content-spec's integration escape clause (RRQ floor met at 3); U4-03's unit-bank footprint is a single item (RRQ-08) while its taught passage is a full section and figure; RRQ-06 and MCQ-06 are unmapped in the concept graph (the contract does not require totality); and this reviewer's image-display tool could not present PNG or JPEG files, so pixel-level visual inspection was performed programmatically (DOM audits, print-PDF text extraction, pixel statistics, offline glyph geometry) with all screenshots saved unchanged for human visual inspection.

This report is advisory. It is unsigned, no qualification record or protected registry entry exists for this reviewer, and nothing here certifies the unit, activates a reviewer, or writes a tracker row.`,
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        "Scheme-and-Course-guides/extracted-text/1st 2026.txt:607-611 - the guide's Unit 4 carries exactly four leaves: 'Units of measurement', 'Perimeter, area, and volume', 'Basic geometric shapes and properties', 'Applications of measurement in real contexts'. No other Unit 4 content is prescribed; the guide's teaching strategies, practical work and assessment criteria (lines 617-680) are general to the course.",
        "specs/content/gqur-300/content-spec.md '## Unit 4' (lines 353-420): status approved (front matter line 3); '### Sub-topic checklist' U4-01..U4-04 map the four guide leaves 1:1 with Guide refs G4.1-G4.4; '### Topic list' assigns U4-01 to 4.1, U4-02/U4-03 to 4.2, U4-04 to 4.3, matching the three topic files; week placement 'Weeks 10-11 (derived)' is labelled derived in the spec itself.",
        "CLO trace: content-spec '## Unit 4' states 'CLO refs: course outcomes 2 and 4'; the unit's clo_refs (SLO:GQUR-300-2-2, SLO:GQUR-300-4-4) follow the corpus convention verified across units 01-06 (outcome-anchored SLO IDs, e.g. unit-06 carries 2-2, 4-4, 5-5); course-overview.mdx outcomes 2 ('Solve real-world quantitative problems') and 4 ('Communicate mathematical ideas clearly') are both served: outcome 2 by the conversion and computation work, outcome 4 by the report-so-a-colleague-can-re-check thread that runs from topic-03 through ERQ-02/04/05.",
        "Guide's pedagogy expectations are carried: teacher notes 'Teaching strategies from the guide' cites the real-life case-study mode, group activities and question-answer; 'Practical work' matches the guide's group work / group assignments / individual assignment / presentations; no contradiction between guide, spec and unit was found, so no G0/G1 escalation is needed.",
      ],
    },
    {
      id: 'sources',
      status: 'fail',
      evidence: [
        "VERIFIED - ncm. https://ncc.gov.pk/Detail/ZjgzYzg2MmMtZDc0Zi00NjEzLTk5ZmYtZGJiNjc5ODljOGUx retrieved live this session: the NCC Mathematics page lists 'NCP - Math Progression Grid Grade (1-12)' and 'NCP - Math Suggested Guidlines Grade (1-8)' (the site's own spelling) as open PDFs, exactly as the excerpt records, and asserts no publication year, matching the excerpt's 'none is cited'. Supports U4-01/U4-03 at the record level the excerpt honestly declares; no unit prose claim rests on unread PDF content.",
        "VERIFIED - openstax-prealgebra. https://openstax.org/books/prealgebra-2e/pages/preface retrieved live this session: authors Marecek, Anthony-Smith, Mathis; CC BY-NC-SA 4.0; 11 chapters including Ch. 1 Whole Numbers and Ch. 9 Math Models and Geometry, whose geometry sections cover properties of rectangles, triangles, trapezoids and circles plus volume and surface area - the content Topic 4.2's formulas and all three Further reading citations rest on. Every cited chapter exists as cited.",
        "VERIFIED - gula2025. https://eric.ed.gov/?id=EJ1489427 retrieved live this session: Gula and Lovric (2025), Canadian Journal of Science, Mathematics and Technology Education 25(1), 171-184, exactly as cited; the record's abstract confirms numeracy tasks as their own category and quality numeracy tasks as those that 'inspire transfer between concrete and abstract thinking spaces', which is the claim topic-03.mdx:46-48 builds on. The excerpt's provenance note (ERIC record summary, not publisher text) is honest.",
        "FAILING - citation traceability. specs/content/gqur-300/sources/unit-04.md:3-5 asserts 'every key here is cited both in prose and in a per-topic ## Further reading section', but ncm and openstax-prealgebra are named nowhere in unit prose - only in the Further reading blocks of topic-01 (both), topic-02 (both) and topic-03 (openstax). Only gula2025 has a prose citation. The claim is false for two of three keys (blocking finding; same class as Unit 2 run001 finding 3).",
        "Bound-excerpt note: ADR-0027's cited-keys rule binds only sources/texts/gula2025.md into this unit's manifest (digest c1f02cf389f08236d7518c76e78786bff34982ab7e75749f240e44ba94e160dc); the ncm and openstax-prealgebra excerpt files are not manifest-bound, so verification rested on live retrieval of the cited URLs this session, recorded in logs-agent-g3-gqur300-u4-run001/source-verification.txt. 'Unverifiable sources: None' is accurate - no D-2026-0001 declaration is needed or used.",
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        "Taught-passage mapping verified 4/4: every row of specs/content/gqur-300/coverage/unit-04.md names a file and an exact ### heading that exists in that file (U4-01 topic-01.mdx 'Units of measurement'; U4-02 topic-02.mdx 'Perimeter, area, and volume'; U4-03 topic-02.mdx 'Basic geometric shapes and properties'; U4-04 topic-03.mdx 'Applications of measurement in real contexts'), confirmed against the rendered heading outlines in renders-agent-g3-gqur300-u4-run001/render-inspection.json.",
        "Outcome chain guide leaf -> taught passage -> assessment verified for all four sub-topics: U4-01 assessed by MCQ-01/02/03, RRQ-01/02, ERQ-01; U4-02 by MCQ-04/05/06/07, RRQ-03/04/05/09, ERQ-02; U4-03 by RRQ-08 (single item - see advisory finding); U4-04 by MCQ-10, RRQ-06/07/10, ERQ-02/03/04/05.",
        "Topic partition total and disjoint (gate-checked); depth budget: index 5 + topics 13/15/13 + assessment 12 + teacher notes 6 = 64 reading-minutes, inside the content-spec band 50-68 and inside each topic's 12-16 / 14-18 / 12-16 row.",
        "Figure plan delivered as specified: six figures at the planned archetypes (fig-U4-1 table, fig-U4-2 diagram, fig-U4-3 diagram, fig-U4-4 table, fig-U4-5 flowchart, fig-U4-6 table), two carriers per topic, manifest rows placed with Src files committed, alt text verbatim between manifest and MDX.",
      ],
    },
    {
      id: 'assessment',
      status: 'fail',
      evidence: [
        "Independent working recorded in logs-agent-g3-gqur300-u4-run001/assessment-independent-working.txt, each derivation tied to the topic passage it rests on. MCQ key agreement 10/10 (1 b, 2 b, 3 a, 4 c, 5 a, 6 b, 7 b, 8 c, 9 c, 10 b); distractors are plausible errors (MCQ-03's 17 is the wrong-order division, 60 the wrong-way conversion; MCQ-07's 4.5 is add-instead-of-multiply, 450 a conversion slip).",
        "RRQ model answers verified 10/10 sound with mark allocations that sum to their stated totals (3+2+2+2+2+2+2+2+2+3); ERQ rubrics 1, 2, 3 and 5 arithmetically sound and sum to 6, 8, 8 and 10; ERQ-2's cylinder 3.14 x 1 x 1 x 2 = 6.28 cubic metres = 6,280 litres and ERQ-3's 6.25 / 0.8 = 7.8125 -> 8 shelves both re-derived independently.",
        "FAILING - ERQ-4's Re-measure analysis rubric (docs/semester-1/gqur-300/unit-04/unit-assessment.mdx:204-209) is inverted: it rewards 'the tiles depend on the open area, which changes with the store's position ... the boundary is unaffected by where the store sits inside it', but with the store's size fixed the open area is 600 - 20 = 580 sq m at every position (the rubric's own Tiles criterion computes exactly this), while the skirting line is the position-sensitive quantity (the rubric's own Skirting criterion concedes the notch 'adds or subtracts a few metres'). The rubric is internally contradictory and would mark down a correct analysis (blocking finding).",
        "Blueprint and demand: 10/10/5 counts (gate-checked); Bloom bands MCQ Remember->Apply, RRQ Understand->Analyze, ERQ Analyze->Evaluate all as the blueprint requires, with classifications re-derived from the thinking actually required (RRQ-07's error-move diagnosis and ERQ-05's self-plan evaluation genuinely demand Analyze/Evaluate); each topic's Summative task carries one Analyze-or-higher criterion.",
        "Per-topic floors: RRQ 2/5/3 meets the '>= 2 RRQ per topic' floor; MCQ 3/6/1 leaves Topic 4.3 at 1 MCQ under the content-spec's '(Topic 4.3 may carry fewer where items integrate earlier sub-topics)' escape clause - recorded as advisory, not a failure.",
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        "Inspection record: logs-agent-g3-gqur300-u4-run001/render-review.txt; DOM measurements in renders-agent-g3-gqur300-u4-run001/render-inspection.json. Rendered input identity: production static build of reviewed HEAD c79c453 (npm run build exit 0, build.txt), served at localhost:3210 (serve.txt); Chromium headless at 1280x900, 360x740 (mobile, touch, DPR 2) and 794x1123 print emulation with A4 PDFs.",
        "Figures: all six light SVG variants load in-page (complete && naturalWidth > 0) with the manifest alt text verbatim; the six dark twins are wired and fresh (figures:variants:check exit 0 over 228 figures); all 12 SVG files pass scripts/measure-figure-text.mjs with widest text at 768.4-777.7 px inside the 780 px viewBox and no wordmark overprint (measure-figure-text.txt), so no learner-visible clipping; each figure's instructional meaning is recoverable from alt text plus the adjacent prose that references 'the table above' / 'the diagram above'.",
        "Layout: document overflow (scrollWidth - clientWidth) is 0 on all six pages at desktop, narrow-360 and print; no HTML content tables exist on any unit-04 page (the unit's tables are SVG figures), so the narrow-viewport table-scroll concern does not arise; the print navbar is hidden under print media; the A4 PDFs contain the complete Answers and marking guidance section (text extraction: 'MCQ answer key', 'ERQ rubrics', 'Re-measure analysis', 'Total 10' all present).",
        "Headings and reading order: one h1 per page, h2/h3 correctly nested, the nine-part cycle in canonical order on all three topics, Answers and marking guidance as the assessment page's final ## section. Links are descriptive (no 'here'/'click here'). Glossary terms render as keyboard-focusable abbr elements with bilingual title/aria-label.",
        "Limitation recorded (advisory finding): this session's image-display tool returned no output for PNG and JPEG, so the reviewer could not view rendered pixels directly; pixel-level verification rests on DOM measurement, print-PDF text extraction, pixel statistics (sharp channel stdev 26-58, no blank captures), offline glyph geometry and the SVG source labels, with all screenshots saved unchanged for human visual inspection.",
      ],
    },
    {
      id: 'readability',
      status: 'pass',
      evidence: [
        "Register is reachable by a fresh HSC/intermediate graduate per specs/content/style-guide.md '## EN readability rules': short active sentences, one idea per paragraph, everyday Pakistani contexts (Resham Gali fabric shop, bunting rolls, rice sacks, courtyard survey) carrying every abstraction; no graduate-level jargon.",
        "Terms are defined at first use and used consistently (unit of measurement, perimeter/area/volume as boundary/cover/fill, the four moves); every Glossary wrapper used in the unit resolves to a bilingual glossary.json entry (Unit of measurement, Kilogram, Centimetre, Millilitre, Perimeter, Area, Volume, Rectangle, Square, Triangle, Circle, Radius), enforced by validate:content.",
        "npm run check:no-em-dash exits 0; no em dash in the unit. Every page carries a front-matter description and est_reading_minutes; the unit total of 64 minutes sits inside the content-spec depth budget of 50-68.",
        "Numbers in prose were re-derived and are correct throughout (conversions, perimeters, areas, volumes, the corridor-versus-room pair 40/44 vs 42/26, the shelving arithmetic) with one exception recorded as a blocking pedagogy finding (the 15/250 mistake description in topic-01.mdx:56-57).",
      ],
    },
    {
      id: 'pedagogy',
      status: 'fail',
      evidence: [
        "PASSING - progression. Each topic runs the nine-part cycle in order (verified in the rendered outlines): classroom situation with a figure, explanation with worked examples before practice, activity, check-your-understanding, summary, self-assessment checklist, practicum task, summative task with mini-rubric, further reading. Units before quantities before tasks, and the index says so.",
        "PASSING - activities are feasible in a Pakistani/Sindhi classroom with stated group sizes, materials and timings: the conversion market (pairs, six market slips plus rate card, 20 minutes), fence or carpet (groups of three, four room plans, 25 minutes), the courtyard plan (groups of four, school map, swap-and-mark, 25 minutes). Practicum tasks are real school tasks with an output handed to a cooperating teacher.",
        "PASSING - three misconceptions are named, corrected with a repair, and echoed in the teacher notes with concrete probing moves: 'bigger things need bigger numbers' (1.5 L = 1,500 mL), 'a bigger area means a bigger perimeter' (40/44 vs 42/26), 'the tape measure is the measurement' (the librarian's four questions) plus 'the calculator said so' (4,800 sq m classroom) in the notes.",
        "PASSING - teacher notes are substantive: sequencing with a reason (saved time to Topic 4.3 plan-writing), guide-aligned strategies, activity-running guidance including the deliberate not-pre-teaching of the staff-room split, assessment guidance naming the bank's deliberate traps, and practicum links that feed ERQ-05.",
        "FAILING - the bunting worked example's aside (docs/semester-1/gqur-300/unit-04/topic-01.mdx:56-57) states 'the classic school mistake is dividing 15 by 250 directly and ordering 17 rolls', but 15 / 250 = 0.06; the 17-roll outcome comes from 250 / 15 = 16.67 rounded up. The worked example misdescribes the error it warns against, and the echo at unit-teacher-notes.mdx:68-69 rests on it (blocking finding).",
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: false,
      message: "Inverted re-measure analysis in ERQ-4's rubric: docs/semester-1/gqur-300/unit-04/unit-assessment.mdx:204-209 awards 0-3 for asserting that the tile quantity changes with the store's position while the boundary is unaffected. With the store's size fixed, the open area is 600 - 20 = 580 square metres at every position (the rubric's own Tiles criterion computes exactly this, with no position term); the position-sensitive quantity is the skirting line around the open region (the rubric's own Skirting criterion concedes the notch 'adds or subtracts a few metres'). The rubric is internally contradictory and would mark down a trainee who gives the correct analysis. Repair: invert the expected analysis (skirting is what needs the careful re-measure; the tiles depend only on the store's size) or re-frame the item so the intended answer is mathematically sound.",
    },
    {
      severity: 'blocking',
      resolved: false,
      message: "False arithmetic in the bunting worked example: docs/semester-1/gqur-300/unit-04/topic-01.mdx:56-57 says 'the classic school mistake is dividing 15 by 250 directly and ordering 17 rolls', but 15 / 250 = 0.06; the 17-roll mistake arises from dividing 250 by 15 (16.67 rounded up). A trainee who checks the claim finds it false, undermining the convert-before-computing lesson the example teaches. Echo: unit-teacher-notes.mdx:68-69 ('MCQ-03 punishes dividing before converting') rests on the same example. Repair: describe the mistake as dividing 250 by 15 without converting, or otherwise make the described error's arithmetic true.",
    },
    {
      severity: 'blocking',
      resolved: false,
      message: "Citation-traceability claim false for two of three keys: specs/content/gqur-300/sources/unit-04.md:3-5 asserts 'every key here is cited both in prose and in a per-topic ## Further reading section', but ncm and openstax-prealgebra appear only in Further reading blocks (topic-01.mdx:133-137, topic-02.mdx:148-153, topic-03.mdx:138-139) and are named nowhere in unit prose; only gula2025 has a prose citation (topic-03.mdx:46). Same defect class as GQUR-300 Unit 2 run001's blocking finding 3. Repair: cite the two sources in the prose passages they ground (e.g. the metric ladders and shape properties sections), or correct the sources-file claim.",
    },
    {
      severity: 'advisory',
      resolved: false,
      message: "Unglossed declared key terms: specs/content/gqur-300/content-spec.md '## Unit 4' declares ten key terms; seven (Unit of measurement, Perimeter, Area, Volume, Rectangle, Triangle, Circle) plus Square, Radius, Kilogram, Centimetre and Millilitre are carried as bilingual glossary entries, but Length, Mass and Capacity are absent from glossary.json (183 entries) and are not glossed in the unit, though 'length, mass and capacity' are the topic-01 ladder names. Same class as Unit 2 run001's advisory on Root and Operation.",
    },
    {
      severity: 'advisory',
      resolved: false,
      message: "Topic 4.3 carries 1 MCQ (MCQ-10) against the content-spec blueprint's '>= 2 MCQ and >= 2 RRQ per topic', relying on the parenthetical '(Topic 4.3 may carry fewer where items integrate earlier sub-topics)'. The RRQ floor is met (3). The distribution is 3/6/1 across topics 4.1/4.2/4.3; recorded for the owner to confirm the escape clause was the intent.",
    },
    {
      severity: 'advisory',
      resolved: false,
      message: "U4-03 (Basic geometric shapes and properties) has a thorough taught passage (topic-02 section plus fig-U4-2) but a single unit-bank item (RRQ-08); the concept graph maps CON:GQUR-300-4-4 to RRQ-08 only. Consider one more bank item on defining properties (e.g. rectangle vs square) in a future revision.",
    },
    {
      severity: 'advisory',
      resolved: false,
      message: "Concept graph leaves RRQ-06 (paint litres) and MCQ-06 (triangle divide-by-two) unmapped to any concept; the concept-graph contract requires only that mapped IDs exist, so this is not a gate failure, but the graph's account of the bank is incomplete. RRQ-06 plausibly belongs to the four-move task or area-as-cover; MCQ-06 to the formulas-as-pictures concept.",
    },
    {
      severity: 'advisory',
      resolved: false,
      message: "Inspection limitation: this session's image-display tool returned no output for PNG and JPEG files, so the reviewer could not view the rendered pixels directly. Pixel-level accessibility verification rests on DOM measurement (overflow, alt text, image loading, heading outlines), print-PDF text extraction, pixel statistics, offline SVG glyph geometry and the SVG source labels; all 24 screenshots and 2 A4 PDFs are saved unchanged under renders-agent-g3-gqur300-u4-run001/ for human visual inspection. Had this been the only open question on an otherwise passing unit, it would have justified escalation rather than a pass.",
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: `${LOGS}/validate-content.txt` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${LOGS}/check-depth-gate.txt` },
    { name: 'check:figures', exit_code: 0, log_path: `${LOGS}/check-figures.txt` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${LOGS}/check-no-em-dash.txt` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${LOGS}/check-no-answer-keys.txt` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${LOGS}/check-docs-sync.txt` },
    { name: 'render-review', exit_code: 0, log_path: `${LOGS}/render-review.txt` },
    { name: 'check:content', exit_code: 0, log_path: `${LOGS}/check-content.txt` },
    { name: 'figures:variants:check', exit_code: 0, log_path: `${LOGS}/figures-variants-check.txt` },
    { name: 'measure-figure-text', exit_code: 0, log_path: `${LOGS}/measure-figure-text.txt` },
    { name: 'build', exit_code: 0, log_path: `${LOGS}/build.txt` },
    { name: 'input-binding-verification', exit_code: 0, log_path: `${LOGS}/input-binding-verification.txt` },
    { name: 'assessment-independent-working', exit_code: 0, log_path: `${LOGS}/assessment-independent-working.txt` },
    { name: 'source-verification', exit_code: 0, log_path: `${LOGS}/source-verification.txt` },
  ],
  evidence_manifest: evidence,
};

const out = 'specs/content/gqur-300/reviews/unit-04/G3/agent-g3-gqur300-u4-run001.json';
writeFileSync(resolve(root, out), JSON.stringify(report, null, 2) + '\n');
console.log('wrote', out);
console.log('evidence files:', Object.keys(evidence).length);
console.log('completed_at:', report.completed_at);
