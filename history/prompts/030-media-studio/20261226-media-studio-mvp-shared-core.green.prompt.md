---
id: 20261226
title: Media Studio MVP shared core
stage: green
date: 2026-11-20
surface: agent
model: claude-opus-5-5
feature: 030-media-studio
branch: 030-media-studio-tasks
user: M Yousif Channa
command: none
labels: [board-direct, media-studio]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - scripts/media/brand.mjs
  - scripts/media/states.mjs
  - scripts/media/ledger.mjs
  - scripts/media/legacy.mjs
  - scripts/media/producers/image.mjs
  - scripts/media/producers/quota.mjs
  - scripts/lib/image-producers.mjs
  - scripts/lib/image-quota.mjs
  - scripts/notebook-studio/teaser.mjs
  - scripts/notebook-studio/media-ledger.mjs
  - scripts/notebook-studio/assemble-teaser.mjs
  - specs/studio/media-job.schema.json
  - tests/unit/media-isolation.test.mjs
  - tests/unit/media-ledger.test.mjs
  - tests/unit/media-legacy.test.mjs
  - package.json
  - specs/030-media-studio/tasks.md
tests:
  - npx vitest run (46 files, 502 tests pass)
  - npm run test:crew (139 pass)
  - node scripts/check-docs-sync.mjs (pass)
  - node scripts/check-studio-manifest.mjs (pass)
  - review-evidence script closure identical to origin/main (16 files, none changed)
---

## Prompt

resume

(continuing "we were in the middle of implimentation of a plan, prioritize it, we will resume shorts later")

## Response snapshot

Implemented Feature 030 Phases 1-3 (T001-T015). Added the shared media core under scripts/media/
(states vocabulary and per-kind paths, a ledger engine with atomic writes and a lock held across
load-change-save, brand constants, read-only legacy views of the teaser ledger, Notebook Studio
ledgers and manifests and figure manifests) and the media job schema. Put teaser.mjs,
media-ledger.mjs and assemble-teaser.mjs on it with identical CLIs; their write commands now run
under the lock. Moved the image producers to scripts/media/producers/ with re-export shims at the
old paths. Added the FR-018 isolation guard; media tests live in tests/unit/media-*.test.mjs so CI
runs them through npm test without a new gate (editing gates.mjs would stale every review).

## Outcome

- ✅ Impact: MVP of Feature 030 done; existing tools unchanged for users; ledger writes no longer lose updates.
- 🧪 Tests: vitest 502/502, crew 139/139, docs-sync and studio-manifest checks pass, bound review scripts unchanged.
- 📁 Files: scripts/media/*, three notebook-studio scripts, two shims, schema, three test files.
- 🔁 Next prompts: Increment 2 (US2 recipes, US4 producers and recovery).
- 🧠 Reflection: a moved module's relative imports must be re-pointed; grep for every `from '..` before moving.

## Handoff (for CEO and agents)

- Shipped / changed: shared media core and locked ledgers; image producers now at scripts/media/producers/ (old paths re-export).
- Decisions the team must respect: never import scripts/media/ from a content gate or the review-evidence closure; media tests go in tests/unit/media-*.test.mjs; do not add test:media to gates.mjs or CI.
- Pending / next owner: owner merges the MVP PR; Claude continues with US2/US4; Shorts batch 3 paused (6 teasers scripted, 30 clips made).
- Paperclip issues affected: none (crew era).

## Evaluation notes (flywheel)

- Failure modes observed: ERR_MODULE_NOT_FOUND from a missed relative import after git mv (caught by test:crew).
- Graders run and results (PASS/FAIL): vitest PASS; test:crew PASS; isolation guard PASS; bound-set comparison PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): add the lock to social-post.mjs cross-post writes (T046) early, since it also writes the teaser ledger.
