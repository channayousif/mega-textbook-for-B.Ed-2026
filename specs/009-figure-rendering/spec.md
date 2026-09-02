# Feature Specification: Figure Rendering — turn FIGURE markers into real images

**Feature Branch**: `009-figure-rendering`
**Created**: 2026-08-30
**Status**: Draft
**Input**: User request: "create or extend the skill to create images from the image prompts in
the topics created by [the] unit writing skill. I want to replace the prompts with generated
images. we can use any image generation add on or connector or plugin … i generally use chat
gpt or gemini or google notebooklm to generate images."

Owner decisions (AskUserQuestion, 2026-08-30):

- **Raster route** = the free Hugging Face MCP server (`https://huggingface.co/mcp`), configured
  by the owner in their Claude Code MCP settings.
- **Hybrid, SVG-first**: schematic figures are hand-authored SVG; only genuine illustrations use
  the raster route.
- **Full SDD**: this `specs/009-figure-rendering/` set precedes implementation.
- **Scope now**: ship the skill + platform infra **and** render EFMP-302 Unit 1's four figures.

## Context

Spec 008 (rich unit pedagogy) added **figure markers** — `{/* FIGURE[fig-U<n>-<seq>]:
<generation prompt>; alt: <alt text> */}` comments placed in each `topic-NN.mdx` where a
teaching image belongs — plus a per-unit manifest (`specs/content/<course>/figures/unit-NN.md`)
and a CI gate (`scripts/check-figures.mjs`). Spec 008 deliberately stopped at `Status:
prompt-only`: **nothing generates or renders an image**. Its `figures-manifest.md` contract
carries a "Lifecycle note" reserving a "later, out-of-scope image pass" to "generate images
from the prompts, drop the files under `static/`, replace each marker with a real `<img>` /
`<figure>`, and flip the manifest `Status` to `generated` then `placed`."

This feature **is** that pass. The problem it solves: every new-shape unit currently ships four
invisible comments where four teaching diagrams should be. Readers — B.Ed trainees in Sindh,
often on low-end phones — get prose with no visual scaffold for the comparison tables,
relationship triangles and influence webs the prose describes. The intended outcome: each
FIGURE marker becomes a committed, accessible, lazy-loaded image that renders on the page in
both locales, produced by a repeatable skill, and the figure gate enforces the finished state.

## User Scenarios & Testing

### User Story 1 — An author renders a unit's figures (Priority: P1) 🎯 MVP

A content author has just run `author-unit` and has a unit whose `topic-NN.mdx` files carry
FIGURE markers and whose `figures/unit-NN.md` manifest is all `prompt-only`. They invoke the
`generate-figures` skill for that unit. The skill classifies each figure as a **diagram** or an
**illustration**; authors every diagram as a hand-written SVG committed under `static/img/`;
routes every illustration through the Hugging Face MCP image tool (or, if that tool is not
connected, emits a generation brief and ingests the returned file); optimises each raster to
WebP within budget; replaces every marker in the `topic-NN.mdx` with a `<Figure …/>`; writes a
translated-label `.ur.svg` for each diagram and mirrors the `<Figure>` into the Urdu file; and
updates the manifest rows to `Status: placed` with the new `Kind` and `Src` columns. It then
runs the gate set and the build and reports.

**Why this priority**: This is the feature. Without it there is no repeatable way to turn the
Spec 008 markers into images; every unit stays visually empty.

**Independent Test**: Run the skill against EFMP-302 Unit 1 (four markers, manifest all
`prompt-only`). Afterwards: four image files exist under `static/img/figures/efmp-302/unit-01/`;
each `topic-0N.mdx` has a `<Figure>` where its marker was; the manifest's four rows read
`placed` with a `Kind` and a `Src`; `npm run check:figures`, `npm run validate:content`,
`npm test`, and `npm run build` (en + ur) all pass; the built pages show the images.

**Acceptance Scenarios**:

