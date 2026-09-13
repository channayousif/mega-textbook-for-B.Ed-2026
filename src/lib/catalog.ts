/**
 * Catalog reader (Spec 010, T038, FR-029). File-based, not a database table - the
 * console's catalog-edit form reads this public, read-only build-time copy of
 * `catalog/courses.json` (`scripts/build-content-index.mjs` copies it verbatim to
 * `static/catalog-courses.json`, the same `static/*.json` convention as
 * `content-index.json`/`content-status.json`) and only ever produces a downloadable
 * replacement file - it never writes catalog content to Postgres (Constraints,
 * "Content stays in version control").
 */

export type CatalogCourse = {
  code: string;
  title_en: string;
  title_ur: string;
  credit_hours: string;
  category: string;
  bilingual?: boolean;
};

export type CatalogSemester = {
  number: number;
  priority: number;
  courses: CatalogCourse[];
};

/**
 * A non-degree content track (Feature 015, ADR-0020). Additive beside `semesters`,
 * so every existing reader stays valid; `allCourses` is how a reader asks for
 * every course without having to know which key it lives under.
 */
export type CatalogTrack = {
  id: string;
  title_en: string;
  title_ur: string;
  courses: CatalogCourse[];
};

export type Catalog = {
  _note?: string;
  semesters: CatalogSemester[];
  tracks?: CatalogTrack[];
};

/**
 * Every course, across semesters and tracks alike.
 *
 * Prefer this to iterating `catalog.semesters` directly: the additive `tracks`
 * key means a reader that iterates only semesters silently misses licence
 * courses, and that class of bug is invisible until someone notices a course is
 * absent from a dropdown.
 */
export function allCourses(catalog: Catalog): CatalogCourse[] {
  return [
    ...catalog.semesters.flatMap((s) => s.courses),
    ...(catalog.tracks ?? []).flatMap((t) => t.courses),
  ];
}

export async function fetchCatalog(): Promise<Catalog | null> {
  const res = await fetch('/catalog-courses.json');
  if (!res.ok) return null;
  return (await res.json()) as Catalog;
}
