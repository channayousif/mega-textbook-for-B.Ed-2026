# Implementation Plan: Figure Rendering

**Branch**: `009-figure-rendering` | **Date**: 2026-08-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/009-figure-rendering/spec.md`

## Summary

Turn the Spec 008 `{/* FIGURE[...] */}` prompt-markers into committed, accessible, lazy-loaded
images that render on the page in both locales. **Hybrid, SVG-first**: schematic figures
(`Kind: diagram`) are hand-authored as self-contained SVG; genuine illustrations
(`Kind: illustration`) go through the owner-configured **Hugging Face MCP** image tool, with a
brief-and-staging fallback when no image tool is connected. A new `<Figure>` MDX component
renders the assets; each comment marker is **replaced** by a `<Figure>`; the manifest gains
`Kind` + `Src` columns and a `prompt-only → generated → placed` lifecycle; `check-figures.mjs`
learns the `<Figure>` form and asserts placed assets exist. Delivered as a new
`generate-figures` skill + the platform infra it needs, and proven by rendering **EFMP-302
Unit 1's four figures**.

Boundary preserved: `author-unit` writes markers + a `prompt-only` manifest; `generate-figures`
renders them. This is the "later, out-of-scope image pass" the Spec 008 `figures-manifest.md`
Lifecycle note reserved.

## Technical Context

**Language/Version**: TypeScript 5.6 on Node 22+ (unchanged). One new React component
(`src/components/Figure.tsx`, same shape as `ActivityCard.tsx`). Gate scripts stay plain Node
ESM (`.mjs`).
**Primary Dependencies**: `gray-matter` (existing) for the gate. **New**: `sharp` as a
`devDependency` for the offline raster-optimise step (`scripts/optimize-figure.mjs`) — the
standard Node image lib; used only to resize + WebP-encode a local file, never at build or
render time. No runtime dependency is added. SVG authoring needs **no** dependency (hand-written
files; an optional `svgo` devDep for minification is deferred — a whitespace-trim is enough at
this volume).
**Storage**: Filesystem / Git. New committed tree `static/img/figures/<course>/unit-NN/`
(`<figId>.svg`, `<figId>.ur.svg`, `<figId>.webp`). Git-ignored `specs/content/<course>/figures/.staging/`.
No database.
**Testing**: Vitest — extend `tests/unit/figures-gate.test.mjs` (new cases for the `<Figure>`
form, the placed-asset-existence check, the `Kind` enum, the bilingual `.ur.svg` check, and the
`prompt-only`/legacy regression floor). Same `spawn`-the-script-against-`CONTENT_ROOT` pattern.
Playwright a11y/RTL checks (existing suite) cover the rendered `<figure>`.
**Target Platform**: Same static site (`textbook.com.pk`) and CI (GitHub Actions). No new CI
step — `check:figures` already runs; its checks widen. The build copies `static/img/` verbatim.
**Project Type**: Single Docusaurus-rooted project (Specs 001–008). No frontend/backend split.
Zero Supabase / Edge Function change.
**Performance Goals**: Per-image budget — diagram SVG ≤ 20 KB, raster WebP ≤ 150 KB, longest
edge ≤ 1600 px (Constitution Art. V.5: images lazy-loaded and compressed; the < 200 KB
first-load budget explicitly excludes images, and `<Figure>` sets `loading="lazy"`). The four
Unit 1 assets together add < 300 KB to the build.
**Constraints**: `check:figures` stays green byte-for-byte for `prompt-only` units and legacy
units (regression floor, SC-004); no committed script makes a network call (FR-016 — the HF MCP
call is in the skill/agent turn, like `author-unit`'s `WebSearch`/`WebFetch`); alt text on
every image (Art. III.8); SVG diagrams legible in light + dark, no colour-only meaning; figures
`break-inside: avoid` in the A4 print stylesheet; the `ur` locale must show translated diagram
labels (`.ur.svg`).
**Scale/Scope**: 1 new React component + 1 CSS block; 1 gate-script rewrite + test extension;
2 Markdown format contracts + a `style-guide.md` section edit (`version` 3.0 → 3.1); 1 new skill
(`SKILL.md` + 4 `references/`); 1 new offline script + `package.json` devDep; `.gitignore` +
`specs/backlog.md` note; then EFMP-302 Unit 1's 4 assets (+ 4 `.ur.svg`) + `<Figure>` wiring in
8 topic files (4 EN, 4 UR stubs) + manifest v2 + PHR.

**NEEDS CLARIFICATION**: none. The four owner decisions (HF MCP raster; hybrid SVG-first; full
SDD; render Unit 1 now) fixed every fork.

## Constitution Check

*GATE: evaluated against Constitution v2.6.0. Re-checked after Phase 1 below.*

| Article | Requirement | Status |
|---|---|---|
| III.1 | Simple-English register | ✅ Not touched — figures carry labels, not prose; SVG label text stays plain and matches the unit's vocabulary |
| III.2 | Urdu parity — human-reviewed UR before publish | ✅ FR-009: a placed diagram gets a translated-label `.ur.svg`; the `<Figure src>` in the UR file points at it. For EFMP-302 Unit 1 the UR mirror is `draft` (skeleton stubs) — the `.ur.svg` is written and wired now, gate-enforced when the unit reaches `reviewed` (same posture as Spec 008's UR marker-ID parity) |
| III.8 | **Accessibility** — alt text on all images/diagrams, no colour-only meaning, RTL-correct | ✅ Strengthened. `<Figure>` requires a non-empty `alt` (from the marker, verbatim); diagram SVGs carry `<title>` + `role="img"`; SVG-authoring rules forbid colour-only meaning; `<Figure>` is RTL-neutral (a diagram's own layout is fixed in the SVG, mirrored only by translating labels). The gate keeps failing on empty alt |
| V.1 | Content/application separation; content stays Markdown in Git | ✅ Every asset is a file committed under `static/`; `<Figure>` is a presentational component; no backend, no DB, no secret. The HF token lives only in the owner's MCP client config, never in the repo |
| V.2 | Security in the backend; static bundle is public | ✅ Figures are public teaching aids — correct to ship in the static bundle. No answer-key or private content in an image |
| V.4 | One course = one content module; adding a course = zero platform-code change | ✅ `<Figure>` + the widened gate are generic; a new course's figures are just new files under `static/img/figures/<course>/` + manifest rows |
| V.5 | **Offline-tolerant & low-bandwidth** — images lazy-loaded and compressed; content pages < 200 KB first load excluding images | ✅ `<Figure>` sets `loading="lazy" decoding="async"`; SVG ≤ 20 KB and WebP ≤ 150 KB are enforced at optimise time (hard failure, FR-005); diagrams are vector (tiny) by default |
| VII | Engineering gate — "figure-marker ↔ manifest consistency (`check:figures`)" | ✅ Same gate, widened checks (the `<Figure>` form; placed-asset existence; `Kind` enum; bilingual `.ur.svg`). **No amendment** — this is within the existing figure-gate mandate, not a new principle. `style-guide.md` `version` 3.0 → 3.1 is a content-pipeline artefact bump (Spec 006 FR-007 mechanism), not a constitution change |
| X.2 | Docs gate — a spec changing contributor process updates README same branch | ✅ A task adds a "Rendering figures" note to the README's "Unit structure standard" section |
| XI | Amendment procedure & versioning | ✅ No constitution amendment. Style guide `3.0` → `3.1` per its own freeze mechanism |

**Result: PASS, no amendment required.** Art. III.8 and V.5 are *satisfied and slightly
strengthened*, not modified. One Complexity Tracking entry (the `sharp` devDependency — the
repo's first image lib).

📋 **Architectural decision candidate**: the marker→`<Figure>` replacement + the gate learning a
second "carrier" form + the `prompt-only → generated → placed` lifecycle + the SVG-first-with-
HF-MCP-raster split is a cross-cutting choice that revisits ADR-0011's rejected alternative D
("a real component that renders"). Recommend `/sp.adr` after this plan — see Phase 1.

## Project Structure

### Documentation (this feature)

```text
specs/009-figure-rendering/
├── plan.md              # This file
├── research.md          # Phase 0 — R1–R9 (decisions: HF MCP, sharp, SVG archetypes, marker form, .ur.svg, gate shape)
├── data-model.md        # Phase 1 — file-based entities (Figure asset, manifest v2, <Figure> contract, generation brief, staging)
├── quickstart.md        # Phase 1 — the render loop: classify → author SVG / call HF MCP → optimise → place → mirror UR → flip manifest → gates
├── contracts/
│   ├── figure-manifest-v2.md   # NEW — supersedes 008/contracts/figures-manifest.md: +Kind, +Src, the Status lifecycle, the <Figure> end-state, the .ur.svg rule
│   └── figure-component.md      # NEW — the <Figure> props contract + rendered DOM + a11y + print + asset-path rules
├── checklists/
│   └── requirements.md  # created with the spec
└── tasks.md             # Phase 2 — /sp.tasks
```

### Source Code (repository root)

```text
src/components/Figure.tsx                 # NEW — <figure><img loading=lazy decoding=async><figcaption?></figure>; props id, src, alt, caption?, kind?
src/theme/MDXComponents.tsx               # EDITED — register Figure globally (same as ActivityCard)
src/css/custom.css                        # EDITED — .figure block (light/dark border, max-width, centred, break-inside:avoid in @media print)

