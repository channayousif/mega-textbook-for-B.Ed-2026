# ADR-0010: Content Depth Standard and Reusable Unit-Authoring Skill

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-08-27
- **Feature:** 007-content-depth-standard (extends 006-content-pipeline)
- **Context:** The Content Authoring Pipeline (Spec 006) proved itself end-to-end but its
  first at-scale output — EFMP-302 "Teaching Profession", Units 1–6 — came out too shallow for
  the credit weight it carries. EFMP-302 Unit 1 covers weeks 1–3 of a 16-week 3-credit-hour
  course (four guide sub-units, 1.1–1.4, ~16 discrete concepts) but its `index.mdx` is ~620
  words / 10 reading-minutes and engages perhaps four of those concepts at surface level. It
  cites **none** of the six scholarly sources the course guide attaches to that material
  (Hargreaves 2000; Demirkasımoğlu 2010; Carr 2000; Beijaard, Meijer & Verloop 2004;
  Brookfield 2017; Suarez & McGrath 2022). Formative is 6 recall prompts; summative is a
  single item.

  Two root causes were identified: (1) the pipeline has **no depth standard** — the frozen
  `style-guide.md` v1 sets readability, register, citation and assessment-blueprint rules but
  nothing about *coverage completeness* or *scholarly engagement*, so "Simple English" (Art.
  III.1) was being read as "shallow"; (2) `content-spec.md` **omits the source material an
  author needs to go deep** — no Course Description, a bare `Author (year)` reading list with
  no full citations / DOIs / per-unit mapping / annotations, no week schedule, no derived
  teaching strategies, no standards anchors (UNESCO/NACTE/OECD/National Professional Standards
  for Teachers Pakistan/HEC).

  The user reviewed the diagnosis and approved a clustered upgrade with these constraints:
  concept coverage is the hard requirement while word count stays flexible (be precise, avoid
  padding, ~one illustrative example per point); prove the change by re-drafting **one** unit
  (EFMP-302 Unit 1) before rolling out; substituting reputable open-access sources for
  unavailable guide readings is acceptable **provided they are topically related** and
  recorded; the register ceiling stays HSC/intermediate-graduate plain English (Art. III.1
  unchanged); and the authoring method is packaged as a **reusable skill** rather than a prose
  method doc.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

Significance check — all true: (1) it sets the quality bar and CI gate for ~3,000 documents at
full scale and adds a new required contributor step; (2) alternatives on the metric, the
enforcement point, the skill packaging, and the sourcing policy were weighed; (3) it is
cross-cutting — it touches the shared style guide, the per-course content-spec schema, a new
build script, CI, and every future unit.

## Decision

Adopt an integrated **content-depth** solution layered on top of Spec 006, with five
components that version and evolve together:

- **Depth standard (concept-coverage-first)** — a new "Unit depth standard" section in
  `specs/content/style-guide.md`:
  - **Coverage rule (hard):** every guide sub-topic bullet gets its own named subsection in
    the file it folds into (FR-004 mapping) — traceable coverage, never a summary that drops
    concepts. A committed **`coverage.md`** per unit maps `guide sub-topic → file → section →
    source cited` and is the auditable artifact at the Content gate.
  - **Length (soft):** no fixed word floor. Prose is precise and complete over the concept
    set; padding to hit a count is a defect. `est_reading_minutes` is recomputed to match
    actual content.
  - **Illustration:** ~one concrete, Pakistan-grounded example per sub-topic (Art. III.4) —
    enough to make the idea land, not a case-study anthology.
  - **Scholarly engagement:** each unit paraphrases-and-cites its mapped readings (all guide
    readings tied to that unit, or a topically-related open-access substitute recorded in a
    committed **`sources-consulted.md`**). Substitutes are allowed only when on-topic.
  - **Required blocks:** "Common misconceptions" and "Further reading" (real citations) in
    `index.mdx`; formative 5–8 items enforced as a floor; summative keeps rubric + ≥1
    Analyze-or-higher (Art. III.3).
  - **Register unchanged:** HSC/intermediate-graduate plain English (Art. III.1); depth of
    *concepts* rises, complexity of *language* does not; unfamiliar terms get a glossary
    entry.
- **Expanded `content-spec.md` schema** (`contracts/content-spec-frontmatter.schema.json`
  bump + template): new required sections — `## Course Description`; `## Reading list` (full
  APA + DOI/URL, each entry tagged to unit(s), one-line annotation, split guide-required vs
  curated-supplementary); `## Week schedule`; `## Standards & frameworks anchors`. Each
  per-unit subsection gains: depth budget (concept count + target reading minutes),
  prerequisite knowledge, common misconceptions, mapped readings (subset of the course list),
  worked-examples plan (~one per sub-topic), international best-practice notes.
- **Reusable authoring skill** — `.claude/skills/author-unit/` (Claude Code skill, progressive
  disclosure): `SKILL.md` drives the G1→G2 workflow (source gathering → backward design /
  UbD → draft the five files to the depth standard → self-review + emit `coverage.md`), with
  `references/` files for the pedagogy checklist (cognitive load, worked-example effect,
  retrieval practice, UDL, explicit vocabulary, dialogic/inquiry activities matching the
  course description), the depth standard (shared numeric source of truth), and
  citation/register rules.
- **New CI depth gate** — `scripts/check-unit-depth.mjs` (plain Node + `gray-matter`, same
  shape as `check-pipeline-gate.mjs`): asserts `coverage.md` exists and references every guide
  sub-topic for the unit, required blocks are present, formative item count ≥ 5, and
  `est_reading_minutes` is consistent with content length. Wired into `.github/workflows/ci.yml`
  after "Validate content", alongside the Spec 006 pipeline gate. This is additive to Spec
  001's validators and the FR-016 pipeline gate, not a replacement.
