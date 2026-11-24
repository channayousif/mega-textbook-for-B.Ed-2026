---
id: crew-batch-20261124-2201-cifix1
title: crew fix EFMP-408 Unit 6 figure geometry
stage: misc
date: 2026-11-24
surface: agent
model: claude_crew
feature: crew
branch: crew/batch-20261124-2201
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: 776
files:
 - static/img/figures/efmp-408/unit-06/fig-U6-3.ur.svg
 - static/img/figures/efmp-408/unit-06/fig-U6-3.ur.dark.svg
 - static/img/figures/efmp-408/unit-06/fig-U6-5.ur.svg
 - static/img/figures/efmp-408/unit-06/fig-U6-5.ur.dark.svg
 - static/img/figures/efmp-408/unit-06/fig-U6-7.ur.svg
 - static/img/figures/efmp-408/unit-06/fig-U6-7.ur.dark.svg
 - history/prompts/crew/crew-batch-20261124-2201-cifix1.misc.prompt.md
tests:
 - npm run check:content
 - node scripts/measure-figure-text.mjs --ci-fonts (44 changed SVGs)
 - node scripts/build-figure-variants.mjs --check
---

## Prompt

# Crew job batch-20261124-2201-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261124-2201`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #776 (checks: figure-geometry). Run `gh pr checks 776` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#776) changes, which belong to the crew jobs efmp-408-u05-author, efmp-408-u06-translate, efmp-408-u03-translate. Change only what the merge or CI needs.

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
- (batch-20261124-1946-cifix1, fix, claude_crew) CI's build job still has to confirm the acorn error is gone (`npm run build` was not run locally, per the brief); the now-unreferenced old evidence set `20261124T184540786Z-gates.json` and its logs dir were left in place, matching the earlier Unit 4 precedent.
- (batch-20261124-1946-cifix1, fix, claude_crew) G3 and the Urdu mirror for Unit 3 remain open; this PR certifies nothing.
- (batch-20261124-1845-cifix1, fix, claude_crew) CI measures changed SVGs with a DejaVu Sans fallback and no Noto Nastaliq; local default-font runs can pass a file CI fails, so always re-check with `--ci-fonts`.
- (batch-20261124-1845-cifix1, fix, claude_crew) The dark variant is derived from the light source by `scripts/build-figure-variants.mjs`; never hand-edit `.dark.svg`.
- (batch-20261124-1300-cifix1, fix, claude_crew) The unit-06 G2 evidence hashes only the English SVGs, so this Urdu-only figure edit does not stale it; no gate-evidence refresh was needed.

## Response snapshot

Re-broke three Urdu figure labels that overflowed their table column under the CI DejaVu Sans fallback (fig-U6-3 row 3 "3. آن لائن سی بی ٹی", fig-U6-5 header "خلاف ورزی کی نوعیت", fig-U6-7 student-role row "طالب علم کا کردار"), regenerated the derived dark variants, and confirmed every changed SVG passes measure-figure-text with --ci-fonts and all content gates pass.

## Outcome

- Impact: fix for EFMP-408 Unit 6 figure geometry by claude_crew (attempt 1).
- Tests: npm run check:content PASS; measure-figure-text --ci-fonts PASS on all 44 SVGs changed by the PR; build-figure-variants --check OK (1669 figures).
- Files: 7 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Re-broke three Urdu labels in EFMP-408 Unit 6 figures so they fit the CI fallback font, and regenerated the three derived dark variants. No English unit file, manifest, source, coverage or concept changed.
- Decisions the team must respect: the unit-06 G2 evidence hashes only the English SVGs, so this Urdu-only figure edit does not stale it and no gate-evidence refresh was run; dark variants are derived by scripts/build-figure-variants.mjs and are never hand-edited.
- Pending / next owner: crew lead (auto-merge when CI is green). CI's figure-geometry job still has to confirm the fix on the PR.
- Notes for the next job on this unit:
  - G3 and the Urdu mirror for Unit 3 remain open; this PR certifies nothing.
  - CI measures changed SVGs with a DejaVu Sans fallback and no Noto Nastaliq, so always re-check figure edits with `--ci-fonts`.

## Evaluation notes (flywheel)

- Failure modes observed: under the CI DejaVu Sans fallback, Urdu labels measure wider than under Noto Nastaliq, so a right-column label can cross its divider and overlap the neighbouring column.
- Graders run and results (PASS/FAIL): check:content PASS; measure-figure-text --ci-fonts PASS (44 files); build-figure-variants --check PASS.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
