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

export type Catalog = {
  _note?: string;
  semesters: CatalogSemester[];
};

export async function fetchCatalog(): Promise<Catalog | null> {
  const res = await fetch('/catalog-courses.json');
  if (!res.ok) return null;
  return (await res.json()) as Catalog;
}
