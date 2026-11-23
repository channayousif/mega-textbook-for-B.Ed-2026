# GCCE-400 Unit 3 - Source Verification Evidence

Reviewer: agent:claude
Model: LongCat-2.5
Reviewer Run ID: 52caad24-9ea1-412b-918e-0ec74d99f5d0
Date: 2026-11-23
Input manifest: `specs/content/gcce-400/reviews/unit-03/G3/52caad24-9ea1-412b-918e-0ec74d99f5d0/manifest.json` (97 inputs, prepared at HEAD `3ea8c670e552cbafd99c59d3e36eb35cb4788f25`)

## Method

Every source key in `specs/content/gcce-400/sources/unit-03.md` was checked against its bound
note and, for the primary text, against the current Constitution transcription at
`https://www.pakistani.org/pakistan/constitution/` (Parts I, II ch. 1, VII chs. 1-3), fetched
2026-11-23. The tracker asked this reviewer to confirm the currency of the cited constitutional
provisions (Articles 8-28 and Article 5), so the current text was read directly rather than
through the 2012 edition named in the content-spec.

## 1. constitution-pakistan

Citation: Government of Pakistan, National Assembly. (2012). *The Constitution of the Islamic
Republic of Pakistan* (as modified up to 28 February 2012; adopted 1973); accessible
transcription https://www.pakistani.org/pakistan/constitution/.

Bound note: `specs/content/gcce-400/sources/texts/constitution-pakistan.md`.

Verified as accurate in the current text:

- Article 5(1) "Loyalty to the State is the basic duty of every citizen." and Article 5(2)
  "Obedience to the Constitution and law is the inviolable obligation of every citizen wherever
  he may be and of every other person for the time being within Pakistan." (Part I, unchanged).
- Article 8(1)-(2): inconsistency with fundamental rights makes a law void to the extent of the
  inconsistency; the State shall not make such a law.
- Article 9 (security of person), Article 10 (arrest safeguards, 24-hour magistrate production),
  Article 10A (fair trial and due process, inserted 2010), Article 11 (slavery, forced labour,
  under-14 hazardous employment), Articles 12-13 (retrospective punishment, double jeopardy,
  self-incrimination), Article 14 (dignity and home privacy inviolable; torture forbidden),
  Article 15 (movement), Article 16 (peaceful assembly without arms), Article 17 (association),
  Article 18 (trade, business, profession), Article 19 (speech and press), Article 19A
  (information, inserted 2010), Article 20 (religion), Article 21 (no special religious tax),
  Article 22(1) (no compelled religious instruction), Article 25 (equality; no sex
  discrimination; Article 25(3) special provision for women and children), Article 25A (free and
  compulsory education ages 5-16, inserted 2010), Article 26 (access to public places),
  Article 27 (non-discrimination in services), Article 28 (language, script, culture).
- Article 51(2): voting at 18 on the electoral roll.
- Article 199(1)(a) and (1)(c): High Court orders on the application of an aggrieved party,
  including enforcement of fundamental rights.
- Article 184(3): Supreme Court may, on a question of public importance involving enforcement of
  a fundamental right, make an order of the nature mentioned in Article 199.

Discrepancies found (see findings F1, F2, F4):

- **Article 9A was inserted by the Twenty-sixth Amendment Act, 2024 (Section 2, in effect
  21 October 2024): "Clean and healthy environment. Every person shall be entitled to a clean,
  healthy and sustainable environment."** It sits in Chapter 1 of Part II between Articles 9 and
  10. The unit's four-category grouping of Articles 8-28 omits it, and its count of
  "twenty-four comprehensive fundamental rights" (`topic-01.mdx:82`) is the pre-2024 count;
  Chapter 1 now contains 25 articles (8, 9, 9A, 10, 10A, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  19A, 20, 21, 22, 23, 24, 25, 25A, 26, 27, 28).
- **Articles 23 (provision as to property) and 24 (protection of property rights) are omitted**
  from the unit's four categories (`topic-01.mdx:84-105`), although the unit's own assessment
  relies on Article 24 (MCQ 10, `unit-assessment.mdx:77`) and the topic text claims to group
  Articles 8 to 28.
