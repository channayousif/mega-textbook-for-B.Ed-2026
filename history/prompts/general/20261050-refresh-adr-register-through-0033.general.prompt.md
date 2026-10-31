---
id: 20261050
title: Refresh ADR register through 0033
stage: general
date: 2026-11-01
surface: agent
model: gpt-6
feature: none
branch: crew/maint-2026-w44-a1
user: a2ahs
command: crew maint_adr A1
labels: ["codex", "maintenance", "adr"]
links:
  spec: specs/maintenance/2026-W44/spec.md
  ticket: null
  adr: history/adr/0033-sourced-geographic-and-real-world-figures.md
  pr: null
files:
 - history/adr/README.md
 - history/adr/0024-capability-based-claude-and-codex-visual-authoring.md
 - history/adr/0029-gemini-agy-raster-illustration-producer.md
 - history/prompts/general/20261050-refresh-adr-register-through-0033.general.prompt.md
tests:
 - python3 .crew/check-register.py
 - node --test tests/crew/*.test.mjs
 - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Updated the register through ADR-0033, added ADR-0031 and its current-state paragraph, and recorded the narrow ADR-0033 amendments in ADR-0024 and ADR-0029. Decision sections remain unchanged.

## Outcome

- ✅ Impact: Contributors can find all 32 ADRs and the current visual sourcing amendments.
- 🧪 Tests: 32 ordered rows and 99 resolving links; unchanged decision bodies; no forbidden dashes in edited ADR files; 83 crew tests pass; all 13 content gates pass on both the changed tree and origin/main.
- 📁 Files: Three ADR documentation files and this required PHR.
- 🔁 Next prompts: Owner review of protected ADR paths through the crew dispatcher.
- 🧠 Reflection: Kept amendment summaries limited to real-territory maps and reuse of real-world images.

## Handoff (for CEO and agents)

- Shipped / changed: Register completeness, count, video-studio summary and visual amendment status lines.
- Decisions the team must respect: No ADR policy changed. The strict AGENTS.md PHR rule takes precedence over the maintenance skill dispatcher-only PHR guidance.
- Pending / next owner: Owner reviews protected ADR changes; dispatcher owns subsequent PR handling. No push or PR opened by this worker.
- Paperclip issues affected: Maintenance 2026-W44 A1; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Initial scratch-script invocation used unavailable python; reran with python3. Initial dash scan included unchanged historical ADRs; scoped it to the task files.
- Graders run and results (PASS/FAIL): PASS: ADR acceptance checks, crew tests and content gates.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
