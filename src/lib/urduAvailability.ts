/**
 * Feature 034 T020 (#807): a tiny shared store between the doc page, which knows whether the page
 * has an Urdu file (urdu-pages plugin), and the navbar language toggle, which sits outside the
 * doc context. `missing` greys out the Urdu segment; `notice` opens the callout after a reader
 * taps the greyed segment.
 */
import { useSyncExternalStore } from 'react';

type State = { missing: boolean; notice: boolean };
let state: State = { missing: false, notice: false };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function setUrduMissing(missing: boolean): void {
  if (state.missing === missing && !state.notice) return;
  state = { missing, notice: false };
  emit();
}
export function showUrduNotice(): void {
  if (state.notice) return;
  state = { ...state, notice: true };
  emit();
}
const SERVER: State = { missing: false, notice: false };
export function useUrduAvailability(): State {
  return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => state, () => SERVER);
}
