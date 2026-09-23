# Implementation Plan: Author GICT-300 · Application of ICT

**Branch**: `020-author-gict-300` | **Date**: 2026-09-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/020-author-gict-300/spec.md`

## Summary

GICT-300 · Application of ICT is a new 3 (2-1) credit General Education course for Semester 1
of the B.Ed (4-Year) programme. The course guide (extracted text lines 374-538 of
`Scheme-and-Course-guides/extracted-text/1st 2026.txt`) provides 8 CLOs, an explicit 6-unit
outline (31 leaf sub-topics), 5 teaching strategies, 5 practical-work items, and 5 recommended
books. A legacy placeholder tree exists at `docs/semester-1/gict-300/` (coming_soon unit-01
five-file set). This plan authors the full course in English (Spec 008 per-topic layout),
renders its SVG figures, mirrors every unit into Urdu (G4), obtains advisory G3/G5 reviews,
replaces the placeholder tree, and opens a PR. The course is degree-track and bilingual.

## Technical Context

**Language/Version**: Content in Markdown/MDX; gate scripts are plain Node ESM on Node 22+
**Primary Dependencies**: Docusaurus 3.10 (existing), gray-matter, ajv (existing); no new
dependency is added by this feature
**Storage**: Filesystem/Git only (Constitution Art. V.1); governance tables under
`specs/content/gict-300/`
**Testing**: `npm run check:content` (11 gates) per unit; `npm run check:all` before the PR
**Target Platform**: textbook.com.pk degree-track route (`docs/semester-1/gict-300/`), with
the Urdu mirror at `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/`
**Project Type**: content authoring feature (no platform code changes)
**Performance Goals**: every figure SVG <= 20 KB; content pages within the existing
Art. V.5 budget
**Constraints**: no edits to catalog/, sidebars*.ts, docusaurus.config.ts, src/, scripts/,
contracts/, style-guide.md, terminology.csv, constitution, package.json; zero em dashes;
no new dependencies; append-only on shared hot files (specs/decisions/log.md, specs/gaps.md,
glossary.json) within the pre-assigned code blocks
**Scale/Scope**: 6 units, ~25 topics, ~50+ SVG figures (each with light/dark/Urdu variants),
6 Urdu mirrors, 6 G3 + 6 G5 advisory reviews

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Article | Requirement | How this plan complies |
|---|---|---|
| II.1/II.2 | Guide is sole source of truth; traceability in `clo_refs` | Every unit/topic front-matter carries `clo_refs: SLO:GICT-300-N-X`; the 6-unit partition follows the guide's own Unit 1-6 headings verbatim |
| II.3 | Ambiguity escalated, never invented | Guide-silent week schedule recorded per D-2026-0012; print-only monographs per D-2026-0001; anything else the guide does not settle goes to specs/gaps.md under G-2026-25..27 |
| III.1 | Simple English, HSC register | Plain-English ceiling throughout; new terms glossed on first use |
| III.2 | Urdu parity (bilingual course) | Complete Urdu mirror per unit (G4) bound to the frozen terminology bank; translation_status transitions per the translate-unit skill; G5 advisory review per unit |
| III.3 | Bloom tags; 10/10/5 unit bank | Per-topic formative/summative cycles with >= 1 Analyze-or-higher criterion; unit-end 10 MCQ / 10 RRQ / 5 ERQ with rubrics |
| III.4 | Pakistan/Sindh-grounded examples | School ICT labs, Sindh education contexts, local classroom vignettes |
| III.5 | Real citations only | Guide's 5 books at title level (D-2026-0001); open-access supplements verified via WebSearch/WebFetch; never invented |
| III.6 | Guide-section fidelity | Teaching strategies, practical work, and readings folded into course-overview + unit-teacher-notes; nothing invented |
| III.7 | 60/40 summative/formative | Unit blueprints follow the pipeline default |
| III.8 | Accessibility | Semantic headings, alt text, RTL-correct Urdu, no colour-only meaning |
| III.9/III.9a/III.10 | No em dash; figure theming/palette/wordmark; visual density | Zero em dashes; figures themed via two committed variants from the published token set; >= 2 figures per topic, >= 1 concept-map/flowchart/timeline per unit |
| V.1 | Content in Git | Markdown/MDX under docs/ and i18n/; governance under specs/content/ |
| VII | Review gates | G2 via deterministic gates (auto:gates evidence); G3/G5 advisory only, never marked done, no human initials; G0/G1 via evaluator under D-2026-0030..0039; publication tier per D-2026-0014 handled by the existing pipeline |
| VII.8 | Delegated G0/G1 | Evaluator runs as a FRESH subagent bound to the intake manifest; approvals recorded pending-owner-review from the pre-assigned D-code block only |
| VI.1 | Standard versioning | Style guide is at v4.0 (frozen until 50 units carry a concept graph); this feature authors at the current standard, no bump |

No violations. No Complexity Tracking entries required.

## Project Structure

### Documentation (this feature)

```text
specs/020-author-gict-300/
├── plan.md              # This file
├── spec.md              # Feature specification
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Task checklist (/sp.tasks output)

