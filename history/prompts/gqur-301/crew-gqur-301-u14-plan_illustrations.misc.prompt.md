---
id: crew-gqur-301-u14-plan_illustrations
title: crew plan_illustrations GQUR-301 unit 14
stage: misc
date: 2026-11-15
surface: agent
model: claude
feature: gqur-301
branch: crew/gqur-301-u14-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-14/topic-01.mdx
 - docs/semester-2/gqur-301/unit-14/topic-02.mdx
 - specs/content/gqur-301/figures/unit-14.banner.md
 - specs/content/gqur-301/figures/unit-14.md
 - specs/content/gqur-301/reviews/unit-14/G2/20261115T070138279Z-gates.json
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261115T070138279Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261115T070138279Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261115T070138279Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261115T070138279Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261115T070138279Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261115T070138279Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261115T070138279Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261115T070138279Z/validate-content.txt
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u14-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u14-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Plan the raster images for GQUR-301 Unit 14 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/gqur-301/figures/unit-14.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-14.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

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
- (gqur-301-u14-repair_en-r1, repair_en, agy) G3 remains unticked and open under ADR-0019 pending independent review and qualification.
- (gqur-301-u14-repair_en-r1, repair_en, agy) Uncertain findings F12 (rendered narrow/A4 inspection), F13 (G1 authority), and F14 (source bundle excerpt binding) remain for the review host.
- (gqur-301-u14-repair_en-conflict2, fix, opencode) Unit 14 G3 stays open/unticked; uncertain findings (render accessibility, G1 under D-2026-0070, external source binding) remain for an authorized evaluation session.
- (gqur-301-u14-repair_en-conflict2, fix, opencode) The merge pulled in main's gqur-301 unit 12/13 and efmp-304 unit 2 repairs; those are main's work, not this branch's.
- (gqur-301-u14-repair_en-conflict2, fix, opencode) `static/content-status.json` is a gitignored build artifact; regenerate it (`npm run build:content-status`) after any content-affecting merge or the `check:content-status` gate fails.


## Response snapshot

Planned GQUR-301 Unit 14 raster illustrations as prompt-only rows (banner fig-U14-5 in a new unit-14.banner.md, classroom scenes fig-U14-6/7 with English markers and manifest rows), regenerated G2 evidence and repointed the tracker row.

## Outcome

- Impact: plan_illustrations for GQUR-301 Unit 14 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 14 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned GQUR-301 Unit 14 raster illustrations as prompt-only rows (banner fig-U14-5 in a new unit-14.banner.md, classroom scenes fig-U14-6/7 with English markers and manifest rows), regenerated G2 evidence and repointed the tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The Urdu topic-01 and topic-02 files have no fig-U14-6 or fig-U14-7 markers yet; the translate job needs to add them.
  - The illustrate job generates, inspects and places fig-U14-5, fig-U14-6 and fig-U14-7, then reruns `node scripts/prepare-gate-evidence.mjs GQUR-301 14` and repoints the G2 tracker row.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
