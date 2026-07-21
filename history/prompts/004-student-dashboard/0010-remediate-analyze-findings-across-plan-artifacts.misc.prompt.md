---
id: 0010
title: Remediate analyze findings across plan artifacts
stage: misc
date: 2026-07-21
surface: agent
model: claude-sonnet-5
feature: 004-student-dashboard
branch: 004-student-dashboard
user: channayousif@gmail.com
command: manual (follow-up to /sp.analyze)
labels: ["remediation", "consistency-fix", "student-dashboard"]
links:
  spec: specs/004-student-dashboard/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/004-student-dashboard/spec.md
 - specs/004-student-dashboard/plan.md
 - specs/004-student-dashboard/data-model.md
 - specs/004-student-dashboard/tasks.md
tests:
 - none (planning-artifact edits only; no code changed)
---

## Prompt

E1: current semester is the highest semester, student can have morethan one semesters. resolve
rest as recommended

## Response snapshot

Resolved E1 (the one finding requiring a user decision) and applied all previously-offered
recommended remediations for the other 8 findings from the prior `/sp.analyze` session (I1, I2,
I3, I4, U1, U2, G1, G2, G3) — none required further user input since each already had a stated
recommendation.

**E1**: The user confirmed a student can legitimately hold active classes across more than one
semester simultaneously, and "current semester" should resolve to the **highest** one. Investigated
how semesters are actually tracked before writing the fix — grepped `tests/rls/_classFixtures.mjs`
and found Spec 003's `classes.term_label` is free text (e.g. `'Fall 2026'`), not a comparable
ordinal, so "highest semester" can't be derived from `term_label` directly. The actual numeric
`semester` (1–8) lives in Spec 001's content catalog and is already present in
`content-index.json`'s records (per this feature's own research.md R1). Resolved the design as:
the Home area's class **list** stays unfiltered (every active class regardless of semester); only
the single "current semester" **label** is `max(semester)`, derived by looking up each active
class's `course_code` in `content-index.json`. Documented this in three places: spec.md (new
Assumptions bullet, dated via `/sp.analyze`), data-model.md (rewrote the Home read-only query-shape
row), and tasks.md (rewrote T011's `fetchCurrentSemesterClasses()` description and T012's
consumption of it).

**Recommended remediations applied**:
- **I1** — plan.md's Summary said "five `SECURITY DEFINER`" while its own Scale/Scope and
  data-model.md said 7; changed the Summary to "seven."
- **I2** — plan.md's Project Structure tree was missing `DashboardNavLink.tsx` and the
  `NavbarItem/ComponentTypes.tsx` swizzle that tasks.md's T007 builds; added both (first attempt
  accidentally duplicated the `theme/` tree entry — caught and merged into one `theme/` block
  before moving on).
- **I3** — spec.md FR-001 said "current status" while every other reference called it "Home";
  changed FR-001's wording to "home" for consistency.
- **I4** — plan.md's e2e file list named `dashboard-assignments.spec.ts` (never actually created —
  folded into `dashboard-home.spec.ts`) and `achievement-grants.spec.ts` (actually named
  `dashboard-achievements.spec.ts`); corrected the list to match tasks.md's real filenames and
  added the new `dashboard-rtl.spec.ts` (G2) to it. Also added the missing
  `navigate-the-platform.mdx` to the guides tree (T043 already referenced it; the tree just didn't
  list it).
- **U1** — T011's `fetchDueSoon()` didn't specify it must return `allow_late` and a computed
  overdue/closed state; added both explicitly, since FR-003 and the quiz-closed edge case require
  them and both T012 (Home) and T013 (Assignments) consume this same helper.
- **U2** — T013 (Assignments area) was the only one of six page-implementation tasks missing an
  explicit empty-state mention; added "nothing due" empty state + bilingual `MESSAGES` note,
  matching its five siblings.
- **G1** — SC-006 (360px, no horizontal scroll, "any area") was only tested for Home; added a
  360px/no-horizontal-scroll assertion to T015 (Grades), T019 (Progress), T027 (History), and T037
  (Achievements) — Home's T010 already had it.
