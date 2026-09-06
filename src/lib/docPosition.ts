/**
 * Doc-position helpers shared by the "Suggest improvement" control (Spec 005) and the
 * reader content-feedback control (Spec 010 T019, T021). Extracted verbatim
 * (behavior-preserving) from `DocItem/Footer.tsx`, which previously kept this private.
 */

export type TocEntry = { value: string; id: string; level: number };

const NEAREST_SECTION_THRESHOLD_PX = 100;

/**
 * research.md R1 (Spec 005) - the last toc heading whose element has already scrolled
 * to or above a small "reading position" threshold; `null` if the reader is above the
 * first heading (top of page). Computed once, on click, not via a continuous scroll
 * listener.
 */
export function findNearestSectionAnchor(toc: readonly TocEntry[]): string | null {
  if (typeof document === 'undefined') return null;
  let nearest: string | null = null;
  for (const entry of toc) {
    const el = document.getElementById(entry.id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= NEAREST_SECTION_THRESHOLD_PX) {
      nearest = entry.id;
    }
  }
  return nearest;
}
