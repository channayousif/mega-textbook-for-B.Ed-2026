---
id: crew-efpg-401-u04-author-conflict1
title: crew merge main into EFPG-401 unit 4 author branch
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efpg-401
branch: crew/efpg-401-u04-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/crew/crew-batch-20261110-1201-cifix1.misc.prompt.md
 - history/prompts/efpg-401/crew-efpg-401-u04-author-conflict1.misc.prompt.md
 - history/prompts/general/20261191-gicp-400-unit-07-urdu-translation.general.prompt.md
 - history/prompts/gicp-400/crew-gicp-400-u07-translate-r1.misc.prompt.md
 - history/prompts/giss-401/crew-giss-401-u02-translate-r1.misc.prompt.md
 - history/prompts/giss-401/crew-giss-401-u05-translate-r1.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-07/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-07/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-07/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-02/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-02/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-02/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-05/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-05/unit-assessment.mdx
 - specs/content/gicp-400/reviews/unit-07/G4/translation-handoff.md
 - specs/content/gicp-400/tasks.md
 - specs/content/giss-401/reviews/unit-05/G4/translation-handoff.md
 - specs/content/giss-401/tasks.md
 - specs/content/svg-style-baseline.json
 - static/img/figures/gicp-400/unit-07/fig-U7-1.ur.dark.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-1.ur.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-2.ur.dark.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-2.ur.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-3.ur.dark.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-3.ur.svg
 - static/img/figures/giss-401/unit-02/fig-U2-1.ur.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-1.ur.svg
 - static/img/figures/giss-401/unit-02/fig-U2-2.ur.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-2.ur.svg
 - static/img/figures/giss-401/unit-02/fig-U2-3.ur.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-3.ur.svg
 - static/img/figures/giss-401/unit-02/fig-U2-4.ur.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-4.ur.svg
 - static/img/figures/giss-401/unit-02/fig-U2-5.ur.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-5.ur.svg
 - static/img/figures/giss-401/unit-02/fig-U2-6.ur.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-6.ur.svg
 - static/img/figures/giss-401/unit-05/fig-U5-1.ur.dark.svg
 - static/img/figures/giss-401/unit-05/fig-U5-1.ur.svg
 - static/img/figures/giss-401/unit-05/fig-U5-2.ur.dark.svg
 - static/img/figures/giss-401/unit-05/fig-U5-2.ur.svg
 - static/img/figures/giss-401/unit-05/fig-U5-3.ur.dark.svg
 - static/img/figures/giss-401/unit-05/fig-U5-3.ur.svg
 - static/img/figures/giss-401/unit-05/fig-U5-4.ur.dark.svg
 - static/img/figures/giss-401/unit-05/fig-U5-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-401-u04-author-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efpg-401-u04-author conflicts with main (specs/content/efpg-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

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
- (efpg-401-u04-author, author, opencode) Three EN schematics are placed; the G4 Urdu mirror still needs `.ur.svg` variants and UR `<Figure>` wiring.
- (efpg-401-u04-author, author, opencode) G3 independent review is open; the unit is G2 gate-checked only, not certified.

## Response snapshot

Merged origin/main (batch-20261110-1201) into crew/efpg-401-u04-author. The merge was clean: main's changes were disjoint from the EFPG-401 scope, so no conflict markers arose in specs/content/efpg-401/tasks.md or the shared registries. Verified the merged tasks.md keeps every main row and adds the branch's Unit 4 rows, and that glossary.json, specs/decisions/log.md, specs/gaps.md and specs/content/terminology.csv are byte-identical to main. Ran build:content-status, then check:content (all 14 gates pass) and measure-figure-text on the six unit-04 SVGs (exit 0).

## Outcome

- Impact: fix for EFPG-401 Unit 4 author branch by opencode (attempt 1).
- Tests: npm run check:content passed after the merge.
- Files: 49 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merged origin/main into crew/efpg-401-u04-author with no conflicts; main's entries preserved; check:content green.
- Decisions the team must respect: shared registries were left byte-identical to main; no IDs were renumbered because the branch added none.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Three EN schematics are placed; the G4 Urdu mirror still needs `.ur.svg` variants and UR `<Figure>` wiring.
  - G3 independent review is open; the unit is G2 gate-checked only, not certified.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
