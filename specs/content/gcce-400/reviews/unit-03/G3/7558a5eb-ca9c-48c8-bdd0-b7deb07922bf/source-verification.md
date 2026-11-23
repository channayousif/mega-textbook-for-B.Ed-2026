# GCCE-400 Unit 3 - Source Verification Evidence (cycle 2)

Reviewer: agent:claude
Model: LongCat-2.5
Reviewer run: crew-job:gcce-400-u03-review_en-r1(7558a5eb-ca9c-48c8-bdd0-b7deb07922bf)
Date: 2026-11-23
Input manifest: `specs/content/gcce-400/reviews/unit-03/G3/7558a5eb-ca9c-48c8-bdd0-b7deb07922bf/manifest.json` (97 inputs, prepared at HEAD `dd2b914838b704cc754b14f06751be96540dcd7f`)

## Method

Every source key in `specs/content/gcce-400/sources/unit-03.md` was checked against its bound
note. The primary text was re-read in the current Constitution transcription at
`https://www.pakistani.org/pakistan/constitution/` (Parts I, II ch. 1, III ch. 2, VII chs. 1,
1A, 2, 3), fetched 2026-11-23, because the cycle 1 review turned on constitutional currency.
The deployed SHA (`dd2b91483...`) equals HEAD, so the live site is the review input.

## 1. constitution-pakistan

Citation: Government of Pakistan, National Assembly. (2012). *The Constitution of the Islamic
Republic of Pakistan* (as modified up to 28 February 2012; adopted 1973); accessible
transcription https://www.pakistani.org/pakistan/constitution/.

Bound note: `specs/content/gcce-400/sources/texts/constitution-pakistan.md`.

Verified accurate in the current text (fetched 2026-11-23):

- Article 5(1) and 5(2) as quoted in `topic-02.mdx:49,52`.
- Article 8(1)-(2), Article 9, Article 10, Article 10A, Article 11, Articles 12-13, Article 14,
  Article 15, Article 16, Article 17(1), Article 18, Article 19, Article 19A, Article 20,
  Article 21, Article 22(1), Article 23, Article 24, Article 25(1), Article 25(3), Article 25A,
  Article 26, Article 27, Article 28.
- Article 51(2): a citizen not less than 18 on the electoral roll and not declared of unsound mind
  may vote; the unit's "every eligible adult citizen" is a fair summary.
- Article 199(1)(a) and (1)(c): High Court writs on the application of an aggrieved person,
  including enforcement of fundamental rights. Article 199 is active; the Twenty-seventh
  Amendment (2025) changed clauses (4A) and (5), not (1).
- Article 9A: present, between Articles 9 and 10, inserted by the Twenty-sixth Amendment Act,
  2024. Chapter 1 of Part II now holds 25 articles (8, 9, 9A, 10, 10A, 11, 12, 13, 14, 15, 16, 17,
  18, 19, 19A, 20, 21, 22, 23, 24, 25, 25A, 26, 27, 28). The repaired `topic-01.mdx:82` count of
  twenty-five is correct.
- Article 25(2) reads "There shall be no discrimination on the basis of sex"; footnote 39 records
  that "alone" was omitted by the Eighteenth Amendment Act, 2010 (Section 8). The repaired MCQ 4
  key (`unit-assessment.mdx:131`) is correct.
- Article 26 covers access to "places of public entertainment or resort"; the repaired
  `topic-01.mdx:107` examples are within that wording.
- Article 17(2): the Twenty-seventh Amendment Act, 2025 substituted the Federal Constitutional
  Court for the Supreme Court as the forum for a proscribed party (footnote 36, effective
  13 November 2025). The unit does not state the forum, so it is not wrong; the repaired sources
  note records the change.

New discrepancy (finding F9):

- **Article 184 was omitted from the Constitution by the Twenty-seventh Amendment Act, 2025
  (Article 29, effective 13 November 2025).** The transcription retains it only in an omission
  note (footnote 524). The public-importance fundamental-rights jurisdiction that Article 184(3)
  carried now sits in the Federal Constitutional Court under **Article 175E(3)**: "the Federal
  Constitutional Court shall, if it considers that a question of public importance with reference
  to the enforcement of any of the Fundamental Rights conferred by Chapter 1 of Part II is
  involved, have the power to make an order of the nature mentioned in the said Article", with a
  proviso that the jurisdiction "shall only be exercised if an application is filed by a person
  in that Court". The unit still teaches the repealed article and court:
  `topic-01.mdx:52` ("Under Article 184(3), the Supreme Court of Pakistan can act..."),
  `unit-assessment.mdx:101` (ERQ 1 prompt), `unit-assessment.mdx:141` (RRQ 1 model answer),
  `unit-assessment.mdx:168-169` (ERQ 1 rubric), and `sources/unit-03.md:7,18`, which claims the
  Twenty-sixth Amendment "added a proviso to Article 184(3)" and lists the article among the
  unit's current supports.

Verification status: **fail** (currency of Article 184(3); see F9). The cycle 1 findings F1, F2,
F4 (proviso disclosure), F7 are verified resolved.

## 2. dean-2005-citizenship

Citation: Dean, B. L. (2005). Citizenship education in Pakistani schools: Problems and
possibilities. *International Journal of Citizenship and Teacher Education, 1*(2), 35-55.
Bound note: `specs/content/gcce-400/sources/texts/dean-2005-citizenship.md`.

Usage: `topic-01.mdx:49`, `topic-01.mdx:109`, `topic-02.mdx:87`. The bound summary supports the
claims as used, and the unit presents them as one scholar's findings. Status: **pass**.

## 3. ahmad-2004-cice

Citation: Ahmad, I. (2004). Islam, democracy and citizenship education. *Current Issues in
Comparative Education, 7*(1). Bound note: `specs/content/gcce-400/sources/texts/ahmad-2004-cice.md`.

Usage: `topic-01.mdx:57`, `topic-01.mdx:109`, `topic-02.mdx:87`. The bound note supports the
narrow claims used. Status: **pass**.

## 4. glencoe-civics-today

Citation: Glencoe/McGraw-Hill. (n.d.). *Civics today: Citizenship, economics, and you*.
Bound note: none; declared under `## Unverifiable sources`, `sources/unit-03.md:14`.

The repaired declaration names owner ruling D-2026-0001 and states that the unit presents the
idea as general civics knowledge with the book as an example. The repaired prose at
`topic-01.mdx:43` and `topic-02.mdx:45` uses "A widely shared idea in introductory civics" and
"see, for example, Glencoe/McGraw-Hill, n.d.". The declaration is honest about what was checked
and claims no page or wording. Status: **pass as a declared unverifiable source** under D-2026-0001.
