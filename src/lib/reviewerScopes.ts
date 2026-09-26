import type { Catalog } from './catalog';

export type ReviewerGrant = { id: string; track: string; course_code: string | null; revoked_at: string | null };

export function courseTrack(catalog: Catalog, code: string): 'bed' | 'licence' | null {
  if (catalog.semesters.some(s => s.courses.some(c => c.code === code))) return 'bed';
  if (catalog.tracks?.some(t => t.id === 'licence' && t.courses.some(c => c.code === code))) return 'licence';
  return null;
}

export function canReview(grants: readonly ReviewerGrant[], track: string | null, course: string): boolean {
  return Boolean(track && grants.some(g => !g.revoked_at && g.track === track && (g.course_code === null || g.course_code === course)));
}
