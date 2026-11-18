---
id: crew-efmp-407-u04-illustrate
title: crew illustrate EFMP-407 unit 4
stage: misc
date: 2026-11-07
surface: agent
model: agy
feature: efmp-407
branch: crew/efmp-407-u04-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/unit-04/index.mdx
 - history/prompts/general/2464-efmp-407-u04-illustrate.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/index.mdx
 - specs/content/efmp-407/figures/unit-04.banner.md
 - specs/content/efmp-407/figures/unit-04.illustration-notes.md
 - specs/content/efmp-407/figures/unit-04.md
 - specs/content/efmp-407/reviews/unit-04/G2/20261107T200113556Z-gates.json
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T200113556Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T200113556Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T200113556Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T200113556Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T200113556Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T200113556Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T200113556Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T200113556Z/validate-content.txt
 - specs/content/efmp-407/tasks.md
 - static/img/figures/efmp-407/unit-04/fig-U4-7.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u04-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u04-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for EFMP-407 Unit 4 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-407 4` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-04/`.

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
- (efmp-407-u04-translate-conflict1, fix, opencode) Unit 4 G2 row keeps the branch's refreshed gates pointer `20261107T111834578Z`, superseding main's stale `20261107T074842577Z`; main's Unit 3 rows are retained unchanged.
- (efmp-407-u04-translate-conflict1, fix, opencode) `static/content-status.json` is git-ignored and was regenerated locally only; a root-scope job must regenerate it before publication.
- (efmp-407-u04-translate-conflict1, fix, opencode) Urdu mirror unchanged from `0418d1b87`; translation_status stays draft, G3/G5 open, and CI figure-geometry plus a permitted render-inspect remain pending.
- (efmp-407-u04-translate, translate, opencode) Urdu mirror is unchanged from commit 0418d1b87; translation_status stays draft, G3/G5 open, and no G4 completion row was added.
- (efmp-407-u04-translate, translate, opencode) Urdu prose uses "کوڑے دان" for "bin" in topic-01/02, unit-assessment and fig-U4-3.ur.svg; a reviewer may prefer "کوڑا دان", but editing SVG text needs a Playwright geometry run this brief prohibits.


## Response snapshot

Generated, inspected, and placed the EFMP-407 Unit 4 raster banner in English and Urdu index pages, refreshed G2 gate evidence, and verified all 14 content gates pass.

## Outcome

- Impact: illustrate for EFMP-407 Unit 4 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated, inspected, and placed the EFMP-407 Unit 4 raster banner in English and Urdu index pages, refreshed G2 gate evidence, and verified all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Placed banner fig-U4-7.webp in both English and Urdu unit index files, updating unit-04.banner.md to placed.
  - Refreshed G2 gate evidence and updated tasks.md pointer following English file updates.
  - Independent G3 English review and G5 Urdu review remain open and uncertified.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
