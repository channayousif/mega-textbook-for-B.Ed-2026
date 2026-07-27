---
id: 0008
title: Apply analyze remediation edits
stage: misc
date: 2026-07-24
surface: agent
model: claude-sonnet-5
feature: 005-teacher-dashboard
branch: 005-teacher-dashboard
user: channayousif@gmail.com
command: /sp.analyze (remediation follow-up)
labels: ["remediation", "teacher-dashboard", "consistency-fix"]
links:
  spec: specs/005-teacher-dashboard/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/005-teacher-dashboard/spec.md
 - specs/005-teacher-dashboard/plan.md
 - specs/005-teacher-dashboard/research.md
 - specs/005-teacher-dashboard/data-model.md
 - specs/005-teacher-dashboard/tasks.md
tests:
 - none (documentation/planning edits; no code changes — added 2 future test tasks T050/T051)
---

## Prompt

User: "Yes, suggest remediation edits for U1, A1, I1, I2, G1, G2" — followed, after concrete diffs
were presented, by "yes" to apply all six.

## Response snapshot

U1 required an actual design decision (not just a wording fix), so it was posed as an
`AskUserQuestion` before drafting the fix: should FR-003's "every book content page" be honored
literally (extending the "Suggest improvement" widget's activation condition to also fire on
`course-overview.mdx`, which carries `course_code` but no `unit_no`), or should the spec instead
be narrowed to "every unit content page" to match the existing design? User chose to extend
coverage rather than narrow the spec. Before finalizing the design, verified the underlying
assumption directly against the repo (`docs/semester-1/efmp-301/course-overview.mdx`) rather than
trusting the earlier analysis's inference — confirmed `course_code` is present, `unit_no` is not.

Applied all six edits:
- **U1**: `data-model.md`'s `improvement_suggestions.unit_no` changed from `NOT NULL` to nullable
  (null = filed against a course-level page), with a new design-decision note explaining the
  moderation queue's course filter is unaffected since `course_code` stays required.
  `research.md` R1 rewritten so "Suggest improvement" activates on `course_code` alone (unit_no
  included when present), while "Give feedback" (FR-007) explicitly keeps its stricter,
  unit_no-required condition, since feedback is inherently activity-scoped. `tasks.md` T014's
  description updated to match; T010 gained a course-overview-page test case.
- **A1**: `spec.md` FR-010 — "no submission" → "no submission or quiz attempt" (with a
  line-wrap cleanup pass afterward, verified by re-reading the paragraph).
- **I1**: `tasks.md` T009's wrong citation ("contract checklist items 5, 7") corrected to
  "contract checklist item 7; data-model.md access-control matrix item 3."
- **I2**: `plan.md`'s Project Structure `src/lib/` listing gained the previously-undeclared
  `teacherOverview.ts` entry.
- **G1**: `tasks.md` gained T050 — a performance-timing test for Overview/Analytics against Spec
  003 SC-005's 5s p95 budget, distinct from T048's bundle-size check.
- **G2**: `tasks.md` gained T051 — a UI-level E2E test asserting `TeacherDashboardGuard`'s denial
  notice for a student session and the existing `AuthGuard`'s denial on the two admin routes.
  T049 updated to depend on both new tasks and include them in its final test-suite run.

Re-validated tasks.md programmatically after the additions: 51 tasks total (was 49), no duplicate
IDs, no sequence gaps, every line still matches the strict `- [ ] T### [P?] [Story?] Description`
format.

## Outcome

- ✅ Impact: Closed the one implementation-changing scope gap (U1) with the owner's actual
  decision rather than an assumed default, verified against the live repo rather than inference;
  fixed a real citation error (I1) and a plan/tasks documentation gap (I2); added two previously-
  missing verification tasks (G1, G2) that would otherwise have left SC-007's UI-level guarantee
  and the Spec 003 performance-budget commitment unverified by any automated test.
- 🧪 Tests: None run — these are planning-artifact edits. Two new test tasks (T050, T051) now
  exist in tasks.md for `/sp.implement` to fulfill; task-list format re-validated via grep
  (duplicate-ID check, sequence-gap check, line-format regex — all pass).
- 📁 Files: `spec.md` (FR-010 wording), `plan.md` (Project Structure addition), `research.md`
  (R1 rewritten), `data-model.md` (`improvement_suggestions.unit_no` + new design-decision note),
  `tasks.md` (T009, T010, T014 edited; T050, T051 added; T049 updated).
- 🔁 Next prompts: `/sp.implement` — tasks.md is now internally consistent with the corrected
  scope decision and has full coverage for the two previously-gapped NFRs (G1, G2).
- 🧠 Reflection: For U1, verifying `course-overview.mdx`'s actual front matter against the repo
  before finalizing the fix (rather than trusting the analysis's own inference that it "almost
  certainly" lacks `unit_no`) confirmed the design was sound before writing it into three files —
  cheap insurance against building a fix on an unverified assumption.

## Evaluation notes (flywheel)

- Failure modes observed: One minor self-inflicted issue during the FR-010 edit — the initial
  string replacement left an awkward mid-sentence line wrap (one line running long, then a stray
  short continuation), caught immediately by re-reading the file after editing and cleaned up in
  two follow-up edits. Not a content error, just a formatting artifact from a token-for-token
  string replacement not respecting the paragraph's line-wrap rhythm.
- Graders run and results (PASS/FAIL): Task-list format validation via `grep` — PASS (51 tasks, no
  duplicates, no gaps, all lines format-compliant after the T050/T051 additions).
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): When a string-replacement edit spans a hard-wrapped
  paragraph, re-read the paragraph immediately after editing (not just trust the diff) to catch
  line-wrap artifacts before moving to the next edit — done reactively here, worth doing
  proactively next time for any multi-line prose edit.
