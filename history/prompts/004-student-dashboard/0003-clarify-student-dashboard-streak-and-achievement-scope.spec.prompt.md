---
id: 0003
title: Clarify student dashboard streak and achievement scope
stage: spec
date: 2026-07-20
surface: agent
model: claude-sonnet-5
feature: 004-student-dashboard
branch: 004-student-dashboard
user: channayousif@gmail.com
command: /sp.clarify
labels: ["clarification", "achievements", "student-dashboard"]
links:
  spec: specs/004-student-dashboard/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/004-student-dashboard/spec.md
tests:
 - none (spec-only change)
---

## Prompt

/sp.clarify

(No additional user input text was provided; the command was run with empty arguments per the
`/sp.clarify` slash command contract, which scans the active feature spec for ambiguities.)

## Response snapshot

Ran `.specify/scripts/bash/check-prerequisites.sh --json --paths-only` to resolve
`FEATURE_SPEC=specs/004-student-dashboard/spec.md`. Read the full spec plus its existing quality
checklist (`checklists/requirements.md`), which already flagged the study-streak achievement
definition as the weakest area pending clarification. Performed a taxonomy scan across
functional scope, domain/data model, UX, non-functional attributes, integrations, edge cases,
constraints, terminology, and completion signals — most categories were Clear; found one
high-impact contradiction and one edge-case gap, both scoped to FR-008 (achievements), and asked
3 targeted questions (under the 5-question cap, not padded to the max since remaining ambiguities
were plan-level or already covered by documented Assumptions):

1. Study-streak achievement threshold → **3 consecutive days** (recommended, low-friction
   early-engagement milestone).
2. Streak completion-method scope → **self-marking only** (recommended; resolves a direct
   contradiction between FR-008's "self-tracked" wording and the Assumptions section's generic
   "by any method" streak definition).
3. Zero-published-assignment class eligibility for the "on-time completion" achievement →
   **not eligible** (recommended; avoids a vacuous instant award).

Integrated all three answers into `specs/004-student-dashboard/spec.md`:
- Added `## Clarifications` → `### Session 2026-07-20` with the 3 Q&A bullets, placed
  immediately after the Input line per template convention (matches Spec 003's placement).
- Updated **FR-008** with the concrete streak threshold (3 days), the self-marking-only scope,
  and the ≥1-published-assignment eligibility rule for the on-time-completion achievement.
- Rewrote the **Study-streak definition** Assumption to point at the resolved Clarification
  instead of the now-superseded "by any method" default, removing the contradiction.
- Added a new **Edge Cases** bullet for the zero-assignment-class scenario.

Verified via grep that no lingering "by any method" contradiction remains and all streak/
achievement references across the spec are now consistent.

## Outcome

- ✅ Impact: FR-008's achievement logic is now fully testable (concrete streak threshold, resolved
  self-marking-vs-any-method contradiction, defined zero-assignment edge case) — unblocks
  `/sp.plan` without ambiguity in the achievements data model or trigger logic.
- 🧪 Tests: None run (spec-only edit); acceptance scenarios for User Story 6 and SC-004 remain the
  testable anchors once implemented.
- 📁 Files: `specs/004-student-dashboard/spec.md` (Clarifications section added; FR-008, Edge
  Cases, and Assumptions sections updated).
- 🔁 Next prompts: `/sp.plan` (spec is now clarified and ready for architecture/design), or
  `/sp.adr` if the plan surfaces a significant achievement-storage decision (e.g., fixed enum vs.
  table-driven catalog).
- 🧠 Reflection: The feature's own quality checklist had already pre-identified the riskiest
  ambiguity (study-streak definition) before `/sp.clarify` ran, which made the taxonomy scan fast
  and let the session focus on 3 high-signal questions rather than a padded set of 5.

## Evaluation notes (flywheel)

- Failure modes observed: None — all 3 questions were answered by accepting the recommended
  option, and no disambiguation retries were needed.
- Graders run and results (PASS/FAIL): N/A (no automated grader configured for `/sp.clarify`
  output; manual grep verification confirmed no contradictory text remained).
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Consider whether the pre-spec checklist's
  "ambiguities most worth a second look" note should be a standard, machine-readable field so
  `/sp.clarify` can prioritize those categories automatically instead of re-deriving them via a
  fresh taxonomy scan.
