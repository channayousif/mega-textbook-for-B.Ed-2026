---
id: 20261199
title: Illustrate EFPG-401 Unit Four
stage: general
date: 2026-11-15
surface: agent
model: GPT-6 Codex
feature: 009-figure-rendering
branch: crew/efpg-401-u04-illustrate
user: owner via crew brief
command: Read .crew/brief.md and carry it out completely
labels: [codex, crew, illustrations]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: history/adr/0029-gemini-agy-raster-illustration-producer.md
  pr: null
files:
  - docs/semester-3/efpg-401/unit-04/index.mdx
  - docs/semester-3/efpg-401/unit-04/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-04/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-04/topic-01.mdx
  - specs/content/efpg-401/figures/unit-04.md
  - specs/content/efpg-401/figures/unit-04.banner.md
  - specs/content/efpg-401/tasks.md
  - specs/content/efpg-401/reviews/unit-04/G2/
  - static/img/figures/efpg-401/unit-04/fig-U4-4.webp
  - static/img/figures/efpg-401/unit-04/fig-U4-5.webp
tests:
  - Baseline npm run build:content-status followed by npm run check:content passed all 14 gates.
  - Final npm run build:content-status followed immediately by npm run check:content passed all 14 gates; refreshed G2 evidence passed all eight draft commands.
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Delegated brief (verbatim):

# Crew job efpg-401-u04-illustrate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u04-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Produce the raster illustrations for EFPG-401 Unit 4 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFPG-401 4` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-401 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-401/`, and `static/img/figures/efpg-401/unit-04/`.

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
- (efpg-401-u04-plan_illustrations, plan_illustrations, claude) `fig-U4-4` (topic scene, also marked in the UR topic file) and `fig-U4-5` (banner, in `unit-04.banner.md`) are prompt-only; the illustrate job must generate, inspect and place them, then refresh the G2 evidence again.
- (efpg-401-u04-plan_illustrations, plan_illustrations, claude) The intro paragraph of `figures/unit-04.md` still describes only the three placed schematics; update it when the illustrations are placed.
- (efpg-401-u04-translate, translate, agy) Three-file Urdu mirror and 3 localized SVG pairs prepared from English baseline b43a52ced; translation_status remains draft pending independent G5.
- (efpg-401-u04-translate, translate, agy) All three localized schematic figures and their dark variants passed measure-figure-text with exit 0.
- (efpg-401-u04-author-conflict4, fix, opencode) The only conflict was specs/content/efpg-401/tasks.md; main's Unit 7 rows/status and the branch's Unit 4 rows/status were both kept, and the branch added no registry IDs so nothing was renumbered.


## Response snapshot

Produced and visually inspected the approved topic scene and unit banner, optimized to WebP, and placed in both locales. Gemini quota failed for both required commands; used the approved Codex built-in fallback.

## Outcome

- ✅ Impact: Adds contextual grammar-teaching illustrations in both locale flows.
- 🧪 Tests: Baseline and final all 14 content gates PASS. Refreshed Unit 4 G2 evidence: all eight draft commands PASS. git diff --check PASS.
- 📁 Files: Two raster assets, four MDX carriers, two manifests, Unit 4 tracker and G2 evidence.
- 🔁 Next prompts: Independent G3 and G5 review remain outstanding.
- 🧠 Reflection: Image generation success alone is insufficient; inspect teaching contrast, dress, text absence and alt fidelity before placement.

## Handoff (for CEO and agents)

- Shipped / changed: Topic scene fig-U4-4 and banner fig-U4-5 with shared WebP assets and localized alt text.
- Decisions the team must respect: Approved prompts and English alt text preserved. No SVGs changed. No G3/G5 certification or publication claimed.
- Pending / next owner: Independent English and Urdu reviewers own G3 and G5. Gemini image quota resets at 2026-11-17T11:00:06Z.
- Paperclip issues affected: EFPG-401 Unit 4 illustration crew job; no ticket specified.

## Evaluation notes (flywheel)

- Failure modes observed: Both required agy generation commands returned QUOTA_EXHAUSTED for gemini-3.1-flash-image, without producing files. Codex image_gen used as permitted by ADR-0029. Banner optimizer admission was interrupted with exit 143 once and retried from staging.
- Graders run and results (PASS/FAIL): Baseline PASS; final 14 content gates PASS; eight G2 draft checks PASS; approved prompt/alt preservation PASS; git diff --check PASS.
- Prompt variant (if applicable): Approved manifest prompts verbatim plus shared house style and explicit no-scripture/no-sacred-person constraints. Full approved prompts remain in unit-04.md and unit-04.banner.md. Producer: Codex built-in image_gen, 2026-11-15.
- Next experiment (smallest change to try): No new experiment required.

## Final asset validation

Both optimized WebPs were read visually after compression. Topic scene: 1200 x 675, 148.8 KB. Banner: 1200 x 675, 138.4 KB. Assets saved at `static/img/figures/efpg-401/unit-04/fig-U4-4.webp` and `static/img/figures/efpg-401/unit-04/fig-U4-5.webp`. Both passed the optimizer budget. G2 evidence refreshed at `specs/content/efpg-401/reviews/unit-04/G2/20261114T232941025Z-gates.json` and the Unit 4 tracker repointed. No build, dev server, browser or SVG edit performed.
