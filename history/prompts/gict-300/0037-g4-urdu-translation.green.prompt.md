---
id: "0037"
title: "G4 Urdu translation of all GICT-300 units"
stage: green
date: 2026-09-23
surface: agent
model: LongCat-2.0
feature: 020-author-gict-300
branch: 020-author-gict-300
user: a2ahs
command: orchestrator task (Phase 5)
labels: ["gict-300", "g4", "urdu", "translation", "bilingual"]
links:
  spec: specs/content/gict-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/ (7 files)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-02/ (7 files)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-03/ (7 files)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-04/ (7 files)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-05/ (6 files)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-06/ (7 files)
tests:
  - npm run check:content per unit (zero findings under each unit's Urdu paths)
  - serialized flip-verification (all units flipped to reviewed, gates run, flipped back)
  - gray-matter parse of every Urdu front matter
---

## Prompt

Orchestrator task (excerpt): "Phase 5 - G4 translation + G5 review on EVERY unit (full
Urdu): translate-unit skill ... complete Urdu mirror per unit under
i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-NN/ - same file
set, heading vectors, components, figure IDs, assessment items; bound to the frozen
terminology.csv bank."

## Response snapshot

Spawned six G4 translator subagents (one per unit), each following the translate-unit
skill: academic-plain Urdu mirrors with identical file sets, heading level vectors,
component counts, figure IDs repointed at the existing .ur.svg variants with translated
alt, byte-identical protected front matter, translated key_terms blocks drawn from the
concept-graph labels, and self-answered Urdu MCQs matching the translated keys. Each
translator reported zero check:content findings under its unit's paths. All 74 key terms
across the six units are proposals for the owner to bank (the bank holds no GICT-300
terms; terminology.csv is read-only for this feature). A mid-run orchestrator capacity
directive capped concurrent reviewer/build agents at 2 and forbade Docusaurus builds for
translators; the Step 5 flip-verification was therefore run once, serialized, by the
parent: all parity gates fired, and the only findings were the 74 expected unbanked-key-
term items and the 12 open G4/G5 tracker rows - no heading-vector, .ur.svg or structural
failures. The flip pass caught three Urdu teacher-notes front-matter YAML breakages
(unescaped inner quotes), fixed and committed. G3 repair edits to the Unit 4 and 5
English banks were mirrored into the Urdu mirrors in the same commits.

## Outcome

- ✅ Impact: the complete Urdu mirror of all six GICT-300 units exists, structurally
  parity-verified, at translation_status: draft awaiting G5.
- 🧪 Tests: per-unit check:content clean; serialized flip-verification clean except the
  documented unbanked-terms and open-rows findings; all front matter parses.
- 📁 Files: 41 Urdu MDX files.
- 🔁 Next prompts: G5 reviews (two concurrent at a time per the capacity directive), then
  check:all and the PR.
- 🧠 Reflection: spawning one translator per unit parallelised cleanly because the Urdu
  paths do not intersect any G3 bound input - but a reviewer's cleanup deleted untracked
  translator outputs mid-run (two translators rebuilt from context), and one translator's
  temp status-flip would have broken concurrent G3 digest verification had the parent not
  forbidden it. Orchestrated parallel agents in one worktree need explicit no-flip and
  no-cleanup rules from the start.

## Evaluation notes (flywheel)

- Failure modes observed: untracked-file deletion by a concurrent agent's cleanup; YAML
  breakage from unescaped quotes inside translated front matter; Bloom-tag corpus split
  (لاگو کرنا vs اطلاق) across reviewed mirrors.
- Graders run and results (PASS/FAIL): all six Urdu mirrors PASS structural checks; the
  flip-verification findings are all owner-action items, not defects.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): pre-flight the Urdu front matter with a YAML
  parser inside each translator before it reports done.
