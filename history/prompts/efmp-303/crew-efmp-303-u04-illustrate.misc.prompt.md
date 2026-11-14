---
id: crew-efmp-303-u04-illustrate
title: crew illustrate EFMP-303 unit 4
stage: misc
date: 2026-11-14
surface: agent
model: codex
feature: efmp-303
branch: crew/efmp-303-u04-illustrate
user: crew
command: crew illustrate
labels: ["crew", "codex", "illustrate"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-303/unit-04/index.mdx
 - docs/semester-2/efmp-303/unit-04/topic-01.mdx
 - docs/semester-2/efmp-303/unit-04/topic-02.mdx
 - history/prompts/general/20261194-illustrate-efmp-303-unit-four.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-04/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-04/topic-02.mdx
 - specs/content/efmp-303/figures/unit-04.banner.md
 - specs/content/efmp-303/figures/unit-04.md
 - specs/content/efmp-303/reviews/unit-04/G2/20261114T001534785Z-gates.json
 - specs/content/efmp-303/reviews/unit-04/G2/logs-20261114T001534785Z/check-bloom-bands.txt
 - specs/content/efmp-303/reviews/unit-04/G2/logs-20261114T001534785Z/check-concept-graph.txt
 - specs/content/efmp-303/reviews/unit-04/G2/logs-20261114T001534785Z/check-depth-gate.txt
 - specs/content/efmp-303/reviews/unit-04/G2/logs-20261114T001534785Z/check-docs-sync.txt
 - specs/content/efmp-303/reviews/unit-04/G2/logs-20261114T001534785Z/check-figures.txt
 - specs/content/efmp-303/reviews/unit-04/G2/logs-20261114T001534785Z/check-no-answer-keys.txt
 - specs/content/efmp-303/reviews/unit-04/G2/logs-20261114T001534785Z/check-no-em-dash.txt
 - specs/content/efmp-303/reviews/unit-04/G2/logs-20261114T001534785Z/validate-content.txt
 - specs/content/efmp-303/tasks.md
 - static/img/figures/efmp-303/unit-04/fig-U4-5.webp
 - static/img/figures/efmp-303/unit-04/fig-U4-6.webp
 - static/img/figures/efmp-303/unit-04/fig-U4-7.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u04-illustrate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u04-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for EFMP-303 Unit 4 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-303 4` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-04/`.

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
- (efmp-303-u04-plan_illustrations, plan_illustrations, claude) The illustrate job still has to generate, inspect and place `fig-U4-5` (banner, `--banner`), `fig-U4-6` and `fig-U4-7`, and replace the two scene markers in the EN and UR topic files with `<Figure>` elements.
- (efmp-303-u04-plan_illustrations, plan_illustrations, claude) Adding a `<Figure>` to topic-01/02 will make the Unit 4 G2 evidence stale again; rerun `node scripts/prepare-gate-evidence.mjs EFMP-303 4` on a clean tree and repoint the row at `tasks.md:64`.
- (efmp-303-u04-repair_en-r1, repair_en, opencode) The 20261108 desk report repeats the 20261102 findings verbatim under a fresh manifest; do not re-apply them, current bytes already resolve all three advisory items.
- (efmp-303-u04-repair_en-r1, repair_en, opencode) The blocking render-review finding remains host-blocked: narrow-screen (360px), A4 print and figure-clipping inspection need a host permitted to run a build/browser.
- (efmp-303-u04-repair_en-r1, repair_en, opencode) G3 stays unticked and translation_status stays draft pending independent G5 across all 5 mirror files.


## Response snapshot

Generated, inspected and placed EFMP-303 Unit 4’s banner and two topic illustrations in both languages, with fresh passing gate evidence.

## Outcome

- Impact: illustrate for EFMP-303 Unit 4 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated, inspected and placed EFMP-303 Unit 4’s banner and two topic illustrations in both languages, with fresh passing gate evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Independent G3/G5 and narrow-screen/A4 page inspection remain pending.
  - Independent G3/G5 and narrow-screen/A4 page inspection remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
