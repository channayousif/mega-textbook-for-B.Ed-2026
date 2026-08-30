# ADR-0011: Nested Per-Topic Unit Pedagogy, Bounded Answer Keys, and Figure Markers

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together.

- **Status:** Accepted
- **Date:** 2026-08-27
- **Feature:** 008-rich-unit-pedagogy
- **Context:** Spec 006 fixed a unit at five flat files (`index.mdx`, `activities.mdx`,
  `formative.mdx`, `summative.mdx`, `teacher-notes.mdx`), with exposition in `index.mdx` (one `##`
  per guide sub-topic) and activities / formative / summative *pooled* once per unit. Spec 007 added
  a depth gate over that shape. The curriculum owner asked for a materially richer reader
  experience: each **topic** as a self-contained learning cycle (real-life hook → explanation →
  collaborative activity → formative check → summary → self-assessment checklist → practicum-transfer
  task → summative task → further reading); an **end-of-unit** chapter summary plus a fixed
  10 MCQ / 10 RRQ / 5 ERQ bank *with answers and rubrics*; an **end-of-course** review (summary +
  practice bank + practicum project ideas); **markers showing where teaching images belong**, each
  carrying a generation prompt; and a rewritten reusable authoring skill. Three of these collide
  with load-bearing rules: Spec 006 FR-004 ("no new per-unit file type"), Constitution Art. V.2
  ("answer keys … never by hidden static pages") reinforced by `scripts/check-no-answer-keys.mjs`,
  and the Spec 007 depth gate's assumptions about the five-file set. The change is at least the size
  of Spec 007 and, like it, is delivered as a full SDD feature proven on one unit before rollout.
  This ADR records the cluster of decisions that shape the feature; the accompanying constitution
  amendment is **v2.5.0 → v2.6.0 (MINOR)**.

<!-- Significance checklist (ALL true):
     1) Impact — new content architecture, a Constitution Art. V.2 carve-out, four rewritten gate
        scripts + one new gate, a content-spec schema expansion, a rewritten skill.
     2) Alternatives — flat-vs-nested layout; answers in-book vs out-of-book vs teacher-notes-only;
        component vs comment figure markers; single vs dual opt-in signal; full spec vs lightweight.
     3) Scope — cross-cutting: content authoring, CI enforcement, governance, the reader experience,
        and the boundary with the Spec 003 LMS layer. -->

## Decision

Adopt, as **one integrated content-architecture change**, the following five components. They ship
together in Spec 008, are motivated by the same goal, and would be revised together.

### 1. Nested per-topic unit shape — an *opt-in alternative*, not a replacement

A new unit shape: `index.mdx` (unit opening — orientation + an ordered topic map) → `topic-01.mdx …
topic-NN.mdx` (one **nine-part learning cycle** each, canonical `##` headings checked for presence
**and order**) → `unit-assessment.mdx` (chapter summary + exactly 10 MCQ / 10 RRQ / 5 ERQ + a
bounded answers section) → optional `unit-teacher-notes.mdx`. At course level, an optional
`course-review.mdx` (course summary + practice bank + practicum project ideas + a bounded answers
section), carrying `sidebar_position: 900` — the **only** sanctioned `sidebar_position` in content —
so it sorts after the last unit.

- Files are `topic-NN.mdx` (zero-padded single ordinal), never `topic-1-1.mdx` — the latter
  reintroduces the `topic-1-10 < topic-1-2` lexical-sort bug and duplicates the folder's unit number.
- The legacy five-file layout is **frozen, not deprecated**. Every legacy unit and course passes
  every gate unchanged, with no edits. The new-shape gate logic runs *in addition to* the existing
  validators.
- Spec 006 FR-004 is **superseded in part** by a note under its folding table (FR-004 is *not*
  deleted — Spec 007 references it). Constitution Art. III.6 is amended to name the per-topic layout
  as a permitted alternative carrier of the guide's teaching / practical / assessment sections.
- The proving unit is **EFMP-302 Unit 1** (English re-restructure + Urdu-mirror handoff); it is the
  feature's whole Definition of Done. Units 2–6, other courses, and EFMP-302's real
  `course-review.mdx` are follow-up.

### 2. Bounded self-study answer keys in published content — an Art. V.2 carve-out

