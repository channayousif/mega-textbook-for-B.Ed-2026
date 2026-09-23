# Implementation Plan: Author GNAS-301 · Environmental Science

**Branch**: `019-author-gnas-301` | **Date**: 2026-09-23 | **Spec**: [spec.md](./spec.md)

## Context

GNAS-301 · Environmental Science is a 3 (2-1) credit General Education course for Semester 1
of the B.Ed (4-Year) programme, bilingual (English + Urdu). The course exists in
`catalog/courses.json` and has a legacy placeholder tree (coming_soon unit-01 five-file set)
at `docs/semester-1/gnas-301/` but no authored content. The course guide
(`Scheme-and-Course-guides/extracted-text/1st 2026.txt` lines 143-387) provides a course
description, 5 CLOs, a 16-week topical outline (1.1-16.2, no unit headings), a teaching
strategy list, an assessment criteria table (30 mid / 50 final / 10 assignment / 10
attendance), and 7 recommended books. The spec (FR-001..FR-011) defines the requirements.
This plan decomposes the work into tasks.

## Implementation Approach

Follow the gated Spec 006/008/009/012/016 workflow, on the degree track
(`docs/semester-1/gnas-301/`, never `licence/`). Full bilingual scope: every unit gets an
English authoring pass (G1-G3), SVG figures with `.ur.svg` mirrored Urdu variants, a
complete Urdu mirror (G4), and an advisory G5 review, before `check:all` and a PR to main.

The guide numbers its outline by week (Week 1-16, mid-term at Week 7, final at Week 16),
not by unit. The unit partition below is **derived**: it merges the guide's contiguous
teaching weeks into six blocks (pre-mid Weeks 1-6 -> Units 1-3; post-mid Weeks 8-15 plus
16.1 -> Units 4-6), labelled as derived with its basis stated in the content-spec per
D-2026-0012. The G0/G1 intake evaluator checks the partition before any unit is authored.

| Unit | Title | Weeks | Sub-topics | Topics | CLOs |
|---|---|---|---|---|---|
| 1 | Environmental Science and Ecosystems | 1-2 | 7 | 4 | CLO 1 |
| 2 | Water and Waste Management | 3-4 | 5 | 3 | CLO 1, 2 |
| 3 | Air, Noise and Environmental Hazards | 5-6 | 6 | 4 | CLO 2, 3 |
| 4 | Occupational Safety and Health | 8-10 | 15 | 7 | CLO 3, 4 |
| 5 | Toxicology Essentials and Environmental Governance | 11-12 | 7 | 4 | CLO 3, 4, 5 |
| 6 | Toxic Substances, Climate Change and Smog | 13-16 | 12 | 6 | CLO 2, 5 |

## Tasks

### Task 1: Create content-spec.md (G1)

**File**: `specs/content/gnas-301/content-spec.md` (status: draft until evaluator approval)

- Front matter: `course_code: GNAS-301`, `bilingual: true`
- Course-wide items: 5 CLOs verbatim from the guide, teaching strategies, assessment
  criteria, recommended readings (all 7, flagged per D-2026-0001 where unretrievable)
- Week schedule: the guide's own 16-week calendar; the unit partition recorded as derived
  per D-2026-0012
- 6 unit blocks, each with: `### Sub-topic checklist` (IDs U1-01..U6-12, guide refs),
  `### Topic list` (reading-min + planned figures), `**Depth budget**`,
  `**Common misconceptions**`, `**Figure plan**` (>= 2 per topic, >= 1 schematic per unit),
  `**Unit-end assessment blueprint**` (10/10/5)

### Task 2: G0/G1 intake evaluation

Run `node scripts/prepare-intake-evidence.mjs GNAS-301 specs/content/gnas-301/intake`,
then spawn a fresh evaluator agent with the manifest path and the D-2026-0020..0029 code
block. It evaluates the 8 criteria (identity, partition, coverage, outcomes, readings,
blueprint, structure, decision residue) and records its decision in
`specs/decisions/log.md`. Apply findings (max 2 repair cycles, then escalate under
G-2026-22..24). Only after approval set `status: approved`.

### Task 3: Create the course tasks.md tracker

`specs/content/gnas-301/tasks.md`: one row per unit per stage G1-G7, legend
(▢ not-started, ▣ in-progress, ✅ done with evidence), model on
`specs/content/geng-300/tasks.md`.

### Tasks 4-9: Author Units 1-6 (per-unit loop)

For each unit in order, under `docs/semester-1/gnas-301/unit-NN/`:

- author-unit skill: index.mdx + topic-NN.mdx nine-part cycles + unit-assessment.mdx
  (10/10/5 + bounded answers) + unit-teacher-notes.mdx; governance under
  `specs/content/gnas-301/` (coverage v2, sources, figures, concepts v4)
- generate-figures skill: >= 2 figures per topic, >= 1 concept-map/flowchart/timeline per
  unit; SVG authoring Codex-primary (`codex exec`) with Claude fallback (logged);
  dark variants via `npm run figures:variants`; `.ur.svg` + `.ur.dark.svg` Urdu-label
  variants required; illustrations stay prompt-only per ADR-0024
- `npm run check:content` fix loop (max 2 repair cycles per unit, then gap + continue)
- commit, then `node scripts/prepare-gate-evidence.mjs GNAS-301 <N>` and set the tracker
  G2 row with the gates path the script prints
- glossary: append new terms at the end of the glossary.json array only
- replace the legacy placeholder tree (delete activities/formative/summative.mdx and
  teacher-notes.mdx, drop coming_soon, rewrite course-overview.mdx, fix _category_.json)

