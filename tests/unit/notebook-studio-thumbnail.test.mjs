import { describe, it, expect } from 'vitest';
import { frameScore, fitHook, thumbnailSvg, SIZES } from '../../scripts/notebook-studio/thumbnail.mjs';

describe('thumbnails', () => {
  it('prefers a sharp, well-exposed, colourful frame over a black or blurred one', () => {
    const good = frameScore({ sharpness: 40, brightness: 0.5, colour: 0.4 });
    expect(good).toBeGreaterThan(frameScore({ sharpness: 40, brightness: 0.03, colour: 0.4 }));
    expect(good).toBeGreaterThan(frameScore({ sharpness: 4, brightness: 0.5, colour: 0.4 }));
  });
  it('fits the hook in two lines on landscape and three on portrait', () => {
    expect(fitHook('کمزور یادداشت یا غلط طرز مطالعہ', { locale: 'ur', aspect: 'landscape' }).lines.length).toBeLessThanOrEqual(2);
    const p = fitHook('کچھ بچے جلدی کیوں سیکھتے ہیں؟', { locale: 'ur', aspect: 'portrait' });
    expect(p.lines.length).toBeLessThanOrEqual(3);
    expect(p.size).toBeGreaterThanOrEqual(92);
  });
  it('draws hook, badge, free-course ribbon and the right action for each kind, aspect and locale', () => {
    const ur = thumbnailSvg({ hook: 'کمزور یادداشت', badge: 'EFMP-301 · یونٹ 4', kind: 'audio', locale: 'ur' });
    expect(ur).toContain(`width="${SIZES.landscape.w}"`);
    for (const t of ['کمزور', 'مفت کورس', 'ابھی سنیں', 'آڈیو بریف', 'textbook.com.pk']) expect(ur).toContain(t);
    const en = thumbnailSvg({ hook: 'The Memory Myth', badge: 'EFMP-301 · Unit 4', kind: 'video', locale: 'en', aspect: 'portrait' });
    expect(en).toContain(`height="${SIZES.portrait.h}"`);
    for (const t of ['Memory', 'Myth', 'Free course', 'Watch now', 'Video']) expect(en).toContain(t);
    expect(en).not.toMatch(/[\u2014\u2015]/);
  });
});
