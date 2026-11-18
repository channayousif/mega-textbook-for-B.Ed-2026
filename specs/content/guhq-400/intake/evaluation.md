# GUHQ-400 G0/G1 intake evaluation

- **Evaluator:** agent:evaluator (fresh session; did not draft this specification)
- **Date:** 2026-11-18
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (Constitution Article VII.8)
- **Specification:** `specs/content/guhq-400/content-spec.md` (296 lines, `status: draft`)
- **Bundle:** `specs/content/guhq-400/intake/manifest.json`, prepared at commit `7750c153`
- **Worktree:** `/home/a2ahs/crew-wt/sem4-intake-eval`, branch `content/sem4-intake-eval`, off
  `origin/main` at `fa80a282`
- **Outcome:** **partial.** Decision `D-2026-0092` (pending-owner-review) approves what the guide
  settles, together with the already-resolved `G-2026-04`. Gaps `G-2026-211`, `G-2026-212`,
  `G-2026-214`, `G-2026-233` and `G-2026-234` escalate the rest. One author repair is listed at
  the end.

## Manifest verification

Recomputed with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
`prepare-intake-evidence.mjs` root set, with `specs/content/guhq-400` as the course root:

- 56 bound inputs recorded, 56 recomputed, **0 mismatches**.
- `manifest_digest` recorded `d7f84adff4621978d33119d7cff3da6fe4fbe882a5f1ff191c0afe37d79be54c`;
  recomputed from the file and from the live tree: identical.
- Registers matched their recorded read-time digests (`ceb73bf9...`, `18ab3a6b...`).

Any change to a bound input voids `D-2026-0092`.

## Criteria

Guide: `Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt`, GUHQ block `:1-99`. Scheme:
`B.Ed 4 Year 2026 revised after board.txt` (cited as `Scheme:N`).

### 1. identity - pass on the values (adjudicated by `G-2026-04`); no catalog entry (`G-2026-211`)

- Guide: "Understanding of Holy Quran II", `GUHQ- 402`, `03 (0-1)`, Semester 4th (`:6-8`).
- Scheme: Semester IV row 8, `GUHQ- 400`, "Fehm-e-Quran - II", `1 (0-1)`, General Education, EC&EE
  (`Scheme:382-392`).
- **Already adjudicated.** `G-2026-04` (resolved, `gaps.md:62-65`) decides "**GUHQ-400 Fehm-e-Quran
  II, Semester IV, 1 (0-1)**". The guide's own `03` contradicts its own `(0-1)` split, and the
  same block-level slip pattern (`GUHQ-401` for Fehm-e-Quran I) is named in that ruling. The
  ruling binds and is not re-opened here.
- The proposed entry (`content-spec.md:14`) matches it on every field.
- **Author repair:** the spec presents the code and credits as open "Article II.3 questions the
  drafter does not settle" (`:12`, drafting note 1). They are settled; the spec should cite
  `G-2026-04`. The same finding was made for GUHQ-301.
- No catalog entry exists. The `title_ur` "فہمِ قرآن - II" follows GUHQ-301's approved pattern but
  is in neither the guide nor the Scheme. Escalated in `G-2026-211`.

### 2. partition - pass at unit level; topic partition escalated (`G-2026-233`)

- The guide numbers four units (`:17`, `:43`, `:58`, `:73`) over Weeks 1-6, 7-10, 11-14 and 15-16.
  The spec's four units follow them in order (`:67-72`). **Approved.**
- **Topic partition: not guide-determined.** The spec makes each week a topic. The guide's
  numbering is partial: 1.5 (`:25`), 1.12-1.13 (`:41-42`), 2.1-2.2 (`:46-47`) and 2.7-2.8
  (`:56-57`) are numbered, and every other line is not.
  - So `D-2026-0070` item 1 cannot apply literally.
  - Weeks-as-topics was accepted for GUHQ-301 by approving that spec as drafted (`G-2026-206`). It
    is not a corpus-wide rule.
  - The result is units of 6, 3, 4 and 2 topics. Escalated as `G-2026-233`.
- **Within-guide slip, resolved:** Weeks 9 and 10 are identical, "Past tense: first & second
  person forms" and "Translation practice & comprehension assessment" (`:53-54`, `:56-57`). No
  second document conflicts. Listing the two items once (U2-05, U2-06, each citing both weeks) is
  a resolution I may make under a `D-` code. Making Weeks 9-10 a single topic (2.3) is part of
  `G-2026-233`. The owner may supply different Week 10 content.

### 3. coverage - pass

Checked with the gate's parsers and by hand:

| Unit | Guide lines | Rows |
|---|---|---|
| 1 | `:20-22`, `:24-25`, `:29-30`, `:33-34`, `:37-38`, `:41-42` | U1-01..13 |
| 2 | `:46-47`, `:49-50`, `:53-54` = `:56-57` | U2-01..06 |
| 3 | `:61-62`, `:64-65`, `:67-68`, `:70-71` | U3-01..08 |
| 4 | `:76-77`, `:83` | U4-01..03 |

- Every guide item appears once. Wording is faithful, with transliteration and typographic
  normalisation.
- Week 16's "Review of all major grammatical categories" and "Final comprehension exercises and
  assessment" (`:81-82`) are a course activity and an assessment event. They carry no row,
  consistent with `D-2026-0059`, `D-2026-0063` and GUHQ-301's items 7.4-7.5 (`D-2026-0080`).
  Approved.
- U3-01 keeps the guide's heading "passive voice in past tense" and notes that its labels "maf'ul
  bih / maf'ul lahu" (`:61`) do not name the passive (drafting note 4). The row covers the guide
  item. How the label is explained is a G3 matter for a qualified reviewer.

