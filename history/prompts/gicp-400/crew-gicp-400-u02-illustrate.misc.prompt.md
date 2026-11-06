---
id: crew-gicp-400-u02-illustrate
title: crew illustrate GICP-400 unit 2
stage: misc
date: 2026-11-07
surface: agent
model: agy
feature: gicp-400
branch: crew/gicp-400-u02-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/gicp-400/unit-02/index.mdx
  - history/prompts/gicp-400/crew-gicp-400-u02-illustrate.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-02/index.mdx
  - specs/content/gicp-400/figures/unit-02.banner.md
  - specs/content/gicp-400/reviews/unit-02/G2/20261106T230323831Z-gates.json
  - specs/content/gicp-400/reviews/unit-02/G2/logs-20261106T230323831Z/check-bloom-bands.txt
  - specs/content/gicp-400/reviews/unit-02/G2/logs-20261106T230323831Z/check-concept-graph.txt
  - specs/content/gicp-400/reviews/unit-02/G2/logs-20261106T230323831Z/check-depth-gate.txt
  - specs/content/gicp-400/reviews/unit-02/G2/logs-20261106T230323831Z/check-docs-sync.txt
  - specs/content/gicp-400/reviews/unit-02/G2/logs-20261106T230323831Z/check-figures.txt
  - specs/content/gicp-400/reviews/unit-02/G2/logs-20261106T230323831Z/check-no-answer-keys.txt
  - specs/content/gicp-400/reviews/unit-02/G2/logs-20261106T230323831Z/check-no-em-dash.txt
  - specs/content/gicp-400/reviews/unit-02/G2/logs-20261106T230323831Z/validate-content.txt
  - specs/content/gicp-400/tasks.md
  - static/img/figures/gicp-400/unit-02/fig-U2-5.webp
tests:
  - npm run check:content
---

## Prompt

# Crew job gicp-400-u02-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u02-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for GICP-400 Unit 2 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GICP-400 2` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-02/`.

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
- (gicp-400-u02-translate, translate, opencode) `measure-figure-text.mjs` and `render-inspect.mjs --locale ur` were not run (brief forbids Chromium/builds/servers); Urdu SVG label geometry is hand-checked against each viewBox only.
- (gicp-400-u02-translate, translate, opencode) G4/G5 tracker rows stay open; the G4 handoff is at `specs/content/gicp-400/reviews/unit-02/G4/translation-handoff.md`, and the proposed non-banked Urdu terms are listed there for the owner.
- (gicp-400-u02-translate, translate, opencode) English G3 remains escalated and unsigned; a fresh reviewer must resolve its source/provenance dependencies before accepted G5 can bind.
- (gicp-400-u02-review_en, review_en, codex) G3 remains open pending source verification, run provenance and browser/A4 inspection.
- (gicp-400-u02-review_en, review_en, codex) G3 remains open pending source verification, run provenance and browser/A4 inspection.


## Response snapshot

Generated, visually inspected, and placed the GICP-400 Unit 2 banner illustration (`fig-U2-5`) in the English and Urdu index files, updated the banner manifest to placed, refreshed G2 gate evidence, and passed all 14 content gates.

## Outcome

- Impact: illustrate for GICP-400 Unit 2 by agy.
- Tests: npm run check:content passed with all 14 gates clean.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated, inspected, and placed the GICP-400 Unit 2 banner illustration (`fig-U2-5`) in English and Urdu index files, updated the banner manifest to placed, refreshed G2 gate evidence, and passed all 14 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this commit does not certify review stages.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - English G3 remains escalated and unsigned; partial source verification, missing run provenance, and prohibited browser/A4 inspection remain open.
  - Urdu translation remains draft; independent G5 review, browser/print inspection, and SVG text-geometry checks remain pending on a host permitted to run Chromium.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
