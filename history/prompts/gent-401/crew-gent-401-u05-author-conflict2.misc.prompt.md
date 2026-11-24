---
id: crew-gent-401-u05-author-conflict2
title: crew fix GENT-401 unit 5
stage: misc
date: 2026-11-24
surface: agent
model: claude_crew
feature: gent-401
branch: crew/gent-401-u05-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gent-401/crew-gent-401-u05-author-conflict2.misc.prompt.md
 - specs/content/gent-401/sources/texts/scott-2017-efmd.md
 - specs/content/gent-401/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u05-author-conflict2

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/gent-401-u05-author conflicts with main (specs/content/gent-401/sources/texts/scott-2017-efmd.md, specs/content/gent-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENT-401 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-05/`.

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
- (gent-401-u05-author-conflict1, fix, claude_crew) Unit 5 Urdu mirror, `.ur.svg` variants and the `fig-U5-5` illustrate job remain open for separate G4/G5 and illustrate jobs.
- (gent-401-u05-author-conflict1, fix, claude_crew) G3 should confirm the Polish and Indonesian substitute sources are not read as Pakistani evidence and that Imran's tuition-centre figures are the author's teaching device (`specs/content/gent-401/sources/unit-05.md`).
- (gent-401-u05-author-conflict1, fix, claude_crew) `scott-2017-efmd.md` now has one header plus Unit 3 and Unit 5 sections; the branch's duplicate header was dropped as a duplicate of main's.
- (gent-401-u05-author, author, claude_crew) The Urdu mirror and `.ur.svg` files are deliberately absent (separate G4/G5 job; EN index is `translation_status: draft`), and banner `fig-U5-5` is a prompt-only row for the illustrate job.
- (gent-401-u05-author, author, claude_crew) G3 should confirm the three substitute open-access sources (Polish startup financing, MSME break-even, Indonesian crowdfunding) are not read as Pakistani evidence and that Imran's tuition-centre figures are the author's teaching device (`sources/unit-05.md`).

## Response snapshot

Merged origin/main into crew/gent-401-u05-author, resolved the two remaining GENT-401 source and tracker conflicts additively (main's Unit 4 material first, then this branch's Unit 5 material), and confirmed all 14 content gates pass.

## Outcome

- Impact: fix for GENT-401 Unit 5 by claude_crew (attempt 2).
- Tests: npm run check:content passed (14/14 gates) after `npm run build:content-status`.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gent-401-u05-author and resolved the two conflicts, `specs/content/gent-401/sources/texts/scott-2017-efmd.md` and `specs/content/gent-401/tasks.md`, keeping both sides' entries.
- Decisions the team must respect: `scott-2017-efmd.md` now carries Unit 3, then Unit 4 (main), then Unit 5 (branch) sections under one header. `tasks.md` Unit 4 and Unit 5 rows and stage rows are both present, so the tracker is now the union of both sides. No glossary, terminology, gaps or decision-log collision occurred; `specs/decisions/log.md` only gained main's D-2026-0100.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 5 Urdu mirror, `.ur.svg` variants and the `fig-U5-5` illustrate job remain open for separate G4/G5 and illustrate jobs.
  - G3 should confirm the Polish, Indonesian and MSME substitute sources are not read as Pakistani evidence and that Imran's tuition-centre figures are the author's teaching device (`specs/content/gent-401/sources/unit-05.md`).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
