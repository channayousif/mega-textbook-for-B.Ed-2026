---
id: crew-efpg-401-u02-translate
title: crew translate EFPG-401 unit 2
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efpg-401
branch: crew/efpg-401-u02-translate
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efpg-401/crew-efpg-401-u02-translate.green.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-05.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/unit-assessment.mdx
  - specs/content/efpg-401/reviews/unit-02/G4/translation-handoff.md
  - specs/content/efpg-401/tasks.md
  - static/img/figures/efpg-401/unit-02/fig-U2-1.ur.dark.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-1.ur.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-2.ur.dark.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-2.ur.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-3.ur.dark.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-3.ur.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-4.ur.dark.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-4.ur.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-5.ur.dark.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-5.ur.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-6.ur.dark.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-6.ur.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-7.ur.dark.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-7.ur.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-8.ur.dark.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-8.ur.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-9.ur.dark.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-9.ur.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-10.ur.dark.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-10.ur.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job efpg-401-u02-translate

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u02-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFPG-401 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-401 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-401/`, and `static/img/figures/efpg-401/unit-02/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (efpg-401-u02-author, author, opencode) Ten EN schematics are placed; the G4 Urdu mirror still needs `.ur.svg` translations and UR `<Figure>` wiring.
- (efpg-401-u02-author, author, opencode) G3 independent review remains open; the unit is G2 gate-checked only, not certified.
- (efpg-401-u02-author, author, opencode) The three guide-required print monographs (Sheikh 1998, Mohammad 1998, Celce-Murcia 1991) are cited at title level under `D-2026-0001`; only Antika (2017) and Tamimi Sa'd and Rajabi (2018) are open-access.

## Response snapshot

Translated EFPG-401 Unit 2 into a full 7-file Urdu mirror with 10 localized SVG schematics and 10 derived dark variants, bound to terminology.csv, with exact heading-vector parity, clean content gates and a bank-bound key_terms block.

## Outcome

- Impact: translate for EFPG-401 Unit 2 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the commit; the temporary `reviewed` flip surfaced only the two expected G4/G5 tracker findings.
- Files: 32 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated EFPG-401 Unit 2 into a full 7-file Urdu mirror (`index.mdx`, 5 topics, `unit-assessment.mdx`), 10 localized `.ur.svg` schematics and 10 derived `.ur.dark.svg` variants, handoff document, and task tracker update.
- Decisions the team must respect: G4/G5 remain draft pending independent review; translation_status stays draft.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Seven-file Urdu mirror and 10 localized SVG pairs prepared from English 07090c9d5; translation_status remains draft pending independent G5.
  - All ten localized schematic figures and their dark variants passed measure-figure-text with exit 0.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
