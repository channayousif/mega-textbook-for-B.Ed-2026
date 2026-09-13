# Quickstart: adding a licence-track course

This is the walkthrough `check-add-course.mjs` asserts (research R4). If any step here requires
editing `src/`, `docusaurus.config.ts` or `sidebars.ts`, Article V.4 is broken and the gate fails.

## 1. Catalogue the course

Add to `catalog/courses.json` under `tracks[]` where `id` is `licence`:

```json
{ "code": "EED-411", "title_en": "Classroom Assessment", "title_ur": "...",
  "credit_hours": "3 (3-0)", "category": "Licence track", "bilingual": true }
```

## 2. Create the content folder

```
licence/eed-411/
├── _category_.json          # label, position, customProps.course_code
└── course-overview.mdx
```

## 3. Write the content spec

`specs/content/eed-411/content-spec.md`, with `course_code`, `status: draft`, and a `## Unit N`
subsection per unit carrying the G1 blocks the depth gate reads. See
`specs/content/eed-313/content-spec.md` as the worked example.

## 4. Author units

`licence/eed-411/unit-01/` and so on, under the current style guide. The Urdu mirror goes to
`i18n/ur/docusaurus-plugin-content-docs-licence/current/eed-411/unit-01/` - **not** the default
`docusaurus-plugin-content-docs` tree, which belongs to the degree corpus.

## 5. Run the gates

```bash
npm run check:content
```

All seven apply to licence content exactly as to degree content.

## 6. Prepare a review bundle

```bash
npm run review:evidence -- prepare EED-411 1 G3 /tmp/g3-run
```

Works because `resolveUnit` searches every tier (FR-003). Commit first: `prepare` refuses a dirty
tree.

## What you must not need to do

Touch a gate script, `docusaurus.config.ts`, `sidebars-licence.ts`, or any file under `src/`.
That is the Article V.4 guarantee, and the add-course gate proves it on every CI run.
