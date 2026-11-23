---
id: 20261247
title: EFMP-406 Urdu teaser clips (held on shot 4)
stage: green
date: 2026-11-23
surface: agent
model: claude-opus-5-5
feature: 030-media-studio
branch: crew/efmp-406-u00-teaser_clips
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
  - history/prompts/030-media-studio/20261247-efmp-406-teaser-clips.green.prompt.md
tests:
  - node scripts/media/teaser-clips.mjs efmp-406 (exit 5, MEDIA-HOLD held)
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Recorded the owner's script approval for efmp-406-ur (crew approve-script via openclaw, sha256
b209bab9...3dc5b matched), so the item moved from `scripted` to `script-approved`. Ran
`teaser-clips.mjs efmp-406`:
- Shot 1 take 1 was generated (veo_lite, 10 credits), QG1 pass, QG2 1.0. Clip QA: pass.
- Shot 2 failed before submission: `gflow_get_credits` returned "Error executing tool", so
  nothing was submitted or billed and no journal entry was written.
- Shot 3 take 1 was generated (veo_lite, 10 credits), QG1 pass, QG2 0.714. Clip QA:
  pass-with-notes. The "missing" words are spelling differences: whisper wrote online and social
  in Urdu script and joined ذمہ دار into one word.
- Shot 4 fell through to manual.flow and was held for the owner (exit 5,
  `MEDIA-HOLD: held - waiting for the owner: make shot 4 in Flow from
  ~/studio-media/inbox/efmp-406-ur-prompts.html and save it as efmp-406-ur_shot-4.mp4`).
  Shot 5 was never attempted.
Following the brief, the job stopped at the hold. The item stays `script-approved` with two takes.

## Outcome

- ✅ Impact: 2 of 5 shots have passing takes; 20 credits spent (balance 674 before the run).
- 🧪 Tests: teaser-clips exit 5 (held); check:content PASS (14/14).
- 📁 Files: ledger item efmp-406-ur and this PHR.
- 🔁 Next prompts: rerun `node scripts/media/teaser-clips.mjs efmp-406` once gflow answers
  `gflow_get_credits` again (it makes shots 2, 4 and 5 only), or the owner saves shot 4 by hand.
- 🧠 Reflection: a gflow tool error on the credit probe is recorded as a failed shot and the next
  shot then falls through to the manual route, so a flaky tunnel turns into an owner hold.

## Handoff (for CEO and agents)

- Shipped / changed: efmp-406-ur is `script-approved` with the owner gate recorded; shots 1 and 3
  have QA-passed takes (media under ~/studio-media/teasers/efmp-406/ur/, not in git).
- Decisions the team must respect: no retake of shot 2 is needed (no spend, no take); shots 2, 4
  and 5 are still first takes. Nothing was uploaded or published.
- Pending / next owner: the owner or the next teaser_clips run makes shots 2, 4 and 5. Check the
  gflow serve window on the PC first, because gflow_get_credits was erroring at 07:54 PKT.
- Paperclip issues affected: none (Paperclip retired; crew board tracks this).

## Evaluation notes (flywheel)

- Failure modes observed: gflow_get_credits "Error executing tool" (masked structlog error)
  failed shot 2 before submission, then the run held on manual.flow for shot 4.
- Graders run and results (PASS/FAIL): QG1 pass x2; QG2 1.0 and 0.714; check:content PASS (14/14).
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): treat a credit-probe tool error as `unavailable`
  (retry later) rather than `failed`.
