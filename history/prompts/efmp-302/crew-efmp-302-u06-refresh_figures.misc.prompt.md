---
id: crew-efmp-302-u06-refresh_figures
title: crew refresh_figures EFMP-302 unit 6
stage: misc
date: 2026-11-25
surface: agent
model: claude
feature: efmp-302
branch: crew/efmp-302-u06-refresh_figures
user: crew
command: crew refresh_figures
labels: ["crew", "claude", "refresh_figures"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-302/reviews/unit-06/G2/20261125T173248874Z-gates.json
 - specs/content/efmp-302/reviews/unit-06/G2/logs-20261125T173248874Z/check-bloom-bands.txt
 - specs/content/efmp-302/reviews/unit-06/G2/logs-20261125T173248874Z/check-concept-graph.txt
 - specs/content/efmp-302/reviews/unit-06/G2/logs-20261125T173248874Z/check-depth-gate.txt
 - specs/content/efmp-302/reviews/unit-06/G2/logs-20261125T173248874Z/check-docs-sync.txt
 - specs/content/efmp-302/reviews/unit-06/G2/logs-20261125T173248874Z/check-figures.txt
 - specs/content/efmp-302/reviews/unit-06/G2/logs-20261125T173248874Z/check-no-answer-keys.txt
 - specs/content/efmp-302/reviews/unit-06/G2/logs-20261125T173248874Z/check-no-em-dash.txt
 - specs/content/efmp-302/reviews/unit-06/G2/logs-20261125T173248874Z/validate-content.txt
 - specs/content/efmp-302/tasks.md
 - specs/content/svg-style-baseline.json
 - static/img/figures/efmp-302/unit-06/fig-U6-1.dark.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-1.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-1.ur.dark.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-1.ur.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-2.dark.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-2.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-2.ur.dark.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-2.ur.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-3.dark.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-3.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-3.ur.dark.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-3.ur.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-4.dark.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-4.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-4.ur.dark.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-4.ur.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-5.dark.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-5.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-5.ur.dark.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-5.ur.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-6.dark.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-6.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-6.ur.dark.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-6.ur.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-7.dark.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-7.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-7.ur.dark.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-7.ur.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-8.dark.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-8.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-8.ur.dark.svg
 - static/img/figures/efmp-302/unit-06/fig-U6-8.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-302-u06-refresh_figures

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u06-refresh_figures`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Redraw the placed SVG schematics of EFMP-302 Unit 6 to the improved standard (Feature 032 phase D, D-2026-0097/0098; owner, 2026-11-23: "we can rewrite existing figures and diagrams to improved versions"). Read `.claude/skills/generate-figures/references/svg-authoring.md` (structure layers and ids, connectors, grid, flowchart shapes, the self-check) and `references/bilingual-figures.md`. For every `static/img/figures/efmp-302/unit-06/fig-*.svg` without `id="layer-nodes"`: redraw it as the same figure, keeping its file name, figure id, alt text, manifest row and meaning (a visual redraw, never a content change: no new facts, labels or arrows the text does not support). A complex picture (people, rooms, objects, dense pictograms) is not redrawn as SVG: leave it and say so in your handoff, since D-2026-0098 makes it a raster for the owner to schedule. Rebuild each Urdu twin from the new English drawing with the Urdu labels of the old `.ur.svg`, then `node scripts/mirror-figure-rtl.mjs <file.ur.svg>` (never a whole-drawing transform); number lines, charts and curves keep their left-to-right axes. Run `npm run figures:variants`, `node scripts/measure-figure-text.mjs <every changed svg>` until it exits 0, and `npm run check:svg-style`. Render every changed figure, English beside Urdu, with `scripts/heavy.sh` and read the images: every label visible (no text on a dark shape drawn ink on ink, nothing painted over by a later shape), nothing clipped, Urdu right to left. Commit, then `scripts/heavy.sh node scripts/prepare-gate-evidence.mjs EFMP-302 6` (repoint the G2 row) and `npm run check:content`. If the unit's latest G3 row is ⏳ or carries an agent report, append a ▢ G3 row: "figures redrawn (Feature 032); the review above predates it; needs a fresh G3 run". Do not edit topic MDX, assessments or any other unit.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-302 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-302/`, and `static/img/figures/efmp-302/unit-06/`.

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
- (efmp-302-u06-repair_en-r1, repair_en, opencode) S3 full-text source verification remains uncertain; no Unit 6 source excerpt is bound under `specs/content/efmp-302/sources/texts/`.
- (efmp-302-u06-repair_en-r1, repair_en, opencode) X1 generic scroll-region names need platform work outside unit scope; browser inspection remains pending under the brief's restrictions.
- (efmp-302-u06-repair_en-r1, repair_en, opencode) A fresh independent G3 review needs owner authorisation under G-2026-64 / ADR-0019 (D-2026-0005).
- (efmp-302-u06-repair_en, repair_en, codex) Browser inspection remains pending under the brief’s restrictions.
- (efmp-302-u06-repair_en, repair_en, codex) Full-text source verification remains uncertain; shared scroll-region naming needs platform work.


## Response snapshot

Redrew EFMP-302 Unit 6's eight SVG figures (English, Urdu and dark versions) to the layered Feature 032 standard with no content change, refreshed the G2 evidence and added a G3 row asking for a fresh review.

## Outcome

- Impact: refresh_figures for EFMP-302 Unit 6 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 43 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Redrew EFMP-302 Unit 6's eight SVG figures (English, Urdu and dark versions) to the layered Feature 032 standard with no content change, refreshed the G2 evidence and added a G3 row asking for a fresh review.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The fig-U6-1 to fig-U6-8 Urdu SVGs carry three spelling fixes (فراہمی, ناہمواری, قطار) and wrap some labels onto new lines; the next G5 review should check them against the Urdu topic text.
  - A fresh G3 run is still needed and needs owner authorisation (G-2026-64 / ADR-0019); the earlier S3 source and X1 scroll-region notes are unchanged.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
