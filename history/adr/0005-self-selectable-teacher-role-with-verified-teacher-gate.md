# ADR-0005: Self-Selectable Teacher Role with Verified-Teacher Gate

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-07-17
- **Feature:** 002-authentication
- **Context:** Spec 002 (Authentication & Roles) originally required a `student → request teacher → pending → admin approves` workflow, mirroring the source SDD, ROADMAP Decision #4, and Constitution Art. V.3. The sole stated rationale for that gate was integrity: *"teacher self-declaration without approval is forbidden — otherwise any student could see answer keys."* During the `/sp.clarify` session on 2026-07-17 the curriculum owner asked to remove the approval workflow so that a capable student can lead a peer study group without waiting on an admin ("a student may be allowed to teach a group of other students and can benefit"). This creates a direct tension with a *locked* governance rule whose only purpose was to keep answer keys away from students. The decision below reconciles the pedagogical goal with the integrity constraint, and therefore amends the constitution/roadmap — making it architecturally significant and cross-cutting (authorization model, data model, RLS/authorization tests, and every downstream feature that reads roles: Specs 003–005).

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?  → YES (authorization model + amends constitution)
     2) Alternatives: Multiple viable options considered with tradeoffs?    → YES (see Alternatives)
     3) Scope: Cross-cutting concern (not an isolated detail)?             → YES (roles consumed by Specs 003–005; RLS design) -->

## Decision

Decouple the **teacher role** (a self-service identity choice) from **access to restricted material** (an admin-granted capability). Concretely:

- **Role selection is self-service.** At sign-up a user self-selects `student` (default) or `teacher`; a user may later switch their own role between these two. The `admin` role is never self-selectable.
- **The teacher role grants only peer-teaching capabilities**: create classes, assign work, give feedback, and view the teacher's *own* students' submissions. No approval workflow, no pending state.
- **Answer keys and other restricted teaching material are gated behind a separate `verified_teacher` capability** (a boolean flag on the profile), which **only an administrator can grant or revoke**. Self-selecting the teacher role never confers it; it defaults to off.
- **Administrators manage roles directly** — an admin can edit any user's role and grant/remove `verified_teacher`. There is no request/approval queue.
- **Server-side authoritative fields**: `role` may be set by the account holder only to `student`/`teacher`; `admin` role and `verified_teacher` are settable only by the system (seed) or an existing administrator. Enforcement is at the data/authorization layer (Row-Level Security), not the client.

This replaces the request→pending→approve model (former FR-005–FR-008, "Teacher request" entity, `teacher_status` field) with role self-selection + the `verified_teacher` capability.

## Consequences

### Positive

- **Meets the pedagogical goal**: a capable student can start teaching a peer group immediately, with zero admin latency.
- **Preserves content integrity**: answer keys remain unreachable without an explicit admin grant — the Constitution's answer-key protection survives the amendment intact (FR-016/FR-017/FR-005a, SC-004).
- **Simpler state machine**: no `pending` state, no approval queue, no reject/re-apply flow to build, test, or notify on. Fewer moving parts in the auth surface.
- **Least-privilege by construction**: the risky capability (restricted material) is off by default and separately auditable, independent of how many self-declared teachers exist.
- **Cleaner authorization tests**: two orthogonal checks — "can this user teach peers?" (role) and "can this user see answer keys?" (capability) — instead of one overloaded `teacher_status`.

### Negative

- **Amends locked governance**: reverses ROADMAP Decision #4 and Constitution Art. V.3, which "require a spec amendment." A constitution update and ROADMAP edit must follow, or the documents drift from the implementation.
- **Self-declared teacher capabilities are ungated**: any user can create classes/assignments as a "teacher." A student could self-declare to explore teacher UI or create spam classes. Mitigation lives in later specs (class ownership, moderation, admin demotion), not here.
- **Two concepts to explain**: users/admins must understand that "teacher" ≠ "can see answer keys." Requires clear UI labelling to avoid confusion.
- **Verified status is a new admin workflow**: admins still need a screen to grant/revoke `verified_teacher`, so admin tooling is not eliminated, only reshaped away from an approval queue.

## Alternatives Considered

- **A. Keep the original admin-approval gate (request → pending → approve).** *Rejected*: directly blocks the owner's peer-teaching goal and imposes admin latency on every teacher; the ceremony the owner explicitly asked to remove.
- **B. Fully self-declared teacher with no gate at all (self-declaration unlocks everything, including answer keys).** *Rejected*: removes answer-key protection entirely — any student self-selects teacher and reads the keys, violating the Constitution's integrity guarantee and the whole reason the gate existed. Highest integrity risk.
- **C. Two-tier role enumeration (`student`, `peer_teacher`, `verified_teacher`, `admin`) as a single ordered ladder.** *Rejected*: conflates "teaching peers" with "trusted with keys" on one axis, making it impossible to have a verified teacher who is also just teaching a peer group, and complicating role edits. The chosen design keeps role and capability as **orthogonal** fields, which models reality better and simplifies RLS.
- **D. Account-level admin verification of identity before any teacher features.** *Rejected*: same latency problem as A, heavier (identity proofing) than the peer-teaching use case warrants.

## References

- Feature Spec: [specs/002-authentication/spec.md](../../specs/002-authentication/spec.md) — see `## Clarifications → Session 2026-07-17`, User Story 3, FR-003/005/005a/006/007/008/010/015–017, Key Entities (Profile, Verified-teacher capability), SC-002/004/005.
- Implementation Plan: not yet created (`/sp.plan` pending) — this ADR is spec/clarification-derived and should be linked from plan.md once it exists.
- Related ADRs: [ADR-0002](0002-content-platform-architecture-and-hosting.md) (platform/hosting; Supabase backend context), [ADR-0004](0004-content-integrity-build-gate-and-data-driven-catalog.md) (content integrity — answer-key protection lineage).
- Evaluator Evidence: [history/prompts/002-authentication/0003-clarify-role-model-self-select-teacher.spec.prompt.md](../prompts/002-authentication/0003-clarify-role-model-self-select-teacher.spec.prompt.md)
- Governance: Constitution **v2.0.0** (Art. V.3 renamed "Roles and restricted-material access" + Art. IX.3) and ROADMAP Decision #4 amended 2026-07-17 to match this ADR. Status moved Proposed → Accepted on that basis.
