# GCCE-400 G0/G1 intake evaluation

- **Evaluator:** agent:evaluator (fresh session; did not draft this specification)
- **Date:** 2026-11-18
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (Constitution Article VII.8)
- **Specification:** `specs/content/gcce-400/content-spec.md` (439 lines, `status: draft`)
- **Bundle:** `specs/content/gcce-400/intake/manifest.json`, prepared at commit `7750c153`
- **Worktree:** `/home/a2ahs/crew-wt/sem4-intake-eval`, branch `content/sem4-intake-eval`, off
  `origin/main` at `fa80a282` (merge of PR #646)
- **Outcome:** **partial.** Decision `D-2026-0086` (pending-owner-review) approves what the guide
  settles. Gaps `G-2026-211` to `G-2026-218` escalate what it does not. Two author repairs are
  listed at the end. The spec cannot move to `status: approved` until the gaps are ruled and the
  repairs are made.

## Manifest verification

Recomputed with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
`prepare-intake-evidence.mjs` root set (`specs/content/gcce-400`, `contracts`,
`catalog/courses.json`, `specs/content/style-guide.md`, `specs/content/terminology.csv`,
`.specify/memory/constitution.md`, `Scheme-and-Course-guides`, `.specify/Course_guides_and_Scheme`,
`.claude/skills/evaluate-intake`, `.claude/agents/evaluator.md`):

- 56 bound inputs recorded, 56 recomputed from the live tree, **0 mismatches**.
- `manifest_digest` recorded `73a59c967d0d61c11eaecd1c6877ef6c4dc81fe38081d73f03fe81cd2c362aa0`;
  recomputed from the file's `input_manifest` and from the live tree: identical.
- Registers (`specs/decisions/log.md` `ceb73bf9...`, `specs/gaps.md` `18ab3a6b...`) matched their
  recorded read-time digests before this evaluation wrote to them.

Every verdict below rests on that digest. Any change to a bound input voids `D-2026-0086`.

## Criteria

Guide: `Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt` (cited as `:N`), GCCE-400 block
`:101-192`. Scheme: `Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt`
(cited as `Scheme:N`).

### 1. identity - pass on the values; the catalog entry does not exist (escalated, `G-2026-211`)

- Guide: title "Civics and Community Engagement" (`:104`), `GCCE-400`, credit hours `2 (1-1)`
  (`:105`), semester 4th (`:106`).
- Scheme: Semester IV row 1, `GCCE– 400`, "Civics and Community Engagement", `2 (1-1)`, General
  Education, EC&EE (`Scheme:309-319`).
- Guide and Scheme agree on every field. No Article II.3 conflict.
- The spec's proposed entry (`content-spec.md:14`) matches them.
- **The catalog entry does not exist.** `catalog/courses.json` Semester 4 lists only `EFMP-408`.
  The criterion reads the catalog, so it cannot pass in full. The `title_ur`
  "شہریات اور سماجی شمولیت" is the drafter's own proposal (`:14`). Escalated in `G-2026-211`.
- **Author repair (factual, guide-determined).** The spec's identity paragraph (`:12`) and
  drafting note 1 (`:431`) say the extracted guide block "gives no code, credit or title line of
  its own" and that `:101-109` "open straight into the description". That is false. Lines
  `:104-106` carry the title, code, credit hours and semester, and they agree with the Scheme. The
  spec should cite them.

### 2. partition - pass at unit level; topic partition escalated (`G-2026-215`)

- The guide names seven units (`:116`, `:128`, `:138`, `:145`, `:154`, `:159`, `:164`) over Weeks
  1-3, 4-5, 6-7, 8-9, 10, 11 and 12. The spec's seven units and `## Week schedule` (`:82-90`)
  follow them in order, as `D-2026-0070` item 1 requires. **Approved.**
- Guide Unit 3 is headed "Right and Responsibilities" (`:138`). The spec's "Rights and
  Responsibilities" is typographic normalisation, not a change of meaning.
- **Topic partition: not guide-determined. Escalated.** The guide's numbered sections are numbered
  by **week**, not by unit (2.1-2.3 sit in Week 2 of Unit 1; 10.1-10.3 in Week 10 of Unit 5), and
  Weeks 1, 8 and 9 are unnumbered (`:118-120`, `:147-149`, `:151-153`). So "Topic N.k teaches guide
  section N.k" (`D-2026-0070` item 1, `log.md:3805-3808`) cannot apply literally.
  - The spec uses a hybrid (`:80`, drafting note 4 `:434`): one topic per **week** in Units 1-4,
    one topic per numbered **section** in Units 5-7.
  - This gives units of 3, 2, 2, 2, 3, 3 and 4 topics.
  - A uniform reading either way gives different counts: one topic per section everywhere gives
    8, 6, 4, 6, 3, 3 and 4 (with unnumbered items numbered by position); one topic per week
    everywhere gives 3, 2, 2, 2, 1, 1 and 1.
  - The owner accepted weeks-as-topics for GUHQ-301 (`G-2026-206`, resolved under `D-2026-0080`),
    but that ruling approved one spec as drafted. It is not a corpus-wide rule, and it did not
    address a hybrid. The choice is a scope judgement about an owner ruling.
- **Calendar: escalated (`G-2026-216`).** The guide schedules Weeks 1-12 only. Weeks 13-16 are not
  in it. The spec invents nothing for them (drafting note 2, `:432`). Whether they carry content,
  practical work or nothing is not guide-determined.

### 3. coverage - pass, except one derived row (escalated, `G-2026-213`)

Each guide schedule item appears exactly once in a checklist. Replayed with the gate's own parsers
(`unitSectionLines`, `tableAfterHeading`, `parsePipeTable`) and checked by hand against the guide
text:

| Unit | Guide lines | Rows | Notes |
|---|---|---|---|
| 1 | `:118-120`, `:122-124`, `:126-127` | U1-01..08 | Week 1 unnumbered |
| 2 | `:130-132`, `:134-136` | U2-01..06 | |
| 3 | `:140-141`, `:143-144` | U3-01..04 | |
| 4 | `:147-149`, `:151-153` | U4-01..06 | U4-07 derived, see below |
| 5 | `:156-158` | U5-01..03 | |
| 6 | `:161-163` | U6-01..03 | |
| 7 | `:166-169` | U7-01..04 | |

That is 34 guide rows. Wording is faithful. Glosses add no sub-topic: U2-02 "(federal,
provincial, local)", U4-06 "(Orangi Pilot Project)" names the case it will use, and U6-03 drops
the garbled "and Responsible" of `:163`.

