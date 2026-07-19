---
id: 0001
title: Authentication and roles spec
stage: spec
date: 2026-07-17
surface: agent
model: claude-opus-4-8
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: /sp.specify
labels: ["authentication", "roles", "rbac", "sessions", "bilingual"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/002-authentication/spec.md
 - specs/002-authentication/checklists/requirements.md
tests:
 - none (specification phase — no code)
---

## Prompt

create feature specs from @SDD/002-authentication.md and @SDD/ROADMAP.md

## Response snapshot

Created branch `002-authentication` and wrote a business-focused feature specification for Authentication & Roles, derived from `SDD/002-authentication.md` and `SDD/ROADMAP.md`.

Key content:
- 4 prioritized, independently testable user stories: (P1) student sign-up/sign-in via Google or email+password with verification; (P1) password reset; (P2) teacher status request + admin approval; (P2) site-wide session persistence and sign-out.
- 17 functional requirements (FR-001..FR-017) covering account creation, email verification, default student role, password reset, teacher-request/approval gate, no self-elevation, admin-only seeding, server-authoritative roles, session persistence, return-to-origin redirect, bilingual EN/UR messaging, admin-only approvals area, and access control protecting profiles and answer keys.
- 4 key entities (Account, Profile, Teacher request, Session), 7 measurable success criteria, plus Assumptions and Dependencies sections.
- Implementation specifics from the SDD (Supabase Auth, `profiles` table + DB trigger, RLS, supabase-js, Docusaurus Root swizzle, `/app/*` routes) were deliberately excluded from the spec and flagged for `plan.md`.

Quality checklist at `checklists/requirements.md`: all items pass on iteration 1; no [NEEDS CLARIFICATION] markers. The SDD open item "may students also file book suggestions?" was scoped out as a Spec 004/005 concern rather than treated as an auth clarification.

## Outcome

- ✅ Impact: Approved-ready spec for Phase 2 (auth) of the roadmap; unblocks planning for Specs 003–005.
- 🧪 Tests: N/A (spec phase)
- 📁 Files: spec.md + requirements.md checklist under specs/002-authentication/
- 🔁 Next prompts: `/sp.clarify` (optional — spec is clean) then `/sp.plan` to select the Supabase/Docusaurus technical design.
- 🧠 Reflection: Source SDD was detailed enough to avoid clarification markers; main judgment was separating tech-agnostic behaviour (spec) from the locked Supabase stack (plan).

## Evaluation notes (flywheel)

- Failure modes observed: none — spec passed checklist first iteration.
- Graders run and results (PASS/FAIL): requirements checklist PASS (16/16 items).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): during `/sp.plan`, carry FR-016/FR-017 into an explicit RLS access-control test matrix.
