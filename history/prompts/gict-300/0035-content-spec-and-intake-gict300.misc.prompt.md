---
id: "0035"
title: "content-spec and intake GICT-300"
stage: misc
date: 2026-09-23
surface: agent
model: LongCat-2.0
feature: 020-author-gict-300
branch: 020-author-gict-300
user: a2ahs
command: orchestrator task (Phase 2)
labels: ["gict-300", "content-spec", "intake", "G0", "G1", "D-2026-0030", "G-2026-25"]
links:
  spec: specs/content/gict-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gict-300/content-spec.md
  - specs/content/gict-300/intake/manifest.json
  - specs/content/gict-300/intake/evaluation.md
  - specs/content/gict-300/tasks.md
  - specs/decisions/log.md
  - specs/gaps.md
tests:
  - node scripts/prepare-intake-evidence.mjs GICT-300 specs/content/gict-300/intake
  - evaluator-verified digest replay of all 54 bound inputs
  - spec-side invariant replay with the depth gate's own parsers (zero failures)
---

## Prompt

Orchestrator task (excerpt): "Phase 2 - G1 content-spec + G0/G1 intake (Constitution Art.
VII.8): Author specs/content/gict-300/content-spec.md (status: draft) ... Commit. Then run
prepare-intake-evidence ... Spawn the evaluator agent as a FRESH subagent ... Give it the
manifest path, course code GICT-300, and YOUR D-code block (D-2026-0030..0039) ... Apply
evaluator findings (max 2 repair cycles, then escalate) ... Only after approval set
content-spec status: approved. Create specs/content/gict-300/tasks.md tracker."

## Response snapshot

Authored the G1 content-spec: 6 units following the guide's own Unit 1-6 headings, 40
sub-topic checklist rows decomposing the guide's 31 bullets (9 compound-bullet splits, each
grounded in the guide's own text), 23 topics, 46 planned figures, 10/10/5 blueprints per
unit, derived-and-labelled week schedule per D-2026-0012, 5 guide readings at title level per
D-2026-0001 plus 14 verified open-access supplements, and a self-declared open_access_floor
of 2 per unit. Verified all open-access URLs before drafting (Bourgeois OTL, OSTEP, NIST
SP 800-145, NIST IR 8202, ITU-T Y.2060, DigComp 2.2 DOI, Purdue OWL, NCA, Common Sense,
WIPO, Pakistan NCSP 2021, UNESCO ICT CFT v3 and UNESCO AI 2021 with the known unesdoc 403
flag).

Spawned the evaluator as a fresh subagent with the pre-assigned D-code block. It verified all
54 manifest digests at 73001c11, ran the deterministic gates (every failing finding belonged
to GENG-300, not GICT-300), replayed the spec-side invariants with the depth gate's own
parsers (zero failures), and approved under D-2026-0030 (pending-owner-review). It escalated
the derived 16-week calendar as G-2026-25 (G-2026-16 precedent) and reported two repair
items: (a) blueprint bands in the parseable bullet format, (b) Unit 1 reading-min alignment.
Both repairs were applied (blueprint blocks rewritten; depth budgets recalibrated to 65-95 /
65-95 / 60-90 / 65-95 / 55-80 / 70-100) and verified to parse with check-bloom-bands's own
specBands(). The spec status is approved; the tracker is created with all six G1 rows done.

## Outcome

- ✅ Impact: GICT-300 content-spec approved at intake; unit authoring unblocked. One open
  escalation (G-2026-25, calendar only).
- 🧪 Tests: manifest digests verified by evaluator; spec invariants replayed zero-failure;
  blueprint bands parse; no em dash.
- 📁 Files: content-spec.md, intake manifest + evaluation, tasks.md tracker, decisions log
  (D-2026-0030), gaps (G-2026-25). Committed 73001c1 and 708d85c.
- 🔁 Next prompts: Phase 3 - author Unit 1 (Introduction to Computer Literacy and ICT).
- 🧠 Reflection: the evaluator's repair item (a) caught that my condensed blueprint prose
  would have left check-bloom-bands vacuous for the whole course - a defect class that
  matters more here because GICT-300 can publish gate-checked under D-2026-0014. The
  pre-commit verification of every open-access URL before drafting kept the readings
  criterion cheap to approve.

## Evaluation notes (flywheel)

- Failure modes observed: blueprint prose format unparseable by specBands(); depth budgets
  initially set too tight (55-75) against realistic file minute sums.
- Graders run and results (PASS/FAIL): intake PASS under D-2026-0030; G-2026-25 open.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): author Unit 1 with topic bands 12-16/12-16/10-14/
  12-16 against the 65-95 unit budget and confirm the depth gate on the first try.
