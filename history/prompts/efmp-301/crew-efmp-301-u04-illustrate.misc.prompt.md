---
id: crew-efmp-301-u04-illustrate
title: crew illustrate EFMP-301 unit 4
stage: misc
date: 2026-11-23
surface: agent
model: agy
feature: efmp-301
branch: crew/efmp-301-u04-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/efmp-301/unit-04/index.mdx
 - docs/semester-1/efmp-301/unit-04/topic-01.mdx
 - docs/semester-1/efmp-301/unit-04/topic-02.mdx
 - docs/semester-1/efmp-301/unit-04/topic-03.mdx
 - history/prompts/efmp-301/crew-efmp-301-u04-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-04/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-04/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-04/topic-03.mdx
 - specs/content/efmp-301/figures/unit-04.banner.md
 - specs/content/efmp-301/figures/unit-04.md
 - specs/content/efmp-301/reviews/unit-04/G2/20261123T184024256Z-gates.json
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261123T184024256Z/check-bloom-bands.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261123T184024256Z/check-concept-graph.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261123T184024256Z/check-depth-gate.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261123T184024256Z/check-docs-sync.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261123T184024256Z/check-figures.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261123T184024256Z/check-no-answer-keys.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261123T184024256Z/check-no-em-dash.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261123T184024256Z/validate-content.txt
 - specs/content/efmp-301/tasks.md
 - static/img/figures/efmp-301/unit-04/fig-U4-1.webp
 - static/img/figures/efmp-301/unit-04/fig-U4-10.webp
 - static/img/figures/efmp-301/unit-04/fig-U4-7.webp
 - static/img/figures/efmp-301/unit-04/fig-U4-8.webp
 - static/img/figures/efmp-301/unit-04/fig-U4-9.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u04-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u04-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for EFMP-301 Unit 4 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-301 4` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it picks the image producer itself (agy, then gflow while the owner's PC is reachable, then Codex; each image's producer is printed on its ✓ line), optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-04/`.

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
- (efmp-301-u04-plan_illustrations, plan_illustrations, claude) The illustrate job must add the Urdu `<Figure>` elements with Urdu alt text for fig-U4-8, fig-U4-9 and fig-U4-10 when it places them. The Urdu topic files have no markers for these yet.
- (efmp-301-u04-plan_illustrations, plan_illustrations, claude) `tasks.md` has two Unit 4 G2 en-draft rows (lines 47 and 153). Only the later one was updated to the new evidence file.
- (efmp-301-u04-repair_en, repair_en, claude) MCQ option order changed in both locales (keys 1a 2b 3d 4b 5d 6c 7a 8c 9a 10d); a G5 re-review should check the Urdu reorder.
- (efmp-301-u04-repair_en, repair_en, claude) 360px and A4 print inspection of Unit 4 is still unperformed and needs a host where building and browsers are allowed.
- (efmp-301-u04-repair_en, repair_en, claude) vosniadou2001 is no longer in Unit 4's sources table or coverage; re-binding it needs a longer excerpt plus both table and coverage rows.


## Response snapshot

Generated, inspected, and placed all 5 Unit 4 raster illustrations (banner fig-U4-7, topic scenes fig-U4-1, fig-U4-8, fig-U4-9, fig-U4-10) in English and Urdu, updated manifests to placed, and refreshed G2 gate evidence.

## Outcome

- Impact: illustrate for EFMP-301 Unit 4 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 26 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated, inspected, and placed all 5 Unit 4 raster illustrations (banner fig-U4-7, topic scenes fig-U4-1, fig-U4-8, fig-U4-9, fig-U4-10) in English and Urdu, updated manifests to placed, and refreshed G2 gate evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - MCQ option order changed in both locales (keys 1a 2b 3d 4b 5d 6c 7a 8c 9a 10d); a G5 re-review should check the Urdu reorder.
  - 360px and A4 print inspection of Unit 4 is still unperformed and needs a host where building and browsers are allowed.
  - vosniadou2001 is no longer in Unit 4's sources table or coverage; re-binding it needs a longer excerpt plus both table and coverage rows.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
