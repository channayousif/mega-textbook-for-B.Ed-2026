# Figure markers & prompts (author-unit)

Teaching figures are planned now as **inline MDX comments** and tracked in a per-unit manifest.
**Nothing renders yet** - the `generate-figures` skill (Spec 009) is the separate rendering pass:
it classifies each marker (`diagram` → hand-authored SVG / `illustration` → Hugging Face MCP
raster), optimises the asset, **replaces** the marker with a `<Figure>` element, mirrors it into
the Urdu topic file, and moves the manifest row `prompt-only → generated → placed`. That is
**not this skill's job** - author-unit stops at one good marker per topic + a matching
`Status: prompt-only` manifest row. (Full contract:
`specs/009-figure-rendering/contracts/figure-manifest-v2.md`.)

## Marker grammar

```
{/* FIGURE[fig-U<unitNo>-<seq>]: <generation prompt>; alt: <alt text> */}
```

- Placed in `## A real classroom situation` or early in `## Explanation`.
- **≥ 1 marker per `topic-NN.mdx`** (FR-014). More is fine.
- It is an MDX comment - it never renders. Keep it on its own line(s).

## The id - `fig-U<n>-<seq>`

- Matches `^fig-U\d+-\d+$`. `<n>` **==** the unit-folder number (`unit-01` → `fig-U1-…`).
- `<seq>` is **unit-scoped** and unique across the whole unit - not per topic. Topic 1 →
  `fig-U1-1`, Topic 2 → `fig-U1-2`, … A second figure in Topic 1 would be `fig-U1-5` if the
  unit already has 4.
- The content-spec `**Figure plan**` line pre-assigns the ids - use those.

## Writing the prompt (`<prompt>`, ≥ 10 non-space chars)

A concrete image-generation instruction, in this order:

1. **Subject** - exactly what the figure shows. Prefer the topic's contrast pair: "comparison
   table, three columns (government-school teacher, shopkeeper, doctor) × four rows (specialised
   knowledge, formal training, code of conduct, public accountability), ticks and crosses".
2. **Style** - always: `clean flat vector, labelled, high contrast, no colour-only meaning`.
3. **Aspect** - `landscape` / `portrait` / `square` as fits a handout.

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

One table, one row per marker:

```markdown
| Figure ID | Topic | Prompt | Alt text | Status |
|---|---|---|---|---|
| fig-U1-1 | 1.1 | clean flat vector comparison table, three columns … | Table comparing a teacher, a shopkeeper and a doctor against the four features of a profession. | prompt-only |
```

- `Topic` = the **`topic_label`** of the topic file the marker sits in (`1.1`, not
  `topic-01.mdx`).
- `Prompt` / `Alt text` = the marker's, whitespace-normalised (the gate compares them).
- `Status` = **`prompt-only`** for every row in this feature.
- Marker-id set **==** manifest-id set, both directions. No blank cells.

## Bilingual

The manifest is **English-only**. For a `translation_status: reviewed` bilingual unit, the UR
`topic-*.mdx` files must carry the **same marker ids** (comments sit outside heading-vector
parity, so the id match is the parity mechanism). For a `draft` re-restructure, add the same
marker ids to the UR skeleton stubs anyway - it saves the downstream translator a step.
