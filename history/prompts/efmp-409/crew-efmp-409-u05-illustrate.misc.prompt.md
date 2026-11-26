---
id: crew-efmp-409-u05-illustrate
title: crew illustrate EFMP-409 unit 5
stage: misc
date: 2026-11-26
surface: agent
model: agy
feature: efmp-409
branch: crew/efmp-409-u05-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efmp-409/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efmp-409/unit-05/index.mdx
 - history/prompts/efmp-409/crew-efmp-409-u05-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-05/index.mdx
 - specs/content/efmp-409/figures/unit-05.banner.md
 - specs/content/efmp-409/reviews/unit-05/G2/20261126T035315531Z-gates.json
 - specs/content/efmp-409/reviews/unit-05/G2/logs-20261126T035315531Z/check-bloom-bands.txt
 - specs/content/efmp-409/reviews/unit-05/G2/logs-20261126T035315531Z/check-concept-graph.txt
 - specs/content/efmp-409/reviews/unit-05/G2/logs-20261126T035315531Z/check-depth-gate.txt
 - specs/content/efmp-409/reviews/unit-05/G2/logs-20261126T035315531Z/check-docs-sync.txt
 - specs/content/efmp-409/reviews/unit-05/G2/logs-20261126T035315531Z/check-figures.txt
 - specs/content/efmp-409/reviews/unit-05/G2/logs-20261126T035315531Z/check-no-answer-keys.txt
 - specs/content/efmp-409/reviews/unit-05/G2/logs-20261126T035315531Z/check-no-em-dash.txt
 - specs/content/efmp-409/reviews/unit-05/G2/logs-20261126T035315531Z/validate-content.txt
 - specs/content/efmp-409/tasks.md
 - static/img/figures/efmp-409/unit-05/fig-U5-7.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-409-u05-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-409-u05-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for EFMP-409 Unit 5 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-409 5 --producer agy` for the topic scenes and again with `--banner` (same flags) for the unit banner (unit-NN.banner.md); this job holds the crew's agy image lane, so use only that producer (other units' jobs use the other producers at the same time; each image's producer is printed on its ✓ line). If it exits 3 (agy is out of quota), stop as described below and the crew moves the job to a free producer, optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-409 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-409/`, and `static/img/figures/efmp-409/unit-05/`.

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
- (efmp-409-u05-translate, translate, claude) The concept labels for CON:EFMP-409-5-3 and 5-4 use اجراء for "implementation", while the Urdu prose uses نفاذ for implementation and اجرا for "launch"; G5 should decide whether to align the labels.
- (efmp-409-u05-translate, translate, claude) fig-U5-4 and fig-U5-5 Urdu viewBoxes are taller than the English (540 vs 430, 400 vs 330), and labels with hyphenated numbers use LRM inside an RTL embedding; keep both if these figures are edited again.
- (efmp-409-u05-translate, translate, claude) Urdu rendered-page inspection (render-inspect at 360 px and A4) has not been done; G5 should do it on the live site.
- (efmp-409-u05-author-conflict3, fix, claude_crew) The pipeline-gate failure is explained by the tasks.md conflict: a one-sided resolution drops Unit 5's G2 row, so keep-both was required.
- (efmp-409-u05-author-conflict3, fix, claude_crew) Unit 5 G2 evidence still points at reviews/unit-05/G2/20261125T085534293Z-gates.json and revalidates; no Unit 5 content changed, so no fresh prepare-gate-evidence run was needed.


## Response snapshot

Generated, inspected, and placed the EFMP-409 Unit 5 banner illustration in English and Urdu index pages, refreshed G2 gate evidence, and passed all content gates.

## Outcome

- Impact: illustrate for EFMP-409 Unit 5 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated, inspected, and placed the EFMP-409 Unit 5 banner illustration in English and Urdu index pages, refreshed G2 gate evidence, and passed all content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit banner fig-U5-7 is placed; Unit 5 G3 review and G5 review remain open for independent evaluation.
  - CON:EFMP-409-5-3 and 5-4 use اجراء for "implementation" whereas Urdu prose uses نفاذ for implementation and اجرا for "launch"; G5 should decide on alignment.
  - Urdu rendered-page inspection at 360 px and A4 has not been run and should be verified on the live site by G5.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
