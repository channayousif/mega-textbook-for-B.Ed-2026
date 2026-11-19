---
id: crew-gqur-300-u02-illustrate
title: crew illustrate GQUR-300 unit 2
stage: misc
date: 2026-11-19
surface: agent
model: agy
feature: gqur-300
branch: crew/gqur-300-u02-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gqur-300/unit-02/index.mdx
 - docs/semester-1/gqur-300/unit-02/topic-01.mdx
 - docs/semester-1/gqur-300/unit-02/topic-02.mdx
 - docs/semester-1/gqur-300/unit-02/topic-03.mdx
 - history/prompts/gqur-300/crew-gqur-300-u02-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-02/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-02/topic-03.mdx
 - specs/content/gqur-300/figures/unit-02.banner.md
 - specs/content/gqur-300/figures/unit-02.md
 - specs/content/gqur-300/reviews/unit-02/G2/20261119T042049432Z-gates.json
 - specs/content/gqur-300/reviews/unit-02/G2/logs-20261119T042049432Z/check-bloom-bands.txt
 - specs/content/gqur-300/reviews/unit-02/G2/logs-20261119T042049432Z/check-concept-graph.txt
 - specs/content/gqur-300/reviews/unit-02/G2/logs-20261119T042049432Z/check-depth-gate.txt
 - specs/content/gqur-300/reviews/unit-02/G2/logs-20261119T042049432Z/check-docs-sync.txt
 - specs/content/gqur-300/reviews/unit-02/G2/logs-20261119T042049432Z/check-figures.txt
 - specs/content/gqur-300/reviews/unit-02/G2/logs-20261119T042049432Z/check-no-answer-keys.txt
 - specs/content/gqur-300/reviews/unit-02/G2/logs-20261119T042049432Z/check-no-em-dash.txt
 - specs/content/gqur-300/reviews/unit-02/G2/logs-20261119T042049432Z/validate-content.txt
 - specs/content/gqur-300/tasks.md
 - static/img/figures/gqur-300/unit-02/fig-U2-10.webp
 - static/img/figures/gqur-300/unit-02/fig-U2-7.webp
 - static/img/figures/gqur-300/unit-02/fig-U2-8.webp
 - static/img/figures/gqur-300/unit-02/fig-U2-9.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-300-u02-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u02-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GQUR-300 Unit 2 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GQUR-300 2` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it picks the image producer itself (agy, then gflow while the owner's PC is reachable, then Codex; each image's producer is printed on its ✓ line), optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-300 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-02/`.

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
- (gqur-300-u02-plan_illustrations, plan_illustrations, claude) The 2.1 and 2.2 scenes follow the prose, so they are set in a Karachi cloth shop and a school kitchen rather than a classroom.
- (gqur-300-u02-plan_illustrations, plan_illustrations, claude) The Urdu topic files do not have the new markers yet; the illustrate job should add them when it places the images.
- (gqur-300-u02-repair_en-r1, repair_en, agy) G3/G5 remain unticked; desktop, narrow-view and A4 print evidence as well as attested session provenance require owner arrangement.
- (gqur-300-u02-repair_en-r1, repair_en, agy) Full explanatory passages and review bundle binding for NCC, OpenStax, and shared glossary remain owner follow-ups.
- (gqur-300-u02-repair_en, repair_en, codex) G3/G5 remain open; owner must resolve render, provenance, source-bundle and editorial evidence needs recorded in the repair handoff.

## Response snapshot

Generated, inspected, and placed GQUR-300 Unit 2 banner and topic raster illustrations in English and Urdu index and topic files, updated manifests to placed, refreshed G2 gate evidence, and passed all 14 content gates.

## Outcome

All four raster illustrations for GQUR-300 Unit 2 (unit banner fig-U2-7 and classroom scenes fig-U2-8, fig-U2-9, fig-U2-10) were generated via `scripts/generate-illustration.mjs`, verified against pedagogical and cultural requirements, placed in English and Urdu files, and verified via `npm run check:content`.

## Handoff (for CEO and agents)

- Shipped / changed: Generated, inspected, and placed GQUR-300 Unit 2 banner and topic raster illustrations in English and Urdu, updated manifests to placed, refreshed G2 gate evidence (20261119T042049432Z-gates.json), and verified all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - All GQUR-300 Unit 2 figures are placed with committed WebP illustrations (banner fig-U2-7 and classroom scenes fig-U2-8, fig-U2-9, fig-U2-10).
  - Urdu mirrors are updated with corresponding localized alt text and Figure tags.
  - G2 gate evidence refreshed at 20261119T042049432Z; G3 en-review and G5 ur-review remain open for independent reviewers.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- The automated generation pipeline executed cleanly with agy producing all four illustrations.
- All generated images respected the house style: authentic Sindh attire, no text/labels/calligraphy, no sacred persons or symbols.
