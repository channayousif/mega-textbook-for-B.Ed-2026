/**
 * Contract tests for scripts/lib/figure-palette.mjs (Spec 013, FR-004/FR-005).
 *
 * The palette is the single source of truth for figure colour, so its promises
 * have to be machine-checked rather than asserted in prose. The AA claims in
 * plan.md's D4 are exactly what this file proves; if someone retunes a hue for
 * looks, the contrast obligation fails here rather than in a reader's eye.
 */
import { describe, test, expect } from 'vitest';
import {
  LIGHT_TOKENS, DARK_TOKENS, rootBlock, contrastRatio, paletteHexes, WORDMARK_TEXT,
} from '../../scripts/lib/figure-palette.mjs';

const RAMPS = [['light', LIGHT_TOKENS], ['dark', DARK_TOKENS]];
const TEXT_TOKENS = ['ink', 'muted', 'line', 'a1', 'a2', 'a3', 'a4'];
const ACCENTS = ['a1', 'a2', 'a3', 'a4'];
const AA = 4.5;        // WCAG 1.4.3, text
const NON_TEXT = 3.0;  // WCAG 1.4.11, graphical objects
const LADDER_STEP = 1.2;

describe('figure palette', () => {
  test('both ramps declare exactly the same token names', () => {
    expect(Object.keys(LIGHT_TOKENS)).toEqual(Object.keys(DARK_TOKENS));
  });

  test('every token is a lowercase 6-digit hex', () => {
    for (const [, tokens] of RAMPS) {
      for (const [name, value] of Object.entries(tokens)) {
        expect(value, name).toMatch(/^#[0-9a-f]{6}$/);
      }
    }
  });

  describe.each(RAMPS)('%s ramp', (_name, tokens) => {
    test.each(TEXT_TOKENS)('%s clears WCAG AA against the ground', (token) => {
      expect(contrastRatio(tokens[token], tokens.bg)).toBeGreaterThanOrEqual(AA);
    });

    // The accent is the panel's STROKE - a graphical object, so WCAG 1.4.11's
    // 3:1 applies, not 1.4.3's 4.5:1. Labels on that panel are drawn in --ink,
    // which is text and is held to the full 4.5:1 below.
    test.each(ACCENTS)('%s clears the 3:1 graphics bar on its own panel', (accent) => {
      expect(contrastRatio(tokens[accent], tokens[`${accent}-fill`])).toBeGreaterThanOrEqual(NON_TEXT);
    });

    test.each(ACCENTS)('ink clears WCAG AA as text on the %s panel', (accent) => {
      expect(contrastRatio(tokens.ink, tokens[`${accent}-fill`])).toBeGreaterThanOrEqual(AA);
    });

    test.each(ACCENTS)('the %s panel is visibly tinted, not invisible', (accent) => {
      expect(contrastRatio(tokens[`${accent}-fill`], tokens.bg)).toBeGreaterThan(1.08);
    });
  });

  test('the four accents are mutually distinguishable by lightness', () => {
    // Green and vermillion converge under deuteranopia, so hue alone cannot
    // separate them - and on a printed A4 handout no hue survives at all.
    // The accents therefore sit on a deliberate luminance ladder, so they stay
    // separable with every trace of colour removed. Art. III.8's redundancy
    // rule is the primary guarantee; this is the backstop.
    for (const [name, tokens] of RAMPS) {
      for (let i = 0; i < ACCENTS.length; i += 1) {
        for (let j = i + 1; j < ACCENTS.length; j += 1) {
          const ratio = contrastRatio(tokens[ACCENTS[i]], tokens[ACCENTS[j]]);
          expect(ratio, `${name}: ${ACCENTS[i]} vs ${ACCENTS[j]}`).toBeGreaterThan(LADDER_STEP);
        }
      }
    }
  });

  test('a1 is the site brand primary, so figures and chrome share a hue', () => {
    expect(LIGHT_TOKENS.a1).toBe('#1f6f5c');
  });

  test('rootBlock is deterministic and declares every token', () => {
    const block = rootBlock(LIGHT_TOKENS);
    expect(block).toBe(rootBlock(LIGHT_TOKENS));
    expect(block.startsWith(':root{')).toBe(true);
    expect(block.endsWith('}')).toBe(true);
    for (const [name, value] of Object.entries(LIGHT_TOKENS)) {
      expect(block).toContain(`--${name}:${value}`);
    }
  });

  test('the two ramps produce different root blocks', () => {
    expect(rootBlock(LIGHT_TOKENS)).not.toBe(rootBlock(DARK_TOKENS));
  });

  test('paletteHexes covers both ramps', () => {
    const hexes = paletteHexes();
    for (const [, tokens] of RAMPS) {
      for (const value of Object.values(tokens)) expect(hexes.has(value)).toBe(true);
    }
  });

  test('the wordmark is the bare domain, with no scheme or path', () => {
    expect(WORDMARK_TEXT).toBe('textbook.com.pk');
  });
});
