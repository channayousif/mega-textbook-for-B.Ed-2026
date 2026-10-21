# Independent Assessment Derivation: GQUR-301 Unit 1

Reviewer: agent:g3-reviewer
Model: Gemini 3.8 Flash (High)
Reviewer Run ID: 459abd64-a834-454a-bb77-eaf0f571110a
Date: 2026-10-19

## Part 1: Blind MCQ Derivations

### Item 1
- **Prompt:** Which of the following is an example of qualitative data?
- **Options:** A) Number of pupils in a class; B) Height of each pupil; C) Subject each pupil studies; D) Marks each pupil scored on a test.
- **Independent Derivation:** Options A (count), B (measurement), and D (numerical marks) represent quantitative data that support arithmetic. Option C (subjects) represents categorical labels/words describing qualities.
- **Derived Answer:** C
- **Author Key:** C (Agreement)

### Item 2
- **Prompt:** Discrete quantitative data are distinguished from continuous quantitative data by the fact that discrete data:
- **Options:** A) Are always larger numbers; B) Are counts that take distinct, separate values; C) Cannot be used in a frequency table; D) Are less accurate.
- **Independent Derivation:** By definition, discrete data represent counts taking isolated, distinct values (usually integers), while continuous data represent measurements that can take any value within a continuum.
- **Derived Answer:** B
- **Author Key:** B (Agreement)

### Item 3
- **Prompt:** A teacher wants to know the average household size in the village where her school is located. She finds a Pakistan Bureau of Statistics report with this information. What kind of source is this?
- **Options:** A) Primary, because it is about her village; B) Secondary, because it was collected by someone else; C) Primary, because it is a government document; D) Secondary, because it is printed on paper.
- **Independent Derivation:** A secondary source consists of data already gathered by an external entity (PBS) for general/demographic purposes, which the researcher retrieves rather than collecting first-hand.
- **Derived Answer:** B
- **Author Key:** B (Agreement)

### Item 4
- **Prompt:** Why are the bars in a histogram drawn touching each other rather than separated by gaps?
- **Options:** A) Saves space on the page; B) Because the data are continuous and the intervals cover the range without gaps; C) Because histograms are always drawn by computer software; D) Because the bars represent the same variable.
- **Independent Derivation:** Histograms display continuous data grouped into contiguous class intervals without gaps between adjacent intervals, visually signified by touching bars.
- **Derived Answer:** B
- **Author Key:** B (Agreement)

### Item 5
- **Prompt:** A researcher records the temperature of a classroom every hour for one week. What type of data is this?
- **Options:** A) Qualitative; B) Discrete quantitative; C) Continuous quantitative; D) Primary qualitative.
- **Independent Derivation:** Temperature is a physical measurement along a continuous scale, capable of taking any intermediate fractional value.
- **Derived Answer:** C
- **Author Key:** C (Agreement)

### Item 6
- **Prompt:** A frequency distribution table for test marks shows the interval 40-49 with a cumulative frequency of 28. What does this mean?
- **Options:** A) 28 pupils scored between 40 and 49; B) 28 pupils scored 49 or below; C) 28 pupils scored exactly 40; D) 28 pupils scored 40 or below.
- **Independent Derivation:** Cumulative frequency in an ascending distribution accumulates frequencies from the lowest boundary up to the upper class limit of the interval (here, scores <= 49).
- **Derived Answer:** B
- **Author Key:** B (Agreement)

### Item 7
- **Prompt:** A head teacher wants to show the School Management Committee how the school's budget is divided among five categories (salaries, materials, maintenance, transport, events). Which chart type best shows the proportion of the total budget that each category takes?
- **Options:** A) Bar chart; B) Histogram; C) Pie chart; D) Scatter plot.
- **Independent Derivation:** Pie charts are specifically designed to represent proportions of a categorical whole where component slices sum to 100%.
- **Derived Answer:** C
- **Author Key:** C (Agreement)

### Item 8
- **Prompt:** Which of the following data sets would be best displayed in a histogram?
- **Options:** A) Number of pupils preferring each of five sports; B) Heights of 60 pupils measured in centimetres; C) Number of schools in each of eight districts; D) Favourite colour of each pupil in a class.
- **Independent Derivation:** Pupil height (B) is a continuous quantitative variable measured across a distribution, which is grouped into intervals for histogram display. A, C, and D are discrete/categorical comparisons suited to bar charts.
- **Derived Answer:** B
- **Author Key:** B (Agreement)

### Item 9
- **Prompt:** A teacher collects her own data by asking pupils how many siblings they have. This is a primary source because:
- **Options:** A) The data are about her own pupils; B) She collected the data herself for her own purpose; C) The data are numerical; D) She wrote the answers in her own notebook.
- **Independent Derivation:** Primary source classification is determined by direct collection by the investigator for their specific purpose.
- **Derived Answer:** B
- **Author Key:** B (Agreement)

