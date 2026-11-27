# EFMP-408 Unit 6 G3 r2 - source verification

Cycle 1 (`crew-efmp-408-u06-review_en-r1.json`) recorded four source findings: S-1 undeclared
missing sources, S-2 an unverifiable TIMSS 2019 claim, S-3 HEC citations for content absent
from the bound guide, and S-4 the TIMSS claim repeated in a figure. Each was re-checked
against the current files.

## S-1 undeclared missing sources - RESOLVED

`specs/content/efmp-408/sources/unit-06.md:12` now carries a `no-external-source` row naming
the Pakistani testing bodies (NTS 2002, NEAS Grades 4 and 8, STEDA and the Sindh Teaching
Licence, FPSC CBT, SEF and PEAC), the international programmes (CIE O/A Levels, IB), the
computer-adaptive testing mechanism and the academic integrity classifications, with
`Supports` = U6-01, U6-03, U6-05, U6-06, U6-08, U6-10. `specs/content/efmp-408/coverage/unit-06.md`
grounds `no-external-source` in exactly those six sub-topics, and `check:depth-gate` exit 0
includes the coverage-to-sources scope agreement. `specs/gaps.md:3588-3593` records the
escalation `G-2026-236` with the owner action requested, as `style-guide.md:293` requires.

The declaration is complete in the direction the rubric cares about: every sub-topic that
states an external-body fact is named. `hec-2013-testdev` (U6-01, U6-03, U6-05, U6-08) and
`scheerens-2003` (U6-03, U6-08, U6-10) remain bound for the general concepts those sub-topics
also teach, and the guides are not asked to carry the institutional histories.

## S-2 TIMSS 2019 participation - RESOLVED

`topic-01.mdx:96` no longer states that Pakistan participated in TIMSS 2019. The sentence now
reads "providing international benchmarks on foundational numeracy and scientific literacy".
`static/img/figures/efmp-408/unit-06/fig-U6-4.svg` and `.dark.svg` now carry "International
surveys & Sindh Teaching Licence" in the 2019-present panel instead of "TIMSS participation &",
and the Urdu pair `fig-U6-4.ur.svg` / `.ur.dark.svg` was changed to match. The bound guide
`TestDevEval_Sept13.txt:655-675` does name TIMSS, PISA, NEAS, ASER, AKU-EB and FBISE as
international and national assessment systems, so the remaining general description is
supported.

## S-3 HEC attribution in Topic 6.2 - RESOLVED

`topic-02.mdx:56` (cheating and malpractice) and `:78` (confidentiality) no longer cite HEC
(2012). Full-text search of the bound `ClassroomAssess_Sept13.txt` still returns no cheating,
academic integrity, confidentiality or privacy passage, so the removal is the right repair.
`topic-02.mdx:78` keeps the NPSTP (2009) citation, which `sources/texts/npstp-2009.md` notes 2
and 4 support (ethical, legal and privacy constraints; secure confidential records).
`topic-02.mdx:41` retains HEC (2012) for the fairness definition, which
`ClassroomAssess_Sept13.txt:405-411` ("assessment is not a neutral enterprise", fairness and
bias) does support. `sources/unit-06.md:7` drops U6-05 and U6-06 from the
`hec-2013-classroom-assessment` scope and coverage follows, so no scope is overstated.

## S-4 figure repetition of the TIMSS claim - RESOLVED

Covered by the fig-U6-4 change above; both the light and dark English variants and both Urdu
variants were edited, and `measure-figure-text` exit 0 confirms the shorter label does not
overflow the viewBox.

## Bound sources re-read

- `hec-2013-testdev` (`TestDevEval_Sept13.txt:255-258`, `:317-319`, `:354`, `:388`,
  `:655-675`, `:2786-2795`) supports the standardized-testing characteristics, MCQ stem and
  distractors, computer-assisted testing, international and national agencies and the BISE
  textbook reliance claim.
- `hec-2013-classroom-assessment` (`ClassroomAssess_Sept13.txt:405-411`, `:245-296`,
  `:5051-5140`, `:1389-1409`, `:4059-4160`) supports fairness and bias, the test-based versus
  assessment-based culture contrast, assessment policy in government and private schools and
  NPSTP Standard 5 by level.
- `npstp-2009` (`sources/texts/npstp-2009.md` notes 1-4) supports Standard 5 knowledge,
  dispositions and performance and the confidentiality constraints.
- `seifert-sutton-2009` (notes 1-5) supports standardized conditions and norm-referenced
  versus criterion-referenced interpretation.
- `scheerens-2003` is declared unverifiable at `sources/unit-06.md:15` under `D-2026-0001` and
  is used only for systemic evaluation, assessment monitoring and institutional cultures,
  which the declaration names.

No source was re-retrieved from the network in this session; the bound guide text and bound
excerpts were read as committed.
