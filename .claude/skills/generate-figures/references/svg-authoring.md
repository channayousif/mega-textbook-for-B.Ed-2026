# SVG authoring — hand-authored diagram figures (generate-figures)

A `Kind: diagram` figure is a **self-contained SVG file** you write by hand and commit under
`static/img/figures/<course-lowercase>/unit-NN/<figId>.svg`. No dependency, no build step, no
external asset. It renders behind a plain `<img src="/img/…">` (the `<Figure>` component).

## Diagram or illustration?

| Choose `diagram` (SVG, this file) when the figure is… | Choose `illustration` (raster, `raster-hf-mcp.md`) when it… |
|---|---|
| a comparison table, matrix, or checklist grid | needs a photograph-like scene, a real place, faces |
| a relationship diagram — triangle, Venn, cycle, quadrant | needs texture, depth, lighting |
| a node-and-arrow web / concept map | cannot be carried by flat shapes + labels |
| a two-panel or side-by-side contrast | — |
| a left-to-right process flow, a timeline | — |
| an annotated cross-section or labelled schematic | — |

**Default to `diagram`.** A textbook figure set is overwhelmingly labelled schematics. A prompt
that says "clean flat vector, labelled" is a `diagram` even when it depicts a classroom scene —
draw it as flat labelled panels, not a raster. AI raster garbles label text, weighs 50–150 KB,
ignores dark mode, and can't be localised without a full re-generation.

## The boilerplate

