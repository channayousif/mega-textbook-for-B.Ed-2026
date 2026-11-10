# GPKS-402 Pakistan Studies - Task tracker

## Status: draft (G0/G1 intake)

## Units

| Unit | Title | EN draft | G3 review | UR translation | G5 review | Figures | Notes |
|---|---|---|---|---|---|---|---|
| 1 | Introduction and Ideological Foundations | ✓ | ☐ | ☐ | ☐ | placed | Withdrawn 2026-10-10 (owner, D-2026-0053 / G-2026-100); re-authored 2026-10-28 from the approved spec (D-2026-0074), English only; see stage rows below |
| 2 | Reform Movements and the Pakistan Movement | ✓ | ☐ | ☐ | ☐ | placed | Withdrawn 2026-10-10 (owner, D-2026-0053 / G-2026-100); re-authored 2026-10-28 from the approved spec (D-2026-0074), English only; see stage rows below |
| 3 | Constitutional Development | ✓ | ☐ | ▣ | ☐ | placed (EN + UR) | Four-page Urdu draft and four RTL SVG pairs prepared 2026-10-31; G3/G5 remain open; see reviews/unit-03/G4/translation-handoff.md |
| 4 | Governance, Rights and Geography | ✓ | ☐ | ▣ | ☐ | placed | English baseline authored 2026-10-28 (D-2026-0074); complete Urdu draft prepared 2026-11-02; independent G5 pending; see stage rows below |
| 5 | Economy and Society | ✓ | ☐ | ☐ | ☐ | placed (EN) | English draft authored 2026-10-28; G2 deterministic checks pass; independent review and Urdu remain open |
| 6 | Foreign Policy, Issues and Education | ✓ | ☐ | ☐ | ☐ | placed | English authored 2026-10-28; G2 gate evidence recorded below; G3/G5 remain open; Urdu is a separate job |

**Key:** ▣ = in progress, ☐ = not started, ✓ = done, ✗ = escalated

## Stage rows