- **U4-07 is an addition.** "The school as a community institution: school-community relationship
  and parental involvement" has no guide line. The spec derives it under `D-2026-0053` item 4 from
  outcome 2 and the licence blueprint (`:40`, `:252`, drafting note 5 `:435`).
  - The blueprint mapping is real: `specs/content/licence-blueprint.md:100`, `:274`, `:279` (row
    E-3 "Relationship between school and community", `GCCE-400`) and `:300` (CRQ 10, `GCCE-400`).
  - But `D-2026-0053` is scoped to Semester 2 (`log.md:2541`). The owner accepted the same
    reliance for EFPG-401 (`G-2026-177`) by approving that spec as drafted, not by extending the
    ruling.
  - A blueprint mapping at "course-level" also does not, by its own terms, require a checklist
    row. Escalated in `G-2026-213`.
- The four "suggested practical activities (optional)" (`:170-176`) carry no row and are routed to
  `## Practical work plan` (`:423-425`). That is the guide's own label: optional, course-level
  practical work. Approved.

### 4. outcomes - pass, except the clause that follows U4-07

The guide's three outcomes (`:112-114`) are reproduced verbatim (`content-spec.md:20-23`). Each SLO
restates its own unit's guide items:

| SLO | Traces to |
|---|---|
| 1-1, 1-2, 1-3, 2-1, 2-2, 3-1, 3-2 | outcome 1 |
| 4-1, 4-2 | outcome 2 |
| 5-1, 5-2, 5-3 | outcomes 1 and 2 |
| 6-1, 6-2, 6-3 | outcomes 1 and 3 |
| 7-1 to 7-4 | outcome 3 |

The last clause of SLO 4-2, "explain how school and community support each other" (`:237`), is
U4-07's outcome. It stands or falls with `G-2026-213`.

### 5. readings - escalated (`G-2026-212`, `G-2026-218`)

The guide prints seven entries (`:179-185`).

| Line | Entry | Verified |
|---|---|---|
| `:179` | "Civics Today: citizenship, Economics, & You", McGraw-Hill | Real (Glencoe/McGraw-Hill). The guide names no edition. It is a United States school text. |
| `:180` | Kymlicka and Norman, "Citizenship in Diverse Societies" | Open Library `OL26777716W` "Citizenship in Diverse Societies", confirmed |
| `:181` | Youniss and Levine, "Engaging Youth in Civic Life" | Open Library `OL18582528W` resolves under a different title, "Engaging young people in civic life" |
| `:182` | Mattson, "Digital Citizenship in Action ..." | Open Library `OL20201564W`, confirmed |
| `:183` | Pike and Selby, "Globalization and Citizenship ..." | Open Library search: 0 results |
| `:184` | Feldpausch and Omilian, "Community Engagement: Principles, Strategies, and Practices" | Open Library search: 0 results |
| `:185` | Clarke and Steckel, "Creating Social Change ..." | Open Library search: 0 results |

