import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  HOME_CTA_DISMISSED_KEY,
  readHomeCtaDismissed,
  saveHomeCtaDismissed,
} from '../../src/lib/homeCta.ts';

/**
 * The banner's dismissal is a device-local preference, like last-read. These tests pin the
 * storage contract: a versioned key, a numeric timestamp, and no throw on malformed data.
 */
const store = new Map();

beforeEach(() => {
  store.clear();
  vi.stubGlobal('window', {
    localStorage: {
      getItem: (key) => (store.has(key) ? store.get(key) : null),
      setItem: (key, value) => store.set(key, String(value)),
      removeItem: (key) => store.delete(key),
    },
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('home CTA dismissal', () => {
  it('is not dismissed by default', () => {
    expect(readHomeCtaDismissed()).toBeNull();
  });

  it('round-trips a dismissal with a timestamp', () => {
    saveHomeCtaDismissed();
    const read = readHomeCtaDismissed();
    expect(read).not.toBeNull();
    expect(typeof read.at).toBe('number');
  });

  it('ignores malformed or wrong-shape values', () => {
    store.set(HOME_CTA_DISMISSED_KEY, '{not json');
    expect(readHomeCtaDismissed()).toBeNull();

    store.set(HOME_CTA_DISMISSED_KEY, JSON.stringify({ at: 'soon' }));
    expect(readHomeCtaDismissed()).toBeNull();
  });

  it('carries a version in the key so copy changes can re-show the banner', () => {
    expect(HOME_CTA_DISMISSED_KEY).toMatch(/\.v\d+$/);
  });
});