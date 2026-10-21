---
id: 0005
title: GQUR301 Unit Two Advisory Review
stage: misc
date: 2026-10-21
surface: agent
model: GPT-6
feature: 014-agent-review-governance
branch: crew/gqur-301-u02-review_en-r1
user: board-direct
command: carry out .crew/brief.md
labels: [board-direct, g3-review, gqur-301, advisory]
links:
  spec: specs/014-agent-review-governance/spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/gqur-301/reviews/unit-02/G3/
  - specs/content/gqur-301/tasks.md
  - history/prompts/014-agent-review-governance/0005-gqur301-unit-two-advisory-review.misc.prompt.md
tests:
  - six mandatory deterministic review commands passed
  - npm run check:content baseline and final comparison
  - node scripts/review-evidence.mjs validate: escalate report structurally valid
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Produced an advisory G3 escalation report, readable findings, diagnostic input manifest and
hashed actual command logs for GQUR-301 Unit 2. Added the brief-required advisory tracker row
with an agent identity and open status. No unit content, publication state or certification
was changed. The branch began at origin/main with no prior work to preserve.

## Outcome

- Impact: Four revision requests cover inaccurate figure geometry, underdetermined interval-width assessment guidance, insufficient per-topic higher-order demand and missing chart-production scaffolding.
- Tests: All six required deterministic review commands passed. Initial full content check failed only on missing generated static/content-status.json in the unchanged origin/main checkout. Final rerun had 12/13 passes and an identical failure section; zero new findings.
- Files: Review evidence and tracker row, plus this PHR.
- Next prompts: Separate author repairs and a fresh independently prepared review.
- Reflection: Escalation is required when provenance, answer-blind solving or rendered evidence is incomplete; structural report validation cannot establish acceptance.

## Handoff (for CEO and agents)

- Shipped / changed: Advisory escalation report, concrete F1-F4 findings, input digests, check logs and an unticked tracker row.
- Decisions the team must respect: No G3 completion, signature, provisional pass, content repair or publication transition. The explicit crew brief authorises the advisory tracker row despite the skill's general write restriction.
- Pending / next owner: Author repairs F1-F4. Owner/evaluator resolves fresh G1 authority and supplies actual author provenance. Orchestrator prepares source-bound inputs and permits fresh answer-blind and rendered review.
- Paperclip issues affected: None supplied; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: No parent-prepared G3 manifest or actual author run ID; exact model snapshot unavailable; answers displayed before solving; prohibited browser/build work prevents required presentation evidence.
- Graders run and results (PASS/FAIL): Six deterministic commands PASS; report-format validator PASS with escalation; full content baseline FAIL only on missing generated status file, final comparison retained with evidence.
- Prompt variant (if applicable): Crew gqur-301-u02-review_en-r1.
- Next experiment (smallest change to try): Supply a fresh source-bound bundle and provenance, and have a new permitted reviewer solve assessment before viewing guidance.
