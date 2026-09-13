import { fetchCatalog } from '@site/src/lib/catalog';
import { fetchContentIndex } from '@site/src/lib/assignments';

/**
 * Course options for the teacher class-creation dropdown (Spec 011, US4 / FR-010).
 *
 * The list is the catalog (bilingual names, track-grouped) intersected with the set of
 * `course_code`s that actually have authored content in the build-time content index - the
 * same "has content" test `assignment-new.tsx` already applies to units. A class cannot be
 * created for a course with nothing to teach.
 */

export type CourseOption = {
  code: string;
  title_en: string;
  title_ur: string;
  /** Semester number for the pre-service track; null for a track without one. */
  ordinal: number | null;
  hasContent: boolean;
};

/**
 * Track-keyed rather than semester-keyed (Feature 015, FR-012).
 *
 * A licence course has no semester, so carrying `ordinal: number | null` makes
 * the "never ask an ordinal-free track for a semester number" invariant a
 * property of the type instead of something every consumer must remember.
 */
export type CourseOptionGroup = {
  trackId: string;
  /** Group heading, per locale. A track names itself; a semester is numbered. */
  label_en: string;
  label_ur: string;
  ordinal: number | null;
  courses: CourseOption[];
};

/**
 * Semester-grouped course options. Courses with no authored content are marked
 * `hasContent: false` so the UI can disable rather than silently drop them.
 */
export async function fetchCourseOptions(): Promise<CourseOptionGroup[]> {
  const [catalog, index] = await Promise.all([fetchCatalog(), fetchContentIndex()]);
  if (!catalog) return [];
  const withContent = new Set(index.filter((e) => !e.coming_soon).map((e) => e.course_code));

  const toOption = (c: { code: string; title_en: string; title_ur: string }, ordinal: number | null) => ({
    code: c.code,
    title_en: c.title_en,
    title_ur: c.title_ur,
    ordinal,
    hasContent: withContent.has(c.code),
  });

  return [
    ...catalog.semesters.map((sem) => ({
      trackId: 'pre-service',
      label_en: `Semester ${sem.number}`,
      label_ur: `سمسٹر ${sem.number}`,
      ordinal: sem.number,
      courses: sem.courses.map((c) => toOption(c, sem.number)),
    })),
    ...(catalog.tracks ?? []).map((track) => ({
      trackId: track.id,
      label_en: track.title_en,
      label_ur: track.title_ur,
      ordinal: null,
      courses: track.courses.map((c) => toOption(c, null)),
    })),
  ].filter((g) => g.courses.length > 0);
}
