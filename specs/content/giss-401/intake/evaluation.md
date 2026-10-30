# GISS-401 · Islamic Studies - Intake Evaluation (first intake, 2026-10-31)

**Evaluator**: agent:evaluator (fresh session; did not draft the spec or the initials correction)
**Gates**: G0 intake / G1 unit-spec
**Date**: 2026-10-31
**Constitution**: Article VII.8
**Skill**: `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (bound digest `77ff2fa9...`; byte-identical to the main checkout's copy)
**Spec under evaluation**: `specs/content/giss-401/content-spec.md` (status: draft, 408 lines)
**Course guide**: `Scheme-and-Course-guides/extracted-text/3rd 2026.txt`, GISS block `:389-474`
(checked against the source `Scheme-and-Course-guides/3rd 2026.docx` `word/document.xml`: same
header, objectives, 16 weeks and 4 readings)
**Scheme**: `Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt:190-230`
(final authority per `Scheme-and-Course-guides/extracted-text/README.md`)
**Decision proposed**: `D-2026-0079` (pending-owner-review), text in `register-entries.md`
**Escalations proposed**: `G-2026-195`, `G-2026-196`, `G-2026-197`, text in `register-entries.md`
**Recording mode**: per the parent's instruction for this parallel run, nothing was written to
`specs/decisions/log.md` or `specs/gaps.md`; the parent appends the entries.

## Manifest verification

- Bundle: `specs/content/giss-401/intake/manifest.json`, prepared at commit
  `815d59fd8d672b34468b9814a0a2500ade3b80a0`; bundle committed in `d7aabb98` (that commit adds
  only the six Semester 3 `intake/manifest.json` files: `git diff --stat 815d59fd HEAD`).
- Inputs bound: 55. Manifest digest:
  `b9864872f40f36d345d3f697c489039f20dd7b1df0644a4239b2e44fafe44fe6`.
- Recomputed independently with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
  `intakeRoots('giss-401')` set (copied from `scripts/prepare-intake-evidence.mjs`) at HEAD
  `d7aabb98`: 55 paths each side, **0 digest mismatches, no extra or missing path** (the bundle's
  own `intake/manifest.json` is excluded by `bound()`); `digest(JSON.stringify(input_manifest))`
  reproduces the stored digest.
- Registers (read, not freshness-bearing) matched at read time: `specs/decisions/log.md`
  `e9598a98...`, `specs/gaps.md` `383dcc3b...`.
- **Stale-manifest question raised by the parent: the bundle is not stale.** The initials
  correction ("Abdel Salam, E. F. A." to "Abdel Salam, E. F.", `content-spec.md:52`) is commit
  `cbbb61a6`, which is an **ancestor** of the bundle commit `815d59fd`
  (`e1b808f6` -> `cbbb61a6` -> `815d59fd` -> `d7aabb98`; `git log -- specs/content/giss-401/content-spec.md`
  lists only `e1b808f6` and `cbbb61a6`). The bound digest `f35de962...` is of the corrected text,
  and the working copy evaluated here is that text. No later commit touches the spec.
- Worktree clean for bound inputs before evaluation (`git status --short` empty).

## Criteria

### 1. identity - pass on the proposed entry; the catalog leg is unverified (escalated, `G-2026-196`)

| Field | Guide `3rd 2026.txt` | Revised Scheme | Superseded board Scheme | Spec's proposed entry (`content-spec.md:12`) |
|---|---|---|---|---|
| Code | "GISS – 401" (`:397`) | "GISS – 401" (`:218`) | "GISS – 401" (`B.Ed 4 Year board.txt:112`) | `GISS-401` |
| Title | "Islamic Studies" (`:398`) | "Islamic Studies" (`:220`) | "Islamic Studies" (`:113`) | "Islamic Studies" |
| Credit hours | "2" (`:397`) | "2 (2-0)" (`:222`) | "2 (2-0)" | "2 (2-0)" |
| Semester | "3rd" (`:398`) | Semester III (`:190`) | Semester III | 3 |
| Category | - | "General Education" (`:224`) | "General Education" | "General Education" |

- Code, title and credit hours agree across the guide and both Schemes. The guide's bare "2" and
  the Scheme's "2 (2-0)" are the same total; the split is the Scheme's expression of it (the
  `D-2026-0018` reading). No Article II.3 conflict.
- `B.Ed (4-Year) 2025-2.txt:9-10` carries an older "EED-301 Islamic Studies (General Course)" in
  Semester I; that scheme is superseded by the revised Scheme and is not in conflict.
- **The catalog entry does not exist.** `catalog/courses.json:109-113` holds Semester 3 with
  `"courses": []`. The criterion as written reads `catalog/courses.json`; that leg cannot be
  checked and is `unverified`. The spec says why it is absent (`:12`): every G2/G3 evidence
  manifest binds `catalog/courses.json` whole, so adding the course re-opens reviewed units, and
  the owner has not ruled. Whether and when to add it is not a guide question.
- `title_ur: "اسلامیات"` is not guide-given (the guide is English-only) and is not approved here.
- The Scheme lists GETH-401 "Ethics for non-Muslims" as the alternative in the same row
  (`:228-230`), with its own guide block (`3rd 2026.txt:476` onward). The spec treats it as a
  separate course (`:12`, `:407`); how the catalog represents the alternative is part of
  `G-2026-196`, not of this spec.

### 2. partition - escalated (`G-2026-195`)

- The guide gives "Course Contents / Weekly Breakdown" (`:407`), sixteen titled weeks
  (`:408-469`), and **no unit or chapter headings**. Week 16 is "Review and Final Assessment"
  (`:467-469`).
- The spec's seven units (`content-spec.md:61-70`):

  | Unit | Guide weeks | Topics |
  |---|---|---|
  | 1 Introduction to Islamic Studies and the Fundamental Beliefs of Islam | 1-2 (`:408-415`) | 2 |
  | 2 Sources of Islamic Knowledge: the Qur'an and the Sunnah | 3-5 (`:416-427`) | 3 |
  | 3 Worship and the Moral System of Islam | 6-7 (`:428-434`) | 2 |
  | 4 The Social System and the State in Islam | 8-9 (`:435-441`) | 2 |
  | 5 The Economic and Political Systems of Islam | 10-11 (`:442-450`) | 2 |
  | 6 Islam, Education, Civilization and Contemporary Issues | 12-14 (`:451-462`) | 3 |
  | 7 Islamic Ethics in Professional Life | 15 (`:463-466`) | 1 |
  | (none) | 16 review (`:467-469`) | - |

- Verified mechanically: every week's line range in each unit opening matches the guide; blocks
  are contiguous; no week is split across units; no guide topic is reordered; each topic is one
  guide week and keeps that week's guide title.
- Not determined by the guide: the number of units (seven), the block boundaries, the
  single-week Unit 7, and carrying Week 16 as no unit. `D-2026-0070` item 1 (confirmed, every
  course) **permits** grouping where the guide gives only weeks but confirms no particular
  grouping; `D-2026-0053` item 1, which the spec cites (`:59`), confirmed named Semester 2
  groupings only (its scope is six Semester 2 courses). A partition of fifteen one-week units is
  an equally guide-faithful reading under `D-2026-0070` item 1's "follow the guide whenever
  possible". This is the judgement the skill reserves to the owner.

### 3. coverage - pass

- The guide's teaching bullets under Weeks 1-15 are 43 lines (`:409-411`, `:413-415`, `:417-419`,
  `:421-423`, `:425-427`, `:429-430`, `:432-434`, `:436-438`, `:440-441`, `:443-445`,
  `:448-450`, `:452-454`, `:456-458`, `:460-462`, `:464-466`). The spec's checklists carry 43
  rows (6/9/5/5/6/9/3). Each row's `Guide ref` line number was resolved against the guide text:
  every bullet appears exactly once, none is missing, none is duplicated, and every row's week
  number matches the week heading above its cited line.
- Wording is the guide's, with only typographic normalisation: "Sate System" (`:440`, a guide
  typo) as "State system" (U4-04), "themes-based" as "theme-based" (U2-06), "modeling"
  as "modelling" (U7-03), list commas. U2-01 and U2-02 add "as a source", which is the Week 3
  heading's own frame ("Sources of Islamic Knowledge", `:416`).
- The guide's own repetitions (Qur'an and Hadith/Sunnah in Week 3 and again as Weeks 4-5; Zakat
  in Week 6 and Week 10) are separate guide lines and are carried once each. No row introduces a
  sub-topic the guide lacks. Figure plans and misconception lines elaborate rows (for example
  isnad/matn under "Classification of Hadith", Constitution Articles 20, 22, 36 under "Rights of
  minorities") and add no checklist row.
- Week 16's "Course review" and "Student presentations and discussions" (`:468-469`) are not
  teaching sub-topics and are not carried; this follows the GPKS-402 approvals (`D-2026-0073`
  item 3 counts teaching bullets only). Its placement is inside `G-2026-195`.

### 4. outcomes - pass

The guide's five objectives (`:402-406`) are reproduced verbatim (`content-spec.md:16-21`).
Thirteen SLOs, each composed of its unit's guide bullets:

| SLO | Content (guide lines) | Spec's trace | Check |
|---|---|---|---|
| 1-1, 1-2 | `:409-415` | obj 1 | basic beliefs and teachings - direct |
| 2-1, 2-2 | `:417-427` | obj 2 | sources of law and guidance - direct |
| 3-1 | `:429-430` | obj 3, 5 | the guide's "objectives and social significance of Ibadat" supports 3/5; objective 1 ("teachings of Islam") is also an ancestor (advisory) |
| 3-2 | `:432-434` | obj 3, 5 | direct |
| 4-1, 4-2 | `:436-441` | obj 4 | social system - direct |
| 5-1, 5-2 | `:443-450` | obj 4, 5 | social system; tolerance (minorities) - direct |
| 6-1, 6-2 | `:452-462` | obj 4, 5 | education, tolerance, peace - direct |
| 7-1 | `:464-466` | obj 3, 5 | professional life; moral development through education - direct |

Every SLO has a guide-week ancestor and a stated-objective trace; no SLO is an addition; every
objective is reached by at least one SLO. `D-2026-0053` item 4 is not needed and not relied on.

### 5. readings - not approved (escalated scope, `G-2026-197`; one determined repair)

**Guide list present** (`:470-474`): four entries, all carried as guide-required rows
(`content-spec.md:39-42`). Each resolves to a real work:

| Key | Evidence (2026-10-31) | Verdict |
|---|---|---|
| `quran-translation` | quran.com HTTP 200. The guide names no translation or tafseer; the spec says so | resolves (primary text) |
| `sahih-bukhari-muslim` | sunnah.com/bukhari and /muslim HTTP 403 to this host, as the row states; `D-2026-0001` flag recorded | resolves (primary texts; retrieval flagged) |
| `islami-nazriya-e-hayat` | Not in Open Library (4 queries, 0 hits; matches the row). Resolved elsewhere: the publication lists of Prof. Khurshid Ahmad at the Institute of Policy Studies and the Senate of Pakistan give *Islami Nazriya-e-Hayat* (Islamic Ideology), University of Karachi, 1st ed. 1960, 7th-9th eds. 1982-1988; the NUST union catalogue (Koha biblionumber 62291) lists Khurshid Ahmad, Karachi University, c.1995, 554 p. (search excerpts; the NUST page itself returned nothing to this host) | resolves to a real print monograph; title-level under `D-2026-0001`. Advisory: the row's "attribution is unverified here" can now record this attribution |
| `maududi-towards-understanding` | Open Library OL12324456W "Towards understanding Islam", Sayyid Abul A'la Maududi, 1960; OL8313410W "Towards Understanding Islam", A. A. Maududi, two editions: OL7723465M Kazi 1980 ISBN 9780686184799, OL8388442M Kazi 1992 ISBN 9780933511798 | resolves; **row defect**: `:42` gives "(Kazi, 1980, ISBN 9780933511798)", but that ISBN is the 1992 Kazi edition; the 1980 edition is ISBN 9780686184799 |

Three entries are print or primary texts; `D-2026-0001` governs retrieval. The two hadith
collections and the Qur'an are cited by reference (`:25`), as Art. III.5 requires.

**Author-selected open-access table** (`:48-55`): all six works checked against Crossref and
OpenAlex on 2026-10-31.

| Key | Crossref | OpenAlex | Open copy | Verdict |
|---|---|---|---|---|
| `mudawam-2021-usul` | Mudawam, Syafaul; Asy-Syir'ah 55(2) p.315, 2021 | W4380674929, diamond | PDF HTTP 200 | matches |
| `sutomo-2014-akhlaq` | Sutomo, Imam; IJIMS 4(2) p.291, 2014 | W2596245887, gold, CC BY-SA, also DOAJ | publisher HTTP 403 to this host | matches; advisory below |
| `abdel-salam-2015-democracy` | "Abdel Salam", "El Fatih"; TAFHIM 1(3) 107-127, 2015 | W2621401696, diamond, CC BY-NC-SA | publisher HTTP 403 to this host | matches (corrected initials "E. F." agree with Crossref) ; advisory below |
| `rahman-2020-zakat` | Rahman, Agussalim; Siradjuddin; JAMREMS 1(2) 67-74, 2020 | W3115899813, diamond | PDF HTTP 200 | matches |
| `bhat-2019-education` | Bhat, Ali Muhammad; JCVE 2(2) 73-76, 2019 | W3028482776, diamond | PDF HTTP 200 | matches |
| `tambak-2020-teachers` | Tambak, Syahraini; Sukenti, Desi; Cakrawala Pendidikan 39(1) 65-78, 2020 | W3003291306, gold | PDF HTTP 200 | matches |

**Why not approved.**

1. **Escalated (`G-2026-197`).** The author-selected table, the "every unit binds >= 1
   open-access source" rule (`:33`) and the `open_access_floor: {default: 1}` front matter all
   rest on `D-2026-0053` item 2 (`:33`, `:46`). That ruling's scope is the six named Semester 2
   courses; nothing in the log extends it to Semester 3. The guide has a list (so this is not the
   "no reading list" case), and the guide does not determine adding sources beyond it.
   `G-2026-94` is the precedent for a self-declared floor; `D-2026-0053` resolved it for
   Semester 2 only. Whether the ruling extends is a scope judgement for the owner.
2. **Determined repair: Unit 1 has no planned registry-verifiable open-access source**, so the
   spec's own declared floor would fail at G2. `:33` says the Qur'an translation online "is the
   floor source every unit shares", but its row (`:39`) names no registry, and
   `scripts/check-source-floor.mjs:40-41,75-76` counts a row only when it names a registry
   (Crossref, OpenAlex, ERIC, DOAJ, PubMed, Semantic Scholar, unpaywall) and an ISO date.
   Unit 1's Mapped readings (`:105`) are `quran-translation`, `maududi-towards-understanding`,
   `islami-nazriya-e-hayat`: none qualifies. Units 2-7 each map one registry-identified
   open-access article (U2 mudawam, U3 sutomo, U4 and U5 abdel-salam / rahman, U6 bhat, U7
   tambak). Same defect class as `D-2026-0064`. This is internal consistency between the spec's
   declared floor and its own plan, so it is reportable now whatever `G-2026-197` decides; if the
   owner rules the floor does not apply, the repair falls away.
3. **Determined repair: the Maududi row's ISBN/edition mismatch** (above).

**Advisories (no repair required).** The author-selected rows carry an OpenAlex ID each, but
their verification date is stated once for the table (`:46`, "on 2026-10-31"), not per row; the
`sources/unit-NN.md` rows will need registry and ISO date in the same row for the gate. The
Sutomo and Abdel Salam publisher copies refuse this host; if the authoring host cannot open them
either, `D-2026-0001` applies, and Units 3 and 4 would then carry their only scholarly
open-access source unread. The drafter's note 4 (`:406`, smaller journals support context, not
doctrine) is borne out by the venue list and is a G3 matter.

### 6. blueprint - pass

- Unit-end bank in every unit: MCQs 10 (Remember-Apply), RRQs 10 (Understand-Analyze), ERQs 5
  (Analyze-Evaluate/Create), each ERQ with an analytic rubric and >= 1 Analyze-or-higher; matches
  `specs/content/style-guide.md` "Unit-end assessment bank".
- Per-topic minimums fit the fixed counts: ">= 2 per topic" for MCQs and RRQs needs at most 6 of
  10 (three-topic units).
- ERQ arithmetic sums to 5 in every unit: 2x2+1 (Units 1, 3, 4, 5), 1x3+2 (Units 2, 6), 5 on one
  topic with >= 1 integrative (Unit 7).
- Formative: two-topic Units 1, 3, 4, 5 and one-topic Unit 7 keep "5-8"; the per-topic floor
  (>= 3 per topic, style guide "Per-topic cycle assessments") gives >= 6 and >= 3, both within
  5-8. Three-topic Units 2 and 6 state "formative 9 items, 3 per topic" (`:125`, `:313`) as the
  confirmed `D-2026-0072` prescribes. No floor the spec sets is breached by its own items.
- Each unit's summative names an Analyze-or-higher item (Analyze in 1, 2, 3, 5; Evaluate in 4, 6;
  Create in 7); weighting 60/40 per Art. III.7, the guide giving none (`:23`).
- Depth budgets (advisory): topic reading-minutes (12-17 each, 18-26 for Unit 7's single topic)
  plus corpus-typical index (about 4 min) and unit-assessment (about 12-14 min) files fall inside
  each unit band (40-55, 55-75, 25-40). Unit 7's band is tight: a 26-minute topic with typical
  overhead exceeds 40.

### 7. structure - pass

- Front matter `{course_code: GISS-401, status: draft, open_access_floor: {default: 1}}` is valid
  against `contracts/content-spec-frontmatter.schema.json` (Ajv 2020, `valid: true`). The floor
  uses the mapping form `check:source-floor` reads.
- Course-wide items, Course Description, Reading list, Week schedule and seven `## Unit N`
  sections, each with CLO/SLO refs, key terms, topics, assessment blueprint, `### Sub-topic
  checklist`, `### Topic list`, Depth budget, prerequisite knowledge, common misconceptions,
  mapped readings, figure plan and unit-end blueprint: the same section set as the approved
  GPKS-402 spec.
