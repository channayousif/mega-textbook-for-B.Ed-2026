---
id: crew-efpc-411-u03-translate
title: crew translate EFPC-411 unit 3
stage: misc
date: 2026-11-27
surface: agent
model: agy2
feature: efpc-411
branch: crew/efpc-411-u03-translate
user: crew
command: crew translate
labels: ["crew", "agy2", "translate"]
links:
  spec: specs/content/efpc-411/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efpc-411/crew-efpc-411-u03-translate.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-03/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-03/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-03/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-03/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-03/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-03/unit-assessment.mdx
  - specs/content/efpc-411/reviews/unit-03/G4/translation-handoff.md
  - specs/content/efpc-411/tasks.md
  - static/img/figures/efpc-411/unit-03/fig-U3-1.ur.dark.svg
  - static/img/figures/efpc-411/unit-03/fig-U3-1.ur.svg
  - static/img/figures/efpc-411/unit-03/fig-U3-2.ur.dark.svg
  - static/img/figures/efpc-411/unit-03/fig-U3-2.ur.svg
  - static/img/figures/efpc-411/unit-03/fig-U3-3.ur.dark.svg
  - static/img/figures/efpc-411/unit-03/fig-U3-3.ur.svg
  - static/img/figures/efpc-411/unit-03/fig-U3-4.ur.dark.svg
  - static/img/figures/efpc-411/unit-03/fig-U3-4.ur.svg
  - static/img/figures/efpc-411/unit-03/fig-U3-5.ur.dark.svg
  - static/img/figures/efpc-411/unit-03/fig-U3-5.ur.svg
  - static/img/figures/efpc-411/unit-03/fig-U3-6.ur.dark.svg
  - static/img/figures/efpc-411/unit-03/fig-U3-6.ur.svg
  - static/img/figures/efpc-411/unit-03/fig-U3-7.ur.dark.svg
  - static/img/figures/efpc-411/unit-03/fig-U3-7.ur.svg
  - static/img/figures/efpc-411/unit-03/fig-U3-8.ur.dark.svg
  - static/img/figures/efpc-411/unit-03/fig-U3-8.ur.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job efpc-411-u03-translate

You are the agy2 worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpc-411-u03-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate EFPC-411 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPC-411 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpc-411/`, and `static/img/figures/efpc-411/unit-03/`.

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
- (efpc-411-u03-author, author, agy2) Unit 3 English draft is complete with all eight schematic figures placed and verified; ready for independent G3 English review and subsequent G4 Urdu translation.

## Response snapshot

Translated EFPC-411 Unit 3 into a complete draft Urdu mirror with eight RTL-localised Nastaliq figure pairs, recorded the G4 handoff and tasks tracker row, and left `translation_status: draft` with all 14 content gates green.

## Outcome

- Impact: translate for EFPC-411 Unit 3 by agy2 (attempt 1).
- Tests: npm run check:content passed in the job worktree before committing.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated EFPC-411 Unit 3 into a complete draft Urdu mirror with eight RTL-localised Nastaliq figure pairs, recorded the G4 handoff, and left `translation_status: draft` with all 14 content gates green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - English G3 is still `▢` (not accepted); this Urdu is bound to English `472f8107f`, so any English repair requires matching Urdu repairs and a fresh G5.
