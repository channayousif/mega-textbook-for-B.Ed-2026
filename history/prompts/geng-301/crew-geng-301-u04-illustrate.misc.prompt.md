---
id: crew-geng-301-u04-illustrate
title: crew illustrate GENG-301 unit 4
stage: misc
date: 2026-11-26
surface: agent
model: agy
feature: geng-301
branch: crew/geng-301-u04-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/geng-301/unit-04/index.mdx
 - docs/semester-2/geng-301/unit-04/topic-01.mdx
 - docs/semester-2/geng-301/unit-04/topic-02.mdx
 - docs/semester-2/geng-301/unit-04/topic-03.mdx
 - history/prompts/geng-301/crew-geng-301-u04-illustrate.misc.prompt.md
 - specs/content/geng-301/figures/unit-04.banner.md
 - specs/content/geng-301/figures/unit-04.md
 - specs/content/geng-301/reviews/unit-04/G2/20261126T172545046Z-gates.json
 - specs/content/geng-301/reviews/unit-04/G2/logs-20261126T172545046Z/check-bloom-bands.txt
 - specs/content/geng-301/reviews/unit-04/G2/logs-20261126T172545046Z/check-concept-graph.txt
 - specs/content/geng-301/reviews/unit-04/G2/logs-20261126T172545046Z/check-depth-gate.txt
 - specs/content/geng-301/reviews/unit-04/G2/logs-20261126T172545046Z/check-docs-sync.txt
 - specs/content/geng-301/reviews/unit-04/G2/logs-20261126T172545046Z/check-figures.txt
 - specs/content/geng-301/reviews/unit-04/G2/logs-20261126T172545046Z/check-no-answer-keys.txt
 - specs/content/geng-301/reviews/unit-04/G2/logs-20261126T172545046Z/check-no-em-dash.txt
 - specs/content/geng-301/reviews/unit-04/G2/logs-20261126T172545046Z/validate-content.txt
 - specs/content/geng-301/tasks.md
 - static/img/figures/geng-301/unit-04/fig-U4-10.webp
 - static/img/figures/geng-301/unit-04/fig-U4-7.webp
 - static/img/figures/geng-301/unit-04/fig-U4-8.webp
 - static/img/figures/geng-301/unit-04/fig-U4-9.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u04-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u04-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GENG-301 Unit 4 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GENG-301 4 --producer gflow` for the topic scenes and again with `--banner` (same flags) for the unit banner (unit-NN.banner.md); this job holds the crew's gflow image lane, so use only that producer (other units' jobs use the other producers at the same time; each image's producer is printed on its ✓ line). If it exits 3 (gflow is out of quota), stop as described below and the crew moves the job to a free producer, optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-04/`.

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
- (geng-301-u04-plan_illustrations, plan_illustrations, claude) Unit 4 has no Urdu mirror, so when the illustrate job places `fig-U4-8`..`fig-U4-10` there is no Urdu topic file to add a `<Figure>` to.
- (geng-301-u04-plan_illustrations, plan_illustrations, claude) The G3 en-review for Unit 4 still needs a fresh independent run; the new illustration markers are now part of the English content it will review.
- (geng-301-u04-fix, fix, opencode) G3 en-review needs a fresh independent run (ADR-0019)  -  the previous advisory pass predates the figure-geometry repair.
- (geng-301-u04-fix, fix, opencode) The `.wm` class omission is a recurring template-authoring bug; consider adding it explicitly to the svg-authoring.md boilerplate to prevent recurrence in future figure generation.
- (geng-301-u04-review_en, review_en, agy) Advisory finding F1 notes "textbook.com.pk" wordmark overflows right viewBox boundary on all 12 SVG figure assets for Unit 4.


## Response snapshot

Generated and placed the Unit 4 banner and topic raster illustrations in GENG-301 with manifests updated to placed, refreshed G2 gate evidence and tasks tracker, and verified all 14 content gates pass.

## Outcome

- Impact: illustrate for GENG-301 Unit 4 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 21 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated and placed the Unit 4 banner and topic raster illustrations in GENG-301 with manifests updated to placed, refreshed G2 gate evidence and tasks tracker, and verified all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - GENG-301 Unit 4 has no Urdu mirror, so no Urdu files were modified or created.
  - The G3 en-review for Unit 4 still needs a fresh independent run (ADR-0019); the newly placed illustrations are part of the content it will evaluate.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
