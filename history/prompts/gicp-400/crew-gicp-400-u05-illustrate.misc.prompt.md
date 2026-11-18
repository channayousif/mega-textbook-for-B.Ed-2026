---
id: crew-gicp-400-u05-illustrate
title: crew illustrate GICP-400 unit 5
stage: misc
date: 2026-11-07
surface: agent
model: agy
feature: gicp-400
branch: crew/gicp-400-u05-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/gicp-400/unit-05/index.mdx
 - history/prompts/gicp-400/crew-gicp-400-u05-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-05/index.mdx
 - specs/content/gicp-400/figures/unit-05.banner.md
 - specs/content/gicp-400/reviews/unit-05/G2/20261107T044305246Z-gates.json
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261107T044305246Z/check-bloom-bands.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261107T044305246Z/check-concept-graph.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261107T044305246Z/check-depth-gate.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261107T044305246Z/check-docs-sync.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261107T044305246Z/check-figures.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261107T044305246Z/check-no-answer-keys.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261107T044305246Z/check-no-em-dash.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261107T044305246Z/validate-content.txt
 - specs/content/gicp-400/tasks.md
 - static/img/figures/gicp-400/unit-05/fig-U5-7.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u05-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u05-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for GICP-400 Unit 5 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GICP-400 5` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-05/`.

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
- (gicp-400-u05-translate, translate, opencode) Chromium `measure-figure-text.mjs` and `render-inspect.mjs --locale ur` were not run (crew brief prohibits Playwright); a Pillow + Raqm approximation of the gate’s geometry checks passed on all six `.ur.svg`, so the next authorised session should run the real browser geometry and A4/narrow-width render inspection.
- (gicp-400-u05-translate, translate, opencode) The UR index declares `key_terms: []` because none of the unit’s key concepts is in `terminology.csv`; the handoff at `specs/content/gicp-400/reviews/unit-05/G4/translation-handoff.md` lists every unbanked term used, as owner proposals.
- (gicp-400-u05-translate, translate, opencode) English G3 stays escalated (`specs/content/gicp-400/reviews/unit-05/G3/`): Figure 5.6 resource-condition alt text, source/provenance checks and a fresh blind assessment solve remain open; any English repair needs matching Urdu repairs.
- (gicp-400-u05-review_en-conflict1, fix, opencode) `static/content-status.json` is gitignored and must be regenerated before `check:content` in a fresh worktree.
- (gicp-400-u05-review_en-conflict1, fix, opencode) G3 stays `▢` advisory; Figure 5.6 alt-text repair, source/provenance checks, rendered review and a fresh blind assessment solve remain open.


## Response snapshot

Generated and placed the GICP-400 Unit 5 banner illustration (fig-U5-7) in English and Urdu unit indexes, updated banner manifest to placed, refreshed G2 gate evidence, and passed all 14 content gates.

## Outcome

- Impact: illustrate for GICP-400 Unit 5 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated and placed the GICP-400 Unit 5 banner illustration (fig-U5-7) in English and Urdu unit indexes, updated banner manifest to placed, refreshed G2 gate evidence, and passed all 14 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Both English and Urdu unit locales remain translation_status: draft with G3, G4, and G5 open pending independent review and qualification.
  - Figure 5.6 resource-condition alt text, source/provenance checks and a fresh blind assessment solve remain open on English G3.
  - Browser-based rendered inspection across 1280px, 360px, and A4 print emulation remains pending for an authorized session under host environment restrictions.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
