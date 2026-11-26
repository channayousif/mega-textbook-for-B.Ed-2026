---
id: 20261290
title: ADR-0039 crew model routing and second agy account
stage: misc
date: 2026-11-27
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: docs/adr-0039-crew-model-routing
user: M Yousif Channa
command: /sp.adr crew-model-routing-and-second-agy-account
labels: [board-direct, adr, crew]
links:
  spec: specs/034-backlog-tracking/spec.md
  ticket: null
  adr: history/adr/0039-crew-model-routing-and-second-antigravity-account.md
  pr: null
files:
  - history/adr/0039-crew-model-routing-and-second-antigravity-account.md
  - history/adr/README.md
tests:
  - none (documentation); agy2 sign-in verified: headless reply "ok", tokens differ from ~/.gemini
---

## Prompt

signed in, disabled some mcps, yes record/run  adr

## Response snapshot

Verified the second Antigravity account: `~/.agy2/.gemini/antigravity-cli/antigravity-oauth-token`
exists, `ops/crew/bin/agy2 -p` answered "ok", and its token differs from the main profile's (the
account identity itself was not read). Ran the ADR review: one decision cluster (crew per-stage
Claude routing, quota subagents and skill, usage measurement, and the second agy account isolated
by HOME) passes all three significance tests; no existing ADR covers or conflicts with it (it
builds on ADR-0030). Wrote ADR-0039 (Accepted by owner instruction, 2026-11-27) with five
alternatives (status quo, global opusplan or Sonnet, editing reviewer agent files, Docker, a
second OS user) and positive and negative consequences, and added the README index row.

## Outcome

- ✅ Impact: the crew's worker roster and quota strategy are on record with their rationale.
- 🧪 Tests: n/a (docs).
- 📁 Files: ADR-0039, ADR README.
- 🔁 Next prompts: apply user-level opusplan once #901 merges; mark agy2 health ok once #902 merges; weekly usage comparison.
- 🧠 Reflection: one clustered ADR fits; separate ADRs for routing and agy2 would split decisions that serve one quota strategy.

## Handoff (for CEO and agents)

- Shipped / changed: ADR-0039.
- Decisions the team must respect: per-stage routing via CLAUDE_ROUTING with env overrides; reviewer agent files stay untouched; agy2 isolated by HOME, Docker only as an approved fallback.
- Pending / next owner: none for the ADR.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): ADR checklist PASS (clustered, alternatives with rationale, pros and cons, concise)
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
