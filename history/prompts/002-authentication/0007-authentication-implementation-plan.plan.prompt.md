---
id: 0007
title: Authentication implementation plan
stage: plan
date: 2026-07-18
surface: agent
model: claude-opus-4-8
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: /sp.plan
labels: ["plan", "authentication", "supabase", "rls", "docusaurus", "constitution-gate"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: history/adr/0005-self-selectable-teacher-role-with-verified-teacher-gate.md
  pr: null
files:
 - specs/002-authentication/plan.md
 - specs/002-authentication/research.md
 - specs/002-authentication/data-model.md
 - specs/002-authentication/contracts/auth-operations.md
 - specs/002-authentication/quickstart.md
 - .specify/memory/constitution.md
 - CLAUDE.md
tests:
 - none run (planning phase); RLS matrix + auth e2e specified for /sp.tasks
---

## Prompt

/sp.plan

(Planning workflow for feature 002-authentication, following the two clarify sessions that
produced 9 clarifications and FR-001…FR-022.)

## Response snapshot

Generated the full Phase 0 + Phase 1 planning artifact set for Spec 002.

**Constitution Check caught a real governance conflict before any design work.**
Constitution v2.0.0 Art. V.3 said "a user MAY switch their own role between these two", which
directly contradicted spec FR-010/FR-010a (role fixed at sign-up, admin-only thereafter) from
the 2026-07-18 clarify session. The constitution had been amended during clarify session 1 and
never caught up with session 2's decision. Surfaced it to the owner rather than designing
around it; owner confirmed the spec is authoritative. Amended the constitution to **v2.1.0**
(MINOR — narrows a stated capability, reverses nothing) with a new Sync Impact Report, then
re-ran the gate clean. All 13 checked articles now pass.

Artifacts produced:
- **research.md** — 7 unknowns resolved (R1 static-site session handling, R2 server-authoritative
  roles, R3 safe sign-up role capture, R4 unforgeable audit, R5 immediate suspension,
  R6 anonymising deletion, R7 bilingual auth copy), each with rationale + rejected alternatives.
- **data-model.md** — `profiles` + `privilege_audit`, three enums, role/status/lifecycle state
  transitions, a 6-actor access-control matrix, four triggers/functions, two Edge Functions.
- **contracts/auth-operations.md** — no bespoke REST API (RLS *is* the contract); permitted
  client ops with expected denials, two Edge Function endpoints with status codes, and a
  15-item contract-test checklist mapped to FRs.
- **quickstart.md** — Supabase setup (Mumbai/free tier), migration ordering, first-admin
  seeding, verification tables, and the five failure modes most likely to bite.
- **plan.md** — summary, technical context, constitution gate table, source layout, risks,
  complexity justifications, follow-ups.

Three research findings materially shaped the design:
1. Role must be read from `profiles`, **not** a JWT claim — FR-011a's long-lived sessions would
   serve stale roles for days, breaking FR-008's "applies by next visit".
2. `raw_user_meta_data` is user-controlled, so the sign-up trigger must allowlist the requested
   role — otherwise a client could self-assign `admin`, defeating FR-006/FR-009.
3. A `status` column alone cannot end a live session; refresh-token revocation via the Admin
   API (hence an Edge Function) is required for FR-020's "signed out immediately".

Also flagged the RLS infinite-recursion trap: policies on `profiles` that ask "is the caller an
admin?" must route through a `SECURITY DEFINER` `is_admin()` helper or evaluation recurses.

## Outcome

- ✅ Impact: Spec 002 has a complete, constitution-compliant design; ready for `/sp.tasks`.
- 🧪 Tests: none run (planning). RLS negative-case matrix (SC-004 evidence) and auth e2e specified.
- 📁 Files: plan.md, research.md, data-model.md, contracts/auth-operations.md, quickstart.md; constitution → v2.1.0; CLAUDE.md context refreshed
- 🔁 Next prompts: `/sp.tasks` to decompose. Flip ADR-0005 Proposed → Accepted when the amendment commits.
- 🧠 Reflection: The gate check earned its keep — it caught a spec/constitution divergence that would otherwise have been discovered only when someone implemented a self-service role switcher the spec forbids. Worth treating "the governing doc lags the newest clarification" as the expected failure mode after any amendment, not an anomaly.

## Evaluation notes (flywheel)

- Failure modes observed: constitution amended mid-clarify (session 1) went stale when session 2 revisited the same article; nothing automatically re-checked it. Caught only because /sp.plan re-reads the constitution.
- Graders run and results (PASS/FAIL): Constitution Check FAIL on first evaluation (Art. V.3), PASS after v2.1.0 amendment; post-Phase-1 re-check PASS with one watch item (Art. V.5 bundle budget).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): at the end of any clarify session that amends the constitution, diff the amended article against the spec's FRs before closing — the two drifted here within a single day.
