# EFPG-401 intake: register entries to append

Written by agent:evaluator on 2026-10-31 for the parent to append. The registers were not edited
in this run. Full record: `specs/content/efpg-401/intake/evaluation.md`.

## For specs/decisions/log.md

## D-2026-0077 - EFPG-401 intake: partition and residue approved; structure fails one determined repair; identity, coverage, outcomes and blueprint approved in part; catalog entry, 4+-topic formative counts, Unit 4 additions, readings and dated-media glosses escalated

- **Status:** pending-owner-review
- **Gate:** G0 intake / G1 unit-spec
- **Scope:** EFPG-401 (Teaching of English), `specs/content/efpg-401/content-spec.md` as bound in
  the manifest below. Settles the guide-determined parts listed under Decision; settles nothing
  under the five open gaps.
- **Decided by:** agent:evaluator, 2026-10-31
- **Decision:**
  1. **Identity (guide/Scheme agreement only).** The guide (`3rd 2026.txt:6-15`: EFPG-401, 3 credit
     hours, "Teaching of English (Major Pedagogy Course-I)", 3rd semester) and the revised Scheme
     (`B.Ed 4 Year 2026 revised after board.txt:190, 268-278`: Semester III row 6, EFPG-401,
     "Teaching of English", 3 (3-0), Major Pedagogy Course - I) agree; no Article II.3 conflict.
     The spec's proposed catalog entry (spec:12) matches both. The catalog entry itself does not
     exist and is not approved (`G-2026-175`).
  2. **Partition.** Seven units, one per numbered guide section in the guide's order, with Topic
     N.k teaching guide section N.k (1.1-1.4, 2.1-2.5, 3.1-3.6, 4.1, 5.1-5.7, 6.1-6.5, 7.1-7.2),
     and no week calendar, as the guide gives none.
  3. **Coverage.** Checklist rows U1-01 to U1-19, U2-01 to U2-05, U3-01 to U3-06, U4-01,
     U5-01 to U5-10, U6-01 to U6-05, U7-01 and U7-02 each trace to one guide line
     (`3rd 2026.txt:33-92`), every guide sub-topic line appears, and the 5.5/5.6 rows decompose
     exactly the conjuncts those guide lines name.
  4. **Outcomes.** SLOs 1-1, 1-2, 2-1, 2-2, 3-1, 3-2, 5-1, 5-2, 6-1, 6-2 and 7-1, and SLO 4-1 up to
     but not including "with its presentation and practice", trace to guide objectives 1-6
     (`3rd 2026.txt:19-27`); every objective has an SLO.
  5. **Blueprint.** The unit-end 10/10/5 bank, its Bloom bands and per-topic floors for all seven
     units; each unit's Analyze-or-higher summative item; the 60/40 default; and the formative
     line of Units 4 and 7.
  6. **Structure, in part.** Front matter valid against
     `contracts/content-spec-frontmatter.schema.json`; required sections present in the per-topic
     layout; Topic lists partition their checklists; figure plans meet the >= 2 per topic and
     >= 1 schematic per unit rules. The criterion as a whole is not approved:
     `check:no-answer-keys` exits 1 on the spec (see Limits).
  7. **Decision residue.** None: `D-2026-0070`, `D-2026-0072`, `D-2026-0012`, `D-2026-0003` and
     `D-2026-0001` were searched for across the whole spec.
  8. **Within-guide slips resolved** (no second document is in conflict, so these are resolvable
     here): (a) the docx list numbering renders the six listening sub-items (`:33-38`) as
     "1.1"-"1.6", colliding with topic numbers 1.1-1.4; by list level and by parallel with
     1.2.1-1.4.5 they are sub-items of 1.1, as the spec reads them; (b) objective 6 is split across
     two docx bullets, the second the fragment "As a foreign I second language" (`:26-27`); it is
     one objective, read "as a foreign or second language"; (c) "subject type test" (`:92`) is
     "subjective-type test", the pair of 7.1's objective-type test.
- **Basis:** `Scheme-and-Course-guides/extracted-text/3rd 2026.txt:1-117`, checked against
  `Scheme-and-Course-guides/3rd 2026.docx` (`word/document.xml`, `word/numbering.xml`); the
  revised Scheme lines above; `D-2026-0070` item 1 (confirmed, every course) for the partition;
  `D-2026-0012` (confirmed, corpus-wide) for the guide-silent week schedule; `D-2026-0072`
  (confirmed) for the one- and two-topic formative default; `specs/content/style-guide.md:225-252`
  for the blueprint. Deterministic checks (`check:no-em-dash`, `check:pipeline-gate`,
  `check:depth-gate`, `check:source-floor`, `check:figures`, `check:concept-graph`,
  `check:bloom-bands`, `check:map-sources`, `validate:content`) exit 0; all but
  `check:no-em-dash` are vacuous for this course, which has no units and no catalog entry.
  `check:no-answer-keys` exits 1, matching `/\bmarking\s*scheme\b/` in the spec.
