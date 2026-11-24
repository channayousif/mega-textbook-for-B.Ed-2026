---
id: crew-gent-401-u03-translate
title: crew translate GENT-401 unit 3
stage: misc
date: 2026-11-24
surface: agent
model: claude
feature: gent-401
branch: crew/gent-401-u03-translate
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-03/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-03/unit-teacher-notes.mdx
 - specs/content/gent-401/reviews/unit-03/G4/translation-handoff.md
 - specs/content/gent-401/tasks.md
 - static/img/figures/gent-401/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/gent-401/unit-03/fig-U3-1.ur.svg
 - static/img/figures/gent-401/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/gent-401/unit-03/fig-U3-2.ur.svg
 - static/img/figures/gent-401/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/gent-401/unit-03/fig-U3-3.ur.svg
 - static/img/figures/gent-401/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/gent-401/unit-03/fig-U3-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u03-translate

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u03-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GENT-401 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENT-401 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-03/`.

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
- (gent-401-u03-author, author, claude_crew) The content-spec maps Unit 3 to OpenStax chapters 5 and 11; I added chapter 8 (section 8.2 is the book's market-research chapter) and an author-selected OA source `spriggs-2016-bmc`, both recorded in `sources/unit-03.md` - G3 should confirm they are genuinely on-topic.
- (gent-401-u03-author, author, claude_crew) The reading-minutes band is tight: the first draft totalled 46 minutes against the approved 32-44 band, so redundant prose was cut to land at 43. Any later addition must re-check the band before committing.
- (gent-401-u03-author, author, claude_crew) Figures are English-only (no `.ur.svg`); banner `fig-U3-5` is a prompt-only row in `figures/unit-03.banner.md` for the illustrate job.


## Response snapshot

Translated GENT-401 Unit 3 into a complete draft Urdu mirror (5 pages, 4 RTL .ur.svg figures with dark variants, G4 handoff and tracker notes), with all content gates passing and translation_status left at draft.

## Outcome

- Impact: translate for GENT-401 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GENT-401 Unit 3 into a complete draft Urdu mirror (5 pages, 4 RTL .ur.svg figures with dark variants, G4 handoff and tracker notes), with all content gates passing and translation_status left at draft.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - English fig-U3-3 note says "two shaded blocks" but three are shaded; translated faithfully, and the English owner should fix it (the .ur.svg would then need a matching edit).
  - The Urdu pages were not checked rendered (render-inspect --locale ur needs a build or a deployed page); G5 must inspect them at narrow width and in A4 print.
  - glossary.json definition_ur for "Business model" and "Value proposition" have "کی" for "کیا", out of scope here and worth a glossary fix.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
