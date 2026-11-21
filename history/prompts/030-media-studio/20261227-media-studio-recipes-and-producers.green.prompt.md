---
id: 20261227
title: Media Studio recipes and producers
stage: green
date: 2026-11-21
surface: agent
model: claude-opus-5-5
feature: 030-media-studio
branch: 030-media-studio-us2-us4
user: M Yousif Channa
command: none
labels: [board-direct, media-studio]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - specs/studio/recipes/teaser@1.json
  - specs/studio/recipes/teaser@2.json
  - specs/studio/recipes/README.md
  - specs/studio/recipe.schema.json
  - specs/studio/teaser-script.schema.json
  - scripts/media/recipes.mjs
  - scripts/media/prompt-page.mjs
  - scripts/media/qg2.mjs
  - scripts/media/producers/index.mjs
  - scripts/media/producers/gflow-video.mjs
  - scripts/media/producers/manual-flow.mjs
  - scripts/media/producers/nlm.mjs
  - scripts/media/producers/README.md
  - scripts/notebook-studio/teaser.mjs
  - scripts/notebook-studio/assemble-teaser.mjs
  - tests/unit/notebook-studio-teaser.test.mjs
  - tests/unit/media-producers.test.mjs
  - specs/030-media-studio/tasks.md
tests:
  - npx vitest run (47 files, 525 tests pass)
  - npm run test:crew (139 pass)
  - node scripts/check-docs-sync.mjs (pass)
  - QG0 on all seven published scripts (pass, implicit teaser@1) and on the six batch-3 scripts as teaser@2 (pass)
  - QG2 word match calibrated on the batch-3 whisper transcripts (26 shots)
  - no change under scripts/lib, scripts/check-*.mjs, contracts or specs/content
---

## Prompt

merged, continue with stage 2

## Response snapshot

Implemented Feature 030 increment 2 (US2 T016-T021, US4 T022-T028) on a branch from main after
PR #670 merged. Recipes: teaser@1 (batches 1-2, 1.12x, 22 Urdu words) and teaser@2 (presenter in
shots 1 and 5, named camera moves in shots 2-4, 1.25x, 18 Urdu words, 30 s cap, veo_lite with no
duration, no "9:16" in prompts, explicit no-viewfinder line), a recipe schema and loader with the
prompt builder ported from the batch-3 driver. QG0 takes its word budget and camera-move rule from
the script's recipe (none means teaser@1); the assembler takes its speed from the recipe and fails
QG1 over 30 s for teaser@2 (warns for teaser@1). Producers: one contract with statuses ok, quota,
unavailable, failed and a new held; a per-medium registry and media-quota file; gflow.video with
fresh connections, 15-minute timeout, per-teaser Flow project and a submission journal that
recovers a finished-but-unreported clip and holds on an unexplained charge; manual.flow with a
copy-button prompt page and a pause-aware splitter for joined clips; nlm, resumable by artifact id
with expired cookies as unavailable; qg2.mjs with whisper turbo, a cross-script word match and a
frame strip. T020 was narrowed: published scripts stay untouched (no recipe means teaser@1, so their
recorded script_sha256 stays valid); batch-3 scripts get teaser@2 in the teasers PR after this merges.

## Outcome

- ✅ Impact: new teasers are driven by a versioned recipe; video clips can no longer be paid twice after a lost reply.
- 🧪 Tests: vitest 525/525 (23 new), crew 139/139, docs-sync pass.
- 📁 Files: 2 recipes + schema, 7 new scripts/media modules, 2 notebook-studio scripts, 2 test files, tasks.md.
- 🔁 Next prompts: one live gflow shot through gflow-video.mjs when the tunnel is up; then US1 (crew stages T029-T034).
- 🧠 Reflection: recovery needs a journal written before the call, not after; the lost-reply case is exactly when no "after" happens.

## Handoff (for CEO and agents)

- Shipped / changed: specs/studio/recipes/teaser@{1,2}.json; scripts/media/{recipes,qg2,prompt-page}.mjs; scripts/media/producers/{index,gflow-video,manual-flow,nlm}.mjs; QG0 and the assembler follow the script's recipe.
- Decisions the team must respect: a used recipe is never edited (new version instead); new teasers name `recipe: teaser@2`; published teaser scripts are not edited; a `held` producer result means the owner must act and nothing falls back; gflow clip retakes go through gflow-video.mjs so the journal can recover a billed clip.
- Pending / next owner: owner merges this PR; then Claude adds teaser@2 to the batch-3 scripts on feat/teasers-batch3 and resumes Shorts when told; live gflow checkpoint needs the owner's tunnel; US1 next.
- Paperclip issues affected: none (crew era).

## Evaluation notes (flywheel)

- Failure modes observed: QG2 first scored every CTA line 0.64-0.71 because whisper writes the site as "textbook.com.pk"; fixed by expanding addresses before matching.
- Graders run and results (PASS/FAIL): vitest PASS; test:crew PASS; docs-sync PASS; isolation guard PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): run gflow-video.mjs on one batch-3 retake (GPKS-402 shot 2) to confirm the journal and project reuse live.