scripts/check-figures.mjs                 # REWRITTEN — recognise <Figure id alt/> as a carrier; column-aware v2 parse (Kind, Src); Status-aware blank-cell rule; for placed rows assert Src file exists + Kind enum + EN/UR <Figure> present + diagram .ur.svg exists (reviewed)
scripts/optimize-figure.mjs               # NEW — OFFLINE: sharp resize (≤1600px longest edge) + WebP q80; hard-fail if > budget. Also a --svg mode (whitespace/comment strip). Takes a local file, writes to static/img/figures/...
package.json                              # EDITED — + "sharp" devDependency; + "optimize:figure" script alias

tests/unit/figures-gate.test.mjs          # EDITED — <Figure>-form cases; placed-asset-missing; Kind not in enum; reviewed unit missing UR <Figure> / .ur.svg; prompt-only + legacy regression floor unchanged

specs/008-rich-unit-pedagogy/contracts/figures-manifest.md   # EDITED — "Superseded by 009/contracts/figure-manifest-v2.md" pointer at top; Lifecycle note marked done
specs/content/style-guide.md              # EDITED — `## Figure markers and manifests`: the v2 manifest, the <Figure> end-state, the Status lifecycle, the .ur.svg rule; front-matter version "3.0" → "3.1"
README.md                                 # EDITED — "Rendering figures" note under the Unit structure standard section
.gitignore                                # EDITED — specs/content/**/figures/.staging/
specs/backlog.md                          # EDITED — add a "From 008-rich-unit-pedagogy" section noting the image pass is covered by Spec 009

