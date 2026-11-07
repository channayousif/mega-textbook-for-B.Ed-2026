---
id: crew-efmp-407-u06-author-conflict2
title: crew fix EFMP-407 unit 6
stage: misc
date: 2026-11-07
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u06-author
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
 - history/prompts/efmp-407/crew-efmp-407-u06-author-conflict2.misc.prompt.md
tests:
 - npm run check:content
 - node scripts/report-content-status.mjs
---

## Prompt

# Crew job efmp-407-u06-author-conflict2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u06-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-407-u06-author conflicts with main (specs/content/efmp-407/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-407 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-06/`.

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
- (efmp-407-u06-author-conflict1, fix, opencode) Merge conflict was limited to `specs/content/efmp-407/tasks.md`; kept main's generic header and Unit 2 sections, appended Unit 6's five tracker rows after Unit 2.
- (efmp-407-u06-author-conflict1, fix, opencode) main's Unit 2 backward-design table still carries five erroneous Unit 1 tracker rows (pre-existing on origin/main, left untouched per the merge rule).
- (efmp-407-u06-author, author, claude) The CSR Bill 2026 was reported passed by the Senate on 11 May 2026 but assent is unconfirmed, so recheck its status in Topic 6.2 before publication or translation.
- (efmp-407-u06-author, author, claude) Topic 6.2 reports the disputed Ali Enterprises audit from both parties and leaves it undecided, so keep that balance in the Urdu mirror and check the two search-excerpt sources (`rina-statement`, `pakistan-halal-act-2016`).
- (efmp-407-u06-author, author, claude) `tasks.md` gains Unit 6 rows and a retitled header, so expect the usual tracker conflict with sibling EFMP-407 branches at merge.

## Response snapshot

Merged origin/main into the EFMP-407 unit 6 author branch. The only conflict was the tracker table in `specs/content/efmp-407/tasks.md`; kept main's Unit 4 and Unit 7 sections and this branch's Unit 6 rows (main order first, then branch). Shared registries had no branch changes and no ID collisions. Regenerated the git-ignored content-status cache, then all 14 content gates passed.

## Outcome

- Impact: fix for EFMP-407 Unit 6 by opencode (attempt 2).
- Tests: npm run check:content passed after regenerating the local content-status cache.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved the origin/main merge conflict in the EFMP-407 tracker by keeping main's Unit 4 and Unit 7 sections and this branch's Unit 6 rows, then committed the merge with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this merge does not certify anything and main's entries remain unchanged.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - Merge conflict was limited to `specs/content/efmp-407/tasks.md`; kept main's Unit 4 and Unit 7 sections, then Unit 6's five tracker rows.
  - `check:content-status` initially failed because the git-ignored `static/content-status.json` cache was stale; regenerated with `node scripts/report-content-status.mjs`. The same cache absence occurs on a clean main checkout.
  - main's Unit 2 backward-design table still carries five erroneous Unit 1 tracker rows (pre-existing on origin/main, left untouched per the merge rule).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
