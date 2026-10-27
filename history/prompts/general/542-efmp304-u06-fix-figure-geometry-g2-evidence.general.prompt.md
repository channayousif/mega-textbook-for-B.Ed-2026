---
id: 542
title: efmp-304-u06 fix figure geometry and G2 evidence
stage: general
date: 2026-10-27
surface: cli
model: longcat/LongCat-2.0
feature: efmp-304
branch: crew/efmp-304-u06-fix
user: a2ahs
command: /sp.crew or direct prompt
labels: [opencode]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  changed:
    - specs/content/efmp-304/reviews/unit-06/G2/20261027T003652106Z-gates.json
    - specs/content/efmp-304/reviews/unit-06/G2/logs-20261027T003652106Z/*.txt (8 files)
    - specs/content/efmp-304/tasks.md
    - static/content-status.json
tests:
  - scripts/measure-figure-text.mjs: PASS (all 16 light SVGs)
  - npm run check:content: PASS (13/13 gates)
  - npm run figures:variants: PASS (0 dark variants rewritten, up to date)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

The brief asked to fix figure text-geometry problems for EFMP-304 Unit 6, regenerate dark variants, run measure-figure-text until clean, then commit and re-run G2 gate evidence. On arrival the branch already had two commits (7e1f23ca fixing SVGs, 10fd478c pointing the G2 row at a fresh gates JSON). All light SVGs already passed measure-figure-text. The remaining defect was that the gates JSON referenced log files in logs-20261027T001344731Z/ which had never been committed, so check:pipeline-gate failed with ENOENT on validate-content.txt. Re-ran prepare-gate-evidence.mjs EFMP-304 6 which wrote a new gates JSON plus its eight log files, all gates passed. Updated the G2 en-draft row in tasks.md to point at the new gates file. Also rebuilt static/content-status.json which was stale and failing check:content-status. All 13 content gates now pass.

## Outcome

- ✅ Impact: EFMP-304 Unit 6 G2 evidence now complete and valid; pipeline gate passes; all content gates green.
- 🧪 Tests: check:content 13/13 pass; measure-figure-text all 16 light SVGs pass; figures:variants up to date.
- 📁 Files: 3 commits added (new G2 gates JSON + logs, tasks.md row update, content-status rebuild).
- 🔁 Next prompts: A fresh independent G3 review is needed (the G3 row is marked stale since the figure-geometry repair). Urdu translation G5 and full-page RTL/A4 inspection remain pending per earlier handoff notes.
- 🧁 Reflection: The previous attempt committed the gates JSON without the log files it referenced -- a partial commit that broke the pipeline gate. Always verify check:content after pointing a row at new evidence.

## Handoff (for CEO and agents)

- Shipped / changed: G2 gate evidence for EFMP-304 Unit 06 fully regenerated with logs; G2 tracker row updated; content-status.json rebuilt.
- Decisions the team must respect: G2 evidence certifies only the English draft gates. G3 row stays open and marked stale; agent evidence cannot close it (ADR-0019). The old 20261027T001344731Z-gates.json is now orphaned but harmless.
- Pending / next owner: Fresh independent G3 English review after the figure-geometry repair; G5 Urdu review; full-page RTL/A4 inspection of the Urdu mirror.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: Gates JSON committed without the log files it references breaks the pipeline gate with ENOENT. prepare-gate-evidence writes both, but a selective commit can drop the logs.
- Graders run and results (PASS/FAIL): check:content PASS (13/13); measure-figure-text PASS (all SVGs).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Have prepare-gate-evidence verify its own log files were committed before declaring success.
