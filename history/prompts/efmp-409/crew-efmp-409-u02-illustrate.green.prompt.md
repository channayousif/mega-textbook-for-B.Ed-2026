---
id: crew-efmp-409-u02-illustrate
title: crew illustrate EFMP-409 unit 2
stage: green
date: 2026-11-26
surface: agent
model: gemini-flash
feature: efmp-409
branch: crew/efmp-409-u02-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efmp-409/content-spec.md
  ticket: null
  adr: history/adr/0029-gemini-illustrations-via-antigravity.md
  pr: null
files:
  - docs/semester-4/efmp-409/unit-02/index.mdx
  - history/prompts/efmp-409/crew-efmp-409-u02-illustrate.green.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-02/index.mdx
  - specs/content/efmp-409/figures/unit-02.banner.md
  - specs/content/efmp-409/reviews/unit-02/G2/20261125T223817358Z-gates.json
  - specs/content/efmp-409/tasks.md
  - static/img/figures/efmp-409/unit-02/fig-U2-5.webp
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-409-u02-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-409-u02-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for EFMP-409 Unit 2 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-409 2 --producer agy` for the topic scenes and again with `--banner` (same flags) for the unit banner (unit-NN.banner.md); this job holds the crew's agy image lane, so use only that producer (other units' jobs use the other producers at the same time; each image's producer is printed on its ✓ line). If it exits 3 (agy is out of quota), stop as described below and the crew moves the job to a free producer, optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-409 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-409/`, and `static/img/figures/efmp-409/unit-02/`.

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
- (efmp-409-u02-translate, translate, agy) Independent G5 review is open; reviewer should verify passage-level equivalence and authored concept labels.
- (efmp-409-u02-translate, translate, agy) Qualified scholar check is still pending for Topic 2.2 Islamic material (Objectives Resolution, Qur'an 96:1-5 and 39:9, tarbiyah/ta'lim/ta'dib) per content-spec drafting note 8.
- (efmp-409-u02-translate, translate, agy) Figure banner `fig-U2-5` remains prompt-only in `specs/content/efmp-409/figures/unit-02.md`.
- (efmp-409-u02-author, author, claude_crew) G3 needs a qualified scholar to check Topic 2.2's Islamic material (Objectives Resolution text, Qur'an 96:1-5 and 39:9, tarbiyah/ta'lim/ta'dib), per content-spec drafting note 8.
- (efmp-409-u02-author, author, claude_crew) banner `fig-U2-5` is still prompt-only, and the Urdu concept labels are authored and need G5 review.

## Response snapshot

Generated unit banner illustration fig-U2-5 for EFMP-409 Unit 2 using agy producer, verified visual and cultural fidelity against rejection criteria, placed `<Figure>` in English and Urdu index files, updated banner manifest to placed, recorded fresh G2 gate evidence, and updated task tracker.

## Outcome

- Impact: Produced and placed unit banner raster illustration fig-U2-5 for EFMP-409 Unit 2.
- Tests: `prepare-gate-evidence` passed all 8 draft gates; `npm run check:content` verified clean.
- Files: 7 file(s) plus gate logs.

## Handoff (for CEO and agents)

- Shipped: Unit banner illustration `static/img/figures/efmp-409/unit-02/fig-U2-5.webp` placed in `docs/semester-4/efmp-409/unit-02/index.mdx` and `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-02/index.mdx`; `specs/content/efmp-409/figures/unit-02.banner.md` moved to placed; G2 gate evidence recorded at `specs/content/efmp-409/reviews/unit-02/G2/20261125T223817358Z-gates.json`.
- Decisions: Banner fig-U2-5 placed at 1376x768 with `kind="illustration"`; zero em dash strictly observed; G3/G5 stages remain open for independent human/scholar review.
- Pending: Independent G3 review for English and G5 review for Urdu mirror; qualified scholar check of Topic 2.2 Islamic material.
