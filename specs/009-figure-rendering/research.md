# Phase 0 Research: Figure Rendering

**Feature**: `009-figure-rendering` | **Date**: 2026-08-30

No open unknowns — the four owner decisions (HF MCP raster route; hybrid SVG-first; full SDD;
render EFMP-302 Unit 1 now) fixed every fork. This records the decisions and the format detail
the spec deferred.

## R1 — Raster route: the Hugging Face MCP server

**Decision.** Illustration-kind figures are generated through the **Hugging Face MCP server**
(`https://huggingface.co/mcp`), configured by the owner in their own Claude Code MCP settings:

```jsonc
// ~/.claude.json (or project .mcp.json) — owner-side, NOT committed
"mcpServers": {
  "huggingface": {
    "type": "http",
    "url": "https://huggingface.co/mcp",
    "headers": { "Authorization": "Bearer ${HF_TOKEN}" }
  }
}
```

The owner adds an image Space at `huggingface.co/settings/mcp` — e.g. `FLUX.1-Krea-dev`
(photoreal), `Qwen-Image` (strong text rendering) — or enables **Dynamic Spaces** so the agent
can discover an image Space at run time. Free HF account credits cover the volume (a handful of
images per unit).

**How the skill uses it.** The skill **detects** whichever connected MCP tool generates an
image from a text prompt (name varies by Space, typically surfaced as a `gr_*` / Space-derived
tool); it does not hardcode a tool name. It calls that tool with the figure's `Prompt` and an
aspect hint, receives a URL or bytes, and — in its own agent turn, exactly as `author-unit`
uses `WebFetch` — fetches the file and hands it to `scripts/optimize-figure.mjs`.

**Fallback (no image tool connected).** The skill writes
`specs/content/<course>/figures/unit-NN.brief.md` — one block per illustration figure: the
prompt verbatim, a suggested aspect, the exact target filename, and a one-line "paste into
ChatGPT / Gemini / an HF Space" instruction. The owner generates and drops files into
`specs/content/<course>/figures/.staging/` (git-ignored). Re-running the skill ingests them.
This is a first-class path, not an error.

**Rejected.** A committed `scripts/generate-figures.mjs` calling the Gemini/OpenAI image API
with a key in `.env.local` — rejected: it would be the repo's first network-calling script
(every existing `scripts/*.mjs` is offline), needs a paid key, and couples CI-adjacent tooling
to a third-party endpoint. NotebookLM — no image API, interactive only.

## R2 — SVG-first for schematic figures

**Decision.** A figure is `Kind: diagram` (hand-authored SVG) by default; `Kind: illustration`
(raster via R1) only when it genuinely needs pictorial depth.

**Why.** Textbook figures are overwhelmingly labelled schematics — comparison tables,
relationship diagrams, node-and-arrow webs, flows. For these:

| | Hand-authored SVG | AI raster |
|---|---|---|
| Label fidelity | exact | frequently garbled / misspelled |
| Weight | 2–6 KB | 50–150 KB (even as WebP) |
| Dark mode | `prefers-color-scheme` in the file | fixed; often black-on-black |
| Git | diffable text | opaque binary |
| Cost / latency | zero | credits + a round trip |
| Bilingual | copy + translate labels | full re-generation |

All four EFMP-302 Unit 1 figures are "clean flat vector" by their own Spec 008 prompts —
`fig-U1-2` (two-panel classroom scene) is the borderline case and is authored as a `diagram`
SVG (simple flat figures, two labelled panels). The raster route stays built and documented for
a future figure that truly needs a photograph-like image.

## R3 — End-state: replace the comment marker with `<Figure>`

**Decision.** The `{/* FIGURE[id]: prompt; alt: ... */}` comment is **removed** and a
`<Figure id="id" src="/img/figures/<course>/unit-NN/<id>.svg" alt="<the marker's alt, verbatim>" />`
is put in its place. The manifest retains the prompt.

**Why.** The comment had three jobs: mark the insertion point, carry the generation prompt,
carry the alt text. Once the image exists: the `<Figure>` marks the point, the manifest carries
the prompt, the `<Figure alt>` carries the alt. Keeping a dead comment beside a live component
is noise and a second thing to keep in sync. This matches the Spec 008 `figures-manifest.md`
Lifecycle note verbatim: "replace each marker with a real `<img>` / `<figure>`".

**Gate consequence.** `check-figures.mjs` must accept a `<Figure id="…" alt="…" />` as a valid
"carrier" of figure X (equivalent to a comment marker) — see R7.

## R4 — `<img src="/img/…">`, not an SVGR import

**Decision.** `<Figure>` renders a plain `<img src="/img/figures/…">` pointing at a file in
`static/`.

