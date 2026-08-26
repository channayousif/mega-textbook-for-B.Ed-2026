---
id: 0008
title: Close the suggestion feedback loop
stage: green
date: 2026-08-26
surface: agent
model: claude-sonnet-5
feature: 006-content-pipeline
branch: 006-content-pipeline
user: channayousif@gmail.com
command: none
labels: ["content-pipeline", "implement", "sdd"]
links:
  spec: specs/006-content-pipeline/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - scripts/check-pipeline-gate.mjs
 - tests/unit/pipeline-gate.test.mjs
 - specs/content/efmp-301/tasks.md
 - specs/content/style-guide.md
 - docs/semester-1/efmp-301/unit-01/index.mdx
 - specs/006-content-pipeline/tasks.md
tests:
 - tests/unit/pipeline-gate.test.mjs (1 new regression test — 12/12 passing)
 - full suite: 28/28 passing (6 files)
---

## Prompt

"tackle the deferred suggestion-loop task"

(Follows directly from `/sp.implement`'s Phase 7 (US5), which the user had explicitly deferred
mid-session because it required a live write to the shared self-hosted Supabase
`improvement_suggestions` table — see PHR 0007. This session picks that phase up now that
PRs #6 and #7 have merged and local `main` is synced.)

## Response snapshot

Switched back to `006-content-pipeline`, fast-forwarded it onto the newly-merged `main`. Wrote a
one-off Node script (service-role, run from repo root so it resolves `node_modules`, deleted
immediately after each use — never committed) to seed one `improvement_suggestions` row via a
clearly-tagged test teacher account (`e2e-suggestion-loop-*@example.test`, matching this repo's
existing e2e-test-account precedent), carried through `submitted → under_review → accepted`
respecting the `enforce_suggestion_status_transition()` trigger (T026).

**Before adding the Revision Task row (T027), found and fixed a real latent bug**: the gate
script's `stageDone()` used `Array.find()`, matching the *first* row for a given unit/stage. Since
a Revision Task appends a *new* row for the same stage below an already-`✅` original row,
`find()` would keep reporting "done" from the old row and never see the freshly-appended `▢` row —
meaning the CI gate would silently NOT block merging while a revision was still in progress,
defeating FR-011's entire purpose. Fixed to use the *last* matching row (most-recently-appended
wins), added a regression fixture test, verified the gate now correctly blocks. Then added the
real Revision Task row referencing the seeded suggestion's UUID.

Applied the actual content fix (T028): added one sentence with a concrete retrieval-practice
example to `docs/semester-1/efmp-301/unit-01/index.mdx`'s "Why it matters for teachers"
paragraph, directly resolving the suggestion's ask ("name a concrete example of a teaching
decision"), without changing heading structure (EN<->UR parity unaffected — deliberately, since
FR-011 scopes a content fix to G2, not translation). Marked the revision row `✅`, re-ran the full
validation suite (pipeline gate, answer-key scan, content validator, tsc, 28/28 unit tests) — all
green.

Closed the loop (T029): transitioned the suggestion `accepted → published` via the same
service-role path (mirroring what the admin moderation UI itself does), confirmed the id is
traceable end-to-end: suggestion → tracker row's `Suggestion` column → the actual prose diff.

With Phase 7 now genuinely complete, un-deferred T034 (previously left unchecked pending exactly
this): bumped `specs/content/style-guide.md`'s `version` to `"1.0"`, the FR-017 v1 freeze marker.
Updated every affected note/checkpoint in `specs/006-content-pipeline/tasks.md` — 37/37 tasks now
complete.

## Outcome

- ✅ Impact: Spec 006's Definition of Done (FR-017) is now fully met — not just the pipeline gate
  proven on the golden unit, but the Spec 005 feedback loop proven closing end-to-end on live
  data, and the style guide/terminology bank frozen at v1. Found and fixed a genuine
  correctness bug in the gate's revision-task handling that fixture-only testing (without ever
  constructing a real revision scenario) had not caught.
- 🧪 Tests: 1 new fixture test for the Revision Task re-blocking scenario; full suite 28/28
  passing, no regressions. `check:pipeline-gate`/`check:no-answer-keys`/`validate:content`/`tsc`
  all clean against the real repo.
- 📁 Files: `scripts/check-pipeline-gate.mjs` (bug fix), `tests/unit/pipeline-gate.test.mjs` (new
  test), `specs/content/efmp-301/tasks.md` (Revision Task row), `specs/content/style-guide.md`
  (v1 freeze), `docs/semester-1/efmp-301/unit-01/index.mdx` (the actual content fix),
  `specs/006-content-pipeline/tasks.md` (all Phase 7/T034 notes updated, 37/37).
- 🔁 Next prompts: commit and open a PR for this Phase 7 completion + gate bug fix; Spec 006 is
  now fully closed pending review.
- 🧠 Reflection: this is the second time in this feature that actually exercising a real scenario
  (not just fixtures) surfaced a bug fixtures alone hadn't hit — here, no fixture had ever
  constructed a tracker with *two* rows for the same unit/stage, because until a real revision
  task existed there was no reason to. Deferring the live-data phase earlier, rather than faking
  it, is what made this bug discoverable at all.

## Evaluation notes (flywheel)

- Failure modes observed: `check-pipeline-gate.mjs`'s `stageDone()` silently passed on an
  in-progress Revision Task row because `Array.find()` matched an unrelated earlier `✅` row for
  the same stage — a real, previously-undetected gate defect, now fixed and regression-tested.
- Graders run and results (PASS/FAIL): `npm test` — PASS (28/28); `check:pipeline-gate` — PASS (0
  findings, both before-fix-blocking and after-fix-passing behavior manually confirmed);
  `check:no-answer-keys` — PASS; `validate:content` — PASS; `npx tsc --noEmit` — PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
