# Phase 0 Research: The reviewer role

The spec carried no NEEDS CLARIFICATION into planning - both open questions were resolved as
proposals before it merged. What follows records the technical decisions the plan rests on, each
checked against the repository rather than assumed.

## R1 - Capability, not role: constitutionally required rather than merely preferable

**Decision**: `reviewer` is a boolean column on `profiles`, admin-granted, following
`verified_teacher`.

**Rationale**: Art. V.3 enumerates the role set closed - *"The roles are `student`, `teacher`, and
`admin`"* - and names the extension point in the same clause: *"Access to restricted material is a
separate `verified_teacher` capability, granted only by an admin (default off), enforced at the
backend per Article V.2."* A fourth role value would contradict the enumeration. The spec argued
for a capability on design grounds; the constitution settles it.

Two supporting facts: the `user_role` enum is `('student','teacher','admin')` in
`0001_enums.sql`, and `guard_privileged_columns`'s OAuth carve-out is written around exactly those
three values, so widening the enum would require reworking the self-elevation guard for no gain.

**Alternatives considered**: a fourth enum value (contradicts V.3, disturbs the guard); a separate
`reviewers` table keyed by profile (an extra join and a second place to check suspension, with no
benefit over a column the existing `is_*` pattern already reads).

## R2 - `is_reviewer()` mirrors `is_admin()`, including the status check

**Decision**: `public.is_reviewer(uid uuid default auth.uid())`, `security definer`,
`set search_path = public, pg_temp`, checking capability **and** `status = 'active'` **and**
`deleted_at is null`.

**Rationale**: `0004_is_admin.sql` carries the reasoning in a comment worth preserving -
*"Suspended admins lose privilege immediately - status is checked here, so a suspension takes
effect without touching every dependent policy."* Putting the status test in the helper rather than
in each policy is what makes suspension a single point of control. Success criterion 2 is the
falsifiable form: a suspended reviewer must be denied **without any policy naming `status`**.

**Alternatives considered**: checking `status` in each policy (repeats the test, and a policy added
later that forgets it silently re-grants a suspended account).

## R3 - Certification evidence goes to Git, not Postgres

**Decision**: a certification is a file at
`specs/content/<course>/reviews/unit-NN/<stage>/<run-id>.json`, in the shape the agent path already
writes, plus a tracker row referencing it. Postgres holds only queue state.

**Rationale**: the agent path already established this shape, and `validateAgentTrackerRow`
resolves `review:<path>` references against it. Four consequences follow, set out in the spec's
proposal 1: one evidence format makes human certifications usable as G5 comparators; Art. V.1 keeps
Git authoritative for gate outcomes; append-only comes free from Git history; and the bottleneck
still lifts because committing generated rows is minutes against days of reviewing.

**Alternatives considered**: a `reviews` table the pipeline gate reads directly - rejected because
it makes Postgres authoritative for a gate outcome, and because human certifications would then
need an export step before they could serve as comparators, which is the export this design avoids
by writing the artefact directly.

**Correction, 2026-09-13 (`/sp.analyze` finding A2).** "One evidence format" was stated more
strongly than the contract delivered. `validateReport` also requires `skill_digest`, `model`,
`author_run_id`, `reviewer_run_id`, `evidence_manifest` and `commands`, and it types
`input_manifest` as the digest map rather than a path - so as first drafted, a human certification
shared a directory with an agent report and very little else. The claim is now narrowed and the
contract is brought up to it: every field that is not agent-specific carries the same name and the
same type, `input_manifest` carries the map, `commands` is present, and the four genuinely
agent-specific fields are enumerated as absent. What a comparator gets is a field-for-field diff,
not an artefact `validateReport` would accept - that function is agent-only by construction, since
it demands an `agent:` identity and a signature.

## R4 - Both UI patterns already exist in the codebase

**Decision**: reuse rather than invent. The capability toggle follows
`src/pages/app/admin/users.tsx`, which already toggles `verified_teacher` in a list. The
download-and-commit export follows `src/pages/app/admin/feedback-queue.tsx`, which already builds a
`Blob` and an object URL for the owner to save.

**Rationale**: ADR-0015's flow is not a new idea to implement; it is running code with a UI
precedent. The review surface is those two patterns plus a side-by-side EN/UR view for G5.

## R5 - No gate change, and no constitutional amendment

**Decision**: this feature touches no gate script and amends no article.

**Rationale**: `validateAgentTrackerRow` accepts any reviewer matching `/^[A-Z]{1,5}$/` as human
initials with no registry lookup, so a second human reviewer's tracker rows already validate.
Art. VII's Content gate row already reads *"qualified human or enabled independent agent executes
G3/G5"*. Both permissions predate this feature; it exercises them.

**Consequence for scope**: what remains is a migration, a helper, RLS, one page, an export, tests,
and one governance record. That is a materially smaller feature than the roadmap implied.

## R6 - Migration number

**Decision**: two files, `0043_reviewer_audit_change_enum.sql` and `0044_reviewer_capability.sql`.
The last applied is `0042_assignment_delete_no_recursion.sql`.

**Why two, revised 2026-09-13.** This originally read as one file. PostgreSQL permits
`alter type ... add value` inside a transaction but forbids **using** the new value in that same
transaction, and the Supabase CLI runs each migration file in one transaction. `0044` defines
`write_privilege_audit()` with a body that writes `'reviewer'` and is exercised by tests
immediately afterwards, so the enum value has to land and commit first. The split is a constraint
of the database, not a matter of taste, which is why it is recorded here rather than left to
whoever writes the migration to rediscover.
