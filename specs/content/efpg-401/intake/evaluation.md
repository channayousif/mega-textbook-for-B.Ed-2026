# EFPG-401 G0 intake / G1 unit-spec evaluation

- **Evaluator:** agent:evaluator (fresh session; did not draft `specs/content/efpg-401/content-spec.md`)
- **Date:** 2026-10-31
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (Constitution Article VII.8)
- **Worktree / branch:** `/home/a2ahs/wt-sem3-intake`, `content/sem3-content-specs` (HEAD `d7aabb98`)
- **Bundle:** `specs/content/efpg-401/intake/manifest.json`, prepared at commit `815d59fd`
- **Recorded as:** decision `D-2026-0077` (pending-owner-review); gaps `G-2026-175` to `G-2026-179`
  (open). The entries to append are in `specs/content/efpg-401/intake/register-entries.md`; the
  registers themselves were not edited in this run.

## 1. Manifest verification (before any judgement)

`manifestFor()` from `scripts/lib/review-evidence.mjs` was re-run over the ten intake roots that
`scripts/prepare-intake-evidence.mjs` binds (`intakeRoots('efpg-401')`):

| Check | Result |
|---|---|
| Bound inputs recomputed | 55 |
| Per-file digest mismatches against `input_manifest` | 0 |
| `manifest_digest` recomputed from the live map | `e01cd60298df69ea071fac8da45e8e0c4cdb318b737e41457e278ab3c9cd4307` (matches) |
| `registers` (`specs/decisions/log.md`, `specs/gaps.md`) | both unchanged since preparation |
| Bound files changed between `815d59fd` and HEAD | none (only `intake/manifest.json` was added) |
| Skill copy in worktree equals the launching skill | identical |

Key digests this evaluation rests on:

- `specs/content/efpg-401/content-spec.md` `48dc4334f14f60102b084ed01ecbdf2152982b16d95663baf9e6fb9edc1bc8e1`
- `Scheme-and-Course-guides/3rd 2026.docx` `b48be210462e6517ee4ce5ff8840113d8c82e7f42df8a7a944eededf1ed2c82d`
- `Scheme-and-Course-guides/extracted-text/3rd 2026.txt` `a2fceaf32122c844af083ca9a9ca9555664a733ae86661d0943641bbfcbe819d`
- `Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt` `cc79bb0d1e8efde2a0f45a1882f3078029ae9a824b4ee09dca53934d0b59438c`
- `catalog/courses.json` `715b493fec67701dfb45e2ac65749c5fc9069161aadd27a8397a72d89c0874da`
- `specs/content/style-guide.md` `79f6cafc03b436c0e77c49ea658ef9a7a4de408b5c42020be39011a02a00dd7f`

Because the extracted text loses Word's automatic list numbering, the guide's source
`3rd 2026.docx` was also read directly (`word/document.xml` and `word/numbering.xml`). Its
paragraph text matches `3rd 2026.txt:1-117` line for line.

Locators below: `guide:N` is `Scheme-and-Course-guides/extracted-text/3rd 2026.txt` line N;
`scheme:N` is `.../B.Ed 4 Year 2026 revised after board.txt` line N; `spec:N` is
`specs/content/efpg-401/content-spec.md` line N; `sg:N` is `specs/content/style-guide.md` line N.

## 2. Drafting notes tested

