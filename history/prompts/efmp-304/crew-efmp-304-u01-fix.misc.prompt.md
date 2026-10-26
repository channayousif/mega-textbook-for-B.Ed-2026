---
id: crew-efmp-304-u01-fix
title: crew fix EFMP-304 unit 1
stage: misc
date: 2026-10-26
surface: agent
model: opencode
feature: efmp-304
branch: crew/efmp-304-u01-fix
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-304/unit-01/topic-02.mdx
 - docs/semester-2/efmp-304/unit-01/topic-04.mdx
 - history/prompts/general/2429-efmp-304-u01-fix-figure-text-geometry.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-04.mdx
 - specs/content/efmp-304/reviews/unit-01/G2/20261026T234000836Z-gates.json
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261026T234000836Z/check-bloom-bands.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261026T234000836Z/check-concept-graph.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261026T234000836Z/check-depth-gate.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261026T234000836Z/check-docs-sync.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261026T234000836Z/check-figures.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261026T234000836Z/check-no-answer-keys.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261026T234000836Z/check-no-em-dash.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261026T234000836Z/validate-content.txt
 - specs/content/efmp-304/tasks.md
 - static/img/figures/efmp-304/unit-01/fig-U1-1.ur.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-1.ur.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-2.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-2.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-3.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-3.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-3.ur.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-3.ur.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-5.ur.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-5.ur.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-6.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-6.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-7.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-7.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-9.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-9.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u01-fix

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u01-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (37 in total; PR #339 added the overlap and spill checks): fig-U1-1.ur.svg (1), fig-U1-2.svg (7), fig-U1-3.svg (1), fig-U1-3.ur.svg (1), fig-U1-5.ur.svg (1), fig-U1-6.svg (12), fig-U1-7.svg (2), fig-U1-9.svg (12). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/efmp-304/unit-01/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs EFMP-304 1, point the unit's G2 en-draft row in specs/content/efmp-304/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

## Scope
EFMP-304 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-01/`.

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
- (efmp-304-u01-repair_en-conflict5, fix, codex) Fresh independent G3/G5 review and narrow-width/A4 inspection remain pending; inspect Figure 3’s footer.
- (efmp-304-u01-repair_en-conflict5, fix, codex) Fresh independent G3/G5 review and narrow-width/A4 inspection remain pending; inspect Figure 3’s footer.
- (efmp-304-u01-repair_en-conflict4, fix, opencode) Independent G3/G5 review for EFMP-304 Unit 1 still pending  -  inspect Figure 3 cosmetic footer intersection per earlier job notes.
- (efmp-304-u01-repair_en-conflict4, fix, opencode) Translation remains draft; narrow-width/A4 rendered inspection pending.
- (efmp-304-u01-repair_en-conflict3, fix, opencode) Independent G3/G5 review for EFMP-304 Unit 1 still pending  -  inspect Figure 3 cosmetic footer intersection per earlier job notes.


## Response snapshot

Fixed all 37 text-figure-geometry findings across 8 EFMP-304 Unit 1 SVGs (viewBox growth, column restructuring, label wrapping, Urdu wordmark repositioning), updated Figure carriers, regenerated dark variants, refreshed G2 gate evidence, and updated tasks.md.

## Outcome

- Impact: fix for EFMP-304 Unit 1 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 31 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed all 37 text-figure-geometry findings across 8 EFMP-304 Unit 1 SVGs (viewBox growth, column restructuring, label wrapping, Urdu wordmark repositioning), updated Figure carriers, regenerated dark variants, refreshed G2 gate evidence, and updated tasks.md.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Independent G3 and dependent G5 review for EFMP-304 Unit 1 remain pending  -  G3 marked stale in tasks.md. Figure 3 footer intersection noted by earlier jobs was not re-inspected here (out of scope for geometry-only repair).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
