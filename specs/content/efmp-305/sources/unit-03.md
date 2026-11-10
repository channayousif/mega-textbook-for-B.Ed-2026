# Sources consulted - EFMP-305 Unit 3 (Inclusive Teaching Strategies)

Per `specs/007-content-depth-standard/contracts/sources-consulted.md`. Every key cited in
`specs/content/efmp-305/coverage/unit-03.md` appears here, and every key here is cited both in
prose and in a per-topic `## Further reading` section.

The course guide carries **no** "Text Books and References" section, so no source for this unit
is `guide-required`. Under `D-2026-0053` item 2 the author binds verified real works chosen for
relevance to the course outcomes, labelled author-selected. The content-spec front matter
declares `open_access_floor:` / `default: 1`; **two** registry-verified open-access rows are
bound below.

**Registry verification actually performed.** Each DOI-bearing row was resolved against the
**Crossref REST API on 2026-10-15** from this authoring host, and the returned title, journal,
volume, issue, pages, year, author surnames and licence URL were compared field by field with the
citation recorded here. That initial check was a *metadata and licence* verification. No other
registry (OpenAlex, ERIC, DOAJ) was queried and none is claimed. On 2026-11-03 the full texts of
`subandiyah2025`, `serman2026` and `cast2024` were retrieved, read and bound (see "Full-text
verification, 2026-11-03" below). The two subscription works (`vernon2020` and `florian2014`)
remain metadata-only (see "Unverifiable sources" below).

## Author-selected bindings, open access, Crossref-verified

| Key | Citation | URL/DOI | Supports | Kind |
|---|---|---|---|---|
| subandiyah2025 | Subandiyah, H., Nasrullah, R., Ramadhan, R., Supratno, H., Raharjo, R. P., & Lukman, F. (2025). The impact of differentiated instruction on student engagement and achievement in Indonesian language learning. *Cogent Education, 12*(1). | https://doi.org/10.1080/2331186X.2025.2516378 | U3-1 (that differentiation changes engagement as well as attainment), U3-2 (differentiating content, process and product in a real school system) | author-selected; open access, CC BY 4.0; Crossref-verified (metadata and licence) 2026-10-15; full text read 2026-11-03, excerpt bound at `sources/texts/subandiyah2025.md` |
| serman2026 | Serman, S., & Ningrum, E. S. C. (2026). Cooperative learning in inclusive classrooms: Improving slow learners' fraction addition achievement. *Journal of Innovation and Research in Primary Education, 5*(3), 5273-5281. | https://doi.org/10.56916/jirpe.v5i3.3993 | U3-3 (cooperative structures used with pupils who are behind, in an ordinary primary classroom) | author-selected; open access, CC BY-SA 4.0; Crossref-verified (metadata and licence) 2026-10-15; full text read 2026-11-03, excerpt bound at `sources/texts/serman2026.md` |

## Author-selected bindings, Crossref-verified, not open access

| Key | Citation | URL/DOI | Supports | Kind |
|---|---|---|---|---|
| vernon2020 | Vernon, D. S., Schumaker, J. B., & Deshler, D. D. (2020). The social and academic effects of cooperative LEARN strategy instruction in inclusive elementary classrooms. *Learning Disability Quarterly, 45*(3), 185-198. | https://doi.org/10.1177/0731948720944164 | U3-3 (that a taught cooperative structure, not merely seating pupils together, is what produces the social and academic effect) | author-selected; Crossref-verified (metadata) 2026-10-15; subscription journal, full text not retrieved |
| florian2014 | Florian, L. (2014). What counts as evidence of inclusive education? *European Journal of Special Needs Education, 29*(3), 286-294. | https://doi.org/10.1080/08856257.2014.933551 | U3-1 (what evidence shows a strategy is genuinely inclusive rather than merely busy), U3-4 (what evidence an assessment adaptation should produce) | author-selected; shared with Unit 2, where the same record is bound; Crossref-verified 2026-10-15 |

## Author-selected binding, open access but not registry-indexed

| Key | Citation | URL/DOI | Supports | Kind |
|---|---|---|---|---|
| cast2024 | CAST. (2024). *Universal Design for Learning guidelines* (version 3.0). CAST. | https://udlguidelines.cast.org | U3-1, U3-2 (the three "multiple means" as a planning vocabulary), U3-5 (designing for the range from the start rather than retrofitting) | author-selected; open-access framework document, no DOI, so no registry lookup is possible and none is claimed; version 3.0 is the current release named in the content spec as `cast2024`; page retrieved 2026-11-03 and hashed, excerpt bound at `sources/texts/cast2024.md` |

## Full-text verification, 2026-11-03

Added in the G3 repair pass for report
`reviews/unit-03/G3/20261102T212207Z-g3-desk-d26592ad.json` (finding: no full text retrieved).
Three of the five sources were retrieved from this host and now have bound excerpts under
`specs/content/efmp-305/sources/texts/`. Each excerpt file records the retrieval route, the date
and what the text does and does not support.

- `subandiyah2025` (`texts/subandiyah2025.md`): the full text confirms DI lessons in Indonesian
  language classes at three junior high schools, with gains in learning behaviour and post-test
  achievement and no attendance effect. The prose's scope cautions match the study. The study
  varies grouping, task difficulty and products, but does not itself use the content / process /
  product vocabulary.
- `serman2026` (`texts/serman2026.md`): the full text confirms a STAD cooperative structure in an
  inclusive Grade 6 classroom, 26 pupils including six slow learners, with fraction-addition
  mastery rising across two action-research cycles. Peer tutoring was the weakest observed
  behaviour, so the study supports the peer-mediated structure more firmly than peer
  explanation as the mechanism. Topic 3.2 reflects this distinction and formats the authors as
  Serman, S., & Ningrum, E. S. C.
- `cast2024` (`texts/cast2024.md`): the version 3.0 page names the three principles as multiple
  means of engagement, representation, and action and expression, as the unit uses them.

## Unverifiable sources

The two subscription sources below remain **unverifiable** in the sense the depth gate means:
the bibliographic record has been checked against Crossref, but **no full text was retrieved
from this authoring host** and no excerpt is bound under `specs/content/efmp-305/sources/texts/`.
Support is title-and-bibliographic level only, per `D-2026-0001`; a reviewer must verify each
specific claim against the source text.

- `vernon2020`: supports U3-3. Subscription journal. The stronger methodological source for the
  claim that the *structure* is what works; it should be retrieved before the prose leans harder.
- `florian2014`: supports U3-1, U3-4. Subscription journal; same record as Unit 2's.

## Verification still owed at G2

- Done 2026-11-03: `subandiyah2025`, `serman2026` and `cast2024` retrieved and bound (see
  above). Still owed: `vernon2020` and `florian2014`, both subscription journals.
- The unit makes no claim about effect sizes, and must not acquire one before the underlying
  texts are read. Where the prose needs a general statement about what differentiation or
  cooperative learning achieves, it is written as what the cited study found in its own setting.
