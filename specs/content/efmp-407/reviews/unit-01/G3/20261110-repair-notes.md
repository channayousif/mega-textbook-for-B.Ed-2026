# Unit 1 G3 repair handoff

Report addressed: `specs/content/efmp-407/reviews/unit-01/G3/20261108T203238Z-g3-desk-fb34f257.json` (disposition: revise).
This is an author repair record, not an independent review or certification.

## Findings addressed

- Finding 1 [blocking] (Orr attribution learner-facing disclosure): `docs/semester-3/efmp-407/unit-01/topic-01.mdx:61` updated with learner-facing disclosure that secondary accounts of Orr (1992) describe his concept of ecological literacy, noting explicitly that the original book was not directly consulted for this unit.
- Finding 2 [blocking] (RRQ-09 guidance IUCN 2003 causal uncertainty): `docs/semester-3/efmp-407/unit-01/unit-assessment.mdx:148` marking guidance updated to restore the IUCN Pakistan (2003) study attribution, expert framing, and causal uncertainty regarding mangrove loss, instructing markers to credit qualified answers.
- Finding 3 [advisory] (RRQ-03 Bloom level demand): `docs/semester-3/efmp-407/unit-01/unit-assessment.mdx:102` Bloom level adjusted from `*(Analyze)*` to `*(Understand)*` to match the minimum demand of reproducing taught reasons for rejecting the false dichotomy.
- Finding 4 [advisory] (Topic 1.3 activity affordability constraint): `docs/semester-3/efmp-407/unit-01/topic-03.mdx:79` activity prompt updated to provide a concrete resource constraint (a tight emergency budget covering only two of the three proposals) or explicit guidance for groups to state their own financial constraints and assumptions.
- Finding 5 [uncertain] (Render inspection unavailable): Current desktop, narrow-screen, and A4 print rendering remain uninspected because host resource limits prohibit local dev server and browser execution. Remains an owner handoff for a permitted environment.
- Finding 6 [uncertain] (Author and reviewer provenance): Author run is recorded as crew job `efmp-407-u01-author`; parent runtime conversation IDs remain historical environment limits.
- Finding 7 [uncertain] (Excerpt manifest binding): Purvis, Ilyas, and World Bank excerpt files exist locally; their omission from the reviewer manifest stemmed from regex handling in `scripts/lib/review-evidence.mjs` (a protected gate script outside unit content scope); remains an orchestrator/tooling handoff.
- Finding 8 [uncertain] (Assessment blind solving): Reviewer method limitation in the desk review; next independent reviewer must solve the bank with guidance withheld before comparing.

## Validation

All 14 content gates pass (`npm run check:content`). Zero em dashes across all files (`npm run check:no-em-dash`).

## Status

G3 remains open and unticked pending a fresh independent review cycle.
