---
id: crew-batch-20261124-1946-cifix1
title: crew fix CREW unit 0
stage: misc
date: 2026-11-24
surface: agent
model: claude_crew
feature: crew
branch: crew/batch-20261124-1946
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efmp-408/unit-03/index.mdx
 - docs/semester-4/efmp-408/unit-03/topic-01.mdx
 - docs/semester-4/efmp-408/unit-03/topic-02.mdx
 - docs/semester-4/efmp-408/unit-03/topic-03.mdx
 - docs/semester-4/efmp-408/unit-03/topic-04.mdx
 - docs/semester-4/efmp-408/unit-03/unit-assessment.mdx
 - docs/semester-4/efmp-408/unit-03/unit-teacher-notes.mdx
 - history/prompts/crew/crew-batch-20261124-1946-cifix1.misc.prompt.md
 - history/prompts/efmp-408/crew-efmp-408-u03-author.green.prompt.md
 - specs/content/efmp-408/concepts/unit-03.md
 - specs/content/efmp-408/coverage/unit-03.md
 - specs/content/efmp-408/figures/unit-03.banner.md
 - specs/content/efmp-408/figures/unit-03.md
 - specs/content/efmp-408/reviews/unit-01/G2/20261124T184857338Z-gates.json
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184857338Z/check-bloom-bands.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184857338Z/check-concept-graph.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184857338Z/check-depth-gate.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184857338Z/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184857338Z/check-figures.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184857338Z/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184857338Z/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184857338Z/validate-content.txt
 - specs/content/efmp-408/reviews/unit-03/G2/20261124T184540786Z-gates.json
 - specs/content/efmp-408/reviews/unit-03/G2/20261124T200357258Z-gates.json
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T184540786Z/check-bloom-bands.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T184540786Z/check-concept-graph.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T184540786Z/check-depth-gate.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T184540786Z/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T184540786Z/check-figures.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T184540786Z/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T184540786Z/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T184540786Z/validate-content.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T200357258Z/check-bloom-bands.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T200357258Z/check-concept-graph.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T200357258Z/check-depth-gate.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T200357258Z/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T200357258Z/check-figures.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T200357258Z/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T200357258Z/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T200357258Z/validate-content.txt
 - specs/content/efmp-408/sources/texts/hec-2013-testdev.md
 - specs/content/efmp-408/sources/texts/seifert-sutton-2009.md
 - specs/content/efmp-408/sources/unit-03.md
 - specs/content/efmp-408/tasks.md
 - static/img/figures/efmp-408/unit-03/fig-U3-1.dark.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-1.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-2.dark.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-2.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-3.dark.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-3.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-4.dark.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-4.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-5.dark.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-5.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-6.dark.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-6.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-7.dark.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-7.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-8.dark.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-8.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261124-1946-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261124-1946`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #773 (checks: build). Run `gh pr checks 773` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#773) changes, which belong to the crew jobs efmp-408-u03-author. Change only what the merge or CI needs.

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
- (batch-20261124-1845-cifix1, fix, claude_crew) CI measures changed SVGs with a DejaVu Sans fallback and no Noto Nastaliq; local default-font runs can pass a file CI fails, so always re-check with `--ci-fonts`.
- (batch-20261124-1845-cifix1, fix, claude_crew) The dark variant is derived from the light source by `scripts/build-figure-variants.mjs`; never hand-edit `.dark.svg`.
- (batch-20261124-1300-cifix1, fix, claude_crew) The unit-06 G2 evidence hashes only the English SVGs, so this Urdu-only figure edit does not stale it; no gate-evidence refresh was needed.
- (batch-20261124-1300-cifix1, fix, claude_crew) The Urdu header row is now two lines for "ملکیت کی قسم" and "یہ کس چیز کا تحفظ کرتی ہے"; the English figure is unchanged.
- (batch-20261124-0800-cifix1, fix, claude_crew) The repo has no math plugin, so any `$$...$$` or `\text{...}` in prose breaks the build; keep formulas as plain bold text.


## Response snapshot

Replaced the LaTeX weightage formula in EFMP-408 Unit 3 Topic 1 with plain text to fix the MDX build break, refreshed the Unit 3 G2 evidence and tracker row, and committed the fix plus its PHR with all content gates passing.

## Outcome

- Impact: fix for CREW Unit 0 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 60 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Replaced the LaTeX weightage formula in EFMP-408 Unit 3 Topic 1 with plain text to fix the MDX build break, refreshed the Unit 3 G2 evidence and tracker row, and committed the fix plus its PHR with all content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - CI's build job still has to confirm the acorn error is gone (`npm run build` was not run locally, per the brief); the now-unreferenced old evidence set `20261124T184540786Z-gates.json` and its logs dir were left in place, matching the earlier Unit 4 precedent.
  - G3 and the Urdu mirror for Unit 3 remain open; this PR certifies nothing.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
