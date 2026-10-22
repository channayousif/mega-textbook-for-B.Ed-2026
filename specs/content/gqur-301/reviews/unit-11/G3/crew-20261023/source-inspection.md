# GQUR-301 Unit 11 G3: source inspection

Read live on 2026-10-22 (UTC) through the Firecrawl scraper. These pages are not bound in the
prepared manifest (only `specs/content/gqur-301/sources/unit-11.md` and the course guide text are).
See finding F7.

## Course guide

`Scheme-and-Course-guides/extracted-text/2nd 2026.txt` lines 492-494: "Chapter 11: Probabilistic
Models / 11.1 Introduction to Probabilistic Models / 11.2 Applications in Real Life". Matches
content-spec `## Unit 11` sub-topics U11-01 and U11-02 and the two topic files.

## Lane, Online Statistics Education, Binomial Distribution (Chapter 5)

https://onlinestatbook.com/2/probability/binomial.html
- "probability distributions for which there are just two possible outcomes with fixed probabilities
  summing to one ... called binomial distributions"; "independent events that each have a probability
  of pi"; "mu = N pi"; "sigma^2 = N pi (1 - pi)".
- Supports topic-01 "Two foundational probabilistic models" conditions, E(X) = n x p and
  Var(X) = n x p x (1 - p), and topic-02 guessing application. The page's own exercise names
  "a student blindly guessing ... multiple-choice questions" as a binomial case.

## Lane, Introduction to Normal Distributions (Chapter 7)

https://onlinestatbook.com/2/normal_distribution/intro.html
- Seven features: symmetric; mean, median and mode equal; area 1.0; defined by mu and sigma;
  68% within one SD; approximately 95% within two SD.
- Supports topic-01 lines 98-102 (parameters, coincident centre, total area one).

## Illowsky & Dean, Introductory Statistics 2e, Section 4.3

https://openstax.org/books/introductory-statistics-2e/pages/4-3-binomial-distribution
- "There are three characteristics of a binomial experiment": fixed n; two outcomes with p + q = 1;
  "The n trials are independent and are repeated using identical conditions ... p ... remain the same";
  "mu = np and sigma^2 = npq".
- Supports the four listed conditions (the unit splits constant p out of OpenStax's third
  characteristic; a faithful paraphrase).

## Illowsky & Dean, Section 6.1

https://openstax.org/books/introductory-statistics-2e/pages/6-1-the-standard-normal-distribution
- "The Empirical Rule ... About 68% ... within one standard deviation ... About 95% ... two ...
  About 99.7% ... three".
- Supports topic-01 lines 104-105 and topic-02 lines 75-76.

## Unsupported or authored claims

- All school vignettes and numbers are declared invented (index.mdx, assessment preamble) and are
  authored applications, consistent with `sources/unit-11.md`.
- Babones (2013) is bibliographic only and carries no content claim; consistent with the declaration.
- `sources/unit-11.md` names "Section 6.1-6.2" in its prose but only 6.1 is cited or listed in the
  locators (advisory F6).
