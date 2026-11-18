---
id: 2483
title: Lead fixes three red merge jobs and resumes the crew
stage: general
date: 2026-11-18
surface: agent
model: claude-opus-5-5
feature: none
branch: chore/lead-phr-2483
user: a2ahs
command: crew-lead
labels: [board-direct, crew, crew-lead]
links:
  spec: ops/crew/README.md
  ticket: null
  adr: null
  pr: "#640"
files:
  - specs/content/gqur-301/tasks.md (branch crew/gqur-301-u15-repair_en)
  - specs/content/efpg-401/tasks.md (branches crew/efpg-401-u03-author, crew/efpg-401-u05-author)
  - specs/content/efpg-401/sources/texts/kiran-2021-gtm-clt.md (branch crew/efpg-401-u03-author)
  - docs/semester-3/efpg-401/unit-03/topic-01.mdx (branch crew/efpg-401-u03-author)
  - specs/content/efpg-401/reviews/unit-03/G2/20261118T032407482Z-gates.json (branch crew/efpg-401-u03-author)
  - ~/.crew/mega-book/board.json (host state, not in git)
tests:
  - npm run check:content on each of the three merged branches: all 14 content gates pass
---

## Prompt

fix the red jobs and resume, our target is complete 4 semesters

## Response snapshot

All three red jobs (gqur-301-u15-repair_en, efpg-401-u03-author, efpg-401-u05-author) had failed with "could not join a batch after 5 merge fixes": each merge fix was overtaken by the next batch editing the same course tracker. With the crew paused, the lead merged origin/main into each branch by hand. GQUR-301 tasks.md: stage rows unioned, U15 repair row kept last. EFPG-401 tasks.md (U3, U5): rebuilt from main plus only that unit's units-table row, stage rows and reading estimate, and the status line updated; a blind union would have duplicated headers and reinstated stale Unit 4/6/7 rows. kiran-2021-gtm-clt.md: took main's verified notes (U4 author, 2026-11-10). U3 topic-01 said Kiran studied "Pakistani secondary schools"; corrected to the verified sample (Grade 7 pupils, a government elementary school in Okara) and G2 evidence refreshed. Branches pushed (a6326192a, d456f8564, 29a0fea2b), jobs set ready in board.json (backup board.json.bak-20261118-leadmerge), crew resumed and ticked: the three jobs joined batch PR #640; red 0.

## Outcome

- ✅ Impact: crew unpaused with 0 red jobs; EFPG-401 Units 3 and 5 and GQUR-301 U15 repair are in batch PR #640.
- 🧪 Tests: check:content all 14 gates pass on each branch; PR #640 CI figure-geometry pass, build pending at write time.
- 📁 Files: listed above; changes live on the crew branches merged via #640.
- 🔁 Next prompts: owner G0/G1 intake for semester 4; owner G3 sign-off queue (35 units).
- 🧠 Reflection: the built-in mergeTrackerRows resolver handles row-only tracker conflicts but not a conflicting status line or units-table row, so author jobs on the same course loop through merge fixes.

## Handoff (for CEO and agents)

- Shipped / changed: three red jobs repaired and batched (PR #640); crew resumed.
- Decisions the team must respect: Kiran (2021) is a Grade 7 elementary-school experiment in Okara, not a secondary-school study; cite it that way.
- Pending / next owner: OWNER - semester 4 needs G0 intake for EFMP-409, EFPG-402, GCCE-400, GENT-401 (absent from catalog/courses.json) and approval of the draft EFMP-408 content spec; OWNER - 35 units await G3 sign-off; CREW - GUHQ-301 starts after GPKS-402 finishes (one-course-at-a-time rule).
- Paperclip issues affected: none

## Evaluation notes (flywheel)

- Failure modes observed: repeated merge-fix loop on shared course tracker (status line and units table rows) when two author jobs for one course finish together.
- Graders run and results (PASS/FAIL): check:content PASS x3.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): extend mergeTrackerRows to merge the units-table row per unit and regenerate the status line, so these conflicts resolve without a merge-fix job.
