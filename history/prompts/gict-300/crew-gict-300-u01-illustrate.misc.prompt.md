---
id: crew-gict-300-u01-illustrate
title: crew illustrate GICT-300 unit 1
stage: misc
date: 2026-11-26
surface: agent
model: agy
feature: gict-300
branch: crew/gict-300-u01-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/gict-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gict-300/unit-01/topic-01.mdx
 - docs/semester-1/gict-300/unit-01/topic-02.mdx
 - docs/semester-1/gict-300/unit-01/topic-03.mdx
 - docs/semester-1/gict-300/unit-01/topic-04.mdx
 - history/prompts/gict-300/crew-gict-300-u01-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/topic-04.mdx
 - specs/content/gict-300/figures/unit-01.md
 - specs/content/gict-300/reviews/unit-01/G2/20261126T222416707Z-gates.json
 - specs/content/gict-300/reviews/unit-01/G2/logs-20261126T222416707Z/check-bloom-bands.txt
 - specs/content/gict-300/reviews/unit-01/G2/logs-20261126T222416707Z/check-concept-graph.txt
 - specs/content/gict-300/reviews/unit-01/G2/logs-20261126T222416707Z/check-depth-gate.txt
 - specs/content/gict-300/reviews/unit-01/G2/logs-20261126T222416707Z/check-docs-sync.txt
 - specs/content/gict-300/reviews/unit-01/G2/logs-20261126T222416707Z/check-figures.txt
 - specs/content/gict-300/reviews/unit-01/G2/logs-20261126T222416707Z/check-no-answer-keys.txt
 - specs/content/gict-300/reviews/unit-01/G2/logs-20261126T222416707Z/check-no-em-dash.txt
 - specs/content/gict-300/reviews/unit-01/G2/logs-20261126T222416707Z/validate-content.txt
 - specs/content/gict-300/tasks.md
 - static/img/figures/gict-300/unit-01/fig-U1-10.webp
 - static/img/figures/gict-300/unit-01/fig-U1-11.webp
 - static/img/figures/gict-300/unit-01/fig-U1-12.webp
 - static/img/figures/gict-300/unit-01/fig-U1-13.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job gict-300-u01-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gict-300-u01-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GICT-300 Unit 1 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GICT-300 1 --producer gflow` for the topic scenes and again with `--banner` (same flags) for the unit banner (unit-NN.banner.md); this job holds the crew's gflow image lane, so use only that producer (other units' jobs use the other producers at the same time; each image's producer is printed on its ✓ line). If it exits 3 (gflow is out of quota), stop as described below and the crew moves the job to a free producer, optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICT-300 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gict-300/`, and `static/img/figures/gict-300/unit-01/`.

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
- (gict-300-u01-plan_illustrations, plan_illustrations, claude) The illustrate job should produce and place `fig-U1-9` (banner, via `--banner`) and `fig-U1-10` to `fig-U1-13`, adding the Urdu `<Figure>` elements with Urdu alt text in the Urdu topic files at placement.
- (gict-300-u01-plan_illustrations, plan_illustrations, claude) The new markers changed the English topic files, so the G2 evidence is new and any later G3 run must bind to it; G3 was already stale.
- (gict-300-u01-fix, fix, opencode) G3 en-review is stale after this commit; a fresh G3 run is needed before any further review gates can proceed. The fig-U1-3.svg fix moved "Gears for arithmetic" from y=163 to y=173 - any future G3 should verify the visual spacing looks correct in rendered output.
- (gict-300-u01-translate-r1, translate, agy) Unit 1 Urdu mirror has complete 7-file structural, heading, and figure parity with English baseline ee13c3e2; translation_status remains draft pending fresh independent G5 review.
- (gict-300-u01-translate-r1, translate, agy) Declared key_terms in index.mdx are bound to terminology.csv; all 12 unbanked concept labels from concepts/unit-01.md are documented in reviews/unit-01/G4/translation-handoff.md for curriculum owner review.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- GICT-300 Unit 1 (docs/semester-1/gict-300/unit-01): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Generated fig-U1-13 with gflow, inspected and placed topic illustrations fig-U1-10 through fig-U1-13 in English and Urdu topics, updated manifest to placed, refreshed G2 gate evidence, and passed all 14 content gates.

## Outcome

- Impact: illustrate for GICT-300 Unit 1 by agy (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 24 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated fig-U1-13 with gflow, inspected and placed topic illustrations fig-U1-10 through fig-U1-13 in English and Urdu topics, updated manifest to placed, refreshed G2 gate evidence, and passed all 14 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Topic illustrations fig-U1-10 to fig-U1-13 are placed in English and Urdu topics, verified clean, and all 14 content gates pass.
  - Banner fig-U1-9 in unit-01.banner.md remains prompt-only due to Flow WAF challenge on the gflow lane (PUBLIC_ERROR_UNUSUAL_ACTIVITY).
  - G2 gate evidence refreshed at specs/content/gict-300/reviews/unit-01/G2/20261126T222416707Z-gates.json; G3 English review remains stale and needs a fresh run.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