Answer keys, model answers and marking rubrics are permitted in committed, published content **only**
inside a single `## Answers and marking guidance` section that is the **final** top-level section of
`unit-assessment.mdx` or `course-review.mdx` — exactly as a printed textbook prints answers at the
back.

- `scripts/check-no-answer-keys.mjs` gains one exception constrained by five independent guards: an
  exact, case-sensitive, trailing-text-free canonical heading; a two-filename whitelist; a hard
  "no `##` heading may follow it" check; at most one such heading per file; and the four
  **front-matter answer-key key** patterns (`answer_key` / `answers` / `marking_scheme` /
  `rubric_answers`) still fire everywhere, including inside the block. The JSON-Schema `not/anyOf`
  key ban is **not** relaxed. The scan loses no coverage anywhere else.
- Constitution Art. V.2 is amended with a carve-out that draws the line explicitly: a bounded
  printed-textbook self-check key is *intentionally public* self-study content; the RLS-protected
  LMS quiz bank and answer-key store (Spec 003), gated by the `verified_teacher` capability, is a
  **different thing** and stays backend-only. The "anything in the static bundle is public"
  principle is unchanged — this makes the answers section deliberately, knowingly public.
- This is the feature's one Constitution-Check Complexity-Tracking entry.

### 3. Figure markers — comment + manifest + gate, nothing rendered

Authors mark where a teaching image belongs with an MDX **comment**:
`{/* FIGURE[fig-U<unitNo>-<seq>]: <generation prompt>; alt: <alt text> */}` (unit-scoped IDs). Each
new-shape unit carries a committed manifest `specs/content/<course>/figures/unit-NN.md`
(`| Figure ID | Topic | Prompt | Alt text | Status |`, `Status ∈ {prompt-only, generated, placed}`,
all `prompt-only` now). A new CI gate `scripts/check-figures.mjs` asserts every topic has ≥ 1 marker,
IDs are well-formed and unique, prompt/alt are non-empty (alt-text mandatory — Constitution
Art. III.8), and markers ↔ manifest match both ways with each row's `Topic` equal to the
`topic_label` of the file its marker sits in. For a reviewed bilingual unit, the Urdu topic files
carry the same marker IDs. **Nothing is generated or rendered in this feature.** Constitution
Art. VII's review-gate table gains a "Figure gate" row.

### 4. Opt-in predicate — two agreeing signals, loud failure on disagreement

A unit is evaluated on the new-shape rules **iff** both are present: (a) `topic-*.mdx` files on
disk, and (b) a `### Topic list` table in the course content-spec's `## Unit N` subsection
(partitioning the Spec 007 `### Sub-topic checklist` into topics — total and disjoint). If exactly
one signal is present, or the topic-file count differs from the `### Topic list` row count, the
depth gate **fails with a message naming the mismatch** — it never silently picks a layout. Entry
into new-shape scope is irreversible in practice (a unit cannot silently regress). This mirrors the
Spec 007 grandfathering mechanism (a unit is in depth-gate scope iff its subsection carries a
`### Sub-topic checklist`).

### 5. Golden-unit re-proof obligation (Constitution Art. VI.1, re-run for v3.0)

`style-guide.md`'s `version` moves `"2.0"` → `"3.0"` **only after** EFMP-302 Unit 1 clears the human
Content gate (the Spec 007 T032 discipline). Per the amended Art. VI.1 "Standard versioning" clause,
the golden unit **EFMP-301 Unit 1** MUST be brought to v3.0 as the immediate next content task after
the proving unit — recorded now as a prose `> **Pending:**` note in
`specs/content/efmp-301/content-spec.md` + `specs/backlog.md` (a `▢` tracker row would flip the
published unit to "not done" in `check-pipeline-gate.mjs` and break the deploy cron), with tracker
rows added when it is scheduled on its own branch. Until then EFMP-302 Unit 1 is the working depth
exemplar. EFMP-301 stays grandfathered (no `### Topic list` → legacy path) so the v3.0 freeze lands
without CI failing.

## Consequences

### Positive

- **The reader experience matches how a unit is actually taught and learned** — a topic is a
  complete cycle (hook → explain → do → check → consolidate → self-assess → transfer → assess →
  extend), not exposition with assessment bolted on elsewhere. The book becomes usable as a genuine
  primary self-study resource (Constitution Art. I.1), including chapter-end and course-end
  self-check.
