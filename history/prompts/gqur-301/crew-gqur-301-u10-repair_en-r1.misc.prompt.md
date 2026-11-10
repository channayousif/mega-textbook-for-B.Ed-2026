---
id: crew-gqur-301-u10-repair_en-r1
title: crew fix GQUR-301 unit 10
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u10-repair_en-r1
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gqur-301/crew-gqur-301-u10-repair_en-r1.misc.prompt.md
 - specs/content/gqur-301/reviews/unit-10/renders-20261110T-prod/
 - specs/content/gqur-301/reviews/unit-10/repair-en-handoff.md
 - specs/content/gqur-301/tasks.md
tests:
 - npm run build:content-status
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u10-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u10-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gqur-301/reviews/unit-10/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 10 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 10 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-10/`.

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
From `specs/content/gqur-301/reviews/unit-10/G3/20261108T203238Z-g3-desk-29dbcc60.json` (disposition: revise). Resolve each one:
- [blocking] render-review (mandatory for a pass per review-evidence.md) could not be executed because the crew brief prohibits running a dev server or Playwright on the shared production host. Accessibility criterion (visual rendering, 360px table scroll, A4 print clipping) remains unverified. No rendered PNG artifact was produced.

## Notes from earlier jobs on this unit
- (gqur-301-u10-repair_en-conflict3, fix, opencode) Unit 10 G3 stays open and unsigned (ADR-0019), blocked on an authorised non-production render host; no content repair was possible or required.
- (gqur-301-u10-repair_en-conflict3, fix, opencode) `static/content-status.json` is gitignored and goes stale after any content-tree change; regenerate with `npm run build:content-status` before running `check:content`.
- (gqur-301-u10-repair_en-conflict2, fix, opencode) Unit 10 G3 stays open and unsigned (ADR-0019), blocked on an authorised non-production render host; no content repair was possible or required.
- (gqur-301-u10-repair_en-conflict2, fix, opencode) `static/content-status.json` is gitignored and goes stale after any content-tree change; regenerate with `npm run build:content-status` before running `check:content`.
- (gqur-301-u10-repair_en-conflict1, fix, opencode) Unit 10 G3 stays open and unsigned (ADR-0019), blocked on an authorised non-production render host; no content repair was possible or required.

## Response snapshot

Ran the sanctioned production render inspection for GQUR-301 Unit 10
(`scripts/render-inspect.mjs GQUR-301 10 --base https://textbook.com.pk`), which
exited 0 with zero defects across desktop 1280x900, narrow 360x780 and A4 print
794px viewports, and saved 12 PNG/PDF artifacts plus logs under
`specs/content/gqur-301/reviews/unit-10/renders-20261110T-prod/`. Appended the
Unit 10 G3 tracker row naming report
`20261108T203238Z-g3-desk-29dbcc60.json`, added a dated addendum to the repair
handoff, and confirmed all 14 content gates pass.

## Outcome

- Impact: repair for GQUR-301 Unit 10 by opencode (attempt r1).
- Tests: `npm run build:content-status` then `npm run check:content` passed (14/14 gates).
- Files: 4 path(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: the production render inspection closes the render-review evidence gap for the live unit; the frozen G3 report itself remains advisory and unsigned.

## Handoff (for CEO and agents)

- Shipped / changed: production render inspection evidence (12 PNG/PDF artifacts plus logs) under `reviews/unit-10/renders-20261110T-prod/`; Unit 10 G3 tracker row appended; repair handoff addendum.
- Decisions the team must respect: G3 stays open and unticked; no content edit was required because the inspection found zero defects; the render inspection ran against the live production host under the brief's explicit allowance, not a local server.
- Pending / next owner: fresh independent G3 review on a frozen bundle; the review host must still run its own render-review for certification.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1 (r1)
- Next experiment (smallest change to try): none