### Tasks 10-15: G3 review per unit (advisory)

`node scripts/review-evidence.mjs prepare gnas-301 <N> G3 <outdir>`; spawn a fresh
g3-reviewer agent with the bundle path. Findings are advisory (ADR-0019): apply sensible
repairs (re-run prepare-gate-evidence if bytes change), never mark the G3 row done, never
sign, never use human initials. Max 2 review cycles then escalate.

### Tasks 16-21: G4 translation + G5 review per unit

translate-unit skill: complete Urdu mirror per unit under
`i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-NN/` (same file
set, heading vectors, components, figure IDs, assessment items; terminology.csv read-only;
academic-plain register; UR key_terms block). Then `review-evidence.mjs prepare ... G5`
and a fresh g5-reviewer agent (binds to accepted G3 evidence; advisory). Re-run
`npm run check:content` after each unit's mirror.

### Task 22: Final gates + PR

`npm run check:all` (full tier incl. bilingual Docusaurus build + vitest), fix findings
(max 2 cycles, then document). Push branch, open PR to main (no merge, no push to main).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Article | Requirement | How this plan complies |
|---|---|---|
| II.1-2 | Guide supremacy; every unit/SLO traces to a guide item | All 52 sub-topics come from the guide's 1.1-16.2 outline; clo_refs record the trace |
| II.3 | Guide ambiguity escalated, never invented | The unit partition is derived-and-labelled (D-2026-0012) and goes to the evaluator; the catalog/guide credit-hours difference is a non-conflict (totals agree) |
| III.1 | HSC-register simple English | author-unit register rules; glossary entries for technical terms |
| III.2 | Urdu parity for bilingual courses | Full G4 mirror + G5 review per unit (course is bilingual: true) |
| III.3 | Bloom tags; 10/10/5 bank; Analyze-or-higher at per-topic Summative task and unit-end ERQ rubrics | item-writing rules in every topic file and unit-assessment |
| III.4 | Pakistan/Sindh-grounded examples | Per-sub-topic concrete examples (Indus waters, Karachi air, Sindh classrooms) |
| III.5 | Citations from guide/HEC/named academic sources; guide books listed, never reproduced | Reading list + open-access substitutes; D-2026-0001 flags for print monographs |
| III.6 | Guide-section fidelity (teaching strategies, assessment criteria) | Folded into course-overview, unit-teacher-notes, and unit files; not invented where silent (no practical-work section in this guide) |
| III.7 | 60% summative / 40% formative default | Unit assessment blueprints follow the default |
| III.8 | Accessibility: alt text, no colour-only meaning, RTL-correct Urdu | Figure rules; .ur.svg mirrored layouts (v4.1) |
| III.9 | Zero em dash | check:no-em-dash over docs/, i18n/, specs/content/ |
| III.9a | Figure colour from published token set; theme by [data-theme]; wordmark | figure-palette.mjs token block; committed light/dark variants |
| III.10 | >= 2 figures per topic; >= 1 concept-map/flowchart/timeline per unit | Figure plans in the content-spec |
| IV | Spec -> plan -> tasks -> implementation -> gate | This feature's SDD flow; no unit authored before intake approval |
| V.1 | Content in Git, no platform-code change | Only content + specs + governance trees; no edits to catalog/, src/, scripts/, contracts/ |
| V.2 | Answers only in the bounded final section | unit-assessment.mdx `## Answers and marking guidance` |
| VI.1 | Build once, scale by semester; golden unit untouched | New course content only |
| VII | Review gates; delegated G0/G1 (Art. VII.8) and advisory G3/G5 (ADR-0019) | Evaluator + reviewer agents run fresh; D-codes from the pre-allocated block; G3/G5 rows never marked done from advisory findings |
| VII.7 | Publication tiers; gate-checked tier needs standing authorisation | D-2026-0014 covers the 15 catalogued courses incl. GNAS-301; tracker rows record the tier's status honestly |
| X | Docs surfaces stay in sync | No student/teacher workflow change; content-only feature |

## Key Authoring Rules

- Register: plain English for a fresh HSC/intermediate graduate (Constitution Art. III.1)
- Pakistan/Sindh-grounded examples
- Real open-access sources (never invent citations); D-2026-0001 flags for unretrievable
  guide monographs
- Bloom tags: American spelling (Analyze not Analyse)
- clo_refs: `SLO:GNAS-301-N-X` form
- >= 2 figures per topic, >= 1 concept-map/flowchart/timeline per unit; six-value Kind
  vocabulary; every SVG <= 20 KB; role="img" with title/desc; wordmark; no colour-only
  meaning
- No em dash (U+2014 and relatives) in any content
- Illustrations stay prompt-only; Claude never invokes an image generator (ADR-0024)
- Shared hot files (specs/decisions/log.md, specs/gaps.md, glossary.json): append-only,
  only within the pre-allocated code blocks / at the array tail

## Verification

1. `npm run check:content` passes (all 11 gates)
2. `npm run check:all` passes (full tier incl. bilingual build + vitest)
3. All SVG files exist and are <= 20 KB, with `.ur.svg` variants mirrored
4. `check:figures`: >= 2 carriers/topic, >= 1 schematic/unit
5. `check:concept-graph`: acyclic, resolvable
6. `check:bloom-bands`: MCQ Remember-Apply, RRQ Understand-Analyze, ERQ Analyze+
7. `check:depth-gate`: reading-min within budget per unit
8. Course renders at the Semester 1 route in both locales