.claude/skills/generate-figures/          # NEW SKILL
├── SKILL.md                              # triggers ("generate figures", "render the figure markers", "create the images for unit N"); the classify → author/generate → optimise → place → mirror UR → flip manifest → gates loop
└── references/
    ├── svg-authoring.md                  # the diagram archetypes (comparison table, relationship triangle, node-and-arrow web, split-panel, flow) as clean flat vector SVG; theme-safe palette via CSS custom props / prefers-color-scheme; <title>+<desc>+role=img; no external font; no colour-only meaning; size ≤ 20 KB
    ├── raster-hf-mcp.md                  # detect a connected HF MCP image tool; call it with the prompt + aspect; fetch the result in-turn; the brief-and-.staging fallback + brief format; run scripts/optimize:figure
    ├── placement.md                     # marker → <Figure> replacement (verbatim alt); asset path convention; manifest row v2 update; the Status lifecycle; re-run the gate set
    └── bilingual-figures.md             # .ur.svg with translated labels; mirror <Figure> into the UR topic file pointing at .ur.svg; draft vs reviewed gate posture
.claude/skills/author-unit/references/figure-prompts.md   # EDITED — pointer to generate-figures for the render pass; the boundary stays

docs/semester-1/efmp-302/unit-01/topic-0[1-4].mdx         # EDITED — each marker replaced by <Figure ... />
i18n/ur/.../semester-1/efmp-302/unit-01/topic-0[1-4].mdx  # EDITED — each marker replaced by <Figure src=".../fig-UN.ur.svg" .../> (translated alt)
static/img/figures/efmp-302/unit-01/fig-U1-{1..4}.svg     # NEW — the four diagrams
static/img/figures/efmp-302/unit-01/fig-U1-{1..4}.ur.svg  # NEW — translated-label variants
specs/content/efmp-302/figures/unit-01.md                 # REWRITTEN — v2 columns; all four rows placed
history/adr/0012-*.md                     # NEW (if /sp.adr run) — figure rendering: <Figure>, the lifecycle, SVG-first + HF-MCP raster
history/prompts/009-figure-rendering/     # NEW — PHRs per stage
```

**Structure Decision**: Single project, same repo root as Specs 001–008. The feature's "system"
is one React component + one gate rewrite + one skill + one offline script + Markdown governance
+ the committed image files. It sits alongside Spec 008's figure marker/manifest layer as its
rendering counterpart.

## Phase 0 — Research (`research.md`)

Headlines (full detail in `research.md`):

- **R1 — Raster route = Hugging Face MCP.** `https://huggingface.co/mcp` (streamable HTTP;
  Bearer HF token), configured by the owner in *their* Claude Code MCP settings, with an image
  Space added (`FLUX.1-Krea-dev` photoreal / `Qwen-Image` strong text) or Dynamic Spaces on.
  The skill **detects** an available image-generation MCP tool at run time; it does not hardcode
  a tool name. Free HF credits cover the volume. Fallback: emit a brief, ingest from `.staging/`.
