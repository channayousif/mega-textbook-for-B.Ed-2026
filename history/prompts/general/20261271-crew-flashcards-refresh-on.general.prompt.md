---
id: 20261271
title: Turn on crew flashcards and figure refresh stages
stage: general
date: 2026-11-25
surface: agent
model: claude-opus-5-5
feature: 032-textbook-visuals
branch: feat/home-cta-banner
user: M Yousif Channa
command: crew cmd
labels: [board-direct, crew, ops]
links:
  spec: specs/032-textbook-visuals/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/general/20261271-crew-flashcards-refresh-on.general.prompt.md
tests:
  - none (runtime crew control change; confirmed with crew flashcards status and crew refresh status)
---

## Prompt

merge both, crew flashcards on and crew refresh on

## Response snapshot

Checked PRs #751 (fix(crew): teaser clips starved by unlisted side stages in STAGE_ORDER) and #752
(feat(029): quiz item drafts, migration 0056): both were already MERGED, so nothing was merged.
Ran `node scripts/crew/crew.mjs cmd "crew flashcards on"` and `cmd "crew refresh on"` from
`~/crew-system`. The crew replied: flashcard decks on (78 units still need a deck, up to two units
queued per plan); figure refresh on (25 units eligible, one uncertified unit per plan, never a
certified unit or one awaiting G3 sign-off). `~/.crew/mega-book/control.json` now has
`flashcards: "on"` and `refresh: "on"`.

## Outcome

- ✅ Impact: crew planner will queue `flashcards` and `refresh_figures` jobs from the next tick.
- 🧪 Tests: none; status commands confirmed both toggles on.
- 📁 Files: this PHR only (control.json is host runtime state, not in git).
- 🔁 Next prompts: watch the first flashcards and refresh_figures PRs; review the redrawn schematics before merge.
- 🧠 Reflection: owner commands need the `crew` prefix inside `cmd` ("crew flashcards on"); bare `crew.mjs flashcards on` prints usage.

## Handoff (for CEO and agents)

- Shipped / changed: owner turned on crew stages `flashcards` (Feature 032 phase C) and `refresh_figures` (Feature 032 phase D, T030) on 2026-11-25.
- Decisions the team must respect: refresh never touches certified units or units awaiting G3 sign-off; flashcard decks stay under `specs/studio/flashcards/`, outside every review manifest.
- Pending / next owner: crew lead monitors the first jobs; owner reviews refresh output; 032 T030 can be ticked after the pilot unit's before/after is checked.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: first attempt used bare subcommands, which print usage.
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
