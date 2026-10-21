---
id: crew-gqur-301-u08-author-conflict2
title: crew fix GQUR-301 unit 8
stage: misc
date: 2026-10-21
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u08-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-08/_category_.json
 - docs/semester-2/gqur-301/unit-08/index.mdx
 - docs/semester-2/gqur-301/unit-08/topic-01.mdx
 - docs/semester-2/gqur-301/unit-08/topic-02.mdx
 - docs/semester-2/gqur-301/unit-08/topic-03.mdx
 - docs/semester-2/gqur-301/unit-08/unit-assessment.mdx
 - docs/semester-2/gqur-301/unit-08/unit-teacher-notes.mdx
 - glossary.json
 - history/prompts/general/0545-gqur-301-u08-merge-conflict1.general.prompt.md
 - history/prompts/general/536-gqur301-u08-merge-conflict2.general.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u08-author-conflict1.misc.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u08-author.green.prompt.md
 - specs/content/gqur-301/concepts/unit-08.md
 - specs/content/gqur-301/coverage/unit-08.md
 - specs/content/gqur-301/figures/unit-08.md
 - specs/content/gqur-301/reviews/unit-08/G2/20261021T061205981Z-gates.json
 - specs/content/gqur-301/reviews/unit-08/G2/logs-20261021T061205981Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-08/G2/logs-20261021T061205981Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-08/G2/logs-20261021T061205981Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-08/G2/logs-20261021T061205981Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-08/G2/logs-20261021T061205981Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-08/G2/logs-20261021T061205981Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-08/G2/logs-20261021T061205981Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-08/G2/logs-20261021T061205981Z/validate-content.txt
 - specs/content/gqur-301/sources/texts/openstax-precalc.md
 - specs/content/gqur-301/sources/unit-08.md
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-08/fig-U8-1.dark.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-1.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-2.dark.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-2.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-3.dark.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-3.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-4.dark.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-4.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-5.dark.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-5.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-6.dark.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u08-author-conflict2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u08-author`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gqur-301-u08-author conflicts with main (it could not join the hourly batch). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

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
- (gqur-301-u08-author-conflict1, fix, opencode) Urdu versions of fig-U8-1..6 and the 8 Urdu concept labels in specs/content/gqur-301/concepts/unit-08.md are not done and need Urdu review.
- (gqur-301-u08-author-conflict1, fix, opencode) course-overview.mdx still lists Unit 8 as "(coming soon)"  -  outside this job's scope.
- (gqur-301-u08-author, author, claude) Urdu versions of fig-U8-1..6 and the 8 Urdu concept labels in `specs/content/gqur-301/concepts/unit-08.md` are not done and need the Urdu review.
- (gqur-301-u08-author, author, claude) `course-overview.mdx` still lists Unit 8 as "(coming soon)"; that shared file was outside this job's scope.
- (gqur-301-u08-author, author, claude) the build was not run on this branch; run it before merging.


## Response snapshot

Resolved merge conflict with origin/main on glossary.json by keeping both sides' non-overlapping term entries (main's first, then branch's), committed the merge, and made all content gates pass except the pre-existing check:content-status failure that origin/main also reports.

## Outcome

- Impact: fix for GQUR-301 Unit 8 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 39 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved merge conflict with origin/main on glossary.json by keeping both sides' non-overlapping term entries (main's first, then branch's), committed the merge, and made all content gates pass except the pre-existing check:content-status failure that origin/main also reports.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Urdu versions of fig-U8-1..6 and the 8 Urdu concept labels in specs/content/gqur-301/concepts/unit-08.md remain undone and need Urdu review. course-overview.mdx still lists Unit 8 as "(coming soon)"  -  outside this job's scope.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
