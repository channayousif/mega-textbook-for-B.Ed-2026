---
name: author-unit
description: >-
  Author or re-draft one course unit's five .mdx files to the Spec 007 content depth standard,
  then emit its coverage matrix and sources-consulted list. Use when asked to "author a unit",
  "draft unit content", "re-draft a unit to the depth standard", "write EFMP-xxx Unit N", or to
  bring a unit up to the content depth standard / v2.0 style guide. Produces gate-passing,
  concept-complete, HSC-register bilingual-ready English content grounded in real cited sources.
---

# author-unit

Turn one unit's approved content-spec subsection + its course guide into five deep,
gate-passing English `.mdx` files plus the governance artefacts the depth gate reads.

**Inputs you need before starting**

- `course_code` and `unit_no` (e.g. EFMP-302, Unit 1)
- `specs/content/<course-code>/content-spec.md` — the course's approved content-spec. The
  unit's `## Unit N` subsection MUST already carry a `### Sub-topic checklist` table and a
  `**Depth budget**` line (that is Spec 007 stage G1 / User Story 2 — not this skill's job).
- The course guide extract: `Scheme-and-Course-guides/extracted-text/<file>.txt`, the block
  for this course/unit.
- `references/depth-standard.md` (the rules), `references/pedagogy-checklist.md` (how to make
  it land), `references/citation-and-register.md` (citation form + register).

**Out of scope**: quiz items and answer keys — those stay in Spec 006's git-ignored
`.staging/` worksheets, never in committed files.

---

## Step 1 — Gather sources

1. Read the guide's unit block **verbatim**. List every leaf sub-topic; confirm it matches the
   `### Sub-topic checklist` IDs in the content-spec. If the guide says something the checklist
   misses, stop and flag it to the curriculum owner — the checklist is the authoritative list
   and fixing it is a G1 review action, not something to paper over here.
2. For each `**Mapped readings**` key, get the reference from the content-spec `## Reading
   list`. For anything you need to quote a fact/claim from and don't have: use `WebSearch` /
   `WebFetch` to find a **topically-related** open-access source (UNESCO, OECD, ERIC, a
   government standards document, an established open textbook). Verify the title, authors,
   year, and DOI/URL resolve. **Never invent a citation, DOI, or quotation.**
3. If a sub-topic has no mapped reading and no topically-related open-access source you can
   verify: cover it from the guide text + general knowledge, and note it for a
   `no-external-source` row in the sources list + a `specs/gaps.md` escalation.
4. Keep a running list: `{key, full citation, url/doi, what it supports, kind}` — this becomes
   `sources/unit-NN.md`.

## Step 2 — Design backward (Understanding by Design)

1. From the unit's CLO/SLO refs, write 2–4 **enduring understandings** (what a learner should
   still grasp a year later).
2. Decide the **assessment evidence**: what the formative set (≥ 5 numbered items,
   Remember → Understand → Apply) and the summative item (rubric + ≥ 1 Analyze-or-higher) will
   ask, so they actually test the understandings.
3. Build a small **Bloom alignment table**: sub-topic → target Bloom level → where it is
   taught → where it is assessed. Every checklist sub-topic must appear.
4. Group sub-topics into subsections. One named subsection per sub-topic is the default;
   grouping two or three tightly-related ones under a single heading is allowed **only if the
   coverage matrix still maps each ID to that heading**.

## Step 3 — Draft the five files

Fold per the Spec 006 FR-004 mapping. Apply `references/pedagogy-checklist.md` throughout.

- **`index.mdx`** — the exposition. A named `##`/`###` subsection for (almost) every checklist
  sub-topic. ~one concrete Pakistan-grounded example per sub-topic (Art. III.4). Paraphrase
  and cite the mapped/substitute sources inline. **Required blocks**: `## Common
  misconceptions` (the real ones learners hold) and `## Further reading` (real citations).
  Define each technical term on first use; add a `glossary.json` entry if it's new.
- **`activities.mdx`** — 2–3 activities that make the harder sub-topics active; Pakistan
  classroom contexts; wire in retrieval practice.
- **`formative.mdx`** — **≥ 5 items as a top-level numbered list** (`1.`, `2.`, …),
  Remember → Understand → Apply. This is what the gate counts.
- **`summative.mdx`** — a rubric plus at least one Analyze-or-higher item.
- **`teacher-notes.mdx`** — teaching strategies (drawn from the course description's named
  pedagogy) + a "Practical work" block. No assessment items here.

Recompute `est_reading_minutes` for each file from its final word count (~180–200 wpm for this
register). The **sum across the five** must land inside the content-spec `**Depth budget**`
`A–B` band.

Register: **plain English for a fresh HSC/intermediate graduate (Art. III.1)**. Deeper
concepts, not harder words. See `references/citation-and-register.md`.

## Step 4 — Self-review, then emit the artefacts

Run the checklist in `references/depth-standard.md`. Then write:

- **`specs/content/<course-code>/coverage/unit-NN.md`** — per `contracts/coverage-matrix.md`:
  `| Sub-topic ID | File | Section | Source |`, one row per checklist ID (more if a sub-topic
  is covered in several places), `Section` = the exact heading text, `Source` = a key from the
  sources list.
- **`specs/content/<course-code>/sources/unit-NN.md`** — per `contracts/sources-consulted.md`:
  `| Key | Citation | URL/DOI | Supports | Kind |`. Every key cited in the coverage matrix
  appears here; no unused non-`no-external-source` keys.

Then run `npm run check:depth-gate` and `npm run check:no-answer-keys`; fix any finding. A
green depth gate is structural only — the curriculum owner's Content-gate pass (traceability,
register, example aptness, source relevance) is the real acceptance.

## If this is a re-draft of an already-reviewed unit

The English re-draft invalidates the reviewed Urdu mirror. After Step 4:

- set `translation_status: reviewed` → `draft` on all five UR files in
  `i18n/ur/docusaurus-plugin-content-docs/current/…/unit-NN/`, and match the
  `<TranslationStatusBadge>` prop in the UR `index.mdx`;
- append `| Unit N | G4 ur-translation | ▢ |  |  |` and `| Unit N | G5 ur-review | ▢ |  |  |`
  rows to the course `tasks.md`;
- the `ur` route falls back to English behind Spec 001 FR-003's "translation in progress"
  banner until the downstream G4/G5 re-review — that is expected, not a parity breach.
