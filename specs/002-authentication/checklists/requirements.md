# Specification Quality Checklist: Authentication & Roles

**Purpose**: Validate specification completeness and quality before proceeding to planning
**Created**: 2026-07-17
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Success criteria are technology-agnostic (no implementation details)
- [x] All acceptance scenarios are defined
- [x] Edge cases are identified
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria
- [x] User scenarios cover primary flows
- [x] Feature meets measurable outcomes defined in Success Criteria
- [x] No implementation details leak into specification

## Notes

- Implementation specifics from the source SDD (Supabase Auth, `profiles` table + trigger, Row-Level Security, supabase-js, Docusaurus swizzle, `/app/*` routes) were intentionally moved out of the spec and belong in `plan.md`. The spec keeps only the technology-agnostic behaviour and constraints.
- Source SDD open item "may students also file book suggestions?" is a Spec 004/005 concern (book-suggestion feature), not authentication; recorded as out of scope here rather than as a clarification.
- All checklist items pass; spec is ready for `/sp.plan`.
- **Governance amendment (2026-07-17 clarify session)**: the owner chose a self-selectable teacher role (no request/approval workflow) with answer-key/restricted access gated behind an admin-granted "verified teacher" capability. This **amends** Constitution Art. V.3 and ROADMAP Decision #4 ("teacher requires admin approval") while preserving the answer-key-protection intent. ✅ Recorded: Constitution v2.0.0 (Art. V.3 / IX.3 + Sync Impact Report), ROADMAP Decision #4 rewritten, and ADR-0005 (status **Proposed** — flip to Accepted once the amendment commit lands).
- **Second clarify session (2026-07-18)** added 4 clarifications and 6 requirements (FR-018…FR-022, plus FR-010a): role immutable after sign-up (admin-only changes), an audit trail for privileged changes, administrator account suspension (which defines the previously dangling term "revocation"), and self-service account deletion with anonymised retention of academic work. Re-validated: all checklist items still pass.
- Two downstream obligations were handed to **Spec 003** rather than resolved here: what happens to a teacher's active classes when an administrator changes their role, and the mechanics of anonymising submissions/grades on account deletion.
- Deliberately deferred to `/sp.plan` as implementation-level (non-blocking): administrator user-list/search UI, rate-limit thresholds, and observability beyond the privilege-change audit trail.
- **`/sp.analyze` remediation (2026-07-18)** — 12 findings applied across spec/plan/tasks:
  - **CRITICAL (C1)**: FR-002 email verification had zero task coverage — no task enabled confirmation and no test asserted unverified sign-in is refused. Added T007a (`config.toml` `enable_confirmations`) and T021a (test).
  - **HIGH**: FR-010 display-name editing had no implementing task (T031a + T024a added); Constitution Art. VII's mandated Lighthouse gate had no task (T060a added).
  - **MEDIUM**: FR-008/SC-005 role-change propagation now verified (T041a — regression guard against moving role into a JWT claim); SC-001 sign-up speed folded into T063; FR-005 reworded to delegate peer-teaching capabilities to Spec 003; FR-006/FR-010 and FR-016/FR-017 de-duplicated; **User Story 5 added** so FR-020–FR-022 (suspension, deletion) have an owning story — Phase 7 relabelled `[US5]`.
  - **LOW**: plan.md source tree updated with `authRedirect.ts` + `admin/audit.tsx` and the five e2e specs; shared-file conflict notes added for `authErrors.ts` and `profile.tsx`.
  - Post-remediation: **72 tasks**, requirement citation coverage **27/27 FRs and 9/9 SCs**, 0 malformed tasks, 0 duplicate IDs.
