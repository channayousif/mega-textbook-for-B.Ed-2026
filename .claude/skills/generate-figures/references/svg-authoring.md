# SVG authoring - hand-authored schematic figures (generate-figures)

A **schematic** figure (one of the schematic archetypes below) is a
**self-contained SVG file** you write by hand and commit under
`static/img/figures/<course-lowercase>/unit-NN/<figId>.svg`. No dependency, no build step, no
external asset. It renders behind a plain `<img src="/img/…">` (the `<Figure>` component).

## Schematic or illustration?

| Choose a schematic `Kind` (SVG, this file) when the figure is… | archetype | Choose `illustration` (raster, `raster-codex-handoff.md`) when it… |
|---|---|---|
| a comparison table, matrix, or checklist grid | `table` | needs a photograph-like scene, a real place, faces |
| a node-and-arrow web of related ideas | `concept-map` | needs texture, depth, lighting |
| a decision or process flow with branches | `flowchart` | cannot be carried by flat shapes + labels |
| an ordered sequence along time (dates, stages) | `timeline` | - |
| a relationship diagram (triangle, Venn, cycle, quadrant), a two-panel contrast, an annotated cross-section, or any other labelled schematic | `diagram` | - |

The full archetype vocabulary (generated from `scripts/lib/figure-manifest.mjs`; `illustration`
is the only raster one):

<!-- BEGIN GENERATED figure-kinds -->
`table`, `concept-map`, `flowchart`, `timeline`, `diagram`, `illustration`
<!-- END GENERATED figure-kinds -->

**Default to a schematic.** A textbook figure set is overwhelmingly labelled schematics. A prompt
that says "clean flat vector, labelled" is a schematic even when it depicts a classroom scene -
draw it as flat labelled panels, not a raster. AI raster garbles label text, weighs 50–150 KB,
ignores dark mode, and can't be localised without a full re-generation.

**Constitution III.10**: the unit needs **≥ 1 `concept-map` / `flowchart` / `timeline`** (a
`table` or a plain `diagram` does not satisfy it) and **≥ 2 figures per topic**. The content-spec
`**Figure plan**` should already have set the archetype for each id.

## The boilerplate

Every diagram SVG starts from this shape:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 <W> <H>" role="img"
     aria-labelledby="t d" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif">
  <title id="t"><!-- the alt's first clause: what the figure is --></title>
  <desc id="d"><!-- the full marker alt text, verbatim --></desc>
  <style>
    <!-- the published :root token block, pasted verbatim - see below -->
    .bg      { fill: var(--bg); }
    .ink     { fill: var(--ink); }          /* text + solid fills */
    .stroke  { stroke: var(--ink); stroke-width: 2.5; fill: none; }   /* thicker stroke for crisper lines */
    .stroke-a{ stroke: var(--a1); stroke-width: 2; fill: none; }       /* accent-coloured line */
    .muted   { fill: var(--muted); }
    .panel   { fill: var(--panel); stroke: var(--ink); stroke-width: 2; }
    .panel-a { fill: var(--a1-fill); stroke: var(--a1); stroke-width: 2; }  /* tinted accent panel */
    .panel-b { fill: var(--a2-fill); stroke: var(--a2); stroke-width: 2; }
    .panel-c { fill: var(--a3-fill); stroke: var(--a3); stroke-width: 2; }
    .panel-d { fill: var(--a4-fill); stroke: var(--a4); stroke-width: 2; }
    .yes     { fill: var(--ink); }          /* tick glyph - a shape, never a colour */
    .no      { fill: var(--muted); }        /* cross glyph - muted, never red */
    text     { font-size: 15px; fill: var(--ink); }   /* explicit fill so text is never inherited-transparent */
    .h       { font-size: 16px; font-weight: 700; fill: var(--ink); }
    .sh      { font-size: 14px; font-weight: 600; fill: var(--ink); }    /* sub-head: a touch smaller than .h */
    .body    { font-size: 14px; fill: var(--ink); }   /* body label: readable at 14 */
    .small   { font-size: 13px; fill: var(--muted); } /* secondary/caption text */
    .wm      { fill: var(--wm); font-size: 11px; }
    .ah      { fill: var(--ink); }          /* arrowhead fill matches line stroke */
    .grid    { stroke: var(--ink); stroke-width: 1.5; fill: none; opacity: 0.25; }   /* faint grid: guides the eye, not a hard rule */
  </style>
  <rect class="bg" x="0" y="0" width="<W>" height="<H>"/>
  <!-- shapes + <text> here -->
  <text class="wm" x="<W - 12>" y="<H - 10>" text-anchor="end" aria-hidden="true">textbook.com.pk</text>
