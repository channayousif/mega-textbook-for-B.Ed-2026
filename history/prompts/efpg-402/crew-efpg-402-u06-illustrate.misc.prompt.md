---
id: crew-efpg-402-u06-illustrate
title: crew illustrate EFPG-402 unit 6
stage: misc
date: 2026-11-28
surface: agent
model: agy
feature: efpg-402
branch: crew/efpg-402-u06-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efpg-402/unit-06/index.mdx
 - docs/semester-4/efpg-402/unit-06/topic-01.mdx
 - docs/semester-4/efpg-402/unit-06/topic-02.mdx
 - docs/semester-4/efpg-402/unit-06/topic-03.mdx
 - docs/semester-4/efpg-402/unit-06/topic-04.mdx
 - docs/semester-4/efpg-402/unit-06/topic-05.mdx
 - docs/semester-4/efpg-402/unit-06/topic-06.mdx
 - history/prompts/efpg-402/crew-efpg-402-u06-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-06/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-06/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-06/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-06/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-06/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-06/topic-05.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-06/topic-06.mdx
 - specs/content/efpg-402/figures/unit-06.banner.md
 - specs/content/efpg-402/figures/unit-06.md
 - specs/content/efpg-402/reviews/unit-06/G2/20261128T112226273Z-gates.json
 - specs/content/efpg-402/reviews/unit-06/G2/logs-20261128T112226273Z/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-06/G2/logs-20261128T112226273Z/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-06/G2/logs-20261128T112226273Z/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-06/G2/logs-20261128T112226273Z/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-06/G2/logs-20261128T112226273Z/check-figures.txt
 - specs/content/efpg-402/reviews/unit-06/G2/logs-20261128T112226273Z/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-06/G2/logs-20261128T112226273Z/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-06/G2/logs-20261128T112226273Z/validate-content.txt
 - specs/content/efpg-402/tasks.md
 - static/img/figures/efpg-402/unit-06/fig-U6-13.webp
 - static/img/figures/efpg-402/unit-06/fig-U6-14.webp
 - static/img/figures/efpg-402/unit-06/fig-U6-15.webp
 - static/img/figures/efpg-402/unit-06/fig-U6-16.webp
 - static/img/figures/efpg-402/unit-06/fig-U6-17.webp
 - static/img/figures/efpg-402/unit-06/fig-U6-18.webp
 - static/img/figures/efpg-402/unit-06/fig-U6-19.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-402-u06-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u06-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for EFPG-402 Unit 6 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFPG-402 6 --producer gflow2` for the topic scenes and again with `--banner` (same flags) for the unit banner (unit-NN.banner.md); this job holds the crew's gflow2 image lane, so use only that producer (other units' jobs use the other producers at the same time; each image's producer is printed on its ✓ line). If it exits 3 (gflow2 is out of quota), stop as described below and the crew moves the job to a free producer, optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-402 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-06/`.

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
- (efpg-402-u06-plan_illustrations, plan_illustrations, claude) Illustration rows fig-U6-13 (banner, in unit-06.banner.md) and fig-U6-14..19 (one per topic, markers in EN topic files only) are prompt-only and ready for the illustrate job, which must add the Urdu `<Figure>` with Urdu alt text when placing.
- (efpg-402-u06-translate, translate, agy) Draft Urdu mirror for EFPG-402 Unit 6 (8 files) and 12 localized SVG pairs with dark twins are complete; translation_status remains draft pending independent G5 review.
- (efpg-402-u06-translate, translate, agy) Translation handoff lives in `specs/content/efpg-402/reviews/unit-06/G4/translation-handoff.md`, keeping it excluded from G2/G3 manifest hashing.
- (efpg-402-u06-translate, translate, agy) Rendered Urdu inspection across mobile (360px) and print layouts remains pending for the G5 review session.
- (efpg-402-u06-author, author, agy) Urdu mirror remains to be translated and reviewed under G4/G5.


## Response snapshot

Produced, validated, and placed the EFPG-402 Unit 6 unit banner and six topic raster illustrations across English and Urdu files, refreshed G2 gate evidence, and verified all content gates pass.

## Outcome

- Impact: illustrate for EFPG-402 Unit 6 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 34 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Produced, validated, and placed the EFPG-402 Unit 6 unit banner and six topic raster illustrations across English and Urdu files, refreshed G2 gate evidence, and verified all content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Banner fig-U6-13 and topic illustrations fig-U6-14..19 are placed in English and Urdu files with refreshed G2 gate evidence passing all content gates.
  - Independent qualified G3 English review and G5 Urdu review (with 360px and A4 print layout inspection) remain open in tasks.md.
  - Urdu translation handoff lives in specs/content/efpg-402/reviews/unit-06/G4/translation-handoff.md.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
