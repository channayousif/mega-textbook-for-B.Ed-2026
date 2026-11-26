---
id: crew-gent-401-u04-illustrate
title: crew illustrate GENT-401 unit 4
stage: misc
date: 2026-11-27
surface: agent
model: agy
feature: gent-401
branch: crew/gent-401-u04-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gent-401/unit-04/index.mdx
 - history/prompts/gent-401/crew-gent-401-u04-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-04/index.mdx
 - specs/content/gent-401/figures/unit-04.banner.md
 - specs/content/gent-401/reviews/unit-04/G2/20261126T195406275Z-gates.json
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261126T195406275Z/check-bloom-bands.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261126T195406275Z/check-concept-graph.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261126T195406275Z/check-depth-gate.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261126T195406275Z/check-docs-sync.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261126T195406275Z/check-figures.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261126T195406275Z/check-no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261126T195406275Z/check-no-em-dash.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261126T195406275Z/validate-content.txt
 - specs/content/gent-401/tasks.md
 - static/img/figures/gent-401/unit-04/fig-U4-5.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u04-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u04-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GENT-401 Unit 4 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GENT-401 4 --producer gflow` for the topic scenes and again with `--banner` (same flags) for the unit banner (unit-NN.banner.md); this job holds the crew's gflow image lane, so use only that producer (other units' jobs use the other producers at the same time; each image's producer is printed on its ✓ line). If it exits 3 (gflow is out of quota), stop as described below and the crew moves the job to a free producer, optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENT-401 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-04/`.

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
- (gent-401-u04-translate, translate, agy) Unit 4 business plan terms (کاروباری منصوبہ، انتظامی خلاصہ، تصور اور مقصد کے بیانات، مارکیٹنگ کا منصوبہ، عملیاتی منصوبہ، تنظیمی ڈھانچہ) are authored proposals not in terminology.csv; an independent G5 reviewer should verify them.
- (gent-401-u04-translate, translate, agy) Four localized RTL schematic SVGs (fig-U4-1 to fig-U4-4) and derived dark variants passed text geometry measurement cleanly and match page alt text.
- (gent-401-u04-author-conflict2, fix, claude_crew) Unit 4's G2 evidence is 20261124T062449556Z-gates.json; the stale 20261124T062155314Z and 20261124T050320192Z evidence directories are still on the branch and can be pruned.
- (gent-401-u04-author-conflict2, fix, claude_crew) The merged scott-2017-efmd.md binds Unit 4 notes with pp. 53-76 locators authored only on this branch; a G3 reviewer should check them against the printed pagination.
- (gent-401-u04-author-conflict2, fix, claude_crew) The merge pulled main's Unit 2 (docs, specs, figures, G2 evidence, glossary terms, PHRs), which is outside this job's Unit 4 scope and was not re-reviewed here.

## Response snapshot

Generated with gflow, inspected, and placed the GENT-401 Unit 4 banner illustration (fig-U4-5) in the English index page and Urdu mirror, updated unit-04.banner.md to placed, refreshed G2 gate evidence, pruned stale evidence directories, and passed all 14 content gates.

## Outcome

- Impact: illustrate for GENT-401 Unit 4 by agy.
- Tests: npm run check:content passed cleanly in the job worktree.
- Files: 15 file(s) changed/added/pruned.
- Next prompts: crew planner advances Unit 4 review tasks.
- Reflection: None.

## Handoff (for CEO and agents)

- Shipped / changed: Generated with gflow, inspected, and placed the GENT-401 Unit 4 banner illustration (fig-U4-5) in English and Urdu index pages, updated unit-04.banner.md, refreshed G2 gate evidence (20261126T195406275Z-gates.json), pruned stale G2 directories, and passed all 14 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this job does not self-certify.
- Pending / next owner: crew lead (merge when CI is green); independent G3 and G5 reviewers for Unit 4.
- Notes for the next job on this unit:
  - Unit banner fig-U4-5 is placed; Unit 4 G3 review and G5 review remain open for independent evaluation.
  - Unit 4 business plan terms (کاروباری منصوبہ، انتظامی خلاصہ، تصور اور مقصد کے بیانات، مارکیٹنگ کا منصوبہ، عملیاتی منصوبہ، تنظیمی ڈھانچہ) are authored proposals not in terminology.csv; an independent G5 reviewer should verify them.
  - Four localized RTL schematic SVGs (fig-U4-1 to fig-U4-4) and derived dark variants passed text geometry measurement cleanly and match page alt text.
  - Merged scott-2017-efmd.md binds Unit 4 notes with pp. 53-76 locators authored only on this branch; a G3 reviewer should check them against the printed pagination.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
