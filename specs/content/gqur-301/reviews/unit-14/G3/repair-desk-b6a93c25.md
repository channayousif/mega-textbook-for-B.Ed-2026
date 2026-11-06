# Unit 14 repairs for G3 report 20261102T212207Z-g3-desk-b6a93c25

Author repair record, 2026-11-05. This is an author repair record, not an independent review or certification.
Report: `20261102T212207Z-g3-desk-b6a93c25.json` (disposition: revise).

| Finding | Severity | Disposition |
|---|---|---|
| F1: Data sum 503 vs 513, mean 33.53 vs 34.2, s 3.42 vs 3.8 in topic-01 Worked example | blocking | Repaired: 15 classroom data values updated to `31, 28, 35, 40, 33, 29, 36, 34, 34, 39, 30, 40, 35, 32, 37`. Their sum is exactly 513, mean is exactly 34.2 (513 / 15), and sample standard deviation is 3.8023 (rounds to 3.8). Step 2 restated as `mean = 513 / 15 = 34.2 (n = 15)`. All reuses in fig-U14-1, fig-U14-2, fig-U14-3, fig-U14-4, topic-02 and assessment now match the data. Mirrored in Urdu. |
| F2: Interval '30.5 to 37.9' in topic-02 contradicts worked interval (32.28, 36.12) | blocking | Repaired: replaced placeholder range in topic-02 prose with worked 95% interval `32.3 to 36.1` in both English and Urdu. |
| F3: Use of z* = 1.96 with small sample s at n = 9-25 without t-distribution context | blocking | Repaired: clarified in topic-02 that Student's t is formally covered in Unit 15 for small samples with unknown sigma; standard normal critical value z* = 1.96 is introduced as foundational model; all exercise stems (Activity, CYU 3, Summative task 1, RRQ 9) explicitly supply the required critical value. Mirrored in Urdu. |
| F4: fig-U14-4 subtitle text overflow in 780px viewBox | blocking | Verified repaired: subtitle wrapped across two lines in prior geometry repair commit dfe30c6d6; `node scripts/measure-figure-text.mjs` exits 0 with all variants passing. |
| F5: topic-02 Summative task rubric computation interval 2.12 to 2.68 | blocking | Repaired: corrected mini-rubric computation interval to `(2.13 to 2.67)` in English and Urdu. |
| F6: MCQ 10 option A and key rounding | advisory | Repaired: option A updated to `(69.1, 74.9)` and answer key justification aligned in English and Urdu. |
| F7: RRQ 7 and ERQ 1 pre-rounded vs unrounded SE rounding | advisory | Repaired: marking guidance updated to explicitly state that either rounding route (pre-rounding SE or keeping full precision) earns full marks in English and Urdu. |
| F8: Lane Chapter 9 vs 10 locator; NIST citation; ERQ 2 posterior probability | advisory | Repaired: corrected topic-01 unbiasedness citation to Lane Chapter 10; cited NIST Section 1.3.5.2 for strict frequentist interpretation; replaced 'posterior probability' with taught language in ERQ 2 rubric. Mirrored in Urdu. |
| F9: Sample mean symbol plain x vs x-bar | advisory | Repaired: standardized sample mean to `x̄` in topic-02 prose (Step 1, Step 5, Worked example) in English and Urdu. |
| F10: ERQ 4 sampling unit schools vs pupils | advisory | Repaired: clarified policy maker can afford sample of `25 or 100 pupils` in English and Urdu. |
| F11: Real classroom situation character ambiguity (two officers) | advisory | Repaired: renamed reviewing character to `director` and distinguished `district education officer` in English and Urdu. |
| F12: Rendered accessibility unverified | uncertain | Open, host limit: build, dev server and Playwright are prohibited by crew brief; visual inspection remains for authorized evaluation session. |
| F13: Authority/provenance (G1 open, author run identity) | uncertain | Open, external: G1 unit-spec intake re-evaluation and author run provenance are owner-governed. |
| F14: Source text bundle bindings | uncertain | Open, external: binding full text excerpts into sources/texts/ is host/evaluator responsibility. |

G3 remains unticked (`▢`) with an appended advisory tracker row. Fresh independent review required under ADR-0019.
