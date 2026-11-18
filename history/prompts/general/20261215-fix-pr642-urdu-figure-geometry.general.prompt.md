---
id: 20261215
title: Fix PR642 Urdu figure text geometry
stage: general
date: 2026-11-18
surface: opencode
model: longcat/LongCat-2.0
feature: efpg-401
branch: crew/batch-20261118-0430
user: crew
command: Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.
labels: [opencode, crew, ci-fix, efpg-401]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/642
files:
  - static/img/figures/efpg-401/unit-05/fig-U5-4.ur.svg
  - static/img/figures/efpg-401/unit-05/fig-U5-4.ur.dark.svg
  - static/img/figures/efpg-401/unit-05/fig-U5-5.ur.svg
  - static/img/figures/efpg-401/unit-05/fig-U5-5.ur.dark.svg
  - static/img/figures/efpg-401/unit-05/fig-U5-13.ur.svg
  - static/img/figures/efpg-401/unit-05/fig-U5-13.ur.dark.svg
  - history/prompts/general/20261215-fix-pr642-urdu-figure-geometry.general.prompt.md
tests:
  - npm run check:content (14/14 gates PASS)
  - scripts/heavy.sh node scripts/measure-figure-text.mjs on the six edited SVGs (PASS)
  - DejaVu Sans CI-fallback simulation of the six edited SVGs (PASS)
  - FIGURE_ROOT=static/img/figures/efpg-401/unit-05 node scripts/build-figure-variants.mjs --check (28 figures PASS)
---

## Prompt

# Crew job batch-20261118-0430-cifix1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261118-0430`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #642 (checks: figure-geometry). Run `gh pr checks 642` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#642) changes, which belong to the crew jobs gqur-301-u15-plan_illustrations, intel-2026-11-18-distill, efpg-401-u05-translate. Change only what the merge or CI needs.

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
- (batch-20261110-2101-cifix1, fix, agy) Local Playwright resolves a narrower Nastaliq face than CI's fallback, so local measure-figure-text passes these SVGs even at 14px; the repair was validated against CI fallback font simulation.
- (batch-20261110-2101-cifix1, fix, agy) CI figure-geometry must confirm the repair on the next run; no G3/G5 status, evidence, or publication state was touched.
- (batch-20261110-1800-cifix1, fix, opencode) Local Playwright resolves a narrower Nastaliq face than CI's fallback, so local measure-figure-text passes these SVGs even at 14px; the 13px repair was sized from CI's measured widths (3.5px gap and 6.9px overlap become about 16.8px and 7.2px).
- (batch-20261110-1800-cifix1, fix, opencode) CI figure-geometry must confirm the repair on the next run; no G3/G5 status, evidence or publication state was touched.
- (batch-20261110-1201-cifix1, fix, agy) Rebalanced the three-line wrap for the row 2 paraphrased principle in GISS-401 Unit 2 `fig-U2-3.ur.svg` and `fig-U2-3.ur.dark.svg` to keep glyph advances inside the 270px panel margin.

## Response snapshot

Read PR #642 checks and failed run 44237946379 (figure-geometry). CI measured four overlaps in the EFPG-401 Unit 5 Urdu schematics: 11.8px in `fig-U5-4.ur.svg` and its dark variant ("آغاز کی سرگرمی" into the two purpose lines), 3.2px in `fig-U5-5.ur.svg` and its dark variant ("جوڑیوں میں کام" into the class-size line), and 6.4px / 5.2px in `fig-U5-13.ur.svg` and its dark variant (two long teacher-action lines into the pupil-action column). Reproduced CI's fallback metrics locally by measuring the same files with the font stack forced to DejaVu Sans, which matched CI's widths exactly (11.8 / 3.2 / 6.4 / 5.2). Reduced `.sh` from 14px to 13px in fig-U5-4 and fig-U5-5, reduced `.body` from 14px to 13px in fig-U5-13, and moved the purpose-column anchor in fig-U5-4 from x=625 to x=615 so the stage header clears the purpose text. Applied the same edits to both light and dark variants.

## Outcome

- ✅ Impact: Minimal geometry repair; no label, translation or figure meaning changed.
- 🧪 Tests: All 14 content gates PASS; measure-figure-text passes on all six edited SVGs under both local Noto Nastaliq and the DejaVu CI-fallback simulation; scoped variant freshness PASS.
- 📁 Files: Six SVG style/coordinate values and this PHR.
- 🔁 Next prompts: CI figure-geometry must confirm the repair on the next run.
- 🧠 Reflection: CI's wider fallback makes 13px alone insufficient for the longest stage header; the column anchor needed a 10px shift as well.

## Handoff (for CEO and agents)

- Shipped / changed: `.sh` 14px to 13px in `fig-U5-4.ur.svg`, `fig-U5-4.ur.dark.svg`, `fig-U5-5.ur.svg`, `fig-U5-5.ur.dark.svg`; `.body` 14px to 13px in `fig-U5-13.ur.svg`, `fig-U5-13.ur.dark.svg`; purpose-column anchor `x="625"` to `x="615"` in both fig-U5-4 variants.
- Decisions the team must respect: No G3/G5 status, publication state, reviewer registry or evidence changes. No push and no PR opened. No em dash introduced.
- Pending / next owner: CI figure-geometry on PR #642.
- Paperclip issues affected: PR #642; crew job batch-20261118-0430-cifix1.

## Evaluation notes (flywheel)

- Failure modes observed: Urdu subheadings and long body lines overflow their columns under CI's DejaVu fallback; local Playwright passes because it resolves the narrower Noto Nastaliq face.
- Graders run and results (PASS/FAIL): check:content PASS (14/14); measure-figure-text PASS (local and DejaVu simulation); build-figure-variants --check PASS.
- Prompt variant (if applicable): crew brief v1.
- Next experiment (smallest change to try): Confirm PR #642 CI passes.
