# Plan: Independent content review

Use repository-local Claude agents backed by a shared review-unit skill, with distinct
English and Urdu references. A host may invoke the same skill in a fresh Codex session.
No model API key or new dependency is needed to run an interactive reviewer.

Add a Node built-in-only evidence library, preparation/validation CLI and node:test fixtures.
Integrate report acceptance into the existing pipeline tracker check. Keep the existing
tracker shape; Suggestion carries a review:<path> reference. Persist append-only reports.

Trust root: CONTENT_REVIEW_PUBLIC_KEY is injected by the administrator into CI, outside the
candidate tree. CONTENT_REVIEW_PRIVATE_KEY is only available to the trusted approving host,
never to untrusted model execution or PR checks. Detached signatures cover exact bytes;
the signed registry records qualified model/configuration, scope and fixture evidence.
Initial registry has no qualified entries. This is an honest activation state, not an error.

## Constitution check

- III.2/VII: delegated G3/G5 requires independent evidence and qualification.
- II: reviewer cannot approve ambiguous curriculum or new terminology.
- IV: this approved spec and plan precede implementation.
- V: no database, client bundle, new paid service or learner data involved.
- VI: no style-guide bump or golden-unit scope change.
- X: README and authoring handoffs updated in the same branch.

## Validation

Behavioral tests use temporary keys only. Seeded fixtures test evidence enforcement, not
academic accuracy. An independent skill exercise tests report behavior with incomplete and
contradictory input. Live G3/G5 qualification and protected signer provisioning are reported
as pending if unavailable. Full repository CI runs on the PR before the authorized merge.
