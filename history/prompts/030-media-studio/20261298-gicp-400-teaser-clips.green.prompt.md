---
id: 20261298
title: GICP-400 Urdu teaser clips
stage: green
date: 2026-11-27
surface: agent
model: claude-sonnet-5-5
feature: 030-media-studio
branch: crew/gicp-400-u00-teaser_clips
user: M Yousif Channa
command: none
labels: [claude, media-studio, studio-teaser]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - specs/studio/teasers/media-teasers.json
  - history/prompts/030-media-studio/20261298-gicp-400-teaser-clips.green.prompt.md
tests:
  - media-qa.mjs --kind clip on every chosen take (QG1 pass)
  - qg2.mjs transcript match on every chosen take (0.875 to 1.0)
  - npm run check:content (14 gates pass)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Recorded the owner's script approval for gicp-400-ur, generated the five shots on gflow
(veo_lite), reviewed every take, and advanced the item to `clips-qa`. Chosen takes: shot 1 t1,
shot 2 t3, shot 3 t3, shot 4 t1, shot 5 t1. Seven generations, 70 credits.

Shot 2 t1 and t2 failed for drawn viewfinder brackets (t2 also had whiteboard writing). Shot 3 t1
failed for a broken dissolve with a duplicated band, and t2 for a drawn REC interface. Shot 2 t3
is an 82% crop of t1 and shot 3 t3 an 82% crop of t2, at no credit cost.

## Outcome

- ✅ Impact: gicp-400-ur is ready for the `media_assemble` stage; nothing was uploaded or published.
- 🧪 Tests: QG1 and QG2 pass on the chosen takes; check:content passes.
- 📁 Files: teaser ledger (own item only) and this PHR. Media stays in ~/studio-media.
- 🔁 Next prompts: assemble, upload private, QG3, owner spot-check.
- 🧠 Reflection: the 3-frame strip hid two defects' timing; one frame per second showed the broken
  second half of shot 3 clearly.

## Handoff (for CEO and agents)

- Shipped / changed: five passing takes recorded for gicp-400-ur; state `clips-qa`.
- Decisions the team must respect: use the chosen takes only (`chosenTakes`); shots 2 and 3 are at
  the three-take limit.
- Pending / next owner: crew `media_assemble`. At the owner spot-check, look at the soap bubbles
  in shot 5, the ornate arched verandah and soft smear on a dupatta in shot 4, and the small
  pseudo-script in shot 2's notebooks.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: Veo Lite drew camera interfaces in 3 of 7 generations; one clip had a
  composited double frame that QG1 did not detect.
- Graders run and results (PASS/FAIL): QG1 PASS, QG2 PASS, visual review as above.
- Prompt variant (if applicable): teaser@3.
- Next experiment (smallest change to try): crop a viewfinder-only failure first, before paying
  for a retake.
