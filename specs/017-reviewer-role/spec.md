# Feature 017: The reviewer role

**Status**: Scoped 2026-09-13, awaiting owner approval.
**Decision**: Roadmap "The bilingual review pipeline (two stages)", owner 2026-09-12, with the
certification boundary confirmed 2026-09-13: the agent prepares and is advisory, the human
`reviewer` certifies.
**Blocks**: the five-unit measurement, which must run through this pipeline or it measures the old
single-reviewer bottleneck; and therefore the Phase 5 target that every content plan depends on.

## Why

Every tracker row in the repository carries the same initials. `EFMP-301` Unit 1's G5 has been open
since 2026-09-11 because exactly one person can close it. The roadmap identified this on 17 July
2026 and it has been the production ceiling ever since.

v4.0 has landed and the standard is frozen, so units can now be authored at a fixed target. They
will queue at G4 unless someone other than the owner can certify G5.

## Two corrections to what the roadmap records

**1. No constitutional amendment is needed.** The roadmap states this feature requires "an
amendment to Constitution Art. VII, which today reserves G3/G5 to the curriculum owner". That was
true before v3.0.0. It is not true now: the Content gate row already reads *"Curriculum owner
accountable; **qualified human** or enabled independent agent executes G3/G5"*, and Art. VII §1
assigns the owner review **policy, qualification and escalations** rather than execution. ADR-0019
opened the human path at the same time it opened the agent path. This feature exercises an
existing permission rather than creating one.

**2. `reviewer` is a capability, not a role.** The `user_role` enum is
`('student', 'teacher', 'admin')` and `verified_teacher` is a separate boolean column, because
ADR-0005 split self-selectable roles from admin-granted capabilities. A reviewer is typically
already a teacher or an admin; reviewing is something they are trusted to do, not something they
are. Adding a fourth enum value would also disturb `guard_privileged_columns`, whose OAuth
carve-out is written around the three-value enum.

## Scope

Grant, audit and exercise a `reviewer` capability, so a qualified person other than the curriculum
owner can certify G3 and G5, with an audit trail proportionate to the first delegation of a content
gate.

## Requirements

- FR-001: `profiles` gains `reviewer boolean not null default false`, granted only by an admin,
  mirroring `verified_teacher`. `guard_privileged_columns` blocks self-grant, and
  `privilege_audit`'s `audit_change` enum gains `'reviewer'` so every grant and revocation is
  recorded with actor, subject and timestamp.
- FR-002: `public.is_reviewer(uid)` mirrors `is_admin` - active, non-deleted, capability held. A
  suspended reviewer loses certification rights immediately without touching dependent policies.
- FR-003: A reviewer may read any unit's content and its review queue. A reviewer may **not** grant
  capabilities, change roles, edit content, or alter their own certifications.
- FR-004: An admin-panel review surface at `/app/admin/review-queue`: units awaiting G3 or G5, the
  English source beside the Urdu mirror for G5, and three actions - **certify**, **request
  revision**, **escalate**. Escalation routes to the curriculum owner, who retains policy and
  escalation ownership under Art. VII §1.
- FR-005: A certification records reviewer identity, stage, course, unit, the exact input digests
  it was made against, disposition and timestamp. It is **append-only**: a superseded certification
  is retained and linked, never overwritten. This is the first time a person other than the owner
  holds a content gate, so the trail is the control.
- FR-006: Tracker rows record the **certifying reviewer's initials**, not the owner's. Existing
  rows are not relabelled - Art. VII §3 forbids rewriting historical reviews.
- FR-007: An agent review remains **advisory** and cannot satisfy FR-005. Agent certification stays
  gated on the ADR-0019 registry, which is empty, and on a comparator base that does not yet exist
  for Urdu. This feature is what grows that base: every unit a human reviewer certifies is a
  comparator.
- FR-008: The `reviewer` capability inherits the same `content_feedback` insert permission every
  other authenticated role has (owner decision, 2026-09-13: feedback is authenticated, all roles).
- FR-009: Nothing in this feature changes a `translation_status`, a gate outcome or a tracker row
  automatically. A certification is evidence a human produced; applying it stays an explicit act.

## Success criteria

1. An admin can grant and revoke `reviewer`; a non-admin cannot, including on their own profile,
   and both directions appear in `privilege_audit`.
2. A suspended reviewer's certification attempt fails, without any policy naming `status`
   explicitly - `is_reviewer` carries it, as `is_admin` does.
3. A reviewer can certify a G5 for a unit whose G3 is accepted, and cannot for one whose G3 is not.
4. A superseded certification is still readable after a newer one exists for the same unit and
   stage.
5. RLS tests cover: reviewer reads queue, reviewer cannot grant capability, reviewer cannot edit
   content, reviewer cannot alter another reviewer's certification, suspended reviewer denied.

## Out of scope

No agent certification - FR-007. No change to the authoring standard, which is frozen. No automatic
tracker writes; see the open question. No second *authoring* role: this delegates review only.

## Open questions

1. **[open] How does a certification reach the tracker?** The tracker is
   `specs/content/<course>/tasks.md`, a Git file, because Art. V.1 keeps content in version
   control. A web UI cannot commit to Git. ADR-0015 met the same constraint for catalogue edits
   with a **download-and-commit flow** rather than a live write, and that precedent probably
   applies here: the reviewer certifies in the app, the app produces the tracker row, and a person
   with commit rights applies it. The alternative - a `reviews` table that the pipeline gate reads
   directly - would make Postgres authoritative for a gate outcome, which cuts against Art. V.1.
2. **[open] Who is the first reviewer, and what qualifies them?** Art. VII §1 makes qualification
   the owner's to define, and unlike the agent path there is no registry contract saying what
   evidence is required. A GCET faculty member was raised in the roadmap. Without a named person
   this feature ships a capability nobody holds, which relieves no bottleneck.
