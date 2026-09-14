# Measurement run 001 - five units at the frozen standard

Sets the Phase 5 unit target. `SDD/ROADMAP.md:427` step 3: "Author five units back to back at
the frozen v4.0 standard, logging hours. Set the Phase 5 target from the result."

## Why this exists

The roadmap carries two rates and no evidence for either. 0.25 units/week is measured but
covers a period when authoring and platform engineering were one effort, so it measures shared
capacity. 15 units/week is the working hypothesis and is unmeasured. Every downstream number -
the 11-week Semesters I-IV window, the funding question, the institutional pitch - rests on a
figure nobody has tested. `SDD/ROADMAP.md:423` records the target itself as open pending this.

## Scope

**EFMP-302 Units 2 to 6**, in order. It is the set `specs/backlog.md` already names as the next
content task, it is exactly five, and each unit's G1 unit-spec is already `✅`.

Current state: all five sit in the legacy five-file layout at roughly 1,100 to 1,400 words
(`index`, `activities`, `formative`, `summative`, `teacher-notes`). Re-drafting to the per-topic
standard means each is a full authoring pass, not an edit, so **G1 to G3 re-open per unit**; the
existing `✅` rows were earned by the legacy drafts and do not carry over.

Per unit the target shape is the v4.x standard: `index.mdx` + four `topic-NN.mdx` +
`unit-assessment.mdx` (10/10/5) + optional teacher notes, at least two figure carriers per topic
and at least one concept-map/flowchart/timeline per unit, plus the four governance tables
(`coverage/`, `sources/`, `figures/`, `concepts/`).

## What is measured

Per unit, recorded in the table below when the unit's G3 closes:

| Field | Meaning |
|---|---|
| Elapsed | Wall-clock from authoring start to G3-ready |
| Gate reruns | How many times the content gate set had to be re-run before green |
| Findings at G3 | Review findings raised, split blocking / advisory |
| Figures | Carriers authored, and how many needed a second pass |
| Notes | What actually consumed the time |

English only through G3. G4 Urdu translation is a second rate and is **not** mixed into this
one; conflating them is what produced the unusable 0.25 figure.

**Urdu rate probe (ADR-0022, decision 3).** One unit from this run also goes through G4/G5,
timed separately, for the sole purpose of measuring the Urdu rate before the corpus-wide English
phase defers every other translation to the end. It is measurement, not the start of the Urdu
phase. Record it in its own row below rather than in the unit's English row, so the two rates
never merge. Use unit 2, so the probe result is available while four units of English work
remain and the plan can still absorb what it says.

## Conditions

- Standard frozen at style guide **v4.3**. A revision mid-run invalidates the comparison, so a
  defect found during the run goes to `specs/backlog.md` unless it blocks authoring outright.
- Review during the run is **human or advisory-agent only**. ADR-0021 makes the review agent the
  primary mechanism, but Feature 014 T007/T008 are unstarted, so the agent cannot certify. The
  run therefore measures the authoring side; the review side's rate is a separate measurement
  once qualification lands.
- **Known defect carried into the run:** F-11, wide figures illegible at 360px, is unfixed by
  owner decision. Figures authored here will carry it, so a later responsive-figure fix will
  touch all five units. Recorded so the rework is not mistaken for a new defect.

## Results

| Unit | Elapsed | Gate reruns | Findings (blocking/advisory) | Figures | Notes |
|---|---|---|---|---|---|
| 2 | - | - | - | - | not started |
| 3 | - | - | - | - | not started |
| 4 | - | - | - | - | not started |
| 5 | - | - | - | - | not started |
| 6 | - | - | - | - | not started |

### Urdu rate probe

| Unit | Stage | Elapsed | Findings | Notes |
|---|---|---|---|---|
| 2 | G4 ur-translation | - | - | not started |
| 2 | G5 ur-review | - | - | not started |

**Target set from this run:** to be written when unit 6 closes. State the rate, the conditions
it holds under, and what would have to change for 15/week to be reachable.
