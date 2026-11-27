---
id: crew-gqur-301-u14-illustrate
title: crew illustrate GQUR-301 unit 14
stage: misc
date: 2026-11-27
surface: agent
model: agy
feature: gqur-301
branch: crew/gqur-301-u14-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-14/index.mdx
 - docs/semester-2/gqur-301/unit-14/topic-01.mdx
 - docs/semester-2/gqur-301/unit-14/topic-02.mdx
 - history/prompts/general/2488-gqur-301-u14-illustrate.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-14/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-14/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-14/topic-02.mdx
 - specs/content/gqur-301/figures/unit-14.banner.md
 - specs/content/gqur-301/figures/unit-14.md
 - specs/content/gqur-301/reviews/unit-14/G2/20261127T222937139Z-gates.json
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261127T222937139Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261127T222937139Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261127T222937139Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261127T222937139Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261127T222937139Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261127T222937139Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261127T222937139Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261127T222937139Z/validate-content.txt
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-14/fig-U14-5.webp
 - static/img/figures/gqur-301/unit-14/fig-U14-6.webp
 - static/img/figures/gqur-301/unit-14/fig-U14-7.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u14-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u14-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GQUR-301 Unit 14 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GQUR-301 14 --producer agy2` for the topic scenes and again with `--banner` (same flags) for the unit banner (unit-NN.banner.md); this job holds the crew's agy2 image lane, so use only that producer (other units' jobs use the other producers at the same time; each image's producer is printed on its ✓ line). If it exits 3 (agy2 is out of quota), stop as described below and the crew moves the job to a free producer, optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 14 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-14/`.

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
- (gqur-301-u14-plan_illustrations, plan_illustrations, claude) The Urdu topic-01 and topic-02 files have no fig-U14-6 or fig-U14-7 markers yet; the translate job needs to add them.
- (gqur-301-u14-plan_illustrations, plan_illustrations, claude) The illustrate job generates, inspects and places fig-U14-5, fig-U14-6 and fig-U14-7, then reruns `node scripts/prepare-gate-evidence.mjs GQUR-301 14` and repoints the G2 tracker row.
- (gqur-301-u14-repair_en-r1, repair_en, agy) G3 remains unticked and open under ADR-0019 pending independent review and qualification.
- (gqur-301-u14-repair_en-r1, repair_en, agy) Uncertain findings F12 (rendered narrow/A4 inspection), F13 (G1 authority), and F14 (source bundle excerpt binding) remain for the review host.
- (gqur-301-u14-repair_en-conflict2, fix, opencode) Unit 14 G3 stays open/unticked; uncertain findings (render accessibility, G1 under D-2026-0070, external source binding) remain for an authorized evaluation session.


## Response snapshot

Generated with agy2, inspected, and placed raster illustrations fig-U14-5, fig-U14-6, and fig-U14-7 in English and Urdu files for GQUR-301 Unit 14, refreshed G2 gate evidence, and verified all 14 content gates pass.

## Outcome

- Impact: illustrate for GQUR-301 Unit 14 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated with agy2, inspected, and placed raster illustrations fig-U14-5, fig-U14-6, and fig-U14-7 in English and Urdu files for GQUR-301 Unit 14, refreshed G2 gate evidence, and verified all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 en-review remains unticked and open under ADR-0019 pending independent review and qualification.
  - Urdu mirrors in topic-01 and topic-02 have placed raster figures with translated alt text; full translation review remains for the G4/G5 pipeline.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
