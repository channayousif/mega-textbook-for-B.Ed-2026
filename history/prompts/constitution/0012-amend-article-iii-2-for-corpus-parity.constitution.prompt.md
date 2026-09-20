---
id: 0012
title: Amend Article III.2 for corpus parity
stage: constitution
date: 2026-09-14
surface: agent
model: claude-opus-5
feature: none
branch: main
user: M Yousif Channa
command: /sp.constitution
labels: ["constitution", "bilingual", "urdu-parity", "adr-0022", "major-bump"]
links:
  spec: null
  ticket: null
  adr: history/adr/0022-english-first-corpus-with-deferred-urdu-parity.md
  pr: null
files:
 - .specify/memory/constitution.md
 - specs/content/style-guide.md
 - history/prompts/constitution/0012-amend-article-iii-2-for-corpus-parity.constitution.prompt.md
tests:
 - npm run check:content (8/8 PASS)
 - npm test (268/268)
---

## Prompt

ok  runit then stsrt suthoring

*(Read as: run the constitution amendment, then start authoring. Executes ADR-0022's decision 2,
which the owner had selected in the preceding turn.)*

## Response snapshot

Constitution **3.0.0 -> 4.0.0** (MAJOR). Article III.2's Urdu-parity obligation changes from a
per-unit **publish gate** to a **corpus completion requirement**. A unit may publish
English-only and must then render the "Urdu translation not yet available" banner.

The skill's flow assumes `.specify/memory/constitution.md` is an unfilled template with
`[PLACEHOLDER]` tokens. It is not: it is a live v3.0.0 document carrying its own stacked
SYNC IMPACT REPORT convention. Followed the document's convention instead of the template flow,
and said so rather than forcing the file into the template shape.

Scope came out narrower than expected, because two artefacts that looked like they needed
amending did not:

- **Spec 001 FR-003 needs no change.** It already specifies that a unit with no Urdu file falls
  back to English under the "Urdu translation not yet available" banner. The behaviour the
  amendment now depends on was specified in Phase 1 and built; it was the constitution that
  forbade relying on it.
- **Article VII's Content-gate row is unchanged.** "Urdu parity and register" still holds,
  because the gate checks parity wherever an Urdu version exists.

Changed: Article III.2, the version footer, a prepended v4.0.0 sync impact report, and
`specs/content/style-guide.md:117` which restated the publish rule (style guide 4.3 -> 4.4).
No `.specify/templates` file references parity, so none needed review.

Wrote the amendment so it relaxes **when** parity is owed and never **whether**: the new text
states explicitly that a corpus shipping complete in English and incomplete in Urdu does not
satisfy the article, and that an English-only unit must never be presented as a finished
bilingual one.

## Outcome

- Impact: Constitution at 4.0.0; style guide at 4.4. English-first corpus authoring is now permitted to publish as it goes. No content authored yet in this turn.
- Tests: `npm run check:content` 8/8 PASS; `npm test` 268/268; no em dash added to the constitution (the 78 present are pre-existing and outside the gate's scanned scope); zero unresolved bracket tokens.
- Files: constitution, style guide, this PHR.
- Next prompts: begin authoring EFMP-302 Unit 2 under measurement run 001; run the unit 2 Urdu rate probe early enough to still reshape the plan.
- Reflection: ADR-0022 is still **Proposed** while the amendment it argues for is now applied. That ordering is backwards and is recorded in the sync report as a follow-up: if the owner rejects the ADR, this amendment reverts with it.

## Evaluation notes (flywheel)

- Failure modes observed: a skill whose documented flow did not match the artefact it operates on (template-with-placeholders vs live versioned document); the risk of over-propagating an amendment into artefacts that already permitted the new behaviour. Mitigated by reading FR-003 and Article VII before editing them, and changing neither.
- Graders run and results (PASS/FAIL): version line matches the sync report (PASS); dates ISO (PASS); no unexplained bracket tokens (PASS); bump classification argued rather than asserted, MAJOR because existing specs assuming a publish-time parity gate are invalidated (PASS); obligations removed: none, one rescheduled (PASS).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): have the owner accept or reject ADR-0022 so the ADR and the amendment stop disagreeing about their own status.
