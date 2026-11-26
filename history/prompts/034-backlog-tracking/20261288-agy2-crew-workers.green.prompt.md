---
id: 20261288
title: Second Antigravity account as agy2 and agy2_claude crew workers
stage: green
date: 2026-11-27
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: feat/034-agy2-workers
user: M Yousif Channa
command: extend crew with agy2 and agy2-claude (plan part C)
labels: [board-direct, crew, ops]
links:
  spec: specs/034-backlog-tracking/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - scripts/crew/workers.mjs
  - ops/crew/bin/agy2
  - ops/crew/README.md
  - tests/crew/worker-chains.test.mjs
  - tests/crew/social-stage.test.mjs
tests:
  - node --test tests/crew/*.test.mjs (202 passed)
  - agy with an empty HOME created its own .gemini (HOME isolation works)
  - ops/crew/bin/agy2 without a login exits 1 with UNAUTHENTICATED (code 401)
---

## Prompt

inject the chart, close #823, then do #820, Configure Claude for efficiency, use different models for different kind of tasks, for eg opus is good at planning, sonnet in economical and good at implementation. Using sub agents for efficiency. The objective is to get more out of the same weekly Claude quota. We can also explore the options for context management and create needed skills and scripts. i have another agy account and want to extend crew worker with agy2 and agy2-claude using container as agy does not support multiple profiles like calude.

## Response snapshot

Owner ruling: separate HOME first, Docker only if agy ignores HOME. Verified agy follows HOME
(it created `.gemini` inside an empty temporary home), so no container is needed. Created the
host profile `~/.agy2` (mode 700) with its own `.gemini` and the agy settings copied (no tokens),
linking `.gitconfig`, `.ssh`, `.nvm`, `.local` and `~/.config/{gh,git}` to the real home. Added the
`ops/crew/bin/agy2` wrapper, which refuses with "UNAUTHENTICATED (code 401)" until the second
account signs in, so the crew cools the workers instead of a job hanging on a login prompt. Added
workers `agy2` (google) and `agy2_claude` (anthropic) right after their siblings in every chain
except `illustrate` (the image lane calls agy through generate-illustration.mjs). Updated the two
tests that pin exact chains and added tests for the placement and the cooling fallback.

## Outcome

- ✅ Impact: once signed in, the crew gains a second Gemini quota and a second agy Claude quota.
- 🧪 Tests: crew 202/202; wrapper guard verified.
- 📁 Files: see list above.
- 🔁 Next prompts: owner signs in (`! HOME=~/.agy2 agy`); install the wrapper link after merge; mark health ok.
- 🧠 Reflection: test the cheap isolation first; Docker would have escaped the crew's memory-capped slice.

## Handoff (for CEO and agents)

- Shipped / changed: agy2 and agy2_claude workers (PR); ~/.agy2 profile on the host.
- Decisions the team must respect: agy2 isolation is by HOME, not Docker (owner ruling 2026-11-26); agy2 never joins the illustrate chain until generate-illustration.mjs learns a second account.
- Pending / next owner: owner signs in to the second Google account in ~/.agy2.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: an unsigned-in agy blocks waiting for login; guarded in the wrapper.
- Graders run and results (PASS/FAIL): crew tests PASS
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
