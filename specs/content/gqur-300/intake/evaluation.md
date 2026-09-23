# GQUR-300 Intake Evaluation (re-evaluation after repair)

- **Evaluator:** agent:evaluator, 2026-09-23 (fresh session; did not draft this spec)
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0, Constitution Article VII.8
- **Decision recorded:** `D-2026-0041` (pending-owner-review) in `specs/decisions/log.md`
- **Bundle:** `specs/content/gqur-300/intake/manifest.json`, manifest digest
  `4acaa8f34ee767a924610174fd2a9c2e63a0ae3b8aa3fc623978a7fb65a782da`, 54 inputs at commit
  `139876c5c19f9c8ef093eb2c57b25ce4e2462e5a`
- **Prior cycle:** `D-2026-0040` (bound to `ffd1f6f`, voided by the repair) and `G-2026-28` (open)

## Manifest verification

Recomputed independently with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the same
`intakeRoots('gqur-300')` root set `prepare-intake-evidence.mjs` uses. Every path and every digest
matched, with no extra and no missing entry; the recorded `manifest_digest` and the `registers`
digests reproduced exactly. HEAD is `139876c`, the commit the manifest names. The working tree
carries the prior cycle's uncommitted register entries (`D-2026-0040`, `G-2026-28`); the manifest's
`registers` digests were taken with those present, which is the state this evaluation read.

## Verdicts

### 1. Identity - PASS

Guide: code `1st 2026.txt:546`, title "Quantitative Reasoning-1(Maths)" `:549`, "Semester : 1st"
`:552`, credit hours as a bare total "3" `:554` with no split. Revised board Scheme (final
authority): `GQUR-300 / Quantitative Reasoning-1 (Math) / 3(3-0) / General Education` at
`B.Ed 4 Year 2026 revised after board.txt:18-24`, verified this run. Catalog: GQUR-300 /
"Quantitative Reasoning-I" / "3 (3-0)" / General Education, Semester 1 group; no `bilingual` key,
which `scripts/check-figures.mjs:128` reads as bilingual (`!== false`). Title variants are
typographic (D-2026-0006 posture); guide total + Scheme split do not contradict (G-2026-02 /
G-2026-05 posture). No Article II.3 conflict. The departmental variant
`.specify/Course_guides_and_Scheme/300 Quantitative_Reasoning_I.docx` is in the bundle; D-2026-0003
(confirmed, corpus-wide) settles it as superseded provenance-only, and the spec contains zero
`.specify` references (grep-verified).

### 2. Partition - PASS

The guide numbers six units at `:577`, `:584`, `:591`, `:598`, `:620`, `:629`; the spec carries
exactly those six units under those titles (verified mechanically; string-equal after trimming the
PDF bullet glyph). The guide has no week table; the spec's `## Week schedule` is derived and clearly
labelled with its basis stated (`content-spec.md:30-33`, `:99-102`, "(derived)" on every unit's
weeks line), the form D-2026-0012 (confirmed, corpus-wide) permits. The calendar substance (16
weeks, 3/3/3/2/3/2) is the spec's construction and is not approved; same disposition as D-2026-0019
gave GENG-300.

### 3. Coverage - PASS

24 guide bullets (`:579-582`, `:586-589`, `:593-596`, `:600`/`:601`/`:617`/`:618`,
`:622`/`:623`/`:624`/`:627`, `:631`/`:632`/`:634`/`:636`) map to 30 checklist rows (5+6+5+4+4+6).
Five compound bullets split into components using the guide's own words: G1.4 to U1-04/U1-05, G2.1
to U2-01/U2-02, G2.2 to U2-03/U2-04, G3.2 to U3-02/U3-03, G6.1 to U6-01/U6-02/U6-03. Verified
mechanically, word-level, in both directions: no guide word lost, no spec word added beyond the
guide's own words. The one insertion ("of numbers and operations" in U2-06) is the guide's own Unit
2 heading at `:584`. D-2026-0019 standard.

### 4. Outcomes - PASS