- **R2 — SVG-first.** 3 of the 4 EFMP-302 Unit 1 figures (and most textbook figures) are
  labelled schematics — AI raster garbles labels, weighs 50–150 KB, and ignores dark mode.
  Hand-authored SVG gives perfect labels, ≤ 5 KB, `currentColor`/`prefers-color-scheme`
  theming, git diffs, zero cost. `fig-U1-2` ("clean flat vector" two-panel scene by its own
  prompt) is authored as a `diagram` SVG too; the raster route is reserved for a genuine
  photoreal need.
- **R3 — End-state form: replace the comment with `<Figure>`.** Not "keep the comment + add
  `<Figure>`". The comment's job (mark the spot, carry the prompt, carry alt) is done once the
  image exists; the manifest keeps the prompt. `check-figures.mjs` learns to read id + alt from
  **either** the comment **or** `<Figure id="…" alt="…" />`. This matches the Spec 008
  Lifecycle note ("replace each marker") and keeps the source clean.
- **R4 — `<img src="/img/...">`, not SVGR import.** Root-absolute `<img>` into `static/` is the
  repo's established asset pattern (the Nastaliq webfont), needs no `import`, works verbatim in
  MDX, and is locale-agnostic. SVGR inline-import would give `currentColor` theming but forces a
  JS import per topic file and complicates the `ur` route; the SVG itself carries
  `prefers-color-scheme` so theming still works via `<img>`. Print: `<img>` of an SVG scales
  cleanly.
