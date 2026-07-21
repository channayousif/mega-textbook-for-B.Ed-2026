---
id: 0009
title: Cross-artifact consistency analysis for dashboard
stage: misc
date: 2026-07-21
surface: agent
model: claude-sonnet-5
feature: 004-student-dashboard
branch: 004-student-dashboard
user: channayousif@gmail.com
command: /sp.analyze
labels: ["analysis", "consistency-check", "read-only", "student-dashboard"]
links:
  spec: specs/004-student-dashboard/spec.md
  ticket: null
  adr: null
  pr: null
files: []
tests:
 - none (strictly read-only analysis; no files modified)
---

## Prompt

/sp.analyze

(No additional user input text was provided.)

## Response snapshot

Ran `.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks` —
confirmed all three core artifacts (spec.md, plan.md, tasks.md) plus research.md, data-model.md,
contracts/, quickstart.md exist. Read all artifacts fresh (plan.md and tasks.md specifically, to
catch drift introduced by the later ADR-linking edits) plus the constitution (v2.4.0) for
principle validation. Built an internal requirements inventory (13 FR + 8 SC), a task-coverage
map, and cross-checked every FR/SC against tasks.md's 48 tasks and against data-model.md/
contracts/dashboard-operations.md for internal numeric/naming consistency.

Ran the six detection passes (duplication, ambiguity, underspecification, constitution alignment,
coverage gaps, inconsistency) and surfaced 10 findings, all MEDIUM or below except three HIGH
coverage gaps:

- **G1/G2/G3 (HIGH, Coverage Gaps)**: the three success criteria this feature's own 3
  `/sp.clarify` sessions worked hardest to establish are the ones with the weakest task coverage.
  SC-006 (360px/no-horizontal-scroll "in any area") is only tested for Home (T010) — Grades/
  Progress/History/Achievements have no responsive assertion. SC-007 (bilingual/RTL across every
  area) has **zero** dedicated verification task anywhere, unlike Specs 002/003's own precedent
  (`classes-rtl.spec.ts`, `read-bilingual.spec.ts`). SC-008 (2s p95 load time — the criterion added
  specifically by the 3rd clarification session to close a real gap) has no task that actually
  *measures* load time: T008 only seeds fixtures at the right scale, and T047 checks bundle
  **size** (a different, Art. V.5 requirement), not load **time**.
- **I1 (MEDIUM)**: plan.md's own Summary line ("five `SECURITY DEFINER` functions") contradicts
  its own Scale/Scope line and data-model.md (both say 7) — an internal self-contradiction within
  plan.md, not just a cross-file drift.
- **I2 (MEDIUM)**: plan.md's Project Structure file tree omits `DashboardNavLink.tsx` and the
  `NavbarItem/ComponentTypes.tsx` swizzle that tasks.md's T007 actually builds, even though the
  same plan.md's prose (Scale/Scope) mentions "1 new navbar link component" — the concrete tree and
  the narrative summary disagree with each other.
- **I4 (MEDIUM)**: plan.md's listed e2e filenames (`dashboard-assignments.spec.ts`,
  `achievement-grants.spec.ts`) don't match what tasks.md actually creates (folded into
  `dashboard-home.spec.ts`; named `dashboard-achievements.spec.ts`).
- **U1/U2 (MEDIUM)**: the shared `fetchDueSoon()` helper (T011) doesn't specify it must carry the
  `allow_late`/closed-state fields FR-003 and an Edge Case require; T013 (Assignments area) is the
  only one of six page-implementation tasks that doesn't mention an explicit empty state, unlike
  its five siblings.
- **E1 (MEDIUM)**: no artifact defines what "current semester" means if a student's active classes
  span more than one `term_label` at once — FR-002 assumes a single current semester but Spec
  003's schema has no explicit current-term flag.
- **I3 (LOW)**: FR-001 calls the first area "current status" while every other reference
  (FR-002, US1, plan.md, tasks.md) calls it "Home."

Verified zero CRITICAL findings: no constitution MUST is violated (re-examined the
teacher/coverage-access design against Art. VIII.1 specifically — VIII.1 is a maximum-exposure
ceiling, "visible only to...", not a floor mandating teacher access to everything, so restricting
`unit_progress`/`student_achievements` to student+admin-only is a permitted subset, not a
violation), and no requirement has zero task coverage that blocks baseline functionality (SC-007's
zero-coverage is a real gap but doesn't block the feature from functioning, hence HIGH not
CRITICAL). Confirmed Article X's Teacher Guide/README deferral is not a new violation introduced
by this plan — the constitution's own Sync Impact Report already lists both as pre-existing,
acknowledged TODOs, not obligations this feature's plan silently ignores.

Presented the full Markdown report (findings table, coverage summary table, constitution/unmapped-
tasks sections, metrics) directly in the response per the command's read-only, no-file-writes
constraint, and closed with an offer to draft concrete remediation edits — not applied
automatically, per the command's explicit instruction to require approval first.

## Outcome

- ✅ Impact: Surfaced 3 HIGH-severity gaps in exactly the three success criteria this feature's
  `/sp.clarify` history shows were hardest-won (responsive layout, bilingual/RTL, and the
  just-added performance budget) — catching this now, before `/sp.implement`, is far cheaper than
  discovering it at the Art. VII engineering gate after 48 tasks are already built. Zero CRITICAL
  findings means the plan is sound to proceed on, with a clear, prioritized punch list for the
  MEDIUM/HIGH items.
- 🧪 Tests: None run (strictly read-only per command constraints); the report itself specifies
  which test tasks are missing (a `dashboard-rtl.spec.ts`, per-page 360px assertions, a load-time
  measurement task) for the user to add.
- 📁 Files: None modified (read-only analysis, as required).
- 🔁 Next prompts: awaiting user decision — either approve remediation edits to `tasks.md`/`plan.md`
  for the flagged findings, or proceed directly to `/sp.implement` accepting the gaps as
  known/deferred risk.
- 🧠 Reflection: The highest-value findings here (G1–G3) came from checking each numbered Success
  Criterion against task coverage specifically, rather than only checking Functional Requirements
  — SC-006/007/008 are exactly the criteria a purely FR-driven coverage check would have missed,
  since all three passed at the FR level (every FR has tasks) while failing at the SC level.

## Evaluation notes (flywheel)

- Failure modes observed: None during this session — the one place a false positive could have
  crept in (flagging the teacher-access restriction on `unit_progress`/`student_achievements` as a
  VIII.1 constitution violation) was avoided by re-reading Article VIII.1's exact wording
  ("visible only to...") as a ceiling, not a floor, before including it as a finding.
- Graders run and results (PASS/FAIL): Self-applied per the command's own severity rubric —
  PASS: every finding was tested against "does it block baseline functionality / violate a MUST"
  before being labeled CRITICAL (none qualified), and against "explicit numbered SC with
  near-zero-or-zero task coverage" before being labeled HIGH (G1/G2/G3 qualified cleanly).
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): When a spec's `/sp.clarify` history shows a Success
  Criterion was added specifically to close a previously-missing gap (as SC-008 was here), flag
  that SC for extra scrutiny during `/sp.analyze`'s coverage pass by default — it's a strong signal
  the criterion is fragile/easy to silently drop again during task generation.
