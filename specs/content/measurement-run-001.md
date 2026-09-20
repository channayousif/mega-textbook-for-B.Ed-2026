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

## Result

Five units, EFMP-302 Units 2 to 6, drafted to the per-topic standard through G3-ready in a single
working session on 2026-09-14 and 2026-09-15.

| Unit | EN words | Topics | Figures | Reading-min | Sub-topics | Concepts |
|---|---|---|---|---|---|---|
| 2 | 13,746 | 4 | 8 | 143 | 14 | 22 |
| 3 | 15,716 | 5 | 10 | 166 | 13 | 20 |
| 4 | 12,218 | 4 | 8 | 128 | 12 | 17 |
| 5 | 13,604 | 4 | 8 | 141 | 12 | 16 |
| 6 | 12,695 | 4 | 8 | 133 | 13 | 15 |
| **Total** | **67,979** | **21** | **42** | **711** | **64** | **90** |

The corpus grew from roughly 6,000 words of legacy five-file drafts to 67,979 words, plus twenty
governance tables and forty-two figure specifications.

## The rate, and what it does and does not establish

**Five units per session is not the Phase 5 rate**, and reporting it as one would repeat the error
this run was designed to correct. What the run measured is the **authoring** step only, by one
agent, in English, to G3-ready. It excludes five things that are on the critical path:

1. **G3 review.** Two units were reviewed. Both returned `escalate`, and both found defects that
   the seven automated gates passed over: a fabricated author initial, a conclusion retained after
   its source was disowned, a framework attributed to a paper containing a different model, and a
   substitution inferred from a failed search. Units 4, 5 and 6 have not been reviewed at all.
2. **Repair after review.** The two reviewed units each required a substantial repair pass.
3. **Figure rendering.** All forty-two figures are `prompt-only`. None has been drawn.
4. **Urdu translation and G5.** Deferred wholesale under ADR-0022.
5. **Owner Content-gate acceptance**, which no agent can supply.

A rate that counts only step one and reports it as throughput is exactly the "measured attainment
versus what was learned" error that Unit 3 of this very course warns about.

## What the run actually establishes

**G1 was missing behind a `✅` tracker row in all five units.** Not four, not most: all five. The
tracker systematically over-reported the stage that gates everything downstream, because those
ticks were earned by the legacy drafts. **Assume this for every remaining course**, and budget G1
as real work rather than as a check.

**Automated gates cannot see the defects that matter.** Seven gates passed on Units 2 and 3 while
both contained citation errors serious enough to reach a student's bibliography. The gates verify
structure; they cannot verify that a source supports a claim. This is the strongest evidence yet
for ADR-0021's central argument, and it was produced by the authoring work itself.

**Source verification is a distinct and substantial cost.** Registry metadata confirms a citation
exists and is accurate. Reading an abstract confirms scope. Neither confirms that the source
supports the specific claim, which needs the full text, and full text was unavailable from this
host for several sources. Units 5 and 6 changed method as a result, and both carry explicit scope
statements in their prose.

**Provisional depth bands set from another unit understate.** Unit 2 overshot its band by 13%.
Every later band was set wider and every later unit landed inside.

**A clean guide-to-topic mapping is worth roughly a session's difference.** Units 4 and 6 mapped
one-to-one and were fastest. Units 2 and 5 needed a partition judgement that only the curriculum
owner can confirm, and both still carry that open question.

## What would have to change for 15 units per week

Nothing in this run shows 15/week is unreachable, and nothing in it shows it is reachable either,
because the run measured one step of five. What it does identify as the binding constraints:

- **Review capacity, not authoring capacity.** Two reviews took a substantial fraction of the time
  five units of authoring took, and both escalated. Until agent review is qualified under Feature
  014 T007/T008, every unit needs a human G3, and that is the ceiling.
- **Source access.** Several publishers and one government site are unreachable from the authoring
  host. That is an infrastructure problem with a direct content cost, recorded in
  `specs/gaps.md`.
- **Figure rendering**, untouched here and estimated nowhere.

**Recommendation.** Do not set a Phase 5 unit target from this run. Set one after a second run
that measures a unit end to end, including review, repair and figures, on a unit whose G1 is
genuinely complete before it starts.
