---
id: 0171
title: Sidebar numbering and Urdu readability
stage: general
date: 2026-10-17
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/sidebar-nav
user: M Yousif Channa
command: none
labels: ["board-direct", "sidebar", "i18n", "rtl", "ui"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - sidebarItemsGenerator.ts
 - docusaurus.config.ts
 - src/components/TranslationStatusBadge.tsx
 - src/css/custom.css
 - i18n/ur/docusaurus-plugin-content-docs/current.json
tests:
 - npx tsc --noEmit (no errors in changed files)
 - npm run check:content (13/13 PASS)
 - docusaurus build --locale ur, then full npm run build
 - Playwright screenshots of the built Urdu sidebar (GNAS-301 Unit 2, EFMP-304 Unit 1) against the live site
---

## Prompt

in the left navigation side pan, few corrections are required: 
1. Unit number is missing from the unit titles and some topicc (eg: GNAS-301)
2. Course intro page is listed at the bottom instead of top.
3. on Urdu locale, side pane items are not readable because of indentation, some are translated in urdu some are not. optimize for clear visibility.
4. semester 2 navigation is also inconsistent, course name, unit no and title, topic no and its titles need to be consistent.
Also, tag "Draft translation - not yet human-reviewed / مسودہ ترجمہ" is present even on english pages of main page of each unit of each course.

## Response snapshot

Causes found:
- GNAS-301 Units 2-6 and all of EFMP-304 had no `_category_.json`, so the sidebar used the bare unit title.
- `course-overview.mdx` has no position, so it sorted after the units.
- The Urdu labels came from a stale `current.json` that was half English and lacked numbers.
- On Urdu, the forced-LTR sidebar container met rtlcss-flipped Infima rules, leaving the browser's 40px list padding at every level. Topic labels got about 86px.
- Docusaurus 3.10 clamps every label to two lines.
- The badge is hand-placed with `status="draft"` in English and Urdu `index.mdx` alike.

Fixes, with no content file edited:
- A `sidebarItemsGenerator` labels semesters, courses (from the catalog, Urdu `title_ur`), units ("Unit N" / "یونٹ N") and topics ("Topic N.M" / "موضوع N.M") from data. It puts the course overview first and gives assessment and teacher notes fixed labels.
- Untranslated pages on Urdu keep a wholly English label with an "EN" marker.
- Each category's folder path is its translation key.
- The Urdu sidebar menu reads RTL, and its position on the left is unchanged per the 2026-07-19 owner decision.
- Labels are unclamped.
- The badge renders only on Urdu. A page with no Urdu file shows "not yet available", and the front-matter `translation_status` wins over the literal prop.
- The 54 dead sidebar keys are removed from `current.json`.

## Outcome

- Impact: consistent, numbered, overview-first navigation in both locales and every semester; a readable Urdu sidebar; no translation badge on English pages.
- Tests: listed above.
- Files: 5 site files plus this PHR; no course content, manifest or gate evidence touched.
- Next prompts: none required.
- Reflection: the generator removes the need to hand-maintain `_category_.json` labels and Urdu sidebar keys; a new course or unit is labelled correctly on arrival.

## Handoff (for CEO and agents)

- Shipped / changed: sidebar labels and order are derived in `sidebarItemsGenerator.ts`; the translation badge is locale-aware; Urdu sidebar CSS.
- Decisions the team must respect: do not add `sidebar.textbook.category.*` keys to `i18n/ur/.../current.json` or rely on `_category_.json` labels for unit or course names; the generator overrides them. Urdu unit and topic labels come from the Urdu `index.mdx` and topic titles, so translating a unit fixes its labels by itself.
- Pending / next owner: untranslated units (all of GENG-300, EFMP-304 Unit 1, most course overviews) stay English with an "EN" marker until the crew's G4 translation jobs land.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: navigation data duplicated in three places (folders, category files, translation keys) drifted apart; a layout override that silently fought the RTL CSS pass.
- Graders run and results (PASS/FAIL): content gates PASS, builds PASS, screenshots PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): add a check that every unit category label starts with its unit number in both locales.
