# GENG-301 (Expository Writing) - G0 intake / G1 unit-spec re-evaluation

- **Evaluator:** agent:evaluator, fresh session, 2026-10-10. Did not draft the spec. The drafter
  was Paperclip BilingualAuthor.
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (Constitution Article VII.8)
- **Decision recorded:** `D-2026-0056` (pending-owner-review), appended to the worktree's
  `specs/decisions/log.md`
- **New gaps:** none. Every remaining defect is settled by the guide, the content-spec v3 contract
  or the confirmed owner ruling `D-2026-0053`, so each one goes back to the drafter as a repair.
  Nothing is left that only the owner can decide.
- **Prior intake:** `D-2026-0050` (confirmed), record `specs/content/geng-301/intake/evaluation.md`.
  Gaps `G-2026-87`, `-88` and `-89` were resolved by `D-2026-0053`. `G-2026-90` (tracker) is an
  author repair and is not judged here. `G-2026-91` (tooling) is still open, and it is a tooling
  item, not a spec defect.

## Bundle verification

- Manifest: `.../scratchpad/intake2/GENG-301/manifest.json`, commit
  `dc9e0907caae9d752e776ccf170852b229d9ad95`, 79 inputs.
- Recomputed with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
  `prepare-intake-evidence.mjs` intake roots: **79/79 digests match**. Recomputed manifest digest
  `16388059ba316f00533a867b64608b71f050df5df3d905a57894a4ae7c31ebad` = recorded. Both register
  digests (`specs/decisions/log.md`, `specs/gaps.md`) match. The worktree is clean at the bound
  commit.
- Changes since the prior intake commit `513894b1` among judged inputs: only
  `specs/content/geng-301/content-spec.md` changed (commit `dc9e0907`, "intake repairs"), plus the
  prior intake record and manifest under `intake/`. The guide, the Scheme, `catalog/courses.json`,
  `contracts/`, the style guide and every `coverage/`, `sources/`, `figures/` and `concepts/` file
  are unchanged. Where this record reuses a `D-2026-0050` finding, it rests on those unchanged
  inputs.

Guide = `Scheme-and-Course-guides/extracted-text/2nd 2026.txt`. Spec = `specs/content/geng-301/content-spec.md` at `dc9e0907`.

## Verdicts

| # | Criterion | Verdict | Change vs D-2026-0050 |
|---|---|---|---|
| 1 | identity | **pass** | unchanged inputs; re-bound |
| 2 | partition | **pass** | unchanged; week split now settled by D-2026-0053 item 1 |
| 3 | coverage | **fail** | 2 of 3 defects repaired; 1 partially repaired; G-2026-87 rows lack the derivation the ruling requires |
| 4 | outcomes | **pass** | unchanged; re-bound |
| 5 | readings | **fail** | presence still passes; the new keyed tables and open-access floor are defective |
| 6 | blueprint | **pass** | unchanged; still feasible after the U4-04 move |
| 7 | structure | **fail** | most items repaired; course review plan and worked-examples label remain |
| 8 | decision-residue | **fail** | "16 weeks" and "flag and proceed" repaired; four-modes residue and a D-2026-0001 misattribution remain |

### 1. identity - pass

Reused from `D-2026-0050`. All its inputs are unchanged by digest. Guide code `:3`, title `:9`,
credit hours `:13` and semester `:15-17` match the revised Scheme row
(`B.Ed 4 Year 2026 revised after board.txt:128-136`, `3 (3-0)`, General Education) and the catalog.
Spec `:8` now reads "3 (3-0) credit hours" without the unsupported "16 weeks".

### 2. partition - pass

The guide's six numbered syllabus sections (`:44`, `:50`, `:61`, `:77`, `:86`, `:93`) become six units
in the same order. The guide determines this. The derived week distribution (spec `:40-53`) was
confirmed as drafted by `D-2026-0053` item 1 (`G-2026-88`). As before, this does not approve the
shortened unit titles as guide titles, or the topic grouping within any unit.
*Non-blocking:* spec `:51-53` still gives "a reasonable partition" as its only basis. Citing
`D-2026-0053` there would make the basis traceable, which `D-2026-0012` asks for.

### 3. coverage - fail

The guide's 31 bullets (`:46-98`) are each still covered by at least one checklist row. Repairs checked:

- **(a) U1-01 four modes: partially repaired.** The row at `:124` now places description among the
  expository types, in line with guide `:46` and `:77-79`. **The superseded design survives one
  section away in the same unit.** The key terms at `:107` still list "Narration, Description,
  Exposition, Argumentation" (the four-modes set), and the figure plan at `:145` still specifies
  fig-U1-1 as "the four modes of writing and how exposition relates to them". The prior record named
  the key-terms line as part of defect (a). The guide decides this (`:46`, `:77-79`).
- **(b) conciseness: repaired.** It appears in U2-06 `:180` and U2-07 `:181` (guide `:57`).
- **(c) persuasive: repaired.** U5-05 `:340` now reads "engaging, informative, persuasive and
  accessible" (guide `:90`).
