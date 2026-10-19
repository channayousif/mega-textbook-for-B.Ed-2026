---
id: crew-gsos-301-u01-translate-r1
title: crew translate GSOS-301 unit 1 retry 1
stage: misc
date: 2026-10-19
surface: agent
model: antigravity
feature: gsos-301
branch: crew/gsos-301-u01-translate-r1
user: crew
command: crew translate
labels: ["crew", "antigravity", "translate"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/unit-teacher-notes.mdx
  - specs/content/gsos-301/tasks.md
  - specs/content/gsos-301/reviews/unit-01/G4/translation-handoff.md
  - static/img/figures/gsos-301/unit-01/fig-U1-1.ur.svg
  - static/img/figures/gsos-301/unit-01/fig-U1-1.ur.dark.svg
  - static/img/figures/gsos-301/unit-01/fig-U1-2.ur.svg
  - static/img/figures/gsos-301/unit-01/fig-U1-2.ur.dark.svg
  - static/img/figures/gsos-301/unit-01/fig-U1-3.ur.svg
  - static/img/figures/gsos-301/unit-01/fig-U1-3.ur.dark.svg
  - static/img/figures/gsos-301/unit-01/fig-U1-4.ur.svg
  - static/img/figures/gsos-301/unit-01/fig-U1-4.ur.dark.svg
  - static/img/figures/gsos-301/unit-01/fig-U1-5.ur.svg
  - static/img/figures/gsos-301/unit-01/fig-U1-5.ur.dark.svg
  - static/img/figures/gsos-301/unit-01/fig-U1-6.ur.svg
  - static/img/figures/gsos-301/unit-01/fig-U1-6.ur.dark.svg
tests:
  - node scripts/check-figures.mjs
  - npm run figures:variants:check
  - npm run check:content
  - npm run test:review
---

## Prompt

# Crew job gsos-301-u01-translate-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u01-translate-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GSOS-301 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Response snapshot

Completed the Urdu G4 mirror for GSOS-301 Unit 1 by authoring 6 localized RTL SVG figure variants with dark counterparts, wiring Urdu figures and alt text across topics, translating and polishing all 6 MDX files in scholarly Urdu with zero em dashes, binding frontmatter key terms to `terminology.csv`, recording unbanked sociology terms in `specs/content/gsos-301/reviews/unit-01/G4/translation-handoff.md`, and updating the Unit 1 G4 tracker row in `tasks.md`.

## Outcome

- Impact: complete G4 Urdu mirror for GSOS-301 Unit 1 with all 6 figure variants and passing content gates.
- Tests: `node scripts/check-figures.mjs`, `npm run figures:variants:check`, `npm run check:content` (all 13 content gates pass), and `npm run test:review` (all 40 tests pass).
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge (independent G5 review).
- Reflection: None.

## Handoff (for CEO and agents)

- Shipped / changed: Complete Urdu mirror for GSOS-301 Unit 1 across 6 MDX files, 6 localized `.ur.svg` figure assets and their derived `.ur.dark.svg` counterparts, G4 translation handoff document, and updated G4 tracker row.
- Decisions the team must respect: G4 translation_status remains `draft` pending independent G5 review; unbanked sociology terms are proposed in `specs/content/gsos-301/reviews/unit-01/G4/translation-handoff.md` for CurriculumOwner approval.
- Pending / next owner: independent G5 Urdu review by CurriculumOwner or qualified reviewer.
- Notes for the next job on this unit:
  - English G3 advisory report noted two citation mismatches (Henson 2022 -> Hammond & Cheney, Givens & White 2023 -> Conerly et al.); when English G3 revision is executed, the Urdu mirror citations should be synced.
  - Figure geometries and text-anchors in Urdu SVGs use RTL layout (`text-anchor: end` / `text-anchor: middle`) and have zero text overflows.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS (13/13 gates)
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
