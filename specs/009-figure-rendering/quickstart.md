# Quickstart: Figure Rendering

The order to build Spec 009, then the render loop the `generate-figures` skill runs.

## Build order (see `tasks.md` for the task breakdown)

1. **Contracts + governance** — `contracts/figure-manifest-v2.md`, `contracts/figure-component.md`
   (this dir); pointer atop `specs/008-rich-unit-pedagogy/contracts/figures-manifest.md`;
   `specs/content/style-guide.md` `## Figure markers and manifests` rewritten to v2, front-matter
   `version` `"3.0"` → `"3.1"`.
2. **`<Figure>` component** — `src/components/Figure.tsx`; register in
   `src/theme/MDXComponents.tsx`; `.figure` block in `src/css/custom.css` (light/dark, print
   `break-inside: avoid`).
3. **Gate rewrite (red-first)** — extend `tests/unit/figures-gate.test.mjs` with the new cases,
   watch them fail, then rewrite `scripts/check-figures.mjs` (column-aware v2 parse; `<Figure>`
   carrier recognition; per-`Status` branch; placed-asset existence; bilingual `.ur.svg`). The
   `prompt-only` + legacy fixtures must stay green throughout.
4. **Offline optimiser** — `scripts/optimize-figure.mjs` + `sharp` devDependency +
   `optimize:figure` script alias.
5. **The skill** — `.claude/skills/generate-figures/SKILL.md` + `references/svg-authoring.md`,
   `raster-hf-mcp.md`, `placement.md`, `bilingual-figures.md`. Pointer from
   `.claude/skills/author-unit/references/figure-prompts.md`.
6. **Housekeeping** — `.gitignore` `specs/content/**/figures/.staging/`; README "Rendering
   figures" note; `specs/backlog.md` "From 008" section.
7. **Prove it** — render EFMP-302 Unit 1 (below).
8. **Verify + ADR + PHR** — full gate + build; `/sp.adr` for the figure-rendering decision
   cluster; PHRs; reconcile any drift back into the contracts.

## The render loop (per unit)

**Inputs**: a unit whose `topic-NN.mdx` carry FIGURE markers and whose
`specs/content/<course>/figures/unit-NN.md` is (all or partly) `prompt-only`.

1. **Classify.** Read each manifest row. `Kind: diagram` unless the figure genuinely needs a
   photograph-like image → `illustration`.
2. **Diagrams → author SVG.** Per `references/svg-authoring.md`: pick the archetype (comparison
   table / relationship / node-and-arrow web / split panel / flow); write a self-contained SVG
   to `static/img/figures/<course>/unit-NN/<figId>.svg` with `<title>`, `role="img"`,
   system-font stack, an `@media (prefers-color-scheme: dark)` block, and meaning carried by
   shape + label (never colour). `npm run optimize:figure -- --svg <file> <file>`; confirm
   ≤ 20 KB.
3. **Illustrations → HF MCP (or brief).** Per `references/raster-hf-mcp.md`: if a HF MCP image
   tool is connected, call it with the row's `Prompt` + an aspect; fetch the result in-turn;
   `npm run optimize:figure -- <tmp> static/img/figures/<course>/unit-NN/<figId>.webp`. If no
   tool is connected, write `figures/unit-NN.brief.md` and stop for the owner.
4. **Place.** Per `references/placement.md`: in the EN `topic-NN.mdx`, replace the
   `{/* FIGURE[...] */}` comment with `<Figure id="<figId>" src="/img/figures/<course>/unit-NN/<figId>.<ext>" alt="<marker alt verbatim>" />`.
5. **Mirror UR.** Per `references/bilingual-figures.md`: for a `diagram`, copy the SVG to
   `<figId>.ur.svg` and translate the visible labels to Urdu; in the UR `topic-NN.mdx` put the
   mirror `<Figure>` pointing at `<figId>.ur.svg`. For an `illustration`, mirror the `<Figure>`
   with the same `src` and a translated `alt`.
6. **Update the manifest.** Rewrite the row to v2 columns: fill `Kind` and `Src`, set
   `Status: placed`.
7. **Gates.**
   ```
   npm run validate:content && npm run check:figures && npm run check:no-answer-keys \
     && npm test && npm run build
   ```
   Fix every finding. A green `check:figures` is structural; the curriculum owner's Content gate
   (does the diagram teach the concept? do the Urdu labels read well?) is the real acceptance.

## Verifying EFMP-302 Unit 1 (the proving unit)

- `static/img/figures/efmp-302/unit-01/` has `fig-U1-1.svg … fig-U1-4.svg` **and**
  `fig-U1-1.ur.svg … fig-U1-4.ur.svg` (all four are `diagram`).
- Each `docs/semester-1/efmp-302/unit-01/topic-0N.mdx` has a `<Figure>` where its marker was;
  each `i18n/ur/.../topic-0N.mdx` has the mirror pointing at `.ur.svg`.
- `specs/content/efmp-302/figures/unit-01.md` — four rows, v2 columns, all `placed`.
- `npm run build` (en + ur) green; `npm run serve` shows the diagrams on all four EN + four UR
  topic pages, legible in light and dark, lazy-loaded, whole under print emulation.
- `check:figures`, `validate:content`, `check:no-answer-keys`, `npm test` green.
