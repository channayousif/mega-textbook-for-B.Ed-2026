# GISS-401 intake - entries for the parent to append

Written by agent:evaluator, 2026-10-31. Not appended to the registers by the evaluator (parallel
run on one worktree). IDs are the pre-allocated ones: `D-2026-0079`; `G-2026-195` to
`G-2026-197` used, `G-2026-198` to `G-2026-204` unused.

## For specs/decisions/log.md

## D-2026-0079 - GISS-401 intake: identity (proposed entry), coverage, outcomes, blueprint, structure and decision residue approved; partition, catalog entry and readings scope escalated; readings fails on two determined repairs

- **Status:** pending-owner-review
- **Gate:** G0 intake / G1 unit-spec
- **Scope:** GISS-401 Islamic Studies, `specs/content/giss-401/content-spec.md` (status: draft) at
  commit `815d59fd` (bundle committed in `d7aabb98`). Settles identity for the spec's proposed
  catalog values only, and coverage, outcomes, blueprint, structure and decision residue for all
  seven units. Does not settle partition, the catalog entry, or readings.
- **Decided by:** agent:evaluator, 2026-10-31 (fresh session; did not draft the spec or the
  initials correction `cbbb61a6`)
- **Decision:**
  1. **identity - approved for the proposed entry.** GISS-401, "Islamic Studies", 2 (2-0),
     General Education, Semester 3: guide `3rd 2026.txt:397-398` ("GISS – 401", credit hours 2,
     3rd), revised Scheme `B.Ed 4 Year 2026 revised after board.txt:218-226`, superseded board
     Scheme `B.Ed 4 Year board.txt:112-113` agree; the guide's "2" and the Scheme's "2 (2-0)" are
     one total. No Article II.3 conflict. The course is **not** in `catalog/courses.json`
     (`:109-113`, Semester 3 `"courses": []`), so the catalog leg is unverified and escalated
     (`G-2026-196`); `title_ur` is not guide-given and is not approved.
  2. **coverage - approved at row level.** The guide's 43 teaching bullets for Weeks 1-15
     (`:409-466`) map to the 43 checklist rows exactly once each, in the guide's words (typo
     "Sate" read as "State"); every row's line and week reference resolves; no row adds a
     sub-topic. Week 16 review lines (`:468-469`) are not teaching sub-topics.
  3. **outcomes - approved.** The five objectives (`:402-406`) are reproduced verbatim; all 13
     SLOs are built from guide-week bullets and trace to a stated objective; every objective is
     reached. `D-2026-0053` item 4 is not relied on.
  4. **blueprint - approved.** Unit-end 10/10/5 bank, Bloom bands, per-topic minimums, ERQ
     arithmetic (5 in every unit), summative Analyze-or-higher and 60/40 are consistent with
     `specs/content/style-guide.md`; Units 2 and 6 (three topics) state 9 formative items per
     the confirmed `D-2026-0072` (`content-spec.md:125`, `:313`); one- and two-topic units keep
     5-8, within the per-topic floor.
  5. **structure - approved.** Front matter valid against
     `contracts/content-spec-frontmatter.schema.json`; every required section and per-unit block
     present; Topic lists are total, disjoint partitions of the checklists; figure plans agree
     with the Topic lists, >= 2 per topic and a concept-map, flowchart or timeline per unit.
  6. **decision-residue - approved.** Whole spec searched for `D-2026-0001`, `D-2026-0003`,
     `D-2026-0012`, `D-2026-0070`, `D-2026-0072`: no superseded design survives. The spec's
     reliance on `D-2026-0053` items 1-2 (Semester 2 scope) is not residue; it is escalated
     under `G-2026-195` and `G-2026-197`.
- **Not approved:**
  - **partition - escalated, `G-2026-195`.** The guide gives sixteen titled weeks and no unit
    headings; the seven-unit grouping (Weeks 1-2 / 3-5 / 6-7 / 8-9 / 10-11 / 12-14 / 15, Week 16
    review) is the drafter's. `D-2026-0070` item 1 permits it but confirms no grouping.
  - **readings - escalated (`G-2026-197`) and two determined repairs.** All four guide entries
    and all six author-selected works resolve to real works (Crossref and OpenAlex, 2026-10-31).
    The author-selected table and the open-access floor rest on `D-2026-0053` item 2, scoped to
    Semester 2. Repairs: (a) Unit 1 maps no registry-identified open-access source
    (`content-spec.md:105`; the `quran-translation` row `:39` names no registry, so
    `scripts/check-source-floor.mjs:40-41,75-76` would not count it), so the spec's own floor
    would fail at G2; (b) the Maududi row (`:42`) pairs "Kazi, 1980" with ISBN 9780933511798,
    which Open Library gives as the 1992 Kazi edition (1980: ISBN 9780686184799).
