---
id: crew-batch-20261127-2117-cifix1
title: crew fix EFMP-303 unit 3 figure geometry
stage: misc
date: 2026-11-28
surface: agent
model: claude_crew
feature: efmp-303
branch: crew/batch-20261127-2117
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/947
files:
 - static/img/figures/efmp-303/unit-03/fig-U3-4.ur.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-4.ur.dark.svg
 - history/prompts/crew/crew-batch-20261127-2117-cifix1.misc.prompt.md
tests:
 - npm run check:content (14/14 gates PASS)
 - node scripts/measure-figure-text.mjs --ci-fonts --changed 8a962478456e763a24f6cccfbc7961d0651300ae (0 problems)
 - npm run figures:variants:check (OK, 1971 figures)
---

## Prompt

# Crew job batch-20261127-2117-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261127-2117`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #947 (checks: figure-geometry). Run `gh pr checks 947` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#947) changes, which belong to the crew jobs efpg-402-u04-plan_illustrations, guhq-301-u00-teaser_script, efmp-303-u03-refresh_figures, efpg-402-u05-plan_illustrations, efpg-402-u02-illustrate, efpg-402-u07-review_en. Change only what the merge or CI needs.

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
- (batch-20261127-1847-cifix1, fix, claude_crew) CI's figure-geometry job must re-run on PR #939 to confirm; the local `--ci-fonts --changed 4148f598...` run is the same measurement and exits 0.
- (batch-20261127-1847-cifix1, fix, claude_crew) Keep these wrapped two-line forms; restoring the single-line labels reintroduces the DejaVu overlaps. `fig-U7-10.ur.svg` row 1 now has 3 lines and row 4 has 4 lines in the right column where the other columns have 2.
- (batch-20261127-1847-cifix1, fix, claude_crew) EFPG-402 Unit 7 G3/G4/G5 stay open; this job certifies nothing and touched no reviewer registry, evidence or publication state.
- (batch-20261127-1517-cifix1, fix, claude_crew) CI's figure-geometry job must re-run on PR #936 to confirm; the local `--ci-fonts --changed 956c4ba...` run is the same measurement and exits 0.
- (batch-20261127-1517-cifix1, fix, claude_crew) Keep these wrapped two-line forms; restoring the single-line labels reintroduces the DejaVu overlaps. `fig-U4-10.ur.svg` row 2 now has three lines in the right column where the other rows have two (the 68px row fits it).

## Response snapshot

Read `gh pr checks 947` and the failed figure-geometry run 46069466396. `measure-figure-text.mjs --changed 8a962478...` failed on two files: `static/img/figures/efmp-303/unit-03/fig-U3-4.ur.svg` and its dark twin, because the Urdu row-header label `‫مائکرو منصوبہ بندی‬` (Micro planning) is 134px wide in the CI fallback face (DejaVu Sans) but its `قسم` column is only 130px, so it started 2px left of the panel and the holder logic attributed it to the neighbouring `دائرہ` panel, reporting a 132px spill.

Fix: wrapped the label into two lines (`مائکرو` at y=137, `منصوبہ بندی` at y=163, matching the two-line cells in the same row), then regenerated the derived dark variant with `npm run figures:variants`. No English unit file, manifest, sources, coverage or concepts changed, so no G2 evidence refresh was required (the `.ur.svg` assets are not in the G3 input manifest).

## Outcome

- Impact: the figure-geometry job's two failures are cleared; the Urdu table header now sits inside its column.
- Tests: all 14 content gates PASS; the full `--ci-fonts --changed 8a962478...` measurement reports 0 problems; `figures:variants:check` OK.
- Files: the Urdu light and dark figure SVGs, plus this PHR.
- Next prompts: CI figure-geometry must re-run and confirm on PR #947.
- Reflection: the holder rule assigns a centred label to the panel containing its left edge, so a label a few px wider than its column is reported as a large spill against the wrong neighbour. Wrapping is the established remedy.

## Handoff (for CEO and agents)

- Shipped / changed: wrapped the EFMP-303 Unit 3 Urdu `مائکرو منصوبہ بندی` row header onto two lines in `fig-U3-4.ur.svg` and regenerated `fig-U3-4.ur.dark.svg`.
- Decisions the team must respect: no G3/G5 status, reviewer registry, signed evidence, publication state or figure manifest changed. No push and no PR opened. Zero em dashes.
- Pending / next owner: CI figure-geometry on PR #947.
- Notes for the next job on this unit: keep the two-line form; restoring the single-line label reintroduces the 132px DejaVu spill. The `قسم` column is 130px wide, the narrowest in the Urdu table.
- Paperclip issues affected: PR #947; crew job batch-20261127-2117-cifix1.

## Evaluation notes (flywheel)

- Failure modes observed: a centred Urdu label 4px wider than its 130px column starts 2px into the neighbouring panel, so the holder rule reports a 132px spill against the wrong panel; local measurement with Noto Nastaliq installed does not reproduce CI, so `--ci-fonts` is required.
- Graders run and results (PASS/FAIL): check:content PASS (14/14); measure-figure-text --ci-fonts --changed PASS (0 problems); figures:variants:check PASS.
- Prompt variant (if applicable): crew brief v1.
- Next experiment (smallest change to try): teach the holder rule to prefer the panel containing the text's centre, so a centred label is measured against its own column.