1. **Given** a topic file with `{/* FIGURE[fig-U1-1]: …; alt: "A table comparing…" */}` and a
   manifest row `fig-U1-1 | 1.1 | … | prompt-only`, **When** the skill runs, **Then** the
   marker is replaced by `<Figure id="fig-U1-1" src="/img/figures/efmp-302/unit-01/fig-U1-1.svg"
   alt="A table comparing…" />`, the SVG file exists, and the manifest row reads
   `fig-U1-1 | 1.1 | diagram | … | /img/figures/efmp-302/unit-01/fig-U1-1.svg | placed`.
2. **Given** an illustration-kind figure and a connected Hugging Face MCP image tool, **When**
   the skill runs, **Then** it calls that tool with the figure's prompt, saves the result,
   optimises it to a WebP ≤ the size budget, and places it exactly as in scenario 1 with
   `Kind: illustration` and a `.webp` `Src`.
3. **Given** the same illustration figure and **no** connected image tool, **When** the skill
   runs, **Then** it writes `specs/content/<course>/figures/unit-NN.brief.md` (one block per
   illustration: prompt, aspect, target filename, paste-into-ChatGPT/Gemini instruction), sets
   that row to `Status: generated` if a file is already staged, and stops with clear next
   steps — it does **not** fabricate or skip the image.
4. **Given** a unit whose EN `index.mdx` is `translation_status: reviewed`, **When** the skill
   places a diagram, **Then** it also writes `<figId>.ur.svg` with the labels translated and
   points the Urdu file's `<Figure src>` at the `.ur.svg`.

---

### User Story 2 — A reader sees the figures on the page (Priority: P1)

