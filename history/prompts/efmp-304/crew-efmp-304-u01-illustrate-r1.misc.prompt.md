---
id: crew-efmp-304-u01-illustrate-r1
title: crew illustrate EFMP-304 unit 1 (round 1)
stage: misc
date: 2026-11-14
surface: agent
model: agy
feature: efmp-304
branch: crew/efmp-304-u01-illustrate-r1
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-304/crew-efmp-304-u01-illustrate-r1.misc.prompt.md
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-304-u01-illustrate-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u01-illustrate-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for EFMP-304 Unit 1 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-304 1` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-304 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-01/`.

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
- (efmp-304-u01-illustrate, illustrate, agy) fig-U1-11 (unit banner in unit-01.banner.md) and fig-U1-15 (Topic 1.5 scene) remain prompt-only due to upstream image generation quota exhaustion resetting at 2026-11-14T05:03:27Z.
- (efmp-304-u01-illustrate, illustrate, agy) Fresh independent G3 and dependent G5 reviews remain pending; ADR-0019 two-cycle limit may require owner authorization before re-running.
- (efmp-304-u01-plan_illustrations, plan_illustrations, claude) The illustrate job still has to generate, inspect and place `fig-U1-11` (with `--banner`) and `fig-U1-12` to `fig-U1-15`, then replace the four scene markers in the EN and UR topic files (topics 01, 02, 03, 05) with `<Figure>` elements.
- (efmp-304-u01-plan_illustrations, plan_illustrations, claude) Replacing those markers will make the Unit 1 G2 evidence out of date again; rerun `node scripts/prepare-gate-evidence.mjs EFMP-304 1` on a clean tree and update the row at `specs/content/efmp-304/tasks.md:15`.
- (efmp-304-u01-repair_en-r1, repair_en, opencode) Visual browser/print inspection (360px viewport, table scrollability, A4 print) remains unexecuted; full G3 certification needs permitted browser tooling on a live build.

## Response snapshot

Attempted generation of remaining illustrations (fig-U1-15 and banner fig-U1-11); verified image quota is exhausted until 2026-11-14T05:03:27Z; inspected existing placed illustrations fig-U1-12, fig-U1-13, fig-U1-14 confirming cultural authenticity and quality; verified all content gates pass cleanly.

## Outcome

- Impact: illustrate retry round 1 for EFMP-304 Unit 1 by agy.
- Tests: npm run check:content passed with 14/14 content gates green.
- Files: 1 file(s) recorded in prompt history.
- Next prompts: rerun illustration generation once image quota resets at 2026-11-14T05:03:27Z.
- Reflection: image generation quota exhausted upstream on gemini-3.1-flash-image; cleanly documented and preserved valid prompt-only state.

## Handoff (for CEO and agents)

- Shipped / changed: Attempted illustration generation for EFMP-304 Unit 1; confirmed image quota reset at 2026-11-14T05:03:27Z; verified existing placed figures fig-U1-12, fig-U1-13, fig-U1-14; ran full content gates.
- Decisions the team must respect: fig-U1-11 and fig-U1-15 remain prompt-only until upstream quota resets.
- Pending / next owner: next illustrate run after 2026-11-14T05:03:27Z.
- Notes for the next job on this unit:
  - fig-U1-11 (unit banner in unit-01.banner.md) and fig-U1-15 (Topic 1.5 scene) remain prompt-only due to upstream image generation quota exhaustion resetting at 2026-11-14T05:03:27Z.
  - Fresh independent G3 and dependent G5 reviews remain pending; ADR-0019 two-cycle limit may require owner authorization before re-running.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: upstream image generator quota exhausted (429 RESOURCE_EXHAUSTED).
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): rerun generate-illustration after quota reset.
