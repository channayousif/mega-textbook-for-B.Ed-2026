# Unit 1 Urdu translation handoff

Status: blocked before translation. English baseline: `26305ee6f2ed93c010150c36717bc540bbfbcd52`.

The G2 row is green, but the existing advisory G3 report identifies two blocking English defects that remain in this baseline. The translate-unit skill explicitly requires stopping when the English is wrong and excludes repairing English in a translation pass.

1. `docs/semester-3/efmp-407/unit-01/topic-01.mdx:61` attributes an argument directly to Orr (1992). The source ledger, `specs/content/efmp-407/sources/unit-01.md`, says the book was not read and the attribution was confirmed only through secondary pages. The English author must disclose that limitation or verify the primary passage.
2. `docs/semester-3/efmp-407/unit-01/unit-assessment.mdx:148` gives unqualified causal guidance for RRQ-09. The bound IUCN Pakistan 2003 excerpt reports expert views and says the exact reason for mangrove disappearance is unknown. The English author must restore the date, attribution and uncertainty in the marking guidance.

These are existing findings F1 and F2 in `reviews/unit-01/G3/20261107-codex.json`, verified against the current English and source records. This translation job neither repairs nor certifies them. No Urdu files or figure variants were authored. No terminology proposals arose.

Next owner: English author repairs F1/F2, then a translation job resumes against the repaired commit. G3/G5 remain open and translation_status remains draft. The skill forbids adding a G4 completion row; the existing G4 rows remain open. Build, browser, print and figure-geometry inspection were not run because the crew brief forbids builds, servers and Playwright. They remain required in a permitted session after translation.

Validation: `npm run check:content` exited 0 with all 14 content gates passing on 2026-11-07. There were no failures to compare with origin/main. This validates deterministic checks only, not the unresolved English source claims or a translation.
