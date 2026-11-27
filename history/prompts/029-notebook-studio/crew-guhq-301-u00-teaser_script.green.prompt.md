---
id: crew-guhq-301-u00-teaser_script
title: Draft GUHQ-301 Urdu course teaser script (steps 1-3)
stage: green
date: 2026-11-28
surface: claude-code (crew)
model: claude-opus-5-5
feature: 029-notebook-studio
branch: crew/guhq-301-u00-teaser_script
user: crew
command: .crew/brief.md
labels: [crew, claude, teaser-script]
links:
  spec: specs/029-notebook-studio/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/studio/teasers/guhq-301.json (new): teaser script for GUHQ-301 Fehm-e-Quran - I, recipe teaser@3
  - specs/studio/teasers/media-teasers.json (modified): added guhq-301-ur item, planned then scripted
tests:
  - node scripts/notebook-studio/teaser.mjs check guhq-301 (QG0 pass)
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Wrote `specs/studio/teasers/guhq-301.json` on recipe teaser@3, modelled on the GISS-401 and
GQUR-301 scripts. Presenter (young woman teacher, dark green shalwar kameez, cream dupatta over
the hair) speaks in shots 1 and 5; shots 2-4 are voice-over over a dolly, a tracking shot with a
whip-pan and a rising crane in a teacher-training college. Urdu lines run 11-17 words. Every fact
comes from `docs/semester-3/guhq-301/course-overview.mdx` and `catalog/courses.json`: letters,
words and their structure, grammar and sentences, translating and reflecting on short passages
and their setting, a practical exercise-based course. Because this is a Quran course, the visual
style bars any book cover, Arabic or other writing, calligraphy, scripture, religious symbols and
sacred figures (D-2026-0081 item 3). QG0 passed; the ledger item `guhq-301-ur` was planned and
advanced to `scripted` with the file's sha256 and a QG0 gate. No gflow, Flow or generator call
was made and no approval was recorded.

## Outcome

- ✅ Impact: GUHQ-301 Urdu teaser script ready for the owner's script approval.
- 🧪 Tests: QG0 pass; check:content run (see final report).
- 📁 Files: one new script, one ledger item.
- 🔁 Next prompts: owner runs `crew approve-script guhq-301-ur`; then the clips stage.
- 🧠 Reflection: the overview's outcomes heading is "Course outcomes", which `parseOverview`
  does not read, so an Urdu `objectives` list fails QG0 against a count of 0.

## Handoff (for CEO and agents)

- Shipped / changed: `specs/studio/teasers/guhq-301.json`; ledger item `guhq-301-ur` at `scripted`.
- Decisions the team must respect: no clip may be generated before `crew approve-script
  guhq-301-ur` (FR-012); uploads stay private (FR-013); no writing, scripture or calligraphy in
  any take (reject such takes at QG2).
- Pending / next owner: owner approves the script. The optional Urdu `objectives` were left out
  because `parseOverview` (`scripts/notebook-studio/describe.mjs:53`) only reads a
  "## Course learning outcomes" heading while the GUHQ-301 overview uses "## Course outcomes";
  the YouTube description will therefore carry no objectives until that is reconciled.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: QG0 objectives-count check against an overview heading the parser does not match.
- Graders run and results (PASS/FAIL): teaser.mjs check PASS.
- Prompt variant (if applicable): crew brief teaser_script.
- Next experiment (smallest change to try): let `parseOverview` accept "## Course outcomes" too.
