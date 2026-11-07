---
id: crew-efmp-407-u05-author-conflict4
title: crew fix EFMP-407 unit 5
stage: misc
date: 2026-11-07
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u05-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-407/tasks.md
 - history/prompts/efmp-407/crew-efmp-407-u05-author-conflict4.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u05-author-conflict4

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-407-u05-author conflicts with main (specs/content/efmp-407/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-407 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-05/`.

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
- (efmp-407-u05-author-conflict3, fix, opencode) Banner fig-U5-7 remains prompt-only; G3/G4/G5 stay open for downstream jobs.
- (efmp-407-u05-author-conflict3, fix, opencode) tasks.md "Unit 2 backward-design alignment" table still contains Unit 1 rows from main (pre-existing, preserved verbatim).
- (efmp-407-u05-author-conflict2, fix, opencode) Branch was already fully merged by conflict1; no conflict resolution was needed this run.
- (efmp-407-u05-author-conflict2, fix, opencode) Banner fig-U5-7 remains prompt-only and G3/G4/G5 stay open for downstream jobs.
- (efmp-407-u05-author-conflict2, fix, opencode) tasks.md's "Unit 2 backward-design alignment" table still contains Unit 1 rows from main (pre-existing, preserved verbatim).

## Response snapshot

Merged origin/main into crew/efmp-407-u05-author, resolved the single tasks.md conflict keeping main's Unit 6 rows then this branch's Unit 5 rows, regenerated the gitignored content-status report, and committed the merge plus PHR with check:content green.

## Outcome

- Impact: fix for EFMP-407 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed (14/14 content gates).
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-407-u05-author and resolved the tasks.md conflict by keeping main's Unit 6 tracker rows first and this branch's Unit 5 rows second (append-only, main's order then branch's). Regenerated the gitignored static/content-status.json so check:content-status passes. No shared registry changed on either side relative to the merge base, so no ID rekeying or duplicate drops were needed.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this merge does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the merge touches a protected path).
- Notes for the next job on this unit:
  - Banner fig-U5-7 remains prompt-only; G3/G4/G5 stay open for downstream jobs.
  - tasks.md "Unit 2 backward-design alignment" table still contains Unit 1 rows from main (pre-existing, preserved verbatim).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
