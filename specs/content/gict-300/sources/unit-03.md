# Sources consulted - GICT-300 Unit 3 (Operating System Concepts)

Per `specs/007-content-depth-standard/contracts/sources-consulted.md`. Every key cited in
`specs/content/gict-300/coverage/unit-03.md` appears here, and every key here is cited both in
prose and in a per-topic `## Further reading` section.

Verified 2026-09-23 against the course guide (`Scheme-and-Course-guides/extracted-text/1st
2026.txt`, lines 374-538, the GICT-300 block) and the content-spec reading list
(`specs/content/gict-300/content-spec.md`, `## Reading list`). Registry verification was
performed through Crossref DOI resolution and OpenAlex on 2026-09-23, satisfying the course's
declared open-access floor of 2 per unit (D-2026-0030).

## Registry-verified open-access sources

| Key | Citation | URL/DOI | Supports | Kind |
|---|---|---|---|---|
| ostep | Arpaci-Dusseau, R. H., & Arpaci-Dusseau, A. C. (2023). Operating Systems: Three Easy Pieces (version 1.10). | https://pages.cs.wisc.edu/~remzi/OSTEP/ | time sharing and virtualisation (U3-01); the process abstraction and its states (U3-04); the I/O-blocked state (U3-05); scheduling as the kernel's policy work (U3-06) | open-access-substitute, OpenAlex-verified 2026-09-23 (OpenAlex W2412976325); bound excerpt in sources/texts/ostep.md |
| bourgeois2019 | Bourgeois, D. T., Smith, J. L., Wang, S., & Mortati, J. (2019). Information Systems for Business and Beyond (2nd ed.). Saylor Foundation / Open Textbook Library. | https://open.umn.edu/opentextbooks/textbooks/information-systems-for-business-and-beyond | the OS's three-part job (U3-01); OS types with examples (U3-02); the file taxonomy behind file management (U3-03); device traffic framing (U3-05) | open-access-substitute, OpenAlex-verified 2026-09-23 (OpenAlex W2561598203); bound excerpt in sources/texts/bourgeois2019.md |

## Guide-required sources (title-level per D-2026-0001)

| Key | Citation | URL/DOI | Supports | Kind |
|---|---|---|---|---|
| norton | Norton, P. Introduction to Computers. McGraw-Hill Education. | (print) | OS types account (U3-02) | guide-required |
| shellyVermaat | Shelly, G. B., & Vermaat, M. E. Discovering Computers. Cengage Learning. | (print) | file management account (U3-03); kernel framing (U3-06) | guide-required |

## Unverifiable sources

Bound excerpts could not be committed for these keys. Recorded here so `check:depth-gate`
and any G3 reviewer see the limitation explicitly rather than inferring it from silence.

- norton: print-only monograph (McGraw-Hill), no open-access text retrievable by this host.
  The unit's use is at the level of the standard OS-types account, which the bound
  bourgeois2019 excerpt independently carries. Could not be retrieved on 2026-09-23. Owner
  ruling (D-2026-0001): flag and proceed.
- shellyVermaat: print-only monograph (Cengage), no open-access text retrievable by this
  host. The unit's use is at the level of the standard file-management and kernel accounts,
  which the bound ostep and bourgeois2019 excerpts independently carry. Could not be
  retrieved on 2026-09-23. Owner ruling (D-2026-0001): flag and proceed.
