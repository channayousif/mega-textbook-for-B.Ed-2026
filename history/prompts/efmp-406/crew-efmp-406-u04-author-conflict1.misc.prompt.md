---
id: crew-efmp-406-u04-author-conflict1
title: crew fix EFMP-406 unit 4
stage: misc
date: 2026-11-02
surface: agent
model: opencode
feature: efmp-406
branch: crew/efmp-406-u04-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-406/unit-04/index.mdx
 - docs/semester-3/efmp-406/unit-04/topic-01.mdx
 - docs/semester-3/efmp-406/unit-04/topic-02.mdx
 - docs/semester-3/efmp-406/unit-04/unit-assessment.mdx
 - docs/semester-3/efmp-406/unit-04/unit-teacher-notes.mdx
 - history/prompts/efmp-406/crew-efmp-406-u04-author.green.prompt.md
 - history/prompts/general/20261051-author-efmp-406-unit-four.general.prompt.md
 - specs/content/efmp-406/authoring/unit-04.md
 - specs/content/efmp-406/concepts/unit-04.md
 - specs/content/efmp-406/coverage/unit-04.md
 - specs/content/efmp-406/figures/unit-04.md
 - specs/content/efmp-406/glossary/unit-04.json
 - specs/content/efmp-406/sources/texts/alcolea-2020-mil.md
 - specs/content/efmp-406/sources/texts/cc-licenses.md
 - specs/content/efmp-406/sources/texts/furenes-2021-screen.md
 - specs/content/efmp-406/sources/texts/greenhow-2009-sns.md
 - specs/content/efmp-406/sources/unit-04.md
 - specs/content/efmp-406/tasks.md
 - static/img/figures/efmp-406/unit-04/fig-U4-1.dark.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-1.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-2.dark.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-2.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-3.dark.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-3.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-4.dark.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u04-author-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-406-u04-author conflicts with main (specs/content/efmp-406/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-406 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-04/`.

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
- (efmp-406-u04-author, author, codex) Shared glossary additions are staged; catalog registration, Urdu translation and independent reviews remain pending.
- (efmp-406-u04-author, author, codex) SVG browser measurement remains unrun under the brief’s Playwright prohibition.
- (efmp-406-u04-author, author, codex) Shared glossary additions are staged; catalog registration, Urdu translation and independent reviews remain pending.


## Response snapshot

Merged origin/main into crew/efmp-406-u04-author, resolved the add/add conflict in specs/content/efmp-406/tasks.md by folding this branch's Unit 4 stage rows into main's authoritative tracker structure, confirmed shared registries match main.

## Outcome

- Impact: fix for EFMP-406 Unit 4 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 26 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-406-u04-author, resolved the add/add conflict in specs/content/efmp-406/tasks.md by folding this branch's Unit 4 stage rows into main's authoritative tracker structure, confirmed shared registries match main.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Catalog registration, Urdu translation (G4) and independent reviews (G3/G5) for EFMP-406 Unit 4 remain pending per the author job's notes.
  - Shared glossary additions from the author job were staged earlier; if a later job consumes glossary.json, verify the EFMP-406 keys are present and registrations are not duplicated.
  - SVG browser measurement (measure-figure-text.mjs) was not run under this brief's Playwright prohibition; the next visual job on unit-04 should run it before marking figures placed.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
