---
id: crew-efmp-407-u01-repair_en-r1-conflict1
title: crew fix EFMP-407 unit 1
stage: misc
date: 2026-11-23
surface: agent
model: claude_crew
feature: efmp-407
branch: crew/efmp-407-u01-repair_en-r1
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-407/crew-efmp-407-u01-repair_en-r1-conflict1.misc.prompt.md
 - history/prompts/efmp-407/crew-efmp-407-u01-repair_en-r1.misc.prompt.md
 - specs/content/efmp-407/reviews/unit-01/G3/20261123-repair-notes.md
 - specs/content/efmp-407/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u01-repair_en-r1-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u01-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/efmp-407-u01-repair_en-r1 conflicts with main (specs/content/efmp-407/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-407 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-01/`.

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
- (efmp-407-u01-repair_en-r1, repair_en, agy) Browser, narrow-screen, and A4 print rendering remain host-prohibited under the crew brief and are left as owner handoffs.
- (efmp-407-u01-repair_en-r1, repair_en, agy) Unit 1 G3 remains unticked pending fresh independent review and owner disposition under ADR-0019.
- (efmp-407-u01-repair_en, repair_en, agy) English author repairs for Orr disclosure and RRQ-09 uncertainty are resolved; Unit 1 is unblocked for Urdu translation (G4).
- (efmp-407-u01-repair_en, repair_en, agy) Browser, narrow-screen, and A4 print rendering remain host-prohibited under the crew brief and are left as owner handoffs.
- (efmp-407-u01-repair_en, repair_en, agy) Unit 1 G3 remains unticked pending fresh independent review and owner disposition under ADR-0019.

## Feedback from the previous attempt
the worker committed only a PHR (history/prompts/); a job must produce its stage's work, and the crew writes the PHR itself


## Response snapshot

Resolved the `specs/content/efmp-407/tasks.md` merge conflict with origin/main by keeping both sides' G3 advisory rows, committed the merge, and left `npm run check:content` fully green.

## Outcome

- Impact: fix for EFMP-407 Unit 1 by claude_crew (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 4 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved the `specs/content/efmp-407/tasks.md` merge conflict with origin/main by keeping both sides' G3 advisory rows, committed the merge, and left `npm run check:content` fully green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 1 G3 is still unticked by design; the tracker row records the 3d3228c6 repairs as "already resolved on main", so a fresh independent G3 run is still the open owner action.
  - The merged `tasks.md` still carries main's legacy duplicate-structure rows (Unit 5/8 multiple G3 rows); left as-is since main has them.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
