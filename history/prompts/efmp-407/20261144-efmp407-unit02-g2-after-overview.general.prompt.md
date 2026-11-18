---
id: 20261144
title: Clear EFMP-407 Unit 2 G2 after course overview landed
stage: general
date: 2026-11-07
surface: agent
model: claude-opus-5-5
feature: efmp-407
branch: crew/efmp-407-u02-author
user: M Yousif Channa
command: crew job efmp-407-u02-author
labels: [claude, crew, efmp-407, authoring]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-407/tasks.md
  - specs/content/efmp-407/reviews/unit-02/G2/
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

The Unit 2 draft was already committed; its only open finding was the G2 row, because evidence preparation needs `docs/semester-3/efmp-407/course-overview.mdx`. That file is outside the Unit 2 scope and was in open PR #473 (Unit 1 batch). Waited for #473 to merge rather than copying it, merged origin/main, resolved the add/add conflict in `tasks.md` keeping both units' rows, generated real G2 evidence and repointed the row.

## Outcome

- ✅ Impact: Unit 2 G2 row is done on genuine gate evidence; the dependency blocker note is removed from the tracker.
- 🧪 Tests: `npm run check:content` result is reported in the job's final output. `npm run build`, Playwright and `measure-figure-text` were not run (barred by the brief).
- 📁 Files: `specs/content/efmp-407/tasks.md`, `specs/content/efmp-407/reviews/unit-02/G2/`, plus the merge of main.
- 🔁 Next prompts: independent G3 review of Unit 2; Urdu mirror job.
- 🧠 Reflection: same-course unit jobs depend on whichever job creates the course shell; waiting for its merge kept this job inside scope.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 2 G2 evidence and tracker row, on top of the existing English draft (commit ec48c1b9c).
- Decisions the team must respect: the course overview and `_category_.json` come from the Unit 1 job; this job did not edit them.
- Pending / next owner: G3 independent review; G4/G5 Urdu job; browser geometry of the six SVGs is first measured by the CI `figure-geometry` job; the banner remains a separate job; the overview's line "Unit 1 is available now" will need updating by the course-integration owner.
- Paperclip issues affected: none (crew job efmp-407-u02-author).

## Evaluation notes (flywheel)

- Failure modes observed: an earlier attempt's PHR `553` recheck repeats one sentence in every field, and it stopped at the blocker without checking for an open PR carrying the file.
- Graders run and results (PASS/FAIL): see final output of the job.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): have the planner hold later units of a new course until the job that creates the course shell has merged.
