---
id: crew-gicp-400-u07-illustrate
title: crew illustrate GICP-400 unit 7
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: gicp-400
branch: crew/gicp-400-u07-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/gicp-400/unit-07/index.mdx
 - history/prompts/gicp-400/crew-gicp-400-u07-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-07/index.mdx
 - specs/content/gicp-400/figures/unit-07.banner.md
 - specs/content/gicp-400/reviews/unit-07/G2/20261110T183456940Z-gates.json
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261110T183456940Z/check-bloom-bands.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261110T183456940Z/check-concept-graph.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261110T183456940Z/check-depth-gate.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261110T183456940Z/check-docs-sync.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261110T183456940Z/check-figures.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261110T183456940Z/check-no-answer-keys.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261110T183456940Z/check-no-em-dash.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261110T183456940Z/validate-content.txt
 - specs/content/gicp-400/tasks.md
 - static/img/figures/gicp-400/unit-07/fig-U7-4.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u07-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u07-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for GICP-400 Unit 7 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GICP-400 7` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-07/`.

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
- (gicp-400-u07-translate-r1, translate, agy) Unit 7 draft Urdu mirror has full structural, component and figure parity; translation_status remains draft awaiting independent G5 review.
- (gicp-400-u07-translate-r1, translate, agy) Rendered mobile 360px and A4 print layout inspection remain outstanding under the crew browser restriction.
- (gicp-400-u07-repair_en, repair_en, agy) The ideology strand remains pending an owner ruling before translation (G4) or final certification.
- (gicp-400-u07-repair_en, repair_en, agy) G3 tracker row is appended as advisory revise with repairs applied and remains unticked (▢) awaiting fresh round-2 independent review under ADR-0019.
- (gicp-400-u07-repair_en, repair_en, agy) All 14 content gates pass and `measure-figure-text.mjs` passes with zero errors on all modified SVG variants.

## Feedback from the previous attempt
worker exited 3:
error: Our servers are experiencing high traffic right now, please try again in a minute. (UNAVAILABLE (code 503): No capacity available for model gemini-3.8-flash-high on the server)
AGY_ERROR: {"short_error":"UNAVAILABLE (code 503): No capacity available for model gemini-3.8-flash-high on the server","status":"UNAVAILABLE","error_code":503,"code_kind":"http","retryable":true,"error_id":"7d3fb3f9-b5e8-4652-9803-fcd163be539c-15-2010"}

## Response snapshot

Generated and placed the GICP-400 Unit 7 banner illustration (fig-U7-4) in English and Urdu unit indexes, updated banner manifest to placed, refreshed G2 gate evidence, and passed all 14 content gates.

## Outcome

- Impact: illustrate for GICP-400 Unit 7 by agy (attempt 2).
- Tests: npm run check:content passed in the job worktree before commit.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated and placed the GICP-400 Unit 7 banner illustration (fig-U7-4) in English and Urdu unit indexes, updated banner manifest to placed, refreshed G2 gate evidence, and passed all 14 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Both English and Urdu unit locales remain translation_status: draft with G3, G4, and G5 open pending independent review and qualification.
  - Live browser rendering across small-screen viewports (360px) and A4 print emulation remains pending for an authorized host.
  - Ideology strand remains pending an owner ruling before translation (G4) or final certification.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
