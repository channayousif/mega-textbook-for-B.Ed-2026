# ADR register format (`history/adr/README.md`)

Purpose (owner, 2026-10-19): a reader understands every decision taken, in one place, and can
follow a link to the full ADR when they need the reasoning. The register summarises; it never
replaces or reinterprets an ADR. Regenerate it whole each run from the ADR files.

## Layout

```markdown
# Architecture decisions

<one paragraph: what an ADR is in this repo, that this page is generated weekly by the crew,
and that the ADR file is authoritative when the two differ>

## Current state by area

### Figures and visuals
Today: SVG schematics are authored by ... ([ADR-0012](0012-....md), amended by [ADR-0029](...)).
Raster illustrations ... ([ADR-0024](...), [ADR-0029](...)). Theming ... ([ADR-0018](...)).

### Review and publication governance
...

(one short paragraph per cluster, naming which ADR governs each point TODAY)

## All decisions

| ADR | Decision | Status | Date | What it means in practice | Links |
|---|---|---|---|---|---|
| [0001](0001-....md) | Scaffold all 8 semesters, prioritise 1-4 | Accepted | 2026-07-.. | Two or three plain sentences. | amended by 00xx |
```

## Rules

- One row per ADR file, in number order, including superseded ones (status says so).
- **Decision**: the title, shortened if needed. **Status**: as the ADR states it, plus
  "amended by NNNN" or "superseded by NNNN" when a later ADR says so even if this one does not.
- **What it means in practice**: what a contributor must do or can rely on today, in plain words,
  2 or 3 sentences. If a later ADR changed part of it, say which part.
- **Links**: amends, amended by, supersedes, superseded by; each a relative link to the file.
- Clusters to start from (adjust as ADRs are added): platform and hosting (0002, 0006, 0008, 0016);
  content structure and standards (0001, 0004, 0010, 0011, 0017, 0020, 0022); figures and visuals
  (0012, 0017, 0018, 0024, 0029); review, evidence and publication (0019, 0021, 0023, 0025, 0026,
  0027); people and auth (0005, 0007, 0013, 0015); orchestration (0030).
- Every link must resolve; check them all before committing.
