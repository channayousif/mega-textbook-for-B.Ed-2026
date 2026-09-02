# ADR-0012: Figure Rendering — `<Figure>` Component, Manifest Lifecycle, and the `generate-figures` Skill

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together.

- **Status:** Accepted
- **Date:** 2026-09-01
- **Feature:** 009-figure-rendering
- **Context:** Spec 008 (ADR-0011, component 4) stopped at figure **markers**: an inline
  `{/* FIGURE[fig-U<n>-<seq>]: <prompt>; alt: <alt> */}` MDX comment per topic plus a per-unit
  manifest (`| Figure ID | Topic | Prompt | Alt text | Status |`), every row `Status: prompt-only`,
  and it scoped image generation "Out of Scope". Its `figures-manifest.md` Lifecycle note reserved
  a later pass to "replace each marker with a real `<img>` / `<figure>`". This feature is that pass.
  The constraints: the render must work in **both locales** (an English comparison table on the
  Urdu page is an Art. III.2 parity break); images must be **lazy-loaded and compressed**
  (Art. V.5 — the < 200 KB first-load budget excludes images only if they are deferred);
  every image needs **non-empty alt text** (Art. III.8); no committed `scripts/*.mjs` may make a
  **network call** (repo invariant, FR-016); and `check:figures` must stay **byte-for-byte green**
  for every `prompt-only` unit and every legacy five-file unit (regression floor, SC-004). ADR-0011
  had explicitly **rejected** "a real component that renders" (its alternative D) *for Spec 008* on
  scope grounds — this ADR revisits and adopts it as its own SDD feature, proven on EFMP-302
  Unit 1's four figures. No constitution amendment: Art. III.8 and V.5 are satisfied and slightly
  strengthened, not modified; the `style-guide.md` `3.0 → 3.1` bump is the Spec 006 content-pipeline
  freeze mechanism, not governance.

<!-- Significance checklist (ALL true):
     1) Impact — a new rendered content type (<figure><img>), a first image-processing dependency
        (sharp, devDep), a rewritten CI gate that learns a second carrier form and a per-Status
        branch, a manifest schema v2, a committed asset tree under static/, and a new authoring skill.
     2) Alternatives — comment-plus-component vs marker-replacement; <img src="/img/"> vs SVGR
        import; SVG-first vs raster-first; sharp devDep vs commit-as-is vs online optimiser vs
        svgo-only; translated .ur.svg vs one shared asset; HF MCP vs a committed API-calling script.
     3) Scope — cross-cutting: content authoring, the reader experience in two locales, CI
        enforcement, the build's asset pipeline, and the boundary with the author-unit skill. -->

## Decision

Adopt, as **one integrated rendering layer**, the following six components. They ship together in
Spec 009, are motivated by the same goal (turn markers into images), and would be revised together.

### 1. `<Figure>` MDX component — marker **replacement**, not marker + component

`src/components/Figure.tsx` — a pure presentational function component (props `id`, `src`, `alt`,
`caption?`, `kind?`), registered globally in `src/theme/MDXComponents.tsx`, rendering
`<figure class="figure figure--{kind}" id={id}><img src alt loading="lazy" decoding="async">[<figcaption>]</figure>`.
When a figure is rendered, its `{/* FIGURE[...] */}` comment is **removed** and a
`<Figure id="…" src="/img/figures/…" alt="…" />` is put at the same position. The comment's three
jobs (mark the spot, carry the prompt, carry alt) are done once the image exists: the `<Figure>`
marks the spot, the manifest keeps the prompt, `<Figure alt>` carries alt. Keeping a dead comment
beside a live component is noise and a second thing to sync. This is ADR-0011's rejected
alternative D, adopted with a full spec behind it.

### 2. `<img src="/img/figures/…">` into `static/`, not an SVGR import

`<Figure>` renders a plain `<img>` pointing at a root-absolute path in `static/` — the repo's
established asset pattern (the Nastaliq webfont loads the same way). No `import`, valid in MDX with
no ceremony, identical for the `en` and `ur` routes, prints crisply for an SVG source. SVGR
inline-import (`currentColor`-themeable) was rejected: a per-topic-file JS import, and it
complicates the translated-label `ur` variant. The SVG file carries its own
`@media (prefers-color-scheme: dark)` block, so it themes correctly behind an `<img>` — confirmed:
an `<img>`-referenced SVG follows the **Docusaurus page theme** via the propagated `color-scheme`,
so a light page shows a light figure and the dark toggle shows a dark figure, in both locales.

### 3. Hybrid, SVG-first — `Kind: diagram` (hand-authored) vs `Kind: illustration` (raster)

