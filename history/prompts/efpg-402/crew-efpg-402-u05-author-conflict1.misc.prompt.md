---
id: crew-efpg-402-u05-author-conflict1
title: crew merge-conflict resolution EFPG-402 unit 5
stage: misc
date: 2026-11-27
surface: agent
model: claude_crew
feature: efpg-402
branch: crew/efpg-402-u05-author
user: crew
command: crew merge
labels: ["crew", "claude_crew", "merge"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efpg-402/sources/texts/bscs-2006-5e.md
 - specs/content/efpg-402/tasks.md
 - specs/content/efpg-402/reviews/unit-05/G2/20261127T132231832Z-gates.json
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T132231832Z/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T132231832Z/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T132231832Z/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T132231832Z/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T132231832Z/check-figures.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T132231832Z/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T132231832Z/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T132231832Z/validate-content.txt
 - history/prompts/efpg-402/crew-efpg-402-u05-author-conflict1.misc.prompt.md
tests:
 - npm run check:content (14/14 gates PASS)
 - node scripts/prepare-gate-evidence.mjs EFPG-402 5 (8/8 draft gates PASS)
---

## Prompt

# Crew job efpg-402-u05-author-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/efpg-402-u05-author conflicts with main (specs/content/efpg-402/sources/texts/bscs-2006-5e.md, specs/content/efpg-402/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFPG-402 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-05/`.

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
- (efpg-402-u05-author, author, agy2) Urdu mirror job (G4) will need to localize the 10 placed SVGs (.ur.svg twins) and unit prose; G3 English review remains open for independent review.
- (efpg-402-u05-author, author, agy2) Unit banner (unit-05.banner.md) is not yet drafted and will be planned during raster illustration passes.

## Response snapshot

`git merge origin/main` produced two conflicts. `specs/content/efpg-402/sources/texts/bscs-2006-5e.md` was add/add: main had a 14-item excerpt set with a Unit 3 use map, this branch had five phase-bound quotes for Unit 5. `specs/content/efpg-402/tasks.md` was a content conflict where main added Unit 3 and Unit 4 rows and this branch added Unit 5 rows.

Resolution: in the source text, kept main's excerpt list, consultation note and Unit 3 use map first, then appended this branch's five 5E phase quotes under a separate Unit 5 heading, merging the two near-identical citation headers into one block. In the tracker, kept main's Unit 3 and Unit 4 table and stage rows, then this branch's Unit 5 rows, and widened the status line to Units 1, 2, 4 and 5. Committed the merge, then re-ran the draft gates because a bound source text changed, and repointed the Unit 5 G2 row.

## Outcome

- Impact: the branch now contains main's Unit 3 and Unit 4 work and this branch's Unit 5 work with no conflict markers; Unit 5 G2 evidence is refreshed against the merged tree.
- Tests: all 14 content gates PASS; 8/8 draft gates PASS for the refreshed evidence.
- Files: the two conflict resolutions, fresh Unit 5 G2 evidence and logs, the tasks.md tracker row, and this PHR.
- Next prompts: Urdu mirror (G4) for Unit 5 and independent G3 English review remain separate jobs.
- Reflection: add/add conflicts on a shared source text are best resolved by keeping both excerpt sets under distinct unit headings rather than choosing one.

## Handoff (for CEO and agents)

- Shipped / changed: `specs/content/efpg-402/sources/texts/bscs-2006-5e.md` now carries both main's Unit 3 excerpts and this branch's Unit 5 phase quotes; `specs/content/efpg-402/tasks.md` carries Units 1 to 5; Unit 5 G2 evidence refreshed to `20261127T132231832Z`.
- Decisions the team must respect: No G3/G5 status, reviewer registry, signed evidence or publication state changed. No push and no PR opened. Zero em dashes.
- Pending / next owner: Urdu mirror (G4) and independent G3 English review for Unit 5; the unit banner is still not drafted.
- Notes for the next job on this unit: `bscs-2006-5e.md` is now shared by Unit 3 and Unit 5, so future edits must keep both the "Unit 3 use" map and the "Key excerpts on the 5E phases (Unit 5 bound excerpt)" section.
- Paperclip issues affected: crew job efpg-402-u05-author-conflict1.

## Evaluation notes (flywheel)

- Failure modes observed: two branches independently creating the same source-text path yields an add/add conflict that a text merge cannot resolve by hunk ordering alone; the tracker conflict is a pure append collision.
- Graders run and results (PASS/FAIL): check:content PASS (14/14); prepare-gate-evidence PASS (8/8).
- Prompt variant (if applicable): crew brief v1.
- Next experiment (smallest change to try): have authoring jobs reuse an existing bound source text and append a unit section instead of re-creating the path.
