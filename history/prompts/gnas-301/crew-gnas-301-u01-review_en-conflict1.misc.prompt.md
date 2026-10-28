---
id: crew-gnas-301-u01-review_en-conflict1
title: crew fix GNAS-301 unit 1
stage: misc
date: 2026-10-28
surface: agent
model: claude
feature: gnas-301
branch: crew/gnas-301-u01-review_en
user: crew
command: crew fix
labels: ["crew", "claude", "fix"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gnas-301/crew-gnas-301-u01-review_en.misc.prompt.md
 - specs/content/gnas-301/reviews/unit-01/G3/12ce2621-624d-4c79-bf71-dbaccdf17ac2.json
 - specs/content/gnas-301/reviews/unit-01/G3/logs-12ce2621/check-content.txt
 - specs/content/gnas-301/reviews/unit-01/G3/logs-12ce2621/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-01/G3/logs-12ce2621/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-01/G3/logs-12ce2621/check-figures.txt
 - specs/content/gnas-301/reviews/unit-01/G3/logs-12ce2621/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-01/G3/logs-12ce2621/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-01/G3/logs-12ce2621/measure-figure-text.txt
 - specs/content/gnas-301/reviews/unit-01/G3/logs-12ce2621/render-review.txt
 - specs/content/gnas-301/reviews/unit-01/G3/logs-12ce2621/validate-content.txt
 - specs/content/gnas-301/reviews/unit-01/G3/summary.md
 - specs/content/gnas-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u01-review_en-conflict1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u01-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gnas-301-u01-review_en conflicts with main (specs/content/gnas-301/tasks.md, static/content-status.json). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GNAS-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-01/`.

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
- (gnas-301-u01-review_en, review_en, agy) 10 figure text geometry defects detected across fig-U1-2, fig-U1-3.ur, fig-U1-6, and fig-U1-8 need SVG coordinate adjustments so measure-figure-text.mjs passes.
- (gnas-301-u01-review_en, review_en, agy) Live 360px viewport, table horizontal scrolling, and A4 print view inspection remain unperformed due to job brief limits and must be verified on a live build before G3 certification.
- (gnas-301-u01-review_en, review_en, agy) who-water-2023.md:18 heading retains legacy Unit 2 label to protect Unit 2 G2 evidence; make unit-neutral when Unit 2 evidence is refreshed.
- (gnas-301-u01-fix, fix, opencode) fig-U1-6 viewBox height is now 490 (not 470) - both Figure carriers updated; do not revert without updating them. G3 en-review for Unit 1 remains owner-gated under G-2026-24; needs a fresh review run when authorized.
- (gnas-301-u01-repair_en, repair_en, codex) Fresh review requires owner authorisation under G-2026-24; course overview credit split and shared source heading remain course-owner follow-ups.


## Response snapshot

Merged origin/main into crew/gnas-301-u01-review_en, kept both sides' rows in the gnas-301 tasks.md conflict, accepted main's removal of static/content-status.json, and got check:content passing 13/13.

## Outcome

- Impact: fix for GNAS-301 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 13 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gnas-301-u01-review_en, kept both sides' rows in the gnas-301 tasks.md conflict, accepted main's removal of static/content-status.json, and got check:content passing 13/13.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 1 G3 is still open and escalated (report `12ce2621-...json`): 10 figure text geometry defects in fig-U1-2, fig-U1-3.ur, fig-U1-6 and fig-U1-8 still need fixing.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
