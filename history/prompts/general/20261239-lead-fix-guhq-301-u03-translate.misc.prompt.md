---
id: 20261239
title: Lead fix for the red guhq-301-u03-translate job
stage: misc
date: 2026-11-22
surface: agent
model: claude-opus-5-5
feature: none
branch: crew/guhq-301-u03-translate
user: M Yousif Channa
command: crew-lead
labels: [board-direct, crew-lead]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/guhq-301/tasks.md
  - specs/content/guhq-301/reviews/unit-03/G2/20261122T082448568Z-gates.json
tests:
  - npm run check:content (14/14)
---

## Prompt

yes, fix the guhq-301 u03 translate job

(earlier in the session: "check the crew and retry any killed jobs"; the crew was found paused
and resumed on the owner's answer)

## Response snapshot

- The job's Urdu translation (f5e295a28) was complete and passed 14/14 gates on its branch; it
  went red only on the crew's main comparison: "G2 en-draft: stale or incomplete input manifest"
  (the same pattern U4 and U5 hit today).
- Merged origin/main into the job worktree, re-ran `prepare-gate-evidence.mjs GUHQ-301 3`,
  repointed the Unit 3 G2 row to `20261122T082448568Z-gates.json`; check:content 14/14 (108ef851c).
- Set the job back to `running` (its worker had exited 0) so the next tick reaps it through the
  normal path: gate, job PHR, push, `ready`, then the hourly batch PR.

## Outcome

- ✅ Impact: GUHQ-301 U3 Urdu draft can merge through the batch; no worker attempt spent.
- 🧪 Tests: check:content 14/14.
- 📁 Files: GUHQ-301 tracker row, new G2 evidence.
- 🔁 Next prompts: G5 review of the Urdu; English defects for G3 or revise-topic (handoff).
- 🧠 Reflection: translate jobs keep staling English G2 evidence; the translate brief or the
  reap could refresh G2 itself. That is an intelligence candidate, not a direct skill edit.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 3 G2 evidence refreshed; translate job re-reaped.
- Decisions the team must respect: none new.
- Pending / next owner: G5 on the Urdu mirror (verse meanings, concept labels, 360 px/A4 render);
  English defects 2:284 (`فَىٓ` for `فِىٓ`) and the 2:91 result clause go to G3 or revise-topic.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: translation stales the English G2 input manifest (third time today).
- Graders run and results (PASS/FAIL): check:content PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): have the translate stage re-run prepare-gate-evidence
  before finishing.
