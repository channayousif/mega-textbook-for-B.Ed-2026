---
id: 20261296
title: Add mind map and study guide kinds to the Study Studio pipeline
stage: general
date: 2026-11-27
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: feat/908-studio-doc-kinds
user: M Yousif Channa
command: continue to next issue
labels: [board-direct, studio, crew, media]
links:
  spec: specs/029-notebook-studio/spec.md
  ticket: "#908"
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - scripts/notebook-studio/media-ledger.mjs
  - specs/studio/media-ledger.schema.json
  - scripts/notebook-studio/place-media.mjs
  - scripts/notebook-studio/ingest.mjs
  - scripts/media/producers/nlm.mjs
  - scripts/media/producers/README.md
  - scripts/check-studio-manifest.mjs
  - scripts/crew/media.mjs
  - specs/029-notebook-studio/rollout.md
  - tests/unit/notebook-studio-media.test.mjs
  - tests/unit/media-producers.test.mjs
  - tests/crew/studio-stages.test.mjs
tests:
  - vitest tests/unit/notebook-studio-media.test.mjs tests/unit/media-producers.test.mjs (35 pass)
  - node --test tests/crew/studio-stages.test.mjs (7 pass)
---

## Prompt

continue to next issue

## Response snapshot

Every other open issue is blocked on the owner, so took #908. The unit media ledger now accepts
`mindmap` (English only, one per topic) and `studyguide` (per language) items that walk a short
path `planned -> generated -> downloaded -> qa2-pass -> placed` and need `asset_path` to enter
`placed`. `place-media.mjs` gained `placeDocs`: study guides are cleaned of answer and rubric
sections (and refused if one survives), mind maps are normalised with the labels file's `en_fix`,
and an Urdu tree and row are written when the labels file has `ur` (a missing Urdu label stops
placement). The `nlm` producer makes `doc.mindmap` (no status polling; `download mind-map`) and
`doc.studyguide` (built-in Study Guide in English, Create Your Own with a prompt in Urdu).
`check-studio-manifest` no longer demands a youtube_id for placed docs, and flags a placed doc
whose file is missing. The crew `studio_media` brief now plans a mind map per topic and a study
guide per language per unit, and places them itself; its file scope covers the manifest, labels
files and `static/studio/<course>/unit-NN/`.

## Outcome

- ✅ Impact: lean-recipe mind maps and study guides can be made by the crew instead of by hand.
- 🧪 Tests: new ledger, placement, checker, producer and crew-brief tests; all pass.
- 📁 Files: listed above; no content, gate or review-bound file touched.
- 🔁 Next prompts: watch the first crew unit planned with docs; check its labels file and Urdu study guide.
- 🧠 Reflection: placed docs at qa2-pass keep studio_media scheduled until placed, which is what places them.

## Handoff (for CEO and agents)

- Shipped / changed: #908, doc kinds in the Study Studio ledger, producer, placement, checker and crew brief.
- Decisions the team must respect: mind maps and study guides are never uploaded and need no owner watch;
  QG2 against the topic text is their gate (as in the pilot). Mind maps are planned in English; Urdu comes
  only from the labels file. Study guides are planned once per language per unit, on topic 1.
- Pending / next owner: crew lead watches the first studio_media run that plans docs.
- Issues affected: Closes #908.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): vitest PASS; node --test PASS (signoff-sync needs a full checkout).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