- **Governance** — `style-guide.md` + `terminology.csv` freeze bumped to **v2.0** (they freeze
  as a pair, per Spec 006 FR-007). Rollout is proof-first: re-draft **EFMP-302 Unit 1** only,
  review the result, then extend to EFMP-302 Units 2–6 and revisit whether the EFMP-301
  golden unit is re-drafted or grandfathered with a recorded note. README gains a "Content
  depth standard" subsection (Constitution Art. X.2 docs gate).

<!-- For technology stacks, list all components:
     - Framework: Next.js 14 (App Router)
     - Styling: Tailwind CSS v3
     - Deployment: Vercel
     - State Management: React Context (start simple)
-->

## Consequences

### Positive

- Concept coverage becomes **measurable and enforced**, not a matter of reviewer stamina —
  `coverage.md` + `check-unit-depth.mjs` make "did this unit actually cover the guide?" a CI
  answer.
- Authors get the material they need to go deep **in one place** — the expanded content-spec
  carries the course description, annotated per-unit readings, and standards anchors that were
  previously scattered in the guide or absent.
- The skill makes output **consistent across authors and runs** and front-loads pedagogy
  (backward design, retrieval practice, misconceptions) that was previously left to chance.
- Register risk is contained: the standard raises *concept* depth while explicitly holding the
  Art. III.1 language ceiling, so "deeper" does not drift into "graduate-level prose".
- Substitute-source policy keeps the pipeline unblocked when a guide reading is paywalled,
  while `sources-consulted.md` keeps the substitution auditable and on-topic.
- Additive design — no change to Spec 001 validators or the FR-016 pipeline gate; lower
  regression risk.

### Negative

- **Re-work cost:** every EFMP-302 unit (and likely the EFMP-301 golden unit) must be
  re-drafted to the new standard; `translation_status: reviewed` Urdu mirrors go stale and
  need G4/G5 again.
- **Two new committed artifacts per unit** (`coverage.md`, `sources-consulted.md`) and a
  larger `content-spec.md` — more files to keep in sync, more surface for the CI gate to fail
  on.
- **Soft length rule is judgement-bound:** "precise and complete, no padding" cannot be fully
  automated; the Content gate reviewer still carries the call on whether prose is thin, and
  `check-unit-depth.mjs` can only check structural proxies.
- **Substitute sources risk drift** from the guide's intent if "topically related" is applied
  loosely; depends on reviewer diligence.
- **v2.0 freeze bump** invalidates the Spec 006 FR-017 "frozen v1" Definition-of-Done marker
  and means any later style-guide/terminology edit now rebases on v2.
- Skill maintenance is ongoing — pedagogy references and the depth standard must not fork from
  `style-guide.md`.

## Alternatives Considered

- **Word-count / reading-minute floors as the primary metric** (e.g. ≥1,500 words per teaching
  week). Rejected per user constraint — invites padding, and a precise 600-word treatment of a
  concept can be better than a padded 1,500-word one. Concept coverage is the real target;
  length follows from it. Kept only as a soft `est_reading_minutes` consistency check.
- **Reviewer-only enforcement (no CI gate), just a longer style-guide checklist.** Rejected —
  this is exactly how v1 produced shallow units; at 3,000-document scale an unautomated bar
  erodes. A structural CI check on `coverage.md` + required blocks is the minimum that scales.
- **A prose method document under `specs/content/` instead of a skill.** Rejected per user
  choice — a doc is not invoked, drifts from practice, and does not carry the step-by-step
  research→design→draft→self-review loop into each authoring session the way a skill does.
- **Fold the new fields into unit front matter / a per-unit spec file** rather than expanding
  `content-spec.md`. Rejected — Spec 006 R1 deliberately keeps one course-level file and one
  approval flag; a second per-unit file family was already considered and rejected there.
- **Re-draft all six EFMP-302 units (and EFMP-301) in one pass.** Rejected for now — user
  wants a single-unit proof (EFMP-302 Unit 1) before committing the full re-work; matches
  Constitution Art. VI.1's golden-unit-first discipline.
- **Acquire every original guide reading before drafting.** Rejected as a hard blocker —
  topically-related open-access substitutes (UNESCO IBE, OECD, ERIC, government standards
  docs), recorded in `sources-consulted.md`, keep the pipeline moving; originals can be
  swapped in later without changing the prose's claims.

## References

- Feature Spec: [specs/007-content-depth-standard/spec.md](../../specs/007-content-depth-standard/spec.md)
- Parent pipeline spec: [specs/006-content-pipeline/spec.md](../../specs/006-content-pipeline/spec.md)
- Implementation Plan: [specs/006-content-pipeline/plan.md](../../specs/006-content-pipeline/plan.md) (007 plan pending `/sp.plan`)
- Related docs: [specs/006-content-pipeline/research.md](../../specs/006-content-pipeline/research.md), [specs/content/style-guide.md](../../specs/content/style-guide.md), [specs/content/efmp-302/content-spec.md](../../specs/content/efmp-302/content-spec.md)
- Course guide source: `Scheme-and-Course-guides/extracted-text/1st 2026.txt` (EFMP-302, lines ~715–1006)
- Related ADRs: [ADR-0001](0001-content-scaffold-scope-scaffold-all-8-semesters-prioritize-content-for-semesters-1-4.md) (semester scope), [ADR-0004](0004-content-integrity-build-gate-and-data-driven-catalog.md) (content build gate — this ADR adds a depth gate in the same spirit)
- Evaluator Evidence: planning discussion 2026-08-26/27 (this session); PHR in `history/prompts/006-content-pipeline/`
