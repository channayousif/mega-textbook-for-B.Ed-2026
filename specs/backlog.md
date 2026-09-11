# Backlog

A parking lot for ideas and deferred follow-ups that are out of scope for their originating
feature but not yet worth a full spec (Constitution Art. VI.2). Captured here so they aren't
lost, without blocking delivery of the feature that surfaced them.

---

## From 003-classes-assignments (2026-07-19)

- ~~**Quiz item / answer-key authoring UI.**~~ **Delivered by Spec 011 (US6, 2026-09-10).**
  Migration `0040_quiz_authoring_rls` opens `quiz_items` + `answer_keys` INSERT/UPDATE/DELETE to
  verified teachers (same `is_verified_teacher()` gate that already guards reads); the UI is
  `src/pages/app/teacher/quiz-authoring.tsx` (verified-only) + `src/lib/quizAuthoring.ts`.
  `quiz_items_public` (correct-option hidden) is unchanged, so the student quiz-taking path is
  untouched.
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
- ~~**EFMP-302 Unit 1 Urdu re-translation + re-review (G4/G5).**~~ **Done 2026-09-09.** All 7
  UR files fully re-translated to the v3.0 per-topic layout + the Spec 012 figure retrofit;
  `translation_status: reviewed`; G4/G5 `✅` in `specs/content/efmp-302/tasks.md`; the `ur` route
  now serves the reviewed Urdu unit (no EN fallback).
- **EFMP-302 `course-review.mdx`.** Spec 008 seeded the `## Course review plan` in the
  content-spec (T028); the actual page is authored when EFMP-302 is fully restructured (FR-029).

## From 008-rich-unit-pedagogy (2026-08-30)

- **Figure image pass → delivered by Spec 009 (`009-figure-rendering`).** Spec 008 stopped at
  `Status: prompt-only` (a comment marker per topic + a manifest) and scoped image generation
  "Out of Scope". Spec 009 renders them: a `<Figure>` MDX component, hand-authored SVG for
  schematic figures + the Hugging Face MCP image tool for illustrations, a `prompt-only →
  generated → placed` manifest lifecycle, the widened `check:figures`, and the
  `.claude/skills/generate-figures/` skill — proven on EFMP-302 Unit 1's four figures.
- **Render figures for the rest of EFMP-302 (Units 2–6) and other courses** once they have a
  per-topic layout with markers. Per-unit, via `generate-figures` (Spec 009 FR-017, Out of Scope).
- **`fig-U1-2` raster re-do (optional).** EFMP-302 Unit 1's `fig-U1-2` shipped as a flat-vector
  SVG (`Kind: diagram`) per its own "clean flat vector" prompt; re-run via HF MCP as a
  `Kind: illustration` only if the owner wants a pictorial version.

## From 012-visual-density-standard (2026-09-09)

- **EFMP-301 Unit 1 golden re-proof to style-guide v3.3.** Constitution Art. VI.1 ("Standard
  versioning", re-run for the v2.8.0 / Article III.10 amendment) makes bringing the golden unit
  to the new visual-density bar the immediate-next content task after Spec 012's proving unit
  (EFMP-302 Unit 1, retrofitted 2026-09-09 to >= 2 figures/topic + a timeline). EFMP-301 Unit 1
  is still a ~490-word scaffold stub, so this is a full `author-unit` authoring pass, now against
  the v3.3 figure floor: >= 2 archetype-tagged figures per topic and >= 1
  concept-map/flowchart/timeline for the unit, each row in `figures/unit-01.md` carrying a `Kind`.
  Not a blocker on the v3.3 freeze; the freeze is proven by EFMP-302 Unit 1.
- **EFMP-302 Units 2-6: visual-density on re-draft.** When each unit moves to the per-topic
  layout (see the Spec 007 backlog item), it must meet Art. III.10 at G2 - `check:figures` now
  enforces it for every new-shape unit. No action while they stay in the legacy five-file layout
  (exempt).
