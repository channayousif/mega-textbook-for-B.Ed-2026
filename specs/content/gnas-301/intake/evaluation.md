# GNAS-301 · Environmental Science - Intake Evaluation

**Evaluator**: agent:evaluator
**Gates**: G0 intake / G1 unit-spec
**Date**: 2026-09-23
**Constitution**: Article VII.8
**Spec under evaluation**: `specs/content/gnas-301/content-spec.md` (status: draft)
**Course guide**: `Scheme-and-Course-guides/extracted-text/1st 2026.txt` (GNAS-301 block, verified lines `:143-366`)

## Manifest verification

- Bundle: `specs/content/gnas-301/intake/manifest.json`
- Commit: `34f3668` (worktree HEAD matches)
- Inputs bound: 54
- Manifest digest: `9050a3b7be854c41c20784294c7481008c23277997e0a71baaf572daeff4bea7`
- Recomputed independently with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
  same `intakeRoots('gnas-301')` root set `prepare-intake-evidence.mjs` uses: all 54 paths and
  digests match, no extra and no missing entry, and the recorded `manifest_digest` reproduces
  from a fresh disk read. The `registers` field (decision log, gaps file at read time) also
  matched.

## Deterministic checks

Run from the repository root at the bound commit. `npm run check:content` exits **1**: 7 of 11
gates fail. **Every failing finding is in GENG-300's tree, not GNAS-301's.** GNAS-301 has no
authored unit yet, so the gates that walk `docs/` are vacuous for this course.

| Check | Exit | Notes |
|---|---|---|
| validate:content | 1 | 13 errors, all `docs/semester-1/geng-300/unit-01/` (legacy files, `clo_refs` pattern, glossary entries). Zero GNAS-301 findings |
| check:pipeline-gate | 1 | 1 finding: GENG-300 Unit 1 has no `tasks.md`. Zero GNAS-301 findings |
| check:depth-gate | 1 | 4 findings, all GENG-300 Unit 1. Zero GNAS-301 findings |
| check:figures | 1 | 2 findings, all GENG-300 Unit 1. Zero GNAS-301 findings |
| check:no-em-dash | 1 | 9 occurrences, all in `specs/content/geng-300/intake/evaluation.md` (the prior evaluator's own report). Zero in the GNAS-301 spec |
| check:no-answer-keys | 1 | 1 finding, GENG-300 teacher notes. Zero GNAS-301 findings |
| check:source-floor | 1 | 1 finding: GENG-300 Unit 1. **GNAS-301 is not checked at all**: the spec declares no `open_access_floor` front matter, so its body's "binding" G2 floor is invisible to the gate (recorded under Readings below) |
| check:concept-graph | 0 | Pass |
| check:bloom-bands | 0 | Pass |
| check:content-status | 0 | Pass (`status: draft` is valid) |
| check:docs-sync | 0 | Pass |

Note for the owner, outside this course's scope: the red CI at this commit comes from GENG-300's
mid-migration `unit-01` and from em dash characters in the GENG-300 intake evaluator's own
`evaluation.md`, which sits under `specs/content/` and is therefore inside the Art. III.9 gate.
Neither is a GNAS-301 finding and neither affects a verdict below.

Because the deterministic gates cannot see an unauthored course, the spec-side invariants were
replayed directly against `content-spec.md` (the D-2026-0018 method): for every unit the
`Sub-topic IDs` cells form a total, disjoint partition of the `### Sub-topic checklist`; every
checklist `Topic` cell equals its `### Topic list` row label; every `**Depth budget**` count
matches its own tables; every topic carries two figure IDs from the six-value `Kind` vocabulary;
every unit carries at least one concept-map / flowchart / timeline (Art. III.10); front matter
validates against `contracts/content-spec-frontmatter.schema.json`; zero em dash characters.
**Zero failures across all six units.**

## Criteria

### 1. Identity - APPROVED

GNAS-301, "Environmental Science", 3 (2-1) credit hours, Semester 1, General Education,
bilingual (the catalog carries no `bilingual` flag for this course; only GENG-300 in Semester 1
carries `false`, so the default holds). Matches `catalog/courses.json` (`semesters[0].courses[1]`)
and the guide header (`1st 2026.txt:143-150`; the dash inside the guide's "GNAS- 301" is
typographic). No Article II.3 conflict remains: `G-2026-02` (resolved, owner, 2026-09-10) already
settled this course's code (GNAS-301 from the guide, over the scheme's GNAS-401) and credit
reconciliation (guide total 3, scheme split 3 (2-1)), and that decision binds. Unlike EFMP-304,
`.specify/Course_guides_and_Scheme/` does contain a file for this course
(`GNAS-401_Environmental_Science.docx`); `D-2026-0003` (confirmed, corpus-wide) governs it as a
superseded departmental variant, and the spec cites the Faculty guide only.