- Three of seven guide entries cannot be shown to exist. The spec leaves them unbound (`:60-62`)
  and reads `D-2026-0001` as not applying to them. That reading is correct: `D-2026-0001` covers
  a source whose text cannot be obtained, not a work that cannot be identified. Which works the
  guide intends is a question for the owner (`G-2026-218`).
- All four real entries are print-only. Under `D-2026-0001` they support title-level citation only.

**Author-selected open-access rows: verified where a registry reaches them.**

| Key | Verified as |
|---|---|
| `ahmad-2004-cice` | Crossref `10.52214/cice.v7i1.11389`: Iftikhar Ahmad, CICE, 2004; OpenAlex `W77321979`, diamond |
| `batool-2019-civil-society` | Crossref `10.47264/idea.lassij/3.1.8`: Batool et al., LASSIJ, 2019; OpenAlex `W3163863933`, gold |
| `hasan-2006-orangi` | Crossref `10.1177/0956247806069626`: Hasan, Environment and Urbanization, 2006; OpenAlex `W2159484449`, bronze |
| `shair-2022-digital-divide` | Crossref `10.52223/jei4032206`: Shair et al., Journal of Economic Impact, 2022; OpenAlex `W4313326066`, diamond |
| `unesco-2015-gced` | Crossref `10.54675/DRHC3544`: "Global citizenship education: topics and learning objectives", 2015 |
| `dean-2005-citizenship` | OpenAlex `W137269803`, 2005, green; eCommons URL HTTP 200 |
| `openstax-sociology-3e` | URL HTTP 200 |
| `constitution-pakistan`, `coe-2019-dce` | Not reachable from this host on 2026-11-18: `na.gov.pk` timed out, `rm.coe.int` returned 403. This is not a defect at G0/G1, because `D-2026-0001` governs retrieval at authoring. |

Every unit maps at least one open-access row, and the `Units` column agrees with each unit's
`**Mapped readings**` line.

**The basis for authoring against author-selected sources is outside its scope.** The spec rests
its open-access floor and author-selected rows on `D-2026-0053` item 2 (`:48`, drafting note 9
`:439`). That ruling is scoped to Semester 2 (`log.md:2541`). The owner accepted the same reliance
for the six Semester 3 courses by approving each spec as drafted (`D-2026-0075` to `D-2026-0080`,
owner ruling 2026-11-02, "for Semester 3"). No ruling reaches Semester 4. Escalated in `G-2026-212`.

### 6. blueprint - pass except the Unit 7 formative line and the weighting clause

**Consistent and conformant with `style-guide.md:226-250` and `:513-514`:**

- Unit-end banks are 10/10/5 with the style guide's Bloom bands (`style-guide.md:247-250`) in every
  unit.
- MCQ and RRQ ">= 2 per topic" fits within 10 for every topic count (at most 4 topics).
- ERQ lines sum to 5: "2 per topic plus 1 integrative" in the two-topic Units 2-4; "at least 1 per
  topic plus integrative" in the three-topic Units 1, 5 and 6; Unit 7 spreads 5 over 4 topics with
  at least one integrative.
- Formative: Units 2-4 (two topics) keep "5-8"; Units 1, 5 and 6 (three topics) state 9, applying
  `D-2026-0072`.
- Every per-unit summative names an Analyze-or-higher item: Analyze in Units 1 and 3, Evaluate in
  Units 2 and 6, Create in Units 4, 5 and 7.
- Every topic plans 2-3 figures, and every unit has a concept-map, flowchart or timeline.
- Each unit's topic reading-minute ranges sit inside its `**Depth budget**` band, which also
  covers the index and assessment files (`style-guide.md:303-305`, `:345`).

**Unit 7 formative: escalated (`G-2026-214`).** "Formative 12 items, 3 per topic" (`:380`) is
internally consistent with the per-topic floor (`style-guide.md:237`). But it exceeds "5-8"
(`:227`), and `D-2026-0072` "does not rule on units with four or more topics" (`log.md:3922`). The
spec cites the EFPG-401 and GUHQ-301 approvals; those approved two specs as drafted and set no
rule.

**Weighting: escalated (`G-2026-217`).** Every unit says "Weighting: 60/40 default", and the spec
says the guide gives "no weighting" (`:26`). The guide does give one: participation 10,
reflection papers 10, mid-term essay 30 and final paper 50 marks (`:187-192`). Which of those
components count as formative and which as summative is not guide-determined. The guide's
"philosophical topic" and "philosophical concepts" (`:190-191`) are also out of place in a civics
course (drafting note 3, `:433`).

### 7. structure - pass

**Deterministic checks.** Each `CONTENT_GATES` entry (`scripts/lib/gates.mjs:22-37`) run serially
as `npm run -s <check>` from the worktree on 2026-11-18:

