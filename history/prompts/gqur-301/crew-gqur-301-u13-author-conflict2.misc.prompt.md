---
id: crew-gqur-301-u13-author-conflict2
title: crew fix GQUR-301 unit 13
stage: misc
date: 2026-10-22
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u13-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-13/_category_.json
 - docs/semester-2/gqur-301/unit-13/index.mdx
 - docs/semester-2/gqur-301/unit-13/topic-01.mdx
 - docs/semester-2/gqur-301/unit-13/topic-02.mdx
 - docs/semester-2/gqur-301/unit-13/unit-assessment.mdx
 - glossary.json
 - history/prompts/crew/0551-author-gqur-301-u13.green.prompt.md
 - history/prompts/crew/0552-gqur-301-u13-g2-and-rubric-fix.green.prompt.md
 - history/prompts/gqur-301/0553-merge-conflict-resolution-u13.prompt.md
 - history/prompts/gqur-301/20261023-merge-conflict-round2.misc.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u13-author-conflict1.misc.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u13-author.green.prompt.md
 - specs/content/gqur-301/concepts/unit-13.md
 - specs/content/gqur-301/coverage/unit-13.md
 - specs/content/gqur-301/figures/unit-13.md
 - specs/content/gqur-301/reviews/unit-13/G2/20261022T193430944Z-gates.json
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261022T193430944Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261022T193430944Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261022T193430944Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261022T193430944Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261022T193430944Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261022T193430944Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261022T193430944Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261022T193430944Z/validate-content.txt
 - specs/content/gqur-301/sources/unit-13.md
 - specs/content/gqur-301/tasks.md
 - static/content-status.json
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u13-author-conflict2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u13-author`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gqur-301-u13-author conflicts with main (it could not join the hourly batch). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GQUR-301 Unit 13 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-13/`.

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
- (gqur-301-u13-author-conflict1, fix, opencode) Unit 13 G3 en-review, G4 Urdu translation, G5 Urdu review, and G6 figures remain undone; figures are still prompt-only markers with no static/img/figures/gqur-301/unit-13/ directory yet.
- (gqur-301-u13-author, author, claude) The unit's figures are still prompt-only markers; there is no `static/img/figures/gqur-301/unit-13/` yet.
- (gqur-301-u13-author, author, claude) `npm run build` was not run, so check the escaped `\|r\|` table cells render correctly in `topic-01.mdx` and `unit-assessment.mdx`.


## Response snapshot

Merged origin/main into crew/gqur-301-u13-author, resolved the glossary.json conflict (kept both sides' entries append-only), regenerated static/content-status.json, and committed the PHR  -  all 13 content gates pass.

## Outcome

- Impact: fix for GQUR-301 Unit 13 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 27 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gqur-301-u13-author, resolved the glossary.json conflict (kept both sides' entries append-only), regenerated static/content-status.json, and committed the PHR  -  all 13 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - GQUR-301 Unit 13 still needs G3 en-review, G4 Urdu translation, G5 Urdu review, and G6 figures; the escaped `\|r\|` cells in topic-01.mdx and unit-assessment.mdx were not visually verified (build was not run).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
