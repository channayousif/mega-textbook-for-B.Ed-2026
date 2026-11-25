# Review Limitations - EFMP-304 Unit 5 G3 Review

Cycle: Cycle 2 (final cycle under ADR-0019)
Date: 2026-11-25
Host: OCI production host (2 CPU, 12 GB RAM)
Reviewer: agent:g3-reviewer (`cbbf4d0e-56be-44b2-8e77-4ad8f75eac72`)

## 1. Visual Inspection and Production Build Discrepancy

- Under the host resource rules and crew brief constraints, local heavy commands (`npm run build`, local development/preview servers, Playwright browser test runs) are strictly prohibited on this shared production host.
- The crew brief requires checking whether the reviewed input matches the production build:
  `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- docs/semester-2/efmp-304/unit-05 static/img/figures/efmp-304/unit-05/`
- The deployed SHA (`70e141423d07fe2cb52eef828aaee8910f94f52d`) differs from HEAD (`b7417e1e0271fd01f1984a48afe830f8ecc3ab85`) across 10 files (prose updates and 5 WebP illustration assets: `fig-U5-9.webp` through `fig-U5-13.webp`).
- Consequently, the production website does not reflect the candidate input state. Per the brief instruction, `render-review` is recorded as unavailable (exit code 1), and `scripts/render-inspect.mjs` was not run.
- Result: Visual rendering, narrow-screen (360px) layout, table scrolling, and print stylesheet behaviors remain unverified from actual browser rendering. Structural accessibility passes from source inspection.

## 2. Unverifiable Source Texts

- Guide-required sources `boud2013`, `brookfield2017`, `osterman2004`, and `taggart2005` are commercial print monographs without digital open-access full text.
- These are properly declared under `## Unverifiable sources` in `specs/content/efmp-304/sources/unit-05.md` pursuant to Constitution Art. VII and Decision `D-2026-0001`.
- The reviewed prose uses them solely for title-and-catalogue-level concepts (experiential learning cycle, four lenses, teacher reflection cycle stages, theoretical strand classifications) without asserting uncorroborated empirical findings.
