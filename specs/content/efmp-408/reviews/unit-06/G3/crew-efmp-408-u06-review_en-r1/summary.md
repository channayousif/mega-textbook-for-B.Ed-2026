# EFMP-408 Unit 6 G3 English review (r1)

Disposition: **revise**. Advisory only. G3 stays open, unsigned, no gate is marked done, and no
prose was repaired by this run.

Reviewed inputs: `docs/semester-4/efmp-408/unit-06/` (7 files), the Unit 6 rows under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-06/` (17 assets). Bundle prepared
with `node scripts/review-evidence.mjs prepare EFMP-408 6 G3` over a clean tree; 105 bound inputs,
all digests recomputed and matched (`logs/input-verification.txt`).

Rendered input identity: deployed SHA `7fb77de68f5d59bbc507e85c07a892a3cbf93eca` equals branch
HEAD, and `git diff --quiet <deployed> HEAD -- docs/semester-4/efmp-408/unit-06/
static/img/figures/efmp-408/unit-06/` exits 0, so the production build at
`https://textbook.com.pk` is the reviewed input. All eight schematic SVGs and the banner WebP are
served byte-identical to the repository.

## What passes

- **Authority.** The approved content-spec (`status: approved`) and the 2026 guide
  (`4TH SEMESTER.txt:266-277`) allot Weeks 13-15 to exactly the twelve taught sub-topics
  U6-01..U6-12. Topic 6.4 is flagged enrichment in the unit text and sourced from the 2025
  `EED-411` guide under owner decision `D-2026-0093` item 6.
- **Coverage.** All twelve sub-topics are taught under the mapped headings; reading minutes
  3+18+17+17+18+22+4 = 99, inside the approved 85-115 band; `check:depth-gate` exit 0.
- **Readability and pedagogy.** HSC register held; all four topic files carry the nine-part
  cycle, a classroom situation, a named misconception, a feasible activity and retrieval
  practice; the three approved misconceptions are all corrected.
- **Accessibility.** Production render inspected at desktop 1280x900, narrow 360x780 and A4
  print 794: no heading-level skip, no missing alt, no document overflow, every wide table
  scrolls as its own container with `tabindex="0"` and `aria-label`, and `clippedElems=0` on all
  seven pages in print. `measure-figure-text` exit 0 on all sixteen bound SVGs.

## Findings (see the report for exact locations)

- **Blocking: MCQ key design.** The key is A0 / B9 / C1 / D0 (`unit-assessment.mdx:126-135`), so
  an all-B strategy scores 9/10, and the keyed option is also the longest option in 9 of the 10
  items. Both are giveaways under the item-writing rules. Repair: redistribute the keys across
  A-D and rebalance option length and grammatical parallelism.
- **Blocking: undeclared missing sources.** Whole sub-topics are built on specific external
  facts with no bound source and no `no-external-source` row, which `style-guide.md:293`
  requires. Examples: NTS established 2002, NEAS Grades 4 and 8, STEDA, FPSC, SEF, "PEAC in
  Punjab and PEAC in Sindh", Cambridge O/A Levels and the IB, and the claim that the Sindh
  Teaching Licence is criterion-referenced. Repair: record the row (and escalate in
  `specs/gaps.md`) or bind and cite a source.
- **Uncertain: TIMSS 2019 participation.** `topic-01.mdx:96` and `fig-U6-4` state that Pakistan
  participated in TIMSS 2019 at Grade 4. No bound source supports it and it could not be
  confirmed; verify against a primary IEA/TIMSS source or remove the specific claim.
- **Advisory: RRQ 6 and RRQ 9** are tagged `*(Remember)*`, below the RRQ band Understand to
  Analyze (`style-guide.md:248`). Raise the demand or record a ruling.
- **Advisory: HEC attribution in Topic 6.2.** `topic-02.mdx:56` and `:78` cite HEC (2012) for
  cheating, academic integrity and confidentiality; the bound `ClassroomAssess_Sept13.txt`
  contains no cheating, integrity, confidentiality or privacy content. NPSTP note 2 supports
  only a general privacy statement. Bind a source or declare the material as general knowledge.
- **Advisory: `fig-U6-5` title geometry.** The title ends at 779.1px in a 780px viewBox
  (render-inspect section D), a 0.9px margin. `measure-figure-text` passes it and the text is
  inside the viewBox, so this is tight rather than clipped; shorten the title or reduce the
  title font.

## Render notes

`render-inspect` exited 1 with four defects. Two were "visible image did not load" for
`fig-U6-4.svg` and `fig-U6-6.svg`; a targeted follow-up (`logs/render-followup.txt`) scrolled
each figure into view and both reported `natural=244x150` in an 860x530 box, and all nine
distinct assets are served HTTP 200 byte-identical to the repository. The flags are the tool's
known lazy-load timing false positive, not a content defect. The remaining two are the
`fig-U6-5` title geometry above, counted once per theme variant.

## Required next work

A separate author repairs the MCQ key, records the missing `no-external-source` declaration (and
either binds or removes the unsupported external-body facts, including TIMSS 2019), raises or
rules on RRQ 6 and RRQ 9, and corrects the HEC attribution in Topic 6.2. The host then prepares
a fresh bundle and sends it to a fresh independent reviewer. G3 and G5 stay open; no signing,
publication, registry change, prose repair or acceptance was performed.
