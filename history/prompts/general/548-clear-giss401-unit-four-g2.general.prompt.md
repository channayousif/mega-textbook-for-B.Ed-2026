---
id: 548
title: Clear GISS401 unit four G2
stage: general
date: 2026-11-03
surface: agent
model: claude-opus-5-5
feature: 008-rich-unit-pedagogy
branch: crew/giss-401-u04-author
user: owner
command: carry out .crew/brief.md
labels: [claude, giss-401-u04-author]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/giss-401/course-overview.mdx
  - docs/semester-3/giss-401/_category_.json
  - specs/content/giss-401/tasks.md
  - specs/content/giss-401/reviews/unit-04/G2/20261102T233255375Z-gates.json
tests:
  - node scripts/prepare-gate-evidence.mjs GISS-401 4 (8/8 G2 gates PASS)
  - npm run check:content (13/13 PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

(Brief: crew job giss-401-u04-author, author GISS-401 Unit 4 in English from its approved
content-spec; continue earlier work on the branch. Feedback from the previous attempt:
check:pipeline-gate failed because the Unit 4 'G2 en-draft' row was not done.)

## Response snapshot

The earlier attempt (PHR 547) had authored the unit but could not generate G2 evidence because
docs/semester-3/giss-401/course-overview.mdx was missing. The sibling Unit 1, 2 and 3 jobs each
carry a course overview and _category_.json; Units 1 and 2 have byte-identical copies. Copied that
shared version unchanged (to avoid merge conflicts), committed it, ran
prepare-gate-evidence.mjs GISS-401 4 (all 8 G2 gates PASS), pointed the Unit 4 G2 row at the
emitted gates file, regenerated static/content-status.json and reran check:content: 13/13 PASS.

## Outcome

- ✅ Impact: Unit 4 English draft now carries valid G2 evidence; pipeline gate is green.
- 🧪 Tests: check:content 13/13 PASS; G2 evidence 8/8 PASS.
- 📁 Files: Course overview and category (copied from the Unit 1 job), tracker G2 row, G2 evidence JSON and logs, this PHR.
- 🔁 Next prompts: Independent G3 review with Islamic Studies expertise; Urdu translation (G4) and G5; figure geometry measurement in CI.
- 🧠 Reflection: Course-level files are a shared prerequisite for every per-unit G2 run; the first unit merged should own them.

## Handoff (for CEO and agents)

- Shipped / changed: GISS-401 Unit 4 G2 en-draft marked done with auto:gates evidence; course-overview.mdx and _category_.json added, identical to the Unit 1 and Unit 2 branches.
- Decisions the team must respect: No G3/G5 certification claimed; G6 stays in progress. The course overview still says "Unit 1 is available now"; whoever merges last should update the available-units sentence once.
- Pending / next owner: G3 independent review (qualified Islamic Studies reviewer); Urdu mirror and .ur.svg figures (translate job); measure-figure-text not run here (crew bars Chromium), CI figure-geometry job will measure the four SVGs.
- Paperclip issues affected: None; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: Previous attempt stopped at a scope question (course overview) that sibling jobs had already resolved by copying the shared file.
- Graders run and results (PASS/FAIL): prepare-gate-evidence PASS; check:content PASS (13/13).
- Prompt variant (if applicable): Crew brief giss-401-u04-author, retry with feedback.
- Next experiment (smallest change to try): Have the planner land course-level files in a separate first job for new courses.
