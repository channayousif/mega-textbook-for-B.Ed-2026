---
id: 20261143
title: Author EFMP-407 Unit 1 in English
stage: general
date: 2026-11-07
surface: agent
model: claude-opus-5-5
feature: efmp-407
branch: crew/efmp-407-u01-author
user: M Yousif Channa
command: crew job efmp-407-u01-author
labels: [claude, crew, efmp-407, authoring]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/efmp-407/_category_.json
  - docs/semester-3/efmp-407/course-overview.mdx
  - docs/semester-3/efmp-407/unit-01/
  - specs/content/efmp-407/tasks.md
  - specs/content/efmp-407/authoring/unit-01.md
  - specs/content/efmp-407/concepts/unit-01.md
  - specs/content/efmp-407/coverage/unit-01.md
  - specs/content/efmp-407/figures/unit-01.md
  - specs/content/efmp-407/figures/unit-01.banner.md
  - specs/content/efmp-407/sources/unit-01.md
  - specs/content/efmp-407/sources/texts/
  - specs/content/efmp-407/reviews/unit-01/G2/
  - static/img/figures/efmp-407/unit-01/
tests:
  - npm run check:content
  - node scripts/prepare-gate-evidence.mjs EFMP-407 1
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Authored the first unit of EFMP-407 (Concept and Evolution of Sustainable Development) from the approved spec: index, three nine-part topics, 10/10/5 assessment bank, teacher notes, course overview, six placed schematics with dark variants, coverage, sources with bound excerpts, concept graph, banner prompt, tracker and G2 gate evidence.

## Outcome

- ✅ Impact: EFMP-407 now has its first English unit; G3, G4 and G5 remain open.
- 🧪 Tests: check:content reports no finding that origin/main lacks; prepare-gate-evidence passed all draft gates. measure-figure-text was not run (the brief forbids browser runs).
- 📁 Files: unit, course shell, governance files and figures listed above.
- 🔁 Next prompts: independent G3 review; Urdu mirror; banner illustration.
- 🧠 Reflection: the skill's "stop at markers" is out of date, because check:figures requires rendered figures, so an author job must place SVGs for the gate to pass.

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-407 Unit 1 English on branch crew/efmp-407-u01-author, not pushed.
- Decisions the team must respect: Topic 1.2 teaches that the Brundtland Report is a commission's report and tells learners about the guide's "conferences" wording (D-2026-0076, G-2026-169). The 1992 Earth Summit is a note, not a milestone.
- Pending / next owner: G3 by an independent reviewer; Urdu job; illustrate job for banner fig-U1-7; CI figure-geometry on the six SVGs; glossary candidates in authoring/unit-01.md.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: Firecrawl could not read the UNESCO report body; Orr is print only. Both are listed as unverifiable and used only at title level.
- Graders run and results (PASS/FAIL): draft gates PASS; independent review not run.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): align author-unit's figure wording with check:figures.
