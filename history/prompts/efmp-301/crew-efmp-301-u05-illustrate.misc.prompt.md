---
id: crew-efmp-301-u05-illustrate
title: crew illustrate EFMP-301 unit 5
stage: misc
date: 2026-11-13
surface: agent
model: agy
feature: efmp-301
branch: crew/efmp-301-u05-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/efmp-301/unit-05/index.mdx
  - docs/semester-1/efmp-301/unit-05/topic-01.mdx
  - docs/semester-1/efmp-301/unit-05/topic-02.mdx
  - history/prompts/efmp-301/crew-efmp-301-u05-illustrate.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-05/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-05/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-05/topic-02.mdx
  - specs/content/efmp-301/figures/unit-05.banner.md
  - specs/content/efmp-301/figures/unit-05.md
  - specs/content/efmp-301/reviews/unit-05/G2/20261113T040454961Z-gates.json
  - specs/content/efmp-301/reviews/unit-05/G2/logs-20261113T040454961Z/check-bloom-bands.txt
  - specs/content/efmp-301/reviews/unit-05/G2/logs-20261113T040454961Z/check-concept-graph.txt
  - specs/content/efmp-301/reviews/unit-05/G2/logs-20261113T040454961Z/check-depth-gate.txt
  - specs/content/efmp-301/reviews/unit-05/G2/logs-20261113T040454961Z/check-docs-sync.txt
  - specs/content/efmp-301/reviews/unit-05/G2/logs-20261113T040454961Z/check-figures.txt
  - specs/content/efmp-301/reviews/unit-05/G2/logs-20261113T040454961Z/check-no-answer-keys.txt
  - specs/content/efmp-301/reviews/unit-05/G2/logs-20261113T040454961Z/check-no-em-dash.txt
  - specs/content/efmp-301/reviews/unit-05/G2/logs-20261113T040454961Z/validate-content.txt
  - specs/content/efmp-301/tasks.md
  - static/img/figures/efmp-301/unit-05/fig-U5-5.webp
  - static/img/figures/efmp-301/unit-05/fig-U5-6.webp
  - static/img/figures/efmp-301/unit-05/fig-U5-7.webp
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-301-u05-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u05-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for EFMP-301 Unit 5 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-301 5` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-05/`.

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
- (efmp-301-u05-plan_illustrations, plan_illustrations, claude) The banner (`fig-U5-5`) and topic rows (`fig-U5-6`, `fig-U5-7`) are prompt-only; the illustrate job must generate, inspect and place them, then replace the topic markers in both EN and UR files.
- (efmp-301-u05-plan_illustrations, plan_illustrations, claude) The Unit 5 G2 evidence now points to `20261112T224845001Z-gates.json`; any later edit to Unit 5 inputs makes it stale again, so rerun `gates:evidence -- EFMP-301 5` and commit the `logs-*` folder with the JSON.
- (efmp-301-u05-repair_en-r1, repair_en, opencode) The latest G3 report (20261108T203238Z) was run against a pre-repair version of the content files; always diff a report's input manifest against current bytes before editing. The seifert2009 bound excerpt is a shared source file: any edit invalidates the G2 evidence of every EFMP-301 unit that cites it and requires `scripts/prepare-gate-evidence.mjs --refresh-stale`. Render inspection (narrow viewport and A4 print) remains unavailable in crew jobs; a fresh G3 run needs owner authorisation bec...
- (efmp-301-u05-repair_en-conflict3, fix, opencode) Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) were byte-identical on both sides at the merge base, so no ID rewrites were needed.
- (efmp-301-u05-repair_en-conflict3, fix, opencode) The merge touched no Unit 5 content or figures, so the G2 evidence at 20261103T044540225Z-gates.json stays fresh; any further Unit 5 edit invalidates it.

## Response snapshot

Generated with agy, inspected, and placed all 3 Unit 5 raster illustrations (banner fig-U5-5, topic scenes fig-U5-6 and fig-U5-7) in English and Urdu, updated manifests to placed, and refreshed G2 gate evidence.

## Outcome

- Impact: illustrate for EFMP-301 Unit 5 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated with agy, inspected, and placed all 3 Unit 5 raster illustrations (banner fig-U5-5, topic scenes fig-U5-6 and fig-U5-7) in English and Urdu, updated manifests to placed, and refreshed G2 gate evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G2 gate evidence refreshed and committed at `specs/content/efmp-301/reviews/unit-05/G2/20261113T040454961Z-gates.json`.
  - Unit 5 G3 remains open and unticked pending an authorised fresh independent review cycle.
  - Seifert2009 citations and bindings are in sync.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: Initial banner generation attempt was briefly delayed by a transient model quota reset timestamp; waited out and succeeded on reset.
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
