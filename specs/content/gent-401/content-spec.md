---
course_code: GENT-401
status: draft
open_access_floor:
  default: 1
---

# GENT-401 - Entrepreneurship - Content Spec

Semester 4, General Education, 2 (2-0) credit hours (Scheme). Source: `Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt` lines 311-408; Scheme of Studies `Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt` Semester IV row 2 ("GENT- 401, Entrepreneurship, 2 (2-0), General Education, PTGR").

**Identity conflict** (for intake; an Article II.3 question the drafter does not settle): the guide gives credit hours **03** (`:311`); the Scheme gives **2 (2-0)**. Code and title agree. This spec uses the Scheme's credit value, as `D-2026-0053` item 3 did for EFMP-305, and sizes the units for a two-credit theory course.

**Proposed catalog entry** (not yet in `catalog/courses.json`: every G2 and G3 evidence manifest binds that file whole, so adding a course re-opens all reviewed units; awaiting an owner ruling): `{"code": "GENT-401", "title_en": "Entrepreneurship", "title_ur": "کاروباری صلاحیت", "credit_hours": "2 (2-0)", "category": "General Education"}` in Semester 4. The Urdu title is the drafter's proposal.

## Course-wide items

- **Learning Outcomes (guide, verbatim, `:317-325`)**: by the end of this course, students will be able to:
  1. Understand the concept and importance of entrepreneurship in economic growth
  2. Identify and evaluate business opportunities
  3. Develop creative and innovative business ideas
  4. Prepare a comprehensive business plan
  5. Analyze market trends and customer needs
  6. Apply basic financial and marketing strategies
  7. Demonstrate entrepreneurial skills such as leadership, risk-taking, and decision-making
  8. Understand ethical and legal issues in starting a business
- **Teaching strategies (guide, `:392-397`)**: lectures, interactive discussions, question-answer sessions, demonstration, case-study analysis.
- **Practical work (guide, `:399-404`)**: hands-on computer exercises, individual and group assignments, internet research tasks, presentations. The guide's Week 16 adds a business-plan submission and project presentations (`:388-391`); see `## Course project`.
- **Assessment criteria**: none given beyond the mid-term (Week 8) and final project and exam (Week 16); the Constitution Art. III.7 default (60% summative / 40% formative) applies.
- **Context for a B.Ed cohort**: examples and cases draw on enterprises a student-teacher can recognise, including education-sector ventures (a tuition or coaching centre, a school canteen or stationery shop, a learning-materials or edtech start-up, a social enterprise for out-of-school children), alongside general Pakistani small businesses. This shapes examples only and adds no sub-topic.

## Course Description

From the course guide (paraphrased, `:315`): the course introduces the concepts, processes and practices of entrepreneurship, with a focus on the entrepreneurial mindset, opportunity recognition, business planning and venture creation. Students learn how to turn ideas into viable ventures and study risk management, innovation and the entrepreneur's role in economic development, through case studies, business plans and real-world examples.

## Reading list

`Key` is the citation key used in each unit's `sources/unit-NN.md`. `Units` tags which unit(s) each source supports. Every unit binds >= 1 open-access source (`open_access_floor` mapping with `default: 1`), under `D-2026-0053` item 2.

### Guide-listed (`:405-408`)

The guide lists three PDF links and no citations. Each was downloaded on 2026-11-18 and identified from its title pages.

