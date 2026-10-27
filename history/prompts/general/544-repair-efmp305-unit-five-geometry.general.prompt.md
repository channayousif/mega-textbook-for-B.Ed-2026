---
id: 544
title: Repair EFMP305 unit five geometry
stage: general
date: 2026-10-28
surface: agent
model: GPT-6
feature: none
branch: crew/efmp-305-u05-fix
user: crew
command: Read and execute .crew/brief.md
labels: ["codex", "figure-geometry", "efmp-305"]
links:
  spec: specs/012-visual-density-standard/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-305/unit-05/fig-U5-1.svg
 - static/img/figures/efmp-305/unit-05/fig-U5-1.dark.svg
 - specs/content/efmp-305/tasks.md
 - specs/content/efmp-305/reviews/unit-05/G2/
tests:
 - Unit 5 light SVG geometry: PASS (12 sources)
 - npm run figures:variants: PASS
 - npm run check:content: results recorded in follow-up commit
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Wrapped the 2018 government-funded label at its existing hyphen, grew its panel by 34px and moved the following labels down. Preserved text, font sizes, viewBox, Urdu assets and prose. Regenerated the English dark twin. Refresh G2 after committing the repair and annotate G3 as stale.

## Outcome

- ✅ Impact: Removes the single measured spill in Unit 5.
- 🧪 Tests: All 12 light sources pass geometry; dark variant generated. Final content gates and evidence results recorded below when available.
- 📁 Files: English timeline source, generated dark twin, G2 evidence and unit tracker.
- 🔁 Next prompts: Fresh independent G3 review remains required.
- 🧠 Reflection: Wrap a long hyphenated label instead of reducing text size.

## Handoff (for CEO and agents)

- Shipped / changed: Timeline label repair and refreshed deterministic evidence.
- Decisions the team must respect: Preserve wording and review status; no certification or publication change.
- Pending / next owner: Independent reviewer owns fresh G3; G5 remains pending.
- Paperclip issues affected: EFMP-305 Unit 5 crew job; no issue identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Long label started inside the preceding panel and spilled; wrapping places it fully in its intended panel.
- Graders run and results (PASS/FAIL): Geometry PASS on all 12 sources. Content gate results recorded after completion.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): No additional layout changes needed.
