# Implementation Plan: Complete EFMP-301 · Educational Psychology

**Branch**: `022-author-efmp-301` | **Date**: 2026-09-24 | **Spec**: [spec.md](./spec.md)

## Context

EFMP-301 · Educational Psychology is a 3 (3-0) credit Major: Professional course for
Semester 1 of the B.Ed (4-Year) programme, bilingual (English + Urdu). The course currently
has ONLY Unit 1 (the certified, published golden unit at `docs/semester-1/efmp-301/unit-01/`
with its complete Urdu mirror) plus a course-overview; the existing
`specs/content/efmp-301/content-spec.md` is scoped to Unit 1 only. The course guide
(`Scheme-and-Course-guides/extracted-text/1st 2026.txt` lines 1011-1204) provides a course
description, 6 CLOs, a 16-week outline arranged as 12 chapters (Weeks 1-16, no unit
headings beyond the existing Unit 1), a teaching-strategy list (lectures, interactive
discussions, question-answer, demonstration, case study analysis), a practical-work list
(hands-on computer exercises, individual and group assignments, presentations,
internet-research tasks), and 2 recommended books, both open-access URLs. The guide gives
no assessment-criteria table, so the Constitution Art. III.7 default (60% summative / 40%
formative) applies. The spec (FR-001..FR-011) defines the requirements. This plan
decomposes the work into tasks.

## Implementation Approach

Follow the gated Spec 006/008/009/012/016 workflow, on the degree track
(`docs/semester-1/efmp-301/`, never `licence/`). Full bilingual scope for the new units:
each gets an English authoring pass (G1-G3), SVG figures with `.ur.svg` mirrored Urdu
variants, a complete Urdu mirror (G4), and an advisory G5 review, before `check:all` and a
PR to main. **Unit 1 is frozen**: its content, Urdu mirror, and existing
governance/review artefacts are never modified; any finding that demands a Unit 1 change is
escalated under G-2026-52..61, never applied.

The guide numbers its outline by week and chapter, not by unit. The units 2+ partition
below is **derived**: it merges the guide's contiguous teaching weeks into five further
blocks after the existing Unit 1 (Chapter 1, Weeks 1-2), labelled as derived with its basis
stated in the content-spec per D-2026-0012. The G0/G1 intake evaluator checks the partition
before any unit is authored, and the partition needs owner confirmation per D-2026-0012.

| Unit | Title | Weeks | Chapters | CLOs |
|---|---|---|---|---|
| 1 | Introduction to Educational Psychology (EXISTING, frozen) | 1-2 | 1 | CLO 1 |
| 2 | Human Growth and Development | 3-4 | 2 | CLO 1 |
| 3 | Learning Theories | 5-7 | 3 | CLO 1 |
| 4 | Cognitive Processes, Intelligence and Creativity | 8-10 | 4, 5 | CLO 1, 4 |
| 5 | Motivation, Individual Differences and Classroom Management | 11-13 | 6, 7, 8 | CLO 2, 3, 4 |
| 6 | Assessment, the Teaching-Learning Process and Well-being | 14-16 | 9, 10, 11+12 | CLO 3, 5, 6 |

Basis: whole weeks only, no reordering, no chapter split across units; block boundaries
fall where the guide's own chapters change character (development; learning theories;
cognition and intelligence; the learner in the classroom; the professional practice of
teaching and well-being). At 3 (3-0) credit hours that is 6, 6, 9, 9, 9 and 9 contact
hours for Units 1 to 6 respectively.

## Tasks

### Task 1: Extend content-spec.md (G1)

**File**: `specs/content/efmp-301/content-spec.md` (status: draft until evaluator approval)

- Keep Unit 1's approved G1 blocks byte-identical; restore the section headings the
  extended document needs without altering Unit 1's block bytes
- Front matter: `course_code: EFMP-301`, `bilingual: true`; course-wide items updated to
  the guide's full-course record: 6 CLOs verbatim, teaching strategies, practical work,
  assessment default (60/40, Art. III.7 - the guide is silent), reading list (the 2
  open-access guide books, verified by retrieval; D-2026-0001 flags only if a URL cannot
  be retrieved)
- Week schedule: the guide's own 16-week/12-chapter calendar; the units 2+ partition
  recorded as derived per D-2026-0012
