# EFMP-409 G0/G1 intake evaluation

- **Evaluator:** agent:evaluator (fresh session; did not draft this specification)
- **Date:** 2026-11-18
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (Constitution Article VII.8)
- **Specification:** `specs/content/efmp-409/content-spec.md` (384 lines, `status: draft`)
- **Bundle:** `specs/content/efmp-409/intake/manifest.json`, prepared at commit `7750c153`
- **Worktree:** `/home/a2ahs/crew-wt/sem4-intake-eval`, branch `content/sem4-intake-eval`, off
  `origin/main` at `fa80a282`
- **Outcome:** **partial.** Decision `D-2026-0089` (pending-owner-review) approves what the guide
  settles. Gaps `G-2026-211` to `G-2026-214` and `G-2026-224` to `G-2026-226` escalate the rest.
  Two author repairs are listed at the end; one of them is a summative below the style guide's
  floor.

## Manifest verification

Recomputed with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
`prepare-intake-evidence.mjs` root set, with `specs/content/efmp-409` as the course root:

- 56 bound inputs recorded, 56 recomputed, **0 mismatches**.
- `manifest_digest` recorded `105abe48bc08dc9cc0567fd93e2672c74e2427ee08acd98d0392c8339f994038`;
  recomputed from the file and from the live tree: identical.
- Registers matched their recorded read-time digests (`ceb73bf9...`, `18ab3a6b...`).

Any change to a bound input voids `D-2026-0089`.

## Criteria

Guide: `Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt`, EFMP-409 block `:410-538`;
source `Scheme-and-Course-guides/4TH SEMESTER.docx` (a bound input). Scheme: `B.Ed 4 Year 2026
revised after board.txt` (cited as `Scheme:N`).

### 1. identity - pass on the values; no catalog entry (`G-2026-211`)

- Guide: `EFMP-409`, "Foundations of Education" "(Major Professional)", credit hours `3`,
  semester 4th (`:412-420`).
- Scheme: Semester IV row 4, `EFMP-409`, "Foundations of Education", `3 (3-0)`, "Major:
  Professional Course - IX", **CD&I** (`Scheme:345-355`).
- Guide and Scheme agree. The proposed entry (`content-spec.md:14`) matches.
- **Author repair:** the spec quotes the Scheme row with department "PTGR" (`:10`). The Scheme
  says "CD&I". Department is not a catalog field, so this does not affect the criterion.
- The catalog has no EFMP-409 entry, and the `title_ur` "تعلیم کی بنیادیں" is the drafter's
  proposal. Escalated in `G-2026-211`.

### 2. partition - pass at unit level; topic partition and week reading escalated (`G-2026-224`)

- The guide names five units (`:434`, `:444`, `:454`, `:484`, `:498`). The spec has five units in
  the same order (`:94-100`), as `D-2026-0070` item 1 requires. **Approved.**
- Within-guide inconsistency, kept as printed: Unit 3 is headed "The history of education"
  (`:454`), but its items are schools of thought and educationists. The spec keeps the heading
  and adds a descriptive subtitle (drafting note 3). It resolves nothing against a second
  document, so no ruling is needed.
- **Topic partition and calendar: not guide-determined.** I read the `.docx` and confirmed the
  drafter's structural claim. Within each unit, the numbered list paragraphs are divided by empty
  numbered paragraphs into groups of three. There are 2 + 2 + 6 + 3 + 3 = **16 groups**.
  - The spec reads each group as a week and makes each group a topic.
  - The guide labels no week and numbers no section N.k. So whether a group is a week, and
    whether a topic should be a group or an item, are both readings, not text.
  - The reading leaves no review or examination week (drafting note 2).
  - It gives Unit 3 six topics.
  - Escalated as `G-2026-224`.

### 3. coverage - pass for the 48 guide items; three derived rows escalated (`G-2026-213`)

Checked with the gate's parsers and by hand:

