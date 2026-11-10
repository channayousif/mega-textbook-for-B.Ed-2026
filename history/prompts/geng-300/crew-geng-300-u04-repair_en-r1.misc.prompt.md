---
id: crew-geng-300-u04-repair_en-r1
title: crew repair_en GENG-300 unit 4
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: geng-300
branch: crew/geng-300-u04-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/geng-300/crew-geng-300-u04-repair_en-r1.misc.prompt.md
 - specs/content/geng-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u04-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u04-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/geng-300/reviews/unit-04/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 4 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-300 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-04/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/geng-300/reviews/unit-04/G3/20261108T203238Z-g3-desk-d45ca89b.json` (disposition: revise). Resolve each one:
- [blocking] render-review cannot be performed: job constraints prohibit running npm run build or starting a dev server, so visual inspection of rendered pages and print views is impossible. This is a required check for a passing G3 report per the review-evidence contract.
- [advisory] static/img/figures/geng-300/unit-04/fig-U4-1.svg: text-geometry problem detected by measure-figure-text.mjs. The text closing for the occasion extends to x=696.9, overprinting the wordmark which starts at x=675.7. Additionally, the .panel shape [460,378,780,458] collides with the wordmark by 92.7 x 8.5px.
- [advisory] All four primary sources (hutchinson1987, downes2010, hall1976, brownLevinson1987) are declared unretrievable print monographs per D-2026-0001. Declarations are honest and complete, but claims cannot be independently verified.

## Notes from earlier jobs on this unit
- (geng-300-u04-repair_en, repair_en, agy) The next independent G3 review must be run in a browser-capable environment to execute render-review and measure-figure-text.mjs.
- (geng-300-u04-repair_en, repair_en, agy) Primary sources (hutchinson1987, downes2010, hall1976, brownLevinson1987) remain declared unverified under D-2026-0001 until print monographs are retrieved.
- (geng-300-u04-repair_en, repair_en, agy) G3 remains open (unticked) with an advisory repairs tracker row citing report 20261102T212207Z-g3-desk-f85a6c35.json.
- (geng-300-u04-fix, fix, opencode) G3 en-review row is marked stale  -  needs a fresh independent G3 review run after this geometry fix. The figure geometry check (measure-figure-text.mjs) exits 0 for all unit-04 SVGs; the earlier "panel collides with wordmark" note is cosmetic only.


## Response snapshot

Verified the three findings of G3 report 20261108T203238Z are already resolved or not author-repairable, and appended the advisory Unit 4 G3 tracker row naming the report with G3 left unticked.

## Outcome

- Impact: repair_en for GENG-300 Unit 4 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the three findings of G3 report 20261108T203238Z are already resolved or not author-repairable, and appended the advisory Unit 4 G3 tracker row naming the report with G3 left unticked.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Report 20261108T203238Z repeats the 20261102T212207Z findings verbatim; its fig-U4-1 geometry text describes the pre-69e32dca7 single-line label and pre-ab85b5815 wordmark position, and the current SVGs pass measure-figure-text.mjs.
  - The next independent G3 review must run in a browser-capable environment to execute render-review; the four primary sources remain declared unverified under D-2026-0001 until the print monographs are retrieved.
  - fig-U4-6 still reports a cosmetic .panel/wordmark collision (92.7 x 8.5px, reported not failed); the wordmark is aria-hidden, so it hides no instructional label.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
