---
id: crew-gcce-400-u07-author-conflict1
title: crew fix GCCE-400 unit 7
stage: misc
date: 2026-11-23
surface: agent
model: claude_crew
feature: gcce-400
branch: crew/gcce-400-u07-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - glossary.json
 - specs/content/gcce-400/sources/texts/openstax-sociology-3e.md
 - specs/content/gcce-400/tasks.md
 - history/prompts/gcce-400/crew-gcce-400-u07-author-conflict1.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gcce-400-u07-author-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u07-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/gcce-400-u07-author conflicts with main (glossary.json, specs/content/gcce-400/sources/texts/openstax-sociology-3e.md, specs/content/gcce-400/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GCCE-400 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-07/`.

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
- (gcce-400-u07-author, author, claude_crew) The 2023 census narrative states a national male-female literacy gap of 16.16 percentage points while its own summary table shows 68.00 and 52.84; the unit quotes the table values and the discrepancy is recorded in sources/unit-07.md.
- (gcce-400-u07-author, author, claude_crew) kymlicka-norman-2000 and youniss-levine-2009 are print-only and declared under `## Unverifiable sources`; G3 should confirm the framing attributed to them, as Units 1 and 2 were asked to.
- (gcce-400-u07-author, author, claude_crew) course-overview.mdx still introduces only Unit 1 (left unchanged because it is bound into every unit's G2 evidence); banner fig-U7-9 is prompt-only and there are no .ur.svg files yet.

## Response snapshot

Merged origin/main into crew/gcce-400-u07-author and resolved three conflicts. glossary.json keeps main's twelve new terms first, then this branch's six Unit 7 terms, with no duplicate keys. specs/content/gcce-400/tasks.md keeps main's Units 1-6 rows and stage rows, adds this branch's Unit 7 row and stage rows, and carries the Unit 7 reading-estimate paragraph after main's Unit 6 paragraph. specs/content/gcce-400/sources/texts/openstax-sociology-3e.md is an add/add source-evidence file, so it now holds a shared Source/Consulted/Locator header, main's Unit 5 evidence notes, then this branch's Unit 7 evidence notes. All 14 content gates pass.

## Outcome

- Impact: fix for GCCE-400 Unit 7 by claude_crew (attempt 1).
- Tests: npm run check:content passed (14 of 14 gates) in the job worktree.
- Files: 4 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gcce-400-u07-author; resolved glossary.json, specs/content/gcce-400/tasks.md and specs/content/gcce-400/sources/texts/openstax-sociology-3e.md by keeping both sides' entries, main's order first; all 14 content gates pass.
- Decisions the team must respect: Unit 7's English draft is unchanged by the merge and its existing G2 en-draft evidence and tracker row still stand; G3/G5 stay open and nothing is certified.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - The openstax-sociology-3e.md file is now shared by Unit 5 and Unit 7; Unit 7's own `specs/content/gcce-400/sources/unit-07.md` row and its G2 evidence were not regenerated because no English unit file, unit source list, coverage or concept file changed.
  - Banner fig-U7-9 is prompt-only and no `.ur.svg` exists yet; G3 should confirm the census figures against Table 11 and Table 4.21, the constitutional articles against the current text, and the kymlicka-norman-2000 and youniss-levine-2009 attributions declared unverifiable.
  - The merged tasks.md lists Unit 5's stage rows before Unit 7's (main's order); the tracker's "last row for a unit and stage is authoritative" rule is unaffected.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
