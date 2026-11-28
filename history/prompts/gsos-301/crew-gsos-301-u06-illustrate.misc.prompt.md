---
id: crew-gsos-301-u06-illustrate
title: crew illustrate GSOS-301 unit 6
stage: misc
date: 2026-11-28
surface: agent
model: agy
feature: gsos-301
branch: crew/gsos-301-u06-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/gsos-301/unit-06/index.mdx
  - docs/semester-2/gsos-301/unit-06/topic-01.mdx
  - docs/semester-2/gsos-301/unit-06/topic-02.mdx
  - history/prompts/gsos-301/crew-gsos-301-u06-illustrate.misc.prompt.md
  - specs/content/gsos-301/figures/unit-06.banner.md
  - specs/content/gsos-301/figures/unit-06.md
  - specs/content/gsos-301/reviews/unit-06/G2/20261128T104455062Z-gates.json
  - specs/content/gsos-301/reviews/unit-06/G2/logs-20261128T104455062Z/check-bloom-bands.txt
  - specs/content/gsos-301/reviews/unit-06/G2/logs-20261128T104455062Z/check-concept-graph.txt
  - specs/content/gsos-301/reviews/unit-06/G2/logs-20261128T104455062Z/check-depth-gate.txt
  - specs/content/gsos-301/reviews/unit-06/G2/logs-20261128T104455062Z/check-docs-sync.txt
  - specs/content/gsos-301/reviews/unit-06/G2/logs-20261128T104455062Z/check-figures.txt
  - specs/content/gsos-301/reviews/unit-06/G2/logs-20261128T104455062Z/check-no-answer-keys.txt
  - specs/content/gsos-301/reviews/unit-06/G2/logs-20261128T104455062Z/check-no-em-dash.txt
  - specs/content/gsos-301/reviews/unit-06/G2/logs-20261128T104455062Z/validate-content.txt
  - specs/content/gsos-301/tasks.md
  - static/img/figures/gsos-301/unit-06/fig-U6-5.webp
  - static/img/figures/gsos-301/unit-06/fig-U6-6.webp
  - static/img/figures/gsos-301/unit-06/fig-U6-7.webp
tests:
  - npm run check:content
---

## Prompt

# Crew job gsos-301-u06-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u06-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GSOS-301 Unit 6 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GSOS-301 6 --producer gflow2` for the topic scenes and again with `--banner` (same flags) for the unit banner (unit-NN.banner.md); this job holds the crew's gflow2 image lane, so use only that producer (other units' jobs use the other producers at the same time; each image's producer is printed on its ✓ line). If it exits 3 (gflow2 is out of quota), stop as described below and the crew moves the job to a free producer, optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-06/`.

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
- (gsos-301-u06-plan_illustrations, plan_illustrations, claude) Unit 6 has no Urdu topic files yet, so the translation job must add the fig-U6-6 and fig-U6-7 markers when it creates them.
- (gsos-301-u06-plan_illustrations, plan_illustrations, claude) `prepare-gate-evidence.mjs` needs the upper-case course code (`GSOS-301 6`); lower-case fails with "invalid unit or stage".
- (gsos-301-u06-repair_en-r1, repair_en, opencode) Browser/print visual inspection (360px viewport, keyboard table scrolling, desktop layout, A4 print) remains unverified because the brief prohibits build/server/Playwright; a permitted rendering host must close it.
- (gsos-301-u06-repair_en-r1, repair_en, opencode) The Nov 8 findings were already repaired on main by commit 8a99e8e4e (the Nov 5 repair of the identical Nov 2 report), so this job verified current bytes and appended only the tracker row; G3 stays unticked and G4 stays blocked until a fresh independent G3 confirms the repairs.
- (gsos-301-u06-repair_en-conflict3, fix, opencode) G3 for Unit 6 stays unticked/advisory; G4 remains blocked until a fresh independent G3 confirms the repairs.


## Response snapshot

Generated, inspected, and placed all GSOS-301 Unit 6 raster illustrations and banner in the English unit files, updated manifests and task tracker, and refreshed G2 gate evidence with all 14 content gates passing.

## Outcome

- Impact: illustrate for GSOS-301 Unit 6 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated, inspected, and placed all GSOS-301 Unit 6 raster illustrations and banner in the English unit files, updated manifests and task tracker, and refreshed G2 gate evidence with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 6 has no Urdu topic files yet, so the translation job must add the fig-U6-6 and fig-U6-7 markers when it creates them.
  - G3 English review remains open and advisory per ADR-0019; G4 remains blocked until a fresh independent G3 confirms repairs.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