| Key | Citation (identified) | Link as printed | Units | Note |
|---|---|---|---|---|
| mellor-2009 | Mellor, R., with Coulton, G., Chick, A., Bifulco, A., Mellor, N., & Fisher, A. (2009). *Entrepreneurship for everyone: A student textbook*. SAGE. | `repository.stikesrspadgs.ac.id/56/1/...pdf` | 1, 2, 4, 7 | real book. The linked file is a copyrighted SAGE textbook on an unrelated college repository and is very likely an unauthorised copy, so units cite the book and **do not link that file** (drafting note 3) |
| scott-2017-efmd | Scott, J. T. (2017). *The entrepreneur's guide to building a successful business*. EFMD. ISBN 978-0-9818-260-1-1. | https://www.efmdglobal.org/wp-content/uploads/The-Entrepreneurs-Guide-to-Building-a-Successful-Business-2017.pdf | 3, 4, 5, 6 | free PDF from the publisher's own site (HTTP 200, 222 pp., 2026-11-18); all rights reserved, free to read |
| butler-iea | Butler, E. (2020). *An introduction to entrepreneurship*. Institute of Economic Affairs. ISBN 978-0-255-36794-3. | https://aelso.org/files/books/an-introduction-to-entrepreneurship-en.pdf | 1, 2 | the linked file is an authorised Afghan reprint (AELSO, Kabul, 2023, "with the permission of the Institute of Economic Affairs"), 136 pp. The original IEA edition year is the drafter's reading of the ISBN and needs confirming |

### Author-selected (open access)

| Key | Citation | DOI/URL | Units | Note |
|---|---|---|---|---|
| openstax-entrepreneurship | Laverty, M., & Littel, C. (2020). *Entrepreneurship*. OpenStax, Rice University. | https://openstax.org/details/books/entrepreneurship | 1-7 | open access (CC BY-NC-SA 4.0), HTTP 200 on 2026-11-18; chapter titles checked from the book's contents (chapters 1-15). The course's core open text; each unit names its chapters |
| qamar-2020-social | Qamar, U., Ansari, N., Tanveer, F., & Qamar, N. (2020). Social entrepreneurship in Pakistan: Challenges and prospects. *Journal of Management and Research, 7*(2), 1-41. | https://doi.org/10.29145/jmr/72/070201 | 2 | diamond OA; OpenAlex W3118924195 |
| saeed-2014-ee | Saeed, S., Muffatto, M., & Yousafzai, S. (2014). A multi-level study of entrepreneurship education among Pakistani university students. *Entrepreneurship Research Journal, 4*(3). | https://doi.org/10.1515/erj-2013-0041 (accepted manuscript: https://durham-repository.worktribe.com/output/1345959) | 1 | green OA; OpenAlex W1969264211 |
| secp-registration | Securities and Exchange Commission of Pakistan. (n.d.). *Registration of company* (incorporation through eZfile under the Companies Act, 2017). | https://www.secp.gov.pk/company-formation/ | 6 | official page, confirmed 2026-11-18; for the business-registration sub-topic |
| ipo-pakistan | Intellectual Property Organization of Pakistan. (n.d.). *IPO-Pakistan* (patents, designs, copyright, trademarks, geographical indications). | https://ipo.gov.pk/ | 6 | official site, confirmed 2026-11-18; for the intellectual-property sub-topic |

## Week schedule

The guide is a bare 16-week table with no unit headings (`:326-391`). As `D-2026-0070` item 1 allows for such guides, the spec groups the weeks into units, two consecutive content weeks per unit. Weeks 8 (mid-term review and exam) and 16 (final project and evaluation) are not content and have no unit. Each topic is one guide week.

| Week(s) | Unit | Topics (one per week) |
|---|---|---|
| 1-2 | Unit 1 - Entrepreneurship and the Entrepreneurial Mindset | 1.1 Week 1; 1.2 Week 2 |
| 3-4 | Unit 2 - Types of Entrepreneurship and Opportunity Recognition | 2.1 Week 3; 2.2 Week 4 |
| 5-6 | Unit 3 - Market Research and Business Models | 3.1 Week 5; 3.2 Week 6 |
| 7, 9 | Unit 4 - Developing a Business Plan | 4.1 Week 7; 4.2 Week 9 |
| 10-11 | Unit 5 - Financial Planning and Funding | 5.1 Week 10; 5.2 Week 11 |
| 12-13 | Unit 6 - Marketing, Legal and Ethical Issues | 6.1 Week 12; 6.2 Week 13 |
| 14-15 | Unit 7 - Growing a Business and Pitching It | 7.1 Week 14; 7.2 Week 15 |

## Unit 1: Entrepreneurship and the Entrepreneurial Mindset

Guide Weeks 1-2 (`:326-333`). Unit Spec (G1) for `docs/semester-4/gent-401/unit-01/`.

