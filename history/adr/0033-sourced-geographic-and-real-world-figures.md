# ADR-0033: Sourced Geographic and Real-World Figures

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted by owner instruction on 2026-10-29
- **Date:** 2026-10-29
- **Feature:** Cross-cutting figure production (Specs 009, 012, 013)
- **Context:** Batch PR #366 placed GPKS-402 `fig-U4-6`, a "map-style diagram" of Pakistan that a
  worker drew freehand as SVG. The border was invented, Thar was drawn outside the country, and
  Jammu and Kashmir was missing. Every content gate passed, because the gates check that an SVG
  exists, is accessible and uses the palette, not that a map is true. Maps of Pakistan are
  sensitive: the Surveying and Mapping Act 2014 makes the Survey of Pakistan the authority. The
  owner ruled that maps must be accurate and approved, never "an approximate or careless sketch".
  The owner also asked why every figure is generated when free, better material can be fetched
  and adapted. The map was withdrawn in #368, and a sourced replacement is in #369.
- **Amends:** ADR-0024 and ADR-0029, only as stated below. Hand-authored schematics and the raster
  illustration route are otherwise unchanged.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

1. **Maps of real territory are sourced, never drawn.** A figure that shows a real country,
   province or region is built from published boundary data. For Pakistan and its neighbours
   the source is Natural Earth (public domain), using the **Pakistan point-of-view** layers. It
   is checked against the current Survey of Pakistan map. This covers the outline, the Line of
   Control, the Working Boundary, the frontier-undefined edge and the label wording for
   Gilgit-Baltistan, AJK and Indian Illegally Occupied Jammu and Kashmir. Neither an AI image
   generator nor a freehand SVG may produce a map.
2. **Rebuildable.** The script that turns the data into the SVG is committed under
   `ops/figure-sources/<course>/`. A map is changed by changing the data or the script and
   regenerating, never by editing the geometry by hand.
3. **Owner sign-off.** A new or changed map reaches `placed` only after the owner approves it in
   writing, recorded in the PR and its PHR. Map PRs open as drafts.
4. **Provenance in the manifest.** A map's manifest row carries a `Source:` note in its Prompt
   cell that names the datasets and version. `npm run check:map-sources` fails a `generated` or
   `placed` `diagram` or `illustration` row that describes a map of real territory without one.
   It runs in CI through `npm test`. It is a separate script because `check-figures.mjs` and
   `scripts/lib/gates.mjs` are hashed inputs of every unit's G2 and G3 evidence, so editing
   either would make all reviews stale.
5. **Real-world images may be reused.** Photographs of real places and people, historical
   documents and similar may be downloaded and adapted instead of generated. Allowed licences
   are public domain, CC0 and CC BY, with author, licence and URL recorded in the manifest row.
   CC BY-SA is allowed only for an unmodified, standalone image. NC and ND licences are not
   allowed, because they conflict with an open textbook.
6. **Schematics stay hand-authored.** Tables, concept maps, flowcharts, timelines and teaching
   diagrams carry meaning written for one unit's prose, so no downloaded figure can match them.
   ADR-0024 and ADR-0030 still govern who authors them.

## Consequences

### Positive

- A freehand map can no longer pass CI unnoticed: the provenance check catches an unsourced map
  before review, and owner sign-off guards the geometry.
- The geometry comes from maintained data with a public-domain licence, so it is free to adapt and
  no artwork is copied.
- Reusing real photographs and documents gives better material than generating likenesses of
  real places.

### Negative

- Maps cost more than freehand schematics: data download, scripting, comparison and owner time.
- The `Source:` check is a wording heuristic. A map described without the words it looks for
  would still pass, so review remains the backstop.
- Natural Earth is generalised, so small features (Sir Creek, Junagadh and Manavadar) have to be
  handled in notes or insets.

## Alternatives Considered

- **Keep generating every figure, with better prompts.** Rejected: the failure was a model drawing
  geography from memory, and no prompt makes that safe.
- **Copy or trace the Survey of Pakistan map.** Rejected: it is a paid, copyrighted product. We
  compare against it and do not reproduce it.
- **Source every figure first.** Rejected by the owner: most figures are unit-specific schematics,
  where a search would usually find nothing.

## References

- PRs: #366 (the freehand map), #368 (withdrawal), #369 (sourced map, draft)
- PHRs: `history/prompts/gpks-402/2433-*`, `2434-*`, `history/prompts/general/2435-*`
- Natural Earth: https://www.naturalearthdata.com/downloads/10m-cultural-vectors/ (Admin 0, Pakistan POV, 5.1.1)
- Survey of Pakistan: https://www.surveyofpakistan.gov.pk/ (Pakistan Folio Map, 2026)
- Related: ADR-0024, ADR-0029, ADR-0030
