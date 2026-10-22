---
id: crew-gqur-301-u08-review-en
title: Review Unit Eight English Evidence
stage: misc
date: 2026-10-22
surface: agent
model: GPT-6
feature: gqur-301
branch: crew/gqur-301-u08-review_en
user: crew-owner
command: read-and-execute-crew-brief
labels: [board-direct, crew, g3-review, codex]
links:
  spec: specs/014-agent-review-governance/spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/gqur-301/reviews/unit-08/G3/01a1608a-2fc5-7f41-a824-c08320f0383b.json
  - specs/content/gqur-301/reviews/unit-08/G3/crew-review/
  - specs/content/gqur-301/tasks.md
  - history/prompts/gqur-301/crew-gqur-301-u08-review-en.misc.prompt.md
tests:
  - scripts/heavy.sh npm run check:content (baseline and final)
  - Six mandatory G3 deterministic validators (all passed)
  - node scripts/review-evidence.mjs validate (passed, escalate)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Produced independent advisory G3 evidence for GQUR-301 Unit 8, with disposition escalate. Recorded actual reviewer session, frozen input digests, six successful validator logs, assessment calculations, source inspection and baseline comparison. Added the explicitly requested open advisory tracker row. No content was revised or certified.

## Outcome

- Impact: made the review findings and unmet evidence requirements actionable.
- Tests: mandatory validators pass; check:content has only the pre-existing missing generated static/content-status.json failure on origin/main.
- Files: append-only Unit 8 G3 report and artifacts, advisory tracker row and this PHR.
- Next prompts: separate author repairs F1-F4; host/owner supplies provenance, current G1 authority and browser-enabled frozen review handoff.
- Reflection: identical input commits allow an exact baseline comparison; missing evidence must stay unverified even when arithmetic and deterministic checks pass.

## Handoff (for CEO and agents)

- Shipped / changed: advisory escalation report, supporting logs and derivations, and open G3 tracker row.
- Decisions the team must respect: no G3/G5 completion, signing, registry edits, publication or translation-status change. Crew brief explicitly requests advisory row and prohibits browser/build runs. No PR or push is authorized by this job.
- Pending / next owner: author repairs lock security claim, print-source attribution, identical-letter caption and method-chart assumptions. Owner/evaluator resolves G1; host supplies actual author run ID and frozen evidence; fresh reviewer supplies answer-blind and rendered checks.
- Paperclip issues affected: none supplied; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: missing actual author session, no parent bundle, prohibited rendered inspection, incomplete bound Lane chapter, and initial derivation save failed because python executable was absent. Retrospective save is explicitly disclosed.
- Graders run and results (PASS/FAIL): report validation PASS; six mandatory deterministic commands PASS; full content suite FAIL only for baseline generated-status absence.
- Prompt variant (if applicable): crew job gqur-301-u08-review_en.
- Next experiment (smallest change to try): prepare corrected committed bytes and complete the missing evidence in a fresh independent review.
