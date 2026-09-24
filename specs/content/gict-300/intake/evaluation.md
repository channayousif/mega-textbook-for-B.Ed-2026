# GICT-300 (Application of ICT) - G0 intake / G1 unit-spec evaluation

- **Evaluator:** agent:evaluator, 2026-09-23. Fresh session; this evaluator did not draft the
  specification under evaluation and sought out no drafting context.
- **Gates:** G0 intake / G1 unit-spec (Constitution Art. VII.8; skill `evaluate-intake` v1.0.0).
- **Spec under evaluation:** `specs/content/gict-300/content-spec.md`, `status: draft`, bound
  digest `c544fd51b6e0c5b6389b6b8f8832cecc1a5a542c7ae2d2a193ab7084fceab1ab`.
- **Bound bundle:** `specs/content/gict-300/intake/manifest.json`, manifest digest
  `50960500ee7effa5b56c57be3c52a4816ee4c5f21fda29ded8ecaf66c39e901f`, **54 inputs** at commit
  `73001c11e29e4f7cd1733091f976d31aaaf9081d`.
- **Outcome:** approved under **D-2026-0030** (pending-owner-review), with one escalation,
  **G-2026-25** (the derived week calendar). The spec's `status` moves `draft` to `approved`
  per the mechanism the spec itself states at `content-spec.md:15-17`.

## Manifest verification

Recomputed independently with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
same `intakeRoots('gict-300')` root set `scripts/prepare-intake-evidence.mjs` uses:

- `input_manifest`: all 54 paths and digests match, no extra and no missing entry.
- `manifest_digest` (`sha256` of the JSON of the map): reproduced from both the file's map and
  a fresh read from disk.
- `registers` (`specs/decisions/log.md`, `specs/gaps.md` at read time): match.
- Working tree at HEAD `73001c11` is clean apart from the untracked
  `specs/content/gict-300/intake/` directory itself, which `bound()` excludes, so the
  evaluator's own record cannot invalidate the bundle (the `G-2026-15` fix).

A raw SHA-256 of `.mdx` bytes would appear to mismatch because `normalized()` rewrites the
`translation_status` front-matter line before hashing; no `.mdx` input is affected here and no
tampering is present.

## Deterministic checks (real exit codes at HEAD `73001c11`)

