---
id: crew-gsos-301-u03-author-conflict4
title: crew fix GSOS-301 unit 3
stage: misc
date: 2026-10-23
surface: agent
model: opencode
feature: gsos-301
branch: crew/gsos-301-u03-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gsos-301/unit-03/index.mdx
 - docs/semester-2/gsos-301/unit-03/topic-01.mdx
 - docs/semester-2/gsos-301/unit-03/topic-02.mdx
 - docs/semester-2/gsos-301/unit-03/unit-assessment.mdx
 - docs/semester-2/gsos-301/unit-03/unit-teacher-notes.mdx
 - glossary.json
 - history/prompts/general/0554-gsos-301-u03-merge-conflict-round4.general.prompt.md
 - history/prompts/general/0855-gsos301-u03-fix-glossary-dupes.general.prompt.md
 - history/prompts/general/20261022-gsos301-u03-author-verify-and-phr.general.prompt.md
 - history/prompts/gsos-301/crew-gsos-301-u03-author-conflict1.misc.prompt.md
 - history/prompts/gsos-301/crew-gsos-301-u03-author-conflict2.misc.prompt.md
 - history/prompts/gsos-301/crew-gsos-301-u03-author-conflict3.misc.prompt.md
 - history/prompts/gsos-301/crew-gsos-301-u03-author-verify.misc.prompt.md
 - history/prompts/gsos-301/crew-gsos-301-u03-author.green.prompt.md
 - specs/content/gsos-301/concepts/unit-03.md
 - specs/content/gsos-301/coverage/unit-03.md
 - specs/content/gsos-301/figures/unit-03.md
 - specs/content/gsos-301/reviews/unit-03/G2/20261022T004504074Z-gates.json
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261022T004504074Z/check-bloom-bands.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261022T004504074Z/check-concept-graph.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261022T004504074Z/check-depth-gate.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261022T004504074Z/check-docs-sync.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261022T004504074Z/check-figures.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261022T004504074Z/check-no-answer-keys.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261022T004504074Z/check-no-em-dash.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261022T004504074Z/validate-content.txt
 - specs/content/gsos-301/sources/unit-03.md
 - specs/content/gsos-301/tasks.md
 - static/content-status.json
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u03-author-conflict4

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u03-author`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gsos-301-u03-author conflicts with main (it could not join the hourly batch). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GSOS-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-03/`.

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
- (gsos-301-u03-author-conflict3, fix, opencode) Unit 3 G3 English review, 4 prompt-only figures (fig-U3-1..U3-4), and G4/G5 Urdu remain downstream  -  nothing left blocking this branch.
- (gsos-301-u03-author-conflict2, fix, opencode) static/content-status.json is stale and pre-existing on main  -  the next job on this unit should run `npm run build:content-status` if their gate run hits it.
- (gsos-301-u03-author-conflict1, fix, opencode) check:content-status staleness is pre-existing on main (out of scope here, but the next job may need to run npm run build:content-status if their gate run hits it).
- (gsos-301-u03-author-conflict1, fix, opencode) Unit 3 figures (fig-U3-1..U3-4, prompt-only) and G3 English review remain downstream jobs.
- (gsos-301-u03-author, author, opencode) Unit 3 English content (index, 2 topics, assessment, teacher notes) + governance artifacts (coverage, sources, figures, concepts) are authored and G2-gated from the previous attempt; next stage is G3 English review (separate job).


## Response snapshot

Merged origin/main into crew/gsos-301-u03-author (resolved the one content-status.json conflict with main's version, glossary auto-merged with the branch's 5 new terms preserved), rebuilt stale content-status.json, and confirmed all 13 content gates pass.

## Outcome

- Impact: fix for GSOS-301 Unit 3 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 29 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gsos-301-u03-author (resolved the one content-status.json conflict with main's version, glossary auto-merged with the branch's 5 new terms preserved), rebuilt stale content-status.json, and confirmed all 13 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 3 G3 English review (4 prompt-only figures fig-U3-1..U3-4) and G4/G5 Urdu remain downstream; nothing left blocking them.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
