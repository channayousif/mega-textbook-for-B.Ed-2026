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
  mirroring `verified_teacher`. `guard_privileged_columns` **must be extended** to block
  self-grant: it enumerates protected columns by name (`role`, `verified_teacher`, `status`,
  `deleted_at`, `auth_user_id`), so a new column is unprotected until a branch names it, and a
  holder could otherwise grant it to themselves under the own-row update policy. The same is true
  of `write_privilege_audit`, which also enumerates by name. `privilege_audit`'s `audit_change` enum
  gains `'reviewer'` so every grant and revocation is recorded with actor, subject and timestamp.
- FR-002: `public.is_reviewer(uid)` mirrors `is_admin` - active, non-deleted, capability held. It
  is the single point at which suspension is checked, so a policy written later cannot forget it.
  The review surface reads it over RPC rather than trusting the cached profile column, so a
  suspended holder is refused by the database rather than by the browser. See **Enforcement
  posture** below for what this does and does not control.
- FR-003: A reviewer may read any unit's content and its review queue. Both are already public
  static files, so this half of the requirement needs no code and no policy - it is stated to make
  clear that reviewing requires no privileged read. A reviewer may **not** grant capabilities,
  change roles, edit content, or alter their own certifications; that half is what needs proving,
  and it is proven structurally, by showing the capability adds no write grant anywhere.
- FR-004: An admin-panel review surface at `/app/admin/review-queue`: units awaiting G3 or G5, the
  English source beside the Urdu mirror for G5, and three actions - **certify**, **request
  revision**, **escalate**. Each action sets the certification's `disposition` to `pass`, `revise`
  or `escalate` respectively, and **all three produce the same two artefacts** - there is no
  separate notification channel and no escalation inbox. An escalation reaches the curriculum owner
  the way everything else in this feature does: as a committed certification whose disposition is
  `escalate` and a tracker row that consequently leaves the gate open, which the owner sees at the
  next gate run. "Routes to the owner" means exactly that and nothing more; naming a mechanism the
  feature does not build would be the worse error. The owner retains policy and escalation
  ownership under Art. VII §1.
