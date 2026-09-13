# Quickstart: granting and exercising the reviewer capability

## 1. Qualify the reviewer

Have the candidate review two or three units the owner has already reviewed, **blind** to the
owner's findings. Compare on agreement over blocking findings, and decisively on false passes: a
candidate who passes a unit the owner failed is not yet qualified.

Record the result in `specs/reviewers/human-reviewers.md` - initials, scope, evidence, date,
status - and commit it.

## 2. Grant the capability

As an admin, in `/app/admin/users`, toggle `reviewer` beside `verified_teacher`. The grant writes a
`privilege_audit` row naming you as actor. Revoking writes another.

Nobody can grant it to themselves: `guard_privileged_columns` rejects the write.

## 3. Certify

The reviewer opens `/app/admin/review-queue`, which lists units awaiting G3 or G5. For G5 the
English source sits beside the Urdu mirror. Three actions: **certify**, **request revision**,
**escalate**. Escalation routes to the curriculum owner, who keeps policy and escalation ownership
under Art. VII §1.

A unit whose G3 is still open offers G3 only. G5 binds to accepted G3 evidence for the same English
version (Art. VII §4), so a G5 certification carries the path of that G3 certification in its
`g3_report` field and cannot be produced without one. If the queue will not offer you a G5, its G3
is what is missing.

Certifying produces two downloads: the certification artefact and the tracker row line.

## 4. Apply it

Commit both through the ordinary PR flow. The certification lands at
`specs/content/<course>/reviews/unit-NN/<stage>/<run-id>.json`; the tracker row goes into
`specs/content/<course>/tasks.md`.

Then run the gates:

```bash
npm run check:content
```

`check:pipeline-gate` reads the tracker row and, for a human reviewer, needs only valid initials.

## What the capability does and does not control

`reviewer` is an authorization record, not an enforcement point. There is no server-side
certification action, so nothing in the database refuses a certification: what the capability gives
you is an audited, admin-only, revocable statement that you were trusted to certify, plus a
server-checked gate on reaching the queue at all. What actually stops an unauthorized certification
is the pull request, since `check:pipeline-gate` accepts any valid-looking initials by design. See
spec.md's **Enforcement posture**.

The practical consequence: a suspended reviewer cannot open the queue, but a certification already
downloaded is just a file. Revoking the capability is a statement about future work, not a recall.

## What you must not need to do

Amend the constitution, edit a gate script, or register the reviewer anywhere machine-checked.
Art. VII already permits a qualified human executor and the gate already accepts human initials -
which is why this feature is a migration, a page and a record rather than a governance project.