- Parsed with the gate's own helpers (`unitSectionLines`, `tableAfterHeading`, `parsePipeTable`,
  `parseTopicList`): in every unit the Topic list is a total, disjoint partition of the checklist;
  every checklist `Topic` cell agrees with the Topic list; the per-topic Depth-budget regex
  (`scripts/lib/unit-depth.mjs:468`) parses; the Figure plan and the Topic-list figure cells agree
  ID-for-ID and archetype-for-archetype; every topic plans >= 2 figures and every unit plans a
  concept-map, flowchart or timeline (Art. III.10).
- Deterministic checks at `d7aabb98`, each run as `flock /tmp/mega-book-heavy.lock npm run -s <name>`:

  | Check | Exit | Note |
  |---|---|---|
  | validate:content | 0 | does not read content-spec front matter; the Ajv check above covers it |
  | check:depth-gate | 0 | vacuous for GISS-401 (no authored unit) |
  | check:pipeline-gate | 0 | |
  | check:figures | 0 | |
  | check:no-em-dash | 0 | scans `specs/content` |
  | check:no-answer-keys | **1** | sole finding is in `specs/content/efpg-401/content-spec.md` (a rubric-heading pattern); not this course, not a GISS-401 bound input |
  | check:concept-graph | 0 | |
  | check:bloom-bands | 0 | |
  | check:source-floor | 0 | vacuous for GISS-401 (no authored unit) |
  | check:licence | 0 | |
  | check:docs-sync | 0 | |
  | check:content-status | 0 | |
  | check:map-sources | 0 | |
  | check:add-course | 0 | |

