# G3 English review - EFMP-301 Unit 4 - cycle 2

Report: `specs/content/efmp-301/reviews/unit-04/G3/crew-cycle2-20261124.json`
Disposition: **escalate** (advisory; no certification, no signature, G3 stays open).

## What was reviewed

The current English unit at HEAD `98fbbb064` (`docs/semester-1/efmp-301/unit-04/`),
its governance rows under `specs/content/efmp-301/`, and its figure assets. This is
the second and last ADR-0019 cycle, run after the D-2026-0098 figure fix and the
illustration placement that postdate the latest report
(`20261108T205835Z-g3-desk-6a389e2c.json`).

## Result

All seven criteria were checked. Six pass from the bound bytes: authority, sources,
coverage, assessment, readability and pedagogy. Accessibility is unverified because
the rendered and print evidence could not be obtained.

Every finding of the latest report was verified against the current files: the
Vosniadou coverage mismatch, the prose/figure factor list and the MCQ answer-position
balance are resolved; the render limitation is not, and is carried forward. The five
run001 blocking repairs (Seifert Chapter 9, ariel2018 study-strategy evidence, the
gorilla result, the assessment blueprint, the SLO labels) are confirmed in the
current bytes.

The mandatory deterministic checks all exit 0: `validate:content`,
`check:depth-gate`, `check:figures`, `check:no-em-dash`, `check:no-answer-keys`,
`check:docs-sync`, and the full `npm run check:content` suite (14 gates).
`render-review` is recorded as unavailable (exit 1): the deployed SHA
`dc60264d9` differs from HEAD on the unit's English files and five figures, so the
production build is not the reviewed input and the brief forbids building or serving
the site.

## Why escalate

A pass requires a successful `render-review` and a rendered image. That evidence
cannot be obtained under the crew brief, and ADR-0019's two cycles are exhausted.
The unit is content-complete and gate-clean; what remains is host/owner adjudication
of the visual evidence, not an author repair.

## Handoff

G3 remains open. The owner or a permitted host should run
`scripts/render-inspect.mjs EFMP-301 4 --base https://textbook.com.pk --no-pdf` on a
build of this HEAD and inspect the five changed raster figures. Two cosmetic wordmark
collisions on the Urdu `fig-U4-5` variants are recorded as advisory.
