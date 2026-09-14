---
id: 0022
title: English first corpus sequencing
stage: general
date: 2026-09-14
surface: agent
model: claude-opus-5
feature: none
branch: main
user: M Yousif Channa
command: none (direct instruction)
labels: ["content-sequencing", "bilingual", "constitution", "adr", "phase-5"]
links:
  spec: null
  ticket: null
  adr: history/adr/0022-english-first-corpus-with-deferred-urdu-parity.md
  pr: null
files:
 - history/adr/0022-english-first-corpus-with-deferred-urdu-parity.md
 - history/prompts/general/0022-english-first-corpus-sequencing.general.prompt.md
 - specs/content/measurement-run-001.md
tests:
 - npm run check:content (8/8 PASS)
---

## Prompt

start with en version for all first, once the whole corpus as complete then we will move to the ur version. note the ADR

## Response snapshot

Checked the instruction against the constitution before drafting, and found a hard collision.
Article III.2 (`.specify/memory/constitution.md:488`) requires "a complete Urdu version accepted
through G5 **before publish**" with only the `bilingual: false` course-level exemption. English
first is free for authoring and forbidden for publishing: left unamended, roughly 200 units would
accumulate gate-green and invisible until the Urdu phase closed. The `bilingual: false` escape
does not apply, since it designates a course permanently English-only.

Also found that the English-only reading path already exists and is merely forbidden:
`src/components/TranslationStatusBadge.tsx:6` has carried `status="untranslated"` ("Urdu
translation not yet available, EN fallback shown") since Spec 001.

Put two decisions to the owner rather than assuming, because each changed what the ADR would
say. Answers: amend Article III.2 to publish English-only with the untranslated banner (a MAJOR
constitution bump, 3.0.0 to 4.0.0), and translate one unit early as a rate probe.

Filed ADR-0022 with four linked decisions: English corpus first through G3; Article III.2
relaxed from a per-unit publish gate to a corpus completion requirement with a mandatory banner;
one early G4/G5 translation purely to measure the Urdu rate; measurement run 001 unaffected.
Recorded the strongest argument each way - the terminology bank matures across the corpus before
translation (v4.2's four accepted pairs exist precisely because two units were translated against
a bank that moved between them), against the fact that deferring all Urdu concentrates the
least-measured and most-bottlenecked work into one terminal phase.

Added the probe to `specs/content/measurement-run-001.md` as its own row set, on unit 2, so the
result lands while four units of English work remain and the plan can still absorb it.

## Outcome

- Impact: ADR-0022 filed (Proposed). Content sequencing for the whole of Phase 5 changes axis from per-unit bilingual to corpus-wide English then Urdu. No content authored yet.
- Tests: `npm run check:content` 8/8 PASS; ADR has no unresolved placeholders and no em dashes.
- Files: 1 ADR, 1 PHR, 1 measurement-protocol edit.
- Next prompts: the Article III.2 amendment itself via `/sp.constitution` (deliberately not done here); then begin authoring EFMP-302 Unit 2.
- Reflection: the instruction was about authoring order and the binding consequence was about publishing. Asking rather than assuming was the whole value of the turn: had the collision gone unnoticed, the corpus would have been authored under a rule that silently forbade shipping any of it.

## Evaluation notes (flywheel)

- Failure modes observed: an instruction whose stated scope (authoring) differs from its binding constraint (publishing); the temptation to treat "start with en" as purely a task-ordering request and begin work immediately. Mitigated by reading Article III.2 before drafting anything.
- Graders run and results (PASS/FAIL): ADR significance checklist - clustered decision spanning sequencing, the constitution and the measurement protocol (PASS); alternatives with rationale, three recorded (PASS); positive and negative consequences, including the weakened bilingual promise stated plainly (PASS); concise (PASS).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): run the unit 2 Urdu probe early enough that its result can still change the plan. If the Urdu rate is worse than the English rate by a wide margin, the terminal-phase assumption in ADR-0022 needs revisiting before fifty units of debt exist rather than after.
