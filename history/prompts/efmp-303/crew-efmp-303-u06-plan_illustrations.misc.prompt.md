---
id: crew-efmp-303-u06-plan_illustrations
title: crew plan_illustrations EFMP-303 unit 6
stage: misc
date: 2026-11-24
surface: agent
model: claude
feature: efmp-303
branch: crew/efmp-303-u06-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-303/unit-06/topic-01.mdx
 - docs/semester-2/efmp-303/unit-06/topic-02.mdx
 - docs/semester-2/efmp-303/unit-06/topic-03.mdx
 - specs/content/efmp-303/figures/unit-06.banner.md
 - specs/content/efmp-303/figures/unit-06.md
 - specs/content/efmp-303/reviews/unit-06/G2/20261124T020234530Z-gates.json
 - specs/content/efmp-303/reviews/unit-06/G2/logs-20261124T020234530Z/check-bloom-bands.txt
 - specs/content/efmp-303/reviews/unit-06/G2/logs-20261124T020234530Z/check-concept-graph.txt
 - specs/content/efmp-303/reviews/unit-06/G2/logs-20261124T020234530Z/check-depth-gate.txt
 - specs/content/efmp-303/reviews/unit-06/G2/logs-20261124T020234530Z/check-docs-sync.txt
 - specs/content/efmp-303/reviews/unit-06/G2/logs-20261124T020234530Z/check-figures.txt
 - specs/content/efmp-303/reviews/unit-06/G2/logs-20261124T020234530Z/check-no-answer-keys.txt
 - specs/content/efmp-303/reviews/unit-06/G2/logs-20261124T020234530Z/check-no-em-dash.txt
 - specs/content/efmp-303/reviews/unit-06/G2/logs-20261124T020234530Z/validate-content.txt
 - specs/content/efmp-303/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u06-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u06-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Plan the raster images for EFMP-303 Unit 6 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/efmp-303/figures/unit-06.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-06.md`. The `FIGURE[...]` marker belongs in the English topic file only: do not edit the Urdu topic files, because the illustrate job adds the Urdu <Figure> with Urdu alt text when it places the image. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
EFMP-303 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-06/`.

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
- (efmp-303-u06-review_ur, review_ur, claude) The register repair list in the G5 report JSON (the blocking finding) needs a translator pass. Fix `fig-U6-3/4/6.ur.svg` so "Feedback" reads "فیڈبیک" and "Evidence" reads "شہادت" as in the text, then regenerate the dark variants and run `measure-figure-text.mjs`.
- (efmp-303-u06-review_ur, review_ur, claude) The next G5 needs a main-session browser check of all six Urdu pages and the 12 Urdu SVG variants (desktop, narrow, A4). It also needs a signed G3 or an owner path for the human CMY G3. This was repair cycle 1 of 2.
- (efmp-303-u06-fix-r1, fix, opencode) fig-U6-2 Urdu still awaits independent G5 review and rendered-Urdu visual inspection (Codex job per brief notes); confirm label placement in Nastaliq before certifying.
- (efmp-303-u06-fix, fix, codex) Fresh independent G3 is required; Urdu inspection and G5 remain pending.
- (efmp-303-u06-fix, fix, codex) Fresh independent G3 is required; Urdu inspection and G5 remain pending.


## Response snapshot

Planned EFMP-303 Unit 6 raster images: a prompt-only banner `fig-U6-7` in a new banner sidecar, English markers and manifest rows for one classroom scene per topic (`fig-U6-8/9/10`), and refreshed G2 evidence with the tracker row updated.

## Outcome

- Impact: plan_illustrations for EFMP-303 Unit 6 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned EFMP-303 Unit 6 raster images: a prompt-only banner `fig-U6-7` in a new banner sidecar, English markers and manifest rows for one classroom scene per topic (`fig-U6-8/9/10`), and refreshed G2 evidence with the tracker row updated.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The 6.3 scene (`fig-U6-10`) is set in "rural Pakistan", not Sindh, because the topic text names Attock (Punjab). Check this when producing the image, or align the prose and prompt.
  - Only the English topic files carry the new markers. The illustrate job must add the Urdu `<Figure>` with Urdu alt text for `fig-U6-8/9/10` when it places them.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
