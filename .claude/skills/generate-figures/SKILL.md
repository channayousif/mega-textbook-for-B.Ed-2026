---
name: generate-figures
description: >-
  Render a unit's Spec 008 figure prompt-markers into committed, accessible, lazy-loaded images
  that show on the page in both locales (Spec 009). For each `{/* FIGURE[...] */}` marker:
  classify it as a diagram (hand-authored self-contained SVG) or an illustration (a complete
  prompt-only handoff to Codex under ADR-0024). Optimise and place each SVG figure, replace its
  marker with a `<Figure>` element, mirror it into the Urdu topic file with a translated-label
  `.ur.svg`, and move its manifest row through `prompt-only → generated → placed`. Leave each
  raster marker and row ready for Codex,
  and run the gate set. Use when asked to "generate figures", "render the figure markers",
  "create the images for <course> unit N", "turn the figure prompts into images", or to bring a
  unit's figures up to the Spec 009 rendered state.
---

# generate-figures

Process one unit's `{/* FIGURE[fig-U<n>-<seq>]: <prompt>; alt: <alt> */}` comment markers - planned
by `author-unit` (Spec 008) and tracked in `specs/content/<course>/figures/unit-NN.md` at
`Status: prompt-only` - into rendered SVG schematics or complete Codex raster handoffs:

- For a schematic: a committed SVG under `static/img/figures/<course-lowercase>/unit-NN/`, the
  marker replaced by `<Figure>`, the translated Urdu SVG and a `Status: placed` manifest row.
- For an illustration: a complete brief for Codex while the marker and `Status: prompt-only` row
  remain unchanged.

**One skill, no sub-agent.** The classify → author SVG or prepare raster handoff → place SVG →
mirror SVG → flip SVG status → run-gates loop stays in the main session. Raster generation is a
separate Codex responsibility under ADR-0024, not a Claude sub-agent task.

**Boundary.** `author-unit` writes the markers + a `prompt-only` manifest and stops there. This
skill renders them. This is the "later, out-of-scope image pass" the Spec 008
`figures-manifest.md` Lifecycle note reserved. Do **not** author or restructure unit prose here.

**Inputs you need before starting**

- `course_code` and `unit_no` (e.g. EFMP-302, Unit 1).
- The unit's `docs/semester-N/<course>/unit-NN/topic-*.mdx` with `{/* FIGURE[...] */}` markers,
  and its manifest `specs/content/<course-lowercase>/figures/unit-NN.md` (all rows `prompt-only`,
  or a mix if rendering incrementally).
- References: `references/svg-authoring.md` (the diagram archetypes + the SVG boilerplate),
  `references/raster-codex-handoff.md` (the required Codex raster handoff),
  `references/placement.md` (marker → `<Figure>` + the manifest v2 row + the Status lifecycle),
  `references/bilingual-figures.md` (`.ur.svg` + the UR mirror + draft-vs-reviewed gate posture).
- Contracts: `specs/009-figure-rendering/contracts/figure-manifest-v2.md` and
  `specs/009-figure-rendering/contracts/figure-component.md`.

**Out of scope**: changing unit prose, headings, activities or assessment items; adding new
figure markers (that is `author-unit`); `srcset`/`<picture>`/a lightbox/an image CDN; rendering
figures for a unit that has no per-topic markers yet.

---

## Step 1 - Read the markers, classify each figure

1. List every `{/* FIGURE[...] */}` marker across the unit's `topic-*.mdx`. For each, record:
   `id`, the carrier `topic-NN.mdx` and its `topic_label`, the `prompt` (verbatim,
   whitespace-normalised), the `alt` (verbatim, whitespace-normalised).
2. Cross-check against `specs/content/<course-lowercase>/figures/unit-NN.md` - the marker-id set
   and the manifest-id set MUST already match both ways. If they don't, stop: the manifest is an
   `author-unit` artefact; fixing it is a G1/Spec 008 action, not this skill's job.
3. **Classify the `Kind` archetype for each figure**:

<!-- BEGIN GENERATED figure-kinds -->
`table`, `concept-map`, `flowchart`, `timeline`, `diagram`, `illustration`
<!-- END GENERATED figure-kinds -->

   (Spec 012;
   `references/svg-authoring.md` §"Diagram or illustration"). The content-spec `**Figure plan**`
   usually already names it - carry that through unless it is plainly wrong.
   - **Schematics** (hand-authored SVG): `table` (comparison / matrix), `concept-map`
     (node-and-arrow web of related ideas), `flowchart` (decision / process flow), `timeline`
     (ordered sequence along time), `diagram` (any other schematic - triangle / Venn / cycle /
     quadrant / annotated cross-section / a two-panel contrast). Anything whose meaning is
     **shape + label**.
   - `illustration` - a scene that needs pictorial depth: people, a classroom, a place, a
     photograph-like image. Rare in a textbook figure set.
   - A prompt that says "clean flat vector" is a schematic, even if it depicts a scene
     (e.g. a two-panel "industrial vs inquiry" classroom drawn as flat labelled panels →
     `diagram`).
   - Spec 012 / Constitution III.10: the unit needs **≥ 1 `concept-map` / `flowchart` /
     `timeline`**. If the plan has none, that is an `author-unit` gap - stop and flag it.
4. Read `specs/content/<course-lowercase>/figures/unit-NN.brief.md` if it exists - it lists
   illustration figures whose rasters the owner was asked to drop into `figures/.staging/`.

## Step 2 - Schematics: author a self-contained SVG

Per `references/svg-authoring.md`, for each schematic figure (`Kind` ∈ `{table, concept-map,
flowchart, timeline, diagram}`):

