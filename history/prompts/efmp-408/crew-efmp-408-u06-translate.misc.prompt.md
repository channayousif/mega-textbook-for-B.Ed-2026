---
id: crew-efmp-408-u06-translate
title: crew translate EFMP-408 unit 6
stage: misc
date: 2026-11-25
surface: agent
model: agy
feature: efmp-408
branch: crew/efmp-408-u06-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-408/crew-efmp-408-u06-translate.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-06/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-06/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-06/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-06/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-06/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-06/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-06/unit-teacher-notes.mdx
  - specs/content/efmp-408/reviews/unit-06/G4/translation-handoff.md
  - specs/content/efmp-408/tasks.md
  - static/img/figures/efmp-408/unit-06/fig-U6-1.ur.dark.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-1.ur.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-2.ur.dark.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-2.ur.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-3.ur.dark.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-3.ur.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-4.ur.dark.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-4.ur.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-5.ur.dark.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-5.ur.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-6.ur.dark.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-6.ur.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-7.ur.dark.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-7.ur.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-8.ur.dark.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-8.ur.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-408-u06-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u06-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate EFMP-408 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-408 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-06/`.

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
- (efmp-408-u06-author-conflict1, fix, claude_crew) Unit 6 G2 row points at `specs/content/efmp-408/reviews/unit-06/G2/20261124T203715644Z-gates.json`; the older `20261124T193548727Z-gates.json` is superseded but left in place as history.
- (efmp-408-u06-author-conflict1, fix, claude_crew) `specs/content/efmp-408/tasks.md` now carries Unit 1, Unit 3 and Unit 6 rows together; a future merge from main must not drop the Unit 3 rows.
- (efmp-408-u06-author-conflict1, fix, claude_crew) banner figure fig-U6-9 is still prompt-only in `specs/content/efmp-408/figures/unit-06.banner.md`; G3 review and the G4 Urdu mirror for Unit 6 remain open.
- (efmp-408-u06-author, author, agy) Topic 6.4 is marked as curriculum enrichment (covering Licensing Objective 5 and NPSTP Standard 5, derived from EED-411).
- (efmp-408-u06-author, author, agy) Eight schematic SVGs are placed with derived dark variants; the unit banner fig-U6-9 remains prompt-only in figures/unit-06.banner.md for the illustrate job.


## Response snapshot

Translated EFMP-408 Unit 6 into its complete 7-page Urdu mirror at G4 (academic-plain register bound to `specs/content/terminology.csv`), authored 8 localized RTL `.ur.svg` figure schematics with verified text geometry and derived `.ur.dark.svg` variants, performed temporary conditional flip checks, recorded G4 stage row and translation handoff, and verified that all 14 content gates pass cleanly.

## Outcome

- Impact: complete G4 Urdu translation mirror for EFMP-408 Unit 6 by agy.
- Tests: `npm run check:content` passed in the job worktree before commit.
- Files: 26 file(s), listed above.
- Next prompts: independent G5 Urdu review or G3 English review.
- Reflection: none.

## Handoff (for CEO and agents)

- Shipped / changed: Complete seven-page Urdu mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-06/`, eight localized schematic figures (`fig-U6-1` to `fig-U6-8` `.ur.svg` and `.ur.dark.svg`), G4 translation handoff at `specs/content/efmp-408/reviews/unit-06/G4/translation-handoff.md`, and updated `tasks.md`.
- Decisions the team must respect: G4 translation_status remains `draft` pending independent G5 review; G5 review cannot be performed in this authoring/translating session; banner figure `fig-U6-9` remains prompt-only for the illustration pipeline.
- Pending / next owner: independent G5 reviewer (and G3 English reviewer).
- Notes for the next job on this unit:
  - Unit 6 `translation_status` remains `draft` throughout; G5 review is open.
  - Unit banner figure `fig-U6-9` is prompt-only in `specs/content/efmp-408/figures/unit-06.banner.md`.
- Paperclip issues affected: none (work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
