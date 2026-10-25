---
id: 20261027
title: Generate the ADR register
stage: general
date: 2026-10-25
surface: agent
model: GPT-6
feature: none
branch: crew/maint-2026-w43-a1
user: a2ahs
command: Read .crew/brief.md and carry out A1
labels: ["codex", "weekly-maintenance", "adr"]
links:
  spec: null
  ticket: null
  adr: history/adr/README.md
  pr: null
files:
  - history/adr/README.md
  - history/prompts/general/20261027-generate-adr-register.general.prompt.md
tests:
  - Register row, relative-link, table-column and dash assertions
  - npm run check:content before and after
  - node --test tests/crew/*.test.mjs
  - node --test tests/crew/workers.test.mjs
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Generated the ADR register with six current-state areas, all 29 ADR rows, the absent 0028 note and amendment links. Left every source ADR unchanged.

## Outcome

- ✅ Impact: Contributors can trace present decisions and historical amendments from one register.
- 🧪 Tests: Register assertions pass and all 13 content gates pass before and after the change. Crew tests expose an existing workers.test.mjs expectation: codex expected, agy_claude returned.
- 📁 Files: ADR register and this required PHR only.
- 🔁 Next prompts: Owner review of the protected ADR path; dispatcher handles push and PR.
- 🧠 Reflection: Preserve Proposed status even where current constitutional policy already implements a proposal.

## Handoff (for CEO and agents)

- Shipped / changed: Added the complete ADR register without editing ADR decisions.
- Decisions the team must respect: ADR-0024 is amended by 0029 for raster production and 0030 for SVG authorship; no new architecture decision made.
- Pending / next owner: Owner reviews the protected-path change. Crew maintainer owns the pre-existing worker-chain test mismatch.
- Paperclip issues affected: No ticket supplied; maintenance A1 of 2026-W43.

## Evaluation notes (flywheel)

- Failure modes observed: Existing crew worker-chain test expects codex after avoiding claude, but the chain now selects agy_claude.
- Graders run and results (PASS/FAIL): PASS: 29 ordered rows, 90 resolving links, six columns, zero forbidden dashes; all 13 content gates before and after. FAIL: one unrelated crew worker-chain assertion, with scripts and tests identical to origin/main.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Update the worker-chain test only under a separately scoped maintenance task.
