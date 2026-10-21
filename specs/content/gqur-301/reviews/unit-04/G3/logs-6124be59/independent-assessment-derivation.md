# Independent Assessment Derivation: GQUR-301 Unit 4

Reviewer: agent:g3-reviewer
Model: Gemini 3.8 Flash (High)
Reviewer Run ID: 6124be59-7d79-48d3-9f3d-448c095baceb
Date: 2026-10-21

## Part 1: Blind MCQ Derivations

### Item 1
- **Prompt:** The arithmetic mean of a data set is:
- **Options:** A) The value that occurs most often; B) The sum of the values divided by the number of values; C) The middle value of the sorted data; D) The difference between the largest and smallest values.
- **Independent Derivation:** A is mode, C is median, D is range. The arithmetic mean is defined as the sum of all values divided by the count of values (Σx ÷ n).
- **Derived Answer:** B
- **Author Key:** B (Agreement)

### Item 2
- **Prompt:** Five pupils scored 6, 8, 9, 7 and 10 on a quiz. What is the mean?
- **Options:** A) 7; B) 8; C) 9; D) 40.
- **Independent Derivation:** Sum = 6 + 8 + 9 + 7 + 10 = 40. n = 5. Mean = 40 ÷ 5 = 8.
- **Derived Answer:** B
- **Author Key:** B (Agreement)

### Item 3
- **Prompt:** In a frequency table, marks 4, 5 and 6 were obtained by 3, 5 and 2 pupils. What is the mean mark?
- **Options:** A) 4.9; B) 5.0; C) 15.0; D) 16.3.
- **Independent Derivation:** Σfx = (4 × 3) + (5 × 5) + (6 × 2) = 12 + 25 + 12 = 49. Total frequency Σf = 3 + 5 + 2 = 10. Mean = 49 ÷ 10 = 4.9.
- **Derived Answer:** A
- **Author Key:** A (Agreement)

### Item 4
- **Prompt:** Adding one very high value to a data set will usually:
- **Options:** A) Leave the mean unchanged; B) Raise the mean; C) Lower the mean; D) Make the mean equal to the median.
- **Independent Derivation:** The mean incorporates every value into its numerator sum. An additional extreme high value increases the numerator disproportionately relative to the count increment, thus raising the mean.
- **Derived Answer:** B
- **Author Key:** B (Agreement)

### Item 5
- **Prompt:** "The mean is the balance point of the data" means that:
- **Options:** A) The mean is always the middle value; B) The distances of values below the mean and above it add to the same total; C) Half the values are equal to the mean; D) The mean is the most common value.
- **Independent Derivation:** The mean is the fulcrum where the sum of positive deviations equals the sum of negative deviations: Σ(x - mean) = 0.
- **Derived Answer:** B
- **Author Key:** B (Agreement)

### Item 6
- **Prompt:** Before finding the median, you must first:
- **Options:** A) Add all the values; B) Sort the values in order; C) Remove the largest value; D) Find the mode.
- **Independent Derivation:** The median is the middle position of an ordered array; sorting the data in ascending or descending sequence is a mandatory first step.
- **Derived Answer:** B
- **Author Key:** B (Agreement)

### Item 7
- **Prompt:** What is the median of 41, 29, 35, 52, 33, 38, 30?
- **Options:** A) 35; B) 36.9; C) 33; D) 38.
- **Independent Derivation:** Sorting the 7 values gives: 29, 30, 33, 35, 38, 41, 52. With odd n = 7, median position is (7 + 1) ÷ 2 = 4th value, which is 35.
- **Derived Answer:** A
- **Author Key:** A (Agreement)

### Item 8
- **Prompt:** What is the median of 3, 12, 14, 15, 16, 17, 17, 18, 18, 19?
- **Options:** A) 16; B) 16.5; C) 17; D) 14.9.
- **Independent Derivation:** Data is sorted. n = 10 (even). Middle positions are n ÷ 2 = 5 and (n ÷ 2) + 1 = 6. 5th value is 16; 6th value is 17. Median = (16 + 17) ÷ 2 = 16.5.
- **Derived Answer:** B
- **Author Key:** B (Agreement)

### Item 9
- **Prompt:** A teacher finds that her class's mean mark is much lower than the median. This most likely suggests that:
- **Options:** A) The data are perfectly symmetric; B) A few very low marks are pulling the mean down; C) A few very high marks are pulling the mean up; D) The median was calculated incorrectly.
- **Independent Derivation:** The mean is sensitive to extreme values whereas the median resists them. A mean significantly lower than the median indicates negative (left) skewness caused by severe low outliers pulling the mean downwards.
- **Derived Answer:** B
- **Author Key:** B (Agreement)

### Item 10
- **Prompt:** For the values 5, 7, 8, 8, 9, 10, 45, which measure better describes the typical value?
- **Options:** A) The mean, because it uses every value; B) The median, because it is not pulled by 45; C) The mean, because 45 is the largest value; D) Neither, because the data have an outlier.
- **Independent Derivation:** The outlier 45 inflates the mean (sum = 92, mean = 92 ÷ 7 ≈ 13.14), which is greater than 6 of the 7 values. The median (8) represents the center of the cluster where typical values lie.
- **Derived Answer:** B
- **Author Key:** B (Agreement)

---

## Part 2: Independent Derivation of RRQs

