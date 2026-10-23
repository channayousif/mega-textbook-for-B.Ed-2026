# GPKS-402 · Pakistan Studies - Intake Evaluation (re-intake after the reading-list repair, 2026-10-23)

**Evaluator**: agent:evaluator (fresh session; did not draft the spec or the repair)
**Gates**: G0 intake / G1 unit-spec
**Date**: 2026-10-23
**Constitution**: Article VII.8
**Skill**: `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (bound digest `77ff2fa9...`)
**Spec under evaluation**: `specs/content/gpks-402/content-spec.md` (status: draft, 361 lines)
**Course guide**: `Scheme-and-Course-guides/extracted-text/2nd 2026.txt` (GPKS block, lines 972-1153)
**Prior intake**: `D-2026-0071` (bundle `intake-20261023/`, pending-owner-review). Void under
Art. VII.8.5: its bound input `content-spec.md` changed after its bundle (commits `81f4c4c9`
reading-list repair and `d4a3ad23` `D-2026-0072` blueprint wording). All eight criteria were
judged afresh on this bundle; no verdict of `D-2026-0071` is carried over unverified.
**Decision recorded**: `D-2026-0073` in `specs/decisions/log.md` (pending-owner-review)
**Escalations**: none

## Manifest verification

- Bundle: `specs/content/gpks-402/intake-20261023b/manifest.json`
- Manifest commit: `018451054f10b7b71a30b0d463099ddb0aa5c558`; bundle committed as `3ac8c6a4`
  (`git diff --stat 01845105 3ac8c6a4`: only the manifest itself added). Worktree clean before
  evaluation.
- Inputs bound: 59. Manifest digest:
  `68a2e2f824df346af047a966364d2f02859db27c3186b701e716c5afcce8b951`.
- Recomputed independently with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
  `intakeRoots('gpks-402')` set at `3ac8c6a4`: all 59 recorded paths present, 0 per-file digest
  mismatches, `digest(JSON.stringify(input_manifest))` reproduces the stored digest, and the
  recomputed map less the one extra path reproduces it too.
- One extra path in the recompute: the bundle's own `intake-20261023b/manifest.json`, committed
  after preparation. Not an input the decision rests on (same `bound()` behaviour `D-2026-0071`
  recorded as a tooling advisory: `intake-<suffix>/` is not excluded the way `/intake/` is).
- Registers (read, not freshness-bearing) matched at read time: `specs/decisions/log.md`
  `66604b26...`, `specs/gaps.md` `383dcc3b...`.
- Delta against the `D-2026-0071` bundle (`intake-20261023/manifest.json`): the only changed
  pre-existing input is `content-spec.md` (`0c04ba4b...` -> `e24f07b5...`); the two new paths are
  that intake's own record. Guide, Scheme, catalog, contracts, style guide, terminology,
  constitution, skill and agent file are byte-identical. The spec diff (`git diff 23c2f632
  01845105 -- specs/content/gpks-402/content-spec.md`) touches only the `## Reading list` tables
  (`:39`, `:41`, `:50-56`), the six `**Mapped readings**` lines and the Units 4 and 6
  `**Assessment blueprint**` lines (`:215`, `:317`).

## Deterministic checks (real exit codes, run at `3ac8c6a4`)

| Check | Exit | GPKS-402 findings |
|---|---|---|
| validate:content | 0 | none |
| check:pipeline-gate | 0 | none (no GPKS-402 unit under `docs/`) |
| check:depth-gate | 0 | none |
| check:figures | 0 | none |
| check:no-em-dash | 0 | none |
| check:no-answer-keys | 0 | none |
| check:concept-graph | 0 | none |
| check:bloom-bands | 0 | none (900 items, none GPKS-402) |
| check:source-floor | 0 | none; 63 units in 9 courses, **none GPKS-402** |
| check:licence | 0 | none |
| licence:map:check | 0 | none |
| check:content-status | **1** | `static/content-status.json` stale; not a bound input, no GPKS-402 line, unrelated to this spec |
| check:docs-sync | 0 | none |

Front matter validated separately against `contracts/content-spec-frontmatter.schema.json` with
Ajv 2020: valid (`course_code: GPKS-402`, `status: draft`, `open_access_floor: {default: 1}`).

