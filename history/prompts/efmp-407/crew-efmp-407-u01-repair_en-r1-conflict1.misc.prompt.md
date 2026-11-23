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

## Response snapshot

Verified `origin/main` (`354926588`) is already an ancestor of this branch (ahead 3, behind 0), so `git merge origin/main` reports "Already up to date" and there is no reproducible conflict to resolve. Confirmed the append-only shared registries (`glossary.json`, `specs/decisions/log.md`, `specs/gaps.md`, `specs/content/terminology.csv`) are unchanged from main, and that `specs/content/efmp-407/tasks.md` keeps both Unit 1 G3 rows (main's `20261108T203238Z` row and this branch's `20261122T175629Z` row). All 14 content gates pass.

## Outcome

- Impact: fix for EFMP-407 Unit 1 by claude_crew (attempt 1).
- Tests: npm run check:content passed (14/14 gates) in the job worktree.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the branch already contains `origin/main` with no reproducible conflict, confirmed the append-only registries and both Unit 1 G3 tracker rows are preserved, passed all 14 content gates, and committed this conflict-fix PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `origin/main` `354926588` is already an ancestor of this branch (ahead 3, behind 0), so there was no conflict to resolve and no merge commit exists.
  - `specs/content/efmp-407/tasks.md` is the recurring collision point for parallel EFMP-407 unit jobs; both Unit 1 G3 rows are intentional and must be kept.
  - Unit 1 G3 remains unticked pending fresh independent review and owner disposition under ADR-0019.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
