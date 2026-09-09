---
id: 0005
title: Implement Visual Density Retrofit
stage: green
date: 2026-09-09
surface: agent
model: claude-sonnet-5
feature: 012-visual-density-standard
branch: 012-visual-density-standard
user: channayousif@gmail.com
command: /sp.implement (012, US1-US4 + Phase 7)
labels: ["green", "figures", "visual-density", "check-figures", "efmp-302", "svg", "bilingual"]
links:
  spec: specs/012-visual-density-standard/spec.md
  ticket: null
  adr: history/adr/0017-visual-density-standard-and-figure-archetype-taxonomy.md
  pr: null
files:
 - scripts/lib/figure-manifest.mjs
 - scripts/check-figures.mjs
 - tests/unit/figures-gate.test.mjs
 - src/components/Figure.tsx
 - src/css/custom.css
 - specs/content/style-guide.md
 - specs/content/efmp-302/content-spec.md
 - specs/content/efmp-302/figures/unit-01.md
 - .claude/skills/author-unit/SKILL.md
 - .claude/skills/author-unit/references/structure-standard.md
 - .claude/skills/author-unit/references/figure-prompts.md
 - .claude/skills/generate-figures/SKILL.md
 - .claude/skills/generate-figures/references/svg-authoring.md
 - specs/009-figure-rendering/contracts/figure-manifest-v2.md
 - docs/semester-1/efmp-302/unit-01/topic-01.mdx
 - docs/semester-1/efmp-302/unit-01/topic-02.mdx
 - docs/semester-1/efmp-302/unit-01/topic-03.mdx
 - docs/semester-1/efmp-302/unit-01/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/topic-04.mdx
 - static/img/figures/efmp-302/unit-01/fig-U1-5.svg
 - static/img/figures/efmp-302/unit-01/fig-U1-6.svg
 - static/img/figures/efmp-302/unit-01/fig-U1-7.svg
 - static/img/figures/efmp-302/unit-01/fig-U1-8.svg
 - static/img/figures/efmp-302/unit-01/fig-U1-5.ur.svg
 - static/img/figures/efmp-302/unit-01/fig-U1-6.ur.svg
 - static/img/figures/efmp-302/unit-01/fig-U1-7.ur.svg
 - static/img/figures/efmp-302/unit-01/fig-U1-8.ur.svg
 - specs/backlog.md
 - CLAUDE.md
 - specs/012-visual-density-standard/plan.md
 - specs/012-visual-density-standard/tasks.md
tests:
 - "npm test - 142/142 pass (figures-gate.test.mjs reworked to 30 cases incl. 5 US1)"
 - "npx tsc --noEmit - exit 0"
 - "check:figures / check:depth-gate / validate:content / check:no-em-dash / check:pipeline-gate / check:no-answer-keys - all pass"
 - "npm run build (en + ur) - exit 0; built EN and UR topic pages render both figures per topic with the archetype class and the .ur.svg on the /ur/ route"
---

## Prompt

Continue Workstream C: implement Spec 012 US1-US4 + Phase 7 (the gate rules, the standard/skill
edits, and the EFMP-302 Unit 1 figure retrofit), all gates green.

## Response snapshot

Three commits on `012-visual-density-standard`:

**`f70ee25` foundations** - spec/plan/tasks/checklist, ADR-0017, constitution v2.7.0 -> v2.8.0
(new Art. III.10, Art. VII gate row, SYNC IMPACT REPORT), `figure-manifest.mjs` `KIND_ENUM`
widened to the six archetypes + `SCHEMATIC_ARCHETYPES`, manifest-v2 contract v3 note.

**`9e11a85` US1 + US2** - `check-figures.mjs`: per-topic carrier minimum `>= 1 -> >= 2`; new
per-unit "`>= 1` concept-map/flowchart/timeline" check, gated on any manifest row carrying a
`Kind` (a fully unplanned all-`prompt-only` manifest keeps Spec 008/009 behaviour byte-for-byte);
`prompt-only` rows may now carry a planned archetype. `figures-gate.test.mjs` reworked to a
2-carrier fixture model + 5 US1 cases (30 pass). `style-guide.md` `3.2 -> 3.3` (terminology
re-frozen, zero term changes); `author-unit` structure-standard twin + SKILL + figure-prompts;
`generate-figures` SKILL + svg-authoring; EFMP-302 `content-spec.md` Figure plan -> 8 ids
(two/topic) with archetypes.