### 8. decision-residue - pass

Confirmed entries whose scope reaches this course, searched across the whole spec:

- `D-2026-0001` (corpus-wide): applied to the print and 403 rows (`:40`, `:42`); no claim beyond
  a flag.
- `D-2026-0003` (`.specify/` variants superseded): the spec cites only `Scheme-and-Course-guides/`;
  no `.specify` locator (grep 0 hits).
- `D-2026-0012` (guide-silent week schedule): not applicable; the guide has a week table and the
  schedule follows it.
- `D-2026-0070` (every course): item 1 permits the grouping (see partition); item 3 puts the
  guide PDF on the intro page through the theme, never in `course-overview.mdx`; the spec plans
  no MDX guide link (grep "guide PDF", "course-overview": 0 hits).
- `D-2026-0072` (corpus-wide): applied in both three-topic units (`:125`, `:313`); no
  three-topic unit keeps "5-8" (all six "5-8" hits are in one- or two-topic units).
- `D-2026-0005`, `D-2026-0068`: authoring and review rules with nothing to apply in a spec.

No superseded design survives. The spec also leans on `D-2026-0053` items 1 and 2 (`:33`, `:46`,
`:59`), a confirmed ruling whose scope is Semester 2. That is not residue of a superseded design;
it is reliance on a ruling outside its scope, and extending it is a scope judgement, escalated
under partition (`G-2026-195`) and readings (`G-2026-197`).