- **G2** — SC-007 (bilingual/RTL across every area) had zero dedicated task; added new **T049**
  (`tests/e2e/dashboard-rtl.spec.ts`), matching Specs 002/003's own RTL-testing precedent, inserted
  into Phase 9 rather than renumbering the whole file — followed Spec 003's own established
  convention (its T068–T077) of appending new IDs continuing from the current max and placing them
  positionally in the correct phase, not renumbering everything downstream.
- **G3** — SC-008 (2s p95 load time, the criterion the 3rd `/sp.clarify` session added) had no task
  that actually measured load time (T008 only seeds fixtures at scale; T047 checks bundle *size*,
  a different Art. V.5 requirement); added new **T050**, a dedicated load-time measurement task
  distinct from T047, and updated T048's final-validation task to explicitly run both T049 and
  T050.

Verified via grep after every edit: no stale "five `SECURITY DEFINER`" text remains; no stale
`dashboard-assignments.spec.ts`/`achievement-grants.spec.ts` references remain; no stale "current
status" text remains in spec.md; `dashboard-rtl.spec.ts` is referenced consistently in both
plan.md and tasks.md. Re-ran the full task-format grep: all 50 tasks (T001–T050, +2 from the
original 48) match `- [ ] T\d{3}` with sequential, unique numbering and no gaps.

## Outcome

- ✅ Impact: All 9 findings from the `/sp.analyze` report (3 HIGH coverage gaps, 5 MEDIUM
  inconsistencies/underspecifications, 1 LOW terminology drift) are now resolved across spec.md,
  plan.md, data-model.md, and tasks.md — the plan is now internally consistent (no more
  self-contradicting function counts or mismatched file-tree/task-list filenames) and every
  numbered Success Criterion (including the two, SC-007/SC-008, that previously had zero or
  non-measuring task coverage) has a task that actually verifies it.
- 🧪 Tests: None run (planning-artifact edits only); tasks.md now specifies 2 additional test
  tasks (T049 RTL, T050 load-time) beyond the original 48, for 50 total.
- 📁 Files: `specs/004-student-dashboard/spec.md` (FR-001 wording, new Assumptions bullet for E1);
  `specs/004-student-dashboard/plan.md` (Summary function count, Project Structure tree additions,
  e2e filename list); `specs/004-student-dashboard/data-model.md` (Home read-only query-shape row
  rewritten for both E1 and U1); `specs/004-student-dashboard/tasks.md` (T011, T012, T013 rewritten;
  T015/T019/T027/T037 extended; T048 updated; new T049/T050 inserted).
- 🔁 Next prompts: `/sp.implement` — the plan/task set is now ready to execute with no open
  `/sp.analyze` findings.
- 🧠 Reflection: Grepping the actual `term_label` fixture data (`'Fall 2026'`, free text) before
  writing the E1 fix was the right instinct — the user's answer ("highest semester") could easily
  have been implemented incorrectly as a lexicographic max on `term_label` if I'd assumed it was
  already a sortable ordinal, which it isn't; the real semester ordinal lives in Spec 001's content
  catalog instead, one layer removed from where the ambiguity was originally raised.

## Evaluation notes (flywheel)

- Failure modes observed: One self-caught error — the first Edit for I2 duplicated the `theme/`
  tree heading in plan.md's Project Structure (two separate `├── theme/` blocks instead of one
  merged block); caught immediately on the next Read before compounding, and fixed with a follow-up
  Edit merging both subtrees under a single `theme/` entry.
- Graders run and results (PASS/FAIL): Format grader — PASS: `grep -cE '^\- \[ \] T[0-9]{3}'` on
  tasks.md returns 50, matching the 50 unique sequential IDs found; a targeted grep for each fixed
  finding's stale text (five-function count, old e2e filenames, "current status") returns zero
  matches post-edit, confirming no remediation left a dangling contradiction.
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): When a `/sp.analyze` finding involves a numeric/
  comparable concept (here, "semester") that a spec.md Assumption merely asserts without citing
  its actual source field, grep the real fixture/migration data for that field's format *before*
  writing the remediation — this session did that only after drafting an initial (wrong) mental
  model of `term_label` as already numeric.