- **CLO/SLO refs**: `SLO:GENT-401-1-1` (define entrepreneurship; explain its importance in economic development; describe characteristics of successful entrepreneurs), `SLO:GENT-401-1-2` (explain creativity, innovation, risk-taking and problem-solving; contrast entrepreneurial and managerial thinking) - traces to guide outcomes 1, 3 and 7.
- **Key terms**: Entrepreneur, Entrepreneurship, Innovation, Risk-taking, Entrepreneurial mindset.
- **Topics**: 1.1 Week 1: introduction to entrepreneurship; 1.2 Week 2: entrepreneurial mindset.
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Analyze item asking the learner to compare how an entrepreneur and a salaried manager would respond to the same problem in a school-supplies business. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U1-01 | Week 1 (`:327`) | 1.1 | Entrepreneurship: meaning and concept |
| U1-02 | Week 1 (`:328`) | 1.1 | Importance of entrepreneurship in economic development |
| U1-03 | Week 1 (`:329`) | 1.1 | Characteristics of successful entrepreneurs |
| U1-04 | Week 2 (`:331`) | 1.2 | Creativity and innovation |
| U1-05 | Week 2 (`:332`) | 1.2 | Risk-taking and problem-solving |
| U1-06 | Week 2 (`:333`) | 1.2 | Entrepreneurial versus managerial thinking |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 1.1 | What entrepreneurship is and why it matters | U1-01, U1-02, U1-03 | 10-14 | fig-U1-1: concept-map, fig-U1-2: table |
| 1.2 | Thinking like an entrepreneur | U1-04, U1-05, U1-06 | 10-14 | fig-U1-3: flowchart, fig-U1-4: table |

**Depth budget**: 6 sub-topics; 2 topics; 32-44 reading-min.

**Prerequisite knowledge**: none beyond general schooling. This is the opening unit of the course.

**Common misconceptions**: "entrepreneurs are born, not made"; "entrepreneurship needs a lot of money to start"; "an entrepreneur is anyone who owns a shop".

**Mapped readings**: openstax-entrepreneurship (chapters 1, 2, 4), mellor-2009, butler-iea, saeed-2014-ee.

