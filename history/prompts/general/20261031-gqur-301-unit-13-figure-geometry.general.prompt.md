---
id: 20261031
title: Repair Unit 13 figure geometry
stage: general
date: 2026-10-27
surface: agent
model: GPT-6
feature: 009-figure-rendering
branch: crew/gqur-301-u13-fix
user: owner
command: Read .crew/brief.md and carry it out
labels: ["codex", "gqur-301-u13-fix"]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/gqur-301/unit-13/fig-U13-{1,2,3,4}.ur.svg
 - static/img/figures/gqur-301/unit-13/fig-U13-{1,2,3,4}.ur.dark.svg
 - specs/content/gqur-301/tasks.md
 - specs/content/gqur-301/reviews/unit-13/G2/
tests:
 - Figure text measurement: all 16 light and dark English and Urdu assets pass
 - SVG optimisation: all four repaired sources under 20 KB
 - Content gates and refreshed G2 evidence: results recorded in follow-up commit
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Moved four Urdu wordmarks upward by 7px and regenerated dark variants. Preserved wording, label sizes, canvas dimensions, and prose. Preparing refreshed G2 evidence and marking the G3 advisory row stale.

## Outcome

- ✅ Impact: Repairs all four reported bottom-edge overflows.
- 🧪 Tests: Geometry passes for every Unit 13 SVG; content gate results recorded after completion.
- 📁 Files: Four Urdu light sources, four generated dark variants, evidence, tracker and this record.
- 🔁 Next prompts: Fresh independent G3 remains required.
- 🧠 Reflection: Nastaliq font metrics extend the Latin wordmark below its baseline.

## Handoff (for CEO and agents)

- Shipped / changed: Bounded figure geometry repair; refreshed deterministic evidence follows the source commit.
- Decisions the team must respect: No prose, wording, viewBox, publication state, or G3/G5 certification changes. Preserve the pre-existing static/content-status.json modification.
- Pending / next owner: Independent reviewer owns fresh G3; prior English F1-F5 remain outside this repair.
- Paperclip issues affected: gqur-301-u13-fix; no issue number supplied.

## Evaluation notes (flywheel)

- Failure modes observed: All four Urdu wordmarks exceeded the canvas bottom by 1.8px before repair.
- Graders run and results (PASS/FAIL): PASS: all 16 SVG text measurements and four source size checks. Other results follow in this record.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Use measured baseline padding for future Urdu wordmarks.
