# Sources consulted - GICT-300 Unit 6 (Internet Applications and Emerging Technologies)

Per `specs/007-content-depth-standard/contracts/sources-consulted.md`. Every key cited in
`specs/content/gict-300/coverage/unit-06.md` appears here, and every key here is cited both in
prose and in a per-topic `## Further reading` section.

Verified 2026-09-23 against the course guide (`Scheme-and-Course-guides/extracted-text/1st
2026.txt`, lines 374-538, the GICT-300 block) and the content-spec reading list
(`specs/content/gict-300/content-spec.md`, `## Reading list`). Registry verification was
performed through Crossref DOI resolution and OpenAlex on 2026-09-23, satisfying the course's
declared open-access floor of 2 per unit (D-2026-0030).

## Registry-verified open-access sources

| Key | Citation | URL/DOI | Supports | Kind |
|---|---|---|---|---|
| nistBlockchain2018 | Yaga, D., Mell, P., Roby, N., & Scarfone, K. (2018). Blockchain Technology Overview (NIST IR 8202). NIST. | https://doi.org/10.6028/NIST.IR.8202 | the blockchain definition and its tamper-evident ledger property (U6-06) | open-access-substitute, Crossref-verified 2026-09-23; bound excerpt in sources/texts/nistBlockchain2018.md |
| unescoAI2021 | UNESCO. (2021). AI and education: guidance for policy-makers. UNESCO. | https://unesdoc.unesco.org/ark:/48223/pf0000376709 | UNESCO's enhance-not-replace framing rule for AI in education (U6-05) | open-access-substitute, Crossref-verified 2026-09-23 (DOI 10.54675/pcsp7350); bound excerpt in sources/texts/unescoAI2021.md |
| alAnsi2023 | Al-Ansi, A. M., Al-Ansi, A. M., Jaboob, M. S., & Garad, A. (2023). Analyzing augmented reality (AR) and virtual reality (VR) recent development in education. Social Sciences & Humanities Open, 8, 100532. | https://doi.org/10.1016/j.ssaho.2023.100532 | AR/VR engagement gains alongside maturing evidence and investment needs (U6-08) | open-access-substitute, Crossref-verified 2026-09-23; bound excerpt in sources/texts/alAnsi2023.md |
| bourgeois2019 | Bourgeois, D. T., Smith, J. L., Wang, S., & Mortati, J. (2019). Information Systems for Business and Beyond (2nd ed.). Saylor Foundation / Open Textbook Library. | https://open.umn.edu/opentextbooks/textbooks/information-systems-for-business-and-beyond | browsers, DNS and the web journey (U6-01, U6-02); communication tools (U6-03); safe-browsing framing (U6-04); the web-journey context of AI tools (U6-05); the IoT definition, enablers and cautions (U6-07) | open-access-substitute, OpenAlex-verified 2026-09-23 (OpenAlex W2561598203); bound excerpt in sources/texts/bourgeois2019.md |

## Other open-access sources

| Key | Citation | URL/DOI | Supports | Kind |
|---|---|---|---|---|
| khanacademyCIT | Khan Academy. Computers and the Internet (free course developed with Code.org). | https://www.khanacademy.org/computing/computers-and-the-internet | beginner account of the web, browsers and internet communication (U6-01..U6-03) | open-access-substitute |
| ncaStaysafe | National Cybersecurity Alliance. Stay Safe Online. | https://staysafeonline.org/ | safe browsing habits (U6-04) | open-access-substitute |
| ncsp2021 | Ministry of Information Technology and Telecommunication. (2021). National Cyber Security Policy. Government of Pakistan. | https://moitt.gov.pk/ | Pakistan's policy context for safe browsing (U6-04) | open-access-substitute |
| ituIoT2012 | ITU-T. (2012). Recommendation ITU-T Y.2060: Overview of the Internet of things. | https://www.itu.int/rec/T-REC-Y.2060-201206-I | the standard IoT definition (U6-07) | open-access-substitute |

## Guide-required sources (title-level per D-2026-0001)

| Key | Citation | URL/DOI | Supports | Kind |
|---|---|---|---|---|
| stairReynolds | Stair, R., & Reynolds, G. Principles of Information Systems. Cengage Learning. | (print) | emerging-technology framing (U6-08) | guide-required |

## Unverifiable sources

Bound excerpts could not be committed for these keys. Recorded here so `check:depth-gate`
and any G3 reviewer see the limitation explicitly rather than inferring it from silence.

- khanacademyCIT: as declared in unit-01; the course pages are JavaScript-rendered and
  could not be fetched as text on 2026-09-23; corroborated through a web search of Khan
  Academy's catalogue. The web-journey and communication content it supports is the same
  content the bound bourgeois2019 chapter 5 excerpt independently carries. Owner ruling
  (D-2026-0001): flag and proceed.
- ncaStaysafe: as declared in unit-04; the site was verified to exist on 2026-09-23 but
  its guidance pages are JavaScript-heavy and could not be bound as text; the safe-browsing
  habits it supports are carried by the bound bourgeois2019 chapter 6 excerpt. Owner ruling
  (D-2026-0001): flag and proceed.
- ncsp2021: as declared in unit-04; the policy document is real and widely reported but the
  moitt.gov.pk PDF text could not be retrieved by this host; the unit's use is at the level
  of the policy's named priorities. Owner ruling (D-2026-0001): flag and proceed.
- ituIoT2012: the recommendation page was fetched and its title, approval date (June
  2012) and in-force status were read directly on 2026-09-23, but the recommendation
  PDF's full text was not bound; the IoT definition it supports is carried verbatim by
  the bound bourgeois2019 chapter 13 excerpt. Owner ruling (D-2026-0001): flag and
  proceed.
- stairReynolds: print-only monograph (Cengage), no open-access text retrievable by this
  host. The unit's use is at the level of the standard emerging-technology framing. Could
  not be retrieved on 2026-09-23. Owner ruling (D-2026-0001): flag and proceed.
