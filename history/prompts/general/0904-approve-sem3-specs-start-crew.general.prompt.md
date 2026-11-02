---
id: 0904
title: Approve Semester 3 specs, start crew
stage: general
date: 2026-11-02
surface: agent
model: claude-opus-5-5
feature: none
branch: content/sem3-content-specs
user: M Yousif Channa
command: none
labels: ["board-direct", "semester-3", "intake", "g0-g1", "crew"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-406/content-spec.md
 - specs/content/efmp-407/content-spec.md
 - specs/content/efpg-401/content-spec.md
 - specs/content/gicp-400/content-spec.md
 - specs/content/giss-401/content-spec.md
 - specs/content/guhq-301/content-spec.md
 - specs/decisions/log.md
 - specs/gaps.md
tests:
 - npm run check:no-em-dash, check:no-answer-keys, check:pipeline-gate, validate:content, check:source-floor (all exit 0)
 - node scripts/crew/crew.mjs plan --dry-run
---

## Prompt

why crew is not processing newly developed course specs

approve all the specs and make crew start the work. why local main is behind origin main. should we sync them?

our goal is to continuously add new courses so this limitation is a bottleneck, every new addition will invalidate the existing g3 rewiv must be avoided

now approve the sem3 specs and start crew

## Response snapshot

Cause: the six Semester 3 specs (EFMP-406, EFMP-407, EFPG-401, GICP-400, GISS-401, GUHQ-301) were on an unpushed branch and were `status: draft`. The crew planner queues `author` jobs only for `status: approved` specs on main (`scripts/crew/planner.mjs` specUnitNumbers).

Done: the branch was rebased onto origin/main. The evaluator's determined repairs were applied: EFPG-401 got three reading rows fixed (Celce-Murcia locator and note, Nolasco & Arthur attribution, the guide's "Carvan" imprint restored). GISS-401 Unit 1 now maps `bhat-2019-education`, so the declared open-access floor holds, and the Maududi row's 1980 edition ISBN is corrected. D-2026-0075 to 0080 are confirmed as the owner's rulings, with every escalated item accepted as drafted. 23 gaps are resolved; the six catalog-entry gaps stay open, with the entries approved but their insertion deferred. All six specs are now `status: approved`. A planner dry-run gives focus EFMP-406 with 6 author jobs, and holds 36 author jobs for the other five courses (one course at a time, ruling 2026-10-28).

Local main sync: the main checkout is 0 ahead and 2317 behind origin/main because nothing pulls it; crew works in ~/crew-system. A fast-forward is safe; the only local edits are an uncommitted `http-proxy` dependency and untracked files.

## Outcome

- ✅ Impact: crew starts authoring Semester 3 at its next tick after merge, beginning with EFMP-406.
- 🧪 Tests: light content gates exit 0; planner dry-run shows the EFMP-406 author jobs.
- 📁 Files: six content specs, specs/decisions/log.md, specs/gaps.md.
- 🔁 Next prompts: per-course catalog evidence binding, then add the six catalog entries; fast-forward the local main checkout.
- 🧠 Reflection: catalog entries are deliberately absent. Adding them now would make the G2/G3 evidence of every reviewed unit stale, because `scripts/lib/review-evidence.mjs` binds the whole of `catalog/courses.json`.

## Handoff (for CEO and agents)

- Shipped / changed: six Semester 3 content specs approved (owner confirmation of D-2026-0075 to 0080); determined repairs to EFPG-401 and GISS-401 readings.
- Decisions the team must respect: `D-2026-0053` item 2 (author-selected open-access readings and the open-access floor) now applies to these six Semester 3 courses by owner ruling. EFPG-401 "3 formative items per topic" for 4-7-topic units and GUHQ-301 Unit 2's formative count are accepted as drafted. EFPG-401 stays bilingual (default). Do NOT add the six catalog entries until evidence binds a course's own catalog entry.
- Pending / next owner: crew, which authors EFMP-406 first. Board-direct: per-course catalog binding in `review-evidence.mjs` (a one-time re-evidence sweep, best done after the G3 desk backlog clears), then the catalog entries.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: approved-looking work sat on an unpushed local branch with no signal to the owner that crew could not see it.
- Graders run and results (PASS/FAIL): light gates PASS; planner dry-run PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): have crew's status report list draft specs on main and unpushed intake branches as "waiting for owner approval".
