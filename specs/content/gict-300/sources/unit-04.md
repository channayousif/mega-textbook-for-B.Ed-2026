# Sources consulted - GICT-300 Unit 4 (Cyber security and Data Protection)

Per `specs/007-content-depth-standard/contracts/sources-consulted.md`. Every key cited in
`specs/content/gict-300/coverage/unit-04.md` appears here, and every key here is cited both in
prose and in a per-topic `## Further reading` section.

Verified 2026-09-23 against the course guide (`Scheme-and-Course-guides/extracted-text/1st
2026.txt`, lines 374-538, the GICT-300 block) and the content-spec reading list
(`specs/content/gict-300/content-spec.md`, `## Reading list`). Registry verification was
performed through Crossref DOI resolution and OpenAlex on 2026-09-23, satisfying the course's
declared open-access floor of 2 per unit (D-2026-0030).

## Registry-verified open-access sources

| Key | Citation | URL/DOI | Supports | Kind |
|---|---|---|---|---|
| nistCloud2011 | Mell, P., & Grance, T. (2011). The NIST Definition of Cloud Computing (SP 800-145). NIST. | https://doi.org/10.6028/NIST.SP.800-145 | the cloud definition and its five characteristics (U4-05) | open-access-substitute, Crossref-verified 2026-09-23; bound excerpt in sources/texts/nistCloud2011.md |
| erendorYildirim2022 | Erendor, M. E., & Yildirim, M. (2022). Cybersecurity awareness in online education: A case study analysis. IEEE Access, 10, 52319-52335. | https://doi.org/10.1109/ACCESS.2022.3171829 | weak awareness despite heavy technology use; education measurably matters (U4-01 framing) | open-access-substitute, Crossref-verified 2026-09-23; bound excerpt in sources/texts/erendorYildirim2022.md |
| bourgeois2019 | Bourgeois, D. T., Smith, J. L., Wang, S., & Mortati, J. (2019). Information Systems for Business and Beyond (2nd ed.). Saylor Foundation / Open Textbook Library. | https://open.umn.edu/opentextbooks/textbooks/information-systems-for-business-and-beyond | the CIA triad, password guidance, threat families (U4-01, U4-02); footprint framing (U4-03); password guidance (U4-04); data protection framing (U4-06) | open-access-substitute, OpenAlex-verified 2026-09-23 (OpenAlex W2561598203); bound excerpt in sources/texts/bourgeois2019.md |

## Other open-access sources

| Key | Citation | URL/DOI | Supports | Kind |
|---|---|---|---|---|
| ncaStaysafe | National Cybersecurity Alliance. Stay Safe Online. | https://staysafeonline.org/ | everyday cyber-hygiene habits (U4-02, U4-03, U4-04) | open-access-substitute |
| ncsp2021 | Ministry of Information Technology and Telecommunication. (2021). National Cyber Security Policy. Government of Pakistan. | https://moitt.gov.pk/ | Pakistan's policy context; PECA 2016 backdrop (U4-02, U4-06) | open-access-substitute |

## Guide-required sources (title-level per D-2026-0001)

| Key | Citation | URL/DOI | Supports | Kind |
|---|---|---|---|---|
| laudonLaudon | Laudon, K. C., & Laudon, J. P. Management Information Systems. Pearson. | (print) | footprint and privacy framing (U4-03) | guide-required |
| stairReynolds | Stair, R., & Reynolds, G. Principles of Information Systems. Cengage Learning. | (print) | data protection framing (U4-06) | guide-required |

## Unverifiable sources

Bound excerpts could not be committed for these keys. Recorded here so `check:depth-gate`
and any G3 reviewer see the limitation explicitly rather than inferring it from silence.

- ncaStaysafe: the site was fetched and verified to exist on 2026-09-23 (organisation,
  mission and resource areas read directly), but its guidance pages are individually
  JavaScript-heavy and no single page's text was bound; the habits it supports are the same
  habits the bound bourgeois2019 chapter 6 excerpt independently carries. Owner ruling
  (D-2026-0001): flag and proceed.
- ncsp2021: the policy document is real and widely reported (approved by the Federal
  Cabinet on 2021-07-27; corroborated through a web search on 2026-09-23), but the
  moitt.gov.pk PDF text could not be retrieved by this host; the unit's use is at the level
  of the policy's named priorities, which the search corroboration supports. Could not be
  retrieved on 2026-09-23. Owner ruling (D-2026-0001): flag and proceed.
- laudonLaudon: print-only monograph (Pearson), no open-access text retrievable by this
  host. The unit's use is at the level of the standard privacy-and-footprint framing,
  which the bound bourgeois2019 excerpt independently carries. Could not be retrieved on
  2026-09-23. Owner ruling (D-2026-0001): flag and proceed.
- stairReynolds: print-only monograph (Cengage), no open-access text retrievable by this
  host. The unit's use is at the level of the standard data-protection framing, which the
  bound bourgeois2019 excerpt independently carries. Could not be retrieved on 2026-09-23.
  Owner ruling (D-2026-0001): flag and proceed.