As before, the exits are vacuous for GPKS-402: `docs/semester-2/gpks-402/` and its Urdu mirror hold
only `_category_.json` and `course-overview.mdx`, and the depth, Bloom, figure and source-floor
gates walk authored units. Readings and blueprint were therefore checked by hand, by external
lookups, and by a replay script over the spec's own tables. Replay result: in all six units the
`### Topic list` cells partition the checklist totally and disjointly and agree with every
checklist `Topic` cell; every topic has >= 2 figure-plan rows matching its Figures cell (id,
archetype, topic); every unit plans >= 1 concept-map/flowchart/timeline; every ERQ line sums to 5;
the `Guide ref` weeks per unit are 1-2 / 3-4 / 5-6 / 7, 8, 10 / 11-12 / 13-15.

## Criteria

### 1. identity - PASS

Guide `:980` "Course No. GPKS - 302 ... Credit Hours 2", `:982` "Course Title: Pakistan Studies ...
Semester 2nd". Revised board Scheme `B.Ed 4 Year 2026 revised after board.txt:90` (SEMESTER II) and
`:178-184` (`GPKS - 402 / Pakistan Studies / 2 (2-0) / General Education`). `catalog/courses.json`
Semester 2: `GPKS-402`, "Pakistan Studies", `2 (2-0)`, General Education. The code difference is
the guide-side slip adjudicated in `G-2026-03` (resolved, `specs/gaps.md:53-56`), which binds; no
new Article II.3 question. Spec `:10-12` states the same identity and cites `G-2026-03`.

### 2. partition - PASS (rests on owner rulings, not on the guide alone)

The guide gives a 16-week table with no unit headings (`:1008-1141`; mid-term `:1085`, review
`:1137-1141`). The six-unit grouping is not guide-determined; it was escalated as `G-2026-97` and
confirmed by the owner in `D-2026-0053` item 1, and `D-2026-0070` item 1 (confirmed) keeps the
GPKS-402 grouping because the guide is a bare week table. Guide-determined parts verified: every
checklist `Guide ref` is the guide's week; the partition uses contiguous weeks, reorders no guide
topic and splits no week; `## Week schedule` (`:60-67`) and the unit opening lines (`:210` Weeks
7-8 and 10 with the Week 9 mid-term; `:312` Weeks 13-15 with Week 16 review) agree with the guide;
schedule titles match the six `## Unit N` headings (`:69/115/161/208/263/310`). Unchanged since the
prior bundle.

### 3. coverage - PASS (row level)

Guide teaching bullets: 43 (`:1012-1135`). Spec checklist rows: 47 (6/6/7/11/7/10; `:82-87`,
`:128-133`, `:174-180`, `:221-231`, `:276-282`, `:323-332`). Each guide bullet maps exactly once:

| Guide week (lines) | Spec rows |
|---|---|
| W1 `:1010-1023` | U1-01, U1-02, U1-03 |
| W2 `:1025-1033` | U1-04, U1-05, U1-06 |
| W3 `:1035-1041` | U2-01, U2-02, U2-03 |
| W4 `:1043-1049` | U2-04, U2-05, U2-06 |
| W5 `:1051-1057` | U3-01; "Constitutions of 1956 and 1962" -> U3-02 + U3-03; U3-04 |
| W6 `:1059-1067` | U3-05, U3-06, U3-07 |
| W7 `:1069-1075` | U4-01; "Legislature, Executive, Judiciary" -> U4-02 + U4-03 + U4-04; U4-05 |
| W8 `:1077-1083` | U4-06, U4-07, U4-08 |
| W10 `:1087-1093` | U4-09, U4-10, U4-11 |
| W11 `:1095-1101` | "Agriculture, industry, and trade" -> U5-01 + U5-02; U5-03; U5-04 |
| W12 `:1103-1109` | U5-05, U5-06, U5-07 |
| W13 `:1111-1117` | U6-01, U6-02, U6-03 |
| W14 `:1119-1127` | U6-04, U6-05, U6-06, U6-07 |
| W15 `:1129-1135` | U6-08, U6-09, U6-10 |

