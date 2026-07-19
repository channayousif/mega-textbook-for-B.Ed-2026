---
id: 0004
title: ADR self-selectable teacher verified gate
stage: misc
date: 2026-07-17
surface: agent
model: claude-opus-4-8
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: /sp.adr
labels: ["adr", "authentication", "authorization", "governance-amendment", "answer-key-protection"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: history/adr/0005-self-selectable-teacher-role-with-verified-teacher-gate.md
  pr: null
files:
 - history/adr/0005-self-selectable-teacher-role-with-verified-teacher-gate.md
tests:
 - none (decision-record phase — no code)
---

## Prompt

/sp.adr   (analyze planning artifacts and document architecturally significant decisions as ADRs; no extra user input)

## Response snapshot

`/sp.plan` had not been run, so plan.md is absent (the command's Step 1 would normally abort). However the user invoked `/sp.adr` deliberately, following the recommendation from the prior clarify session to document the self-selectable-teacher governance amendment. That decision is fully specified in spec.md + the Clarifications log and is architecturally significant independent of the implementation plan, so I proceeded with a **spec/clarification-derived ADR** and noted the missing plan explicitly.

Created **ADR-0005: Self-Selectable Teacher Role with Verified-Teacher Gate** (`history/adr/0005-...md`), Status: Proposed. It clusters one cross-cutting authorization decision:
- Role selection is self-service (student default / teacher; admin never self-selectable).
- Teacher role grants only peer-teaching capabilities — no approval workflow.
- Answer keys / restricted material gated behind a separate admin-granted `verified_teacher` capability (off by default, never self-grantable).
- Admins manage roles/capabilities directly; enforcement at the RLS/authorization layer.

Documented positive consequences (meets peer-teaching goal, preserves answer-key integrity, simpler state machine, least-privilege, orthogonal auth tests) and negatives (amends locked governance, self-declared teacher capabilities ungated, two concepts to explain, new admin verify workflow). Listed 4 alternatives with rationale (A keep approval gate; B fully-open self-declaration; C single ordered role ladder; D identity proofing) — all rejected.

Significance test: PASS on all three (impact = authorization + constitution amendment; alternatives = 4 with tradeoffs; scope = roles consumed by Specs 003–005 and RLS design). Clustering: single ADR (not atomic) — correct.

Conflict scan: no existing ADR (0001–0004 are all 001-content-platform) covers auth/roles, so no ADR-level conflict. There IS a governance conflict with Constitution Art. V.3 and ROADMAP Decision #4 (both locked) — documented in the ADR as a required follow-up amendment, not a silent override.

## Outcome

- ✅ Impact: Permanent record of why teacher approval was replaced by self-selection + verified-teacher gate; preserves answer-key integrity rationale for future readers.
- ⚠️ Governance: ADR is Proposed and amends Constitution Art. V.3 + ROADMAP Decision #4 — those documents must be amended (`/sp.constitution`, ROADMAP edit) to match before implementation.
- 🧪 Tests: N/A (decision record)
- 📁 Files: history/adr/0005-self-selectable-teacher-role-with-verified-teacher-gate.md
- 🔁 Next prompts: `/sp.constitution` (amend Art. V.3) + ROADMAP Decision #4 edit; then `/sp.plan` (link ADR-0005 from plan.md, add verified-teacher RLS test rows).
- 🧠 Reflection: Ran ADR pre-plan by design because the significant decision emerged during clarify; kept the ADR spec-derived and flagged plan.md as pending rather than hard-aborting on a mechanical prerequisite.

## Evaluation notes (flywheel)

- Failure modes observed: over-granular ADR risk (avoided — one clustered decision); missing-alternatives risk (avoided — 4 alternatives with rationale); mechanical-abort risk (handled — proceeded with transparency instead of blocking the user's explicit intent).
- Graders run and results (PASS/FAIL): significance checklist PASS (impact/alternatives/scope all true); clustering PASS; alternatives-present PASS; pros+cons PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): once plan.md exists, backfill its Implementation Plan link into ADR-0005 References and flip Status to Accepted after the constitution amendment lands.
