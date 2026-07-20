---
id: 0012
title: Sync data-model/contracts/tasks for rejoin-restore
stage: misc
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 003-classes-assignments
branch: 003-classes-assignments
user: channayousif@gmail.com
command: (none — direct instruction, not a slash command)
labels: ["sync", "post-clarify-followup", "data-model", "contracts", "tasks"]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/003-classes-assignments/data-model.md
 - specs/003-classes-assignments/contracts/classes-operations.md
 - specs/003-classes-assignments/plan.md
 - specs/003-classes-assignments/tasks.md
tests:
 - none (planning-artifact edits only; the new/amended tasks specify tests for implementation to write)
---

## Prompt

yes, sync all three now

## Response snapshot

Synced `data-model.md`, `contracts/classes-operations.md`, and `tasks.md` (plus `plan.md`, whose
item counts and clarification totals drifted as a side effect) to FR-018's amendment and the new
FR-022 (rejoin-blocked / teacher-restore) from PHR 0011's post-planning clarification.

- **data-model.md** (`enrollments` entity): rewrote `join_class_by_code`'s behavior — no longer
  upserts/reactivates a `'removed'` row. Three explicit outcomes now: no existing row → insert
  `active`; existing `active` row → idempotent no-op; existing `removed` row → **reject** with a
  distinct "you were removed" message (deliberately not the uniform invalid-code message, since
  the caller is a known former member, not an unrelated guesser). Renamed and expanded the
  "Removal" subsection to "Removal & restoration (FR-018, FR-022)" — restore is symmetric to
  removal under the same existing RLS UPDATE policy, no new trigger needed. Updated negative
  assertion #5 in the access-control matrix to cover the blocked-rejoin and restore-ownership
  cases.
- **contracts/classes-operations.md**: Section A's single "Join a class" row split into four
  (first-time, already-active idempotent, invalid-code, removed-student-rejected), plus new
  Remove/Restore rows (with their non-owner error cases). Extended the "Denial shapes" paragraph
  to explain the two *different* rejection shapes for `join_class_by_code` are deliberate, not an
  inconsistency. Section H checklist gained 3 items (26 → 29).
- **plan.md**: updated the stale "26-item checklist" reference to 29 (broken by the above), the
  spec.md summary line from "7 clarifications, FR-001…FR-021" to "8 clarifications,
  FR-001…FR-022", and "all five 2026-07-19 clarifications" to "all six... (five from the
  pre-planning session plus the post-planning rejoin/restore clarification)".
- **tasks.md**: rewrote T017 (the `join_class_by_code` RPC migration) to match the three-outcome
  behavior; extended T070's description to add the blocked-rejoin assertion in the same test
  file; added `T075`/`T076` (implementation: `restoreStudent()` lib function + roster "Restore"
  control, mirroring T068/T069's `removeStudent()` pattern) and `T077` (RLS test). Updated the
  US1 checkpoint text and the "Implementation Strategy" MVP-validation line to include
  restore-student and the new task IDs.

**Self-caught error during this edit**: initially placed the new `T077` test task in the
"### Implementation for User Story 1" section (after T075/T076), repeating the exact N2 mistake
from the prior `/sp.analyze` remediation — a test placed after its own implementation, violating
the file's own "tests written first" rule. Caught immediately on the next verification read and
moved `T077` into the "### Tests for User Story 1" section (after T070, before "###
Implementation" begins) before reporting completion, rather than letting it stand.

Verified afterward: 77 total tasks (T001–T077, including the previously-added T068–T074 plus new
T075–T077), no duplicate IDs, correct Tests-before-Implementation ordering throughout US1.

## Outcome

- ✅ Impact: `spec.md`, `plan.md`, `data-model.md`, `contracts/classes-operations.md`, and
  `tasks.md` are now fully consistent on rejoin-after-removal/restore behavior — the gap PHR 0011
  identified (a planning-level decision made silently, contradicting what the owner actually
  wanted) is closed across every artifact, not just the spec.
- 🧪 Tests: None run — planning-artifact edits. T070 (amended) and T077 (new) now specify the
  concrete RLS assertions for implementation to write: blocked rejoin with a distinct message,
  successful restore, and restore's ownership boundary.
- 📁 Files: `specs/003-classes-assignments/data-model.md`, `contracts/classes-operations.md`,
  `plan.md`, `tasks.md` — see files list above for the specific sections touched in each.
- 🔁 Next prompts: No further known drift between spec/plan/data-model/contracts/tasks — ready for
  `/sp.implement`, or another `/sp.analyze` pass if the user wants a final consistency check
  before starting.
- 🧠 Reflection: Catching my own repeat of the N2 mistake (test task placed after its
  implementation) mid-edit, on the very next task I added after having just fixed that exact
  pattern elsewhere in the same file, is a useful signal: a structural rule that was just
  corrected in one place needs to be actively re-checked against, not assumed internalized, for
  every subsequent edit in the same session — habit reverts under multitasking.

## Evaluation notes (flywheel)

- Failure modes observed: Repeated the N2 test-placement mistake once (self-caught before
  reporting completion — see Response snapshot). No other issues.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): When adding a paired test+implementation task set in
  the future, write the test task's placement (which subsection) explicitly before drafting its
  content, rather than appending both test and implementation together and sorting placement out
  afterward — would have prevented this specific repeat.
