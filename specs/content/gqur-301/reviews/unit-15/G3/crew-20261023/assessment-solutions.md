# GQUR-301 Unit 15 - independent assessment solutions (G3)

Every item was solved before the `## Answers and marking guidance` section was read. Numeric values
are re-derived in `numeric-verification.log` (exact, unrounded). "Match" means the supplied key agrees.

## MCQs

| Item | Derived answer and reasoning | Key | Result |
|---|---|---|---|
| 1 | B: a test decides between H0 and H1 about a population | B | Match |
| 2 | C: H0 is the no-effect claim tested against (A and D are the standard misconception) | C | Match |
| 3 | B: p is P(result at least this extreme given H0) | B | Match |
| 4 | SE = 12/6 = 2; z = 3/2 = 1.50, B | B | Match |
| 5 | A: right-tailed p = P(Z > z) | A | Match |
| 6 | A: s for sigma, t with n - 1 df | A | Match |
| 7 | B: extra uncertainty from estimating sigma | B | Match |
| 8 | SE = 8/4 = 2; t = 5/2 = 2.50, C | C | Match |
| 9 | B | B | Match |
| 10 | B: sigma unknown, n = 12 | B | Match |

Bloom labels are consistent with the thinking required; all ten sit in the Remember-Apply band.

## RRQs

| Item | Derived answer | Key | Result |
|---|---|---|---|
| 1 | Definitions plus a "differs" and a "greater than" school example | same | Match |
| 2 | SE = 2.143; z = 1.40; p = P(Z > 1.40) = 0.0808; not significant at 0.05 | z 1.40, p 0.0808 | Match |
| 3 | alpha = P(reject H0 given H0 true) | same | Match |
| 4 | p is not P(H0 true); it is P(data this extreme given H0) | same | Match |
| 5 | SE = 2.236; t = 2.236 (2.24); df 19 | t 2.23 (from 5/2.24) | Match within rounding (advisory F9) |
| 6 | 2.24 > 2.093, reject; exact two-tailed p = 0.0375 | reject | Match |
| 7 | random sample; sigma known; normal population or n >= 30 | same | Match, but item is recall labelled Apply (advisory F10) |
| 8 | test shows only that the difference is unlikely under H0; not causation; rival explanations | same | Match |
| 9 | thicker tails, larger p for same statistic | same | Match |
| 10 | P(at least one false alarm) = 1 - 0.95^2 = 0.0975; e.g. alpha/2 = 0.025 per test | writes "1 - (0.95 x 0.05) ~ 0.0975" | **Mismatch: printed formula evaluates to 0.9525 (blocking F5)**; also untaught content (advisory F11) |

## ERQs

| Item | Derived answer | Key | Result |
|---|---|---|---|
| 1 | H0 mu = 65, H1 mu != 65; SE 1.667; z 1.80; two-tailed p 0.0719; do not reject | p 0.0718, do not reject | Match |
| 2 | z = 2.10 gives one-tailed p = 0.0179 and two-tailed p = 0.0357. Teacher A's p = 0.036 is the correct two-tailed value; A's only error is the causal overclaim "the new method works". Teacher B mislabels 0.036 as one-tailed (the one-tailed value is 0.018) and wrongly concludes non-significance: the two-tailed test that "differs" requires gives p = 0.036 < 0.05, so the result is significant. | Says A "treats the one-tailed p-value as if the test is two-tailed", then that a two-tailed test with z = 2.10 gives 0.036; says B's two-tailed p "would become 0.072" and be non-significant | **Mismatch: key is wrong and self-contradictory (blocking F4)** |
| 3 | t-test (sigma unknown, n = 14); SE 2.138; t 1.87; df 13; 1.87 < 2.160 do not reject (p = 0.084) | same | Match |
| 4 | B correct; A confuses no evidence with evidence of no difference | same | Match |
| 5 | Errors: false alarms across many tests, significance vs importance, sample-size dependence, not-rejected treated as no difference | same | Match; rubric Band 3 requires effect sizes and multiple-comparison handling not taught (advisory F11) |

Blueprint: 10/10/5 present; MCQ Remember-Apply, RRQ Understand-Analyze (RRQ 7 is actually Remember), ERQ
Analyze-Evaluate; spec's summative "Analyze-or-higher item interpreting a test result in a classroom
evaluation" is met by ERQ 1, 3, 5.

## Topic-level items (no supplied keys)

Topic 15.1 CYU and summative, Topic 15.2 CYU 3/4 (z = 1.87, p = 0.031; two-tailed 0.062, do not reject),
Topic 15.2 summative (z = 1.66, one-tailed p = 0.0486, reject at 0.05, borderline), Topic 15.3 CYU 3/4
(t = 1.98, df 9, < 2.262 do not reject), Topic 15.3 summative (t = 2.13, df 11, < 2.201 do not reject):
all solvable from the taught method; rubrics consistent.
