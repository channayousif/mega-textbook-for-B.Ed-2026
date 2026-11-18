---
id: crew-efpg-401-u02-illustrate
title: crew illustrate EFPG-401 unit 2
stage: misc
date: 2026-11-14
surface: agent
model: codex
feature: efpg-401
branch: crew/efpg-401-u02-illustrate
user: crew
command: crew illustrate
labels: ["crew", "codex", "illustrate"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efpg-401/unit-02/index.mdx
 - docs/semester-3/efpg-401/unit-02/topic-01.mdx
 - docs/semester-3/efpg-401/unit-02/topic-02.mdx
 - docs/semester-3/efpg-401/unit-02/topic-03.mdx
 - docs/semester-3/efpg-401/unit-02/topic-04.mdx
 - docs/semester-3/efpg-401/unit-02/topic-05.mdx
 - history/prompts/009-figure-rendering/0006-produce-efpg-unit-two-illustrations.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-05.mdx
 - specs/content/efpg-401/figures/unit-02.banner.md
 - specs/content/efpg-401/figures/unit-02.md
 - specs/content/efpg-401/figures/unit-02.production.md
 - specs/content/efpg-401/reviews/unit-02/G2/20261114T223818407Z-gates.json
 - specs/content/efpg-401/reviews/unit-02/G2/logs-20261114T223818407Z/check-bloom-bands.txt
 - specs/content/efpg-401/reviews/unit-02/G2/logs-20261114T223818407Z/check-concept-graph.txt
 - specs/content/efpg-401/reviews/unit-02/G2/logs-20261114T223818407Z/check-depth-gate.txt
 - specs/content/efpg-401/reviews/unit-02/G2/logs-20261114T223818407Z/check-docs-sync.txt
 - specs/content/efpg-401/reviews/unit-02/G2/logs-20261114T223818407Z/check-figures.txt
 - specs/content/efpg-401/reviews/unit-02/G2/logs-20261114T223818407Z/check-no-answer-keys.txt
 - specs/content/efpg-401/reviews/unit-02/G2/logs-20261114T223818407Z/check-no-em-dash.txt
 - specs/content/efpg-401/reviews/unit-02/G2/logs-20261114T223818407Z/validate-content.txt
 - specs/content/efpg-401/tasks.md
 - static/img/figures/efpg-401/unit-02/fig-U2-11.webp
 - static/img/figures/efpg-401/unit-02/fig-U2-12.webp
 - static/img/figures/efpg-401/unit-02/fig-U2-13.webp
 - static/img/figures/efpg-401/unit-02/fig-U2-14.webp
 - static/img/figures/efpg-401/unit-02/fig-U2-15.webp
 - static/img/figures/efpg-401/unit-02/fig-U2-16.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-401-u02-illustrate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u02-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for EFPG-401 Unit 2 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFPG-401 2` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-401 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-401/`, and `static/img/figures/efpg-401/unit-02/`.

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
- (efpg-401-u02-plan_illustrations, plan_illustrations, claude) Topic 2.5's story is set in Peshawar, so its scene `fig-U2-16` names no city. The owner may want the story moved to Sindh or the prompt changed.
- (efpg-401-u02-plan_illustrations, plan_illustrations, claude) The six new rows (`fig-U2-11` banner, `fig-U2-12` to `fig-U2-16` scenes) are prompt-only, and their markers are also in the Urdu topic files. The illustrate job needs to generate, inspect and place them, then refresh the G2 evidence again.
- (efpg-401-u02-translate, translate, opencode) Rendered-page inspection (`render-inspect.mjs`) was not run (brief forbids build/dev-server; render-inspect is review-job only), so G5 should inspect the rendered Urdu at 1280x900, 360x780 and A4 print.
- (efpg-401-u02-translate, translate, opencode) Stress is rendered `زور` (matching the unit's concept label) while Unit 1's mirror uses `دباؤ`; the owner may want one term across the course.
- (efpg-401-u02-translate, translate, opencode) `fig-U2-4.ur.svg` keeps the four-line English rain poem in English (it is the text being taught); only its annotation labels are Urdu.


## Response snapshot

Produced and placed all six EFPG-401 Unit 2 raster illustrations in both locales and refreshed passing draft evidence.

## Outcome

- Impact: illustrate for EFPG-401 Unit 2 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 32 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Produced and placed all six EFPG-401 Unit 2 raster illustrations in both locales and refreshed passing draft evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Used Codex fallback after Gemini quota exhaustion; independent G3/G5 and rendered-page review remain pending.
  - Used Codex fallback after Gemini quota exhaustion; independent G3/G5 and rendered-page review remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
