---
id: crew-gnas-301-u01-illustrate
title: crew illustrate GNAS-301 unit 1
stage: misc
date: 2026-11-18
surface: agent
model: agy
feature: gnas-301
branch: crew/gnas-301-u01-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: history/adr/0029-gemini-agy-raster-illustration-producer.md
  pr: null
files:
 - docs/semester-1/gnas-301/unit-01/index.mdx
 - docs/semester-1/gnas-301/unit-01/topic-01.mdx
 - docs/semester-1/gnas-301/unit-01/topic-02.mdx
 - docs/semester-1/gnas-301/unit-01/topic-03.mdx
 - docs/semester-1/gnas-301/unit-01/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-01/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-01/topic-04.mdx
 - specs/content/gnas-301/figures/unit-01.banner.md
 - specs/content/gnas-301/figures/unit-01.md
 - specs/content/gnas-301/reviews/unit-01/G2/20261118T055231122Z-gates.json
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261118T055231122Z/check-bloom-bands.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261118T055231122Z/check-concept-graph.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261118T055231122Z/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261118T055231122Z/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261118T055231122Z/check-figures.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261118T055231122Z/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261118T055231122Z/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261118T055231122Z/validate-content.txt
 - specs/content/gnas-301/tasks.md
 - static/img/figures/gnas-301/unit-01/fig-U1-9.webp
 - static/img/figures/gnas-301/unit-01/fig-U1-10.webp
 - static/img/figures/gnas-301/unit-01/fig-U1-11.webp
 - static/img/figures/gnas-301/unit-01/fig-U1-12.webp
 - static/img/figures/gnas-301/unit-01/fig-U1-13.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u01-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u01-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GNAS-301 Unit 1 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GNAS-301 1` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it picks the image producer itself (agy, then gflow while the owner's PC is reachable, then Codex; each image's producer is printed on its ✓ line), optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GNAS-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-01/`.

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
- (gnas-301-u01-plan_illustrations, plan_illustrations, claude) After the illustrate job places fig-U1-9..13, rerun `node scripts/prepare-gate-evidence.mjs GNAS-301 1` and repoint the Unit 1 G2 row in `specs/content/gnas-301/tasks.md`.
- (gnas-301-u01-plan_illustrations, plan_illustrations, claude) Check that the phone screen in fig-U1-10 is unreadable and that the bins in the banner have no labels or recycling logos.
- (gnas-301-u01-repair_en-r1, repair_en, codex) Browser/print inspection remains pending; defer the shared WHO heading until Unit 2 evidence refresh.
- (gnas-301-u01-repair_en-r1, repair_en, codex) Browser/print inspection remains pending; defer the shared WHO heading until Unit 2 evidence refresh.
- (gnas-301-u01-review_en-conflict1, fix, claude) Unit 1 G3 is still open and escalated (report `12ce2621-...json`): 10 figure text geometry defects in fig-U1-2, fig-U1-3.ur, fig-U1-6 and fig-U1-8 still need fixing.

## Response snapshot

Generated raster illustrations fig-U1-9 (unit banner) and fig-U1-10 through fig-U1-13 (topic classroom scenes) with agy (Imagen), visually inspected and accepted all 5 images, placed Figure tags in English and Urdu topic/index pages, marked manifest rows placed, refreshed Unit 1 G2 gate evidence, and passed all 14 content gates.

## Outcome

- Impact: illustrate for GNAS-301 Unit 1 by agy.
- Tests: npm run check:content passed with all 14 gates clean.
- Files: 27 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none.

## Handoff (for CEO and agents)

- Shipped / changed: Generated and placed raster illustrations fig-U1-9 through fig-U1-13 for GNAS-301 Unit 1 in EN and UR MDX files, moved manifests to placed, and refreshed Unit 1 G2 evidence.
- Decisions the team must respect: Bins in fig-U1-9 are plain and unmarked; phone screen in fig-U1-10 is unreadable; all images comply with ADR-0029, ADR-0036 and cultural dress rules.
- Pending / next owner: Unit 1 G3 review is still open and escalated; 10 SVG figure text geometry defects in fig-U1-2, fig-U1-3.ur, fig-U1-6 and fig-U1-8 remain for review repair.
- Notes for the next job on this unit:
  - Unit 1 G3 review is still open and escalated: 10 figure text geometry defects in fig-U1-2, fig-U1-3.ur, fig-U1-6, and fig-U1-8 remain to be addressed in the next review repair job.
  - Browser/print inspection remains pending for GNAS-301 Unit 1.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
