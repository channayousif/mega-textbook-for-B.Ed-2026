---
id: 20261241
title: Inventory of unfinished plans; tick stale feature checkboxes
stage: misc
date: 2026-11-22
surface: agent
model: claude-opus-5-5
feature: none
branch: chore/tick-stale-tasks
user: M Yousif Channa
command: list all the unfinished plans and its components
labels: [board-direct, housekeeping]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/018-author-geng300/tasks.md
  - specs/019-author-gnas-301/tasks.md
  - specs/020-author-gict-300/tasks.md
  - specs/021-author-gqur-300/tasks.md
  - specs/022-author-efmp-301/tasks.md
  - specs/023-author-efmp-302/tasks.md
  - specs/026-install-ga4/tasks.md
  - specs/028-news-ticker/tasks.md
  - specs/030-media-studio/tasks.md
tests:
  - node scripts/check-docs-sync.mjs
---

## Prompt

list all the unfinished plans and its components

## Response snapshot

Inventory (owner-approved plan, 2026-11-22) from open tasks in `specs/0xx-*/tasks.md`, the plan
files and the crew board, grouped as: in flight today (batch-3 cross-posts, home-teaser deploy,
view-count refresh, pinned comments, crew queue, worktree cleanup); waiting on the owner (TikTok
drafts, EFMP-406 script approval, GPKS-402 flag, EFMP-303 Instagram, LinkedIn Page API, video
studio P006-P009, review governance T007-T008, golden-unit sign-off, who paused the crew); build
work (news ticker follow-up, Notebook Studio 029, licence headings 024, dashboard e2e 011,
authoring v2 013, Media Studio follow-ups, GUHQ-301 defects and G5, the main checkout 842 behind).

This PR does the housekeeping part: verified-done boxes ticked (026 GA4 task-1..6, 023 T023 and
the PR line (#428), 028 T018 (cron installed), 030 T020 (as teaser@3, #684)) and the five crew-era
author specs (018-022) marked superseded by the crew with a pointer to each course tracker.

## Outcome

- ✅ Impact: feature trackers stop listing finished work as open.
- 🧪 Tests: check-docs-sync.
- 📁 Files: nine feature tasks.md files.
- 🔁 Next prompts: finish the in-flight batch-3 items after 16:00; owner ranks news ticker vs licence headings.
- 🧠 Reflection: feature tasks.md files drift once work moves to the crew; the course tracker is the record.

## Handoff (for CEO and agents)

- Shipped / changed: stale ticks and superseded notes only; no code.
- Decisions the team must respect: 018-022 are records of the original plan; do not re-plan from them.
- Pending / next owner: the open items listed above; owner decisions in the "waiting on the owner" group.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: trackers not ticked when work shipped under another route.
- Graders run and results (PASS/FAIL): docs-sync PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): the weekly survey flags feature tasks.md boxes whose work is on main.
