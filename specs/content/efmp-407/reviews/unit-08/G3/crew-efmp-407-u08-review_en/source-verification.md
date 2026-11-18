# EFMP-407 Unit 8 - G3 source verification

Reviewer: agent:opencode-g3-reviewer. Date: 2026-11-07.

Method
------
Read every bound excerpt under `specs/content/efmp-407/sources/texts/` that Unit 8 cites, then
attempted to verify the citation and the specific claims against the live source. The bound digests
include `jumani-abbasi-2015.md` and `sindh-rte-act-2013.md`; `wals-2024-whole-school.md` was read
directly from the repository (the citation-key extractor does not bind keys with a hyphenated
suffix after the year). The Tilbury and Wortman (2004) text is not retrievable and is declared
under `## Unverifiable sources`. URLs were fetched with curl; the open-access PDFs were downloaded
and searched with `pdftotext`.

Verified sources
----------------
- **sindh-rte-act-2013** - Section 16 of the Act matches the unit's claims. The cited URL
  (`pas.gov.pk/uploads/acts/SN-Act-No.XIV-of-2013.pdf`) now returns HTTP 404, but an official copy
  at `sja.gos.pk/assets/Updated_Laws/...` carries the same text. The Act says "Every school shall
  constitute a school management committee with the equal representation from Government, teachers,
  parents of children admitted and management of the schools ... headed by the Principal or Head of
  an Institution ... nine members"; it meets at least three times a year; it monitors the general
  working of the school, ensures norms and standards, ensures the government education policy is
  implemented, prepares and recommends the School Improvement Plan, monitors the utilization of
  aids and grants, and ensures attendance. The unit's prose and MCQ keys are substantially
  supported. See F3 for the dead URL and the selective omission of the Act's clause (c).
- **wals-2024-whole-school** - The book is real (Springer, 2024, CC BY 4.0; the DOI resolves to the
  publisher). The open-access PDF was downloaded and searched. The unit's four WSA dimensions
  (curriculum and pedagogy, campus operations, school ethos and culture, community links) are a
  simplification of the book's own list (curriculum integration, pedagogical and didactical
  arrangements, professional development of staff, school-community relations, schools' own
  sustainability practices, school ethos, monitoring/evaluation/assessment, organization and
  leadership), but the concepts are present and the unit's paraphrases are fair. See F2: the bound
  excerpt's four passages are presented in quotation marks but are not verbatim from the book.
- **tilbury-wortman-2004** - The course guide's URL (`portals.iucn.org/library/node/8327`) returns
  HTTP 200 but resolves to an unrelated IUCN record: "Elaboration et mise en oeuvre d'un plan de
  gestion integreire : la reserve de biosphere du delta du Saloum, Senegal". The declaration under
  `## Unverifiable sources` is honest and complete about the retrieval attempt, the date and the
  owner authorisation (`D-2026-0001`). The unit's claims rest on title-level support. See F4.

Defective citation
------------------
- **jumani-abbasi-2015** - The bound excerpt's second passage is presented as a verbatim quote:

  > "Teacher education programmes in Pakistan must shift from transmissive lectures to
  > participatory, action-oriented pedagogies. Prospective teachers need practical competencies to
  > design, organize, and guide school-based sustainability projects that address immediate local
  > environmental challenges such as clean water provision, tree plantation, and waste reduction.
  > Practical projects bridge the gap between abstract policy goals and school reality."

  The publisher's abstract does not contain this passage, and the full paper does not either. The
  article PDF was fetched from the publisher's text-mining link
  (`revistas.pucsp.br/index.php/risus/article/viewFile/23447/16845`, 7 pages) and searched for
  "transmissive", "participatory", "action-oriented", "practical competencies", "clean water",
  "tree plantation", "waste reduction", "bridge the gap", "school reality" and "project": none is
  present. The paper is a future-tense case study of an Associate Degree in Education program at a
  government elementary college of education in Pakistan; it reports teacher educators' knowledge,
  skills, attitudes and perceptions of education for sustainability. The bound source file's own
  first section says only "> This study will investigate" is verbatim and that the full paper "does
  not support a claim of completed national findings". The second passage is therefore a
  fabrication or a misattribution, and the unit's claims that rest on it are unsupported. See F1.

Claims not carried by the bound passage
----------------------------------------
- `docs/semester-3/efmp-407/unit-08/topic-01.mdx:57` attributes to Jumani and Abbasi (2015) the
  claim that teacher education in Pakistan "must bridge the gap between abstract policy rhetoric
  and practical school implementation" and that "equipping prospective teachers with concrete
  project-planning skills ensures that environmental education moves from memorization to tangible
  community transformation". The paper contains neither claim. See F1.
- `docs/semester-3/efmp-407/unit-08/topic-01.mdx:78` attributes to Jumani and Abbasi (2015) the
  claim that "effective sustainability projects thrive on low-cost, local resources". The paper
  does not discuss low-cost resources or school sustainability projects. See F1.
- `docs/semester-3/efmp-407/unit-08/topic-02.mdx:61` says Tilbury and Wortman (2004) "demonstrate
  that lasting sustainability occurs only when participation reaches active collaboration". The
  source is unretrievable and the declaration supports title-level claims only; a demonstration of
  a causal relationship is more than the declaration supports. See F4.
- `docs/semester-3/efmp-407/unit-08/topic-02.mdx:75` attributes a four-part reporting taxonomy to
  Wals et al. (2024), including "Community mobilization: Inspiring neighbouring schools, homes, and
  businesses to adopt similar sustainability practices". The bound Wals excerpt supports
  transparency, pedagogical validation and evidence-based improvement, but not community
  mobilization. The book's reporting discussion is about transparency, accountability and lessons
  learned. See F5.

Attribution notes
-----------------
- The six-stage project cycle in `topic-01.mdx:48-55` and `fig-U8-1` is an author elaboration. The
  bound Wals excerpt lists five phases ("identifying local needs, participatory planning,
  collaborative action, ongoing monitoring, and public reporting and reflection"); the unit splits
  "public reporting and reflection" into "report outcomes" and "reflect and improve". The prose does
  not attribute the six stages to Wals, but `specs/content/efmp-407/coverage/unit-08.md` maps U8-01
  to Wals for "project cycle". See F6.
- `topic-02.mdx:47` says the SMC has "equal representation drawn from teachers, parents of enrolled
  children, local government officials, and school management". The Act says "equal representation
  from Government, teachers, parents of children admitted and management of the schools". The unit
  narrows "Government" to "local government officials". Minor.
- `topic-02.mdx:44` says "every government school is legally required to establish a School
  Management Committee". The Act says "Every school shall constitute a school management
  committee". The unit narrows "every school" to "every government school". Minor.

Limitations
-----------
- The Springer book page returned a client challenge to the review host's webfetch; the PDF was
  obtained from the publisher's open-access content URL and searched instead.
- The Sindh Act's cited URL is dead; the official `sja.gos.pk` copy was used for verification.
- The Tilbury and Wortman (2004) text could not be retrieved; the declaration under
  `## Unverifiable sources` was judged honest and complete.