The guide's five course outcomes (`:567`, `:568`, `:570`, `:571`, `:573`) are reproduced verbatim at
`content-spec.md:37-42` (verified mechanically; the only difference is the guide's PDF bullet
glyph). Every CLO is referenced by at least one unit; no SLO lacks a guide ancestor; no CLO is
orphaned. The repaired Unit 4 trace to CLO 4 discloses its mechanism; it is a mapping judgement, not
an addition, and CLO 4's guide-anchored delivery rests on Unit 6 (`:636`).

### 5. Readings - NOT APPROVED (G-2026-28 remains open)

Presence passes: all four guide readings (`:653-656`) are in `### Guide-required`.

Independently verified this run (external registries, not bound inputs):

| Entry | Finding |
|---|---|
| steen2001 | RESOLVES. IA record `archive.org/details/mathematicsdemoc0000unse` fetched: "Mathematics and democracy: the case for quantitative literacy", NCED, Princeton NJ, 2001, ISBN 0970954700, controlled-lending. Open Library work OL18229070W verified. The repaired locator is TRUE. |
| npst2009 | RESOLVES. In-corpus precedent (EFMP-302 `npst-pakistan-2009`, identical itacec.org URL); itacec answers HTTP 401 to this host, the D-2026-0001 retrieval limit already recorded. |
| grawe | NOT resolvable from this host. Open Library: no record for the title or ISBN 9781516549016 (checked this run); IA and ERIC: none (prior cycle, not contradicted); Cognella's site serves search pages (HTTP 200) but no static product record. Web searches surfaced a plausible Cognella record ("Quantitative Literacy: Reasoning About Data, Change, Chance, and Uncertainty", ISBN 978-1-5165-4901-6) but were unstable across repeated queries and conflicted on the author's first name, so the work cannot be recorded as verified from this host. |
| ncm | Recorded unresolvable; the unverified 2006 / Grades I-XII / imprint details are removed; the citation is now exactly the guide's own words (`:655`). Conforms to the D-2026-0010 manner. |
| grawe2012 | VERIFIED: ERIC EJ981327, Liberal Education 98(2), 30-35, 2012. Exact match. |
| sikko2023 | VERIFIED: ERIC EJ1450768, Numeracy 16(1), 2023. Exact match. |
| gula2025 | VERIFIED: ERIC EJ1489427, CJSMT Education 25(1), 2025. Exact match. |
| mcclure2020 | VERIFIED: ERIC EJ1480153, Numeracy 13(2), 2020. Exact match. |
| tout2020 | Work REAL (ERIC EJ1266633) but the spec's page range "583-605" is FALSE: ERIC and Crossref (10.1007/s11159-020-09831-4) both give 183-209. |
| openstax-prealgebra | RESOLVES at the exact URL; title/authors/year match (Marecek, Anthony-Smith, Mathis, 2020). |
| pbs | RESOLVES (HTTP 200). |
| oecd-pisa | Institutional pointer; no verification claim made in the row. |

The D-2026-0013 floor pattern is satisfied: every unit's `**Mapped readings**` line carries at
least one verified open-access source (U1: grawe2012, sikko2023; U2: gula2025, openstax-prealgebra;
U3/U4: openstax-prealgebra; U5: grawe2012, tout2020, pbs; U6: mcclure2020, pbs).

Why the criterion is still not approved:

1. `G-2026-28` is open and reserves the grawe/ncm disposition to the owner. The repair applied the
   unresolvable-recording branch unilaterally. Every reading-list disposition in the register so far
   (D-2026-0010 for EFMP-302, D-2026-0013 for EFMP-304, the G-2026-21 decision for EED-313) was an
   owner ruling on its own course's list; D-2026-0013's own Limits disclaim corpus-wide effect.
   Extending a course-scoped ruling to another course is a scope judgement, which this gate
   escalates.
2. The grawe row does not fully conform to the D-2026-0010 manner it invokes: it retains "Cognella
   Academic Publishing", an added detail no bound input verifies, against the same row's "cited at
   bibliographic level only". G-2026-28 flagged exactly this detail.
