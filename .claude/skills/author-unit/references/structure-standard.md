# Unit structure standard (authoring aid)

> This is the authoring aid for the `author-unit` skill (Spec 008 per-topic layout). The
> **human reference** is the `## Unit structure standard` + `## Answers and marking guidance
> policy` + `## Figure markers and manifests` + `## What the depth gate checks vs. the human
> Content gate` sections of `specs/content/style-guide.md`. **Keep the two in sync** — when
> either changes, update the other in the same branch, and bump `style-guide.md`'s `version`.
>
> Legacy five-file units are governed by the `## Unit depth standard` (Spec 007) section of the
> style guide instead — unchanged, not covered here.

Draft to this standard, then self-check against it before emitting the coverage matrix.

## The shape

```
docs/semester-N/<course>/unit-NN/
├── index.mdx              # opening: outcomes / prerequisites / "In this unit" / how-to-use — NO exposition
├── topic-01.mdx … topic-NN.mdx   # one nine-part cycle each
├── unit-assessment.mdx    # ## Unit summary + 10/10/5 bank + final ## Answers and marking guidance
└── unit-teacher-notes.mdx # OPTIONAL — strategies + practical work, no assessment items
docs/semester-N/<course>/course-review.mdx   # OPTIONAL, course-level (not authored by this skill unless asked)
```

- `topic-NN.mdx` — zero-padded, contiguous from `01`. Front matter: unit schema **+**
  `topic_no` (== filename ordinal) **+** `topic_label` (the `### Topic list` label). No
  `sidebar_position` on any file except `course-review.mdx` (`900`).
- Opt-in: a unit is on this standard only when **both** `topic-*.mdx` files exist **and** the
  content-spec `## Unit N` subsection has a `### Topic list` table. Exactly one → loud
  depth-gate failure.

## The nine-part topic cycle — canonical `##` headings, checked for PRESENCE and ORDER

| # | Heading (exact) | Gate minimum |
|---|---|---|
| 1 | `## A real classroom situation` | — (a FIGURE marker usually sits here) |
| 2 | `## Explanation` | — (misconception named + corrected here) |
| 3 | `## Activity: <name>` | — (`## Activity:` is matched as a prefix) |
| 4 | `## Check your understanding` | ≥ **3** top-level numbered items (`1.`, `2.`, …) |
| 5 | `## Summary` | — |
| 6 | `## Self-assessment checklist` | ≥ **3** `- [ ]` items |
| 7 | `## Try this at your practicum school` | — |
| 8 | `## Summative task` | mini-rubric present; human gate wants ≥ 1 Analyze-or-higher |
| 9 | `## Further reading` | ≥ **1** citation/link line |

Other `##`/`###` headings MAY appear *between* the nine (e.g. `### …` under `## Explanation`),
but the nine themselves MUST be monotonically ordered. The gate names the first heading missing
or out of order **and** the topic file.

## Hard rules the CI gates enforce

**`scripts/check-unit-depth.mjs` (new-shape path):**

1. **Topic-file set** matches the `### Topic list` row count and is contiguous from `01`.
2. **Partition** — the `### Topic list` `Sub-topic IDs` cells are a **total, disjoint**
   partition of the `### Sub-topic checklist`. Any ID in zero or ≥ 2 topic rows → failure,
   naming the ID.
3. **Nine cycle headings, in order**, per topic file (§ above).
4. **Per-topic counts, scoped per section** (heading → next `##`/`###`): `## Check your
   understanding` ≥ 3 numbered; `## Self-assessment checklist` ≥ 3 `- [ ]`; `## Further
   reading` ≥ 1 non-blank line.
5. **`index.mdx`** has `## In this unit` whose item count **==** the number of topic files.
6. **`unit-assessment.mdx`**: `## Unit summary` present; `### Multiple-choice questions
   (MCQs)` / `### Restricted-response questions (RRQs)` / `### Extended-response questions
   (ERQs)` with **exactly 10 / 10 / 5** numbered items **counted per `###` band** (numbered
   lines under `## Answers and marking guidance` do **not** count); `## Answers and marking
   guidance` present, exactly one, and the file's **final `##` section**.
7. **Coverage matrix v2** (`coverage/unit-NN.md`): `File` ∈ the new-shape set; every checklist
   ID has a row; **every `topic-NN.mdx` named by ≥ 1 row**; for every checklist ID, ≥ 1 row
   names the exact `topic-NN.mdx` its `### Topic list` row assigns it to (hard failure
   otherwise, naming the ID + both files).
