# Unit 3 G3 repair handoff, 2026-11-03

Author pass: agy, branch `crew/efmp-304-u03-repair_en`.
This is repair documentation, not independent review or acceptance evidence.

Report addressed: `specs/content/efmp-304/reviews/unit-03/G3/20261102T212207Z-g3-desk-fc9b67f2.json` (revise).

## Changes for a fresh reviewer

- Topics 3.1, 3.2, 3.4, EN and UR: withdrawn specific claims attributed in topic prose to
  the declared-unverifiable print monograph Bassham et al. (2010), replacing them with
  honest analytical descriptions.
  - Topic 3.1: rephrased "Bassham et al. (2010) treat this as the central reason to teach the distinction"
    to state the analytical reason directly in English and Urdu.
  - Topic 3.2: rephrased "Bassham et al. (2010) treat these four patterns as the core of introductory
    deductive reasoning..." to state standard introductory reasoning patterns directly in English and Urdu.
  - Topic 3.4: rephrased "Bassham et al. (2010) describe this as the most persistent error in introductory
    critical thinking..." to state the persistent error directly in English and Urdu.
- Further reading in Topics 3.1, 3.2, 3.3, 3.4, EN and UR: updated the entry for Bassham et al. (2010)
  to disclose the bibliographic-only limitation at point of use, making clear that the full text was
  not available and specific distinctions, patterns or definitions have not been verified against it.
- `specs/content/efmp-304/sources/unit-03.md`: recorded the dated retrieval attempt (2026-11-03)
  for `bassham2010` and stated point-of-use bibliographic limitations.
- `specs/content/efmp-304/coverage/unit-03.md`: noted in the preamble that mapped Bassham rows record
  guide-reading alignment only, not verified claim support.

## Checks and remaining handoff

- `npm run check:content` runs clean across all content gates.
- Visual browser and print inspection (small-screen 360 px layout, table scrollability, and A4 print views)
  remains unexecuted under the crew job brief restriction prohibiting `npm run build`, a dev server,
  or Playwright. Full G3 certification requires visual inspection on a live build under permitted browser tooling.
- Fresh independent G3 and dependent G5 review remain pending; no gate certification is claimed.