| Unit | Guide lines | Guide rows |
|---|---|---|
| 1 | `:436-438`, `:440-442` | U1-01..06 |
| 2 | `:446-448`, `:450-452` | U2-01..03, U2-05..07 |
| 3 | `:456-458`, `:461-463`, `:466-468`, `:470-472`, `:475-477`, `:480-482` | U3-01..10, U3-12..18 |
| 4 | `:486-488`, `:490-492`, `:494-496` | U4-01..09 |
| 5 | `:500-502`, `:504-506`, `:508-510` | U5-01..09 |

- Every guide item appears once. U3-17 joins `:480` and `:481` (Western and Muslim scholars'
  views) in one row; it drops neither.
- Glosses add no sub-topic: U1-03 "(branches: ...)", U2-02 and U2-03 name the HEC perspectives,
  and U5-05 adds "(1959)".
- **U4-06 changes the guide's wording.** The guide's "A critical analysis of the Last Sermon"
  (`:492`) becomes "An analysis of the Last Sermon's educational principles" (drafting note 8).
  **U5-06** reads "the 1978-80 policy" (`:506`) as the National Education Policy 1979 (drafting
  note 6). Both are interpretive choices the guide does not make. Escalated in `G-2026-225`.
- **Additions.** Each is derived under `D-2026-0053` item 4, names an outcome and a licence row
  (`:48`, drafting note 5), and is escalated in `G-2026-213`:
  - U2-04 "The historical foundations of education": outcome 4, licence objective 5
    (`licence-blueprint.md:205`).
  - U3-11 "Dewey and the active-learning principle": outcome 3, CRQ 2 (`:292`).
  - U3-19 "Writing a personal teaching philosophy statement": outcome 2, CRQ 8 (`:298`).

  The licence mappings are real, but `D-2026-0053` is scoped to Semester 2.
- Ibn Khaldun under "pragmatism" (`:470-472`, drafting note 7): the guide row U3-12 is kept
  verbatim. How it is taught is an authoring matter, so no ruling is needed at intake beyond
  U3-11.

### 4. outcomes - pass, except the clauses that follow the derived rows

The five guide outcomes (`:426-430`) are quoted verbatim (`content-spec.md:23-27`). Every SLO
traces to them through its own unit's guide items: Unit 1 outcomes 1 and 2; Unit 2 outcome 1;
Unit 3 outcomes 2 and 3; Unit 4 outcome 1; Unit 5 outcomes 4 and 5. Two clauses follow
`G-2026-213`: SLO 3-2 names Dewey (U3-11), and SLO 3-3 "write a personal teaching philosophy"
(U3-19).

### 5. readings - escalated (`G-2026-212`, `G-2026-226`)

The guide's six books (`:514-519`) and two websites (`:522-523`):

| Line | Verified |
|---|---|
| `:514` Canestrari & Marlowe 2009 "Foundations of education ..." | Open Library holds Marlowe/Canestrari "Educational foundations" (2003 `OL17870002W`, 2010 `OL18807984W`). The printed title and year match no record. |
| `:515` Goldblatt & Smith 2005 | `OL21000007W` "Cases for Teacher Development", confirmed |
| `:516` Holt & Kysilka 2005 | `OL3060723W` "Instructional patterns", confirmed. The spec leaves it unbound as fitting no topic, which is a drafter judgement. |
| `:517` Murphy 2005 "Foundations: Introduction to Teaching" | The only match is `OL24163943W` "Videoworkshop for foundations/introduction to teaching", not a textbook |
| `:518` Provenzo 2005 | `OL18903624W` "Critical issues in education", confirmed; the spec records 2006 |
| `:519` Semel 2010 | `OL18636574W` "Foundations of education", confirmed |
| `:522` uwsp.edu URL | printed with broken spacing |
| `:523` sindheducation.govt.pk | a website, not a work |

- No guide entry treats Units 4 (Islamic perspectives) or 5 (Pakistani reports and policies);
  the spec says so too (`:60`).
- All the books are print-only, so `D-2026-0001` applies.
- Unresolved entries, the unbound guide entry and the uncovered units are escalated in
  `G-2026-226`.

