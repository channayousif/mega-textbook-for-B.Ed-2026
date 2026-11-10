---
id: crew-efpg-401-u04-translate
title: crew translate EFPG-401 unit 4
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: efpg-401
branch: crew/efpg-401-u04-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efpg-401/crew-efpg-401-u04-translate.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-04/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-04/unit-assessment.mdx
 - specs/content/efpg-401/reviews/unit-04/G4/translation-handoff.md
 - specs/content/efpg-401/tasks.md
 - static/img/figures/efpg-401/unit-04/fig-U4-1.ur.dark.svg
 - static/img/figures/efpg-401/unit-04/fig-U4-1.ur.svg
 - static/img/figures/efpg-401/unit-04/fig-U4-2.ur.dark.svg
 - static/img/figures/efpg-401/unit-04/fig-U4-2.ur.svg
 - static/img/figures/efpg-401/unit-04/fig-U4-3.ur.dark.svg
 - static/img/figures/efpg-401/unit-04/fig-U4-3.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-401-u04-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u04-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFPG-401 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-401 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-401/`, and `static/img/figures/efpg-401/unit-04/`.

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
- (efpg-401-u04-author-conflict4, fix, opencode) The only conflict was specs/content/efpg-401/tasks.md; main's Unit 7 rows/status and the branch's Unit 4 rows/status were both kept, and the branch added no registry IDs so nothing was renumbered.
- (efpg-401-u04-author-conflict4, fix, opencode) The merge brought main's EFPG-401 Unit 2 and Unit 7 authoring files into this branch; they are outside this job's scope.
- (efpg-401-u04-author-conflict4, fix, opencode) G4 Urdu mirror still needs `.ur.svg` variants and UR `<Figure>` wiring; G3 review remains open.
- (efpg-401-u04-author-conflict2, fix, opencode) G4 Urdu mirror still needs `.ur.svg` variants and UR `<Figure>` wiring; G3 review remains open.
- (efpg-401-u04-author-conflict2, fix, opencode) The merge brought main's EFPG-401 Unit 2 authoring files into this branch; they are outside this job's scope.


## Response snapshot

Translated EFPG-401 Unit 4 into its complete 3-file Urdu mirror with 3 localized figure SVGs and derived dark variants, verified clean across all 14 content gates with translation_status draft.

## Outcome

- Impact: translate for EFPG-401 Unit 4 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 12 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated EFPG-401 Unit 4 into its complete 3-file Urdu mirror with 3 localized figure SVGs and derived dark variants, verified clean across all 14 content gates with translation_status draft.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Three-file Urdu mirror and 3 localized SVG pairs prepared from English baseline b43a52ced; translation_status remains draft pending independent G5.
  - All three localized schematic figures and their dark variants passed measure-figure-text with exit 0.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
