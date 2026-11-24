---
id: crew-efmp-301-u10-flashcards-conflict1
title: crew fix EFMP-301 unit 10
stage: misc
date: 2026-11-23
surface: agent
model: claude_crew
feature: efmp-301
branch: crew/efmp-301-u10-flashcards
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-301/crew-efmp-301-u10-flashcards-conflict1.misc.prompt.md
 - history/prompts/efmp-301/crew-efmp-301-u10-flashcards.misc.prompt.md
 - specs/studio/flashcards-needed.json
 - specs/studio/flashcards/efmp-301/unit-10.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u10-flashcards-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u10-flashcards`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/efmp-301-u10-flashcards conflicts with main (specs/studio/flashcards-needed.json). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-301 Unit 10 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-10/`.

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
- (efmp-301-u10-flashcards, flashcards, claude) The coverage run also took efmp-305/5 and gcce-400/5 off flashcards-needed.json, because main's committed list was out of date. Sibling flashcard jobs may hit a merge conflict on that file; rerun the script to resolve it.
- (efmp-301-u10-review_en, review_en, agy) All four run001 blocking findings were verified resolved by commit 2e19d4d8; disposition is pass.
- (efmp-301-u10-review_en, review_en, agy) Six advisory findings (non-blocking) are carried in report agent-g3-efmp301-u10-run002.json.
- (efmp-301-u10-review_en, review_en, agy) G3 tracker row left unticked with no reviewer initials, awaiting human G3 sign-off under ADR-0019.


## Response snapshot

Merged origin/main into crew/efmp-301-u10-flashcards, union-resolved the flashcards-needed.json conflict (dropping efmp-301/1 and efmp-301/10), committed the merge and its PHR, and left npm run check:content fully green.

## Outcome

- Impact: fix for EFMP-301 Unit 10 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 4 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-301-u10-flashcards, union-resolved the flashcards-needed.json conflict (dropping efmp-301/1 and efmp-301/10), committed the merge and its PHR, and left npm run check:content fully green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `static/studio/flashcards/` is gitignored yet main tracks generated decks there; the coverage script rewrites tracked decks for other courses, so restore them (`git checkout -- static/studio/flashcards/`) before committing a merge.
  - EFMP-301 Unit 10 G3 remains unticked with no reviewer initials, awaiting human sign-off under ADR-0019.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
