---
id: crew-gent-401-u05-author-conflict3
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
 - history/prompts/gent-401/crew-gent-401-u05-author-conflict3.misc.prompt.md
tests:
 - npm run check:content
 - node scripts/measure-figure-text.mjs static/img/figures/gent-401/unit-05/*.svg
---

## Prompt

# Crew job gent-401-u05-author-conflict3

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/gent-401-u05-author conflicts with main (specs/content/gent-401/sources/texts/openstax-entrepreneurship.md, specs/content/gent-401/sources/texts/scott-2017-efmd.md, specs/content/gent-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

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
- (gent-401-u05-author-conflict2, fix, claude_crew) Unit 5's Urdu mirror, `.ur.svg` variants and the `fig-U5-5` illustrate row remain open for separate G4/G5 and illustrate jobs; EN index stays `translation_status: draft`.
- (gent-401-u05-author-conflict2, fix, claude_crew) G3 should confirm the Polish, Indonesian and MSME substitute sources are not read as Pakistani evidence and that Imran's tuition-centre figures are the author's teaching device (`specs/content/gent-401/sources/unit-05.md`).
- (gent-401-u05-author-conflict2, fix, claude_crew) The merged `scott-2017-efmd.md` is now a three-section shared file (Units 3, 4, 5); the next merge should expect the Unit 4 section from main to stay ahead of Unit 5.
- (gent-401-u05-author-conflict1, fix, claude_crew) Unit 5 Urdu mirror, `.ur.svg` variants and the `fig-U5-5` illustrate job remain open for separate G4/G5 and illustrate jobs.
- (gent-401-u05-author-conflict1, fix, claude_crew) G3 should confirm the Polish and Indonesian substitute sources are not read as Pakistani evidence and that Imran's tuition-centre figures are the author's teaching device (`specs/content/gent-401/sources/unit-05.md`).

## Response snapshot

`git fetch origin` followed by `git merge origin/main` reported "Already up to date": origin/main (6f358f0eb) is already an ancestor of this branch, merged by the previous conflict job in cae484b38. Verified the three conflicted files keep both sides (main's Unit 3 and Unit 4 sections ahead of this branch's Unit 5 section in openstax-entrepreneurship.md and scott-2017-efmd.md; main's Unit 1-4 tracker rows ahead of this branch's Unit 5 rows in tasks.md), confirmed glossary.json gained 70 lines with no duplicate terms and no ID collisions, ran build:content-status then check:content (all 14 gates pass) and measure-figure-text on the Unit 5 SVGs (exit 0), then committed this PHR.

## Outcome

- Impact: verification pass for GENT-401 Unit 5 by claude_crew (attempt 3); no content change was needed because the merge was already complete.
- Tests: npm run check:content passed (14/14); measure-figure-text exited 0 on all eight Unit 5 SVGs.
- Files: 1 file, listed above.
- Next prompts: the crew planner should stop re-queueing conflict repairs for gent-401-u05-author; the branch is merged with origin/main and green.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: confirmed crew/gent-401-u05-author already contains origin/main and that the three conflict resolutions are additive (both sides kept, main first), then committed this PHR.
- Decisions the team must respect: no new decision; G3/G5 stay advisory and nothing is certified by this job.
- Pending / next owner: crew lead (do not re-queue conflict1..N for this unit; it is merged and green).
- Notes for the next job on this unit:
  - Unit 5's Urdu mirror, `.ur.svg` variants and the `fig-U5-5` illustrate row remain open for separate G4/G5 and illustrate jobs; EN index stays `translation_status: draft`.
  - G3 should confirm the Polish, Indonesian and MSME substitute sources are not read as Pakistani evidence and that Imran's tuition-centre figures are the author's teaching device (`specs/content/gent-401/sources/unit-05.md`).
  - The merged `scott-2017-efmd.md` is a three-section shared file (Units 3, 4, 5); the next merge should expect the Unit 4 section from main to stay ahead of Unit 5.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS (14/14); measure-figure-text PASS (exit 0)
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
