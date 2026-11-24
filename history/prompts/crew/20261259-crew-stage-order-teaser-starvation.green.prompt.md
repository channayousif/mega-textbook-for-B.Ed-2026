---
id: 20261259
title: Crew stage order - teaser clips starved by unlisted side stages
stage: green
date: 2026-11-24
surface: agent
model: claude-opus-5-5
feature: crew
branch: fix/crew-stage-order
user: M Yousif Channa
command: none
labels: [board-direct, crew, media]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/751
files:
  - scripts/crew/workers.mjs
  - scripts/crew/crew.mjs
  - tests/crew/stage-order.test.mjs
tests:
  - node --test tests/crew/*.test.mjs (174 pass, 0 fail)
---

## Prompt

ok,do it, by the way my laptop is connected and tunnel, fileserver and gflow is up. why crew is not generating images or videos?

## Response snapshot

("do it" applied migration 0056; that work is recorded in 20261260.)

Diagnosed the crew from `~/.crew/mega-book/` state, logs and a `crew tick --dry-run`.

Images: not blocked. agy's image quota is out until 2026-11-24T11:00Z, but
`availableProducers()` returns gflow (tunnel ports 18800/18801 reachable) and codex, and
`generate-illustration.mjs` falls back to gflow. Illustrate jobs kept running
(efmp-301-u07, gcce-400-u05, gcce-400-u06). Throughput is one illustrate job at a time by design
(`limitIllustrate`), and a finished job holds the slot while `ready` until the hourly batch merges
it, so `media/status.mjs` (which reads main) lags the branches.

Videos: `efmp-406-u00-teaser_clips-r1` (script approved, gflow reachable, no gflow.video quota,
`mediaLaunchProblem` null) sat queued from 2026-11-23T06:16Z. `teaser_clips` runs only on the
`claude` worker (maxConcurrent 1). `refresh_figures`, `flashcards` and `slides` were never added
to `STAGE_ORDER`, so `indexOf` returned -1 and they sorted ahead of every stage, fixes included.
All three try `claude` first, so each time claude came off a 5-hour-limit cooldown one of them
took the slot and the teaser never launched.

Fix: moved `STAGE_ORDER` next to `STAGES` in `scripts/crew/workers.mjs` (exported, imported by
crew.mjs), appended the three side stages after `social_roundup`, and added
`tests/crew/stage-order.test.mjs` asserting every STAGES key is listed exactly once and that
teaser clips precede the side stages.

## Outcome

- ✅ Impact: queued teaser clips (and every other listed stage) now launch ahead of figure refresh, flashcards and slides; a future stage cannot be added without a launch position.
- 🧪 Tests: node --test tests/crew/*.test.mjs, 174/174 pass.
- 📁 Files: scripts/crew/workers.mjs, scripts/crew/crew.mjs, tests/crew/stage-order.test.mjs.
- 🔁 Next prompts: watch the next ticks for efmp-406-u00-teaser_clips-r1 launching on claude.
- 🧠 Reflection: an indexOf-based sort silently promotes unknown keys; the list belongs beside the registry it orders.

## Handoff (for CEO and agents)

- Shipped / changed: STAGE_ORDER now lives in scripts/crew/workers.mjs and covers refresh_figures, flashcards and slides (last). The crew picks this up from main on its next tick (tick.sh merges origin/main).
- Decisions the team must respect: any new crew stage must be added to STAGE_ORDER; the stage-order test fails otherwise. Side work (refresh, flashcards, slides) goes after owner-gated media.
- Pending / next owner: the teaser still needs the claude worker free of its 5-hour limit, and the claude worker shares the owner's Claude account usage with interactive sessions. Shot 4 of efmp-406-ur may again need a manual Flow render (first attempt held for it).
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: unknown stage sorted first via indexOf -1; media status read from main looked like "nothing generated" while images sat on ready branches.
- Graders run and results (PASS/FAIL): crew node tests PASS (174/174).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): have BOARD.md print why the head of the queue did not launch (worker busy, cooling, hold reason) so starvation is visible without a code read.