- **Structure is mechanically enforceable.** Fixed canonical headings, fixed 10/10/5 bank sizes, a
  declared topic partition, and figure-marker/manifest consistency are all checkable; a
  non-conforming PR fails a specific gate with a message that names the unmet condition and the file
  (SC-004). "Enough structure" stops being a matter of reviewer stamina.
- **Zero disruption to existing content.** The dual-signal opt-in and the untouched legacy path mean
  every current course/unit and `check:add-course` stay green with no edits (SC-007). Migration is
  per unit and always an explicit authoring act.
- **The answer-key line is now explicit, not implicit.** Before, Art. V.2 was read as "no answer
  keys in static content, full stop"; the LMS/textbook boundary lived only in reviewers' heads. The
  carve-out states it: printed-textbook self-check keys are public by design; graded-assessment keys
  are `verified_teacher`-gated backend data. The five guards keep the exception from widening.
- **Figures get a queue without a rendering commitment.** The manifest is a work list a later image
  pass consumes; alt text is captured and gated from day one; the build ships nothing new.
- **Finer traceability.** The `### Topic list` + the `Topic` column on the checklist make the
  guide → topic → section → source chain fully declared and cross-checked, tighter than Spec 007.
- **Per-file EN↔UR parity is easier**, not harder — a fixed nine-part heading skeleton gives the
  structural-parity gate a stable target per topic file.

### Negative

- **Reading-minutes budgets balloon** — a nine-part cycle × ~4 topics + a 25-item bank is roughly
  2–3× the legacy band (EFMP-302 Unit 1: ~65 → ~100–150 est. reading-min). Every course's
  `**Depth budget**` must be re-baselined per restructure; the style guide's "±25%" guidance loosens
  to a documented range. Only the band is gated (counts stay advisory) to keep it from being brittle.
- **A safety gate is deliberately loosened.** Any bug in the answer-block delimiter logic risks a
  real stray key slipping through inside `unit-assessment.mdx`, or false merge blocks. Mitigation:
  the five guards above + a dedicated `tests/unit/no-answer-keys.test.mjs` carrying the exploit
  cases (near-miss heading, trailing section, double heading, front-matter key inside the block,
  legacy file unchanged).
- **Sidebar depth grows** — ~7 leaves per restructured unit. `collapsed: true` (already default)
  mitigates; an intermediate grouping is deferred, not in this feature.
- **Bilingual debt accelerates.** Each restructured unit invalidates its reviewed Urdu mirror and
  multiplies file count (1 + N + 1 vs 5). Handled by heading-only skeleton stubs + the FR-003
  English-fallback banner; the DoD stays scoped to the English proving unit + handoff (as Spec 007).
- **Four gate scripts are rewritten**, not just extended — `check-unit-depth.mjs`,
  `validate-content.mjs`, `check-no-answer-keys.mjs`, `build-content-index.mjs`. Each must keep its
  legacy path byte-for-byte; red-first tests plus a "legacy regression floor green" checkpoint after
  each rewrite are how that is held.
- **`git mv`-scale churn on the proving unit** — four legacy files deleted, seven new files added,
  plus the Urdu mirror. Reviewable, but a large diff.
- **An unavoidable follow-up obligation** — the EFMP-301 golden-unit re-proof at v3.0 is now a
  constitutional requirement, not optional.

## Alternatives Considered

### A. Keep the five files; nest the cycle as `###` under one `##` per topic inside `index.mdx`

