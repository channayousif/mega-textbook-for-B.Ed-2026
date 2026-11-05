# Sources consulted - EFMP-406 Unit 3 (Literacy, Language, and Society)

Per `specs/007-content-depth-standard/contracts/sources-consulted.md`. Every key cited in
`specs/content/efmp-406/coverage/unit-03.md` appears here, and every key here is cited both in
prose and in a per-topic `## Further reading` section.

Verified 2026-10-31 against the course guide (`Scheme-and-Course-guides/extracted-text/3rd 2026.txt`, Unit 3 outline lines 259-263) and the approved content-spec reading list (`specs/content/efmp-406/content-spec.md`, `## Reading list`).

The content-spec sets a binding floor of at least one verifiable open-access source for this unit (`open_access_floor` in front matter; `default: 1`, enforced by `scripts/check-source-floor.mjs`). Three verified open-access sources are bound below. Each key has a bound excerpt at `sources/texts/<key>.md`.

## Open-access bindings

| Key | Citation | URL/DOI | Supports | Kind |
|---|---|---|---|---|
| papen-2023-nls | Papen, U. (2023). The (New) Literacy Studies: The evolving concept of literacy as social practice and its relevance for work with deaf students. *Cultura & Psyché*, 4(1), 67-84. CC BY 4.0. | https://doi.org/10.1007/s43638-023-00067-1 | U3-01, U3-02 | open access (Cultura & Psyché), OpenAlex-verified 2026-10-31 |
| ashraf-2021-multilingual | Ashraf, M. A., Turner, D. A., & Laar, R. A. (2021). Multilingual language practices in education in Pakistan: The conflict between policy and practice. *SAGE Open*, 11(1). CC BY 4.0. | https://doi.org/10.1177/21582440211004140 | U3-03, U3-04 | open access (SAGE Open), OpenAlex-verified 2026-10-31 |
| pak-constitution-1973 | Government of Pakistan, National Assembly. (2012). *The Constitution of the Islamic Republic of Pakistan* (as modified up to 28 February 2012; original work adopted 1973). | https://na.gov.pk/uploads/documents/1333523681_951.pdf | U3-03 | primary legal text, open access; Article 25A bound in `sources/texts/pak-constitution-1973.md` |

## Source repair note (2026-11-03)

The G3 review `reviews/unit-03/G3/20261102T212207Z-g3-desk-41db593c.json` found that the Unit 3
blocks in the Papen and Ashraf excerpt files were formatted as quotations but were not text from
either article. Both files now hold verbatim passages from fresh retrievals (Papen: publisher PDF,
2026-11-03; Ashraf: publisher full-text HTML, 2026-11-03), and each ends with a "What this source
does not support" section. The topic files were revised to match:

- Papen (2023) supports literacy as social practice, the autonomous and ideological models, links
  to personhood and prejudice, and home-school mismatch (U3-01, U3-02). It does not define
  literacy events against literacy practices, or dominant against vernacular literacies. Topic 3.1
  presents those two distinctions as working terms explained in the textbook's own words. No
  original source for them is bound for this unit; a later revision may bind one.
- Ashraf et al. (2021) is a qualitative interview study (24 school teachers, 2 university
  teachers, 3 policymakers, 2017). It supports the roles of English, Urdu and local languages, the
  policy-practice conflict and teachers' use of local languages and Urdu (U3-03, U3-04). It does
  not test mother-tongue-based education or translanguaging, or measure reading, anxiety or
  dropout. Topic 3.2 states such ideas as qualified positions, not as findings.
- The Article 25A text (U3-03) is quoted from the Constitution. Statements about the purpose of
  schooling for citizenship are marked as the textbook's interpretation. The four dimensions of
  civic literacy are marked as this textbook's teaching framework. The earlier, unsourced Paulo
  Freire attribution was removed.
