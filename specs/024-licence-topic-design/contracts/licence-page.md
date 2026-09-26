# Contract: licence track pages (Feature 024)

This is the authoring contract for every page under `licence/pedagogy/`. It is enforced by
`scripts/check-licence.mjs` (`npm run check:licence`) against `catalog/licence-objectives.json`
and `contracts/licence-page.schema.json`.

## Layout

```
licence/pedagogy/<heading-dir>/
  index.mdx          page_kind: heading-index   (scaffolded; renders <LicenceObjectives heading="x" />)
  <slug>.mdx         page_kind: subtopic        one per registry objective, slug from the registry
  practice.mdx       page_kind: practice        one per heading
i18n/ur/docusaurus-plugin-content-docs-licence/current/pedagogy/<heading-dir>/   (same files, Urdu)
```

Heading directories: `a-methods-and-foundations`, `b-child-dev-and-ed-psych`,
`c-classroom-management`, `d-assessment-and-test-dev`, `e-school-community-teacher`.
No other directory may exist under `licence/` (the legacy `eed-313/` is tolerated with a warning
until heading C's migration deletes it).

**Only write inside your own heading directory** (EN and UR), plus figures under
`static/img/figures/licence/<heading-dir>/` and your own spec folder. The registry, index pages,
schema and gate are shared and owned by Phase 0; if the registry looks wrong, report it rather
than editing it.

## Subtopic page

### Front matter

```yaml
---
title: "C08. Physical setup of the classroom"          # "<id>. <short title>"
description: "One sentence, >= 20 chars, what the page gives the candidate."
page_kind: subtopic
heading: c
objective_id: C08                                       # registry id
steda_objective: "Physical setup of the classroom"      # registry text, VERBATIM
coverage: partial                                       # covered | partial | authored
degree_links:                                           # required (>= 1) for covered/partial
  - path: /semester-1/efmp-301/unit-08/topic-02         # route under docs/, no locale, no .mdx
    label: "EFMP-301 Topic 8.2 - ..."
guide_ref:
  guide: ClassroomMgmt_Sept13.pdf
  units: "1, 3"
sources:
  - "Full citation, with URL where open access"
translation_status: draft
sidebar_position: 8                                     # registry order
---
```

### Coverage, decided by reading the degree topic, not its title

| coverage | Meaning | Teaching body (words before `## Practice questions`) |
|---|---|---|
| `covered` | A degree topic already teaches everything the objective asks | <= 700: exam summary + links, no re-teaching |
| `partial` | A degree topic teaches some of it | >= 500: summary + links + the missing material taught here |
| `authored` | No degree topic teaches it | >= 1000: full teaching |

Every `degree_links[].path` must resolve to a file under `docs/` and appear in the body as a
Markdown link `[label](path)`. Link to the most specific topic file, never to a course overview.

### Body sections, in this order

1. `# <title>`
2. `## What the test asks` (required): what a CRQ on this objective demands, which command words
   (explain, compare, justify, design), and the common ways candidates lose marks.
3. `## Where your degree teaches this` (covered/partial): one line per degree link saying
   exactly what that topic gives you.
4. `## Key points` (covered) **or** `## Explanation` with `###` subsections (partial/authored):
   the teaching. Partial pages teach only the residue and say so. Use a Pakistani classroom
   example. Figures only where they teach, via `<Figure>` (schematics as SVG; illustrations
   left prompt-only for Codex per ADR-0024).
5. `## Practice questions`: 1-2 items headed `### CRQ 1`, `### CRQ 2`, each with the marks
   (licence CRQs are 15 marks) and the command word in bold.
6. `## Answers and marking guidance` (final section, required): one `### CRQ n` per question,
   each a points-based rubric (criteria, marks per criterion, what a full-mark answer contains).
   This is the only place where answer and marking language is allowed (check:no-answer-keys
   bounded exception).

## Practice page (`practice.mdx`)

Front matter: `title`, `description`, `page_kind: practice`, `heading`, `translation_status`,
`sidebar_position: 99`. Body:

- `## Practice questions`, with at least 5 `### CRQ n` items (15 marks each), drawn across the
  heading's objectives and mixing command words, plus exactly 1 `### ERQ 1` item: a case study of
  about 250 words set in a Sindh school, worth 100 marks with 4-6 parts. This is the format of
  source S2 (the 2024 sample paper).
- `## Answers and marking guidance` (final section), with a `### CRQ n` rubric per CRQ and a
  `### ERQ 1` rubric with per-part marks.

## Urdu mirror

Same file name under the Urdu base. It must have the same `page_kind`, `heading`,
`objective_id`, `coverage` and `degree_links` paths (the labels are translated), the same CRQ/ERQ
counts, and a final `## Answers and marking guidance`.

Translate every heading into Urdu **except** these literal gate markers, which stay exactly as
written: `## Practice questions`, `## Answers and marking guidance`, `### CRQ n`, `### ERQ 1`.
Add an Urdu label after the marker on the same line if wanted, e.g.
`### CRQ 1 - تعمیری جوابی سوال`. `## What the test asks` is checked on English pages only, so it
is translated normally in Urdu.

Register: academic-plain Urdu bound to `specs/content/terminology.csv`, the same as the
translate-unit skill.

## Rules carried from the pipeline

- No em dash (U+2014), anywhere. Use a spaced hyphen.
- Art. II.3 sourcing: every claim is traceable to the 2025 HEC guide unit (`guide_ref`) or a
  cited source in `sources`. Invent nothing: no statistics, no policy clauses, no quotations.
- NPST, Pakistani policy and Sindh examples must come from a real, cited source.