3. The repair introduced three new false locators (repairs, no owner decision):
   - tout2020's page range "583-605" (true range 183-209);
   - the grawe note's guide citation `1st 2026.txt:652` (line 652 is blank; Grawe is at `:654`);
   - the ncm note's guide citation `1st 2026.txt:653` (line 653 is the Steen entry; NCM is at
     `:655`).

Blocked surface: the `grawe` and `ncm` rows of `### Guide-required`, and those two keys within the
`**Mapped readings**` lines of Units 2-6. Nothing else in the reading list is blocked.

### 6. Blueprint - PASS

All six units carry the fixed 10/10/5 bank with the style guide's Bloom bands and the
Analyze-or-higher ERQ rubric requirement (`specs/content/style-guide.md:223-231`). Every unit has
three topics, so the ">= 2 MCQ and >= 2 RRQ per topic" floors resolve to 6 of 10 with headroom; no
floor its own items would breach in any unit. The Units 3-6 parenthetical relaxations are
deliberate, disclosed relaxations of the spec's own floor; the style guide sets no per-topic
minimum. The course-review plan's ~15-20 / ~10-15 / ~5-8 mix is permitted (the style guide fixes no
count for `course-review.mdx`).

### 7. Structure - PASS

Front matter (`course_code: GQUR-300`, `status: draft`) validates against
`contracts/content-spec-frontmatter.schema.json` (replayed directly with ajv). All six required
course-level sections present in contract order; both reading-list subheadings carry the contract's
column set; all per-unit blocks present in all six units; no em dashes in the spec.

Deterministic checks at HEAD `139876c`, real exit codes: `check:no-em-dash` 1 (9 findings, all
`specs/content/geng-300/intake/evaluation.md`); `validate:content` 1 (13 errors, all GENG-300
unit-01); `check:bloom-bands` 0; `check:concept-graph` 0; `check:depth-gate` 1 (GENG-300);
`check:figures` 1 (GENG-300); `check:no-answer-keys` 1 (GENG-300); `check:docs-sync` 0;
`check:source-floor` 1 (GENG-300); `check:pipeline-gate` 1 (none GQUR-300). A grep of every failing
output for "gqur" returns zero. Green gates are vacuous for this course (no authored units).

Spec-side invariants replayed directly with the gate's own parsers (`unitSectionLines`,
`parseTopicList`, `parsePipeTable`, `tableAfterHeading`): for all six units the Sub-topic IDs form a
total, disjoint partition of the checklist; every checklist Topic cell equals its Topic list row
label; every Depth budget count matches its tables; every topic carries exactly two figure carriers,
consistent between the Topic list column and the Figure plan bullets; every unit plans at least one
concept-map, flowchart or timeline. Zero failures. Every Mapped readings key resolves to a
reading-list row.

### 8. Decision residue - PASS

Whole-spec sweep of every confirmed entry touching the course: D-2026-0001 invoked within Limits;
D-2026-0002/D-2026-0004's superseded EFMP-302 design appears nowhere (the only "one-page" hit is
GQUR-300's own practicum wording, `content-spec.md:137`); D-2026-0003 correctly inapplicable;
D-2026-0005 not evaded; D-2026-0012 applied correctly; D-2026-0013 invoked as precedent, not
silently converted into a binding rule; D-2026-0014 introduces no design. All three repair items
D-2026-0040 listed have landed (source-block ref `:546-680`; description ref `:558-563`; steen2001
locator now the verified IA record; Unit 4 CLO-4 trace tightened).

## Outcome

Seven of eight criteria approved and recorded under `D-2026-0041`. Criterion 5 (readings) is not
approved; `G-2026-28` remains the live escalation, with the update recorded in the decision entry.
`status: draft` stands; authoring stays blocked under Spec 006 FR-002 pending the owner's
G-2026-28 ruling and the three mechanical repairs. This evaluation certifies no content, qualifies
no reviewer, and authorises no publication (Art. VII.8.4).
