---
id: 544
title: Repair GQUR Unit Twelve Geometry
stage: general
date: 2026-10-27
surface: agent
model: GPT-6
feature: 012-visual-density-standard
branch: crew/gqur-301-u12-fix
user: crew owner
command: crew brief execution
labels: ["codex", "gqur-301", "figure-geometry"]
links:
  spec: specs/012-visual-density-standard/spec.md
  ticket: null
  adr: history/adr/0024-capability-based-claude-and-codex-visual-authoring.md
  pr: null
files:
  - static/img/figures/gqur-301/unit-12/fig-U12-1.svg
  - static/img/figures/gqur-301/unit-12/fig-U12-1.dark.svg
  - static/img/figures/gqur-301/unit-12/fig-U12-4.svg
  - static/img/figures/gqur-301/unit-12/fig-U12-4.dark.svg
tests:
  - Heavy-wrapped measure-figure-text for all Unit 12 SVGs
  - Visible wording equality against HEAD
  - npm run check:content and origin/main comparison
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Separated overlapping concept-map labels, routed the weak-strength connector around the strong-strength box, and wrapped the interpretation-table caption. Preserved wording, font sizes, canvas sizes and prose. Regenerated dark variants.

## Outcome

- ✅ Impact: Repairs all five reported text-geometry findings.
- 🧪 Tests: All four light SVGs pass geometry; wording comparison passes. Full content-gate baseline comparison and G2 evidence refresh recorded in the follow-up commit.
- 📁 Files: Two English SVG sources and their derived dark variants; no Urdu SVG sources exist in this checkout.
- 🔁 Next prompts: Fresh independent G3 review after separate author repairs of F1-F6.
- 🧠 Reflection: Independent layout checks catch overlaps that manifest validation does not.

## Handoff (for CEO and agents)

- Shipped / changed: Bounded Unit 12 figure geometry repair.
- Decisions the team must respect: Preserve wording and canvas sizes; keep G3/G5 open and unsigned.
- Pending / next owner: Refresh G2 evidence and G3 stale note after committing figure bytes; crew worker owns follow-up. Independent reviewer owns fresh G3.
- Paperclip issues affected: GQUR-301 Unit 12; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Three direction boxes and two strength boxes previously occupied overlapping space; caption collided with wordmark.
- Graders run and results (PASS/FAIL): Light geometry PASS; visible wording equality PASS. Content-gate comparison pending follow-up.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Measure source and derived SVGs after regeneration.
