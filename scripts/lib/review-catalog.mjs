/** Course IDs only. Content and review evidence stay in Git. */
export function degreeCourseCodes(catalog) {
  return [...new Set(catalog.semesters.flatMap(s => s.courses.map(c => c.code)))].sort();
}
