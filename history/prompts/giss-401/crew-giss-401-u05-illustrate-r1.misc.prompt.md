---
id: crew-giss-401-u05-illustrate-r1
title: crew illustrate GISS-401 unit 5 retry 1
stage: misc
date: 2026-11-16
surface: agent
model: agy
feature: giss-401
branch: crew/giss-401-u05-illustrate-r1
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/giss-401/crew-giss-401-u05-illustrate-r1.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u05-illustrate-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u05-illustrate-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GISS-401 Unit 5 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GISS-401 5` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-05/`.

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
- (giss-401-u05-illustrate, illustrate, agy) Upstream image generation quota on gemini-3.1-flash-image is exhausted until 2026-11-17T11:00:06Z; GISS-401 Unit 5 illustration manifests remain preserved at prompt-only.
- (giss-401-u05-illustrate, illustrate, agy) When quota resets, rerun scripts/heavy.sh node scripts/generate-illustration.mjs GISS-401 5 (scenes and --banner), inspect and place images, then run prepare-gate-evidence and repoint tasks.md.
- (giss-401-u05-illustrate, illustrate, agy) Check that the generated packets, wall chart and planning cards show no readable text, and that the sari is plain with no religious symbols on it.
- (giss-401-u05-plan_illustrations, plan_illustrations, claude) After placing the images, rerun `node scripts/prepare-gate-evidence.mjs GISS-401 5` and update the Unit 5 G2 row in `tasks.md`.
- (giss-401-u05-plan_illustrations, plan_illustrations, claude) Check that the generated packets, wall chart and planning cards show no readable text, and that the sari is plain with no religious symbols on it.


## Response snapshot

Preserved GISS-401 Unit 5 prompt-only illustration manifests and verified all 14 content gates pass after upstream image generation quota on gemini-3.1-flash-image returned 429 quota exhaustion resetting at 2026-11-17T11:00:06Z.

## Outcome

- Impact: illustrate for GISS-401 Unit 5 by agy (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Preserved GISS-401 Unit 5 prompt-only illustration manifests and verified all 14 content gates pass after upstream image generation quota on gemini-3.1-flash-image returned 429 quota exhaustion resetting at 2026-11-17T11:00:06Z.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Upstream image generation quota on gemini-3.1-flash-image remains exhausted until 2026-11-17T11:00:06Z; GISS-401 Unit 5 illustration manifests remain preserved at prompt-only.
  - When quota resets, rerun scripts/heavy.sh node scripts/generate-illustration.mjs GISS-401 5 (scenes and --banner), inspect and place images, then run prepare-gate-evidence and repoint tasks.md.
  - Check that the generated packets, wall chart and planning cards show no readable text, and that the sari is plain with no religious symbols on it.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
