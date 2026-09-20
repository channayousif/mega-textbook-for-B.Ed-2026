# Proposed decision-log entries - EFMP-302 intake, shadow run

**These are proposals. Nothing here has been appended to `specs/decisions/log.md`.** This run is a
shadow qualification exercise under ADR-0019 section 5 ("begin in shadow mode: emit reports
without changing completion"), and `specs/decisions/log.md` is a bound input of this bundle, so
writing to it would modify an input the approval binds to.

Codes are allocated as the next free ones at the bound commit: the log ends at `D-2026-0002`, so
these are `D-2026-0003` to `D-2026-0005`. If the owner adopts them, the codes must be re-checked
against the log at that time.

All three are bound to `specs/content/efmp-302/intake-shadow-001/manifest.json`, manifest digest
`dc982f74a114a23ce08b95e2a5727117abaa7174c919b14156cd2dd68701e515`, verified independently by
recomputing `manifestFor()` (48 of 48 inputs, zero mismatches). A change to any bound input voids
them (Constitution Art. VII.8.5).

Evidence and per-criterion reasoning: `evaluation.md` in this directory.

---

## D-2026-0003 - EFMP-302 unit partition follows the guide's numbered units

- **Status:** pending-owner-review (**proposed only, not recorded**)
- **Gate:** G1 unit-spec
- **Scope:** EFMP-302, the six-unit partition and the per-unit topic partition. It settles the
  **shape** of the partition and nothing about what goes inside it.
- **Decided by:** agent:evaluator, 2026-09-19
- **Decision:** The spec's six units, their titles, their week bands and their topic partitions
  are a faithful derivation of the course guide. Units 1, 3, 4 and 6 map one-to-one onto the
  guide's numbered sections. Units 2 and 5 each split one guide section across two topic files,
  and both splits are pre-existing recorded owner decisions that this entry confirms as recorded
  rather than re-takes.
- **Basis:** The guide gives numbered units with numbered sections, so criterion 2's
  "where the guide gives numbered units, the partition must follow them" branch applies and its
  week-table branch does not. Guide unit headings and week bands:
  `Scheme-and-Course-guides/extracted-text/1st 2026.txt:766` (Unit 1, Week 1-3), `:809` (Unit 2,
  Week 4-5), `:832` (Unit 3, Week 6-8), `:865` (Unit 4, 9-11), `:881` (Unit 5, 12-13), `:898`
  (Unit 6, 14-16); the last two week ranges are truncated in that extraction and resolve to
  `(9-11)` and `(14-16)` in `.specify/Course_guides_and_Scheme/EFMP-302 Teaching Profession.pdf`,
  which is identical to the extraction on the whole unit outline. Spec side:
  `specs/content/efmp-302/content-spec.md:95-104` (week schedule), `:203-214`, `:338-352`,
  `:481-492`, `:599-609`, `:726-742`, `:849-861` (topic lists). Units 2 and 5 splits and their
  owner confirmations: `:330-336` (2026-09-15), `:729-737` (2026-09-18).
  The two bound guide documents agree exactly on the unit outline, so the conflict escalated in
  `G-2026-07` does not reach this criterion.
- **Bound to:** `specs/content/efmp-302/intake-shadow-001/manifest.json`, manifest digest
  `dc982f74a114a23ce08b95e2a5727117abaa7174c919b14156cd2dd68701e515`
- **Limits:** Settles the partition only. It does **not** settle which sub-topics may sit inside
  a topic (`G-2026-08` is open on exactly that for Unit 4), the reading list (`G-2026-09`), the
  outcome traces (`G-2026-10`), or the credit-hour question (`G-2026-07`). It is not a review,
  certifies no content, and qualifies no reviewer.

## D-2026-0004 - EFMP-302 course identity, excluding the credit-hour split

- **Status:** pending-owner-review (**proposed only, not recorded**)
- **Gate:** G0 course intake
- **Scope:** EFMP-302 course code, English title, semester placement and category. **The
  credit-hour value is expressly excluded.**
- **Decided by:** agent:evaluator, 2026-09-19
- **Decision:** `catalog/courses.json`'s entry for this course is correct on code (`EFMP-302`),
  English title (`Teaching Profession`), semester (1) and category
  (`Major: Professional`), all of which every bound document agrees on. The `credit_hours` field
  is **not** approved by this entry.
- **Basis:** `catalog/courses.json:45-50`; revised board Scheme
  (`Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt:78-86`,
  `EFMP-302 / Teaching Profession / Major: Professional Course- II`);
  `Scheme-and-Course-guides/extracted-text/1st 2026.txt:716-725`; and page 1 of
  `.specify/Course_guides_and_Scheme/EFMP-302 Teaching Profession.pdf`. `specs/gaps.md` was
  checked first as criterion 1 requires: G-2026-01's confirmed Semester I inventory names
  "EFMP-302 Teaching Profession" and binds here; G-2026-02 through G-2026-05 adjudicate other
  courses and do not reach this one.
- **Bound to:** `specs/content/efmp-302/intake-shadow-001/manifest.json`, manifest digest
  `dc982f74a114a23ce08b95e2a5727117abaa7174c919b14156cd2dd68701e515`
- **Limits:** The credit-hour split is in conflict between the two bound guide documents
  (`3 (3-0)` vs `03 (0-3)`) and is escalated as `G-2026-07`. Article VII.8.2 and the decision
  log's own non-delegated boundary forbid an evaluator from settling it, and the fact that the
  Scheme's answer is the likely one is not a reason to take it. Until `G-2026-07` is resolved,
  `catalog/courses.json`'s `credit_hours` for this course is unapproved. The Urdu title is not
  evaluated: no bound document carries it.

## D-2026-0005 - EFMP-302 sub-topic checklists omit nothing the guide requires

- **Status:** pending-owner-review (**proposed only, not recorded**)
- **Gate:** G1 unit-spec
- **Scope:** EFMP-302, the **completeness** half of criterion 3 only.
- **Decided by:** agent:evaluator, 2026-09-19
- **Decision:** Every leaf bullet of the guide's Unit 1 to Unit 6 outlines is carried by at least
  one row of the corresponding `### Sub-topic checklist`. 53 guide leaf bullets, 53 covered, none
  dropped. An author working from these checklists will not miss guide-required material.
- **Basis:** Guide outline at `Scheme-and-Course-guides/extracted-text/1st 2026.txt:766-922`,
  identical in the standalone PDF. Spec checklists at
  `specs/content/efmp-302/content-spec.md:177-201` (U1, 14 rows), `:294-320` (U2, 14),
  `:455-474` (U3, 13), `:576-594` (U4, 12), `:701-724` (U5, 12), `:827-845` (U6, 13).
  Per-heading enumeration is tabulated in `evaluation.md`, criterion 3. The guide determines this
  because it is a containment check against an explicit, numbered list the guide itself supplies.
- **Bound to:** `specs/content/efmp-302/intake-shadow-001/manifest.json`, manifest digest
  `dc982f74a114a23ce08b95e2a5727117abaa7174c919b14156cd2dd68701e515`
- **Limits:** **Completeness only.** The other half of criterion 3, that the spec introduces no
  sub-topic the guide lacks, is **not** approved: fourteen checklist rows sit under guide headings
  that carry no bullets, and Unit 4's five such rows are undisclosed and misdescribed. That is
  escalated as `G-2026-08`, and Unit 4's checklist is blocked until it is resolved. This entry
  also settles nothing about whether a named sub-topic is covered *well*; that is G3's question.

---

## Units and sections left blocked by this evaluation

Required by the skill where anything is escalated:

| Blocked | By |
|---|---|
| `catalog/courses.json` `credit_hours` for EFMP-302 | `G-2026-07` |
| Unit 4 `### Sub-topic checklist` (`U4-08` to `U4-12`) | `G-2026-08` |
| `## Reading list` `### Guide-required` table | `G-2026-09` |
| Unit 5 and Unit 6 CLO traces | `G-2026-10` |
| `## Course review plan` practicum briefs | `G-2026-11` |
| Criterion 7's `contracts/` clause, corpus-wide for intake bundles | `G-2026-12` |

Two defects are **reported, not escalated**, because a bound input determines the answer:

1. `content-spec.md:551` sets Unit 3's RRQ band to "Remember to Analyze";
   `specs/content/style-guide.md:228` fixes it at "Understand to Analyze" and the other five units
   comply. The style guide settles it, so it is an authoring correction, not an owner question.
2. `**International best-practice notes**` is absent from Units 5 and 6 and present in Units 1 to
   4. The v3 content-spec contract lists it as a per-unit line.

---

# Calibration

The briefing supplied three defects found independently by G3 reviews of the authored units, so
that this run could be scored.

## Honesty note on the protocol, first

The instruction was to record my verdicts before reading the answers. **I could not comply, and
the reason is structural rather than a choice I made.** The three defects were in the same
briefing message as the task, so they entered my context before I opened a single bound input.
There was no point at which I held the task without holding the answers.

This matters for how the scores below should be read. I have therefore scored each defect on a
test that priming cannot fake: **does a criterion, as written in the skill, have a locator in the
bound inputs that reaches this defect?** Where the answer is no, I say so even though I
"found" the defect, because a finding I could only have made by being told is not a capability
this evaluator has. A future calibration run should hand the answers to a separate scorer and
never to the evaluator.

## Defect 1 - the *One-term PD plan* surviving in `## Course review plan`

**Caught, but not by a criterion that was aiming at it.**

I found it at `content-spec.md:151-152` while reading the whole spec, recognised the wording from
`D-2026-0002` in `specs/decisions/log.md`, and recorded it under criterion 6 with the observation
that `D-2026-0002`'s **Applied in** field reaches only "`content-spec.md` '## Unit 6'" and its
**Limits** say "Settles Unit 6 only", which is precisely why the course-level copy survived.

The honest qualification: **no criterion names this**. Criterion 6 is scoped to "the assessment
blueprint's Bloom ranges, per-topic minimums and item counts". A practicum brief in a course-level
section is none of those. Criterion 7 is scoped to required sections and contracts, and the
section is present and contract-shaped, so criterion 7 passes it. It landed under criterion 6 only
because I was reading the whole document and the phrase was familiar.

**What the criteria are missing:** a criterion that asks *whether every confirmed decision in
`specs/decisions/log.md` is fully applied across the spec, including outside the scope its own
"Applied in" field names*. Both the log and the spec are bound inputs, the check is mechanical
(take each `confirmed` decision, grep the superseded wording across the whole spec, not just the
section the decision names), and it would have caught this deterministically instead of by
recognition. A narrowly scoped decision is exactly the case where residue is likeliest, because
the scope line tells the applier where to stop looking.

## Defect 2 - Unit 6's RRQ bank breaching its stated "Understand to Analyze" band

**Missed as stated, for a reason that is a property of the bundle. A sibling of it was caught.**

The defect lives in the authored `unit-assessment.mdx`: three `(Remember)` RRQs carrying 27 of 66
marks, and an MCQ tagged `(Analyze)` above its "Remember to Apply" ceiling. **`docs/` is not in the
bundle**, deliberately: `scripts/prepare-intake-evidence.mjs:5-9` says so in terms, because intake
normally runs before anything is authored. So the authored items were not merely unread; they were
unreadable. Criterion 6's instruction to catch "a floor its own items would breach" cannot bind
items the bundle excludes.

What the criterion *could* reach, and did:

- I found the **same class of breach in the spec itself**, at `content-spec.md:551`, where Unit 3
  sets RRQs at "**Remember** to Analyze" against `style-guide.md:228`'s "Understand to Analyze".
  That is the identical failure one layer up: a `Remember`-level RRQ, permitted by a spec band
  rather than smuggled past one. Had this run been a real G1 before authoring, that band would
  have licensed in Unit 3 exactly what G3 later had to reject in Units 5 and 6.
- I also established, from bound inputs, **why the authored breach was reachable at all**:
  `style-guide.md:302` and `:321` put "whether the items are ... correctly Bloom-levelled" on the
  human Content gate side of the automated/human split, and the v3 contract marks
  `**Unit-end assessment blueprint**` as not parsed. No deterministic check in the repository
  compares an authored Bloom tag against the band its unit spec sets. That is the mechanism, and
  it is the finding with the longest reach here, because it predicts the defect class rather than
  noticing one instance of it.

**What the criteria are missing:** nothing at G0/G1 can fix this, and pretending otherwise would
be the failure mode Article VII.8 exists to prevent. What should change instead is a gate:
`check:depth-gate` already parses the `### Topic list` and `**Depth budget**` lines from the
content-spec and already reads the authored files, so extending it to parse the
`**Unit-end assessment blueprint**` Bloom bands and compare them against the `(Bloom)` tags in
`unit-assessment.mdx` is a small change that converts this whole defect class from a human-gate
judgement into a CI failure. I am recording that as an observation, not proposing it: gate design
is engineering, which Article VII.8.4 does not delegate to me.

## Defect 3 - `coverage/unit-06.md` mapping seven of thirteen sub-topics to uncited sources

**Could not have been caught. Not a close call, and the briefing is right that this is a finding
about the bundle.**

`specs/content/efmp-302/coverage/` is not a bound input. `intakeRoots()` in
`scripts/prepare-intake-evidence.mjs:26-39` binds exactly one file from the course directory,
`content-spec.md`, and nothing from `coverage/`, `sources/`, `figures/` or `concepts/`. The
defect is a mismatch between a coverage matrix and authored prose, and neither artefact is in the
manifest. There is no chain of inference from the 48 bound inputs to it.

**The finding this produces about the bundle** (escalated as `G-2026-12`):

The intake root set was designed for a course whose units do not yet exist, and for that case it
is right. EFMP-302 is the opposite case: six authored units, four per-unit governance tables per
unit, and a `content-spec.md` whose own text repeatedly points outward at artefacts the bundle
does not carry. The spec says at six separate places that its checklist is "the authoritative list
the depth gate grades `specs/content/efmp-302/coverage/unit-0N.md` against"
(`content-spec.md:177-179, 294-296, 455-457, 576-578, 701-702, 827-829`), and criterion 3 is named
`coverage`. An evaluator reading that sentence is told the coverage matrix is the thing the
checklist governs, and then cannot see it.

The same hole reaches criterion 7, which requires the spec to satisfy "the contracts in
`contracts/`" when `specs/008-rich-unit-pedagogy/contracts/` is not bound either. I had to read
two contract files off the working tree to judge that criterion at all, and I recorded their
digests in `evaluation.md` and marked the clause `unverified` rather than let an unbound reading
support an approval.

So the bundle has two distinct gaps, and they are different in kind:

1. **Criterion 7 names an input the preparer does not bind.** That is a straightforward
   inconsistency between the skill and the script, fixable by adding `specs/008-rich-unit-pedagogy/contracts`
   to `intakeRoots()`. Until then criterion 7 can never fully pass, on any course.
2. **Intake on an already-authored course is a different job from intake on an empty one**, and
   the bundle only models the second. For a retrofit evaluation the root set would need the
   per-unit governance tables, and arguably the authored units, at which point the evaluator is
   doing part of G3's work and the gate boundary needs deliberate redrawing. That is a design
   question for the owner, not a script bug, which is why `G-2026-12` asks for a decision rather
   than proposing a patch.

## Score

| Defect | Caught? | By a criterion that aimed at it? |
|---|---|---|
| 1. One-term PD plan residue | yes | **no** - found by reading, criterion 6 has no locator for it |
| 2. Unit 6 RRQ Bloom breach | **no** (out of bundle); a sibling in Unit 3 caught, and the mechanism identified | criterion 6 reached the spec-level band, not the authored items |
| 3. `coverage/unit-06.md` source mismatch | **no** | **not possible** - the file is not a bound input |

One of three caught, and the one that was caught was caught by luck of reading order rather than
by the criterion set. The most useful outputs of this run are the two criterion gaps that produced
those misses: **no criterion re-applies a confirmed decision across the whole spec**, and **no
criterion notices when the bundle omits an input another criterion depends on**. Both are cheap to
add and both are the kind of defect that recurs, unlike the individual findings above.