| Command | Exit | GICT-300 findings |
|---|---|---|
| `npm run validate:content` | 1 | none. 13 errors, all in `docs/semester-1/geng-300/unit-01/` (another course, pre-existing at this commit). GICT-300 contributes no authored unit; this script validates unit MDX, not content-spec front matter. |
| `npm run check:no-em-dash` | 1 | none. 9 occurrences, all in `specs/content/geng-300/intake/evaluation.md` (the previous evaluator's own record). The GICT-300 spec is clean. |
| `npm run check:source-floor` | 1 | one, expected at intake: "GICT-300 Unit 1: declares a floor of 2 but has no sources/unit-01.md". Per-unit sources are authored with units, not at intake; the walked `unit-01` is the `coming_soon: true` navigation scaffold from the initial platform commit, not authored content. Non-blocking. |
| `npm run check:depth-gate` | 1 | none (all findings GENG-300 Unit 1; no GICT-300 unit is authored, so the gate is vacuous for this course). |
| `npm run check:figures` | 1 | none (GENG-300 Unit 1). |
| `npm run check:no-answer-keys` | 1 | none (GENG-300 Unit 1). |
| `npm run check:docs-sync` | 0 | - |
| `npm run check:bloom-bands` | 0 | vacuous for GICT-300: the spec declares no bands in the format the gate parses (see repair item (a)). |
| `npm run check:concept-graph` | 0 | - |
| `npm run check:pipeline-gate` | 1 | none (GENG-300 Unit 1: no tasks.md). |

Every failing finding in this tree belongs to GENG-300 (its authored unit and the prior
evaluator's em-dashed record), none to GICT-300. A green or red gate here is mostly evidence
about other courses; it is recorded rather than cited as a pass.

**Spec-side invariant replay.** Because the docs-walking gates are vacuous for this spec, the
spec-side invariants were replayed directly against the bound spec using the depth gate's own
parsers (`unitSectionLines`, `parseTopicList`, pipe-table parsing), reproducing
`scripts/lib/unit-depth.mjs`'s checks. Across all six units, zero failures on: checklist ID
grammar (`^U<n>-\d{2,}$`) and uniqueness; `### Topic list` `Sub-topic IDs` forming a total,
disjoint partition of the checklist (no unassigned ID, no ID in two rows, no ID absent from
the checklist); every checklist `Topic` cell equal to a `### Topic list` row label; every
`**Depth budget**` sub-topic and topic count matching its own tables; every topic planning at
least two figure IDs; every unit planning at least one concept-map, flowchart or timeline
(Art. III.10); figure IDs consistent between topic lists and figure plans (46 figures). One
advisory inconsistency found, recorded as repair item (b).

## 1. Identity - PASS

- Code **GICT-300**: guide `1st 2026.txt:374` ("Course No. GICT-300"), scheme
  `B.Ed 4 Year 2026 revised after board.txt:54`, catalog `catalog/courses.json:24`. Agree.
- Title: guide `:381-382` "Applications of Information and Communication Technology (ICT)";
  scheme `:56` "Application of Information Communication & Technologies(ICT)"; catalog `:25`
  "Application of ICT". These are one course name at different levels of abbreviation, not
  three names. The catalog title is the name the owner confirmed in the **G-2026-01** Sem I
  inventory ("GICT-300 Application of ICT"), which binds; the spec uses it (`:9`, `:11`).
- Credit hours: guide `:384-387` states `Credit Hours 3` with no split; scheme `:58` states
  `3 (2-1)`; catalog `:27` records `3 (2-1)`. A total and a split of that total do not
  contradict each other, so there is **no Article II.3 conflict to escalate** - the posture
  G-2026-02, G-2026-05 and D-2026-0015.1 already established. The spec's precedence note at
  `:28-32` records this correctly.
- Semester/category: guide `:379`, `:385` (B. Ed. 04 Year, Semester: 1st); catalog semester 1,
  General Education. The spec's `:11` matches.
- Bilingual: the catalog carries no `bilingual` field for GICT-300; the platform default is
  bilingual (`validate-content.mjs:138-146`, `course-overview.schema.json:42-45`), matching the
  spec's `bilingual: true` and "full Urdu mirror owed" (`:4`, `:11`). GENG-300's explicit
  `false` is the exception pattern; the guide is silent on language and the default governs.
- **D-2026-0003** (confirmed, corpus-wide, all eight files in `.specify/Course_guides_and_Scheme/`)
  covers this course's file in that folder (`Applications of Information and Communication
  Technology (ICT).pdf`, bound in the manifest): a superseded departmental variant set, never
  authoritative. The spec cites the Faculty guide as its source (`:12-13`) and records the
  supersession at `:31-32`. Correctly applied.

## 2. Partition - PASS (units); calendar ESCALATED (G-2026-25)

The guide numbers **six units** at `1st 2026.txt:416`, `:447`, `:459`, `:469`, `:481`, `:491`.
The spec follows them 1:1 under the guide's own verbatim titles (spec `:84`, `:145`, `:206`,
`:265`, `:323`, `:375`): Introduction to Computer Literacy and ICT; Computer Hardware and
Software Fundamentals; Operating System Concepts; Cyber security and Data Protection; Ethical
and Responsible Use of ICT; Internet Applications and Emerging Technologies. The guide gives
numbered units, not a week table, so the partition is guide-determined and is approved.

The **calendar is not guide-determined**: the guide carries no week table and no term length,
the revised board Scheme contains the word "week" nowhere (0 matches), and the spec's 16-week
3/3/2/3/2/3 distribution rests on a pedagogical judgement ("sub-topic count and cognitive
demand", `:69-73`). The section conforms to **D-2026-0012** as to form (derived, clearly
labelled, basis stated), and that ruling reserves the substance to this gate; following the
G-2026-16 precedent for EFMP-304, the substance is escalated as **G-2026-25**, not approved.
Blocked with it: the `## Week schedule` table and the "Weeks N-M (derived)" line opening each
unit subsection (`:86`, `:147`, `:208`, `:267`, `:325`, `:377`).

Topic grouping within units (including Unit 6's interleaved 6.3/6.4 grouping) is Spec 008
authoring structure, gated only by the total/disjoint invariant, which passes; the guide is
silent on topics and the contract makes them the author's.

## 3. Coverage - PASS

The guide enumerates **31 sub-topic bullets**: Unit 1 six (`:418-428`), Unit 2 five
(`:449-457`), Unit 3 four (`:461-467`), Unit 4 five (`:471-479`), Unit 5 four (`:483-489`),
Unit 6 seven (`:493-505`). The spec's six checklists carry **40 rows** (8 + 8 + 6 + 6 + 4 + 8).

Verified mechanically (guide refs parsed from every checklist row): all 31 distinct guide
bullets appear, none dropped; the 9 extra rows decompose compound bullets whose components the
guide's own text names:

| Guide bullet | Rows | Basis in the guide's own text |
|---|---|---|
| U1 b3 "Evolution and generations of computers" (`:422`) | U1-03, U1-04 | "Evolution **and** generations" |
| U1 b4 "Classification of computers" (`:424`) | U1-05, U1-06 | the two axes the guide's own CLO 2 names: "Classify computers based on **functionality and size**" (`:400`) |
| U2 b1 "Input, output, and storage devices" (`:449`) | U2-01..U2-03 | three named device classes |
| U2 b2 "Primary and secondary memory" (`:451`) | U2-04, U2-05 | "Primary **and** secondary" |
| U3 b1 "Functions and types of operating systems" (`:461`) | U3-01, U3-02 | "Functions **and** types" |
| U3 b2 "File and process management" (`:463`) | U3-03, U3-04 | "File **and** process" |
| U4 b1 "Cyber threats and online security" (`:471`) | U4-01, U4-02 | "threats **and** online security" |
| U6 b1 "Web browsers and search engines" (`:493`) | U6-01, U6-02 | "browsers **and** search engines" |

That is 9 exactly (31 + 9 = 40). **No row sits under a bare guide heading with no textual
ancestor**, which is what separates this course from the EFMP-302 finding recorded as
G-2026-08. The spec's own derivation count ("31 guide sub-topic bullets", `:72`) is accurate -
none of the miscounted-derivation-note defects from G-2026-08 recur. Minor glosses inside
guide-derived rows (U5-02 "(netiquette)", U6-02 "and effective searching", U2-05 "and the
storage hierarchy") stay inside their bullets' scope and add no new sub-topic.

## 4. Outcomes - PASS

The guide's eight Learning Outcomes (`:398-412`) are reproduced **verbatim** at `:48-55`
(compared line by line). Unit traces: Unit 1 to CLOs 1, 2 (`:88-89`); Unit 2 to CLO 3
(`:149`); Unit 3 to CLO 4 (`:210`); Unit 4 to CLO 5 (`:269`); Unit 5 to CLO 6 (`:327`); Unit 6
to CLOs 7, 8 (`:379`).

Every CLO has at least one unit whose **guide topics** deliver it: CLO 1 from U1 bullets 1-2;
CLO 2 from U1 bullet 4; CLO 3 from U2; CLO 4 from U3; CLO 5 from U4; CLO 6 from U5; CLO 7 from
U6 bullets 1-3; CLO 8 from U6 bullets 4-7. No SLO lacks a guide ancestor, no CLO is orphaned,
and no unit claims a CLO its guide topics cannot deliver - the G-2026-10 failure mode is
absent. Unit 1's parenthetical "(and 8's societal-impact thread where it touches the
internet's impact)" (`:88-89`) is a secondary hedge, disclosed as such; CLO 8's primary
delivery is Unit 6, so the trace cannot read as falsely satisfied. Recorded, not blocking.

Teaching strategies (`:57-58`) and practical work (`:60-61`) reproduce the guide's lists at
`:507-527` faithfully.

## 5. Readings - PASS

The guide's **Recommended Books / References** (`:530-538`) lists five entries. All five are
present in the spec's `### Guide-required` table (`:448-452`) with citations matching the
guide, and **each resolves to a real work**:

| Key | Work | Resolves |
|---|---|---|
| shellyVermaat | Shelly & Vermaat, Discovering Computers, Cengage | yes (canonical textbook, many editions) |
| norton | Norton, Introduction to Computers, McGraw-Hill | yes (canonical textbook) |
| stairReynolds | Stair & Reynolds, Principles of Information Systems, Cengage | yes (canonical textbook) |
| laudonLaudon | Laudon & Laudon, Management Information Systems, Pearson | yes (canonical textbook) |
| hecICT | HEC Pakistan, ICT and Digital Literacy Guidelines | yes: HEC's published ICT and Digital Literacy Policy/Guidelines line at hec.gov.pk (checked externally on 2026-09-23; an external registry, not a bound input, same footing as the EFMP-304 run's Open Library check) |

All five are print monographs or official publications with no open-access text: noted as
D-2026-0001 (confirmed, corpus-wide) requires, each binds the author to **title-level,
bibliographic support only**, and the spec states this at `:439-452` and in every unit's
`**Mapped readings**` line.

The spec's mitigation is the D-2026-0013 pattern: a 13-entry curated open-access list
(`:454-471`, all real and resolvable; the two unesdoc entries carry the known HTTP-403 flag
per D-2026-0001) and a declared `open_access_floor: default: 2` (`:5-6`, `:473-476`), which
`scripts/check-source-floor.mjs` enforces mechanically at G2 (the G-2026-17 fix). Every unit
maps at least two open-access candidates (U1: 4, U2: 2, U3: 2, U4: 4, U5: 5, U6: 6), so the
floor is satisfiable from the spec's own mapping. The floor is approved under D-2026-0030 as
an application of D-2026-0013's confirmed pattern to the exact condition that ruling names (a
print-only guide list), at numbers at or above every confirmed precedent (EFMP-304's owner-ruled
2/2/2/1/1/1; GENG-300's evaluator-approved 1/1/1 under D-2026-0019). D-2026-0013 expressly did
not set a corpus-wide floor; the adoption is flagged for the owner inside the pending-owner-
review decision entry, and the GENG-300 precedent (D-2026-0019) approved a floor declaration
on the same footing without escalation.

## 6. Blueprint - PASS (two repair items, non-blocking)

- **Item counts**: all six unit-end blueprints carry the fixed 10 MCQ / 10 RRQ / 5 ERQ bank
  that `specs/content/style-guide.md:227-230` fixes. Checked at `:141-143`, `:202-204`,
  `:261-263`, `:320-321`, `:372-373`, `:432-434`.
- **Per-topic minimums**: ">= 2 MCQ and >= 2 RRQ per topic" resolves to 8 of 10 on the five
  four-topic units and 6 of 10 on Unit 5's three topics - never above the bank. "One ERQ per
  topic plus an integrative item" resolves to exactly 5 on four-topic units; Unit 5's ">= 1
  ERQ per topic plus an integrative item" floors at 4 of 5. No floor the spec sets would be
  breached by its own items in any unit.
- **Analyze-or-higher**: every unit's blueprint names an integrative ERQ demanding analysis
  (ICT impact on a named school/workplace; hardware/software choice under a budget; comparing
  two operating systems; a security-improvement plan; a plagiarism case analysis; an emerging
  technology's fit for a Pakistani school), and every unit's `**Assessment blueprint**` bullet
  states "summative includes one Analyze-or-higher item".
- **Bloom bands**: the spec states none; the style guide's defaults (MCQ Remember to Apply,
  RRQ Understand to Analyze, ERQ Analyze to Evaluate/Create) govern - the posture D-2026-0019
  approved for GENG-300. See repair item (a) for the enforcement consequence.
- **Weighting**: the guide carries no assessment-criteria table (verified: the block runs from
  Recommended Books at `:530-538` directly to the next course at `:546`), so the Constitution
  Art. III.7 default 60/40 at `:63-65` is the correct fallback.
- **Course review plan**: 24 MCQs / 18 RRQs / 12 ERQs (4/3/2 per unit, arithmetic checks) at
  `:498-499`; `style-guide.md:234-235` fixes no count for `course-review.mdx`. Permitted.

## 7. Structure - PASS

- Front matter validates against `contracts/content-spec-frontmatter.schema.json`:
  `course_code: GICT-300` matches the parent folder and the pattern; `status: draft` is in the
  enum; `bilingual` and `open_access_floor` are permitted additional properties.
- Every required course-level section is present: `## Course-wide items` (`:44`), `## Course
  Description` (`:34`), `## Reading list` with both `### Guide-required` and
  `### Curated-supplementary (open access)` (`:436`, `:444`, `:454`), `## Week schedule`
  (`:67`, conforming to D-2026-0012 as to form), `## Standards & frameworks anchors` (`:478`),
  and the v3 addition `## Course review plan` (`:492`). Section order follows the
  GENG-300/EED-313 family (Reading list after the unit sections); no gate parses course-level
  order, and two owner-reviewed specs share the shape.
- Each of the six unit subsections carries the full block set: CLO refs, Key terms, Topics,
  Worked-example / activity concepts, Assessment blueprint, `### Sub-topic checklist`,
  `### Topic list`, `**Depth budget**`, Common misconceptions, Mapped readings, Figure plan,
  Unit-end assessment blueprint.
- Spec-side invariants replayed with the depth gate's own parsers: **zero failures** across
  all six units (see the replay section above).
- The guide-silence note (`:19-26`) correctly states what the guide carries and lacks; the
  Course Description (`:36-42`) paraphrases the guide's `:389-395` with the locator cited,
  within Art. III.5 quoting limits.

## 8. Decision residue - PASS

All `confirmed` entries in `specs/decisions/log.md` were swept against the **whole**
specification, not only the sections their scope lines name:

- **D-2026-0001** (corpus-wide): invoked at `:128-129`, `:190-191`, `:248-249`, `:308`,
  `:362`, `:420-421`, `:440-452` for title-level support, within its Limits.
- **D-2026-0002 / D-2026-0004** (EFMP-302, superseded one-term PD plan): appears nowhere. The
  spec's only "one-page" wording (`:509`) is its own emerging-technology briefing practicum,
  an unrelated activity. The five practicum briefs (`:500-510`) are all GICT-300's own.
- **D-2026-0003**: correctly applied to this course's file in the superseded folder (`:31-32`).
- **D-2026-0005** (two-cycle repair limit): not evaded; the spec assumes no review cycles.
- **D-2026-0012**: applied in the body (`:19-26`, `:67-73`), not merely cited.
- **D-2026-0013**: applied as disclosed precedent (`:473-476`); no EFMP-304-specific design
  (pendrey2022 method-only scoping, 2/1 floor split) is copied beyond what fits this course.
- **D-2026-0014**: introduces nothing; this evaluation authorises no publication.
- Corpus-wide keyword sweep for cross-course residue ("one-term", "PD plan", "ways to continue
  developing", EFMP-302/304 authors and designs, EED-313/GENG-300 patterns): clean; the only
  cross-course mention is the disclosed precedent citation at `:474`.

## Repair items (authoring corrections; no owner decision needed; none blocking)

- **(a) The Bloom-band gate will be vacuous for this course.** The six unit-end blueprint
  lines are condensed prose ("10 MCQ / 10 RRQ / 5 ERQ, >= 2 MCQ and >= 2 RRQ per topic, one
  ERQ per topic plus an integrative item..."), a format `scripts/check-bloom-bands.mjs` cannot
  parse (`specBands()` looks for `- MCQs (10): <band>` lines), and the spec states no Bloom
  bands anywhere. Once units are authored, the gate that catches band breaches at G2 will
  check zero GICT-300 items - the exact defect class that gate was built to end. Rewrite the
  six blocks in the contract's bullet format with the style guide's default bands (EFMP-304's
  post-gate shape, `content-spec-v3.md`'s own example) **before any unit is authored**. This
  matters more than usual because GICT-300 is one of D-2026-0014's 15 catalogued courses and
  can publish gate-checked with no reviewer. The same defect is live for GENG-300's authored
  Unit 1 and EED-313 Units 2-4; reported to the parent, not decided here.
- **(b) Unit 1's reading-min bands are inconsistent with its own unit band by one minute.**
  The topic Reading-min bands (10-14, 10-14, 8-12, 10-14) sum to 38-54; the unit band is
  55-75 (`:122` vs `:117-120`). The gated sum (`check-unit-depth.mjs` FR-016) includes
  `index.mdx` and `unit-assessment.mdx` minutes, so the budget remains satisfiable, but an
  author following the topic bands at their ceiling lands one minute below the unit floor.
  The Reading-min column is advisory ("not gated; guidance"); align one of the two before
  authoring Unit 1.

## Overall verdict

Seven of the eight criteria pass on guide-determined substance, and the eighth (partition)
passes for the unit list while its calendar half is escalated. The specification is a faithful
derivation of the GICT-300 course guide: identity matches the guide, the Scheme and the
adjudicated catalog; the six-unit partition follows the guide's numbered units; all 31 guide
sub-topics are covered with nothing added that lacks a guide ancestor; the eight outcomes are
traceable; the five guide readings are present, resolvable and correctly bound to title-level
support; the blueprints and structure conform to the bound style guide and contracts; and no
superseded decision design survives anywhere in the spec. The single escalation (G-2026-25) is
the derived 16-week calendar, which no bound input determines. Approved under D-2026-0030 at
pending-owner-review; `status` set to `approved` per the spec's own `:15-17`. This approves no
content, qualifies no reviewer, and authorises no publication (Art. VII.8.4).
