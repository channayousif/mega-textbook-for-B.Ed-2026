---
id: crew-geng-301-u01-illustrate-r1
title: crew illustrate GENG-301 unit 1 (attempt 2)
stage: misc
date: 2026-11-15
surface: agent
model: agy
feature: geng-301
branch: crew/geng-301-u01-illustrate-r1
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/geng-301/crew-geng-301-u01-illustrate-r1.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u01-illustrate-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u01-illustrate-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GENG-301 Unit 1 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GENG-301 1` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-01/`.

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
- (geng-301-u01-illustrate, illustrate, agy) Upstream image model gemini-3.1-flash-image quota remains exhausted (HTTP 429 RESOURCE_EXHAUSTED) resetting at 2026-11-17T11:00:06Z.
- (geng-301-u01-illustrate, illustrate, agy) Figures fig-U1-7, fig-U1-8, fig-U1-9, and fig-U1-10 remain preserved at prompt-only in unit-01.banner.md and unit-01.md with all 14 content gates passing.
- (geng-301-u01-plan_illustrations, plan_illustrations, claude) The illustrate job generates and places fig-U1-7 with `scripts/generate-illustration.mjs geng-301 1 --banner`, and fig-U1-8 to fig-U1-10 from the topic markers.
- (geng-301-u01-plan_illustrations, plan_illustrations, claude) Unit 1 has no Urdu files yet, so whoever translates the topics must carry the fig-U1-8 to fig-U1-10 marker IDs into them.
- (geng-301-u01-repair_en-r1, repair_en, codex) G3 remains open; owner source-mapping alignment and independent render, provenance and blind-solving evidence remain pending.


## Response snapshot

Attempted GENG-301 Unit 1 illustration generation via scripts/heavy.sh node scripts/generate-illustration.mjs GENG-301 1 under ADR-0029; confirmed upstream image quota exhaustion (HTTP 429 RESOURCE_EXHAUSTED) on gemini-3.1-flash-image resetting at 2026-11-17T11:00:06Z; verified all 14 content gates pass with prompt-only rows intact.

## Outcome

- Impact: illustrate for GENG-301 Unit 1 by agy (attempt 2).
- Tests: npm run check:content passed with all 14 gates green.
- Files: 1 file(s), listed above.
- Next prompts: rerun illustration generation after quota reset at 2026-11-17T11:00:06Z.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified upstream image generation quota remains exhausted on gemini-3.1-flash-image (resets 2026-11-17T11:00:06Z), preserved prompt-only figure manifests, verified all 14 content gates pass, and committed prompt history record.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Upstream image model gemini-3.1-flash-image quota remains exhausted (HTTP 429 RESOURCE_EXHAUSTED) resetting at 2026-11-17T11:00:06Z.
  - Figures fig-U1-7, fig-U1-8, fig-U1-9, and fig-U1-10 remain preserved at prompt-only in unit-01.banner.md and unit-01.md with all 14 content gates passing.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: upstream image model quota exhaustion (HTTP 429 RESOURCE_EXHAUSTED)
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): rerun after quota reset
