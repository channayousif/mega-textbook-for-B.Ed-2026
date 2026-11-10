---
id: crew-efpg-401-u06-translate
title: crew translate EFPG-401 unit 6
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efpg-401
branch: crew/efpg-401-u06-translate
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efpg-401/crew-efpg-401-u06-translate.green.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-06/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-06/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-06/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-06/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-06/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-06/topic-05.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-06/unit-assessment.mdx
  - specs/content/efpg-401/reviews/unit-06/G4/translation-handoff.md
  - static/img/figures/efpg-401/unit-06/fig-U6-1.ur.svg
  - static/img/figures/efpg-401/unit-06/fig-U6-1.ur.dark.svg
  - static/img/figures/efpg-401/unit-06/fig-U6-2.ur.svg
  - static/img/figures/efpg-401/unit-06/fig-U6-2.ur.dark.svg
  - static/img/figures/efpg-401/unit-06/fig-U6-3.ur.svg
  - static/img/figures/efpg-401/unit-06/fig-U6-3.ur.dark.svg
  - static/img/figures/efpg-401/unit-06/fig-U6-4.ur.svg
  - static/img/figures/efpg-401/unit-06/fig-U6-4.ur.dark.svg
  - static/img/figures/efpg-401/unit-06/fig-U6-5.ur.svg
  - static/img/figures/efpg-401/unit-06/fig-U6-5.ur.dark.svg
  - static/img/figures/efpg-401/unit-06/fig-U6-6.ur.svg
  - static/img/figures/efpg-401/unit-06/fig-U6-6.ur.dark.svg
  - static/img/figures/efpg-401/unit-06/fig-U6-7.ur.svg
  - static/img/figures/efpg-401/unit-06/fig-U6-7.ur.dark.svg
  - static/img/figures/efpg-401/unit-06/fig-U6-8.ur.svg
  - static/img/figures/efpg-401/unit-06/fig-U6-8.ur.dark.svg
  - static/img/figures/efpg-401/unit-06/fig-U6-9.ur.svg
  - static/img/figures/efpg-401/unit-06/fig-U6-9.ur.dark.svg
  - static/img/figures/efpg-401/unit-06/fig-U6-10.ur.svg
  - static/img/figures/efpg-401/unit-06/fig-U6-10.ur.dark.svg
tests:
  - npm run check:content
  - node scripts/measure-figure-text.mjs static/img/figures/efpg-401/unit-06/*.ur.svg
  - npm run figures:variants:check
---

## Prompt

# Crew job efpg-401-u06-translate

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u06-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFPG-401 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-401 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-401/`, and `static/img/figures/efpg-401/unit-06/`.

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
- (efpg-401-u06-author-conflict1, fix, opencode) Unit 6 G3/G5 remain open and figures are EN-only (no `.ur.svg`); Urdu mirror is a separate job.
- (efpg-401-u06-author-conflict1, fix, opencode) Unit 6 G2 evidence is at `specs/content/efpg-401/reviews/unit-06/G2/20261110T133127223Z-gates.json`; re-run `prepare-gate-evidence` if unit bytes change.
- (efpg-401-u06-author-conflict1, fix, opencode) `measure-figure-text` reports two cosmetic wordmark collisions (fig-U6-8, fig-U6-9) that exit 0.
- (efpg-401-u06-author, author, opencode) Urdu mirror (G4) and independent G3 review remain open; figures are EN-only, no `.ur.svg` yet.
- (efpg-401-u06-author, author, opencode) G2 evidence is at `specs/content/efpg-401/reviews/unit-06/G2/20261110T133127223Z-gates.json`; re-run `prepare-gate-evidence` if unit bytes change.

## Response snapshot

Translated EFPG-401 Unit 6 into a full 7-file Urdu mirror with 10 localized SVG schematics and 10 derived dark variants, bound to terminology.csv, with exact heading vector parity, bank-bound key_terms, and clean content gates.

## Outcome

- Impact: translate for EFPG-401 Unit 6 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the commit; measure-figure-text exit 0; figures:variants:check clean.
- Files: 32 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated EFPG-401 Unit 6 into a full 7-file Urdu mirror (`index.mdx`, 5 topics, `unit-assessment.mdx`), 10 localized `.ur.svg` schematics and 10 derived `.ur.dark.svg` variants, and a G4 translation handoff document.
- Decisions the team must respect: G4/G5 remain draft pending independent review; translation_status stays draft. No G4 tracker row was appended, per the translate-unit skill (Step 7: this skill never appends a tracker row). The temporary `reviewed` flip was reverted.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path); independent G5 reviewer for the Urdu mirror.
- Notes for the next job on this unit:
  - Seven-file Urdu mirror and 10 localized SVG pairs prepared from English `bb9166236`; translation_status remains draft pending independent G5.
  - Ten localized schematic figures and their dark variants passed measure-figure-text with exit 0 (three cosmetic wordmark collisions reported, exit 0).
  - Proposed unbanked terms are listed in `specs/content/efpg-401/reviews/unit-06/G4/translation-handoff.md` for the curriculum owner.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: initial mirror omitted the topic H1s, caught by the temporary `reviewed` flip parity gate; one figure desc drifted from the carrier alt, caught by check:figures.
- Graders run and results (PASS/FAIL): check:content PASS; measure-figure-text PASS (exit 0); figures:variants:check PASS.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
