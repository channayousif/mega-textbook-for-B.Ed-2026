---
id: crew-gcce-400-u03-author-conflict2
title: crew fix GCCE-400 unit 3 (conflict2)
stage: misc
date: 2026-11-22
surface: agent
model: claude_crew
feature: gcce-400
branch: crew/gcce-400-u03-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gcce-400/tasks.md
 - history/prompts/gcce-400/crew-gcce-400-u03-author-conflict2.misc.prompt.md
tests:
 - npm run build:content-status
 - npm run check:content
---

## Prompt

# Crew job gcce-400-u03-author-conflict2

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u03-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/gcce-400-u03-author conflicts with main (specs/content/gcce-400/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GCCE-400 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-03/`.

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
- (gcce-400-u03-author-conflict1, fix, claude_crew) G3 en-review is still open; the reviewer should confirm the currency of cited constitutional provisions under the 1973 Constitution (Articles 8-28 and Article 5).
- (gcce-400-u03-author-conflict1, fix, claude_crew) Urdu translation (G4/G5) is a separate downstream job; the unit stays under the required untranslated notice.
- (gcce-400-u03-author-conflict1, fix, claude_crew) The tracker now carries both Unit 2 (main) and Unit 3 (this branch) rows; the next unit job should re-point its G2 row only if its evidence file changes.
- (gcce-400-u03-author, author, agy) G3 en-review remains open; the reviewer should confirm the currency of cited constitutional provisions under the 1973 Constitution (Articles 8-28 and Article 5).
- (gcce-400-u03-author, author, agy) Urdu translation (G4/G5) is a separate downstream job; the unit is published under the required untranslated notice.

## Response snapshot

Merged origin/main (9a1890b5e) into crew/gcce-400-u03-author as merge commit 1aca1948f. The only conflict was specs/content/gcce-400/tasks.md; I kept both sides' entries (Unit 3 rows and reading estimate from this branch, Unit 4 rows and reading estimate from main), dropped the duplicated Unit 1 and Unit 2 estimate copies, and updated the status header to Units 1-4. glossary.json auto-merged with main's five new terms and no ID collision. All 14 content gates pass.

## Outcome

- Impact: fix for GCCE-400 Unit 3 by claude_crew (conflict2).
- Tests: npm run build:content-status then npm run check:content passed (14/14 gates).
- Files: specs/content/gcce-400/tasks.md and this PHR; the merge commit also carries main's Unit 1 and Unit 4 work.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merge commit 1aca1948f on crew/gcce-400-u03-author; specs/content/gcce-400/tasks.md now carries Unit 1, 2, 3 and 4 stage rows and all four reading estimates.
- Decisions the team must respect: the tracker keeps both sides' entries in numeric unit order; no main entry was changed or removed; the header summary was updated to Units 1-4 because main's Unit 4 is now merged.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 en-review is still open; the reviewer should confirm the currency of cited constitutional provisions under the 1973 Constitution (Articles 8-28 and Article 5).
  - Urdu translation (G4/G5) is a separate downstream job; the unit stays under the required untranslated notice.
  - The tracker now carries Unit 1, 2, 3 and 4 rows; the next unit job should re-point its G2 row only if its evidence file changes.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: specs/content/gcce-400/tasks.md is a hand-maintained tracker that conflicts on every parallel unit job; both sides also rewrite the reading-estimate block, so a naive merge duplicates the Unit 1 and Unit 2 prose.
- Graders run and results (PASS/FAIL): check:content PASS (14/14).
- Prompt variant (if applicable): crew brief v1.
- Next experiment (smallest change to try): none.
