# Contract: Figure Markers & Manifest

**Marker location**: inline in each `docs/semester-N/<course>/unit-NN/topic-NN.mdx`
**Manifest file**: `specs/content/<course-code>/figures/unit-NN.md` (`NN` = zero-padded unit number)
**Read by**: `scripts/check-figures.mjs` (FR-012–014)
**Renders**: never — markers are MDX comments.

## Marker grammar

```
{/* FIGURE[<id>]: <prompt>; alt: <alt> */}
```

Extraction regex (global):

```
/\{\/\*\s*FIGURE\[(fig-U\d+-\d+)\]:\s*([\s\S]+?);\s*alt:\s*([\s\S]+?)\s*\*\/\}/g
```

| Part | Rule |
|---|---|
| `<id>` | matches `^fig-U(\d+)-(\d+)$`. The `U<n>` group MUST equal the unit-folder number. `<seq>` is a unit-scoped integer, unique within the unit (not per topic). |
| `<prompt>` | ≥ 10 non-space characters. A concrete image-generation instruction (subject, style — "clean flat vector, labelled, high contrast, no colour-only meaning" — aspect). |
| `<alt>` | non-empty. The accessible description that will become the image's `alt` text (Constitution Art. III.8). |

A marker is normally placed in `## A real classroom situation` or `## Explanation`. At least one
marker per `topic-*.mdx` (FR-014).

## Manifest table

```markdown
| Figure ID | Topic | Prompt | Alt text | Status |
|---|---|---|---|---|
| fig-U1-1 | 1.1 | clean flat vector comparison table, three columns … | Table comparing a teacher, a shopkeeper and a doctor against the four features of a profession. | prompt-only |
| fig-U1-2 | 1.2 | two-panel split illustration: same lesson taught "industrial" vs "inquiry" … | Two classroom scenes side by side: rows of silent pupils copying; pupils in groups discussing. | prompt-only |
```

| Column | Rule |
|---|---|
| `Figure ID` | a marker `<id>`; matches `^fig-U\d+-\d+$`; unique in the table. |
| `Topic` | the `topic_label` of the `topic-*.mdx` file the marker sits in (e.g. `1.2`). |
| `Prompt` | equals the marker's `<prompt>` (whitespace-normalised). *Authoring rule; the `check-figures.mjs` gate does not byte-compare these — see the gate table below. The human Content gate checks they match.* |
| `Alt text` | equals the marker's `<alt>` (whitespace-normalised). *Same: authoring rule, not automated.* |
| `Status` | one of `prompt-only` \| `generated` \| `placed`. **All rows are `prompt-only` in this feature** — nothing is generated or placed yet. |

Parser tolerance: leading/trailing `|` required, cells trimmed, `|---|` separator row skipped, a row
with fewer than 5 cells ignored, a header row (`Figure ID` in cell 0) skipped.

## Gate rules (`scripts/check-figures.mjs`)

Runs for new-shape units only (has `topic-*.mdx`). Legacy units → skipped, exit 0.

| Check | Failure message names… |
|---|---|
| every `topic-*.mdx` has ≥ 1 marker | the topic file with no marker |
| every `<id>` matches `^fig-U<folderUnitNo>-\d+$` | the malformed / wrong-unit ID and its file |
| `<id>` unique within the unit | the duplicated ID and both files |
| `<prompt>` ≥ 10 non-space chars; `<alt>` non-empty | the offending ID |
| manifest file `specs/content/<course>/figures/unit-NN.md` exists | the missing path |
| marker-ID set **==** manifest-ID set (both directions) | the ID present on only one side |
| each manifest row's `Topic` **==** the `topic_label` of the file its marker sits in | the mismatched ID |
| no blank cell; `Status` in enum | the offending row |
| **bilingual, `translation_status: reviewed`**: UR `topic-*.mdx` carry the same marker IDs as EN | the ID missing from the UR side |

`draft` units skip the bilingual check. The manifest is **English-only** — there is no separate Urdu
manifest (markers are comments, outside heading-vector parity, so the ID check is the parity
mechanism).

## Not checked by the gate

Whether the prompt would actually produce a useful teaching aid; whether the alt text is a good
description; whether a figure is needed at that exact spot. Human Content gate.

## Lifecycle note

A later, out-of-scope image pass will generate images from the prompts, drop the files under
`static/`, replace each marker with a real `<img>` / `<figure>`, and flip the manifest `Status` to
`generated` then `placed`. Spec 008 stops at `prompt-only`.
