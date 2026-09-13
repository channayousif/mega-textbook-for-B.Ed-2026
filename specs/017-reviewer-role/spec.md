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
  it was made against, per-criterion findings, disposition and timestamps - in the shape the agent
  path already writes to `specs/content/<course>/reviews/unit-NN/<stage>/`. It is **append-only**,
  which Git history gives for free. This is the first time a person other than the owner holds a
  content gate, so the trail is the control. See proposal 1.
- FR-006: Tracker rows record the **certifying reviewer's initials**, not the owner's. Existing
  rows are not relabelled - Art. VII §3 forbids rewriting historical reviews.
- FR-007: An agent review remains **advisory** and cannot satisfy FR-005. Agent certification stays
  gated on the ADR-0019 registry, which is empty, and on a comparator base that does not yet exist
  for Urdu. This feature is what grows that base: every unit a human reviewer certifies is a
  comparator.
- FR-008: The `reviewer` capability inherits the same `content_feedback` insert permission every
  other authenticated role has (owner decision, 2026-09-13: feedback is authenticated, all roles).
- FR-009: Nothing in this feature changes a `translation_status`, a gate outcome or a tracker row
  automatically. A certification is evidence a human produced; applying it stays an explicit act,
  through the ordinary PR flow (ADR-0015's accepted manual step).
- FR-010: Qualification is recorded in `specs/reviewers/human-reviewers.md`, owner-maintained. The
  pipeline gate already accepts human initials with no registry lookup, so this feature adds **no
  gate change** - only the record of who was qualified, for what scope, on what evidence. See
  proposal 2.

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
tracker writes - see proposal 1, and the CI-applies-the-export idea is deliberately deferred. No second *authoring* role: this delegates review only.

## Proposed resolutions

Both proposals, awaiting owner confirmation. Each turned out to need **no new mechanism** - the
repository already contains the answer, in the agent path and in ADR-0015.

### 1. A certification reaches the tracker the way the agent path already does

The agent path does not put evidence in Postgres. It writes a report to
`specs/content/<course>/reviews/unit-NN/<stage>/<run-id>.json` - **in Git** - and the tracker row
references it as `review:<path>`. `validateAgentTrackerRow` then resolves that reference.

**Proposal: a human certification produces the same two artefacts, in the same places.** The
reviewer certifies in the browser; the app emits a certification record in the agent report's shape
(reviewer identity, stage, course, unit, input digests, per-criterion findings, disposition,
timestamps) plus the tracker row line that references it. Both are downloaded and applied through
the ordinary PR flow, which is exactly ADR-0015's accepted manual step.

Why this rather than a `reviews` table:

- **One evidence format for both paths.** A human certification and an agent report become
  comparable artefacts, which is precisely what the G5 comparator base needs to consist of. A
  Postgres table would make human certifications unusable as comparators without an export step.
- **Art. V.1 is not bent.** Git stays authoritative for gate outcomes; Postgres never becomes the
  source of truth for a gate.
- **FR-005's append-only property comes free.** Git history is append-only by construction, and a
  superseded certification is a prior commit rather than a soft-deleted row.
- **The bottleneck still lifts.** The owner remains in the loop for a commit, but committing N
  generated rows takes minutes where reviewing N units takes days. That is the whole gain.

Postgres holds only queue state - which units are awaiting review, and who has one open - which is
ephemeral and safe to lose.

*Later, optionally:* a CI job could apply an approved export automatically, removing the manual
commit. Deliberately not in this feature, because the manual step is what ADR-0015 accepted and
automating a content-gate write deserves its own decision.

### 2. Qualification is a governance record, because the gate already permits it

`validateAgentTrackerRow` accepts any reviewer matching `/^[A-Z]{1,5}$/` as human initials, with no
registry lookup. The signed registry exists for **agents**, whose identity is forgeable in a way a
named person's is not. So a second human reviewer needs **no code change to the gate at all** -
only a record of who was qualified, for what scope, on what evidence.

**Proposal: `specs/reviewers/human-reviewers.md`**, owner-maintained, one entry per reviewer with
initials, scope (courses and stages), qualification evidence, date and status. Plain Markdown in
Git rather than a signed JSON registry, because the Git history is the audit trail and the
signature the agent path needs is answering a threat that a named person does not pose.

**Proposed qualification, mirroring ADR-0019 at human scale:** the candidate reviews two or three
units the owner has already reviewed, blind to the owner's findings. Compare on agreement over
blocking findings and, decisively, on **false passes - a candidate who passes a unit the owner
failed is not yet qualified**. Record the comparison in the entry. This reuses ADR-0019's shape
(held-out cases, clean and defective, zero false passes) without inventing a second standard.

**Proposal for who goes first: the curriculum owner.** Grant the capability to the owner before
anyone external holds it. Operationally it changes nothing - the same person certifies the same
units - but it exercises the whole path end to end, proves the export and commit flow on real
units, and grows the G5 comparator base under the new format. The first external reviewer then
joins a path that is known to work, rather than discovering its faults.

That also answers the objection in this spec's own **Why**: without a named person the feature
ships a capability nobody holds. Granting it to the owner means it is held from day one, and the
external recruitment stops being a blocker on shipping.
