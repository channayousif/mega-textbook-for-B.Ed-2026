# Bound excerpt - nist-sematech

NIST/SEMATECH. *e-Handbook of Statistical Methods.* National Institute of Standards and Technology.
https://www.itl.nist.gov/div898/handbook/

Open access (U.S. government publication). Listed in the GQUR-301 content-spec curated
open-access list (verified 2026-10-09).

## Section 1.3.5.6: Measures of Scale (verified 2026-10-21)

Page: https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm

The section defines the range as the largest value minus the smallest. Because
it depends on only the two most extreme points, it ignores the spread of the
values in between and should be used with care. The variance is roughly the
average squared distance of the values from the mean; squaring gives extra
weight to values far from the mean, so the variance is strongly affected by
values in the tails. The standard deviation is the square root of the variance,
which returns the measure to the original units of the data, and it shares the
variance's sensitivity to extreme values.

## What this supports in GQUR-301 Unit 6

- Topic 6.1: the range depends on two points and can be changed by one unusual
  value.
- Topics 6.2 and 6.3: the variance and standard deviation are pulled by values
  far from the mean.
