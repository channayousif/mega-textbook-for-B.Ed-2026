---
id: 0002
title: EFMP303 Unit3 advisory G3 review
stage: misc
date: 2026-10-17
surface: agent
model: GPT-6 Codex; exact revision unavailable
feature: 014-agent-review-governance
branch: crew/efmp-303-u03-review_en
user: board-direct
command: carry out .crew/brief.md
labels: [board-direct, g3-review, efmp-303, advisory]
links:
  spec: specs/014-agent-review-governance/spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb.json
  - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/
  - specs/content/efmp-303/tasks.md
  - history/prompts/014-agent-review-governance/0002-efmp303-unit3-advisory-g3-review.misc.prompt.md
tests:
  - npm run check:content (baseline and final comparison)
  - Mandatory G3 validators run separately with exact logs
  - Figure text geometry and raw SVG Chromium inspection via scripts/heavy.sh
  - node scripts/review-evidence.mjs validate (escalate report)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Completed advisory G3 evidence and an open tracker row for EFMP-303 Unit 3. Disposition: escalate. Recorded seven actionable blocking repair groups and missing provenance, blind-solving and current-page render evidence. Preserved reviewed content and gate status. Saved actual validator logs, raw SVG render screenshots and a digest-bound machine-readable report. No push or PR.

## Outcome

- Impact: Review identifies reversed diagram sequences, missing allocation data, source and marking defects, inconsistent strategic classification, mapping errors and missing worked examples.
- Tests: Report structurally validates. Content suite has only existing origin/main findings: malformed shared glossary JSON with cascading lookups, and missing generated content-status JSON. No build or dev server was run.
- Files: New report, summary, manifest, command logs, three screenshots, source-retrieval record and this PHR; advisory tracker row appended.
- Next prompts: Author repairs, curriculum owner supplies authoritative provenance/decisions, fresh reviewer solves questions before reading answers and inspects current rendered pages.
- Reflection: Syntactic evidence validation does not supply academic certification. Disclose incomplete checks and never manufacture identity or render evidence.

## Handoff (for CEO and agents)

- Shipped / changed: Advisory escalation report and auditable artifacts for English Unit 3; G3 remains open.
- Decisions the team must respect: No sign-off, initials, publication change or source/content repair by the reviewer. Parent author run identity was not supplied. Local manifest preparation does not replace the parent handoff. Initial key exposure means assessment audit is post-key, not blind.
- Pending / next owner: Author owns content/diagram/source/mapping repairs; curriculum owner owns authority/source exceptions; review host owns fresh independent blind solving, verified author provenance and current mobile/A4 page inspection. Shared glossary repair and generated status baseline belong to other jobs.
- Paperclip issues affected: None supplied; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: Deterministic gates accept semantically reversed arrows and wrong item mappings; source-register metadata does not verify actual claim support. Initial bulk assessment read exposed answers too early and was explicitly recorded as a limitation.
- Graders run and results (PASS/FAIL): Evidence validation PASS for escalation; content suite FAIL on unchanged main baseline; geometry FAIL for figure 2 overflow; raw SVG rendering PASS as a limited artifact capture, not render-review.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Fresh bounded reviewer after repairs, with assessment questions separated from keys until independent solutions are recorded.