## Drafting notes tested (`content-spec.md:399-407`)

1. Partition is the drafter's: confirmed; escalated as `G-2026-195`.
2. Religious-content review by a qualified scholar at G3: not an intake criterion and not
   decided here; this evaluator qualifies no reviewer. Recorded in the decision's limits so the
   owner sees it.
3. *Islami Nazriya-e-Hayat* "was not found": not found in Open Library, but resolvable to
   Khurshid Ahmad's University of Karachi book from three independent bibliographic sources.
   The Qur'an claim is accurate.
4. Open-access articles are in smaller journals: accurate; all six are real and are the works
   cited.
5. GETH-401 needs its own spec: consistent with the Scheme; part of `G-2026-196`.
6. Single-topic Unit 7: consistent with the guide (Week 15 is one week); part of `G-2026-195`.

## Outcome

**Partial.** Approved for `D-2026-0079`: identity (the proposed entry's code, title, credit hours,
semester and category only), coverage, outcomes, blueprint, structure, decision-residue.
Escalated: partition (`G-2026-195`), the catalog leg of identity (`G-2026-196`), the readings
scope (`G-2026-197`). Readings also fails on two determined repairs (Unit 1 floor source; Maududi
ISBN). Blocked: the `## Week schedule` and the unit boundaries of all seven units; every
`**Mapped readings**` line and the `## Reading list`; the catalog entry. The spec stays
`status: draft`.
