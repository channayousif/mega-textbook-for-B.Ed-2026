---
id: 20261122
title: GENG-301 Unit 3 G3 repairs
stage: general
date: 2026-11-05
surface: agent
model: GPT-6 (host label; exact deployed version unavailable)
feature: none
branch: crew/geng-301-u03-repair_en
user: crew
command: Read .crew/brief.md
labels: ["codex", "geng-301", "repair-en"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/geng-301/unit-03/index.mdx
  - docs/semester-2/geng-301/unit-03/topic-01.mdx
  - docs/semester-2/geng-301/unit-03/topic-02.mdx
  - docs/semester-2/geng-301/unit-03/topic-03.mdx
  - docs/semester-2/geng-301/unit-03/topic-04.mdx
  - docs/semester-2/geng-301/unit-03/unit-assessment.mdx
  - docs/semester-2/geng-301/unit-03/unit-teacher-notes.mdx
  - specs/content/geng-301/concepts/unit-03.md
  - specs/content/geng-301/coverage/unit-03.md
  - specs/content/geng-301/figures/unit-03.md
  - specs/content/geng-301/sources/unit-03.md
  - specs/content/geng-301/tasks.md
  - static/img/figures/geng-301/unit-03/fig-U3-1.dark.svg
  - static/img/figures/geng-301/unit-03/fig-U3-1.svg
  - static/img/figures/geng-301/unit-03/fig-U3-2.dark.svg
  - static/img/figures/geng-301/unit-03/fig-U3-2.svg
  - static/img/figures/geng-301/unit-03/fig-U3-6.dark.svg
  - static/img/figures/geng-301/unit-03/fig-U3-6.svg
  - static/img/figures/geng-301/unit-03/fig-U3-7.dark.svg
  - static/img/figures/geng-301/unit-03/fig-U3-7.svg
  - specs/content/geng-301/reviews/unit-03/repairs-20261105.md
  - history/prompts/general/20261122-geng-301-unit-03-g3-repairs.general.prompt.md
tests:
  - npm run check:content (working branch and isolated origin/main baseline)
  - scripts/heavy.sh npm test
  - node scripts/build-figure-variants.mjs --check
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Completed inherited Unit 3 repairs against the latest G3 findings, corrected remaining figures and mappings, and left independent review evidence explicitly pending.

## Outcome

- ✅ Impact: Aligned the unit with the approved thesis scope and repaired assessment and pedagogy defects.
- 🧪 Tests: Unit tests: 31 files, 368 tests passed. All 14 origin/main content gates passed; all 14 repaired-branch content gates also passed.
- 📁 Files: Unit 3 English pages, governance tables, four light/dark figure pairs, fresh G2 evidence, check logs, repair record and this PHR.
- 🔁 Next prompts: Parent prepares frozen handoff and commissions independent assessment/render review within the authorized cycle limit.
- 🧠 Reflection: The inherited repair missed contradictory SVG labels and concept mappings; checked both before completion.

## Handoff (for CEO and agents)

- Shipped / changed: Thesis scope, citation qualifications, coverage, assessment scoring, evaluation practice and activity inputs repaired.
- Decisions the team must respect: G3 remains open; no self-certification, fabricated provenance or publication change. No Urdu mirror exists.
- Pending / next owner: Parent/review host owns exact session/model provenance, independent solving and narrow/print/geometry inspection.
- Paperclip issues affected: Crew job geng-301-u03-repair_en; latest report 20261102T212207Z-g3-desk-bbbec948.

## Evaluation notes (flywheel)

- Failure modes observed: Shared writing2015 excerpt edits would invalidate other units, so Unit 3 excerpts were placed in its own sources file. Browser inspection is prohibited by this brief.
- Graders run and results (PASS/FAIL): PASS: 368 unit tests, dark-variant freshness, diff whitespace and all 14 origin/main content gates. PASS: all 14 final repaired-branch content gates; fresh Unit 3 G2 evidence recorded.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Fresh independent reviewer checks the committed repair without author reasoning.
