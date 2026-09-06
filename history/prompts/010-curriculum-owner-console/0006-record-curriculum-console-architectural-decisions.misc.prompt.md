---
id: 0006
title: Record curriculum console architectural decisions
stage: misc
date: 2026-09-05
surface: agent
model: claude-sonnet-5
feature: 010-curriculum-owner-console
branch: 010-curriculum-owner-console
user: channayousif
command: /sp.adr
labels: ["adr", "reader-feedback", "self-assessment", "catalog-edit", "dom-hydration"]
links:
  spec: specs/010-curriculum-owner-console/spec.md
  ticket: null
  adr: history/adr/0013-reader-feedback-dedicated-table-and-in-house-passage-capture.md
  pr: null
files:
  - history/adr/0013-reader-feedback-dedicated-table-and-in-house-passage-capture.md
  - history/adr/0014-self-assessment-checklist-position-keyed-dom-hydration.md
  - history/adr/0015-curriculum-owner-catalog-edits-download-and-commit-flow.md
tests:
  - none (governance documentation stage; no code exists yet)
---

## Prompt

/sp.adr

(No additional user input beyond the command itself. This ran as a direct follow-up to the
completed `/sp.plan` -> `/sp.tasks` -> `/sp.analyze` (+ remediation) sequence for this feature,
whose plan.md itself flagged four architectural decisions for `/sp.adr` - three named explicitly
by spec.md's own "Architectural decisions to record during planning" section, plus a fourth
spec.md called "lighter, may be a plan note instead.")

## Response snapshot

Ran `.specify/scripts/bash/check-prerequisites.sh --json` (plan.md present, research.md/
data-model.md/contracts/ all available), then scanned `history/adr/` (12 existing ADRs, next id
0013) for conflicts - none found; ADR-0012 (Spec 009's `<Figure>` component pattern) and ADR-0004
(the data-driven `catalog/courses.json`) are directly relevant precedents, referenced rather than
conflicted with.

Applied the clustering rule from the command's own worked example (group decisions that would
change together; separate decisions that could diverge independently) rather than plan.md's
earlier suggestion to bundle all four into one ADR - re-evaluated because plan.md's own three
named decisions actually split into two independently-evolvable subsystems (the reader-feedback
data model + passage-capture mechanism are one coupled design; the catalog-edit mechanism is
unrelated to feedback entirely), plus a third decision (the self-assessment checklist's DOM-
hydration technique) that passed the three-part significance test even though it wasn't one of
spec.md's four named items - it establishes a new, precedent-setting interaction pattern
(hydrate rendered markup by position, contrasting directly with ADR-0012's component-import
pattern) with real alternatives and real long-term risk (documented in plan.md's own Risks
section). Created three ADRs accordingly, all `Status: Accepted` (the plan/tasks/contracts these
decisions live in already treat them as settled, not tentative):

- **ADR-0013** - Reader Feedback: Dedicated Table and In-House Passage Capture. Covers
  `content_feedback` as a third, distinct table from Spec 005's `activity_feedback`/
  `improvement_suggestions` (research.md R8), `window.getSelection()`-based passage capture with
  no annotation library (R7), server-stamped identity/status (data-model.md's two triggers), and
  the five-page-kind reach rule (R6).
- **ADR-0014** - Self-Assessment Checklist: Position-Keyed DOM Hydration, No New Component.
  Covers the `DocItem/Content.tsx` swizzle approach versus ADR-0012's component-import pattern,
  the locale-proof positional heading lookup (R2), the position+wording-snapshot item identity
  (R3), and the localStorage/merge-on-sign-in mechanics (R4) - plus a "related, lighter decision"
  subsection folding in spec.md's fourth, deliberately-not-its-own-ADR item (self-assessment
  independence from `unit_progress`).
- **ADR-0015** - Curriculum-Owner Catalog Edits: Download-and-Commit Flow, Not a Live Database
  Write. Covers the build-time static copy of `catalog/courses.json`, the in-browser edit form
  producing a downloadable replacement file, and the deliberate, accepted manual-commit step -
  resolving FR-029's "mechanism settled during planning" instruction.

Each ADR passed the Analyze/Measure checklist: clusters multiple related components (not a
single-file/trivial change), lists 3-4 explicit rejected alternatives with pros/cons each, and
states both positive and negative consequences. Verified zero unresolved `{{PLACEHOLDER}}` tokens
and zero em-dash characters across all three files, and confirmed the referenced ADR-0004/ADR-0012
cross-links point at real, existing ADRs with matching titles.

## Outcome

- Impact: every architecturally significant decision this feature's plan/research/data-model
  already committed to now has a permanent, reviewable rationale record, separated along genuine
  subsystem boundaries rather than either over-bundled (one ADR for four unrelated things) or
  over-granular (an ADR per atomic technology choice).
- Tests: n/a (governance documentation; no code exists yet for this feature).
- Files: `history/adr/0013-*.md`, `0014-*.md`, `0015-*.md` (3 new ADRs, IDs 0013-0015).
- Next prompts: begin implementation at `tasks.md` T001, referencing these three ADRs from the
  relevant migrations/components as they're built (matching the existing convention of code
  comments citing an ADR, e.g. `activity_feedback.ts`'s docstring pattern).
- Reflection: plan.md's own earlier suggestion ("group related decisions... as one ADR since they
  are one coherent design conversation") turned out to be the over-bundling failure mode this
  command's own Analyze step explicitly warns against once actually tested against the "would
  these evolve independently" question - the catalog-edit mechanism has nothing to do with reader
  feedback's data shape, and deferring to the command's clustering rule rather than the earlier
  plan.md note produced a more useful split.

## Evaluation notes (flywheel)

- Failure modes observed: none - the main judgment call (re-clustering away from plan.md's
  own earlier "one ADR" suggestion) was caught by applying the command's explicit clustering
  test rather than accepting the earlier note at face value.
- Graders run and results (PASS/FAIL): significance checklist PASS for all three ADRs (impact,
  >=1 alternative with rationale, pros/cons for chosen + alternatives, concise-but-detailed);
  placeholder-resolution scan PASS (0 remaining); em-dash scan PASS (0 found).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
