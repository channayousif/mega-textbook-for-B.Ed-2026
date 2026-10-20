---
id: 0538
title: GENG-301 Unit 2 G3 repairs
stage: misc
date: 2026-10-19
surface: agent
model: claude-opus-5-5
feature: geng-301
branch: crew/geng-301-u02-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en", "geng-301"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/geng-301/unit-02/topic-01.mdx
 - docs/semester-2/geng-301/unit-02/topic-02.mdx
 - docs/semester-2/geng-301/unit-02/topic-03.mdx
 - docs/semester-2/geng-301/unit-02/topic-04.mdx
 - docs/semester-2/geng-301/unit-02/unit-assessment.mdx
 - specs/content/geng-301/sources/unit-02.md
 - specs/content/geng-301/tasks.md
 - specs/content/geng-301/reviews/unit-02/G2/20261019T231851684Z-gates.json
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261019T231851684Z/
 - static/img/figures/geng-301/unit-02/fig-U2-1.svg (+ .dark.svg, through fig-U2-8)
tests:
 - npm run figures:variants:check (OK, dark variants fresh)
 - node scripts/prepare-gate-evidence.mjs GENG-301 2 (all G2 gates PASS)
 - npm run check:content (12/13; check:content-status fails because static/content-status.json is a gitignored build artefact, same on origin/main)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the six findings of specs/content/geng-301/reviews/unit-02/G3/04ddc645-f479-4d6d-a614-8f7e23db9fc0.json:
(1) all 16 figure SVGs gained `.wm{fill:var(--wm);font-size:11px;text-anchor:end}` so the global
`text{text-anchor:middle}` rule no longer centres the wordmark past the 780px edge; (2) RRQ 8 was
rewritten as an Analyze item on purpose and audience (a letter to parents full of specialist terms),
so U2-05 is assessed and the existing CON:GENG-301-2-6 -> RRQ-08 mapping is now correct; the unit
summary names purpose and audience; (3) RRQ 5 marks reconciled to 2 for all three categories, 1 for
two; (4) MCQ 7 retagged Understand, RRQ 5 retagged Remember, MCQ 10 rephrased to ask for the single
stage both techniques belong to; (5) sources/unit-02.md declarations record 2026-10-19 Open Library
and Crossref lookups and cite D-2026-0001, the writing2015 row rejoined to the table, and an
open-access note explains why openstax2021 is not bound (OpenStax terms bar LLM ingestion);
writing2015 added to Further reading in Topics 2.1 and 2.3 and openstax2021 8.7 to Topic 2.4;
(6) advisory typos fixed and "you cannot edit a blank page" reframed as a common saying rather than
a Williams and Bizup quotation. G2 evidence regenerated, G2 row repointed, new Unit 2 G3 tracker row
added and left unticked.

## Outcome

- ✅ Impact: all five blocking clusters and the advisory addressed in the English unit.
- 🧪 Tests: G2 gates PASS; figures:variants:check OK; check:content matches origin/main baseline.
- 📁 Files: five unit pages, sources and tracker records, 16 SVGs, fresh G2 evidence.
- 🔁 Next prompts: fresh independent G3 review of Unit 2.
- 🧠 Reflection: same wordmark CSS defect as Unit 1; the figure template, not each unit, is the root.

## Handoff (for CEO and agents)

- Shipped / changed: GENG-301 Unit 2 G3 repairs on branch crew/geng-301-u02-repair_en (not pushed).
- Decisions the team must respect: openstax2021 is not bound for Unit 2 (OpenStax no-LLM-ingestion
  term), only listed by reference; changing the frozen content-spec mapping is an owner decision.
- Pending / next owner: fresh independent G3 review (G3 stays open under ADR-0019); the SVG wordmark
  fix was not re-measured with measure-figure-text (Chromium is barred for this job), so the next
  reviewer should run it; no Urdu mirror exists yet for Unit 2 (G4 not started).
- Paperclip issues affected: none (crew job).

## Evaluation notes (flywheel)

- Failure modes observed: global `text{text-anchor:middle}` in figure templates overrides the
  wordmark attribute; concept graph mapped a concept to an item that did not test it.
- Graders run and results (PASS/FAIL): G2 gate set PASS; check:content 12/13 (baseline parity).
- Prompt variant (if applicable): crew repair_en brief.
- Next experiment (smallest change to try): have check:concept-graph or the reviewer sample that
  each mapped item's stem names its concept.
