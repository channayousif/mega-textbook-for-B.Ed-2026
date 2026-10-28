---
id: crew-geng-300-u02-review_en-r1-conflict1
title: crew fix GENG-300 unit 2
stage: misc
date: 2026-10-28
surface: agent
model: claude
feature: geng-300
branch: crew/geng-300-u02-review_en-r1
user: crew
command: crew fix
labels: ["crew", "claude", "fix"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0898-geng-300-u02-final-g3-review.general.prompt.md
 - history/prompts/geng-300/crew-geng-300-u02-review_en-r1.misc.prompt.md
 - specs/content/geng-300/reviews/unit-02/G3/20261028-codex-r1.json
 - specs/content/geng-300/reviews/unit-02/G3/20261028-codex-r1/assessment-analysis.md
 - specs/content/geng-300/reviews/unit-02/G3/20261028-codex-r1/check-content-final.log
 - specs/content/geng-300/reviews/unit-02/G3/20261028-codex-r1/check-content-rerun.log
 - specs/content/geng-300/reviews/unit-02/G3/20261028-codex-r1/check-content.log
 - specs/content/geng-300/reviews/unit-02/G3/20261028-codex-r1/check-depth-gate.log
 - specs/content/geng-300/reviews/unit-02/G3/20261028-codex-r1/check-docs-sync.log
 - specs/content/geng-300/reviews/unit-02/G3/20261028-codex-r1/check-figures.log
 - specs/content/geng-300/reviews/unit-02/G3/20261028-codex-r1/check-no-answer-keys.log
 - specs/content/geng-300/reviews/unit-02/G3/20261028-codex-r1/check-no-em-dash.log
 - specs/content/geng-300/reviews/unit-02/G3/20261028-codex-r1/commands.json
 - specs/content/geng-300/reviews/unit-02/G3/20261028-codex-r1/digest-verification.log
 - specs/content/geng-300/reviews/unit-02/G3/20261028-codex-r1/manifest.json
 - specs/content/geng-300/reviews/unit-02/G3/20261028-codex-r1/render-limitations.md
 - specs/content/geng-300/reviews/unit-02/G3/20261028-codex-r1/summary.md
 - specs/content/geng-300/reviews/unit-02/G3/20261028-codex-r1/validate-content.log
 - specs/content/geng-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u02-review_en-r1-conflict1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u02-review_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/geng-300-u02-review_en-r1 conflicts with main (specs/content/geng-300/tasks.md, static/content-status.json). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENG-300 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-02/`.

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
- (geng-300-u02-review_en-r1, review_en, codex) Owner action needed on assessment coverage, ERQ 3’s missing stimulus, authority/provenance gaps and unavailable render checks; final review cycle exhausted.
- (geng-300-u02-review_en-r1, review_en, codex) Owner action needed on assessment coverage, ERQ 3’s missing stimulus, authority/provenance gaps and unavailable render checks; final review cycle exhausted.
- (geng-300-u02-repair_en-conflict1, fix, codex) Earlier Unit 2 repairs still need fresh independent G3 review.
- (geng-300-u02-repair_en-conflict1, fix, codex) Earlier Unit 2 repairs still need fresh independent G3 review.
- (geng-300-u02-repair_en, repair_en, agy) Repaired ERQ 2 comparative item covers subtopics U2-01 and U2-02 at Analyze level with contrasting rural girls' education passages; fresh G3 review can verify blueprint alignment.


## Response snapshot

Merged origin/main into the branch, kept main's tracker layout with this branch's Unit 2 G3 escalation row added, dropped `static/content-status.json` as main did, and got `check:content` passing 13/13.

## Outcome

- Impact: fix for GENG-300 Unit 2 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into the branch, kept main's tracker layout with this branch's Unit 2 G3 escalation row added, dropped `static/content-status.json` as main did, and got `check:content` passing 13/13.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The Unit 2 block in tasks.md now has three G3 en-review rows, two from main and the newest from this branch (the `20261028-codex-r1.json` escalation). Only the owner can act on that escalation, because the review cycle limit is used up.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
