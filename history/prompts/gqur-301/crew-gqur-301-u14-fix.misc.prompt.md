---
id: crew-gqur-301-u14-fix
title: crew fix GQUR-301 unit 14
stage: misc
date: 2026-10-27
surface: agent
model: codex
feature: gqur-301
branch: crew/gqur-301-u14-fix
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-14/topic-02.mdx
 - history/prompts/general/20261031-repair-unit-fourteen-figure-geometry.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-14/topic-02.mdx
 - specs/content/gqur-301/reviews/unit-14/G2/20261027T161905525Z-gates.json
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261027T161905525Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261027T161905525Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261027T161905525Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261027T161905525Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261027T161905525Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261027T161905525Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261027T161905525Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261027T161905525Z/validate-content.txt
 - specs/content/gqur-301/tasks.md
 - static/content-status.json
 - static/img/figures/gqur-301/unit-14/fig-U14-2.dark.svg
 - static/img/figures/gqur-301/unit-14/fig-U14-2.svg
 - static/img/figures/gqur-301/unit-14/fig-U14-4.dark.svg
 - static/img/figures/gqur-301/unit-14/fig-U14-4.svg
 - static/img/figures/gqur-301/unit-14/fig-U14-4.ur.dark.svg
 - static/img/figures/gqur-301/unit-14/fig-U14-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u14-fix

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u14-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (4 in total; PR #339 added the overlap and spill checks): fig-U14-2.svg (1), fig-U14-4.svg (2), fig-U14-4.ur.svg (1). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/gqur-301/unit-14/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs GQUR-301 14, point the unit's G2 en-draft row in specs/content/gqur-301/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

## Scope
GQUR-301 Unit 14 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-14/`.

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
- (gqur-301-u14-translate, translate, claude) The Urdu mirror keeps the English G3 findings F1-F5 unchanged (sum 513, 30.5-37.9 range, z with s, rubric 2.12-2.68), and `fig-U14-2.ur.svg` shows `513 / 15`. When the English is repaired, apply the same fixes to the Urdu pages and figures and re-run G4.
- (gqur-301-u14-translate, translate, claude) Nobody has viewed the Urdu pages or figures rendered. Nastaliq is tall, so the step boxes in fig-U14-3 and the reading panels in fig-U14-1/2 are where clipping is most likely. Run `render-inspect.mjs GQUR-301 14 --locale ur` before G5.
- (gqur-301-u14-translate, translate, claude) Several glossary.json `definition_ur` entries these pages show are corrupted (Confidence level, Margin of error, Normal model, Estimator). They are out of scope for this unit; the glossary owner needs to fix them.
- (gqur-301-u14-review_en, review_en, claude) F1 (data sum 503 not 513) touches topic-01, topic-02, all four fig-U14 SVGs plus dark variants, and the RRQ 1 key; fix them together and re-measure fig-U14-4.
- (gqur-301-u14-review_en, review_en, claude) F3 (z vs t) may need an owner ruling if the course intends z only; until then items that supply z* stay answerable.


## Response snapshot

Repaired Unit 14 figure spacing, regenerated dark variants, updated figure heights, and refreshed gate evidence.

## Outcome

- Impact: fix for GQUR-301 Unit 14 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired Unit 14 figure spacing, regenerated dark variants, updated figure heights, and refreshed gate evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Existing academic findings still need author repair and fresh independent G3 review.
  - Existing academic findings still need author repair and fresh independent G3 review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