- **R5 — `sharp` devDependency for the offline optimiser.** The repo has no image lib. `sharp`
  is the standard; used only by `scripts/optimize-figure.mjs` (local file → resize + WebP), run
  by the skill, never at build/CI. `svgo` is deferred (hand-authored SVGs are already tiny; a
  whitespace strip suffices).
- **R6 — Manifest v2 columns + lifecycle.** `| Figure ID | Topic | Kind | Prompt | Alt text |
  Src | Status |`. `Kind ∈ {diagram, illustration}`. `Src` blank while `prompt-only`, set from
  `generated` on. `Status`: `prompt-only` (Spec 008) → `generated` (asset exists, not wired) →
  `placed` (marker replaced by `<Figure>`, asset committed). Gate parse becomes column-aware
  (read the header row) so extra columns are safe.
- **R7 — Gate widening, additive.** New checks fire **only** for rows at `generated`/`placed`.
  A `prompt-only` unit and a legacy unit hit the exact Spec 008 code path. New checks: `Src`
  file exists under `static/`; `Kind` in enum; EN `<Figure id>` present for the row; for a
  `reviewed` bilingual unit the UR `<Figure id>` present and (diagram) `<figId>.ur.svg` exists.
- **R8 — Bilingual diagrams need translated labels.** An English comparison table on the Urdu
  page is a parity break (Art. III.2). So each placed `diagram` gets `<figId>.ur.svg` authored
  with Urdu labels; the UR `<Figure src>` points at it. A placed `illustration` (a drawn scene,
  few/no words) reuses the one asset with a translated `alt`. For a `draft` UR mirror the
  `.ur.svg` is written+wired but not gate-blocked (matches Spec 008 marker-ID parity posture).
- **R9 — No CI change.** `check:figures` already runs in the `build` job. The build copies
  `static/img/` as-is. Lighthouse `total-byte-weight` (warn, 500 KB, 2 URLs) is unaffected —
  the audited pages don't carry figures; and per-image budgets are enforced at optimise time.

### Spec refinements applied during planning (Constitution Art. IV.4)

None. The spec and the owner decisions agree; this plan pins format detail the spec deferred
(the v2 column order, the SVG archetype list, the gate's per-Status branch, the asset-path
grammar) into `research.md` / the contracts.

## Phase 1 — Design & Contracts

### Data model (`data-model.md`)

File-based entities (no DB): **Figure asset** (`static/img/figures/<course>/unit-NN/<figId>.{svg,ur.svg,webp}`);
**`<Figure>` component** (props `id`, `src`, `alt`, `caption?`, `kind?` → `<figure class="figure">
<img loading=lazy decoding=async>[<figcaption>]</figure>`); **Figure manifest v2**
(`| Figure ID | Topic | Kind | Prompt | Alt text | Src | Status |`); **Generation brief**
(`figures/unit-NN.brief.md`, emitted only when no image tool is connected); **Staging dir**
(`figures/.staging/`, git-ignored). State: a figure row moves `prompt-only → generated →
placed` and cannot silently regress (the gate treats `placed` as a hard contract once set).

### Contracts (`contracts/`)

- **`figure-manifest-v2.md`** — supersedes `specs/008-rich-unit-pedagogy/contracts/figures-manifest.md`.
  The v2 columns; `Kind`/`Src` rules; the `Status` lifecycle and what the gate checks at each;
  the `<Figure>` end-state (id == marker id, alt verbatim, src == asset path); the `.ur.svg`
  rule; the asset-path grammar `static/img/figures/<course-lowercase>/unit-NN/<figId>[.ur].<ext>`.
- **`figure-component.md`** — the `<Figure>` props contract, the exact rendered DOM, the a11y
  requirements (non-empty `alt`; SVG asset carries its own `<title>`), the print rule
  (`break-inside: avoid`), the light/dark and RTL expectations, and the "root-absolute `/img/…`
  only" rule.

Plus edits (not new contracts): the Spec 008 `figures-manifest.md` gets a top pointer;
`style-guide.md` `## Figure markers and manifests` is rewritten to v2 and `version` bumps to
`"3.1"`.

