---
id: crew-guhq-301-u07-plan_illustrations
title: crew plan_illustrations GUHQ-301 unit 7
stage: misc
date: 2026-11-22
surface: agent
model: claude
feature: guhq-301
branch: crew/guhq-301-u07-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/guhq-301/unit-07/topic-01.mdx
 - specs/content/guhq-301/figures/unit-07.banner.md
 - specs/content/guhq-301/figures/unit-07.md
 - specs/content/guhq-301/reviews/unit-07/G2/20261122T204743987Z-gates.json
 - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T204743987Z/check-bloom-bands.txt
 - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T204743987Z/check-concept-graph.txt
 - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T204743987Z/check-depth-gate.txt
 - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T204743987Z/check-docs-sync.txt
 - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T204743987Z/check-figures.txt
 - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T204743987Z/check-no-answer-keys.txt
 - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T204743987Z/check-no-em-dash.txt
 - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T204743987Z/validate-content.txt
 - specs/content/guhq-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job guhq-301-u07-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/guhq-301-u07-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Plan the raster images for GUHQ-301 Unit 7 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/guhq-301/figures/unit-07.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-07.md`. The `FIGURE[...]` marker belongs in the English topic file only: do not edit the Urdu topic files, because the illustrate job adds the Urdu <Figure> with Urdu alt text when it places the image. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
GUHQ-301 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/guhq-301/`, and `static/img/figures/guhq-301/unit-07/`.

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
- (guhq-301-u07-translate, translate, agy) Independent qualified G5 review must verify the five authored Urdu concept labels in `specs/content/guhq-301/concepts/unit-07.md` and check every rendered verse meaning against trusted translations.
- (guhq-301-u07-translate, translate, agy) Independent qualified G3 review remains required for the English draft, including the religious-content check per content-spec drafting note 7.
- (guhq-301-u07-author, author, agy) Urdu mirror job needs .ur.svg files for all three placed figures (fig-U7-1, fig-U7-2, fig-U7-3) and G5 review of five authored Urdu concept labels.
- (guhq-301-u07-author, author, agy) Independent qualified G3 review is required (including religious-content check per content-spec drafting note 7); original classroom study routines are noted in sources/unit-07.md as having no bound empirical source.
- (guhq-301-u07-author, author, agy) Mapped reading muallim-ul-quran remains unidentifiable; open-access sources (quranic-arabic-corpus, al-hilali-2026-literal-interpretive, abdelfattah-2025-tajweed, kadir-2022-asbab) carry linguistic, translation, recitation, and interpretive claims.


## Response snapshot

Planned a 16:9 unit banner (fig-U7-4, new unit-07.banner.md) and one Mirpurkhas classroom illustration (fig-U7-5, marker in English topic-01 plus a manifest row), both at prompt-only, and refreshed the Unit 7 G2 evidence and tracker row.

## Outcome

- Impact: plan_illustrations for GUHQ-301 Unit 7 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 13 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned a 16:9 unit banner (fig-U7-4, new unit-07.banner.md) and one Mirpurkhas classroom illustration (fig-U7-5, marker in English topic-01 plus a manifest row), both at prompt-only, and refreshed the Unit 7 G2 evidence and tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The illustrate job should place fig-U7-5 in both English and Urdu topic-01, replacing the English marker. The Urdu topic file has no marker, so its Urdu alt text has to be written when the image is placed.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
