import { useCallback, useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';
import { getSupabase } from '@site/src/lib/supabase';
import { useAuth } from '@site/src/contexts/AuthContext';
import type { Class } from '@site/src/lib/types';

/**
 * Resolves the caller's role within a given class (Spec 003, T003).
 *
 * COSMETIC ONLY (Constitution Art. IX.2), exactly like AuthGuard.tsx — this
 * hook decides what a page *renders*, nothing more. The real enforcement is
 * RLS: `classes_select` (migration 0012) already returns the row only if the
 * caller is the owning teacher, an admin, or an actively-enrolled student —
 * zero rows otherwise. `role` here is derived from *why* the row was
 * visible, not an independent authorization decision.
 *
 * ⚠️ NO REACT CONTEXT/PROVIDER — this feature uses query-string-based routing
 * (`?classId=…`), not nested dynamic path segments, because Docusaurus's
 * file-based router has no built-in dynamic-segment convention the way
 * Next.js's `[classId]` does. plan.md's file-tree sketch used bracket
 * notation as a conceptual URL shape, not a literal routing mechanism; a
 * custom route-registration plugin would be the alternative, but query
 * params work with plain static pages (the same pattern every existing
 * `src/pages/app/*.tsx` from Spec 002 already uses) and need no new
 * Docusaurus infrastructure. Each page reads its own `classId` via
 * `useQueryParam` and calls `useClassRole` directly — no ancestor provider
 * needed, since nothing here is truly global session state the way
 * AuthContext is.
 */

export type ClassRole = 'teacher' | 'student' | 'none';

export type ClassRoleState = {
  /** Still resolving — render neutral UI, not an access-denied state. */
  loading: boolean;
  classRow: Class | null;
  role: ClassRole;
  error: string | null;
  refresh: () => Promise<void>;
};

export function useClassRole(classId: string | null): ClassRoleState {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [classRow, setClassRow] = useState<Class | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!classId) {
      setClassRow(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const supabase = await getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data, error: fetchError } = await supabase
      .from('classes')
      .select('*')
      .eq('id', classId)
      .maybeSingle();
    if (fetchError) {
      setError('Could not load this class.');
      setClassRow(null);
    } else {
      setClassRow((data as Class) ?? null);
    }
    setLoading(false);
  }, [classId]);

  useEffect(() => {
    load();
  }, [load]);

  const role: ClassRole =
    !classRow || !profile
      ? 'none'
      : classRow.teacher_id === profile.id
        ? 'teacher'
        : 'student';

  return { loading, classRow, role, error, refresh: load };
}

/** Read a named param (e.g. `classId`, `assignmentId`) from the URL's query string. */
export function useQueryParam(name: string): string | null {
  const location = useLocation();
  return new URLSearchParams(location.search).get(name);
}
