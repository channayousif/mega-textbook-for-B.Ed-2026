# Backlog

A parking lot for ideas and deferred follow-ups that are out of scope for their originating
feature but not yet worth a full spec (Constitution Art. VI.2). Captured here so they aren't
lost, without blocking delivery of the feature that surfaced them.

---

## From 003-classes-assignments (2026-07-19)

- **Quiz item / answer-key authoring UI.** Who writes `quiz_items`/`answer_keys` rows, and how,
  is explicitly out of this feature's UI scope — content work under Constitution Art. II, seeded
  administratively for now (service role / Studio, not the app's client-facing RLS surface). A
  future spec may add a teacher/admin authoring UI if manual seeding becomes a bottleneck.
- **Rejoin-after-removal semantics.** Reactivating vs. duplicating an `enrollments` row on
  rejoin is an implementation choice documented in data-model.md, not a spec-clarified
  requirement — revisit if a future story needs to distinguish "rejoined" from "never left."
- **Grading-queue pagination / observability at scale.** Deferred as an implementation detail,
  consistent with Spec 002's own precedent: submission-queue pagination/search beyond SC-005's
  200-student target, and observability beyond what the RLS/e2e suites already assert.
