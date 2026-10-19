---
id: 20261019-geng301-u03-review
title: Review GENG301 Unit Three Independently
stage: general
date: 2026-10-19
surface: agent
model: GPT-6
feature: 014-agent-review-governance
branch: crew/geng-301-u03-review_en
user: owner
command: crew brief execution
labels: [board-direct, g3-review, advisory]
links:
  spec: specs/014-agent-review-governance/spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/geng-301/reviews/unit-03/G3/crew-20261019.json
  - specs/content/geng-301/reviews/unit-03/G3/crew-20261019/
  - specs/content/geng-301/tasks.md
  - history/prompts/general/20261019-geng301-u03-independent-review.general.prompt.md
tests:
  - Six mandatory deterministic G3 commands passed
  - npm run check:content
  - review-evidence validate
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Produced an input-bound advisory G3 escalation report, readable findings and actual command logs. Added the explicitly requested advisory tracker row without completing G3. No reviewed content changed.

## Outcome

- Impact: Reported unsupported attribution, thesis scope drift, coverage mapping and assessment defects, and missing rendering/provenance evidence.
- Tests: Six mandatory deterministic commands passed. Initial content suite failed because generated static/content-status.json was missing; metadata generation and rerun passed all 13 gates.
- Files: New review artifacts, advisory tracker row and this PHR.
- Next prompts: Author repairs followed by a fresh independent review.
- Reflection: Missing evidence requires escalation; a structurally valid report is not certification.

## Handoff (for CEO and agents)

- Shipped / changed: Advisory G3 report and findings for GENG-301 Unit 3 only.
- Decisions the team must respect: G3 remains pending; no signing, self-registration, publication transition or content repair occurred. The brief's explicit tracker instruction authorizes the advisory row despite the reviewer skill's default findings-only boundary.
- Pending / next owner: Content author owns listed repairs; parent owns frozen handoff, actual session identities and independent solve-before-key and fresh narrow/A4 render evidence.
- Paperclip issues affected: None supplied.

## Evaluation notes (flywheel)

- Failure modes observed: No parent-frozen handoff or actual session identities supplied. Build prohibition prevented required render inspection. Assessment prompts and guidance were retrieved together, so independent solve-before-key is not established and is explicitly unverified.
- Graders run and results: Six mandatory deterministic commands PASS; content suite PASS after generated metadata; report validation PASS (escalate).
- Prompt variant: Crew brief.
- Next experiment: Fresh input-bound review after repairs, with assessment prompts isolated from answers.