- 5 new unit blocks (Units 2-6), each with: `### Sub-topic checklist` (IDs U2-.., U3-..,
  guide refs), `### Topic list` (reading-min + planned figures), `**Depth budget**`,
  `**Common misconceptions**`, `**Figure plan**` (>= 2 per topic, >= 1 schematic per unit),
  `**Unit-end assessment blueprint**` (10/10/5)

### Task 2: G0/G1 intake evaluation

Run `node scripts/prepare-intake-evidence.mjs EFMP-301` (follow the script's actual
usage), then spawn a fresh evaluator agent with the manifest path and the D-2026-0043..0052
code block (never "next free"). It evaluates the criteria (identity, partition, coverage,
outcomes, readings, blueprint, structure, decision residue) and records its decision in
`specs/decisions/log.md`. Apply findings (max 2 repair cycles, then escalate under
G-2026-52..61). If the evaluator escalates the derived partition (expected per
D-2026-0012) or any other owner-reserved item: commit everything and end the turn with a
BLOCKED report; the orchestrator obtains the rulings. Only after approval set
`status: approved`.

### Task 3: Extend the course tasks.md tracker

`specs/content/efmp-301/tasks.md`: append rows for Units 2-6 stages G1-G7, keeping Unit
1's existing rows untouched.

### Tasks 4-8: Author Units 2-6 (per-unit loop)

For each unit in order, under `docs/semester-1/efmp-301/unit-NN/`:

- author-unit skill: index.mdx + topic-NN.mdx nine-part cycles + unit-assessment.mdx
  (10/10/5 + bounded answers) + unit-teacher-notes.mdx; governance under
  `specs/content/efmp-301/` (coverage v2, sources, figures, concepts v4)
- generate-figures skill: >= 2 figures per topic, >= 1 concept-map/flowchart/timeline per
  unit; SVG authoring Codex-primary (`codex exec`) with Claude fallback (logged);
  dark variants via `npm run figures:variants`; `.ur.svg` + `.ur.dark.svg` Urdu-label
  variants required; illustrations stay prompt-only per ADR-0024
- `npm run check:content` fix loop (max 2 repair cycles per unit, then gap + continue)
- commit, then `node scripts/prepare-gate-evidence.mjs EFMP-301 <N>` and set the tracker
  G2 row with the gates path the script prints
- glossary: append new terms at the end of the glossary.json array only
- update `course-overview.mdx` to reflect the full course (drop any single-unit framing)

### Tasks 9-13: G3 review per new unit (advisory)

`node scripts/review-evidence.mjs prepare efmp-301 <N> G3 <outdir>`; spawn a fresh
g3-reviewer agent with the bundle path. Findings are advisory (ADR-0019): apply sensible
repairs (re-run prepare-gate-evidence if bytes change), never mark the G3 row done, never
sign, never use human initials. Max 2 review cycles then escalate. If a finding demands
changes to Unit 1, escalate - never edit the golden unit.

### Tasks 14-18: G4 translation + G5 review per new unit

translate-unit skill: complete Urdu mirror per unit under
`i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-NN/` (same file
set, heading vectors, components, figure IDs, assessment items; terminology.csv read-only;
academic-plain register; UR key_terms block). Then `review-evidence.mjs prepare ... G5`
and a fresh g5-reviewer agent (binds to accepted G3 evidence; advisory). Re-run
`npm run check:content` after each unit's mirror. Also: attempt to add advisory G5
evidence for Unit 1's open G5 row without touching Unit 1 bytes; if the machinery
requires byte changes or fails to bind, escalate under the G-block.

### Task 19: Final gates + PR

