---
id: crew-efpg-402-u08-translate
title: crew translate EFPG-402 unit 8
stage: misc
date: 2026-11-27
surface: agent
model: agy
feature: efpg-402
branch: crew/efpg-402-u08-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efpg-402/20261306-efpg402-u08-translate.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-08/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-08/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-08/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-08/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-08/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-08/topic-05.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-08/unit-assessment.mdx
 - specs/content/efpg-402/reviews/unit-08/G2/20261127T185331917Z-gates.json
 - specs/content/efpg-402/reviews/unit-08/G2/logs-20261127T185331917Z/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-08/G2/logs-20261127T185331917Z/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-08/G2/logs-20261127T185331917Z/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-08/G2/logs-20261127T185331917Z/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-08/G2/logs-20261127T185331917Z/check-figures.txt
 - specs/content/efpg-402/reviews/unit-08/G2/logs-20261127T185331917Z/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-08/G2/logs-20261127T185331917Z/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-08/G2/logs-20261127T185331917Z/validate-content.txt
 - specs/content/efpg-402/tasks.md
 - specs/content/efpg-402/translations/unit-08/handoff.md
 - static/img/figures/efpg-402/unit-08/fig-U8-1.ur.dark.svg
 - static/img/figures/efpg-402/unit-08/fig-U8-1.ur.svg
 - static/img/figures/efpg-402/unit-08/fig-U8-10.ur.dark.svg
 - static/img/figures/efpg-402/unit-08/fig-U8-10.ur.svg
 - static/img/figures/efpg-402/unit-08/fig-U8-2.ur.dark.svg
 - static/img/figures/efpg-402/unit-08/fig-U8-2.ur.svg
 - static/img/figures/efpg-402/unit-08/fig-U8-3.ur.dark.svg
 - static/img/figures/efpg-402/unit-08/fig-U8-3.ur.svg
 - static/img/figures/efpg-402/unit-08/fig-U8-4.ur.dark.svg
 - static/img/figures/efpg-402/unit-08/fig-U8-4.ur.svg
 - static/img/figures/efpg-402/unit-08/fig-U8-5.ur.dark.svg
 - static/img/figures/efpg-402/unit-08/fig-U8-5.ur.svg
 - static/img/figures/efpg-402/unit-08/fig-U8-6.ur.dark.svg
 - static/img/figures/efpg-402/unit-08/fig-U8-6.ur.svg
 - static/img/figures/efpg-402/unit-08/fig-U8-7.ur.dark.svg
 - static/img/figures/efpg-402/unit-08/fig-U8-7.ur.svg
 - static/img/figures/efpg-402/unit-08/fig-U8-8.ur.dark.svg
 - static/img/figures/efpg-402/unit-08/fig-U8-8.ur.svg
 - static/img/figures/efpg-402/unit-08/fig-U8-9.ur.dark.svg
 - static/img/figures/efpg-402/unit-08/fig-U8-9.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-402-u08-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u08-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate EFPG-402 Unit 8 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-402 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-08/`.

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
- (efpg-402-u08-author, author, agy) Urdu mirror job (G4) will need to localize the 10 placed SVGs (.ur.svg pairs) and translate the seven unit files.
- (efpg-402-u08-author, author, agy) Independent qualified G3 English content review remains open and awaiting qualification.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- EFPG-402 Unit 8 (docs/semester-4/efpg-402/unit-08): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Completed EFPG-402 Unit 8 Urdu translation with localized RTL SVGs, refreshed G2 gate evidence for the handoff doc, and passed all 14 content gates.

## Outcome

- Impact: translate for EFPG-402 Unit 8 by agy (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 39 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed EFPG-402 Unit 8 Urdu translation with localized RTL SVGs, refreshed G2 gate evidence for the handoff doc, and passed all 14 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Re-generated and committed Unit 8 G2 gate evidence (20261127T185331917Z-gates.json) so the bound translation handoff doc is included in the input manifest.
  - Unit 8 translation remains at translation_status: draft awaiting independent G5 Urdu review and rendered page inspection.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
