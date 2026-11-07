import { describe, it, expect } from 'vitest';
import { ICON_GROUPS, ICONS, FLIPS_IN_RTL } from '../../src/components/icons/paths.ts';

// A path is only commands and numbers; anything else is a typo that draws nothing.
const PATH = /^[MmLlHhVvCcSsQqTtAaZz0-9.,\s-]+$/;

describe('icon pack', () => {
  it('has no duplicate names across groups', () => {
    const names = Object.values(ICON_GROUPS).flatMap((g) => Object.keys(g));
    expect(new Set(names).size).toBe(names.length);
    expect(Object.keys(ICONS).length).toBe(names.length);
  });

  it('draws every icon with valid paths inside the 24px grid', () => {
    for (const [name, [base, accent]] of Object.entries(ICONS)) {
      expect(base, name).toMatch(PATH);
      expect(base.trimStart()[0], name).toMatch(/[Mm]/);
      if (accent) expect(accent, name).toMatch(PATH);
      for (const n of `${base} ${accent}`.match(/-?\d*\.?\d+/g) ?? []) {
        expect(Math.abs(Number(n)), `${name} ${n}`).toBeLessThanOrEqual(24);
      }
    }
  });

  it('only mirrors icons that exist', () => {
    for (const name of FLIPS_IN_RTL) expect(ICONS[name], name).toBeDefined();
  });
});
