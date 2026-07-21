---
id: 0004
title: Clarify achievements area as sixth dashboard area
stage: spec
date: 2026-07-20
surface: agent
model: claude-sonnet-5
feature: 004-student-dashboard
branch: 004-student-dashboard
user: channayousif@gmail.com
command: /sp.clarify
labels: ["clarification", "information-architecture", "achievements", "student-dashboard"]
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

(No additional user input text was provided; this is a second `/sp.clarify` invocation on the
same feature spec, run after an earlier session in this conversation had already resolved 3
achievement-logic ambiguities in FR-008.)

## Response snapshot

Re-ran `.specify/scripts/bash/check-prerequisites.sh --json --paths-only` (unchanged paths) and
re-read the full, already-once-clarified `specs/004-student-dashboard/spec.md`. Re-scanned the
taxonomy specifically for anything not already resolved by the prior session's Clarifications.
Most categories remained Clear. Found one genuine internal inconsistency worth a question:
**FR-001 enumerates exactly five dashboard areas** (current status, assignments, grades,
coverage, history) but **User Story 6's Acceptance Scenario 3** refers to a student navigating to
"the achievements area" as if it were a distinct, browsable destination — a contradiction between
the area inventory and the user-facing scenario that would otherwise cause `/sp.plan` to guess at
navigation/IA structure.

Asked one targeted question (stopped early rather than padding to the 5-question cap, since no
other unresolved high-impact ambiguity was found): whether Achievements is a sixth distinct area
with its own nav destination, or lives only inside Home. User accepted the recommended option —
**sixth distinct area**, with newly earned badges also previewed on Home (mirroring the existing
Home-preview + dedicated-area pattern already used for grades/assignments).

Integrated the answer into `specs/004-student-dashboard/spec.md`:
- Appended a `### Session 2026-07-20 (follow-up)` Q&A bullet under the existing `## Clarifications`
  section (kept in the same day's session per convention, since the date matches).
- Updated **FR-001** to add achievements as the sixth listed area.
- Updated **User Story 6**'s opening description to state the Home preview + dedicated
  Achievements-area split explicitly.
- Inserted a new **FR-009** codifying the achievements area's display requirements (full catalog,
  earned + unearned, bilingual title/description, "how to reach it" guidance, plus a Home preview
  of recently earned achievements) — renumbering the subsequent FRs (old FR-009→010, FR-010→011,
  FR-011→012, FR-012→013).
- Grepped the full spec for stale FR-number cross-references after renumbering and fixed the two
  found in Assumptions and Dependencies (both previously pointed at "FR-011" for the teacher/admin
  notice rule, now FR-012). Verified the project-wide grep confirmed no other spec/plan/tasks file
  outside `specs/004-student-dashboard/` referenced these FR numbers, so renumbering was safe
  (spec 004 has no plan.md/tasks.md yet).

## Outcome

- ✅ Impact: Resolves a real FR-001 vs. User-Story-6 contradiction before `/sp.plan`, so the
  achievements area's navigation/IA (dedicated page vs. inline widget) won't be guessed at
  architecture time. All FR cross-references in the spec are now internally consistent.
- 🧪 Tests: None run (spec-only edit).
- 📁 Files: `specs/004-student-dashboard/spec.md` (Clarifications appended; FR-001, new FR-009,
  renumbered FR-010–013, User Story 6, Assumptions, and Dependencies sections updated).
- 🔁 Next prompts: `/sp.plan` — spec is now clarified across two sessions (achievement-logic +
  information-architecture) with no outstanding high-impact ambiguity.
- 🧠 Reflection: Running `/sp.clarify` a second time in the same conversation was worthwhile
  precisely because the first pass focused narrowly on the checklist's pre-flagged risk area
  (achievements' streak logic) and didn't re-scan the areas list against the user-story text
  closely enough to catch the FR-001/US6 area-count mismatch on the first attempt.

## Evaluation notes (flywheel)

- Failure modes observed: The first `/sp.clarify` session under-scanned the taxonomy's
  "Terminology & Consistency" and "Misc/Placeholders" categories against the full set of user
  stories (it verified FR-008 internally but didn't cross-check FR-001's area list against every
  story's acceptance scenarios). This second pass caught it only because it was invoked again.
- Graders run and results (PASS/FAIL): N/A (no automated grader configured for `/sp.clarify`
  output; manual grep verification confirmed no dangling FR-number references after renumbering).
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): When scanning taxonomy category "Terminology &
  Consistency," explicitly cross-check every noun phrase used in Acceptance Scenarios (e.g., "the
  X area") against the FR that defines the area inventory, rather than only checking each FR for
  internal self-consistency.
