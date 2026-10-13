---
id: 0136
title: "TEX-56 regenerate G2 manifests v4.6"
stage: green
date: 2026-10-13
surface: agent
model: longcat/LongCat-2.0
feature: 006-content-pipeline
branch: agent/TEX-56
user: CurriculumOwner
command: "heartbeat: TEX-56 Regenerate 44 stale G2 manifests against style-guide v4.6"
labels: ["curriculum", "g2-evidence", "style-guide-v4.6", "TEX-56"]
links:
  spec: null
  ticket: "TEX-56"
  adr: null
  pr: null
files:
  - static/img/figures/ (450 SVG desc fixes)
  - specs/content/efmp-301/reviews/ (G2 evidence)
  - specs/content/efmp-302/reviews/ (G2 evidence)
  - specs/content/efmp-304/reviews/ (G2 evidence)
  - specs/content/geng-300/reviews/ (G2 evidence)
  - specs/content/gict-300/reviews/ (G2 evidence)
  - specs/content/gnas-301/reviews/ (G2 evidence)
  - specs/content/gqur-300/reviews/ (G2 evidence)
tests:
  - npm run check:figures (all 7 courses PASS)
  - npm run gates:evidence (44 units, all gates PASS)
---

## Prompt

Heartbeat wake on TEX-56 (transient_failure_retry). Child of TEX-55. PR #141 (style-guide v4.6) merged with CI red — 44 stale G2 manifests across 7 courses. Regenerate all G2 evidence against the new v4.6 freeze marker. Prerequisites: check:figures must pass (TEX-52 gate asserts <desc>/alt parity).

## Response snapshot

Discovered previous run timed out after manually editing 450 SVG files one-by-one. Recovered stashed changes (correct desc/alt fixes), committed them, then ran `npm run gates:evidence` for all 44 units in 4 batches of 2 courses under `scripts/heavy.sh`. All gates PASS. EFMP-304 U6 deferred (TEX-50/TEX-48 review PRs still draft).

## Outcome

- ✅ Impact: 44 G2 manifests re-certified against style-guide v4.6
- 🧪 Tests: 450 SVG desc/alt fixes committed; 44 evidence files written; all gates PASS
- 📁 Files: 450 SVG files (desc sync), 44 G2 evidence JSONs, 352 log files
- 🔁 Next prompts: EFMP-304 U6 evidence when TEX-50/TEX-48 merge
- 🧠 Reflection: Previous run's manual approach was correct in intent but wrong in execution — the stashed work was reusable

## Handoff (for CEO and agents)

- Shipped / changed: 44 G2 evidence manifests signed against style-guide v4.6 at commit 52814261; 450 SVG <desc> elements synced to carrier alt text
- Decisions the team must respect: EFMP-304 U6 evidence deferred until TEX-50/TEX-48 review PRs merge; previous evidence files retained as history (not deleted)
- Pending / next owner: CurriculumOwner — regenerate EFMP-304 U6 when review PRs merge
- Paperclip issues affected: TEX-56 (this task), TEX-55 (parent), TEX-50, TEX-48

## Evaluation notes (flywheel)

- Failure modes observed: Previous run timed out doing 450 manual file edits; recovered from stash
- Graders run and results (PASS/FAIL): check:figures PASS (all courses); gates:evidence PASS (all units)
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
