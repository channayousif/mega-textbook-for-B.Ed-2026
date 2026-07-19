---
id: 0006
title: Clarify session two lifecycle audit
stage: spec
date: 2026-07-18
surface: agent
model: claude-opus-4-8
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: /sp.clarify
labels: ["clarify", "authentication", "roles", "audit", "account-lifecycle", "privacy"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: history/adr/0005-self-selectable-teacher-role-with-verified-teacher-gate.md
  pr: null
files:
 - specs/002-authentication/spec.md
 - specs/002-authentication/checklists/requirements.md
tests:
 - none (specification phase — no code)
---

## Prompt

/sp.clarify

(Second clarification pass over specs/002-authentication/spec.md. The first session
(2026-07-17) exhausted its 5-question quota; this run opened a new session dated 2026-07-18.)

## Response snapshot

Re-scanned Spec 002 and found genuine remaining gaps — several of them **created by the
previous session's own role-model reversal**, which introduced a self-selectable, switchable
teacher role without defining its lifecycle. Asked 4 questions (stopped short of the 5-question
quota rather than padding).

Clarifications accepted and integrated:
1. **Role-switch lifecycle → D.** Role is chosen once at sign-up and is thereafter immutable to
   the user; only an administrator can change an existing account's role. This removes the
   self-downgrade path, so a user cannot orphan their own students' classes.
   → FR-010 rewritten, FR-010a added, US3 narrative + new acceptance scenario 5, 2 edge cases.
2. **Audit trail → A.** Every role change, verified-teacher grant/removal, and (after Q3)
   suspension/reinstatement produces an append-only audit entry: affected account, acting
   administrator, before/after value, timestamp; admin-reviewable, never editable in-app.
   Framed as the compensating control for having dropped the teacher-approval workflow.
   → FR-018, FR-019, new "Privilege-change audit entry" entity, SC-008.
3. **Revocation defined → A.** "Revocation" was a dangling term in FR-011a with no owner.
   It now means administrator **suspension**: immediate sign-out, sign-in refused while
   suspended, data retained, reversible, audited.
   → FR-020, FR-011a reworded, profile gains account status, edge case.
4. **Account deletion → B.** Self-service deletion removes personal identity (name, email,
   credentials) while submissions and grades are retained **anonymised**, so teacher gradebooks
   don't develop retroactive holes. Irreversible; frees the email for a fresh unrelated account.
   → FR-021, FR-022, 2 edge cases, SC-009, assumption handing anonymisation mechanics to Spec 003.

Final validation pass caught and repaired 4 defects:
- FR numbering out of order twice (FR-010b preceded FR-010a; FR-019 stranded after FR-022).
- Session entity still used the now-superseded word "revocation" instead of the canonical
  "administrator suspension".
- FR-015 still scoped the admin area to role management only, though it now also covers
  suspension and audit review.
- Two places still said the constitution/roadmap amendment "should be recorded" when it had
  already landed (Constitution v2.0.0, ROADMAP #4, ADR-0005).

Deferred to `/sp.plan` as non-blocking implementation detail: admin user-list/search UI,
rate-limit thresholds, observability beyond the audit trail.

## Outcome

- ✅ Impact: Spec 002 now covers the full account lifecycle (create → suspend → delete) and has an audit trail backing its security gate; ready for `/sp.plan`.
- 🧪 Tests: N/A (spec phase)
- 📁 Files: spec.md (4 clarifications, 6 new FRs, 1 new entity, 2 new SCs, 7 new edge cases, 4 consistency repairs); checklist re-validated
- 🔁 Next prompts: `/sp.plan` for Spec 002. Flip ADR-0005 Proposed → Accepted when the amendment commit lands.
- 🧠 Reflection: A clarification that reverses a decision doesn't just replace text — it opens new questions the original spec never had to answer. Session 1 made the teacher role self-selectable and switchable; nothing then defined what switching *did*. Worth re-running clarify after any reversal rather than treating one pass as terminal.

## Evaluation notes (flywheel)

- Failure modes observed: same class of defect as session 1 — incremental per-answer edits left ordering and terminology inconsistencies that only a whole-document pass caught (4 this time vs 2 last time). Also found a dangling undefined term ("revocation") that had survived the original spec write *and* a full prior clarify pass.
- Graders run and results (PASS/FAIL): clarify step-6 validation PASS after 4 repairs; requirements checklist PASS (16/16).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): before asking any questions, grep the spec for terms used in requirements but never defined anywhere (e.g. "revocation") — that scan alone surfaced one of this session's four questions.
