---
id: crew-gnas-301-u05-review_en-conflict1
title: crew fix GNAS-301 unit 5
stage: misc
date: 2026-10-28
surface: agent
model: claude
feature: gnas-301
branch: crew/gnas-301-u05-review_en
user: crew
command: crew fix
labels: ["crew", "claude", "fix"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gnas-301/crew-gnas-301-u05-review_en.misc.prompt.md
 - specs/content/gnas-301/reviews/unit-05/G3/5c420198-baaa-4562-ab56-91a01924a95a.json
 - specs/content/gnas-301/reviews/unit-05/G3/5c420198-baaa-4562-ab56-91a01924a95a.summary.md
 - specs/content/gnas-301/reviews/unit-05/G3/crew-5c420198/manifest.json
 - specs/content/gnas-301/reviews/unit-05/G3/logs-5c420198/check-content.txt
 - specs/content/gnas-301/reviews/unit-05/G3/logs-5c420198/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-05/G3/logs-5c420198/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-05/G3/logs-5c420198/check-figures.txt
 - specs/content/gnas-301/reviews/unit-05/G3/logs-5c420198/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-05/G3/logs-5c420198/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-05/G3/logs-5c420198/measure-figure-text.txt
 - specs/content/gnas-301/reviews/unit-05/G3/logs-5c420198/render-review.txt
 - specs/content/gnas-301/reviews/unit-05/G3/logs-5c420198/validate-content.txt
 - specs/content/gnas-301/reviews/unit-05/G3/renders-5c420198/fig-U5-1.png
 - specs/content/gnas-301/reviews/unit-05/G3/renders-5c420198/fig-U5-2.png
 - specs/content/gnas-301/reviews/unit-05/G3/renders-5c420198/fig-U5-3.png
 - specs/content/gnas-301/reviews/unit-05/G3/renders-5c420198/fig-U5-4.png
 - specs/content/gnas-301/reviews/unit-05/G3/renders-5c420198/fig-U5-5.png
 - specs/content/gnas-301/reviews/unit-05/G3/renders-5c420198/fig-U5-6.png
 - specs/content/gnas-301/reviews/unit-05/G3/renders-5c420198/fig-U5-7.png
 - specs/content/gnas-301/reviews/unit-05/G3/renders-5c420198/fig-U5-8.png
 - specs/content/gnas-301/reviews/unit-05/G3/summary.md
 - specs/content/gnas-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u05-review_en-conflict1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u05-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gnas-301-u05-review_en conflicts with main (specs/content/gnas-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GNAS-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-05/`.

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
- (gnas-301-u05-review_en, review_en, agy) Round-2 repairs verified resolved (Topic 5.1 RRQ blueprint floor, WHO air claims, fig-U5-3 panels/arrows in all 4 variants, coverage cells, and 5-author citation for alibhatti2017); all 32 SVG variants pass measure-figure-text.mjs.
- (gnas-301-u05-review_en, review_en, agy) Advisory G3 tracker row appended to tasks.md with status open ▢ and unsigned per ADR-0019.
- (gnas-301-u05-fix, fix, opencode) fig-U5-8 viewBox height changed from 470 to 510 (Figure carriers in both locales updated); G3 review marked stale in tasks.md and needs a fresh run when owner-gate G-2026-32 clears.
- (gnas-301-u05-repair_en-conflict5, fix, opencode) Unit 5 G3 review still owner-gated under G-2026-32; glossary and source-binding follow-ups remain in specs/content/gnas-301/reviews/unit-05/20261019-repair-notes.md.
- (gnas-301-u05-repair_en-conflict4, fix, opencode) Unit 5 G3 review still owner-gated under G-2026-32  -  see specs/content/gnas-301/reviews/unit-05/20261019-repair-notes.md for glossary and source-binding follow-ups.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Merged origin/main into the branch, kept both the Unit 3 and Unit 5 G3 tracker rows in specs/content/gnas-301/tasks.md, and confirmed all 13 content gates pass.

## Outcome

- Impact: fix for GNAS-301 Unit 5 by claude (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 23 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into the branch, kept both the Unit 3 and Unit 5 G3 tracker rows in specs/content/gnas-301/tasks.md, and confirmed all 13 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 5 G3 row is still ▢ open and unsigned; the independent review (pass, cycle 2) needs owner sign-off.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
