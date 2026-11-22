---
id: crew-gnas-301-u04-illustrate
title: crew illustrate GNAS-301 unit 4
stage: misc
date: 2026-11-22
surface: agent
model: agy
feature: gnas-301
branch: crew/gnas-301-u04-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gnas-301/unit-04/index.mdx
 - docs/semester-1/gnas-301/unit-04/topic-01.mdx
 - docs/semester-1/gnas-301/unit-04/topic-02.mdx
 - docs/semester-1/gnas-301/unit-04/topic-03.mdx
 - docs/semester-1/gnas-301/unit-04/topic-04.mdx
 - docs/semester-1/gnas-301/unit-04/topic-05.mdx
 - docs/semester-1/gnas-301/unit-04/topic-06.mdx
 - docs/semester-1/gnas-301/unit-04/topic-07.mdx
 - history/prompts/gnas-301/crew-gnas-301-u04-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-05.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-06.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-07.mdx
 - specs/content/gnas-301/figures/unit-04.banner.md
 - specs/content/gnas-301/figures/unit-04.md
 - specs/content/gnas-301/reviews/unit-04/G2/20261122T044002954Z-gates.json
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261122T044002954Z/check-bloom-bands.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261122T044002954Z/check-concept-graph.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261122T044002954Z/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261122T044002954Z/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261122T044002954Z/check-figures.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261122T044002954Z/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261122T044002954Z/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261122T044002954Z/validate-content.txt
 - specs/content/gnas-301/tasks.md
 - static/img/figures/gnas-301/unit-04/fig-U4-15.webp
 - static/img/figures/gnas-301/unit-04/fig-U4-16.webp
 - static/img/figures/gnas-301/unit-04/fig-U4-17.webp
 - static/img/figures/gnas-301/unit-04/fig-U4-18.webp
 - static/img/figures/gnas-301/unit-04/fig-U4-19.webp
 - static/img/figures/gnas-301/unit-04/fig-U4-20.webp
 - static/img/figures/gnas-301/unit-04/fig-U4-21.webp
 - static/img/figures/gnas-301/unit-04/fig-U4-22.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u04-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u04-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GNAS-301 Unit 4 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GNAS-301 4` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it picks the image producer itself (agy, then gflow while the owner's PC is reachable, then Codex; each image's producer is printed on its ✓ line), optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GNAS-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-04/`.

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
- (gnas-301-u04-plan_illustrations, plan_illustrations, claude) The fig-U4-16, -18, -19 and -20 prompts don't name a Sindh city because their prose is set in Faisalabad or Lahore. An owner or author decides whether to re-set the prose in Sindh.
- (gnas-301-u04-plan_illustrations, plan_illustrations, claude) After placing fig-U4-15 to fig-U4-22, rerun `prepare-gate-evidence.mjs GNAS-301 4` and repoint the Unit 4 G2 row in `tasks.md`. When inspecting, check that the fig-U4-18 rules sheet and the fig-U4-20 notebook carry no readable text.
- (gnas-301-u04-repair_en-r1-conflict2, fix, opencode) `static/content-status.json` is gitignored and was regenerated locally after the merge; CI regenerates it via `prestart`, so no commit was needed.
- (gnas-301-u04-repair_en-r1-conflict2, fix, opencode) G3 remains open pending owner authorization; live mobile and A4 print inspection remains outstanding.
- (gnas-301-u04-repair_en-r1-conflict1, fix, codex) G3 remains open pending owner authorization; live mobile and A4 print inspection remains outstanding.

## Response snapshot

Inspected and accepted all eight GNAS-301 Unit 4 raster illustrations (unit banner fig-U4-15 and topic scenes fig-U4-16 through fig-U4-22), verified that fig-U4-18 rules sheet and fig-U4-20 notebook carry no readable text, committed figure placements in English and Urdu topic/index pages, marked manifest rows placed, refreshed Unit 4 G2 gate evidence and updated tasks.md, and validated that all 14 content gates pass.

## Outcome

- Impact: illustrate for GNAS-301 Unit 4 by agy.
- Tests: npm run check:content passed with all 14 gates clean.
- Files: 37 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none.

## Handoff (for CEO and agents)

- Shipped / changed: Placed raster illustrations fig-U4-15 (unit banner) and fig-U4-16 through fig-U4-22 in English and Urdu index and topic files, marked manifest rows placed, refreshed Unit 4 G2 evidence, and passed all 14 content gates.
- Decisions the team must respect: Verified fig-U4-18 rules sheet and fig-U4-20 notebook carry no readable text; all figures adhere to ADR-0029, ADR-0036 and cultural dress rules.
- Pending / next owner: Unit 4 G3 review remains open/stale since figure-geometry repair; third review cycle owner-gated (G-2026-31).
- Notes for the next job on this unit:
  - fig-U4-16, -18, -19 and -20 prompts don't name a Sindh city because prose is set in Faisalabad/Lahore; owner/author decides whether to re-set prose.
  - G3 remains open pending owner authorization; live mobile and A4 print inspection remains outstanding.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
