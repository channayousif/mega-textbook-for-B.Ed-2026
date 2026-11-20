---
id: 20261220
title: Teaser batch 2, six Urdu Shorts uploaded private, media consolidation planned
stage: green
date: 2026-11-20
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: feat/teasers-batch2
user: M Yousif Channa
command: none
labels: [board-direct, studio-teaser, gflow, youtube]
links:
  spec: specs/029-notebook-studio/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/studio/teasers/efmp-302.json
  - specs/studio/teasers/geng-300.json
  - specs/studio/teasers/gict-300.json
  - specs/studio/teasers/gnas-301.json
  - specs/studio/teasers/efmp-303.json
  - specs/studio/teasers/efmp-304.json
  - specs/studio/teasers/media-teasers.json
  - scripts/notebook-studio/assemble-teaser.mjs
tests:
  - teaser.mjs check (QG0) on all six scripts
  - vitest notebook-studio teaser, thumbnail and media tests
---

## Prompt

start creating videos and images, the 701 flow credits will reset tomorrow

(then, across 2026-11-18 to 2026-11-20: "approve all"; "check clip, is it possible to run gflow on dava
or your own machine with my login data? iam facing electicity failure."; "ok got it. write prompts";
"i have generated clips, the last clip of each is repeating, it may be the same"; "GENG clips are in
zip file, assemble the rest"; "upload them private when done"; the energy and visuals feedback;
"proceed after uploading all six generated teasers")

## Response snapshot

Wrote six Urdu teaser scripts (EFMP-302, GENG-300, GICT-300, GNAS-301, EFMP-303, EFMP-304); the owner
approved all six. gflow timed out at 600 s on every shot (0.101 and 0.98) although Flow finished
each clip in minutes, so EFMP-302 shots were recovered by owner download and the other five teasers
were made by the owner in the Flow web UI from a copy-button prompt page. Joined Flow clips (16 s,
24 s, 32 s) were split at scene cuts and speech pauses. QG1 (media-qa) passed on every take; QG2 used
local whisper turbo transcripts (NotebookLM cookies had expired) plus frame checks; failed takes
were replaced (EFMP-303 re-split, EFMP-304 shot 2 take 2). Shot 5 is the same in every teaser and was
reused. All six were assembled, thumbnails rebuilt from shots 1-4, and uploaded private with the AI
disclosure, thumbnail and teaser playlist: L031_W_u5WE, CeawyLtdtQc, 4wpqhahqZr8, pENNFf-WHNw,
1bNmtFdmNEE, LwAvxLfGyQw.

## Outcome

- ✅ Impact: six teasers at qa3-pass (private), awaiting the owner's spot-check.
- 🧪 Tests: QG0 passes on all six scripts; notebook-studio unit tests run for the thumbnail change.
- 📁 Files: six scripts, the teaser ledger, assemble-teaser.mjs (thumbnail frame from shots 1-4).
- 🔁 Next prompts: owner spot-check and publish; Media Studio consolidation (spec, ADR, phases).
- 🧠 Reflection: a shared closing shot makes every best-frame thumbnail identical; exclude it.

## Handoff (for CEO and agents)

- Shipped / changed: six private teaser Shorts; thumbnails now come from shots 1-4.
- Decisions the team must respect: owner rulings 2026-11-20: upload as is; future teasers get a
  1.25x voice speed-up, energetic Veo prompts, a preset Flow voice and ingredients (on-screen
  presenter in shots 1 and 5, off-screen voice over action in 2-4); keep gflow and fix its
  finished-clip detection; embed public teasers on course overview pages and course cards; one
  consolidated Media Studio for image, audio and video, crew drafts and owner gates, spec and ADR
  first.
- Pending / next owner: owner watches the six (notes: GENG shot 4 says "job", EFMP-303 shot 3
  repeats "چیلنجز", GNAS shot 4 last word clipped) and approves public; Claude starts the Media
  Studio spec; PR #656 (gflow project reuse) awaits merge.
- Paperclip issues affected: none (crew era).

## Evaluation notes (flywheel)

- Failure modes observed: gflow agent-only composer never detects a finished clip (600 s timeout,
  paid); tunnel drops on power cuts; Flow's agent joins prompts into one long clip; Veo repeats or
  drops Urdu words.
- Graders run and results (PASS/FAIL): QG0 PASS x6; QG1 PASS on all chosen takes and encoded files;
  QG2 PASS or PASS-with-notes x6; QG3 PASS x6.
- Prompt variant (if applicable): batch-2 prompt page (one prompt per shot).
- Next experiment (smallest change to try): EFMP-302 v2 pilot with presenter ingredient and 1.25x pace.
