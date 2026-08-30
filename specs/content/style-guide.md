---
version: "3.0"
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

**v3.0** (2026-08-30, Spec 008) adds the `## Unit structure standard`,
`## Answers and marking guidance policy` and `## Figure markers and manifests` sections below,
plus the extensions to `## Assessment blueprint defaults` and the depth-gate-vs-human table,
proven on the EFMP-302 Unit 1 proving unit (restructured to the per-topic layout and passed the
human Content gate, 2026-08-30 — Spec 008 FR-026 / SC-006).

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

**Spec 008 bounded exception.** The three *prose* patterns ("answer key", "marking scheme",
"correct answer") are permitted **inside one bounded, final `## Answers and marking guidance`
section** of `unit-assessment.mdx` / `course-review.mdx` — see `## Answers and marking guidance
policy` below for the exact rule. The four **front-matter key** patterns are still forbidden
everywhere, including inside that section.

## Assessment blueprint defaults (FR-008/FR-009)

- Formative: 5–8 items, Remember → Understand → Apply.
- Summative: mixed constructed-response with a rubric, plus at least one Analyze-or-higher item.
- Weighting default: 60% summative / 40% formative (Constitution Art. III.7). A per-unit
  deviation is permitted only when justified in that unit's spec.

### Per-topic cycle assessments (Spec 008, per-topic layout)

Each `topic-NN.mdx` in a per-topic unit carries **both** a formative check and a summative task
inside its nine-part cycle:

- `## Check your understanding` — **≥ 3** top-level numbered items, Remember → Apply
  (retrieval practice, not recognition).
- `## Self-assessment checklist` — **≥ 3** `- [ ]` "I can …" statements (metacognition).
- `## Summative task` — one task with a mini-rubric; **at least one criterion demands
  Analyze-or-higher** (Constitution Art. III.3, held at the per-topic level).

### Unit-end assessment bank (Spec 008, per-topic layout)

`unit-assessment.mdx` carries a fixed bank, counted **per `###` band**:

- `### Multiple-choice questions (MCQs)` — **exactly 10**, Remember → Apply.
- `### Restricted-response questions (RRQs)` — **exactly 10**, Understand → Analyze.
- `### Extended-response questions (ERQs)` — **exactly 5**, Analyze → Evaluate/Create;
  **at least one ERQ rubric demands Analyze-or-higher**.
- Every item carries a Bloom tag. Model answers / mark schemes / rubrics live **only** in the
  final `## Answers and marking guidance` section (next section).

The end-of-course `course-review.mdx` practice bank (`### MCQs` / `### RRQs` / `### ERQs`) has
**no fixed count** — it is sized to the course; the human Content gate judges sufficiency.

## Unit depth standard (Spec 007)

> Applies to every unit whose `content-spec.md` `## Unit N` subsection carries a
> `### Sub-topic checklist` table. A unit without that table is grandfathered — this standard
> and its CI gate (`scripts/check-unit-depth.mjs`) simply skip it. **Adopting the standard for
> a new unit = add the checklist table to its content-spec subsection**; the gate then picks
> it up automatically.
>
> **Keep this section in sync with `.claude/skills/author-unit/references/structure-standard.md`** —
> that file is the authoring aid, this section is the human reference; when either changes, the
> other must be updated in the same branch, and `style-guide.md`'s `version` bumps.
>
> **Spec 008 note:** a unit that has *also* opted into the per-topic layout (a `### Topic list`
> table + `topic-*.mdx` files) is governed by `## Unit structure standard` below instead of the
> flat five-file rules in this section. This section continues to govern every legacy five-file
> unit unchanged.

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

### Per-topic layout — additional automated vs. human split (Spec 008)

For a unit on the per-topic layout, the gate set (`check-unit-depth.mjs` new-shape path,
`check-figures.mjs`, `check-no-answer-keys.mjs` bounded exception, `validate-content.mjs`
new-shape branch) adds these **automated** checks:

| Automated (CI) | Human Content gate |
|---|---|
| `### Topic list` present; row count == number of `topic-*.mdx`; `topic-01…NN` contiguous from `01` | Whether the topic grouping is sensible and pedagogically coherent |
| The `### Topic list` `Sub-topic IDs` cells form a **total, disjoint partition** of the `### Sub-topic checklist` (names any ID assigned to zero or ≥2 topics) | Whether each sub-topic sits in the *right* topic |
| Each `topic-NN.mdx` has the **nine canonical cycle headings, in order** (names the first missing/out-of-place heading + the file) | Whether the real-life hook lands; whether the explanation manages cognitive load and shows a worked example first |
| Per topic: `## Check your understanding` ≥ 3 numbered items; `## Self-assessment checklist` ≥ 3 `- [ ]`; `## Further reading` ≥ 1 line | Whether the formative items are retrieval and correctly Bloom-levelled; whether the self-assessment items are real "can I …" statements |
| `index.mdx` `## In this unit` list length == topic count | Whether the unit opening orients the reader |
| `unit-assessment.mdx`: `## Unit summary` present; MCQ/RRQ/ERQ counts **exactly 10 / 10 / 5 per `###` band**; `## Answers and marking guidance` present, ≤1, and the file's **last** `##` section | Whether questions are well-constructed and the rubrics sound; whether the bank samples the whole unit |
| Coverage matrix v2: `File` ∈ the new-shape set; every `topic-NN.mdx` referenced by ≥1 row; for every checklist ID ≥1 coverage row names the exact `topic-NN.mdx` its `### Topic list` row assigns it to | Whether `Section` names a heading that genuinely covers the sub-topic; whether the cited source is apt |
| Reading-minutes sum across `index.mdx` + every `topic-*.mdx` + `unit-assessment.mdx` (+ `unit-teacher-notes.mdx`) ∈ the re-baselined `**Depth budget**` band | Whether the prose is padded |
| Figure marker ↔ manifest consistency (`check:figures`) — every topic ≥1 marker; well-formed unique `fig-U<n>-<seq>` IDs; non-empty prompt + alt; marker set == manifest set both ways; each row's `Topic` == the marker file's `topic_label` | Whether the figure prompt would produce a useful teaching aid; whether the alt text is a good description; whether a figure is needed there |
| Answer prose (`answer key` / `marking scheme` / `correct answer`) appears **only** below the `## Answers and marking guidance` line in `unit-assessment.mdx` / `course-review.mdx`; front-matter answer-key keys nowhere | Whether the model answers and rubrics are correct and sufficient |

## Unit structure standard (Spec 008 — per-topic layout)

> **Opt-in, additive.** A unit is on this standard **only** when *both* signals are present:
> a `### Topic list` table in its `content-spec.md` `## Unit N` subsection **and**
> `topic-*.mdx` files in its `docs/` folder. Exactly one signal present (or a row-count
> mismatch) is a **loud depth-gate failure**, never a silent fallback. Legacy five-file units
> that have neither signal are **unchanged and not required to migrate** — they keep the
> `## Unit depth standard` (Spec 007) rules above.
>
> **Keep this section in sync with
> `.claude/skills/author-unit/references/structure-standard.md`** — authoring aid vs. human
> reference; change one, change the other in the same branch, and bump `version`.

### The nested model

```
docs/semester-N/<course>/unit-NN/
├── index.mdx                 # unit opening — orientation only, no exposition body
├── topic-01.mdx … topic-NN.mdx   # one nine-part learning cycle each
├── unit-assessment.mdx       # chapter summary + 10/10/5 bank + bounded answers section
└── unit-teacher-notes.mdx    # OPTIONAL — teaching strategies + practical work, no assessment items
docs/semester-N/<course>/course-review.mdx   # OPTIONAL course-level end matter
```

**`index.mdx` (unit opening)** — required `##` sections: `## Unit learning outcomes`;
`## Prerequisite knowledge`; `## In this unit` (an ordered list, **one item per topic file**,
each linking `./topic-NN`); `## How to use this unit`. Keeps `<TranslationStatusBadge>`; **no**
`<PrintHandout />`, **no** exposition body. The Spec 007 `## Common misconceptions` /
`## Further reading` requirement does **not** apply to a new-shape `index.mdx` — it moves into
each topic file.

### The nine-part topic cycle — canonical `##` headings, checked for presence AND order

