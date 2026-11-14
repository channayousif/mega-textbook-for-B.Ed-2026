---
id: crew-efmp-305-u03-illustrate
title: crew illustrate EFMP-305 unit 3
stage: misc
date: 2026-11-14
surface: agent
model: agy
feature: efmp-305
branch: crew/efmp-305-u03-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-305/unit-03/index.mdx
 - docs/semester-2/efmp-305/unit-03/topic-01.mdx
 - docs/semester-2/efmp-305/unit-03/topic-02.mdx
 - history/prompts/efmp-305/crew-efmp-305-u03-illustrate.misc.prompt.md
 - history/prompts/general/20261196-generate-differentiated-science-classroom-banner.general.prompt.md
 - history/prompts/general/20261197-generate-varied-classroom-responses-illustration.general.prompt.md
 - history/prompts/general/20261198-generate-crowded-mathematics-classroom-illustration.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-03/topic-02.mdx
 - specs/content/efmp-305/figures/unit-03.banner.md
 - specs/content/efmp-305/figures/unit-03.md
 - specs/content/efmp-305/reviews/unit-03/G2/20261114T065842199Z-gates.json
 - specs/content/efmp-305/reviews/unit-03/G2/logs-20261114T065842199Z/check-bloom-bands.txt
 - specs/content/efmp-305/reviews/unit-03/G2/logs-20261114T065842199Z/check-concept-graph.txt
 - specs/content/efmp-305/reviews/unit-03/G2/logs-20261114T065842199Z/check-depth-gate.txt
 - specs/content/efmp-305/reviews/unit-03/G2/logs-20261114T065842199Z/check-docs-sync.txt
 - specs/content/efmp-305/reviews/unit-03/G2/logs-20261114T065842199Z/check-figures.txt
 - specs/content/efmp-305/reviews/unit-03/G2/logs-20261114T065842199Z/check-no-answer-keys.txt
 - specs/content/efmp-305/reviews/unit-03/G2/logs-20261114T065842199Z/check-no-em-dash.txt
 - specs/content/efmp-305/reviews/unit-03/G2/logs-20261114T065842199Z/validate-content.txt
 - specs/content/efmp-305/tasks.md
 - static/img/figures/efmp-305/unit-03/fig-U3-7.webp
 - static/img/figures/efmp-305/unit-03/fig-U3-8.webp
 - static/img/figures/efmp-305/unit-03/fig-U3-9.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u03-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u03-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for EFMP-305 Unit 3 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-305 3` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-03/`.

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
- (efmp-305-u03-plan_illustrations, plan_illustrations, claude) fig-U3-7/8/9 are prompt-only. The illustrate job must generate, inspect and place them and swap the two topic markers (EN+UR) for `<Figure>`, which will make the Unit 3 G2 evidence stale again.
- (efmp-305-u03-plan_illustrations, plan_illustrations, claude) Topic 3.3 deliberately has no classroom scene (its situation is solitary planning at home); do not add one without a scene that teaches something.
- (efmp-305-u03-repair_en-r1, repair_en, agy) vernon2020 and florian2014 remain declared unverifiable subscription sources; their claims in topic-02 stay bounded to the bibliographic level.
- (efmp-305-u03-repair_en-r1, repair_en, agy) Do not edit sources/texts/cast2024.md as it binds G2 evidence for both Unit 3 and Unit 4.
- (efmp-305-u03-repair_en-r1, repair_en, agy) Unit 3 G3 remains unticked and open pending fresh independent review under ADR-0019.


## Response snapshot

Generated, inspected, and placed EFMP-305 Unit 3 raster illustrations (fig-U3-7, fig-U3-8, fig-U3-9) in English and Urdu pages, updated manifests to placed, and refreshed G2 gate evidence.

## Outcome

- Impact: illustrate for EFMP-305 Unit 3 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated, inspected, and placed EFMP-305 Unit 3 raster illustrations (fig-U3-7, fig-U3-8, fig-U3-9) in English and Urdu pages, updated manifests to placed, and refreshed G2 gate evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - All three raster illustrations (banner fig-U3-7 and classroom scenes fig-U3-8, fig-U3-9) are placed and verified across English and Urdu files.
  - G2 gate evidence is refreshed at 20261114T065842199Z-gates.json and all 14 content gates pass with zero findings.
  - Unit 3 G3 remains unticked and open pending fresh independent review under ADR-0019.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
