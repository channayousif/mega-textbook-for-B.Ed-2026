# Depth standard (authoring aid)

> This is the authoring aid for the `author-unit` skill. The **human reference** is the
> `## Unit depth standard` + `## What the depth gate checks…` sections of
> `specs/content/style-guide.md`. **Keep the two in sync** — when either changes, update the
> other in the same branch, and bump `style-guide.md`'s `version`.

Draft to this standard, then self-check against it before emitting the coverage matrix.

## Hard rules (the CI gate enforces these — `scripts/check-unit-depth.mjs`)

1. **Concept coverage.** Every row in the unit's `### Sub-topic checklist`
   (`specs/content/<course>/content-spec.md`, `## Unit N` subsection) gets its **own named
   subsection** in the file it folds into (FR-004 mapping). Grouping is allowed only if the
   coverage matrix still maps each sub-topic ID individually.
2. **Required blocks.** `index.mdx` has **both** `## Common misconceptions` and
   `## Further reading` (real citations). Missing either → gate fails.
3. **Formative floor.** `formative.mdx` has **≥ 5 items as a top-level numbered list**
   (`1.`, `2.`, …). Summative keeps a rubric + ≥ 1 Analyze-or-higher item.
4. **Reading-minutes band.** Sum of the five EN files' `est_reading_minutes` must fall in the
   `**Depth budget**` `A–B` range. Recompute each file's `est_reading_minutes` after drafting
   (~180–200 wpm for this register).
5. **Coverage ↔ sources consistency.** Every `Source` key in `coverage/unit-NN.md` exists in
   `sources/unit-NN.md`; every non-`no-external-source` key in the sources list is used.

## Soft rules (the human Content gate judges these — do not pad to pass)

- **Length is precise, not padded.** No word floor. Say what the concept needs and stop.
- **~One Pakistan-grounded example per sub-topic** (Art. III.4) — concrete, classroom-real,
  not an anthology.
- **Register unchanged (Art. III.1).** Deeper *concepts*, not harder *words*. New technical
  term → add a `glossary.json` entry; never reach for graduate vocabulary to signal depth.

## Scholarly engagement

- Paraphrase-and-cite the readings under `**Mapped readings**` in the content-spec subsection
  (keys resolve in `## Reading list`).
- If a mapped reading is unavailable: use `WebSearch` / `WebFetch` to find a
  **topically-related** open-access source (UNESCO, OECD, ERIC, government standards docs,
  established open textbooks). Record its exact URL/DOI. An off-topic substitute is rejected
  at the Content gate.
- If nothing can be found for a sub-topic: cover it from the guide text + general knowledge,
  add a `no-external-source` row to `sources/unit-NN.md`, and log the gap in `specs/gaps.md`.
- **Never fabricate a citation, DOI, or quote.**

## Self-check before emitting `coverage/unit-NN.md`

- [ ] Every checklist ID → a real `## …` heading in one of the five files
- [ ] `## Common misconceptions` + `## Further reading` both in `index.mdx`
- [ ] `formative.mdx` ≥ 5 numbered items; `summative.mdx` rubric + ≥ 1 Analyze+
- [ ] `est_reading_minutes` recomputed on all five files; unit total within the budget band
- [ ] every coverage `Source` has a `sources/unit-NN.md` row; no orphan source keys
- [ ] register spot-check: no undefined graduate-level term
