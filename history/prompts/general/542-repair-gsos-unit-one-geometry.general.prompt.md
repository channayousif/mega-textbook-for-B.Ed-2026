---
id: 542
title: Repair GSOS Unit One Geometry
stage: general
date: 2026-10-27
surface: agent
model: GPT-6
feature: 009-figure-rendering
branch: crew/gsos-301-u01-fix
user: crew
command: crew brief
labels: ["codex", "figure-geometry"]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/gsos-301/unit-01/fig-U1-4.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-6.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-4.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-6.dark.svg
 - specs/content/gsos-301/tasks.md
 - specs/content/gsos-301/reviews/unit-01/G2/
tests:
 - Unit 1 light SVG geometry: PASS (12 sources)
 - Visible wording equality: PASS
 - npm run check:content: PASS (13/13), matching origin/main
 - npm run figures:variants:check: PASS
 - Dark geometry: PASS (2 regenerated variants)
 - G2 evidence: PASS (8/8 draft commands)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Rewrapped table labels and repositioned the Symbolic interactionism credit while preserving wording, font sizes and canvas dimensions. Regenerated dark variants; refreshed G2 evidence after the repair commit and flagged both G3 rows stale.

## Outcome

- ✅ Impact: Removed all 14 reported geometry findings.
- 🧪 Tests: Geometry passes for every light source; all 13 content gates pass on branch and origin/main.
- 📁 Files: Two English SVG sources, their derived variants, G2 evidence and tracker.
- 🔁 Next prompts: Fresh independent G3 review.
- 🧠 Reflection: Wrap text to column budgets before reducing type.

## Handoff (for CEO and agents)

- Shipped / changed: Figure 4 and 6 table geometry repaired.
- Decisions the team must respect: Preserve source wording and Urdu labels; no canvas or carrier changes. No review certification.
- Pending / next owner: Independent reviewer owns fresh G3; CurriculumOwner retains G0/G1 closure.
- Paperclip issues affected: GSOS-301 Unit 1 crew repair; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Long English table labels crossed columns and spilled past the table edge.
- Graders run and results (PASS/FAIL): PASS geometry and wording preservation; all 13 content gates on branch and origin/main; eight G2 checks; dark geometry and variant freshness.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Independent G3 inspection of repaired tables.