A figure is `diagram` by default — a labelled schematic (comparison table, relationship diagram,
node-and-arrow web, two-panel contrast, flow) hand-authored as a self-contained SVG:
`viewBox` only, `role="img"` + `<title>`/`<desc>`, a system-font stack, an inline light palette
**and** a `@media (prefers-color-scheme: dark)` block, meaning by shape + label never colour,
≤ 20 KB. `illustration` (a scene needing pictorial depth) is the exception, generated via the
owner-configured **Hugging Face MCP** image tool (`https://huggingface.co/mcp`, Bearer HF token,
an image Space or Dynamic Spaces) — the skill **detects** a connected prompt→image tool at run
time, never hardcodes a name, and fetches the result in its own agent turn (like `author-unit`'s
`WebFetch`). Fallback when no tool is connected: emit `figures/unit-NN.brief.md` and ingest a
raster the owner drops in git-ignored `figures/.staging/` — a first-class path, not an error. All
four EFMP-302 Unit 1 figures are `diagram` (their Spec 008 prompts say "clean flat vector"),
including the two-panel `fig-U1-2` scene, so the proving run needs no raster route.

### 4. Manifest v2 + a `prompt-only → generated → placed` lifecycle + the "carrier" concept

`specs/content/<course>/figures/unit-NN.md` gains `Kind` and `Src`:
`| Figure ID | Topic | Kind | Prompt | Alt text | Src | Status |`. `Src` is the `/img/figures/…`
path, **blank iff `prompt-only`**. `Status`: `prompt-only` (comment only, no asset) → `generated`
(asset exists, still a comment) → `placed` (comment replaced by `<Figure>`, asset committed). A
**carrier** for figure `X` is a `{/* FIGURE[X] */}` comment **or** a `<Figure id="X" />` — the
Spec 008 invariants ("every topic file has ≥ 1", "carrier-set == manifest-id-set both ways",
"`Topic` == the carrier file's `topic_label`") all count carriers of either form. The manifest
parse is **column-aware** (read the header row → name→index map), so the 5-column Spec 008 shape and
the 7-column v2 shape both parse. A row may not silently regress from `placed`; a unit may hold a
mix (incremental rendering).

### 5. `check:figures` widened **additively** — new checks fire only from `generated`/`placed`

`scripts/check-figures.mjs` is rewritten but keeps the **exact Spec 008 code path** for
`prompt-only` rows and legacy units (regression floor). New per-row checks, `Status ∈ {generated,
placed}` only: `Kind ∈ {diagram, illustration}`; `Src` non-blank and (for `placed`) the file exists
at `ROOT/static/<Src>`; the EN topic file carries a `<Figure id>` (for `placed`, specifically a
`<Figure>`, not a bare comment); and for a `translation_status: reviewed` bilingual unit, the UR
topic file carries a `<Figure id>` and — if `Kind: diagram` — `<figId>.ur.svg` exists. No new CI
step: `check:figures` already runs in the `build` job; the build copies `static/img/` verbatim.

### 6. Bilingual diagrams carry translated labels (`<figId>.ur.svg`); `sharp` is a devDependency

A placed `diagram` also gets `<figId>.ur.svg` — a structural copy of `<figId>.svg` with the visible
labels translated to Urdu (Nastaliq-first font stack), and the UR `<Figure src>` points at it. A
placed `illustration` reuses the one `.webp` with a translated `alt`. For a `draft` UR mirror
(EFMP-302 Unit 1 today) the `.ur.svg` is written and wired now but **not** gate-blocked, matching
Spec 008's posture on UR marker-ID parity for `draft`. The one new dependency is **`sharp` as a
`devDependency`**, used only by the offline `scripts/optimize-figure.mjs` (local file → resize
longest edge ≤ 1600 px + WebP q80, hard-fail over 150 KB; a `--svg` mode strips whitespace/comments,
hard-fail over 20 KB). It is never invoked at build, CI, or render time.

## Consequences

### Positive

- **The Spec 008 Lifecycle note is executed** — markers become real, accessible, lazy-loaded
  images in both locales; the reader experience Spec 008 promised is delivered.
- **Regression floor holds.** `prompt-only` and legacy units hit the unchanged code path;
  `tests/unit/figures-gate.test.mjs` carries a case per new failure mode plus the pre-render
  regression case. Full suite 113/113, all gates + `build` (en+ur) green on the proving unit.
- **Low-bandwidth first.** Diagram SVGs land at 2–4 KB (vs 50–150 KB for an AI raster), theme
  themselves, diff as text, and localise by copy-then-translate. `<Figure>` always sets
  `loading="lazy" decoding="async"`. The four Unit 1 assets + 4 `.ur.svg` add < 30 KB to the build.
- **No secret in the repo, no network-calling script.** The HF token lives only in the owner's MCP
  client config; the generation call is an agent-turn action, exactly like `author-unit`'s
  `WebSearch`/`WebFetch`. Every `scripts/*.mjs` stays offline.
