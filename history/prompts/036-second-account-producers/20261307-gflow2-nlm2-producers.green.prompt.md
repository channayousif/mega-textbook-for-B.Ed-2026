---
id: 20261307
title: gflow2 and nlm2 producers, Workers AI whisper calibration (Feature 036)
stage: green
date: 2026-11-28
surface: agent
model: claude-opus-5-5
feature: 036-second-account-producers
branch: feat/second-account-producers
user: M Yousif Channa
command: board-direct session
labels: ["board-direct", "media-studio", "crew"]
links:
  spec: specs/036-second-account-producers/spec.md
  ticket: null
  adr: history/adr/0039-crew-model-routing-and-second-antigravity-account.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/946
files:
 - scripts/media/producers/image.mjs
 - scripts/media/producers/gflow-video.mjs
 - scripts/media/producers/quota.mjs
 - scripts/media/producers/index.mjs
 - scripts/media/pacing.mjs
 - scripts/media/teaser-clips.mjs
 - scripts/crew/resources.mjs
 - scripts/crew/planner.mjs
 - scripts/crew/media.mjs
 - scripts/crew/workers.mjs
 - scripts/crew/crew.mjs
 - ops/development/media-davinci/workspace-chrome-2.service
 - tests/crew/image-producers.test.mjs
 - tests/crew/image-quota.test.mjs
 - tests/crew/planner.test.mjs
 - tests/crew/resources.test.mjs
 - tests/crew/studio-stages.test.mjs
 - tests/unit/media-producers.test.mjs
 - .claude/skills/media-studio/SKILL.md
 - specs/036-second-account-producers/plan.md
 - specs/036-second-account-producers/tasks.md
tests:
 - node --test tests/crew/*.test.mjs (224 pass)
 - scripts/heavy.sh npm test (636 pass)
 - live gflow2 image via PRODUCER_FNS.gflow2 (nano2, 54 s, gflow2.image 1/40)
 - Workers AI whisper calibration on 24 teaser clips
---

## Prompt

reject cloudflare as image producer, test wisper

ok lets login gflow2 and nlm2

pass for vnc viewer

signed in for both

## Response snapshot

Recorded the owner's ruling: no Cloudflare image producer (ADR-0024/0029 unchanged). Whisper test:
Workers AI whisper-large-v3-turbo on all 24 teaser clips on disk gave the same QG2 verdict as local
whisper 24/24, 22/24 scores within 0.05 (both outliers higher), about 2 s a clip, 150 neurons total.
Opened sign-in windows on davinci; the owner signed the second account into gflow (profile a2ahs-beta,
937 credits) and a new NotebookLM Chrome (saved as nlm profile `second`). Refreshed the expired default
nlm login from workspace-chrome. Found one gflow serve drives both profiles, then built gflow2 images
(lane flow2), gflow2 clips (next in the clip chain, own journal and projects) and nlm2 (lane notebook2,
profile `second`, two Study Studio units at once). Installed `workspace-chrome-2` as a davinci user unit.

## Outcome

- ✅ Impact: second Google account's Flow (937 credits) and NotebookLM are crew producers; five image lanes; two Study Studio units in parallel.
- 🧪 Tests: crew 224 pass, vitest 636 pass; live gflow2 image.
- 📁 Files: listed above.
- 🔁 Next prompts: Feature 037: QG2 whisper on Workers AI with local fallback, free-allowance cap, text-draft helpers.
- 🧠 Reflection: check whether an existing server already handles a second account before planning new infrastructure.

## Handoff (for CEO and agents)

- Shipped / changed: gflow2 and nlm2 producers and lanes; MAX_ILLUSTRATE 5; STUDIO_IN_PROGRESS 2; workspace-chrome-2 unit on davinci; default nlm login refreshed.
- Decisions the team must respect: owner rejected Cloudflare as an image producer (2026-11-28); each account is its own producer with its own quota, pacing, journal and lane; clips stay on one flow lane.
- Pending / next owner: owner merges #946. Claude builds Feature 037 (whisper offload, text drafts; no images).
- Paperclip issues affected: none; GitHub #942-#945 closed by this work.

## Evaluation notes (flywheel)

- Failure modes observed: a `pkill -f` pattern matched its own shell; the default nlm login had silently expired.
- Graders run and results (PASS/FAIL): crew tests PASS; vitest PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): a daily nlm auth probe that refreshes both profiles from davinci before studio jobs run.
