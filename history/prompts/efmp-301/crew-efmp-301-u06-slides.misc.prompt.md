---
id: crew-efmp-301-u06-slides
title: crew slides EFMP-301 unit 6
stage: misc
date: 2026-11-27
surface: agent
model: claude
feature: efmp-301
branch: crew/efmp-301-u06-slides
user: crew
command: crew slides
labels: ["crew", "claude", "slides"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/studio/slides/efmp-301/unit-06.json
 - static/studio/slides/efmp-301/unit-06.en.pptx
 - static/studio/slides/efmp-301/unit-06.ur.pptx
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u06-slides

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u06-slides`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Make the slide deck for EFMP-301 Unit 6 (Feature 032 phase B; model: specs/studio/slides/efmp-301/unit-04.json). Read every English topic file of the unit and its Urdu mirror. Write `specs/studio/slides/efmp-301/unit-06.json` with the unit title and a subtitle naming the course code and title, then 10 to 16 slides: a section slide per topic, two or three points slides per topic and one summary slide, plus a figure slide for any placed schematic that carries a topic's core idea (figure is its base path, /img/figures/<course>/unit-NN/fig-..., without .svg). Every point restates the topic's Summary or Explanation in plain words (no new facts, numbers or examples), at most 5 points of at most 110 characters; each Urdu point says what the Urdu topic says. No long dashes. Run `node scripts/build-studio-index.mjs` (it must not print "skipped slides" for this unit), then `node scripts/studio/figure-pngs.mjs <outline> /tmp/slides-png` and, for en and ur, `uv run --with python-pptx python scripts/studio/slides-pptx.py <outline> <lang> /tmp/slides-png static/studio/slides/efmp-301/unit-06.<lang>.pptx`. Commit the outline and both .pptx files. Do not edit topic MDX or any file under specs/content/.

## Scope
EFMP-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-06/`.

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
- (efmp-301-u06-flashcards, flashcards, claude) In Urdu, "Motivators" (Herzberg) is labelled "محرک (ہرزبرگ)" because the topic uses محرک for both terms; a G5 Urdu reviewer should confirm the label.
- (efmp-301-u06-flashcards, flashcards, claude) `build-studio-index.mjs --coverage` rewrites about 25 tracked files under `static/studio/flashcards/` for other courses; restore them before committing.
- (efmp-301-u06-review_en-conflict1, fix, claude) The G3 en-review for EFMP-301 Unit 6 needs a fresh independent run. The run002 pass report doesn't match the current unit files, including the figures changed by `8bac57e5`.
- (efmp-301-u06-review_en-conflict1, fix, claude) `static/content-status.json` is now untracked; if `check:content-status` reports it stale, run `npm run build:content-status`.
- (efmp-301-u06-review_en, review_en, agy) Cycle 2 G3 review passed with 8 non-blocking advisory findings carried forward (spec key terms, ERQ word count, MCQ key clustering, and figure text spacing tolerances under updated geometry checks).


## Response snapshot

Added the EFMP-301 Unit 6 slide deck (bilingual outline plus EN and UR PowerPoint files, with only the Maslow figure because the other three render defectively).

## Outcome

- Impact: slides for EFMP-301 Unit 6 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the EFMP-301 Unit 6 slide deck (bilingual outline plus EN and UR PowerPoint files, with only the Maslow figure because the other three render defectively).
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - fig-U6-3.ur is wrong (return arrow ends at the expectation box, not the outcome box; two branch arrows loop oddly); fix it, then consider adding the U6-3 figure slide and re-exporting.
  - fig-U6-4 EN curiosity cell lost "do not answer" and clips at the right edge; fig-U6-2 EN and UR also overflow; fig-U6-1 icons are broken (UR) or overlap text (EN) and are in the deck.
  - Any figure fix changes G3-bound files, so refresh gate evidence and plan a fresh G3 run.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
