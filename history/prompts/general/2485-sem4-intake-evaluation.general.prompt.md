---
id: 2485
title: Semester 4 G0/G1 intake evaluation
stage: general
date: 2026-11-18
surface: agent
model: claude-opus-5-5
feature: none
branch: content/sem4-intake-eval
user: crew-lead
command: evaluate-intake (agent:evaluator) x7
labels: [agent:evaluator, intake, semester-4]
links:
  spec: specs/content/gcce-400/content-spec.md (and the six other Semester 4 content-specs from PR #646)
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/648
files:
  - specs/decisions/log.md
  - specs/gaps.md
  - specs/content/gcce-400/intake/evaluation.md
  - specs/content/gent-401/intake/evaluation.md
  - specs/content/efmp-408/intake/evaluation.md
  - specs/content/efmp-409/intake/evaluation.md
  - specs/content/efpc-411/intake/evaluation.md
  - specs/content/mfpg-402/intake/evaluation.md
  - specs/content/guhq-400/intake/evaluation.md
  - history/prompts/general/2485-sem4-intake-evaluation.general.prompt.md
tests:
  - manifestFor() recomputation of all seven intake manifests (56 inputs each, 0 mismatches, digests identical)
  - npm run -s check:content (all 14 content gates pass)
  - em-dash scan of every new or changed line (0 found)
---

## Prompt

Evaluate the seven Semester 4 draft content specs at G0/G1

## Response snapshot

Ran the evaluate-intake skill as agent:evaluator, one course at a time, on GCCE-400, GENT-401,
EFMP-408, EFMP-409, EFPC-411, MFPG-402 and GUHQ-400. Each frozen bundle was recomputed with
`manifestFor()` before judging (0 mismatches in all seven). Recorded one pending-owner-review
decision per course (`D-2026-0086` to `D-2026-0092`), 24 gaps (`G-2026-211` to `G-2026-234`, of
which 211-214 are cross-course) and one `intake/evaluation.md` per course. No spec was approved
in full; no content-spec, catalog, tracker, constitution or style-guide file was touched.

## Outcome

- ✅ Impact: every Semester 4 spec now has an evaluation record and a decision awaiting owner
  review; the guide-determined parts are approved and everything else is escalated to named gaps.
- 🧪 Tests: manifests verified; `check:content` exit 0; no em dashes.
- 📁 Files: decision log, gaps register, seven evaluation records, this PHR.
- 🔁 Next prompts: owner rulings on `G-2026-211` to `G-2026-234`; author repairs listed in each
  decision's Limits; fresh intake on newly prepared manifests after repair.
- 🧠 Reflection: four questions recur at every intake (catalog entries, `D-2026-0053` items 2 and
  4 outside Semester 2, formative counts for 4+ topic units). A corpus-wide ruling on each would
  remove most of the escalations.

## Handoff (for CEO and agents)

- Shipped / changed: `D-2026-0086` (GCCE-400), `D-2026-0087` (GENT-401), `D-2026-0088`
  (EFMP-408), `D-2026-0089` (EFMP-409), `D-2026-0090` (EFPC-411), `D-2026-0091` (MFPG-402),
  `D-2026-0092` (GUHQ-400), all pending-owner-review; gaps `G-2026-211` to `G-2026-234` open;
  evaluation records under `specs/content/<course>/intake/evaluation.md`.
- Decisions the team must respect: no Semester 4 spec may move to `status: approved` or be
  authored until its gaps are ruled and its author repairs made, then a fresh intake runs.
  Article II.3 conflicts escalated, not decided: GENT-401 credit hours (`G-2026-219`), School
  Observation code (`G-2026-227`), Teaching of Science code (`G-2026-230`). EFMP-408 Topic 6.4 cites
  an "owner decision 2026-09-13" that no register records (`G-2026-221`).
- Pending / next owner: curriculum owner for all gaps; the drafting author for the repairs
  (GCCE-400 identity and weighting statements; EFMP-408 `:241` row and Unit 1/2 ERQ count;
  EFMP-409 Unit 4 summative below Analyze and Scheme department; EFPC-411 Week 12 references;
  GUHQ-400 cite `G-2026-04`).
- Paperclip issues affected: none known.

## Evaluation notes (flywheel)

- Failure modes observed: drafts cite owner rulings beyond their scope (`D-2026-0053` items 2 and
  4, `D-2026-0072`, Semester 3 "approved as drafted" outcomes treated as precedent); one draft
  misstates the guide (GCCE-400 says the guide has no identity line or weighting); one draft binds
  books no registry shows under `D-2026-0001` (MFPG-402).
- Graders run and results (PASS/FAIL): manifest recomputation PASS x7; `check:content` PASS
  (first run of `check:content-status` failed only because the gitignored
  `static/content-status.json` is absent in a fresh worktree; PASS after regenerating it).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): ask the owner for one corpus-wide decision covering
  `G-2026-211` to `G-2026-214`, then re-run the intakes.