- **Adding a course stays content-only** (Art. V.4) — `<Figure>` + the widened gate are generic;
  a new course's figures are just new files under `static/img/figures/<course>/` + manifest rows.
- **Clean boundary.** `author-unit` writes markers + a `prompt-only` manifest; `generate-figures`
  renders them. One skill each, no sub-agent.

### Negative

- **Gate/marker coupling churn.** `check-figures.mjs` now recognises two carrier forms and a
  per-Status branch; a bug could pass a half-wired figure or false-fail a `prompt-only` unit.
  Mitigation: the Spec 008 path is literally unchanged for `prompt-only`; one test per new mode.
- **Two hand-authored files per bilingual diagram** (`<figId>.svg` + `<figId>.ur.svg`) that must
  stay structurally identical. Mitigation: the skill authors the `.ur.svg` by copy-then-translate
  in the same step; a future gate check comparing element counts is noted as out of scope.
- **First image-processing dependency in the repo** (`sharp`). Mitigation: dev-only, offline,
  touched by exactly one script that CI and the build never call. See plan.md Complexity Tracking.
- **Embedded-SVG theming is implicit** — it works because Chromium propagates the page's
  `color-scheme` to `<img>`-referenced SVGs; a browser that doesn't would show a light figure on a
  dark page (still legible — the SVG has an opaque background). Not a broken state.
- **`draft` UR figures are unverified by the gate** — the `.ur.svg` label translations are only
  checked at the human G5 Urdu review. Accepted: same posture as Spec 008's `draft` marker parity.

## Alternatives Considered

- **Keep the comment marker AND add a `<Figure>` beside it.** Rejected: a dead comment next to a
  live component is noise and a second thing to keep in sync; the manifest already retains the
  prompt. ADR-0011's Lifecycle note says "replace".
- **SVGR inline-import (`import Fig from './x.svg'`).** Gives `currentColor` theming, but forces a
  per-topic-file JS import and complicates the translated-label `ur` route. The SVG's own
  `prefers-color-scheme` block themes it behind a plain `<img>` anyway.
- **Raster-first (AI image for every figure).** Rejected: textbook figures are overwhelmingly
  labelled schematics — AI raster garbles labels, weighs 50–150 KB, ignores dark mode, and can't
  be localised without full regeneration. SVG-first inverts that; raster stays available for a true
  photoreal need.
- **Commit rasters as-is / a browser-canvas optimiser / an online optimiser API / `svgo` only.**
  Rejected respectively: violates Art. V.5; no headless browser in the toolchain; would be the
  repo's first network-calling script (FR-016); doesn't apply to raster. `sharp` (dev-only,
  offline, one script) is the smallest viable choice.
- **A committed `scripts/generate-figures.mjs` calling the Gemini/OpenAI image API with a key in
  `.env.local`.** Rejected: first network-calling script, needs a paid key, couples CI-adjacent
  tooling to a third-party endpoint. The HF MCP call in the skill's agent turn has none of these.
- **One shared asset on both locales for a diagram (translate only `alt`).** Rejected for
  `diagram`: an English comparison table on the Urdu page is an Art. III.2 parity break — a
  diagram's words live in the SVG, so the SVG must be localised. Kept for `illustration` (little/no
  text).
- **A blocking `respectPrefersColorScheme` change or a runtime theme-switch in `<Figure>`.**
  Rejected: out of scope; the SVG's own media query plus the page's `color-scheme` propagation
  already give correct light/dark without JS.

## References

- Feature Spec: [specs/009-figure-rendering/spec.md](../../specs/009-figure-rendering/spec.md)
- Implementation Plan: [specs/009-figure-rendering/plan.md](../../specs/009-figure-rendering/plan.md)
  (see "Implementation notes (post-build reconciliation)")
- Research: [specs/009-figure-rendering/research.md](../../specs/009-figure-rendering/research.md) (R1–R9)
- Contracts: [figure-manifest-v2.md](../../specs/009-figure-rendering/contracts/figure-manifest-v2.md),
  [figure-component.md](../../specs/009-figure-rendering/contracts/figure-component.md)
- Related ADRs: [ADR-0011](0011-nested-per-topic-unit-pedagogy-bounded-answer-keys-and-figure-markers.md)
  (this feature renders its figure markers; revisits its rejected alternative D),
  [ADR-0010](0010-content-depth-standard-and-reusable-unit-authoring-skill.md) (the skill pattern),
  [ADR-0003](0003-bilingual-reader-rendering-and-print-handouts.md) (bilingual render + print handouts)
- Evaluator Evidence: [history/prompts/009-figure-rendering/0001-implement-figure-rendering-phases-1-7.green.prompt.md](../prompts/009-figure-rendering/0001-implement-figure-rendering-phases-1-7.green.prompt.md)
  (gates + `vitest` 113/113 + `build` en+ur, all green)
