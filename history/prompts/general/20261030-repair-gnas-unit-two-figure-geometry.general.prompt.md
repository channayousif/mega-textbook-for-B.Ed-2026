---
id: 20261030
title: Repair GNAS Unit Two Figure Geometry
stage: general
date: 2026-10-27
surface: agent
model: GPT-6
feature: 012-visual-density-standard
branch: crew/gnas-301-u02-fix
user: a2ahs
command: Read .crew/brief.md
labels: ["codex", "gnas-301", "figure-geometry"]
links:
  spec: specs/012-visual-density-standard/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/gnas-301/unit-02/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-02/topic-03.mdx
  - static/img/figures/gnas-301/unit-02/fig-U2-1.dark.svg
  - static/img/figures/gnas-301/unit-02/fig-U2-1.svg
  - static/img/figures/gnas-301/unit-02/fig-U2-1.ur.dark.svg
  - static/img/figures/gnas-301/unit-02/fig-U2-1.ur.svg
  - static/img/figures/gnas-301/unit-02/fig-U2-2.dark.svg
  - static/img/figures/gnas-301/unit-02/fig-U2-2.svg
  - static/img/figures/gnas-301/unit-02/fig-U2-3.dark.svg
  - static/img/figures/gnas-301/unit-02/fig-U2-3.svg
  - static/img/figures/gnas-301/unit-02/fig-U2-4.dark.svg
  - static/img/figures/gnas-301/unit-02/fig-U2-4.svg
  - static/img/figures/gnas-301/unit-02/fig-U2-5.dark.svg
  - static/img/figures/gnas-301/unit-02/fig-U2-5.svg
  - static/img/figures/gnas-301/unit-02/fig-U2-5.ur.dark.svg
  - static/img/figures/gnas-301/unit-02/fig-U2-5.ur.svg
  - static/img/figures/gnas-301/unit-02/fig-U2-6.dark.svg
  - static/img/figures/gnas-301/unit-02/fig-U2-6.svg
tests:
  - Figure text geometry for all light and dark Unit 2 SVGs
  - Label word preservation comparison
  - npm run check:content
  - node scripts/prepare-gate-evidence.mjs GNAS-301 2
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Repaired figure label spacing without changing wording, regenerated dark variants, and refreshed G2 evidence. G3 remains open and requires a fresh independent run.

## Outcome

- ✅ Impact: Removed all 18 reported geometry defects.
- 🧪 Tests: Geometry and label preservation pass; content gates and G2 evidence recorded with the final work.
- 📁 Files: Unit 2 light sources, generated dark variants, bilingual figure height carriers, G2 evidence and tracker.
- 🔁 Next prompts: Fresh qualified independent G3 review under existing owner authorisation rules.
- 🧠 Reflection: Grow and wrap labels rather than shrinking type.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 2 geometry repairs and fresh deterministic evidence.
- Decisions the team must respect: Preserve label wording and keep G3/G5 unticked.
- Pending / next owner: Owner coordinates a fresh independent G3 run.
- Paperclip issues affected: gnas-301-u02-fix; no issue number supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Original labels overlapped neighbours and spilled out of panels; the waste hierarchy needed taller steps.
- Graders run and results (PASS/FAIL): Geometry PASS; word preservation PASS. Content-gate results are recorded in the committed evidence and final handoff.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Independent reviewer checks the repaired figures in context.
