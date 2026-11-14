---
id: crew-efmp-305-u05-illustrate
title: crew illustrate EFMP-305 unit 5
stage: misc
date: 2026-11-14
surface: agent
model: agy
feature: efmp-305
branch: crew/efmp-305-u05-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-305/crew-efmp-305-u05-illustrate.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u05-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u05-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for EFMP-305 Unit 5 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-305 5` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-05/`.

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
- (efmp-305-u05-plan_illustrations, plan_illustrations, claude) fig-U5-7..10 are prompt-only; the illustrate job must generate, inspect and place them and swap the three topic markers (EN+UR) for `<Figure>`, which will make the Unit 5 G2 evidence stale again.
- (efmp-305-u05-plan_illustrations, plan_illustrations, claude) fig-U5-8 and fig-U5-9 show the same office and people three weeks apart; keep the head teacher, the father and the deaf boy looking the same in both images.
- (efmp-305-u05-repair_en-r1, repair_en, opencode) The 20261108 G3 findings are byte-identical to the 20261102 set already repaired on main in 12b3c13a5, so no prose edit was needed; F2-F8 are present in EN and UR.
- (efmp-305-u05-repair_en-r1, repair_en, opencode) F1 provenance/rendering and a fresh independent G3 with MCQ re-solve remain owner/host work; G3 stays unticked.
- (efmp-305-u05-repair_en-conflict3, fix, opencode) tasks.md conflict resolved by keeping main's Unit 6 G3 advisory row then this branch's Unit 5 G3/G2 rows; no other paths conflicted.


## Response snapshot

Attempted EFMP-305 Unit 5 illustration generation, detected upstream image model quota exhaustion resetting on 2026-11-17, preserved prompt-only rows, and committed prompt history record.

## Outcome

- Impact: illustrate for EFMP-305 Unit 5 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Attempted EFMP-305 Unit 5 illustration generation, detected upstream image model quota exhaustion resetting on 2026-11-17, preserved prompt-only rows, and committed prompt history record.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Upstream image model gemini-3.1-flash-image quota is exhausted (HTTP 429 RESOURCE_EXHAUSTED) with quota reset timestamp 2026-11-17T11:00:06Z.
  - Figures fig-U5-7, fig-U5-8, fig-U5-9, and fig-U5-10 remain safely at prompt-only in unit-05.banner.md and unit-05.md with all 14 content gates passing.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
