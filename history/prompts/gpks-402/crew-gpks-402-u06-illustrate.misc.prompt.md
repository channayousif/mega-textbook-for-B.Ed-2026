---
id: crew-gpks-402-u06-illustrate
title: crew illustrate GPKS-402 unit 6
stage: misc
date: 2026-11-19
surface: agent
model: agy
feature: gpks-402
branch: crew/gpks-402-u06-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gpks-402/unit-06/index.mdx
 - docs/semester-2/gpks-402/unit-06/topic-01.mdx
 - docs/semester-2/gpks-402/unit-06/topic-02.mdx
 - docs/semester-2/gpks-402/unit-06/topic-03.mdx
 - history/prompts/gpks-402/crew-gpks-402-u06-illustrate.misc.prompt.md
 - specs/content/gpks-402/figures/unit-06.banner.md
 - specs/content/gpks-402/figures/unit-06.md
 - specs/content/gpks-402/reviews/unit-06/G2/20261119T031856430Z-gates.json
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261119T031856430Z/check-bloom-bands.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261119T031856430Z/check-concept-graph.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261119T031856430Z/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261119T031856430Z/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261119T031856430Z/check-figures.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261119T031856430Z/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261119T031856430Z/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261119T031856430Z/validate-content.txt
 - specs/content/gpks-402/tasks.md
 - static/img/figures/gpks-402/unit-06/fig-U6-10.webp
 - static/img/figures/gpks-402/unit-06/fig-U6-7.webp
 - static/img/figures/gpks-402/unit-06/fig-U6-8.webp
 - static/img/figures/gpks-402/unit-06/fig-U6-9.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u06-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u06-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GPKS-402 Unit 6 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GPKS-402 6` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it picks the image producer itself (agy, then gflow while the owner's PC is reachable, then Codex; each image's producer is printed on its ✓ line), optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GPKS-402 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-06/`.

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
- (gpks-402-u06-plan_illustrations, plan_illustrations, claude) There is no Urdu mirror for Unit 6, so the markers `fig-U6-8` to `fig-U6-10` are in the English topic files only. The translation job must copy the same marker IDs into its Urdu topic files.
- (gpks-402-u06-plan_illustrations, plan_illustrations, claude) The illustrate job should check that the regional cloth in `fig-U6-10` and the goods in `fig-U6-8`/`fig-U6-9` come out with no readable lettering or brand marks.
- (gpks-402-u06-repair_en-r1, repair_en, agy) F01 author-run provenance and F08 rendered narrow/A4 evidence remain host-supplied; G3 stays open under ADR-0019.
- (gpks-402-u06-repair_en-r1, repair_en, agy) A fresh independent G3 review of Unit 6 is needed before the unit can be ticked; refreshed G2 gate evidence is at [20261110T062724508Z-gates.json](file:///home/a2ahs/crew-wt/gpks-402-u06-repair_en-r1/specs/content/gpks-402/reviews/unit-06/G2/20261110T062724508Z-gates.json).
- (gpks-402-u06-repair_en-r1, repair_en, agy) No Urdu mirror exists yet for Unit 6, so Urdu translation remains a separate job.


## Response snapshot

Generated, inspected, and placed GPKS-402 Unit 6 banner and topic raster illustrations, updated manifests to placed, refreshed G2 gate evidence, and passed all 14 content gates.

## Outcome

- Impact: illustrate for GPKS-402 Unit 6 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 21 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated, inspected, and placed GPKS-402 Unit 6 banner and topic raster illustrations, updated manifests to placed, refreshed G2 gate evidence, and passed all 14 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - All GPKS-402 Unit 6 figures are placed with committed WebP illustrations (banner fig-U6-7 and classroom scenes fig-U6-8, fig-U6-9, fig-U6-10).
  - No Urdu mirror exists yet for Unit 6; the Urdu translation job will need to copy over the placed figure markers into the translated topics.
  - G2 gate evidence refreshed at 20261119T031856430Z; G3 en-review remains open for an independent reviewer.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
