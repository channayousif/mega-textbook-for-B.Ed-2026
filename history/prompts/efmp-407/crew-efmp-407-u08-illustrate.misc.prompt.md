---
id: crew-efmp-407-u08-illustrate
title: crew illustrate EFMP-407 unit 8
stage: misc
date: 2026-11-08
surface: agent
model: agy
feature: efmp-407
branch: crew/efmp-407-u08-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/efmp-407/unit-08/index.mdx
  - history/prompts/efmp-407/crew-efmp-407-u08-illustrate.misc.prompt.md
  - history/prompts/general/2468-efmp-407-u08-illustrate.general.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-08/index.mdx
  - specs/content/efmp-407/figures/unit-08.banner.md
  - specs/content/efmp-407/figures/unit-08.illustration-notes.md
  - specs/content/efmp-407/figures/unit-08.md
  - specs/content/efmp-407/reviews/unit-08/G2/20261108T170944259Z-gates.json
  - specs/content/efmp-407/reviews/unit-08/G2/logs-20261108T170944259Z/check-bloom-bands.txt
  - specs/content/efmp-407/reviews/unit-08/G2/logs-20261108T170944259Z/check-concept-graph.txt
  - specs/content/efmp-407/reviews/unit-08/G2/logs-20261108T170944259Z/check-depth-gate.txt
  - specs/content/efmp-407/reviews/unit-08/G2/logs-20261108T170944259Z/check-docs-sync.txt
  - specs/content/efmp-407/reviews/unit-08/G2/logs-20261108T170944259Z/check-figures.txt
  - specs/content/efmp-407/reviews/unit-08/G2/logs-20261108T170944259Z/check-no-answer-keys.txt
  - specs/content/efmp-407/reviews/unit-08/G2/logs-20261108T170944259Z/check-no-em-dash.txt
  - specs/content/efmp-407/reviews/unit-08/G2/logs-20261108T170944259Z/validate-content.txt
  - specs/content/efmp-407/tasks.md
  - static/img/figures/efmp-407/unit-08/fig-U8-5.webp
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-407-u08-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u08-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for EFMP-407 Unit 8 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-407 8` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-08/`.

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
- (efmp-407-u08-translate-conflict1, fix, opencode) G3 remains open (F1 Jumani and Abbasi attribution unfixed; codex r1 escalation row kept from main); translation_status stays draft.
- (efmp-407-u08-translate-conflict1, fix, opencode) `static/content-status.json` is gitignored/generated; regenerated locally so `check:content` passes, but it is not committed.
- (efmp-407-u08-translate, translate, codex) G3 repairs, independent G5, browser geometry and Urdu/A4 inspection remain pending; translation_status stays draft.
- (efmp-407-u08-translate, translate, codex) G3 repairs, independent G5, browser geometry and Urdu/A4 inspection remain pending; translation_status stays draft.
- (efmp-407-u08-review_en-r1, review_en, codex) G3 remains open. Prior findings F1-F9 need author repairs; fresh review requires runtime provenance and browser/print evidence.


## Response snapshot

Placed and verified EFMP-407 Unit 8 banner illustration in English and Urdu index files, refreshed G2 gate evidence, and passed all 14 content gates.

## Outcome

- Impact: illustrate for EFMP-407 Unit 8 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Placed and verified EFMP-407 Unit 8 banner illustration in English and Urdu index files, refreshed G2 gate evidence, and passed all 14 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Placed banner fig-U8-5.webp in English and Urdu index files, updated unit-08.banner.md to placed, and refreshed G2 gate evidence.
  - Full Urdu translation and independent G3 English / G5 Urdu reviews remain open and uncertified.
  - The existing Jumani and Abbasi (2015) citation finding reported by review_en belongs to repair_en and remains unchanged.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: Initial generation included pseudo-text wall signage; successfully caught by inspection and regenerated clean.
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
