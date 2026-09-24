# Implementation Plan: Author GQUR-300 · Quantitative Reasoning-I

**Branch**: `021-author-gqur-300` | **Date**: 2026-09-23 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/021-author-gqur-300/spec.md`

## Summary

GQUR-300 · Quantitative Reasoning-I is a 3-credit General Education course for Semester 1
of the B.Ed (4-Year) programme. The course exists in `catalog/courses.json` with only a
legacy placeholder tree at `docs/semester-1/gqur-300/`. The authoritative course guide
(`Scheme-and-Course-guides/extracted-text/1st 2026.txt` lines 549-715, "Quantitative
Reasoning-1(Maths)") provides 5 learning outcomes, 6 explicit unit headings, teaching
strategies, practical work, assessment criteria, and 4 recommended readings. This plan
decomposes the full bilingual authoring workflow (English units, SVG figures, Urdu mirrors,
G3/G5 advisory reviews) into gated tasks.

## Technical Context

**Language/Version**: Markdown/MDX content authored against style-guide v4.0 (frozen
standard); gate scripts are plain Node ESM on Node 22+
**Primary Dependencies**: Existing Docusaurus 3.10 pipeline, `scripts/lib/figure-palette.mjs`
token set, `scripts/lib/gates.mjs` gate lists - no new dependencies
**Storage**: Filesystem / Git only (Constitution Art. V.1) - content under `docs/` and
`i18n/ur/`, governance under `specs/content/gqur-300/`
**Testing**: `npm run check:content` (11 gates) per unit; `npm run check:all` (full tier
incl. bilingual Docusaurus build + vitest) at course end
**Target Platform**: textbook.com.pk/semester-1/gqur-300/ (degree track, docs plugin at
site root), Urdu mirror at /ur/semester-1/gqur-300/
**Project Type**: Content authoring feature (no source-code changes)
**Constraints**: Every SVG <= 20 KB, palette tokens only, no colour-only meaning, zero em
dash, no edits to catalog/, src/, scripts/, contracts/, sidebars, config, package files
**Scale/Scope**: 6 units, full English + full Urdu, >= 2 figures per topic, 10/10/5
assessment bank per unit, 4 governance tables per unit

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Article | Requirement | Plan |
|---|---|---|
| III.1 Simple English | HSC/intermediate register | Plain-English prose, bilingual glossary entries for any technical term |
| III.2 Urdu parity | Complete Urdu version, G5 before corpus complete | Full Urdu mirror per unit (bilingual: true course); parity is corpus-completion, not per-unit publish gate |
| III.3 Bloom's tagging | Tags on every item; Analyze+ in summative and ERQ rubrics | 10/10/5 bank with Bloom tags; >= 1 Analyze-or-higher per topic Summative task and unit-end ERQ rubrics |
| III.4 Pakistan-grounded | Sindh/Pakistani contexts | School enrolment data, class marksheets, Sindh census figures, rupee budgeting |
| III.5 Citations | Real sources, no invented citations, no copyrighted reproduction | Guide's 4 readings as bibliographic anchors + open-access supplements; print monographs flagged per D-2026-0001 |
| III.6 Guide-section fidelity | Fold guide strategies/practical work/assessment criteria into units + overview | Teaching strategies, practical work, assessment criteria carried in course-overview + unit-teacher-notes per unit |
| III.7 Assessment weighting | 60/40 summative/formative default | Unit blueprints follow the default; no per-unit deviation |
| III.8 Accessibility | Headings, alt text, no colour-only meaning, RTL-correct Urdu | Figure SVGs carry role="img" + title/desc; Urdu mirror RTL-correct |
| III.9 Punctuation | Zero em dash | Spaced hyphen or restructure; gate-enforced |
| III.9a Figure rendering | Theme via site theme attribute, palette tokens, WCAG AA, redundant colour, wordmark | Two committed variants (light/dark) via `npm run figures:variants`; tokens from figure-palette.mjs |
| III.10 Visual density | >= 2 figures per topic-*.mdx, >= 1 concept-map/flowchart/timeline per unit | Figure plan guarantees both minima per unit |
| V.1 Content in Git | No database for content | All artefacts in Git |
| VI.1 Standard versioning | Style-guide v4.0 frozen until 50 concept graphs | Author to v4.0; no standard edits |
| VII.8 Delegated gate evaluation | G0/G1 evaluator as fresh subagent, D-codes from pre-assigned block | Evaluator spawned fresh with D-2026-0040..0049; G3/G5 reviewers advisory (ADR-0019), rows never marked done by agent |

No violations. No complexity tracking entries required.

## Implementation Approach

Follow the gated Spec 006/008 workflow. Author full bilingual scope (English + Urdu
mirrors, G4/G5 included). Use the degree track (`docs/semester-1/gqur-300/unit-NN/`).
Replace the legacy placeholder tree. Mathematical notation stays simple and consistent;
numerals follow the style guide.

## Project Structure

### Documentation (this feature)

```text
specs/021-author-gqur-300/
├── plan.md              # This file
├── spec.md              # Feature spec
├── tasks.md             # Task tracker (sp.tasks output)
└── checklists/requirements.md

