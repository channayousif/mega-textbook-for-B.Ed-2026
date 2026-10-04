# ADR-0029: Gemini via agy as a Raster Illustration Producer

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted by owner instruction on 2026-10-04
- **Date:** 2026-10-04
- **Feature:** Cross-cutting reading-experience refresh and figure rendering
- **Context:** Every one of the 292 placed figures is an SVG schematic; there are zero raster
  illustrations, and the owner reports that reading the text alone feels dry. The owner holds a
  Google AI Pro subscription and wants it used for illustrations. ADR-0024 makes Codex the only
  raster producer and forbids Claude from invoking an image generator. On 2026-10-04 a headless
  spike showed that `agy` 1.2.16 (Google Antigravity CLI, signed in to the owner's Pro account by
  OAuth) generates images through its built-in `generate_image` tool: one call returned a
  1376 by 768 PNG of a rural Sindh classroom in about 56 seconds, culturally appropriate and
  free of text.
- **Amends:** ADR-0024 points 2, 3 and 5, only as stated below. Its SVG ownership, pedagogical
  acceptance rule and asset contracts are unchanged.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

Add Gemini, reached through `agy`, as an approved raster producer beside Codex, driven by the
existing figure manifest.

1. **Producers.** Raster illustrations may be produced by **Gemini via `agy generate_image`**
   (default for new illustrations, owner's Pro account) or by **Codex's built-in image tool**
   (unchanged, remains a valid alternative and the fallback when `agy` is unavailable).
2. **Who runs it.** Claude may run the local generation script that calls `agy` headlessly
   (`agy -p ... --add-dir <staging> --output-format json`). This replaces ADR-0024 point 3's ban
   on Claude invoking an image generator, for this route only. Claude may then optimise, inspect,
   place and advance the manifest row (`prompt-only` -> `generated` -> `placed`).
3. **Claude keeps meaning and acceptance.** Claude writes the prompt, alt text, aspect and target
   path in the manifest row first, and inspects every generated image for pedagogical fit,
   cultural accuracy (Pakistani and Sindhi setting, dress and classroom norms), absence of text,
   and accessibility before marking it `placed`. A rendered image is never accepted only because
   generation succeeded. G3/G5 independence and human escalation rules are unchanged.
4. **One local, operator-run network script.** `scripts/generate-illustration.mjs` is the single
   repository script allowed to call an image service. It runs only on the owner's host, serially
   (one image at a time, never beside a heavy job), never in CI or the site build. This narrows
   ADR-0024 point 5 rather than removing it.
5. **Placements.** One 16:9 banner per unit `index.mdx` and one scene per topic for "A real
   classroom situation". Pilot on EFMP-302 Unit 1 before batch roll-out. Topic scenes are rows
   in the unit manifest (`unit-NN.md`). Banners are rows in a sidecar `unit-NN.banner.md` with the
   same columns and lifecycle, because `check:figures` reads only topic files and its source is
   hashed into every unit's review evidence (`scripts/lib/review-evidence.mjs`): changing it
   would mark all outstanding review evidence stale. The `unit-NN.banner.md` name matters: ADR-0027
   scopes a course file to one unit only when `unit-NN` is followed by `.`, `/` or the end, so a
   `unit-NN-banner.md` name would bind to, and stale, every unit in the course.
6. **Asset contracts unchanged.** Output passes through `scripts/optimize-figure.mjs` (WebP,
   longest edge at most 1600 px, at most 150 KB), one file for both locales with locale-specific
   alt text, `Kind: illustration` rows, and `check:figures`.

## Consequences

### Positive

- Uses a subscription the owner already pays for; no new API key, SDK or dependency.
- One agent can complete an illustration end to end, removing the cross-agent handoff latency
  ADR-0024 accepted, while Codex stays available as a second producer.
- The manifest lifecycle, optimizer and gates are reused, so no new file format or service.
- The spike output matched the brief closely (setting, dress, gesture, no text), which suggests
  low revision cost for culturally specific classroom scenes.

### Negative

- Depends on `agy`'s `generate_image` tool, an internal capability that a CLI update could
  change; the underlying image model is chosen by `agy`, not by us (the spike reported Imagen 3).
- Subscription quota is opaque and shared with the owner's other `agy` use; large batches may be
  throttled. Mitigated by serial generation and per-unit batches.
- Generated images carry the provider's usage terms and possible watermarking; provenance must be
  recorded per image (producer and date in the manifest prompt cell or PHR).
- Two raster producers can drift in house style. Mitigated by one shared prompt style block.

## Alternatives Considered

### A. Keep Codex as the only raster producer (ADR-0024 unchanged)

Proven path, but uses a ChatGPT account rather than the owner's Gemini subscription and keeps
the cross-agent handoff. Rejected because the owner explicitly asked to use the Gemini Pro
account; retained as the fallback producer.

### B. Gemini API directly (AI Studio key with `google-genai` or the installed nanobanana MCP)

Deterministic model choice and a documented API, but needs a separate API key (none is
configured), adds a dependency or MCP server, and is billed or rate-limited separately from the
Pro subscription. Kept as the fallback if `agy` loses image support.

### C. Stay SVG-only

No new tooling or provider risk, but leaves pages visually dry; schematic SVGs cannot carry
classroom scenes. Rejected by the owner's brief.

### D. Chosen: Gemini via `agy` as default producer, Codex as alternative, Claude owns meaning and acceptance

## References

- Owner decision and spike: session of 2026-10-04 (plan `deffer-the-paywall-for-deep-alpaca.md`,
  Phase 0 and Phase 3); PHR recorded under `history/prompts/general/`
- Related ADRs: ADR-0024 (amended), ADR-0012 (raster provider history), ADR-0017 (figure
  archetypes), ADR-0019 (independent content review)
- Agent instructions: `CLAUDE.md` (Claude and Codex visual roles);
  `.claude/skills/generate-figures/SKILL.md` and `references/raster-codex-handoff.md`
- Contracts: `scripts/lib/figure-manifest.mjs`, `scripts/optimize-figure.mjs`,
  `scripts/check-figures.mjs`
