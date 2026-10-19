---
id: 0004
title: GQUR301 Unit2 independent English review
stage: misc
date: 2026-10-19
surface: agent
model: GPT-6
feature: 014-agent-review-governance
branch: crew/gqur-301-u02-review_en
user: board
command: carry out .crew/brief.md
labels: [board-direct, crew, g3-review, advisory]
links:
  spec: specs/014-agent-review-governance/spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7.json
  - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7/
  - specs/content/gqur-301/tasks.md
  - history/prompts/014-agent-review-governance/0004-gqur301-unit2-independent-english-review.misc.prompt.md
tests:
  - Six mandatory review validators passed individually
  - review-evidence validate passed with escalation disposition
  - check:content initial run found missing generated cache on unchanged origin/main
  - check:content final run PASS, all 13 gates
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied review-unit as the independent English reviewer. Created an input-bound advisory escalation report, readable findings, pre-key independent solutions and hashed command logs. Recorded the expressly requested advisory tracker row with in-progress status; no gate completion or certification. No authored inputs changed.

## Outcome

- Impact: Concrete repair requests for RRQ 10's reversed arithmetic reasoning, overgeneralised distribution-shape rule, assessment blueprint/demand, figure alt correctness and concept/coverage mappings.
- Tests: Six mandatory deterministic checks passed. Report validates as escalation. Full content check logged before and after generating the ignored status cache.
- Files: Review artifacts, advisory tracker row and this PHR.
- Next prompts: Separate author repair, host provenance/render evidence, fresh independent review.
- Reflection: Missing author-session provenance and a prohibition on building current pages cannot be converted into a passing review.

## Handoff (for CEO and agents)

- Shipped / changed: Advisory G3 escalation evidence only, with review status in progress.
- Decisions the team must respect: No G3/G5 completion, initials, signature, registry edit, publication-state change or prose repair. Findings remain open. The author run identity is explicitly unavailable, not fabricated.
- Pending / next owner: Author repairs observed defects; host provides author identity and input-bound desktop/narrow/A4 rendered evidence; fresh reviewer rechecks changed inputs. Publication authority remains with owner.
- Paperclip issues affected: No TEX issue supplied for this crew job; none changed.

## Evaluation notes (flywheel)

- Failure modes observed: Deterministic passes do not detect contradictory marking guidance, wrong alt values or false universal statistical claims. Initial generated content status cache was absent.
- Graders run and results (PASS/FAIL): Review report structurally valid; six mandatory validators PASS; full content suite PASS (13/13), results preserved in evidence logs.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Give a fresh reviewer the repaired frozen bundle, actual author session identity and current rendered pages.
