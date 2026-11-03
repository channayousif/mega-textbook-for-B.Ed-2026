---
id: 20261116
title: Repair EFMP-303 Unit 4 advisory G3 findings
stage: general
date: 2026-11-03
surface: agent
model: GPT-6 Codex
feature: none
branch: crew/efmp-303-u04-repair_en
user: crew
command: Read .crew/brief.md and carry it out
labels: ["codex", "efmp-303", "unit-04", "repair_en"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/efmp-303/unit-04/topic-01.mdx
  - docs/semester-2/efmp-303/unit-04/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-04/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-04/topic-02.mdx
  - specs/content/efmp-303/concepts/unit-04.md
  - specs/content/efmp-303/tasks.md
  - specs/content/efmp-303/reviews/unit-04/G3/repair-handoff-20261103.md
tests:
  - npm run check:content (before and after)
  - scripts/heavy.sh npm test
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied minimal bilingual citation repairs, corrected the concept label, and appended an unticked advisory G3 tracker row. Render-review remains blocked by explicit crew restrictions; fresh independent inspection is required. Committing is explicitly required by the brief, overriding the skill default.

## Outcome

- ✅ Impact: Removed unsupported source reliance without claiming verification.
- 🧪 Tests: 347 unit tests passed. Baseline content gates passed. Fresh G2 evidence and pipeline gate pass; generated status cache requires an out-of-scope refresh.
- 📁 Files: Two EN/UR topic pairs, concept graph, tracker, repair handoff, and this PHR.
- 🔁 Next prompts: Independent G3 review on a host permitted to render the unit.
- 🧠 Reflection: Preserve approved SLO mapping rather than adding an unrelated SLO from an advisory suggestion.

## Handoff (for CEO and agents)

- Shipped / changed: Citation repairs mirrored in Urdu; duplicate process label removed; advisory tracker row appended.
- Decisions the team must respect: G3 unticked, translation statuses draft, original report preserved. SLO 4-1 follows the approved spec.
- Pending / next owner: Owner response pending for generated static/content-status.json scope exception. Independent reviewer and permitted render host own small-screen, A4 print and clipping inspection.
- Paperclip issues affected: efmp-303-u04-repair_en; no issue identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Render-review cannot run under crew restrictions. Initial python command unavailable; used python3 without installing packages.
- Graders run and results (PASS/FAIL): PASS: 347 tests across 28 files; git diff --check; all eight G2 draft gates; refreshed pipeline gate. Final check:content: 12/13 pass; only check:content-status fails because the generated cache remains stale pending scope exception.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Fresh independent rendered review of the repaired unit.