| Note (spec:465-471) | Finding |
|---|---|
| 1. Units of 4-7 topics break two blueprint defaults | **Confirmed in part.** The formative clash is real and not ruled (`D-2026-0072` Limits: "Does not rule on units with four or more topics") -> `G-2026-176`. The MCQ/RRQ ">= 2 per topic" is a spec-set floor, not a style-guide rule (`sg:243-252` sets only exact 10/10/5 counts), so ">= 1 per topic" in Units 3 and 5 is a consistent self-set floor, not a defect. |
| 2. U4-02, U4-03 derived under `D-2026-0053` item 4 | **Confirmed, and the basis is out of scope.** `D-2026-0053` is scoped to six Semester 2 courses (log, its `**Scope:**` line). Extending item 4 to a Semester 3 course is a scope judgement -> `G-2026-177`. |
| 3. Modern equivalents in parentheses | **Confirmed.** The rows keep the guide's items; the parenthetical modern readings are not guide-given -> `G-2026-179`. |
| 4. Vocabulary and pronunciation repeated | **Confirmed; no defect.** The guide itself lists them twice (guide:41/44 and guide:60/61); each guide line maps to exactly one row. |
| 5. Word building under methods | **Confirmed; no defect.** Kept where the guide puts it (guide:69), as `D-2026-0070` item 1 requires. |
| 6. Reading list | **Confirmed and extended.** Two further defects the note does not name: Celce-Murcia *does* resolve (Open Library OL16476622W, Newbury House, 1991), so the row's "not returned" note is false; and Nolasco's *Conversation* is co-authored with Lois Arthur (Open Library edition ISBN 9780194370967, by-statement "Rob Nolasco & Lois Arthur."), which the row omits. See criterion 5. |
| 7. Objective 6 wording | **Confirmed, and it is a within-guide slip.** The docx carries "As a foreign I second language" as a separate seventh bullet, a fragment of objective 6. Resolved under `D-2026-0077`. |

## 3. Criteria

### 1. `identity` - **unverified as written; guide/Scheme agreement passes**

- Guide: course no. `EFPG-401` (guide:6-7), credit hours `3` (guide:8-9), title "Teaching of
  English (Major Pedagogy Course-I)" (guide:11-13), semester 3rd (guide:14-15).
- Scheme (final authority per `Scheme-and-Course-guides/extracted-text/README.md`): Semester III
  row 6, `EFPG-401`, "Teaching of English", `3 (3-0)`, "Major Pedagogy Course - I", CD&I
  (scheme:190, 268-278).
- The guide states the credit-hour total only; `3 (3-0)` is the Scheme's expression of the same
  total, as in `D-2026-0015`. No code, title, credit or semester conflict: **no Article II.3
  escalation arises.** The superseded `B.Ed (4-Year) 2025-2` scheme lists "EED-429 Teaching of
  English (Professional)" in Semester IV; the revised Scheme supersedes it and nothing binding
  depends on it.
- The spec's **proposed** entry (spec:12) - code `EFPG-401`, "Teaching of English", `3 (3-0)`,
  "Major: Pedagogy", Semester 3 - matches both documents. `title_ur` is not guide-given and is a
  terminology matter, not identity.
