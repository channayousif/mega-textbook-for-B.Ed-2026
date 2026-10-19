---
id: crew-efmp-303-u03-refresh-g2
title: Refresh Unit Three Draft Evidence
stage: misc
date: 2026-10-18
surface: agent
model: gpt-6
feature: efmp-303
branch: crew/efmp-303-u03-translate
user: board
command: execute .crew/brief.md
labels: [board-direct, crew, translation, efmp-303]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-303/tasks.md
  - specs/content/efmp-303/reviews/unit-03/G2/20261019T020228252Z-gates.json
  - specs/content/efmp-303/reviews/unit-03/G2/logs-20261019T020228252Z/
  - specs/content/efmp-303/reviews/unit-03/G4/crew-g2-refresh/
  - history/prompts/efmp-303/crew-efmp-303-u03-refresh-g2.misc.prompt.md
tests:
  - npm run check:content on branch and detached origin/main
  - node scripts/prepare-gate-evidence.mjs EFMP-303 3
  - acceptGateEvidence validates all 106 current bound inputs
  - Six-page structural parity assertions
  - npm run build:content-status
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the two existing translation commits. The six Urdu pages and six Urdu figure pairs are retained. Captured fresh deterministic G2 evidence with the repository tool and updated only Unit 3's G2 reference. Kept the existing open G4 preparation row as translate-unit Step 7 requires. Translation status remains draft. No build, server, push or PR.

## Outcome

- Impact: Repaired the previous attempt's stale English draft evidence without changing content or review claims.
- Tests: Fresh evidence validates 106 bound inputs; all eight recorded G2 commands pass. Six-page metadata, heading vectors, component counts and file-set assertions pass. Final branch and clean origin/main both pass all 13 content gates. Logs are preserved under reviews/unit-03/G4/crew-g2-refresh/.
- Files: New immutable G2 capture and logs, one tracker reference, final comparison logs and this PHR.
- Next prompts: Content owner repairs outstanding G3 findings; permitted render host and independent G5 reviewer inspect Urdu pages after English freeze.
- Reflection: Translation handoff artifacts under specs/content are included in the English input manifest. Commit them before capturing G2, and keep later validation logs under reviews so evidence stays fresh.

## Handoff (for CEO and agents)

- Shipped / changed: Refreshed Unit 3 G2 with real gate execution and current hashes; earlier six-page translation and figure work preserved.
- Decisions the team must respect: Terminology bank and English content unchanged. G3/G4/G5 remain open and translation_status remains draft. No self-certification.
- Pending / next owner: Existing translation handoff remains authoritative for source commit, terminology proposals and English defects. Content owner owns G3 repairs; allowed render host owns desktop, narrow and A4 page inspection; fresh G5 reviewer owns semantic acceptance. Builds and servers remain prohibited in this crew job.
- Paperclip issues affected: None identified; ticket null.

## Evaluation notes (flywheel)

- Failure modes observed: Seven translation handoff artifacts added after prior G2 capture made its manifest incomplete. Refreshing the G2 tracker reference also required regenerating ignored static/content-status.json.
- Graders run and results (PASS/FAIL): Initial check FAIL on stale G2 only; capture PASS; evidence acceptance PASS; structural parity PASS; clean origin/main all 13 gates PASS. Final branch all 13 gates PASS.
- Prompt variant (if applicable): Crew retry with stale G2 feedback.
- Next experiment (smallest change to try): Preserve immutable capture inputs and obtain full Urdu render inspection on the permitted host.
