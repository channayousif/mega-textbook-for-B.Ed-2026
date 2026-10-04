# ADR-0024: Capability-Based Claude and Codex Visual Authoring

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted by owner instruction on 2026-09-15; amended by ADR-0029 (2026-10-04) for points 2, 3 and 5
- **Date:** 2026-09-15
- **Feature:** Cross-cutting course authoring and figure rendering
- **Context:** Two agents share the repository. Claude is text-only in this workflow; Codex has a
  built-in image-generation tool. Their instructions must not claim the same raster authority.
- **Supersedes in part:** ADR-0012 and Spec 009 only where they assign raster generation to a
  Claude-connected Hugging Face MCP tool. The SVG-first design and all asset contracts remain.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

Use a capability-based responsibility split with the figure marker and manifest as the handoff
contract.

1. **Claude owns course meaning and deterministic visual specifications.** This includes course
   research, prose, pedagogy, sources, figure planning, prompts, alt text, figure classification,
   `prompt-only` manifest rows, and hand-authored SVG schematics. Claude may optimise, localise,
   place and validate those SVGs.
2. **Codex owns generated raster production.** This includes generating raster illustrations,
   editing existing rasters, inspecting visual outputs, revising failed outputs, converting final
   assets to the repository's WebP constraints, placing them in topic files and both locale flows,
   updating their manifest lifecycle and running the relevant gates. Codex uses its built-in
   image-generation tool by default.
3. **Claude stops at a complete handoff for `Kind: illustration`.** It records the figure ID,
   topic, prompt, alt text, aspect, target path and concept to verify. It leaves the marker,
   blank `Src` and `Status: prompt-only`. It does not invoke an image generator, ingest a raw
   raster, edit or optimise a raster, or mark it `generated` or `placed`.
4. **Pedagogical acceptance remains separate from technical generation.** Claude or a human
   reviewer checks whether an illustration teaches the intended concept. Successful generation,
   optimization and structural gates do not constitute G3 or G5 approval. Existing independent
   review, evidence and escalation rules remain unchanged.
5. **Existing asset contracts remain unchanged.** Raster illustrations use one WebP for both
   locales, locale-specific alt text, a longest edge of at most 1600 px and a hard 150 KB budget.
   Schematics remain self-contained, localised SVGs. No network-calling repository script or CI
   image generation is introduced.

<!-- For technology stacks, list all components:
     - Framework: Next.js 14 (App Router)
     - Styling: Tailwind CSS v3
     - Deployment: Vercel
     - State Management: React Context (start simple)
-->

## Consequences

### Positive

- Each agent has one clear source of authority, preventing duplicate generation and conflicting
  manifest updates.
- Codex can generate and edit raster images directly while Claude concentrates on academic
  meaning and text-native SVG work.
- The existing marker and manifest lifecycle provides an auditable asynchronous handoff without
  a new service, database table or file format.
- Raster generation remains outside CI while the existing offline optimizer and structural gates
  continue to provide deterministic enforcement.
- The split was tested on 2026-09-14: Codex generated a B.Ed classroom illustration, reacted to a
  159.2 KB budget failure, simplified the composition and produced a 72.6 KB, 1536 by 1024 WebP.

<!-- Example: Integrated tooling, excellent DX, fast deploys, strong TypeScript support -->

### Negative

- An illustration now requires a cross-agent handoff, which can add latency compared with one
  agent completing every step.
- Prompt quality and image quality have different owners. Ambiguous briefs may cycle back to
  Claude before Codex can finish the asset.
- Codex availability becomes a dependency for new raster illustrations. Units can still proceed
  with SVG figures or leave illustration rows `prompt-only`.
- Existing documentation that names the Hugging Face route must either be updated or explicitly
  identified as superseded to prevent stale instructions from reappearing.

<!-- Example: Vendor lock-in to Vercel, framework coupling, learning curve -->

## Alternatives Considered

### A. Claude owns all figures through a connected Hugging Face MCP tool

This was ADR-0012's original route. It keeps one figure skill responsible for every format but
requires Claude to have an external image tool and overlaps with the requested Codex role.
Rejected because the owner wants a stable capability boundary and Codex already proved the built-in
generation and optimization path.

### B. Codex owns every visual, including SVG schematics and figure meaning

This creates a single asset owner but moves deterministic text-native diagrams and pedagogical
decisions away from the agent authoring the unit. Rejected because SVGs depend heavily on exact
labels, concept structure and bilingual meaning, all of which are part of course authoring.

### C. Either agent may generate any visual

This maximizes flexibility but allows both agents to edit the same marker, asset and manifest row.
Rejected because it creates the contradiction and duplicate-work risk this decision must remove.

### D. Chosen: capability-based split with manifest handoff

Claude specifies meaning and produces SVG schematics. Codex produces and places raster images.
Both use the existing lifecycle and defer academic certification to independent review.

<!-- Group alternatives by cluster:
     Alternative Stack A: Remix + styled-components + Cloudflare
     Alternative Stack B: Vite + vanilla CSS + AWS Amplify
     Why rejected: Less integrated, more setup complexity
-->

## References

- Feature Spec: `specs/009-figure-rendering/spec.md`; `specs/012-visual-density-standard/spec.md`
- Implementation Plan: `specs/009-figure-rendering/plan.md`
- Related ADRs: ADR-0012 (partially superseded raster provider), ADR-0017 (figure archetypes),
  ADR-0018 (figure theming), ADR-0019 (independent content review)
- Agent instructions: `CLAUDE.md`; `AGENTS.md`; `.claude/skills/generate-figures/SKILL.md`
- Evaluator Evidence: `history/prompts/general/0025-test-codex-raster-generation.general.prompt.md`