- **The catalog entry itself does not exist.** `catalog/courses.json` Semester 3 is an empty list
  (`semesters[2].courses == []`). The criterion as written ("the course code, title and credit
  hours in `catalog/courses.json` match...") therefore cannot be checked, and the `bilingual`
  question the spec leaves open is not guide-determined. Escalated: `G-2026-175`.
- Approved under `D-2026-0077`: the guide and Scheme agree, and the proposed entry's code, title,
  credit hours, category and semester match them. Not approved: the catalog entry.

### 2. `partition` - **pass**

The guide names seven numbered sections (guide:31, 56, 63, 71, 74, 83, 90) and no week table.
`D-2026-0070` item 1 (confirmed, scope "every course") requires one unit per guide section in
the guide's order, with Topic N.k teaching guide section N.k. The spec's Week schedule table
(spec:72-80) and unit headings follow that exactly: 7 units; topics 1.1-1.4, 2.1-2.5, 3.1-3.6,
4.1, 5.1-5.7, 6.1-6.5, 7.1-7.2. The partition is guide-determined, not a grouping judgement, so no
escalation. The guide carries no week numbers, and the spec records none (spec:70), as
`D-2026-0012` (confirmed, corpus-wide) permits.

**Within-guide numbering slip, resolved under `D-2026-0077`.** In `3rd 2026.docx` the heading
"Listening Comprehension Skills" (guide:32) is list `numId 2`, level 1, format `1.%2` -> "1.1",
but its six sub-items (guide:33-38) are list `numId 3`, level 1, format `1.%2`, start 1, so Word
numbers them "1.1" to "1.6", colliding with the topic numbers 1.1-1.4 (Speaking, Reading and
Writing are lists 4/5 at level 0, `1.%1`, starting 2 and 3 -> "1.2", "1.3", "1.4"). Their
indentation level and their parallel with 1.2.1-1.4.5 (guide:40-54) show they are sub-items of
1.1. The spec's reading (all six as Topic 1.1 rows U1-01 to U1-06, spec:95-100) is the only one
the guide's own structure supports. No second document is in conflict, so this is resolvable
here.

### 3. `coverage` - **pass for 49 of 50 rows; U4-02 and U4-03 escalated**

Every guide sub-topic line appears, mapped once:

| Guide lines | Spec rows |
|---|---|
| 33-38 (listening, 6 items) | U1-01 to U1-06 (spec:95-100) |
| 40-44 (1.2.1-1.2.5) | U1-07 to U1-11 (spec:101-105) |
| 46-48 (1.3.1-1.3.3) | U1-12 to U1-14 (spec:106-108) |
| 50-54 (1.4.1-1.4.5) | U1-15 to U1-19 (spec:109-113) |
| 57-61 (2.1-2.5) | U2-01 to U2-05 (spec:160-164) |
| 64-69 (3.1-3.6) | U3-01 to U3-06 (spec:214-219) |
| 72 (4.1) | U4-01 (spec:272) |
| 75-81 (5.1-5.7) | U5-01 to U5-10 (spec:313-322) |
| 84-88 (6.1-6.5) | U6-01 to U6-05 (spec:378-382) |
| 91-92 (7.1-7.2) | U7-01, U7-02 (spec:432-433) |

- Guide 5.5 (guide:79, "a Prose and Poetry lesson") and 5.6 (guide:80, "a Paragraph, a Story,
  and an Essay") are each decomposed into rows naming exactly the conjuncts the guide line names
  (U5-05/06, U5-07/08/09), all under the one topic. That is a faithful decomposition, not a
  duplication or an addition.
- "subject type test" (guide:92) read as "subjective-type" (U7-02) is a within-guide typographic
  slip (the objective/subjective pair at guide:91-92), resolved under `D-2026-0077`.
- The parenthetical modern equivalents on U1-03, U1-04, U6-03 and U6-04 sit beside the guide's
  wording, which is retained; the rows trace. Whether the gloss may direct what authors teach is
  escalated separately (`G-2026-179`) and does not fail coverage.
- **Additions:** U4-02 ("Presenting grammar inductively and deductively") and U4-03 ("Practising
  grammar through meaningful tasks") (spec:273-274) have no guide line. They name their derivation
  (objective 3, guide:23; `celce-murcia-1991`; `koca-2024-grammar`) under `D-2026-0053` item 4,
  but that ruling's scope is the six Semester 2 courses. Extending it is a scope judgement:
  `G-2026-177`.
- Mechanical checks (scripted parse of the spec): every unit's `### Topic list` `Sub-topic IDs`
  form a total, disjoint partition of its checklist; every checklist `Topic` cell agrees with the
  Topic list assignment (the `G-2026-91` cross-check, done by hand).

### 4. `outcomes` - **pass for 12 of 13 SLOs; SLO 4-1's qualifier blocked**

The guide states six objectives (guide:19-27). Docx shows objective 6 split across two bullets,
the second being the fragment "As a foreign I second language" (guide:27); the spec reproduces it
as one objective (spec:22). That is a within-guide slip with no second document in conflict,
resolved under `D-2026-0077` ("as a foreign or second language").

| SLO | Spec | Guide ancestor |
|---|---|---|
| 1-1, 1-2 | spec:86 | obj. 1-2 (guide:21-22); section 1 |
| 2-1, 2-2 | spec:151 | obj. 3-4 (guide:23-24); section 2 |
| 3-1, 3-2 | spec:205 | obj. 3 (guide:23); section 3 |
| 4-1 | spec:263 | obj. 3-4 (guide:23-24); section 4.1 (guide:72) for its core |
| 5-1, 5-2 | spec:304 | obj. 4 (guide:24); section 5 |
| 6-1, 6-2 | spec:369 | obj. 5 (guide:25); section 6 |
| 7-1 | spec:423 | obj. 6 (guide:26-27); section 7 |

Every objective has at least one SLO, and every SLO has an ancestor. SLO 4-1's "with its
presentation and practice" rests on the U4-02/U4-03 additions and is blocked by `G-2026-177`.

### 5. `readings` - **fail (escalation plus determined repairs)**

The guide's list is present (guide:94-101, five entries), reproduced at spec:36-46. All five are
print monographs. Resolution, checked on 2026-10-31:

| Guide entry | Resolves? | Finding |
|---|---|---|
| Cook (1991), *Second Language Learning and Language Teaching*, "2nd ed.", Arnold (guide:95) | **Yes**, Open Library OL2943629W (V. J. Cook; editions 1991 E. Arnold, 1996 2nd ed., 2001 3rd, 2008 4th) | The guide's year (1991) and edition (2nd = 1996) name different editions. Not determined which the guide means -> `G-2026-178`. Title-level support under `D-2026-0001` is appropriate for the text. |
| Mohammad, T. (1998), *Modern Approaches to the Teaching of English as Second Language*, Majeed Book Depot (guide:96-97) | **No** | Not in Open Library under title, author or publisher. Existence not shown. `D-2026-0001` covers unobtainable text, not a work not shown to exist (`G-2026-28`). -> `G-2026-178`. |
| "Murcia, M.C." (1991), *Teaching English as a Second Foreign Language*, 2nd ed., "New Bury House" (guide:98-99) | **Yes**, Open Library OL16476622W, *Teaching English as a Second or Foreign Language*, 1991, Newbury House | The spec row's note "Not returned by an Open Library search" (spec:44) is false; an author search returns it. **Repair:** add the locator and correct the note. |
| "Rob Nohand (1993)", *Conversation*, OUP (guide:100) | **Yes**, Open Library OL4682039W; edition ISBN 9780194370967 (OUP 1987, Resource Books for Teachers), by-statement "Rob Nolasco & Lois Arthur." | Identification as Nolasco is supported by title, publisher and forename. **Repair (misattribution):** the row (spec:45) cites Nolasco alone; the work is Nolasco & Arthur. `D-2026-0053` item 2 itself says misattributed entries must be corrected. |
| Sheikh, N. A. (1998), *Teaching of English as a Second Language*, "Carvan Book House" (guide:101) | **No** | Not found. The row silently changes the guide's "Carvan" to "Caravan" (spec:46), an unverified correction. -> `G-2026-178`; **repair:** reproduce the guide's imprint or mark the change as unverified. |

Author-selected open-access rows (spec:53-66): all 13 DOIs resolve on Crossref with matching
title, authors, year, venue, volume/issue/pages, and all 13 are `is_oa: true` on OpenAlex (12
gold/diamond, `yunus-2013-writing` hybrid). Crossref lists no authors for
`hussain-khan-2022-images`; OpenAlex W4311796338 gives Sajjad Hussain and Haji Karim Khan, as the
row states. The `Units` tags agree with every unit's `**Mapped readings**` line, and every unit
maps at least one open-access row, so the self-declared `open_access_floor: {default: 1}`
(spec:4-5) is satisfiable. Topically-related open-access sources are permitted by the style guide
itself (sg:287-293), so the author-selected list does not need `D-2026-0053` item 2; the spec's
citation of that Semester 2 ruling as its basis (spec:34, 50) is inaccurate but harmless.

Not approved: two guide-required entries are unresolvable and one has an undetermined edition
(`G-2026-178`), and two rows carry determined repairs.

### 6. `blueprint` - **pass except the formative line of Units 1, 2, 3, 5, 6 (escalated)**

Checked against `sg:225-252`:

- **Unit-end bank** (spec:142-145, 196-199, 254-257, 295-298, 360-363, 414-417, 456-459): every
  unit states MCQ 10 Remember-Apply, RRQ 10 Understand-Analyze, ERQ 5 Analyze-Evaluate/Create with
  >= 1 Analyze-or-higher rubric, matching `sg:247-250`. The self-set per-topic floors are
  achievable by their own counts: ">= 2 per topic" needs 8 (U1), 10 (U2, U6), 2 (U4), 4 (U7)
  of 10; ">= 1 per topic" needs 6 (U3) and 7 (U5) of 10; the ERQ spreads need at most 5 (U1:
  >= 3 topics + 1 integrative; U2/U6: 4 + 1; U7: 2 x 2 + 1; U4: 5 on one topic). No floor is
  breached by the spec's own items.
- **Summative**: each unit names one Analyze-or-higher item (U1 analyse, U2 compare, U3 Evaluate,
  U4 rewrite/Create, U5 Create, U6 Evaluate, U7 Create), satisfying `sg:228`. Weighting 60/40:
  the guide's criteria (guide:113-117) give no weights, so the Art. III.7 default applies
  (spec:25).
- **Formative**: Unit 4 (1 topic) and Unit 7 (2 topics) state "5-8", which the per-topic floor
  (>= 3 per topic, `sg:236-237`) permits and `D-2026-0072` leaves standing. Units 1 (4 topics,
  12 items), 2 and 6 (5, 15), 3 (6, 18) and 5 (7, 21) state "3 per topic", which breaches
  `sg:227` "5-8". `D-2026-0072` rules only for three-topic units and expressly not for four or
  more. The spec's "extends D-2026-0072" is a decision the bound inputs do not support ->
  `G-2026-176`.
- **Depth budgets and figures**: each unit's band exceeds the sum of its topic reading-minutes
  ranges (headroom for `index.mdx` and `unit-assessment.mdx`); every topic plans >= 2 figures and
  every unit plans >= 1 concept-map/flowchart; the 68 figure IDs are unique and the `**Figure
  plan**` archetypes and topics agree with the Topic list cells.

### 7. `structure` - **fail (one determined repair)**

- Front matter validates against `contracts/content-spec-frontmatter.schema.json` (Ajv 2020):
  `{"course_code":"EFPG-401","status":"draft","open_access_floor":{"default":1}}`, valid.
  `open_access_floor` is in the mapping form `check:source-floor` reads.
- Section set matches the approved per-topic layout (compared with
  `specs/content/gpks-402/content-spec.md`): Course-wide items, Course Description, Reading list
  (Guide-required / Author-selected), Week schedule (guide-silent, `D-2026-0012`), and per unit:
  CLO/SLO refs, Key terms, Topics, Assessment blueprint, `### Sub-topic checklist`,
  `### Topic list`, `**Depth budget**` (matches `scripts/lib/unit-depth.mjs:468`), Prerequisite
  knowledge, Common misconceptions, Mapped readings, Figure plan, Unit-end assessment blueprint.
- Deterministic checks, each run as `flock /tmp/mega-book-heavy.lock npm run -s <check>`:

| Command | Exit |
|---|---|
| `check:no-em-dash` | 0 |
| `check:pipeline-gate` | 0 |
| `check:depth-gate` | 0 |
| `check:source-floor` | 0 |
| `check:figures` | 0 |
| `check:concept-graph` | 0 |
| `check:bloom-bands` | 0 |
| `check:map-sources` | 0 |
| `validate:content` | 0 |
| `check:no-answer-keys` | **1** |

  Only `check:no-em-dash` and the front-matter validation actually exercise this spec. The other
  gates read authored units under `docs/` and a catalog entry, and EFPG-401 has neither, so their
  passes are vacuous for this course and are recorded as such, not as evidence.
- **Defect: `check:no-answer-keys` exits 1 on this spec.** It matches `/\bmarking\s*scheme\b/`
  in `specs/content/efpg-401/content-spec.md`, which uses the phrase three times, all in Unit 7:
  the Key terms line (spec:424), the Assessment blueprint's summative item (spec:426) and the
  fig-U7-4 figure description (spec:454). The gate scans `specs/content/` (only `style-guide.md`
  is excluded), and the phrase is permitted only inside a unit's bounded `## Answers and marking
  guidance` section (sg:218-222), so a spec may not carry it. **Repair (drafter, no ruling
  needed):** write "rubric" (or "analytic rubric") in all three places. The meaning is unchanged,
  and Unit 7's coverage, outcome and blueprint approvals do not depend on the wording.

### 8. `decision-residue` - **pass**

Confirmed decisions whose scope reaches EFPG-401 (corpus-wide or every course), with the whole
spec searched for each superseded design:

| Decision | Superseded design | Found? |
|---|---|---|
| `D-2026-0070` | grouping several guide chapters into one unit; guide link written into MDX | No: 7 units, one per section; the spec proposes no intro-page MDX link |
| `D-2026-0072` | "formative 5-8" on a three-topic unit | No three-topic unit exists; one/two-topic units keep 5-8 as the decision allows |
| `D-2026-0012` | an invented calendar presented as the guide's | No: spec:70 records the guide as silent |
| `D-2026-0003` | citing `.specify/Course_guides_and_Scheme/` as authority | No: only `Scheme-and-Course-guides/` is cited |
| `D-2026-0001` | using the flag for a work not shown to exist | No: invoked only for Cook (spec:42), which exists |

`D-2026-0053` is not in scope for this course (Semester 2 only), so its items are not residue
here; the spec's reliance on its item 4 is escalated as `G-2026-177`. No residue found.

## 4. Outcome

**Partial.** Approved under `D-2026-0077` (pending-owner-review): partition and decision residue
in full; identity as guide/Scheme/proposed-entry agreement; coverage for every
guide-anchored row; outcomes for 12 of 13 SLOs; the blueprint except the formative line of
Units 1, 2, 3, 5 and 6; structure except the one failing gate; and three within-guide slips (listening sub-item numbering, objective 6
split bullet, "subject type" for "subjective-type").

Escalated, open:

| Gap | Blocks |
|---|---|
| `G-2026-175` catalog entry absent; `bilingual` undecided | identity criterion; the spec cannot move to `status: approved` while the course is uncatalogued |
| `G-2026-176` formative count for 4-7-topic units | `**Assessment blueprint**` formative line of Units 1, 2, 3, 5, 6 |
| `G-2026-177` `D-2026-0053` item 4 applied outside its Semester 2 scope | U4-02, U4-03 and SLO 4-1's "with its presentation and practice" |
| `G-2026-178` two guide-required readings unresolvable; Cook edition undetermined | `readings` criterion |
| `G-2026-179` modern-equivalent glosses on dated media | the parentheticals on U1-03, U1-04, U6-03, U6-04 and the figure rows built on them (fig-U6-5 "mobile phone audio", fig-U6-8 video sources) |

Determined author repairs (no ruling needed), to be made before a fresh intake: replace the
phrase that trips `check:no-answer-keys` with "rubric" at spec:424, 426 and 454; add Lois Arthur
to the Nolasco row; give Celce-Murcia its Open Library locator (OL16476622W) and drop the false
"not returned" note; reproduce Sheikh's imprint as printed ("Carvan Book House") or flag the
change as unverified; correct the spec's citation of `D-2026-0053` item 2 as the basis of the
author-selected list (spec:34, 50) to the style guide's open-access-substitute rule (sg:287-293).

This evaluation certifies no content, qualifies no reviewer and authorises no publication. Every
approval binds to manifest digest `e01cd60298df69ea071fac8da45e8e0c4cdb318b737e41457e278ab3c9cd4307`;
any change to a bound input voids it.
