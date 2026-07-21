---
id: 0001
title: Draft student dashboard specification
stage: spec
date: 2026-07-21
surface: agent
model: claude-fable-5
feature: 004-student-dashboard
branch: 004-student-dashboard
user: channayousif@gmail.com
command: /sp.specify
labels: [spec, student-dashboard, aggregation, bilingual]
links:
  spec: specs/004-student-dashboard/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/004-student-dashboard/spec.md (new)
  - specs/004-student-dashboard/checklists/requirements.md (new)
tests:
  - "Spec quality checklist: 16/16 items pass on first validation iteration"
  - "Zero [NEEDS CLARIFICATION] markers — all candidate ambiguities had low-risk defaults, recorded under Assumptions (same discipline Spec 003's checklist documented)"
---

## Prompt

start spec 004 student dashboard

## Response snapshot

Created branch `004-student-dashboard` (numbering verified against remote branches, local
branches, and specs/ dirs — 001–003 exist, user's requested 004 matches) and drafted the full
specification.

Shape of the feature: a **read-only aggregation dashboard** for students over data Spec 003
already stores — deliberately no new stored records (no read-receipts, dismissed state, or
preferences), so the dashboard can never disagree with the class pages it summarizes.

- **US1 (P1, MVP)** — everything due in one place: all published, unsubmitted work across every
  active class membership, soonest-first, with overdue items split into
  late-still-possible vs window-closed (closed items are explicitly not actionable to-dos).
- **US2 (P1)** — returned results: grades with mark/max/feedback indication + quiz best scores,
  newest first; corrected grades always show the corrected value (Spec 003 FR-011 parity).
- **US3 (P2)** — class overview cards with pending counts; archived classes as separate
  read-only history contributing nothing to counts (Spec 003 FR-015 parity).
- 12 FRs, 6 SCs (including the platform's traditional SC-004 isolation criterion and an
  8-classes/50-assignments <5s load target), 8 edge cases (removal, unpublish, archive-while-
  listed, all-caught-up, tie-ordering, quiz-never-late, wrong-role visitor, Urdu/RTL).
- Key defaults chosen over clarification markers, flagged for /sp.clarify in the checklist
  notes: dashboard is an entry point, NOT the post-sign-in landing page (preserves Spec 002's
  return-to-origin); results depth 20; no pending-horizon cutoff; aggregation-only scope.
- Explicitly out of scope: notifications (Constitution VI.3 phase gate), teacher views (Spec
  005), reading-progress tracking.

Checklist created and validated: 16/16 pass, no spec updates needed.

## Outcome

- ✅ Impact: Spec 004 exists and is planning-ready; the first post-Spec-003 feature is underway
  on its own branch, unblocked exactly as Spec 003's dependency note anticipated.
- 🧪 Tests: quality checklist 16/16 on iteration 1; zero clarification markers outstanding.
- 📁 Files: spec.md + checklists/requirements.md under specs/004-student-dashboard/.
- 🔁 Next prompts: `/sp.clarify` (recommended — the entry-point-vs-landing-page default is the
  one most worth an explicit owner decision) or straight to `/sp.plan`.
- 🧠 Reflection: the strongest scoping move was "no new stored data" — it keeps the entire
  feature inside Spec 003's existing RLS surface, which should make planning short and the
  security story inherit rather than expand.

## Evaluation notes (flywheel)

- Failure modes observed: none in this run; the create-new-feature script accepted explicit
  --number/--short-name cleanly and branched from a clean main.
- Graders run and results (PASS/FAIL): spec quality checklist — PASS (16/16, first iteration).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): none — proceed to clarify/plan.
