# Figure markers & prompts (author-unit)

Teaching figures are planned now as **inline MDX comments** and tracked in a per-unit manifest.
**Nothing renders yet** - the `generate-figures` skill (Spec 009) is the separate rendering pass:
it classifies each marker by archetype and hand-authors the schematic ones as SVG. Under
ADR-0024, Claude leaves an `illustration` as a complete prompt-only handoff for Codex, which
generates, inspects, optimises and places the raster. The rendering workflow **replaces** the
marker with a `<Figure>` element, mirrors it into the Urdu topic file, and moves the manifest
row `prompt-only → generated → placed`. That is **not this skill's job** - author-unit stops at
**≥ 2 good markers per topic** (with a planned archetype each) + matching `Status: prompt-only`
manifest rows. (Full contract:
`specs/009-figure-rendering/contracts/figure-manifest-v2.md`.)

## Marker grammar

```
{/* FIGURE[fig-U<unitNo>-<seq>]: <generation prompt>; alt: <alt text> */}
```

- Placed in `## A real classroom situation` or early in `## Explanation`.
- **≥ 2 markers per `topic-NN.mdx`** (Constitution Art. III.10), and **≥ 1 `concept-map` /
  `flowchart` / `timeline` across the unit**. Plan two to three per topic; a visual is worth a
  thousand words - reach for a figure whenever the prose describes a process, a sequence, a set
  of relationships, or a comparison.
- It is an MDX comment - it never renders. Keep it on its own line(s).

## The id - `fig-U<n>-<seq>`

- Matches `^fig-U\d+-\d+$`. `<n>` **==** the unit-folder number (`unit-01` → `fig-U1-…`).
- `<seq>` is **unit-scoped** and unique across the whole unit - not per topic. With ≥ 2 per
  topic a four-topic unit runs `fig-U1-1`..`fig-U1-8` (topic 1 → `fig-U1-1`, `fig-U1-2`; topic
  2 → `fig-U1-3`, `fig-U1-4`; …).
- The content-spec `**Figure plan**` pre-assigns the ids **and an archetype for each** - use those.

## Writing the prompt (`<prompt>`, ≥ 10 non-space chars)

A concrete image-generation instruction, in this order:

1. **Archetype** - one of `table` (comparison / matrix), `concept-map` (node-and-arrow web),
   `flowchart` (decision / process flow), `timeline` (ordered sequence along time), `diagram`
   (any other schematic - triangle, Venn, quadrant), `illustration` (a pictorial scene). Match
   it to the idea: a process → `flowchart`; how something changed over time → `timeline`; how
   ideas relate → `concept-map`; a head-to-head → `table`.
2. **Subject** - exactly what the figure shows. Prefer the topic's contrast pair: "comparison
   table, three columns (government-school teacher, shopkeeper, doctor) × four rows (specialised
   knowledge, formal training, code of conduct, public accountability), ticks and crosses".
3. **Style** - for schematics: `clean flat vector, labelled, high contrast, no colour-only
   meaning`. For an `illustration`, specify the medium, composition, cultural setting and
   teaching action; avoid readable text, logos and watermarks unless exact text is essential.
4. **Aspect** - `landscape` / `portrait` / `square` as fits a handout.

Good: `two-panel split illustration, landscape: left panel a row of silent pupils copying from
the board; right panel the same pupils in small groups with talk bubbles; label the panels
"industrial" and "inquiry"; clean flat vector, labelled, high contrast, no colour-only meaning`

Weak (rejected at the human gate): `a nice picture about teaching` - no subject, no teaching
job.

## Writing the alt text (`<alt>`, non-empty)

The accessible description that becomes the image `alt` (Constitution Art. III.8). Describe
**what the figure communicates**, not "an image of…". One or two sentences.

Good: `Table comparing a teacher, a shopkeeper and a doctor against the four features of a
profession; the teacher and doctor meet all four, the shopkeeper none.`

## The manifest - `specs/content/<course>/figures/unit-NN.md`

One table, one row per marker (**≥ 2 per topic**), on the v3 seven-column header:

```markdown
| Figure ID | Topic | Kind | Prompt | Alt text | Src | Status |
|---|---|---|---|---|---|---|
| fig-U1-1 | 1.1 | table | clean flat vector comparison table, three columns … | Table comparing a teacher, a shopkeeper and a doctor against the four features of a profession. |  | prompt-only |
| fig-U1-2 | 1.1 | concept-map | clean flat vector concept map linking "profession" to its four features and to occupation / vocation … | A concept map placing "profession" at the centre with its four features and the near-synonyms it is not. |  | prompt-only |
```

- `Topic` = the **`topic_label`** of the topic file the marker sits in (`1.1`, not
  `topic-01.mdx`).
- `Kind` = the planned archetype, one of:

<!-- BEGIN GENERATED figure-kinds -->
`table`, `concept-map`, `flowchart`, `timeline`, `diagram`, `illustration`
<!-- END GENERATED figure-kinds -->

  At least one row in the unit is `concept-map` / `flowchart` /
  `timeline` (Art. III.10).
- `Prompt` / `Alt text` = the marker's, whitespace-normalised (the gate compares them).
- `Src` blank; `Status` = **`prompt-only`** for every row in this feature.
- Marker-id set **==** manifest-id set, both directions. No blank cells except `Src`.

## Bilingual

The manifest is **English-only**. For a `translation_status: reviewed` bilingual unit, the UR
`topic-*.mdx` files must carry the **same marker ids** (comments sit outside heading-vector
parity, so the id match is the parity mechanism). For a `draft` re-restructure, add the same
marker ids to the UR skeleton stubs anyway - it saves the downstream translator a step.
