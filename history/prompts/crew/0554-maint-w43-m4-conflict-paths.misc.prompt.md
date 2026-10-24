---
id: crew-maint-2026-w43-m4
title: crew maint-2026-w43-m4 - name conflicting files in batch exclusion reason
stage: misc
date: 2026-10-25
surface: agent
model: opencode
feature: crew
branch: crew/maint-2026-w43-m4
user: crew
command: maint M4
labels: ["crew", "opencode", "maint_refactor"]
links:
  spec: specs/maintenance/2026-w43/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - scripts/crew/batch.mjs
 - scripts/crew/crew.mjs
 - tests/crew/batch.test.mjs
 - specs/intelligence/registry.md
tests:
 - node --test tests/crew/batch.test.mjs
 - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Added a pure `exclusionReason(branch, paths)` helper to scripts/crew/batch.mjs that builds the batch-exclusion reason string. It starts with "<branch> conflicts with main" and lists at most five of the unmerged paths, with a count of the rest. Updated `tryMerge` in `batchPhase` (scripts/crew/crew.mjs) to read `git diff --name-only --diff-filter=U` before `git merge --abort` and pass those paths to the helper. Added tests covering zero, one and more than five paths. Added registry row I-0009 as proposed with an empty signature.

## Outcome

- ✅ Impact: the exclusion reason now names the conflicting files, so the lead and digests can distinguish glossary, tracker and content-status conflicts instead of guessing (F5).
- 🧪 Tests: node --test tests/crew/batch.test.mjs 5/5 pass; full crew suite shows only the pre-existing workers.test.mjs failure (unrelated); npm run check:content all 13 gates pass.
- 📁 Files: 4 changed (scripts/crew/batch.mjs, scripts/crew/crew.mjs, tests/crew/batch.test.mjs, specs/intelligence/registry.md).
- 🔁 Next owners: serialising branches by shared file (the digests' proposed next fix for F5) can now consume the paths the exclusion reason surfaces.
- 🧠 Reflection: the pre-existing workers.test.mjs failure (test 61) is unrelated to this task and was already failing on origin/main.

## Handoff (for CEO and agents)

- Shipped / changed: `exclusionReason` helper in batch.mjs; tryMerge now reads conflicting paths before aborting and uses the helper; tests; registry I-0009.
- Decisions the team must respect: the reason string still starts with "<branch> conflicts with main" as the acceptance requires; the five-fix ceiling and resolveSharedConflicts are unchanged.
- Pending / next owner: F5 follow-up - serialise branches by shared file so concurrent batches stop racing on the same conflict paths. I-0009 stays proposed until that lands.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: the pre-existing workers.test.mjs failure is not from this change.
- Graders run and results (PASS/FAIL): batch.test.mjs PASS; check:content PASS.
- Prompt variant (if applicable): crew brief v1, maintenance M4.
- Next experiment (smallest change to try): consume the exclusion reason's paths in the planner/lead to group non-conflicting branches into the same batch.
