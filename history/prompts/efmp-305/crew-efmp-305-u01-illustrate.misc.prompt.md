---
id: crew-efmp-305-u01-illustrate
title: crew illustrate EFMP-305 unit 1
stage: misc
date: 2026-11-14
surface: agent
model: agy
feature: efmp-305
branch: crew/efmp-305-u01-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-305/unit-01/index.mdx
 - docs/semester-2/efmp-305/unit-01/topic-01.mdx
 - docs/semester-2/efmp-305/unit-01/topic-02.mdx
 - history/prompts/efmp-305/crew-efmp-305-u01-illustrate.misc.prompt.md
 - history/prompts/general/20261195-generate-inclusive-classroom-banner.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/topic-02.mdx
 - specs/content/efmp-305/figures/unit-01.banner.md
 - specs/content/efmp-305/figures/unit-01.md
 - specs/content/efmp-305/reviews/unit-01/G2/20261114T052100718Z-gates.json
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261114T052100718Z/check-bloom-bands.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261114T052100718Z/check-concept-graph.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261114T052100718Z/check-depth-gate.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261114T052100718Z/check-docs-sync.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261114T052100718Z/check-figures.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261114T052100718Z/check-no-answer-keys.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261114T052100718Z/check-no-em-dash.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261114T052100718Z/validate-content.txt
 - specs/content/efmp-305/tasks.md
 - static/img/figures/efmp-305/unit-01/fig-U1-5.webp
 - static/img/figures/efmp-305/unit-01/fig-U1-6.webp
 - static/img/figures/efmp-305/unit-01/fig-U1-7.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u01-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u01-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for EFMP-305 Unit 1 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-305 1` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-01/`.

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
- (efmp-305-u01-plan_illustrations, plan_illustrations, claude) Three images to produce at prompt-only: banner fig-U1-5 (figures/unit-01.banner.md), plus fig-U1-6 and fig-U1-7, whose markers are in both the EN and UR topic-01/topic-02 files; swap each marker for a `<Figure>` when placing.
- (efmp-305-u01-plan_illustrations, plan_illustrations, claude) Placing the images changes the manifest and topic files again, so the Unit 1 G2 evidence will go stale; rerun `node scripts/prepare-gate-evidence.mjs EFMP-305 1` and repoint tasks.md line 30.
- (efmp-305-u01-repair_en-r1, repair_en, opencode) ERQ Bloom-label blueprint discrepancy (assessment tags exceed the approved MCQ Remember-Apply / RRQ Understand-Analyze / ERQ Analyze-Evaluate bands) is left for the curriculum owner; I did not re-tag items or edit the approved spec.
- (efmp-305-u01-repair_en-r1, repair_en, opencode) Render evidence (narrow-screen, keyboard, A4) and author provenance remain unavailable under the brief prohibition; no third review cycle is authorised.
- (efmp-305-u01-repair_en-r1, repair_en, opencode) `static/content-status.json` is git-ignored; run `npm run build:content-status` before `check:content` on a fresh checkout.


## Response snapshot

Produced, inspected, and placed all three EFMP-305 Unit 1 raster illustrations across English and Urdu topics and index pages, moved manifest rows to placed, and refreshed G2 gate evidence.

## Outcome

- Impact: illustrate for EFMP-305 Unit 1 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 23 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Produced, inspected, and placed all three EFMP-305 Unit 1 raster illustrations across English and Urdu topics and index pages, moved manifest rows to placed, and refreshed G2 gate evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - All three raster illustrations (unit banner fig-U1-5 and classroom scenes fig-U1-6, fig-U1-7) are placed in both English and Urdu files and verified clean.
  - G2 gate evidence was refreshed at `20261114T052100718Z-gates.json` and tasks.md line 30 repointed to maintain green pipeline gates.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
