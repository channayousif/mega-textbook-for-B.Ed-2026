---
id: 0081
title: Propose non-Claude authoring agents
stage: general
date: 2026-10-01
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: channayousif
command: none
labels: ["paperclip", "agents", "adr-0024", "adr-proposal", "governance"]
links:
  spec: null
  ticket: null
  adr: history/adr/0024-capability-based-claude-and-codex-visual-authoring.md
  pr: null
files:
 - specs/decisions/adr-proposals.md
tests:
 - none
---

## Prompt

i also have codex, agy and opencode, we can attach them with agents. ceo should be attached with claude

(Follow-up answers: Textbook.com.pk workers = "agy, opencode, codex"; Da Vinci = "Install OpenCode + agy there too"; ContentAuthor and CurriculumLead = "Move authoring off Claude".)

## Response snapshot

Mapped the Paperclip workforce engines: CEOs stay on Claude; WebLead to Codex (ChatGPT login), GrowthLead to OpenCode, Antigravity for independent review and implementation jobs within the AGENTS.md limits. Moving ContentAuthor off Claude contradicts ADR-0024 decision 1, so an amendment proposal was appended to specs/decisions/adr-proposals.md (proposal only; ADR creation awaits owner consent). ADR-0019 vendor independence for G3/G5 is preserved in the proposal.

## Outcome

- ✅ Impact: ADR-0024 amendment proposal recorded; ContentAuthor stays on Claude until the owner adopts it.
- 🧪 Tests: none (governance document only); confirmed zero em dashes in the edited file.
- 📁 Files: specs/decisions/adr-proposals.md
- 🔁 Next prompts: owner approves via /sp.adr; then switch ContentAuthor engine and pair it with a different-vendor reviewer.
- 🧠 Reflection: engine changes for content roles are governance changes in this repo, not configuration.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): em-dash check on edited file PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
