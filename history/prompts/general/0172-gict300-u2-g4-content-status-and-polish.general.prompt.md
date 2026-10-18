---
id: 0172
title: GICT-300 Unit 2 G4 content status rebuild and Urdu mirror polish
stage: general
date: 2026-10-18
surface: agent
model: gemini-3.8-flash-high
feature: none
branch: crew/gict-300-u02-translate
user: M Yousif Channa
command: crew job gict-300-u02-translate (translate-unit skill)
labels: ["crew", "gict-300", "g4", "urdu", "translate-unit", "content-status"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-02/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-02/unit-assessment.mdx
 - history/prompts/general/0172-gict300-u2-g4-content-status-and-polish.general.prompt.md
tests:
 - npm run build:content-status (static/content-status.json refreshed for current working tree)
 - npm run check:content-status (PASS)
 - npm run check:content (13/13 PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

(Feedback from previous attempt: npm run check:content has 1 finding(s) that main does not have:
✗ static/content-status.json is stale - it no longer describes the working tree.)

## Response snapshot

Investigated why check:content-status failed: commit 5b7c23da had updated specs/content/gict-300/tasks.md, leaving the gitignored static/content-status.json on disk stale with the older tasks.md SHA-256 hash. Re-generated static/content-status.json using `npm run build:content-status` and confirmed `npm run check:content-status` passes cleanly.

Inspected the G5 advisory findings and applied minor polish to GICT-300 Unit 2 Urdu files:
1. `topic-01.mdx`: Fixed awkward colloquial repetition 'اشارہ کر کر' to standard 'اشارہ کر کے' in activity instructions.
2. `topic-04.mdx`: Fixed grammatical gender agreement for masculine plural 'معیارات' from 'اتنی اہم ہیں' to 'اتنے اہم ہیں'.
3. `unit-assessment.mdx`: Harmonized front-matter description with the English original by removing surplus clause '، جوابات اور نمبر دہی کے خاکوں کے ساتھ'.

Ran full `npm run check:content` suite; all 13 gates PASS.

## Outcome

- ✅ Impact: Resolved stale content-status.json blocker and polished minor Urdu phrasing/grammar in Unit 2.
- 🧪 Tests: check:content 13/13 PASS.
- 📁 Files: 3 Urdu unit files, this PHR.
- 🔁 Next prompts: independent G5 Urdu review pass (g5-reviewer).
- 🧠 Reflection: any commit modifying tasks.md must run build:content-status so the uncommitted working-tree file stays fresh for local content gates.

## Handoff (for CEO and agents)

- Shipped / changed: Rebuilt static/content-status.json; polished Urdu phrasing in topic-01, topic-04, and unit-assessment.
- Decisions the team must respect: translation_status remains draft pending independent G5 review. Terminology proposals remain unbanked.
- Pending / next owner: G5 reviewer for independent qualification review; curriculum owner for ICT terminology additions.
- Paperclip issues affected: none (crew job gict-300-u02-translate).

## Evaluation notes (flywheel)

- Failure modes observed: `tasks.md` was edited without refreshing `static/content-status.json`.
- Graders run and results (PASS/FAIL): check:content PASS (13/13).
- Prompt variant (if applicable): crew brief retry.
- Next experiment (smallest change to try): pre-commit hook or gate helper to flag or auto-rebuild content-status when tasks.md changes.