specs/content/gqur-300/
├── content-spec.md      # G1 content spec (course-wide + 6 unit blocks)
├── tasks.md             # Per-unit G1-G7 tracker
├── intake/              # G0/G1 intake evidence
├── coverage/unit-NN.md  # v2 coverage matrices
├── sources/unit-NN.md   # Sources-consulted lists
├── figures/unit-NN.md   # Figure manifests (v2)
├── concepts/unit-NN.md  # v4 concept graphs
└── reviews/unit-NN/G3|G5/  # Advisory review bundles

docs/semester-1/gqur-300/
├── _category_.json
├── course-overview.mdx
└── unit-NN/
    ├── _category_.json
    ├── index.mdx
    ├── topic-NN.mdx
    ├── unit-assessment.mdx
    └── unit-teacher-notes.mdx

i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-NN/
    └── (same file set, Urdu)

static/img/figures/gqur-300/unit-NN/
    └── <figId>.svg, <figId>.dark.svg, <figId>.ur.svg, <figId>.ur.dark.svg
```

**Structure Decision**: Content authoring feature; no source code changes. All new files
live in the content and governance trees above.

## Tasks

### Task 1: Create content-spec.md (G1)

**File**: `specs/content/gqur-300/content-spec.md`

Create the content-spec with `status: draft` first, `approved` only after evaluator
approval:

- **Front-matter**: `course_code: GQUR-300`, `status: draft`
- **Header**: Degree track (semester-1), 3 (3-0) credit hours, 16 weeks
  (derived-and-labelled per D-2026-0012), source reference (guide lines 549-715)
- **Course-wide items**:
  - 5 CLOs (verbatim from guide): demonstrate numerical and algebraic reasoning; solve
    real-world quantitative problems; apply proportional and logical reasoning;
    communicate mathematical ideas clearly; interpret tables, graphs, and statistical
    information
  - Teaching strategies: interactive lectures, problem-solving sessions, group
    activities, real-life case studies, guided practice and discussions (+ lecture,
    discussions, question-answer, brainstorming)
  - Assessment criteria: class test, mid term, evaluation of assignments, class
    attendance, class participation/performance
  - Practical work: group work, group assignments, individual assignment, presentations
  - 4 recommended readings (Steen; Grawe; National Curriculum for Mathematics Pakistan;
    HEC National Professional Standards for Teachers) + open-access supplements
  - Week schedule: derived-and-labelled per D-2026-0012 (guide has no week table)

- **6 unit blocks**, each with:
  - `### Sub-topic checklist` table
  - `### Topic list` table (reading-min + figures)
  - `**Depth budget**`
  - `**Common misconceptions**`
  - `**Figure plan**` (>= 2 per topic, >= 1 schematic per unit)
  - `**Unit-end assessment blueprint**` (10/10/5)

| Unit | Title | Weeks | Guide sub-topics |
|---|---|---|---|
| 1 | Foundations of Quantitative Reasoning | 1-3 | nature/importance, numeracy and number sense, estimation and approximation, logical reasoning and problem-solving strategies |
| 2 | Numbers and Operations | 4-6 | whole numbers/integers/fractions/decimals, ratios/proportions/percentages, powers and roots, applications in daily life |
| 3 | Algebraic Reasoning | 7-9 | variables and expressions, linear equations and inequalities, patterns and sequences, algebra in problem solving |
| 4 | Measurement and Geometry | 10-11 | units of measurement, perimeter/area/volume, basic geometric shapes and properties, applications in real contexts |
| 5 | Data Analysis and Statistics | 12-14 | collection and organization of data, tables/graphs/charts, measures of central tendency, interpretation of statistical information |
| 6 | Quantitative Reasoning in Everyday Life | 15-16 | financial literacy (profit, loss, interest, budgeting), QR in media and advertisements, decision-making using quantitative data, interpreting quantitative information in education and society |

### Task 2: G0/G1 Intake Evaluation

**Files**:
- `specs/content/gqur-300/intake/` (from `scripts/prepare-intake-evidence.mjs`)
- `specs/decisions/log.md` (append-only, D-2026-0040..0049 block only)

1. Run `node scripts/prepare-intake-evidence.mjs GQUR-300 specs/content/gqur-300/intake`
2. Spawn the evaluator agent FRESH (never sees drafting context) with the manifest path,
   course code, and the D-code block D-2026-0040..0049
