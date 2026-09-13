# Phase 1 Data Model: Licence content tree

No database. These are filesystem and JSON shapes.

## ContentTier

The feature's central new entity. Two instances ship; the vocabulary lives in
`scripts/lib/content-roots.mjs`, never in prose.

| Field | Type | `semester` | `licence` |
|---|---|---|---|
| `id` | string | `semester` | `licence` |
| `contentRoot` | path | `docs` | `licence` |
| `dirPattern` | RegExp | `/^semester-(\d+)$/` | n/a - courses sit directly under the root |
| `hasOrdinal` | boolean | `true` (the semester number) | `false` |
| `urBase` | path | `i18n/ur/docusaurus-plugin-content-docs/current` | `i18n/ur/docusaurus-plugin-content-docs-licence/current` |
| `routeBasePath` | string | `/` | `/licence` |
| `pluginId` | string | default instance | `licence` |

**Invariant**: `urBase` is derived from `pluginId`, because Docusaurus names translation
directories after the plugin instance. `i18n/ur/docusaurus-plugin-content-docs-guides/` already
exists as proof of the rule. This is the field FR-006 exists to protect: the default `urBase` would
silently pass a licence unit with no Urdu mirror at all.

**Invariant**: a tier with `hasOrdinal: false` must never be asked for a semester number. Consumers
that order or label by semester skip such tiers rather than defaulting to `0`.

## UnitRecord

What the walker yields. Replaces the six ad-hoc `{ unitDir, semester, courseFolder, courseCode,
unitNo }` shapes.

| Field | Type | Notes |
|---|---|---|
| `tier` | `ContentTier` | the owning tier |
| `tierDir` | string | `semester-1`, or `''` for a tier without a grouping directory |
| `courseFolder` | string | lowercase, e.g. `eed-313` |
| `courseCode` | string | uppercase, e.g. `EED-313`; matches the front-matter pattern including the scheme's `--` placeholders |
| `unitNo` | number | from `unit-NN` |
| `unitDir` | absolute path | the English unit directory |
| `urUnitDir` | absolute path | the Urdu mirror, computed from `tier.urBase` |
| `ordinal` | number or null | semester number, or `null` where `hasOrdinal` is false |

## CatalogTrack

Additive sibling of `CatalogSemester` in `catalog/courses.json` (research R1).

```ts
type CatalogTrack = {
  id: string;          // 'licence'
  title_en: string;
  title_ur: string;
  courses: CatalogCourse[];   // unchanged shape
};

type Catalog = {
  _note?: string;
  semesters: CatalogSemester[];
  tracks?: CatalogTrack[];    // optional: existing files stay valid
};
```

`CatalogCourse` is unchanged: `code`, `title_en`, `title_ur`, `credit_hours`, `category`,
`bilingual?`. A licence course sets `category: 'Licence track'`.

**Reader**: `allCourses(catalog)` returns every course across both keys. Consumers call it instead
of iterating `catalog.semesters`, so a consumer that should see licence courses cannot silently
miss them.

## EED-313 catalogue entry

The tier's only occupant after this feature. No units are authored here.

```json
{
  "code": "EED-313",
  "title_en": "Classroom Management",
  "title_ur": "کلاس روم مینجمنٹ",
  "credit_hours": "3 (3-0)",
  "category": "Licence track",
  "bilingual": true
}
```

`bilingual: true` with the Urdu mirror deferred until the `reviewer` role exists is the owner's
2026-09-13 decision. The parity gate must therefore tolerate a catalogued bilingual course whose
Urdu tree is absent *while it has no units*, exactly as it does for any un-authored degree course.