Every diagram SVG starts from this shape:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 <W> <H>" role="img"
     aria-labelledby="t d" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif">
  <title id="t"><!-- the alt's first clause: what the figure is --></title>
  <desc id="d"><!-- the full marker alt text, verbatim --></desc>
  <style>
    :root { color-scheme: light dark; }
    .bg      { fill: #ffffff; }
    .ink     { fill: #1c1e21; }            /* text + solid fills */
    .stroke  { stroke: #1c1e21; stroke-width: 2; fill: none; }
    .muted   { fill: #6b7280; }
    .panel   { fill: #f4f5f7; stroke: #1c1e21; stroke-width: 2; }
    .yes     { fill: #1c1e21; }            /* tick glyph — dark, not green */
    text     { font-size: 15px; }
    .h       { font-size: 16px; font-weight: 700; }
    @media (prefers-color-scheme: dark) {
      .bg     { fill: #1b1b1d; }
      .ink    { fill: #e3e3e3; }
      .stroke { stroke: #e3e3e3; }
      .muted  { fill: #9aa0a6; }
      .panel  { fill: #2a2a2c; stroke: #e3e3e3; }
      .yes    { fill: #e3e3e3; }
    }
  </style>
  <rect class="bg" x="0" y="0" width="<W>" height="<H>"/>
  <!-- shapes + <text> here -->
</svg>
```

### Rules

- **`viewBox` only** — no `width`/`height` attributes on `<svg>`. `.figure--diagram img` caps the
  on-page width at 640 px; the SVG scales.
- **`role="img"` + `<title>` + `<desc>`** so the file is described even if opened standalone. The
  page-level description still comes from `<Figure alt>`.
- **System-font stack** — never `@import` or `<link>` a web font, never reference a font file. The
  reader's OS font renders the labels.
- **Theme via `@media (prefers-color-scheme: dark)`** inside the SVG's own `<style>`. It works
  behind an `<img>`. Always define both grounds. Test both mentally: is every label legible on
  `#ffffff` *and* `#1b1b1d`?
- **No colour-only meaning** (Constitution Art. III.8). A tick vs a cross is a *shape*
  difference (✓ / ✕ drawn as paths, or the words "yes"/"no"), never green-cell vs red-cell. If
  you use an accent fill, back it with a label or an icon.
- **Plain register** — the labels use the unit's own vocabulary, at the unit's reading level. No
  abbreviations the prose doesn't use.
- **Size ≤ 20 KB** after `npm run optimize:figure -- --svg`. Hand-authored flat SVGs land at
  2–8 KB; if you're near the limit you have too many nodes or over-long labels.
- **No `<script>`, no `<foreignObject>`, no external `<image>`/`<use href="http…">`.**

## The five archetypes

### 1. Comparison table / matrix

A grid: header row of column labels, left column of row labels, each body cell a **✓ or ✕ glyph
plus the word**. Draw the grid with `<line>`s; put `<text>` centred in each cell. Give the ticks
and crosses distinct *shapes* (a check path vs an X path) and a short word so the cell reads
without colour. Header cells `.h`.

Worked example — `fig-U1-1` (teacher / shopkeeper / doctor × four features of a profession):
3 data columns + 1 row-label column, 4 data rows + 1 header row. Each cell: a small ✓ or ✕ path
at x-centre, the word "yes"/"no" beneath it in `.muted`. Row labels wrap to two lines
(`<tspan x=… dy=…>`). ~5 KB.

### 2. Relationship diagram — triangle / Venn / cycle / quadrant

Three or four related ideas held in a shape. A triangle: `<polygon>` for the body, a `<text>` at
each vertex (`text-anchor` set per corner), an optional base bar (`<rect>`) with its own label, a
small caption in `.muted` below. A cycle: circles joined by curved arrows (`<path>` + a
`marker` arrowhead). Keep the shape geometric and the labels outside it where they don't collide.

Worked example — `fig-U1-3`: an upward triangle, vertices "accountability" / "autonomy" /
"collegiality"; a horizontal base bar under the whole triangle labelled "specialised knowledge
and training"; a `.muted` caption "held in balance".

### 3. Node-and-arrow web / concept map

A central node (`<ellipse>` or rounded `<rect>` with a `<text>` question inside it) and N outer
boxes (`.panel` rects with labels), each joined to the centre by a `<line>`/`<path>` ending in an
arrowhead `marker` **pointing at the centre** (influences flow in) or outward (consequences flow
out) — match the marker prompt. Space the outer boxes evenly around the centre.

Worked example — `fig-U1-4`: centre ellipse "who am I becoming as a teacher?"; six `.panel`
boxes ("my own schooling", "family and community", "national policy and standards", "beliefs
about how learning happens", "the pupils in front of me", "mentors and colleagues"); arrows
from each box into the centre.

### 4. Two-panel / side-by-side contrast

Two `.panel` rectangles with a gap. Each panel: a bold label at the top (`.h`), then a few flat
figures conveying the contrast — rows of small rects/circles for "pupils in rows", clustered
small circles + short arcs for "pupils in groups", a stick figure (`<circle>` head +
`<line>`/`<path>` body) for the teacher. Keep it iconographic, not detailed. Label the panels
exactly as the prompt says.

Worked example — `fig-U1-2`: left panel "industrial" — 4 rows × 5 seats as small rects all facing
a board rectangle, one teacher figure at the board; right panel "inquiry" — 4 clusters of 3–4
circles, one teacher figure kneeling by a cluster with a small notebook rect. Flat, high
contrast.

### 5. Left-to-right flow / timeline

Boxes (`.panel`) left to right joined by arrows (`<line>` + arrowhead `marker`). One idea per
box, ≤ 4 words each. A timeline adds a base axis line with tick marks and date/label text below.

## Arrowhead marker (reuse in archetypes 2, 3, 5)

```svg
<defs>
  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7"
          orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="ah"/>
  </marker>
</defs>
<!-- then: <line class="stroke" x1=… y1=… x2=… y2=… marker-end="url(#arrow)"/> -->
```

The marker path needs its **own theme-aware fill class** — `fill` set as a plain attribute
(`fill="#1c1e21"`) is not caught by the `@media (prefers-color-scheme: dark)` block, so the
arrowhead vanishes on a dark page. Add to `<style>`:

```css
.ah { fill: #1c1e21; }
@media (prefers-color-scheme: dark) { .ah { fill: #e3e3e3; } }
```

(`fill="context-stroke"` also works in modern Chromium but is less portable — prefer the class.)

## Self-check before you move on

- [ ] `viewBox` present, no `width`/`height` on `<svg>`.
- [ ] `<title>` + `<desc>` present; `role="img"`.
- [ ] `@media (prefers-color-scheme: dark)` block defines every colour used.
- [ ] Every label legible on both `#ffffff` and `#1b1b1d`.
- [ ] No colour-only distinction anywhere.
- [ ] No external font / image / script.
- [ ] `npm run optimize:figure -- --svg <f> <f>` exits 0 and reports ≤ 20 KB.
