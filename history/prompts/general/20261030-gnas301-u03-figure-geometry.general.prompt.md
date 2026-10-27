---
id: 20261030
title: Repair GNAS Unit Three Figure Geometry
stage: general
date: 2026-10-27
surface: agent
model: GPT-6
feature: none
branch: crew/gnas-301-u03-fix
user: owner
command: crew brief
labels: ["codex", "gnas-301", "figure-geometry"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/gnas-301/unit-03/fig-U3-{2,3,4,6}.svg
 - static/img/figures/gnas-301/unit-03/fig-U3-{2,3,4,6}.dark.svg
 - specs/content/gnas-301/tasks.md
 - specs/content/gnas-301/reviews/unit-03/G2/
tests:
 - Figure text geometry: all 16 light SVGs pass
 - Content gates and G2 evidence preparation
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Rewrapped table labels and repositioned decibel labels without changing wording, fonts or canvas dimensions. Regenerated dark variants. Refreshing G2 evidence and recording stale G3 review.

## Outcome

- ✅ Impact: Repaired all 17 reported geometry defects.
- 🧪 Tests: All 16 EN/UR source SVGs pass geometry; content gate results recorded in follow-up commit.
- 📁 Files: Four English SVGs, their generated dark variants, G2 evidence and unit tracker.
- 🔁 Next prompts: Fresh independent G3 review remains necessary.
- 🧠 Reflection: Measured actual text geometry and preserved existing Urdu sources.

## Handoff (for CEO and agents)

- Shipped / changed: Geometry repairs and refreshed deterministic evidence.
- Decisions the team must respect: No prose, wording, canvas dimensions or certification status changed.
- Pending / next owner: Independent reviewer owns fresh G3; G5 dependency remains open.
- Paperclip issues affected: Crew job gnas-301-u03-fix; no issue number supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Long labels crossed columns or spilled beyond panels.
- Graders run and results (PASS/FAIL): PASS: geometry for all light SVGs; remaining results recorded with evidence refresh.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Fresh independent review of repaired unit.
