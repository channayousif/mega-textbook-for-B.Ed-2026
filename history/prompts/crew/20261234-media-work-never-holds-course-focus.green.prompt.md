---
id: 20261234
title: Media work never holds the crew's course focus
stage: green
date: 2026-11-21
surface: agent
model: claude-opus-5-5
feature: crew
branch: fix/crew-focus-media-independent
user: M Yousif Channa
command: crew status (then investigation and planner fix)
labels: [board-direct, crew, planner]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - scripts/crew/planner.mjs
  - tests/crew/planner.test.mjs
  - history/prompts/crew/20261234-media-work-never-holds-course-focus.green.prompt.md
tests:
  - node --test tests/crew/*.test.mjs (150 pass, 0 fail)
  - node scripts/crew/crew.mjs plan --dry-run (focus GUHQ-301, would queue guhq-301-u01-author)
---

## Prompt

crew status

but the target was 4 semesters, is that complete?

we already created spec for all 4 semesters investigate

yes, media creation and content authoring are mutually exclusive.

## Response snapshot

Crew status: 0 running, 1 queued (`gqur-300-u06-illustrate`), 2 red
(`efpg-401-u01-plan_illustrations`, `gnas-301-u04-illustrate`), 41 units awaiting G3 sign-off.

The first 4-semester assessment was wrong: the owner checkout was 883 commits behind
`origin/main`, so it read a stale catalog. On main, GUHQ-301 and all seven Semester 4 specs
(GCCE-400, GENT-401, EFMP-408, EFMP-409, EFPC-411, EFPG-402, GUHQ-400) are `status: approved`
and in the catalog (D-2026-0093, PRs #646, #648, #652, merged 2026-11-18).

Root cause of no Semester 3/4 progress: `focusCourse` (owner ruling 2026-10-28, one course at a
time) counted every in-flight corpus job as work left. The only job left on GQUR-300 was a raster
`illustrate` job waiting days for image quota (agy until 2026-11-24, gflow offline, codex
cooling), so the planner held the author jobs of all eight approved courses on every run.

Owner ruling: media creation and content authoring are mutually exclusive tracks. Added
`MEDIA_STAGES` (`figures`, `illustrate`, `plan_illustrations`) and `holdsFocus(stage)` in
`scripts/crew/planner.mjs`; `focusCourse` now counts only authoring-track stages. Media jobs still
run and keep their own limits (`limitIllustrate`, `limitPlanIllustrations`). New test covers it.

## Outcome

- ✅ Impact: the crew starts GUHQ-301 on the next plan run, then each Semester 4 course in catalog order, instead of idling until image quota returns.
- 🧪 Tests: 150/150 crew tests pass (the worktree needed node_modules; 4 suites fail on a fresh worktree without it, on main too); dry-run plan shows focus GUHQ-301.
- 📁 Files: planner.mjs (MEDIA_STAGES, holdsFocus, focusCourse), planner.test.mjs (new test), this PHR.
- 🔁 Next prompts: after merge, confirm the cron plan run queues guhq-301-u01-author; triage the two red illustration jobs.
- 🧠 Reflection: always diff HEAD..origin/main before reporting corpus state from the owner checkout.

## Handoff (for CEO and agents)

- Shipped / changed: course focus ignores media stages; new courses start while figure and image jobs wait.
- Decisions the team must respect: owner ruling 2026-11-21, media creation and content authoring are mutually exclusive tracks; media work never holds the one-course-at-a-time focus. The 2026-10-28 rule still applies to authoring, review, repair and translation work. Not added to `specs/decisions/log.md` because that register is a digest-bound intake input; record it there in the next governance PR if the owner wants it formalised.
- Pending / next owner: lead triages `efpg-401-u01-plan_illustrations` and `gnas-301-u04-illustrate` (red, 3 failures each); owner G3 sign-off for 41 units.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: status read from a stale checkout; a serial external-quota job starved the whole authoring pipeline.
- Graders run and results (PASS/FAIL): crew node tests PASS; planner dry-run PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): show "held because of" on the board when the focus course has only waiting work.
