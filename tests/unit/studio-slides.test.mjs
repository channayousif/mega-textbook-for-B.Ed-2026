import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { renderDeck, validateOutline } from '../../scripts/studio-slides.mjs';

const pilot = JSON.parse(readFileSync('specs/studio/slides/efmp-301/unit-04.json', 'utf8'));

describe('web slide decks (Feature 032 phase B)', () => {
  it('accepts the EFMP-301 Unit 4 outline', () => {
    expect(validateOutline(pilot)).toEqual([]);
  });

  it('rejects missing Urdu, uneven points, long lines, bad figure paths and long dashes', () => {
    const bad = structuredClone(pilot);
    delete bad.slides[1].title.ur;
    bad.slides[1].points.ur.pop();
    bad.slides[2].points.en[0] = 'x'.repeat(120);
    bad.slides[5].figure = 'https://example.com/x.svg';
    bad.subtitle.en = 'a — b';
    const e = validateOutline(bad).join('\n');
    expect(e).toMatch(/slide 2: title.ur missing/);
    expect(e).toMatch(/slide 2: en and ur point counts differ/);
    expect(e).toMatch(/slide 3: point 1 \(en\) over 110/);
    expect(e).toMatch(/slide 6: figure must be a figure base path/);
    expect(e).toMatch(/long dash/);
  });

  it('renders one self-contained page per language: title slide, counter, Urdu right to left', () => {
    const en = renderDeck(pilot, 'en');
    const ur = renderDeck(pilot, 'ur');
    expect((en.match(/<section class="slide/g) ?? []).length).toBe(pilot.slides.length + 1);
    expect(en).toContain('<html lang="en" dir="ltr">');
    expect(ur).toContain('<html lang="ur" dir="rtl">');
    expect(ur).toContain("url('/fonts/NotoNastaliqUrdu-Regular.woff2')");
    expect(ur).toContain('src="/img/figures/efmp-301/unit-04/fig-U4-3.ur.svg"');
    expect(en).toContain('src="/img/figures/efmp-301/unit-04/fig-U4-3.svg"');
    expect(ur).toMatch(/<span dir="ltr">2 \/ 13<\/span>/); // the counter never reverses in Urdu
    expect(en).not.toMatch(/<script[^>]+src=/); // no external scripts
  });

  it('escapes outline text', () => {
    const o = structuredClone(pilot);
    o.title.en = 'A <b> & "c"';
    expect(renderDeck(o, 'en')).toContain('A &lt;b&gt; &amp; &quot;c&quot;');
  });
});
