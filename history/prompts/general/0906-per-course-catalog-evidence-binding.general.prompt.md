---
id: 0906
title: Per-course catalog evidence binding
stage: general
date: 2026-11-02
surface: agent
model: claude-opus-5-5
feature: none
branch: feature/per-course-catalog-binding
user: M Yousif Channa
command: none
labels: ["board-direct", "review-evidence", "adr-0027", "catalog", "semester-3"]
links:
  spec: null
  ticket: null
  adr: history/adr/0027-unit-scoped-evidence-binding.md
  pr: null
files:
 - scripts/lib/review-evidence.mjs
 - scripts/prepare-gate-evidence.mjs
 - catalog/courses.json
 - tests/review/evidence.test.mjs
 - tests/unit/review-scope-catalog.test.mjs
 - specs/content/*/tasks.md (91 G2 rows repointed)
 - specs/content/*/reviews/unit-NN/G2/ (91 evidence files, 728 logs)
tests:
 - node --test tests/review/*.test.mjs (42 pass, 2 new)
 - vitest run tests/unit (340 pass)
 - node --test tests/crew/*.test.mjs (96 pass)
 - npm run check:content (exit 0); check:pipeline-gate 2 certified, 90 gate-checked (same as main)
---

## Prompt

our goal is to continuously add new courses so this limitation is a bottleneck, every new addition will invalidate the existing g3 rewiv must be avoided

do the per-course catalog binding now

## Response snapshot

`scripts/lib/review-evidence.mjs` bound the whole of `catalog/courses.json` into every scoped G2/G3/G5 input manifest. A new `sliceCatalog`, beside `sliceSpec`, now projects the catalog for a scoped manifest. Every semester and track keeps its own fields, but each `courses` list keeps only the reviewed course.
- Adding, editing or removing another course no longer changes a unit's digest.
- Still invalidating: this course's own entry, moving or removing it, a semester's or track's own fields, and the top-level keys.
- Unknown structure binds the whole file: bad JSON, an unexpected shape, or a course missing from the catalog.

The six Semester 3 entries (D-2026-0075 to 0080) are added in Scheme row order.

`review-evidence.mjs` sits inside its own hashed closure, so this edit made all 91 G2 evidence files stale once. `prepare-gate-evidence.mjs --refresh-stale` (new) runs the 8 draft gates once at HEAD (all PASS), writes each stale unit its own evidence and logs, and repoints its G2 tracker row. Tiers are unchanged from main: 2 certified, 90 gate-checked.

`tests/unit/review-scope-catalog.test.mjs` required the 0046 migration seed to equal the live catalog, so any new course broke it. It now requires every seeded code to still exist in the catalog; later courses reach `review_course_scopes` through `agent-job sync-catalog` (0048).

## Outcome

- ✅ Impact: adding a course no longer touches any other course's review evidence; Semester 3 is in the catalog.
- 🧪 Tests: review 42/42, unit 340/340, crew 96/96, check:content exit 0.
- 📁 Files: see front matter.
- 🔁 Next prompts: document the binding narrowing as an ADR-0027 amendment (`/sp.adr per-course-catalog-evidence-binding`); run `npm run agent:job -- sync-catalog` with the service key so Spec 025 review scopes include the six new courses.
- 🧠 Reflection: the measured cost of the one-time sweep was 91 units, with no G3 or G5 sign-off broken. Human-initial certifications are not manifest-checked, and no agent `review:` row was stale.

## Handoff (for CEO and agents)

- Shipped / changed: per-course catalog binding (`sliceCatalog`); six Semester 3 catalog entries; `prepare-gate-evidence.mjs --refresh-stale`; all G2 evidence refreshed at the new binding.
- Decisions the team must respect: never re-widen the catalog binding. A course's evidence binds only its own entry plus shared catalog structure. After any future edit to `review-evidence.mjs` (or anything in the review-script closure), run `node scripts/prepare-gate-evidence.mjs --refresh-stale` in the same PR.
- Pending / next owner: crew. The EFMP-406 Unit 1-3 author branches predate this change, so their G2 evidence needs the usual refresh after merging main. Owner or ops: run `agent-job sync-catalog`.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: a snapshot test froze a migration seed against the live catalog; the whole-catalog binding made routine growth corpus-invalidating.
- Graders run and results (PASS/FAIL): all suites PASS; content gates PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): have the crew planner run `--refresh-stale` automatically when a merged PR touches the review-script closure.
