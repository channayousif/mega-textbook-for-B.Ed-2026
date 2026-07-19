---
id: 0003
title: Amend constitution v2 self-select teacher
stage: constitution
date: 2026-07-17
surface: agent
model: claude-opus-4-8
feature: none
branch: 002-authentication
user: channayousif@gmail.com
command: /sp.constitution
labels: ["constitution", "governance-amendment", "authentication", "roles", "roadmap"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: history/adr/0005-self-selectable-teacher-role-with-verified-teacher-gate.md
  pr: null
files:
 - .specify/memory/constitution.md
 - SDD/ROADMAP.md
 - history/adr/0005-self-selectable-teacher-role-with-verified-teacher-gate.md
tests:
 - none (governance document — no code)
---

## Prompt

/sp.constitution — amend Art. V.3 to match ADR-0005, and edit ROADMAP Decision #4 (required before implementation; ADR is Proposed until this lands)

## Response snapshot

Amended the project constitution `.specify/memory/constitution.md` **v1.1.0 → v2.0.0 (MAJOR)** to match ADR-0005, and synced the two downstream governance artifacts.

Version bump rationale (MAJOR): a stated non-negotiable governance rule was *reversed*. Former Art. V.3 "Teacher role assignment requires admin approval — no self-declared teachers" (reinforced by Art. IX.3) is inverted to self-selectable roles. Reversing a non-negotiable is a breaking governance change even though no already-approved spec is invalidated (Spec 001 doesn't touch roles; Spec 002 is draft being aligned).

Changes:
- **Article V.3** renamed "Roles and restricted-material access": `student`/`teacher` self-selectable at sign-up (default student); a user may switch their own role between the two; `admin` never self-selectable; teacher grants peer-teaching only; answer-key/restricted-material access moved to a separate admin-granted `verified_teacher` capability (default off), enforced at backend per Art. V.2.
- **Article IX.3** rewritten: the audited admin action is now the `verified_teacher` grant (who granted, when); self-selecting teacher needs no approval.
- **Sync Impact Report** (top HTML comment) replaced for the 1.1.0 → 2.0.0 change, with modified-articles list, template-sync status, and downstream-artifact list.
- Footer version line → 2.0.0.
- **SDD/ROADMAP.md**: Decision #4 rewritten ("Teacher role is self-selectable; answer-key access requires admin verification") with an amendment note; phase-2 table row "admin approval" → "self-selectable roles, admin role management + verified-teacher gate".
- **ADR-0005** flipped Proposed → Accepted (amendment landed) and its References updated to cite Constitution v2.0.0.

Consistency propagation: grep confirmed no hardcoded "admin approval"/"self-declared" strings in `.specify/templates/` (plan/spec/tasks/commands) — Constitution Check gate derives principles at plan time, so no template edits needed. Remaining "admin approval" occurrences are intentional (Sync Impact Report + amendment notes quoting the old rule).

Validation: no unfilled `[TOKENS]`/`{{PLACEHOLDERS}}`; version line matches report (2.0.0); dates ISO 2026-07-17.

## Outcome

- ✅ Impact: Governance now consistent with the self-selectable-teacher decision across constitution, ROADMAP, spec 002, and ADR-0005; unblocks `/sp.plan` for 002.
- 🧪 Tests: N/A (governance doc)
- 📁 Files: .specify/memory/constitution.md (v2.0.0), SDD/ROADMAP.md (Decision #4 + phase table), history/adr/0005-...md (Accepted)
- 🔁 Next prompts: `/sp.plan` for 002-authentication (design profiles table, self-select role flow, verified_teacher RLS matrix, account-linking, durable session).
- 🧠 Reflection: MAJOR bump was the honest call — reversing a non-negotiable is breaking governance even absent an invalidated approved spec; documenting the old text in the Sync Report preserves the audit trail.

## Evaluation notes (flywheel)

- Failure modes observed: risk of under-bumping (MINOR) a reversed non-negotiable; risk of leaving stale "admin approval" language in normative clauses — both avoided (MAJOR bump; grep-verified normative clauses clean).
- Graders run and results (PASS/FAIL): placeholder scan PASS (none); version-consistency PASS (report ↔ footer 2.0.0); stale-normative-term scan PASS (only impact-report/amendment-note quotes remain); template propagation PASS (no hardcoded refs).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): during `/sp.plan`, add a Constitution Check row explicitly asserting Art. V.3/IX.3 v2.0.0 compliance (self-select + verified_teacher gate) with an RLS test reference.