- **Bound to:** `specs/content/efpg-401/intake/manifest.json` (commit `815d59fd`), manifest digest
  `e01cd60298df69ea071fac8da45e8e0c4cdb318b737e41457e278ab3c9cd4307`, recomputed with
  `manifestFor()` on 2026-10-31 (55 inputs, 0 mismatches). Any change to a bound input voids this
  approval.
- **Limits:** Not approved, and blocked until the named gap is ruled: the catalog entry and the
  `bilingual` flag (`G-2026-175`); the `**Assessment blueprint**` formative line of Units 1, 2, 3,
  5 and 6 (`G-2026-176`); checklist rows U4-02 and U4-03 and SLO 4-1's "with its presentation and
  practice" (`G-2026-177`); the `readings` criterion (`G-2026-178`); the parenthetical
  modern-equivalent glosses on U1-03, U1-04, U6-03 and U6-04 and figures fig-U6-5 and fig-U6-8
  insofar as they rest on them (`G-2026-179`). Determined author repairs, needing no ruling, are
  outstanding: replace the answer-key-pattern phrase with "rubric" in Unit 7's Key terms line,
  summative blueprint item and fig-U7-4 description (`content-spec.md:424, 426, 454`), so that
  `check:no-answer-keys` passes; add Lois Arthur to the Nolasco row; give Celce-Murcia its locator (Open Library
  OL16476622W, Newbury House 1991) and drop the false "not returned" note; reproduce Sheikh's
  imprint as printed ("Carvan Book House") or mark the change unverified; replace the spec's
  citation of `D-2026-0053` item 2 as the basis of the author-selected list with the style
  guide's open-access-substitute rule (`style-guide.md:287-293`). The spec may not move to
  `status: approved` on this decision; a fresh intake on a newly prepared manifest is required
  after the rulings and repairs. Certifies no content, qualifies no reviewer, authorises no
  publication.

## For specs/gaps.md

## G-2026-175 - EFPG-401 is not in `catalog/courses.json`; its entry and `bilingual` flag need an owner ruling

- **Status:** open
- **Gate:** G0 intake (identity criterion)
- **Source:** `D-2026-0077`
- **Detail:** The guide (`3rd 2026.txt:6-15`) and the revised Scheme (`B.Ed 4 Year 2026 revised
  after board.txt:268-278`) agree on EFPG-401, "Teaching of English", 3 (3-0), Major Pedagogy
  Course - I, Semester III, and the spec's proposed entry (`specs/content/efpg-401/content-spec.md:12`)
  matches them. But `catalog/courses.json` Semester 3 is empty, so the identity criterion, which
  reads the catalog, cannot be checked. Adding the entry changes a file every G2/G3 evidence
  manifest binds whole, which re-opens reviewed units corpus-wide. Separately, whether this course
  carries an Urdu mirror is not guide-determined: the course teaches the teaching of English, and
  GENG-301, an English-language course, is catalogued `"bilingual": false`.
- **Needed, and from whom:** the curriculum owner, to (a) authorise adding the EFPG-401 entry (and
  say when, given the manifest re-opening), and (b) say whether it is bilingual.
- **Blocks:** the identity criterion and the spec's move to `status: approved`. Nothing else.

## G-2026-176 - Units with four to seven topics: the formative item count is ruled by neither the style guide nor D-2026-0072

- **Status:** open
- **Gate:** G1 unit-spec (blueprint criterion)
- **Source:** `D-2026-0077`
- **Detail:** `specs/content/style-guide.md:227` sets "Formative: 5-8 items"; the per-topic floor
  (`:236-237`, enforced by the depth gate) requires >= 3 items per topic. `D-2026-0072` resolved
  the clash for three-topic units only and states it "Does not rule on units with four or more
  topics". Because `D-2026-0070` makes each guide section a topic, EFPG-401 has Units 1 (4 topics),
  2 and 6 (5), 3 (6) and 5 (7). The spec states 12, 15, 15, 18 and 21 formative items,
  "3 per topic (extends D-2026-0072 ...)" (`content-spec.md:89, 154, 372, 208, 307`). The
  extension may well be what the owner wants, but no bound input decides it. Other Semester 3
  specs following `D-2026-0070` are likely to raise the same question.
- **Needed, and from whom:** the curriculum owner (as owner of the style guide), to say whether
  `D-2026-0072`'s "3 per topic" extends to units of four or more topics, or what governs them.
