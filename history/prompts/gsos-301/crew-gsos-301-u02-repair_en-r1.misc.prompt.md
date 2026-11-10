---
id: crew-gsos-301-u02-repair_en-r1
title: crew repair_en GSOS-301 unit 2
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: gsos-301
branch: crew/gsos-301-u02-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261190-gsos-301-unit-02-g3-desk-repair.general.prompt.md
 - history/prompts/gsos-301/crew-gsos-301-u02-repair_en-r1.misc.prompt.md
 - specs/content/gsos-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u02-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u02-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gsos-301/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-02/`.

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
From `specs/content/gsos-301/reviews/unit-02/G3/20261108T203238Z-g3-desk-a2c0932a.json` (disposition: revise). Resolve each one:
- [blocking] F1: obsolete/misattributed prose citations; see summary F1.
- [blocking] F2: adult socialization and Mead stages conflated; figure/text age mismatch; see summary F2.
- [blocking] F3: recognition/recall labelled Apply; see summary F3.
- [blocking] F4: insufficient evidence for stage questions and weak evaluation rubrics; see summary F4.
- [blocking] F5: coverage and concept mappings point to unrelated assessment items; see summary F5.
- [advisory] F8: ethnically/ethnocentrically wording and optional personal disclosure; see summary F8.
- [uncertain] F6: actual narrow/desktop/A4 render inspection unavailable; see summary F6.
- [uncertain] F7: missing author run provenance, exact model revision and complete frozen source evidence; see summary F7.

## Notes from earlier jobs on this unit
- (gsos-301-u02-repair_en, repair_en, codex) G3 remains unticked; render inspection and original provenance/complete source evidence remain pending.
- (gsos-301-u02-repair_en, repair_en, codex) G3 remains unticked; render inspection and original provenance/complete source evidence remain pending.
- (gsos-301-u02-translate-r1, translate, codex) Translation remains draft; English review findings and rendered Urdu inspection remain pending before independent G5 review.
- (gsos-301-u02-translate-r1, translate, codex) Translation remains draft; English review findings and rendered Urdu inspection remain pending before independent G5 review.
- (gsos-301-u02-translate, translate, agy) translation_status remains draft pending independent G5 review; G4 tracker row recorded with auto:gates.


## Response snapshot

Verified the 20261108 G3 desk report restates already-repaired findings, appended the unticked advisory Unit 2 G3 tracker row naming it, and committed the row plus PHRs with all 14 content gates passing.

## Outcome

- Impact: repair_en for GSOS-301 Unit 2 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the 20261108 G3 desk report restates already-repaired findings, appended the unticked advisory Unit 2 G3 tracker row naming it, and committed the row plus PHRs with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 stays unticked; F6 desktop/narrow/A4 render inspection and F7 original author run identity/model revision/complete frozen source evidence remain open for the owner/review host.
  - Urdu translation remains draft pending independent G5; the 20261108 desk report's criteria/findings are stale copies, so a fresh independent review is needed after the missing evidence arrives.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
