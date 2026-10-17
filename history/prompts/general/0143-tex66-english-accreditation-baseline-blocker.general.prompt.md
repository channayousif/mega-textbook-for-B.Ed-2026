---
id: 0143
title: TEX-66 English accreditation baseline blocker
stage: general
date: 2026-10-16
surface: agent
model: gpt-6.1-sol
feature: none
branch: agent/TEX-40
user: Paperclip
command: heartbeat TEX-66
labels: ["BilingualAuthor", "paperclip", "tex-66"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: TEX-66
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/120
files:
  - history/prompts/general/0143-tex66-english-accreditation-baseline-blocker.general.prompt.md
tests:
  - Read-only English baseline and source-register comparison
  - Official HEC and NACTE source verification
  - Confirmed all five English translation_status fields remain draft
---

## Prompt

Wake reason: Board: stale Claude provider-quota monitor (15 Oct) no longer applies; agent now runs on codex_local. Resume TEX-66.

Current issue request (verbatim):

Child of [TEX-59](/TEX/issues/TEX-59). Gate **G4 ur-translation** for EFMP-303 Unit 5, *Quality Assurance and Development*.

Branch `agent/TEX-40`, PR #120. Do not open a new branch or PR. Work in a worktree under `.claude/worktrees/`.

## Scope

Translate all **5 English files** in `docs/semester-2/efmp-303/unit-05/` into their same-named Urdu mirrors under:

```
i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-05/
```

Resolve that path with `resolveUnit()`, never by hand-joining:

```bash
node -e "import('./scripts/lib/content-roots.mjs').then(m=>console.log(m.resolveUnit('.','EFMP-303',5).urUnitDir))"
```

About **6539 English words**. 4 figures need `.ur.svg` label variants.



## Procedure

Follow `.claude/skills/translate-unit/SKILL.md` end to end. Key points:

- **Reference mirror:** EFMP-301 Unit 1 (`i18n/ur/.../semester-1/efmp-301/unit-01/`). The skill names it as the correct precedent; EFMP-302 Unit 1 is explicitly a counter-example.
- **Register:** academic-plain Urdu, درسی مگر عام فہم.
- **Terminology:** bound to `specs/content/terminology.csv`. Concept labels come from `specs/content/efmp-303/concepts/unit-05.md` (`Label UR`). `<Glossary>` terms take `definition_ur` from `glossary.json`.
- **Front matter:** translate `title`, `description`, `blooms_summary`. Keep `course_code`, `unit_no`, `topic_no`, `topic_label`, `clo_refs`, `est_reading_minutes` and `translation_status` byte-identical to the English.
- **`index.mdx`** additionally carries a `key_terms` block; every `ur` value must be a term `terminology.csv` accepts for that `en`.
- **Figures:** keep `id`, `kind`, `width`, `height`; point `src` at the `.ur.svg`; translate `alt` fully. The `.ur.svg` files come from `generate-figures` Step 5, then `npm run figures:variants` derives `.ur.dark.svg`. Style guide v4.6 requires each SVG `<desc>` to match its carrier `alt` byte-for-byte, so write the Urdu alt once and copy it into the `<desc>`. A raw `&` can never match: spell the term out instead.

## Known term collision to resolve, not paper over

`terminology.csv` binds **Development** to **نشوونما**, which is child growth. EFMP-303 uses "development" in the national and economic sense (**ترقی**) throughout. Do not rebind the bank entry. Translate it as context requires and record it as a **proposed term / disambiguation for the curriculum owner** in the handoff comment, per the style guide's Terminology bank rule.

## Verification before handing back

```bash
npm run check:content
scripts/heavy.sh npm run build          # the Urdu locale is built here, not by check:content
node scripts/render-inspect.mjs EFMP-303 5 --locale ur
```

The parity gates are **conditional and silent** while `translation_status: draft`. To get real coverage, temporarily flip **both** `index.mdx` files to `reviewed`, run `npm run check:content`, fix what it finds, then **flip them back** and confirm with `grep`.

## Do not

- Do not flip `translation_status` to `reviewed`. That is an accepted G5's verdict, not yours.
- Do not add a `G4 ur-translation` tracker row.
- Do not review your own translation.
- Do not fix English content here. If the English is wrong, say so on this issue and stop.

## Done means

- All 5 Urdu files exist with the same heading level vector, the same component calls and the same assessment items as their English counterparts.
- `npm run build` succeeds for both locales.
- `translation_status` is still `draft` in both locales.
- A comment lists the files translated, the English commit they were translated from, every term used that the bank does not hold, and anything that could not be resolved confidently.


## Response snapshot

Resumed the existing branch in isolated worktree TEX-66. Read recent board PHRs, approved course spec, tracker, translation skill and parity/register/assessment references, G5 rubric and EFMP-301 precedent. No completed Unit 5 Urdu mirror existed.

Stopped at an English factual defect as the assignment requires: topic-01's accreditation paragraph assigns degree-programme accreditation directly to HEC. Official sources distinguish HEC's system framework from discipline-specific council programme accreditation, including NACTE's teacher-education mandate. Created TEX-100 assigned to CurriculumOwner for bounded English correction and frozen-baseline handoff. Also flagged in-text Khan (2018) versus absent Unit 5 register entry for reconciliation, without claiming fabrication or reopening TEX-68's settled further-reading ruling.

Evidence checked 2026-10-16:
- https://www.hec.gov.pk/english/news/news/Pages/HEC-Reaffirms-Statutory-Mandate.aspx
- https://www.nacte.org.pk/about
- https://www.nacte.org.pk/Accreditation

Baseline branch: cc51b0f25962b56f2164c506ca0a0ad5565cf845. Last English Unit 5 change: e23475c4dd7c2f4cf70aab2692cdd8b88bb539de.

## Outcome

- Impact: isolated a source-backed English prerequisite before carrying the error into Urdu.
- Tests: no content/build/render runs; no learner-facing inputs changed.
- Files: this PHR only.
- Next: CurriculumOwner resolves TEX-100; BilingualAuthor resumes the five-file mirror on the supplied frozen commit.
- Reflection: distinguish institutional framework from programme accreditation before translating authority claims.

## Handoff (for CEO and agents)

- Shipped / changed: no translation or English edits; created TEX-100 and recorded the baseline evidence here. TEX-66 waits on TEX-100 through a first-class dependency.
- Decisions the team must respect: do not repair English silently in G4, do not reuse stale provider-quota blockers, do not reopen TEX-68's further-reading ruling. Existing branch and draft PR #120 remain the handoff. All English Unit 5 status fields remain draft; no tracker or certification changes.
- Pending / next owner: CurriculumOwner corrects accreditation authority, settles in-text source support and returns a frozen English commit under TEX-100. BilingualAuthor then translates all five files and four figure variants and runs required parity/build/render checks. Development in the national/economic sense remains proposed ترقی disambiguation, not a bank edit.
- Paperclip issues affected: TEX-66, TEX-100, parent TEX-59.

## Evaluation notes (flywheel)

- Failure modes observed: English accreditation authority conflation; in-text/register provenance mismatch requires owner confirmation.
- Graders run and results (PASS/FAIL): not run; translation stopped before edits under the explicit task rule.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): translate only after receiving the corrected frozen baseline.
