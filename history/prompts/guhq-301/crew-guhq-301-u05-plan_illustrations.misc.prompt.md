---
id: crew-guhq-301-u05-plan_illustrations
title: crew plan_illustrations GUHQ-301 unit 5
stage: misc
date: 2026-11-22
surface: agent
model: claude
feature: guhq-301
branch: crew/guhq-301-u05-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/guhq-301/unit-05/topic-01.mdx
 - docs/semester-3/guhq-301/unit-05/topic-02.mdx
 - specs/content/guhq-301/figures/unit-05.banner.md
 - specs/content/guhq-301/figures/unit-05.md
 - specs/content/guhq-301/reviews/unit-05/G2/20261122T093153930Z-gates.json
 - specs/content/guhq-301/reviews/unit-05/G2/logs-20261122T093153930Z/check-bloom-bands.txt
 - specs/content/guhq-301/reviews/unit-05/G2/logs-20261122T093153930Z/check-concept-graph.txt
 - specs/content/guhq-301/reviews/unit-05/G2/logs-20261122T093153930Z/check-depth-gate.txt
 - specs/content/guhq-301/reviews/unit-05/G2/logs-20261122T093153930Z/check-docs-sync.txt
 - specs/content/guhq-301/reviews/unit-05/G2/logs-20261122T093153930Z/check-figures.txt
 - specs/content/guhq-301/reviews/unit-05/G2/logs-20261122T093153930Z/check-no-answer-keys.txt
 - specs/content/guhq-301/reviews/unit-05/G2/logs-20261122T093153930Z/check-no-em-dash.txt
 - specs/content/guhq-301/reviews/unit-05/G2/logs-20261122T093153930Z/validate-content.txt
 - specs/content/guhq-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job guhq-301-u05-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/guhq-301-u05-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Plan the raster images for GUHQ-301 Unit 5 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/guhq-301/figures/unit-05.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-05.md`. The `FIGURE[...]` marker belongs in the English topic file only: do not edit the Urdu topic files, because the illustrate job adds the Urdu <Figure> with Urdu alt text when it places the image. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
GUHQ-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/guhq-301/`, and `static/img/figures/guhq-301/unit-05/`.

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
- (guhq-301-u05-translate, translate, claude) G5 needs to check verse meanings, honorifics and the seven Urdu concept labels the author wrote; the rendered pages and figures have not been looked at.
- (guhq-301-u05-translate, translate, claude) The G3 reviewer should check the occasion-of-revelation claim for verses 22:3 and 22:4 in the English; the Urdu copies the English as written.
- (guhq-301-u05-author-conflict1, fix, agy) Urdu translation job will need .ur.svg localized figures for all four Unit 5 figures and G5 review of 7 authored Urdu concept labels.
- (guhq-301-u05-author-conflict1, fix, agy) G3 review must make the religious-content check (drafting note 7); classroom routines and ordering of sources of tafsir are flagged without bound sources in sources/unit-05.md.
- (guhq-301-u05-author-conflict1, fix, agy) tafseer-talim-ul-quran could not be identified and remains uncited; kadir-2022-asbab carries rules-of-interpretation claims.


## Response snapshot

Planned GUHQ-301 Unit 5 raster images at prompt-only (banner fig-U5-5 plus classroom scenes fig-U5-6 and fig-U5-7 with English markers and manifest rows) and refreshed the unit's G2 evidence.

## Outcome

- Impact: plan_illustrations for GUHQ-301 Unit 5 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 14 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned GUHQ-301 Unit 5 raster images at prompt-only (banner fig-U5-5 plus classroom scenes fig-U5-6 and fig-U5-7 with English markers and manifest rows) and refreshed the unit's G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The illustrate job must add the Urdu `<Figure>` with Urdu alt text for fig-U5-6 and fig-U5-7, and must check that the generated images contain no Arabic script or calligraphy on books or boards.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