`check:pipeline-gate` reads these (`| Unit | Stage | Status | Initials | Notes |`); the last row for a unit and stage is authoritative.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 1 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gpks-402/reviews/unit-01/G2/20261103T112243670Z-gates.json |
| Unit 1 | G3 en-review | ▢ | | advisory: pass; report specs/content/gpks-402/reviews/unit-01/G3/b35aebba-1391-47ae-88ff-481fd326cd8b.json; all 7 criteria pass; independent solve 10/10 MCQs, 10/10 RRQs, 5/5 ERQs; all 8 SVG variants pass measure-figure-text; row stays open pending qualification (ADR-0019) |
| Unit 1 | G4 ur-translation | ▢ | | Draft mirror authored 2026-10-28 by codex; four pages and four Urdu SVGs with dark twins; see reviews/unit-01/G4/translation-handoff.md. Status retained per translate-unit Step 7; no G5 certification. |
| Unit 1 | G5 ur-review | ▢ | | advisory: escalate (agent:claude, unsigned); report specs/content/gpks-402/reviews/unit-01/G5/g5-claude-20261102T173409Z.json; 4 blocking translator repairs (9 Glossary tags render English, "self-governing" vs "خود مختار", 3 grammar errors, "draws on Islam" overstated); owner rulings needed on "civics" = شہریت and the frozen oblique forms پاکستان کے مطالعہ / پاکستان کے نظریے; rendered RTL/print inspection not possible in crew; row stays open (ADR-0019) |
| Unit 2 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gpks-402/reviews/unit-02/G2/20261105T111715992Z-gates.json |
| Unit 2 | G3 en-review | ▢ | | awaiting an independent reviewer |
| Unit 2 | G4 ur-translation | ▢ | | separate job |
| Unit 2 | G5 ur-review | ▢ | | |
| Unit 2 | G6 assets | ✅ | auto:gates | 4 schematic SVGs placed with dark variants |
| Unit 2 | G4 ur-translation | ✅ | auto:gates | full UR mirror (5 files) translated 2026-10-28 by the crew translate job from English at `f3d7619a`; 4 `.ur.svg` label variants (`fig-U2-1…4`, mirrored RTL layout) authored, measured clean and wired, `.ur.dark.svg` derived; `key_terms` bound to terminology.csv; heading parity exact; parity/figures/key_terms clean under a temporary `reviewed` flip (reverted). `translation_status` stays draft pending an independent G5 |
| Unit 4 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gpks-402/reviews/unit-04/G2/20261103T112244243Z-gates.json |
| Unit 4 | G3 en-review | ▢ | | advisory: pass (ADR-0019); report at specs/content/gpks-402/reviews/unit-04/G3/8e3bf462-d4af-437f-aa63-372eb41b9e7c.json; all 7 criteria pass; independent solve 10/10 MCQs, 10/10 RRQs, 5/5 ERQs; all 14 SVG variants pass geometry; G3 remains open and unsigned |
| Unit 4 | G4 ur-translation | ▢ | | Complete five-page draft mirror and seven Urdu SVG pairs prepared from 64ced416; translation_status remains draft. Status retained per translate-unit Step 7; independent G5 and rendered inspection pending. Handoff: specs/content/gpks-402/reviews/unit-04/G4/translation-handoff.md |
| Unit 4 | G5 ur-review | ▢ | | advisory: escalate (agent:claude, unsigned); report specs/content/gpks-402/reviews/unit-04/G5/g5-claude-20261102T174837Z.json; 3 blocking figure repairs (fig-U4-6.ur.svg is the freehand map withdrawn in #368, fig-U4-8 missing from the Urdu page, fig-U4-6 Urdu alt describes the old map; G4 baseline 64ced416 predates #368/#369); owner rulings needed on "checks" = نگرانی and 16 unbanked terms; prose and assessment equivalent (MCQ solve matches key); rendered RTL/print inspection not possible in crew; row stays open (ADR-0019) |
| Unit 6 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gpks-402/reviews/unit-06/G2/20261105T112904958Z-gates.json |
| Unit 6 | G3 en-review | ▢ | | awaiting an independent reviewer |
| Unit 6 | G4 ur-translation | ▢ | | separate job |
| Unit 6 | G5 ur-review | ▢ | | |

## Course-level

- [x] Content spec (G0/G1 intake)
- [x] Course overview (EN + UR)
- [ ] Course review page
- [ ] Final board approval of content spec

## Pipeline gate status

- `check:pipeline-gate` expected red until content-spec status changes to `approved` (board action).
- `check:figures` expected red until schematics are rendered and placed (ADR-0024 handoff).

## Unit 5 authoring pipeline

The stage rows below govern Unit 5. No G1 re-evaluation or G3/G5 approval is recorded here.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 5 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gpks-402/reviews/unit-05/G2/20261103T112244469Z-gates.json |
| Unit 5 | G3 en-review | ▢ | | Fresh independent review required |
| Unit 5 | G4 ur-translation | ▢ | | Complete four-page draft mirror and four Urdu SVG pairs prepared from dcb20e76; translation_status remains draft. No G4 completion claim per translate-unit Step 7. Handoff: specs/content/gpks-402/reviews/unit-05/G4/handoff.md |
| Unit 5 | G5 ur-review | ▢ | | Pending translation and independent review |
| Unit 5 | G6 assets | ▣ | | Four English SVGs and four Urdu SVGs placed with dark variants; all 8 SVGs pass geometry |
| Unit 5 | G7 publish | ▢ | | No deployment or publication action in this job |
| Unit 5 | G3 en-review | ▢ | | advisory: pass (ADR-0019); report at specs/content/gpks-402/reviews/unit-05/G3/21030998-7c55-4596-9cef-92787e7cb7aa.json; all 7 criteria pass; all 8 SVGs pass geometry; G3 remains open and unsigned |
| Unit 5 | G5 ur-review | ▢ | | advisory: escalate (agent:g5-reviewer, unsigned); report specs/content/gpks-402/reviews/unit-05/G5/g5-claude-20261102T183940Z.json; render inspection unavailable in crew, accessibility/rtl unverified; 2 uncertain findings (F2 better value rendered cheaper, F3 learning-outcome terminology drift) and 7 advisory; row stays open (ADR-0019) |

| Unit 2 | G3 en-review | ▢ | | advisory: escalate; report specs/content/gpks-402/reviews/unit-02/G3/01a18cbc-8067-7f42-995a-419ce6765add.json; date, arithmetic and assessment defects; sources, provenance and current screen/print inspection incomplete; unsigned, G3 remains open |

## Unit 6 advisory English review

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 6 | G3 en-review | ▢ | | advisory: escalate; agent:codex-g3-reviewer; report specs/content/gpks-402/reviews/unit-06/G3/01a18ccb-4a8c-7c60-8ed2-7c546d08340e.json; source provenance, assessment scoring and specialist vocabulary need author repair; author-run handoff and current narrow/A4 renders unavailable; unsigned, G3 remains open (ADR-0019) |

## Unit 3 stage evidence

Only Unit 3 is updated by this authoring job. The approved content-spec is the drafting authority; older course-level status prose above is retained for its other-unit history.

| Unit | Stage | Status | Reviewer | Notes |
|---|---|---|---|---|
| Unit 3 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gpks-402/reviews/unit-03/G2/20261103T112243997Z-gates.json |
| Unit 3 | G3 en-review | ▢ | | advisory: pass (ADR-0019); report at specs/content/gpks-402/reviews/unit-03/G3/608a5388-1312-4060-ac88-c7d64ddc8c72.json; all 7 criteria pass; independent solve 10/10 MCQs, 10/10 RRQs, 5/5 ERQs; all 8 SVG variants pass geometry; G3 remains open and unsigned |
| Unit 3 | G4 ur-translation | ▢ | | Draft Urdu mirror prepared 2026-10-31 by codex from 23c211bd6fe0b17fe3e7bcbade5c54b15b9642cb: four pages, full 10/10/5 assessment, four RTL Urdu SVGs and derived dark twins. Frozen-bank key_terms and structural parity checked; translation_status stays draft. Open per translate-unit Step 7; geometry and rendered inspection pending under crew browser restriction. Handoff: reviews/unit-03/G4/translation-handoff.md |
| Unit 3 | G5 ur-review | ▢ | | advisory: pass (ADR-0019); report at specs/content/gpks-402/reviews/unit-03/G5/f08da193-6363-4286-bcf6-4be1f27181bd.json; all 10 criteria pass; independent solve 10/10 MCQs, 10/10 RRQs, 5/5 ERQs; RTL and font shaping verified; G5 remains open and unsigned |
| Unit 3 | G6 assets | ▣ | codex | Four English and four Urdu light/dark pairs placed; Urdu geometry and rendered inspection pending under crew browser restriction |
| Unit 3 | G7 publish | ▢ | | No deploy or PR in this job |
| Unit 2 | G3 en-review | ⏳ | CMY | review:specs/content/gpks-402/reviews/unit-02/G3/20261102T142352Z-g3-desk-0bc00d63.json |
| Unit 6 | G3 en-review | ⏳ | CMY | review:specs/content/gpks-402/reviews/unit-06/G3/20261102T142352Z-g3-desk-9df9dc96.json |
| Unit 1 | G3 en-review | ✅ | CMY | review:specs/content/gpks-402/reviews/unit-01/G3/20261102T140729Z-g3-desk-b1f9d57a.json |
| Unit 3 | G3 en-review | ✅ | CMY | review:specs/content/gpks-402/reviews/unit-03/G3/20261102T140729Z-g3-desk-85679ed3.json |
| Unit 4 | G3 en-review | ✅ | CMY | review:specs/content/gpks-402/reviews/unit-04/G3/20261102T140729Z-g3-desk-8621b0c7.json |
| Unit 5 | G3 en-review | ✅ | CMY | review:specs/content/gpks-402/reviews/unit-05/G3/20261102T140729Z-g3-desk-e7015f81.json |
| Unit 2 | G3 en-review | ⏳ | CMY | review:specs/content/gpks-402/reviews/unit-02/G3/20261102T211054Z-g3-desk-19a9764e.json |
| Unit 6 | G3 en-review | ⏳ | CMY | review:specs/content/gpks-402/reviews/unit-06/G3/20261102T211054Z-g3-desk-fd0a1ec1.json |
| Unit 2 | G3 en-review | ⏳ | CMY | review:specs/content/gpks-402/reviews/unit-02/G3/20261102T212207Z-g3-desk-94983dc8.json |
| Unit 6 | G3 en-review | ⏳ | CMY | review:specs/content/gpks-402/reviews/unit-06/G3/20261102T212207Z-g3-desk-181b4e13.json |
| Unit 2 | G3 en-review | ▢ | | advisory: revise; repairs applied (report specs/content/gpks-402/reviews/unit-02/G3/20261102T212207Z-g3-desk-94983dc8.json); aligned MAO School 1875 / College 1877 across stems, keys, rubrics and fig-U2-1; corrected 1916–1929 interval to 13 years in topic-02, notes and MCQ 10; aligned 1945–46 mandate to 90.1% (446/495) across topic-02, fig-U2-4, MCQ 9 and ERQ 4; clarified weightage vs proportional representation in MCQ 4; replaced mismatched votes/seats metric with common denominator in Worked Example; completed D-2026-0001 unavailable-source declarations and bound Khan & Khan 2020; reframed ERQ 4 rubric to award credit for evidence-based historical evaluation distinguishing seat mandate from universal suffrage and referendum; simplified HSC terms; all edits mirrored in Urdu |
| Unit 6 | G3 en-review | ▢ | | advisory: revise; repairs applied; report specs/content/gpks-402/reviews/unit-06/G3/20261102T212207Z-g3-desk-181b4e13.json; F02/F03/F05/F06/F07 repairs applied; F04 ledger URLs and qualifications added; F01/F08 provenance and rendered evidence remain host-supplied; G3 stays open (ADR-0019) |
| Unit 2 | G3 en-review | ⏳ | CMY | review:specs/content/gpks-402/reviews/unit-02/G3/20261108T203238Z-g3-desk-69c5585e.json |
| Unit 6 | G3 en-review | ⏳ | CMY | review:specs/content/gpks-402/reviews/unit-06/G3/20261108T203238Z-g3-desk-558b2467.json |
| Unit 2 | G3 en-review | ▢ | | advisory: revise; repairs applied (report specs/content/gpks-402/reviews/unit-02/G3/20261108T203238Z-g3-desk-69c5585e.json); verified MAO School 1875 / College 1877 across stems, keys, rubrics, activity table, alt text and figure manifest; confirmed 1916–1929 interval (13 years) in topic-02, teacher notes and MCQ 10; confirmed 1945–46 mandate 90.1% (446/495) across topic-02, MCQ 9/key and ERQ 4; confirmed MCQ 4 weightage vs proportional representation; confirmed Worked Example common denominator; added explicit uncorroborated-support disclosures at Rabbani 2020, Khan & Khan 2020, Hassan 2020 and Khan 2017 attributions; simplified magnum opus; all edits mirrored in Urdu; provenance, rendered accessibility and solve-before-key remain for a fresh reviewer (ADR-0019); G3 stays open |
