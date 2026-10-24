---
id: crew-gqur-301-u13-figures
title: crew figures GQUR-301 unit 13
stage: misc
date: 2026-10-23
surface: agent
model: codex
feature: gqur-301
branch: crew/gqur-301-u13-figures
user: crew
command: crew figures
labels: ["crew", "codex", "figures"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/539-render-unit-thirteen-schematics.general.prompt.md
 - specs/content/gqur-301/figures/unit-13.md
 - specs/content/gqur-301/reviews/unit-13/G2/20261023T155000674Z-gates.json
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261023T155000674Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261023T155000674Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261023T155000674Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261023T155000674Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261023T155000674Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261023T155000674Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261023T155000674Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261023T155000674Z/validate-content.txt
 - specs/content/gqur-301/reviews/unit-13/figure-validation/check-content-final.log
 - specs/content/gqur-301/reviews/unit-13/figure-validation/handoff.md
 - specs/content/gqur-301/reviews/unit-13/figure-validation/origin-main-content.log
 - specs/content/gqur-301/reviews/unit-13/figure-validation/palette.log
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-13/fig-U13-1.dark.svg
 - static/img/figures/gqur-301/unit-13/fig-U13-1.svg
 - static/img/figures/gqur-301/unit-13/fig-U13-1.ur.dark.svg
 - static/img/figures/gqur-301/unit-13/fig-U13-1.ur.svg
 - static/img/figures/gqur-301/unit-13/fig-U13-2.dark.svg
 - static/img/figures/gqur-301/unit-13/fig-U13-2.svg
 - static/img/figures/gqur-301/unit-13/fig-U13-2.ur.dark.svg
 - static/img/figures/gqur-301/unit-13/fig-U13-2.ur.svg
 - static/img/figures/gqur-301/unit-13/fig-U13-3.dark.svg
 - static/img/figures/gqur-301/unit-13/fig-U13-3.svg
 - static/img/figures/gqur-301/unit-13/fig-U13-3.ur.dark.svg
 - static/img/figures/gqur-301/unit-13/fig-U13-3.ur.svg
 - static/img/figures/gqur-301/unit-13/fig-U13-4.dark.svg
 - static/img/figures/gqur-301/unit-13/fig-U13-4.svg
 - static/img/figures/gqur-301/unit-13/fig-U13-4.ur.dark.svg
 - static/img/figures/gqur-301/unit-13/fig-U13-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u13-figures

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u13-figures`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Render every prompt-only schematic figure for GQUR-301 Unit 13 (generate-figures skill): diagrams, tables, concept maps, flowcharts and timelines as SVG with their .ur.svg variants. Leave raster illustrations at prompt-only for the illustrate job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 13 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-13/`.

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
- (gqur-301-u13-translate, translate, codex) Separate English author must resolve G3 F1-F5 before translation resumes.
- (gqur-301-u13-translate, translate, codex) Separate English author must resolve G3 F1-F5 before translation resumes.
- (gqur-301-u13-review_en, review_en, codex) Separate author must resolve missing figures, RRQ8 contradiction, slope/inference claims and assessment demand; fresh review needs provenance, sources and render evidence.
- (gqur-301-u13-review_en, review_en, codex) Separate author must resolve missing figures, RRQ8 contradiction, slope/inference claims and assessment demand; fresh review needs provenance, sources and render evidence.
- (gqur-301-u13-author-conflict2, fix, opencode) GQUR-301 Unit 13 still needs G3 en-review, G4 Urdu translation, G5 Urdu review, and G6 figures; the escaped `\|r\|` cells in topic-01.mdx and unit-assessment.mdx were not visually verified (build was not run).


## Response snapshot

Rendered Unit 13’s four bilingual schematics, completed manifest placements, and refreshed G2 evidence.

## Outcome

- Impact: figures for GQUR-301 Unit 13 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 32 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Rendered Unit 13’s four bilingual schematics, completed manifest placements, and refreshed G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Urdu assets await placement when Unit 13’s missing Urdu topics are translated.
  - Urdu assets await placement when Unit 13’s missing Urdu topics are translated.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
