---
id: crew-gsos-301-u06-author-conflict1
title: crew fix GSOS-301 unit 6
stage: misc
date: 2026-10-22
surface: agent
model: claude
feature: gsos-301
branch: crew/gsos-301-u06-author
user: crew
command: crew fix
labels: ["crew", "claude", "fix"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gsos-301/unit-06/index.mdx
 - docs/semester-2/gsos-301/unit-06/topic-01.mdx
 - docs/semester-2/gsos-301/unit-06/topic-02.mdx
 - docs/semester-2/gsos-301/unit-06/unit-assessment.mdx
 - docs/semester-2/gsos-301/unit-06/unit-teacher-notes.mdx
 - glossary.json
 - history/prompts/general/20261022-author-gsos-301-unit-6-g2.general.prompt.md
 - history/prompts/gsos-301/0009-author-unit-six-figures.misc.prompt.md
 - history/prompts/gsos-301/crew-gsos-301-u06-author.green.prompt.md
 - specs/content/gsos-301/concepts/unit-06.md
 - specs/content/gsos-301/coverage/unit-06.md
 - specs/content/gsos-301/figures/unit-06.md
 - specs/content/gsos-301/reviews/unit-06/G2/20261022T202014023Z-gates.json
 - specs/content/gsos-301/reviews/unit-06/G2/logs-20261022T202014023Z/check-bloom-bands.txt
 - specs/content/gsos-301/reviews/unit-06/G2/logs-20261022T202014023Z/check-concept-graph.txt
 - specs/content/gsos-301/reviews/unit-06/G2/logs-20261022T202014023Z/check-depth-gate.txt
 - specs/content/gsos-301/reviews/unit-06/G2/logs-20261022T202014023Z/check-docs-sync.txt
 - specs/content/gsos-301/reviews/unit-06/G2/logs-20261022T202014023Z/check-figures.txt
 - specs/content/gsos-301/reviews/unit-06/G2/logs-20261022T202014023Z/check-no-answer-keys.txt
 - specs/content/gsos-301/reviews/unit-06/G2/logs-20261022T202014023Z/check-no-em-dash.txt
 - specs/content/gsos-301/reviews/unit-06/G2/logs-20261022T202014023Z/validate-content.txt
 - specs/content/gsos-301/sources/unit-06.md
 - specs/content/gsos-301/tasks.md
 - static/img/figures/gsos-301/unit-06/fig-U6-1.dark.svg
 - static/img/figures/gsos-301/unit-06/fig-U6-1.svg
 - static/img/figures/gsos-301/unit-06/fig-U6-2.dark.svg
 - static/img/figures/gsos-301/unit-06/fig-U6-2.svg
 - static/img/figures/gsos-301/unit-06/fig-U6-3.dark.svg
 - static/img/figures/gsos-301/unit-06/fig-U6-3.svg
 - static/img/figures/gsos-301/unit-06/fig-U6-4.dark.svg
 - static/img/figures/gsos-301/unit-06/fig-U6-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u06-author-conflict1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u06-author`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gsos-301-u06-author conflicts with main (it could not join the hourly batch). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GSOS-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-06/`.

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
- (gsos-301-u06-author, author, opencode) G3 en-review is the next stage (independent reviewer required; never self-certify). UR translation (G4) downstream. No pending content gaps in this unit's scope.


## Response snapshot

Merged origin/main into crew/gsos-301-u06-author without conflicts, repaired two corrupted Urdu glossary definitions this branch added, and confirmed check:content's only failure is the out-of-date content-status file that is identical on main.

## Outcome

- Impact: fix for GSOS-301 Unit 6 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 31 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gsos-301-u06-author without conflicts, repaired two corrupted Urdu glossary definitions this branch added, and confirmed check:content's only failure is the out-of-date content-status file that is identical on main.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The "classroom management" glossary term is duplicated on main and is not this unit's problem; check:content-status fails on main as well and goes away only when someone runs `npm run build:content-status`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
