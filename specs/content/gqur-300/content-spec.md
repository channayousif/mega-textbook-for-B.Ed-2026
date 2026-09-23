---
course_code: GQUR-300
status: draft
# D-2026-0013's floor pattern, in the form `check:source-floor` enforces: every
# unit binds at least one verified open-access source, because two of the four
# guide-required readings are print monographs and one is a government document
# whose locator does not resolve from this host (G-2026-28).
open_access_floor:
  default: 1
---

# GQUR-300 - Quantitative Reasoning-I - Content Spec

Degree track, Semester 1, 3 (3-0) credit hours, 16 weeks. Source:
`Scheme-and-Course-guides/extracted-text/1st 2026.txt` lines 546-680 ("Quantitative
Reasoning-1(Maths)", University of Sindh, Faculty of Education). Original PDF:
`Scheme-and-Course-guides/1st 2026.pdf`.

**Why this course exists.** GQUR-300 is a General Education course in Semester 1 of the
B.Ed (4-Year) programme. It develops prospective teachers' quantitative reasoning skills
for academic study, professional practice, and everyday problem solving: logical thinking,
numerical sense, data interpretation, and the application of mathematical concepts in
real-life contexts. It strengthens foundational mathematical understanding and prepares
future teachers to model quantitative reasoning for their students.

**Placement (owner decision):** the degree track at `docs/semester-1/gqur-300/unit-NN/`
(docs plugin at site root, route `/semester-1/gqur-300`), replacing the legacy placeholder
tree. NEVER the licence tree.

**Bilingual:** full Urdu scope, per catalog entry and task brief (`bilingual: true`). Every
unit requires a complete Urdu mirror (G4) reviewed at G5, `.ur.svg` figure variants, and
terminology-bank-bound Urdu labels.

**Standard:** authored at style-guide v4.5 (frozen standard; concept graph v4.0 included).

**Week schedule note (D-2026-0012):** the guide gives six numbered unit headings but no
week table. The week distributions below are **derived** and labelled as such. They are a
reasonable partition of the guide's content across 16 weeks; the guide does not determine
this split.

## Course-wide items

- **Course outcomes (guide, verbatim):** the course aims to enable prospective teachers to:
  1. Demonstrate numerical and algebraic reasoning
  2. Solve real-world quantitative problems
  3. Apply proportional and logical reasoning
  4. Communicate mathematical ideas clearly
  5. Interpret tables, graphs, and statistical information
- **Teaching strategies (guide):** interactive lectures; problem-solving sessions; group
  activities; real-life case studies; guided practice and discussions; lecture;
  discussions; question-answer; brainstorming.
- **Assessment criteria (guide):** class test; mid term test; evaluation of assignments;
  class attendance; class participation/performance (initiative, responding, curiosity,
  inquiry).
- **Practical work (guide):** group work; group assignments; individual assignment;
  presentations.
- **Recommended resources:** cited by reference only, never reproduced (Constitution Art.
  III.5). The guide's own list names Steen, Grawe, the National Curriculum for Mathematics
  (Pakistan), and the HEC National Professional Standards for Teachers - see
  `## Reading list`.

## Course Description

The guide describes the course as developing "quantitative reasoning skills required for
academic study, professional practice, and everyday problem solving", with an emphasis on
"logical thinking, numerical sense, data interpretation, and the application of
mathematical concepts in real-life contexts" (`1st 2026.txt:558-563`). The course
strengthens foundational mathematical understanding and prepares future teachers to model
quantitative reasoning skills for their students.

## Reading list

Cited by reference only (Constitution Art. III.5). Per-unit open-access substitutes are
added in each unit's `sources/unit-NN.md` at authoring time.

**Open-access floor (D-2026-0013 precedent).** Two of the four guide-required readings are
print monographs and one is a government document whose locator does not resolve from this
host; those three are cited at **title and bibliographic level only**, with that limit
stated at the point of use, and every unit maps at least one **verified open-access
source** (below) that carries its retrievable content. Where a monograph's text cannot be
obtained, D-2026-0001 applies (flag and proceed).

### Guide-required

| Key | Citation | DOI/URL | Units | Note |
|---|---|---|---|---|
| steen2001 | Steen, L. A. (Ed.). (2001). *Mathematics and Democracy: The Case for Quantitative Literacy.* National Council on Education and the Disciplines, Princeton, NJ. ISBN 0970954700. | https://archive.org/details/mathematicsdemoc0000unse | 1, 6 | verified via Open Library (work OL18229070W) and the Internet Archive on 2026-09-23; the scan is controlled-lending, so the text is not openly downloadable - cited at bibliographic level, D-2026-0001 for text |
| grawe | Grawe, N. *Quantitative Literacy: Reasoning about Data.* Cognella Academic Publishing. | unresolvable | 5, 6 | guide-required at `1st 2026.txt:654`; the title is absent from Open Library, the Internet Archive and ERIC, and Cognella answers 403 to this host (checked 2026-09-23) - locator recorded unresolvable in the D-2026-0010 manner: cited at bibliographic level only, limit stated at point of use; the same author's verified open-access article (grawe2012) carries the retrievable content; disposition pending the owner's G-2026-28 ruling (if the unresolvable recording is directed, the Cognella imprint goes with it) |
| ncm | National Curriculum for Mathematics (Pakistan). | unresolvable | 2, 3, 4 | guide-required at `1st 2026.txt:655`; the guide names no year, grade range or imprint, and none is added here; the record could not be resolved from this host on 2026-09-23 - cited at bibliographic level only, limit stated at point of use (D-2026-0010 manner); disposition pending the owner's G-2026-28 ruling |
| npst2009 | Higher Education Commission, Pakistan. (2009). *National Professional Standards for Teachers.* Policy and Planning Wing, Ministry of Education. | https://itacec.org/document/2015/7/National_Professional_Standards_for_Teachers.pdf | 1, 6 | resolves (in-corpus precedent: EFMP-302 npst-pakistan-2009); retrieval limit already recorded under D-2026-0001 |

### Curated-supplementary (open access)

| Key | Citation | DOI/URL | Units | Note |
|---|---|---|---|---|
| grawe2012 | Grawe, N. D. (2012). Achieving a quantitatively literate citizenry: Resources and community to support national change. *Liberal Education, 98*(2), 30-35. | ERIC EJ981327, https://eric.ed.gov/?id=EJ981327 | 1, 5, 6 | verified 2026-09-23; the same author's open-access case for quantitative literacy |
| sikko2023 | Sikko, S. A. (2023). What can we learn from the different understandings of mathematical literacy? *Numeracy, 16*(1). | ERIC EJ1450768, https://eric.ed.gov/?id=EJ1450768 | 1 | verified 2026-09-23; mathematical literacy as reasoning in context |
| gula2025 | Gula, T., & Lovric, M. (2025). Promoting mathematical thinking of university students: The case of a numeracy course. *Canadian Journal of Science, Mathematics and Technology Education.* | ERIC EJ1489427, https://eric.ed.gov/?id=EJ1489427 | 1, 2 | verified 2026-09-23; a university numeracy course design |
| mcclure2020 | McClure, C. P. (2020). Development and assessment of a continuing education unit in quantitative literacy for high school STEM teachers. *Numeracy, 13*(2). | ERIC EJ1480153, https://eric.ed.gov/?id=EJ1480153 | 6 | verified 2026-09-23; quantitative-literacy professional development for teachers |
| tout2020 | Tout, D. (2020). Evolution of adult numeracy from quantitative literacy to numeracy: Lessons learned from international assessments. *International Review of Education, 66*, 183-209. | ERIC EJ1266633, https://eric.ed.gov/?id=EJ1266633 | 5, 6 | verified 2026-09-23 (ERIC; Crossref 10.1007/s11159-020-09831-4); numeracy in international assessments |
| oecd-pisa | OECD. *PISA Mathematics Framework.* OECD Publishing, Paris. | https://www.oecd.org/pisa/ | 1, 5 | international framing of mathematical literacy as real-world reasoning |
| pbs | Pakistan Bureau of Statistics. Government of Pakistan. | https://www.pbs.gov.pk/ | 5, 6 | verified 2026-09-23; Sindh/Pakistan census and survey figures for data units |
| openstax-prealgebra | Marecek, L., Anthony-Smith, M., & Mathis, M. H. (2020). *Prealgebra 2e.* OpenStax, Rice University. | https://openstax.org/details/books/prealgebra-2e | 2, 3, 4 | verified 2026-09-23; open-access worked examples for numbers, algebra, measurement (CC BY) |

## Week schedule

**Derived, not guide-determined (D-2026-0012).** The guide carries no week table; this
distribution is the spec's construction for a 16-week semester and is labelled as derived.

| Week(s) | Unit | Sub-topics |
|---|---|---|
| 1-3 | Unit 1 | nature and importance of QR; numeracy and number sense; estimation and approximation; logical reasoning; problem-solving strategies |
| 4-6 | Unit 2 | whole numbers and integers; fractions and decimals; ratios and proportions; percentages; powers and roots; applications in daily life |
| 7-9 | Unit 3 | variables and algebraic expressions; linear equations; linear inequalities; patterns and sequences; use of algebra in problem solving |
| 10-11 | Unit 4 | units of measurement; perimeter, area, and volume; basic geometric shapes and properties; applications of measurement in real contexts |
| 12-14 | Unit 5 | collection and organization of data; tables, graphs and charts; measures of central tendency; interpretation of statistical information |
| 15-16 | Unit 6 | financial literacy (profit, loss, interest, budgeting); QR in media and advertisements; decision-making using quantitative data; interpreting quantitative information in education and society |

## Standards & frameworks anchors

- National Curriculum for Mathematics, Pakistan - the school strands (number, algebra,
  measurement, data) this course re-grounds for prospective teachers (Units 2-4); cited at
  bibliographic level only (see Reading list).
- National Professional Standards for Teachers, HEC Pakistan (2009) - teacher competence
  framing for quantitative reasoning as professional practice (Units 1, 6).
- OECD PISA Mathematics Framework - mathematical literacy as reasoning in real contexts
  (Units 1, 5).

## Course review plan

- **Course summary points**: quantitative reasoning as a habit of mind, not just
  calculation; number sense and estimation before exact computation; proportional
  reasoning as the bridge from numbers to algebra; measurement and geometry in real
  contexts; data literacy (collect, organize, display, summarize, interpret); quantitative
  reasoning in financial, media, and educational decisions.
- **Practice-question mix**: `### MCQs` roughly 15-20 items across all six units
  (Remember to Apply); `### RRQs` roughly 10-15 (Understand to Analyze); `### ERQs`
  roughly 5-8 (Analyze and above), including one financial-literacy and one
  data-interpretation task.
- **Practicum project ideas** (4):
  - School enrolment data study - collect, tabulate, and chart enrolment by class and
    gender at your practicum school; compute means; interpret trends; bring the chart and
    a one-page analysis back.
  - Classroom marksheet analysis - take a real class test (anonymised), compute mean,
    median, and mode, and write what each measure tells the teacher that the others do not.
  - School budget exercise - draft a monthly budget for a classroom resource (e.g., a
    science corner) in rupees, with a profit/loss or interest scenario, and justify the
    spending decisions.
  - Media number audit - collect three advertisements or news claims using numbers or
    graphs, verify the arithmetic, and present which claims are sound and which mislead.

## Unit 1: Foundations of Quantitative Reasoning

Weeks 1-3 (derived). Unit Spec (G1) for `docs/semester-1/gqur-300/unit-01/`.

- **CLO refs**: course outcomes 1 and 3.
- **Key terms**: Quantitative reasoning, Numeracy, Number sense, Estimation,
  Approximation, Logical reasoning, Problem-solving strategy.
- **Topics**: what quantitative reasoning is and why it matters; number sense with
  estimation and approximation; logical reasoning and problem-solving strategies.
- **Worked-example / activity concepts**: estimate a school assembly head-count by
  grouping; spot the flawed pattern in a fee-notice table; apply a four-step
  problem-solving strategy to a school timetable puzzle.
- **Assessment blueprint**: formative on identifying QR situations and estimating
  sensibly; summative includes one Analyze-or-higher item critiquing a piece of everyday
  reasoning.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U1-01 | G1.1 | 1.1 | Nature and importance of quantitative reasoning |
| U1-02 | G1.2 | 1.2 | Numeracy and number sense |
| U1-03 | G1.3 | 1.2 | Estimation and approximation |
| U1-04 | G1.4 | 1.3 | Logical reasoning |
| U1-05 | G1.4 | 1.3 | Problem-solving strategies |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 1.1 | What is quantitative reasoning and why does it matter? | U1-01 | 14-18 | fig-U1-1: concept-map, fig-U1-2: table |
| 1.2 | Number sense, estimation and approximation | U1-02, U1-03 | 14-18 | fig-U1-3: diagram, fig-U1-4: table |
| 1.3 | Logical reasoning and problem-solving strategies | U1-04, U1-05 | 14-18 | fig-U1-5: flowchart, fig-U1-6: table |

**Depth budget**: 5 sub-topics; 3 topics; 55-70 reading-min.

**Prerequisite knowledge**: none (opening unit); assumes only HSC-level general study
skills and everyday arithmetic.

**Common misconceptions**: "quantitative reasoning means doing hard calculations";
"estimation is just guessing"; "there is one correct method for every problem".

**Mapped readings**: steen2001 (bibliographic level only), npst2009, grawe2012, sikko2023,
oecd-pisa.

**Worked-examples plan**: roughly one Pakistan-grounded vignette per sub-topic (assembly
head-count, market prices, timetable puzzle) - see coverage/unit-01.md.

**Figure plan**:
- fig-U1-1 - concept-map: quantitative reasoning and its components (confidence with
  numbers, reasoning in context, communication) radiating from the central idea (Topic 1.1)
- fig-U1-2 - table: school tasks that need quantitative reasoning vs those that do not,
  with the reasoning each demands (Topic 1.1)
- fig-U1-3 - diagram: the estimation ladder, exact count to order-of-magnitude, on a
  number line (Topic 1.2)
- fig-U1-4 - table: estimation strategies (grouping, rounding, front-end, compatible
  numbers) with classroom examples (Topic 1.2)
- fig-U1-5 - flowchart: a four-step problem-solving strategy, understand to check
  (Topic 1.3)
- fig-U1-6 - table: logical-reasoning moves (pattern, if-then, deduction, elimination)
  with everyday examples (Topic 1.3)

**Unit-end assessment blueprint**: 10 MCQ / 10 RRQ / 5 ERQ, >= 2 MCQ and >= 2 RRQ per
topic; MCQs Remember to Apply; RRQs Understand to Analyze; ERQs Analyze to Evaluate, at
least one ERQ rubric demands Analyze-or-higher.

## Unit 2: Numbers and Operations

Weeks 4-6 (derived). Unit Spec (G1) for `docs/semester-1/gqur-300/unit-02/`.

- **CLO refs**: course outcomes 1, 2 and 3.
- **Key terms**: Whole number, Integer, Fraction, Decimal, Ratio, Proportion,
  Percentage, Power, Root, Operation.
- **Topics**: the number system from whole numbers to decimals; ratios, proportions and
  percentages; powers, roots and daily-life applications.
- **Worked-example / activity concepts**: compare a wholesaler's price list in fraction
  and decimal form; scale a recipe for a school function using proportion; compute a
  marks percentage and a discount in rupees; square-and-root work with classroom floor
  tiles.
- **Assessment blueprint**: formative on converting among fractions, decimals, and
  percentages and on solving proportions; summative includes one Analyze-or-higher item
  comparing two shopping deals in rupees.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U2-01 | G2.1 | 2.1 | Whole numbers and integers |
| U2-02 | G2.1 | 2.1 | Fractions and decimals |
| U2-03 | G2.2 | 2.2 | Ratios and proportions |
| U2-04 | G2.2 | 2.2 | Percentages |
| U2-05 | G2.3 | 2.3 | Powers and roots |
| U2-06 | G2.4 | 2.3 | Applications of numbers and operations in daily life |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 2.1 | The number system: whole numbers, integers, fractions and decimals | U2-01, U2-02 | 14-18 | fig-U2-1: diagram, fig-U2-2: table |
| 2.2 | Ratios, proportions and percentages | U2-03, U2-04 | 14-18 | fig-U2-3: diagram, fig-U2-4: table |
| 2.3 | Powers, roots and daily-life applications | U2-05, U2-06 | 14-18 | fig-U2-5: diagram, fig-U2-6: flowchart |

**Depth budget**: 6 sub-topics; 3 topics; 55-70 reading-min.

**Prerequisite knowledge**: Unit 1 (number sense, estimation); HSC-level arithmetic.

**Common misconceptions**: "multiplying always makes bigger"; "a percentage is a separate
kind of number, not a fraction"; "division of fractions has no meaning".

**Mapped readings**: ncm (bibliographic level only), openstax-prealgebra, gula2025.

**Worked-examples plan**: roughly one Pakistan-grounded vignette per sub-topic (bazaar
prices, recipe scaling, marksheet percentages, floor tiles) - see coverage/unit-02.md.

**Figure plan**:
- fig-U2-1 - diagram: the number-system family tree, whole numbers inside integers
  inside rationals, with fraction and decimal notations (Topic 2.1)
- fig-U2-2 - table: operations with fractions and decimals, one worked rupee-context
  example per operation (Topic 2.1)
- fig-U2-3 - diagram: the ratio-proportion-percent triangle showing how each converts to
  the others (Topic 2.2)
- fig-U2-4 - table: percentage situations (of, increase, decrease, more than) with
  marksheet and discount examples in rupees (Topic 2.2)
- fig-U2-5 - diagram: square numbers grown as tiles, 1x1 to 5x5, with the root as the
  side (Topic 2.3)
- fig-U2-6 - flowchart: choosing the operation for a daily-life word problem, from
  reading the question to checking the answer (Topic 2.3)

**Unit-end assessment blueprint**: 10 MCQ / 10 RRQ / 5 ERQ, >= 2 MCQ and >= 2 RRQ per
topic; MCQs Remember to Apply; RRQs Understand to Analyze; ERQs Analyze to Evaluate, at
least one ERQ rubric demands Analyze-or-higher.

## Unit 3: Algebraic Reasoning

Weeks 7-9 (derived). Unit Spec (G1) for `docs/semester-1/gqur-300/unit-03/`.

- **CLO refs**: course outcomes 1 and 2.
- **Key terms**: Variable, Algebraic expression, Linear equation, Inequality, Pattern,
  Sequence.
- **Topics**: from patterns to variables and expressions; linear equations and
  inequalities; using algebra in problem solving.
- **Worked-example / activity concepts**: describe a matchstick-triangle pattern with a
  rule; solve a fare-plus-rate autoline (rickshaw) equation; set up a stationery-budget
  inequality; translate a fare notice into an equation.
- **Assessment blueprint**: formative on writing expressions from patterns and solving
  two-step equations; summative includes one Analyze-or-higher item comparing two pricing
  schemes with algebra.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U3-01 | G3.1 | 3.1 | Variables and algebraic expressions |
| U3-02 | G3.2 | 3.2 | Linear equations |
| U3-03 | G3.2 | 3.2 | Linear inequalities |
| U3-04 | G3.3 | 3.1 | Patterns and sequences |
| U3-05 | G3.4 | 3.3 | Use of algebra in problem solving |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 3.1 | From patterns to algebra: variables and expressions | U3-01, U3-04 | 14-18 | fig-U3-1: diagram, fig-U3-2: table |
| 3.2 | Linear equations and inequalities | U3-02, U3-03 | 14-18 | fig-U3-3: flowchart, fig-U3-4: diagram |
| 3.3 | Using algebra in problem solving | U3-05 | 14-18 | fig-U3-5: concept-map, fig-U3-6: table |

**Depth budget**: 5 sub-topics; 3 topics; 55-70 reading-min.

**Prerequisite knowledge**: Unit 2 (operations, fractions, percentages); HSC algebra
vocabulary refreshed in Topic 3.1.

**Common misconceptions**: "a letter in maths has no meaning until it is solved for";
"the equals sign means the answer comes next"; "inequalities behave exactly like
equations under every operation".

**Mapped readings**: ncm (bibliographic level only), openstax-prealgebra.

**Worked-examples plan**: roughly one Pakistan-grounded vignette per sub-topic
(matchstick patterns, rickshaw fares, stationery budget, fare notice) - see
coverage/unit-03.md.

**Figure plan**:
- fig-U3-1 - diagram: a matchstick-triangle pattern, stages 1-4, with the rule growing
  beside it as an expression (Topic 3.1)
- fig-U3-2 - table: algebra vocabulary (variable, coefficient, term, expression,
  equation) with a classroom example each (Topic 3.1)
- fig-U3-3 - flowchart: solving a two-step linear equation, simplify to isolate to check
  (Topic 3.2)
- fig-U3-4 - diagram: the number line with a solved inequality shaded, showing why the
  direction flips when multiplying by a negative (Topic 3.2)
- fig-U3-5 - concept-map: algebra in problem solving, translation, modelling, solving,
  interpreting, linked to the problem-solving strategy of Unit 1 (Topic 3.3)
- fig-U3-6 - table: translating everyday phrases into algebra, with fare and budget
  examples (Topic 3.3)

**Unit-end assessment blueprint**: 10 MCQ / 10 RRQ / 5 ERQ, >= 2 MCQ and >= 2 RRQ per
topic (Topic 3.3 may carry fewer where items integrate earlier sub-topics); MCQs Remember
to Apply; RRQs Understand to Analyze; ERQs Analyze to Evaluate, at least one ERQ rubric
demands Analyze-or-higher.

## Unit 4: Measurement and Geometry

Weeks 10-11 (derived). Unit Spec (G1) for `docs/semester-1/gqur-300/unit-04/`.

- **CLO refs**: course outcomes 2 and 4 (outcome 4 through communicating measurements and
  geometric results precisely: reading a real measure, stating a unit, and reporting a
  computation so another teacher can check it).
- **Key terms**: Unit of measurement, Length, Mass, Capacity, Perimeter, Area, Volume,
  Rectangle, Triangle, Circle.
- **Topics**: units of measurement; perimeter, area, volume and basic shapes;
  applications of measurement in real contexts.
- **Worked-example / activity concepts**: convert a fabric-shop order between metres and
  centimetres; fence-and-carpet a rectangular classroom; compare box volumes for a
  book-donation drive; measure a school courtyard and report like a site engineer.
- **Assessment blueprint**: formative on unit conversion and perimeter/area/volume of
  simple shapes; summative includes one Analyze-or-higher item planning a school garden
  within a budget of fencing and tiles.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U4-01 | G4.1 | 4.1 | Units of measurement |
| U4-02 | G4.2 | 4.2 | Perimeter, area, and volume |
| U4-03 | G4.3 | 4.2 | Basic geometric shapes and properties |
| U4-04 | G4.4 | 4.3 | Applications of measurement in real contexts |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 4.1 | Units of measurement | U4-01 | 12-16 | fig-U4-1: table, fig-U4-2: diagram |
| 4.2 | Perimeter, area, volume and basic shapes | U4-02, U4-03 | 14-18 | fig-U4-3: diagram, fig-U4-4: table |
| 4.3 | Measurement in real contexts | U4-04 | 12-16 | fig-U4-5: flowchart, fig-U4-6: table |

**Depth budget**: 4 sub-topics; 3 topics; 50-68 reading-min.

**Prerequisite knowledge**: Unit 2 (operations with decimals); everyday familiarity with
rupee prices and shop measures.

**Common misconceptions**: "area and perimeter grow together"; "a bigger number always
means a bigger measurement" (unit confusion); "volume is just area times any number".

**Mapped readings**: ncm (bibliographic level only), openstax-prealgebra.

**Worked-examples plan**: roughly one Pakistan-grounded vignette per sub-topic (fabric
shop, classroom floor, donation boxes, courtyard survey) - see coverage/unit-04.md.

**Figure plan**:
- fig-U4-1 - table: metric units for length, mass, and capacity with conversion examples
  from a Pakistani market context (Topic 4.1)
- fig-U4-2 - diagram: the basic shapes (rectangle, square, triangle, circle) with their
  defining properties labelled (Topic 4.1)
- fig-U4-3 - diagram: one-dimensional to three-dimensional, a fence line, a floor carpet,
  a water tank, showing perimeter, area, volume on the same classroom corner (Topic 4.2)
- fig-U4-4 - table: perimeter, area, volume formulas with one worked classroom example
  each (Topic 4.2)
- fig-U4-5 - flowchart: planning a real measurement task, choose unit to measure to
  compute to check the reasonableness (Topic 4.3)
- fig-U4-6 - table: school and community measurement tasks, what to measure, which unit
  and formula apply (Topic 4.3)

**Unit-end assessment blueprint**: 10 MCQ / 10 RRQ / 5 ERQ, >= 2 MCQ and >= 2 RRQ per
topic (Topic 4.3 may carry fewer where items integrate earlier sub-topics); MCQs Remember
to Apply; RRQs Understand to Analyze; ERQs Analyze to Evaluate, at least one ERQ rubric
demands Analyze-or-higher.

## Unit 5: Data Analysis and Statistics

Weeks 12-14 (derived). Unit Spec (G1) for `docs/semester-1/gqur-300/unit-05/`.

- **CLO refs**: course outcomes 2 and 5.
- **Key terms**: Data, Frequency table, Bar chart, Pie chart, Line graph, Pictograph,
  Mean, Median, Mode, Average.
- **Topics**: collecting and organizing data; tables, graphs and charts; measures of
  central tendency and interpretation of statistical information.
- **Worked-example / activity concepts**: run a travel-to-school survey and tally it;
  chart class-test marks as a bar chart and a pie chart; compute mean, median, mode of a
  marksheet and argue which best represents the class; read a Sindh literacy graph and
  state what it does and does not show.
- **Assessment blueprint**: formative on tallying, charting, and computing the three
  averages; summative includes one Analyze-or-higher item interpreting a real chart and
  identifying what it cannot support.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U5-01 | G5.1 | 5.1 | Collection and organization of data |
| U5-02 | G5.2 | 5.2 | Tables, graphs, and charts |
| U5-03 | G5.3 | 5.3 | Measures of central tendency |
| U5-04 | G5.4 | 5.3 | Interpretation of statistical information |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 5.1 | Collecting and organizing data | U5-01 | 12-16 | fig-U5-1: flowchart, fig-U5-2: table |
| 5.2 | Tables, graphs and charts | U5-02 | 14-18 | fig-U5-3: diagram, fig-U5-4: table |
| 5.3 | Measures of central tendency and interpreting statistics | U5-03, U5-04 | 14-18 | fig-U5-5: diagram, fig-U5-6: table |

**Depth budget**: 4 sub-topics; 3 topics; 50-68 reading-min.

**Prerequisite knowledge**: Unit 2 (percentages, for pie charts); Unit 1 (estimation, for
sanity-checking averages).

**Common misconceptions**: "the mean is the only average"; "a graph's impression is the
data"; "a bigger-looking bar always means a bigger value" (truncated or scaled axes).

**Mapped readings**: grawe (bibliographic level only), grawe2012, tout2020, pbs,
oecd-pisa.

**Worked-examples plan**: roughly one Pakistan-grounded vignette per sub-topic
(travel-to-school survey, class marks, marksheet averages, Sindh literacy figures from
the Pakistan Bureau of Statistics) - see coverage/unit-05.md.

**Figure plan**:
- fig-U5-1 - flowchart: the data cycle, pose a question to collect to organize to
  summarize to interpret (Topic 5.1)
- fig-U5-2 - table: data-collection methods (observation, survey, records) with classroom
  examples and what each suits (Topic 5.1)
- fig-U5-3 - diagram: choosing the right display, category comparison to bar, parts of a
  whole to pie, change over time to line (Topic 5.2)
- fig-U5-4 - table: display types (frequency table, bar, pie, line, pictograph) with what
  each shows best and a pitfall each (Topic 5.2)
- fig-U5-5 - diagram: mean, median, and mode marked on one dot plot of class marks,
  showing how each average sits in the data (Topic 5.3)
- fig-U5-6 - table: interpretation questions to ask of any statistic (who collected it,
  how, compared to what, what is missing) with examples (Topic 5.3)

**Unit-end assessment blueprint**: 10 MCQ / 10 RRQ / 5 ERQ, >= 2 MCQ and >= 2 RRQ per
topic (Topic 5.1 may carry fewer where items integrate later sub-topics); MCQs Remember
to Apply; RRQs Understand to Analyze; ERQs Analyze to Evaluate, at least one ERQ rubric
demands Analyze-or-higher.

## Unit 6: Quantitative Reasoning in Everyday Life

Weeks 15-16 (derived). Unit Spec (G1) for `docs/semester-1/gqur-300/unit-06/`.

- **CLO refs**: course outcomes 2, 4 and 5.
- **Key terms**: Profit, Loss, Interest, Budget, Markup, Discount, Claim, Evidence.
- **Topics**: financial literacy; quantitative reasoning in media and advertisements;
  decision-making with quantitative data in education and society.
- **Worked-example / activity concepts**: compute profit and loss on a school-fair stall;
  compare a savings-account interest offer against a jewellery purchase; draft a monthly
  household budget in rupees; audit the numbers in a newspaper advertisement; decide
  between two schools using enrolment and results data.
- **Assessment blueprint**: formative on profit/loss/interest computation and budget
  arithmetic; summative includes one Evaluate-level item judging a real-world claim or
  decision with evidence.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U6-01 | G6.1 | 6.1 | Financial literacy: profit and loss |
| U6-02 | G6.1 | 6.1 | Financial literacy: interest |
| U6-03 | G6.1 | 6.1 | Financial literacy: budgeting |
| U6-04 | G6.2 | 6.2 | Quantitative reasoning in media and advertisements |
| U6-05 | G6.3 | 6.3 | Decision-making using quantitative data |
| U6-06 | G6.4 | 6.3 | Interpreting quantitative information in education and society |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 6.1 | Financial literacy: profit, loss, interest and budgeting | U6-01, U6-02, U6-03 | 14-18 | fig-U6-1: flowchart, fig-U6-2: table |
| 6.2 | Quantitative reasoning in media and advertisements | U6-04 | 12-16 | fig-U6-3: diagram, fig-U6-4: table |
| 6.3 | Decision-making with data in education and society | U6-05, U6-06 | 14-18 | fig-U6-5: concept-map, fig-U6-6: table |

**Depth budget**: 6 sub-topics; 3 topics; 55-70 reading-min.

**Prerequisite knowledge**: Units 2 and 5 (percentages, averages, reading charts); Unit 1
(problem-solving strategy).

**Common misconceptions**: "profit is whatever money comes in"; "interest only ever helps
the saver"; "a budget is a restriction, not a plan"; "numbers in an advertisement must be
true".

**Mapped readings**: steen2001 (bibliographic level only), grawe (bibliographic level
only), mcclure2020, npst2009, pbs.

**Worked-examples plan**: roughly one Pakistan-grounded vignette per sub-topic (school
fair stall, bank saving offer, household budget, newspaper advertisement, school choice)
- see coverage/unit-06.md.

**Figure plan**:
- fig-U6-1 - flowchart: building a monthly budget, income to fixed costs to variable
  costs to savings to review (Topic 6.1)
- fig-U6-2 - table: profit, loss, simple interest, and budget terms with worked rupee
  examples (Topic 6.1)
- fig-U6-3 - diagram: how an advertisement misleads with a truncated axis and a
  conveniently rounded percentage, side by side with the honest version (Topic 6.2)
- fig-U6-4 - table: questions to ask of a numeric claim in media (source, base, unit,
  comparison, missing context) with ad examples (Topic 6.2)
- fig-U6-5 - concept-map: decision-making with data, question, evidence, options,
  trade-off, decision, review, linked to the course's earlier tools (Topic 6.3)
- fig-U6-6 - table: education and society indicators (enrolment rate, literacy rate,
  pupil-teacher ratio, attendance) with what each measures and its limits (Topic 6.3)

**Unit-end assessment blueprint**: 10 MCQ / 10 RRQ / 5 ERQ, >= 2 MCQ and >= 2 RRQ per
topic (Topic 6.2 may carry fewer where items integrate earlier sub-topics); MCQs Remember
to Apply; RRQs Understand to Analyze; ERQs Analyze to Evaluate, at least one ERQ rubric
demands Analyze-or-higher.
