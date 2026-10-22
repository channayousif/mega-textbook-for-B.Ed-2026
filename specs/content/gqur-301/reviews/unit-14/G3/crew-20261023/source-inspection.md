# Source inspection - GQUR-301 Unit 14 G3 (crew-20261023)

The frozen bundle's `specs/content/gqur-301/sources/texts/` holds no Unit 14 passage (lane2023.md,
openstax-stats.md and nist-sematech.md carry no confidence-interval or estimator text). The pages
below were fetched live on 2026-10-22 (UTC) with curl (all HTTP 200) and read as supplementary
evidence. They were not added to the frozen inputs, so `sources` cannot be marked verified from
the bundle alone.

| Source | Page read | Passage relied on | Unit claim checked | Result |
|---|---|---|---|---|
| lane2023 | onlinestatbook.com/2/estimation/characteristics.html | "the mean of the sampling distribution of the (sample) mean is the population mean ... Therefore the sample mean is an unbiased estimate of mu" | topic-01 "On average it is right", cited as Lane Chapter 9 | Supported, but the passage is in Chapter 10 (Estimation), not Chapter 9 (advisory locator error) |
| lane2023 | onlinestatbook.com/2/estimation/confidence.html | "If repeated samples were taken ... 95% of the intervals would contain the population mean" and "It is reasonable ... that one adopt a subjective probability of 0.95 that a 95% confidence interval ... contains the parameter" | topic-02 Step 3 meaning of confidence level, cited Lane Ch 10; "there is no probability left to assign" | Long-run reading supported. Lane explicitly qualifies the single-interval probability reading as a defensible subjective view; the unit's flat prohibition is stricter than the cited source (NIST states the strict view). Advisory |
| lane2023 | onlinestatbook.com/2/estimation/mean.html | Learning objectives: "Compute a confidence interval on the mean when sigma is known; Determine whether to use a t distribution or a normal distribution; Compute a confidence interval on the mean when sigma is estimated" | topic-02 uses z* = 1.96 with s | Contradicts unit practice (blocking F3) |
| openstax-stats | openstax.org/.../8-1-a-single-population-mean-using-the-normal-distribution | z-based interval is introduced "where the population standard deviation is known"; confidence level is "the percent of confidence intervals that contain the true population parameter" | topic-02 Step 3, z* = 1.96 cited (Illowsky & Dean, 2023, Chapter 8) | z applies only when sigma is known; unit's data give s only (F3) |
| openstax-stats | openstax.org/.../8-2-a-single-population-mean-using-the-student-t-distribution | "use the Student's t-distribution whenever s is used as an estimate for sigma"; worked example n = 15, df = 14, t0.025 = 2.14 | topic-02 worked example n = 15, s = 3.8, z* = 1.96 | Contradicted by the cited chapter (F3) |
| nist-sematech | itl.nist.gov/div898/handbook/eda/section3/eda352.htm | "a 95 % confidence interval does not mean that there is a 95 % probability that the interval contains the true mean ... the level of confidence is associated with the method"; limits are Ybar +/- t(1-alpha/2, N-1) s/sqrt(N); "As N increases, the interval gets narrower"; larger s gives wider interval | topic-02 width section and misconception | Width and interpretation claims supported; formula uses t, not z (F3) |

`lock2008` is declared under `## Unverifiable sources` at bibliographic level only and no Unit 14
prose relies on it. The declaration is honest.

Classroom vignettes (Sanghar district, 120 schools; Hyderabad travel times) are presented as
illustrations, not factual generalisations; no external support required.