- **Article 25(2) no longer reads "on the basis of sex alone".** Footnote 39 records that the
  word "alone" was omitted by the Eighteenth Amendment Act, 2010 (Section 8). The unit's MCQ 4
  answer key (`unit-assessment.mdx:131`) repeats "on the basis of sex alone", which contradicts
  both the current text and the unit's own topic prose (`topic-01.mdx:103`).
- **Article 184(3) was amended by the Twenty-sixth Amendment Act, 2024 (Section 10)** to add a
  proviso: the Supreme Court "shall not make an order or give direction or make a declaration on
  its own or in the nature of suo motu exercise of jurisdiction beyond the contents of any
  application filed under this clause." The unit's phrasing "can take notice of questions of
  public importance" (`topic-01.mdx:52`) is the older, pre-2024 description and does not
  disclose that restriction.
- **Article 17(2)** now refers a proscribed political party to the Federal Constitutional Court
  of Pakistan (Twenty-seventh Amendment Act, 2025, Article 4), not the Supreme Court. The unit
  does not state the forum, so it is not wrong, but the sources note's blanket currency claim
  is overbroad.
- **Article 10, Explanation-I** now reads "Chief Justice of [Supreme Court of] Pakistan"
  (Twenty-seventh Amendment Act, 2025, Article 3). The unit does not quote this passage.
- The Twenty-seventh Amendment Act, 2025 also created the Federal Constitutional Court
  (Articles 175B-175L) and omitted or substituted several judicature provisions. None of the
  unit's cited rights or duties is changed, but `sources/unit-03.md:18` states that subsequent
  amendments "do not alter these substantive fundamental rights and duties", which is false for
  Article 9A and for Article 17(2).

Verification status: **fail** (currency of Articles 8-28 and the sources-note claim).

## 2. dean-2005-citizenship

Citation: Dean, B. L. (2005). Citizenship education in Pakistani schools: Problems and
possibilities. *International Journal of Citizenship and Teacher Education, 1*(2), 35-55.
Bound note: `specs/content/gcce-400/sources/texts/dean-2005-citizenship.md` (verified summary,
consulted 2026-11-22; green OA, OpenAlex W137269803).

Usage: `topic-01.mdx:49` (civic education has taught constitutional provisions as dry memorised
clauses), `topic-01.mdx:107` (teachers connecting civic education to daily life), `topic-02.mdx:87`
(schools failing to teach active civic responsibilities produce passive adults).

Verification: the bound summary supports the claims as used. The unit presents them as one
scholar's findings, not as settled fact. Page range 35-55 is the content-spec's; the first page is
confirmed by OpenAlex. Status: **pass**.

## 3. ahmad-2004-cice

Citation: Ahmad, I. (2004). Islam, democracy and citizenship education: An examination of the
social studies curriculum in Pakistan. *Current Issues in Comparative Education, 7*(1).
Bound note: `specs/content/gcce-400/sources/texts/ahmad-2004-cice.md` (consulted 2026-11-22;
diamond OA, OpenAlex W77321979).

Usage: `topic-01.mdx:57` (citizens must recognise fundamental rights as constitutional
guarantees, not gifts from officials), `topic-01.mdx:107`, `topic-02.mdx:87` (democratic
citizenship requires mutual tolerance, civic engagement, community solidarity).

Verification: the bound note supports the narrow claims used. Status: **pass**.

## 4. glencoe-civics-today

Citation: Glencoe/McGraw-Hill. (n.d.). *Civics today: Citizenship, economics, and you*
(editions 2002 onward). Open Library OL14995602W.
Bound note: none (declared under `## Unverifiable sources`, `sources/unit-03.md:14`).

Usage: `topic-01.mdx:43` ("Standard introductory texts such as *Civics Today* explain that
liberty does not mean the absence of all law..."), `topic-02.mdx:45` ("In standard civics
textbooks such as *Civics Today*, legal duties are distinguished from voluntary civic acts...").

Verification: print only, edition not named; only the Open Library record and title were checked.
The declaration is honest about what was checked and claims no page or wording. The owner's
corpus-wide authorisation to proceed on an unretrievable source is `D-2026-0001`. The declaration
does not name that decision, and the unit does attribute a specific explanation to the book
rather than presenting the idea as general civics knowledge. Advisory only; see finding F7.

Verification status: **pass as a declared unverifiable source** (declaration conforms in
substance to D-2026-0001), with an advisory note.