**Author-selected rows:** `hec-2013-foundations` (HEC PDF HTTP 200, text bound as
`course-guides-2025/FoundationsEd_Sept13.txt`), the SEP entries (`education-philosophy` HTTP 200),
`quran-translation` (`quran.com/96` HTTP 200) and `iqbal-cyber-library` (HTTP 200) check out.
`gutenberg-primary` returned HTTP 503 on all three records today, which matches the spec's own
"recheck needed". Every unit maps an open-access row, but under `D-2026-0053` item 2 (`:56`),
which is scoped to Semester 2 (`G-2026-212`).

### 6. blueprint - pass except Unit 3's formative line and Unit 4's summative

- Two-topic Units 1 and 2 keep "5-8". Three-topic Units 4 and 5 state 9 (`D-2026-0072`).
  **Six-topic Unit 3 states 18** (`:202`), extending `D-2026-0072`. Escalated in `G-2026-214`.
- Unit 3's bank lowers the per-topic minimum to ">= 1 MCQ / >= 1 RRQ per topic" (`:262-263`).
  That is internally consistent: six topics fit in 10.
- **Unit 4 summative: fail (author repair, guide-independent).** "Summative includes one **Apply**
  item" (`:273`) is below `style-guide.md:228` (and Art. III.3): at least one Analyze-or-higher
  summative item. This is the same defect as GUHQ-301 Unit 2 under `D-2026-0080`.
- The other summatives are Analyze (Units 1, 2), Create (Unit 3) and Evaluate (Unit 5).
- ERQ lines sum to 5. Banks are 10/10/5 with the style guide's bands.
- Each topic plans 2 figures, and each unit has a schematic. Unit 4's figures are tables, a
  concept-map, a timeline and a diagram, with no depiction of a sacred person, as
  `D-2026-0081` item 3 requires.

### 7. structure - pass

- All 14 `CONTENT_GATES` exit 0 (tree-wide run on 2026-11-18; see
  `specs/content/gcce-400/intake/evaluation.md`, criterion 7).
- Front matter validates against `contracts/content-spec-frontmatter.schema.json`.
- Topic lists partition every checklist, topic cells match, depth-budget counts match, and every
  per-unit block is present.
- Figure IDs are unique and contiguous, and archetypes match the topic lists.

### 8. decision-residue - not approved (escalated)

| Entry | Status in the spec | Verdict |
|---|---|---|
| `D-2026-0070` item 1 | Followed at unit level; topics are unlabelled groups | Escalated, `G-2026-224` |
| `D-2026-0072` | Applied to Units 4 and 5; extended to six-topic Unit 3 | Escalated, `G-2026-214` |
| `D-2026-0053` items 2 and 4 | Relied on in Semester 4 | Escalated, `G-2026-212`, `G-2026-213` |
| `D-2026-0081` item 3 | Respected in the figure plan for Units 2-4 | No residue |
| `D-2026-0001`, `D-2026-0003`, `D-2026-0012` | No superseded design present | No residue |

## Out of scope, noted only

Drafting note 8 asks for scholar review of the Islamic material at G3, and drafting note 9 asks
for a link to EFMP-303 for Unit 5. Both are authoring and review matters.

## Blocked until the owner rules

| Gap | What it blocks |
|---|---|
| `G-2026-211` | the catalog entry |
| `G-2026-212` | the Author-selected table and `open_access_floor` as a binding floor |
| `G-2026-213` | U2-04, U3-11, U3-19 and the SLO clauses that name them |
| `G-2026-214` | the Unit 3 formative line |
| `G-2026-224` | every topic list and the week column, Units 1-5 |
| `G-2026-225` | U4-06 and U5-06 wording |
| `G-2026-226` | the Guide-listed table and the readings criterion |

**Author repairs, with no owner ruling needed:**

1. Unit 4 summative must name an Analyze-or-higher item (`:273`).
2. Correct the Scheme quotation's department to "CD&I" (`:10`).
