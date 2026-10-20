---
id: 0537
title: GENG-301 Unit 1 G3 repairs
stage: misc
date: 2026-10-19
surface: agent
model: claude-opus-5-5
feature: geng-301
branch: crew/geng-301-u01-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en", "geng-301"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/geng-301/unit-01/unit-assessment.mdx
 - specs/content/geng-301/sources/unit-01.md
 - specs/content/geng-301/tasks.md
 - specs/content/geng-301/reviews/unit-01/G2/20261019T230326859Z-gates.json
 - specs/content/geng-301/reviews/unit-01/G2/logs-20261019T230326859Z/
 - static/img/figures/geng-301/unit-01/fig-U1-1.svg (+ .dark.svg, through fig-U1-6)
tests:
 - node scripts/measure-figure-text.mjs static/img/figures/geng-301/unit-01/*.svg (12/12 clean)
 - node scripts/build-figure-variants.mjs (6 dark variants regenerated)
 - node scripts/prepare-gate-evidence.mjs GENG-301 1 (all G2 gates PASS)
 - npm run check:content (12/13; check:content-status fails identically on origin/main)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the three findings of specs/content/geng-301/reviews/unit-01/G3/20261019T000000000Z-g3.json:
(1) blocking: RRQ 5 model answer now says the topic sentence is sentence 1; (2) advisory: added an
"Open-access binding note" to sources/unit-01.md recording why openstax2021 (mapped in the frozen
content-spec) is not bound: section 6.7 is a proposal rubric, and OpenStax terms bar LLM ingestion,
so writing2015 remains the open-access binding; also joined the writing2015 row back into the
sources table (a stray blank line had split it off); (3) advisory: the stylesheet rule
`text{text-anchor:middle}` overrode the wordmark's `text-anchor="end"` attribute, so every figure
gained `.wm{fill:var(--wm);font-size:11px;text-anchor:end}`; dark variants regenerated and all 12
SVGs re-measured clean. G2 evidence regenerated and the G2 row repointed; a new Unit 1 G3 tracker row
records the repairs and stays unticked.

## Outcome

- ✅ Impact: blocking answer-key error fixed; source mismatch documented; wordmark no longer clips.
- 🧪 Tests: measure-figure-text clean; G2 gates PASS; check:content matches origin/main.
- 📁 Files: one assessment file, sources and tracker records, 12 SVGs, fresh G2 evidence.
- 🔁 Next prompts: fresh independent G3 review of Unit 1.
- 🧠 Reflection: CSS type selectors beat SVG presentation attributes; the wordmark needs a class rule.

## Handoff (for CEO and agents)

- Shipped / changed: GENG-301 Unit 1 G3 repairs on branch crew/geng-301-u01-repair_en (not pushed).
- Decisions the team must respect: openstax2021 is not bound for Unit 1 (OpenStax no-LLM-ingestion
  term); whether to change the frozen content-spec's mapping is an owner decision.
- Pending / next owner: fresh independent G3 review (G3 stays open under ADR-0019); owner on the
  content-spec openstax2021 mapping, which affects all six GENG-301 units.
- Paperclip issues affected: none (crew job).

## Evaluation notes (flywheel)

- Failure modes observed: figure templates with a global `text{text-anchor:middle}` rule silently
  centre the wordmark; G2 manifest goes stale after any hashed-input edit.
- Graders run and results (PASS/FAIL): G2 gate set PASS; check:content 12/13 (baseline parity).
- Prompt variant (if applicable): crew repair_en brief.
- Next experiment (smallest change to try): scan other courses for SVGs with a global text-anchor
  rule and no `.wm` rule.
