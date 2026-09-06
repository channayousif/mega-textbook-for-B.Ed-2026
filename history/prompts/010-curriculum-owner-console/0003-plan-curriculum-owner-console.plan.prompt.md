---
id: 0003
title: Plan curriculum owner console
stage: plan
date: 2026-09-05
surface: agent
model: claude-sonnet-5
feature: 010-curriculum-owner-console
branch: 010-curriculum-owner-console
user: channayousif
command: /sp.plan
labels: ["plan", "self-assessment", "content-feedback", "admin-console", "rls", "content-status-report"]
links:
  spec: specs/010-curriculum-owner-console/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/010-curriculum-owner-console/plan.md
  - specs/010-curriculum-owner-console/research.md
  - specs/010-curriculum-owner-console/data-model.md
  - specs/010-curriculum-owner-console/quickstart.md
  - specs/010-curriculum-owner-console/contracts/console-operations.md
  - specs/010-curriculum-owner-console/contracts/self-assessment-hydration.md
  - CLAUDE.md
tests:
  - none (planning stage)
---

## Prompt

/sp.plan

(User input for this invocation was empty — the command ran with no additional argument, against
the already-approved `specs/010-curriculum-owner-console/spec.md`, per the standard `/sp.plan`
outline: run `setup-plan.sh`, load the feature spec + constitution, fill Technical Context and
the Constitution Check, then produce Phase 0 `research.md` and Phase 1 `data-model.md`/
`contracts/`/`quickstart.md`, updating the agent context file at the end.)

## Response snapshot

Ran `.specify/scripts/bash/setup-plan.sh --json` (copied the plan template, branch
`010-curriculum-owner-console`), then read `spec.md` (6 user stories, 33 FRs, 1 clarify session)
and the constitution (v2.7.0). Surveyed the existing codebase for every precedent this feature
extends before designing anything: Spec 005's `activity_feedback`/`improvement_suggestions`
tables and their guard-trigger pattern, Spec 004's `unitProgress.ts`, the swizzled
`DocItem/Footer.tsx`, the admin pages under `src/pages/app/admin/`, `AuthGuard`/
`StudentDashboardGuard`, the three content gate scripts (`check-figures.mjs`,
`check-unit-depth.mjs`, `build-content-index.mjs`), the CI workflow, and the Spec 008
`topic-cycle.md` contract that defines exactly how the self-assessment checklist is authored
today (plain disabled GFM checkboxes, no component).

Produced the full Phase 0–1 design set:

- **research.md** — 10 decisions: R1–R3 hydrate the existing disabled checkboxes client-side by
  DOM position (never editing topic source, per FR-008), with a locale-proof heading lookup and a
  wording-snapshot rule for FR-009's "material change" case; R4 the one-time local→account merge
  on first sign-in; R5 a shared `countChecklistInSection()` helper feeding both the depth gate and
  a new per-topic count in `content-index.json` for the Progress roll-up; R6 scopes the reader-
  feedback control to exactly the five Spec 008 page kinds spec.md's own acceptance scenarios
  name; R7 native `window.getSelection()` passage capture (RTL/reading-order correct for free, no
  new dependency); R8 why `content_feedback` is a third table, distinct from Spec 005's two
  streams; R9 the Story 4 report reuses the two existing gates' own parsing via three extracted
  `scripts/lib/` modules rather than re-deriving anything (FR-033 verbatim); R10 "refresh" re-reads
  a build-time JSON artifact rather than triggering a live rebuild, keeping this P3 convenience
  free of new deploy-trigger infrastructure.
- **data-model.md** — 2 new tables (`self_assessment_checks`, `content_feedback`) with full RLS,
  3 triggers (an identity-immutability guard, an author-role stamp, a status-transition guard
  modeled on Spec 005's `enforce_suggestion_status_transition()`), the access-control matrix, and
  3 file-based entities (feedback export bundle, content-status snapshot, extended content-index
  record).
- **contracts/console-operations.md** — permitted ops/denial shapes for both tables plus the
  file-based operations, and a 15-item RLS contract test checklist.
- **contracts/self-assessment-hydration.md** — the exact DOM-hydration mechanism (activation
  condition, position-based section location, item reading/wiring, checked-state resolution
  across signed-in/signed-out/merge states).
- **quickstart.md** — migration order, the mandatory script-extraction-before-report-script
  build order, frontend build order, the revision-loop walkthrough, an end-to-end verification
  checklist, and the three failure modes most likely to bite.
- **plan.md** — Constitution Check PASS against v2.7.0, no amendment; resolved the catalog-edit
  mechanism (FR-029) as a download-a-patched-`courses.json` flow, never a live-database write;
  named `.claude/skills/revise-topic/` as Story 5's revision procedure (the exact skill the
  Constitution v2.7.0 Sync Impact Report's own Follow-up TODOs already earmarked for this
  feature); recorded 2 Complexity Tracking entries and 3 risks; flagged all 4 of spec.md's own
  `/sp.adr` candidates, grouped as one recommended ADR.

Ran `.specify/scripts/bash/update-agent-context.sh claude` (updated `CLAUDE.md`'s Active
Technologies list). Verified every new artifact under `specs/010-curriculum-owner-console/`
contains zero em dash characters (Constitution Art. III.9 / CLAUDE.md's "by convention
everywhere" instruction), fixing one line-wrap artifact left by an automated find-and-replace
pass.

## Outcome

- ✅ Impact: every fork spec.md deferred to planning is now a concrete, testable decision — the
  checklist-hydration mechanism, the feedback table's shape and lifecycle, the report's reuse
  contract, and the catalog-edit flow. No `NEEDS CLARIFICATION` markers remain.
- 🧪 Tests: n/a (planning stage) — `contracts/console-operations.md`'s 15-item checklist and
  `quickstart.md`'s verification checklist are the acceptance surface `/sp.tasks` will turn into
  actual test tasks.
- 📁 Files: `plan.md`, `research.md`, `data-model.md`, `quickstart.md`,
  `contracts/console-operations.md`, `contracts/self-assessment-hydration.md`, `CLAUDE.md`
  (Active Technologies).
- 🔁 Next prompts: `/sp.tasks` to decompose Phase 2; `/sp.adr` for the grouped decision cluster
  (content_feedback as a distinct table; in-house passage re-location; the catalog-edit download
  flow) once the owner confirms.
- 🧠 Reflection: the single highest-leverage research question was R1 — FR-008's "must not change
  how the checklist is written in topic source" rules out the obvious `<Figure>`-style component
  approach Spec 009 just used for a superficially similar problem, so the plan had to find a
  genuinely different mechanism (position-keyed DOM hydration) rather than reuse that precedent.

## Evaluation notes (flywheel)

- Failure modes observed: an automated em-dash-to-hyphen find/replace pass on `plan.md` briefly
  split one function identifier (`enforce_self_assessment_immutable_identity`) across a line
  wrap boundary; caught by a follow-up grep and fixed before finalizing.
- Graders run and results (PASS/FAIL): Constitution Check PASS (v2.7.0), no amendment required;
  zero-em-dash scan PASS across every new file under `specs/010-curriculum-owner-console/`.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
