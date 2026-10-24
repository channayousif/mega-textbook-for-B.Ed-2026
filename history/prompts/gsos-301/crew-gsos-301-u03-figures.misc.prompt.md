---
id: crew-gsos-301-u03-figures
title: crew figures GSOS-301 unit 3
stage: misc
date: 2026-10-24
surface: agent
model: codex
feature: gsos-301
branch: crew/gsos-301-u03-figures
user: crew
command: crew figures
labels: ["crew", "codex", "figures"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261024-gsos301-u03-schematic-assets.general.prompt.md
 - specs/content/gsos-301/figures/unit-03.md
 - specs/content/gsos-301/reviews/unit-03/G2/20261024T180249405Z-gates.json
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261024T180249405Z/check-bloom-bands.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261024T180249405Z/check-concept-graph.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261024T180249405Z/check-depth-gate.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261024T180249405Z/check-docs-sync.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261024T180249405Z/check-figures.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261024T180249405Z/check-no-answer-keys.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261024T180249405Z/check-no-em-dash.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261024T180249405Z/validate-content.txt
 - specs/content/gsos-301/tasks.md
 - static/content-status.json
 - static/img/figures/gsos-301/unit-03/fig-U3-1.dark.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-1.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-1.ur.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-2.dark.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-2.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-2.ur.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-3.dark.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-3.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-3.ur.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-4.dark.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-4.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u03-figures

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u03-figures`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Render every prompt-only schematic figure for GSOS-301 Unit 3 (generate-figures skill): diagrams, tables, concept maps, flowcharts and timelines as SVG with their .ur.svg variants. Leave raster illustrations at prompt-only for the illustrate job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-03/`.

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
- (gsos-301-u03-translate, translate, codex) A separate English author must resolve the existing G3 findings before G4 resumes.
- (gsos-301-u03-translate, translate, codex) A separate English author must resolve the existing G3 findings before G4 resumes.
- (gsos-301-u03-review_en, review_en, codex) Repair role terminology, missing figures, assessments and source mappings; fresh review needs author provenance and browser/print evidence.
- (gsos-301-u03-review_en, review_en, codex) Repair role terminology, missing figures, assessments and source mappings; fresh review needs author provenance and browser/print evidence.
- (gsos-301-u03-author-conflict4, fix, opencode) Unit 3 G3 English review (4 prompt-only figures fig-U3-1..U3-4) and G4/G5 Urdu remain downstream; nothing left blocking them.


## Response snapshot

Rendered all four GSOS-301 Unit 3 schematics in English and Urdu with dark variants, updated the manifest, and refreshed G2 evidence.

## Outcome

- Impact: figures for GSOS-301 Unit 3 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 29 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Rendered all four GSOS-301 Unit 3 schematics in English and Urdu with dark variants, updated the manifest, and refreshed G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Urdu Unit 3 pages are absent; the translation job must wire the prepared Urdu SVGs.
  - Urdu Unit 3 pages are absent; the translation job must wire the prepared Urdu SVGs.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
