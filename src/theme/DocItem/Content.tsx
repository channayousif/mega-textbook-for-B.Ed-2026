import React, { useEffect, useRef } from 'react';
import ContentOriginal from '@theme-original/DocItem/Content';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAuth } from '@site/src/contexts/AuthContext';
import { fetchOwnChecks, upsertCheck, mergeLocalChecks } from '@site/src/lib/selfAssessment';

/**
 * Swizzled DocItem/Content (Spec 010 T013).
 *
 * Turns Spec 008's static, disabled `## Self-assessment checklist` checkboxes into a
 * live, persisted control - WITHOUT touching a single topic file (FR-008). Exact
 * mechanism: specs/010-curriculum-owner-console/contracts/self-assessment-hydration.md.
 *
 * This is a vanilla-DOM hydration pass over the already-rendered MDX output, not a
 * React-controlled form - the checkbox nodes come from Docusaurus's GFM renderer, not
 * from this component's own JSX.
 *
 * ⚠️ THREE DELIBERATE HARDENING DECISIONS (post-implementation fixes, all found by
 * tests/e2e/self-assessment-checklist.spec.ts - `AuthContext` genuinely fires more than
 * one `setSession`/`setProfile` update around a single sign-in/out transition, an
 * `onAuthStateChange` update racing `signOut()`'s own explicit calls):
 *
 * 1. The effect below depends on `role` and `loading`, never on `profile`/`profile?.id`.
 *    A version keyed on `profile?.id` re-ran on every redundant update, and each re-run
 *    unconditionally reset every checkbox's `.checked` to a freshly-recomputed value -
 *    stomping a tick the user made a moment earlier if a stale run's DOM-mutating code
 *    executed after the user's click. `role` (derived from `profile?.role`, a primitive)
 *    only actually changes on a genuine sign-in/out transition, so this only re-hydrates
 *    when it must.
 * 2. `handleChange` reads `profileRef.current` at click time rather than closing over a
 *    `profile`/`signedIn` snapshot frozen when the handler was attached - so it never
 *    needs re-attaching to "catch up" to the current auth state, and can never write to
 *    the wrong place because of one.
 * 3. The effect returns early while `loading` is true. `role`/`profile` both read as
 *    `null` during AuthContext's own not-yet-resolved window, indistinguishable from
 *    "genuinely signed out" by value alone - hydrating during that window on a
 *    freshly-signed-in page load reads localStorage for what is about to turn out to be
 *    a signed-in session, and can show a stale local tick that happens to already match
 *    the not-yet-merged account state, masking that the real merge into the account
 *    never actually ran.
 *
 * `insertHint()`/`insertErrorContainer()` are also idempotent (replace any prior element
 * with the same testid rather than stacking a duplicate) as a second line of defence,
 * independent of the three fixes above.
 */

type Props = { children: React.ReactNode };
type TocEntry = { value: string; id: string; level: number };

const CYCLE_HEADING_COUNT = 9;
const SELF_ASSESSMENT_HEADING_INDEX = 5; // 6th of 9, zero-based

const MESSAGES = {
  signInHint: {
    en: 'Sign in to sync your ticks across devices.',
    ur: 'اپنے نشانات کو آلات کے درمیان ہم آہنگ کرنے کے لیے سائن ان کریں۔',
  },
  saveError: {
    en: 'Could not save this tick. Please try again.',
    ur: 'یہ نشان محفوظ نہیں ہو سکا۔ براہ کرم دوبارہ کوشش کریں۔',
  },
} as const;

function normalize(text: string): string {
  return text.trim().replace(/\s+/g, ' ');
}

/** Locates the checklist's `<ul>` by position (research.md R2), or `null` if the topic file doesn't match the nine-heading cycle contract. */
function findChecklistList(toc: readonly TocEntry[]): HTMLUListElement | null {
  if (typeof document === 'undefined') return null;
  const level2 = toc.filter((t) => t.level === 2);
  if (level2.length !== CYCLE_HEADING_COUNT) return null;

  const heading = document.getElementById(level2[SELF_ASSESSMENT_HEADING_INDEX].id);
  if (!heading) return null;

  let node: Element | null = heading.nextElementSibling;
  while (node) {
    if (node.tagName === 'UL') return node as HTMLUListElement;
    if (/^H[1-6]$/.test(node.tagName)) return null; // hit the next heading first — no list
    node = node.nextElementSibling;
  }
  return null;
}

type ChecklistItem = { li: HTMLLIElement; checkbox: HTMLInputElement; text: string; position: number };

function readItems(list: HTMLUListElement): ChecklistItem[] {
  const items: ChecklistItem[] = [];
  let position = 0;
  for (const child of Array.from(list.children)) {
    if (child.tagName !== 'LI') continue;
    const checkbox = child.querySelector<HTMLInputElement>('input[type="checkbox"]');
    if (!checkbox) continue; // malformed list item — not a checklist row, no position assigned
    position += 1;
    items.push({ li: child as HTMLLIElement, checkbox, text: normalize(child.textContent ?? ''), position });
  }
  return items;
}