### Item 10
- **Prompt:** The following marks (out of 20) were recorded: 12, 15, 8, 17, 11, 14, 9, 16, 13, 10. Which frequency table interval set would be most appropriate?
- **Options:** A) 0-4, 5-9, 10-14, 15-19, 20-24; B) 8-10, 11-13, 14-16, 17-20; C) 0-10, 10-20; D) 8, 9, 10, 11, 12, 13, 14, 15, 16, 17.
- **Independent Derivation:** The minimum mark is 8 and maximum is 17 (range = 9). A has 5 intervals with several empty classes. C has overlapping boundaries. D has individual values, not intervals. B covers the range with 4 intervals. However, interval `17-20` has width 4 (17, 18, 19, 20) whereas intervals `8-10`, `11-13`, `14-16` have width 3 (inclusive), which represents a drafting flaw in option B (it should be 17-19). Among the choices, B is the intended answer.
- **Derived Answer:** B (with advisory on option formatting)
- **Author Key:** B (Agreement on choice)

---

## Part 2: Independent Derivation of RRQs

- **RRQ 1:** Distinction between qualitative (categories, non-arithmetic) and quantitative (numerical counts/measurements), with school examples (e.g. subject studied vs exam marks). Mark scheme: 2 marks. Verified.
- **RRQ 2:** Primary (first-hand collection) vs secondary (pre-existing data from external collector). School examples: teacher survey vs PBS/DEO reports. Mark scheme: 2 marks. Verified.
- **RRQ 3:** Discrete (counts of distinct integer values like test scores) vs continuous (measurements across unbroken scale like completion time). Mark scheme: 2 marks. Verified.
- **RRQ 4:** Class interval width choice: width 10 gives concise overview preventing sparse tables, whereas width 2 scatters small samples into mostly empty intervals. Mark scheme: 2 marks. Verified.
- **RRQ 5:** Raw data: 28, 35, 42, 31, 38, 45, 29, 33, 40, 36, 44, 32.
  - Interval 20-29: 28, 29 -> Frequency = 2
  - Interval 30-39: 31, 32, 33, 35, 36, 38 -> Frequency = 6
  - Interval 40-49: 40, 42, 44, 45 -> Frequency = 4
  - **CRITICAL DEFECT DETECTED IN AUTHOR KEY:** The author model answer gives frequencies: 20-29: 3; 30-39: 5; 40-49: 4. The author miscounted ages 28 and 29 as 3 entries, and miscounted the six 30-39 ages as 5 entries.
- **RRQ 6:** Recommendation of secondary source for province-wide pupil-to-classroom ratios (PBS or Sindh EMIS/DEO reports) due to impracticality of single-researcher primary census. Mark scheme: 3 marks. Verified.
- **RRQ 7:** Comparison of bar chart (reads absolute quantities per section off vertical scale) vs pie chart (illustrates component proportions of whole class). Mark scheme: 2 marks. Verified.
- **RRQ 8:** Frequency from cumulative frequencies: CF(40-49) = 27, CF(30-39) = 15. Frequency(40-49) = 27 - 15 = 12. Model answer matches (12 data points). Mark scheme: 2 marks. Verified.
- **RRQ 9:** Critical evaluation of secondary claim (sampling frame, definition of laboratory, data vintage). Mark scheme: 2 marks. Verified.
- **RRQ 10:** Bar chart preserves temporal sequence across days; grouped histogram loses day-to-day chronological ordering. Mark scheme: 3 marks. Verified.

---

## Part 3: Independent Evaluation of ERQs

- **ERQ 1 (Analyze):** 5-variable classification table (gender [qualitative], absences [discrete], height [continuous], subject [qualitative], quiz score [discrete]) with clear explanation of arithmetic validity for calculating means. Verified.
- **ERQ 2 (Analyze):** Frequency table and histogram description for 24 quiz marks. Correct intervals of width 5 (10-14: 4, 15-19: 10, 20-24: 9, 25-29: 1; CF: 4, 14, 23, 24). Verified.
- **ERQ 3 (Evaluate):** Comparison of school register (secondary, fast but potentially outdated) vs head-count (primary, current and exact for decision). Verified.
- **ERQ 4 (Evaluate):** Three evaluation questions for study time vs score claim (measurement of study hours, sample source/bias, definition/computation of percentage increase). Verified.
- **ERQ 5 (Create):** Chart selection for school results presentation (bar chart for pupil counts, bar/line chart for averages, pie/bar chart for pass rates), construction details, and pitfalls for non-specialists. Verified.
