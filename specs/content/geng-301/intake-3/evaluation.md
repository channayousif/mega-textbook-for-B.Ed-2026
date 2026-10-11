# GENG-301 (Expository Writing) - G0 intake / G1 unit-spec, third evaluation

- **Evaluator:** agent:evaluator, fresh session, 2026-10-10. I did not draft the spec or any of its
  repairs.
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (Constitution Article VII.8)
- **Decision recorded:** `D-2026-0062` (pending-owner-review), appended to the worktree's
  `specs/decisions/log.md`
- **New gaps:** none. Reserved codes `G-2026-134` to `G-2026-137` were not used.
- **Prior intakes:** `D-2026-0050` (confirmed) and `D-2026-0056` (pending-owner-review). Records:
  `specs/content/geng-301/intake/evaluation.md` and `intake-2/evaluation.md`. Binding owner ruling:
  `D-2026-0053` (confirmed).

## Bundle verification

- Manifest: `.../scratchpad/intake3/GENG-301/manifest.json`, commit
  `8be7d9675da3452bd1f980930c9bb179ef952aee` (the worktree HEAD, clean), 81 inputs.
- Recomputed with `manifestFor()` over the `prepare-intake-evidence.mjs` intake roots: **81/81
  digests match**, 0 differences. The recomputed manifest digest
  `c7901abaea48d56d1b22878e7c29cb78093c9f8c1baecdf8f8ef4f90f65b65ad` equals the recorded one. Both
  register digests (`specs/decisions/log.md`, `specs/gaps.md`) matched at read time.
- Changes since intake 2 (`dc9e0907`) among bound inputs: `content-spec.md`, the six
  `figures/unit-NN.md` files (Src and Status filled to `placed`, prompts unchanged), and the new
  `intake-2/` record. The guide, the Scheme, the catalog, `contracts/`, the style guide, and every
  `coverage/`, `sources/` and `concepts/` file are unchanged. Reused findings rest on those
  unchanged inputs.

Guide = `Scheme-and-Course-guides/extracted-text/2nd 2026.txt`. Spec =
`specs/content/geng-301/content-spec.md` at `8be7d967`.

## Verdicts

| # | Criterion | Verdict | vs D-2026-0056 |
|---|---|---|---|
| 1 | identity | **pass** | unchanged inputs; re-bound |
| 2 | partition | **pass** | unchanged; the basis now cites D-2026-0053 |
| 3 | coverage | **pass** | was fail; all named defects repaired |
| 4 | outcomes | **pass** | unchanged; re-bound |
| 5 | readings | **pass** | was fail; all six reading repairs made and verified live |
| 6 | blueprint | **pass** | unchanged; re-bound |
| 7 | structure | **pass** | was fail; course review plan and labels repaired |
| 8 | decision-residue | **pass** (spec) | was fail; spec clean. Downstream residue sits in pre-intake authored Unit 1 (see Limits) |

### 1. identity - pass
Guide code `:3`, title `:9`, 3 credit hours `:13`, Semester 2 `:15-17`. These match the revised
Scheme (`B.Ed 4 Year 2026 revised after board.txt:128-136`, 3 (3-0), General Education) and the
unchanged catalog.

### 2. partition - pass
The six units follow guide sections `:44`, `:50`, `:61`, `:77`, `:86` and `:93`. The week split is
derived, and `D-2026-0053` item 1 confirmed it. Spec `:55-58` now says so (repair 10 from intake 2).

### 3. coverage - pass
- Every guide bullet `:46-98` maps to at least one of the 47 checklist rows (31 bullets). No
  checklist row lacks a guide parent or a named derivation.
- Repair 1: U1-01 `:176`, the key terms `:155-157` and the fig-U1-1 plan `:197-199` now all present
  description as an expository type (guide `:46`, `:79-84`).
- Repair 2 (`D-2026-0053` item 4):
  - U2-04 `:234` reads "stage names derived: CLO 1".
  - U2-05 `:235` reads "derived: CLO 2".
  - U2-06 `:236` drops "argument strength" and now follows guide `:57`.
  - U3-03 `:290` drops "arguable" and now follows guide `:64` verbatim.
  - U3-04 `:291` drops "debatability" and reads "derived: CLO 1; openstax2021 10.3".
  - U5-06 `:406` reads "derived: CLO 2; openstax2021 18.3".

### 4. outcomes - pass
Spec `:98-102` reproduces guide `:33-41` verbatim. Every unit CLO reference traces to it.

### 5. readings - pass
- Repair 3: the guide-required table `:116-129` now has exactly the ten guide works (`:108-126`),
  including `longknife2002`. `apa2020` sits in the author-selected print table `:131-138`, labelled
  author-selected with its CLO.
- Repair 4: `zinsser1988` is *Writing to Learn* (guide `:117`). `zinsser2006` is *On Writing Well*,
  labelled author-selected. It now agrees with `sources/unit-04.md:5` and `sources/unit-05.md:7`.
