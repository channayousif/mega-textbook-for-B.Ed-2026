---
id: 20261267
title: EFMP-406 Urdu teaser clips complete and QA-passed
stage: green
date: 2026-11-25
surface: agent
model: claude-opus-5-5
feature: 030-media-studio
branch: crew/efmp-406-u00-teaser_clips-r1
user: M Yousif Channa
command: none
labels: [claude_crew, media-studio, studio-teaser]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - specs/studio/teasers/media-teasers.json
  - history/prompts/030-media-studio/20261267-efmp-406-teaser-clips-qa.green.prompt.md
tests:
  - node scripts/media/teaser-clips.mjs efmp-406 --shots 5 (exit 0)
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the earlier run on this branch. Its uncommitted ledger already held first takes of
shots 2, 4 and 5 (veo_lite, 10 credits each) and a pass verdict for shot 2. Read the strips
and transcripts for the takes that had no verdict yet:
- Shot 4 take 1: pass. The courtyard project scene has no readable text, camera UI, map or
  flag, and the dress is right. QG2 0.875, with only spelling differences (بیس, ہاج).
- Shot 5 take 1: fail. The closing close-up shows drawn viewfinder corner marks.
- Retook shot 5 once (`--shots 5`, exit 0, 10 credits). Take 2 is clean: blank phone screen,
  no overlay, right dress. QG2 0.929 (whisper dropped ڈاٹ inside the address). Pass.
Advanced efmp-406-ur to `clips-generated` and then `clips-qa`, with the clips gate recorded
`by: claude`. Nothing was uploaded.

## Outcome

- ✅ Impact: all five shots have passing takes (1 t1, 2 t1, 3 t1, 4 t1, 5 t2). The item is now `clips-qa`.
- 🧪 Tests: teaser-clips exit 0; check:content run before commit (see the commit).
- 📁 Files: ledger item efmp-406-ur and this PHR.
- 🔁 Next prompts: assemble the teaser (`assemble-teaser.mjs efmp-406 ur ...` through heavy.sh) and run encoded QG1.
- 🧠 Reflection: Veo Lite presenter close-ups can burn in viewfinder marks. These show only in
  the last strip frame, so always read the full-size third frame as well.

## Handoff (for CEO and agents)

- Shipped / changed: efmp-406-ur is at `clips-qa`. The chosen takes are shots 1-4 take 1 and
  shot 5 take 2, under ~/studio-media/teasers/efmp-406/ur/ (not in git).
- Decisions the team must respect: shot 5 take 1 failed on a drawn camera interface, so do not
  assemble with it. Shot 5 has one retake left.
- Pending / next owner: the next teaser job (assemble, QG1 encoded, private upload). Publication
  stays with the owner (`crew publish`).
- Paperclip issues affected: none (Paperclip retired; crew board tracks this).

## Evaluation notes (flywheel)

- Failure modes observed: viewfinder corner marks on the shot 5 presenter close-up.
- Graders run and results (PASS/FAIL): QG1 pass x3; QG2 0.875, 0.929, 0.929; clip QA 4 pass, 5t1 fail, 5t2 pass.
- Prompt variant (if applicable): crew brief r1
- Next experiment (smallest change to try): add "no viewfinder or camera overlay" to the
  recipe's negative prompt for the presenter shots.
