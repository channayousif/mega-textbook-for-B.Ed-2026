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

## From 007-content-depth-standard (2026-08-27)

- **EFMP-301 Unit 1 v2.0 depth-standard re-proof.** Constitution Art. VI.1 (v2.5.0, "Standard
  versioning") requires the golden unit to be brought to the new standard version as the
  immediate-next content task after the proving unit (EFMP-302 Unit 1, done in Spec 007). Not
  a blocker on the v2.0 freeze; tracked in `specs/content/efmp-301/content-spec.md` (top
  note). Needs: add the `### Sub-topic checklist` + `**Depth budget**` to its content-spec
  subsection, re-draft the five EN files to the `## Unit depth standard`, emit
  `coverage/unit-01.md` + `sources/unit-01.md`, then create the `G1`–`G7` tracker rows.
- **EFMP-302 Units 2–6 v2.0 re-draft.** Same pipeline, per unit, tracked through
  `specs/content/efmp-302/tasks.md` — subsequent execution, not a Spec 007 condition (FR-016).
- **EFMP-302 Unit 1 Urdu re-translation + re-review (G4/G5).** The Spec 007 EN re-draft reset
  `translation_status` to `draft` and re-opened G4/G5; the `ur` route falls back to EN behind
  the Spec 001 FR-003 banner until re-reviewed.
