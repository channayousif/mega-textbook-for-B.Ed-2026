---
id: crew-geng-300-u02-repair_en-r1-conflict1
title: crew fix GENG-300 unit 2
stage: misc
date: 2026-11-03
surface: agent
model: codex
feature: geng-300
branch: crew/geng-300-u02-repair_en-r1
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/geng-300/unit-02/topic-01.mdx
 - docs/semester-1/geng-300/unit-02/topic-02.mdx
 - docs/semester-1/geng-300/unit-02/topic-03.mdx
 - docs/semester-1/geng-300/unit-02/unit-assessment.mdx
 - history/prompts/geng-300/0175-merge-unit-two-repair-branch.misc.prompt.md
 - history/prompts/geng-300/crew-geng-300-u02-repair_en-r1.misc.prompt.md
 - specs/content/geng-300/concepts/unit-02.md
 - specs/content/geng-300/coverage/unit-02.md
 - specs/content/geng-300/figures/unit-02.md
 - specs/content/geng-300/reviews/unit-02/G2/20261103T043450445Z-gates.json
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261103T043450445Z/check-bloom-bands.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261103T043450445Z/check-concept-graph.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261103T043450445Z/check-depth-gate.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261103T043450445Z/check-docs-sync.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261103T043450445Z/check-figures.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261103T043450445Z/check-no-answer-keys.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261103T043450445Z/check-no-em-dash.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261103T043450445Z/validate-content.txt
 - specs/content/geng-300/tasks.md
 - static/img/figures/geng-300/unit-02/fig-U2-4.dark.svg
 - static/img/figures/geng-300/unit-02/fig-U2-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u02-repair_en-r1-conflict1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u02-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/geng-300-u02-repair_en-r1 conflicts with main (specs/content/geng-300/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

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
- (geng-300-u02-repair_en-r1, repair_en, claude) E1, E2 and U1 are still open and need the owner or a host with a browser; a fresh independent G3 review needs owner authorisation because the cycle limit is used up.
- (geng-300-u02-repair_en-r1, repair_en, claude) RRQ 1 now tests stereotypes rather than purpose and audience; MCQ 8, MCQ 10 and RRQ 5 are new Topic 2.3 items, and the concept map was updated to match.
- (geng-300-u02-repair_en-r1, repair_en, claude) S1 is only partly done: ERQ 2's passages are still unlabelled, and the approved content-spec still says fig-U2-4 uses "examples from Pakistani media" (left unedited).
- (geng-300-u02-review_en-r1-conflict1, fix, claude) The Unit 2 block in tasks.md now has three G3 en-review rows, two from main and the newest from this branch (the `20261028-codex-r1.json` escalation). Only the owner can act on that escalation, because the review cycle limit is used up.
- (geng-300-u02-review_en-r1, review_en, codex) Owner action needed on assessment coverage, ERQ 3’s missing stimulus, authority/provenance gaps and unavailable render checks; final review cycle exhausted.


## Response snapshot

Resolved the Unit 2 tracker conflict, preserved review history, and committed the merge with passing content gates.

## Outcome

- Impact: fix for GENG-300 Unit 2 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 21 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved the Unit 2 tracker conflict, preserved review history, and committed the merge with passing content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Existing owner escalations remain open; fresh G3 review requires owner authorisation.
  - Existing owner escalations remain open; fresh G3 review requires owner authorisation.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