- **G-2026-87 rows: not repaired.** `D-2026-0053` item 4 allows a derived sub-topic only "when its
  row names the outcome or reading it derives from". None of the five escalated additions name one.
  Each row's `Guide ref` cell holds only the section number, and the rows are textually unchanged:
  - U2-04 `:178` (stage names "rough, structured, refined"; guide `:56` names none)
  - U2-05 `:179` (purpose and audience; this is guide Unit 5 `:86-91`)
  - U2-06 `:180` ("argument strength"; not in guide `:57`)
  - U3-03 `:232` and U3-04 `:233` ("arguable", "debatability"; guide `:64` asks for "clear and focused")
  - U5-06 `:341` (opinion columns, newsletters, blogs; guide `:90` names no forms)

  A unit-level `**Mapped readings**` line does not satisfy this, because the ruling requires the
  **row** to name its derivation. The repair is to give each row its CLO or reading key (for
  example, in the Guide ref cell or the sub-topic text), or to drop the addition.

### 4. outcomes - pass

Spec `:63-67` reproduces guide `:33-41` verbatim. The unit CLO references are unchanged
(U1: 1, 2; U2: 1; U3: 1, 2; U4: 2; U5: 2; U6: 3), and every one has a guide ancestor.

### 5. readings - fail

**Presence (pass, reused).** All ten guide entries (`:108-126`) appear in the numbered list at spec
`:426-435`, and each resolves to a real work (Open Library IDs in `D-2026-0050`).

**The new keyed tables (fail).** `D-2026-0053` item 2 permits author-selected verified works with
`open_access_floor: 1`, and says misattributed entries must still be corrected. These defects
remain:

1. **A guide entry is missing from the guide-required table.** Longknife & Sullivan, *The Art of
   Styling Sentences* (guide `:125`), is absent from the table at `:82-93`. It is in the numbered
   list at `:434`, but has no key.
2. **A non-guide work is labelled guide-required.** `apa2020` (APA *Publication Manual*, 7th ed.) at
   `:93` carries the note "guide required". The guide has no such reading. It names APA only as a
   citation style in syllabus bullet `:96`. The entry has to be re-labelled author-selected.
3. **One key stands for two different works.** In the guide-required table, `zinsser2006` is *Writing
   to Learn* (`:90`, matching guide `:117`). Unit 4's mapped readings at `:273` call it "On Writing
   Well". The bound `sources/unit-04.md` and `sources/unit-05.md` cite `zinsser2006` as *On Writing
   Well* (2006, 30th anniv. ed.), which is a different book and not on the guide list. "2006" is the
   *On Writing Well* edition year.
4. **The spec's own mapping breaches the open-access floor.** Spec `:78` declares "every unit binds
   >= 1 open-access source". The open-access table (`:97-100`) tags only Unit 3 (`UNESCO2022`) and
   Unit 5 (`SindhEd2023`). **Units 1, 2 and 6 bind no open-access source at all.** The Unit 3 and 4
   mappings also contradict each other: the table puts `UNESCO2022` on Unit 3, but Unit 3's mapped
   readings (`:219`) omit it and Unit 4's (`:273`) list it.
5. **Neither open-access entry resolves to a verified work.** `UNESCO2022` names no specific report
   (there are several 2022 GEM report products), and its URL is the repository root
   `https://unesdoc.unesco.org`. `SindhEd2023` gives `https://www.sindheducation.org`. That host
   **failed DNS resolution** on a live fetch this run (2026-10-10), and the Sindh Education
   Foundation's actual domain is `sef.org.pk`. No 2023 annual report was located. Neither entry
   records a verification date or the course outcome it was chosen for, and the ruling asks for both
   "verified" and "relevance to the course outcomes".

### 6. blueprint - pass

The unit-end bank lines (`:152`, `:207`, `:262`, `:313`, `:366`, `:419`) still require 10/10/5
items with at least 2 MCQ and 2 RRQ per topic. Each unit has at most four topics, so the floors
need at most 8 of 10 items. Moving U4-04 to Topic 4.2 leaves Unit 4 with 3 topics of 2 sub-topics
each, so its floors need 6 of 10 items. The Analyze-or-higher summative items are unchanged and
fall inside the style-guide ERQ band.

### 7. structure - fail

Deterministic checks at `dc9e0907` (real exit codes):

| Command | Exit | Note |
|---|---|---|
| `node scripts/check-unit-depth.mjs` | 0 | passes (it does not read the Topic column; `G-2026-91`) |
| `node scripts/check-concept-graph.mjs` | 0 | |
| `node scripts/check-no-em-dash.mjs` | 0 | spec contains no U+2014 |
| frontmatter vs `contracts/content-spec-frontmatter.schema.json` (ajv 2020) | valid | |
| `node scripts/check-pipeline-gate.mjs` | 1 | GENG-301 rows: "content-spec.md is not approved (status: 'draft')" and G2 rows not done. These concern units authored before intake, not spec structure. |
| `node scripts/check-figures.mjs` | 1 | GENG-301 rows: planned schematics not placed in authored units. Content state, not spec structure. |

