---
id: crew-gicp-400-u03-illustrate
title: crew illustrate GICP-400 unit 3
stage: misc
date: 2026-11-07
surface: agent
model: agy
feature: gicp-400
branch: crew/gicp-400-u03-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/gicp-400/unit-03/index.mdx
 - history/prompts/gicp-400/crew-gicp-400-u03-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-03/index.mdx
 - specs/content/gicp-400/figures/unit-03.banner.md
 - specs/content/gicp-400/reviews/unit-03/G2/20261107T002637002Z-gates.json
 - specs/content/gicp-400/reviews/unit-03/G2/logs-20261107T002637002Z/check-bloom-bands.txt
 - specs/content/gicp-400/reviews/unit-03/G2/logs-20261107T002637002Z/check-concept-graph.txt
 - specs/content/gicp-400/reviews/unit-03/G2/logs-20261107T002637002Z/check-depth-gate.txt
 - specs/content/gicp-400/reviews/unit-03/G2/logs-20261107T002637002Z/check-docs-sync.txt
 - specs/content/gicp-400/reviews/unit-03/G2/logs-20261107T002637002Z/check-figures.txt
 - specs/content/gicp-400/reviews/unit-03/G2/logs-20261107T002637002Z/check-no-answer-keys.txt
 - specs/content/gicp-400/reviews/unit-03/G2/logs-20261107T002637002Z/check-no-em-dash.txt
 - specs/content/gicp-400/reviews/unit-03/G2/logs-20261107T002637002Z/validate-content.txt
 - specs/content/gicp-400/tasks.md
 - static/img/figures/gicp-400/unit-03/fig-U3-5.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u03-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u03-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for GICP-400 Unit 3 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GICP-400 3` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-03/`.

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
- (gicp-400-u03-translate, translate, claude) English defects are listed in the G4 handoff and left unfixed: "disvoting rights", "holded", "an powerful", the fig-U3-3 alt not matching its rows, and uncited or untaught items; any English fix needs a matching Urdu edit.
- (gicp-400-u03-translate, translate, claude) `measure-figure-text.mjs` and `render-inspect.mjs --locale ur` have not run on this unit; run them before G5.
- (gicp-400-u03-translate, translate, claude) G3 is still an unsigned advisory escalation (Abbas 2023 and Shah 2026 full texts unbound), so an accepted G5 cannot bind until that is resolved.
- (gicp-400-u03-review_en, review_en, agy) G3 remains open and advisory under escalate disposition due to unbound secondary source texts and execution prohibitions on browser/print inspection tooling.
- (gicp-400-u03-review_en, review_en, agy) Live browser rendering (360px viewport, table scrolling, A4 print) and SVG text-geometry validation must be executed on a host permitted to run Chromium.


## Response snapshot

Generated, inspected, and placed the GICP-400 Unit 3 banner illustration (fig-U3-5) in English and Urdu index files, updated the banner manifest to placed, refreshed G2 gate evidence, and passed all 14 content gates.

## Outcome

- Impact: illustrate for GICP-400 Unit 3 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated, inspected, and placed the GICP-400 Unit 3 banner illustration (fig-U3-5) in English and Urdu index files, updated the banner manifest to placed, refreshed G2 gate evidence, and passed all 14 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - English G3 remains open and advisory under escalate disposition due to unbound secondary sources (Abbas 2023, Shah 2026), missing run provenance, and browser/A4 inspection prohibitions.
  - Urdu translation remains draft; independent G5 review, browser/print inspection, and SVG text-geometry validation remain pending on a host permitted to run Chromium.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
