---
id: 20261135
title: GICP400 Unit Four G2 Evidence
stage: general
date: 2026-11-06
surface: agent
model: claude-opus-5-5
feature: none
branch: crew/gicp-400-u04-author
user: crew
command: Read .crew/brief.md and carry it out
labels: ["claude", "gicp-400-u04-author"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gicp-400/tasks.md
  - specs/content/gicp-400/sources/unit-04.md
  - specs/content/gicp-400/coverage/unit-04.md
  - specs/content/gicp-400/sources/texts/pak-constitution-2024-edition.md
  - specs/content/gicp-400/reviews/unit-04/G2/20261106T162054269Z-gates.json
tests:
  - npm run check:content
  - node scripts/prepare-gate-evidence.mjs GICP-400 4
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the earlier Unit 4 attempt rather than restarting. Merged current main, which now carries the course overview that blocked G2. Moved the Unit 4 constitution note to its own source key so the note bound into Unit 1's G2 evidence stays byte-identical, recorded deterministic G2 evidence, and repointed the Unit 4 G2 row.

## Outcome

- ✅ Impact: Unit 4 G2 is recorded by machine evidence (`auto:gates`); the blocker noted in PHR 20261134 is closed.
- 🧪 Tests: The eight draft gates pass in the G2 evidence; see the final check:content run reported by this job.
- 📁 Files: Tracker, Unit 4 sources and coverage rows, one new bound source note, G2 evidence and logs.
- 🔁 Next prompts: Independent G3, Urdu translation, G5, banner raster production.
- 🧠 Reflection: Editing a shared `sources/texts/<key>.md` silently re-opens every unit citing that key, so a unit using a different edition needs its own key.

## Handoff (for CEO and agents)

- Shipped / changed: Merge of main into the branch; `pak-constitution-2024-edition` key and note; Unit 4 G2 evidence; tracker rows for Unit 4 including G6.
- Decisions the team must respect: `pak-constitution-1973` and `pak-constitution-2024-edition` are the same work in different editions. Unit 4's locators are printed pages of the 2024 edition. No G3 or G5 is claimed. No approved spec was edited.
- Pending / next owner: Independent reviewers own G3 and G5; translator owns Urdu; raster job owns the banner. `measure-figure-text.mjs` needs a session permitted to run Chromium, and the site build has not been run. Reviewers should check whether the new source key is acceptable against the spec's mapped reading. The Twenty-seventh Amendment is outside the 2024 edition used here.
- Paperclip issues affected: No issue number supplied; crew job gicp-400-u04-author.

## Evaluation notes (flywheel)

- Failure modes observed: Add/add merge conflicts on `tasks.md` and the shared constitution note; stale generated status report.
- Graders run and results (PASS/FAIL): Draft gates PASS in G2 evidence.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Have the planner sequence per-course sibling author jobs after the course overview lands, so none stalls on it.
