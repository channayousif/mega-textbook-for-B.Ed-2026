---
id: 0008
title: Refresh Unit Two Gate Evidence
stage: misc
date: 2026-10-19
surface: agent
model: gpt-6
feature: gsos-301
branch: crew/gsos-301-u02-translate-r1
user: board
command: Read .crew/brief.md and carry it out
labels: ["board-direct", "translation", "GSOS-301", "unit-02"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gsos-301/tasks.md
  - specs/content/gsos-301/reviews/unit-02/G2/20261019T064629801Z-gates.json
  - specs/content/gsos-301/reviews/unit-02/G2/logs-20261019T064629801Z/
  - specs/content/gsos-301/reviews/unit-02/G4/
  - history/prompts/gsos-301/0008-refresh-unit-two-gate-evidence.misc.prompt.md
tests:
  - "Fresh G2 evidence: all eight draft commands PASS"
  - "Current origin/main content baseline: 13/13 PASS"
  - "Temporary reviewed parity probe: structural and figure PASS; expected unfinished G4/G5 and derived status failures; both flags restored"
  - "Five files: metadata, heading vectors and component counts match"
  - "figures:variants:check: PASS (810 sources)"
  - "Final check:content: 13/13 PASS"
  - "git diff --check: PASS"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the existing complete Urdu mirror and prior semantic repairs. Regenerated stale G2 draft evidence with the repository tool and updated the Unit 2 tracker reference. Both locales remain draft, with no G3/G5 certification. Recorded actual gate and parity results and committed locally without pushing or opening a PR.

## Outcome

- Impact: Removed the sole new draft gate finding, stale G2 evidence.
- Tests: Fresh evidence checks, current-main baseline, conditional parity, direct structure checks and figure variants; final draft suite passes all 13 gates.
- Files: New G2 evidence and logs, G4 validation logs, tracker reference and this PHR.
- Next prompts: Resolve English advisory findings, then independent rendered G5 review.
- Reflection: The translation handoff under figures is a G2-bound input. Adding it in the previous repair invalidated G2 despite leaving English prose unchanged. Preserve old evidence and prepare a fresh bundle; never edit evidence hashes manually.

## Handoff (for CEO and agents)

- Shipped / changed: Fresh reproducible G2 evidence prepared from committed inputs at c9af609d; tracker points to the new record. Prior five-file Urdu repairs retained.
- Decisions the team must respect: G4 remains in progress as explicitly requested by the brief; translation_status remains draft. No G3/G5 approval, publication change, build, dev server, push or PR. Existing handoff remains applicable; do not edit G2-bound handoff inputs without refreshing evidence.
- Pending / next owner: English author resolves inherited citation, Mead age, Bloom/rubric/coverage findings; curriculum owner considers unbanked terms; independent G5 reviewer inspects rendered desktop/narrow/A4 Urdu after accepted English is settled. Rendering was excluded by the brief's build/server prohibition.
- Paperclip issues affected: None supplied or changed.

## Evaluation notes (flywheel)

- Failure modes observed: Previous handoff addition invalidated the English draft manifest. Temporary reviewed probe correctly rejects unfinished review stages and temporary derived-status mismatch.
- Graders run and results (PASS/FAIL): Final draft content PASS, main baseline PASS, figure variants PASS, direct structural checks PASS. Reviewed probe FAIL only on the expected governance and derived-status checks.
- Prompt variant (if applicable): crew/gsos-301-u02-translate-r1
- Next experiment (smallest change to try): Render the Urdu after the English baseline is accepted.
