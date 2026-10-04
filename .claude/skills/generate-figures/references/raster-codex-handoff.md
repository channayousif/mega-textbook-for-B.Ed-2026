# Raster illustrations - Claude to Codex handoff

> **ADR-0029 (2026-10-04):** Gemini via `agy` is now an approved raster producer beside Codex.
> After writing a complete `prompt-only` illustration row, run
> `node scripts/generate-illustration.mjs <course> <unit> [--banner]` (local, serial, never CI),
> then inspect every image for pedagogy, Pakistani/Sindhi cultural accuracy, no text and no maps
> or flags before placing it and marking the row `placed`. Unit banners use the sidecar
> `figures/unit-NN.banner.md`. The Codex handoff below remains valid as the alternative route.


A `Kind: illustration` figure needs pictorial depth that a schematic SVG cannot provide, such as
people, a classroom, a historical setting or a place. Under ADR-0024, Claude specifies the visual
and Codex produces it.

## Claude's responsibility

Claude prepares or verifies one complete handoff block in
`specs/content/<course-lowercase>/figures/unit-NN.brief.md`:

```markdown
# Figure generation brief - <COURSE> Unit N

## fig-U1-2

- **Topic**: 1.2
- **Aspect**: landscape (3:2)
- **Prompt**: <the marker prompt, verbatim>
- **Alt text**: <the marker alt text, verbatim>
- **Target**: static/img/figures/<course-lowercase>/unit-01/fig-U1-2.webp
- **Context to verify**: <the concept or contrast the image must teach>
```

Claude leaves the topic marker in place, `Src` blank and `Status: prompt-only`. Claude may keep
rendering schematic figures in the unit. Claude does not invoke an image generator, ingest a
staged raster, edit or optimise a raster, place the raster, or advance its manifest status.

## Codex's responsibility

Codex reads the marker, manifest and handoff block, then:

1. Generates or edits the image with its built-in image-generation tool by default.
2. Inspects the result against the teaching concept, prompt, alt text, cultural setting, anatomy,
   unwanted text and visual consistency.
3. Runs `npm run optimize:figure -- <generated-file> <target.webp>`. The result must be WebP,
   at most 1600 px on its longest edge and at most 150 KB. Codex revises the image rather than
   weakening the budget when optimisation fails.
4. Replaces the English marker with `<Figure>`, reuses the same WebP in Urdu with translated alt
   text when an Urdu carrier exists, and advances the manifest through the valid lifecycle.
5. Runs the relevant content gates and reports the final prompt, asset path and validation result.

If generation reveals a conceptual ambiguity, Codex leaves the row `prompt-only` and returns the
question to Claude. A technically valid file does not resolve an unclear teaching requirement.