specs/content/gict-300/
├── content-spec.md      # G1 content spec (status: draft -> approved)
├── tasks.md             # Per-unit G1-G7 pipeline tracker
├── intake/              # G0/G1 intake manifest + evaluation
├── coverage/unit-NN.md  # v2 coverage matrices
├── sources/unit-NN.md   # Sources-consulted lists
├── figures/unit-NN.md   # Figure manifests (v3 Kind vocabulary)
├── concepts/unit-NN.md  # v4 concept graphs
└── reviews/unit-NN/G3|G5/  # Advisory review bundles
```

### Content (repository root)

```text
docs/semester-1/gict-300/
├── _category_.json
├── course-overview.mdx
└── unit-NN/
    ├── index.mdx
    ├── topic-NN.mdx
    ├── unit-assessment.mdx
    └── unit-teacher-notes.mdx

i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/
└── unit-NN/            # Complete Urdu mirror, same file set

static/img/figures/gict-300/unit-NN/
├── fig-UN-M.svg        # Light schematic
├── fig-UN-M.dark.svg   # Dark variant
├── fig-UN-M.ur.svg     # Urdu-label light variant
└── fig-UN-M.ur.dark.svg # Urdu-label dark variant
```

**Structure Decision**: degree-track content under `docs/semester-1/gict-300/` (per the
orchestrator's placement instruction; never licence/), Urdu mirror under the docs-plugin
translation directory, figures under the course-lowercase static tree. The legacy five-file
placeholder set in unit-01 is deleted and replaced by the per-topic layout.

## Implementation Approach

Follow the gated Spec 006/008/009/012/016 workflow, per unit in guide order:

1. **G1**: author `specs/content/gict-300/content-spec.md` (status: draft), commit, run
   `node scripts/prepare-intake-evidence.mjs GICT-300 specs/content/gict-300/intake`, spawn
   the evaluator (fresh subagent) with the D-2026-0030..0039 block; apply findings (max 2
   repair cycles, then escalate under G-2026-25..27); set status: approved only after
   approval. Create the per-unit G1-G7 tracker.
2. **Per unit (1..6)**: author-unit skill (EN files + governance), generate-figures skill
   (SVGs, dark + Urdu variants, Codex-primary/Claude-fallback), `npm run check:content`
   fix loop (max 2 cycles), commit, `node scripts/prepare-gate-evidence.mjs GICT-300 <N>`,
   set the tracker G2 row from the printed gates path, commit.
3. **G3 per unit**: `node scripts/review-evidence.mjs prepare gict-300 <N> G3 <outdir>`,
   spawn a fresh g3-reviewer subagent; findings advisory; apply sensible repairs (re-run
   prepare-gate-evidence if bytes change); G3 rows stay not-started with the report path in
   Notes; max 2 cycles then escalate.
4. **G4/G5 per unit**: translate-unit skill (complete Urdu mirror, terminology-bank bound,
   translation_status: draft), then G5 via a fresh g5-reviewer subagent bound to accepted
   G3 evidence; advisory; re-run `npm run check:content` after each mirror.
5. **Final**: `npm run check:all`, push branch, open PR to main (never merge, never push
   to main directly).

### Key Authoring Rules

- Register: plain English for a fresh HSC/intermediate graduate (Art. III.1)
- Pakistan/Sindh-grounded examples (school ICT labs, Sindh education contexts)
- Real open-access sources (never invent citations); print monographs title-level only
  (D-2026-0001)
- Bloom tags: American spelling (Analyze not Analyse)
- clo_refs: `SLO:GICT-300-N-X`
- >= 2 figures per topic, >= 1 concept-map/flowchart/timeline per unit; six-value Kind
  vocabulary; SVGs <= 20 KB; palette tokens; wordmark; role="img" with title/desc
- Illustrations stay prompt-only (ADR-0024); never invoke an image generator
- No em dash anywhere; glossary appends at the END of the glossary.json array only
- Max 2 repair/review cycles per stage, then escalate under G-2026-25..27

## Verification

1. `npm run check:content` passes (all 11 gates) after every unit
2. All SVG files exist, are <= 20 KB, and carry light/dark/Urdu variants
3. `check:figures` passes (>= 2/topic, >= 1 schematic/unit, marker/manifest parity)
4. `check:concept-graph` passes (acyclic, resolvable, Label UR from terminology.csv where banked)
5. `check:bloom-bands` passes (MCQ Remember-Apply, RRQ Understand-Analyze, ERQ Analyze+)
6. `check:depth-gate` passes (reading-min within the content-spec budget)
7. Bilingual parity gates pass for every unit after its Urdu mirror
8. `npm run check:all` green before the PR
9. Course renders on the degree-track route with all 6 units
