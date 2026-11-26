---
id: 20261292
title: Crew Studio planner uses the approved lean recipe
stage: green
date: 2026-11-27
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: feat/029-studio-lean-recipe
user: M Yousif Channa
command: continue to next issue
labels: [board-direct, media, crew]
links:
  spec: specs/029-notebook-studio/rollout.md
  ticket: "#818, #838"
  adr: null
  pr: null
files:
  - scripts/crew/media.mjs
  - specs/studio/prompts/video-unit.md
  - specs/029-notebook-studio/rollout.md
  - tests/crew/studio-stages.test.mjs
  - specs/034-backlog-tracking/tasks.md
tests:
  - node --test tests/crew/*.test.mjs (studio-stages passes; the 9 failures are identical without the change, caused by the sparse checkout)
---

## Prompt

continue to next issue

## Response snapshot

The owner merged the rollout plan (#905), approving the lean recipe. Applied it: the crew's
`studio_media` planning brief now plans one audio brief per topic (EN, and UR where the mirror
exists) and one unit overview video per language on topic 1 with a new unit-wide prompt
(`specs/studio/prompts/video-unit.md`, Urdu only when every topic has its mirror); no per-topic
videos or "go deeper" parts unless the owner names a unit for the full recipe. Mind maps and study
guides stay a follow-up, because the media ledger and the NotebookLM producer support audio and
video only. Also: #838 marked blocked on the owner (Phase 0 waits for the discovery approval and
Kaggle confirmation); the EFMP-302 course review (#820, crew batch PR #906) got an independent
advisory check (pass with four rubric/key fixes, recorded on #820, to apply after #906 merges).

## Outcome

- ✅ Impact: new Studio units cost about 12 NotebookLM artifacts and 8 uploads instead of about 20 and 12.
- 🧪 Tests: studio-stages assertions for the lean brief.
- 📁 Files: see list above.
- 🔁 Next prompts: apply the #820 fixes after #906 merges; document kinds for the Studio pipeline.
- 🧠 Reflection: the ledger's topic-scoped items made "one video per unit" a topic-1 convention rather than a schema change.

## Handoff (for CEO and agents)

- Shipped / changed: lean recipe in the crew Studio planner; rollout plan marked approved.
- Decisions the team must respect: unit overview videos live on topic 1; the full recipe runs only for units the owner names.
- Pending / next owner: follow-up to add mind map and study guide kinds to the media pipeline.
- Paperclip issues affected: none; GitHub #818, #838, #820.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): crew studio-stages PASS
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