const localKey = (courseCode: string, unitNo: number, topicNo: number, locale: string, position: number) =>
  `sa:${courseCode}:${unitNo}:${topicNo}:${locale}:${position}`;

const LOCAL_KEY_RE = /^sa:([^:]+):(\d+):(\d+):(en|ur):(\d+)$/;

type LocalValue = { checked: boolean; text: string };

function readLocal(key: string): LocalValue | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as LocalValue;
  } catch {
    return null;
  }
}

function writeLocal(key: string, value: LocalValue): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // best-effort only — a full/unavailable localStorage just means this tick isn't persisted
  }
}

/**
 * research.md R4 — signed-out-to-signed-in merge. Deliberately NOT gated by a persistent
 * "have we ever merged" flag: an early implementation used one, and it broke the very case
 * it exists for — a first sign-in with zero local ticks yet still counts as a "successful"
 * (trivially empty) merge, so a flag set right then would permanently disable every LATER
 * sign-out-then-tick-then-sign-in cycle on that device, forever. Instead: on every signed-in
 * load, merge whatever `sa:` keys currently exist (usually none — a signed-in session's own
 * writes never touch localStorage), then delete exactly the keys that were attempted. Deleting
 * unconditionally on a successful call (not only on an actual insert) is safe and correct:
 * `mergeLocalChecks`'s `ignoreDuplicates: true` already makes a re-attempt against an
 * already-covered position a no-op, so "insert" and "ignored because the account already has
 * this position" both mean the local copy is reconciled and safe to drop — the account's own
 * row is authoritative either way (the "second cycle" edge case this exists for).
 */
async function runMergeIfNeeded(profileId: string): Promise<void> {
  const keys: string[] = [];
  const entries: Parameters<typeof mergeLocalChecks>[1] = [];
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (!key) continue;
      const m = LOCAL_KEY_RE.exec(key);
      if (!m) continue;
      const value = readLocal(key);
      if (!value) continue;
      keys.push(key);
      entries.push({
        courseCode: m[1],
        unitNo: Number(m[2]),
        topicNo: Number(m[3]),
        locale: m[4] as 'en' | 'ur',
        itemPosition: Number(m[5]),
        itemTextSnapshot: value.text,
        checked: value.checked,
      });
    }
  } catch {
    return; // localStorage unavailable — nothing to merge
  }
  if (entries.length === 0) return;

  const { error } = await mergeLocalChecks(profileId, entries);
  if (!error) {
    try {
      for (const key of keys) window.localStorage.removeItem(key);
    } catch {
      // best-effort — a later sign-in retries the same (now-idempotent) merge
    }
  }
}

/** Idempotent: replaces any prior element with the same testid under `list`'s parent, rather
 * than stacking a duplicate - defensive against a future re-hydration pass. */
function upsertMarker(list: HTMLUListElement, testid: string, build: () => HTMLElement, before: boolean): HTMLElement {
  const parent = list.parentElement;
  const existing = parent?.querySelector<HTMLElement>(`[data-testid="${testid}"]`);
  if (existing) existing.remove();
  const el = build();
  el.setAttribute('data-testid', testid);
  if (before) parent?.insertBefore(el, list);
  else parent?.insertBefore(el, list.nextSibling);
  return el;
}

function insertHint(list: HTMLUListElement, text: string): void {
  const hint = upsertMarker(list, 'self-assessment-sync-hint', () => document.createElement('p'), true);
  hint.textContent = text;
  hint.className = 'admonition-content';
}

function insertErrorContainer(list: HTMLUListElement): HTMLDivElement {
  const div = upsertMarker(list, 'self-assessment-error', () => document.createElement('div'), false) as HTMLDivElement;
  div.setAttribute('role', 'alert');
  div.setAttribute('aria-live', 'assertive');
  div.hidden = true;
  return div;
}