| # | Canonical heading | Gate minimum |
|---|---|---|
| 1 | `## A real classroom situation` | — (a FIGURE marker usually sits here) |
| 2 | `## Explanation` | — (this topic's misconceptions are named and corrected here) |
| 3 | `## Activity: <name>` | — (`## Activity:` matched as a prefix; the author names the activity) |
| 4 | `## Check your understanding` | ≥ **3** top-level numbered items |
| 5 | `## Summary` | — |
| 6 | `## Self-assessment checklist` | ≥ **3** `- [ ]` items |
| 7 | `## Try this at your practicum school` | — |
| 8 | `## Summative task` | mini-rubric; human gate checks ≥ 1 Analyze-or-higher demand |
| 9 | `## Further reading` | ≥ **1** citation or link line |

Other `##`/`###` headings MAY appear *between* the nine (e.g. `###` sub-headings under
`## Explanation`); the nine themselves MUST be monotonically ordered. The gate failure names
the first heading missing or out of place **and** the topic file. Full contract:
`specs/008-rich-unit-pedagogy/contracts/topic-cycle.md`.

### Topic-file front matter

The unit schema **plus** `topic_no` (integer ≥ 1, **==** the filename ordinal) and
`topic_label` (non-empty string, e.g. `"1.1"`) — required in practice on `topic-*.mdx`,
enforced by `validate-content.mjs` (JSON Schema cannot see the filename). `clo_refs` = the
subset of the unit's SLO refs this topic serves. **No `sidebar_position`.**

### File naming

- `topic-NN.mdx` — zero-padded single ordinal, contiguous from `01` (not `topic-1-1.mdx`;
  a two-part name re-introduces the `topic-1-10 < topic-1-2` sort bug and duplicates the
  folder's unit number). The human "Topic 1.1" label comes from `title` / `topic_label`.
- `unit-assessment.mdx`, `unit-teacher-notes.mdx` — the `unit-` prefix sorts them after every
  `topic-*.mdx`.
- `course-review.mdx` — course-level, sibling of `course-overview.mdx`.

### The one sanctioned `sidebar_position`

`course-review.mdx` MAY carry `sidebar_position: 900` — the **only** sanctioned
`sidebar_position` anywhere in content — so it sorts after the last `unit-NN`. Mirror the key
in the UR i18n copy. No `topic-*.mdx`, `index.mdx`, `unit-assessment.mdx` or
`unit-teacher-notes.mdx` may set `sidebar_position` (natural filename sort is relied on).

### Half-migration is blocked

`validate-content.mjs` rejects any legacy pooled file (`activities.mdx` / `formative.mdx` /
`summative.mdx` / `teacher-notes.mdx`) in a folder that also contains `topic-*.mdx`. Rename
`teacher-notes.mdx` → `unit-teacher-notes.mdx`; fold the other three into the topic cycles.

## Answers and marking guidance policy (Spec 008)

Self-study answer material (answer keys, model answers, mark schemes, analytic rubrics) is
permitted in **published content** — but only inside one tightly-bounded section, so the
`check-no-answer-keys.mjs` safety gate stays meaningful everywhere else.

**The bounded-block rule (verbatim):**

1. **One canonical heading**, case-sensitive, exact, no trailing text, after `.trimEnd()`:
   `## Answers and marking guidance`. `## Answers and marking guidance (teachers)` does **not**
   open the exception (and would then trip the gate on its own answer prose).
2. **Two file types only**: files whose path matches
   `/(?:^|\/)(unit-assessment|course-review)\.mdx$/`. Nowhere else.
3. **The file's final `##` section**: if any `## ` heading follows the canonical heading, the
   gate fails.
4. **At most one** such heading per file; two → failure.
5. Inside the block: **prose** answer keys / model answers / mark schemes / rubrics only. The
   four front-matter keys (`answer_key` / `answers` / `marking_scheme` / `rubric_answers`)
   remain forbidden **everywhere**, including inside the block (schema + gate).

**How `scripts/check-no-answer-keys.mjs` implements it** (so authors do not trip it): patterns
split into `FRONT_MATTER_PATTERNS` (the 4 key regexes) and `PROSE_PATTERNS` (`answer key`,
`marking scheme`, `correct answer`). A non-whitelisted file is scanned whole with all 7. A
whitelisted file: locate the canonical heading — `> 1` → error; `0` → whole-file scan; exactly
`1` at line *k* → error if any `^##\s` appears after *k*, else scan `[0, k)` with all 7 and
`[k, EOF)` with the front-matter patterns only. For `build/` HTML, only the prose patterns are
suppressed, and only for routes whose last path segment before `index.html` is
`unit-assessment` / `course-review` (and their `/ur/` mirrors).

This is a bounded, reversible carve-out (Constitution Art. V.2, amended v2.6.0). It is
**distinct** from the RLS-protected Spec 003 LMS quiz/answer-key store, which stays
backend-only and `verified_teacher`-gated.

## Figure markers and manifests (Spec 008)

Teaching figures are planned as **inline MDX comments** in the topic files and tracked in a
per-unit manifest. **Nothing renders yet** — a later, out-of-scope image pass will generate the
images, place them, and flip the manifest `Status`.

**Marker grammar** (inside a `topic-*.mdx`, usually in `## A real classroom situation` or
`## Explanation`):

```
{/* FIGURE[fig-U<unitNo>-<seq>]: <generation prompt>; alt: <alt text> */}
```

Extraction regex:
`/\{\/\*\s*FIGURE\[(fig-U\d+-\d+)\]:\s*([\s\S]+?);\s*alt:\s*([\s\S]+?)\s*\*\/\}/g`

- **`<id>`** matches `^fig-U\d+-\d+$`; the `U<n>` group **==** the unit-folder number; `<seq>`
  is a **unit-scoped** integer, unique within the unit (not per topic).
- **`<prompt>`** ≥ 10 non-space chars — a concrete instruction: subject; style
  ("clean flat vector, labelled, high contrast, no colour-only meaning"); aspect.
- **`<alt>`** non-empty — the accessible description that becomes the image `alt` text
  (Constitution Art. III.8).
- **At least one marker per `topic-*.mdx`** (FR-014).

**Manifest**: `specs/content/<course>/figures/unit-NN.md`, one table
`| Figure ID | Topic | Prompt | Alt text | Status |`. `Status ∈ {prompt-only, generated,
placed}` — **all `prompt-only` in this feature**. Marker-ID set **==** manifest-ID set (both
directions); each row's `Topic` **==** the `topic_label` of the file its marker sits in; no
blank cells. For `translation_status: reviewed` bilingual units, the UR `topic-*.mdx` carry the
**same** marker IDs (the manifest is English-only; the ID match is the parity mechanism).

**Gate**: `npm run check:figures` (`scripts/check-figures.mjs`) — CI step in the `build` job,
after the depth gate, before the answer-key check. Legacy units (no `topic-*.mdx`) are skipped.
Full contract: `specs/008-rich-unit-pedagogy/contracts/figures-manifest.md`.