**Figure plan**:
  - fig-U1-1 - `concept-map` - how entrepreneurship drives economic development: jobs, innovation, income, competition, community welfare (Topic 1.1)
  - fig-U1-2 - `table` - characteristics of successful entrepreneurs, each with a behaviour that shows it (Topic 1.1)
  - fig-U1-3 - `flowchart` - from problem to innovation: notice, question, generate ideas, test, improve (the unit's required schematic) (Topic 1.2)
  - fig-U1-4 - `table` - entrepreneurial and managerial thinking compared on goals, risk, resources and decisions (Topic 1.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 2: Types of Entrepreneurship and Opportunity Recognition

Guide Weeks 3-4 (`:334-341`). Unit Spec (G1) for `docs/semester-4/gent-401/unit-02/`.

- **CLO/SLO refs**: `SLO:GENT-401-2-1` (distinguish small businesses, scalable start-ups and social enterprises), `SLO:GENT-401-2-2` (identify business opportunities; apply idea-generation techniques; screen and evaluate ideas) - traces to guide outcomes 2 and 3.
- **Key terms**: Small business, Scalable start-up, Social enterprise, Opportunity, Idea screening.
- **Topics**: 2.1 Week 3: types of entrepreneurship; 2.2 Week 4: opportunity recognition.
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Evaluate item asking the learner to screen three business ideas for a small town with a simple weighted checklist and recommend one. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U2-01 | Week 3 (`:335`) | 2.1 | Small businesses and scalable start-ups |
| U2-02 | Week 3 (`:336`) | 2.1 | Social entrepreneurship |
| U2-03 | Week 3 (`:337`, printed "Entrepreneurship"); derived: outcome 1 (`D-2026-0053` item 4) | 2.1 | Other forms: intrapreneurship and women's entrepreneurship (see drafting note 4) |
| U2-04 | Week 4 (`:339`) | 2.2 | Identifying business opportunities |
| U2-05 | Week 4 (`:340`) | 2.2 | Idea-generation techniques |
| U2-06 | Week 4 (`:341`) | 2.2 | Screening and evaluating ideas |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 2.1 | Kinds of entrepreneurship | U2-01, U2-02, U2-03 | 10-14 | fig-U2-1: table, fig-U2-2: concept-map |
| 2.2 | Finding and judging business opportunities | U2-04, U2-05, U2-06 | 10-14 | fig-U2-3: flowchart, fig-U2-4: table |

**Depth budget**: 6 sub-topics; 2 topics; 32-44 reading-min.

**Prerequisite knowledge**: Unit 1.

**Common misconceptions**: "a social enterprise is a charity"; "a good idea is enough to succeed"; "only new inventions count as opportunities".

**Mapped readings**: openstax-entrepreneurship (chapters 2, 5, 6), qamar-2020-social, mellor-2009, butler-iea.

**Figure plan**:
  - fig-U2-1 - `table` - small business, scalable start-up and social enterprise compared on aim, growth, funding and a Pakistani example (Topic 2.1)
  - fig-U2-2 - `concept-map` - forms of entrepreneurship and how they relate (Topic 2.1)
  - fig-U2-3 - `flowchart` - from idea to opportunity: generate, screen, test with customers, decide (the unit's required schematic) (Topic 2.2)
  - fig-U2-4 - `table` - a weighted idea-screening checklist with one worked example (Topic 2.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 3: Market Research and Business Models

Guide Weeks 5-6 (`:343-351`). Unit Spec (G1) for `docs/semester-4/gent-401/unit-03/`.

- **CLO/SLO refs**: `SLO:GENT-401-3-1` (explain customer and market understanding; choose data-collection methods; carry out a competitor analysis), `SLO:GENT-401-3-2` (describe types of business model; write a value proposition; identify revenue streams) - traces to guide outcomes 2 and 5.
- **Key terms**: Market research, Target customer, Competitor analysis, Business model, Value proposition, Revenue stream.
- **Topics**: 3.1 Week 5: market research; 3.2 Week 6: business models.
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Create item asking the learner to draft a value proposition and two revenue streams for a learning-materials venture from given survey data. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U3-01 | Week 5 (`:344`) | 3.1 | Understanding customers and markets |
| U3-02 | Week 5 (`:345`) | 3.1 | Data-collection methods |
| U3-03 | Week 5 (`:346`) | 3.1 | Competitor analysis |
| U3-04 | Week 6 (`:349`) | 3.2 | Types of business models |
| U3-05 | Week 6 (`:350`) | 3.2 | Value proposition |
| U3-06 | Week 6 (`:351`) | 3.2 | Revenue streams |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 3.1 | Researching customers, markets and competitors | U3-01, U3-02, U3-03 | 10-14 | fig-U3-1: flowchart, fig-U3-2: table |
| 3.2 | Business models, value and revenue | U3-04, U3-05, U3-06 | 10-14 | fig-U3-3: diagram, fig-U3-4: table |

**Depth budget**: 6 sub-topics; 2 topics; 32-44 reading-min.

**Prerequisite knowledge**: Unit 2.

**Common misconceptions**: "my friends liking an idea is market research"; "having no competitors means a great opportunity"; "a business model is the same as a business plan".

**Mapped readings**: openstax-entrepreneurship (chapters 5, 11), scott-2017-efmd.

**Figure plan**:
  - fig-U3-1 - `flowchart` - a small market-research cycle: question, method, collect, analyse, decide (the unit's required schematic) (Topic 3.1)
  - fig-U3-2 - `table` - data-collection methods (survey, interview, observation, secondary data) with cost and what each reveals (Topic 3.1)
  - fig-U3-3 - `diagram` - a simple business-model canvas with nine blocks, filled for one example venture (Topic 3.2)
  - fig-U3-4 - `table` - common revenue streams (sale, subscription, fee, advertising, licensing) with an example each (Topic 3.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 4: Developing a Business Plan

Guide Weeks 7 and 9, "Business Plan Development (Part 1)" and "(Part 2)" (`:352-355`, `:360-363`). Unit Spec (G1) for `docs/semester-4/gent-401/unit-04/`.

- **CLO/SLO refs**: `SLO:GENT-401-4-1` (list the components of a business plan; write an executive summary and vision and mission statements), `SLO:GENT-401-4-2` (draft marketing and operational plans; design an organisational structure) - traces to guide outcome 4.
- **Key terms**: Business plan, Executive summary, Vision statement, Mission statement, Operational plan.
- **Topics**: 4.1 Week 7: business plan part 1; 4.2 Week 9: business plan part 2.
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Create item asking the learner to write a vision statement, a mission statement and a half-page executive summary for a given venture. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U4-01 | Week 7 (`:353`) | 4.1 | Components of a business plan |
| U4-02 | Week 7 (`:354`) | 4.1 | Executive summary |
| U4-03 | Week 7 (`:355`) | 4.1 | Vision and mission statements |
| U4-04 | Week 9 (`:361`) | 4.2 | Marketing plan |
| U4-05 | Week 9 (`:362`) | 4.2 | Operational plan |
| U4-06 | Week 9 (`:363`) | 4.2 | Organizational structure |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 4.1 | The plan's frame: components, summary, vision and mission | U4-01, U4-02, U4-03 | 10-14 | fig-U4-1: diagram, fig-U4-2: table |
| 4.2 | Marketing, operations and organisation | U4-04, U4-05, U4-06 | 10-14 | fig-U4-3: flowchart, fig-U4-4: diagram |

**Depth budget**: 6 sub-topics; 2 topics; 32-44 reading-min.

**Prerequisite knowledge**: Unit 3.

**Common misconceptions**: "a business plan is written once and never changed"; "the executive summary should be written first"; "a small business does not need an organisational structure".

**Mapped readings**: openstax-entrepreneurship (chapter 11), scott-2017-efmd, mellor-2009.

**Figure plan**:
  - fig-U4-1 - `diagram` - the sections of a business plan in order, from executive summary to appendices (Topic 4.1)
  - fig-U4-2 - `table` - vision and mission statements compared, with weak and strong examples (Topic 4.1)
  - fig-U4-3 - `flowchart` - the daily operation of a small venture from order to delivery (the unit's required schematic) (Topic 4.2)
  - fig-U4-4 - `diagram` - simple organisational structures for a one-person, five-person and twenty-person venture (Topic 4.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 5: Financial Planning and Funding

Guide Weeks 10-11 (`:364-371`). Unit Spec (G1) for `docs/semester-4/gent-401/unit-05/`.

- **CLO/SLO refs**: `SLO:GENT-401-5-1` (estimate start-up costs and prepare a simple budget; calculate a break-even point; read basic financial statements), `SLO:GENT-401-5-2` (compare bootstrapping, loans and investors; explain venture capital, angel investment and crowdfunding) - traces to guide outcome 6.
- **Key terms**: Start-up cost, Budget, Break-even point, Income statement, Bootstrapping, Venture capital.
- **Topics**: 5.1 Week 10: financial planning; 5.2 Week 11: funding and financing.
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Apply-then-Evaluate item asking the learner to calculate the break-even quantity for a small venture from given costs and price, then judge whether the plan is realistic. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U5-01 | Week 10 (`:365`) | 5.1 | Start-up costs and budgeting |
| U5-02 | Week 10 (`:366`) | 5.1 | Break-even analysis |
| U5-03 | Week 10 (`:367`) | 5.1 | Basic financial statements |
| U5-04 | Week 11 (`:369`) | 5.2 | Funding sources: bootstrapping, investors, loans |
| U5-05 | Week 11 (`:370`) | 5.2 | Venture capital and angel investors |
| U5-06 | Week 11 (`:371`) | 5.2 | Crowdfunding |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 5.1 | Costs, budgets, break-even and statements | U5-01, U5-02, U5-03 | 12-16 | fig-U5-1: diagram, fig-U5-2: table |
| 5.2 | Where the money comes from | U5-04, U5-05, U5-06 | 10-14 | fig-U5-3: flowchart, fig-U5-4: table |

**Depth budget**: 6 sub-topics; 2 topics; 34-46 reading-min.

**Prerequisite knowledge**: Unit 4; `GQUR-300` Quantitative Reasoning I (Semester 1) for the arithmetic of break-even.

**Common misconceptions**: "profit and cash are the same thing"; "break-even means the business is successful"; "investors give money without expecting anything back".

**Mapped readings**: openstax-entrepreneurship (chapter 9), scott-2017-efmd.

**Figure plan**:
  - fig-U5-1 - `diagram` - a break-even chart: fixed cost, total cost and revenue lines and the break-even point, from a worked example (Topic 5.1)
  - fig-U5-2 - `table` - a simple start-up budget and a one-month income statement for the same venture (Topic 5.1)
  - fig-U5-3 - `flowchart` - choosing a funding source by amount needed, control wanted and risk (the unit's required schematic) (Topic 5.2)
  - fig-U5-4 - `table` - bootstrapping, bank loan, angel investor, venture capital and crowdfunding compared (Topic 5.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 6: Marketing, Legal and Ethical Issues

Guide Weeks 12-13 (`:372-379`). Unit Spec (G1) for `docs/semester-4/gent-401/unit-06/`.

- **CLO/SLO refs**: `SLO:GENT-401-6-1` (explain branding and positioning; choose promotion strategies; describe basic digital marketing), `SLO:GENT-401-6-2` (describe how a business is registered in Pakistan; explain intellectual property; apply ethics to entrepreneurial decisions) - traces to guide outcomes 6 and 8.
- **Key terms**: Brand, Positioning, Promotion, Digital marketing, Business registration, Intellectual property.
- **Topics**: 6.1 Week 12: marketing strategies; 6.2 Week 13: legal and ethical issues.
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Evaluate item asking the learner to judge whether a described marketing claim is ethical and lawful and suggest an honest alternative. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U6-01 | Week 12 (`:373`) | 6.1 | Branding and positioning |
| U6-02 | Week 12 (`:374`) | 6.1 | Promotion strategies |
| U6-03 | Week 12 (`:375`) | 6.1 | Digital marketing basics |
| U6-04 | Week 13 (`:377`) | 6.2 | Business registration (sole proprietor, partnership, company; SECP) |
| U6-05 | Week 13 (`:378`) | 6.2 | Intellectual property (IPO-Pakistan) |
| U6-06 | Week 13 (`:379`) | 6.2 | Ethics in entrepreneurship |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 6.1 | Marketing a new venture | U6-01, U6-02, U6-03 | 10-14 | fig-U6-1: diagram, fig-U6-2: table |
| 6.2 | Registering, protecting and acting ethically | U6-04, U6-05, U6-06 | 10-14 | fig-U6-3: flowchart, fig-U6-4: table |

**Depth budget**: 6 sub-topics; 2 topics; 32-44 reading-min.

**Prerequisite knowledge**: Units 3 and 4.

**Common misconceptions**: "marketing just means advertising"; "a small business does not need to register"; "an idea is protected as soon as you have it".

**Mapped readings**: openstax-entrepreneurship (chapters 3, 8, 13), secp-registration, ipo-pakistan, scott-2017-efmd.

**Figure plan**:
  - fig-U6-1 - `diagram` - a positioning map placing four example businesses by price and quality (Topic 6.1)
  - fig-U6-2 - `table` - promotion channels (word of mouth, print, social media, events) with cost and reach (Topic 6.1)
  - fig-U6-3 - `flowchart` - steps to register a company in Pakistan, from name reservation to incorporation, as given on the SECP page (the unit's required schematic) (Topic 6.2)
  - fig-U6-4 - `table` - kinds of intellectual property (trademark, patent, copyright, design) with what each protects and an example (Topic 6.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 7: Growing a Business and Pitching It

Guide Weeks 14-15 (`:380-387`). Unit Spec (G1) for `docs/semester-4/gent-401/unit-07/`.

- **CLO/SLO refs**: `SLO:GENT-401-7-1` (explain leadership and team building; compare scaling strategies; identify and manage business risks), `SLO:GENT-401-7-2` (structure a pitch for a business idea; prepare an investor presentation; apply communication skills) - traces to guide outcome 7.
- **Key terms**: Leadership, Team building, Scaling, Risk management, Pitch.
- **Topics**: 7.1 Week 14: managing and growing a business; 7.2 Week 15: pitching and presentation skills.
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Create item asking the learner to outline a three-minute pitch for their course-project venture. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U7-01 | Week 14 (`:381`) | 7.1 | Leadership and team building |
| U7-02 | Week 14 (`:382`) | 7.1 | Scaling strategies |
| U7-03 | Week 14 (`:383`) | 7.1 | Managing risks |
| U7-04 | Week 15 (`:385`) | 7.2 | How to pitch a business idea |
| U7-05 | Week 15 (`:386`) | 7.2 | Investor presentations |
| U7-06 | Week 15 (`:387`) | 7.2 | Communication skills |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 7.1 | Leading, scaling and managing risk | U7-01, U7-02, U7-03 | 10-14 | fig-U7-1: table, fig-U7-2: diagram |
| 7.2 | Pitching the idea | U7-04, U7-05, U7-06 | 10-14 | fig-U7-3: flowchart, fig-U7-4: table |

**Depth budget**: 6 sub-topics; 2 topics; 32-44 reading-min.

**Prerequisite knowledge**: Units 4-6.

**Common misconceptions**: "growing faster is always better"; "risk can be removed completely"; "a good pitch is a long one with many slides".

**Mapped readings**: openstax-entrepreneurship (chapters 7, 10, 14), mellor-2009.

**Figure plan**:
  - fig-U7-1 - `table` - scaling strategies (new market, new product, franchise, online) with benefit and risk (Topic 7.1)
  - fig-U7-2 - `diagram` - a risk matrix: likelihood against impact, with four example risks placed (Topic 7.1)
  - fig-U7-3 - `flowchart` - structure of a short pitch: hook, problem, solution, market, model, team, ask (the unit's required schematic) (Topic 7.2)
  - fig-U7-4 - `table` - pitch do's and don'ts linked to communication skills (Topic 7.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Course project

The guide's Week 16 (`:388-391`) sets a business-plan submission and project presentations. A course-level project brief (optional `course-review.mdx`) has each student-teacher build one business plan across Units 2-7 and pitch it at the end. It adds no checklist rows and carries a rubric, not a model answer.

## Drafting notes for intake

Recorded by the drafter so the intake evaluator can test them; none is settled here.

1. **Credit hours.** Guide 03, Scheme 2 (2-0). The spec follows the Scheme, as `D-2026-0053` item 3 did for EFMP-305. Fourteen content weeks of three sub-topics each fit a two-credit course only at the depth budgets given; if the owner rules 3 credits, the budgets rise, not the partition.
2. **Grouping.** The guide has no unit headings, so `D-2026-0070` item 1 allows grouping; two consecutive content weeks make a unit. Unit 4 joins Weeks 7 and 9 because the guide itself splits "Business Plan Development" across the mid-term week.
3. **Unauthorised file.** The first guide link (`repository.stikesrspadgs.ac.id`) serves a copyrighted SAGE textbook. The spec cites the book and does not reproduce or link that copy. The owner may want the guide's link corrected at source.
4. **Week 3's third item.** The guide's third Week 3 line reads only "Entrepreneurship" (`:337`), apparently a truncated item. U2-03 fills it with intrapreneurship and women's entrepreneurship under `D-2026-0053` item 4 (outcome 1). If the owner knows the intended item, U2-03 is replaced.
5. **Edition years.** `butler-iea` gives 2020 for the IEA original from the drafter's reading; the file in hand is the 2023 Afghan reprint. The author confirms the year from the IEA before citing it.
6. **Legal currency.** The SECP and IPO pages describe current procedures. Units date-stamp any procedural step they describe and avoid quoting fees, which change.
