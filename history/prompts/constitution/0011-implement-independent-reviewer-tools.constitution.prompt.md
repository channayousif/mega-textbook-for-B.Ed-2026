---
id: "0011"
title: Implement independent reviewer tools
stage: constitution
date: 2026-09-12
surface: agent
model: unspecified
feature: 014-agent-review-governance
branch: 014-enable-reviewer-tools
user: channayousif
command: user-request
labels: [G3, G5, reviewer-skills, evidence]
links:
  spec: specs/014-agent-review-governance/spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - .claude/skills/review-unit/SKILL.md
  - .claude/agents/g3-reviewer.md
  - .claude/agents/g5-reviewer.md
  - scripts/review-evidence.mjs
  - scripts/lib/review-evidence.mjs
  - scripts/check-pipeline-gate.mjs
  - tests/review/evidence.test.mjs
  - specs/014-agent-review-governance/validation.md
tests:
  - 17 Node evidence tests passed
  - review-unit skill validation passed
  - Independent English/Urdu excerpt exercise detected defects and escalated
---

## Prompt

enable the agents and merge

## Subsequent steering

continue

## Response snapshot

Installed callable G3/G5 reviewer definitions and a shared stage-specific skill; implemented
input manifests, report validation, detached signature acceptance and pipeline integration.
PR 38 was found already merged by the owner, so implementation proceeds in a follow-up PR.
Automatic certification remains blocked on real qualification and protected signing setup;
no approval evidence or owner-labelled evaluation was invented.

## Outcome

- Impact: review execution and evidence enforcement implemented.
- Tests: 17 evidence fixtures passed; skill validator passed; independent excerpt review
  caught wrong keys and Urdu negation reversal. Full PR CI is verified before merge.
- Files: reviewer skills/agents, evidence tooling, pipeline/CI integration and contributor docs.
- Next prompts: provision protected signing and conduct real reviewer qualification.
- Reflection: installation enables review execution, not automatic academic certification.

## Evaluation notes

- Failure modes: original gate accepted arbitrary reviewer strings; now agent rows require evidence.
- Graders: local evidence tests PASS; skill validator PASS; excerpt exercise advisory only.
- Prompt variant: none.
- Next experiment: owner-labelled held-out G3/G5 evaluation after signing-host preparation.
