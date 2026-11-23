import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { buildComposition, layout, loadIcons, mirrorRegion, regionsOf, validateBeats } from '../../scripts/media/animate-figure.mjs';

const pilot = JSON.parse(readFileSync('specs/studio/animations/efmp-301/fig-U4-3.json', 'utf8'));
const svg = readFileSync(pilot.svg, 'utf8');

describe('animate-figure (Feature 032)', () => {
  const icons = loadIcons();

  it('accepts the pilot beats file, icons from the site pack', () => {
    expect(Object.keys(icons).length).toBeGreaterThan(40);
    expect(validateBeats(pilot, icons)).toEqual([]);
  });

  it('rejects an unknown icon or accent', () => {
    const b = structuredClone(pilot);
    b.beats[1].icon = 'not-an-icon';
    b.beats[2].accent = 'a9';
    const errs = validateBeats(b, icons).join('\n');
    expect(errs).toMatch(/beat 1: unknown icon/);
    expect(errs).toMatch(/beat 2: accent/);
  });

  it('draws icon badges, accent highlights and Urdu badges on the right', () => {
    const en = buildComposition(pilot, svg, { lang: 'en', icons });
    expect(en.html).toContain('class="badge" style="background: var(--a2)"');
    expect(en.html).toContain(icons.eye[0]);
    expect(en.html).toMatch(/<rect class="hl hl-0" id="hl-0-0"/);
    // highlights sit behind the figure content, right after its background
    expect(en.html.indexOf('class="hl hl-0"')).toBeGreaterThan(en.html.indexOf('<rect class="bg"'));
  });

  it('rejects missing captions, bad regions and em dashes', () => {
    const bad = { course: 'X', unit: 1, figure: 'f', svg: 'a.svg', beats: [
      { region: [0, 0, 10], seconds: 3, caption: { en: 'a' } },
      { region: [0, 0, 10, 10], seconds: 0, caption: { en: 'a \u2014 b', ur: 'ب' } },
    ] };
    const errs = validateBeats(bad).join('\n');
    expect(errs).toMatch(/beat 0: region/);
    expect(errs).toMatch(/beat 0: missing caption.ur/);
    expect(errs).toMatch(/beat 1: seconds/);
    expect(errs).toMatch(/beat 1: em dash in caption.en/);
  });

  it('reads one region or several', () => {
    expect(regionsOf({ region: [1, 2, 3, 4] })).toEqual([[1, 2, 3, 4]]);
    expect(regionsOf({ region: [[1, 2, 3, 4], [5, 6, 7, 8]] })).toHaveLength(2);
  });

  it('mirrors regions for the right-to-left Urdu figure', () => {
    expect(mirrorRegion([18, 120, 165, 185], 780)).toEqual([597, 120, 165, 185]);
    // EN 780x470 onto the enlarged UR 1000x650: the first panel lands on the right.
    const [x, , w] = mirrorRegion([0, 110, 195, 200], 780, 1000, 650 / 470);
    expect(x).toBe(750);
    expect(x + w).toBe(1000);
  });

  it('fits figure and captions inside both canvases', () => {
    for (const f of ['16x9', '9x16']) {
      const L = layout(f, 780, 470);
      expect(L.fx).toBeGreaterThanOrEqual(0);
      expect(L.fx + L.fw).toBeLessThanOrEqual(L.w);
      expect(L.captionY + L.captionH - 60).toBeLessThanOrEqual(L.h);
    }
  });

  it('builds a timed composition without the figure title or desc, Urdu right to left', () => {
    const en = buildComposition(pilot, svg, { lang: 'en' });
    expect(en.duration).toBeCloseTo(0.3 + pilot.beats.reduce((s, b) => s + b.seconds, 0) + 2, 5);
    expect(en.html).toMatch(/<svg id="fig"[^>]*font-family="system-ui/);
    expect(en.html).toContain(`data-duration="${en.duration}"`);
    expect(en.html).not.toContain('<title');
    expect(en.html).toContain('window.__timelines.main = tl');
    const ur = buildComposition(pilot, readFileSync(pilot.svg.replace(/\.svg$/, '.ur.svg'), 'utf8'), { lang: 'ur', en: { w: 780, h: 470 } });
    expect(ur.html).toContain('dir="rtl"');
    expect(ur.html).toContain('Noto Nastaliq Urdu');
    expect(ur.html).toContain('[[750,152.1,250,276.6]]');
  });
});

describe('kaggle-animate', () => {
  it('names private datasets and kernels from a safe batch name', async () => {
    const { checkBatchName, datasetSlug, kernelSlug } = await import('../../scripts/media/kaggle-animate.mjs');
    expect(datasetSlug('efmp301-u04-pilot')).toBe('anim-efmp301-u04-pilot');
    expect(kernelSlug('efmp301-u04-pilot')).toBe('anim-render-efmp301-u04-pilot');
    expect(() => checkBatchName('../x')).toThrow();
    expect(() => checkBatchName('ok-batch')).not.toThrow();
  });
});
