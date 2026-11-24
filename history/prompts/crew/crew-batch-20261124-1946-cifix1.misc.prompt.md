---
id: crew-batch-20261124-1946-cifix1
title: crew fix EFMP-408 unit 3 MDX build
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
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/773
files:
 - history/prompts/crew/crew-batch-20261124-1946-cifix1.misc.prompt.md
 - docs/semester-4/efmp-408/unit-03/topic-01.mdx
 - specs/content/efmp-408/reviews/unit-03/G2/20261124T200357258Z-gates.json
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T200357258Z/check-bloom-bands.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T200357258Z/check-concept-graph.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T200357258Z/check-depth-gate.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T200357258Z/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T200357258Z/check-figures.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T200357258Z/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T200357258Z/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T200357258Z/validate-content.txt
 - specs/content/efmp-408/tasks.md
tests:
 - npm run build:content-status && npm run check:content (14/14 PASS)
 - node .crew/mdx-check.mjs on all seven PR-touched MDX files (compile OK; LaTeX negative control still fails with the CI acorn error)
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

Read the failed build log for PR #773: Docusaurus MDX compilation failed on
`docs/semester-4/efmp-408/unit-03/topic-01.mdx` at line 77 ("Could not parse expression with acorn").
The file carried a LaTeX display block (`$$\text{Weightage}...`) and four inline `$...$` spans; this repo has no
math plugin, so the braces were read as MDX expressions. Rewrote the weightage formula and the four worked-example
lines as plain text (using `×` and `≈`, matching the plain-math convention already used in
`unit-assessment.mdx`). Committed, regenerated the Unit 3 G2 gate evidence with
`node scripts/prepare-gate-evidence.mjs efmp-408 3`, repointed the Unit 3 G2 en-draft tracker row at the new
evidence file, committed that, then rebuilt content status and ran the content gates.

## Outcome

- Impact: fix for EFMP-408 Unit 3 by claude_crew (attempt 1); the PR #773 build break is resolved.
- Tests: npm run check:content passed 14/14 in the job worktree; every PR-touched MDX file compiled with the
  `@mdx-js/mdx` processor, and a negative control carrying the original LaTeX still reproduced the CI acorn error.
- Files: 13 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: replaced the LaTeX weightage formula in Unit 3 Topic 1 with plain text so MDX compiles;
  refreshed Unit 3 G2 evidence and repointed its tracker row.
- Decisions the team must respect: the repo has no math plugin, so formulas stay plain text (no `$$`, no `\text{}`).
  G3/G5 stay advisory; this PR certifies nothing.
- Pending / next owner: crew lead (auto-merge when CI is green).
- Notes for the next job on this unit:
  - `npm run build` was not run locally (forbidden by the brief); CI's build job still has to confirm the acorn
    error is gone.
  - The old Unit 3 G2 evidence set (`20261124T184540786Z-gates.json` and its logs dir) is now unreferenced and was
    left in place, matching the earlier Unit 4 precedent.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: an authored unit shipped LaTeX math into a repo with no math plugin; the first CI run
  stops at the first MDX parse failure, so later files in the same PR were never checked.
- Graders run and results (PASS/FAIL): check:content PASS 14/14; MDX compile PASS on 7/7 files; negative control FAIL
  (expected, reproduces CI).
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none.
