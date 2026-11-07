---
id: crew-efmp-407-u02-illustrate
title: crew illustrate EFMP-407 unit 2
stage: misc
date: 2026-11-07
surface: agent
model: agy
feature: efmp-407
branch: crew/efmp-407-u02-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/unit-02/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-02/index.mdx
 - specs/content/efmp-407/figures/unit-02.banner.md
 - specs/content/efmp-407/figures/unit-02.illustration-notes.md
 - specs/content/efmp-407/figures/unit-02.md
 - specs/content/efmp-407/reviews/unit-02/G2/20261107T151215073Z-gates.json
 - specs/content/efmp-407/reviews/unit-02/G2/logs-20261107T151215073Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-02/G2/logs-20261107T151215073Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-02/G2/logs-20261107T151215073Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-02/G2/logs-20261107T151215073Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-02/G2/logs-20261107T151215073Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-02/G2/logs-20261107T151215073Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-02/G2/logs-20261107T151215073Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-02/G2/logs-20261107T151215073Z/validate-content.txt
 - specs/content/efmp-407/tasks.md
 - static/img/figures/efmp-407/unit-02/fig-U2-7.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u02-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u02-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for EFMP-407 Unit 2 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-407 2` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-02/`.

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
- (efmp-407-u02-translate, translate, codex) Browser geometry, narrow-screen/A4 inspection and independent review remain pending; translation stays draft.
- (efmp-407-u02-translate, translate, codex) Browser geometry, narrow-screen/A4 inspection and independent review remain pending; translation stays draft.
- (efmp-407-u02-review_en, review_en, agy) G3 remains open under an advisory escalate disposition because live browser and print inspection are barred by brief constraints.
- (efmp-407-u02-review_en, review_en, agy) Live browser rendering (360px viewport, keyboard table scrolling, A4 print view) should be verified on an authorized host.
- (efmp-407-u02-review_en, review_en, agy) In tasks.md lines 24-28 under backward-design alignment, 5 duplicated Unit 1 tracker rows from author copy-paste can be cleaned up during maintenance.

## Response snapshot

Generated, inspected, and placed the EFMP-407 Unit 2 banner illustration (fig-U2-7) in English and Urdu unit indexes, documented handoff notes, and refreshed G2 draft gate evidence.

## Outcome

- Impact: illustrate for EFMP-407 Unit 2 by agy.
- Tests: npm run check:content passed with all 14 content gates green.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded.

## Handoff (for CEO and agents)

- Shipped / changed: Generated, inspected, and placed unit banner illustration (fig-U2-7) in both English and Urdu index.mdx; updated banner manifest to placed; refreshed G2 draft evidence and tasks.md tracker row.
- Decisions the team must respect: G3/G5 stay advisory until qualified independent review; this job does not certify review stages.
- Pending / next owner: crew lead / next pipeline job.
- Notes for the next job on this unit:
  - All 6 topic figures are placed schematics (SVGs with dark and Urdu mirrors); the topic-scene generation command had no matching illustration rows.
  - Unit banner (fig-U2-7) is placed in both English and Urdu index files with zero text or forbidden emblems.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS (14/14 gates clean)
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
