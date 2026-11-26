import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { validateChart } from '../../scripts/build-studio-index.mjs';

const pilot = JSON.parse(readFileSync(new URL('../../specs/studio/charts/gqur-301/unit-10.json', import.meta.url), 'utf8'));
const good = () => structuredClone(pilot[0]);

describe('validateChart', () => {
  it('accepts every chart in the pilot file', () => {
    expect(pilot.length).toBeGreaterThan(0);
    for (const c of pilot) expect(validateChart(c)).toEqual([]);
  });

  it('rejects a missing Urdu title', () => {
    const c = good(); delete c.title.ur;
    expect(validateChart(c).join(' ')).toMatch(/title/);
  });

  it('rejects a single point', () => {
    const c = good(); c.series[0].points = [[0, 5]];
    expect(validateChart(c).join(' ')).toMatch(/at least 2 points/);
  });

  it('rejects a non-numeric y', () => {
    const c = good(); c.series[0].points[1] = [1, '12'];
    expect(validateChart(c).join(' ')).toMatch(/y must be numeric/);
  });

  it('rejects an em dash', () => {
    const c = good(); c.title.en = `Absent ${String.fromCharCode(0x2014)} pupils`;
    expect(validateChart(c)).toContain('long dash');
  });

  it('rejects an unknown chart type', () => {
    const c = good(); c.type = 'pie';
    expect(validateChart(c).join(' ')).toMatch(/type/);
  });
});