### `scripts/check-figures.mjs` rewrite

Column-aware manifest parse (map header names → indices; tolerate the 5-col Spec 008 shape and
the 7-col v2 shape). Add `<Figure id="…" alt="…" />` extraction (regex over `matter().content`,
run alongside `markersIn`). A "carrier" for figure X = a comment marker **or** a `<Figure>` with
`id="X"`. "Every topic file carries ≥ 1 figure" and "carrier-set == manifest-id-set" use
carriers. Per-row, when `Status ∈ {generated, placed}`: `Kind` in `{diagram, illustration}`;
`Src` non-blank and (for `placed`) the file exists under `ROOT/static`; the EN topic file has a
`<Figure id="X">`; for a `reviewed` bilingual unit the UR topic file has a `<Figure id="X">`
and, if `Kind: diagram`, `ROOT/static/img/figures/<course>/unit-NN/<figId>.ur.svg` exists.
`prompt-only` rows and legacy units: unchanged code path.

### `src/components/Figure.tsx` + `MDXComponents.tsx` + `custom.css`

`Figure.tsx` mirrors `ActivityCard.tsx` — a pure presentational function component, no hooks.
`MDXComponents.tsx` adds `Figure` to the registered map. `custom.css` adds a `.figure` block:
centred, `max-width: 100%`, sensible `max-width` cap, a 1px `--ifm-color-emphasis-300` border,
`figure`/`figcaption` spacing, and inside `@media print` `{ .figure { break-inside: avoid; } }`.

### The `generate-figures` skill

`SKILL.md`: triggers; Step 1 read the unit's markers + manifest, classify each `Kind`; Step 2
diagrams → author SVG per `references/svg-authoring.md` (self-check: renders both themes, labels
legible, `<title>` present, ≤ 20 KB); Step 3 illustrations → `references/raster-hf-mcp.md`
(detect tool → call → fetch in-turn → `npm run optimize:figure`; or brief + `.staging/`);
Step 4 `references/placement.md` — replace each marker with `<Figure>`, write the manifest v2
row, flip `Status`; Step 5 `references/bilingual-figures.md` — `.ur.svg` + mirror `<Figure>`
into the UR topic file; Step 6 run `npm run validate:content && npm run check:figures &&
npm run check:no-answer-keys && npm test && npm run build`. One skill, no sub-agent.

### Agent context update

Run `.specify/scripts/bash/update-agent-context.sh claude` to add the `<Figure>` component, the
`generate-figures` skill and `sharp` (devDep) to the active-technologies list.

### Post-design Constitution re-check

Re-evaluated after the design: **PASS, no amendment**, one Complexity entry (`sharp` devDep).
The design adds no backend, no runtime dependency, no secret in the repo, no new *rendered*
content type beyond `<figure><img>`; a11y and low-bandwidth are strengthened, not weakened.

## Phase 2 — (handled by `/sp.tasks`, not here)

`/sp.tasks` decomposes this into dependency-ordered tasks: contracts + manifest-v2 + style-guide
3.1 → `<Figure>` component + CSS + MDXComponents → `check-figures.mjs` rewrite + red-first tests
→ `optimize-figure.mjs` + `sharp` devDep → the `generate-figures` skill (SKILL.md + 4 refs) +
`author-unit` pointer → `.gitignore` + README + backlog → **render EFMP-302 Unit 1** (author 4
SVGs + 4 `.ur.svg`, wire `<Figure>` into 4 EN + 4 UR files, manifest v2 all `placed`) → full
verification (`validate:content`, `check:figures`, `check:no-answer-keys`, `npm test`,
`npm run build` en+ur) → ADR + PHR + drift reconciliation.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| **`sharp` as a `devDependency`** — the repo's first image-processing lib | A raster from any generator (HF MCP, ChatGPT, Gemini) arrives as a 0.5–2 MB PNG/JPG at an arbitrary size. Constitution Art. V.5 requires images "compressed"; an unoptimised 1 MB PNG on a Sindh 3G connection is exactly the failure mode the article names. `sharp` resize + WebP-encode is one offline call | **Commit rasters as-is** — rejected: violates Art. V.5, and a single figure could dwarf the rest of a page's weight. **A browser/canvas step** — rejected: no headless browser in the toolchain. **An online optimiser API** — rejected: would be the repo's first network-calling script (FR-016). **`svgo`-only** — does not apply to raster. `sharp` is dev-only, offline, and touched by exactly one script |

