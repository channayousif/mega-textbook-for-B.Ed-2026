---
id: crew-gqur-300-u06-review_en-conflict1
title: crew fix GQUR-300 unit 6
stage: misc
date: 2026-10-28
surface: agent
model: agy
feature: gqur-300
branch: crew/gqur-300-u06-review_en
user: crew
command: crew fix
labels: ["crew", "agy", "fix"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gqur-300/tasks.md
  - history/prompts/gqur-300/crew-gqur-300-u06-review_en-conflict1.misc.prompt.md
tests:
  - npm run check:content
---

## Prompt

# Crew job gqur-300-u06-review_en-conflict1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u06-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gqur-300-u06-review_en conflicts with main (specs/content/gqur-300/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GQUR-300 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-06/`.

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
- (gqur-300-u06-review_en, review_en, codex) Final cycle escalates remaining source, assessment and budget-order defects; current visual evidence is unavailable and G3 remains open.
- (gqur-300-u06-review_en, review_en, codex) Final cycle escalates remaining source, assessment and budget-order defects; current visual evidence is unavailable and G3 remains open.
- (gqur-300-u06-fix, fix, codex) Unit 6 needs a fresh independent G3 review.
- (gqur-300-u06-fix, fix, codex) Unit 6 needs a fresh independent G3 review.
- (gqur-300-u06-translate-r1, translate, agy) All 5 key_terms (Budget, Interest, Loss, Profit, Simple interest) and 11 concept graph labels are unbanked proposals awaiting curriculum owner decision.


## Response snapshot

Merged origin/main into crew/gqur-300-u06-review_en, resolved the conflict in specs/content/gqur-300/tasks.md by preserving both Unit 4 and Unit 6 advisory rows, refreshed content status, and verified all 13 content gates pass.

## Outcome

- Impact: fix for GQUR-300 Unit 6 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree.
- Files: specs/content/gqur-300/tasks.md and history/prompts/gqur-300/crew-gqur-300-u06-review_en-conflict1.misc.prompt.md.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main and resolved tracker conflict in specs/content/gqur-300/tasks.md, preserving both advisory rows.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Final cycle escalates remaining source, assessment and budget-order defects; current visual evidence is unavailable and G3 remains open.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
