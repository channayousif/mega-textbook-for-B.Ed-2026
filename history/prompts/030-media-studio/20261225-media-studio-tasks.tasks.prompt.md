---
id: 20261225
title: Media Studio tasks
stage: tasks
date: 2026-11-20
surface: agent
model: claude-opus-5-5
feature: 030-media-studio
branch: 030-media-studio-tasks
user: M Yousif Channa
command: /sp.tasks
labels: [board-direct, media-studio]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - specs/030-media-studio/tasks.md
tests:
  - none (task list)
---

## Prompt

ssh: connect to host 40.233.116.146 port 22: Connection timed out, by the way we were in the middle of implimentation of a plan,  prioritize it, we will resume shorts later

## Response snapshot

Checked the server side (sshd listening, load normal; the timeout is on the owner's PC or network).
Paused Shorts. PRs #669, #668 and #656 were already merged, so started a fresh branch from main and
generated specs/030-media-studio/tasks.md: 47 tasks in 9 phases (setup, foundational shared core,
then US6, US2, US4, US1, US3, US5, polish), with the FR-018 isolation guard first, lessons from the
batch-3 run built in (no connection reuse, 15-minute timeout, recovery before retake, ledger lock,
no "9:16" in prompts), dependencies, parallel groups and an MVP of Phases 1-3.

## Outcome

- ✅ Impact: Feature 030 is ready for implementation, MVP first.
- 🧪 Tests: none run (task list only).
- 📁 Files: specs/030-media-studio/tasks.md.
- 🔁 Next prompts: implement Phases 1-3 (MVP) as one PR.
- 🧠 Reflection: two ledger writers ran at once during batch 3; T006 adds a lock before anything else uses it.

## Handoff (for CEO and agents)

- Shipped / changed: tasks.md for Feature 030.
- Decisions the team must respect: ADR-0037 and D-2026-0094; no content gate may import scripts/media/.
- Pending / next owner: Claude implements the MVP; batch-3 teasers (6 scripted, 30 clips made, 4 assembling) resume later on the owner's word; Instagram EFMP-303 retry pending.
- Paperclip issues affected: none (crew era).

## Evaluation notes (flywheel)

- Failure modes observed: none in this step.
- Graders run and results (PASS/FAIL): checklist format PASS (all tasks have checkbox, ID and path).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): land the isolation guard (T002) before any code moves.
