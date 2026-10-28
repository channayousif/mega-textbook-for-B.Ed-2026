---
id: crew-gpks-402-u06-author-conflict3
title: crew fix GPKS-402 unit 6 conflict3
stage: misc
date: 2026-10-28
surface: agent
model: agy
feature: gpks-402
branch: crew/gpks-402-u06-author
user: crew
command: crew fix
labels: ["crew", "agy", "fix"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gpks-402/tasks.md
tests:
  - npm run check:content
  - npm run figures:variants:check
---

## Prompt

# Crew job gpks-402-u06-author-conflict3

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u06-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gpks-402-u06-author conflicts with main (specs/content/gpks-402/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GPKS-402 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-06/`.

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
- (gpks-402-u06-author, author, agy) Total reading time across the 5 unit files is 96 minutes (index: 4, topic-01: 22, topic-02: 24, topic-03: 21, unit-assessment: 25), inside the 90-125 min depth budget.
- (gpks-402-u06-author, author, agy) Downstream Urdu mirror job will need .ur.svg localized twins of fig-U6-1 through fig-U6-6 and G5 review of authored Urdu concept labels in concepts/unit-06.md.

## Response snapshot

Merged origin/main, resolved tasks.md tracker conflict by preserving both Unit 2 and Unit 6 tracker rows, committed the merge, and verified content gates.

## Outcome

- Impact: Resolved merge conflict with main on crew/gpks-402-u06-author and verified gates.
- Tests: npm run check:content executed (all in-scope gates pass; check:content-status fails only for Unit 2 which is on main).
- Files: specs/content/gpks-402/tasks.md
- Next prompts: Downstream review / Urdu translation jobs for GPKS-402 Unit 6.
- Reflection: Merge conflict in tasks.md was cleanly resolved by preserving main's Unit 2 progress alongside this branch's Unit 6 authoring rows.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gpks-402-u06-author, preserved Unit 2 and Unit 6 tracker rows in specs/content/gpks-402/tasks.md.
- Decisions the team must respect: Shared tracker rows are append-only; G3/G5 remain open pending independent reviews.
- Pending / next owner: G3 independent English reviewer for GPKS-402 Unit 6.
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: Merge conflict on tasks.md between concurrent unit authoring jobs.
- Graders run and results (PASS/FAIL): validate:content PASS, check:pipeline-gate PASS, check:depth-gate PASS, check:figures PASS, check:no-em-dash PASS, check:no-answer-keys PASS, check:concept-graph PASS, check:bloom-bands PASS, check:source-floor PASS, check:licence PASS, licence:map:check PASS, check:docs-sync PASS.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