**Why.** Root-absolute paths into `static/` are the repo's established asset pattern
(`src/css/custom.css` loads `/fonts/NotoNastaliqUrdu-Regular.woff2`). An `<img>` needs no
`import`, is valid in MDX with no ceremony, is identical for the `en` and `ur` routes, and
prints crisply for an SVG source. SVGR inline-import (`import Fig from './x.svg'` → a React
component, `currentColor`-themeable) was rejected: it forces a per-topic-file JS import,
complicates the translated-label `ur` variant, and is unnecessary because the SVG file carries
its own `<style>` with `@media (prefers-color-scheme: dark)` for theming behind an `<img>`.

## R5 — `sharp` as a devDependency for the offline optimiser

**Decision.** Add `sharp` to `devDependencies`. `scripts/optimize-figure.mjs` (new, **offline**)
uses it to: resize a raster so its longest edge ≤ 1600 px, encode WebP q80, and hard-fail if the
result exceeds the size budget (~150 KB). A `--svg` mode strips comments/whitespace (no `sharp`,
just string ops).

**Why.** The repo has no image lib. Any generator returns a large PNG/JPG; Art. V.5 requires
"compressed". `sharp` is the Node standard, is dev-only, runs offline on a local file, and is
invoked by exactly one script (the skill calls it; CI and the build never do). `svgo` deferred —
hand-authored SVGs are already < 6 KB.

## R6 — Manifest v2: columns + Status lifecycle

**Decision.** `specs/content/<course>/figures/unit-NN.md` table becomes:

```
| Figure ID | Topic | Kind | Prompt | Alt text | Src | Status |
```

- **`Kind`** — `diagram` | `illustration`.
- **`Src`** — the asset path `static/img/figures/<course-lowercase>/unit-NN/<figId>.<ext>`
  written as the site path `/img/figures/…`; **blank while `Status: prompt-only`**.
- **`Status`** lifecycle:
  - `prompt-only` — Spec 008 state: a comment marker, no asset, `Src` blank.
  - `generated` — an asset exists (in `.staging/` or already under `static/`) but the topic
    file still has the comment marker, not a `<Figure>`.
  - `placed` — the comment marker is replaced by `<Figure>`, the asset is committed under
    `static/`, and (for a `reviewed` bilingual `diagram`) the `.ur.svg` exists.

The gate's manifest parse becomes **column-aware** (read the header row, map names → indices)
so both the 5-column Spec 008 shape and the 7-column v2 shape parse correctly.

## R7 — Gate widening is additive

**Decision.** New checks fire **only** for rows at `Status ∈ {generated, placed}`. A unit whose
rows are all `prompt-only`, and every legacy five-file unit, take the **exact Spec 008 code
path** — no behaviour change (regression floor, SC-004).

New per-row checks (generated/placed):

1. `Kind` ∈ `{diagram, illustration}`.
2. `Src` is non-blank; for `placed`, the file exists at `ROOT/static/<Src without leading />`.
3. A **carrier** for the figure id exists in the EN `topic-NN.mdx` — a comment marker **or** a
   `<Figure id="…">`. (For `placed`, specifically a `<Figure>`.)
4. For a `reviewed` bilingual unit: the UR `topic-NN.mdx` has a `<Figure id="…">`; and if
   `Kind: diagram`, `<figId>.ur.svg` exists under `static/`.

"Carrier" also generalises the Spec 008 checks: "every topic file has ≥ 1 figure" and
"carrier-set == manifest-id-set both ways" count comment markers **and** `<Figure>` elements.

## R8 — Bilingual diagrams carry translated labels

**Decision.** Each placed `Kind: diagram` figure gets `<figId>.ur.svg` — a copy of `<figId>.svg`
with the visible label text translated to Urdu (Nastaliq via the SVG's own font stack, RTL text
anchoring). The Urdu `topic-NN.mdx` `<Figure src>` points at `<figId>.ur.svg`. A placed
`Kind: illustration` (a drawn scene with little or no text) reuses `<figId>.webp` with a
translated `alt`.

**Why.** An English comparison table on the Urdu page is an Art. III.2 parity break. The SVG is
where a diagram's words live, so the SVG must be localised.

**Gate posture.** For a `reviewed` UR mirror the `.ur.svg` existence is enforced (R7.4). For a
`draft` UR mirror (EFMP-302 Unit 1 today — skeleton stubs) the `.ur.svg` is authored and wired
now but **not** gate-blocked, exactly as Spec 008 does not enforce UR marker-ID parity for
`draft`.

## R9 — No CI change; build/deploy unaffected

`check:figures` already runs in the `build` job — its checks widen, the wiring does not. The
build copies `static/img/` verbatim into `build/`. Lighthouse `total-byte-weight` (`warn`,
500 KB, audited on `/` and one EFMP-301 legacy unit) is untouched — neither audited page
carries a figure; per-image budgets are enforced at optimise time, not in CI. `deploy-prod.sh`
gates only on the whole CI run being green.
