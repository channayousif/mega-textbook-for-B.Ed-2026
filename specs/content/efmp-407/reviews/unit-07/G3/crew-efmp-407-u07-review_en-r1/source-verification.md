# EFMP-407 Unit 7 - source verification (attempt r1)

Reviewer: agent:opencode-g3-reviewer. Date: 2026-11-07.

## Method

The three sources the unit actually uses are bound with short verbatim passages at
`specs/content/efmp-407/sources/texts/`. Each bound passage was read, then the source text was
checked against the unit's claims. Retrieval is recorded here; it is not itself verification.

## nep-2009 (National Education Policy 2009)

Bound passage: "Environmental education shall be made an integral part of education." Bound locator:
Section 6.1, policy actions.

The official NEP 2009 PDF linked in the unit's Further reading
(`https://www.mofept.gov.pk/SiteImage/Policy/NEP_2009.pdf`) is also present in the repository at
`specs/content/licence/sources/nep-2009-national-education-policy-pakistan.pdf` (73 PDF pages).
It was extracted with `pdftotext` and checked directly. The sentence is real and reads exactly as
bound. It is policy action 5 under the heading `6.2 CURRICULUM REFORM`, on printed page 36
(PDF page 46). Section 6.1 is `IMPROVING TEACHER QUALITY` and does not contain the sentence.

The unit's claim that the policy "includes environmental learning within schooling" is supported by
the sentence. The unit's claim that "its curriculum discussion also addresses rights and safety" is
supported by policy actions 4 (fundamental rights), 9 (Human Rights Education, School Safety and
Disaster and Risk Management) and 10 (School Health Education and School Safety) in the same
section.

Defect. The unit and its source file cite "section 6.1, policy actions". The passage is in section
6.2. The unit teaches learners to "record the document title and section so another reader can check
your interpretation" (topic-01), so a wrong section sends a checking reader to the wrong place.
Repair: change the locator to Section 6.2 (Curriculum Reform), policy action 5, in
`docs/semester-3/efmp-407/unit-07/topic-01.mdx` (prose and Further reading) and in
`specs/content/efmp-407/sources/unit-07.md` and `sources/texts/nep-2009.md`.

## jumani-abbasi-2015

Bound passage: "This study will investigate". Bound note: the abstract calls for deliberate
integration of sustainability into teacher preparation and describes intended investigation
methods.

Live source retrieved 2026-11-07 from the publisher record
(`https://revistas.pucsp.br/index.php/risus/article/view/23447`). The abstract reads: "education for
sustainability should be carefully planned and made as integral part of teacher education programs
instead of ad hoc based approach... This study will investigate how Associate Degree for education
teacher training program for prospective teachers has been designed or shaped... A case study
approach will be used... Data will be collected through surveys, in-depth interviews and analysis of
over five years documents."

The unit's claim that the abstract "sets out a proposed investigation involving teacher educators
and teacher education programmes" and "should not be cited as a completed national survey or a
measured success rate" is supported. The future-tense design is exactly as the unit describes.

## hopkins-mckeown-2005

Bound passage: "Changes within institutions of higher education". Bound note: the overview places
institutional change alongside ministerial involvement, local involvement, resources and
partnerships.

Live source retrieved 2026-11-07 from the University of Edinburgh open PDF mirror linked in the
unit's Further reading. The recommendations overview lists: 1. Ministerial and national level
involvement; 2. Community and regional/provincial involvement; 3. Changes within institutions of
higher education; 4. Funding and other resources; 5. Partnerships; 6. Research; 7. Communications;
8. Information Technology Opportunities.

The unit's claim that the guidance "addresses reorienting teacher education through changes within
institutions and links with communities and wider systems" is supported. The unit's qualification
that international recommendations are not proof of Pakistani adoption is appropriate.

## gop-national-sdg-framework (mapped reading, not used)

The approved content-spec maps this reading and records it as unretrievable under `D-2026-0001`.
`specs/content/efmp-407/sources/unit-07.md` discloses under `## Access and interpretation notes`
that the framework "remains unavailable as already recorded in the approved content-spec and
D-2026-0001" and that "no new claim depends on its inaccessible text". The unit prose uses it only
as prior learning from Unit 3, and the teacher notes instruct learners not to assign unverified
quotations, dates or targets to it.

Advisory. The declaration is honest in substance but does not use the rubric's
`## Unverifiable sources` heading, and the unit file itself does not restate the retrieval attempts
and date (it points to the content-spec). Adding the heading with the attempts, date and
`D-2026-0001` would make the exception machine-readable and match the G3 reference exactly.

## Result

Two of three used sources are fully verified. The third (nep-2009) is real and supports the claim,
but its cited section locator is wrong. The mapped-but-unused framework is disclosed but not under
the rubric's heading. The `sources` criterion fails on the locator defect; the framework declaration
is an advisory format gap.
