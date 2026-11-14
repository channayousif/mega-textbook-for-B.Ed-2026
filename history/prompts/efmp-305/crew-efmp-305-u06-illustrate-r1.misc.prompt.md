---
id: crew-efmp-305-u06-illustrate-r1
title: crew illustrate EFMP-305 unit 6 r1
stage: misc
date: 2026-11-14
surface: agent
model: agy
feature: efmp-305
branch: crew/efmp-305-u06-illustrate-r1
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-305/crew-efmp-305-u06-illustrate-r1.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u06-illustrate-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u06-illustrate-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for EFMP-305 Unit 6 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-305 6` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-06/`.

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
- (efmp-305-u06-illustrate, illustrate, agy) Upstream image model gemini-3.1-flash-image quota is exhausted (HTTP 429 RESOURCE_EXHAUSTED) with quota reset timestamp 2026-11-17T11:00:06Z.
- (efmp-305-u06-illustrate, illustrate, agy) Figures fig-U6-7 through fig-U6-10 remain safely at prompt-only in unit-06.banner.md and unit-06.md with all 14 content gates passing.
- (efmp-305-u06-plan_illustrations, plan_illustrations, claude) fig-U6-7 to fig-U6-10 are prompt-only. The illustrate job must generate, inspect and place them and swap the three topic markers (EN+UR) for `<Figure>`, which will make the Unit 6 G2 evidence stale again.
- (efmp-305-u06-plan_illustrations, plan_illustrations, claude) The 6.3 scene prompt deliberately leaves out the key-word blackboard corner that the prose describes, so the image has no text; keep it that way when generating.
- (efmp-305-u06-repair_en-r1, repair_en, opencode) The shared source records `specs/content/efmp-305/sources/texts/unicef2014.md` and `sources/unit-06.md` stay unchanged because Unit 1 and Unit 6 G2 evidence binds them; editing them requires `node scripts/prepare-gate-evidence.mjs --refresh-stale` after committing.


## Response snapshot

Attempted EFMP-305 Unit 6 illustration generation round 1, confirmed upstream image model quota remains exhausted (HTTP 429 RESOURCE_EXHAUSTED resetting 2026-11-17), preserved prompt-only rows across unit-06.banner.md and unit-06.md, verified all 14 content gates pass, and committed prompt history record.

## Outcome

- Impact: illustrate round 1 for EFMP-305 Unit 6 by agy.
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Attempted EFMP-305 Unit 6 illustration generation round 1, confirmed upstream image model quota remains exhausted (HTTP 429 RESOURCE_EXHAUSTED resetting 2026-11-17), preserved prompt-only rows across unit-06.banner.md and unit-06.md, verified all 14 content gates pass, and committed prompt history record.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Upstream image model gemini-3.1-flash-image quota remains exhausted (HTTP 429 RESOURCE_EXHAUSTED) with quota reset timestamp 2026-11-17T11:00:06Z.
  - Figures fig-U6-7 through fig-U6-10 remain safely at prompt-only in unit-06.banner.md and unit-06.md with all 14 content gates passing.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