</svg>
```

**Readability enhancements over the earlier boilerplate.** The shared look and feel comes from a few deliberate changes:
- **Thicker strokes** (`stroke-width: 2.5` vs 2) for crisper grid lines and borders at small sizes.
- **Explicit `fill: var(--ink)` on every text class** so label colour is never lost to inheritance or a missing class.
- **Four tinted panel classes** (`.panel-a` … `.panel-d`) that pair each accent with its matching fill, so a highlighted region reads by both hue and background tint - and stays separable in greyscale because the fills are staggered in luminance.
- **A faint `.grid` class** (25% opacity) for table rules and alignment guides: it leads the eye without competing with the data.
- **A `.no` class** distinct from `.yes` - both ink-coloured, distinguished by glyph shape, never by red/green.
- **A `.sh` sub-head and `.body` class** so a figure can carry a clear visual hierarchy (head → sub-head → body → caption) without inventing ad-hoc font sizes.

### Colour: paste the token block, then use `var(--token)`

Write **no hex anywhere except the `:root` block**, and paste that block verbatim - the gate
compares it byte for byte, and the dark variant is derived by swapping it.

<!-- BEGIN GENERATED figure-palette-light -->
```css
:root{--bg:#ffffff;--panel:#eef3f1;--ink:#132a24;--muted:#566b65;--line:#1f6f5c;--a1:#1f6f5c;--a1-fill:#e6efed;--a2:#15476b;--a2-fill:#e6ebf0;--a3:#b8551d;--a3-fill:#f0e9e5;--a4:#7b3886;--a4-fill:#ede7ee;--wm:#8b9a95}
```
<!-- END GENERATED figure-palette-light -->

The dark ramp, which you never write by hand (`npm run figures:variants` derives it):

<!-- BEGIN GENERATED figure-palette-dark -->
```css
:root{--bg:#1b1b1d;--panel:#24282a;--ink:#e7ece9;--muted:#9aa7a2;--line:#38c6a4;--a1:#38c6a4;--a1-fill:#1f302c;--a2:#2f91d6;--a2-fill:#1e2931;--a3:#f0bd9f;--a3-fill:#33251c;--a4:#c387cd;--a4-fill:#2c212e;--wm:#6b7671}
```
<!-- END GENERATED figure-palette-dark -->

`--a1` … `--a4` are four colour-vision-safe accents, each with a matching `--aN-fill` tint for
panels. Use them to reinforce a distinction the figure **already makes** by shape or dash
pattern. Do not rainbow co-equal members of one set: if four boxes are four examples of the same
idea, they take the *same* accent.

Label text on a tinted panel is always `--ink`, never the accent - `--ink` is what clears the
4.5:1 text bar; the accent is the panel's stroke and only has to clear 3:1 as a graphic.

### Rules

- **`viewBox` only** - no `width`/`height` attributes on `<svg>`. `.figure--diagram img` caps the
  on-page width at 640 px; the SVG scales.
- **`role="img"` + `<title>` + `<desc>`** so the file is described even if opened standalone. The
  page-level description still comes from `<Figure alt>`.
- **System-font stack** - never `@import` or `<link>` a web font, never reference a font file. The
  reader's OS font renders the labels.
- **Never theme with `@media` inside the SVG.** That follows the reader's *operating system*,
  but the site themes by toggling `[data-theme]` on `<html>`, and an SVG behind an `<img>`
  cannot see that attribute. Figures used to do this, and a light-OS reader who clicked the
  site's dark toggle got white plates punched into a dark page. Write the **light** file only;
  `npm run figures:variants` derives the dark twin and CI fails if it is stale.
- **No colour-only meaning** (Constitution Art. III.8). A tick vs a cross is a *shape*
  difference (✓ / ✕ drawn as paths, or the words "yes"/"no"), never green-cell vs red-cell.
  Self-check: **delete every colour from the figure - does it still read?** If not, the encoding
  is colour-only and fails III.8.
- **One wordmark**, bottom-right (`text-anchor="end"`), or bottom-**left** on a `.ur.svg` so it
  mirrors for RTL. Always `aria-hidden="true"`, and never mentioned in `<desc>`: the description
  is for the teaching content, not the branding.
- **Plain register** - the labels use the unit's own vocabulary, at the unit's reading level. No
  abbreviations the prose doesn't use.
- **No em dash in `<text>` labels** (Constitution Art. III.9) - use a comma, a colon, or a
  spaced hyphen. Applies to the `.ur.svg` translated labels too.
- **Size ≤ 20 KB** after `npm run optimize:figure -- --svg`. Hand-authored flat SVGs land at
  2–8 KB; if you're near the limit you have too many nodes or over-long labels.
- **No `<script>`, no `<foreignObject>`, no external `<image>`/`<use href="http…">`.**

## The five layout patterns

These are drawing recipes; each maps to a manifest `Kind`: 1 → `table`, 2 → `diagram`,
3 → `concept-map`, 4 → `diagram`, 5 → `flowchart` or `timeline`.

### 1. Comparison table / matrix

A grid: header row of column labels, left column of row labels, each body cell a **✓ or ✕ glyph
plus the word**. Draw the grid with `<line>`s; put `<text>` centred in each cell. Give the ticks
and crosses distinct *shapes* (a check path vs an X path) and a short word so the cell reads
without colour. Header cells `.h`.

Worked example - `fig-U1-1` (teacher / shopkeeper / doctor × four features of a profession):
3 data columns + 1 row-label column, 4 data rows + 1 header row. Each cell: a small ✓ or ✕ path
at x-centre, the word "yes"/"no" beneath it in `.muted`. Row labels wrap to two lines
(`<tspan x=… dy=…>`). ~5 KB.

### 2. Relationship diagram - triangle / Venn / cycle / quadrant

Three or four related ideas held in a shape. A triangle: `<polygon>` for the body, a `<text>` at
each vertex (`text-anchor` set per corner), an optional base bar (`<rect>`) with its own label, a
small caption in `.muted` below. A cycle: circles joined by curved arrows (`<path>` + a
`marker` arrowhead). Keep the shape geometric and the labels outside it where they don't collide.

Worked example - `fig-U1-3`: an upward triangle, vertices "accountability" / "autonomy" /
"collegiality"; a horizontal base bar under the whole triangle labelled "specialised knowledge
and training"; a `.muted` caption "held in balance".

### 3. Node-and-arrow web / concept map

A central node (`<ellipse>` or rounded `<rect>` with a `<text>` question inside it) and N outer
boxes (`.panel` rects with labels), each joined to the centre by a `<line>`/`<path>` ending in an
arrowhead `marker` **pointing at the centre** (influences flow in) or outward (consequences flow
out) - match the marker prompt. Space the outer boxes evenly around the centre.

Worked example - `fig-U1-4`: centre ellipse "who am I becoming as a teacher?"; six `.panel`
boxes ("my own schooling", "family and community", "national policy and standards", "beliefs
about how learning happens", "the pupils in front of me", "mentors and colleagues"); arrows
from each box into the centre.

### 4. Two-panel / side-by-side contrast

Two `.panel` rectangles with a gap. Each panel: a bold label at the top (`.h`), then a few flat
figures conveying the contrast - rows of small rects/circles for "pupils in rows", clustered
small circles + short arcs for "pupils in groups", a stick figure (`<circle>` head +
`<line>`/`<path>` body) for the teacher. Keep it iconographic, not detailed. Label the panels
exactly as the prompt says.

Worked example - `fig-U1-2`: left panel "industrial" - 4 rows × 5 seats as small rects all facing
a board rectangle, one teacher figure at the board; right panel "inquiry" - 4 clusters of 3–4
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

The marker path needs its **own fill class** - a `fill` set as a plain attribute
(`fill="#132a24"`) is a hex literal outside the `:root` block, which the gate rejects, and it
would not follow the token swap either. Add to `<style>`:

```css
.ah { fill: var(--ink); }
```

Give the arrowhead **the same token as the line it terminates**. If the arrow's stroke is
`var(--a1)`, the arrowhead must be `var(--a1)` too - an arrowhead is a *fill* and its arrow is a
*stroke*, so a careless split leaves every arrowhead a different colour from its own arrow.

(`fill="context-stroke"` also works in modern Chromium but is less portable - prefer the class.)

## Self-check before you move on

- [ ] `viewBox` present, no `width`/`height` on `<svg>`.
- [ ] `<title>` + `<desc>` present; `role="img"`.
- [ ] The `:root` block is the published one, pasted verbatim; no hex anywhere else.
- [ ] No `@media (prefers-color-scheme…)` block - the dark twin is derived, not authored.
- [ ] Exactly one `aria-hidden` wordmark; it is not named in `<desc>`.
- [ ] No colour-only distinction anywhere: delete all colour, does it still read?
- [ ] No external font / image / script.
- [ ] `npm run optimize:figure -- --svg <f> <f>` exits 0 and reports ≤ 20 KB.
