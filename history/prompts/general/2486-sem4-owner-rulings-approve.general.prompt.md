---
id: 2486
title: Owner rulings on Semester 4 intake; seven specs approved; catalog entries added
stage: general
date: 2026-11-18
surface: agent
model: claude-opus-5-5
feature: none
branch: governance/sem4-rulings
user: a2ahs
command: none
labels: [board-direct, intake, governance, semester-4]
links:
  spec: specs/decisions/log.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/decisions/log.md (D-2026-0086..0092 confirmed; D-2026-0093 added)
  - specs/gaps.md (30 gaps resolved)
  - catalog/courses.json (six Semester 4 entries)
  - specs/content/{gcce-400,gent-401,efmp-408,efmp-409,efpc-411,efpg-402,guhq-400}/content-spec.md
  - specs/content/licence-blueprint.md, SDD/ROADMAP.md (MFPG-402 -> EFPG-402)
tests:
  - npm run check:content: all 14 gates pass
  - npm run check:add-course: pass
  - crew plan --dry-run: Semester 4 author jobs held behind the one-course rule
---

## Prompt

ask questions to get my rulings, provide context and viable options

## Response snapshot

Five rounds of structured questions put every gap from `D-2026-0086` to `D-2026-0092` to the owner with context and options. Rulings: insert catalog entries now (confirmed after the staleness cost was stated, and extended to the six Semester 3 entries); `D-2026-0053` item 2 for all semesters; the five derived rows allowed; 3 formative items per topic at any size; EFPG-402, EFPC-411, GENT 2 (2-0); EFMP-408 Topic 6.4 kept with its 2026-09-13 decision recorded; groupings, topic rule, GCCE schedule and marks, secondary-level wording, readings and EFMP-409 wording as recommended. While implementing, the catalog cost turned out to be nil: since `5beb6f285` (2026-11-02) evidence binds only a unit's own course entry, and that commit had already inserted the Semester 3 entries, so their six gaps were closed as already done. The owner was told the earlier staleness warning was outdated. Merging PR #648 was blocked by the permission classifier, so this branch is built on #648's branch and carries its commits.

## Outcome

- ✅ Impact: all seven Semester 4 specs approved; six courses in the catalog; standing rules recorded for later semesters.
- 🧪 Tests: check:content and check:add-course pass; planner dry-run shows the Semester 4 author jobs queued and held.
- 📁 Files: listed above.
- 🔁 Next prompts: merge this PR (it includes #648); the crew starts Semester 4 when the one-course rule reaches it.
- 🧠 Reflection: the staleness warning given to the owner rested on an outdated reading of review-evidence binding; checking `git log` on `catalog/courses.json` first would have caught it.

## Handoff (for CEO and agents)

- Shipped / changed: D-2026-0086..0092 confirmed, D-2026-0093 added, 30 gaps resolved, seven specs approved, catalog gains GCCE-400, GENT-401, EFMP-409, EFPC-411, EFPG-402, GUHQ-400.
- Decisions the team must respect: D-2026-0093 items 2-4 and 8 are standing rules (author-selected readings and open-access floor, derived sub-topics, 3 formative items per topic, the week/section topic rule). Teaching of Science is EFPG-402 (docs path `docs/semester-4/efpg-402/`).
- Pending / next owner: OWNER - merge this PR; CREW - Semester 4 author jobs once earlier courses finish; AUTHORS - recheck EFMP-409 `gutenberg-primary` and other sources the evaluator could not reach.
- Paperclip issues affected: none

## Evaluation notes (flywheel)

- Failure modes observed: an outdated assumption about catalog binding nearly drove an unnecessary evidence refresh.
- Graders run and results (PASS/FAIL): check:content PASS; check:add-course PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): state the current catalog-binding rule in the evaluate-intake skill so evaluators stop escalating catalog insertion as an evidence-staleness question.
