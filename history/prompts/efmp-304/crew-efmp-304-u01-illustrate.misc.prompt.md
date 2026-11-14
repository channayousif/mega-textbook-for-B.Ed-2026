---
id: crew-efmp-304-u01-illustrate
title: crew illustrate EFMP-304 unit 1
stage: misc
date: 2026-11-14
surface: agent
model: agy
feature: efmp-304
branch: crew/efmp-304-u01-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-304/unit-01/topic-01.mdx
 - docs/semester-2/efmp-304/unit-01/topic-02.mdx
 - docs/semester-2/efmp-304/unit-01/topic-03.mdx
 - history/prompts/efmp-304/crew-efmp-304-u01-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-03.mdx
 - specs/content/efmp-304/figures/unit-01.md
 - specs/content/efmp-304/reviews/unit-01/G2/20261114T023932167Z-gates.json
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261114T023932167Z/check-bloom-bands.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261114T023932167Z/check-concept-graph.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261114T023932167Z/check-depth-gate.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261114T023932167Z/check-docs-sync.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261114T023932167Z/check-figures.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261114T023932167Z/check-no-answer-keys.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261114T023932167Z/check-no-em-dash.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261114T023932167Z/validate-content.txt
 - specs/content/efmp-304/tasks.md
 - static/img/figures/efmp-304/unit-01/fig-U1-12.webp
 - static/img/figures/efmp-304/unit-01/fig-U1-13.webp
 - static/img/figures/efmp-304/unit-01/fig-U1-14.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u01-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u01-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for EFMP-304 Unit 1 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-304 1` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

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
- (efmp-304-u01-plan_illustrations, plan_illustrations, claude) The illustrate job still has to generate, inspect and place `fig-U1-11` (with `--banner`) and `fig-U1-12` to `fig-U1-15`, then replace the four scene markers in the EN and UR topic files (topics 01, 02, 03, 05) with `<Figure>` elements.
- (efmp-304-u01-plan_illustrations, plan_illustrations, claude) Replacing those markers will make the Unit 1 G2 evidence out of date again; rerun `node scripts/prepare-gate-evidence.mjs EFMP-304 1` on a clean tree and update the row at `specs/content/efmp-304/tasks.md:15`.
- (efmp-304-u01-repair_en-r1, repair_en, opencode) Visual browser/print inspection (360px viewport, table scrollability, A4 print) remains unexecuted; full G3 certification needs permitted browser tooling on a live build.
- (efmp-304-u01-repair_en-r1, repair_en, opencode) Figure 3's cosmetic footer/wordmark intersection (88.7 x 15.0px in `.ur` variants; 88.3 x 4.5px in fig-U1-6/8/9) is non-failing; the next rendered inspection should check the footer.
- (efmp-304-u01-repair_en-r1, repair_en, opencode) Fresh independent G3 and dependent G5 remain pending; ADR-0019's two-cycle limit may need owner authorisation for any further run.


## Response snapshot

Generated, inspected, and placed EFMP-304 Unit 1 raster illustrations fig-U1-12, fig-U1-13, and fig-U1-14 in English and Urdu topic files, updated the manifest, refreshed G2 gate evidence, and validated clean content gates.

## Outcome

- Impact: illustrate for EFMP-304 Unit 1 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 21 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated, inspected, and placed EFMP-304 Unit 1 raster illustrations fig-U1-12, fig-U1-13, and fig-U1-14 in English and Urdu topic files, updated the manifest, refreshed G2 gate evidence, and validated clean content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - fig-U1-11 (unit banner in unit-01.banner.md) and fig-U1-15 (Topic 1.5 scene) remain prompt-only due to upstream image generation quota exhaustion resetting at 2026-11-14T05:03:27Z.
  - Fresh independent G3 and dependent G5 reviews remain pending; ADR-0019 two-cycle limit may require owner authorization before re-running.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
