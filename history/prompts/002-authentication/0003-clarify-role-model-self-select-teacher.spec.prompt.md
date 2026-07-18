---
id: 0003
title: Clarify role model self-select teacher
stage: spec
date: 2026-07-17
surface: agent
model: claude-opus-4-8
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: /sp.clarify
labels: ["authentication", "roles", "rbac", "governance-amendment", "answer-key-protection"]
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

/sp.clarify   (second clarify pass; no additional command text)

User answers during the session:
- Q1 (teacher role: admin approval workflow vs self-select): "admin approval is not required, however admin can edit any role" → after disambiguation, chose Option B (users self-select their role at sign-up; admin can edit any role), rationale: "a student may be allowed to teach a group of other students and can benefit."
- Q2 (what protects answer keys once teacher is self-selectable): A (split concerns — verified-teacher capability, admin-granted).

## Response snapshot

Second clarification pass reshaped the role model. The owner replaced the request→pending→approve teacher workflow with **self-selected roles + direct admin role management**. Because this reverses a locked governance rule (Constitution Art. V.3 / ROADMAP Decision #4, whose sole rationale was keeping answer keys from students), I disambiguated the security-critical fork before writing, then raised the answer-key consequence as a dependent question.

Resolution (recorded in `## Clarifications → Session 2026-07-17`):
- **Self-selectable teacher role**: users pick student/teacher at sign-up (default student); `admin` never self-selectable; admin can edit any role. No approval/pending workflow.
- **Answer-key protection preserved by decoupling**: a separate admin-granted **"verified teacher" capability** gates answer keys / restricted material; self-declaring teacher never unlocks them.

Spec surgery applied across sections:
- User Story 3 rewritten ("Self-select a teaching role; admin manages roles") + new acceptance scenarios.
- Edge Cases: replaced pending-teacher case with verified-capability + self-escalation cases.
- FRs: FR-003 (self-select role), FR-005 (teacher = peer-teaching only), FR-005a (verified-teacher gate), FR-006 (no self-escalation to admin/verified), FR-007 (admin edits any role/capability), FR-008 (change applies by next visit), FR-010 (user may switch own student/teacher only), FR-015/FR-016/FR-017 reworded to "verified teacher".
- Entities: Profile updated (role + verified-teacher flag, no teacher-request status); "Teacher request" entity replaced by "Verified-teacher capability".
- Success Criteria: SC-002, SC-004, SC-005 updated.
- Assumptions + Dependencies: recorded the Constitution/ROADMAP amendment and preserved answer-key intent.
- Checklist notes updated to flag the governance amendment + ADR need.

Verified no stale "pending/approval/unapproved" terms remain except intentional amendment notes.

## Outcome

- ✅ Impact: Role model now matches owner intent (peer teaching) without losing answer-key integrity; unblocks planning.
- ⚠️ Governance: Amends Constitution Art. V.3 + ROADMAP Decision #4 — a constitution/roadmap amendment and an ADR should be recorded before/at `/sp.plan`.
- 🧪 Tests: N/A (spec phase)
- 📁 Files: spec.md (multi-section rewrite), checklists/requirements.md (notes)
- 🔁 Next prompts: `/sp.adr self-selectable-teacher-role-with-verified-gate`, then `/sp.constitution` amendment, then `/sp.plan`.
- 🧠 Reflection: The user's terse instruction hid a security-critical fork; disambiguating (self-set role vs self-set answer-key access) before editing prevented shipping an answer-key hole. Splitting role from capability satisfied both the pedagogical goal and the integrity constraint.

## Evaluation notes (flywheel)

- Failure modes observed: risk of silently applying a constitution-violating change; mitigated by surfacing the locked-decision conflict and disambiguating before integration.
- Graders run and results (PASS/FAIL): stale-term scan PASS (no obsolete approval terms outside amendment notes); Clarifications invariant PASS (one bullet per accepted answer).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): capture the verified-teacher gate as an explicit RLS test row in `/sp.plan`, and open the ADR to justify the amendment.