| Check | Exit |
|---|---|
| `validate:content` | 0 |
| `check:pipeline-gate` | 0 |
| `check:depth-gate` | 0 |
| `check:figures` | 0 |
| `check:svg-style` | 0 |
| `check:no-em-dash` | 0 |
| `check:no-answer-keys` | 0 |
| `check:concept-graph` | 0 |
| `check:bloom-bands` | 0 |
| `check:source-floor` | 0 |
| `check:licence` | 0 |
| `licence:map:check` | 0 |
| `check:content-status` | 1 on first run, then **0** |
| `check:docs-sync` | 0 |

`check:content-status` first failed with "static/content-status.json is missing". That file is
gitignored (`.gitignore:18`) and generated, so a fresh worktree lacks it. After
`npm run -s build:content-status` the check exits 0. No finding concerns GCCE-400. Every gate that
walks `docs/` is vacuous here, because no unit is authored.

**Spec-side invariants, replayed directly:**

- Front matter `{course_code: GCCE-400, status: draft, open_access_floor: {default: 1}}` validates
  against `contracts/content-spec-frontmatter.schema.json` (ajv 2020).
- In all seven units, the `### Topic list` `Sub-topic IDs` partition the checklist totally and
  disjointly. Every checklist `Topic` cell equals its topic-list row.
- Every `**Depth budget**` sub-topic and topic count matches its tables.
- Every per-unit block is present: CLO/SLO refs, Key terms, Topics, Assessment blueprint,
  checklist, topic list, Depth budget, Prerequisite knowledge, Common misconceptions, Mapped
  readings, Figure plan and Unit-end assessment blueprint.
- Figure IDs are unique and contiguous (`fig-U<n>-1..k`). Each figure-plan archetype matches its
  topic-list cell.

**Recommendations, not defects against a bound contract** (as in `D-2026-0043`(d)):
`**Worked-examples plan**` and `**International best-practice notes**` lines and a
`## Course review plan` are absent; the Guide-listed table has no `DOI/URL` column.

### 8. decision-residue - not approved (escalated)

Confirmed entries whose scope touches this course, searched across the whole specification:

| Entry | Status in the spec | Verdict |
|---|---|---|
| `D-2026-0070` item 1 (every course) | Followed at unit level. The topic level is a week/section hybrid throughout `## Week schedule`, every `**Topics**` line and every `### Topic list`. | Escalated, `G-2026-215` |
| `D-2026-0072` (corpus-wide) | Applied correctly to Units 1, 5 and 6. Extended to Unit 7 (`:380`), outside its stated limit. | Escalated, `G-2026-214` |
| `D-2026-0053` item 2 (Semester 2) | Relied on for a Semester 4 course (`:48`). | Escalated, `G-2026-212` |
| `D-2026-0053` item 4 (Semester 2) | Relied on for U4-07 (`:252`). | Escalated, `G-2026-213` |
| `D-2026-0001` | Cited correctly: not stretched to works that cannot be identified (`:61`). | No residue |
| `D-2026-0003`, `D-2026-0012` | No reliance on `.specify/Course_guides_and_Scheme/`. A week table exists, so `D-2026-0012` is not needed. | No residue |
| `D-2026-0081` | Governs raster illustrations at authoring. The spec's figure plan is schematic only and plans no sacred figure. | No residue |

## Out of scope, noted only

Drafting note 8 (`:438`) sets a handling rule for sensitive content in Units 5 and 7. That is an
authoring and G3 matter, so I make no ruling on it.

## Blocked until the owner rules

| Gap | What it blocks |
|---|---|
| `G-2026-211` | the catalog entry, and with it any authored unit |
| `G-2026-212` | the Author-selected table and `open_access_floor` as a binding floor |
| `G-2026-213` | U4-07, the last clause of SLO 4-2, and Topic 4.2's composition |
| `G-2026-214` | the Unit 7 formative line |
| `G-2026-215` | every `### Topic list`, the `## Week schedule` topic column and every per-topic figure plan, reading-minute band and bank distribution, Units 1-7 |
| `G-2026-216` | Weeks 13-16 of the calendar (nothing in the spec as drafted) |
| `G-2026-217` | the "Weighting" clause of every unit's blueprint and the spec's assessment-criteria line (`:26`) |
| `G-2026-218` | the Guide-listed table and the readings criterion |

**Author repairs, with no owner ruling needed:**

1. Correct `:12` and drafting note 1 (`:431`): the guide gives title, code, credit hours and
   semester at `:104-106`, in agreement with the Scheme.
2. Correct `:26`: the guide does give marks (10/10/30/50, `:187-192`). How they map to
   formative and summative waits on `G-2026-217`.
