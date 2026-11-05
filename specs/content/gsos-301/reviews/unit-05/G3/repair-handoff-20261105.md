# Unit 5 G3 repair handoff

Author repair record, not an independent review or certification.

Report addressed: `20261102T212207Z-g3-desk-92fc9b44.json` (revise).

- Religion source advisory: `sources/unit-05.md` now records section 15.1's precise locations and a short excerpt supporting social cohesion and moral guidance, with notes on meaning and life-course rituals.
- Pakistani facts advisory: WHO supports the 1994 programme date; Andrabi, Das and Khwaja (2015) support historical low-cost private-school growth; the Council's official Article 230 functions support its advisory role. Unit-specific source notes are bound under `sources/texts/u05-*.md`, and coverage rows identify their sections. WHO and Council evidence comes from readable search-index passages; direct-page failures are disclosed. Author-created causal illustrations remain distinct from sourced historical facts.
- Blocking render inspection: unresolved. The brief prohibits build, dev server and Playwright. No render inspection was attempted or claimed. A host/session permitted to render must inspect both topics and the assessment at 360px, test table scrolling, inspect A4 print output and check all four figures for clipping in light/dark themes. Retain actual render evidence and record the inspected input version before a fresh independent G3 decision.

English and Urdu learner-facing files, figure assets, checklist positions and translation status are unchanged. Source-only repairs require no translated prose patch. G3 remains unticked; prior reports are preserved. This pass does not authorize additional review cycles beyond ADR-0019's limit or certify its own repairs.

Validation: all 14 `npm run check:content` gates pass on the repaired branch and clean `origin/main` (after generating each checkout's ignored content-status artifact). `scripts/heavy.sh npm test` passes 368 tests across 31 files. Unit 5 G2 evidence was regenerated with all eight draft checks passing; only its existing G2 evidence reference changed. No G3/G5 completion was recorded.
