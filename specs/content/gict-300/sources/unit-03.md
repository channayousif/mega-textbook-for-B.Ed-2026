# Sources consulted - GICT-300 Unit 3 (Operating System Concepts)

Per `specs/007-content-depth-standard/contracts/sources-consulted.md`. Every key cited in
`specs/content/gict-300/coverage/unit-03.md` appears here; every key here appears in a per-topic
`## Further reading` section, and, where marked, in prose.

Verified 2026-09-23 against the course guide (`Scheme-and-Course-guides/extracted-text/1st
2026.txt`, lines 374-538, the GICT-300 block) and the content-spec reading list
(`specs/content/gict-300/content-spec.md`, `## Reading list`). Registry verification was
performed through Crossref DOI resolution and OpenAlex on 2026-09-23, satisfying the course's
declared open-access floor of 2 per unit (D-2026-0030).

## Registry-verified open-access sources

| Key | Citation | URL/DOI | Supports | Kind |
|---|---|---|---|---|
| ostep | Arpaci-Dusseau, R. H., & Arpaci-Dusseau, A. C. (2023). Operating Systems: Three Easy Pieces (version 1.10). | https://pages.cs.wisc.edu/~remzi/OSTEP/ | time sharing and virtualisation (U3-01); the file abstraction, naming and directory trees (U3-03); the process abstraction and its states (U3-04); the device interface and the device driver's translation role (U3-05); the scheduling-policy framing of the kernel's work (U3-06) | open-access-substitute, OpenAlex-verified 2026-09-23 (OpenAlex W2412976325); bound excerpt in sources/texts/ostep.md (chapters 4, 36 and 39) |
| bourgeois2019 | Bourgeois, D. T., Smith, J. L., Wang, S., & Mortati, J. (2019). Information Systems for Business and Beyond (2nd ed.). Saylor Foundation / Open Textbook Library. | https://open.umn.edu/opentextbooks/textbooks/information-systems-for-business-and-beyond | the OS's three-part job and named operating systems (U3-01, U3-02) | open-access-substitute, OpenAlex-verified 2026-09-23 (OpenAlex W2561598203); bound excerpt in sources/texts/bourgeois2019.md |

## Guide-required sources (title-level per D-2026-0001)

| Key | Citation | URL/DOI | Supports | Kind |
|---|---|---|---|---|
| norton | Norton, P. Introduction to Computers. McGraw-Hill Education. | (print) | the OS-types account (U3-02); process-account framing (U3-04) | guide-required |
| shellyVermaat | Shelly, G. B., & Vermaat, M. E. Discovering Computers. Cengage Learning. | (print) | the file-management account's framing (U3-03); the buffer and spooling account (U3-05); the kernel-layers and system-calls account (U3-06) | guide-required |

## Unverifiable sources

Bound excerpts could not be committed for these keys. Recorded here so `check:depth-gate`
and any G3 reviewer see the limitation explicitly rather than inferring it from silence.

- norton: print-only monograph (McGraw-Hill), no open-access text retrievable by this host.
  The OS-types account (batch, time-sharing, real-time, distributed, mobile) rests on the
  guide's own outline plus this monograph at title level; no bound excerpt carries the
  five-type taxonomy, so a reviewer should treat that account as standard-textbook material
  disclosed here rather than excerpt-verified. Could not be retrieved on 2026-09-23. Owner
  ruling (D-2026-0001): flag and proceed.
- shellyVermaat: print-only monograph (Cengage), no open-access text retrievable by this
  host. The file-management framing (U3-03) is corroborated by the bound ostep chapter 39
  excerpt; the buffer and spooling account (U3-05) rests on this monograph at title level
  only - no bound excerpt carries those two terms, so a reviewer should treat them as
  standard-textbook material disclosed here; the kernel-layers and system-calls account
  (U3-06) likewise rests on the guide's outline plus this monograph at title level - the
  bound ostep excerpt carries the scheduling and driver-supervision parts of that account
  but not the four-layers taxonomy or the Linux-as-kernel naming. Could not be retrieved
  on 2026-09-23. Owner ruling (D-2026-0001): flag and proceed.