### 4. outcomes - pass

The three guide outcomes (`:13-15`) are quoted verbatim (`content-spec.md:21-23`). Units 1-3 trace
to outcome 1 through their grammar and translation items. Unit 3's thematic analysis (`:71`) and
Unit 4 trace to outcomes 2 and 3. No SLO lacks an ancestor.

### 5. readings - escalated (`G-2026-212`, `G-2026-234`)

The guide prints fifteen lines (`:86-99`), several repeated:

| Line(s) | Entry | Verified |
|---|---|---|
| `:86`, `:89`, `:92`, `:93`, `:96` | Muallim-ul-Quran (Rahman, Vols. 3-5), five forms | same series as GUHQ-301 `:219`, `:222`; no publisher except "Lahore" (`:96`) |
| `:87`, `:88` | two categories of works | as GUHQ-301 `:220-221` |
| `:90` | Tafseer Talim-ul-Quran, Maktaba-tul-Madinah | as GUHQ-301 `:223` |
| `:91` | Mafhoom-al-Quran (2nd ed.) | as GUHQ-301 `:224`; unbound |
| `:94`, `:99` | Badawi & Abdel Haleem, Dictionary of Qur'anic Usage, Brill | Open Library `OL16977011W` "Arabic-English dictionary of Qur'anic usage", confirmed (`:94` is truncated) |
| `:95`, `:97` | Ibn Kathir, Tafsir Ibn Kathir, Dar-us-Salam | `OL10746660W`, confirmed |
| `:98` | Maududi, Tafhim-ul-Quran, Islamic Publications | translation `OL21232467W` "Towards Understanding the Qur'an", confirmed |

- The three new works are real.
- The six entries shared with GUHQ-301 do not identify single works. `G-2026-208` was marked
  resolved only because the owner approved **GUHQ-301's** spec as drafted. The spec carries that
  treatment over (`:39-47`); whether the acceptance reaches the identical entries in a different
  course is not mine to decide. Escalated as `G-2026-234`.
- Author-selected rows are re-used from GUHQ-301: `quran.com` (HTTP 200, including the English
  Tafsir Ibn Kathir page), `corpus.quran.com` (HTTP 200), and Crossref `10.63317/5ca39mfekwbt`
  (Dukes et al., LREC 2010) and `10.6007/ijarbss/v12-i6/13322` (Abdul Kadir et al., 2022), both
  resolving as cited.
- The spec says `D-2026-0053` item 2 was "applied to Semester 3 by `D-2026-0080`" (`:35`). The
  owner accepted it for six Semester 3 specs; no ruling reaches Semester 4 (`G-2026-212`). Unit 2
  meets the floor only with Quran.com and the Leeds corpus, which are primary-text and reference
  tools (`content-spec.md:173`). Units 1 and 3 also map `dukes-2010-treebank`, and Unit 4 maps
  `kadir-2022-asbab`. This is the same pattern raised for GUHQ-301.

### 6. blueprint - pass except the formative lines of Units 1 and 3

- Unit 2 (three topics) states 9, applying `D-2026-0072`. Unit 4 (two topics) keeps "5-8".
- **Unit 1 states 18 (six topics) and Unit 3 states 12 (four topics)** (`:81`, `:195`), extending
  `D-2026-0072`. Escalated in `G-2026-214`.
- Every summative names an Analyze-or-higher item: Analyze (Units 1, 3), "Apply-then-Analyze"
  (Unit 2), Create (Unit 4).
- Banks are 10/10/5. ">= 2 per topic" holds in every unit, including six-topic Unit 1 (the replay
  confirms its MCQ and RRQ floors fit). ERQ lines sum within 5.
- 2 figures per topic, with a schematic in every unit.
- The guide gives no weighting, so the 60/40 default applies.

### 7. structure - pass

- All 14 `CONTENT_GATES` exit 0 (tree-wide run on 2026-11-18; see
  `specs/content/gcce-400/intake/evaluation.md`, criterion 7).
- Front matter validates.
- Partitions, topic cells, depth counts and per-unit blocks replay clean.
- Figure IDs are unique and contiguous.

### 8. decision-residue - not approved (escalated)

| Entry | Status in the spec | Verdict |
|---|---|---|
| `G-2026-04` (resolved identity) | Applied: GUHQ-402, 03 and 2nd appear only as the guide's printed values. The spec does not cite the ruling. | No residue (author repair to cite it) |
| `D-2026-0070` item 1 | Followed at unit level; topics are weeks | Escalated, `G-2026-233` |
| `D-2026-0072` | Applied to Unit 2; extended to Units 1 and 3 | Escalated, `G-2026-214` |
| `D-2026-0053` item 2 | Relied on in Semester 4 | Escalated, `G-2026-212` |
| `D-2026-0081` item 3 | The figure plan is schematic only, with no sacred figure or calligraphy illustration planned | No residue |
| `D-2026-0001`, `D-2026-0003`, `D-2026-0012` | No superseded design present | No residue |

## Out of scope, noted only

Drafting note 8 asks for scholar review of interpretation at G3. Reviewer qualification is not
delegated to this evaluator.

## Blocked until the owner rules

| Gap | What it blocks |
|---|---|
| `G-2026-211` | the catalog entry |
| `G-2026-212` | the Author-selected table and `open_access_floor` as a binding floor |
| `G-2026-214` | the Unit 1 and Unit 3 formative lines |
| `G-2026-233` | every topic list and the week column, Units 1-4 (including Topic 2.3's two-week span) |
| `G-2026-234` | the Guide-listed table and the readings criterion |

**Author repair, with no owner ruling needed:** cite `G-2026-04` for code and credit hours instead
of presenting them as open (`:12`, drafting note 1).
