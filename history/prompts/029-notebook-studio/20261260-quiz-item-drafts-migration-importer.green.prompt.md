---
id: 20261260
title: Quiz item drafts - migration 0056, Studio importer, publish control
stage: green
date: 2026-11-24
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: feat/029-quiz-drafts
user: M Yousif Channa
command: none
labels: [board-direct, studio, supabase, migration]
links:
  spec: specs/029-notebook-studio/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - supabase/migrations/0056_quiz_item_drafts.sql
  - scripts/studio/quiz-drafts-lib.mjs
  - scripts/studio/import-quiz-drafts.mjs
  - src/lib/types.ts
  - src/lib/quizAuthoring.ts
  - src/pages/app/teacher/quiz-authoring.tsx
  - tests/unit/quiz-drafts.test.mjs
  - tests/rls/quiz-item-drafts.test.mjs
  - specs/029-notebook-studio/tasks.md
tests:
  - npm test -- tests/unit/quiz-drafts.test.mjs (12 pass)
  - vitest --config vitest.rls.config.ts tests/rls/quiz-item-drafts.test.mjs (2 pass, live Supabase)
---

## Prompt

hold both, add the quiz migration

(Follow-up in the next prompt: "ok,do it" - apply 0056 to the live database.)

## Response snapshot

"Hold both" kept the Spec 013 T053 title rewrite and the Spec 032 T008 Urdu figure fix on hold
(both would re-open G2/G3 evidence).

Spec 029 required Studio quiz items to land in `quiz_items` "as teacher-review drafts", but the
table had no draft state: an imported item would have been live in every quiz at once.

- `0056_quiz_item_drafts.sql`: `quiz_items.status` (`draft`|`published`, default `published`, so
  existing rows and teacher-authored items behave as before); `quiz_items_public` (the student
  read path, view-owner security) filters to published; `submit_quiz_attempt()` counts and scores
  published items only. `self_check_*` (0055) is a separate table and untouched.
- Dry-run on the live DB inside BEGIN/ROLLBACK, then applied for real in one transaction with
  `notify pgrst, 'reload schema'` after the owner's go-ahead. Live `quiz_items` was empty.
- `scripts/studio/import-quiz-drafts.mjs` (owner-run, service role, dry run unless `--apply`):
  validates every file before writing, shuffles and re-letters options (quiz prompt v2 says the
  import step shuffles), skips stems already present, writes `status: draft`, `created_by: null`.
  Validation lives in `quiz-drafts-lib.mjs` (pure) with 12 unit tests.
- Quiz authoring page: "Draft - not shown to students yet" badge and a Publish button for
  verified teachers (UPDATE gated by the existing `quiz_items_update` policy).
- `tests/rls/quiz-item-drafts.test.mjs` on EFMP-301 Unit 97 (no content, so no other spec shares
  the unit the scorer counts): student view excludes the draft and its answer, verified teacher
  sees it, score ignores it (1 item, 10/10), unverified teacher cannot publish, verified can,
  then it counts (2 items, 5/10); status check rejects other values.

## Outcome

- ✅ Impact: Studio quiz output can be imported safely; nothing reaches students until a verified teacher publishes it.
- 🧪 Tests: unit 12/12, RLS 2/2 against the live instance.
- 📁 Files: migration, importer + lib, authoring UI, types, two test files, 029 tasks.md.
- 🔁 Next prompts: owner supplies the quiz v2 JSON per unit and runs the importer (dry run, then --apply).
- 🧠 Reflection: the student path had three readers (view, picker via the view, SECURITY DEFINER scorer); filtering only the view would have let drafts change marks.

## Handoff (for CEO and agents)

- Shipped / changed: migration 0056 is LIVE on the shared Supabase (applied 2026-11-24). quiz_items has status; drafts are invisible to students, the quiz picker and scoring.
- Decisions the team must respect: Studio quiz items enter only as drafts through scripts/studio/import-quiz-drafts.mjs (owner-run, never CI or crew); answers live only in quiz_items.correct_option. Teacher-authored items still default to published.
- Pending / next owner: owner provides the quiz v2 output as JSON (format in scripts/studio/quiz-drafts-lib.mjs) and runs the import; a verified teacher reviews and publishes on /app/teacher/quiz-authoring.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none in tests; first RLS run used a wrong config filename (vitest.rls.config.ts is correct).
- Graders run and results (PASS/FAIL): unit PASS, RLS PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): add a "Publish all drafts in this unit" control once a real import shows how many items a unit gets.