- **Basis:** guide `Scheme-and-Course-guides/extracted-text/3rd 2026.txt` `:389-474` (checked
  against `3rd 2026.docx`): header `:397-398`, objectives `:402-406`, weekly breakdown
  `:407-469`, readings `:470-474`. Revised Scheme `:190-230`. Confirmed `D-2026-0001`,
  `D-2026-0003`, `D-2026-0012`, `D-2026-0070`, `D-2026-0072`; `D-2026-0053` (scope noted).
  Deterministic checks at `d7aabb98`: validate:content, depth-gate, pipeline-gate, figures,
  no-em-dash, concept-graph, bloom-bands, source-floor, licence, docs-sync, content-status,
  map-sources, add-course exit 0 (depth-gate and source-floor vacuous: no authored unit);
  no-answer-keys exit 1 on `specs/content/efpg-401/content-spec.md` only, unrelated. Per-criterion
  evidence in `specs/content/giss-401/intake/evaluation.md`.
- **Bound to:** `specs/content/giss-401/intake/manifest.json`, manifest digest
  `b9864872f40f36d345d3f697c489039f20dd7b1df0644a4239b2e44fafe44fe6` (55 inputs at commit
  `815d59fd`; recomputed with `manifestFor()`, 0 digest mismatches, no extra or missing path,
  digest reproduced; registers `specs/decisions/log.md` `e9598a98...` and `specs/gaps.md`
  `383dcc3b...` matched at read time). The bundle includes the `cbbb61a6` initials correction,
  an ancestor of `815d59fd`; it is not stale. A change to any bound input voids this decision
  (Art. VII.8.5).
- **Blocked, by unit and section:** the `## Week schedule` and the unit boundaries of Units 1-7
  (`G-2026-195`); the `## Reading list` and every unit's `**Mapped readings**` line
  (`G-2026-197` and the two repairs, Unit 1 most directly); the catalog entry (`G-2026-196`).
- **Limits:** the spec stays `status: draft` and may not move to `approved` on confirmation of
  this entry: the readings repairs change `content-spec.md`, which voids it, and a fresh bundle
  and intake are needed after the owner rules. Does not add the course to the catalog, settle
  `title_ur` or the GETH-401 alternative, or rule on Week 16. The drafter's request that a
  qualified scholar of Islamic Studies review statements of belief, ritual and law at G3
  (`content-spec.md:404`) is noted for the owner and not decided; this evaluator qualifies no
  reviewer. Advisories: record the verified attribution of *Islami Nazriya-e-Hayat* (Khurshid
  Ahmad, University of Karachi, 1st ed. 1960); give each author-selected row its own
  verification date; the Sutomo and Abdel Salam publisher copies return HTTP 403 to this host;
  Unit 7's 25-40 reading-minute band is tight. Certifies no content, qualifies no reviewer,
  authorises no publication (Art. VII.8.4).

## For specs/gaps.md

## G-2026-195 - GISS-401 intake: the seven-unit partition is the spec's construction over a guide that gives only a week table

