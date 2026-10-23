# GQUR-301 Unit 15 - source inspection (G3)

The bound bundle's `specs/content/gqur-301/sources/texts/` holds no Unit 15 passage, so every check below
used live pages fetched 2026-10-23 with curl (HTTP status, page title) and Firecrawl (passage text).
These pages are not bound inputs (finding F13).

## Cited URLs and locators

| Where cited | Cited as | Observed | Verdict |
|---|---|---|---|
| topic-01 Further reading | OpenStax Ch 9 introduction, /pages/9-introduction | 200, "Ch. 9 Introduction" | OK |
| topic-01 Further reading | Lane & Ziemer "Hypothesis Testing", onlinestatbook.com/2/more_studies/hypothesis_testing.html | **404 Not Found** | Broken |
| topic-01 Further reading, Step 4 | NIST Section 1.3.5.3 "What is a Hypothesis Test?", eda353.htm | 200, page title "1.3.5.3. Two-Sample t-Test for Equal Means" | Wrong title/locator |
| topic-02 Further reading, When to use a z-test | OpenStax Section 9.3 "single mean and known standard deviation", /pages/9-3-single-mean-and-known-standard-deviation | **404**; real 9.3 is "Probability Distribution Needed for Hypothesis Testing" | Broken URL, wrong title |
| topic-02 Further reading, When to use a z-test | NIST Section 7.1.3 "What is a Z-test?", eda353.htm#ZTEST | eda353 is the two-sample t-test page and has no ZTEST anchor; 7.1.3 is "What are statistical tests?" at prc/section1/prc13.htm | Wrong title and URL |
| topic-02 Further reading | Lane "Hypothesis Testing with z", more_studies/hypothesis_testing_z.html | **404** | Broken |
| topic-03 Further reading, When to use a t-test | OpenStax Section 9.4 "single mean and unknown standard deviation", /pages/9-4-single-mean-and-unknown-standard-deviation | **404**; real 9.4 is "Rare Events, the Sample, Decision and Conclusion"; t-test conditions are in 9.3 | Broken URL, wrong locator |
| topic-03 Further reading | Lane "t-test for a Single Mean", more_studies/hypothesis_testing_t.html | **404**; the real page is onlinestatbook.com/2/tests_of_means/single_mean.html (200) | Broken |
| topic-03 Further reading | NIST Section 1.3.6.7 "Student's t-distribution", eda358.htm | 200, page title "1.3.5.8. Chi-Square Test for the Variance" | Wrong URL |
| topic-01 Step 4, topic-02 One- and two-tailed | OpenStax Section 9.2 for p-value and tail rules | 9.2 is "Outcomes and the Type I and Type II Errors" | Wrong locator |

`sources/unit-15.md` states the OpenStax and Lane section pages "were re-checked on 2026-10-23 (HTTP 200,
titles matching)". That is not true of the deep links the prose cites. It also says lock2008 is "referenced in
the prose only as a course text", but no unit file mentions Lock.

## Passage support (substance)

- OpenStax 9.1 "Null and Alternative Hypotheses" (fetched): "H0 always has a symbol with an equal in it";
  Ha "is usually what the researcher is trying to prove"; decisions "reject H0" / "do not reject H0".
  Supports Topic 15.1 Steps 1 and 5 and the misconception box.
- OpenStax 9.3 "Probability Distribution Needed for Hypothesis Testing" (fetched): z-test assumptions "simple
  random sample ... normally distributed, or your sample size is sufficiently large. You know the value of the
  population standard deviation"; t-test "comes from a population that is approximately normally distributed.
  You use the sample standard deviation to approximate the population standard deviation". Supports the
  substance of Topic 15.2 and 15.3 "When to use" lists, under the wrong section numbers.
- Lane Ch 11 "Significance Testing" (onlinestatbook.com/2/logic_of_hypothesis_testing/significance.html,
  fetched): "conventional to conclude the null hypothesis is false if the probability value is less than 0.05.
  More conservative researchers ... 0.01"; "statistical significance means only that the null hypothesis of
  exactly no effect is rejected; it does not mean that the effect is important"; Fisher/Neyman-Pearson
  discussion. Supports Topic 15.1 Step 2, Topic 15.2 "What reject really means" and the Topic 15.3 bright-line
  misconception, but at a URL the unit does not cite.

No claim was found that contradicts these sources; the defect is that a reader cannot reach the cited
passages from the unit (6 of 9 deep links broken or pointing to unrelated pages).
