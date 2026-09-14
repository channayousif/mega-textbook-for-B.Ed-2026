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

**First, prepare the evidence bundle.** The browser cannot see the repository, so the digests of
what you reviewed have to come from the repository itself:

```bash
npm run review:evidence prepare <COURSE> <UNIT> <G3|G5> <output-dir>
# e.g. npm run review:evidence prepare EFMP-301 1 G5 /tmp/efmp-301-u1-g5
```

It writes `manifest.json`, which the review page takes as a file. Two things the walk of
2026-09-13 turned up, both of which will stop you dead otherwise:

- **It refuses to run over a dirty working tree**, by design: a manifest describes a commit, and a
  commit is the only state another host can reproduce.
- **`Scheme-and-Course-guides/` is a bound input for every review.** So a single uncommitted or
  untracked file anywhere in that directory blocks `prepare` for *every* unit in the repository,
  with a message that names the file but not the consequence. Commit it, ignore it, or move it
  aside first.

Then the reviewer opens `/app/admin/review-queue`, which lists units awaiting G3 or G5. For G5 the
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

A `revise` or an `escalate` also produces both files, but its tracker row carries `⏳` rather than
`✅`, so the gate stays closed. That is the whole of the escalation mechanism: the owner sees it at
the next gate run because the gate still fails.

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
