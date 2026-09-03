# Placement - marker → `<Figure>`, manifest row → v2 (generate-figures)

Once a figure's asset exists under `static/img/figures/<course-lowercase>/unit-NN/`, wire it in.

## 1. Replace the comment marker in the EN topic file

Find the whole marker in `docs/semester-N/<course>/unit-NN/topic-NN.mdx`:

```mdx
{/* FIGURE[fig-U1-1]: clean flat vector comparison table … ; alt: Table comparing a teacher,
a shopkeeper and a doctor against the four features of a profession - the teacher and the
doctor meet all four, the shopkeeper meets none. */}
```

**Replace it entirely** - the comment is not kept - at the same position with one line:

```mdx
<Figure id="fig-U1-1" src="/img/figures/efmp-302/unit-01/fig-U1-1.svg" alt="Table comparing a teacher, a shopkeeper and a doctor against the four features of a profession - the teacher and the doctor meet all four, the shopkeeper meets none." />
```

Rules (contract: `specs/009-figure-rendering/contracts/figure-component.md`):

- `id` **==** the marker id **==** the manifest `Figure ID`. Pattern `^fig-U\d+-\d+$`.
- `alt` **==** the marker's alt text, **verbatim**, whitespace-normalised (collapse newlines +
  runs of spaces to single spaces; trim). The gate compares the `<Figure alt>` to the manifest
  `Alt text`.
- `src` **==** the manifest `Src` - a **root-absolute** site path
  `/img/figures/<course-lowercase>/unit-NN/<figId>.<ext>`. No `import`, no relative path, no
  external URL. `.svg` for a diagram, `.webp` for an illustration.
- `<Figure>` is registered globally in `src/theme/MDXComponents.tsx` - **no import line** in the
  topic file.
- Keep it on its own line, where the marker was (normally under `## A real classroom situation`
  or early in `## Explanation`).
- `caption` and `kind` props are optional; omit unless you need a visible "Figure 1.1" label or a
  credit (`caption`) or the `figure--diagram` / `figure--illustration` class hook (`kind`).

## 2. Move the manifest row to v2 / `placed`

`specs/content/<course-lowercase>/figures/unit-NN.md`. If it is still the 5-column Spec 008
shape, rewrite the whole table header + rows to v2:

```markdown
| Figure ID | Topic | Kind | Prompt | Alt text | Src | Status |
|---|---|---|---|---|---|---|
| fig-U1-1 | 1.1 | diagram | clean flat vector comparison table … | Table comparing … | /img/figures/efmp-302/unit-01/fig-U1-1.svg | placed |
```

| Column | On `placed` |
|---|---|
| `Figure ID` | unchanged; `^fig-U\d+-\d+$`, unique, `U<n>` == unit-folder number |
| `Topic` | unchanged; the `topic_label` of the carrier `topic-NN.mdx` |
| `Kind` | `diagram` or `illustration` - must match the asset extension (`.svg` / `.webp`) |
| `Prompt` | **verbatim from the marker**, whitespace-normalised (retained for regeneration + the human gate) |
| `Alt text` | verbatim from the marker; SHOULD equal the `<Figure alt>` |
| `Src` | `/img/figures/<course-lowercase>/unit-NN/<figId>.<ext>` - the same string as `<Figure src>` |
| `Status` | `placed` |

Also update the manifest's header prose to reference
`specs/009-figure-rendering/contracts/figure-manifest-v2.md` (it supersedes the Spec 008
`figures-manifest.md` for any unit whose figures have begun rendering).

## 3. The `Status` lifecycle

| Status | Topic file has | Asset | Manifest `Kind`/`Src` |
|---|---|---|---|
| `prompt-only` | the `{/* FIGURE[...] */}` comment | none | both **blank** |
| `generated` | still the comment | `<figId>.<ext>` exists (in `static/` or `.staging/`) | both set |
| `placed` | `<Figure id=… src=… alt=… />` (comment removed) | `<figId>.<ext>` committed under `static/` | both set |

- A row may hold at any stage; a unit may be a **mix** (incremental rendering).
- A row must **never silently regress** from `placed`. If you have to pull a figure, that is a
  deliberate manifest + topic-file edit, called out in the PR.
- `generated` is a transient state - use it only if you have the asset but are deferring the
  topic-file edit. Normally go straight `prompt-only → placed` in one pass.

## 4. Re-run the gate set

```
npm run validate:content && npm run check:figures && npm run check:no-answer-keys && npm test && npm run build
```

`check:figures` failures name the unit + the exact condition. Common ones:

- *"placed but … still carries the comment marker"* - step 1 not done for that id.
- *"placed but its Src file does not exist"* - `Src` path typo, or the asset isn't under
  `static/` (check the leading `/img/…` maps to `static/img/…`).
- *"Kind … not in {diagram, illustration}"* - blank or misspelled `Kind` cell.
- *"manifest Topic … != topic_label"* - the `Topic` cell doesn't match the carrier file's
  front-matter `topic_label`.
- *"prompt-only but its Src/Kind cell is not blank"* - a half-filled row; either finish placing
  it or blank the cells.

## Incremental-unit rule

Rendering `fig-U1-1` and `fig-U1-3` while `fig-U1-2` waits on a raster is fine: place the two,
leave `fig-U1-2` at `prompt-only` with its marker intact and blank `Kind`/`Src`. The gate checks
each row against its own `Status`.
