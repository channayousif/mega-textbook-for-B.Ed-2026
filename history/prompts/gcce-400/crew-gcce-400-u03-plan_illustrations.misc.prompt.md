---
id: crew-gcce-400-u03-plan_illustrations
title: crew plan_illustrations GCCE-400 unit 3
stage: misc
date: 2026-11-22
surface: agent
model: claude
feature: gcce-400
branch: crew/gcce-400-u03-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gcce-400/unit-03/topic-01.mdx
 - docs/semester-4/gcce-400/unit-03/topic-02.mdx
 - specs/content/gcce-400/figures/unit-03.banner.md
 - specs/content/gcce-400/figures/unit-03.md
 - specs/content/gcce-400/reviews/unit-03/G2/20261122T203255985Z-gates.json
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261122T203255985Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261122T203255985Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261122T203255985Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261122T203255985Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261122T203255985Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261122T203255985Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261122T203255985Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261122T203255985Z/validate-content.txt
 - specs/content/gcce-400/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gcce-400-u03-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u03-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Plan the raster images for GCCE-400 Unit 3 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/gcce-400/figures/unit-03.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-03.md`. The `FIGURE[...]` marker belongs in the English topic file only: do not edit the Urdu topic files, because the illustrate job adds the Urdu <Figure> with Urdu alt text when it places the image. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
GCCE-400 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-03/`.

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
- (gcce-400-u03-translate, translate, claude_crew) `scripts/render-inspect.mjs --locale ur` was not run; G5 owns the 360px and A4 print inspection and the RTL reading order of `fig-U3-1` and `fig-U3-2`.
- (gcce-400-u03-translate, translate, claude_crew) G3 en-review is still open (constitutional currency of Articles 8-28 and Article 5); any G3 correction to the English must be mirrored here before G5.
- (gcce-400-u03-translate, translate, claude_crew) this branch is based on `252004ace`; `origin/main` has since advanced to `3260222eb` (PR #716), so the crew lead should rebase or merge before CI.
- (gcce-400-u03-author-conflict4, fix, claude_crew) Unit 4 has two G2 evidence dirs (`114158475Z` and `144142079Z`); the tracker points at the newer one and the older dir remains on disk.
- (gcce-400-u03-author-conflict4, fix, claude_crew) Unit 3 G3 en-review is still open (constitutional currency, Articles 8-28 and Article 5); Urdu G4/G5 remains a separate downstream job under the untranslated notice.


## Response snapshot

Planned GCCE-400 Unit 3's raster images: one 16:9 banner row (`fig-U3-5`) in a new `unit-03.banner.md`, plus a classroom-scene illustration marker and prompt-only manifest row for each topic (`fig-U3-6`, `fig-U3-7`), with refreshed G2 evidence.

## Outcome

- Impact: plan_illustrations for GCCE-400 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 14 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned GCCE-400 Unit 3's raster images: one 16:9 banner row (`fig-U3-5`) in a new `unit-03.banner.md`, plus a classroom-scene illustration marker and prompt-only manifest row for each topic (`fig-U3-6`, `fig-U3-7`), with refreshed G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `fig-U3-5` (banner), `fig-U3-6` and `fig-U3-7` are prompt-only; the illustrate job generates and places them and adds the Urdu `<Figure>` with Urdu alt text to the Urdu topic files.
  - Unit 3 G3 en-review is still open (constitutional currency of Articles 8-28 and Article 5); the new scene markers don't change the prose.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
