# Schematic SVGs - Claude to Codex handoff

A `Kind` schematic figure (`table` / `concept-map` / `flowchart` / `timeline` / `diagram`) is a
self-contained SVG. **Codex is the primary author** of these schematics: it lays out shapes and
labels to match the marker prompt and applies the repository's SVG authoring standard. **Claude is
the secondary fallback** and authors the SVG directly only when Codex is unavailable (quota
exhausted, binary missing, or `codex exec` fails).

This split exists because Codex reasons harder about layout, spacing and accessibility
encodings (e.g. dash patterns that satisfy Constitution Art. III.8 without colour) and produces
more self-documenting figures. Claude matches the boilerplate exactly and is smaller, so it is the
safe fallback.

## Claude's responsibility (handoff preparation)

For each schematic figure, Claude prepares a complete, self-contained prompt and invokes Codex via
`codex exec`. The prompt MUST include:

1. **The figure identity**: `id`, `Kind` (archetype), `topic_label`, the exact target path
   `static/img/figures/<course-lowercase>/unit-NN/<figId>.svg`.
2. **The marker content**: the `prompt` (verbatim, whitespace-normalised) and the `alt` (verbatim).
3. **The hard rules** (copy these verbatim into the prompt):
   - `viewBox="0 0 780 470"`, no `width`/`height` attributes on `<svg>`.
   - `role="img"` + `aria-labelledby="t d"` + `<title id="t">` (alt's first clause) +
     `<desc id="d">` (full alt).
   - PASTE the published light `:root` token block verbatim (read it from
     `references/svg-authoring.md` §"the boilerplate"). No hex anywhere else.
   - System font stack only: `font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"`.
     No `@import`, no web font, no font file.
   - NO `@media (prefers-color-scheme...)` block. NO `<script>`, `<foreignObject>`, external
     `<image>`, raster `<image>`.
   - Exactly one wordmark: `<text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>`.
   - No colour-only meaning: every distinction the figure makes MUST also be carried by shape,
     label or dash pattern. A tick is a shape + the word, not green vs red.
   - No em dash (U+2014) in any `<text>` label. Use comma, colon or spaced hyphen.
   - Use the `.bg` / `.panel` / `.link` / `.ink` / `.muted` / `.h` / `.wm` / `.ah` classes from
     the boilerplate; add custom classes only when the boilerplate ones do not cover the need.
4. **The instruction**: "Read `references/svg-authoring.md` and `scripts/lib/figure-palette.mjs`
   first to learn the exact boilerplate, token block and rules. Write the completed SVG to
   <target path> and report the file size in bytes."

Claude leaves the topic marker in place, `Src` blank and `Status: prompt-only` until Codex succeeds.

## Codex's responsibility

Codex reads the prompt (which points it at the authoring reference), then:

1. Authors the self-contained SVG following the hard rules and the boilerplate.
2. Writes it to the exact target path `static/img/figures/<course-lowercase>/unit-NN/<figId>.svg`.
3. Reports the file size.

Codex does NOT touch the marker, the manifest, the Urdu mirror or the gates - those are Claude's
job in the later steps. Codex only writes the single SVG file.

## Claude's responsibility (fallback)

When Codex is unavailable, Claude authors the SVG itself using the same hard rules and the
boilerplate in `references/svg-authoring.md` (the former Step 2 path). The output standard is
identical; only the author differs.

Claude detects "Codex unavailable" when: `codex` is not on PATH, `codex exec` exits non-zero, or
the call times out. In that case Claude logs "Codex unavailable, falling back to direct authoring"
and proceeds to author the SVG itself.

## Post-authoring (shared, regardless of author)

After the SVG file exists at the target path (whether Codex or Claude wrote it), Claude:

1. Optimises + budget-checks:
   ```
   npm run optimize:figure -- --svg static/img/figures/<course>/<unit>/<figId>.svg \
     static/img/figures/<course>/<unit>/<figId>.svg
   ```
   It hard-fails if the result is > 20 KB. If it fails, simplify the SVG (fewer nodes, shorter
   labels) - do not raise the budget.
2. Replaces the marker with `<Figure>`, sets the manifest row `Kind`/`Src`/`Status: placed`.
3. Mirrors into Urdu (see `references/bilingual-figures.md`).
4. Runs the gates.

## Why this ordering

Codex-first means every schematic gets the more careful layout and the accessibility encoding
(Constitution Art. III.8) that the comparison showed Codex produces more reliably. Claude-fallback
means a unit is never blocked on Codex quota. The post-authoring gate run is identical either way,
so the committed artefact meets the same standard regardless of which agent wrote it.