- **RRQ 1:** Mean explained as fair share (equal distribution of pooled total among n units) and balance point (fulcrum of a number-line lever where total negative deviations equal total positive deviations). Mark scheme: 2 marks (1 per concept). Verified.
- **RRQ 2:** Marks 18, 22, 25, 19, 21, 23, 20, 4. Sum = 152. n = 8. Mean = 152 ÷ 8 = 19. Mark scheme: 2 marks (1 for sum, 1 for mean). Verified.
- **RRQ 3:** Frequency table: 2 children in 4 households (8), 3 in 9 (27), 4 in 5 (20), 6 in 2 (12). Total fx = 67. Total f = 20. Mean = 67 ÷ 20 = 3.35 children. Mark scheme: 3 marks (1 for fx products, 1 for Σf, 1 for quotient). Verified.
- **RRQ 4:** Error analysis: dividing Σfx by number of rows (e.g. 4 categories) instead of total sample count Σf. Example: 4 marks with Σfx = 64 and Σf = 10; dividing by 4 yields an impossible 16 on a 10-mark test. Mark scheme: 3 marks. Verified.
- **RRQ 5:** Teacher A includes 2 absent pupils as 0 (lowering mean to 38); Teacher B excludes absences (mean 42). 42 accurately reflects test performance of examinees; absences should be recorded in attendance records rather than contaminating academic attainment measures. Mark scheme: 3 marks. Verified.
- **RRQ 6:** Robustness of median vs sensitivity of mean: median depends strictly on positional ordering, so shifting an extreme value does not alter the middle position value; mean sums every value, so changing an extreme value alters Σx and the resulting quotient. Mark scheme: 2 marks. Verified.
- **RRQ 7:** Using RRQ 2 marks: sorted order is 4, 18, 19, 20, 21, 22, 23, 25. n = 8. Middle positions are 4th (20) and 5th (21). Median = (20 + 21) ÷ 2 = 20.5. Mean is 19. The mean is lower than the median due to the low score of 4 pulling the balance point downwards. Mark scheme: 3 marks. Verified.
- **RRQ 8:** Example: 10, 12, 14, 16, 18 has mean = 14, median = 14. Replacing 18 with 100: new sum = 152, mean = 152 ÷ 5 = 30.4, but median remains 14 (3rd sorted element). Mark scheme: 2 marks. Verified.
- **RRQ 9:** Income distribution skewness: right-skewed by high-income earners inflating the arithmetic mean. Information needed: whether average is mean or median, sampling frame, and distribution quartiles / median income. Mark scheme: 3 marks. Verified.
- **RRQ 10:** Mean ≈ median suggests an approximately symmetric distribution, but does not guarantee absence of outliers because symmetrical pairs of extreme outliers cancel out in the mean calculation without displacing the median. Visual inspection (box plot / dot plot) is required. Mark scheme: 2 marks. Verified.

---

## Part 3: Independent Derivation of ERQs

- **ERQ 1 (Attendance outlier):**
  - Data: 0, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 29.
  - Frequency table: Σfx = (0×1) + (1×2) + (2×3) + (3×2) + (4×2) + (5×1) + (29×1) = 0 + 2 + 6 + 6 + 8 + 5 + 29 = 56. Total f = 12. Mean = 56 ÷ 12 ≈ 4.67 days.
  - Without outlier 29: Sum = 27, count = 11. Mean = 27 ÷ 11 ≈ 2.45 days.
  - Analysis: Outlier 29 nearly doubles the mean (from 2.45 to 4.67), making the mean higher than the absences of 11 out of 12 pupils. It misrepresents normal attendance. Rubric: Band 3 requires complete frequency table, accurate computations, and thorough analysis. Verified.

- **ERQ 2 (Class sizes):**
  - Data: 32, 38, 41, 35, 44, 40.
  - Sum = 230, n = 6. Mean = 230 ÷ 6 ≈ 38.33 pupils.
  - Sorted: 32, 35, 38, 40, 41, 44. Median = (38 + 40) ÷ 2 = 39 pupils.
  - Evaluation: The two measures are very close (38.3 vs 39), reflecting a fairly symmetric spread without outliers. Appropriate reporting: report mean of approximately 38 (or 38.3) while stating the range (32 to 44) to provide full administrative context. Rubric: Band 3 verified.

- **ERQ 3 (Income outlier):**
  - Data: 18, 22, 25, 28, 30, 32, 35, 38, 40, 45, 120.
  - Sum = 433, n = 11. Mean = 433 ÷ 11 ≈ 39.36 thousand rupees.
  - n = 11 is odd; 6th value in sorted list is 32. Median = 32 thousand rupees.
  - Analysis: Outlier 120 pulls the mean up to ~39.4k, exceeding 8 of the 11 households. Median 32k is unaffected and represents the typical household. Rubric: Band 3 verified.

- **ERQ 4 (Comparing two schools):**
  - School P: Mean 61, Median 70. Significant negative gap (mean < median) indicates left skew with several low scores pulling the mean down, though half the class scored 70 or above.
  - School Q: Mean 64, Median 63. Close values indicate roughly symmetric distribution.
  - Officer's evaluation: Flawed because School Q's higher mean (64 vs 61) obscures that typical pupils in School P performed noticeably higher (median 70 vs 63). Needs full mark distribution, pass rates, and class sizes. Rubric: Band 3 verified.

- **ERQ 5 (Classroom activity design):**
  - Evaluates student activity design teaching why mean and median diverge using realistic data, clear instructional steps, formative checks of understanding, and risk mitigation (avoiding embarrassment with sensitive pupil data). Rubric: Band 3 verified.
