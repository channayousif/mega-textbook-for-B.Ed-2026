# Bilingual figures - `.ur.svg` + the Urdu mirror (generate-figures)

A rendered figure must work on the Urdu page too. An English comparison table sitting on the
Urdu topic page is an Art. III.2 parity break. How it is localised depends on `Kind`.

## Any SVG schematic - translate the labels

A schematic's meaning lives in its **labels**, so the SVG itself is localised. This applies to
EVERY SVG archetype, not just `diagram`:

<!-- BEGIN GENERATED figure-kinds -->
`table`, `concept-map`, `flowchart`, `timeline`, `diagram`, `illustration`
<!-- END GENERATED figure-kinds -->

(The gate used to key this rule on `Kind: diagram`, so a table, concept map, flowchart or
timeline could lose its Urdu variant and CI stayed green. It now keys on the asset being an
`.svg`, which is the real invariant.)

1. **Copy** `static/img/figures/<course-lowercase>/unit-NN/<figId>.svg` →
   `static/img/figures/<course-lowercase>/unit-NN/<figId>.ur.svg`. Same shapes, same geometry,
   same `viewBox` - only the text changes.
2. **Translate every visible `<text>` / `<tspan>`** to Urdu. Use the unit's own Urdu register
   (match the UR `topic-NN.mdx` prose and `glossary.json` where a term exists). The `<title>` and
   `<desc>` are translated too (they are the standalone description).
3. **RTL text.** For each Urdu label set an appropriate `text-anchor` (`end` where the English
   used `start`, and vice-versa, for labels that hang off a shape) and add `direction="rtl"` on
   the `<text>` (or a wrapping `<g direction="rtl">`). Numerals stay as they are unless the unit
   uses Eastern Arabic digits.
4. **Font stack** - put a Nastaliq face first so Urdu renders correctly, then keep the Latin
   fallback for any untranslated token:
   ```
   font-family="'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', system-ui, sans-serif"
   ```
   Do **not** `@import` or reference a font file - name the family and let the OS / the site's
   already-loaded Nastaliq webfont resolve it. Give Urdu labels a little more line height
   (Nastaliq is tall): bump `font-size` down ~1px and add vertical padding if labels collide.
5. **Optimise** - `npm run optimize:figure -- --svg <figId>.ur.svg <figId>.ur.svg`; ≤ 20 KB.
6. **Wire it** - in
   `i18n/ur/docusaurus-plugin-content-docs/current/semester-N/<course>/unit-NN/topic-NN.mdx`,
   replace the `{/* FIGURE[...] */}` marker with:
   ```mdx
   <Figure id="fig-U1-1" src="/img/figures/efmp-302/unit-01/fig-U1-1.ur.svg" alt="<Urdu alt text>" />
   ```
   `id` is identical to the EN one; `src` points at `.ur.svg`; `alt` is the Urdu marker's alt
   text (the UR stub already carries an Urdu `alt:` in its marker - use that, verbatim).

The `<figId>.svg` and `<figId>.ur.svg` must stay **structurally identical** - same elements, same
positions, only label text differs. Author the `.ur.svg` by copy-then-translate in this step so
they don't drift.

## `Kind: illustration` - reuse the one raster

A drawn scene has little or no text. Do **not** make a second raster.

- The UR `topic-NN.mdx` `<Figure src>` points at the **same** `/img/figures/…/<figId>.webp`.
- Only the `alt` is translated:
  ```mdx
  <Figure id="fig-U1-2" src="/img/figures/efmp-302/unit-01/fig-U1-2.webp" alt="<Urdu alt text>" />
  ```
- If the illustration has a few baked-in words that matter, prefer re-drawing it as a `diagram`
  instead so it can be localised - flag that back to the owner.

## Gate posture - `draft` vs `reviewed`

`check:figures` reads the EN `unit-NN/index.mdx` front-matter `translation_status`:

| EN `index.mdx` | UR `.ur.svg` + UR `<Figure>` |
|---|---|
| `reviewed` | **gate-enforced.** A placed **SVG of any archetype** MUST have `<figId>.ur.svg` under `static/`; the UR `topic-NN.mdx` MUST have a `<Figure id>` for the figure. Missing → gate fails. |
| `draft` (skeleton-stub UR mirror) | **authored and wired now, but not gate-blocked** - same posture as Spec 008 not enforcing UR marker-ID parity for `draft`. Still do it: it saves the downstream G4/G5 translator a step, and the `.ur.svg` is ready when the unit reaches `reviewed`. |

So for a `draft` unit (e.g. EFMP-302 Unit 1 today): write all four `.ur.svg`, wire all four UR
`<Figure>` elements, and expect the gate to stay green either way. The human G5 Urdu review is
where the label translations are actually checked.

## Not checked by the gate

Whether the Urdu labels read naturally, whether the translation matches the prose register,
whether the RTL anchoring looks right - that is the human Content / Urdu-review gate. The
automated check only verifies the file exists and the UR `<Figure id>` is present.
