---
id: crew-gcce-400-u03-author-conflict3
title: crew fix GCCE-400 unit 3
stage: misc
date: 2026-11-22
surface: agent
model: agy
feature: gcce-400
branch: crew/gcce-400-u03-author
user: crew
command: crew fix
labels: ["crew", "agy", "fix"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gcce-400/unit-03/index.mdx
 - docs/semester-4/gcce-400/unit-03/topic-01.mdx
 - docs/semester-4/gcce-400/unit-03/topic-02.mdx
 - docs/semester-4/gcce-400/unit-03/unit-assessment.mdx
 - docs/semester-4/gcce-400/unit-03/unit-teacher-notes.mdx
 - history/prompts/gcce-400/crew-gcce-400-u03-author-conflict1.misc.prompt.md
 - history/prompts/gcce-400/crew-gcce-400-u03-author-conflict2.misc.prompt.md
 - history/prompts/gcce-400/crew-gcce-400-u03-author-conflict3.misc.prompt.md
 - history/prompts/gcce-400/crew-gcce-400-u03-author.green.prompt.md
 - specs/content/gcce-400/concepts/unit-03.md
 - specs/content/gcce-400/coverage/unit-03.md
 - specs/content/gcce-400/figures/unit-03.md
 - specs/content/gcce-400/reviews/unit-03/G2/20261122T113420667Z-gates.json
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261122T113420667Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261122T113420667Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261122T113420667Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261122T113420667Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261122T113420667Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261122T113420667Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261122T113420667Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261122T113420667Z/validate-content.txt
 - specs/content/gcce-400/sources/unit-03.md
 - specs/content/gcce-400/tasks.md
 - static/img/figures/gcce-400/unit-03/fig-U3-1.dark.svg
 - static/img/figures/gcce-400/unit-03/fig-U3-1.svg
 - static/img/figures/gcce-400/unit-03/fig-U3-2.dark.svg
 - static/img/figures/gcce-400/unit-03/fig-U3-2.svg
 - static/img/figures/gcce-400/unit-03/fig-U3-3.dark.svg
 - static/img/figures/gcce-400/unit-03/fig-U3-3.svg
 - static/img/figures/gcce-400/unit-03/fig-U3-4.dark.svg
 - static/img/figures/gcce-400/unit-03/fig-U3-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gcce-400-u03-author-conflict3

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u03-author`.
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
- (gcce-400-u03-author-conflict2, fix, claude_crew) G3 en-review is still open for Unit 3; the reviewer should confirm the currency of cited constitutional provisions under the 1973 Constitution (Articles 8-28 and Article 5).
- (gcce-400-u03-author-conflict2, fix, claude_crew) Urdu G4/G5 is a separate downstream job; Unit 3 stays under the required untranslated notice.
- (gcce-400-u03-author-conflict2, fix, claude_crew) The tracker now carries Unit 1, 2, 3 and 4 rows; the next unit job should re-point its G2 row only if its evidence file changes.
- (gcce-400-u03-author-conflict1, fix, claude_crew) G3 en-review is still open; the reviewer should confirm the currency of cited constitutional provisions under the 1973 Constitution (Articles 8-28 and Article 5).
- (gcce-400-u03-author-conflict1, fix, claude_crew) Urdu translation (G4/G5) is a separate downstream job; the unit stays under the required untranslated notice.


## Response snapshot

Merged origin/main into crew/gcce-400-u03-author and resolved the specs/content/gcce-400/tasks.md conflict by keeping Unit 3 (this branch) and Units 5-6 (origin/main) rows and reading estimates, with all 14 content gates passing.

## Outcome

- Impact: fix for GCCE-400 Unit 3 by agy (attempt 3).
- Tests: npm run check:content passed in the job worktree before completing.
- Files: 31 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gcce-400-u03-author and resolved the specs/content/gcce-400/tasks.md conflict by keeping Unit 3 (this branch) and Units 5-6 (origin/main) rows and reading estimates, with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 en-review is still open for Unit 3; the reviewer should confirm the currency of cited constitutional provisions under the 1973 Constitution (Articles 8-28 and Article 5).
  - Urdu G4/G5 is a separate downstream job; Unit 3 stays under the required untranslated notice.
  - The tracker now carries Unit 1, 2, 3, 4, 5 and 6 rows; the next unit job should re-point its G2 row only if its evidence file changes.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
