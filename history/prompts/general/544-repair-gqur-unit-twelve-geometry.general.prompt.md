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
  - static/content-status.json (GQUR tracker digest only)
  - specs/content/gqur-301/tasks.md
  - specs/content/gqur-301/reviews/unit-12/G2/20261027T153755706Z-gates.json
  - specs/content/gqur-301/reviews/unit-12/G2/logs-20261027T153755706Z/
tests:
  - Heavy-wrapped measure-figure-text for all Unit 12 SVGs
  - Visible wording equality against HEAD
  - npm run check:content
  - node scripts/prepare-gate-evidence.mjs GQUR-301 12
  - G2 evidence log digests verified
  - figures:variants:check for Unit 12
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Separated overlapping concept-map labels, routed the weak-strength connector around the strong-strength box, and wrapped the interpretation-table caption. Preserved wording, font sizes, canvas sizes and prose. Regenerated dark variants.

## Outcome

- ✅ Impact: Repairs all five reported text-geometry findings.
- 🧪 Tests: All four light SVGs pass geometry; wording comparison passes. All eight light and dark SVGs pass geometry. G2 evidence refresh passes all eight draft commands; final content check passes all 13 gates after tracker and report-digest updates.
- 📁 Files: Two English SVG sources and their derived dark variants, refreshed G2 evidence and logs, and Unit 12 G2/G3 tracker rows. No Urdu SVG sources exist in this checkout.
- 🔁 Next prompts: Fresh independent G3 review after separate author repairs of F1-F6.
- 🧠 Reflection: Independent layout checks catch overlaps that manifest validation does not.

## Handoff (for CEO and agents)

- Shipped / changed: Bounded Unit 12 figure geometry repair.
- Decisions the team must respect: Preserve wording and canvas sizes; keep G3/G5 open and unsigned.
- Pending / next owner: Separate author owns F1-F6 repairs; independent reviewer owns fresh G3. G3/G5 remain open and unsigned.
- Paperclip issues affected: GQUR-301 Unit 12; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Three direction boxes and two strength boxes previously occupied overlapping space; caption collided with wordmark.
- Graders run and results (PASS/FAIL): All eight SVG geometry checks PASS; visible wording equality PASS; G2 draft gates 8/8 PASS; final content gates 13/13 PASS. Initial content checks found stale variants and G2 evidence, both repaired. Tracker edits also required refreshing the generated GQUR tracker digest; unrelated pre-existing report provenance remains unstaged.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Measure source and derived SVGs after regeneration.