Each topic = one `##` in `index.mdx`, the nine parts as `###`; `activities.mdx` / `formative.mdx` /
`summative.mdx` repurposed as the unit-end bank. **Rejected**: `index.mdx` becomes enormous and
mixes "the whole unit" with "one topic"; the pooled-file names no longer describe their contents;
the legacy/new-shape branch in the validator gets murkier, not cleaner. The owner chose per-topic
files. (Recorded as the plan's rejected Q3 option.)

### B. Answer keys out of the rendered book

Keep model answers / MCQ keys out of the static site — emit them to a teacher-only or git-ignored
artefact (today's `.staging/` model); only rubrics-without-keys inline. **Rejected**: defeats the
self-study purpose for the majority of readers who are not in a teacher-managed class; a chapter-end
bank with no way to self-check is pedagogically inert.

### C. Answer keys only in `teacher-notes.mdx`

Full keys + rubrics live only in each unit's teacher-notes file; student files stay key-free.
**Rejected**: still needs `check-no-answer-keys.mjs` relaxed for that file, still hides answers from
self-learners, and mixes assessment keys into teaching guidance (two different audiences, two
different purposes).

### D. A real `<TeachingImage prompt alt />` component that renders a placeholder box

Markers render a labelled box now, swapping to a real `src` later. **Rejected**: adds a component +
CSS + swizzle registration and shows scaffolding in production; six unused components already exist;
a comment marker is invisible, diffs cleanly, and a manifest gives the later generation pass a real
queue. (Front-matter `figures: []` also rejected — it divorces the prompt from its insertion point.)

### E. A single opt-in signal (filesystem only, or a `layout: topic` front-matter marker)

**Rejected**: a filesystem-only signal gives no loud failure when the governance declaration is
missing, and the gate needs the `### Topic list` anyway to check the partition; a new front-matter
marker is a fourth opt-in mechanism, and Spec 007 deliberately avoided adding one. Two agreeing
signals make an accidental half-migration a CI failure instead of a silent wrong-layout evaluation.

### F. Lightweight branch instead of a full SDD feature

Rewrite the skill + style guide + gates directly on a branch; skip the spec ceremony. **Rejected**:
the change touches the constitution, four gate scripts, the content-spec schema, and a proving unit
— at least Spec 007's size, which was run as a full feature. The owner chose full SDD delivery.

### G. Splitting this into multiple ADRs (structure / answer-keys / figures separately)

**Rejected**: the answer-key carve-out only exists *because* of the end-of-unit assessment file,
which only exists *because* of the new structure; the figure gate is wired into the same opt-in
predicate. They ship together and would be revised together. ADR-0010 set the precedent of one ADR
for a multi-part content-standard decision. The answer-key carve-out is given its own subsection
here so it is not buried.

## References

- Feature Spec: [specs/008-rich-unit-pedagogy/spec.md](../../specs/008-rich-unit-pedagogy/spec.md)
  (FR-008–014, FR-018, FR-024–025, FR-029)
- Implementation Plan: [specs/008-rich-unit-pedagogy/plan.md](../../specs/008-rich-unit-pedagogy/plan.md)
  (Constitution Check + Complexity Tracking)
- Research: [specs/008-rich-unit-pedagogy/research.md](../../specs/008-rich-unit-pedagogy/research.md)
  (R1 opt-in predicate, R6 answer-key exception, R7 figure grammar, R8 manifest, D1–D6)
- Data model: [specs/008-rich-unit-pedagogy/data-model.md](../../specs/008-rich-unit-pedagogy/data-model.md)
- Contracts: [specs/008-rich-unit-pedagogy/contracts/](../../specs/008-rich-unit-pedagogy/contracts/)
  (`topic-cycle.md`, `end-of-unit-assessment.md`, `end-of-course-review.md`, `figures-manifest.md`,
  `content-spec-v3.md`, `coverage-matrix-v2.md`, `course-review.schema.json`)
- Related ADRs: [ADR-0010](0010-content-depth-standard-and-reusable-unit-authoring-skill.md)
  (extended by this feature — the depth standard, coverage/sources artefacts, and the `author-unit`
  skill this ADR builds on); [ADR-0005](0005-self-selectable-teacher-role-with-verified-teacher-gate.md)
  (the `verified_teacher` capability the Art. V.2 carve-out draws its line against);
  [ADR-0004](0004-content-integrity-build-gate-and-data-driven-catalog.md) (the content-integrity
  build-gate lineage the new gates extend)
- Constitution: `.specify/memory/constitution.md` — amendment v2.5.0 → v2.6.0 (MINOR): Art. III.1
  reaffirmation, III.3 (assessment), III.6 (file-type rule), V.2 (answer-key carve-out), VI.1
  (standard-versioning re-run), VII (figure-gate row)
- Evaluator Evidence: [history/prompts/008-rich-unit-pedagogy/0002-plan-008-rich-unit-pedagogy.plan.prompt.md](../prompts/008-rich-unit-pedagogy/0002-plan-008-rich-unit-pedagogy.plan.prompt.md)
