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
 - Initial content suite: all 13 gates pass
 - G2 evidence preparation: all 8 draft gates pass
 - Figure palette: 46 tests pass
 - Dark variant freshness: passes across 1006 sources
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Moved four Urdu wordmarks upward by 7px and regenerated dark variants. Preserved wording, label sizes, canvas dimensions, and prose. Preparing refreshed G2 evidence and marking the G3 advisory row stale.

## Outcome

- ✅ Impact: Repairs all four reported bottom-edge overflows.
- 🧪 Tests: All 16 SVGs, 46 palette tests, dark variant freshness, initial 13 content gates, and 8 G2 draft gates pass. Final tracker update requires the content-status digest refresh; scope exception requested from owner.
- 📁 Files: Four Urdu light sources, four generated dark variants, evidence, tracker and this record.
- 🔁 Next prompts: Fresh independent G3 remains required.
- 🧠 Reflection: Nastaliq font metrics extend the Latin wordmark below its baseline.

## Handoff (for CEO and agents)

- Shipped / changed: Bounded figure geometry repair, refreshed deterministic G2 evidence, and stale G3 annotation.
- Decisions the team must respect: No prose, wording, viewBox, publication state, or G3/G5 certification changes. Preserve the pre-existing static/content-status.json modification.
- Pending / next owner: Owner scope decision pending for the required static/content-status.json tracker digest update. Independent reviewer owns fresh G3; prior English F1-F5 remain outside this repair.
- Paperclip issues affected: gqur-301-u13-fix; no issue number supplied.

## Evaluation notes (flywheel)

- Failure modes observed: All four Urdu wordmarks exceeded the canvas bottom by 1.8px before repair.
- Graders run and results (PASS/FAIL): PASS: 16 SVGs, four source size checks, 46 palette tests, 1006 variant freshness checks, initial 13 content gates and 8 G2 draft gates. Final suite: 12/13 pass; check:content-status fails because the required tracker edits invalidate its stored digest. origin/main report matches its tracker digest. Owner scope exception pending for the prepared one-field refresh.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Use measured baseline padding for future Urdu wordmarks.
