---
id: "0038"
title: "G3 and G5 review campaign for GICT-300"
stage: misc
date: 2026-09-24
surface: agent
model: LongCat-2.0
feature: 020-author-gict-300
branch: 020-author-gict-300
user: a2ahs
command: orchestrator task (Phases 4-5)
labels: ["gict-300", "g3", "g5", "review", "advisory", "adr-0019"]
links:
  spec: specs/content/gict-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gict-300/reviews/**/G3/** (10 reports across 6 units)
  - specs/content/gict-300/reviews/**/G5/** (6 reports)
  - specs/content/gict-300/tasks.md (tracker rows)
  - specs/gaps.md (G-2026-26)
  - English/Urdu/governance repairs across all units
tests:
  - npm run check:content (0 gict-300 findings at final state)
  - node scripts/review-evidence.mjs validate on every report (all exit 0)
  - measure-figure-text / figures:variants:check clean after every figure repair
---

## Prompt

Orchestrator task (excerpt): "Phase 4 - G3 review on EVERY unit (advisory) ... Phase 5 -
G4 translation + G5 review on EVERY unit (full Urdu): ... G5: ... spawn g5-reviewer agent
(subagent_type: g5-reviewer) FRESH. It binds to the accepted G3 evidence per freshness
rules; advisory. ... Max 2 review cycles then escalate under your G-code block."

## Response snapshot

Ran the full advisory review campaign with fresh subagent reviewers under ADR-0019,
capped at 2 concurrent per the orchestrator's capacity directive. G3: 10 runs across 6
units (units 1, 3, 4, 5 needed run 002 after repairs staled their first evidence); final
dispositions: U1 pass (run002), U2 pass, U3 revise->repaired (2-cycle budget exhausted,
escalated), U4 revise->repaired (same), U5 pass (run002), U6 pass. G5: 6 runs (one per
unit); dispositions: U1 escalate (dependency, Urdu defects repaired), U2 revise (figure
labels repaired), U3 revise (Urdu defects repaired), U4 escalate (dependency, 6 Urdu
defects repaired), U5 revise (one ERQ-2 tag repaired), U6 revise (two figure labels
repaired). Every finding was repaired and committed; every repair that changed English or
governance bytes was followed by a G2 evidence regeneration (three full refreshes; final
evidence at 20260924T0319*). The repair cascade, in which each unit's repair stales every
other unit's manifest through the shared bound excerpt, consumed the review budget for
units 3, 4 and 1's G5 re-check; recorded as G-2026-26 with a tooling question for the
owner. All 74 Urdu key terms remain proposals for the owner to bank. Serialized
flip-verification of the full parity chain is clean except the expected unbanked-terms
and open-rows findings.

## Outcome

- ✅ Impact: every unit carries both G3 and G5 advisory reports; every blocking finding is
  repaired; the review chain is documented and its budget limits escalated.
- 🧪 Tests: check:content 0 gict-300 findings; all reports validate; figures clean.
- 🁁 Files: ~600 review artifacts, 6 tracker updates, 1 gap entry, repairs across all units.
- 🔁 Next prompts: check:all, push, PR.
- 🧠 Reflection: the freshness rule that binds shared governance files into every unit's
  manifest makes single-unit repairs invalidate the whole course's evidence - at 6 units
  this consumed the review budget; at 15 courses it will need the citedKeys derivation
  extended (the same gap that leaves the year-less excerpt keys ostep/wipoIP unbound).
  Reviewer agents reliably caught real defects (an 11-character password labelled
  "twelve", a misquote introduced by a repair, Chinese glyphs in an Urdu figure) that
  every deterministic gate passed.

## Evaluation notes (flywheel)

- Failure modes observed: repairs staling shared manifests; a repair introducing a new
  defect (the ostep misquote); silent no-op string replacements (two repairs claimed in
  commit messages never fired).
- Graders run and results (PASS/FAIL): all reports validate; final gates clean.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): assert every scripted string replacement
  fired (the two silent no-ops would have been caught by an assert).
