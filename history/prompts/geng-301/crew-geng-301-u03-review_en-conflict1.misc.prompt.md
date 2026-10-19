---
id: crew-geng-301-u03-review_en-conflict1
title: crew fix GENG-301 unit 3
stage: misc
date: 2026-10-19
surface: agent
model: opencode
feature: geng-301
branch: crew/geng-301-u03-review_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0534-merge-origin-main-geng301-u03.general.prompt.md
 - history/prompts/general/20261019-geng301-u03-independent-review.general.prompt.md
 - history/prompts/geng-301/crew-geng-301-u03-review_en.misc.prompt.md
 - specs/content/geng-301/reviews/unit-03/G3/crew-20261019.json
 - specs/content/geng-301/reviews/unit-03/G3/crew-20261019/check-content-before-refresh.log
 - specs/content/geng-301/reviews/unit-03/G3/crew-20261019/check-content-final.log
 - specs/content/geng-301/reviews/unit-03/G3/crew-20261019/check-content-initial.log
 - specs/content/geng-301/reviews/unit-03/G3/crew-20261019/check-depth-gate.log
 - specs/content/geng-301/reviews/unit-03/G3/crew-20261019/check-docs-sync.log
 - specs/content/geng-301/reviews/unit-03/G3/crew-20261019/check-figures.log
 - specs/content/geng-301/reviews/unit-03/G3/crew-20261019/check-no-answer-keys.log
 - specs/content/geng-301/reviews/unit-03/G3/crew-20261019/check-no-em-dash.log
 - specs/content/geng-301/reviews/unit-03/G3/crew-20261019/commands.json
 - specs/content/geng-301/reviews/unit-03/G3/crew-20261019/manifest.json
 - specs/content/geng-301/reviews/unit-03/G3/crew-20261019/summary.md
 - specs/content/geng-301/reviews/unit-03/G3/crew-20261019/validate-content.log
 - specs/content/geng-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u03-review_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u03-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Merged onto main's latest state, crew/geng-301-u03-review_en fails npm run check:content (it could not join the hourly batch):
✗ static/content-status.json is missing. Run: npm run build:content-status Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENG-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-03/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (geng-301-u03-review_en, review_en, codex) Author repairs and fresh independent assessment, provenance and render verification remain required.
- (geng-301-u03-review_en, review_en, codex) Author repairs and fresh independent assessment, provenance and render verification remain required.

## Feedback from the previous attempt
worker exited 1:
[91m[1mError: [0mUnexpected error

database is locked



## Response snapshot

Merged origin/main cleanly onto crew/geng-301-u03-review_en (no conflicts, PR #281's content-status.json fix now present), committed the merge + PHR 0534, and all 13 `npm run check:content` gates pass.

## Outcome

- Impact: fix for GENG-301 Unit 3 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main cleanly onto crew/geng-301-u03-review_en (no conflicts, PR #281's content-status.json fix now present), committed the merge + PHR 0534, and all 13 `npm run check:content` gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
