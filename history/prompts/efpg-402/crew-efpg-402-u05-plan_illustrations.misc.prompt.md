---
id: crew-efpg-402-u05-plan_illustrations
title: crew plan_illustrations EFPG-402 unit 5
stage: misc
date: 2026-11-27
surface: agent
model: claude
feature: efpg-402
branch: crew/efpg-402-u05-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efpg-402/unit-05/topic-01.mdx
 - docs/semester-4/efpg-402/unit-05/topic-02.mdx
 - docs/semester-4/efpg-402/unit-05/topic-03.mdx
 - docs/semester-4/efpg-402/unit-05/topic-04.mdx
 - docs/semester-4/efpg-402/unit-05/topic-05.mdx
 - specs/content/efpg-402/figures/unit-05.banner.md
 - specs/content/efpg-402/figures/unit-05.md
 - specs/content/efpg-402/reviews/unit-05/G2/20261127T204926798Z-gates.json
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T204926798Z/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T204926798Z/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T204926798Z/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T204926798Z/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T204926798Z/check-figures.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T204926798Z/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T204926798Z/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T204926798Z/validate-content.txt
 - specs/content/efpg-402/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-402-u05-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u05-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Plan the raster images for EFPG-402 Unit 5 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/efpg-402/figures/unit-05.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-05.md`. The `FIGURE[...]` marker belongs in the English topic file only: do not edit the Urdu topic files, because the illustrate job adds the Urdu <Figure> with Urdu alt text when it places the image. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
EFPG-402 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-05/`.

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
- (efpg-402-u05-translate, translate, claude) Topic 5.2's 5E example has pupils tasting samples next to unlabelled soap solution and vinegar; G3 should fix the English, then the matching Urdu line in topic-02.
- (efpg-402-u05-translate, translate, claude) Other English defects (ERQ-04 rubric, fig-U5-4 missing "Application", 5 vs 7 minute clean-up, three vs four objective components) are in translations/unit-05/handoff.md.
- (efpg-402-u05-translate, translate, claude) Editing that handoff file or any bound input makes Unit 5 G2 evidence stale; G5 and rendered Urdu inspection are still open.
- (efpg-402-u05-author-conflict1, fix, claude_crew) Unit 5 G4 Urdu mirror and independent G3 English review are still open for separate jobs.
- (efpg-402-u05-author-conflict1, fix, claude_crew) `specs/content/efpg-402/sources/texts/bscs-2006-5e.md` is now shared by Unit 3 and Unit 5; keep both the "Unit 3 use" map and the Unit 5 phase-excerpt section in future edits.


## Response snapshot

Planned EFPG-402 Unit 5 raster illustrations: a prompt-only 16:9 banner (`fig-U5-11`, new `unit-05.banner.md`) and five prompt-only classroom scenes (`fig-U5-12` to `fig-U5-16`) as English topic markers plus manifest rows, with G2 evidence refreshed and the tracker row repointed.

## Outcome

- Impact: plan_illustrations for EFPG-402 Unit 5 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned EFPG-402 Unit 5 raster illustrations: a prompt-only 16:9 banner (`fig-U5-11`, new `unit-05.banner.md`) and five prompt-only classroom scenes (`fig-U5-12` to `fig-U5-16`) as English topic markers plus manifest rows, with G2 evidence refreshed and the tracker row repointed.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The illustrate job places `fig-U5-11` (banner, via `--banner`) and `fig-U5-12` to `fig-U5-16`, and adds the Urdu `<Figure>` with Urdu alt text to the Urdu topic files at that time.
  - Each scene marker sits just before the topic's first `<Figure>`. Placing the images changes the English topic files, so Unit 5 G2 evidence will need refreshing again.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
