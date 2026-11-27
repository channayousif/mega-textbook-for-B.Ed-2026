---
id: crew-efpc-411-u02-illustrate
title: crew illustrate EFPC-411 unit 2
stage: misc
date: 2026-11-27
surface: agent
model: agy
feature: efpc-411
branch: crew/efpc-411-u02-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efpc-411/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efpc-411/unit-02/index.mdx
 - history/prompts/efpc-411/crew-efpc-411-u02-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-02/index.mdx
 - specs/content/efpc-411/figures/unit-02.banner.md
 - specs/content/efpc-411/reviews/unit-02/G2/20261127T104231432Z-gates.json
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T104231432Z/check-bloom-bands.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T104231432Z/check-concept-graph.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T104231432Z/check-depth-gate.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T104231432Z/check-docs-sync.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T104231432Z/check-figures.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T104231432Z/check-no-answer-keys.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T104231432Z/check-no-em-dash.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T104231432Z/validate-content.txt
 - specs/content/efpc-411/tasks.md
 - static/img/figures/efpc-411/unit-02/fig-U2-9.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job efpc-411-u02-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpc-411-u02-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for EFPC-411 Unit 2 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFPC-411 2 --producer gflow` for the topic scenes and again with `--banner` (same flags) for the unit banner (unit-NN.banner.md); this job holds the crew's gflow image lane, so use only that producer (other units' jobs use the other producers at the same time; each image's producer is printed on its ✓ line). If it exits 3 (gflow is out of quota), stop as described below and the crew moves the job to a free producer, optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPC-411 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpc-411/`, and `static/img/figures/efpc-411/unit-02/`.

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
- (efpc-411-u02-translate, translate, agy) English G3 remains open (▢), so any subsequent English changes will require corresponding Urdu adjustments and independent G5 review.
- (efpc-411-u02-translate, translate, agy) Mandatory rendered inspection (scripts/render-inspect.mjs EFPC-411 2 --locale ur) was omitted per host resource limits; 360px Nastaliq shaping and A4-print clipping remain to be verified.
- (efpc-411-u02-translate, translate, agy) Unit banner fig-U2-9 is prompt-only in specs/content/efpc-411/figures/unit-02.banner.md awaiting the illustration pipeline.
- (efpc-411-u02-author, author, claude_crew) Banner fig-U2-9 is `prompt-only` in `figures/unit-02.banner.md`, ready for the illustrate job.
- (efpc-411-u02-author, author, claude_crew) `mcburney-fry` and `elt-methods-texts` are print-only and declared under `## Unverifiable sources`; their scope matches the coverage matrix.


## Response snapshot

Generated and placed Unit 2 raster banner fig-U2-9 via gflow, verified pedagogical and cultural compliance, mirrored to Urdu index.mdx, prepared fresh G2 evidence, and validated all 14 content gates.

## Outcome

- Impact: illustrate for EFPC-411 Unit 2 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before completing.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated raster banner fig-U2-9 via gflow, placed in English and Urdu index.mdx, updated banner manifest to placed, refreshed G2 evidence, and repointed tracker.
- Decisions the team must respect: G3/G5 stay advisory until qualified independent sign-off; this PR does not certify G3/G5.
- Pending / next owner: crew lead (auto-merge when CI is green).
- Notes for the next job on this unit:
  - English G3 remains open (▢); independent G3 review pending.
  - Urdu G5 remains open (▢); independent G5 review pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
