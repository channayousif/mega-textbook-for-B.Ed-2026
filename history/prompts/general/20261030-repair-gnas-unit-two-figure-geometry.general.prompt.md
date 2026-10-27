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
  - specs/content/gnas-301/tasks.md
  - specs/content/gnas-301/reviews/unit-02/G2/20261026T235040873Z-gates.json
  - specs/content/gnas-301/reviews/unit-02/G2/logs-20261026T235040873Z/
tests:
  - Figure text geometry for all 24 light and dark Unit 2 SVGs: PASS
  - Label word preservation comparison
  - Palette tests: 46 passed
  - Dark variant freshness: PASS
  - Representative EN/UR light/dark raster previews inspected
  - npm run check:content: all 13 gates passed
  - node scripts/prepare-gate-evidence.mjs GNAS-301 2: all 8 draft gates passed
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Repaired figure label spacing without changing wording, regenerated dark variants, and refreshed G2 evidence. G3 remains open and requires a fresh independent run.

## Outcome

- ✅ Impact: Removed all 18 reported geometry defects.
- 🧪 Tests: All 24 SVGs pass geometry; label wording is preserved; 46 palette tests pass; all 8 G2 draft gates pass. All 13 content gates pass after refreshing the ignored generated status report.
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
- Graders run and results (PASS/FAIL): Geometry PASS (24 SVGs); word preservation PASS; palette PASS (46 tests); variant freshness PASS; G2 draft gates PASS (8); content gates PASS (13).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Independent reviewer checks the repaired figures in context.