- FR-005: A certification records reviewer identity, stage, course, unit, the exact input digests
  it was made against, the deterministic checks that were run, per-criterion findings, disposition
  and timestamps - in the shape the agent path already writes to
  `specs/content/<course>/reviews/unit-NN/<stage>/`. `input_manifest` carries the **digest map
  itself**, not a path to it, exactly as an agent report does: a path cannot be compared against a
  freshly computed manifest, so a path would make Art. VII §4's freshness rule uncheckable and
  would make the two formats undiffable. The reviewer already holds that map - `review:evidence
  prepare` writes it to `manifest.json` - so the page takes the file rather than recomputing digests
  in a browser that cannot see the bytes. `commands` records the deterministic gate runs and their
  exit codes, since Art. VII §3 counts those among the evidence. Agent-specific fields
  (`skill_digest`, `model`, `author_run_id`, `reviewer_run_id`) are deliberately absent and
  enumerated as absent in the contract, so a comparator can tell an omission from an oversight. A **G5 certification
  additionally carries `g3_report`**, the path of the accepted G3 certification for the same
  English version, and cannot be produced without one: Art. VII §4 requires G5 to bind to accepted
  G3 evidence, and the agent path already enforces this (`review-evidence.mjs` refuses a G5 report
  with no `g3_report`). The human path is not exempt from a freshness rule merely because its
  reviewer is a person. It is **append-only**,
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
  automatically, and this is **asserted by a test** rather than promised in on-screen text: the
  certify action issues no database mutation and writes no file. A certification is evidence a human produced; applying it stays an explicit act,
  through the ordinary PR flow (ADR-0015's accepted manual step).
- FR-010: Qualification is recorded in `specs/reviewers/human-reviewers.md`, owner-maintained. The
  pipeline gate already accepts human initials with no registry lookup, so this feature adds **no
  gate change** - only the record of who was qualified, for what scope, on what evidence. See
  proposal 2.
- FR-011: The Teacher Guide gains a page describing the `reviewer` capability - what it unlocks,
  how certifying works, and what it does not grant - in both locales, mirroring
  `guides/teacher-guide/verified-teacher-material.mdx`. A reviewer is typically already a teacher,
  so this is a teacher-facing capability, and Art. X.2 requires the guide updated in the same
  feature branch. Art. VII's Docs gate names the feature author as its owner.

## Enforcement posture

`reviewer` is an **authorization record, not an enforcement point**, and the spec says so rather
than implying otherwise.

A certification is a file the browser generates and a person commits. There is no server-side
certification action, so there is no policy for RLS to deny. What the capability actually provides
is: a recorded, admin-only, audited statement of who was trusted to certify (FR-001), a
server-checked gate on reaching the review surface at all (FR-002, over RPC so suspension is
honoured by the database), and a name in a tracker row that a reader can trace back to
`specs/reviewers/human-reviewers.md` (FR-006, FR-010).

What actually stops an unauthorized certification is the pull request. `check:pipeline-gate`
accepts any reviewer matching `/^[A-Z]{1,5}$/` with no registry lookup, deliberately (FR-010), so a
certification's authority rests on the commit being reviewed and the initials being traceable, not
on a database permission. This is the same control that has governed every review in the repository
to date; the capability makes the trust explicit and revocable rather than tacit.

Art. V.2 is not engaged: it protects answer keys, grades and submissions, and a certification is
none of those. Art. IX.2 is not engaged either, because certifying is not an authenticated database
action. Recording this plainly is what keeps a later reader from assuming an RLS guarantee that was
never built.

*Deliberately not chosen:* persisting the certification draft under an `is_reviewer()` policy, which
would make certifying a real database action but would put a gate outcome in Postgres against
Art. V.1; and having the pipeline gate resolve initials against `human-reviewers.md`, which would
move enforcement to CI where it is genuinely checkable, but is a gate change FR-010 excludes. The
second is the stronger candidate if this posture ever proves insufficient.

## Success criteria

1. An admin can grant and revoke `reviewer`; a non-admin cannot, including on their own profile,
   and both directions appear in `privilege_audit`.
2. A suspended reviewer's `is_reviewer()` returns false and the review surface refuses to load,
   without any dependent code naming `status` explicitly - `is_reviewer` carries it, as `is_admin`
   does. The check is the database's answer over RPC, not the browser's reading of a cached column.
3. A reviewer can certify a G5 for a unit whose G3 is accepted, and cannot for one whose G3 is not:
   the queue does not offer G5 on a unit with an open G3, and the certification builder refuses a
   G5 whose `g3_report` is missing, unreadable, or not a `pass`.
4. A superseded certification is still readable after a newer one exists for the same unit and
   stage.
5. RLS tests cover the three assertions that have a database surface: reviewer cannot grant a
   capability, suspended reviewer denied, and holding `reviewer` grants no new write anywhere. The
   other two originally listed here - "reviewer reads queue" and "reviewer cannot alter another
   reviewer's certification" - have no database surface, because the queue is derived from a
   build-time report and certifications are Git artefacts; they are covered by that structural
   assertion and by Git history's append-only property instead.

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

**What it does not do.** It does not lift the ceiling. The stated problem is that every tracker row
carries the same initials and exactly one person can close a G5; granting that person the
capability leaves both facts intact. Phase 6 proves the path works and produces comparators in the
new format; only a second qualified person produces throughput. The exit criterion for this feature
is therefore not "the capability is held" but **one external reviewer qualified and holding it**,
and that should be tracked as the next piece of work rather than counted as delivered here.

There is also an independence question worth naming rather than leaving implicit. The owner
authored or translated nearly all the content they would certify, and Art. III.2 says a translation
cannot approve itself. Art. VII §2's independence requirement sits under the ADR-0019 heading and
so governs the agent path, not this one, and the owner certifying their own units is the status quo
this feature exists to end rather than something it introduces. It is accepted deliberately for the
proving run, and it is one more reason the owner entry is a rehearsal rather than the destination.
