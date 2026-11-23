# Prior findings verified against the current files

Review input: branch `crew/efmp-301-u04-review_en-r1` at HEAD
`98fbbb0647d5e2c6040059edcaaccc1317b620a1`. Latest prior report:
`specs/content/efmp-301/reviews/unit-04/G3/20261108T205835Z-g3-desk-6a389e2c.json`
(disposition pass, reviewer CMY). This is the second and last ADR-0019 cycle; the
figure fix D-2026-0098 (commit `dcad7a0e1`) and the illustration placement
(commit `d212d7590`) postdate that report, so a fresh run was required.

## Latest report (6a389e2c) findings

| # | Severity | Prior state | Verification at HEAD | State now |
|---|---|---|---|---|
| 1 | uncertain | render-review not performed (brief prohibits build/server/browser) | Still true. The production site is not the reviewed input: `git diff --quiet dc60264d9 HEAD -- docs/semester-1/efmp-301/unit-04/ static/img/figures/efmp-301/unit-04/` exits 1. | Unresolved, carried as uncertain |
| 2 | uncertain | vosniadou2001 declared support for U4-4/U4-5 but bound excerpt holds only Principle 11 | `sources/unit-04.md:20-28` now lists Vosniadou under "Further reading only (no coverage binding)"; `coverage/unit-04.md` has no vosniadou row; no unit prose cites it. | Resolved |
| 3 | advisory | prose capture-factor list ("novelty, contrast, movement, meaning and emotion") mismatched fig-U4-2's six factors | `topic-01.mdx:58-60` now reads "Novelty, contrast, meaning and emotion pull the beam, and task demand and expectation shape where it settles"; `fig-U4-2.svg` carries exactly novelty, contrast, meaning, emotion, task demand, expectation and no "movement". | Resolved |
| 4 | advisory | MCQ key positions 8x b / 2x c, none on a or d | Key at `unit-assessment.mdx:162-173` is a3 / b2 / c2 / d3 (a: Q1,Q7,Q9; b: Q2,Q4; c: Q6,Q8; d: Q3,Q5,Q10). | Resolved |

## Earlier run001 blocking findings (agent-g3-efmp301-u4-run001.json)

All five blocking findings were repaired at commit `4350c9b39` and are verified
against the current bytes:

1. Seifert Chapter 9 unbound: `sources/texts/seifert2009.md:428-451` now carries the
   Chapter 9 excerpt (algorithms and heuristics, functional fixedness and response
   set, problem analysis, working backwards, analogical thinking).
2. Study-strategy evidence unsupported: `sources/texts/ariel2018.md:14-30` binds the
   retrieval-practice and spacing passages; `topic-02.mdx:91-105` cites Ariel and
   Karpicke (2018) for spacing and repeated retrieval over restudying.
3. Gorilla result misstated: `topic-01.mdx:74-77` now says "nearly half of the
   viewers", matching `sources/texts/spielman2020.md:17-20`.
4. Assessment blueprint deviation: MCQ topic spread is 4/3/3 (Q1,Q2,Q3,Q5 topic 4.1;
   Q4,Q6,Q7 topic 4.2; Q8,Q9,Q10 topic 4.3) and RRQ spread is 3/4/3, matching
   `content-spec.md:651-658`.
5. SLO mislabel: `concepts/unit-04.md:18-21` assigns the memory concepts to
   `SLO:EFMP-301-4-2`, and `topic-02.mdx:8-9` carries `SLO:EFMP-301-4-2`.

Earlier advisories also verified: the "billi" reference is gone (`topic-03.mdx:153`
uses the "cat" example); `sources/unit-04.md:17` no longer cites a non-existent
"Rachel's solution"; the MCQ positions are rebalanced (finding 4 above).

## Carried forward

Only the render/accessibility limitation remains. It is recorded as an unresolved
uncertain finding and drives the escalate disposition. No blocking content defect
was found in the current bytes.
