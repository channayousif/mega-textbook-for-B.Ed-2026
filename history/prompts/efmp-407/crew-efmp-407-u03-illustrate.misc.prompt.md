---
id: crew-efmp-407-u03-illustrate
title: crew illustrate EFMP-407 unit 3
stage: misc
date: 2026-11-07
surface: agent
model: agy
feature: efmp-407
branch: crew/efmp-407-u03-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/unit-03/index.mdx
 - history/prompts/general/2463-efmp-407-u03-illustrate.general.prompt.md
 - specs/content/efmp-407/figures/unit-03.banner.md
 - specs/content/efmp-407/figures/unit-03.illustration-notes.md
 - specs/content/efmp-407/figures/unit-03.md
 - specs/content/efmp-407/reviews/unit-03/G2/20261107T185101143Z-gates.json
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T185101143Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T185101143Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T185101143Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T185101143Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T185101143Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T185101143Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T185101143Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T185101143Z/validate-content.txt
 - specs/content/efmp-407/tasks.md
 - static/img/figures/efmp-407/unit-03/fig-U3-7.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u03-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u03-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for EFMP-407 Unit 3 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-407 3` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-03/`.

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
- (efmp-407-u03-translate, translate, codex) English author must reconcile SDG 5 category guidance before G4 resumes; draft status remains unchanged.
- (efmp-407-u03-translate, translate, codex) English author must reconcile SDG 5 category guidance before G4 resumes; draft status remains unchanged.
- (efmp-407-u03-review_en, review_en, codex) Author repairs are needed for source support, contradictory SDG 5 category guidance, readability and worked examples; rendering and provenance remain unverified.
- (efmp-407-u03-review_en, review_en, codex) Author repairs are needed for source support, contradictory SDG 5 category guidance, readability and worked examples; rendering and provenance remain unverified.
- (efmp-407-u03-author-r1, author, claude) The G2 evidence covers Unit 3's committed English files, so any later edit to them makes it stale; refresh it with `node scripts/prepare-gate-evidence.mjs --refresh-stale`.


## Response snapshot

Generated, inspected, and placed the EFMP-407 Unit 3 raster banner (fig-U3-7) in index.mdx, recorded illustration notes, refreshed G2 evidence, and confirmed all 14 content gates pass.

## Outcome

- Impact: illustrate for EFMP-407 Unit 3 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated, inspected, and placed the EFMP-407 Unit 3 raster banner (fig-U3-7) in index.mdx, recorded illustration notes, refreshed G2 evidence, and confirmed all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Placed banner fig-U3-7.webp in English index.mdx; when translation creates the Urdu mirror, wire the banner using the draft snippet in specs/content/efmp-407/figures/unit-03.illustration-notes.md.
  - English author repairs remain prerequisite for G4 translation to reconcile SDG 5 category guidance and resolve open G3 findings.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