export default function DocItemContentWrapper(props: Props): React.ReactElement {
  const { frontMatter, toc } = useDoc() as unknown as {
    frontMatter: Record<string, unknown>;
    toc: readonly TocEntry[];
  };
  const { i18n } = useDocusaurusContext();
  const { profile, role, loading } = useAuth();
  // `handleChange` reads this instead of closing over `profile` directly - see the
  // file-level comment on why a snapshot frozen at hydration time is unsafe here.
  const profileRef = useRef(profile);
  profileRef.current = profile;

  const courseCode = typeof frontMatter?.course_code === 'string' ? frontMatter.course_code : null;
  const unitNo = typeof frontMatter?.unit_no === 'number' ? frontMatter.unit_no : null;
  const topicNo = typeof frontMatter?.topic_no === 'number' ? frontMatter.topic_no : null;
  const locale: 'en' | 'ur' = i18n.currentLocale === 'ur' ? 'ur' : 'en';

  useEffect(() => {
    if (courseCode === null || unitNo === null || topicNo === null) return undefined;
    if (typeof document === 'undefined') return undefined;
    // AuthContext's own session/profile resolution hasn't settled yet - `role`/`profile`
    // are both still `null` during this window, indistinguishable from "genuinely signed
    // out" by their values alone. Hydrating now would read localStorage for what is about
    // to turn out to be a signed-in session (found via this exact race: a freshly
    // signed-in page load momentarily hydrates as "signed out", showing a stale local tick
    // that happens to already match the not-yet-merged account state, masking that the
    // real merge into the account never actually ran). Wait for `loading` to clear so this
    // effect only ever runs against a definitively-resolved auth state.
    if (loading) return undefined;
    // Art. VIII.1 / FR-006 - self-assessment is a student-only feature, stricter than the
    // usual teacher-visibility baseline. A signed-in teacher or admin gets the plain,
    // non-interactive checklist (same fallback as an out-of-scope topic) - never their own
    // synced account row, which the SELECT policy's `student_id = current_profile_id()`
    // clause would otherwise happily let them read straight back. Re-evaluated only when
    // `role` itself actually transitions (see this effect's dependency array) - not on
    // every `profile` object AuthContext happens to produce for the same signed-in account.
    if (role !== null && role !== 'student') return undefined;

    let cancelled = false;
    const cleanups: (() => void)[] = [];

    (async () => {
      const list = findChecklistList(toc);
      if (!list || cancelled) return;
      const items = readItems(list);
      if (items.length === 0) return;

      const errorEl = insertErrorContainer(list);

      const showError = (message: string) => {
        errorEl.textContent = message;
        errorEl.hidden = false;
      };
      const hideError = () => {
        errorEl.hidden = true;
      };

      let signedIn = false;
      const storedByPosition = new Map<number, { checked: boolean; item_text_snapshot: string }>();
      const initialProfile = profileRef.current;

      if (initialProfile) {
        try {
          await runMergeIfNeeded(initialProfile.id);
          if (cancelled) return;
          const { data, error } = await fetchOwnChecks(courseCode, unitNo, topicNo, locale);
          if (!error && data) {
            signedIn = true;
            for (const row of data) {
              storedByPosition.set(row.item_position, { checked: row.checked, item_text_snapshot: row.item_text_snapshot });
            }
          }
        } catch {
          signedIn = false; // 'not_configured' or a network failure — fall back to local
        }
      }

      // A thrown exception above (e.g. a genuine "Failed to fetch" - observed in practice
      // around a sign-out transition, when a request using the just-revoked session fails
      // at the network layer, not merely with a returned {error}) jumps straight to the
      // catch block, bypassing the `if (cancelled) return;` check inside the try. Without
      // this second check, an already-superseded effect invocation would still reach the
      // DOM-mutating code below.
      if (cancelled) return;

      if (!signedIn) {
        insertHint(list, MESSAGES.signInHint[locale]);
      }

      for (const item of items) {
        let initialChecked = false;
        if (signedIn) {
          const stored = storedByPosition.get(item.position);
          if (stored) {
            initialChecked = normalize(stored.item_text_snapshot) === item.text ? stored.checked : false;
          }
        } else {
          const local = readLocal(localKey(courseCode, unitNo, topicNo, locale, item.position));
          initialChecked = local?.checked ?? false;
        }

        item.checkbox.disabled = false;
        item.checkbox.checked = initialChecked;
        item.checkbox.setAttribute('data-testid', `self-assessment-checkbox-${item.position}`);

        const handleChange = async (event: Event) => {
          const target = event.target as HTMLInputElement;
          const nextChecked = target.checked;
          hideError();

          // Current auth state at click time (profileRef), not the `signedIn` this
          // effect invocation resolved when it ran - see the file-level comment.
          const currentProfile = profileRef.current;
          if (currentProfile) {
            const { error } = await upsertCheck({
              studentId: currentProfile.id,
              courseCode,
              unitNo,
              topicNo,
              locale,
              itemPosition: item.position,
              itemTextSnapshot: item.text,
              checked: nextChecked,
            });
            if (error) {
              target.checked = !nextChecked;
              showError(MESSAGES.saveError[locale]);
            }
          } else {
            writeLocal(localKey(courseCode, unitNo, topicNo, locale, item.position), {
              checked: nextChecked,
              text: item.text,
            });
          }
        };

        item.checkbox.addEventListener('change', handleChange);
        cleanups.push(() => item.checkbox.removeEventListener('change', handleChange));
      }
    })();

    return () => {
      cancelled = true;
      for (const cleanup of cleanups) cleanup();
    };
    // Deliberately NOT depending on `profile`/`profile?.id` - see the file-level comment.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseCode, unitNo, topicNo, locale, role, loading]);

  return <ContentOriginal {...props} />;
}