- Repairs 5 and 6: the front matter declares `open_access_floor: {default: 1}` (the
  `D-2026-0053` item 2 form). `openstax2021` is bound to every unit, with named sections. Live
  checks on 2026-10-10:
  - The OpenStax details page and all ten section URLs returned HTTP 200. The page title for 13.6
    matches.
  - `UNESCO2022`: Crossref resolves DOI 10.54676/RCZB6329 to *Global Education Monitoring Report -
    Gender Report: Deepening the debate on those still left behind* (2022), primary URL unesdoc
    pf0000381329. doi.org returned 403 to a bot client, but the GEM landing page returned 200.
  - `sef2022-23`: the PDF returned 200 (application/pdf, about 12.5 MB) and is linked as "Annual
    Report 2022-23" on `sef.org.pk/publications/7`.
- The table's Units column agrees with each unit's Mapped readings (`UNESCO2022` is Unit 4 in both
  places).
- Monographs: all ten guide works are print monographs, so `D-2026-0001` applies at G3 to
  title-level support unless a copy is obtained.

### 6. blueprint - pass
Each unit's bank is 10/10/5 with at least 2 MCQ and 2 RRQ per topic (`:205`, `:263`, `:320`,
`:375`, `:431`, `:487`). No unit has more than 4 topics, so the floors need no more than 8 of 10
items, and the topic lists are unchanged. The course-review mix (about 20 MCQ with at least 3 per
unit, 12 RRQ, 4 cross-unit ERQs at Analyze or above) is self-consistent.

### 7. structure - pass
Repair 8: `## Course review plan` `:60-94` has 5 summary points, a practice-question mix and 5
practicum ideas, each with a purpose, a method and the evidence to bring back
(`content-spec-v3.md:23-37`). Repair 9: all six units label the line `**Worked-examples plan**`.
I checked the checklist Topic column against all six `### Topic list` tables by hand
(`G-2026-91`), and they agree.

| Command | Exit | Note |
|---|---|---|
| `node scripts/check-unit-depth.mjs` | 0 | |
| `node scripts/check-concept-graph.mjs` | 0 | |
| `node scripts/check-no-em-dash.mjs` | 0 | |
| `node scripts/check-figures.mjs` | 0 | was 1 at intake 2; figures now placed |
| front matter vs `contracts/content-spec-frontmatter.schema.json` (ajv 2020) | valid | `{course_code, status: draft, open_access_floor: {default: 1}}` |
| `node scripts/check-source-floor.mjs` | 1 | GENG-301 Units 1-6: 0 registry-verified sources in `sources/unit-NN.md` (pre-intake authored units) |
| `node scripts/check-pipeline-gate.mjs` | 1 | spec `status: draft` (expected before approval); G2 evidence not found at `reviews/unit-0N/` |

The two exit-1 commands fail on authored-unit state, not on the spec's structure.

### 8. decision-residue - pass for the spec
I searched the whole spec for residue of `D-2026-0001`, `-0012`, `-0050`, `-0053` and `-0056`
("four modes", narration, argumentation, arguable, debatability, argument strength, 16 weeks, flag
and proceed, reasonable partition, `D-2026-0001` attribution, "All entries are print monographs",
SindhEd2023, sindheducation, the "Worked-example /" label, apa2020 labelled guide-required). I
found none. The preamble at `:491-493` now cites only Art. III.5 (repair 7).

**Residue outside the spec, in pre-intake authored Unit 1 artefacts.** `figures/unit-01.md:5`
fig-U1-1 still has the "Modes of Writing" four-branch prompt and alt text, and was moved to
`placed` in this same commit. The authored `docs/semester-2/geng-301/unit-01/topic-01.mdx`
(`:3`, `:10`, `:39` "### The four modes of writing") and `coverage/unit-01.md:5` carry the same
framing. These contradict the spec's own fig-U1-1 plan and U1-01. The guide determines the
correction (`:46`, `:79-84`), so `D-2026-0050` extends to them and this is a content repair, not
an escalation. It does not block the spec, because G1 approves the spec, not the units authored
before intake. It does block those units at G2/G3.

## Answer to the parent

**Yes.** The spec may move to `status: approved` once the owner confirms `D-2026-0062`, provided no
bound input changes first. A change voids this decision and needs a fresh manifest.

Required before any GENG-301 unit re-enters G2/G3. These are content and tooling items, not spec
repairs:
1. Unit 1: re-specify and re-render fig-U1-1 to match the spec plan (`:197-199`). Then re-author the
   `topic-01.mdx` four-modes section and its front matter, and update the `coverage/unit-01.md`
   U1-01 heading.
2. Units 1-6: add registry-verified open-access rows (openstax2021 sections, UNESCO2022,
   sef2022-23 as mapped) to `sources/unit-NN.md` so `check-source-floor` passes.
3. G2 evidence path: `reviews/unit-00N/` is written, but `check-pipeline-gate` reads
   `reviews/unit-0N/`. Reconcile it.

## Limits
This record certifies no content, qualifies no reviewer and authorises no publication
(Art. VII.8). I did not judge the authored units beyond noting their conflicts with the spec. I did
not read the tracker (`tasks.md`, `G-2026-90`) for judgement, and I did not edit it.