## Risks & follow-ups (max 3)

- **Gate/marker coupling churn.** `check-figures.mjs` now recognises two carrier forms and a
  per-Status branch; a bug could let a half-wired figure through or false-fail a `prompt-only`
  unit. Mitigation: the rewrite keeps the Spec 008 path literally unchanged for `prompt-only`
  rows; `tests/unit/figures-gate.test.mjs` carries a regression case asserting the existing
  EFMP-302 Unit 1 fixture (pre-render) still passes, plus one case per new failure mode.
- **Bilingual SVG label drift.** `<figId>.svg` and `<figId>.ur.svg` are two hand-authored files
  that must stay structurally identical (same shapes, only labels differ). Mitigation: the skill
  authors the `.ur.svg` by copy-then-translate-labels in the same step; the gate checks the
  `.ur.svg` exists for a `reviewed` diagram; a future check could compare element counts (out of
  scope now).
- **HF MCP availability at run time.** The image tool is the owner's client-side config; it may
  not be connected when the skill runs. Mitigation: FR-004's brief-and-`.staging/` fallback is
  first-class, not an error path; and the four Unit 1 figures are all `diagram` SVG, so the
  proving run does not depend on the raster route being live.

## Implementation notes (post-build reconciliation — Constitution Art. IV.4)

Recorded after Phases 2–6 shipped; contracts and `data-model.md` are unchanged, these are the
detail decisions the design left open:

- **`Figure.tsx` doc comment.** The JSDoc must not contain a literal `*/` — an early draft
  embedded `{/* FIGURE[...] */}` in the block comment and broke the MDX/webpack parse. The
  comment now says "the `FIGURE[...]` MDX comment marker" without the delimiters.
- **`kind="diagram"` is used on EFMP-302 Unit 1's `<Figure>` elements.** The contract calls
  `kind` advisory/optional; Unit 1 passes it so the manifest `Kind` and the rendered class agree
  and the documented `.figure--diagram img { max-width: 640px }` cap is exercised. `placement.md`
  keeps it optional for future units.
- **Node-and-arrow SVGs — arrowhead fill.** A `<marker>` path needs a theme-aware **fill class**
  (`.ah { fill: … }` + a `prefers-color-scheme: dark` override); a plain `fill="#1c1e21"`
  attribute is not caught by the dark block and the arrowhead disappears on a dark page. Added to
  `generate-figures/references/svg-authoring.md`.
- **Bilingual comparison table.** `fig-U1-1.ur.svg` keeps the **English geometry** (row-label
  column on the left, same grid), only the label text is translated — matching
  `bilingual-figures.md`'s "structurally identical, only labels differ". An RTL-mirrored column
  order was tried and abandoned (clipped labels, anchor confusion).
- **Embedded-SVG theming.** An `<img>`-referenced SVG follows the **Docusaurus page theme** (via
  the propagated `color-scheme`), not the raw OS `prefers-color-scheme`. Confirmed: light page →
  light figure, dark toggle → dark figure, in both locales. The SVG's own
  `@media (prefers-color-scheme: dark)` block is what does it.
- **All four Unit 1 figures are `Kind: diagram`** — including `fig-U1-2` (the two-panel
  "industrial vs inquiry" scene), authored as flat labelled vector per its own Spec 008 "clean
  flat vector" prompt. No raster route was needed for the proving unit.
