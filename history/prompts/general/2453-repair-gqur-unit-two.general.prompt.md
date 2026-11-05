---
id: 2453
title: Repair GQUR Unit Two Findings
stage: general
date: 2026-11-05
surface: agent
model: GPT-6 (Codex; exact build unavailable)
feature: gqur-300-unit-02
branch: crew/gqur-300-u02-repair_en
user: owner via crew brief
command: Read .crew/brief.md and carry it out
labels: ["codex", "crew", "gqur-300"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/gqur-300/unit-02/topic-01.mdx
  - docs/semester-1/gqur-300/unit-02/topic-03.mdx
  - docs/semester-1/gqur-300/unit-02/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-02/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-02/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-02/unit-assessment.mdx
  - specs/content/gqur-300/sources/unit-02.md
  - specs/content/gqur-300/tasks.md
  - specs/content/gqur-300/reviews/unit-02/G3/repair-en-20261105.md
  - history/prompts/general/2453-repair-gqur-unit-two.general.prompt.md
  - specs/content/gqur-300/reviews/unit-02/G2/20261105T123854707Z-gates.json
  - specs/content/gqur-300/reviews/unit-02/G2/logs-20261105T123854707Z/validate-content.txt
  - specs/content/gqur-300/reviews/unit-02/G2/logs-20261105T123854707Z/check-depth-gate.txt
  - specs/content/gqur-300/reviews/unit-02/G2/logs-20261105T123854707Z/check-figures.txt
  - specs/content/gqur-300/reviews/unit-02/G2/logs-20261105T123854707Z/check-concept-graph.txt
  - specs/content/gqur-300/reviews/unit-02/G2/logs-20261105T123854707Z/check-bloom-bands.txt
  - specs/content/gqur-300/reviews/unit-02/G2/logs-20261105T123854707Z/check-no-em-dash.txt
  - specs/content/gqur-300/reviews/unit-02/G2/logs-20261105T123854707Z/check-no-answer-keys.txt
  - specs/content/gqur-300/reviews/unit-02/G2/logs-20261105T123854707Z/check-docs-sync.txt
tests:
  - npm run check:content (repair and origin/main snapshot)
  - scripts/heavy.sh npm test
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Repaired N01, N02, P05, N03, N04 and E03 in English and Urdu; recorded outstanding owner evidence and retained G3/G5 as open. Commit locally without push or PR.

## Outcome

- ✅ Impact: Correct factor definition, complete scoring, consistent comparison question, cash ledger, tile-area question and supported attribution.
- 🧪 Tests: 368 tests passed in 31 files; origin/main passed all 14 content gates. Refreshed Unit 2 G2 evidence and local generated content status and all 14 final content gates passed.
- 📁 Files: Six bilingual pages, Unit 2 sources, tracker, repair handoff and this PHR.
- 🔁 Next prompts: Owner evidence provisioning and independent review after repair-cycle policy handling.
- 🧠 Reflection: Narrow unsupported attribution to the evidence already available; never manufacture review provenance or rendered evidence.

## Handoff (for CEO and agents)

- Shipped / changed: Bounded English and Urdu repairs plus advisory tracker row naming the latest G3 report.
- Decisions the team must respect: No certification, publication or translation-status changes. NCC date and shared terminology require owner decisions.
- Pending / next owner: Owner supplies render inspection, session provenance and authoritative corrected source bundle; fresh reviewer handles acceptance.
- Paperclip issues affected: gqur-300-u02-repair_en; no issue identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Repair invalidated Unit 2 G2 evidence and generated status. Refreshed both using repository tooling; isolated origin/main baseline passed.
- Graders run and results (PASS/FAIL): Unit tests PASS (368); baseline content gates PASS (14); final repaired content gates PASS (14). No build, server or browser run.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Review corrected unit with an authoritative frozen bundle and permitted rendered inspection.