The +4 rows decompose three compound bullets in the guide's own words. No row lacks a guide
ancestor; no row adds a sub-topic. Weeks 9 and 16 carry no teaching sub-topic in the guide. The
Week 16 course-review artefact remains unsettled, as `D-2026-0052` and `D-2026-0071` left it
(optional under the style guide). Glosses inside rows (`:177` U3-04 "the gap between 1956 and
1973"; `:278` U5-03 "poverty, inequality and debt", overlapping `:327` U6-05) remain advisories for
G3, as before.

### 4. outcomes - PASS (SLO 6-1 rests on an owner ruling)

Guide objectives `:996-1006` (five). Fourteen SLOs: Units 1-2 (`:73`, `:119`) -> obj 1, 2; Unit 3
(`:165`) -> obj 3; Unit 4 (`:212`) -> obj 3, 4; Unit 5 (`:267`) -> obj 4, 5; Unit 6 (`:314`) SLO 6-2
-> obj 4, SLO 6-3 -> obj 5. SLO 6-1 (foreign policy) has a guide ancestor in Week 13
(`:1111-1117`) but no objective names it; resolved by `D-2026-0053` item 4 (`G-2026-99`). No SLO
lacks a guide ancestor. Unchanged since the prior bundle.

### 5. readings - FAIL (two row corrections; determined by `D-2026-0053` item 2, no new owner question)

The guide's four entries (`:1143-1153`) are transcribed at spec `:39-42`. The policy is owner-ruled
(`D-2026-0053` item 2, resolving `G-2026-98`; applied in confirmed `D-2026-0066`): author-selected
verified works are allowed when labelled, and every unit binds >= 1 open-access source whose row
records a registry identity and a verification date. Every row the repair touched was re-checked
externally on 2026-10-23 (Crossref REST API, OpenAlex API, Unpaywall, publisher landing pages and
PDFs, figshare API, World Bank OKR item API, Open Library; none of these is a bound input):

| Key (spec line) | Exists, is the work described | Registry ID real | Locator | Finding |
|---|---|---|---|---|
| `durrani-dunne-2010` (`:50`) | Yes. Crossref: Durrani and Dunne, *Journal of Curriculum Studies* 42(2), 215-240, 2010 | OpenAlex `W2052051061` -> this DOI | DOI resolves to Taylor & Francis (paywalled; Crossref lists no licence). The stated **"open copy" (figshare 23374475) has no full text**: figshare API `is_metadata_record: true`, `files: []`; the Sussex record page states "Full text available: No", licence "Copyright not evaluated" | **Defect.** The row sits in the open-access table and calls a metadata-only record an open copy. OpenAlex and Unpaywall both mislabel it "green OA", so registry say-so is not enough here. The note's "Pakistan Studies teaching" also goes beyond the abstract, which studies the national curriculum in four NWFP state primary schools; the full text could not be read to confirm |
| `hassan-2020-two-nation` (`:51`) | Yes. Crossref: Mehreen Hassan, *AJSSMS* 7(2), 80-88, 2020 | OpenAlex `W3034006569` -> this DOI | DOI -> `asianonlinejournals.com/.../view/1568` (200); PDF downloads (200, application/pdf) | Verified |
| `khan-khan-2020-aligarh` (`:52`) | Yes. Crossref: Hina Khan, Maryam Urooj Khan, *JHSS* 11(1), University of Karachi, 2020; publisher page gives pp. 17-38 | OpenAlex `W3106934127` -> this DOI | DOI -> `jhss-uok.com/.../view/102`; page served to a browser, PDF link present, CC BY-SA 4.0 (plain curl gets 406, a bot block) | Verified. Advisory: the journal site carries injected third-party gambling links; link the DOI, not the site, in authored sources |
| `hussain-kokab-2012-18th` (`:53`) | Yes. Crossref: Mahboob Hussain, Rizwan Ullah Kokab, *Asian Social Science* 8(1), p81 | OpenAlex `W2127299016` -> this DOI | DOI -> `ccsenet.org/.../view/11145` (200); PDF downloads; DC.Rights CC BY 4.0 | Verified. Advisory: Crossref, OpenAlex and the publisher date it 2011-12-30 (online); the row's "2012" matches the volume 8 issue year |
| `worldbank-pdu-2025` (`:54`) | Yes. Crossref: World Bank, *Pakistan Development Update, October 2025: Staying the Course for Growth and Jobs*, 2025-10-31 | OpenAlex `W7172064073` -> this DOI | DOI and handle both resolve to the OKR item (200) | **Defect (minor).** The row states "CC BY 3.0 IGO"; the OKR item records `dc.rights` "CC BY-NC 3.0 IGO" (`creativecommons.org/licenses/by-nc/3.0/igo`; OpenAlex `cc-by-nc`). Still open access |
| `khan-2015-foreign-policy` (`:55`) | Yes. Crossref: Dr. Raja Muhammad Khan, *Journal of Contemporary Studies* 4(1), 14-30, NDU Islamabad, 2015 | OpenAlex `W3208096173` -> this DOI | DOI -> `jcs.ndu.edu.pk/.../view/74` (200); PDF downloads | Verified |
| `pak-constitution-1973` (`:56`) | Yes | None claimed ("primary text, not in a scholarly registry"), correctly | `na.gov.pk/uploads/documents/1333523681_951.pdf` -> 200, application/pdf, 222 pages; title page "THE CONSTITUTION OF THE ISLAMIC REPUBLIC OF PAKISTAN [As modified upto the 28th February, 2012] NATIONAL ASSEMBLY OF PAKISTAN" | Verified as described. Advisory: this edition predates later amendments, including those affecting the judiciary; the Unit 4 author should check U4-04 against the current text |
| `hamid-khan-const` (`:41`) | Yes | n/a (print) | ISBN 9780199407828: Open Library edition of work `OL5862007W` (OUP); Mary Martin Booksellers' Nov 2019 list gives "Third Edition. Karachi: Oxford University Press, 2019 ... 9780199407828" | Verified; the prior ISBN advisory is closed |
| `hec-pak-studies` (`:39`) | Ambiguous in the guide itself | n/a | none | Now flagged title-level under `D-2026-0001`, "no unit relies on it for a specific claim". This is the repair `D-2026-0071` named as acceptable; accepted |
| `burki-fifty-years` (`:42`), `rabbani-pak-studies` (`:40`) | Unchanged; resolve as previously recorded (Open Library ISBN 9780813336213, Westview 3rd ed. 1999; Caravan Book House) | n/a | print | Verified |

Floor and alignment, checked mechanically: the Units column equals the set of `**Mapped readings**`
lines for all eleven keys (`:39-56` against `:102`, `:148`, `:195`, `:247`, `:297`, `:348`). Every
unit maps at least one registry-verified source that is genuinely open access even with
`durrani-dunne-2010` set aside: Unit 1 `hassan-2020-two-nation`; Unit 2 `hassan-2020-two-nation`,
`khan-khan-2020-aligarh`; Units 3 and 4 `hussain-kokab-2012-18th`; Unit 5 `worldbank-pdu-2025`;
Unit 6 `khan-2015-foreign-policy`. All six prior locator defects named by `D-2026-0071` are gone
(the five government rows removed, the Constitution locator replaced).

Why this still fails: `D-2026-0053` item 2 requires that misattributed entries be corrected, and
`check:source-floor` counts any sources row naming a registry and a date
(`scripts/check-source-floor.mjs:40-41`, `:75-76`). As written, `durrani-dunne-2010` would let a
Unit 1 or Unit 6 author bind a source they cannot read and have the gate count it as open access.
The repair is cheap and determined; no owner question arises.

**Repair (author):** for `durrani-dunne-2010`, either name a locator that actually serves the full
text, or move the row out of the open-access table and mark it paywalled (title-level under
`D-2026-0001` unless a copy is obtained), and restate the note to what the work demonstrably covers;
for `worldbank-pdu-2025`, correct the licence to CC BY-NC 3.0 IGO.

### 6. blueprint - PASS

Per unit: summative >= 1 Analyze-or-higher, 60/40 default (`style-guide.md:227-229`); unit-end MCQ
10 (Remember-Apply, >= 2 per topic), RRQ 10 (Understand-Analyze, >= 2 per topic), ERQ 5
(Analyze-Evaluate/Create, >= 1 rubric Analyze-or-higher) (`style-guide.md:247-250`). ERQ lines sum
to 5 in every unit (`:113`, `:159`, `:206`, `:308`: 2 per topic + 1; `:261`, `:361`: 1 per topic + 2).
Per-topic MCQ/RRQ minimums fit inside 10 (max 6 for three topics). Formative: the two-topic Units 1,
2, 3 and 5 state "5-8" (`:76`, `:122`, `:168`, `:270`), which the per-topic floor of >= 3 items per
topic (`style-guide.md:236-237`) meets at 6-8. The three-topic Units 4 and 6 now state "formative 9
items, 3 per topic (D-2026-0072)" (`:215`, `:317`), the form the confirmed owner ruling
`D-2026-0072` prescribes; that resolves `G-2026-154` and the line is consistent with the gate floor
(3 x 3 = 9). No floor the spec sets is breached by its own items.

### 7. structure - PASS

Front matter conforms to `contracts/content-spec-frontmatter.schema.json` (Ajv 2020, valid);
`course_code` matches the folder; `status: draft`; the floor uses the mapping form `D-2026-0053`
item 2 requires. Present and parseable: Course-wide items (`:14`), Course Description (`:27`),
Reading list (`:31`) with guide-required and author-selected tables, Week schedule (`:58`), and for
each unit the CLO/SLO refs, key terms, topics, assessment blueprint, `### Sub-topic checklist` with
`Topic` column, `### Topic list`, `**Depth budget**`, prerequisites, misconceptions, mapped
readings, figure plan and unit-end blueprint. `validate:content` exit 0. Advisory (unchanged): the
header source range (`:10` "lines 979-1156") is a few lines off the guide block (`:972-1153`); a
stray leading space in a Unit 1 misconception (`:100` `" ideology and religion..."`).

### 8. decision-residue - PASS

Confirmed decisions whose scope reaches GPKS-402; the whole spec searched for each superseded design:

- `G-2026-03`: "GPKS - 302" appears only in the code note (`:12`); no "Semester IV" or `semester-4`.
  No residue.
- `D-2026-0003`: no `.specify/Course_guides` reference. No residue.
- `D-2026-0052` (confirmed): its named author repairs are all made. The last one outstanding at
  `D-2026-0071`, the Units-column inconsistency, is repaired: all eleven keys agree with the mapped
  lines. No `goe-bloom`, `ziad`, "fifty decades", "Curated-supplementary" or old week labels.
- `D-2026-0053` items 1, 2, 4, 5: grouping kept; floor declared in mapping form, no bare
  `open_access_floor: 1`; SLO 6-1 trace as ruled; no authored GPKS-402 unit under `docs/` or the
  Urdu mirror. The six entries `D-2026-0071` found unresolvable or misattributed are gone from the
  whole spec (`pbs-pak-stats`, `sbp-annual`, `mofa-foreign-policy`, `unesco-pak-education`,
  `na-lahore-resolution` no longer occur; `1973_constitution.pdf` and ISBN `9780199060986` survive
  only inside the replacement notes at `:56` and `:41`, which record what was replaced). The new
  `durrani-dunne-2010` defect is new, not residue, and is reported under readings.
- `D-2026-0070` item 1: grouping kept for a bare week table; item 3 is satisfied outside the spec.
  No residue.
- `D-2026-0072` (confirmed 2026-10-23): applied at `:215` and `:317`. "formative 5-8" survives only
  in the two-topic Units 1, 2, 3 and 5 (`:76`, `:122`, `:168`, `:270`), which the ruling expressly
  leaves on the default. No residue.

`D-2026-0071` is pending-owner-review, not confirmed, so it is not a residue source; its named
repairs are nonetheless checked above.

## Outcome

`D-2026-0073` approves identity, partition, coverage, outcomes, blueprint, structure and decision
residue for all six units, at pending-owner-review, bound to manifest digest
`68a2e2f824df346af047a966364d2f02859db27c3186b701e716c5afcce8b951`. Readings fail on two row
corrections that `D-2026-0053` item 2 already determines (`durrani-dunne-2010` open-copy claim,
`worldbank-pdu-2025` licence). Nothing is escalated; no `G-` entry is opened.

`D-2026-0073` supersedes `D-2026-0071`, which is void under Art. VII.8.5 because `content-spec.md`
changed after its bundle. `D-2026-0071` is not edited.

The spec stays `status: draft`. Confirming `D-2026-0073` does not let it move to `approved`: the
readings repair changes `content-spec.md`, which voids this decision. After the repair a fresh
bundle is needed, and that intake may limit itself to the two reading-list rows plus a fresh
decision-residue search if every other bound input is byte-identical (the `D-2026-0066` pattern).
Certifies no content, qualifies no reviewer, authorises no publication (Art. VII.8.4).
