---
id: 0017
title: Implement User Story 5 gradebook export
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 003-classes-assignments
branch: 003-classes-assignments
user: channayousif@gmail.com
command: /sp.implement
labels: [gradebook, export, exceljs, e2e]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - src/lib/gradebookExport.ts
  - src/pages/app/classes/gradebook.tsx
  - tests/e2e/gradebook-export.spec.ts
  - specs/003-classes-assignments/tasks.md
tests:
  - npx playwright test tests/e2e/gradebook-export.spec.ts (and together with classes-lifecycle/assignments-publish-submit/grading-queue specs — 4 passed)
  - npm run test:rls (34 files passed, 1 skipped — no schema change this story, confirms no regression)
  - npx tsc --noEmit (clean)
---

## Prompt

continue with US5

## Response snapshot

Implemented Phase 7, User Story 5 (export the gradebook) — the only P2 story
with no new database table (client-side query + generation only, per
contracts/classes-operations.md §G and research.md R5).

1. Read data-model.md's `answer_keys` neighbor context and spec.md's FR-014/
   FR-018/FR-019 wording ("every student, every assignment, every mark";
   removed/tombstoned students' marks stay in the gradebook, anonymized by
   name only) plus research.md R5 (native `.xlsx` via `exceljs`, dynamically
   imported so it never lands in the base bundle, client-side generation —
   no export endpoint exists per Art. V.1).
2. Wrote `tests/e2e/gradebook-export.spec.ts` (T050) first: seeds a class with
   an Urdu-named student (`محمد علی`) and a graded submission via the service
   role, downloads the export from the UI, then reads the actual `.xlsx` back
   with `exceljs` (the same library the export itself uses) to assert the
   Urdu name and the mark both survive intact — not just that a download
   happened, since a garbled-encoding bug would still "succeed" at that.
3. Implemented `src/lib/gradebookExport.ts` (T051): one matrix sheet, rows =
   every enrollment (active AND removed, per FR-018/FR-019 — no status
   filter), columns = every assignment for the class; marks pulled from
   `grades` for non-quiz assignments and (softly, tolerating the table not
   existing yet since US6 isn't built) from `quiz_best_scores` for
   quiz-sourced ones — the query for it is skipped entirely when the class
   has no quiz assignments, and any other failure there is swallowed rather
   than blocking the rest of the export. A tombstoned/nameless student's row
   uses the same `(no name set)` placeholder convention already established
   in roster.tsx/queue.tsx, never a blank or raw `NULL` cell.
4. Built `src/pages/app/classes/gradebook.tsx` (T052): a single teacher-only
   "Export gradebook" button triggering the download.
5. Ran the E2E test — passed on the first real run (name and mark both
   round-tripped correctly). Ran it together with the three existing
   classes/assignments/grading specs (4 total) — all pass. Ran the full RLS
   suite and `tsc --noEmit` as a no-schema-change regression check — both clean.

Updated `tasks.md` checkboxes for T050-T052. Phase 7 (US5) is done — a
teacher can now export a correct, Urdu-safe gradebook spreadsheet, verified
by actually opening the downloaded file's contents, not just asserting a
download event fired.

## Outcome

- ✅ Impact: User Story 5 (gradebook export) fully implemented and verified
  live, including reading back the actual downloaded file's cell contents.
  US1-US5 (every P1/P2 story) are now complete; only US6 (P3, quiz) and
  Phase 9 polish remain.
- 🧪 Tests: tests/e2e — 4 specs pass together (gradebook-export new, plus the
  3 existing classes/assignments/grading specs, confirming no regression).
  tests/rls — 34 files / 76 tests, 1 skipped (unchanged — this story added no
  migration). tsc --noEmit clean.
- 📁 Files: 1 new lib module, 1 new page, 1 new E2E test, tasks.md checkboxes
  updated. No migration — first US in this feature with none.
- 🔁 Next prompts: Phase 8 (US6 — auto-graded quiz, T053-T061: quiz_items,
  quiz_attempts, submit_quiz_attempt RPC, quiz.tsx, assignment-new.tsx
  extension for source_kind='quiz'), then Phase 9 polish (bilingual pass,
  RTL, bundle-budget check, full-suite regression, quickstart validation,
  200-student performance check).
- 🧠 Reflection: the "soft dependency" pattern for `quiz_best_scores` (query
  it only when relevant, tolerate its absence) is exactly the right shape for
  a P2 story with a forward-looking P3 dependency — it means US6, when built,
  requires zero changes to this file to start appearing in gradebook exports.
  Worth verifying that claim once US6 actually lands (add a quiz assignment
  with a best score and confirm the export picks it up without modification).

## Evaluation notes (flywheel)

- Failure modes observed: none this story — second consecutive clean
  first-try implementation (after US4), consistent with having no new
  cross-table RLS policy (no migration at all here).
- Graders run and results (PASS/FAIL): npx playwright test — PASS (4/4).
  npm run test:rls — PASS (34/35 files, 1 skipped by design). npx tsc
  --noEmit — PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when US6 lands, add a quiz
  assignment + quiz_best_scores row to the gradebook-export E2E fixture and
  confirm the score appears in the exported sheet with zero changes to
  gradebookExport.ts — validates the soft-dependency design actually holds.
