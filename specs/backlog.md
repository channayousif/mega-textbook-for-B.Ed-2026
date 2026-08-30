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

- **EFMP-301 Unit 1 v3.0 per-topic re-proof.** *(Was: "v2.0 depth-standard re-proof" — superseded
  by Spec 008; the golden unit skips the flat v2.0 re-draft and goes straight to the per-topic
  layout, owner-acknowledged.)* Constitution Art. VI.1 ("Standard versioning", re-run in v2.6.0)
  makes this the immediate-next content task after Spec 008's proving unit (EFMP-302 Unit 1,
  restructured 2026-08-30). Not a blocker on the v3.0 freeze; tracked in
  `specs/content/efmp-301/content-spec.md` (top note). Needs: add a `### Sub-topic checklist`
  (with a `Topic` column) + `### Topic list` + re-baselined `**Depth budget**`; restructure to
  `index.mdx` + `topic-NN.mdx` + `unit-assessment.mdx`; emit `coverage/unit-01.md` (v2) +
  `sources/unit-01.md` + `figures/unit-01.md`; then create the `G1`–`G7` tracker rows.
- **EFMP-302 Units 2–6 re-draft.** Same pipeline, per unit, tracked through
  `specs/content/efmp-302/tasks.md` — subsequent execution, not a Spec 007/008 condition (FR-016 /
  FR-029). Whether each moves to the per-topic layout is decided at G1 per unit.
- **EFMP-302 Unit 1 Urdu re-translation + re-review (G4/G5).** The Spec 008 EN re-restructure
  reset `translation_status` to `draft` and replaced the UR file set with per-topic skeleton
  stubs; the `ur` route falls back to EN behind the Spec 001 FR-003 banner until re-reviewed.
- **EFMP-302 `course-review.mdx`.** Spec 008 seeded the `## Course review plan` in the
  content-spec (T028); the actual page is authored when EFMP-302 is fully restructured (FR-029).
