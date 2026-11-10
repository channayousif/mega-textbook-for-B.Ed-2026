---
id: crew-efmp-406-u02-repair_en-r1
title: crew repair_en EFMP-406 unit 2
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-406
branch: crew/efmp-406-u02-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-406/crew-efmp-406-u02-repair_en-r1.misc.prompt.md
 - specs/content/efmp-406/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u02-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u02-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-406/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-02/`.

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
From `specs/content/efmp-406/reviews/unit-02/G3/20261108T203238Z-g3-desk-d76ac5cd.json` (disposition: revise). Resolve each one:
- [blocking] RRQ 2, 3 and 9 schemes reward unrequested additions or explanations. Align prompts and full-credit requirements as detailed in crew-review/findings.md.
- [advisory] Review Bloom demand/tag alignment for MCQ 4/8 and Topic 2.2 retrieval item 2 while respecting approved bands.
- [uncertain] Actual author run identity, parent-prepared handoff and exact deployed model version unavailable. Crew job identifies reviewer task, not host session ID. Independence provenance requires coordinator evidence.
- [uncertain] Primary-source support not independently verified from a bound passage bundle; provide frozen excerpts or complete authorised unavailable-source declarations.
- [uncertain] Actual narrow-screen and A4 print inspection plus SVG glyph geometry unavailable because brief prohibits builds and Playwright. Accessibility remains unverified.

## Notes from earlier jobs on this unit
- (efmp-406-u02-translate-r1, translate, codex) Status remains draft; independent G3/G5 review and authorised browser, print and SVG geometry checks remain pending.
- (efmp-406-u02-translate-r1, translate, codex) Status remains draft; independent G3/G5 review and authorised browser, print and SVG geometry checks remain pending.
- (efmp-406-u02-repair_en, repair_en, claude) The source-excerpt bundle, author run provenance and the screen, print and SVG geometry checks are still open and need the coordinator and a host that can run a browser.
- (efmp-406-u02-repair_en, repair_en, claude) The questions and model answers changed in RRQ 2/3/9, MCQ 4/8 and Topic 2.2 check item 2, so the Urdu translation job should start from the repaired English, and a fresh independent G3 review must look at these new versions.
- (efmp-406-u02-translate, translate, codex) English author must repair RRQ 2/3/9 before translation resumes; draft status and G3/G5 remain unchanged.


## Response snapshot

Verified the current Unit 2 bytes already resolve the 20261108 desk report's stale RRQ 2/3/9 and Bloom findings, measured all 8 EN SVG variants (exit 0), and appended the advisory G3 tracker row naming the report in commit 35628f7a3.

## Outcome

- Impact: repair_en for EFMP-406 Unit 2 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the current Unit 2 bytes already resolve the 20261108 desk report's stale RRQ 2/3/9 and Bloom findings, measured all 8 EN SVG variants (exit 0), and appended the advisory G3 tracker row naming the report in commit 35628f7a3.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Source passage bundle, author run provenance and narrow-screen/A4 print inspection remain open; they need the coordinator and an authorised browser host.
  - The desk report's findings describe pre-repair bytes while its input manifest binds the repaired bytes; a fresh independent G3 review must check the current bytes.
  - Urdu translation is still draft and must start from the repaired English (RRQ 2/3/9, MCQ 4/8 and Topic 2.2 changed).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
