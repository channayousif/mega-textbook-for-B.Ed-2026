---
id: 0005
title: Apply analyze remediation edits
stage: misc
date: 2026-09-05
surface: agent
model: claude-sonnet-5
feature: 010-curriculum-owner-console
branch: 010-curriculum-owner-console
user: channayousif
command: /sp.analyze (remediation follow-up)
labels: ["analyze", "remediation", "tasks", "contracts", "quickstart", "coverage-gap"]
links:
  spec: specs/010-curriculum-owner-console/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/010-curriculum-owner-console/tasks.md
  - specs/010-curriculum-owner-console/contracts/console-operations.md
  - specs/010-curriculum-owner-console/contracts/self-assessment-hydration.md
  - specs/010-curriculum-owner-console/quickstart.md
  - specs/010-curriculum-owner-console/plan.md
tests:
  - none (planning-artifact edits; no code exists yet)
---

## Prompt

yes, apply those remediation edits

(Follow-up to the immediately preceding `/sp.analyze` run, which produced a report with 2 HIGH,
3 MEDIUM, and 3 LOW findings across `tasks.md`, `contracts/console-operations.md`,
`contracts/self-assessment-hydration.md`, and `quickstart.md`, and ended by offering to apply
concrete remediation edits for the seven actionable findings (G1-G6, U1) without auto-applying
them. The user approved applying all seven.)

## Response snapshot

Applied all seven remediation edits directly to the planning artifacts (no code exists yet, so
no drift/reconciliation was needed):

- **G1** (FR-009 untested) - extended T010's e2e test description to assert an item's wording
  change between two loads renders it unticked while sibling ticks are unaffected.
- **G2** (FR-005 MUST NOT untested) - extended T008's RLS test to assert no
  `self_assessment_checks` write ever touches `unit_progress`, and reworded T014 to state the
  "mark as studied" prompt only calls `markUnitStudied()` on the student's own click.
- **G3** (SC-003/SC-004 timing unasserted) - added "timed under 30 seconds"/"under 15 seconds"
  clauses to T017 and T018 respectively.
- **U1** (T005 undercounted content_feedback's check constraints) - reworded T005 to name all six
  constraints (3 structural + 3 length-cap); extended T015 with a length-cap-rejection assertion;
  added a new row to `contracts/console-operations.md` table B and a 16th contract-checklist item;
  updated every "15-item"/"16-item" cross-reference in `tasks.md` (2 spots) and `plan.md`
  (2 spots) to stay consistent.
- **G4** (US1 had no bilingual/RTL test, unlike US2) - extended T010 with a `ur`/RTL assertion for
  the hydrated checklist and its hint; added a sentence to `self-assessment-hydration.md`
  requiring the hint to use a bilingual `MESSAGES` dict, matching repo convention.
- **G5** (FR-021 scenario untested) - extended T018 with the "edit the live topic text after
  filing, confirm the queue's quote stays verbatim" scenario.
- **I1** (quickstart.md's checklist never named the full check-suite re-run) - added an explicit
  bullet to `quickstart.md`'s Verification checklist naming `validate:content`/`check:depth-gate`/
  `check:no-answer-keys`, plus five more bullets mirroring every other edit above so the
  standalone quickstart checklist stays in sync with `tasks.md`'s strengthened tests.

Every edited task-list line was re-validated against the required
`- [ ] T### [P]? [USn]? Description` format (46/46 still pass) and every file under
`specs/010-curriculum-owner-console/` was re-scanned for em dash characters (zero found).

## Outcome

- Impact: all 2 HIGH and 3 MEDIUM findings from the `/sp.analyze` report are closed by a test-task
  or contract-line addition, not a scope change; the 2 remaining LOW findings (A1: a pre-existing
  spec.md ambiguity; G6: a design-only control already deemed acceptable) needed no edit and were
  left as informational.
- Tests: n/a directly (no code exists yet) - the edits themselves *are* the added test coverage,
  now recorded in `tasks.md`'s T008/T010/T015/T017/T018 for when implementation begins.
- Files: `tasks.md` (7 task descriptions edited, 2 cross-references renumbered),
  `contracts/console-operations.md` (1 table row + 1 checklist item added),
  `contracts/self-assessment-hydration.md` (1 sentence added), `quickstart.md` (checklist
  expanded from 8 to 13 bullets), `plan.md` (2 cross-references renumbered).
- Next prompts: begin implementation at T001, or `/sp.adr` for the grouped decision cluster
  before code lands.
- Reflection: the checklist-format and em-dash re-validation after every batch of edits caught
  nothing wrong this time, but running it as a matter of course (rather than trusting the edits
  were clean) is the same discipline that caught the line-wrap artifact during the original
  `/sp.plan` pass - worth keeping as standard practice after any edit to these particular files.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): checklist-format validation PASS (46/46); zero-em-dash
  scan PASS; "15-item" cross-reference grep returned zero stale hits after renumbering to 16.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
