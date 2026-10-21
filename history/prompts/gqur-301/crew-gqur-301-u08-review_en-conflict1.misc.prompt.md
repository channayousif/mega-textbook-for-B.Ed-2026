---
id: crew-gqur-301-u08-review_en-conflict1
title: crew fix GQUR-301 unit 8
stage: misc
date: 2026-10-21
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u08-review_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gqur-301/0551-merge-conflict-resolution.misc.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u08-review-en.misc.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u08-review_en.misc.prompt.md
 - specs/content/gqur-301/reviews/unit-08/G3/01a1608a-2fc5-7f41-a824-c08320f0383b.json
 - specs/content/gqur-301/reviews/unit-08/G3/crew-review/baseline-comparison.md
 - specs/content/gqur-301/reviews/unit-08/G3/crew-review/check-content-baseline.log
 - specs/content/gqur-301/reviews/unit-08/G3/crew-review/check-content-final.log
 - specs/content/gqur-301/reviews/unit-08/G3/crew-review/check-depth-gate.log
 - specs/content/gqur-301/reviews/unit-08/G3/crew-review/check-docs-sync.log
 - specs/content/gqur-301/reviews/unit-08/G3/crew-review/check-figures.log
 - specs/content/gqur-301/reviews/unit-08/G3/crew-review/check-no-answer-keys.log
 - specs/content/gqur-301/reviews/unit-08/G3/crew-review/check-no-em-dash.log
 - specs/content/gqur-301/reviews/unit-08/G3/crew-review/commands.json
 - specs/content/gqur-301/reviews/unit-08/G3/crew-review/figure-source-inspection.log
 - specs/content/gqur-301/reviews/unit-08/G3/crew-review/independent-solutions.md
 - specs/content/gqur-301/reviews/unit-08/G3/crew-review/manifest-verification.log
 - specs/content/gqur-301/reviews/unit-08/G3/crew-review/manifest.json
 - specs/content/gqur-301/reviews/unit-08/G3/crew-review/provenance.md
 - specs/content/gqur-301/reviews/unit-08/G3/crew-review/report-validation.log
 - specs/content/gqur-301/reviews/unit-08/G3/crew-review/source-inspection.md
 - specs/content/gqur-301/reviews/unit-08/G3/crew-review/started-at.txt
 - specs/content/gqur-301/reviews/unit-08/G3/crew-review/summary.md
 - specs/content/gqur-301/reviews/unit-08/G3/crew-review/validate-content.log
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u08-review_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u08-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gqur-301-u08-review_en conflicts with main (it could not join the hourly batch). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GQUR-301 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-08/`.

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
- (gqur-301-u08-review_en, review_en, codex) Separate author corrections and a fresh review with provenance, bound sources and rendered accessibility evidence are required.
- (gqur-301-u08-review_en, review_en, codex) Separate author corrections and a fresh review with provenance, bound sources and rendered accessibility evidence are required.
- (gqur-301-u08-author-conflict2, fix, opencode) Urdu versions of fig-U8-1..6 and the 8 Urdu concept labels in specs/content/gqur-301/concepts/unit-08.md remain undone and need Urdu review. course-overview.mdx still lists Unit 8 as "(coming soon)"  -  outside this job's scope.
- (gqur-301-u08-author-conflict1, fix, opencode) Urdu versions of fig-U8-1..6 and the 8 Urdu concept labels in specs/content/gqur-301/concepts/unit-08.md are not done and need Urdu review.
- (gqur-301-u08-author-conflict1, fix, opencode) course-overview.mdx still lists Unit 8 as "(coming soon)"  -  outside this job's scope.


## Response snapshot

Merged origin/main into crew/gqur-301-u08-review_en, resolved one append-only conflict in tasks.md (kept both advisory G3 Unit 7 and Unit 8 sections), regenerated content-status.json, and made all 13 content gates pass.

## Outcome

- Impact: fix for GQUR-301 Unit 8 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 24 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gqur-301-u08-review_en, resolved one append-only conflict in tasks.md (kept both advisory G3 Unit 7 and Unit 8 sections), regenerated content-status.json, and made all 13 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 8 G3 en-review advisory escalation (F1-F4) remains unresolved; separate author corrections needed.
  - Urdu versions of fig-U8-1..6 and 8 Urdu concept labels in specs/content/gqur-301/concepts/unit-08.md remain undone and need Urdu review.
  - course-overview.mdx still lists Unit 8 as "(coming soon)" - outside this job's scope.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