`npm run check:all` (full tier incl. bilingual Docusaurus build + vitest), fix findings
(max 2 cycles, then document). Push branch, open PR to main (no merge, no push to main).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Article | Requirement | How this plan complies |
|---|---|---|
| II.1-2 | Guide supremacy; every unit/SLO traces to a guide item | All sub-topics come from the guide's Week 1-16 chapter outline; clo_refs record the trace |
| II.3 | Guide ambiguity escalated, never invented | The units 2+ partition is derived-and-labelled (D-2026-0012) and goes to the evaluator with owner confirmation; the guide's silence on assessment criteria keeps the Art. III.7 default rather than inventing a table |
| III.1 | HSC-register simple English | author-unit register rules; glossary entries for technical terms |
| III.2 | Urdu parity for bilingual courses | Full G4 mirror + G5 review per new unit (course is bilingual: true) |
| III.3 | Bloom tags; 10/10/5 bank; Analyze-or-higher at per-topic Summative task and unit-end ERQ rubrics | item-writing rules in every topic file and unit-assessment |
| III.4 | Pakistan/Sindh-grounded examples | Per-sub-topic concrete examples (Sindh classrooms, Pakistani schools) |
| III.5 | Citations from guide/HEC/named academic sources; guide books listed, never reproduced | The guide's 2 open-access books verified by retrieval and bound with dates; supplements on the same terms; D-2026-0001 flags only where retrieval fails |
| III.6 | Guide-section fidelity (teaching strategies, practical work) | The guide's 5 strategies and 5 practical-work items folded into course-overview and unit-teacher-notes; nothing invented beyond them |
| III.7 | 60% summative / 40% formative default | The guide gives no assessment table, so the default applies and is stated |
| III.8 | Accessibility: alt text, no colour-only meaning, RTL-correct Urdu | Figure rules; .ur.svg mirrored layouts |
| III.9 | Zero em dash | check:no-em-dash over docs/, i18n/, specs/content/ |
| III.9a | Figure colour from published token set; theme by [data-theme]; wordmark | figure-palette.mjs token block; committed light/dark variants |
| III.10 | >= 2 figures per topic; >= 1 concept-map/flowchart/timeline per unit | Figure plans in the content-spec |
| IV | Spec -> plan -> tasks -> implementation -> gate | This feature's SDD flow; no unit authored before intake approval |
| V.1 | Content in Git, no platform-code change | Only content + specs + governance trees; no edits to catalog/, src/, scripts/, contracts/ |
| V.2 | Answers only in the bounded final section | unit-assessment.mdx `## Answers and marking guidance` |
| VI.1 | Build once, scale by semester; golden unit untouched | Unit 1 frozen byte-identical; new content only for Units 2-6 |
| VII | Review gates; delegated G0/G1 (Art. VII.8) and advisory G3/G5 (ADR-0019) | Evaluator + reviewer agents run fresh; D-codes from the pre-allocated D-2026-0043..0052 block; G3/G5 rows never marked done from advisory findings |
| VII.7 | Publication tiers; gate-checked tier needs standing authorisation | D-2026-0014 covers the 15 catalogued courses incl. EFMP-301; tracker rows record the tier's status honestly |
| X | Docs surfaces stay in sync | No student/teacher workflow change; content-only feature |

## Key Authoring Rules

- Register: plain English for a fresh HSC/intermediate graduate (Constitution Art. III.1)
- Pakistan/Sindh-grounded examples
- Real open-access sources (never invent citations); D-2026-0001 flags for unretrievable
  guide URLs
- Bloom tags: American spelling (Analyze not Analyse)
- clo_refs: `SLO:EFMP-301-N-X` form
- >= 2 figures per topic, >= 1 concept-map/flowchart/timeline per unit; six-value Kind
  vocabulary; every SVG <= 20 KB; role="img" with title/desc; wordmark; no colour-only
  meaning
- No em dash (U+2014 and relatives) in any content
- Illustrations stay prompt-only; Claude never invokes an image generator (ADR-0024)
- Shared hot files (specs/decisions/log.md, specs/gaps.md, glossary.json): append-only,
  only within the pre-allocated code blocks / at the array tail
- Unit 1 (docs, Urdu mirror, governance, reviews) is read-only for this feature

## Verification

1. `npm run check:content` passes (all gates)
2. `npm run check:all` passes (full tier incl. bilingual build + vitest)
3. All new SVG files exist and are <= 20 KB, with `.ur.svg` variants mirrored
4. `check:figures`: >= 2 carriers/topic, >= 1 schematic/unit
5. `check:concept-graph`: acyclic, resolvable
6. `check:bloom-bands`: MCQ Remember-Apply, RRQ Understand-Analyze, ERQ Analyze+
7. `check:depth-gate`: reading-min within budget per unit
8. Course renders at the Semester 1 route in both locales
9. `git diff` shows zero changes under `docs/semester-1/efmp-301/unit-01/`,
   `i18n/ur/.../efmp-301/unit-01/`, and Unit 1's existing governance/review artefacts
