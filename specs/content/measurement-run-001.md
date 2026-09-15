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
| 2 | one session (2026-09-14) | 4 | pending G3 | 8 carriers, all prompt-only | G1 had to be written first: the tracker's `✅` was earned by the legacy draft, so the per-topic checklist, topic list, depth budget, figure plan and blueprint did not exist. Two source gaps (Rest, NACTE) resolved at Step 1. Gate reruns were all mechanical: two over-long `description` fields, a wrong fourth column in the Reinforcement table, and the depth gate correctly refusing a `### Topic list` with no topic files yet on disk |
| 3 | one session (2026-09-14) | 2 | pending G3 | 10 carriers, all prompt-only | G1 again absent despite a `✅` row. Five guide sections mapped one-to-one onto five topics, so no partition judgement was needed. Four new sources located and registry-verified (three Crossref, one ERIC). Landed at 156 reading-min, inside the band this time, because the provisional band was set wider after Unit 2 |
| 4 | one session (2026-09-14) | 2 | pending G3 | 8 carriers, all prompt-only | G1 absent again behind a `✅`. One new source (isore2009, ERIC-verified). **The primary document was unreachable from this host** (three routes, 403/404), so the ten standard names rest on corroborated secondary sources and are flagged for reviewer confirmation. Landed at 128 reading-min, inside band |
| 5 | one session (2026-09-15) | 3 | pending G3 | 8 carriers, all prompt-only | G1 absent again behind a `✅`, fourth time. Five new sources, all verified by **reading abstracts** rather than registry metadata, after the Unit 2/3 reviews showed metadata cannot catch a source that does not support the claim. Six of twelve sub-topics carry `no-external-source` deliberately: no verifiable source exists for the Pakistan-specific conditions, and the prose says so. Gate reruns: two long descriptions, one answer-key gate false positive on an ordinary teaching phrase, one concepts file that wrongly claimed no banked terms existed |
| 6 | one session (2026-09-15) | 2 | pending G3 | 8 carriers, all prompt-only | G1 absent again behind a `✅`, fifth and final time. Four of six sources already on the course list; one new (kwakman2003) has no abstract and is cited for its question only. Clean one-to-one guide mapping made this the fastest unit to spec. Landed at 133 reading-min, inside band |

### Urdu rate probe

| Unit | Stage | Elapsed | Findings | Notes |
|---|---|---|---|---|
| 2 | G4 ur-translation | - | - | not started |
| 2 | G5 ur-review | - | - | not started |

### Observations so far

- **G1 is not free, and the tracker over-reported it.** Unit 2's `G1 unit-spec` row read `✅`,
  but that certified the legacy five-file spec. The per-topic G1 artefacts had to be authored
  before the `author-unit` skill would run at all. Expect the same for units 3 to 6, and expect
  the tracker to claim otherwise in each case.
- **Source resolution is real work and is not optional.** The guide names Rest's four-component
  model and NACTE guidelines with no references. One resolved to a verifiable DOI; the other
  turned out not to exist as a separate artefact at all. Both took search, and neither could be
  faked.
- **The draft ran 13% over the provisional depth band** (141 against 95-125). The band was
  re-baselined rather than the prose trimmed, per the authoring rule. The provisional band was
  set from Unit 1's per-topic figures, which understated a unit with five sub-topics in one
  topic.

**Target set from this run:** to be written when unit 6 closes. State the rate, the conditions
it holds under, and what would have to change for 15/week to be reachable.
