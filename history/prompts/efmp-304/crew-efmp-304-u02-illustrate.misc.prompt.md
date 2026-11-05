---
id: crew-efmp-304-u02-illustrate
title: crew illustrate EFMP-304 unit 2
stage: misc
date: 2026-11-05
surface: agent
model: agy
feature: efmp-304
branch: crew/efmp-304-u02-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-304/unit-02/index.mdx
 - history/prompts/efmp-304/crew-efmp-304-u02-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/index.mdx
 - specs/content/efmp-304/figures/unit-02.banner.md
 - specs/content/efmp-304/reviews/unit-02/G2/20261105T162929826Z-gates.json
 - specs/content/efmp-304/reviews/unit-02/G2/logs-20261105T162929826Z/check-bloom-bands.txt
 - specs/content/efmp-304/reviews/unit-02/G2/logs-20261105T162929826Z/check-concept-graph.txt
 - specs/content/efmp-304/reviews/unit-02/G2/logs-20261105T162929826Z/check-depth-gate.txt
 - specs/content/efmp-304/reviews/unit-02/G2/logs-20261105T162929826Z/check-docs-sync.txt
 - specs/content/efmp-304/reviews/unit-02/G2/logs-20261105T162929826Z/check-figures.txt
 - specs/content/efmp-304/reviews/unit-02/G2/logs-20261105T162929826Z/check-no-answer-keys.txt
 - specs/content/efmp-304/reviews/unit-02/G2/logs-20261105T162929826Z/check-no-em-dash.txt
 - specs/content/efmp-304/reviews/unit-02/G2/logs-20261105T162929826Z/validate-content.txt
 - specs/content/efmp-304/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u02-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u02-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for EFMP-304 Unit 2 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-304 2` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-304 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-02/`.

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
- (efmp-304-u02-repair_en, repair_en, codex) Course owner must address overview weighting and audit Unit 3’s shared source attribution.
- (efmp-304-u02-repair_en, repair_en, codex) G3 remains unticked; fresh independent G3/G5 and permitted browser geometry/rendering checks are required.
- (efmp-304-u02-repair_en, repair_en, codex) Course owner must address overview weighting and audit Unit 3’s shared source attribution.
- (efmp-304-u02-fix, fix, codex) Fresh independent G3 remains required; G3/G5 were not certified.
- (efmp-304-u02-fix, fix, codex) Fresh independent G3 remains required; G3/G5 were not certified.


## Response snapshot

Inspected and placed EFMP-304 Unit 2 banner illustration (fig-U2-9) in English and Urdu index files, updated the banner manifest to placed, refreshed G2 gate evidence, and verified check:content clean across all 14 gates.

## Outcome

- Impact: illustrate for EFMP-304 Unit 2 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 14 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Inspected and placed EFMP-304 Unit 2 banner illustration (fig-U2-9) in English and Urdu index files, updated the banner manifest to placed, refreshed G2 gate evidence, and verified check:content clean across all 14 gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Fresh independent G3 remains required; G3/G5 were not certified.
  - Course owner must address overview weighting and audit Unit 3's shared source attribution.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
