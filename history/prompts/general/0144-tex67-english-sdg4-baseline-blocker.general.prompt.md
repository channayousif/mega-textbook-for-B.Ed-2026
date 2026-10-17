---
id: 0144
title: TEX-67 English SDG4 baseline blocker
stage: general
date: 2026-10-16
surface: agent
model: gpt-6.1-sol
feature: none
branch: agent/TEX-40
user: Paperclip
command: heartbeat TEX-67
labels: ["BilingualAuthor", "paperclip", "tex-67"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: TEX-67
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/120
files:
  - history/prompts/general/0144-tex67-english-sdg4-baseline-blocker.general.prompt.md
tests:
  - Read-only English prose and SVG comparison with official UN target definitions
  - resolveUnit mirror-path resolution
  - git diff --check
---

## Prompt

Wake reason: Board: stale Claude provider-quota monitor (15 Oct) no longer applies; agent now runs on codex_local. Resume TEX-67.

Current issue request (verbatim):

Child of [TEX-59](/TEX/issues/TEX-59). Gate **G4 ur-translation** for EFMP-303 Unit 6, *International Perspectives and Future Directions*.

Branch `agent/TEX-40`, PR #120. Do not open a new branch or PR. Work in a worktree under `.claude/worktrees/`.

## Scope

Translate all **6 English files** in `docs/semester-2/efmp-303/unit-06/` into their same-named Urdu mirrors under:

```
i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/
```

Resolve that path with `resolveUnit()`, never by hand-joining:

```bash
node -e "import('./scripts/lib/content-roots.mjs').then(m=>console.log(m.resolveUnit('.','EFMP-303',6).urUnitDir))"
```

About **8074 English words**. 6 figures need `.ur.svg` label variants.



## Procedure

Follow `.claude/skills/translate-unit/SKILL.md` end to end. Key points:

- **Reference mirror:** EFMP-301 Unit 1 (`i18n/ur/.../semester-1/efmp-301/unit-01/`). The skill names it as the correct precedent; EFMP-302 Unit 1 is explicitly a counter-example.
- **Register:** academic-plain Urdu, درسی مگر عام فہم.
- **Terminology:** bound to `specs/content/terminology.csv`. Concept labels come from `specs/content/efmp-303/concepts/unit-06.md` (`Label UR`). `<Glossary>` terms take `definition_ur` from `glossary.json`.
- **Front matter:** translate `title`, `description`, `blooms_summary`. Keep `course_code`, `unit_no`, `topic_no`, `topic_label`, `clo_refs`, `est_reading_minutes` and `translation_status` byte-identical to the English.
- **`index.mdx`** additionally carries a `key_terms` block; every `ur` value must be a term `terminology.csv` accepts for that `en`.
- **Figures:** keep `id`, `kind`, `width`, `height`; point `src` at the `.ur.svg`; translate `alt` fully. The `.ur.svg` files come from `generate-figures` Step 5, then `npm run figures:variants` derives `.ur.dark.svg`. Style guide v4.6 requires each SVG `<desc>` to match its carrier `alt` byte-for-byte, so write the Urdu alt once and copy it into the `<desc>`. A raw `&` can never match: spell the term out instead.

## Known term collision to resolve, not paper over

`terminology.csv` binds **Development** to **نشوونما**, which is child growth. EFMP-303 uses "development" in the national and economic sense (**ترقی**) throughout. Do not rebind the bank entry. Translate it as context requires and record it as a **proposed term / disambiguation for the curriculum owner** in the handoff comment, per the style guide's Terminology bank rule.

## Verification before handing back

```bash
npm run check:content
scripts/heavy.sh npm run build          # the Urdu locale is built here, not by check:content
node scripts/render-inspect.mjs EFMP-303 6 --locale ur
```

The parity gates are **conditional and silent** while `translation_status: draft`. To get real coverage, temporarily flip **both** `index.mdx` files to `reviewed`, run `npm run check:content`, fix what it finds, then **flip them back** and confirm with `grep`.

## Do not

- Do not flip `translation_status` to `reviewed`. That is an accepted G5's verdict, not yours.
- Do not add a `G4 ur-translation` tracker row.
- Do not review your own translation.
- Do not fix English content here. If the English is wrong, say so on this issue and stop.

## Done means

- All 6 Urdu files exist with the same heading level vector, the same component calls and the same assessment items as their English counterparts.
- `npm run build` succeeds for both locales.
- `translation_status` is still `draft` in both locales.
- A comment lists the files translated, the English commit they were translated from, every term used that the bank does not hold, and anything that could not be resolved confidently.


## Response snapshot

Resumed existing agent/TEX-40 in isolated .claude/worktrees/TEX-67; PR #120 remains open. Read recent board PHRs, repository workflow and constitution, approved course spec, tracker and translate-unit skill. Resolved Urdu directory with resolveUnit(). No existing Unit 6 Urdu files were edited.

Stopped at a confirmed English factual defect under the assignment's explicit stop rule. fig-U6-2.svg presents early childhood as Target 1, primary/secondary as Target 2, literacy as Target 4, global citizenship as Target 6, and teacher training as Target 7. Official UN identifiers are respectively 4.2, 4.1, 4.6, 4.7 and 4.c. Topic 6.1 and the carrier alt also present SDG4 as seven targets without distinguishing seven outcome targets from three means-of-implementation targets; the figure mixes these categories and omits targets without describing itself as a selection.

Primary source verified 2026-10-16: https://sdgs.un.org/goals/goal4 (Targets and Indicators: 4.1 through 4.7 and 4.a through 4.c).

Created TEX-101 assigned to CurriculumOwner for correction or an explicit bounded English repair handoff and a frozen baseline. Did not silently correct English or carry the defect into Urdu.

Inspected branch baseline: a5643faedcd0c0a97f6b37fe65ee1e5e2ec231e1.
Last English Unit 6 change: e23475c4dd7c2f4cf70aab2692cdd8b88bb539de.

## Outcome

- Impact: identified an English prerequisite before translation; no learner-facing files changed.
- Tests: source comparison and diff whitespace validation only; content/build/render checks deferred because translation stopped before edits.
- Files: this PHR only, on the existing PR branch.
- Next: CurriculumOwner resolves TEX-101 and provides a corrected frozen commit; BilingualAuthor resumes six mirrors and six figure variants.
- Reflection: local diagram numbering must not masquerade as official SDG target identifiers.

## Handoff (for CEO and agents)

- Shipped / changed: created TEX-101 and recorded verified source evidence. TEX-67 is blocked on that first-class dependency.
- Decisions the team must respect: no English repair in this G4 task; preserve draft status, banners, terminology bank and tracker. Board PHR 0139 authorizes codex_local; the stale Claude quota monitor is irrelevant. Existing branch agent/TEX-40 and PR #120 remain mandatory.
- Pending / next owner: CurriculumOwner owns TEX-101 and must correct the prose/figure/alt/desc/manifest consistently, refresh affected variants/evidence and return a frozen baseline. BilingualAuthor then completes translation and required parity/build/render checks. National/economic Development -> ترقی remains a proposed disambiguation for the owner, not a terminology-bank edit. No new Urdu terms were authored this run.
- Paperclip issues affected: TEX-67, TEX-101, parent TEX-59.

## Evaluation notes (flywheel)

- Failure modes observed: English schematic conflates selected themes with official SDG target numbering.
- Graders run and results (PASS/FAIL): not run; no content changes and task explicitly requires stopping on English errors.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): inspect corrected SDG labels against the UN source before translating.
