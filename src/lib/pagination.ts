import type { Result } from '@site/src/lib/classes';

/**
 * Pagination helper (Spec 010, post-implementation fix) - PostgREST caps an unbounded
 * `select('*')` at its configured `max_rows` (1000 in this project's `supabase/config.toml`).
 * An admin-wide aggregate query with no filter WILL exceed that as a table grows with real
 * usage - discovered when `unit_progress` (2,595 rows from accumulated testing) silently
 * dropped a freshly-inserted row from `admin/overview.tsx`'s progress panel. Every admin-wide
 * "read everything, then aggregate client-side" query in this feature goes through this
 * helper instead of a bare `.select('*')`, so none of them can silently truncate.
 */
const PAGE_SIZE = 1000;

export async function fetchAllPages<T>(
  fetchPage: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: Error | null }>,
): Promise<Result<T[]>> {
  const all: T[] = [];
  let from = 0;
  for (;;) {
    const { data, error } = await fetchPage(from, from + PAGE_SIZE - 1);
    if (error) return { data: null, error };
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }
  return { data: all, error: null };
}
