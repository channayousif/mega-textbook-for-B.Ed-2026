---
id: crew-efpg-401-u07-illustrate
title: crew illustrate EFPG-401 unit 7
stage: misc
date: 2026-11-15
surface: agent
model: codex
feature: efpg-401
branch: crew/efpg-401-u07-illustrate
user: crew
command: crew illustrate
labels: ["crew", "codex", "illustrate"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efpg-401/unit-07/index.mdx
 - docs/semester-3/efpg-401/unit-07/topic-01.mdx
 - docs/semester-3/efpg-401/unit-07/topic-02.mdx
 - history/prompts/general/20261200-efpg-401-unit-7-illustrations.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-07/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-07/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-07/topic-02.mdx
 - specs/content/efpg-401/figures/unit-07.banner.md
 - specs/content/efpg-401/figures/unit-07.md
 - specs/content/efpg-401/reviews/unit-07/G2/20261115T014555852Z-gates.json
 - specs/content/efpg-401/reviews/unit-07/G2/logs-20261115T014555852Z/check-bloom-bands.txt
 - specs/content/efpg-401/reviews/unit-07/G2/logs-20261115T014555852Z/check-concept-graph.txt
 - specs/content/efpg-401/reviews/unit-07/G2/logs-20261115T014555852Z/check-depth-gate.txt
 - specs/content/efpg-401/reviews/unit-07/G2/logs-20261115T014555852Z/check-docs-sync.txt
 - specs/content/efpg-401/reviews/unit-07/G2/logs-20261115T014555852Z/check-figures.txt
 - specs/content/efpg-401/reviews/unit-07/G2/logs-20261115T014555852Z/check-no-answer-keys.txt
 - specs/content/efpg-401/reviews/unit-07/G2/logs-20261115T014555852Z/check-no-em-dash.txt
 - specs/content/efpg-401/reviews/unit-07/G2/logs-20261115T014555852Z/validate-content.txt
 - specs/content/efpg-401/tasks.md
 - static/img/figures/efpg-401/unit-07/fig-U7-5.webp
 - static/img/figures/efpg-401/unit-07/fig-U7-6.webp
 - static/img/figures/efpg-401/unit-07/fig-U7-7.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-401-u07-illustrate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u07-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for EFPG-401 Unit 7 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFPG-401 7` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-401 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-401/`, and `static/img/figures/efpg-401/unit-07/`.

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
- (efpg-401-u07-plan_illustrations, plan_illustrations, claude) `fig-U7-5` (banner, in `unit-07.banner.md`) and `fig-U7-6`/`fig-U7-7` (marked in both the English and Urdu topic files) are prompt-only; the illustrate job must generate, inspect and place them, then refresh the G2 evidence again.
- (efpg-401-u07-plan_illustrations, plan_illustrations, claude) The intro paragraph of `figures/unit-07.md` still describes only the four placed schematics; update it when the illustrations are placed.
- (efpg-401-u07-translate, translate, agy) Four-file Urdu mirror and four localized SVG pairs prepared from English 0c79bb31d; translation_status remains draft pending independent G5.
- (efpg-401-u07-translate, translate, agy) All four localized schematic SVGs and their derived dark variants passed measure-figure-text with exit 0.
- (efpg-401-u07-author-conflict2, fix, opencode) Unit 7 stays English-only; the G4 Urdu mirror is the next job and needs four `.ur.svg` plus `.ur.dark.svg` schematics, a `key_terms` block, and a UR index.


## Response snapshot

Added two topic illustrations and a unit banner for EFPG-401 Unit 7 in both locales, with updated manifests and passing gate evidence.

## Outcome

- Impact: illustrate for EFPG-401 Unit 7 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added two topic illustrations and a unit banner for EFPG-401 Unit 7 in both locales, with updated manifests and passing gate evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