### 2. Partition - ESCALATED (G-2026-22)

The guide numbers its outline by week only (Week 1 at `:195` through Week 16 at `:315`, no unit
headings), so the six-unit merge is a judgement the guide does not determine. The partition
criterion's own text for week-table-only guides is to record the proposed partition and escalate
it rather than approve it; that is what `G-2026-22` does. What is guide-given and approved: the
16-week calendar, mid-term at Week 7 (`:250-252`), final at Week 16 (`:315-318`). What is
mechanically verified about the merge: contiguous whole weeks, no guide topic reordered, no week
split across units, the mid-term week excluded, 16.1 taught in the examination week per the
guide's own placement. The spec is candid throughout (derived per D-2026-0012, labelled, basis
stated) and itself asks for this finding.

### 3. Coverage - APPROVED

The guide enumerates 53 numbered items at `:193-318`; two are examinations (7.1 mid-term `:252`,
16.2 final `:318`), leaving **52 teaching sub-topics**. The spec's six checklists carry exactly
**52 rows** (7 + 5 + 6 + 15 + 7 + 12). Verified mechanically: every guide teaching ref appears
exactly once, no row lacks a guide ancestor, no ref is duplicated, each unit's refs are
contiguous and ascending. The examinations are carried as calendar rows, not sub-topics, the
correct reading. Transcription normalisations are within-guide slips, disclosed by the spec:
"responsivities" (`:225`) -> "responsibilities"; "bio-magnificatio" (`:308`) ->
"bio-magnification".

### 4. Outcomes - APPROVED

