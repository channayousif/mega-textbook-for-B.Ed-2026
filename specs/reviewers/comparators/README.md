# Comparator base

Owner-labelled review cases, held out, used to qualify a candidate reviewer - human or agent -
before that reviewer is trusted to close a gate.

**This is not a new standard.** The method is already written in `../human-reviewers.md`:

> The candidate reviews two or three units the curriculum owner has already reviewed, **blind**
> to the owner's findings. Compare on: (1) agreement over blocking findings, (2) false passes,
> decisively.

That file describes the method and had nowhere to keep the cases. This directory is that place.
`registry.json`'s `qualification.evidence_path` (see
`specs/014-agent-review-governance/contracts/review-evidence.md`) is what a completed evaluation
against these cases produces; Feature 014 T008 ("record real qualification results") is blocked
until cases exist to qualify against.

## Why the cases have to be written down

Before this directory, every human review pass evaporated. The EFMP-301 Unit 1 G5 register pass
of 2026-09-14 found five real terminology divergences and refuted one predicted defect, and the
only trace was a commit message, a PHR and a backlog line. None of that can score a candidate.
ADR-0021 makes this the primary place new quality knowledge lands, because a comparator scales
with units authored while a style-guide rule competes with them.

## What one case is

A case freezes three things:

1. **Inputs at an exact commit.** The candidate reviews the unit as of that SHA, not as of HEAD.
   This matters more than it looks: case 001's findings only exist at `392b626`, because the
   resolution committed at `5d0a239` banked the divergent terms as accepted pairs and the
   divergences stop being divergences at HEAD.
2. **The task**, phrased as the candidate receives it.
3. **The key** - the owner's findings, each with a file locator and the evidence that settles
   it, plus any **traps**: defects that were predicted and are not real. A candidate reporting a
   trap is producing a false positive, which the method's second criterion does not measure and
   should.

## Scoring

Per `human-reviewers.md`, in order:

1. **False pass is disqualifying.** A candidate who passes a unit the owner failed is not
   qualified, however well it scored elsewhere.
2. **Agreement over blocking findings.** Which of the key's findings did the candidate find.
3. **False positives.** Findings reported that the key records as traps, or that the candidate
   cannot support with a locator and evidence.

Record the result in the candidate's entry: `human-reviewers.md` for a person,
`registry.json`'s `qualification` block for an agent.

## Honest limitation

The key sits in the repository, so blindness is **procedural, not enforced**: whoever runs a
qualification must withhold this directory from the candidate. It is deliberately outside the
review-evidence input manifest's bound set, so it does not perturb report digests, but nothing
stops an agent that can read the tree from reading it. Treat a case as burned once a candidate
has seen its key, and write a new one.

## Cases

| ID | Course | Unit | Stage | Frozen at | Findings | Traps |
|---|---|---|---|---|---|---|
| 001 | EFMP-301 | 1 | G5 | `392b626` | 5 | 1 |
