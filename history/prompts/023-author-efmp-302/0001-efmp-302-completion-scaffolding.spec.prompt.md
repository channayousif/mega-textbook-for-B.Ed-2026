---
id: "0001"
title: "EFMP-302 completion scaffolding"
stage: spec
date: 2026-09-24
surface: agent
model: LongCat-2.0
feature: 023-author-efmp-302
branch: 023-author-efmp-302
user: orchestrator
command: completion-agent mandate
labels: [efmp-302, sdd, scaffolding, urdu-corpus, reviews]
links:
  spec: specs/023-author-efmp-302/spec.md
  ticket: null
  adr: ADR-0022, ADR-0026, ADR-0027
  pr: null
files:
  - specs/023-author-efmp-302/spec.md
  - specs/023-author-efmp-302/plan.md
  - specs/023-author-efmp-302/tasks.md
tests:
  - npm ci (clean)
  - npm run build:content-status (8 courses, EFMP-302: unit 1 certified, units 2-6 gated)
---

## Prompt

You are the dedicated completion agent for course EFMP-302 (Teaching Profession), Semester 1
of the B.Ed (4-Year) programme, repo /home/a2ahs/mega_book_for_B.Ed. You run in your own
isolated git worktree. [...] Your job: complete the Urdu corpus (units 3-6), run G3 advisory
reviews where tracker rows are open, and run G5 advisory reviews for all units with Urdu
mirrors - without unnecessary rework of what earlier cycles already settled. [Full mandate
verbatim in the orchestrator task; phases: 0 bootstrap, 1 SDD scaffolding (spec 023, branch
023-author-efmp-302, D-2026-0053..0062, G-2026-62..71), 2 G3 advisory reviews units 2-6,
3 G4 Urdu mirrors units 3-6, 4 G5 advisory reviews, 5 final gates + PR.]

## Response snapshot

Phase 0 verified base e913c80, ran npm ci and build:content-status (unit 1 certified with
reviewed Urdu; units 2-6 gated, G3/G5 open, translation_status draft; all figures placed).
Read the tracker, reviews tree, decision log (D-2026-0005, D-2026-0017), gaps (G-2026-24,
G-2026-30, G-2026-34 patterns), ADR-0019/0022/0023/0026/0027, both reviewer agents, the
translate-unit skill, and the GNAS-301 spec family as model. Created feature 023 via
create-new-feature.sh (branch 023-author-efmp-302), then authored spec.md (3 user stories:
P1 bilingual corpus, P2 gates, P3 review evidence; edge cases for G5-to-G3 binding failures,
revoked provisional history, terminology gaps), plan.md (reviews-first ordering so Urdu
translates against post-review bytes; constitution check) and tasks.md (T001-T023 across 5
phases).

## Outcome

- ✅ Impact: feature 023 scaffolding complete; work decomposed into G3 reviews (units 2-6),
  Urdu mirrors (units 3-6: 5/4/4/4 topics, 10/8/8/8 figures), G5 reviews, gates + PR.
- 🧪 Tests: npm ci clean; build:content-status green; no content gates run yet (no content
  changes yet).
- 📁 Files: specs/023-author-efmp-302/{spec,plan,tasks}.md, this PHR.
- 🔁 Next prompts: Phase 2 G3 advisory reviews, units 2-6 in order.
- 🧠 Reflection: the course's review history (runs 001-007, revoked provisional tier, stale
  cycle-3 pass) means every fresh review binds current bytes and prior findings carry as
  record, not as re-litigation; the two-cycle budget applies to this feature's repairs.

## Evaluation notes (flywheel)

- Failure modes observed: none in this phase (base commit matched mandate exactly).
- Graders run and results: build:content-status PASS.
- Prompt variant: completion-agent mandate (EFMP-302).
- Next experiment: first fresh G3 review (Unit 2) against a prepared manifest.
