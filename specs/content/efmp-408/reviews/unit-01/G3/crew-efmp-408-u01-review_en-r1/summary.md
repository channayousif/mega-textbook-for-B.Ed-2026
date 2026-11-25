# EFMP-408 Unit 1 G3 English review (r1)

Disposition: **revise**. Advisory only; G3 stays open, unsigned, and no gate is marked done.

Reviewed inputs: `docs/semester-4/efmp-408/unit-01/` (6 files), `specs/content/efmp-408/` rows for
Unit 1, and `static/img/figures/efmp-408/unit-01/` (7 assets). Bundle prepared with
`node scripts/review-evidence.mjs prepare EFMP-408 1 G3` over a clean tree; 99 bound inputs, all
digests recomputed and matched (`logs/input-verification.txt`).

## What passes

- **Authority.** The approved content-spec (`status: approved`) and the 2026 guide
  (`4TH SEMESTER.txt:216-224`) allot Weeks 1-2 to exactly the nine taught sub-topics U1-01..U1-09.
  No contradictory G0/G1 authority.
- **Coverage.** All nine sub-topics are taught under the mapped headings; `check:depth-gate` exit 0.
- **Sources.** The bound HEC, Seifert & Sutton and declared-unverifiable Scheerens excerpts support
  the claims made; `check:no-em-dash`, `check:no-answer-keys`, `check:docs-sync`,
  `validate:content`, `check:figures` and `check:content` all exit 0.
- **Readability and pedagogy.** HSC register held; all three topic files carry the nine-part cycle,
  a classroom situation, a named misconception, a feasible activity and retrieval practice.

## Findings (see the report for exact locations)

- **Uncertain, unresolved: render-review unavailable.** Deployed SHA
  `3910d26161b35a1faf18ce848fd50ab0b4cf59f7` differs from HEAD
  `7bb9e4d484428859cbfe2f6e3775c0e8291b11ea` on `index.mdx` and `fig-U1-4.webp`, so the production
  build is not the reviewed input. No build, server or browser run is permitted; visual and print
  accessibility is unverified. Structural accessibility passes from source.
- **Uncertain, unresolved: formative blueprint breach.** `topic-02.mdx` item 4 and `topic-03.mdx`
  item 3 are tagged `*(Analyze)*`, above the approved formative band Remember/Understand/Apply
  (`content-spec.md:98`, `style-guide.md:237`). The unit also carries 12 formative items (4 per
  topic) against the approved 9 (3 per topic, `D-2026-0072`).
- **Advisory: RRQ 4** is tagged `*(Remember)*`, below the style guide's RRQ floor of Understand.
- **Advisory: MCQ key** never uses option D (A2/B4/C4/D0).
- **Advisory: NPSTP Standard 5** is cited in `topic-01.mdx`, MCQ 4 and ERQ 5 but is not declared in
  `sources/unit-01.md` or `coverage/unit-01.md`; the claim is supported by the course's
  `sources/texts/npstp-2009.md`, which is scoped to Unit 6 and so is outside this G3 bundle.
- **Advisory: Scheerens declaration** (`sources/unit-01.md:12-14`) records the retrieval attempt and
  date but not the owner authorisation that `D-2026-0001` requires.
- **Advisory: assessment definition** (`topic-01.mdx:41`) says "gathering, documenting and
  interpreting information about student knowledge, skills, attitudes and beliefs"; the bound HEC
  note supports "gathering, analysing and interpreting evidence about student learning".
- **Advisory: appraisal definition** (`topic-01.mdx:78`) and its Pakistani teacher-education usage
  go beyond the bound note (`sources/texts/hec-2013-testdev.md:11`), which only says appraisal
  integrates multiple forms of evidence.

## Required next work

A separate author repairs the formative band and the RRQ 4 floor (or records an owner ruling),
binds or rewords the NPSTP and Scheerens provenance, and rebalances the MCQ key. The review host
then prepares a fresh bundle and sends it to a fresh independent reviewer with a deployed SHA that
matches HEAD so the render can be inspected. G3 and G5 stay open; no signing, publication, registry
change, prose repair or acceptance was performed.
