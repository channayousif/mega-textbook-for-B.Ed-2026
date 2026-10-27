---
id: 20261031
title: Repair GQUR Unit Six Geometry
stage: general
date: 2026-10-27
surface: agent
model: GPT-6
feature: none
branch: crew/gqur-300-u06-fix
user: crew
command: Read .crew/brief.md
labels: ["codex", "figure-geometry"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/gqur-300/unit-06/
 - specs/content/gqur-300/tasks.md
 - specs/content/gqur-300/reviews/unit-06/G2/
tests:
 - Unit 6 light SVG measurement: PASS (12 sources)
 - npm run figures:variants
 - npm run check:content
 - node scripts/prepare-gate-evidence.mjs GQUR-300 6
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the existing repair commit, wrapped English indicator labels, moved Urdu labels clear of headers, and regenerated dark variants. Preserved all wording and canvas sizes. Refresh G2 evidence after committing repairs and mark G3 stale.

## Outcome

- ✅ Impact: Remaining eight geometry findings resolved; earlier five fixes retained.
- 🧪 Tests: All 12 light sources pass Chromium geometry measurement. Content gates and G2 evidence validation recorded with final follow-up.
- 📁 Files: Unit 6 SVG sources, generated dark variants, G2 evidence and tracker.
- 🔁 Next prompts: Fresh independent G3 review.
- 🧠 Reflection: A passing geometry check still requires checking that line breaks fit table rows.

## Handoff (for CEO and agents)

- Shipped / changed: Geometry repairs and regenerated variants.
- Decisions the team must respect: No wording, prose, viewBox, publication state or review certification changes.
- Pending / next owner: Independent reviewer owns fresh G3; qualified reviewer owns G5.
- Paperclip issues affected: GQUR-300 Unit 6; existing G-2026-30 dependency.

## Evaluation notes (flywheel)

- Failure modes observed: Initial inherited repair was partial and dark variants were stale.
- Graders run and results (PASS/FAIL): Geometry PASS; final content gate results in follow-up.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Fresh independent visual review.
