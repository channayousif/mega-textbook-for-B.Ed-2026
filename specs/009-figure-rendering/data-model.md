# Phase 1 Data Model: Figure Rendering

**Feature**: `009-figure-rendering` | **Date**: 2026-08-30

All entities are **files in Git** — no database, no runtime dependency. This model turns Spec
008's `prompt-only` figure entities into rendered ones.

---

## 1. Figure asset — `static/img/figures/<course>/unit-NN/<figId>[.ur].<ext>`

| Aspect | Value |
|---|---|
| Path | `static/img/figures/<course-code-lowercase>/unit-NN/` (e.g. `static/img/figures/efmp-302/unit-01/`). `NN` zero-padded. |
| EN file | `<figId>.svg` (`Kind: diagram`) or `<figId>.webp` (`Kind: illustration`). |
| UR file | `<figId>.ur.svg` (translated-label diagram). An `illustration` has no `.ur` file — the one `.webp` is reused. |
| Referenced as | root-absolute site path `/img/figures/<course>/unit-NN/<figId>[.ur].<ext>` — no `import`, locale-agnostic, works in MDX verbatim. |
| SVG rules | self-contained (no `<image>` over a few KB, no external font — system stack); `<title>` + `role="img"`; a `<style>` block with `@media (prefers-color-scheme: dark)`; meaning via shape/position/label, never colour alone; ≤ 20 KB. |
| WebP rules | longest edge ≤ 1600 px; q80; ≤ 150 KB (hard-enforced by `scripts/optimize-figure.mjs`). |
| Lifecycle | committed once `Status` reaches `generated` (asset may sit under `static/` before the marker is replaced) and permanent at `placed`. |

---

## 2. `<Figure>` component — `src/components/Figure.tsx`

| Aspect | Value |
|---|---|
| Props | `id: string` (== the figure id / marker id); `src: string` (a `/img/…` path); `alt: string` (non-empty; verbatim from the marker); `caption?: string`; `kind?: 'diagram' \| 'illustration'` (advisory, for a class hook). |
| Rendered DOM | `<figure className="figure figure--{kind}" id="{id}"><img src={src} alt={alt} loading="lazy" decoding="async" />{caption && <figcaption>{caption}</figcaption>}</figure>`. |
| Registration | added to `src/theme/MDXComponents.tsx` map — topic files need no `import` (same as `ActivityCard`, `Glossary`). |
| Styling | `.figure` in `src/css/custom.css`: centred, `margin: 1.5rem auto`, `max-width: 100%` (+ a sensible cap), a 1px `var(--ifm-color-emphasis-300)` border, `figcaption` muted + small; inside `@media print` → `.figure { break-inside: avoid; }`. |
| a11y | `alt` required and non-empty (enforced by the gate on the manifest/marker side); an SVG asset additionally carries its own `<title>`. No `role` needed on `<figure>`. |
| RTL | RTL-neutral — the component adds no directional CSS; a diagram's internal layout is baked into the SVG and localised via `.ur.svg`, not mirrored by rtlcss. |

---

## 3. Figure manifest v2 — `specs/content/<course>/figures/unit-NN.md`

| Aspect | Value |
|---|---|
| Table | `\| Figure ID \| Topic \| Kind \| Prompt \| Alt text \| Src \| Status \|` |
| `Figure ID` | `^fig-U\d+-\d+$`, unique in the table (unchanged). |
| `Topic` | the `topic_label` of the file the figure sits in (unchanged). |
| `Kind` | `diagram` \| `illustration`. |
| `Prompt` | the generation prompt (unchanged from Spec 008; retained for regeneration + the human gate). |
| `Alt text` | the accessible description; should match the `<Figure alt>` (human gate reconciles). |
| `Src` | the `/img/…` site path; **blank iff `Status: prompt-only`**. |
| `Status` | `prompt-only` → `generated` → `placed` (see R6). |
| Parse | column-aware: the gate reads the header row and maps names → indices; a 5-col Spec 008 manifest and a 7-col v2 manifest both parse. |
| Invariant | carrier-id set (comment markers + `<Figure>` elements across the unit's EN topic files) **==** manifest-id set, both ways. |

---

## 4. Generation brief — `specs/content/<course>/figures/unit-NN.brief.md`

| Aspect | Value |
|---|---|
| When | written **only** when the skill finds no connected image-generation MCP tool and an illustration figure needs a raster. |
| Body | one block per illustration figure: the `Prompt` verbatim; a suggested aspect (`landscape` / `portrait` / `square`); the exact target filename (`fig-U1-2.webp`); a one-line "generate this in ChatGPT / Gemini / an HF image Space and save it to `figures/.staging/fig-U1-2.<ext>`". |
| Consumed by | the owner; the returned files land in `figures/.staging/` and a re-run of the skill ingests them. |
| Committed? | yes (it is a work order, like Spec 006's staging worksheets are *not* — this one carries no answer content, only prompts already public in the manifest). |

---

## 5. Staging dir — `specs/content/<course>/figures/.staging/`

| Aspect | Value |
|---|---|
| Purpose | drop zone for owner-generated raster files before `scripts/optimize-figure.mjs` moves them to `static/`. |
| Git | **ignored** (`.gitignore`: `specs/content/**/figures/.staging/`). |
| Never | an unoptimised file is never committed; the optimiser is the only path from `.staging/` to `static/`. |

---

## 6. `scripts/optimize-figure.mjs` (new, offline)

| Aspect | Value |
|---|---|
| Input | a local file path + a target `static/img/figures/<course>/unit-NN/<figId>.<ext>`. |
| Raster mode | `sharp(input).resize({ withoutEnlargement: true, ... ≤1600 }).webp({ quality: 80 })` → write; if bytes > budget, exit non-zero naming the size. |
| `--svg` mode | strip XML comments + collapse insignificant whitespace; assert ≤ 20 KB; write. |
| Network | none. Pure local file I/O + `sharp`. |
| Alias | `npm run optimize:figure -- <in> <out>`. |

---

## State transitions

- **`prompt-only` → `generated`**: an asset for the figure now exists (SVG authored, or a raster
  optimised into `static/` / staged). The topic file still has the comment marker.
- **`generated` → `placed`**: the comment marker is replaced by `<Figure>` in the EN topic file;
  the asset is committed under `static/`; the UR `<Figure>` + `.ur.svg` are wired (enforced for
  `reviewed`, best-effort for `draft`).
- **No silent regression**: once a row is `placed`, the gate treats the `<Figure>` + asset +
  (reviewed) `.ur.svg` as a hard contract. Removing the `<Figure>` or the asset fails CI.
- **Incremental units allowed**: a unit may have some rows `placed` and some `prompt-only` at
  once; the gate checks each row against its own `Status`.
