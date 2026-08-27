---
version: "2.0"
---

# Content Style Guide

Shared reference for every course/unit produced through the content authoring pipeline
(Spec 006, extended by Spec 007). The Content gate (Constitution Art. VII) checks every
drafted unit against this document. `version` (front matter above) is the single freeze marker
for **both** this document and `terminology.csv` (Spec 006 FR-007, research.md R8) — the two
are always versioned/frozen together; `terminology.csv` carries no version field of its own,
and any further edit to either document requires bumping this field.

**v2.0** (2026-08-27, Spec 007) adds the `## Unit depth standard` and
`## What the depth gate checks vs. what the human Content gate checks` sections, proven on the
EFMP-302 Unit 1 proving unit. v1.0 was Spec 006's freeze.

## EN readability rules

- Target register: accessible to a fresh HSC/intermediate graduate (Constitution Art. III.1).
  No graduate-level jargon without a bilingual glossary entry (`glossary.json`).
- Prefer short sentences and active voice. One idea per paragraph.
- Define a technical term the first time it appears in a unit, then use it consistently —
  do not switch between synonyms for the same concept within a unit.

## UR register rules

- Register: academic-plain (درسی مگر عام فہم) — not literary/archaic (Constitution Art. III.2).
- Every student-facing unit MUST have a complete, human-reviewed Urdu version before publish,
  except units belonging to a course flagged `bilingual: false`.
- Machine translation MAY draft; a human quality pass is mandatory before a unit is marked
  `translation_status: reviewed`.

## Pakistan/Sindh localization rules

- Case studies and examples use Pakistani/Sindh classroom contexts wherever the subject allows
  (Constitution Art. III.4).

## Citation format

- All prose is original. Quotations under 15 words carry a citation to the course guide, HEC
  document, or a named academic source.
- A course guide's recommended readings are cited by reference only — never reproduced
  (Constitution Art. III.5, FR-010).

## Diagram conventions

- Diagrams/images carry descriptive alt text (Constitution Art. III.8).
- No color-only meaning; semantic heading hierarchy throughout.

## Terminology bank

`specs/content/terminology.csv` (`term_en,term_ur,notes`) is the mandatory reference every
translator consults (FR-006). A conflict between a translator's term choice and the bank is
resolved by the curriculum owner, and the resolution updates the bank so later translators see
it (research.md R4).

## Answer-key marker patterns (FR-016d)

The CI gate's keyword/pattern scan (`scripts/check-no-answer-keys.mjs`) blocks a PR that adds a
committed file matching any of these markers, pending human confirmation it is a false positive
or removal of the content. This list is heuristic (can false-positive/negative) and is
maintained here alongside the scan itself:

- `answer_key:` / `answers:` / `marking_scheme:` / `rubric_answers:` (forbidden front-matter keys)
- "answer key"
- "marking scheme"
- "correct answer"

## Assessment blueprint defaults (FR-008/FR-009)

- Formative: 5–8 items, Remember → Understand → Apply.
- Summative: mixed constructed-response with a rubric, plus at least one Analyze-or-higher item.
- Weighting default: 60% summative / 40% formative (Constitution Art. III.7). A per-unit
  deviation is permitted only when justified in that unit's spec.

## Unit depth standard (Spec 007)

> Applies to every unit whose `content-spec.md` `## Unit N` subsection carries a
> `### Sub-topic checklist` table. A unit without that table is grandfathered — this standard
> and its CI gate (`scripts/check-unit-depth.mjs`) simply skip it. **Adopting the standard for
> a new unit = add the checklist table to its content-spec subsection**; the gate then picks
> it up automatically.
>
> **Keep this section in sync with `.claude/skills/author-unit/references/depth-standard.md`** —
> that file is the authoring aid, this section is the human reference; when either changes, the
> other must be updated in the same branch, and `style-guide.md`'s `version` bumps.

**Concept coverage is the hard rule.** For every unit in scope, each guide sub-topic on that
unit's enumerated `### Sub-topic checklist` (leaf-bullet granularity, faithful to the course
guide — the curriculum owner's responsibility at the Content gate) MUST have its own **named
subsection** in the file it folds into per the FR-004 mapping. Sub-topics MAY share one
subsection only if each is still individually accounted for in the unit's coverage matrix
(`specs/content/<course-code>/coverage/unit-NN.md`). A checklist sub-topic with no mapped
subsection fails the gate.

**Length is soft — precise, not padded.** There is no word floor. Prose is complete over the
concept set and no longer than it needs to be; padding to look substantial is a defect. Aim
for roughly **one concrete, Pakistan-grounded example per sub-topic** (Constitution Art.
III.4) — enough to make the idea land, not a case-study anthology.

**Scholarly engagement.** Each unit paraphrases-and-cites the scholarly readings mapped to it
in the content-spec `## Reading list` (or a topically-related open-access substitute — never
an off-topic one). Every source actually used is recorded in
`specs/content/<course-code>/sources/unit-NN.md` with its exact URL/DOI and `Kind`
(`guide-required` / `open-access-substitute` / `no-external-source`). Where no source can be
found for a sub-topic, cover it from the guide text and general knowledge, record a
`no-external-source` row, and escalate the gap in `specs/gaps.md` — never invent a citation.

**Required blocks in `index.mdx`.** Both a `## Common misconceptions` block **and** a
`## Further reading` block (real citations) MUST be present. The gate fails if **either** is
missing.

**Formative floor.** The formative set MUST have **at least 5 items, written as a top-level
numbered list** (`1.`, `2.`, …) — this is the format the gate counts. Summative keeps a rubric
plus at least one Analyze-or-higher item (Constitution Art. III.3).

**Depth budget.** Each unit's content-spec subsection records
`**Depth budget**: N sub-topics; A–B reading-min`. The `N` count is authoring guidance only.
The `A–B` reading-minutes range **is** checked: the gate sums `est_reading_minutes` across the
unit's five English files and fails if the unit total falls outside `[A, B]`. Keep the band
tight — roughly ±25% of the target — so the check has teeth.

**Register is unchanged (Constitution Art. III.1).** The depth standard raises the depth of
*concepts*, not the complexity of *language*. Student-facing prose stays accessible to a fresh
HSC/intermediate graduate; any technical term still needs a bilingual glossary entry. Reaching
for graduate-level vocabulary to signal depth is a Content-gate failure.

## What the depth gate checks vs. what the human Content gate checks (FR-013)

`scripts/check-unit-depth.mjs` is a **structural** check only:

| Automated depth gate (CI) | Human Content gate (curriculum owner) |
|---|---|
| Every checklist sub-topic ID appears in the coverage matrix with a non-empty file / section / source | Whether the named section actually exists and genuinely covers that sub-topic |
| `## Common misconceptions` and `## Further reading` headings are present | Whether the misconceptions are real and the further-reading citations are apt |
| Formative set has ≥ 5 numbered items | Whether the items are good, correctly Bloom-levelled, and cover the unit |
| Unit-total `est_reading_minutes` is within the depth-budget band | Whether the prose is padded or genuinely that length |
| Coverage matrix and sources list are mutually consistent (every cited key exists, no orphan keys) | Whether an `open-access-substitute` is genuinely on-topic; whether a `no-external-source` row was escalated |
| — | Whether the HSC-graduate register held (Art. III.1) |

A green depth gate means the structure is in place; it does **not** mean the unit passed
review. Only the curriculum owner's Content-gate pass does that.
