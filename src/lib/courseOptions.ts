import { fetchCatalog } from '@site/src/lib/catalog';
import { fetchContentIndex } from '@site/src/lib/assignments';

/**
 * Course options for the teacher class-creation dropdown (Spec 011, US4 / FR-010).
 *
 * The list is the catalog (bilingual names, semester-grouped) intersected with the set of
 * `course_code`s that actually have authored content in the build-time content index - the
 * same "has content" test `assignment-new.tsx` already applies to units. A class cannot be
 * created for a course with nothing to teach.
 */

export type CourseOption = {
  code: string;
  title_en: string;
  title_ur: string;
  semester: number;
  hasContent: boolean;
};

export type CourseOptionGroup = {
  semester: number;
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

  return catalog.semesters
    .map((sem) => ({
      semester: sem.number,
      courses: sem.courses.map((c) => ({
        code: c.code,
        title_en: c.title_en,
        title_ur: c.title_ur,
        semester: sem.number,
        hasContent: withContent.has(c.code),
      })),
    }))
    .filter((g) => g.courses.length > 0);
}
