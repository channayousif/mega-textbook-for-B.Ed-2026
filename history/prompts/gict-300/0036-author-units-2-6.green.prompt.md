---
id: "0036"
title: "author GICT-300 Units 2 to 6"
stage: green
date: 2026-09-23
surface: agent
model: LongCat-2.0
feature: 020-author-gict-300
branch: 020-author-gict-300
user: a2ahs
command: orchestrator task (Phase 3)
labels: ["gict-300", "author-unit", "units-2-6", "figures", "governance"]
links:
  spec: specs/content/gict-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/gict-300/unit-02/ (7 files)
  - docs/semester-1/gict-300/unit-03/ (7 files)
  - docs/semester-1/gict-300/unit-04/ (7 files)
  - docs/semester-1/gict-300/unit-05/ (6 files)
  - docs/semester-1/gict-300/unit-06/ (7 files)
  - specs/content/gict-300/{coverage,sources,figures,concepts}/unit-0{2..6}.md
  - specs/content/gict-300/sources/texts/ (wallaceClariana2005, ostep, nistCloud2011, erendorYildirim2022, jereb2018, wipoIP, nistBlockchain2018, unescoAI2021, alAnsi2023, bourgeois2019 extensions)
  - static/img/figures/gict-300/unit-0{2..6}/ (46 figures x 4 variants)
  - glossary.json (+59 terms)
tests:
  - npm run check:content (gict-300 findings resolved to G2-row-only)
  - node scripts/measure-figure-text.mjs (all figures within viewBox)
  - npm run figures:variants:check OK
---

## Prompt

Orchestrator task (excerpt): "Phase 3 - Per-unit authoring loop (each unit, in order):
author-unit skill ... generate-figures skill ... npm run check:content fix loop ...
Commit per unit ... Then node scripts/prepare-gate-evidence.mjs GICT-300 <N> ..."

## Response snapshot

Authored Units 2-6 to the Spec 008 per-topic layout with nine-part cycles, 10/10/5 banks
and teacher notes, plus full governance per unit (coverage v2, sources with bound
excerpts for every retrievable open-access source, figure manifests, concept graphs).
Sourced and verified per-unit open-access additions through OpenAlex/Crossref:
wallaceClariana2005 (U2), erendorYildirim2022 (U4), jereb2018 (U5), alAnsi2023 (U6),
with bound excerpts for ostep ch 4 (U3), NIST SP 800-145 (U4), NIST IR 8202 (U6) and
bourgeois2019 chapters 2/3/5/6/12/13. Figures: 46 total. fig-U2-1..6 authored by Codex
(primary); Codex hit its usage limit mid-batch, so fig-U2-7..8 and all of Units 3-6's
figures were authored by Claude under the generate-figures skill's documented fallback -
recorded in each manifest. Every figure has light/dark/Urdu/Urdu-dark variants,
RTL-mirrored via mirror-figure-rtl.mjs, all measured within the viewBox. Glossary grew
from 75 to 135 terms. G2 gate evidence generated for every unit via the disclosed
CONTENT_ROOT overlay. Course-overview rewritten (coming_soon dropped, guide items in
front matter).

## Outcome

- ✅ Impact: all six GICT-300 units authored, gated and evidenced; the English course is
  complete.
- 🧪 Tests: check:content gict-300 findings down to G2-row items only (all then
  resolved with evidence); figures:variants:check OK; measure-figure-text clean.
- 📁 Files: ~140 new files across docs/, specs/content/, static/img/figures/, glossary.json.
- 🔁 Next prompts: G3 reviews (units 2-6, spawned), G4 translations (spawned), G5
  reviews, then check:all and the PR.
- 🧠 Reflection: the depth gate's Unverifiable-sources parser requires one key per
  bullet ("- key: ..."), not combined bullets - caught twice before the pattern stuck.
  The concept-graph MCQ/RRQ single-topic rule and the Bloom-band floors (RRQ >=
  Understand) are the other recurring gate traps. Codex's usage limit mid-batch made the
  documented fallback path real: 40 of 46 figures are Claude-authored, all passing the
  same byte-level checks.

## Evaluation notes (flywheel)

- Failure modes observed: combined Unverifiable bullets; coverage Section cells not
  matching exact ### headings; RRQ items tagged Remember; one concept citing an MCQ in
  two topics; one SVG caption overflowing the viewBox (caught by measure-figure-text).
- Graders run and results (PASS/FAIL): all gict-300 gate findings fixed; G2 evidence
  written for units 1-6.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): pre-write the Unverifiable bullets one-key-per-bullet
  and derive coverage Section cells from the actual ### headings at authoring time.