3. Apply findings (max 2 repair cycles, then escalate under G-2026-28..30)
4. Only after approval set content-spec `status: approved`

### Task 3-8: Author Units 1-6 (per-unit loop)

For each unit N in 1..6, under `docs/semester-1/gqur-300/unit-NN/`:

- `index.mdx` (unit opening)
- `topic-NN.mdx` nine-part cycles (A real classroom situation -> Explanation with one
  ### per sub-topic ID -> Activity -> Check your understanding (>= 3) -> Summary ->
  Self-assessment checklist (>= 3) -> Try this at your practicum school -> Summative task
  (>= 1 Analyze-or-higher) -> Further reading (>= 1 citation))
- `unit-assessment.mdx` (10 MCQ / 10 RRQ / 5 ERQ, Bloom tags, bounded Answers and marking
  guidance)
- `unit-teacher-notes.mdx` (guide supplies strategies)
- Governance: `coverage/unit-NN.md` (v2), `sources/unit-NN.md`, `figures/unit-NN.md`,
  `concepts/unit-NN.md` (v4; Label UR from terminology.csv where banked, authored labels
  listed and flagged for G5)
- `translation_status: draft` + `<TranslationStatusBadge status="draft" />`
- Figures: >= 2 per topic, >= 1 concept-map/flowchart/timeline per unit, six-value Kind
  vocabulary, SVG <= 20 KB, palette tokens, role="img" + title/desc, wordmark, dark
  variants via `npm run figures:variants`, `.ur.svg` + `.ur.dark.svg` Urdu-label variants
- `npm run check:content` fix loop (max 2 repair cycles, then gap under G-code)
- Commit per unit, then `node scripts/prepare-gate-evidence.mjs GQUR-300 <N>` and set
  tracker G2 row with the printed gates path
- Glossary: append new terms at the END of glossary.json array only

### Task 9: G3 review on every unit (advisory)

For each unit: `node scripts/review-evidence.mjs prepare gqur-300 <N> G3 <outdir>`, spawn
g3-reviewer agent FRESH with the bundle path. Findings ADVISORY (ADR-0019): apply sensible
repairs (re-run prepare-gate-evidence if bytes change), never mark the G3 row done, never
sign, never use human initials. Max 2 review cycles then escalate under G-code.

### Task 10: G4 translation + G5 review on every unit

For each unit: translate-unit skill produces the complete Urdu mirror under
`i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-NN/` (same file
set, heading vectors, components, figure IDs, assessment items; terminology.csv read-only;
academic-plain register; UR key_terms block). Then `node scripts/review-evidence.mjs
prepare gqur-300 <N> G5 <outdir>`, spawn g5-reviewer agent FRESH (binds to accepted G3
evidence; advisory). Re-run `npm run check:content` after each unit's mirror.

### Task 11: Final gates + PR

1. `npm run check:all` (full tier incl. bilingual Docusaurus build + vitest); fix findings
   (max 2 cycles, then document)
2. `git push -u origin HEAD`; `gh pr create --base main` with course summary
3. Do NOT merge, do NOT push to main

## Key Authoring Rules

- Register: plain English for HSC/intermediate graduate (Constitution Art. III.1)
- Pakistan/Sindh-grounded examples (school enrolment, class marksheets, Sindh census
  figures, rupee budgeting)
- Real verifiable sources (never invent citations); print monographs flagged per
  D-2026-0001
- Bloom tags: American spelling (Analyze not Analyse)
- Mathematical notation simple and consistent; numerals follow the style guide
- >= 2 figures per topic, >= 1 concept-map/flowchart/timeline per unit
- No em dash (U+2014) in any content
- No colour-only meaning in figures; every SVG <= 20 KB with palette tokens and wordmark
- Illustrations stay prompt-only for Codex (ADR-0024); schematics via Codex-primary SVG
  authoring with Claude fallback (log which was used)
- G3/G5 rows never marked done from agent findings; no human initials

## Verification

1. `npm run check:content` passes (all 11 gates) after every unit and every Urdu mirror
2. All SVG files exist and are <= 20 KB, with light/dark and en/ur variants
3. `check:figures` passes (>= 2/topic, >= 1 schematic/unit)
4. `check:concept-graph` passes (acyclic, resolvable)
5. `check:bloom-bands` passes (MCQ Remember-Apply, RRQ Understand-Analyze, ERQ Analyze+)
6. `check:depth-gate` passes (reading-min within budget)
7. `check:pipeline-gate` passes (bilingual parity + translation_status)
8. Course renders at textbook.com.pk/semester-1/gqur-300/ in both locales
9. `npm run check:all` green before PR
