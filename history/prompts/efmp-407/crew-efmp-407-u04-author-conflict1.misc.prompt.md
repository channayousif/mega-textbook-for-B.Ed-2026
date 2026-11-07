---
id: crew-efmp-407-u04-author-conflict1
title: crew fix EFMP-407 unit 4
stage: misc
date: 2026-11-07
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u04-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/unit-04/index.mdx
 - docs/semester-3/efmp-407/unit-04/topic-01.mdx
 - docs/semester-3/efmp-407/unit-04/topic-02.mdx
 - docs/semester-3/efmp-407/unit-04/topic-03.mdx
 - docs/semester-3/efmp-407/unit-04/unit-assessment.mdx
 - docs/semester-3/efmp-407/unit-04/unit-teacher-notes.mdx
 - history/prompts/efmp-407/crew-efmp-407-u04-author-conflict1.misc.prompt.md
 - history/prompts/efmp-407/crew-efmp-407-u04-author.green.prompt.md
 - history/prompts/general/20261145-author-efmp407-unit-four.general.prompt.md
 - history/prompts/general/20261146-recheck-efmp407-g2-blocker.general.prompt.md
 - history/prompts/general/20261147-efmp407-unit-four-g2-evidence.general.prompt.md
 - specs/content/efmp-407/concepts/unit-04.md
 - specs/content/efmp-407/coverage/unit-04.md
 - specs/content/efmp-407/figures/unit-04.banner.md
 - specs/content/efmp-407/figures/unit-04.md
 - specs/content/efmp-407/reviews/unit-04/G2/20261107T074842577Z-gates.json
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T074842577Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T074842577Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T074842577Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T074842577Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T074842577Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T074842577Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T074842577Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T074842577Z/validate-content.txt
 - specs/content/efmp-407/sources/texts/boeve-de-pauw-2015.md
 - specs/content/efmp-407/sources/texts/lim-allan-2016-futures.md
 - specs/content/efmp-407/sources/texts/unesco-2017-esd-objectives.md
 - specs/content/efmp-407/sources/unit-04.md
 - specs/content/efmp-407/tasks.md
 - static/img/figures/efmp-407/unit-04/fig-U4-1.dark.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-1.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-2.dark.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-2.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-3.dark.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-3.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-4.dark.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-4.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-5.dark.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-5.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-6.dark.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u04-author-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-407-u04-author conflicts with main (specs/content/efmp-407/sources/texts/unesco-2017-esd-objectives.md, specs/content/efmp-407/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-407 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-04/`.

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
- (efmp-407-u04-author, author, claude) Browser text geometry for `fig-U4-1` to `fig-U4-6` is unmeasured until CI `figure-geometry` runs; banner `fig-U4-7` is still prompt-only.
- (efmp-407-u04-author, author, claude) `specs/content/efmp-407/tasks.md` is shared with sibling units, so expect merge conflicts there and keep every unit's rows.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Merged origin/main into crew/efmp-407-u04-author, resolving the add/add UNESCO source note and shared tasks.md conflicts by keeping both sides' entries (main first, branch second, duplicates dropped), with all 14 content gates passing.

## Outcome

- Impact: fix for EFMP-407 Unit 4 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 41 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-407-u04-author, resolving the add/add UNESCO source note and shared tasks.md conflicts by keeping both sides' entries (main first, branch second, duplicates dropped), with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `static/content-status.json` is git-ignored and was regenerated locally only; a root-scope job must regenerate it before publication.
  - `fig-U4-1` to `fig-U4-6` browser text geometry is unmeasured until CI `figure-geometry` runs; banner `fig-U4-7` remains prompt-only.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
