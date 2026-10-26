---
id: 20261029
title: Repair EFMP-304 Unit 2 figure geometry
stage: general
date: 2026-10-27
surface: agent
model: GPT-6
feature: 009-figure-rendering
branch: crew/efmp-304-u02-fix
user: owner
command: crew brief
labels: [codex, crew]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-304/unit-02/
  - specs/content/efmp-304/tasks.md
  - specs/content/efmp-304/reviews/unit-02/G2/
tests:
  - Unit 2 light SVG geometry: PASS
  - npm run figures:variants
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Repositioned inference labels, corrected mirrored Urdu text anchors, wrapped English labels and regenerated dark variants. Refresh G2 evidence after committing repair and mark G3 findings stale as directed.

## Outcome

- ✅ Impact: All 31 blocking geometry findings repaired without wording changes.
- 🧪 Tests: All 16 light SVGs pass geometry. Content gates and refreshed G2 evidence recorded with this work.
- 📁 Files: Seven light sources and seven derived dark variants; tracker and G2 evidence.
- 🔁 Next prompts: Fresh independent G3 and dependent G5 remain pending.
- 🧠 Reflection: Mirrored SVG text anchors must account for both transforms.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 2 figure geometry repairs and regenerated dark variants.
- Decisions the team must respect: Wording and viewBox dimensions preserved; no review certification claimed.
- Pending / next owner: Independent reviewer owns fresh G3 and G5; full-page RTL and print inspection remains pending.
- Paperclip issues affected: efmp-304-u02-fix; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Urdu end anchors directed labels into adjacent columns; English labels exceeded available width.
- Graders run and results (PASS/FAIL): Geometry PASS; content gate results recorded in G2 logs.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run fresh independent review against repaired figure inputs.
