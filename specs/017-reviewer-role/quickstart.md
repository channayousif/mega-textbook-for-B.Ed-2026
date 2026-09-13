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

## What you must not need to do

Amend the constitution, edit a gate script, or register the reviewer anywhere machine-checked.
Art. VII already permits a qualified human executor and the gate already accepts human initials -
which is why this feature is a migration, a page and a record rather than a governance project.
