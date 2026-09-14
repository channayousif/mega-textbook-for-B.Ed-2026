---
id: 0021
title: Overspecification and review locus
stage: general
date: 2026-09-14
surface: agent
model: claude-opus-5
feature: none
branch: main
user: M Yousif Channa
command: /sp.adr quality-enforcement-moves-from-specification-to-review
labels: ["architecture", "authoring-standard", "review-pipeline", "adr", "overspecification"]
links:
  spec: null
  ticket: null
  adr: history/adr/0021-quality-enforcement-moves-from-specification-to-review.md
  pr: null
files:
 - history/adr/0021-quality-enforcement-moves-from-specification-to-review.md
 - history/prompts/general/0021-overspecification-and-review-locus.general.prompt.md
tests:
 - npm run check:content (8/8 PASS, before and after)
---

## Prompt

it feels that some things are overspecified. Check for that, as far as authoring is concerned, it must be automated and and its review is handeled by review agent, it will improve the content. the human review on top of that will improve the abilities and skills of the review agent. note for ADR

*(Followed by `/sp.adr quality-enforcement-moves-from-specification-to-review`, which authorized
creating the ADR the note had been drafted for.)*

## Response snapshot

Measured the overspecification claim against the working tree rather than agreeing with it.
Nine recorded style-guide revisions (v2.0 to v4.2) in 18 days against roughly 0.6 units shipped
in the same window, which is about 15 standard revisions per unit produced. 21,808 specification
lines against 28,388 EN content words; 15 gates; 111 lines of per-unit governance tables; 2 units
at publishable standard.

Three findings carried the analysis:

1. The v4.0 freeze is prose, not a gate, and was overridden twice within 24 hours (v4.1 and
   v4.2, both the same day). This is the identical defect the project already diagnosed in
   content at `SDD/ROADMAP.md:140` ("Phase 5 had no gate that could fail").
2. The gate is pointed away from the risk: `check:pipeline-gate` validates two `key_terms`
   entries and never reads the 121-term bank against the prose. The same day's EFMP-301 Unit 1
   register pass found five real divergences by hand, including a figure and its adjacent
   paragraph showing different Urdu words for one concept.
3. The standard grows because it is the only place quality knowledge can land, which
   `SDD/ROADMAP.md:113` already records as "six of them rebuild the authoring standard."

Drafted and then, on the `/sp.adr` invocation, filed ADR-0021: authoring automated end to end;
the review agent becomes the primary quality mechanism; the human pass is redefined as
calibration that produces comparators rather than per-unit certification; the standard shrinks
to deterministic invariants plus a comparator corpus; `terminology.csv` decouples from the
style-guide freeze. Status Proposed, not Accepted, because activation depends on Feature 014
T007/T008, which are unstarted.

Deviation recorded: the `/sp.adr` workflow Step 1 aborts when `plan.md` is absent. This ADR
derives from measured repository evidence and an explicit owner instruction rather than a
feature plan, and the branch is `main`, so `check-prerequisites.sh` failed by design. Proceeded
with `create-adr.sh` and said so rather than aborting.

## Outcome

- Impact: ADR-0021 filed (Proposed), recording a shift of quality enforcement from ex-ante specification to ex-post agent review with a human calibration loop. No code or content changed.
- Tests: `npm run check:content` 8/8 PASS before and after; ADR carries zero unresolved placeholders and zero em dashes.
- Files: 1 ADR, 1 PHR.
- Next prompts: decide Proposed vs Accepted; Feature 014 T007/T008 are the activation gate; consider decoupling `terminology.csv` from the style-guide freeze as the first reversible step.
- Reflection: the strongest evidence for the ADR was produced by the same session that violated the rule it describes. Bumping the style guide to v4.2 for a five-cell data edit is the concrete case the ADR argues against, and it happened while complying with the standard exactly as written.

## Evaluation notes (flywheel)

- Failure modes observed: an ADR-worthy claim arriving as an intuition ("it feels that") with no measurement attached; the temptation to agree with the owner's framing rather than test it. Mitigated by measuring first and reporting the numbers before endorsing the thesis.
- Graders run and results (PASS/FAIL): ADR significance checklist, all four criteria: decision is clustered across the standard, the gate set and the review pipeline (PASS); at least one alternative with rationale, three given (PASS); pros and cons for chosen and alternatives (PASS); concise but sufficient (PASS). Over-granular-ADR check: PASS, not a single-file or naming decision. Missing-alternatives check: PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): give `terminology.csv` its own version field so a vocabulary edit stops forcing a standard revision. It is the smallest reversible move that tests the ADR's central claim, and it is independently useful if the rest is rejected.
