---
id: crew-efmp-304-u03-illustrate
title: crew illustrate EFMP-304 unit 3
stage: misc
date: 2026-11-05
surface: agent
model: agy
feature: efmp-304
branch: crew/efmp-304-u03-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-304/unit-03/index.mdx
 - history/prompts/efmp-304/crew-efmp-304-u03-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-03/index.mdx
 - specs/content/efmp-304/figures/unit-03.banner.md
 - specs/content/efmp-304/reviews/unit-03/G2/20261105T173239705Z-gates.json
 - specs/content/efmp-304/reviews/unit-03/G2/logs-20261105T173239705Z/check-bloom-bands.txt
 - specs/content/efmp-304/reviews/unit-03/G2/logs-20261105T173239705Z/check-concept-graph.txt
 - specs/content/efmp-304/reviews/unit-03/G2/logs-20261105T173239705Z/check-depth-gate.txt
 - specs/content/efmp-304/reviews/unit-03/G2/logs-20261105T173239705Z/check-docs-sync.txt
 - specs/content/efmp-304/reviews/unit-03/G2/logs-20261105T173239705Z/check-figures.txt
 - specs/content/efmp-304/reviews/unit-03/G2/logs-20261105T173239705Z/check-no-answer-keys.txt
 - specs/content/efmp-304/reviews/unit-03/G2/logs-20261105T173239705Z/check-no-em-dash.txt
 - specs/content/efmp-304/reviews/unit-03/G2/logs-20261105T173239705Z/validate-content.txt
 - specs/content/efmp-304/tasks.md
 - static/img/figures/efmp-304/unit-03/fig-U3-9.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u03-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u03-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for EFMP-304 Unit 3 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-304 3` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-304 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-03/`.

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
- (efmp-304-u03-repair_en, repair_en, agy) Visual browser and print inspection (360px viewport, table scrollability, A4 print) remains unexecuted because crew job constraints prohibit build/server/Playwright; full G3 certification needs permitted browser tooling on a live build.
- (efmp-304-u03-repair_en, repair_en, agy) Fresh independent G3 and dependent G5 review remain pending; stage stays open without certification.
- (efmp-304-u03-translate-r1, translate, codex) Translation remains draft pending independent G5; full-page RTL/print inspection and English G3 follow-up remain open.
- (efmp-304-u03-translate-r1, translate, codex) Translation remains draft pending independent G5; full-page RTL/print inspection and English G3 follow-up remain open.
- (efmp-304-u03-translate, translate, agy) English G3 for EFMP-304 Unit 3 remains open with an advisory escalate, so any future English prose repair may require updating this Urdu mirror.


## Response snapshot

Generated, inspected, and placed the EFMP-304 Unit 3 banner illustration (fig-U3-9) in English and Urdu index files, updated the banner manifest to placed, refreshed G2 gate evidence, and verified check:content clean across all 14 gates.

## Outcome

- Impact: illustrate for EFMP-304 Unit 3 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated, inspected, and placed the EFMP-304 Unit 3 banner illustration (fig-U3-9) in English and Urdu index files, updated the banner manifest to placed, refreshed G2 gate evidence, and verified check:content clean across all 14 gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Fresh independent G3 and dependent G5 reviews remain open without certification.
  - Visual browser and print inspection (360px viewport, table scrollability, A4 print) remains unexecuted due to crew constraints prohibiting build, dev server, and Playwright runs.
  - English G3 for EFMP-304 Unit 3 remains open with an advisory escalate, so future English prose repair may require updating the Urdu mirror.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
