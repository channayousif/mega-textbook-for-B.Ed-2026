---
id: crew-batch-20261125-1216-cifix1
title: crew fix efmp-409-u04 figure-geometry
stage: misc
date: 2026-11-25
surface: agent
model: claude_crew
feature: crew
branch: crew/batch-20261125-1216
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: history/adr/0012-figure-rendering-component-manifest-lifecycle-and-the-generate-figures-skill.md
  pr: null
files:
 - static/img/figures/efmp-409/unit-04/fig-U4-4.ur.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-4.ur.dark.svg
 - history/prompts/crew/crew-batch-20261125-1216-cifix1.misc.prompt.md
tests:
 - npm run check:content
 - node scripts/measure-figure-text.mjs --ci-fonts --changed origin/main
---

## Prompt

# Crew job batch-20261125-1216-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261125-1216`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #792 (checks: figure-geometry). Run `gh pr checks 792` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#792) changes, which belong to the crew jobs efmp-409-u05-author, efmp-409-u04-translate. Change only what the merge or CI needs.

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
- (batch-20261124-2201-cifix1, fix, claude_crew) CI's figure-geometry job still has to confirm on the PR, though the local `--ci-fonts --changed 8fa83e44...` run is the same measurement and exits 0.
- (batch-20261124-2201-cifix1, fix, claude_crew) This PR certifies nothing; G3 and the Unit 3 Urdu mirror remain open.
- (batch-20261124-1946-cifix1, fix, claude_crew) CI's build job still has to confirm the acorn error is gone (`npm run build` was not run locally, per the brief); the now-unreferenced old evidence set `20261124T184540786Z-gates.json` and its logs dir were left in place, matching the earlier Unit 4 precedent.
- (batch-20261124-1946-cifix1, fix, claude_crew) G3 and the Urdu mirror for Unit 3 remain open; this PR certifies nothing.
- (batch-20261124-1845-cifix1, fix, claude_crew) CI measures changed SVGs with a DejaVu Sans fallback and no Noto Nastaliq; local default-font runs can pass a file CI fails, so always re-check with `--ci-fonts`.

## Response snapshot

Wrapped the two over-wide Urdu headings in `static/img/figures/efmp-409/unit-04/fig-U4-4.ur.svg`
("قانون کی نظر میں برابری" and "حقوق و فرائض میں توازن") onto two lines each, matching the two-line
pattern already used in rows 2 and 6 of the same table, then regenerated its derived dark variant with
`scripts/build-figure-variants.mjs`. The CI figure-geometry overlap is cleared.

## Outcome

- Impact: fix for efmp-409 unit-04 Urdu figure geometry (attempt 1).
- Tests: `npm run check:content` passed; `node scripts/measure-figure-text.mjs --ci-fonts` exits 0 on both
  edited files and on the whole `--changed origin/main` set.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives this unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: the two-line re-break of the two long Urdu headings in `fig-U4-4.ur.svg`, with the
  derived `.ur.dark.svg` regenerated; the CI figure-geometry overlap is cleared.
- Decisions the team must respect: a `.dark.svg` is derived from its light source by
  `scripts/build-figure-variants.mjs` and is never hand-edited. A Urdu-only figure edit does not stale a
  unit's G2 evidence, because that evidence binds the English SVGs only.
- Pending / next owner: CI's figure-geometry job still has to confirm on the PR. G3 and the unit-03 Urdu
  mirror remain open; this PR certifies nothing.
- Paperclip issues affected: none (work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: two Urdu column headings were wider than their 170px column and printed over the
  adjacent column; CI's DejaVu Sans fallback measurement caught what a default-font local run can miss.
- Graders run and results (PASS/FAIL): check:content PASS; measure-figure-text --ci-fonts PASS.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
