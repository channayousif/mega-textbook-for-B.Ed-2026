---
id: 20261229
title: Media Studio status view
stage: green
date: 2026-11-21
surface: agent
model: claude-opus-5-5
feature: 030-media-studio
branch: 030-media-studio-us3
user: M Yousif Channa
command: none
labels: [board-direct, media-studio]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - scripts/media/status.mjs
  - scripts/crew/crew.mjs
  - tests/unit/media-status.test.mjs
  - specs/030-media-studio/tasks.md
tests:
  - npm run test:crew (147 pass)
  - npx vitest run (48 files, 530 tests pass)
  - node scripts/check-docs-sync.mjs (pass)
  - node scripts/media/status.mjs on the repository (1021 jobs, 11 kinds/states groups) and crew.mjs status on a copy of the live crew state
---

## Prompt

will be merged on green, continue with stage 4

## Response snapshot

Implemented Feature 030 US3 (T035-T037). `scripts/media/status.mjs` reads every media record
(teaser ledger, Notebook Studio ledgers and manifests, figure manifests) through legacy.mjs, maps
them to the shared states, attaches each kind's producer chain and the owner's next action
(approve a teaser script, watch a private Short with its clip QA and QG2 notes, watch a private
Notebook Studio upload, unblock), and lists producer availability from the image and media quota
files (`--probe` adds the gflow tunnel). Text view shows owner actions, counts per kind and state,
and open jobs; `--all` lists every job; `--json` for machines. The crew BOARD.md Media Studio
section now comes from it. Also: PR #673 had merged into the stale stage-2 branch; reopened as #674
against main.

## Outcome

- ✅ Impact: one place shows every media job and everything waiting on the owner.
- 🧪 Tests: 5 new status tests with four-kind fixtures; crew 147/147; docs-sync pass.
- 📁 Files: status.mjs, crew.mjs board section, test, tasks.md.
- 🔁 Next prompts: US5 site embed (T038-T043).
- 🧠 Reflection: a stacked PR must be opened after checking its base has not already merged; otherwise it lands in a dead branch.

## Handoff (for CEO and agents)

- Shipped / changed: `node scripts/media/status.mjs [--all] [--json] [--probe]`; BOARD.md "Media Studio" section lists scripts to approve, Shorts to watch (with notes), blocked items and producers out.
- Decisions the team must respect: status is read-only; owner actions follow D-2026-0094 (script approval, spot-check, publish are owner-only).
- Pending / next owner: owner merges #674 then this PR; Claude continues with US5.
- Paperclip issues affected: none (crew era).

## Evaluation notes (flywheel)

- Failure modes observed: #673 merged into its stacked base after that base had already merged to main.
- Graders run and results (PASS/FAIL): status tests PASS; test:crew PASS; docs-sync PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): show status in `crew media status` replies too.