8. **Coverage ↔ sources** mutually consistent (every cited `Source` key is in
   `sources/unit-NN.md`; every non-`no-external-source` key is used).
9. **Reading-minutes** — `sum(est_reading_minutes)` across `index.mdx` + every `topic-*.mdx` +
   `unit-assessment.mdx` (+ `unit-teacher-notes.mdx`) ∈ the `**Depth budget**` `A–B` band.

**`scripts/check-figures.mjs`:** every `topic-*.mdx` has ≥ 1 FIGURE marker; ids match
`^fig-U<folderUnitNo>-\d+$` and are unique in the unit; prompt ≥ 10 non-space chars, alt
non-empty; `figures/unit-NN.md` exists; marker-id set **==** manifest-id set both ways; each
manifest row's `Topic` **==** the marker file's `topic_label`; `Status ∈ {prompt-only,
generated, placed}`; for `reviewed` bilingual units the UR topic files carry the same ids.

**`scripts/check-no-answer-keys.mjs`:** the prose patterns (`answer key`, `marking scheme`,
`correct answer`) are allowed **only** below one exact `## Answers and marking guidance`
heading in `unit-assessment.mdx` / `course-review.mdx`, only when it is the file's final `##`
section, only ≤ 1 per file. The four front-matter key patterns are forbidden **everywhere**,
including inside that section. See `references/answers-block-formatting.md`.

**`scripts/validate-content.mjs` (new-shape branch):** requires `index.mdx` + `unit-assessment.mdx`;
forbids `activities.mdx` / `formative.mdx` / `summative.mdx` / `teacher-notes.mdx` in a topic
folder; `topic_no` == filename ordinal and `topic_label` present on every topic file;
`course-review.mdx` front matter valid + `course_code` matches the folder; EN↔UR heading-vector
parity over the dynamic union of EN+UR unit-folder `.mdx` names when `translation_status:
reviewed`.

## Soft rules — the human Content gate judges these (do NOT pad to pass)

- **Length is precise, not padded.** No word floor. Say what the concept needs and stop.
- **~One Pakistan-grounded example per sub-topic** (Art. III.4) — concrete, classroom-real.
- **Register unchanged (Art. III.1).** Deeper *concepts*, not harder *words*. New term →
  `glossary.json` entry; never reach for graduate vocabulary to signal depth.
- **Worked example before performance** in `## Explanation`; genuine collaboration in
  `## Activity`; retrieval (not recognition) in `## Check your understanding`; real "can I …"
  statements in `## Self-assessment checklist`; the `## Summative task` and its rubric aligned;
  the real-life hook in `## A real classroom situation` actually lands.
- **Topic grouping** — the `### Topic list` partition groups sub-topics sensibly.

## Self-check before emitting `coverage/unit-NN.md`

- [ ] `index.mdx` has the four opening `##` sections and `## In this unit` lists every topic
- [ ] every `topic-NN.mdx` has all nine headings in order; `topic_no` / `topic_label` set
- [ ] per topic: `## Check your understanding` ≥ 3 numbered; `## Self-assessment checklist` ≥ 3;
      `## Further reading` ≥ 1; `## Summative task` has a rubric with ≥ 1 Analyze-or-higher
- [ ] each `topic-NN.mdx` has ≥ 1 well-formed unique `fig-U<n>-<seq>` marker with alt text
- [ ] `unit-assessment.mdx`: `## Unit summary`; **exactly 10 / 10 / 5** per band; every item
      Bloom-tagged; `## Answers and marking guidance` is the final `##` section, ≤ 1
- [ ] no answer-key front-matter key anywhere; prose answers only inside the bounded section
- [ ] `est_reading_minutes` recomputed on every file; unit sum within the `**Depth budget**` band
- [ ] `coverage/unit-NN.md`: every checklist ID mapped; every topic file referenced ≥ 1;
      each ID's coverage row(s) agree with its `### Topic list` topic assignment
- [ ] every coverage `Source` has a `sources/unit-NN.md` row; no orphan source keys
- [ ] `figures/unit-NN.md`: one row per marker; `Topic` == the marker file's `topic_label`;
      marker-set == manifest-set both ways; all `Status: prompt-only`
- [ ] register spot-check: no undefined graduate-level term
- [ ] re-restructure only: UR orphans deleted, UR skeleton stubs added with matching marker ids,
      `translation_status: draft`, `tasks.md` G2/G3 re-opened
