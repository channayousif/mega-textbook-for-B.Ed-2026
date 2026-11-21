---
id: 20261230
title: gflow image fetch 404
stage: green
date: 2026-11-21
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/gflow-image-suffix
user: M Yousif Channa
command: none
labels: [board-direct, crew, illustrations]
links:
  spec: null
  ticket: null
  adr: history/adr/0036-multi-producer-illustrations.md
  pr: null
files:
  - scripts/media/producers/image.mjs
  - tests/crew/image-producers.test.mjs
tests:
  - node --test tests/crew/image-producers.test.mjs (9 pass, 2 new)
  - npm run test:crew (141 pass)
---

## Prompt

Chech flow log: there are some images in gflow directory on my laptop:

[pasted gflow serve log: POST /mcp 200s and session idle-timeout lines, 2026-11-21 10:04-10:29 PKT]

## Response snapshot

The calls came from crew job gqur-300-u06-illustrate (agy worker, 03:30-05:00 UTC). Six Nano Banana
images reached Downloads\gflow-cli\images\2026-11-21 as .jpg, but generate-illustration.mjs fetched
them with HTTP 404, treated gflow as unavailable, and exited 3 ("all producers out"), so nothing was
placed and the job was requeued. gflow plans `<job>_<n>.png` and saves Flow's JPEG bytes as `.jpg`
(gflow #96). The producer now tries the reported path, its other image suffixes, then any file with
the same stem in that folder; a missing file is a failed image, not an unavailable producer. The
agy worker also called gflow_generate_image itself while testing, against its brief; noted for the lead.

## Outcome

- ✅ Impact: illustrate jobs can use gflow images again instead of waiting for agy (out until 2026-11-24) and Codex.
- 🧪 Tests: image-producers 9/9 (2 new), test:crew 141/141.
- 📁 Files: scripts/media/producers/image.mjs, tests/crew/image-producers.test.mjs.
- 🔁 Next prompts: watch the next gqur-300-u06-illustrate run for a gflow ✓ line.
- 🧠 Reflection: a 404 after a successful generation was classed as "producer unavailable", which hid the real fault behind an all-quota exit.

## Handoff (for CEO and agents)

- Shipped / changed: fetchGflowImage and gflowImageCandidates in scripts/media/producers/image.mjs.
- Decisions the team must respect: workers never call gflow or any image tool directly; only generate-illustration.mjs does (ADR-0029 point 4). The agy worker broke this on 2026-11-21.
- Pending / next owner: the six orphan images in the owner's Downloads\gflow-cli\images\2026-11-21 cannot be matched to figure rows; the owner may delete them. Lead: consider a brief line or check against direct gflow calls by workers.
- Paperclip issues affected: none (crew era).

## Evaluation notes (flywheel)

- Failure modes observed: suffix mismatch between gflow's reported and saved image paths; worker improvised direct tool calls.
- Graders run and results (PASS/FAIL): test:crew PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): log the exact `files[0]` gflow returns in generate-illustration.mjs output so the next mismatch is visible in the job log.
