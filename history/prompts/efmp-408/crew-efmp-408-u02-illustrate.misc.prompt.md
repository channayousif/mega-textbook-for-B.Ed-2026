---
id: crew-efmp-408-u02-illustrate
title: crew illustrate EFMP-408 unit 2
stage: misc
date: 2026-11-25
surface: agent
model: agy
feature: efmp-408
branch: crew/efmp-408-u02-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: history/adr/0029-gemini-raster-illustrations.md
  pr: null
files:
 - docs/semester-4/efmp-408/unit-02/index.mdx
 - history/prompts/efmp-408/crew-efmp-408-u02-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-02/index.mdx
 - specs/content/efmp-408/figures/unit-02.banner.md
 - specs/content/efmp-408/tasks.md
 - static/img/figures/efmp-408/unit-02/fig-U2-7.webp
 - specs/content/efmp-408/reviews/unit-02/G2/20261125T140929582Z-gates.json
 - specs/content/efmp-408/reviews/unit-02/G2/logs-20261125T140929582Z/check-bloom-bands.txt
 - specs/content/efmp-408/reviews/unit-02/G2/logs-20261125T140929582Z/check-concept-graph.txt
 - specs/content/efmp-408/reviews/unit-02/G2/logs-20261125T140929582Z/check-depth-gate.txt
 - specs/content/efmp-408/reviews/unit-02/G2/logs-20261125T140929582Z/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-02/G2/logs-20261125T140929582Z/check-figures.txt
 - specs/content/efmp-408/reviews/unit-02/G2/logs-20261125T140929582Z/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-02/G2/logs-20261125T140929582Z/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-02/G2/logs-20261125T140929582Z/validate-content.txt
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-408-u02-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u02-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for EFMP-408 Unit 2 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-408 2 --producer gflow` for the topic scenes and again with `--banner` (same flags) for the unit banner (unit-NN.banner.md); this job holds the crew's gflow image lane, so use only that producer (other units' jobs use the other producers at the same time; each image's producer is printed on its ✓ line). If it exits 3 (gflow is out of quota), stop as described below and the crew moves the job to a free producer, optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-408 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-02/`.

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
- (efmp-408-u02-translate, translate, agy) Unit 2 G3 English review and G5 Urdu review remain open; translation_status stays draft in both index.mdx files pending independent G5 acceptance.
- (efmp-408-u02-translate, translate, agy) Banner figure fig-U2-7 remains prompt-only in specs/content/efmp-408/figures/unit-02.banner.md awaiting raster asset production.
- (efmp-408-u02-translate, translate, agy) Six Urdu schematic SVGs and their derived dark variants passed measure-figure-text.mjs and figures:variants:check clean; render-inspect was not run locally as per host limits.
- (efmp-408-u02-author-conflict5, fix, claude_crew) Unit 2 G4 Urdu translation and independent G3/G5 review are still open; banner fig-U2-7 stays prompt-only for the illustrate job.
- (efmp-408-u02-author-conflict5, fix, claude_crew) `specs/content/efmp-408/tasks.md` now carries Units 1, 2, 3, 5 and 6 state, so read all five units' rows before editing it.

## Response snapshot

Generated unit banner raster fig-U2-7 using gflow, inspected and verified compliance, placed in English and Urdu index pages, and recorded manifest and task tracker updates.

## Outcome

- Impact: illustrate for EFMP-408 Unit 2 by agy.
- Tests: npm run check:content passed in the job worktree.
- Files: listed above plus gate evidence files.
- Next prompts: crew planner queues independent G3 and G5 reviews.
- Reflection: none.

## Handoff (for CEO and agents)

- Shipped / changed: Generated unit banner illustration fig-U2-7 with gflow, inspected image for pedagogical and cultural alignment, placed as Figure in English and Urdu index pages, updated sidecar banner manifest and task tracker, and refreshed gate evidence.
- Decisions the team must respect: G3 and G5 reviews remain open and advisory until independent review.
- Pending / next owner: crew lead.
- Notes for the next job on this unit:
  - Unit 2 G3 English review and G5 Urdu review remain open; translation_status stays draft in both index.mdx files pending independent G5 acceptance.
  - All unit figures (schematic SVGs fig-U2-1 through fig-U2-6 and banner illustration fig-U2-7) are placed in both English and Urdu mirrors.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
