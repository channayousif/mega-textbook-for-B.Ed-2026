---
id: crew-geng-300-u04-illustrate
title: crew illustrate GENG-300 unit 4
stage: misc
date: 2026-11-15
surface: agent
model: agy
feature: geng-300
branch: crew/geng-300-u04-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/geng-300/crew-geng-300-u04-illustrate.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u04-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u04-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GENG-300 Unit 4 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GENG-300 4` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-300 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-04/`.

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
- (geng-300-u04-plan_illustrations, plan_illustrations, claude) The banner row is in `specs/content/geng-300/figures/unit-04.banner.md`; generate it with `scripts/generate-illustration.mjs geng-300 4 --banner`.
- (geng-300-u04-plan_illustrations, plan_illustrations, claude) Markers fig-U4-8 to fig-U4-10 are in the English topic files only. The Urdu mirrors have none, and any later edit to these markers makes the Unit 4 G2 evidence stale again.
- (geng-300-u04-repair_en-r1, repair_en, opencode) Report 20261108T203238Z repeats the 20261102T212207Z findings verbatim; its fig-U4-1 geometry text describes the pre-69e32dca7 single-line label and pre-ab85b5815 wordmark position, and the current SVGs pass measure-figure-text.mjs.
- (geng-300-u04-repair_en-r1, repair_en, opencode) The next independent G3 review must run in a browser-capable environment to execute render-review; the four primary sources remain declared unverified under D-2026-0001 until the print monographs are retrieved.
- (geng-300-u04-repair_en-r1, repair_en, opencode) fig-U4-6 still reports a cosmetic .panel/wordmark collision (92.7 x 8.5px, reported not failed); the wordmark is aria-hidden, so it hides no instructional label.


## Response snapshot

Attempted GENG-300 Unit 4 illustration generation, confirmed upstream image quota exhaustion until 2026-11-17, preserved prompt-only rows across unit-04.banner.md and unit-04.md, and committed prompt history record with all 14 content gates passing.

## Outcome

- Impact: illustrate for GENG-300 Unit 4 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Attempted GENG-300 Unit 4 illustration generation, confirmed upstream image quota exhaustion until 2026-11-17, preserved prompt-only rows across unit-04.banner.md and unit-04.md, and committed prompt history record with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Upstream image model gemini-3.1-flash-image quota remains exhausted (HTTP 429 RESOURCE_EXHAUSTED) resetting at 2026-11-17T11:00:06Z.
  - Figures fig-U4-7 through fig-U4-10 remain preserved at prompt-only across unit-04.banner.md and unit-04.md with all 14 content gates passing.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
