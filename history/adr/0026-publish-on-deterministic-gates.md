# ADR-0026: Publish on deterministic gates, review as an improvement loop

- **Status:** Accepted (owner instruction 2026-09-20: "we have to author and provisionally
  publish all courses, further improvements are left for improvement loops")
- **Date:** 2026-09-20
- **Scope:** Publication policy for the build-out of the 15 catalogued courses.
- **Constitution:** 4.2.0 -> 5.0.0 (MAJOR)
- **Amends in part:** ADR-0025, which made a passing agent review the precondition for
  publication. That precondition is removed for the build-out; the tier ADR-0025 created remains.

## Context

ADR-0025 created a provisional tier: a unit could publish once an independent agent review
returned `pass`, under a "Final Review Pending" notice. That was the right answer for one course.

It does not survive contact with the programme. The measured record on EFMP-302, the only course
taken through the tier:

| | |
|---|---|
| Units authored | 6 |
| Units that reached a passing review | **1** |
| Review cycles spent | 6, 7, 4, 4 on Units 3, 4, 5, 6 against ADR-0019's limit of **two** |
| Units parked with open findings | 3 |

One in six, at four to seven cycles each. The remaining 14 courses hold roughly 84 more units.
At that conversion the corpus does not get built; it accumulates parked units and review debt,
and the only thing students see is the one unit that happened to converge.

The cycles were not one defect resisting repair. Reading the reports, cycles five through seven
on Unit 4 each surfaced *new* defects, several introduced by the preceding repair. More cycles
were not converging on a pass, and `D-2026-0005` refused a blanket waiver of the limit for
exactly that reason.

Meanwhile the deterministic gates got substantially stronger during that course: a figure-geometry
measurement, a Bloom-band gate, a source-scope cross-check, a concept-graph cross-topic check, and
a tightened answer-key scope. Nine gates now run on every unit, and they catch the classes of
defect that are mechanically checkable.

## Decision

**A unit publishes when its deterministic gates pass, under a notice saying no reviewer has read
it. Review follows asynchronously and upgrades the notice.**

Three tiers, derived from the tracker, not authored:

| Tier | Requires | Reader-facing notice |
|---|---|---|
| `gated` | valid G2 `auto:gates` evidence whose manifest matches the published bytes | **"Draft - expert review pending"** |
| `provisional` | an agent review returned `pass` (ADR-0025, unchanged) | "Final Review Pending" |
| `certified` | a qualified, signed review (Art. VII.5; not yet reachable) | none |

1. **Publication authority is not self-granted.** Art. VII.1 does not delegate publication.
   Publishing under `gated` requires a standing owner authorisation recorded in
   `specs/decisions/log.md` naming the courses it covers. Without that clause the plumbing would
   authorise ~90 publications by itself.
2. **A broken claim of review is worse than no claim.** A G3 row that is *present* but whose
   evidence does not validate remains a gate failure. Only the *absence* of review is permitted.
3. **The notice is the whole mitigation, so it fails loud.** A missing, malformed or stale status
   report is a build failure, not a silent absence of banners. An unrecognised tier renders the
   strongest notice, never none.
4. **Status must agree with the evidence kind.** `gates:`→`✅`, `provisional:`→`🟡`, `review:`→`✅`.
5. Nothing here certifies anything, qualifies any reviewer, discharges the practicing-teacher
   gate, or changes `translation_status`. Every published-but-uncertified unit stays in the review
   queue.

### Exit condition

**This provision covers the build-out of the 15 catalogued courses and nothing beyond it.** When
those courses are authored, the owner decides explicitly whether to keep, narrow or withdraw it.
A unit that is still `gated` at that point is reviewed or withdrawn; it does not become permanent
by default.

## Alternatives considered

- **Keep the bar (publish only on a passing review).** Most honest, and rejected on the measured
  evidence: one unit in six, with no mechanism that would raise that rate. The predictable result
  is ~13 published units and 77 invisible ones.
- **One review cycle per unit, publish either way.** Publishes everything while still buying one
  independent read per unit. Rejected as the slowest option that still does not gate on quality:
  ~90 reviewer runs on the critical path, each 8-10 minutes, for findings that go to the
  improvement loop regardless. Worth revisiting once the corpus exists.
- **Lower the figure-density floor instead.** Would have roughly halved the largest cost without
  touching the publication bar. The owner declined: Art. III.10 stands.
- **Publish with no notice at all.** Never considered seriously. Art. III.2's untranslated banner
  is the standing precedent that a gap is disclosed rather than hidden.

## Consequences

### Positive

- The corpus can actually be built, and each unit is visible as it completes rather than after a
  review queue drains.
- Review becomes what it is good at - finding real defects - instead of a publication gate it was
  converting at one in six.
- The gates become the load-bearing quality mechanism, which is an incentive to keep strengthening
  them. Four were added or tightened during EFMP-302 precisely this way.

### Negative

- **Unreviewed content reaches students, and reviews have caught things that matter.** On this
  course alone: a fabricated Ehrich et al. attribution, a false NACTE accreditation claim, a
  fabricated `N=77` sample size, and a figure teaching the wrong answer to its own MCQ. **Every
  one of those passed the deterministic gates.** G2 proves shape, not truth; nothing in
  `DRAFT_COMMANDS` can read a citation and judge whether it supports the sentence citing it.
- **An async loop with no deadline has a stable state of never running.** Nothing currently
  measures the age of the unreviewed backlog. If the loop is to be real it needs a number, and
  this ADR does not supply one.
- **"Certified" becomes the only remaining quality claim while being the weakest-evidenced state
  in the system** - a human-initials tracker row is checked by nothing beyond its shape.
- Two relaxations of the publication bar in three days. That is worth noticing as a pattern, not
  just as two decisions.

## References

- ADR-0025 (the provisional tier this amends), ADR-0019 (delegated review and the two-cycle
  limit), ADR-0023 (gates red by design during authoring).
- `D-2026-0005` (no blanket waiver of the cycle limit), and the standing publication
  authorisation recorded alongside this ADR.
- `specs/content/efmp-302/tasks.md` and `specs/content/efmp-302/reviews/` for the measured record.
