---
id: crew-gict-300-u04-illustrate
title: crew illustrate GICT-300 unit 4
stage: misc
date: 2026-11-15
surface: agent
model: agy
feature: gict-300
branch: crew/gict-300-u04-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/gict-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gict-300/crew-gict-300-u04-illustrate.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gict-300-u04-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gict-300-u04-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GICT-300 Unit 4 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GICT-300 4` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICT-300 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gict-300/`, and `static/img/figures/gict-300/unit-04/`.

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
- (gict-300-u04-plan_illustrations, plan_illustrations, claude) Placing fig-U4-9..13 changes the unit's bound inputs again, so the illustrate job must rerun `node scripts/prepare-gate-evidence.mjs GICT-300 4` and update the newer Unit 4 G2 row in `tasks.md` (there are two).
- (gict-300-u04-plan_illustrations, plan_illustrations, claude) The markers are English only; when the illustrate job places the figures, it mirrors them into the Urdu topic files.
- (gict-300-u04-repair_en-r1, repair_en, codex) A3 needs curriculum-owner reconciliation; A6 needs an out-of-scope tooling fix.
- (gict-300-u04-repair_en-r1, repair_en, codex) A3 needs curriculum-owner reconciliation; A6 needs an out-of-scope tooling fix.
- (gict-300-u04-repair_en-conflict1, fix, opencode) GICT-300 Unit 4 still has A3 curriculum-owner reconciliation and A6 review-tooling repair pending per earlier notes; G3 independent review remains unticked.


## Response snapshot

Attempted raster generation for GICT-300 Unit 4 with upstream image quota exhausted until 2026-11-17T11:00:06Z, keeping prompt-only manifests preserved and all 14 content gates green.

## Outcome

- Impact: illustrate for GICT-300 Unit 4 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Attempted raster generation for GICT-300 Unit 4 with upstream image quota exhausted until 2026-11-17T11:00:06Z, keeping prompt-only manifests preserved and all 14 content gates green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Upstream image generation quota on gemini-3.1-flash-image is exhausted until 2026-11-17T11:00:06Z; Unit 4 illustration manifests remain preserved at prompt-only.
  - When quota resets, rerun scripts/generate-illustration.mjs for GICT-300 4 (scenes and --banner), inspect and place images, then run prepare-gate-evidence and repoint tasks.md.
  - GICT-300 Unit 4 still has A3 curriculum-owner reconciliation and A6 review-tooling repair pending per earlier notes; G3 independent review remains unticked.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