The guide's five CLOs (`:171-191`) are transcribed verbatim at `content-spec.md:42-54`, with the
single normalisation (CLO 1's "human-environment" en dash to a plain hyphen) disclosed at
`:36-38`. Every CLO is delivered by at least one unit whose guide topics carry it (CLO 1 by Unit
1; CLO 2 by Units 1, 2, 3, 6; CLO 3 by Units 3, 4, 5, 6; CLO 4 by Units 2, 3, 4, 5; CLO 5 by
Units 1, 5, 6). No SLO lacks a guide ancestor and no CLO is orphaned; the EFMP-302 `G-2026-10`
failure mode is absent.

### 5. Readings - ESCALATED (G-2026-23)

The list is present: all seven guide books (`:352-366`) are transcribed with citation keys and
unit mappings. Independently verified against Open Library on 2026-09-23:

- **Verified real (2)**: *Planetary Health* (Island Press; 1st ed. 2020 Myers & Frumkin, 2nd ed.
  2023 Frumkin & Haines - the guide's pair matches the second edition, as the spec records);
  *Occupational Health* (Harrington & Gill, Blackwell Scientific, 1983).
- **Unresolvable as printed (5)**, each flagged per `D-2026-0001` with title-level support only:
  the Holland, Shilling, Clark & Henderson, Phoon & Chen and Park entries. The spec's
  closest-real-work identifications are confirmed for Holland (the *Oxford Textbook of Public
  Health*, with Detels, OUP) and Park (*Park's Textbook of Preventive and Social Medicine*,
  Banarsidas Bhanot), partially for Phoon (real author, SEAMIC 1985; exact title not locatable),
  and could not be confirmed or refuted from this host for Shilling and Clark & Henderson.

What is escalated is not the transcription but the usability question and the remedy, neither of
which the guide determines: five of seven entries unresolvable as printed (weaker ground than
EFMP-304's `G-2026-14`, where all seven resolved), a 2-per-unit open-access floor that follows
the `D-2026-0013` precedent whose scope names EFMP-304 only, and that floor's absence from
`open_access_floor` front matter, which leaves it enforced by nothing (`check:source-floor` does
not check this course). See `G-2026-23` for the three owner decisions requested.

### 6. Blueprint - APPROVED

All six units carry the fixed 10 MCQ / 10 RRQ / 5 ERQ bank with the style guide's bands (MCQ
Remember-Apply, RRQ Understand-Analyze, ERQ Analyze-Evaluate/Create, at least one
Analyze-or-higher ERQ rubric) and formative 5-8 item sets (Remember-Understand-Apply).
Per-topic minimums saturate without breach (4 x 2 = 8 <= 10; 3 x 3 = 9 <= 10; 7 x 1 = 7 <= 10;
6 x 1 = 6 <= 10; ERQs one per topic plus integratives, all topics covered). The guide's
course-specific marks table (`:341-350`) resolves arithmetically to 30 / 50 / 10 / 10 = 100, the
only consistent reading of the scrambled extraction; the spec follows it and justifies the
deviation from the Art. III.7 60/40 default in the spec itself, as Art. III.7 requires. The
course-review practice mix (~18 / ~12 / ~6) has no fixed count under the style guide.

### 7. Structure - APPROVED

Front matter validates against `contracts/content-spec-frontmatter.schema.json`. All
course-level sections and all per-unit contract blocks are present in all six units (verified
mechanically). The spec-side invariants replayed directly pass with zero failures (see
Deterministic checks above). Zero em dashes in the spec. The deterministic gate failures at this
commit all sit in GENG-300's tree; none touches GNAS-301.

### 8. Decision residue - APPROVED

The whole specification was swept for superseded designs, not only the sections confirmed
decisions name: no one-term or one-page development plan (`D-2026-0002`/`D-2026-0004`), no
reliance on `.specify/Course_guides_and_Scheme/` (`D-2026-0003`), no review-cycle assumptions
(`D-2026-0005`), no EFMP-304-specific pattern misapplied. `D-2026-0001` is invoked within its
Limits (five flagged monographs, title-level limit stated at the point of use in the
reading-list table and on every `**Mapped readings**` line). `D-2026-0012` is applied correctly
(calendar guide-given, partition derived and labelled). The spec's single 60/40 mention correctly
states the default does not apply. The `D-2026-0013` pattern the spec follows is the subject of
`G-2026-23`, not residue.

## Verdict: PARTIAL APPROVAL

Six of eight criteria pass (identity, coverage, outcomes, blueprint, structure, decision
residue). Two are escalated: **partition** (`G-2026-22`) and **readings** (`G-2026-23`). The spec
may **not** be set to `status: approved` until the owner settles both escalations; that action
is the author's after reading this decision, not the evaluator's.

## Decision entry

Recorded as `D-2026-0020` in `specs/decisions/log.md` (status: pending-owner-review), bound to
`specs/content/gnas-301/intake/manifest.json`, manifest digest
`9050a3b7be854c41c20784294c7481008c23277997e0a71baaf572daeff4bea7`, 54 inputs at commit
`34f3668`. Any change to a bound input voids that approval (Art. VII.8.5). Escalations recorded
as `G-2026-22` and `G-2026-23` in `specs/gaps.md`.