- **Status:** open
- **Gate:** G0 intake / G1 unit-spec (partition criterion)
- **Source:** `D-2026-0079`
- **Detail:** The guide's "Course Contents / Weekly Breakdown" (`3rd 2026.txt:407-469`) gives
  sixteen titled weeks, Week 16 "Review and Final Assessment" (`:467-469`), and no unit or
  chapter headings. The spec (`content-spec.md:61-70`) proposes:

  | Unit | Guide weeks | Topics |
  |---|---|---|
  | 1 Introduction to Islamic Studies and the Fundamental Beliefs of Islam | 1-2 | 2 |
  | 2 Sources of Islamic Knowledge: the Qur'an and the Sunnah | 3-5 | 3 |
  | 3 Worship and the Moral System of Islam | 6-7 | 2 |
  | 4 The Social System and the State in Islam | 8-9 | 2 |
  | 5 The Economic and Political Systems of Islam | 10-11 | 2 |
  | 6 Islam, Education, Civilization and Contemporary Issues | 12-14 | 3 |
  | 7 Islamic Ethics in Professional Life | 15 | 1 |
  | none | 16 (review) | - |

  Verified: contiguous weeks, no week split, no topic reordered, each topic one guide week under
  its guide title, all line references correct. Not determined by the guide: seven units, the
  boundaries, the single-week Unit 7, and Week 16 carried as no unit. `D-2026-0070` item 1 permits
  grouping a bare week table but confirms no particular grouping; `D-2026-0053` item 1, which the
  spec cites (`:59`), confirmed named Semester 2 groupings only. Fifteen one-week units is an
  equally guide-faithful alternative.
- **Needed, and from whom:** the curriculum owner, to confirm the seven-unit grouping above,
  choose one unit per week, or supply another; and to say how Week 16's course review and student
  presentations are carried.
- **Blocks:** the `partition` criterion of `D-2026-0079`; the `## Week schedule` and unit
  boundaries of GISS-401. Not the checklists, whose guide references are correct.

## G-2026-196 - GISS-401 has no `catalog/courses.json` entry; adding one re-opens bound evidence corpus-wide

- **Status:** open
- **Gate:** G0 intake (identity criterion)
- **Source:** `D-2026-0079`
- **Detail:** `catalog/courses.json:109-113` lists Semester 3 with `"courses": []`. The spec
  states a proposed entry instead (`content-spec.md:12`): `{"code": "GISS-401", "title_en":
  "Islamic Studies", "title_ur": "اسلامیات", "credit_hours": "2 (2-0)", "category": "General
  Education"}`. Code, title, credit hours, semester and category match the guide (`3rd
  2026.txt:397-398`) and the revised Scheme (`:218-226`) and are approved in `D-2026-0079`.
  `title_ur` is not guide-given. The Scheme pairs GETH-401 "Ethics for non-Muslims" as the
  alternative in the same row (`:228-230`), and the catalog has no field for an alternative.
  The spec notes that every G2/G3 evidence manifest binds `catalog/courses.json` whole, so
  adding a course voids existing review evidence. The same question applies to the other
  Semester 3 specs evaluated in this batch.
- **Needed, and from whom:** the curriculum owner, to rule whether and when Semester 3 courses
  are added to the catalog (given the evidence re-open), to confirm `title_ur`, and to say how
  the GETH-401 alternative is represented.
- **Blocks:** the catalog leg of the `identity` criterion of `D-2026-0079`; authoring any
  GISS-401 unit (no catalog entry for the content tree to hang from).

## G-2026-197 - GISS-401 relies on `D-2026-0053` item 2 (author-selected readings, open-access floor), whose scope is Semester 2

- **Status:** open
- **Gate:** G0 intake / G1 unit-spec (readings criterion)
- **Source:** `D-2026-0079`
- **Detail:** The guide gives four readings (`3rd 2026.txt:470-474`): the Qur'an (translation and
  tafseer), Sahih Bukhari and Sahih Muslim, *Islami Nazriya-e-Hayat* (no author given; resolves
  to Khurshid Ahmad, University of Karachi, 1st ed. 1960), and Maududi, *Towards Understanding
  Islam*. All four resolve. The spec adds six author-selected open-access articles
  (`content-spec.md:48-55`, all verified real against Crossref and OpenAlex) and declares
  `open_access_floor: {default: 1}`, citing `D-2026-0053` item 2 (`:33`, `:46`). That ruling's
  scope is the six named Semester 2 courses. The guide does not determine adding sources beyond
  its list, and `G-2026-94` (a self-declared floor) was resolved for Semester 2 only. The
  question likely recurs for every Semester 3 spec.
- **Needed, and from whom:** the curriculum owner, to say whether `D-2026-0053` item 2 (and item
  1, see `G-2026-195`) extends to Semester 3 and later courses, or to rule for GISS-401 alone.
  Two determined repairs stand regardless: the Unit 1 open-access floor source (needed only if
  the floor applies) and the Maududi ISBN/edition row.
- **Blocks:** the `readings` criterion of `D-2026-0079`; the `## Reading list` and every unit's
  `**Mapped readings**` line.
