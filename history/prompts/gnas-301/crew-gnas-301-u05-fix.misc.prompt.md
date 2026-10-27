---
id: crew-gnas-301-u05-fix
title: crew fix GNAS-301 unit 5
stage: misc
date: 2026-10-27
surface: agent
model: opencode
feature: gnas-301
branch: crew/gnas-301-u05-fix
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gnas-301/unit-05/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-05/topic-04.mdx
 - specs/content/gnas-301/reviews/unit-05/G2/20261027T051349472Z-gates.json
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261027T051349472Z/check-bloom-bands.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261027T051349472Z/check-concept-graph.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261027T051349472Z/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261027T051349472Z/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261027T051349472Z/check-figures.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261027T051349472Z/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261027T051349472Z/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-05/G2/logs-20261027T051349472Z/validate-content.txt
 - specs/content/gnas-301/tasks.md
 - static/img/figures/gnas-301/unit-05/fig-U5-2.dark.svg
 - static/img/figures/gnas-301/unit-05/fig-U5-2.svg
 - static/img/figures/gnas-301/unit-05/fig-U5-3.dark.svg
 - static/img/figures/gnas-301/unit-05/fig-U5-3.svg
 - static/img/figures/gnas-301/unit-05/fig-U5-4.dark.svg
 - static/img/figures/gnas-301/unit-05/fig-U5-4.svg
 - static/img/figures/gnas-301/unit-05/fig-U5-8.dark.svg
 - static/img/figures/gnas-301/unit-05/fig-U5-8.svg
 - static/img/figures/gnas-301/unit-05/fig-U5-8.ur.dark.svg
 - static/img/figures/gnas-301/unit-05/fig-U5-8.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u05-fix

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u05-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (13 in total; PR #339 added the overlap and spill checks): fig-U5-2.svg (2), fig-U5-3.svg (1), fig-U5-4.svg (4), fig-U5-8.svg (6). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/gnas-301/unit-05/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs GNAS-301 5, point the unit's G2 en-draft row in specs/content/gnas-301/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

## Scope
GNAS-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-05/`.

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
- (gnas-301-u05-repair_en-conflict5, fix, opencode) Unit 5 G3 review still owner-gated under G-2026-32; glossary and source-binding follow-ups remain in specs/content/gnas-301/reviews/unit-05/20261019-repair-notes.md.
- (gnas-301-u05-repair_en-conflict4, fix, opencode) Unit 5 G3 review still owner-gated under G-2026-32  -  see specs/content/gnas-301/reviews/unit-05/20261019-repair-notes.md for glossary and source-binding follow-ups.
- (gnas-301-u05-repair_en-conflict3, fix, opencode) Unit 5 G3 remains owner-gated under G-2026-32  -  fresh review needs owner authorization. Repair notes at specs/content/gnas-301/reviews/unit-05/20261019-repair-notes.md hold the glossary and source-binding follow-ups.
- (gnas-301-u05-repair_en-conflict3, fix, opencode) Append-only registries (log, gaps, terminology, glossary) merged cleanly  -  this branch added no new entries to them.
- (gnas-301-u05-repair_en-conflict3, fix, opencode) Earlier conflict-resolution commits (conflict1/conflict2) left duplicate PHR rows in tasks.md; the file now has the correct merged set but the row order is not strictly unit-sorted at the tail  -  cosmetic only, no gate impact.

## Feedback from the previous attempt
npm run check:content has 4 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- GNAS-301 Unit 5 (docs/semester-1/gnas-301/unit-05): G2 en-draft: stale or incomplete input manifest
✗ Figure gate failed with 1 finding(s):
- GNAS-301 Unit 5 (docs/semester-1/gnas-301/unit-05): figure "fig-U5-2": static/img/figures/gnas-301/unit-05/fig-U5-2.dark.svg is stale - run: npm run figures:variants


## Response snapshot

Fixed all 13 figure text-geometry defects in GNAS-301 Unit 5 SVGs (fig-U5-2, fig-U5-3, fig-U5-4, fig-U5-8 and their Urdu mirrors) by wrapping overflowing labels, adjusting column positions, growing fig-U5-8 viewBox height to 510, updating Figure carriers, and regenerating dark variants.

## Outcome

- Impact: fix for GNAS-301 Unit 5 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed all 13 figure text-geometry defects in GNAS-301 Unit 5 SVGs (fig-U5-2, fig-U5-3, fig-U5-4, fig-U5-8 and their Urdu mirrors) by wrapping overflowing labels, adjusting column positions, growing fig-U5-8 viewBox height to 510, updating Figure carriers, and regenerating dark variants.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - fig-U5-8 viewBox height changed from 470 to 510 (Figure carriers in both locales updated); G3 review marked stale in tasks.md and needs a fresh run when owner-gate G-2026-32 clears.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
