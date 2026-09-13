# Phase 1 Data Model: Licence content tree

No database. These are filesystem and JSON shapes.

**Track vocabulary (clarification, 2026-09-13).** "Track" is the canonical term for a content
grouping; "tier" is not used. The degree corpus is the **`pre-service`** track, one that happens to
group its courses by semester, rather than a peer of `licence`. The owner anticipates further
tracks - **CPD / in-service** is the named next one, which the STEDA policy's five-credit-hour
renewal requirement makes concrete. A track's semester grouping is therefore an optional property
of one track, not a property of the content model.

## ContentTrack

The feature's central new entity. Two instances ship; the vocabulary lives in
`scripts/lib/content-roots.mjs`, never in prose.

| Field | Type | `pre-service` | `licence` |
|---|---|---|---|
| `id` | string | `pre-service` | `licence` |
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

**Invariant**: a track with `hasOrdinal: false` must never be asked for a semester number. Consumers
that order or label by semester skip such tracks rather than defaulting to `0`.

## UnitRecord

What the walker yields. Replaces the six ad-hoc `{ unitDir, semester, courseFolder, courseCode,
unitNo }` shapes.

| Field | Type | Notes |
|---|---|---|
| `track` | `ContentTrack` | the owning track |
| `trackDir` | string | `semester-1`, or `''` for a track without a grouping directory |
| `courseFolder` | string | lowercase, e.g. `eed-313` |
| `courseCode` | string | uppercase, e.g. `EED-313`; matches the front-matter pattern including the scheme's `--` placeholders |
| `unitNo` | number | from `unit-NN` |
| `unitDir` | absolute path | the English unit directory |
| `urUnitDir` | absolute path | the Urdu mirror, computed from `track.urBase` |
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

## CourseOptionGroup

The UI grouping `src/lib/courseOptions.ts` returns, generalised from semester-keyed to track-keyed
so the no-ordinal-leakage invariant is carried by the type (clarification, 2026-09-13).

```ts
type CourseOptionGroup = {
  trackId: string;            // 'pre-service' | 'licence'
  label: string;             // 'Semester 1' | 'Licence track'
  ordinal: number | null;    // was `semester: number`; null for ordinal-free tracks
  courses: CourseOption[];   // each course's `semester` field likewise becomes `ordinal`
};
```

Consumers to migrate: `src/pages/app/classes/index.tsx`,
`src/pages/app/teacher/quiz-authoring.tsx`. `hasContent` semantics are unchanged - a course with
no authored units is marked rather than dropped, which is how the seven catalogued-but-unauthored
degree courses already behave.

## EED-313 catalogue entry

The track's only occupant after this feature. No units are authored here.

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
