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

## From 013-authoring-system-v2 (2026-09-11)

- **Title and H1 rewrite for search intent.** Spec 013 Phase G, owner-approved but not started.
  Page titles lead with a positional label ("Topic 1.1 - ...") and carry no course code or
  discipline terms. Verified safe: the parity gate compares heading LEVELS only
  (`validate-content.mjs:61-69`) and URLs come from file paths, so retitling changes no URL and
  breaks no gate. Do it course by course, running `validate:content` after each.
- **`description` for the `guides/` tree.** The Student and Teacher Guides are a separate docs
  plugin (~12 pages per locale) and were left out of the Spec 013 description pass; the
  validator requires one only for the textbook tree.
- **Alt-vs-manifest consistency check.** `placement.md` documented this check for a long time
  and it never existed. Add it report-only first, reconcile whitespace, then make it blocking.
- **`fig-U1-2` accent pass.** Left deliberately neutral: its two classroom panels share one CSS
  class, so the contrast is positional, and colouring "rows" against "groups" would editorialise
  a judgement the figure does not make. Revisit only if the owner wants that contrast stated.



## Deferred from Feature 016 (style guide v4.0), 2026-09-13

The standard is frozen from v4.0 until 50 units exist. These are the improvements that would
otherwise have been a tenth revision; apply them in one batch when the freeze lifts.

- **Widen `contracts/unit-frontmatter.schema.json`'s `course_code` and `clo_refs` patterns.**
  Feature 016 FR-008, deferred by owner decision. Both are `^[A-Z]{2,4}-[0-9]{3}(--)?$`-shaped,
  which correctly validates every code in the B.Ed scheme and the licence track. The reason to
  widen is SSC/HSC fit, but that scheme is not in the repository, so widening now would trade real
  typo-catching for a guess at a format nobody has seen. Do it when an SSC/HSC scheme lands, which
  is also when the cheapest-moment argument actually applies.
- **Cross-unit and cross-course prerequisite edges in the concept graph.** v4.0 restricts
  `Prerequisites` to concepts within the same unit, deliberately, so the freeze could begin. The
  sequencing value of the graph grows considerably once edges cross units.
- **`EFMP-301`'s content-spec has no `## Unit 1` heading**, so `unitSectionLines` returns null and
  the **golden unit is silently skipped by `check:depth-gate`**. Found while building the concept
  gate, which now handles both spec shapes by falling back to document level. Adding the heading
  would bring the golden unit under the depth gate for the first time - worth doing, but it may
  surface depth findings that have been hidden since Spec 007, so it is a task with unknown size
  rather than a one-line fix.

## Deferred from Feature 017 (the reviewer role), 2026-09-13

- **`validateAgentTrackerRow` returns early for human initials**, so a human row's
  `review:<path>` reference is never resolved: a dangling certification path, or one pointing at a
  file whose `disposition` is not `pass`, passes `check:pipeline-gate` unnoticed. Out of scope in
  Feature 017 because FR-010 commits to no gate change, and the control there is the pull request.
  Worth closing once several human certifications exist, and it is also the natural place to
  enforce the G5-to-G3 binding and the `input_manifest` freshness check **deterministically** rather
  than at build time in a browser the reviewer controls.
- **CI applies an approved export.** Feature 017 parks this deliberately: the manual commit is what
  ADR-0015 accepted, and automating a content-gate write deserves its own decision rather than
  arriving as a convenience.
- **Qualify and grant one external reviewer.** This is the work that actually lifts the ceiling.
  Feature 017 grants the capability to the curriculum owner, which proves the path end to end and
  produces comparators in the new format, but leaves both facts in the spec's own *Why* intact:
  every tracker row still carries the same initials, and one person still closes every G5. The
  feature is not finished in the sense that matters until a second entry appears in
  `specs/reviewers/human-reviewers.md`.

## Deferred from the EFMP-301 Unit 1 G5 review, 2026-09-14

- **Wide figures are illegible on a phone (F-11).** At 360px, `fig-U1-7` (880px wide) lays out at
  328 CSS px, putting four columns of Nastaliq at roughly 4-5 CSS px; same for `fig-U1-3`,
  `fig-U1-8`, `fig-U1-9`. **This affects English equally**, so it is a responsive-figure problem
  rather than a translation one, and Art. V.5 makes it more than cosmetic: the site MUST be usable
  on low-end mobile, and text at 4 px is not. Likely fixes: a horizontal-scroll wrapper for wide
  schematics, or a narrow-viewport stacked variant. Needs a design decision before a gate.
- **Theme UI strings and course names are still untranslated (F-12, partial).** The category
  labels are now translated in `i18n/ur/docusaurus-plugin-content-docs*/current.json`, but
  `code.json` (92 theme strings), the navbar and the footer were deliberately not generated:
  committing 96 English values as "translations" would imply work that had not been done. The four
  `coming_soon` course names and `EED-313 · Classroom Management` also stay in English, because no
  approved Urdu exists for them and Art. II.3 forbids inventing one.
- **The prose noun uses of `جانچ` (F-04, remainder).** The concept/figure/bank divergence is fixed.
  A handful of prose sites still use `جانچ` as the noun for the assessment concept where the bank
  says `تشخیص`, e.g. "یونٹ کی سطح کی جانچ". The other 40 occurrences are the ordinary verb
  ("اپنی سمجھ جانچیں") and must not change, so this needs reading in context rather than a
  replace - a task for the owner's register pass.

## Deferred from the EFMP-302 Units 4-6 G3 reviews, 2026-09-19

- **Overflowing figures have keyboard access but no at-rest affordance.** Three reviewers raised
  the ERQ-rubric and figure scroll question. Measuring at 360px settled it: the rubric tables were
  already their own scroll containers, so the real defect was narrower than reported - no keyboard
  access and no visual sign that content was off-screen. `markScrollableRegions` in
  `src/theme/DocItem/Content.tsx` now marks both overflowing tables and figures as focusable named
  regions, which closes the WCAG 2.1.1 half for both. The right-edge fade closes the affordance
  half for tables only.

  It was not extended to figures because the fade is a `background-attachment: local` gradient,
  which paints *behind* the element's content. A table's cells are largely transparent so it shows
  through; a figure holds an SVG with an opaque background rect that would cover it completely. A
  pseudo-element overlay is the usual answer, but positioning one inside a horizontally scrolling
  `<figure>` needs either a wrapper element injected after hydration or a `display: grid` change to
  every figure on the site. Both are layout changes to shared components, and neither belongs in
  the middle of a review cycle. Needs a design decision, then one change covering all figures.

  Note the asymmetry that makes this advisory rather than blocking: a clipped diagram usually looks
  clipped, whereas a clipped table can look like a complete table.
- **RRQ mark weighting is recall-heavy in places.** Run 006 on Unit 4 noted that where an RRQ was
  rewritten to add an Understand- or Analyze-level clause, the added clause often carries 1 mark of
  6 to 8, so the score is still dominated by recall. Rebalancing the schemes is a bank-wide pass
  across all reviewed units, not a per-unit repair, and belongs in the content-improvement loop.