Repaired:
- U4-04 is now Topic 4.2 in the checklist (`:288`), which agrees with the topic list (`:297`). I
  checked this by hand, because the gate cannot (`G-2026-91`).
- The stray `-95 reading-min.` line is gone.
- `## Course Description` (`:11-20`) is the guide description `:20-28` verbatim.
- `## Week schedule` (`:40-53`) is present and labelled derived.
- A `### Guide-required readings` keyed table is present.
- Every unit carries `**Mapped readings**` and `**Prerequisite knowledge**`.
- The keys the six `sources/unit-NN.md` files cite now all resolve to a spec key, but `zinsser2006`
  resolves to the wrong work (see readings item 3).

Remaining (each settled by `specs/008-rich-unit-pedagogy/contracts/content-spec-v3.md`, which was
read at the bound commit; it sits outside the manifest, as in the prior run):
- `## Course review plan` (`:55-59`) is one prose sentence. The contract (`:23-37`) specifies
  **Course summary points** (4-6), **Practice-question mix**, and **Practicum project ideas** (3-6).
  None are present.
- Each unit labels its worked-example line "**Worked-example / activity concepts**". The contract
  calls it `**Worked-examples plan**` (`:91`, `:116`). The gate does not parse it, so this is a
  minor label fix, but the prior record listed it and it is unrepaired.

### 8. decision-residue - fail

I searched the whole spec for every confirmed entry that touches this course: `D-2026-0001`,
`D-2026-0012`, `D-2026-0013` (as precedent), `D-2026-0050` and `D-2026-0053`.

- `D-2026-0012`: **repaired.** "16 weeks" is gone from `:8`, and the schedule is labelled derived.
- `D-2026-0050` coverage (a): **residue** at `:107` (key terms) and `:145` (fig-U1-1 "four modes"),
  outside the row the repair touched. Extending the repair is guide-determined (`:46`, `:77-79`), so
  it goes back as a repair, not an escalation.
- `D-2026-0001`: "flag and proceed" is gone. The replacement at `:423-424`, "cited by reference per
  D-2026-0001 (no reproduction of text)", **misattributes** the rule. `D-2026-0001` governs
  *unretrievable* sources at G3. Not reproducing text is Constitution Art. III.5, which the same
  sentence already cites. The same sentence's "All entries are print monographs" is also now
  contradicted by the spec's own open-access table at `:95-100`.
- `D-2026-0053` items 2 and 4: their conditions are unmet (readings item 4, coverage G-2026-87 rows).
  This is recorded under those criteria, not double-counted.

## What D-2026-0056 approves and does not approve

It approves `identity`, `partition`, `outcomes` and `blueprint`, re-bound to this manifest. It does
**not** approve `coverage`, `readings` (beyond presence of the guide list), `structure` or
`decision-residue`.

**May the spec move to `status: approved` now? No.**

### Exact remaining repairs (drafter)

1. Spec `:107`: remove Narration/Exposition/Argumentation as a "four modes" key-term set, or
   re-frame the key terms so Description is an expository type. Spec `:145`: re-specify fig-U1-1 so
   it does not depict exposition as one of four modes (for example, as expository types per guide
   `:46`, `:79-84`).
2. Rows U2-04, U2-05, U2-06, U3-03, U3-04 and U5-06: name in the row the CLO or reading key each
   addition derives from (`D-2026-0053` item 4), or remove the addition.
3. Guide-required table: add Longknife & Sullivan (guide `:125`) with a key and units. Move `apa2020`
   to an author-selected table, labelled author-selected.
4. Resolve `zinsser2006`. Either it is *Writing to Learn* (the guide work) and `:273` plus the
   `sources/unit-04.md` and `sources/unit-05.md` rows are corrected, or *On Writing Well* gets its
   own author-selected key and is labelled as such.
5. Bind at least one verified open-access source to **each** of Units 1-6. Record a resolvable
   DOI/URL to the specific work, the date of verification and the outcome it serves. Make the
   table's `Units` column agree with each unit's `**Mapped readings**` (UNESCO2022 is on Unit 3 in
   the table and on Unit 4 in the mapped readings).
6. Replace or correct `UNESCO2022` (name the exact report and its unesdoc record URL) and
   `SindhEd2023` (the URL fails DNS; SEF is `sef.org.pk`; verify that the report exists).
7. Spec `:423-424`: drop the `D-2026-0001` attribution, since Art. III.5 already covers
   no-reproduction. Correct "All entries are print monographs" so it applies only to the guide list.
8. `## Course review plan`: add the contract's three bullets (4-6 summary points, a
   practice-question mix, 3-6 practicum project ideas).
9. Rename each unit's "Worked-example / activity concepts" line to `**Worked-examples plan**`.
10. Non-blocking: cite `D-2026-0053` as the week-schedule basis at `:51-53`.

After the repairs, the spec needs a freshly prepared manifest and a fresh intake. Any change to a
bound input voids `D-2026-0056`.

## Limits

This record certifies no content, qualifies no reviewer and authorises no publication
(Art. VII.8). The six units authored before intake were not judged. The tracker (`tasks.md`,
`G-2026-90`) was not read for judgement and was not edited.
