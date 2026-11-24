---
id: crew-efmp-408-u04-author-conflict1
title: crew fix EFMP-408 unit 4
stage: misc
date: 2026-11-25
surface: agent
model: claude_crew
feature: efmp-408
branch: crew/efmp-408-u04-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-408/crew-efmp-408-u04-author-conflict1.misc.prompt.md
tests:
 - npm run build:content-status
 - npm run check:content
 - npm run figures:variants:check
 - node scripts/measure-figure-text.mjs static/img/figures/efmp-408/unit-04/*.svg
 - node scripts/prepare-gate-evidence.mjs --refresh-stale
---

## Prompt

# Crew job efmp-408-u04-author-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/efmp-408-u04-author conflicts with main (specs/content/efmp-408/sources/texts/seifert-sutton-2009.md, specs/content/efmp-408/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-408 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-04/`.

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
- (efmp-408-u04-author, author, claude_crew) Unit 4 is English-only at `translation_status: draft`; G3/G5 are open and uncertified, and the banner `fig-U4-4` is still `prompt-only` for the illustrate job.
- (efmp-408-u04-author, author, claude_crew) The shared Seifert and Sutton evidence note gained its Unit 4 use, which invalidated Unit 1's accepted G2 manifest, so Unit 1's evidence was refreshed and its tracker row repointed; a later merge of the Unit 2 branch (which also edits shared source notes) may re-invalidate evidence, so run `node scripts/prepare-gate-evidence.mjs --refresh-stale`.


## Response snapshot

Merged `origin/main` (94b7833b8) into `crew/efmp-408-u04-author` as 2bfd65ccf. Both files the brief named were resolved by taking main's side and re-appending this branch's additions, which is exactly the append-only shape they already had: `specs/content/efmp-408/sources/texts/seifert-sutton-2009.md` keeps main's Notes 1-4 and Unit 1 use and gains this branch's Note 5 and `## Unit 4 use`; `specs/content/efmp-408/tasks.md` keeps main's refreshed Unit 1 rows (G2 repointed to `20261124T184808974Z-gates.json`, G4/G6 updated for the Urdu mirror) and gains this branch's Unit 4 rows, Unit 4 units-table row, status line and reading estimate. `glossary.json` was already a clean union (597 unique terms, main's 589 in order then this branch's 8 assessment terms, no duplicates), and neither side added a decision, gap or terminology ID, so no ID needed renumbering. `docs/semester-4/efmp-408/unit-04/`, its figures, concepts, coverage, sources and both G2 evidence sets are byte-identical to the pre-merge branch side. `npm run check:content` passes all 14 gates, `figures:variants:check` passes, all twelve Unit 4 SVGs measure clean, and `--refresh-stale` reports no stale G2 evidence.

## Outcome

- Impact: fix for EFMP-408 Unit 4 merge conflicts by claude_crew (attempt 1).
- Tests: npm run check:content PASS (14/14); figures:variants:check PASS; measure-figure-text PASS on all 12 Unit 4 SVGs; prepare-gate-evidence --refresh-stale reported no stale evidence.
- Files: 1 file(s) listed above (this PHR); the merge commit 2bfd65ccf is the only content change and is already committed.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merge commit 2bfd65ccf brings `origin/main` into `crew/efmp-408-u04-author` with both conflicting files resolved append-only and Unit 4 fully preserved; `npm run check:content` is green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this branch certifies nothing. Unit 4 stays English-only at `translation_status: draft`.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 4 is English-only; G3/G5 are open and uncertified, and the banner `fig-U4-4` is still `prompt-only` for the illustrate job.
  - `crew/efmp-408-u02-author` has since merged main and edits `specs/content/efmp-408/tasks.md` (Unit 2 rows) but does **not** touch `sources/texts/seifert-sutton-2009.md`; the next merge of that branch will conflict on `tasks.md` again, so expect a second conflict pass there.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none. The two conflicts were pure append-only text additions on both sides, so no semantic merge judgement was needed.
- Graders run and results (PASS/FAIL): check:content PASS; figures:variants:check PASS; measure-figure-text PASS.
- Prompt variant (if applicable): crew brief v1 (conflict1)
- Next experiment (smallest change to try): none
