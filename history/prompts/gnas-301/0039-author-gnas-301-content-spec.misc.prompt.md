---
id: "0039"
title: "Author GNAS-301 G1 content-spec"
stage: misc
date: 2026-09-23
surface: agent
model: LongCat-2.0
feature: 019-author-gnas-301
branch: 019-author-gnas-301
user: M Yousif Channa
command: "orchestrator task assignment (Phase 2: G1 content-spec + G0/G1 intake)"
labels: [gnas-301, content-spec, g1, intake, reading-list-verification]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gnas-301/content-spec.md
  - specs/content/gnas-301/intake/manifest.json
tests:
  - npm run build:content-status (worktree bootstrap)
  - node scripts/prepare-intake-evidence.mjs GNAS-301 specs/content/gnas-301/intake
---

## Prompt

Orchestrator assignment (condensed; verbatim original in PHR-0035): Phase 2 - author specs/content/gnas-301/content-spec.md (status: draft) with course-wide items verbatim from the guide, per-unit blocks (Sub-topic checklist, Topic list, Depth budget, Common misconceptions, Figure plan, 10/10/5 blueprint), apply D-2026-0001 (print monographs) and D-2026-0012 (derived week schedule, labelled). Commit, then prepare-intake-evidence and spawn the evaluator with the D-2026-0020..0029 block.

## Response snapshot

Verified the guide's 7 recommended books by web search: 2 real as printed (Planetary Health - Haines & Frumkin, Island Press; Occupational Health - Harrington & Gill, Blackwell), 5 unverifiable as printed with closest real works identified (Holland's Oxford Textbook of Public Health; Shilling's Occupational Health Practice; Park's Textbook of Preventive and Social Medicine; Clark & Henderson and Phoon & Chen unlocatable) - all flagged per D-2026-0001. Authored the content-spec: 5 CLOs verbatim (en dash in CLO 1 normalised to hyphen with a transcription note), teaching strategies, 30/50/10/10 assessment table read as 20/80 formative/summative, guide-given 16-week calendar with the derived six-unit partition labelled per D-2026-0012, deliberately-empty curated reading list with a binding G2 floor of 2 verifiable open-access sources per unit (EFMP-304 precedent), and 6 unit blocks covering all 52 guide sub-topics (1.1-16.1) exactly once each with 28 topics and 56 planned figures. Committed 34f3668; prepared intake evidence (54 inputs); spawned a fresh evaluator agent with the D-2026-0020..0029 block.

## Outcome

- ✅ Impact: G1 content-spec complete and submitted to G0/G1 intake evaluation; no unit may be authored until the evaluator approves.
- 🧪 Tests: prepare-intake-evidence bound 54 inputs at commit 34f3668.
- 📁 Files: specs/content/gnas-301/content-spec.md, specs/content/gnas-301/intake/manifest.json.
- 🔁 Next prompts: apply evaluator findings; on approval set status: approved and create the course tasks.md tracker; then per-unit authoring.
- 🧠 Reflection: verifying the guide's reading list BEFORE writing the spec turned five silent citation risks into explicit D-2026-0001 flags the evaluator can check.

## Evaluation notes (flywheel)

- Failure modes observed: none; the guide's own typos ("Course Oucome", "bio-magnificatio") were normalised transparently in transcription notes rather than silently.
- Graders run and results (PASS/FAIL): intake deterministic checks deferred to the evaluator.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
