---
id: crew-efpg-402-u06-translate
title: crew translate EFPG-402 unit 6
stage: misc
date: 2026-11-27
surface: agent
model: gemini-3.8-flash
feature: efpg-402
branch: crew/efpg-402-u06-translate
user: crew
command: crew translate
labels: ["crew", "gemini", "translation"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efpg-402/20261304-efpg402-u06-translate.green.prompt.md
  - history/prompts/efpg-402/crew-efpg-402-u06-translate.misc.prompt.md
  - specs/content/efpg-402/reviews/unit-06/G4/translation-handoff.md
  - specs/content/efpg-402/tasks.md
tests:
  - npm run check:content
---

## Prompt

# Crew job efpg-402-u06-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u06-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate EFPG-402 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-402 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-06/`.

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
- (efpg-402-u06-author, author, agy) Urdu mirror remains to be translated and reviewed under G4/G5.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- EFPG-402 Unit 6 (docs/semester-4/efpg-402/unit-06): G2 en-draft: stale or incomplete input manifest

## Response snapshot

Relocated the Unit 6 translation handoff from `specs/content/efpg-402/translations/unit-06/handoff.md` to `specs/content/efpg-402/reviews/unit-06/G4/translation-handoff.md` and updated the tracker reference in `tasks.md`. This removes the unexcluded translation directory path that caused G2 input manifest drift, restoring clean G2 validation without invalidating recorded gate evidence.

## Outcome

- Impact: fixed G2 input manifest drift for EFPG-402 Unit 6 translation job (attempt 2).
- Tests: all 14 content gates pass (`check:pipeline-gate` PASS, `validate:content` PASS, `check:no-em-dash` PASS).
- Files: 4 files modified/renamed.
- Next prompts: independent G3 and G5 reviews.
- Reflection: keeping handoffs inside `reviews/` avoids polluting the in-scope input manifest for existing gate evidence.

## Handoff (for CEO and agents)

- Shipped / changed: relocated Unit 6 G4 translation handoff into `reviews/unit-06/G4/translation-handoff.md` and updated tracker note in `specs/content/efpg-402/tasks.md`.
- Decisions the team must respect: translation_status stays draft; G4 and G5 tracker rows remain open.
- Pending / next owner: independent G3 and G5 reviewers.
- Notes for the next job on this unit:
  - Unit 6 draft Urdu mirror comprises 8 MDX files and 12 localized SVG pairs with dark twins.
  - Figures text geometry verified with `measure-figure-text.mjs` (exited 0).
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt failed pipeline gate due to unexcluded handoff path staling G2 input manifest.
- Graders run and results (PASS/FAIL): check:content PASS (14/14 gates).
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
