---
id: crew-geng-301-u02-illustrate
title: crew illustrate GENG-301 unit 2
stage: misc
date: 2026-11-15
surface: agent
model: agy
feature: geng-301
branch: crew/geng-301-u02-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/geng-301/crew-geng-301-u02-illustrate.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u02-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u02-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GENG-301 Unit 2 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GENG-301 2` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-02/`.

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
- (geng-301-u02-plan_illustrations, plan_illustrations, claude) Illustrate job: produce `fig-U2-9` with `scripts/generate-illustration.mjs geng-301 2 --banner`, and the topic scenes `fig-U2-10` to `fig-U2-13` from their rows in `figures/unit-02.md`, then move each row prompt-only → generated → placed.
- (geng-301-u02-plan_illustrations, plan_illustrations, claude) After placing these images, regenerate the G2 evidence again, because changing the topic files makes the manifest from 20261113T193245605Z stale.
- (geng-301-u02-repair_en-r1-conflict1, fix, opencode) The merge was clean; no scope-file edits were needed because origin/main had not touched the Unit 2 files this branch changed.
- (geng-301-u02-repair_en-r1-conflict1, fix, opencode) F1 wordmark geometry in `static/img/figures/geng-301/unit-02/` is still unverified in Chromium; the openstax2021 vs writing2015 source mapping and session provenance remain owner decisions.
- (geng-301-u02-repair_en-r1-conflict1, fix, opencode) G3 stays open and unsigned (ADR-0019); a fresh independent G3 review is still required.


## Response snapshot

Attempted GENG-301 Unit 2 illustration generation via scripts/heavy.sh node scripts/generate-illustration.mjs GENG-301 2 and --banner under ADR-0029; confirmed upstream image quota exhaustion (HTTP 429 RESOURCE_EXHAUSTED) on gemini-3.1-flash-image resetting at 2026-11-17T11:00:06Z; verified all 14 content gates pass with prompt-only rows intact.

## Outcome

- Impact: illustrate for GENG-301 Unit 2 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified upstream image generation quota remains exhausted on gemini-3.1-flash-image resetting at 2026-11-17T11:00:06Z, kept prompt-only manifests intact with all 14 content gates passing, and recorded prompt history.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Upstream image model gemini-3.1-flash-image quota remains exhausted (HTTP 429 RESOURCE_EXHAUSTED) resetting at 2026-11-17T11:00:06Z.
  - Figures fig-U2-9, fig-U2-10, fig-U2-11, fig-U2-12, and fig-U2-13 remain preserved at prompt-only in unit-02.banner.md and unit-02.md with all 14 content gates passing.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: upstream image model quota exhaustion (HTTP 429 RESOURCE_EXHAUSTED)
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): rerun after quota reset
