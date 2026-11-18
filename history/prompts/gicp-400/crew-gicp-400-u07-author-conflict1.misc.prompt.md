---
id: crew-gicp-400-u07-author-conflict1
title: crew fix GICP-400 unit 7
stage: misc
date: 2026-11-06
surface: agent
model: opencode
feature: gicp-400
branch: crew/gicp-400-u07-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/gicp-400/unit-07/index.mdx
 - docs/semester-3/gicp-400/unit-07/topic-01.mdx
 - docs/semester-3/gicp-400/unit-07/unit-assessment.mdx
 - history/prompts/general/20261137-gicp400-unit-seven-author.general.prompt.md
 - history/prompts/gicp-400/crew-gicp-400-u07-author-conflict1.misc.prompt.md
 - history/prompts/gicp-400/crew-gicp-400-u07-author.green.prompt.md
 - specs/content/gicp-400/concepts/unit-07.md
 - specs/content/gicp-400/coverage/unit-07.md
 - specs/content/gicp-400/figures/unit-07.md
 - specs/content/gicp-400/reviews/unit-07/G2/20261106T190031290Z-gates.json
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261106T190031290Z/check-bloom-bands.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261106T190031290Z/check-concept-graph.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261106T190031290Z/check-depth-gate.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261106T190031290Z/check-docs-sync.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261106T190031290Z/check-figures.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261106T190031290Z/check-no-answer-keys.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261106T190031290Z/check-no-em-dash.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261106T190031290Z/validate-content.txt
 - specs/content/gicp-400/sources/texts/dean-2005-citizenship.md
 - specs/content/gicp-400/sources/texts/kennedy-2012-civic.md
 - specs/content/gicp-400/sources/unit-07.md
 - specs/content/gicp-400/tasks.md
 - static/img/figures/gicp-400/unit-07/fig-U7-1.dark.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-1.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-2.dark.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-2.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-3.dark.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-3.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u07-author-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u07-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gicp-400-u07-author conflicts with main (specs/content/gicp-400/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GICP-400 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-07/`.

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
- (gicp-400-u07-author, author, opencode) The three hand-authored SVGs were not geometry-checked because the crew brief prohibits Chromium/Playwright; CI's figure-geometry job will measure them on the PR.
- (gicp-400-u07-author, author, opencode) `dean-2005-citizenship` is shared with GPKS-402 Unit 6; the GICP-400 bound excerpt is an original paraphrase of the verified abstract, so a reviewer should check the original passages.
- (gicp-400-u07-author, author, opencode) The branch is based on PR #461 (`f4bf69fd3`); origin/main has since advanced to PR #462 (`fa7d7fa89`), so the crew lead should expect a merge and a possible `tasks.md` conflict.


## Response snapshot

Merged origin/main into crew/gicp-400-u07-author, resolved the tasks.md conflict preserving both sides' entries, regenerated content-status, and committed the merge and PHR with all content gates passing.

## Outcome

- Impact: fix for GICP-400 Unit 7 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 28 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gicp-400-u07-author, resolved the tasks.md conflict preserving both sides' entries, regenerated content-status, and committed the merge and PHR with all content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - tasks.md now has two Unit 5 G3 en-review rows (main's codex advisory escalation plus the older placeholder); both were kept on purpose under the append-only rule, not a duplication bug.
  - `static/content-status.json` is gitignored and was regenerated locally; fresh checkouts and CI regenerate it via the prestart hook.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