A trainee opens EFMP-302 Unit 1 Topic 1.1 on a phone. Where the prose introduces the four
features of a profession, a labelled comparison table renders inline — lazy-loaded, legible in
light or dark mode, with descriptive alt text for a screen reader. The same page in Urdu shows
the same diagram with Urdu labels. Printing the topic (the page's Print button) keeps each
figure whole on one page.

**Why this priority**: The reader-facing outcome is the point; a placed figure that renders
badly (blocks first paint, breaks in dark mode, splits across a page break, or has no alt text)
is a regression, not progress.

**Independent Test**: `npm run build` then `npm run serve`; load the four EN topic pages and
the four UR topic pages; confirm each figure renders, has non-empty `alt`, is inside a
`<figure>`, loads lazily, and survives print-emulation without splitting; Lighthouse
accessibility stays ≥ 0.90.

**Acceptance Scenarios**:

1. **Given** a built topic page with a `<Figure>`, **When** it renders, **Then** the DOM has
   `<figure><img src="/img/figures/…" alt="…" loading="lazy" decoding="async"></figure>` and
   the `alt` equals the value from the original marker.
2. **Given** the dark theme, **When** an SVG diagram renders, **Then** its strokes, fills and
   labels remain legible (no black-on-black, no colour-only meaning).
3. **Given** print emulation (A4), **When** a topic with a figure prints, **Then** the figure
   does not split across a page boundary (`break-inside: avoid`).

---

### User Story 3 — The figure gate enforces the finished state (Priority: P2)

A developer edits a topic file and accidentally deletes a `<Figure>`, or points its `src` at a
file that was never committed, or leaves a manifest row at `prompt-only` after wiring the
image. CI's figure gate fails with a message naming the unit and the exact unmet condition. A
legacy five-file unit and any not-yet-rendered unit still pass unchanged.

**Why this priority**: Spec 008 made the marker↔manifest match a CI invariant (Constitution
Art. VII, Engineering gate). Rendering must not create a way for a half-wired figure to reach
`main` and the deploy cron.

**Independent Test**: Fixture cases in `tests/unit/figures-gate.test.mjs` for each violation
(marker/`<Figure>` gone; `Src` file missing for a `placed` row; `Kind` outside the enum; a
`placed` row whose EN `<Figure>` has no matching UR `<Figure>` in a reviewed unit; a diagram
`placed` in a reviewed unit with no `.ur.svg`) each exit non-zero naming the condition; every
pre-existing `prompt-only` and legacy fixture still passes.

**Acceptance Scenarios**:

1. **Given** a `placed` manifest row whose `Src` file does not exist under `static/`, **When**
   `check:figures` runs, **Then** it fails naming the figure ID and the missing path.
2. **Given** a topic file where the `{/* FIGURE[...] */}` comment has been replaced by a
   `<Figure id="fig-U1-1" alt="…"/>`, **When** `check:figures` runs, **Then** it accepts the
   `<Figure>` as satisfying "every topic file carries the figure" and reads the ID and alt from
   it.
3. **Given** a unit still at `prompt-only` (markers, no `<Figure>`, no assets), **When**
   `check:figures` runs, **Then** it passes exactly as under Spec 008.

---

### Edge Cases

- **Two figures in one topic file** — one `<Figure>` and one still-comment marker: the gate
  accepts the mix (a unit may be rendered incrementally). All rows for the unit need not share
  a `Status`.
- **A raster the owner supplies is huge** (e.g. 2 MB PNG): the optimise step MUST bring it
  under the size budget or fail loudly; it MUST NOT commit an unoptimised file.
- **An SVG that embeds a raster or an external font**: rejected by the SVG-authoring rules
  (self-contained, system-font stack only, no `<image>` with a data URI over the size budget).
- **The Hugging Face MCP tool returns a URL, not bytes**: the skill fetches it during its own
  turn (like `author-unit` uses `WebFetch`) and saves locally; no committed script makes the
  network call.
- **`alt` text differs between the marker and the manifest**: the marker/`<Figure>` `alt` is
  authoritative for the page; the human Content gate reconciles the manifest.
- **Urdu file is a `draft` skeleton stub** (as EFMP-302 Unit 1 is now): the skill still mirrors
  the `<Figure>` and points it at the `.ur.svg`; the parity sub-check is skipped for `draft`
  exactly as the marker-ID parity is today.

## Requirements

### Functional Requirements

- **FR-001**: A repeatable **skill** MUST take one unit's FIGURE markers + manifest and produce,
  for every figure, a committed image asset and a rendered `<Figure>` in the topic file(s),
  leaving the manifest rows at `Status: placed`.
- **FR-002**: Each figure MUST be classified as **`diagram`** (a labelled schematic — comparison
  table, relationship/flow, node-and-arrow web) or **`illustration`** (a scene/drawing).
  `diagram` is the default; `illustration` is used only when a figure genuinely needs
  pictorial depth.
- **FR-003**: `diagram` figures MUST be authored as **self-contained SVG** — no external
  fonts (system-font stack), no external or heavyweight embedded rasters, a `<title>` and
  `role="img"` for assistive tech, meaning carried by shape/position/label (never colour
  alone), and legible in both the light and dark site themes.
- **FR-004**: `illustration` figures MUST be produced via the **Hugging Face MCP** image tool
  when one is connected to the session; when none is connected, the skill MUST emit a
  generation brief and ingest an owner-supplied file from a git-ignored staging directory — it
  MUST NOT fabricate, placeholder, or silently skip an image.
- **FR-005**: Every raster asset MUST be stored as **WebP**, resized so its longest edge is
  ≤ 1600 px, and MUST meet a per-image weight budget (target ≤ 150 KB) — enforced at
  optimisation time; an over-budget asset is a hard failure, not a warning (Constitution
  Art. V.5).
- **FR-006**: Image assets MUST live under `static/img/figures/<course-code-lowercase>/unit-NN/`
  and be referenced by root-absolute path (`/img/figures/…`), resolving identically for the
  `en` and `ur` locales with no per-locale file duplication **except** the translated-label
  SVG (FR-009).
- **FR-007**: A new MDX component **`<Figure>`** (`id`, `src`, `alt`, optional `caption`,
  optional `kind`) MUST render `<figure><img src alt loading="lazy" decoding="async">
  [<figcaption>]</figure>`, be registered globally so topic files need no import, be styled for
  light/dark, be `break-inside: avoid` in the A4 print stylesheet, and be RTL-neutral.
- **FR-008**: Each FIGURE **comment marker** MUST be **replaced** by a `<Figure>` whose `id`
  equals the marker ID, whose `alt` equals the marker's alt text verbatim, and whose `src` is
  the asset path. The comment is not kept.
- **FR-009**: For a unit whose EN `index.mdx` is `translation_status: reviewed`, each placed
  `diagram` MUST also have a `<figId>.ur.svg` with its labels translated, and the Urdu
  `topic-NN.mdx` `<Figure src>` MUST point at the `.ur.svg`. A placed `illustration` reuses the
  same asset with a translated `alt`. For a `draft` Urdu mirror the `.ur.svg` is written and
  wired but not gate-enforced.
- **FR-010**: The manifest gains a **`Kind`** column (`diagram` | `illustration`) and a
  **`Src`** column (the asset path, blank while `prompt-only`). `Status` lifecycle:
  `prompt-only` → `generated` (asset exists, not yet wired) → `placed` (marker replaced,
  asset + `<Figure>` committed).
- **FR-011**: `scripts/check-figures.mjs` MUST recognise **both** the `{/* FIGURE[...] */}`
  comment form and the `<Figure id="…" alt="…" />` JSX form as "the topic file carries figure
  X", extracting ID and alt from whichever is present. Everything Spec 008's gate checked stays
  checked.
- **FR-012**: For every manifest row with `Status: placed`, the gate MUST additionally assert:
  the `Src` file exists under `static/`; `Kind` is in the enum; the EN `topic-NN.mdx` has a
  `<Figure>` with that ID; and, for a `reviewed` bilingual unit, the UR `topic-NN.mdx` has a
  matching `<Figure>` and (for `diagram`) the `.ur.svg` exists.
- **FR-013**: A unit at `Status: prompt-only` (Spec 008 state) and every legacy five-file unit
  MUST pass `check:figures` **byte-for-byte unchanged** — the new checks are additive and only
  apply once a row reaches `generated`/`placed`.
- **FR-014**: The `figures-manifest.md` contract, the `specs/content/style-guide.md`
  `## Figure markers and manifests` section, and the `author-unit` skill's
  `references/figure-prompts.md` / `references/structure-standard.md` MUST be updated to the
  v2 manifest + the `<Figure>` end-state, and `style-guide.md` `version` MUST bump `3.0` → `3.1`.
- **FR-015**: The `author-unit` skill's `figure-prompts.md` MUST point at the new skill for the
  rendering pass; the boundary stays: `author-unit` writes markers + `prompt-only` manifest,
  `generate-figures` renders them.
- **FR-016**: Any script this feature adds (e.g. a raster optimiser) MUST be **offline** — it
  processes local files only. The Hugging Face MCP call happens in the skill/agent turn, never
  in a committed script (preserving the repo invariant that `scripts/*.mjs` make no network
  calls).
- **FR-017**: **Definition of Done**: the `<Figure>` component + styles; the `check-figures.mjs`
  rewrite + tests; the v2 manifest contract + `style-guide.md` v3.1; the new `generate-figures`
  skill; and **EFMP-302 Unit 1's four figures rendered** — four committed assets, four
  `<Figure>` in the EN topic files, the Urdu mirror wired, the manifest at `placed`, every gate
  + `npm run build` green. Rendering other units/courses is subsequent execution.

### Key Entities

- **Figure asset** — a committed file under `static/img/figures/<course>/unit-NN/`: `<figId>.svg`
  (diagram) or `<figId>.webp` (illustration), plus optionally `<figId>.ur.svg` (translated
  diagram). Root-absolute referenced.
- **`<Figure>` component** — the MDX element that renders an asset as an accessible, lazy,
  print-safe `<figure>`. Replaces the comment marker in the rendered unit.
- **Figure manifest v2** — `specs/content/<course>/figures/unit-NN.md`, columns
  `| Figure ID | Topic | Kind | Prompt | Alt text | Src | Status |`.
- **Generation brief** — `specs/content/<course>/figures/unit-NN.brief.md`, emitted only when no
  image tool is connected; consumed by the owner; the returned files land in a git-ignored
  `specs/content/<course>/figures/.staging/`.
- **`generate-figures` skill** — `.claude/skills/generate-figures/` (`SKILL.md` + `references/`),
  sibling of `author-unit`.

## Success Criteria

- **SC-001**: Running the skill on EFMP-302 Unit 1 replaces all four markers with `<Figure>`,
  commits four assets, updates four manifest rows to `placed`, and leaves `check:figures`,
  `validate:content`, `npm test`, and `npm run build` (en + ur) green — with **zero** manual
  edits to the topic prose.
- **SC-002**: Each rendered figure page keeps Lighthouse **accessibility ≥ 0.90**; every
  `<img>` has non-empty `alt`; every diagram SVG carries a `<title>`.
- **SC-003**: Every committed raster asset is **≤ 150 KB**; every committed diagram SVG is
  **≤ 20 KB**; the four Unit 1 assets together add **< 300 KB** to the build.
- **SC-004**: A developer who deletes a `<Figure>`, breaks a `Src` path, or forgets to flip a
  `Status` gets a **non-zero `check:figures`** naming the unit and the condition; a
  `prompt-only` unit and a legacy unit still pass unchanged (regression floor).
- **SC-005**: Given only a unit's markers + manifest + `references/svg-authoring.md`, the skill
  produces the diagram SVGs and the `<Figure>` wiring with **zero clarifying questions about
  what structure to output** (mirrors Spec 008 SC-009).
- **SC-006**: Both locales render the figure: the EN page shows `<figId>.svg`, the UR page shows
  `<figId>.ur.svg` with Urdu labels, from one `<Figure>` element per file.

## Out of Scope

- Rendering figures for any unit other than EFMP-302 Unit 1 (subsequent execution).
- Re-generating or restyling Spec 008's *prompts* — the prompts are the input, unchanged.
- An image CDN, responsive `srcset`, art-directed `<picture>`, or `@docusaurus/plugin-ideal-image`
  (root-absolute `<img>` into `static/` is enough at this scale).
- Animations, interactive/zoomable diagrams, or a lightbox.
- A database-backed figure catalogue, or exposing figures to the Spec 003 LMS.
- Auto-translation of SVG labels (the skill translates them as part of authoring; no MT pipeline).
- Bulk back-fill: EFMP-302 Units 2–6 and other courses have no per-topic layout yet, so no
  markers to render.

## Assumptions

- The owner configures the Hugging Face MCP server (`https://huggingface.co/mcp`) in their own
  Claude Code MCP settings and adds an image Space (e.g. `FLUX.1-Krea-dev`, `Qwen-Image`) or
  enables Dynamic Spaces; the free HF credits cover the volume. If it is not connected when the
  skill runs, the brief-and-staging fallback (FR-004) applies.
- EFMP-302 Unit 1's four figures are, by their own prompts, "clean flat vector" — so all four
  are authorable as `diagram` SVG. `fig-U1-2` (two-panel classroom scene) is the borderline
  case; the skill treats it as a `diagram` unless the owner asks for a raster.
- No constitution amendment is required: Art. VII already names `check:figures` as an
  Engineering-gate line item; this feature widens that gate's checks within the same mandate.
  Art. III.8 (alt text) and Art. V.5 (lazy + compressed) are satisfied by FR-003/005/007, not
  changed.
