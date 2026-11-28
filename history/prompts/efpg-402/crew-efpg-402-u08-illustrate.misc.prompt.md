---
id: crew-efpg-402-u08-illustrate
title: crew illustrate EFPG-402 unit 8
stage: misc
date: 2026-11-28
surface: agent
model: agy
feature: efpg-402
branch: crew/efpg-402-u08-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-4/efpg-402/unit-08/index.mdx
  - docs/semester-4/efpg-402/unit-08/topic-01.mdx
  - docs/semester-4/efpg-402/unit-08/topic-02.mdx
  - docs/semester-4/efpg-402/unit-08/topic-03.mdx
  - docs/semester-4/efpg-402/unit-08/topic-04.mdx
  - docs/semester-4/efpg-402/unit-08/topic-05.mdx
  - history/prompts/efpg-402/crew-efpg-402-u08-illustrate.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-08/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-08/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-08/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-08/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-08/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-08/topic-05.mdx
  - specs/content/efpg-402/figures/unit-08.banner.md
  - specs/content/efpg-402/figures/unit-08.md
  - specs/content/efpg-402/reviews/unit-08/G2/20261128T150916988Z-gates.json
  - specs/content/efpg-402/reviews/unit-08/G2/logs-20261128T150916988Z/check-bloom-bands.txt
  - specs/content/efpg-402/reviews/unit-08/G2/logs-20261128T150916988Z/check-concept-graph.txt
  - specs/content/efpg-402/reviews/unit-08/G2/logs-20261128T150916988Z/check-depth-gate.txt
  - specs/content/efpg-402/reviews/unit-08/G2/logs-20261128T150916988Z/check-docs-sync.txt
  - specs/content/efpg-402/reviews/unit-08/G2/logs-20261128T150916988Z/check-figures.txt
  - specs/content/efpg-402/reviews/unit-08/G2/logs-20261128T150916988Z/check-no-answer-keys.txt
  - specs/content/efpg-402/reviews/unit-08/G2/logs-20261128T150916988Z/check-no-em-dash.txt
  - specs/content/efpg-402/reviews/unit-08/G2/logs-20261128T150916988Z/validate-content.txt
  - specs/content/efpg-402/tasks.md
  - static/img/figures/efpg-402/unit-08/fig-U8-11.webp
  - static/img/figures/efpg-402/unit-08/fig-U8-12.webp
  - static/img/figures/efpg-402/unit-08/fig-U8-13.webp
  - static/img/figures/efpg-402/unit-08/fig-U8-14.webp
  - static/img/figures/efpg-402/unit-08/fig-U8-15.webp
  - static/img/figures/efpg-402/unit-08/fig-U8-16.webp
tests:
  - npm run check:content
---

## Prompt

# Crew job efpg-402-u08-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u08-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for EFPG-402 Unit 8 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFPG-402 8 --producer meta` for the topic scenes and again with `--banner` (same flags) for the unit banner (unit-NN.banner.md); this job holds the crew's meta image lane, so use only that producer (other units' jobs use the other producers at the same time; each image's producer is printed on its ✓ line). If it exits 3 (meta is out of quota), stop as described below and the crew moves the job to a free producer, optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-402 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-08/`.

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
- (efpg-402-u08-plan_illustrations, plan_illustrations, claude) The illustrate job should produce `fig-U8-11` (banner, `--banner`) and `fig-U8-12`..`fig-U8-16`, then add the Urdu `<Figure>` and alt text to the Urdu topic files when it places them.
- (efpg-402-u08-translate, translate, agy) Re-generated and committed Unit 8 G2 gate evidence (20261127T185331917Z-gates.json) so the bound translation handoff doc is included in the input manifest.
- (efpg-402-u08-translate, translate, agy) Unit 8 translation remains at translation_status: draft awaiting independent G5 Urdu review and rendered page inspection.
- (efpg-402-u08-author, author, agy) Urdu mirror job (G4) will need to localize the 10 placed SVGs (.ur.svg pairs) and translate the seven unit files.
- (efpg-402-u08-author, author, agy) Independent qualified G3 English content review remains open and awaiting qualification.


## Response snapshot

Produced, inspected, and placed the EFPG-402 Unit 8 unit banner and five topic raster illustrations across English and Urdu files, refreshed G2 gate evidence, and verified all content gates pass.

## Outcome

- Impact: illustrate for EFPG-402 Unit 8 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 31 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Produced, inspected, and placed the EFPG-402 Unit 8 unit banner (fig-U8-11) and five topic raster illustrations (fig-U8-12 through fig-U8-16) across English and Urdu files, refreshed G2 gate evidence, and verified all content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Banner fig-U8-11 and topic illustrations fig-U8-12..16 are placed in English and Urdu files with refreshed G2 gate evidence passing all content gates.
  - Independent qualified G3 English review and G5 Urdu review remain open in tasks.md.
  - Urdu translation handoff lives in specs/content/efpg-402/translations/unit-08/handoff.md.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
