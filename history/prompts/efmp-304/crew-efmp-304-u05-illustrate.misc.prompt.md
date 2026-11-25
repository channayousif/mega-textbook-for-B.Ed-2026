---
id: crew-efmp-304-u05-illustrate
title: crew illustrate EFMP-304 unit 5
stage: misc
date: 2026-11-25
surface: agent
model: agy
feature: efmp-304
branch: crew/efmp-304-u05-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-304/unit-05/index.mdx
 - docs/semester-2/efmp-304/unit-05/topic-01.mdx
 - docs/semester-2/efmp-304/unit-05/topic-02.mdx
 - docs/semester-2/efmp-304/unit-05/topic-03.mdx
 - docs/semester-2/efmp-304/unit-05/topic-04.mdx
 - history/prompts/efmp-304/crew-efmp-304-u05-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-05/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-05/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-05/topic-04.mdx
 - specs/content/efmp-304/figures/unit-05.banner.md
 - specs/content/efmp-304/figures/unit-05.md
 - specs/content/efmp-304/reviews/unit-05/G2/20261125T074638012Z-gates.json
 - specs/content/efmp-304/reviews/unit-05/G2/logs-20261125T074638012Z/check-bloom-bands.txt
 - specs/content/efmp-304/reviews/unit-05/G2/logs-20261125T074638012Z/check-concept-graph.txt
 - specs/content/efmp-304/reviews/unit-05/G2/logs-20261125T074638012Z/check-depth-gate.txt
 - specs/content/efmp-304/reviews/unit-05/G2/logs-20261125T074638012Z/check-docs-sync.txt
 - specs/content/efmp-304/reviews/unit-05/G2/logs-20261125T074638012Z/check-figures.txt
 - specs/content/efmp-304/reviews/unit-05/G2/logs-20261125T074638012Z/check-no-answer-keys.txt
 - specs/content/efmp-304/reviews/unit-05/G2/logs-20261125T074638012Z/check-no-em-dash.txt
 - specs/content/efmp-304/reviews/unit-05/G2/logs-20261125T074638012Z/validate-content.txt
 - specs/content/efmp-304/tasks.md
 - static/img/figures/efmp-304/unit-05/fig-U5-10.webp
 - static/img/figures/efmp-304/unit-05/fig-U5-11.webp
 - static/img/figures/efmp-304/unit-05/fig-U5-12.webp
 - static/img/figures/efmp-304/unit-05/fig-U5-13.webp
 - static/img/figures/efmp-304/unit-05/fig-U5-9.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u05-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u05-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for EFMP-304 Unit 5 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-304 5` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it picks the image producer itself (agy, then gflow while the owner's PC is reachable, then Codex; each image's producer is printed on its ✓ line), optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-304 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-05/`.

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
- (efmp-304-u05-plan_illustrations, plan_illustrations, claude) Illustrate job: the banner is `fig-U5-9` in `unit-05.banner.md`, and the topic scenes are `fig-U5-10`..`fig-U5-13`. The topic scenes still need their Urdu `<Figure>` with Urdu alt text when they are placed.
- (efmp-304-u05-plan_illustrations, plan_illustrations, claude) Adding the markers changed the English topic files, so the G3 review stays stale and needs a fresh independent run.
- (efmp-304-u05-fix, fix, opencode) G3 en-review row for EFMP-304 Unit 5 is now stale and needs a fresh independent review before the unit can advance to G4/G5 re-verification.
- (efmp-304-u05-fix, fix, opencode) Column widths for fig-U5-7 are now 90/140/130/100/120/140 (not the original 90/100/130/120/100/180)  -  any future edit to this figure must preserve the new geometry.
- (efmp-304-u05-fix, fix, opencode) No further figure work is owed on EFMP-304 Unit 5; `check:content` 13/13 pass and `measure-figure-text.mjs` exits 0 for both locales.


## Response snapshot

Produced, inspected, and placed unit banner fig-U5-9 and topic illustrations fig-U5-10 through fig-U5-13 for EFMP-304 Unit 5 in English and Urdu, refreshed G2 gate evidence, and verified clean passes across all 14 content gates.

## Outcome

- Impact: illustrate for EFMP-304 Unit 5 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 28 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Produced, inspected, and placed unit banner fig-U5-9 and topic illustrations fig-U5-10 through fig-U5-13 for EFMP-304 Unit 5 in English and Urdu, refreshed G2 gate evidence, and verified clean passes across all 14 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 en-review row for EFMP-304 Unit 5 remains open/stale and needs a fresh independent G3 run following the figure placements.
  - Column widths for fig-U5-7 remain 90/140/130/100/120/140; any future edit must preserve this geometry.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
