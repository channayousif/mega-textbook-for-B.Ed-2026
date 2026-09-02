# Contract: `<Figure>` MDX component

**File**: `src/components/Figure.tsx`, registered in `src/theme/MDXComponents.tsx`
**Used in**: `docs/**/topic-NN.mdx` and its `i18n/ur/**` mirror, in place of a rendered
FIGURE marker
**Styled in**: `src/css/custom.css` (`.figure` block)

## Props

| Prop | Type | Required | Rule |
|---|---|---|---|
| `id` | `string` | yes | equals the figure id (`^fig-U\d+-\d+$`) and the manifest `Figure ID`. Rendered as the `<figure id>`. |
| `src` | `string` | yes | a **root-absolute** site path `/img/figures/<course>/unit-NN/<figId>[.ur].<ext>`. No `import`, no relative path, no external URL. |
| `alt` | `string` | yes | non-empty; verbatim (whitespace-normalised) from the FIGURE marker's alt text. |
| `caption` | `string` | no | a visible `<figcaption>` under the image. Usually omitted — the alt text is the description; a caption is only for a credit or a "Figure 1.1" label. |
| `kind` | `'diagram' \| 'illustration'` | no | advisory; becomes a `figure--{kind}` class for optional styling. |

## Rendered DOM

```html
<figure class="figure figure--diagram" id="fig-U1-1">
  <img src="/img/figures/efmp-302/unit-01/fig-U1-1.svg"
       alt="Table comparing a teacher, a shopkeeper and a doctor against the four features of a profession — the teacher and the doctor meet all four, the shopkeeper meets none."
       loading="lazy" decoding="async" />
  <!-- <figcaption> only when `caption` is set -->
</figure>
```

- `loading="lazy"` and `decoding="async"` are always set (Constitution Art. V.5).
- No `width`/`height` attributes — the asset's intrinsic size + `max-width: 100%` govern.
- The component is a pure presentational function (no hooks, no state), mirroring
  `src/components/ActivityCard.tsx`.

## Styling (`.figure` in `src/css/custom.css`)

- `display: block; margin: 1.5rem auto; text-align: center;`
- `img` inside: `max-width: 100%; height: auto;` plus a sensible cap (e.g. `max-width: 640px`
  for diagrams via `.figure--diagram img`), a 1px `var(--ifm-color-emphasis-300)` border,
  `border-radius: 6px`.
- `figcaption`: `font-size: 0.875rem; color: var(--ifm-color-emphasis-600); margin-top: 0.5rem;`
- Inside `@media print`: `.figure { break-inside: avoid; }` so a figure never splits across an
  A4 page boundary (the topic files carry `<PrintHandout />`).
- No directional (`left`/`right`/`margin-inline`) properties — RTL-neutral; the `ur` locale
  shows a translated-label `.ur.svg`, it does not mirror the component.

## Accessibility

- `alt` is required and non-empty — the gate enforces this on the marker/manifest side; the
  component does not silently render an empty `alt`.
- A `diagram` SVG asset additionally carries its own `<title>` (and `role="img"`) inside the
  file, so it is described even if loaded standalone.
- Colour is never the only carrier of meaning inside an asset (SVG-authoring rule); the
  component adds no colour-coded affordance of its own.

## What the component does NOT do

- No `srcset` / `<picture>` / art direction (Out of Scope).
- No lightbox, zoom, or click-to-expand.
- No runtime theme switching of the image — an SVG asset themes itself via
  `@media (prefers-color-scheme: dark)` in its own `<style>`; a WebP is theme-fixed.
- No data fetching, no `window`, no `useDocusaurusContext`.