1. Pick the closest archetype; lay out the shapes and labels to match the marker `prompt`.
2. Use the boilerplate: `viewBox`, `role="img"`, `<title>` = the alt's first clause, `<desc>` =
   the full alt, an inline `<style>` opening with the published `:root` token block pasted
   verbatim, then `var(--token)` everywhere, a system-font `font-family` stack, and one
   `aria-hidden` wordmark. Write the **light** file only - the dark twin is derived by
   `npm run figures:variants`, never authored. **No** external font, **no** external image,
   **no** raster `<image>`. Meaning via shape + label, never colour alone.
3. Write it to `static/img/figures/<course-lowercase>/unit-NN/<figId>.svg`.
4. Optimise + budget-check:
   ```
   npm run optimize:figure -- --svg static/img/figures/<course>/unit-NN/<figId>.svg \
     static/img/figures/<course>/unit-NN/<figId>.svg
   ```
   It strips comments/whitespace and **hard-fails if the result is > 20 KB**. If it fails,
   simplify the SVG (fewer nodes, shorter labels) - do not raise the budget.
5. Self-check: open the file mentally in both themes - every label legible on both grounds; the
   `<title>` present; no colour-only distinction; labels in the unit's plain register.

## Step 3 - Illustrations: prepare the Codex handoff

Per `references/raster-codex-handoff.md`, for each `Kind: illustration` figure:

1. Do not invoke an image generator, fetch generated image bytes, edit a raster, run raster
   optimisation, place the raster, or advance its status. Those actions belong to Codex.
2. Verify that the marker and manifest contain the exact figure ID, topic, complete generation
   prompt and accessible alt text. Add an aspect hint and the exact target `.webp` path to
   `specs/content/<course-lowercase>/figures/unit-NN.brief.md`.
3. Leave the marker in the topic file, leave `Src` blank and keep `Status: prompt-only`.
4. Report the handoff to the owner as ready for Codex. Continue rendering every schematic figure
   in the same run. If a raw raster is already staged, leave it untouched and report its path to
   Codex.

## Step 4 - Place schematics: marker → `<Figure>`, manifest row → v2

Per `references/placement.md`, for each schematic asset authored in this Claude run:

1. In the EN `topic-NN.mdx`, **replace** the whole `{/* FIGURE[id]: … */}` comment, at the same
   position, with a single line:
   ```mdx
   <Figure id="<id>" src="/img/figures/<course-lowercase>/unit-NN/<figId>.<ext>" alt="<the marker's alt, verbatim, whitespace-normalised>" />
   ```
   The comment is **not** kept. `<Figure>` is registered globally - no import line needed.
2. Rewrite the manifest to the v2/v3 columns if it is still v1:
   `| Figure ID | Topic | Kind | Prompt | Alt text | Src | Status |`. For this figure's row set
   `Kind` (one of `table` \| `concept-map` \| `flowchart` \| `timeline` \| `diagram`), `Src`
   (`/img/figures/…`), and `Status: placed`. `Prompt` and
   `Alt text` stay verbatim from the marker. A figure whose asset does not yet exist stays
   `prompt-only` (`Src` blank; `Kind` blank or its planned archetype).
3. Update the manifest's header prose to point at
   `specs/009-figure-rendering/contracts/figure-manifest-v2.md`.

## Step 5 - Mirror into Urdu

Per `references/bilingual-figures.md`:

- **Any schematic `Kind`** (`table` / `concept-map` / `flowchart` / `timeline` / `diagram`) -
  copy `<figId>.svg` → `<figId>.ur.svg`; translate every **visible** label to Urdu; set
  `text-anchor` / `direction: rtl` for the Urdu text; use the Nastaliq-first font stack.
  Optimise it (`--svg`, ≤ 20 KB). In the UR `topic-NN.mdx`, replace the marker with
  `<Figure id="<id>" src="/img/figures/<course>/unit-NN/<figId>.ur.svg" alt="<Urdu alt>" />`.
- `Kind: illustration` - Codex reuses the one `<figId>.webp` and places the Urdu `<Figure>` with
  translated alt text as part of the raster handoff. Claude leaves its marker untouched.
- **Gate posture**: if the EN `index.mdx` is `translation_status: reviewed`, the `.ur.svg` and the
  UR `<Figure>` are gate-enforced. If it is `draft` (a skeleton-stub UR mirror), author and wire
  them anyway - it is not gate-blocked, matching Spec 008's UR marker-ID parity posture.

## Step 6 - Run the gates, then build

Run, and fix every finding before reporting done:

<!-- BEGIN GENERATED gate-commands -->
```bash
# after every edit (fast)
npm run check:content

# before opening a PR (adds check:add-course, tests and a full build)
npm run check:all
```

`check:content` runs, in order: `validate:content` -> `check:pipeline-gate` -> `check:depth-gate` -> `check:figures` -> `check:no-em-dash` -> `check:no-answer-keys` -> `check:concept-graph` -> `check:bloom-bands` -> `check:source-floor` -> `check:content-status` -> `check:docs-sync`.
<!-- END GENERATED gate-commands -->

Then a full build to confirm the pages render:

```
npm run build
```

`check:figures` for a unit still entirely at `prompt-only` takes the exact Spec 008 code path -
a regression there means the placement/manifest edit is wrong, not the gate. A green
`check:figures` is **structural** (carrier present, asset exists, `Kind` in enum, ids consistent);
whether the diagram actually communicates the concept and whether the Urdu labels read well is
the human Content gate.

## Incremental rendering

A unit may hold a mix of statuses - render `fig-U1-1` and `fig-U1-3` now, leave `fig-U1-2` at
`prompt-only` until its raster arrives. The gate accepts the mix. A row must never silently
regress from `placed`.