**US3 retrofit + US4 + Phase 7 (this commit)** - EFMP-302 Unit 1: four new hand-authored SVG
schematics `fig-U1-5` (concept-map, 1.1), `fig-U1-6` (flowchart, 1.2), `fig-U1-7` (timeline,
1.3 - the unit's required schematic), `fig-U1-8` (flowchart, 1.4), each 2.7-3.6 KB with a
light/dark `<style>` block and the shared palette; `<Figure>` elements added at the end of each
`## Explanation` in the 4 EN topic files; `fig-U1-1` reclassified `diagram -> table`, `fig-U1-4`
`-> concept-map`. Manifest rewritten to 8 rows on the v3 `Kind` vocabulary, all `placed`. UR
mirror: matching `<Figure>` (pointing at `.ur.svg`) + a `{/* TODO(G4) */}` placement note added
to the 4 UR stub topic files, and four `.ur.svg` label variants authored (RTL, Nastaliq-first
font, translated labels, same geometry). `Figure.tsx` `kind` prop -> `FigureKind` six-value
union; `.figure--table` / `--concept-map` / `--flowchart` / `--timeline` in `custom.css`.
`specs/backlog.md` gains the EFMP-301 U1 golden-re-proof + EFMP-302 Units 2-6 entries; `CLAUDE.md`
Active Technologies / Recent Changes updated; `plan.md` post-build reconciliation filled;
`tasks.md` T001-T034 checked.

Gate posture: `check:figures` was intentionally RED on EFMP-302 U1 between the US1 gate change
and this retrofit (1 figure/topic, no schematic) - now GREEN. The UR `.ur.svg` side is written
and wired but not gate-enforced while the unit is `translation_status: draft`; Workstream D's
re-translation will review the Urdu labels and flip the unit to `reviewed`.

## Outcome

- ✅ Impact: the visual-density floor is enforced by CI and the constitution, the standard is
  written into the style guide + both skills, and EFMP-302 Unit 1 is the proving unit with 8
  figures (two per topic, incl. a timeline) in both locales.
- 🧪 Tests: `npm test` 142/142; `tsc` clean; all six content gates green; `npm run build` en + ur
  green with figures rendering in both locales.
- 📁 Files: gate + manifest lib + tests; `Figure.tsx` + CSS; style-guide v3.3 + both skills;
  EFMP-302 content-spec + manifest + 4 EN + 4 UR topic files + 8 new SVGs; backlog + CLAUDE.md +
  plan + tasks.
- 🔁 Next prompts: commit US3/US4/P7; then checkpoint before Workstream D (EFMP-302 U1 Urdu
  re-translation) and Workstream B (Spec 011 dashboards).
- 🧠 Reflection: the two design tweaks that kept the diff small - relaxing the `prompt-only` Kind
  rule and gating the schematic check on "any row classified" - meant only the 2-carrier fixture
  change was needed, not a rewrite of every regression-floor case.

## Evaluation notes (flywheel)

- Failure modes observed: fixture blast radius from `>= 1 -> >= 2` (every helper built 1/topic) -
  contained by reworking the two factory helpers, not 28 call sites; MDX block-comment `*/` inside
  a JSDoc `t1*/t2*` broke the test parse once (fixed by rewording).
- Graders run and results (PASS/FAIL): FR-001..FR-015 - the gate + fixtures cover FR-001/002/003/
  004/005/006; FR-007/008/009/010/011 landed in US1/US2; FR-012 (retrofit) + FR-013 (backlog) +
  FR-014 (no new dep) + FR-015 (no em dash, alt text) all satisfied. PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when Workstream D flips EFMP-302 U1 to `reviewed`,
  confirm `check:figures` then enforces the 8 `.ur.svg`s + UR `<Figure>`s with no new findings.
