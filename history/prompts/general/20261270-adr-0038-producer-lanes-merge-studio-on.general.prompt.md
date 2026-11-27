---
id: 20261270
title: ADR-0038 producer lanes; PR #787 live; Study Studio switched on
stage: general
date: 2026-11-25
surface: agent
model: claude-opus-5-5
feature: none
branch: docs/adr-producer-lanes
user: M Yousif Channa
command: /sp.adr
labels: [board-direct, crew, adr, media-studio]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0038-crew-media-producer-lanes-and-per-producer-parallel-generation.md
  pr: null
files:
  - history/adr/0038-crew-media-producer-lanes-and-per-producer-parallel-generation.md
  - history/adr/0036-multi-producer-raster-illustrations-with-per-producer-quotas.md
  - history/adr/0037-unified-media-studio.md
  - history/adr/README.md
  - history/prompts/general/20261270-adr-0038-producer-lanes-merge-studio-on.general.prompt.md
  - ~/.crew/mega-book/control.json (studio: on, via `crew.mjs cmd "crew studio on"`)
tests:
  - npm run check:docs-sync (in sync)
  - ADR checklist grader: clustered decision, 4 alternatives with reasons, positive and negative consequences, references (PASS)
---

## Prompt

merge and turn on, run adr

## Response snapshot

PR #787 had already been merged (2026-11-25 16:06 PKT) and ~/crew-system had picked it up. Turned the Study Studio on through the crew's command path (`crew studio on`, recorded in control.json under the tick lock). Ran /sp.adr: no feature plan.md exists for this crew change, so the decision was taken from the approved plan and PR #787. Created ADR-0038 "Crew Media Producer Lanes and Per-Producer Parallel Generation" (Accepted by owner instruction), which amends ADR-0036 point 6 (single illustrate job and lock) and ADR-0037 point 6 (one A/V job at a time); marked both as amended and added the index row.

## Outcome

- ✅ Impact: lanes and the crew-run Study Studio are live; the decision and its trade-offs are recorded.
- 🧪 Tests: docs-sync passes; ADR grader PASS.
- 📁 Files: see files.
- 🔁 Next prompts: watch the first lane launches and tomorrow's 09:00 roundup on BOARD.md; owner watches EFMP-301 Unit 4 items when asked; owner reviews specs/033 open questions.
- 🧠 Reflection: create-phr.sh allocated a short ID (2487) out of step with the repo's 2026NNNN IDs; renumbered by hand.

## Handoff (for CEO and agents)

- Shipped / changed: ADR-0038 (docs only); Study Studio switch on in the crew's control state.
- Decisions the team must respect: ADR-0038: one job per producer lane in media hours, lanes in parallel outside the text slots, image generation serial per producer, jobs on one ledger never overlap.
- Pending / next owner: owner spot-checks Study Studio units via `crew approve-studio`; Meta AI spec questions (specs/033).
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: PHR script ID scheme drift (2487 vs 2026NNNN).
- Graders run and results (PASS/FAIL): docs-sync PASS; ADR checklist PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): fix create-phr.sh to allocate the next 2026NNNN ID.