- **Blocks:** the `**Assessment blueprint**` formative line of EFPG-401 Units 1, 2, 3, 5 and 6
  only.

## G-2026-177 - EFPG-401 Unit 4 derives two checklist rows under D-2026-0053 item 4, which is scoped to Semester 2

- **Status:** open
- **Gate:** G0 intake (coverage, outcomes)
- **Source:** `D-2026-0077`
- **Detail:** Guide section 4 has one line, "4.1. Functional approach towards grammar teaching"
  (`3rd 2026.txt:72`). The spec adds U4-02 "Presenting grammar inductively and deductively" and
  U4-03 "Practising grammar through meaningful tasks" (`content-spec.md:273-274`), each naming its
  derivation (objective 3, `:23`; `celce-murcia-1991`; `koca-2024-grammar`), and SLO 4-1 adds
  "with its presentation and practice" (`:263`). The rows comply with the form `D-2026-0053` item
  4 permits, but that decision's scope is the six Semester 2 courses. Applying it to a Semester 3
  course is a scope judgement, not something the guide settles.
- **Needed, and from whom:** the curriculum owner, to say whether `D-2026-0053` item 4 (derived
  sub-topics naming their outcome or reading) applies to EFPG-401, or corpus-wide.
- **Blocks:** rows U4-02 and U4-03 and SLO 4-1's "with its presentation and practice". U4-01 and
  the rest of Unit 4 are approved.

## G-2026-178 - EFPG-401 reading list: two guide-required books cannot be shown to exist, and Cook's edition is undetermined

- **Status:** open
- **Gate:** G0 intake (readings criterion)
- **Source:** `D-2026-0077`
- **Detail:** The guide lists five print books (`3rd 2026.txt:94-101`). Checked 2026-10-31:
  1. **Mohammad, T. (1998)**, *Modern Approaches to the Teaching of English as Second Language*,
     Lahore: Majeed Book Depot (`:96-97`): not found in Open Library by title, author or
     publisher. `D-2026-0001` covers a text that cannot be obtained, not a work that cannot be
     shown to exist (`G-2026-28`); the spec's "title-level support only" (`content-spec.md:43`)
     presumes the work is real.
  2. **Sheikh, N. A. (1998)**, *Teaching of English as a Second Language*, Lahore: "Carvan Book
     House" (`:101`): not found. The spec silently prints "Caravan" (`content-spec.md:46`).
  3. **Cook, V. (1991)**, "2nd ed." (`:95`): the work resolves (Open Library OL2943629W), but 1991
     is the first edition and the 2nd edition is 1996. The guide does not say which it means, and
     page-level citation differs between them.
  The other two entries resolve (Celce-Murcia 1991, OL16476622W; Nolasco & Arthur 1987,
  OL4682039W) and need only determined repairs, listed in `D-2026-0077`. The 13 author-selected
  open-access rows all resolve and are open access.
- **Needed, and from whom:** the curriculum owner, to (a) supply a resolvable record for Mohammad
  and Sheikh or direct that they be recorded unresolvable in the `D-2026-0010` / `G-2026-28`
  manner (guide-required, bibliographic level only, limit stated at point of use); and (b) say
  which Cook edition authors cite.
- **Blocks:** the readings criterion for EFPG-401. Authoring may not bind claims to Mohammad or
  Sheikh until ruled.

## G-2026-179 - EFPG-401: the guide's dated media (cassette player, video cassettes, VCR) are glossed with modern equivalents the guide does not name

- **Status:** open
- **Gate:** G0 intake (coverage)
- **Source:** `D-2026-0077`
- **Detail:** The guide names "Cassette-player" and "Video-Cassettes" for listening
  (`3rd 2026.txt:35-36`) and "Radio, Cassette player, Language Laboratory" and "Television, VCR,
  Movies" as AV aids (`:86-87`). The spec keeps these items and adds parenthetical readings:
  "(audio recordings)" U1-03, "(video)" U1-04, "(audio player)" U6-03, "(video)" U6-04
  (`content-spec.md:97-98, 380-381`), and plans figures on them (fig-U6-5 "radio, cassette
  player, mobile phone audio", `:407`; fig-U6-8 video sources, `:410`). The drafter's own note
  (`:467`) asks for owner confirmation. Whether units teach the named equipment, its present-day
  equivalent, or both is a scope reading the guide does not determine.
- **Needed, and from whom:** the curriculum owner, to say whether authors may teach the guide's
  media through their modern equivalents (and whether the obsolete equipment is still to be
  taught).
- **Blocks:** the parenthetical glosses on U1-03, U1-04, U6-03 and U6-04 and figures fig-U6-5 and
  fig-U6-8 insofar as they rest on them. The guide-worded rows themselves are approved.
